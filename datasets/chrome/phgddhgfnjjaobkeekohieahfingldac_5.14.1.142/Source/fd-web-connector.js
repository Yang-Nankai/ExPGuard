//Global access to fd extenstion
if (!window.fdWebExtension) {
  window.fdWebExtension = {};
}

//console.debug('fdWebExtension - executing');
fdWebExtension.fdExtensionVersion = "5.14.1.142";
fdWebExtension.fdConnected = false;
fdWebExtension.nativeConnected = false;
fdWebExtension.useNativeMessaging = false;

// see https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
fdWebExtension.fdIsChrome =
  !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
fdWebExtension.fdIsFirefox = typeof InstallTrigger !== 'undefined';

fdWebExtension.fdIsOnWin = window.navigator.platform == 'Win32';

if (!fdWebExtension.fdAttachListenersToDocument) {
  fdWebExtension.fdAttachListenersToDocument = function(doc) {
    fdWebExtension.fdAttachFocusListeners(doc);
    if (!window.MSpeechAPI) {
      fdWebExtension.fdObserveMutations(doc);
    }
    if (window.OncoEMR) {
      fdWebExtension.fdAttachFocusListenerRadEditor(doc);
    }
  }
}

if (!fdWebExtension.canUseExecCommands) {
  fdWebExtension.canUseExecCommands = function (el) {
    return !fdWebExtension.isDraftJsEditor(el) &&
           (!fdWebExtension.isCkEditor(el) || fdWebExtension.isSurgicalInformationSystems());
  };
}
  
if (!fdWebExtension.isSmartReports) {
  fdWebExtension.isSmartReports = function (win = window) {
    return win.document.head.querySelector('meta[name="application-name"]')?.content === "SmartReports";
  };
}

if (!fdWebExtension.isSurgicalInformationSystems) {
  fdWebExtension.isSurgicalInformationSystems = function (win = window) {
    return win.location.href.includes("siscomplete");
  };
}

if (!fdWebExtension.isCkEditor) {
  fdWebExtension.isCkEditor = function (el) {
    if (!(el && el.nodeType === 1)) return false; // not an Element

    if (el.tagName !== 'DIV' && el.tagName !== 'BODY') {
      return false;
    }

    if (el.contentEditable !== "true") {
      return false;
    };

    // Explicit attribute used in CKEditor 4 inline mode
    if (el.hasAttribute('ckeditor')) {
      return true;
    }

    // CKEditor 5 classes
    if (el.classList.contains('ck-editor__editable') || el.closest('.ck-editor')) {
      return true;
    }

    // CKEditor 4 classes
    if (el.classList.contains('cke_editable') || el.classList.contains('cke_editable_inline')) {
      return true;
    }

    return false;
  };
}

if (!fdWebExtension.isDraftJsEditor) {
  fdWebExtension.isDraftJsEditor = function (el) {
    if (!(el instanceof Element)) return false;

    if (el.tagName !== 'DIV' || el.contentEditable !== "true") {
      return false;
    }

    // Default Draft.js content class
    if (el.classList.contains('public-DraftEditor-content')) {
      return true;
    }

    const hasDraftJsMarkers =
      el.hasAttribute('data-contents') ||
      el.querySelector('[data-block="true"][data-offset-key]') !== null;

    return hasDraftJsMarkers;
  };
}

// for FD-14927 - we no longer poll for connection, so weird instances of this script, like when it is embedded
// in Quippe/EO.WebBrowser for PCH, we need to check if the document is not finished loading
// if it is not, the set a callback to attach the focus listeners for when the doc is loaded
if (!fdWebExtension.fdDOMContentLoadedEventListener) {
  fdWebExtension.fdDOMContentLoadedEventListener = function(evt) {
    //console.log("dom content loaded cb for: " + evt.target);
    fdWebExtension.fdAttachListenersToDocument(evt.target);
  };
}

if (
  document.readyState === 'complete' ||
  (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  //console.log("content already loaded");
  // already loaded the document, focus listeners will be attached after connection is made
} else {
  //console.log("adding callback for content loaded");
  document.addEventListener(
    'DOMContentLoaded',
    fdWebExtension.fdDOMContentLoadedEventListener,
  );
}

if (!fdWebExtension.saveToStorage) {
  fdWebExtension.saveToStorage = function(k, v) {
    var saveEvent = new CustomEvent('fdWebExtension.saveToStorage', {
      detail: { key: k, value: v }
    });
    document.dispatchEvent(saveEvent);
  };
}

if (!fdWebExtension.deleteFromStorage) {
  fdWebExtension.deleteFromStorage = function(k) {
    var delEvent = new CustomEvent('fdWebExtension.deleteFromStorage', {
      detail: { key: k }
    });
    document.dispatchEvent(delEvent);
  };
}

if (!fdWebExtension.fdConnectEventHandler) {
  fdWebExtension.fdConnectEventHandler = function(evt) {
    //console.debug("fdWebExtension.fdConnect: " + evt.detail);
    var data = JSON.parse(evt.detail);
    fdWebExtension.fdExtensionVersion = data.version;
    fdWebExtension.fdPort = data.fdPort;
    fdWebExtension.userId = data.userId;
    fdWebExtension.useNativeMessaging = data.useNative
    fdWebExtension.fdInitializeApi();
    fdWebExtension.fdConnect();
  };
}

if (!fdWebExtension.fdDisconnectEventHandler) {
  fdWebExtension.fdDisconnectEventHandler = function(evt) {
    //console.debug("fdWebExtension.fdDisconnect");
    fdWebExtension.fdDisconnect();
  };
}

if(!fdWebExtension.fdPushTabUpdate){
  fdWebExtension.fdPushTabUpdate = function(evt){
    if(fdWebExtension.fdConnected) {
      fdWebExtension.sendFdMsg(JSON.stringify({
        id: fdWebExtension.fdGuid(),
        msg : "UpdateActiveTab"
      }));

      // ok, we updated the active tab. push a focus change to, just in case
      fdWebExtension.fdPushFocusChange();
    } else {
      fdWebExtension.fdReconnect(true);
    }

    if(fdWebExtension.fdGrammarTimestamp){
      // force an update for the grammar if we get a tab update
      // now only applicable to Athena
      fdWebExtension.fdGrammarTimestamp = 0;
    }
  }
}

if (!fdWebExtension.receiveNativeMsg) {
  fdWebExtension.receiveNativeMsg = function (evt) {
    //console.log("fdWebExtension.receiveNativeMsg:" + evt.detail);
    if (!fdWebExtension.useNativeMessaging) {
      return;
    }

    var obj = JSON.parse(evt.detail);
    if (!obj || !obj.msg) {
      fdWebExtension.fdLog('receiveNativeMsg - unknown message format');
      return;
    }

    fdWebExtension.fdOnMessageCallback(obj);
  };
}

// using a non-anonymous function will allow us to discard the duplicate entries, if we somehow
// get in the case where we have multiple fdConnect listners (see FD-15534)
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Multiple_identical_event_listeners
// this is the initial fdConnect trigger from the content-script:
document.addEventListener(
  'fdWebExtension.fdConnect',
  fdWebExtension.fdConnectEventHandler,
);

document.addEventListener(
  'fdWebExtension.fdDisconnect',
  fdWebExtension.fdDisconnectEventHandler,
);

document.addEventListener('fdWebExtension.PushTabUpdate', 
  fdWebExtension.fdPushTabUpdate,
);

document.addEventListener('fdWebExtension.receiveNativeMsg',
  fdWebExtension.receiveNativeMsg,
);

if (!fdWebExtension.fdConfigureExtension) {
  fdWebExtension.fdExtensionConfigured = false;
  fdWebExtension.fdExtensionConfig = {
    enableLogging: true,
    logContentEditableInfo: false,
    logFocusedControlHtml: false,
    keypressEventDirection: 'keydown',
    isSetTargetAvailable: false,
    focusChangeRecheckTimer: 3000,
    focusDebugMode: false,
    replaceSpacesWithNbsp: false,
    simulateKeyDownAfterInsert: true,
    fieldTypesToUseSendKeysForInsertingText: [],
    contentEditableSingleDivMode: false,
    isSetTargetRequestAvailable: false,
  };

  fdWebExtension.fdConfigureExtension = function(config) {
    fdWebExtension.fdExtensionConfig.enableLogging =
      config.enableLogging !== undefined ? config.enableLogging : true;

    fdWebExtension.fdExtensionConfig.logContentEditableInfo =
      config.logContentEditableInfo !== undefined
        ? config.logContentEditableInfo
        : false;

    fdWebExtension.fdExtensionConfig.logFocusedControlHtml =
      config.logFocusedControlHtml !== undefined
        ? config.logFocusedControlHtml
        : false;

    fdWebExtension.fdExtensionConfig.keypressEventDirection =
      config.keypressEventDirection !== undefined
        ? config.keypressEventDirection
        : 'keydown';

    fdWebExtension.fdExtensionConfig.isSetTargetAvailable =
      config.isSetTargetAvailable !== undefined
        ? config.isSetTargetAvailable
        : false;

    fdWebExtension.fdExtensionConfig.focusChangeRecheckTimer =
      config.focusChangeRecheckTimer !== undefined
        ? config.focusChangeRecheckTimer
        : 3000;

    fdWebExtension.fdExtensionConfig.focusDebugMode =
      config.focusDebugMode !== undefined
        ? config.focusDebugMode
        : false;
	
    fdWebExtension.fdExtensionConfig.replaceSpacesWithNbsp = 
      config.replaceSpacesWithNbsp !== undefined
        ? config.replaceSpacesWithNbsp
        : false;

    fdWebExtension.fdExtensionConfig.simulateKeyDownAfterInsert =
      config.simulateKeyDownAfterInsert !== undefined
        ? config.simulateKeyDownAfterInsert
        : true;

    fdWebExtension.fdExtensionConfig.fieldTypesToUseSendKeysForInsertingText =
      config.fieldTypesToUseSendKeysForInsertingText !== undefined
        ? config.fieldTypesToUseSendKeysForInsertingText.split(',')
        : [];

    fdWebExtension.fdExtensionConfig.contentEditableSingleDivMode =
      config.contentEditableSingleDivMode !== undefined
        ? config.contentEditableSingleDivMode
        : false;

    fdWebExtension.fdExtensionConfig.isSetTargetRequestAvailable =
      config.isSetTargetRequestAvailable !== undefined
        ? config.isSetTargetRequestAvailable
        : false;

    fdWebExtension.fdLog(
      'fdConfigureExtension - enableLogging=' +
        fdWebExtension.fdExtensionConfig.enableLogging,
    );
    fdWebExtension.fdLog(
      'fdConfigureExtension - logContentEditableInfo=' +
        fdWebExtension.fdExtensionConfig.logContentEditableInfo,
    );
    fdWebExtension.fdLog(
      'fdConfigureExtension - logFocusedControlHtml=' +
        fdWebExtension.fdExtensionConfig.logFocusedControlHtml,
    );
    fdWebExtension.fdLog(
      'fdConfigureExtension - keypressEventDirection=' +
        fdWebExtension.fdExtensionConfig.keypressEventDirection,
    );
    fdWebExtension.fdLog(
      'fdConfigureExtension - focusChangeRecheckTimer=' +
        fdWebExtension.fdExtensionConfig.focusChangeRecheckTimer,
    );
    fdWebExtension.fdLog(
      'fdConfigureExtension - focusDebugMode=' +
        fdWebExtension.fdExtensionConfig.focusDebugMode,
    );

    fdWebExtension.fdLog(
      'fdConfigureExtension - simulateKeyDownAfterInsert=' +
        fdWebExtension.fdExtensionConfig.simulateKeyDownAfterInsert,
    );

    fdWebExtension.fdLog(
      'fdConfigureExtension - fieldTypesToUseSendKeysForInsertingText=' +
        fdWebExtension.fdExtensionConfig.fieldTypesToUseSendKeysForInsertingText.join(','),
    );

    fdWebExtension.fdLog(
      'fdConfigureExtension - contentEditableSingleDivMode=' +
        fdWebExtension.fdExtensionConfig.contentEditableSingleDivMode,
    );

    var multipleConnectionSupportEvent = new CustomEvent('fdWebExtension.multipleConnectionSupport', {
      detail: JSON.stringify({supported: fdWebExtension.fdExtensionConfig.isSetTargetAvailable})
    });
    document.dispatchEvent(multipleConnectionSupportEvent);

    fdWebExtension.fdExtensionConfigured = true;
  };
}

if (!fdWebExtension.fdLog) {
  fdWebExtension.fdDisableLoggingForMessage = false;

  fdWebExtension.fdLog = function(logLine, forceLog = false) {
    if (!fdWebExtension.fdExtensionConfig.enableLogging && !forceLog) return;
    else if (fdWebExtension.fdDisableLoggingForMessage && !forceLog) return;

    if (fdWebExtension.fdConnected) {
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: fdWebExtension.fdGuid(),
          msg: 'WriteLogLine',
          logLine: logLine,
        }), false);
    } else {
      console.debug(logLine);
    }
  };
}

if(!fdWebExtension.fdDispatchPaste){
  fdWebExtension.fdDispatchPaste = function(target, text){
    const data = new DataTransfer();
    data.setData('text/plain', text);
  
    target.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: data,
      bubbles: true,
      cancelable: true
    }))
  }
}
  
if(!fdWebExtension.fdCanUseDispatchPaste){
  fdWebExtension.fdCanUseDispatchPaste = function(element) {
    // plain text inputs should not need paste events
    if(fdWebExtension.fdIsTextInputOrTextArea(element)) {
      return false;
    }

    // check this element first for rad editor, if found, don't use paste
    if(element.getAttribute('fdRadEditorFound')) {
      return false;
    }

    // now check any children in case they are recognized as rad editor
    let radEditorElements = element.querySelectorAll("[fdRadEditorFound='true']");
    if(radEditorElements && radEditorElements.length != 0) {
      return false;
    }

    // finally, if we are a body element, lets do one last check for raditor styles
    if(element.tagName.toLowerCase() == 'body' && element.ownerDocument) {
      var raditorStyle = element.ownerDocument.querySelector('#RADEDITORSTYLESHEET0');
      if(raditorStyle){
        element.setAttribute('fdRadEditorFound', 'true');
        return false;
      }
    }

    // sure, we can use paste events
    return true;
  }
}
  

// Begin section for edit div-when-not-in-focus

if(!fdWebExtension.fdGetNodesAtPos){
  fdWebExtension.fdGetNodesAtPos = function(fdRootNode, start, end){
    var offset = 0;
    var inNodeOffsetStart = 0;
    var inNodeOffsetEnd = 0;
    const nodeIterator = document.createNodeIterator(fdRootNode,
    NodeFilter.SHOW_ALL,
    {
      acceptNode(node){
        if(node.nodeType === Node.TEXT_NODE){
          var nodeStart = offset;
          var nodeEnd = offset + node.length;
          offset += node.length + 1;
          if(start >= nodeStart && end <= nodeEnd){
            inNodeOffsetStart = start - nodeStart;
            inNodeOffsetEnd = end - nodeStart;
            return NodeFilter.FILTER_ACCEPT;
          }
        } else if (node.tagName === 'BR'){
          var nodeStart = offset; 
          offset += 2; // need to account for breaks
          if((start == end) && (start == nodeStart)){
            // found our spot, its in a break element, use that.
            return NodeFilter.FILTER_ACCEPT;
          }
        }

        return NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while(nodeIterator.nextNode()){
      nodes.push({
        node: nodeIterator.referenceNode, 
        inNodeStart: inNodeOffsetStart,
        inNodeEnd: inNodeOffsetEnd
      });
    }

    if(nodes.length == 0 && fdRootNode.firstChild == null){
      // we are in the root, and there just aren't any children yet, use the root
      nodes.push({
        node: fdRootNode,
        inNodeStart: 0,
        inNodeEnd: 0
      });
    } else if (nodes.length == 0){
      // we are at the end of the div, just append to the end
      var startPos = 0;
      var endPos = 0;
      var lastChild = fdRootNode.lastChild;
      if(lastChild.firstChild && lastChild.firstChild.nodeType == Node.TEXT_NODE){
        startPos = lastChild.firstChild.nodeValue.length;
        endPos = lastChild.firstChild.nodeValue.length;
      } else if (lastChild.firstChild && lastChild.firstChild.nodeName === 'BR'){
        lastChild = lastChild.firstChild; // its a break, so use that node
      }

      nodes.push({
        node: lastChild,
        inNodeStart: startPos,
        inNodeEnd: endPos
      });
    }

    return nodes;
  }
}

if(!fdWebExtension.fdInsertAtDivLocation){
  fdWebExtension.fdInsertAtDivLocation = function(fdControlElement, start, end, text){
    if(text !== undefined){
      var nodeData = fdWebExtension.fdGetNodesAtPos(fdControlElement, start, end);
      if(nodeData.length == 0){
        return undefined;
      } else if(nodeData.length > 1){
        return undefined;
      } else {
        var node = nodeData[0].node;
        if(node.tagName == 'BR' && text.indexOf('\n') == -1){ //Can't just replace if we have newlines
          fdWebExtension.fdReplaceBreakNodeWithText(node, text);
          return text.length;
        } else {
          return fdWebExtension.fdUpdateDivTextNode(node, text, nodeData[0].inNodeStart, nodeData[0].inNodeEnd, fdControlElement);
        }
      }
    }
    return undefined;
  }  
}

// We have determined that our current node is a BR node, 
// meaning that we are at a new line. So, replace the break
// node with a new text node.
if(!fdWebExtension.fdReplaceBreakNodeWithText){
  fdWebExtension.fdReplaceBreakNodeWithText = function(node, text){
    if(node){
      var parent = node.parentNode;
      if(parent && parent.tagName == 'DIV'){
        var mainWindow = fdWebExtension.fdGetMainWindow();
        var document = mainWindow.document;
        parent.removeChild(node);
        var textNode = document.createTextNode(text);
        parent.appendChild(textNode);
      } else{
        fdWebExtension.fdLog(`unexpected parent node type ${parent.tagName}`);
      }
    } else{
      fdWebExtension.fdLog(`couldn't insert text ${text} since we couldn't find node`);
    }
  }
}

if(!fdWebExtension.fdInsertNodeAfterReferenceInParent){
  fdWebExtension.fdInsertNodeAfterReferenceInParent = function(parentNode, newNode, referenceNode){
    if(parentNode === referenceNode){
      return parentNode.appendChild(newNode);
    }

    var nextNode = referenceNode.nextSibling;
    if(nextNode){
      return parentNode.insertBefore(newNode, nextNode);
    } else {
      return parentNode.insertAdjacentElement('beforeend', newNode);
    }
  }
}

if(!fdWebExtension.fdUpdateDivTextNode){
  fdWebExtension.fdUpdateDivTextNode = function(node, text, startPos, endPos, parentFdControlElement){
    var mainWindow = fdWebExtension.fdGetMainWindow();
    var document = mainWindow.document;
    var insertedLength = 0;
    var textComponents = text.split("\n"); // break up paragraphs
    if(/^\n+$/.test(text)){ // only newlines, trim
      textComponents.length = textComponents.length - 1;
    }
    var startTxt = "";
    var endTxt = "";
    if(node.nodeValue){
      startTxt = node.nodeValue.slice(0,startPos);
      endTxt = node.nodeValue.slice(endPos, node.nodeValue.length);
    }

    if(textComponents.length == 1){
      if(node.nodeValue){
        node.nodeValue = startTxt + text + endTxt;
        insertedLength = text.length;
      } else {
        var textNode = document.createTextNode(text);
        insertedLength += text.length;
        if(parentFdControlElement.childNodes.length == 0){
          parentFdControlElement.appendChild(textNode); // first child, just append to parent
        } else {
          var divNode = document.createElement('div');
          divNode.appendChild(textNode);
          parentFdControlElement.insertAdjacentElement('beforeend', divNode);
          insertedLength++; // for the new div
        }
      }
    } else {
      var currNode = node;
      currNode.nodeValue = startTxt;
      textComponents.forEach(txtComponent => {
        if(txtComponent){
          if (currNode.tagName == 'BR') { //replace BR with new text node
            var parentDiv = currNode.parentElement;
            var brNode = currNode;
            var textNode = document.createTextNode(txtComponent);
            parentDiv.removeChild(brNode);
            parentDiv.appendChild(textNode);         
            insertedLength += txtComponent.length
          } else if(currNode.nodeValue){
            currNode.nodeValue += txtComponent;
            insertedLength += txtComponent.length;
          } else {
            insertedLength++; // for the new div
            var divNode = document.createElement('div');
            var textNode = document.createTextNode(txtComponent);
            divNode.appendChild(textNode);
            currNode = fdWebExtension.fdInsertNodeAfterReferenceInParent(parentFdControlElement, divNode, currNode);
            insertedLength += txtComponent.length;
          }
        } else {
          insertedLength++; // for the new break element
          var divNode = document.createElement('div');
          var breakNode = document.createElement('br');
          divNode.appendChild(breakNode);
          currNode = fdWebExtension.fdInsertNodeAfterReferenceInParent(parentFdControlElement, divNode, currNode);
        }
      });
      
      if(endTxt){
        if(currNode && currNode.firstChild && currNode.firstChild.nodeType == Node.TEXT_NODE){
          currNode.firstChild.nodeValue += endTxt;
        } else {
          if(currNode.innerHTML == '<br>'){
            fdWebExtension.fdReplaceBreakNodeWithText(currNode.firstChild, endTxt);
          } else {
            var divNode = document.createElement('div');
            var textNode = document.createTextNode(endTxt);
            divNode.appendChild(textNode);
            currNode = fdWebExtension.fdInsertNodeAfterReferenceInParent(parentFdControlElement, divNode, currNode);  
          }
        }
      }
    }

    return insertedLength;
  }
}

if(!fdWebExtension.fdIsGivenElementActiveElement){
  fdWebExtension.fdIsGivenElementActiveElement = function(textControlEl){
    if(textControlEl === undefined){
      return false;
    }

    if(fdWebExtension.getActiveElement() == textControlEl){
      return true;
    }

    return false;
  }
}

if(!fdWebExtension.fdTargetedElementFocusOut){
  fdWebExtension.fdTargetedElementFocusOut = function(evt){
    var targetEl = fdWebExtension.fdSetTargetElement;
    if (!targetEl) return;

    if (fdWebExtension.fdIsInputOrTextArea(targetEl)) {
      fdWebExtension.fdLastKnownCaretPos = {start: targetEl.selectionStart, end: targetEl.selectionEnd};
    } else {
      var info = {};
      fdWebExtension.fdGetContentEditableElementInfo(targetEl, info, 0);
      fdWebExtension.fdLastKnownCaretPos = {start: info.selStart, end: info.selEnd};
    }
  }
}

if(!fdWebExtension.fdInsertTextInOutOfFocusElement){
  fdWebExtension.fdInsertTextInOutOfFocusElement = function(text, textControlElement){
    try{
      if(fdWebExtension.fdIsInputOrTextArea(textControlElement)){
        var selStart = textControlElement.selectionStart;
        var selEnd = textControlElement.selectionEnd;
        textControlElement.setRangeText(text, selStart, selEnd, 'end');
      } else {
        if(fdWebExtension.fdLastKnownCaretPos){
          var insertedLength = fdWebExtension.fdInsertAtDivLocation(
            textControlElement,
            fdWebExtension.fdLastKnownCaretPos.start,
            fdWebExtension.fdLastKnownCaretPos.end,
            text
          );
          if(insertedLength){
            fdWebExtension.fdLastKnownCaretPos = {
              start: fdWebExtension.fdLastKnownCaretPos.start + insertedLength,
              end: fdWebExtension.fdLastKnownCaretPos.start + insertedLength
            };
          }
        }
      }
    }catch(e) { 
      fdWebExtension.fdLog(`error inserting text out of focus ${e.message}`);
    }
  }
}

// End section for edit div-when-not-in-focus

if(!fdWebExtension.fdInsertTextInEditableDivInSingleDivMode)
{
  fdWebExtension.fdInsertTextInEditableDivInSingleDivMode = function(text)
  {
    var mainWindow = fdWebExtension.fdGetMainWindow();
    var sel = mainWindow.getSelection();
    var lines = text.split("\n");
    var first = true;
    if (!sel.getRangeAt || !sel.rangeCount){
      return;
    }

    var range = sel.getRangeAt(0);
    range.deleteContents();
    lines.forEach((line) => {
      if(first)
      {
        first = false;
      }
      else
      {
        var brEl = document.createElement("br");
        range.insertNode(brEl);
        range.collapse(false);
        //ZWSP is needed after a BR in order to be able to move the cursor after the BR
        var zwsp = document.createTextNode("\u200B"); 
        range.insertNode(zwsp);
        range.collapse(false);
      }
      if(line.length > 0)
      {
        var textNode = document.createTextNode(line);
        range.insertNode(textNode);
        range.collapse(false);
      }
    });

    sel.removeAllRanges();
    sel.addRange(range);
  }
}

if (!fdWebExtension.fdCache) {
  fdWebExtension.fdCache = {};
}

// Target control request tracking
if (!fdWebExtension.fdRequestedTargetControlId) {
  fdWebExtension.fdRequestedTargetControlId = null;
  fdWebExtension.fdTargetRequestTimestamp = 0;
}

// Create functions necessary for script to connect to and disconnect from FD.
// Also, create functions to support message handling.
if (!fdWebExtension.fdConnect) {
  fdWebExtension.fdDefaultPort = 2020;
  fdWebExtension.fdPortMin = 2020;
  fdWebExtension.fdPortMax = 2048;
  fdWebExtension.fdTryAllPortsEnabled = false;
  fdWebExtension.fdEmbeddedConnectionMode = false;
  fdWebExtension.fdWebSocket = null;
  fdWebExtension.fdActive = false; //Flag for active tab

  fdWebExtension.fdSocketsOpen = [];

  fdWebExtension.fdConnect = function() {
    if (fdWebExtension.fdPort === undefined) {
      //console.debug("fdPort not defined yet, can't connect");
      return;
    }

    fdWebExtension.fdAttachFocusListeners(window.document);
    if(!window.MSpeechAPI) {
      fdWebExtension.fdObserveMutations(window.document);
    }
    fdWebExtension.fdActive = true;
    fdWebExtension.fdReconnect();
  };

  fdWebExtension.fdEmbeddedConnect = function()
  {
    fdWebExtension.fdInitializeApi();
    fdWebExtension.fdPort = fdWebExtension.fdDefaultPort;
    fdWebExtension.fdEmbeddedConnectionMode = true;
    fdWebExtension.fdConnect();
  }

  fdWebExtension.fdDisconnect = function() {
    console.debug("fdDisconnect - Tab no longer active");
    fdWebExtension.fdActive = false;
    fdWebExtension.fdDisconnectSocket();
    fdWebExtension.fdDisconnectNative();
    fdWebExtension.fdConnected = false;

    window.removeEventListener('focus', fdWebExtension.fdFocusListener, false);

    // cleanup listeners
    [].forEach.call(window.document.querySelectorAll('input'), function(el) {
      if ((el.type == 'text' || el.type == 'search') && el.className != 'textBoxNode') {
        fdWebExtension.fdRemoveFocusListeners(el);
      }
    });
    [].forEach.call(window.document.querySelectorAll('textarea'), function(el) {
      fdWebExtension.fdRemoveFocusListeners(el);
    });
    [].forEach.call(window.document.querySelectorAll('[contenteditable]'), function(el) {
      if (el.isContentEditable) {
        fdWebExtension.fdRemoveFocusListeners(el);
      }
    });
    [].forEach.call(window.document.querySelectorAll('iframe'), function(el) {
      if (el.contentDocument) {
        el.contentDocument.removeEventListener(
          'DOMContentLoaded',
          fdWebExtension.fdDOMContentLoadedEventListener,
          false,
        );
      }
    });

    if (window.MSpeechAPI) {
      // stop listening for MEditor changes...
      if (fdWebExtension.fdHandleMSpeechApiCustomEvent) {
        window.removeEventListener(
          'MSpeechAPI',
          fdWebExtension.fdHandleMSpeechApiCustomEvent,
          false,
        );
      }
    }

    // clear out current grammar. disconnects on the FD side will clear FD grammar
    // and we can conceivably reconnect quickly here
    if(fdWebExtension.fdCurrentGrammar){
      fdWebExtension.fdCurrentGrammar = '';
    }
  }

  fdWebExtension.fdDisconnectNative = function () {
    fdWebExtension.fdLog('fdDisconnectNative - closing native connection');

    fdWebExtension.sendNativeMsg(
      JSON.stringify({
        msg: 'NativeDisconnect',
        fdTabId: fdWebExtension.fdGuid()
      }));

    if (fdWebExtension.nativeConnected) {
      fdWebExtension.nativeConnected = false;
      console.info("FD disconnected (Native)");   
    }
  };

  fdWebExtension.fdDisconnectSocket = function () {
    if (!fdWebExtension.fdWebSocket) return;
    
    fdWebExtension.fdLog('fdDisconnectSocket - closing WebSocket');

    fdWebExtension.fdWebSocket.close();
    fdWebExtension.fdWebSocket = null;
    console.info("FD disconnected (Socket)");
  };


  fdWebExtension.fdBlurListener = function(event) {
    // this is what I think we want. Blur is called when we lose focus. So,
    // if focus is moved from one text field to another, don't push a change.
    // let the focus listener handle that.
    // But, if we move from a text field, to a non-text field, push then
    if (
      event.relatedTarget == null ||
      (!fdWebExtension.fdIsTextInputOrTextArea(event.relatedTarget) &&
        !fdWebExtension.fdIsContentEditableEl(event.relatedTarget))
    ) {
      fdWebExtension.fdHandleFocusChange();
    }
    return;
  };

  fdWebExtension.fdFocusListener = function() {
    fdWebExtension.fdHandleFocusChange();
  };

  fdWebExtension.fdHandleFocusChange = function() {
    if (fdWebExtension.fdConnected) {
      if(fdWebExtension.fdEmbeddedConnectionMode)
      {
        fdWebExtension.fdPushTabUpdate();
      }
      else
      {
        fdWebExtension.fdPushFocusChange();
      }
    } else {
      fdWebExtension.fdReconnect();
    }
    return;
  };

  fdWebExtension.fdPushFocusChange = function() {
    var customResult = fdWebExtension.fdPushFocusChangeCustom
      ? fdWebExtension.fdPushFocusChangeCustom()
      : null;
    if (customResult && customResult === true) {
      return true;
    }
    return fdWebExtension.fdPushFocusChangeStandard();
  };

  fdWebExtension.fdPushFocusChangeStandard = function() {
    if (!fdWebExtension.fdConnected) {
      //console.debug("No socket connection, can't push focus change.")
      return false;
    }
    var result = fdWebExtension.fdGetFocusedControlId();

    if (!result.success) {
      fdWebExtension.fdLog(
        'Failed to get focus control id for focus change push: ' +
        result.errorMessage,
      );
      return false;
    }

    return fdWebExtension.fdPushFocusChangeBase(
      result.focusedControlId,
      'PushFocusedControlId',
      result.focusedControlDetails
    );
  };

  fdWebExtension.fdPushFocusChangeBase = function(focusId, msgType, focusedControlDetails = null) {
    var isAthena = false;
    if (window.AH) {
      isAthena = true;
      if (fdWebExtension.fdAthenaSlateJsAttachListeners) {
        fdWebExtension.fdAthenaSlateJsAttachListeners(window.document);
      }
    }

    var isOncoEMR = !!window.OncoEMR;
    var isSmartReports = fdWebExtension.isSmartReports();
    
    var tabAndFocusId = `${fdWebExtension.fdGetTabId().tabId}/${focusId}`;

    fdWebExtension.fdLog("fdPushFocusChange- pushing Id=" + tabAndFocusId);

    fdWebExtension.sendFdMsg(
      JSON.stringify({
        id: fdWebExtension.fdGuid(), // not really used for push based messages, but needed on server side??
        msg: msgType,
        focusedControlId: tabAndFocusId,
        focusedControlDetails: focusedControlDetails,
        isAthena: isAthena,
        isOncoEMR: isOncoEMR || isSmartReports,  // for backward compatibility. Both use draftJs.
        isSmartReports: isSmartReports,
      }),
    );

    return true;
  };
  
  if (!fdWebExtension.fdTargetControlElementInitialized) {
    // Handle requests made before the extension loaded
    var fdPresetTarget = undefined;
    if (fdWebExtension.hasOwnProperty('fdTargetControlElement')) {
      fdPresetTarget = fdWebExtension.fdTargetControlElement;
      delete fdWebExtension.fdTargetControlElement;
    }
    
    fdWebExtension.fdTargetControlElementInitialized = true;
    fdWebExtension.fdInternalTargetElement = null;

    Object.defineProperty(fdWebExtension, 'fdTargetControlElement', {
      get: function() {
        return fdWebExtension.fdInternalTargetElement;
      },
      set: function(element) {
        // Handle null/undefined as clear target
        if (!element) {
          fdWebExtension.fdInternalTargetElement = element;
          fdWebExtension.fdLog('fdTargetControlElement - clearing target');
          fdWebExtension.fdRequestedTargetControlId = null;
          fdWebExtension.fdTargetRequestTimestamp = Date.now();
          
          if (fdWebExtension.fdConnected) {
            fdWebExtension.sendTargetControlRequest();
          }
          return;
        }
        
        // Setting an element as target
        if (!(element instanceof Element)) {
          fdWebExtension.fdLog('fdTargetControlElement - invalid element provided, must be an Element or null/undefined');
          return;
        }
        
        fdWebExtension.fdInternalTargetElement = element;
        
        // Ensure element has unique control ID
        fdWebExtension.fdSetUniqueId(element);
        
        var controlId = element.getAttribute(fdWebExtension.fdControlIdAttribute);
        
        if (!controlId) {
          fdWebExtension.fdLog('fdTargetControlElement - failed to get control ID from element');
          return;
        }
        
        fdWebExtension.fdRequestedTargetControlId = controlId;
        fdWebExtension.fdTargetRequestTimestamp = Date.now();
        
        fdWebExtension.fdLog('fdTargetControlElement - set controlId=' + controlId + ' timestamp=' + fdWebExtension.fdTargetRequestTimestamp);

        if (fdWebExtension.fdConnected) {
          fdWebExtension.sendTargetControlRequest();
        }
      },
      enumerable: true,
      configurable: false
    });
  
    if (fdPresetTarget !== undefined) {
      fdWebExtension.fdLog('fdTargetControlElement - found pre-set value, applying now');
      fdWebExtension.fdTargetControlElement = fdPresetTarget;
    }
  }

  fdWebExtension.fdTryOpenPort = function(port) {
    if (fdWebExtension.fdSocketsOpen.includes(port)) {
      //console.debug("fdTryOpenPort - Not attempting to connect to port " + port + " since it's still open");
      return;
    }

    //Native Messaging unavailable for integrators who just embed this script. Use unsecure sockets directly instead.
    var protocol = fdWebExtension.fdEmbeddedConnectionMode ? "ws" : "wss";
    var clientUrl = window.location.toString();
    var url = `${protocol}://127.0.0.1:${port}/?version=${fdWebExtension.fdExtensionVersion}&clientUrl=${encodeURIComponent(clientUrl)}`;

    //console.debug("Try port: " + port + "");
    var ws = new WebSocket(url);
    fdWebExtension.fdSocketsOpen.push(port);

    ws.onopen = fdWebExtension.fdOnSocketOpenCallback(ws, port);
    ws.onclose = fdWebExtension.fdOnSocketCloseCallback(ws, port);
    ws.onmessage = fdWebExtension.fdOnSocketMessageCallback(ws, port);
  };

  fdWebExtension.fdReconnect = function(tryAllPorts = false){
    if (fdWebExtension.fdExtensionVersion == 'Unknown') {
      return; //can't connect yet
    }

    if (fdWebExtension.useNativeMessaging) {
      fdWebExtension.fdReconnectNative();
    } else {
      fdWebExtension.fdReconnectWebSocket(tryAllPorts);
    }
  };

  fdWebExtension.fdReconnectNative = function () {
    //console.log("fdReconnectNative - ver=" + fdWebExtension.fdExtensionVersion);
    if (fdWebExtension.fdWebSocket != null) {
      console.log("fdReconnectNative - Forcing socket disconnect"); //should never happen
      fdWebExtension.fdDisconnectSocket();
    }

    var clientUrl = window.location.toString();

    fdWebExtension.sendNativeMsg(
      JSON.stringify({
        msg: 'NativeConnect',
        fdTabId: fdWebExtension.fdGetTabId().tabId,
        version: fdWebExtension.fdExtensionVersion,
        additionalQueryString: `clientUrl=${encodeURIComponent(clientUrl)}`
      }));
  }

  fdWebExtension.fdReconnectWebSocket = function (tryAllPorts) {
    if (fdWebExtension.fdWebSocket) {
      //console.debug("fdReconnectWebSocket - Already connected");
      return;
    } else if (!fdWebExtension.fdActive) {
      //console.debug("fdReconnectWebSocket - Tab is not active");
      return;
    }

    //console.debug("fdReconnectWebSocket - Attempting to connect");

    // tryAllPorts should usually be false, so we only try to
    // open the last successful port, except when this fails.
    if (!tryAllPorts) {
      fdWebExtension.fdTryAllPortsEnabled = true;
      fdWebExtension.fdTryOpenPort(fdWebExtension.fdPort);
      return;
    }

    // We get here from the onclose handler when the last successful port
    // fails to open. Skip it now, or we'll enter an infinite loop.
    if(!fdWebExtension.fdTryAllPortsEnabled)
    {
      return;
    }

    fdWebExtension.fdTryAllPortsEnabled = false;

    for (
      var port = fdWebExtension.fdPortMin;
      port < fdWebExtension.fdPortMax;
      port++
    ) {

      if (port === fdWebExtension.fdPort) {
        continue;
      }

      //Alternate between all ports and selected port
      fdWebExtension.fdTryOpenPort(port);
      fdWebExtension.fdTryOpenPort(fdWebExtension.fdPort);
    }
  };

  fdWebExtension.fdOnNativeConnected = function (port) {
    console.info("FD connected (Native)");
    fdWebExtension.nativeConnected = true
    fdWebExtension.fdConnected = true;

    fdWebExtension.fdLog(
      'Connected to FdExtension (Native), version: ' +
      fdWebExtension.fdExtensionVersion +
      ' port: ' +
      port,
      true,
    );

    fdWebExtension.fdInitializeApi();
    fdWebExtension.checkIfTabActive();
    fdWebExtension.sendTargetControlRequest();
  };

  fdWebExtension.fdOnSocketOpenCallback = function (socket, port) {
    return function (evt) {
      console.info("Socket open:" + port);
      fdWebExtension.fdInitializeApi();
      //console.info("onOpenCallback - A connection on port " + port + " has been made");
    };
  };

  fdWebExtension.fdOnSocketMessageCallback = function(socket, port) {
    return function (evt) {
      if (!fdWebExtension.fdActive) {
        //console.debug("onMessageCallback - Tab is no longer active.  Closing web socket on port " + port + "...");
        socket.close();
        return;
      }

      if (fdWebExtension.useNativeMessaging) {
         console.info("Closing socket on port " + port + " in favour of native messaging");
         socket.close();
         return;
      }

      try {
        var obj = JSON.parse(evt.data);
        if (!obj || !obj.msg) {
          fdWebExtension.fdLog('onSocketMessageCallback - unknown message format');
          return;
        }

        if (!fdWebExtension.fdWebSocket) {
          if (obj.msg == 'FDPortAvailable') {
            //console.info("fdOnSocketMessageCallback - FDPortAvailable " + obj.fdPort);
            fdWebExtension.fdPort = obj.fdPort;
            fdWebExtension.saveToStorage('fdWebExtension.fdPort', obj.fdPort);
            fdWebExtension.fdReconnectWebSocket(false);
            return;
          } else {
            //console.info("fdOnSocketMessageCallback - Connected on port " + port);
            console.info("FD connected (WebSocket)");
            fdWebExtension.fdConnected = true;
            fdWebExtension.fdWebSocket = socket;
            fdWebExtension.fdPort = port;
            fdWebExtension.saveToStorage('fdWebExtension.fdPort', port);

            fdWebExtension.fdLog(
              'Connected to FdExtension, version: ' +
              fdWebExtension.fdExtensionVersion +
              ' port: ' +
              port,
              true,
            );

            fdWebExtension.checkIfTabActive();
            fdWebExtension.sendTargetControlRequest();
          }
        }
        fdWebExtension.fdOnMessageCallback(obj);
      } catch (ex) {
        fdWebExtension.fdLog('onSocketMessageCallback - ' + ex.stack);
      }
    };
  };

  fdWebExtension.sendFdMsg = function (msg, log=true) {

    if(log)
      fdWebExtension.fdLog(`sendFdMsg - msg='${msg}'`);

    if (fdWebExtension.useNativeMessaging) {
      fdWebExtension.sendNativeMsg(msg);
    } else {
      fdWebExtension.sendSocketMsg(msg);
    }
  };

  fdWebExtension.sendNativeMsg = function (fdMsg) {
    //console.log("fdWebExtension.sendNativeMsg:" + JSON.stringify(fdMsg));
    var msgEvent = new CustomEvent('fdWebExtension.sendNativeMsg', {
      detail: { msg: fdMsg }
    });
    document.dispatchEvent(msgEvent);
  };

  if (!fdWebExtension.sendSocketMsg) {
    fdWebExtension.sendSocketMsg = function (fdMsg) {
      if (fdWebExtension.fdWebSocket) {
        fdWebExtension.fdWebSocket.send(fdMsg);
      }
    };
  }

  fdWebExtension.checkIfTabActive = function (obj) {
    // background.js will send us a pushUpdatedTabInfo in response if we're the active tab
    var checkIfTabActiveEvent = new CustomEvent('fdWebExtension.CheckIfTabActive', {
      detail: JSON.stringify({ check: true })
    });

    if(fdWebExtension.fdEmbeddedConnectionMode)
    {
      fdWebExtension.fdPushTabUpdate();
    }
    else 
    {
      var checkIfTabActiveEvent = new CustomEvent('fdWebExtension.CheckIfTabActive', {
        detail: JSON.stringify({check: true})
      });
      document.dispatchEvent(checkIfTabActiveEvent);
    }
  };

  fdWebExtension.fdOnMessageCallback = function (obj) {
    try {
      // FD polling code that sends messages will result in log spam
      // So give FD a way to disable logging per message
      if (obj.disableLogging) {
        fdWebExtension.fdDisableLoggingForMessage = true;
      }

      if (obj.tabId && obj.tabId != fdWebExtension.fdTabId) {
        fdWebExtension.sendFdMsg(
          JSON.stringify({
            id: obj.id,
            msg: obj.msg,
            result: {
              success: false,
              errorMessage:
                'target tabId={' +
                obj.tabId +
                '}; current tabId={' +
                fdWebExtension.fdTabId +
                '}',
            },
          }),
        );
        return;
      }

      fdWebExtension.fdLog(`onMessageCallback - handling func='${obj.msg}' msg='${JSON.stringify(obj).replace(/\n/g, '\\n')}'`);

      for (var i = 0; i < fdWebExtension.fdMessageHandlers.length; i++) {
        var startTime = Date.now();
        var handled = fdWebExtension.fdMessageHandlers[i].messageHandler(obj);
        if (handled) {
          var stopTime = Date.now();
          fdWebExtension.fdLog(
            'fdWebSocket - finished handling msg=' +
            obj.msg +
            ' messageHandler=' +
            fdWebExtension.fdMessageHandlers[i].id +
            ' execTime=' +
            (stopTime - startTime) +
            'ms',
          );
          fdWebExtension.fdDisableLoggingForMessage = false;
          return;
        }
      }
    } catch (ex) {
      fdWebExtension.fdLog('onMessageCallback - ' + ex.stack);
    }

    fdWebExtension.fdLog('onMessageCallback - message was not handled');

    fdWebExtension.fdDisableLoggingForMessage = false;
  };

  fdWebExtension.sendTargetControlRequest = function () {
    if (fdWebExtension.fdTargetRequestTimestamp == 0) {
      return;
    }

    if (!fdWebExtension.fdExtensionConfig.isSetTargetRequestAvailable) {
      if (!fdWebExtension.fdExtensionConfigured) {
        fdWebExtension.fdLog('sendTargetControlRequest - deferring target control request until configuration is received');
      } else {
        fdWebExtension.fdLog('sendTargetControlRequest - set and clear target requests not available in current FD version');
      }
      return;
    }

    var controlId = fdWebExtension.fdRequestedTargetControlId;
    var timestamp = fdWebExtension.fdTargetRequestTimestamp;

    fdWebExtension.fdLog('sendTargetControlRequest - controlId=' + controlId + ' timestamp=' + timestamp);

    if (controlId) {
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: fdWebExtension.fdGuid(),
          msg: 'SetTargetControl',
          targetControlId: controlId,
          pageTitle: document.title,
          timestamp: timestamp,
        })
      );
    } else {
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: fdWebExtension.fdGuid(),
          msg: 'ClearTargetControl',
          timestamp: timestamp,
        })
      );
    }
  }

  fdWebExtension.fdOnSocketCloseCallback = function(socket, port) {
    return function () {
      var openSocketIndex = fdWebExtension.fdSocketsOpen.indexOf(port);
      if (openSocketIndex >= 0) {
        fdWebExtension.fdSocketsOpen.splice(openSocketIndex, 1);
      }

      //console.info("onCloseCallback - Disconnected from port " + port);
      if (port === fdWebExtension.fdPort) {
        if (fdWebExtension.fdWebSocket == null) {
          // tried the last good port, now try entire range
          // but keep last good port set for next time
          fdWebExtension.fdReconnectWebSocket(true);
        } else {
          fdWebExtension.fdWebSocket = null;
          console.info("FD disconnected (WebSocket closed)");
          fdWebExtension.determineIfConnected();
        }
      }
    };
  };

  fdWebExtension.fdOnNativeDisconnected = function (port) {
    console.info("FD disconnected (Native connection closed)");
    fdWebExtension.fdLog('fdOnNativeDisconnected - ');
    fdWebExtension.nativeConnected = false
    fdWebExtension.determineIfConnected();
  };

  fdWebExtension.determineIfConnected = function (port) {
    fdWebExtension.fdConnected = fdWebExtension.nativeConnected || fdWebExtension.fdWebSocket != null;
    fdWebExtension.fdLog('determineIfConnected - ' + fdWebExtension.fdConnected);
  };

  // messageHandler takes a message object and if the message is handled should return true else false
  // so if false is returned, then other message handlers will get the oppurtunity to handle the message
  fdWebExtension.fdMessageHandlers = [];
  fdWebExtension.fdAddMessageHandler = function(id, messageHandler) {
    fdWebExtension.fdMessageHandlers.push({
      id: id,
      messageHandler: messageHandler,
    });
  };

  fdWebExtension.fdGuid = function() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16),
    );
  };

  fdWebExtension.fdAddMessageHandler('ConfigureExtensionHandler', function(
    obj,
  ) {
    if (obj.msg == 'ConfigureExtension') {
      fdWebExtension.fdConfigureExtension(obj);

      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: true,
            errorMessage: '',
          },
        }),
      );

      fdWebExtension.sendTargetControlRequest();

      return true;
    }

    return false;
  });

  fdWebExtension.fdAddMessageHandler('NativeMessagingHandler', function (
    obj,
  ) {
    if (!fdWebExtension.useNativeMessaging) {
      return false;
    }

    if (obj.msg == 'NativeConnected' && obj.fdTabId == fdWebExtension.fdTabId) {
      fdWebExtension.fdOnNativeConnected(obj.port);
      return true;
    }

    if (obj.msg == 'NativeDisconnected' && obj.fdTabId == fdWebExtension.fdTabId) {
      fdWebExtension.fdOnNativeDisconnected();
      return true;
    }

    return false;
  });
}

if(!fdWebExtension.fdSetUniqueId)
{
  fdWebExtension.fdControlIdAttribute = 'data-fd-control-id';

  fdWebExtension.fdSetUniqueId = function(element)
  {
    try {
      var controlId = element.getAttribute(fdWebExtension.fdControlIdAttribute);
      if(controlId) //Check if the ID is 36 characters (GUID) so that we overwrite old IDs
      {
        if(controlId.length == 36)
        {
          return;
        }
        else
        {
          fdWebExtension.fdLog(`Found old controlId format = ${controlId}`);
        }
      }

      element.setAttribute(fdWebExtension.fdControlIdAttribute, fdWebExtension.fdGuid());
    }
    catch(ex)
    {
      fdWebExtension.fdLog(`fdSetUniqueId - error setting ID: ${ex}`)
    }
  }
}

//Custom functions
//Check for legacy functions
if (typeof fdGetGrammar !== 'undefined') {
  fdWebExtension.fdGetGrammar = fdGetGrammar;
}
if (typeof fdExecuteCommand !== 'undefined') {
  fdWebExtension.fdExecuteCommand = fdExecuteCommand;
}
if (typeof fdGetUserId !== 'undefined') {
  fdWebExtension.fdGetUserId = fdGetUserId;
}

// Athena
// Create fdGetGrammar and fdExecuteCommand that wrap Athena's SpeechToText API
// that provides the ability to voice enable parts of the Athena UI.
// Create timer that polls Athena UI for contentEditable divs and sets role="text"
// attribute in order to get level 3 support.
if (window.AH) {
  fdWebExtension.fdLog('fdWebExtension - found Athena');

  if (window.SpeechToText) {
    fdWebExtension.fdLog('fdWebExtension - found Athena SpeechToText');

    fdWebExtension.fdGrammar = '';
    fdWebExtension.fdGrammarTimestamp = 0;

    if (!fdWebExtension.fdGetGrammar) {
      fdWebExtension.fdLog(
        'fdWebExtension - defining Athena grammar functions',
      );

      fdWebExtension.fdGetGrammarLogLevel = 0;
      fdWebExtension.fdAthenaSpeechToText = undefined;
      fdWebExtension.fdGetGrammar = function() {
        if (!window.SpeechToText) {
          if (fdWebExtension.fdGetGrammarLogLevel == 0) {
            fdWebExtension.fdLog('fdGetGrammar - window.SpeechToText is null');
            fdWebExtension.fdGetGrammarLogLevel = 1;
          }
          fdWebExtension.fdGrammar = '';
          return fdWebExtension.fdGrammar;
        }

        var athenaGrammar = null;

        if (window.SpeechToText.V1_1) {
          athenaGrammar = window.SpeechToText.V1_1;
        }
        else if (window.SpeechToText.Versions)
        {
          if(window.SpeechToText.Versions.V1_1)
          {
            athenaGrammar = window.SpeechToText.Versions.V1_1.Core
          }
        }

        if(!athenaGrammar) {   
          if (fdWebExtension.fdGetGrammarLogLevel <= 1) {
            fdWebExtension.fdLog(
              'fdGetGrammar - window.SpeechToText.V1_1 & window.SpeechToText.Versions.V1_1 are null',
            );
            fdWebExtension.fdGetGrammarLogLevel = 2;
          }
          fdWebExtension.fdGrammar = '';
          return fdWebExtension.fdGrammar;
        }

        var canRetrieveGrammar = athenaGrammar.CanRetrieveGrammar();
        if (!canRetrieveGrammar) {
          if (fdWebExtension.fdGetGrammarLogLevel <= 2) {
            fdWebExtension.fdLog('fdGetGrammar - CanRetrieveGrammar=false');
            fdWebExtension.fdGetGrammarLogLevel = 3;
          }
          fdWebExtension.fdGrammar = '';
          return fdWebExtension.fdGrammar;
        }

        var isGrammarReady = athenaGrammar.IsGrammarReady(
          fdWebExtension.fdGrammarTimestamp,
          'JSGF',
        );
        if (!isGrammarReady) {
          if (fdWebExtension.fdGetGrammarLogLevel <= 3) {
            fdWebExtension.fdLog(
              'fdGetGrammar - IsGrammarReady(' +
              fdWebExtension.fdGrammarTimestamp +
              ')=false',
            );
            fdWebExtension.fdGetGrammarLogLevel = 4;
          }
          fdWebExtension.fdGrammar = '';
          return fdWebExtension.fdGrammar;
        }

        var getGrammarStr = athenaGrammar.GetGrammar('JSGF');
        var getGrammarObj = JSON.parse(getGrammarStr);
        if (
          !getGrammarObj ||
          !getGrammarObj.success ||
          getGrammarObj.data === undefined ||
          getGrammarObj.data.indexOf('not a supported grammar') > 0
        ) {
          if (fdWebExtension.fdGetGrammarLogLevel <= 4) {
            fdWebExtension.fdLog(
              'fdGetGrammar - GetGrammar failed - result=' + getGrammarStr,
            );
            fdWebExtension.fdGetGrammarLogLevel = 5;
          }
          fdWebExtension.fdGrammar = '';
          fdWebExtension.fdAthenaSpeechToText = undefined;
          return fdWebExtension.fdGrammar;
        }

        if (getGrammarObj.data) {
          fdWebExtension.fdGrammarTimestamp = getGrammarObj.timestamp;

          var grammar = getGrammarObj.data;
          grammar = grammar.replace(/(\r\n|\n|\r)/gm, ' ');
          grammar = grammar.replace(/ to/gm, ' (to | two | too | 2)');
          grammar = grammar.replace(
            / flowsheets/gm,
            ' (flowsheets | (flow sheets))',
          );
          grammar = grammar.replace(
            / flowsheet/gm,
            ' (flowsheet | (flow sheet))',
          );
          grammar = grammar.replace(
            / facesheet/gm,
            ' (facesheet | (face sheet))',
          );

          fdWebExtension.fdLog('fdGetGrammar - grammar=' + grammar);
          fdWebExtension.fdGetGrammarLogLevel = 0; //reset function's log level so errors can be logged again

          fdWebExtension.fdGrammar = grammar;
          fdWebExtension.fdAthenaSpeechToText = athenaGrammar;
          return fdWebExtension.fdGrammar;
        } else {
          // GetGrammar was successful, but grammar is empty
          // so use current grammar
          return fdWebExtension.fdGrammar;
        }
      };

      fdWebExtension.fdExecuteCommand = function(resultDetail) {
        fdWebExtension.fdLog(
          "fdExecuteCommand - value='" + resultDetail.$value + "'",
        );

        var resultValue = resultDetail.$value;
        resultValue = resultValue.replace(/ 2/gm, ' to');
        resultValue = resultValue.replace(/ too/gm, ' to');
        resultValue = resultValue.replace(/ two/gm, ' to');
        resultValue = resultValue.replace(/ flow sheets/gm, ' flowsheets');
        resultValue = resultValue.replace(/ flow sheet/gm, ' flowsheet');
        resultValue = resultValue.replace(/ face sheet/gm, ' facesheet');
        resultValue = resultValue.replace(/ tablet/gm, ' tab');
        resultValue = resultValue.replace(/ tablets/gm, ' tab');

        if(fdWebExtension.fdAthenaSpeechToText == undefined){
          fdWebExtension.fdLog('No Athena SpeechToText object set for grammar callback')
          return;
        }

        fdWebExtension.fdAthenaSpeechToText.Enter(resultValue);
      };
    }
  }

  if (!fdWebExtension.fdUpdateContentEditableDiv) {
    fdWebExtension.fdUpdateContentEditableDiv = function(divEl) {
      if (!divEl.isContentEditable) {
        return;
      }

      var role = divEl.getAttribute('role');
      if (role && role == 'textbox') {
        return;
      }

      fdWebExtension.fdLog(
        'fdUpdateContentEditableDiv - setting role=textbox on contentEditable div id=' +
        divEl.id,
      );

      divEl.setAttribute('role', 'textbox');
      // 'blur' is called when a field/item loses focus, 'focus' is called when
      // an item gains focus. So listen for both
      fdWebExtension.fdAddFocusListeners(divEl);
    };
  }

  if (!fdWebExtension.fdUpdateContentEditableDivsInFrame) {
    fdWebExtension.fdUpdateContentEditableDivsInFrame = function(frame) {
      var divEls = frame.document.getElementsByTagName('div');
      for (var i = 0; i < divEls.length; i++) {
        var divEl = divEls[i];
        fdWebExtension.fdUpdateContentEditableDiv(divEl);
      }

      for (var i = 0; i < frame.frames.length; i++) {
        fdWebExtension.fdUpdateContentEditableDivsInFrame(frame.frames[i]);
      }

      var textAreas = frame.document.getElementsByTagName('textarea');
      for (var i = 0; i < textAreas.length; i++){
        // 'blur' is called when a field/item loses focus, 'focus' is called when
        // an item gains focus. So listen for both
        var textArea = textAreas[i];
        if (textArea.getAttribute(fdWebExtension.fdControlIdAttribute))
          continue;

        fdWebExtension.fdSetUniqueId(textArea);
        fdWebExtension.fdAddFocusListeners(textArea);
      }

      var inputs = frame.document.getElementsByTagName('input');
      for (var i = 0; i < inputs.length; i++){
        // 'blur' is called when a field/item loses focus, 'focus' is called when
        // an item gains focus. So listen for both
        var input = inputs[i];
        if (input.getAttribute(fdWebExtension.fdControlIdAttribute))
          continue;

        fdWebExtension.fdSetUniqueId(input);
        fdWebExtension.fdAddFocusListeners(input);
      }
    };
  }

  if (!fdWebExtension.fdAthenaTimerId) {
    if (window.AH.Frames.Main) {
      fdWebExtension.fdLog(
        'fdWebExtension - found Athena main frame, creating Athena timer',
      );

      fdWebExtension.fdAthenaTimerId = window.setInterval(
        function(athenaMainFrame) {
          if (!athenaMainFrame.frame) {
            fdWebExtension.fdLog(
              'fdAthenaTimer - Athena main frame is not loaded yet',
            );
            return;
          }

          fdWebExtension.fdUpdateContentEditableDivsInFrame(athenaMainFrame.frame);
          fdWebExtension.fdAthenaSlateJsAttachListeners(window.document);
        },
        100,
        window.AH.Frames.Main,
      );
    }
  }

  if (!fdWebExtension.fdFindControlCustom) {
    fdWebExtension.fdFindControlCustom = function (controlId) {
      fdWebExtension.fdLog(`fdFindControlCustom - Athena slateJs find control custom ${controlId}`);
      mainWindow = fdWebExtension.fdGetMainWindow();
      if (mainWindow.UTAEditorCache) {
        try {
          var textControlEl = mainWindow.document.querySelector(
            '[' + fdWebExtension.fdControlIdAttribute + '="' + controlId + '"]',
          );
          if (textControlEl) {
            var editor = mainWindow.UTAEditorCache.get(textControlEl);
            if (!editor) {
              fdWebExtension.fdLog(`fdFindControlCustom - focused control is not a slateJs control. Control class: '${textControlEl.className}'`);
            }

            return editor;
          }
          else {
            fdWebExtension.fdAthenaSlateJsAttachListeners(window.document);
            fdWebExtension.fdLog(`fdFindControlCustom - ${fdWebExtension.fdControlIdAttribute}=${controlId} does not match any elements`);
            return null;
          }
        }
        catch (e) {
          fdWebExtension.fdLog(`fdWebExtension - fdFindControlCustom error ${e}`);
          return null;
        }
      }
      else {
        return null;
      }
    }
  }

  //Due to slateJs controls not loading until needed and resetting themselves whenever they lose
  //focus we must add the focus listeners every time there is a focus change while these controls
  //are loaded.
  if (!fdWebExtension.fdAthenaSlateJsAttachListeners) {
    fdWebExtension.fdAthenaSlateJsAttachListeners = function (doc) {
      [].forEach.call(doc.querySelectorAll("frame, iframe"), function (el) {
        if (el.contentDocument) {
          if (el.contentDocument.querySelector('.universal-text-area-container')) {
            [].forEach.call(el.contentDocument.querySelectorAll('.universal-text-area-container'), function (slateContainer) {
              if(!slateContainer.getAttribute("data-fdSlateListenerAttached"))
              {
                fdWebExtension.fdAddFocusListeners(slateContainer, true);
                slateContainer.setAttribute("data-fdSlateListenerAttached", "true");
              }
            })
          }
          else {
            fdWebExtension.fdAthenaSlateJsAttachListeners(el.contentDocument)
          }
        }
      })
    }
  }

  if (!fdWebExtension.fdGetSelectionCustom) {
    fdWebExtension.fdGetSelectionCustom = function (controlId) {
      fdWebExtension.fdLog('fdGetSelectionCustom - controlId=' + controlId);
      var editor = fdWebExtension.fdFindControlCustom(controlId);
      try {
        var selection = editor.getDocumentSelection();

        fdWebExtension.fdLog(
          'fdGetSelectionCustom - selStart=' +
          selection.start +
          ' selEnd=' +
          (selection.start + selection.length) +
          ' selLength=' +
          selection.length,
        );

        return {
          success: true,
          start: selection.start,
          end: selection.start + selection.length,
          length: selection.length,
        };
      }
      catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdGetSelectionCustom error ${e}`);
        return {
          success: false,
          errorMessage: `Exception fdGetSelectionCustom ${e}`
        }
      }
    }
  }

  if (!fdWebExtension.fdGetTextCustom) {
    fdWebExtension.fdGetTextCustom = function (controlId) {
      fdWebExtension.fdLog('fdGetTextCustom - controlId=' + controlId);
      try {
        var editor = fdWebExtension.fdFindControlCustom(controlId);
        var text = editor.getDocumentText();
        fdWebExtension.fdLog(
          "fdGetTextCustom - text='" + text.replace(/\n/g, '\\n') + "'",
        );

        return {
          success: true,
          text: text,
        };
      }
      catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdGetTextCustom error ${e}`);
        return {
          success: false,
          errorMessage: `Exception fdGetTextCustom ${e}`
        }
      }
    }
  }

  if (!fdWebExtension.fdGetTextLengthCustom) {
    fdWebExtension.fdGetTextLengthCustom = function (controlId) {
      fdWebExtension.fdLog('fdGetTextLengthCustom - controlId=' + controlId);
      try {
        var text = fdWebExtension.fdGetTextCustom(controlId).text;
        var textLength = text ? text.length : 0;
        fdWebExtension.fdLog('fdGetTextLengthCustom - textLength=' + textLength);
        return {
          success: true,
          textLength: textLength,
        };
      }
      catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdGetTextLengthCustom error ${e}`);
        return {
          success: false,
          errorMessage: `Exception fdGetTextLengthCustom ${e}`
        }
      }
    }
  }

  if (!fdWebExtension.fdSetSelectionCustom) {
    fdWebExtension.fdSetSelectionCustom = function (controlId, selStart, selEnd) {
      fdWebExtension.fdLog(
        'fdSetSelectionCustom - controlId=' +
        controlId +
        ' selStart=' +
        selStart +
        ' selEnd' +
        selEnd,
      );
      try {
        var editor = fdWebExtension.fdFindControlCustom(controlId);
        if (selEnd >= 0) {
          var selection = { start: selStart, length: selEnd - selStart };
          editor.setDocumentSelection(selection);
        }
        else {
          fdWebExtension.fdLog('fdSetSelectionCustom - select all text');
          editor.setDocumentSelection();
        }
        return { success: true };
      }
      catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdSetSelectionCustom error ${e}`);
        return {
          success: false,
          errorMessage: `Exception fdSetSelectionCustom ${e}`
        }
      }
    }
  }

  if (!fdWebExtension.fdInsertTextCustom) {
    fdWebExtension.fdInsertTextCustom = function (controlId, text) {
      fdWebExtension.fdLog(
        'fdInsertTextCustom - controlId=' +
        controlId +
        " text='" +
        text.replace(/\n/g, '\\n') +
        "'",
      );
      var editor = fdWebExtension.fdFindControlCustom(controlId);
      try {
        var selection = editor.getDocumentSelection();
        editor.setDocumentText(text, selection);
        fdWebExtension.fdLog(`fdInsertTextCustom - text inserted`);

        selection.length = 0;
        selection.start = selection.start + text.length;
        editor.setDocumentSelection(selection);

        return { success: true };
      }
      catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdInsertTextCustom error ${e}`);
        return {
          success: false,
          errorMessage: `Exception fdInsertTextCustom ${e}`
        }
      }
    }
  }

  if (!fdWebExtension.fdDeleteSelectionCustom) {
    fdWebExtension.fdDeleteSelectionCustom = function (controlId) {
      fdWebExtension.fdLog('fdDeleteSelectionCustom - controlId=' + controlId);
      try {
        var editor = fdWebExtension.fdFindControlCustom(controlId);
        var selection = editor.getDocumentSelection();
        editor.setDocumentText('', selection)
        return { success: true };
      }
      catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdDeleteSelectionCustom error ${e}`);
        return {
          success: false,
          errorMessage: `Exception fdDeleteSelectionCustom ${e}`
        }
      }
    }
  }

  if (!fdWebExtension.fdBoldSelectionCustom) {
    fdWebExtension.fdBoldSelectionCustom = function (controlId) {
      fdWebExtension.fdLog('fdBoldSelectionCustom - controlId=' + controlId);
      return {
        success: false,
        errorMessage: 'cannot bold text using Athena API',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdItalicizeSelectionCustom) {
    fdWebExtension.fdItalicizeSelectionCustom = function (controlId) {
      fdWebExtension.fdLog(
        'fdItalicizeSelectionCustom - controlId=' + controlId,
      );
      return {
        success: false,
        errorMessage: 'cannot italicize text using Athena API',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdCutSelectionCustom) {
    fdWebExtension.fdCutSelectionCustom = function (controlId) {
      fdWebExtension.fdLog('fdCutSelectionCustom - controlId=' + controlId);
      return {
        success: false,
        errorMessage: 'cannot cut text using Athena API',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdCopySelectionCustom) {
    fdWebExtension.fdCopySelectionCustom = function (controlId) {
      fdWebExtension.fdLog('fdCopySelectionCustom - controlId=' + controlId);
      return {
        success: false,
        errorMessage: 'cannot copy text using Athena API',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdPasteSelectionCustom) {
    fdWebExtension.fdPasteSelectionCustom = function (controlId) {
      fdWebExtension.fdLog('fdPasteSelectionCustom - controlId=' + controlId);
      return {
        success: false,
        errorMessage: 'cannot paste text using Athena API',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdUndoCustom) {
    fdWebExtension.fdUndoCustom = function (controlId) {
      fdWebExtension.fdLog('fdUndoCustom - controlId=' + controlId);
      return {
        success: false,
        errorMessage: 'cannot undo using Athena API',
        supported: true,
        sendKeysFromFD: true,
      };
    }
  }
}

if (!fdWebExtension.fdGetFocusedControlIdStandard) {
  fdWebExtension.fdGetMainWindow = function(frame) {
    var mainWindow = frame ? frame.contentWindow : window;

    try
    {
      var bodyId = window.document.body.getAttribute(fdWebExtension.fdControlIdAttribute);
      fdWebExtension.fdLog('fdGetMainWindow - document bodyId="' + bodyId  + '"');
    }
    catch {}

    if (!mainWindow.document.activeElement) {
      return mainWindow;
    } else if (!mainWindow.document.activeElement.contentDocument) {
      return mainWindow;
    } else {
      return fdWebExtension.fdGetMainWindow(mainWindow.document.activeElement);
    }
  };

  fdWebExtension.getPathTo = function(element)
  {
    if(!fdWebExtension.fdExtensionConfig.enableLogging)
      return "";

    if (element.id!=='')
      return "//*[@id='" + element.id + "']";

    if (element.tagName == 'HTML')
      return '/HTML[1]';

    if (element===document.body)
      return '/HTML[1]/BODY[1]';

    var twinIndex = 1;
    var siblings= element.parentNode.childNodes;
    for (var i= 0; i<siblings.length; i++)
    {
      var sibling = siblings[i];
      if (sibling===element)
        return fdWebExtension.getPathTo(element.parentNode) + '/' + element.tagName + '[' + twinIndex + ']';

      if (sibling.nodeType===1 && sibling.tagName===element.tagName)
        twinIndex++;
    }
  }

  fdWebExtension.getActiveElement = function(mainWindow)
  {
    var activeElement = mainWindow ? mainWindow.document.activeElement : fdWebExtension.fdGetMainWindow().document.activeElement;
    
    while (activeElement && activeElement.shadowRoot) {
      activeElement = activeElement.shadowRoot.activeElement;
    }
    return activeElement;
  }

  fdWebExtension.getActiveElementAndPath = function(mainWindow)
  {
    var activeElement = mainWindow ? mainWindow.document.activeElement : fdWebExtension.fdGetMainWindow().document.activeElement;
    var elementPath = fdWebExtension.getPathTo(activeElement);
    
    while (activeElement && activeElement.shadowRoot) {
      activeElement = activeElement.shadowRoot.activeElement;
      elementPath = elementPath + '/shadowRoot' + fdWebExtension.getPathTo(activeElement);
    }
    return [activeElement, elementPath];
  }

  fdWebExtension.fdGetSelectionRoot = function(element) {
    if (!element) {
      return null;
    }

    try {
      if (typeof element.getRootNode === 'function') {
        return element.getRootNode();
      }
    } catch (_) {}

    return element.ownerDocument || null;
  }

  fdWebExtension.fdGetSelectionForElement = function(element) {
    var selectionRoot = fdWebExtension.fdGetSelectionRoot(element);
    if (selectionRoot && typeof selectionRoot.getSelection === 'function') {
      return selectionRoot.getSelection();
    }

    var ownerDocument = element ? element.ownerDocument : null;
    if (ownerDocument && typeof ownerDocument.getSelection === 'function') {
      return ownerDocument.getSelection();
    }

    var mainWindow = fdWebExtension.fdGetMainWindow();
    return mainWindow ? mainWindow.getSelection() : null;
  }

  fdWebExtension.displayFocusDebugLabel = function(text)
  {
    var existingElement = document.getElementById("fdweb-debug-label")

    if(existingElement == undefined)
    {
      var newElement = document.createElement("div");
      newElement.id = "fdweb-debug-label";
      newElement.style.position = "fixed";
      newElement.style.top = 0;
      newElement.style.right = 0;
      newElement.style.backgroundColor = "white";
      newElement.style.color = "black";
      newElement.style.borderWidth = "2px 5px";
      newElement.style.borderColor = "grey";
      newElement.style.borderStyle = "solid";
      newElement.style.padding = "2px";
      newElement.innerText = text;

      document.body.appendChild(newElement);
    }
    else
    {
      existingElement.innerText = text;
    }
  }

  fdWebExtension.fdIsTextInputOrTextArea = function(el) {
    fdWebExtension.fdLog('fdIsTextInputOrTextArea - TagName=' + el.tagName + ' type=' + el.type + ' className=' + el.className);
    return (
      el.tagName == 'TEXTAREA' ||
      (el.tagName == 'INPUT' && (el.type == 'text' || el.type == 'search'))
    ) && el.className != 'textBoxNode';
  };

  fdWebExtension.fdIsContentEditableEl = function(el) {
    return el.isContentEditable;
  };

  fdWebExtension.fdIsInputOrTextArea = function(el)
  {
    return el.nodeName.toLowerCase() == "input" || el.nodeName.toLowerCase() == "textarea";
  };

  fdWebExtension.fdUseSendKeysForInsertingText = function (el) {
    return fdWebExtension.fdExtensionConfig.fieldTypesToUseSendKeysForInsertingText.indexOf(el.className) >= 0;
  };

  fdWebExtension.fdGetFocusedControlIdStandard = function() {
    const [activeElement, elementPath] = fdWebExtension.getActiveElementAndPath();    
    if (!activeElement) {
      fdWebExtension.fdLog('fdGetFocusedControlIdStandard - no active element');
      return {
        success: true,
        focusedControlId: null,
      };
    }

    fdWebExtension.fdSetUniqueId(activeElement);
    fdWebExtension.lastFocusedControl = activeElement;

    if(fdWebExtension.fdExtensionConfig.focusDebugMod)
    {
      activeElement.style.borderWidth = "5px";
      activeElement.style.borderColor = "green";
      activeElement.style.borderStyle = "solid";
      activeElement.style.backgroundColor = "rgba(245, 241, 39, 0.5)";

      fdWebExtension.displayFocusDebugLabel(elementPath);
    }

    if(fdWebExtension.fdExtensionConfig.logFocusedControlHtml)
    {
      fdWebExtension.fdLog(`fdGetFocusedControlIdStandard - focused control HTML - tag='${activeElement.tagName}' path='${elementPath}' outerHTML:\n${activeElement.outerHTML}`);
    }

    var isStandardTextControl =
      fdWebExtension.fdIsTextInputOrTextArea(activeElement) ||
      fdWebExtension.fdIsContentEditableEl(activeElement);
    if (!isStandardTextControl) {
      fdWebExtension.fdLog(
        "fdGetFocusedControlIdStandard - id='" +
        activeElement.id +
        "' tagName='" +
        activeElement.tagName +
        "' " + fdWebExtension.fdControlIdAttribute + "='" +
        activeElement.getAttribute(fdWebExtension.fdControlIdAttribute) +
        "' path='" +
        elementPath +
        "' isContentEditable=" +
        activeElement.isContentEditable +
        ' is not a text control',
      );

      return {
        success: true,
        focusedControlId: null,
      };
    }

    var overrideInsertionMethod = fdWebExtension.fdUseSendKeysForInsertingText(activeElement) ? "AutoIt" : null;

    fdWebExtension.fdLog(
      `fdGetFocusedControlIdStandard - id='${activeElement.id}'` +
      ` ${fdWebExtension.fdControlIdAttribute}='${activeElement.getAttribute(fdWebExtension.fdControlIdAttribute)}'` +
      ` tagName='${activeElement.tagName}'` +
      ` path='${elementPath}'` +
      ` isContentEditable=${activeElement.isContentEditable}` +
      ` class='${activeElement.className}'` +
      ` overrideInsertionMethod=${overrideInsertionMethod}`
    );

    // for using FD's correction window with Athena, see comments in FD-13659
    if (window.AH) {
      try {
        var greatGrandParentEl =
          activeElement.parentElement.parentElement.parentElement;
        fdWebExtension.fdCache[
          'greatGrandParentElementOfCorrectionWindowElement'
        ] = greatGrandParentEl;
        fdWebExtension.fdCache['correctionWindowElementText'] =
          activeElement.textContent;
      } catch (error) {}
    }

    var elementDetails = {};
    elementDetails.id = activeElement.id;
    elementDetails.tagName = activeElement.tagName;
    elementDetails.className = activeElement.className;
    elementDetails.xPath = elementPath;
    elementDetails.isContentEditable = activeElement.isContentEditable;
    elementDetails.pageURL = window.location.href;

    return {
      success: true,
      focusedControlId: activeElement.getAttribute(fdWebExtension.fdControlIdAttribute),
      focusedControlDetails: fdWebExtension.fdIsOnWin ? elementDetails : null,
      overrideInsertionMethod: overrideInsertionMethod
    };
  };

  fdWebExtension.fdGetContentEditableElementInfo = function(
    node,
    info,
    indentLogMsgSpacesCt,
    removeFEFFAthena,
  ) {

    var xpath = fdWebExtension.getPathTo(node);
    
    fdWebExtension.fdLog("fdGetContentEditableElementInfo - path=" + xpath);

    if (fdWebExtension.fdExtensionConfig.enableLogging &&
      fdWebExtension.fdExtensionConfig.logContentEditableInfo)
      {
        fdWebExtension.fdLog("fdGetContentEditableElementInfo - outerHTML:\n" + node.outerHTML);
      }

    var sel = fdWebExtension.fdGetSelectionForElement(node);
    if (!sel || !sel.anchorNode || !sel.focusNode) {
      fdWebExtension.fdLog('fdGetContentEditableElementInfo - selection unavailable for element');
      return;
    }
    var childNodes = node.childNodes;

    const baseAndExt = 'baseNode' in sel && 'extentNode' in sel;
    const startNode = baseAndExt ? sel.baseNode : sel.anchorNode;
    const startOffset = baseAndExt ? sel.baseOffset : sel.anchorOffset;
    const endNode = baseAndExt ? sel.extentNode : sel.focusNode;
    const endOffset = baseAndExt ? sel.extentOffset : sel.focusOffset;

    const startNodeIsTextNode = startNode.nodeName === '#text';
    const endNodeIsTextNode = endNode.nodeName === '#text';

    const startNodeCharOffset = startNodeIsTextNode ? startOffset : 0;
    const endNodeCharOffset = endNodeIsTextNode ? endOffset : 0;

    const startNodeChildNodeOffset = !startNodeIsTextNode ? startOffset : 0;
    const endNodeChildNodeOffset = !endNodeIsTextNode ? endOffset : 0;

    if (info.text === undefined) {
      if (sel.isCollapsed) {
        info.isSelLeftToRight = true;
      } else if (startNode.isSameNode(endNode)) {
        info.isSelLeftToRight = startOffset <= endOffset;
      } else {
        info.isSelLeftToRight =
          startNode.compareDocumentPosition(endNode) &
          Node.DOCUMENT_POSITION_FOLLOWING;
      }

      info.text = '';
      info.rawText = '';
      info.selStart = 0;
      info.selEnd = 0;
      info.foundSelStart = false;
      info.foundSelEnd = false;
      info.currNodeStart = 0;
      info.currNodeEnd = 0;
      info.nodeList = [];
      info.logMsg = '';
    }

    fdWebExtension.fdLog("fdGetContentEditableElementInfo - childNodes=" + childNodes.length);

    for (var i = 0; i < childNodes.length; i++) {
      var childNode = childNodes[i];

      // Firefox adds an unnecessary </br> at the end, just ignore it
      if (
        fdWebExtension.fdIsFirefox &&
        i == childNodes.length - 1 &&
        childNode.nodeName == 'BR'
      )
        continue;

      var isStartNode = childNode.isSameNode(startNode);
      var isEndNode = childNode.isSameNode(endNode);
      var isParentStartNode = childNode.parentNode.isSameNode(startNode);
      var isParentEndNode = childNode.parentNode.isSameNode(endNode);

      var isSelectionStart =
        (childNode.nodeName == '#text' && isStartNode) ||
        (isParentStartNode && i === startNodeChildNodeOffset);
      var isSelectionEnd =
        (childNode.nodeName == '#text' && isEndNode) ||
        (isParentEndNode && i === endNodeChildNodeOffset);

      var text = '';
      if (childNode.nodeName == '#text') {
        text = childNode.nodeValue;
        if (removeFEFFAthena && /\ufeff/.test(text)) {
          text = text.replace(/\ufeff/g, "");
          childNode.nodeValue = text;
        }
      } else if (childNode.nodeName == 'BR') {
        text = '\n';
      } else if (
        (childNode.nodeName == 'DIV' || childNode.nodeName == 'P') &&
        childNode.nodeValue == null &&
        childNode.childNodes.length > 0 &&
        i != 0
      ) {
        // add new line for all nested DIV and P
        // except whenever it's the first child (i == 0) otherwise an unnecessary new line gets added to very beggining of text
        text = '\n';
      }

      var modStartCharOffset = startNodeCharOffset;
      var modEndCharOffset = endNodeCharOffset;
      const rawText = text;
      var hasZWSP = false;

      if (text) {
        const zwspRegex = /\u200b/g; //Remove ZWSP (FDWC-149)

        while ((m = zwspRegex.exec(text)) !== null) {
          if (m.index === zwspRegex.lastIndex) 
            zwspRegex.lastIndex++;

          hasZWSP = true;

          if(m.index < startNodeCharOffset)
            modStartCharOffset--;

          if(m.index < endNodeCharOffset)
            modEndCharOffset--;
        }

        if(modStartCharOffset < 0)
          modStartCharOffset = 0;

        if(modEndCharOffset < 0)
          modEndCharOffset = 0;

        if(hasZWSP)
        {
          text = text.replace(zwspRegex, '');
        }

        info.text += text;
        info.rawText += rawText;

        info.nodeList.push({
          node: childNode,
          text: text,
          rawText: rawText,
          start: info.currNodeEnd,
          end: info.currNodeEnd + text.length,
        });
        info.currNodeStart = info.nodeList[info.nodeList.length - 1].start;
        info.currNodeEnd = info.nodeList[info.nodeList.length - 1].end;
      }

      // selection anchor and focus for empty lines is the outer div rather than inner line break
      // this throws off our selection start and/or end calculations
      // so detect the condition here and update selection start and/or end below by adding 1
      var isBrOnlyDiv =
        childNode.nodeName == 'DIV' &&
        childNode.childNodes.length == 1 &&
        childNode.childNodes[0].nodeName == 'BR';

      if (!info.foundSelStart) {
        if (info.isSelLeftToRight && isSelectionStart) {
          info.selStart += modStartCharOffset;
          if (isBrOnlyDiv) {
            info.selStart++;
          }
          info.foundSelStart = true;
        } else if (!info.isSelLeftToRight && isSelectionEnd) {
          info.selStart += modEndCharOffset;
          if (isBrOnlyDiv) {
            info.selStart++;
          }
          info.foundSelStart = true;
        } else {
          info.selStart += text.length;
        }
      }

      if (!info.foundSelEnd) {
        if (info.isSelLeftToRight && isSelectionEnd) {
          info.selEnd += modEndCharOffset;
          if (isBrOnlyDiv) {
            info.selEnd++;
          }
          info.foundSelEnd = true;
        } else if (!info.isSelLeftToRight && isSelectionStart) {
          info.selEnd += modStartCharOffset;
          if (isBrOnlyDiv) {
            info.selEnd++;
          }
          info.foundSelEnd = true;
        } else {
          info.selEnd += text.length;
        }
      }

      if (
        fdWebExtension.fdExtensionConfig.enableLogging &&
        fdWebExtension.fdExtensionConfig.logContentEditableInfo
      ) {
        if (info.logMsg == '')
          info.logMsg = 'fdGetContentEditableElementInfo -';
        else info.logMsg += '\n';

        info.logMsg +=
          new Array(indentLogMsgSpacesCt).join(' ') +
          " nodeName='" +
          childNode.nodeName +
          "' nodeValue='" +
          childNode.nodeValue +
          "' text='" +
          text.replace(/\n/g, '\\n') +
          "' using base & extent=" +
          baseAndExt +
          ' isSelectionStart=' +
          isSelectionStart +
          ' isSelectionEnd=' +
          isSelectionEnd +
          ' isStartNode=' +
          isStartNode +
          ' isEndNode=' +
          isEndNode +
          ' isParentStartNode=' +
          isParentStartNode +
          ' isParentEndNode=' +
          isParentEndNode +
          ' startCharOffset=' +
          modStartCharOffset +
          ' endCharOffset=' +
          modEndCharOffset +
          ' start=' +
          (text ? info.currNodeStart : -1) +
          ' end=' +
          (text ? info.currNodeEnd : -1);

          if(hasZWSP)
          {
            info.logMsg += ` - ZWSP found text was: ${rawText.replace(/\n/g, '\\n')}, offset was: start=${startNodeCharOffset} end=${endNodeCharOffset}`
          }
      }

      if (childNode.nodeName !== 'BR' && childNode.nodeName !== '#text') {
        fdWebExtension.fdGetContentEditableElementInfo(
          childNode,
          info,
          indentLogMsgSpacesCt + 2,
          removeFEFFAthena
        );
      }
    }

    //FD-17020: process offset out-of-bounds cases
    if (!info.foundSelStart) {
      if (info.isSelLeftToRight && node.isSameNode(startNode) && !startNodeIsTextNode && startNodeChildNodeOffset >= childNodes.length) {
        fdWebExtension.fdLog('fdGetContentEditableElementInfo - setting foundSelStart to true, because startNodeChildNodeOffset is out-of-bounds ' +
                             '- isSelLeftToRight=' + info.isSelLeftToRight + ' startNodeChildNodeOffset=' + startNodeChildNodeOffset + ' children count=' + childNodes.length);
        info.foundSelStart = true;
      }
      else if (!info.isSelLeftToRight && node.isSameNode(endNode) && !endNodeIsTextNode && endNodeChildNodeOffset >= childNodes.length) {
        fdWebExtension.fdLog('fdGetContentEditableElementInfo - setting foundSelStart to true, because endNodeChildNodeOffset is out-of-bounds ' +
                             '- isSelLeftToRight=' + info.isSelLeftToRight + ' endNodeChildNodeOffset=' + endNodeChildNodeOffset + ' children count=' + childNodes.length);
        info.foundSelStart = true;
      }
    }

    if (!info.foundSelEnd) {
      if (info.isSelLeftToRight && node.isSameNode(endNode) && !endNodeIsTextNode && endNodeChildNodeOffset >= childNodes.length) {
        fdWebExtension.fdLog('fdGetContentEditableElementInfo - setting foundSelEnd to true, because endNodeChildNodeOffset is out-of-bounds ' +
                             '- isSelLeftToRight=' + info.isSelLeftToRight + ' endNodeChildNodeOffset=' + endNodeChildNodeOffset + ' children count=' + childNodes.length);
        info.foundSelEnd = true;
      }
      else if (!info.isSelLeftToRight && node.isSameNode(startNode) && !startNodeIsTextNode && startNodeChildNodeOffset >= childNodes.length) {
        fdWebExtension.fdLog('fdGetContentEditableElementInfo - setting foundSelEnd to true, because startNodeChildNodeOffset is out-of-bounds ' +
                             '- isSelLeftToRight=' + info.isSelLeftToRight + ' startNodeChildNodeOffset=' + startNodeChildNodeOffset + ' children count=' + childNodes.length);
        info.foundSelEnd = true;
      }
    }

    info.logMsg += `\n selStart=${info.selStart} selEnd=${info.selEnd} foundSelStart=${info.foundSelStart} foundSelEnd=${info.foundSelEnd}`
  };

  // assuming controlId is in the same iframe and in one of the shadow DOMs to the active element.
  fdWebExtension.fdFindControlStandard = function(controlId) {
    fdWebExtension.fdLog('fdFindControlStandard - controlId=' + controlId);

    var mainWindow = fdWebExtension.fdGetMainWindow();
    const query = `[${fdWebExtension.fdControlIdAttribute}="${controlId}"]`;
    var documentRoot = mainWindow.document;
    var results = documentRoot.querySelectorAll(query);

    while (results.length <= 0 && documentRoot.activeElement && documentRoot.activeElement.shadowRoot) {
      documentRoot = documentRoot.activeElement.shadowRoot;
      var results = documentRoot.querySelectorAll(query);
    }

    if(results.length <= 0)
    {
      fdWebExtension.fdLog('fdFindControlStandard - No control found');
      return null;
    }
    else if(results.length == 1)
    {
      fdWebExtension.fdLog(`fdFindControlStandard - found controlId=${controlId}`);
      return results[0];
    }
    else
    {
      fdWebExtension.fdLog(`fdFindControlStandard - found ${results.length} controls with controlId=${controlId} - refreshing focus with new IDs`);

      //Change unique IDs for these elements
      results.forEach(element => {
        element.setAttribute(fdWebExtension.fdControlIdAttribute, fdWebExtension.fdGuid());
      });

      fdWebExtension.fdPushFocusChange();
      return null;
    }
  };

  fdWebExtension.fdGetTextStandard = function(textControlEl, removeFEFFAthena) {
    fdWebExtension.fdLog(
      'fdGetTextStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );

    var text = '';
    var mode = '';
    if (fdWebExtension.fdIsTextInputOrTextArea(textControlEl)) {
      mode = 'TextInputOrTextArea';
      text = textControlEl.value;
    } else {
      var info = {};
      mode = 'ContentEditable';
      fdWebExtension.fdGetContentEditableElementInfo(textControlEl, info, 0, removeFEFFAthena);
      text = info.text;

      if (fdWebExtension.fdExtensionConfig.logContentEditableInfo)
        fdWebExtension.fdLog(info.logMsg);
    }

    fdWebExtension.fdLog(
      'fdGetTextStandard - mode=' + mode +
       ' controlId=' + textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute) +
        " text='" + text.replace(/\n/g, '\\n') + "'",);

    return {
      success: true,
      text: text,
    };
  };

  fdWebExtension.fdGetTextLengthStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdGetTextLengthStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );

    var text = fdWebExtension.fdGetTextStandard(textControlEl).text;
    var textLength = text ? text.length : 0;

    fdWebExtension.fdLog(
      'fdGetTextLengthStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute) +
        ' textLength=' +
        textLength,
    );

    return {
      success: true,
      textLength: textLength,
    };
  };

  fdWebExtension.fdGetSelectionStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdGetSelectionStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );

    var selStart = 0;
    var selEnd = 0;

    if (fdWebExtension.fdIsTextInputOrTextArea(textControlEl)) {
      selStart = textControlEl.selectionStart;
      selEnd = textControlEl.selectionEnd;
    } else {
      if(!fdWebExtension.fdIsGivenElementActiveElement(textControlEl) &&
          fdWebExtension.fdLastKnownCaretPos != null){
        selStart = fdWebExtension.fdLastKnownCaretPos.start;
        selEnd = fdWebExtension.fdLastKnownCaretPos.end;
      } else{
        var info = {};
        fdWebExtension.fdGetContentEditableElementInfo(textControlEl, info, 0);
        selStart = info.selStart;
        selEnd = info.selEnd;  

        if (fdWebExtension.fdExtensionConfig.logContentEditableInfo)
          fdWebExtension.fdLog(info.logMsg);
      }
    }

    fdWebExtension.fdLog(
      'fdGetSelectionStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute) +
        ' selStart=' +
        selStart +
        ' selEnd=' +
        selEnd,
    );

    return {
      success: true,
      start: selStart,
      end: selEnd,
      length: selEnd - selStart,
    };
  };

  fdWebExtension.fdSetSelectionStandard = function(
    textControlEl,
    selStart,
    selEnd,
  ) {
    fdWebExtension.fdLog(
      'fdSetSelectionStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute) +
        ' selStart=' +
        selStart +
        ' selEnd=' +
        selEnd,
    );
    var document = textControlEl.ownerDocument;

    if (fdWebExtension.fdIsTextInputOrTextArea(textControlEl)) {
      if (selEnd < 0) {
        fdWebExtension.fdLog('fdSetSelectionStandard - select all text');
        selEnd = textControlEl.value.length;
      }

      textControlEl.setSelectionRange(selStart, selEnd, 'forward');
    } else if (!fdWebExtension.fdIsGivenElementActiveElement(textControlEl) &&
                fdWebExtension.fdLastKnownCaretPos != null){
      fdWebExtension.fdLastKnownCaretPos = {start: selStart, end: selEnd};
    }
    else {
      var info = {};
      fdWebExtension.fdGetContentEditableElementInfo(textControlEl, info, 0);

      if (fdWebExtension.fdExtensionConfig.logContentEditableInfo)
        fdWebExtension.fdLog(info.logMsg);

      if (selEnd < 0 && info.nodeList.length > 0) {
        fdWebExtension.fdLog('fdSetSelectionStandard - select all text');
        selEnd = info.nodeList[info.nodeList.length - 1].end;
      }

      var startNode = null;
      var endNode = null;
      for (var i = 0; i < info.nodeList.length; i++) {
        var nodeStart = info.nodeList[i].start;
        var nodeEnd = info.nodeList[i].end;
        var isLastNode = i == info.nodeList.length - 1;
        var isTextNode = info.nodeList[i].node.nodeName == '#text';

        if (selStart >= nodeStart && selStart <= nodeEnd) {
          if (selStart == nodeEnd && !isLastNode && !isTextNode) {
            // set selection to start of next node instead of end of this node
            continue;
          }

          startNode = info.nodeList[i];
        }
        if (
          selEnd >= info.nodeList[i].start &&
          selEnd <= info.nodeList[i].end
        ) {
          if (selEnd == nodeEnd && !isLastNode && !isTextNode) {
            // set selection to start of next node instead of end of this node
            continue;
          }

          endNode = info.nodeList[i];
        }

        if (startNode && endNode) {
          break;
        }

        // if selection past end, clamp to end.
        if (isLastNode) {
          if (!startNode && selStart > nodeEnd) {
            startNode = info.nodeList[i];
            selStart = nodeEnd;
          }
          if (!endNode && selEnd > nodeEnd) {
            endNode = info.nodeList[i];
            selEnd = nodeEnd;
          }
        }
      }

      if (startNode && endNode) {
        var range = document.createRange();
        var startOffset = fdWebExtension.fdCalculateOffset(startNode, selStart);
        var endOffset = fdWebExtension.fdCalculateOffset(endNode, selEnd);
        fdWebExtension.fdLog(`fdSetSelectionStandard - startOffset=${startOffset} endOffset=${endOffset}`);
        range.setStart(startNode.node, startOffset);
        range.setEnd(endNode.node, endOffset);
        var sel = fdWebExtension.fdGetSelectionForElement(textControlEl);
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    }

    fdWebExtension.fdScrollToCaret(textControlEl);

    return { success: true };
  };

  fdWebExtension.fdCalculateOffset = function(nodeInfo, selection)
  {
    if(nodeInfo.node.nodeType !== Node.TEXT_NODE)
      return 0;

    var offset = selection - nodeInfo.start;
    if(nodeInfo.rawText == nodeInfo.text)
      return offset;

    var offsetCount = 0;
    var rawOffset = 0;
    const rawText = nodeInfo.rawText;
    while(offsetCount < offset)
    {
      if(rawText[rawOffset++] == '\u200b')
        continue;

      offsetCount++;
    }

    return rawOffset;
  }

  fdWebExtension.fdInsertTextStandard = function(textControlEl, text) {
    var controlId = textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute);
    fdWebExtension.fdLog(
      `fdInsertTextStandard - controlId=${controlId}` +
      ` class='${textControlEl.className}'` +
      ` text=${text.replace(/\n/g, '\\n')}'`,
    );

    var mainWindow = fdWebExtension.fdGetMainWindow();
    var document = mainWindow.document;

    var oldScrollHeight = textControlEl.scrollHeight;
    var oldScrollTop = textControlEl.scrollTop;

    if(!fdWebExtension.fdIsGivenElementActiveElement(textControlEl) &&
        fdWebExtension.fdLastKnownCaretPos != null){
      fdWebExtension.fdLog("fdInsertTextStandard - Inserting via fdInsertTextInOutOfFocusElement");
      fdWebExtension.fdInsertTextInOutOfFocusElement(text, textControlEl);
    } else if (
      !fdWebExtension.fdIsInputOrTextArea(textControlEl) ||
      fdWebExtension.fdIsChrome
    ) {
      try {
        // draftjs behaves differently when interacting with 'execCommand'
        // so fall back to pasting text into control. But if we believe its the Onco old style telerek 'radEditor'
        // continue to use the 'execCommand'
        if (fdWebExtension.fdCanUseDispatchPaste(textControlEl) && !fdWebExtension.canUseExecCommands(textControlEl)) {
          fdWebExtension.fdLog("fdInsertTextStandard - Inserting via fdDispatchPaste");
          fdWebExtension.fdDispatchPaste(textControlEl, text);
        } else {
          if(fdWebExtension.fdExtensionConfig.contentEditableSingleDivMode)
          {
            fdWebExtension.fdLog("fdInsertTextStandard - Inserting via single div mode");
            fdWebExtension.fdInsertTextInEditableDivInSingleDivMode(text);
          }
          else
          {
            fdWebExtension.fdLog("fdInsertTextStandard - Inserting via execCommand");
            document.execCommand('insertText', false, text);
            // FDWC-187: Athena Notes form contains FEFF character when it is empty.
            if (fdWebExtension.fdIsAthenaNotesForm(textControlEl)) {
              var textResult = fdWebExtension.fdGetTextStandard(textControlEl, true);
              fdWebExtension.fdLog("fdInsertTextStandard - after removeFEFF: text=" + textResult.text);
            }
          }
        }
      } catch (e) { fdWebExtension.fdLog(`error inserting text ${e.message}`); }
    } else {
      fdWebExtension.fdLog("fdInsertTextStandard - Inserting via setRangeText");
      var selStart = textControlEl.selectionStart;
      var selEnd = textControlEl.selectionEnd;
      textControlEl.setRangeText(text, selStart, selEnd, 'end');
    }

    if(fdWebExtension.fdExtensionConfig.simulateKeyDownAfterInsert)
    {
      fdWebExtension.fdLog("fdInsertTextStandard - Simulating keypress");
      try {
        // simulate fake key down event to trigger application event handlers
        // works in Athena where it's necessary for text controls to grow
        var eventObj = document.createEventObject
          ? document.createEventObject()
          : document.createEvent('Events');
        if (eventObj.initEvent) {
          eventObj.initEvent(
            fdWebExtension.fdExtensionConfig.keypressEventDirection,
            true,
            true,
          );
        }

        let inputEvent = new Event("input", { bubbles: true, cancelable: true });

        if(textControlEl.dispatchEvent)
        {
          textControlEl.dispatchEvent(inputEvent);  
        }
        else if(textControlEl.fireEvent)
        {
          textControlEl.fireEvent(inputEvent);
        }
        else
        {
          fdWebExtension.fdLog(`textControl does not have dispatchEvent or fireEvent`)
        }
        
      } catch (e) {}
    }

    fdWebExtension.fdScrollToCaret(textControlEl);

    // for using FD's correction window with Athena, see comments in FD-13659
    if (window.AH) {
      fdWebExtension.fdCache['correctionWindowElementText'] =
        textControlEl.textContent;
    }

    return { success: true };
  };

  fdWebExtension.fdScrollIntoView = function(
    textControlEl,
    oldScrollHeight,
    oldScrollTop,
  ) {
    fdWebExtension.fdLog('fdScrollIntoView');

    var newScrollHeight = textControlEl.scrollHeight;
    var newScrollTop = textControlEl.scrollTop;

    if (newScrollHeight > oldScrollHeight && newScrollTop == oldScrollTop) {
      // if scrollable height increased due to insertion of text, then it must have been put on a new line
      // if scroll top hasn't changed, then new line wasn't scrolled into view so do it now
      textControlEl.scrollTop =
        textControlEl.scrollTop + (newScrollHeight - oldScrollHeight);
    }
  };

  fdWebExtension.fdScrollToCaret = function(textControlEl)
  {
    if(fdWebExtension.getActiveElement() != textControlEl)
    {
      fdWebExtension.fdLog('fdScrollToCaret - Text control not focused');
      return;
    }

    if(fdWebExtension.fdIsContentEditableEl(textControlEl))
    {
      fdWebExtension.fdLog('fdScrollToCaret - Content editable');
      let selection = fdWebExtension.fdGetSelectionStandard(textControlEl);
      let nodes = fdWebExtension.fdGetNodesAtPos(textControlEl, selection.start, selection.end);
      if(!nodes[0])
        return;

      let node = nodes[0].node;
      let range = document.createRange();
      range.selectNode(node);

      if(fdWebExtension.fdElementIsVisibile(range, textControlEl))
      {
        fdWebExtension.fdLog("Element is already visible")
        return;
      }

      if(node.parentElement)
      {
        node.parentElement.style["scroll-margin"] = "50px";
        node.parentElement.scrollIntoView({
          block: 'nearest',
        });
        node.parentElement.style["scroll-margin"] = null;
      }
      else 
      {
        let tempAnchor = document.createElement('div');
        tempAnchor.style = "height: 30px !important; float:left; scroll-margin: 50px";

        node.after(tempAnchor);
        tempAnchor.scrollIntoView({
          block: 'nearest',
        });
        tempAnchor.remove();
      }
    }
    else
    {
      if(fdWebExtension.fdElementIsVisibile(textControlEl))
      {
        fdWebExtension.fdLog("Element is already visible")
        return;
      }

      fdWebExtension.fdLog('fdScrollToCaret - Input or text area');
      textControlEl.scrollIntoView({
        block: 'nearest',
      });
    }
  }

  fdWebExtension.fdElementIsVisibile = function(element, container = null)
  {
    const padding = 100;
    let elementBox = element.getBoundingClientRect();

    fdWebExtension.fdLog(`elementIsVisible - element top=${elementBox.top} bottom = ${element.bottom} window innerHeight=${window.innerHeight}`);

    if (elementBox.bottom + padding > window.innerHeight)
      return false;

    if (elementBox.top < padding)
      return false;

    if(!container)
      return true;

    let containerBox = container.getBoundingClientRect();
    fdWebExtension.fdLog(`elementIsVisible - container top=${containerBox.top} bottom = ${containerBox.bottom}`);

    if (elementBox.bottom + padding > containerBox.bottom)
      return false;

    if(elementBox.top < containerBox.top + padding)
      return false;

    return true;
  }

  fdWebExtension.fdIsAthenaNotesForm = function (textControlEl) {
    if (!window.AH) return false;
    var parent = textControlEl;
    // as of May 2025, 5th parent has that class, but allow two more steps for future change.
    for (var i = 0; i < 7; i++) {
      if (!parent.parentElement) return false;
      parent = parent.parentElement;
      if (parent.matches(".clsob_c_notes-form")) return true;
    }
    return false;
  }

  fdWebExtension.fdSimulateDeleteKeyPress = function (element) {
    const deleteEvent = new KeyboardEvent('keydown', {
      key: 'Delete',
      code: 'Delete',
      which: 46,
      keyCode: 46,
      charCode: 0,
      bubbles: true,
      cancelable: true
    });

    element.dispatchEvent(deleteEvent);
  }

  fdWebExtension.fdDeleteSelectionStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdDeleteSelectionStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );

    if(!fdWebExtension.fdIsGivenElementActiveElement(textControlEl) &&
        fdWebExtension.fdLastKnownCaretPos != null){
      fdWebExtension.fdLog("fdDeleteSelectionStandard - Deleting via fdInsertTextInOutOfFocusElement");
      fdWebExtension.fdInsertTextInOutOfFocusElement('', textControlEl);
    } else if (
      !fdWebExtension.fdIsInputOrTextArea(textControlEl) ||
      fdWebExtension.fdIsChrome
    ) {
      // FDWC-192: 'note form' component of Athena would throw error.
      if (fdWebExtension.fdIsAthenaNotesForm(textControlEl)) {
        fdWebExtension.fdLog("fdDeleteSelectionStandard - Deleting via fdSimulateDeleteKeyPress");
        var activeElement = fdWebExtension.getActiveElement();
        fdWebExtension.fdSimulateDeleteKeyPress(activeElement);
      } else {
        fdWebExtension.fdLog("fdDeleteSelectionStandard - Deleting via execCommand");
        var mainWindow = fdWebExtension.fdGetMainWindow();
        mainWindow.document.execCommand('delete', false, null);
      }
    } else {
      fdWebExtension.fdLog("fdDeleteSelectionStandard - Deleting via setRangeText");
      var selStart = textControlEl.selectionStart;
      var selEnd = textControlEl.selectionEnd;
      textControlEl.setRangeText('', selStart, selEnd, 'end');
    }
    return { success: true };
  };

  fdWebExtension.fdBoldSelectionStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdBoldSelectionStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );

    var mainWindow = fdWebExtension.fdGetMainWindow();
    if (fdWebExtension.canUseExecCommands(textControlEl) && mainWindow.document.execCommand('bold', false, null)) {
      return {
        success: true,
        supported: true,
        sendKeysFromFD: false,
      };
    }

    fdWebExtension.fdLog(
      'fdBoldSelectionStandard - cannot bold text using API',
    );

    var isTextInputOrTextArea = fdWebExtension.fdIsTextInputOrTextArea(
      textControlEl,
    );
    return {
      success: false,
      errorMessage: 'cannot bold text using API',
      supported: !isTextInputOrTextArea,
      sendKeysFromFD: !isTextInputOrTextArea,
    };
  };

  fdWebExtension.fdItalicizeSelectionStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdItalicizeSelectionStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );

    var mainWindow = fdWebExtension.fdGetMainWindow();
    if (fdWebExtension.canUseExecCommands(textControlEl) && mainWindow.document.execCommand('italicize', false, null)) {
      return {
        success: true,
        supported: true,
        sendKeysFromFD: false,
      };
    }

    fdWebExtension.fdLog(
      'fdItalicizeSelectionStandard - cannot italicize text using API',
    );
    var isTextInputOrTextArea = fdWebExtension.fdIsTextInputOrTextArea(
      textControlEl,
    );
    return {
      success: false,
      errorMessage: 'cannot italicize text using API',
      supported: !isTextInputOrTextArea,
      sendKeysFromFD: !isTextInputOrTextArea,
    };
  };

  fdWebExtension.fdUnderlineSelectionStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdUnderlineSelectionStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );

    var mainWindow = fdWebExtension.fdGetMainWindow();
    if (!mainWindow.OncoEMR && mainWindow.document.execCommand('underline', false, null)) {
      return {
        success: true,
        supported: true,
        sendKeysFromFD: false,
      };
    }

    fdWebExtension.fdLog(
      'fdUnderlineSelectionStandard - cannot underline text using API',
    );
    var isTextInputOrTextArea = fdWebExtension.fdIsTextInputOrTextArea(
      textControlEl,
    );
    return {
      success: false,
      errorMessage: 'cannot underline text using API',
      supported: !isTextInputOrTextArea,
      sendKeysFromFD: !isTextInputOrTextArea,
    };
  };

  fdWebExtension.fdCutSelectionStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdCutSelectionStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );

    var mainWindow = fdWebExtension.fdGetMainWindow();
    if (mainWindow.document.execCommand('cut', false, null)) {
      return {
        success: true,
        supported: true,
        sendKeysFromFD: false,
      };
    }

    fdWebExtension.fdLog('fdCutSelectionStandard - cannot cut text using API');
    return {
      success: false,
      errorMessage: 'cannot cut text using API',
      supported: true,
      sendKeysFromFD: true,
    };
  };

  fdWebExtension.fdCopySelectionStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdCopySelectionStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );

    var mainWindow = fdWebExtension.fdGetMainWindow();
    if (mainWindow.document.execCommand('copy', false, null)) {
      return {
        success: true,
        supported: true,
        sendKeysFromFD: false,
      };
    }

    fdWebExtension.fdLog(
      'fdCopySelectionStandard - cannot copy text using API',
    );
    return {
      success: false,
      errorMessage: 'cannot copy text using API',
      supported: true,
      sendKeysFromFD: true,
    };
  };

  fdWebExtension.fdPasteSelectionStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdPasteSelectionStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );

    var mainWindow = fdWebExtension.fdGetMainWindow();
    if (mainWindow.document.execCommand('paste', false, null)) {
      return {
        success: true,
        supported: true,
        sendKeysFromFD: false,
      };
    }

    fdWebExtension.fdLog(
      'fdPasteSelectionStandard - cannot paste text using API',
    );
    return {
      success: false,
      errorMessage: 'cannot paste text using API',
      supported: true,
      sendKeysFromFD: true,
    };
  };

  fdWebExtension.fdScrollUpStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdScrollUpStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );
    textControlEl.scrollTop =
      textControlEl.scrollTop - textControlEl.clientHeight / 2;
    return {
      success: true,
      supported: true,
      sendKeysFromFD: false,
    };
  };

  fdWebExtension.fdScrollDownStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdScrollDownStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );
    textControlEl.scrollTop =
      textControlEl.scrollTop + textControlEl.clientHeight / 2;
    return {
      success: true,
      supported: true,
      sendKeysFromFD: false,
    };
  };

  fdWebExtension.fdScrollCaretStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdScrollCaretStandard - controlId=' +
        textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );
    fdWebExtension.fdLog(
      'fdScrollCaretStandard - cannot scroll to caret using API',
    );

    return {
      success: false,
      errorMessage: 'cannot scroll to caret using API',
      supported: false,
      sendKeysFromFD: false,
    };
  };

  fdWebExtension.fdUndoStandard = function(textControlEl) {
    fdWebExtension.fdLog(
      'fdUndoStandard - controlId=' + textControlEl.getAttribute(fdWebExtension.fdControlIdAttribute),
    );
    fdWebExtension.fdLog('fdUndoStandard - cannot undo using API');

    return {
      success: false,
      errorMessage: 'cannot undo using API',
      supported: true,
      sendKeysFromFD: true,
    };
  };
}

// Meditech w/ M*Modal API
// Create FD text control functions that wraps Meditech's MSpeech API.
if (window.MSpeechAPI) {
  fdWebExtension.fdLog('fdWebExtension - found Meditech');

  if (!fdWebExtension.fdInitializeCustomApi) {
    fdWebExtension.fdCustomApiInitialized = false;

    fdWebExtension.fdHandleMSpeechApiCustomEvent = function(evtObj) {
      fdWebExtension.fdLog(
        'fdHandleMSpeechApiCustomEvent - type=' + evtObj.detail.type,
      );

      if (evtObj.detail.type == 'focusChanged') {
        fdWebExtension.checkIfTabActive(); // will cause extra focus push, but that should be ok
        fdWebExtension.fdHandleFocusChange();
      }
    };

    fdWebExtension.fdInitializeCustomApi = function() {
      if (fdWebExtension.fdCustomApiInitialized) {
        return { success: true };
      }

      fdWebExtension.fdLog('fdInitializeCustomApi - initializing MSpeechAPI');

      var initResult = window.MSpeechAPI('initialize()');
      fdWebExtension.fdCustomApiInitialized = initResult[0];
      if (fdWebExtension.fdCustomApiInitialized) {
        fdWebExtension.fdLog('fdInitializeCustomApi - MSpeechAPI initialized');

        return { success: true };
      } else {
        fdWebExtension.fdLog(
          "fdInitializeCustomApi - MSpeechAPI could not be initialized (reason='" +
            initResult[1] +
            "')",
        );
        return {
          success: fdWebExtension.fdCustomApiInitialized,
          errorMessage: initResult[1],
        };
      }
    };
  }

  if (!fdWebExtension.fdGetFocusedControlIdCustom) {
    fdWebExtension.fdGetFocusedControlIdCustom = function() {
      fdWebExtension.fdLog(
        'fdGetFocusedControlIdCustom - getting focused control',
      );

      if (!fdWebExtension.fdInitializeCustomApi().success) {
        fdWebExtension.fdLog(
          'fdGetFocusedControlIdCustom - MSpeechAPI is not initialized',
        );
        return {
          success: false,
          errorMessage: 'MSpeechAPI is not initialized',
          focusedControlId: null,
        };
      }

      // Ignore MSpeechAPI in OncoEMR (FD-14514)
      if (window.MSpeechAPI && !window.OncoEMR) {
        var focusedControlId = window.MSpeechAPI(
          'controls.getCurrentControl()',
        )[0];
        fdWebExtension.fdLog(
          'fdGetFocusedControlIdCustom - controlId=' + focusedControlId,
        );
        return {
          success: true,
          focusedControlId: focusedControlId,
        };
      }

      return {
        success: false,
        focusedControlId: null,
      };
    };
  }

  if (!fdWebExtension.fdFindControlCustom && !window.OncoEMR) {
    fdWebExtension.fdFindControlCustom = function(controlId) {
      fdWebExtension.fdLog('fdFindControlCustom - controlId=' + controlId);

      var controlIds = window.MSpeechAPI('controls.enumerate()');
      for (var i = 0; i < controlIds.length; i++) {
        if (controlIds[i].localeCompare(controlId) == 0) {
          fdWebExtension.fdLog(
            'fdFindControlCustom - found controlId=' + controlId,
          );
          return true;
        }
      }

      fdWebExtension.fdLog(
        'fdFindControlCustom - did not find controlId=' + controlId,
      );

      return false;
    };
  }

  if (!fdWebExtension.fdGetTextCustom) {
    fdWebExtension.fdGetTextCustom = function(controlId) {
      // Ignore MSpeechAPI in OncoEMR (FD-14514)
      if (window.MSpeechAPI && window.OncoEMR) {
        return {
          success: true,
          text: null,
        };
      }

      fdWebExtension.fdLog('fdGetTextCustom - controlId=' + controlId);
      var text = window.MSpeechAPI('control.text.read(id)', controlId)[0];
      fdWebExtension.fdLog(
        "fdGetTextCustom - text='" + text.replace(/\n/g, '\\n') + "'",
      );
      return {
        success: true,
        text: text,
      };
    };
  }

  if (!fdWebExtension.fdGetTextLengthCustom) {
    fdWebExtension.fdGetTextLengthCustom = function(controlId) {
      fdWebExtension.fdLog('fdGetTextLengthCustom - controlId=' + controlId);
      var text = fdWebExtension.fdGetTextCustom(controlId).text;
      var textLength = text ? text.length : 0;
      fdWebExtension.fdLog('fdGetTextLengthCustom - textLength=' + textLength);
      return {
        success: true,
        textLength: textLength,
      };
    };
  }

  if (!fdWebExtension.fdGetSelectionCustom) {
    fdWebExtension.fdGetSelectionCustom = function(controlId) {
      fdWebExtension.fdLog('fdGetSelectionCustom - controlId = ' + controlId);
      var sel = window.MSpeechAPI('control.selection.getRange(id)', controlId);
      fdWebExtension.fdLog(
        'fdGetSelectionCustom - selStart=' +
          sel[0] +
          ' selEnd=' +
          (sel[0] + sel[1]) +
          ' selLength=' +
          sel[1],
      );
      return {
        success: true,
        start: sel[0],
        end: sel[0] + sel[1],
        length: sel[1],
      };
    };
  }

  if (!fdWebExtension.fdSetSelectionCustom) {
    fdWebExtension.fdSetSelectionCustom = function(
      controlId,
      selStart,
      selEnd,
    ) {
      fdWebExtension.fdLog(
        'fdSetSelectionCustom - controlId=' +
          controlId +
          ' selStart=' +
          selStart +
          ' selEnd' +
          selEnd,
      );
      if (selEnd >= 0) {
        window.MSpeechAPI(
          'control.selection.setRange(id,point#,extent#)',
          controlId,
          selStart,
          selEnd - selStart,
        );
      } else {
        fdWebExtension.fdLog('fdSetSelectionCustom - select all text');
        var text = fdWebExtension.fdGetText(controlId).text;
        if (text) {
          window.MSpeechAPI(
            'control.selection.setRange(id,point#,extent#)',
            controlId,
            0,
            text.length,
          );
        }
      }

      return { success: true };
    };
  }

  if (!fdWebExtension.fdInsertTextCustom) {
    fdWebExtension.fdInsertTextCustom = function(controlId, text) {
      fdWebExtension.fdLog(
        'fdInsertTextCustom - controlId=' +
          controlId +
          " text='" +
          text.replace(/\n/g, '\\n') +
          "'",
      );

      var mainWindow = fdWebExtension.fdGetMainWindow();
      var activeElement = fdWebExtension.getActiveElement(mainWindow);
      var oldScrollHeight = 0;
      var oldScrollTop = 0;

      if (activeElement) {
        oldScrollHeight = activeElement.scrollHeight;
        oldScrollTop = activeElement.scrollTop;
      }

      var sel = fdWebExtension.fdGetSelectionCustom(controlId);
      try {
        window.MSpeechAPI(
          'control.text.write(id,point#,extent#,text)',
          controlId,
          sel.start,
          sel.length,
          text,
        );
      } catch (e) {
        // Meditech sample page is throwing an exception, but it seems to be after text has already been inserted
        // so just catch the exception, log it, and continue on
        console.error(e);
      }
      fdWebExtension.fdSetSelectionCustom(
        controlId,
        sel.start + text.length,
        sel.start + text.length,
      );

      if(fdWebExtension.fdExtensionConfig.simulateKeyDownAfterInsert)
      {
        // simulate fake key down event for search fields
        // this isn't needed outside of search fields, but FD cannot tell if it's in a regular field or a search field
        if (activeElement)
        {
          try {
            var document = mainWindow.document;
            var eventObj = document.createEventObject
              ? document.createEventObject()
              : document.createEvent('Events');
            if (eventObj.initEvent) {
              eventObj.initEvent(
                fdWebExtension.fdExtensionConfig.keypressEventDirection,
                true,
                true,
              );
            }
            activeElement.dispatchEvent
              ? activeElement.dispatchEvent(eventObj)
              : activeElement.fireEvent(
                'on' + fdWebExtension.fdExtensionConfig.keypressEventDirection,
                eventObj,
              );

            fdWebExtension.fdScrollIntoView(
              activeElement,
              oldScrollHeight,
              oldScrollTop,
            );
          } catch (e) {}
        }
      }

      return { success: true };
    };
  }

  if (!fdWebExtension.fdDeleteSelectionCustom) {
    fdWebExtension.fdDeleteSelectionCustom = function(controlId) {
      fdWebExtension.fdLog('fdDeleteSelectionCustom - controlId=' + controlId);
      return fdWebExtension.fdInsertTextCustom(controlId, '');
    };
  }

  if (!fdWebExtension.fdBoldSelectionCustom) {
    fdWebExtension.fdBoldSelectionCustom = function(controlId) {
      fdWebExtension.fdLog('fdBoldSelectionCustom - controlId=' + controlId);
      return {
        success: false,
        errorMessage: 'cannot bold text using MSpeechAPI',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdItalicizeSelectionCustom) {
    fdWebExtension.fdItalicizeSelectionCustom = function(controlId) {
      fdWebExtension.fdLog(
        'fdItalicizeSelectionCustom - controlId=' + controlId,
      );
      return {
        success: false,
        errorMessage: 'cannot italicize text using MSpeechAPI',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdUnderlineSelectionCustom) {
    fdWebExtension.fdUnderlineSelectionCustom = function(controlId) {
      fdWebExtension.fdLog(
        'fdUnderlineSelectionCustom - controlId=' + controlId,
      );
      return {
        success: false,
        errorMessage: 'cannot underline text using MSpeechAPI',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdCutSelectionCustom) {
    fdWebExtension.fdCutSelectionCustom = function(controlId) {
      fdWebExtension.fdLog('fdCutSelectionCustom - controlId=' + controlId);
      return {
        success: false,
        errorMessage: 'cannot cut text using MSpeechAPI',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdCopySelectionCustom) {
    fdWebExtension.fdCopySelectionCustom = function(controlId) {
      fdWebExtension.fdLog('fdCopySelectionCustom - controlId=' + controlId);
      return {
        success: false,
        errorMessage: 'cannot copy text using MSpeechAPI',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdPasteSelectionCustom) {
    fdWebExtension.fdPasteSelectionCustom = function(controlId) {
      fdWebExtension.fdLog('fdPasteSelectionCustom - controlId=' + controlId);
      return {
        success: false,
        errorMessage: 'cannot paste text using MSpeechAPI',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdScrollUpCustom) {
    fdWebExtension.fdScrollUpCustom = function(controlId) {
      fdWebExtension.fdLog('fdScrollUpCustom - controlId=' + controlId);
      return {
        success: false,
        errorMessage: 'cannot scroll up using MSpeechAPI',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdScrollDownCustom) {
    fdWebExtension.fdScrollDownCustom = function(controlId) {
      fdWebExtension.fdLog('fdScrollDownCustom - controlId=' + controlId);
      return {
        success: false,
        errorMessage: 'cannot scroll down using MSpeechAPI',
        supported: true,
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdScrollCaretCustom) {
    fdWebExtension.fdScrollCaretCustom = function(controlId) {
      fdWebExtension.fdLog('fdScrollCaretCustom - controlId=' + controlId);
      var sel = fdWebExtension.fdGetSelection(controlId);
      fdWebExtension.fdSetSelection(
        controlId,
        sel.start,
        sel.start + sel.length,
      );
      return {
        success: true,
        supported: true,
        sendKeysFromFD: false,
      };
    };
  }

  if (!fdWebExtension.fdUndoCustom) {
    fdWebExtension.fdUndoCustom = function(controlId) {
      fdWebExtension.fdLog('fdUndoCustom - controlId=' + controlId);
      return {
        success: false,
        errorMessage: 'cannot undo using MSpeechAPI',
        supported: !fdWebExtension.fdIsSamplePage(), // undo doesn't work on sample page
        sendKeysFromFD: true,
      };
    };
  }

  if (!fdWebExtension.fdIsSamplePage) {
    fdWebExtension.fdIsSamplePage = function() {
      return window.document.title.indexOf('MSpeech Sample') >= 0;
    };
  }
}

// Intelerad/Clario w/ M*Modal API
// Create FD text control functions that wrap Intelerad's SpeechHandler API
// See https://wiki.mmodal.com/x/xftVCw for API description
if (window.SpeechHandler) {
  fdWebExtension.fdLog("fdWebExtension - found Intelerad's SpeechHandler");
  
  if (!fdWebExtension.fdFindControlCustom) {
    fdWebExtension.fdFindControlCustom = function(controlId) {
      fdWebExtension.fdLog(`fdWebExtension - Intelerad find control custom ${controlId}`);
      if (/^fdControl\d+/.test(controlId)) {
        fdWebExtension.fdLog(`fdWebExtension - Intelerad API determined current field ${controlId} to not use SpeechHandler`);
        return false;
      }

      if (controlId) {
        return true;
      }
      return false;
    }
  }

  if (!fdWebExtension.fdGetFocusedControlIdCustom) {
    fdWebExtension.fdGetFocusedControlIdCustom = function(){
      fdWebExtension.fdLog("fdWebExtension - Intelerad Get Focused Control Id Custom");

      try{
        var activeElement = fdWebExtension.getActiveElement();
        if(activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')){
          fdWebExtension.fdLog(`fdWebExtension - Intelerad get focused control id, in standard element, fallback to default handling`);
          return {
            success: false,
            focusedControlId: null
          }
        }

        // expected values are window.id for the case when focus is not in the broader editor/div
        // 'editor_block_field', or 'editor_block' if not in the actual editable field
        // Can be null if there is an error...
        var focusedControlId = window.SpeechHandler.getCurrentControlID();
        if (focusedControlId === window.id) {
          return {
            success: true,
            focusedControlId: null,
          }
        } else if (!focusedControlId) {
          return {
            success: false,
            focusedControlId: null,
            errorMessage: "SpeechHandler could not get focused control ID"
          }
        }

        return {
          success: true,
          focusedControlId: focusedControlId,
        };
      } catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - GetFocusedControlCustom error ${e}`);
        return{
          success: false,
          errorMessage: `Exception GetFocusedControlCustom ${e}`
        }
      }      
    }
  }

  if (!fdWebExtension.fdGetTextCustom) {
    fdWebExtension.fdGetTextCustom = function(controlId) {
      fdWebExtension.fdLog(`fdWebExtension - Intelerad Get Text Custom - ${controlId}`);
      try{
        var text = window.SpeechHandler.getText(controlId);

        fdWebExtension.fdLog(`fdGetTextCustom - text='${text.replace(/\n/g, '\\n')}'`);

        return {
          success: true,
          text: text,
        };      
      } catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdGetTextCustom error ${e}`);
        return{
          success: false,
          errorMessage: `Exception fdGetTextCustom ${e}`
        }        
      }
    }
  }

  if (!fdWebExtension.fdInsertTextCustom) {
    fdWebExtension.fdInsertTextCustom = function(controlId, text) {
      fdWebExtension.fdLog(`fdInsertTextCustom - Intelerad controlId=${controlId} text='${text.replace(/\n/g, '\\n')}'`);
      try{
        var sel = fdWebExtension.fdGetSelectionCustom(controlId);
        window.SpeechHandler.insertText(text);

        fdWebExtension.fdLog(`fdInsertTextCustom - text inserted`);
        
        // set caret to new location after text inserted
        fdWebExtension.fdSetSelectionCustom(
          controlId,
          sel.start + text.length,
          sel.start + text.length,
        );
        return { success: true };
      } catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdInsertTextCustom error ${e}`);
        return{
          success: false,
          errorMessage: `Exception fdInsertTextCustom ${e}`
        }        
      }
    }
  }

  if (!fdWebExtension.fdSetSelectionCustom) {
    fdWebExtension.fdSetSelectionCustom = function(
      controlId,
      selStart,
      selEnd,
    ) {
      fdWebExtension.fdLog(`fdSetSelectionCustom - Intelerad controlId=${controlId} selStart=${selStart} selEnd=${selEnd}`);
      try {
        window.SpeechHandler.setRange(controlId, selStart, selEnd);
      }
      catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - SetSelection error: ${e}`);
        return { 
          success: false,
          errorMessage: `Exception SetSelection ${e}` 
        };
      }

      return { success: true };
    }
  }

  if (!fdWebExtension.fdGetSelectionCustom) {
    fdWebExtension.fdGetSelectionCustom = function(controlId) {
      fdWebExtension.fdLog(`fdGetSelectionCustom - controlId=${controlId}`);
      try{
        var selectionOffset = window.SpeechHandler.getCurrentSelection(controlId);
        if(!selectionOffset) {
          fdWebExtension.fdLog(`fdGetSelectionCustom - could not get current selection from Intelerad control in ${controlId}`);
          return {
            success: false,
            errorMessage: `selection not in control ${controlId}`
          }
        }
        fdWebExtension.fdLog(`fdGetSelectionCustom - selStart=${selectionOffset.startPos} selEnd=${selectionOffset.endPos} selLength=${selectionOffset.endPos - selectionOffset.startPos}`);
        return {
          success: true,
          start: selectionOffset.startPos,
          end: selectionOffset.endPos,
          length: selectionOffset.endPos - selectionOffset.startPos,
        };
      } catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdGetSelectionCustom error: ${e}`);
        return { 
          success: false,
          errorMessage: `Exception fdGetSelectionCustom ${e}` 
        };
      }
    }
  }

  if (!fdWebExtension.fdBoldSelectionCustom) {
    fdWebExtension.fdBoldSelectionCustom = function(controlId) {
      fdWebExtension.fdLog(`fdBoldSelectionCustom - Intelerad controlId=${controlId}`);
      try{
        window.SpeechHandler.boldSelection();
        return { success: true };
      } catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdBoldSelectionCustom error: ${e}`);
        return { 
          success: false,
          errorMessage: `Exception fdBoldSelectionCustom ${e}` 
        };
      }
    }
  }

  if (!fdWebExtension.fdItalicizeSelectionCustom) {
    fdWebExtension.fdItalicizeSelectionCustom = function(controlId) {
      fdWebExtension.fdLog(`fdItalicizeSelectionCustom - Intelerad controlId=${controlId}`);
      try{
        window.SpeechHandler.italicizeSelection();
        return { success: true };
      } catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdBoldSelectionCustom error: ${e}`);
        return { 
          success: false,
          errorMessage: `Exception fdBoldSelectionCustom ${e}` 
        };        
      }
    }
  }

  if (!fdWebExtension.fdUnderlineSelectionCustom) {
    fdWebExtension.fdUnderlineSelectionCustom = function(controlId) {
      fdWebExtension.fdLog(`fdUnderlineSelectionCustom - Intelerad controlId=${controlId}`);
      try{
        window.SpeechHandler.underlineSelection();
        return { success: true };
      } catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdUnderlineSelectionCustom error: ${e}`);
        return { 
          success: false,
          errorMessage: `Exception fdUnderlineSelectionCustom ${e}` 
        }; 
      }
    }
  }

  if (!fdWebExtension.fdDeleteSelectionCustom) {
    fdWebExtension.fdDeleteSelectionCustom = function(controlId) {
      fdWebExtension.fdLog(`fdDeleteSelectionCustom - Intelerad controlId=${controlId}`);
      try{
      window.SpeechHandler.deleteSelection();
      return { success: true };
      } catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdDeleteSelectionCustom error: ${e}`);
        return { 
          success: false,
          errorMessage: `Exception fdDeleteSelectionCustom ${e}` 
        };        
      }
    }
  }

  if (!fdWebExtension.fdUndoCustom) {
    fdWebExtension.fdUndoCustom = function(controlId) {
      fdWebExtension.fdLog(`fdUndoCustom - Intelerad controlId=${controlId}`);
      try{
        window.SpeechHandler.undo();
        return { success: true };
      } catch (e) {
        fdWebExtension.fdLog(`fdWebExtension - fdUndoCustom error: ${e}`);
        return { 
          success: false,
          errorMessage: `Exception fdUndoCustom ${e}` 
        };        
      }
    }
  }
}

if (!fdWebExtension.fdGetUserId) {
  fdWebExtension.fdGetUserId = function() {
    //console.debug("fdGetUserId called");
    var {userId, persist} = fdWebExtension.fdGetUserId.meditech()
    if (userId !== undefined) {
      //console.debug("fdGetUserId: " + userId);
      fdWebExtension.userId = userId;
      if (persist) {
        fdWebExtension.saveToStorage('fdWebExtension.userId',userId);
      }
    }
    // return value (set here or from storage) 
    return fdWebExtension.userId;
  };
}

if (!fdWebExtension.fdGetUserId.meditech) {
  fdWebExtension.fdGetUserId.meditech = function() {
    var userIdElem = document.getElementById('userIdentity');
    if (userIdElem != null) {
      var txt = userIdElem.innerText;
      if (txt) {
        var regex = /"(.*)\@meditech.com"/;
        var match = regex.exec(txt);
        if (match) {
          var userId = match[1];
        }
      }
    } else if (fdWebExtension.userId && document.title === 'Logged Out') {
        var userId = '';
    }
    return {userId: userId, persist: true};
  }
}

if (!fdWebExtension.fdInitializeApi) {
  // this is mostly for onco. It uses something called a RadEditor, from telerek,
  // in some views. this editor seems to be going away, in favor of Draftjs.
  // lets just attempt to look for the radeditor, and attach our focus listeners
  // to the body of the editor.
  // the editor looks something like this:
  // <iframe>
  //   <head>
  //    <style/>
  //    <link id="RADEDITORSTYLESHEET#"/>...
  //   <body></body>
  // <iframe>
  fdWebExtension.fdAttachFocusListenerRadEditor = function(doc) {
    if (doc == null) {
      return;
    }

    // look for the link with radeditorstylesheet0, we can assume that's a radeditor in onco
    let radStyle = doc.querySelector('#RADEDITORSTYLESHEET0');
    if (radStyle != null) {
      let body = doc.querySelector('body');
      if (body != null) {
        fdWebExtension.fdAddFocusListeners(body);
        body.setAttribute('fdRadEditorFound', 'true');
      }
    }

    if (doc.head == null) {
      return;
    }

    // annoyingly, the style sheet link can be added after the document loads
    // so look for changes in this frame, and disconnect the observer if we find
    // a change that looks like an updated rad editor.
    let observer = new MutationObserver(function(mutations, caller) {
      [].forEach.call(mutations, function(mutation) {
        if (mutation.target != null) {
          let link = mutation.target.querySelector('link');
          if (link != null && link.id != null) {
            if (link.id == 'RADEDITORSTYLESHEET0') {
              ownerdoc = link.ownerDocument;
              if (ownerdoc != null) {
                body = ownerdoc.querySelector('body');
                if (body != null) {
                  fdWebExtension.fdAddFocusListeners(body);
                  body.setAttribute('fdRadEditorFound', 'true');
                }
              } // we found it, no need to keep watching
              caller.disconnect();
            }
          }
        }
      });
    });
    observer.observe(doc.head, {
      childList: true,
      attributes: false,
      characterData: false,
      subtree: false,
    });
  };

  fdWebExtension.fdAttachFocusListeners = function(doc) {
    window.addEventListener('focus', fdWebExtension.fdFocusListener, false);

    if (fdWebExtension.fdHandleMSpeechApiCustomEvent) {
      window.addEventListener(
        'MSpeechAPI',
        fdWebExtension.fdHandleMSpeechApiCustomEvent,
        false,
      );
    }

    if (doc == null) {
      return;
    }
    try {
      // 'blur' is called when a field/item loses focus, 'focus' is called when
      // an item gains focus. So listen for both
      [].forEach.call(doc.querySelectorAll('input'), function(el) {
        if ((el.type == 'text' || el.type == 'search') && el.className != 'textBoxNode') {
          fdWebExtension.fdAddFocusListeners(el);
        }
      });
      [].forEach.call(doc.querySelectorAll('textarea'), function(el) {
        fdWebExtension.fdAddFocusListeners(el);
      });
      [].forEach.call(doc.querySelectorAll('[contenteditable]'), function(el) {
        if (el.isContentEditable) {
          fdWebExtension.fdAddFocusListeners(el);
        }
      });

      // for iframes, listen for on load event. Drill down on both frames &
      // iframes, attaching listeners to their containing documents, after they are available
      [].forEach.call(doc.querySelectorAll('iframe'), function(el) {
        if (el.contentDocument) {
          switch (el.contentDocument.readyState){
            case 'interactive':
            case 'complete':
              if(el.contentDocument.URL == 'about:blank'){
                el.contentDocument.addEventListener(
                  'DOMContentLoaded',
                  fdWebExtension.fdDOMContentLoadedEventListener,
                  false,
                );
              } else {
                // in case the contents were already loaded...
                fdWebExtension.fdAttachListenersToDocument(el.contentDocument);
              }
              break;
            case 'uninitialized':
            case 'loading':
            case 'loaded':
            default:
              el.contentDocument.addEventListener(
                'DOMContentLoaded',
                fdWebExtension.fdDOMContentLoadedEventListener,
                false,
              );
            break;
          }
        }
      });
      [].forEach.call(doc.querySelectorAll('frame'), function(el) {
        fdWebExtension.fdAttachFocusListeners(el.contentDocument);
      });

      //Athena slateJs controls change/destroy/add after losing focus and saving, 
      //and they lose the fdUniqueId for us to track them. This code adds an observer
      //to track this change so FD doesn't mistake the controls for level 2 controls
      if (window.AH) {
        fdWebExtension.fdAthenaSlateJsAttachListeners(window.document);
      }
    } catch (error) {
      console.error(error);
      fdWebExtension.fdLog(error);
    }
  };

  fdWebExtension.fdAddFocusListeners = function(element, includeChildren = false)
  {
    //console.warn("Added listener:");
    //console.warn(element);
    if(includeChildren)
    {
      element.addEventListener('focusin', fdWebExtension.fdBlurListener, false);
      element.addEventListener('focusout', fdWebExtension.fdFocusListener, false);
    }
    else
    {
      element.addEventListener('focus', fdWebExtension.fdBlurListener, false);
      element.addEventListener('blur', fdWebExtension.fdFocusListener, false);
    }
  }

  fdWebExtension.fdRemoveFocusListeners = function(element, includeChildren = false)
  {
    if(includeChildren)
    {
      element.removeEventListener('focusin', fdWebExtension.fdBlurListener, false);
      element.removeEventListener('focusout', fdWebExtension.fdFocusListener, false);
    }
    else
    {
      element.removeEventListener('focus', fdWebExtension.fdBlurListener, false);
      element.removeEventListener('blur', fdWebExtension.fdFocusListener, false);
    }
  }

  fdWebExtension.fdObserveMutations = function(doc) {
    // have we already started observing? are we ready to observe, i.e. have a valid doc body?
    if (doc != null && doc.body == null) {
      return;
    }

    if (!fdWebExtension.fdMutationObserver){
      fdWebExtension.fdMutationObserver = new MutationObserver(function(
        mutations,
      ) {
        var attached = false;
        //Athena slateJs controls change/destroy/add after losing focus and saving, 
        //and they lose the fdUniqueId for us to track them. This code adds an observer
        //to track this change so FD doesn't mistake the controls for level 2 controls
        if (window.AH) {
          fdWebExtension.fdAthenaSlateJsAttachListeners(window.document);
        }

        mutations.forEach(function(mutation) {
          if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            var hasClass = [].forEach.call(mutation.addedNodes, function(el) {
              if (el.nodeType != Node.TEXT_NODE && el.nodeType != Node.COMMENT_NODE) {
                fdWebExtension.fdAttachFocusListeners(el);
                attached = true;
              }
            });
          }
        });
        if (attached) {
          // we have an element added, push a focus change just in case...
          fdWebExtension.fdPushFocusChange();
        }
      });
     }
    fdWebExtension.fdMutationObserver.observe(doc.body, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });
  };

  fdWebExtension.fdInitializeApi = function() {
    var customResult = fdWebExtension.fdInitializeCustomApi
      ? fdWebExtension.fdInitializeCustomApi()
      : null;
    if (customResult && !customResult.success) {
      return customResult;
    }
    fdWebExtension.fdPushFocusChange(); // in case there was a focus change that caused the reconnect...

    return { success: true };
  };

  // Rich Text Editor entry points
  fdWebExtension.fdGetFocusedControlIdRichTextEditor = function() {
    var mainWindow = fdWebExtension.fdGetMainWindow();

    try{
      //quill
      var quillEd = fdWebExtension.fdGetFocusedControlIdQuill(mainWindow);
      if (quillEd && quillEd.success)
        return quillEd;

      // ck4Ed
      var ck4Ed = fdWebExtension.fdGetFocusedControlIdCkEditor4(mainWindow);
      if(ck4Ed && ck4Ed.success) {
        return ck4Ed;
      }

      return null;
    } catch (ex) {
      fdWebExtension.fdLog(`error getting rich text editor ${ex}`);
      return null;
    }
  };

  fdWebExtension.fdSetSelectionRichTextEditor = function(element, selStart, selEnd){
    // quill
    var quillEd = fdWebExtension.fdGetQuillInstanceFromElement(element);
    if (quillEd) {
      return fdWebExtension.fdSetSelectionQuill(quillEd, selStart, selEnd);
    }

    // ck4
    var ck4Ed = fdWebExtension.fdGetCkEditor4InstanceFromElement(element);
    if(ck4Ed) {
      return fdWebExtension.fdSetSelectionCkEditor4(ck4Ed, selStart, selEnd);
    }

    return { success: false };
  };

  fdWebExtension.fdGetSelectionRichTextEditor = function(element) {
    // quill
    var quillEd = fdWebExtension.fdGetQuillInstanceFromElement(element);
    if (quillEd){
      return fdWebExtension.fdGetSelectionQuill(quillEd);
    }

    var ck4Ed = fdWebExtension.fdGetCkEditor4InstanceFromElement(element);
    if (ck4Ed) {
      return fdWebExtension.fdGetSelectionCkEditor4(ck4Ed);
    }

    return { success: false };
  }

  fdWebExtension.fdGetTextRichTextEditor = function(element) {
    // quill
    var quillEd = fdWebExtension.fdGetQuillInstanceFromElement(element)
    if (quillEd) {
      var textContent = fdWebExtension.fdGetTextQuill(quillEd);
      return { success: true, text: textContent };
    }

    // ck4
    var ck4Ed = fdWebExtension.fdGetCkEditor4InstanceFromElement(element);
    if (ck4Ed) {
      var textContent = fdWebExtension.fdGetTextCkEditor4(ck4Ed);
      return { success: true, text: textContent };
    }

    return { success: false };
  };

  fdWebExtension.fdInsertTextRichTextEditor = function (element, text) {
    //quill
    var quillEd = fdWebExtension.fdGetQuillInstanceFromElement(element);
    if (quillEd) {
      return fdWebExtension.fdInsertIntoQuill(quillEd, text);
    }

    // ck4
    var ck4Ed = fdWebExtension.fdGetCkEditor4InstanceFromElement(element);
    if (ck4Ed) {
      return fdWebExtension.fdInsertIntoCkEditor4(ck4Ed, text);
    }

    return { success: false };
  }

  // Quill Editor API functions
  fdWebExtension.fdGetQuillInstanceFromElement = function(element) {
    if (!element) return null;

    var activeEl = fdWebExtension.getActiveElement(fdWebExtension.fdGetMainWindow());
    var containers = [];

    var addContainer = function(candidate) {
      if (!candidate) return;
      if (containers.indexOf(candidate) < 0) {
        containers.push(candidate);
      }
    };

    var resolveContainerFromNode = function(node) {
      if (!node) return null;

      if (node.classList && node.classList.contains('ql-container')) {
        return node;
      }

      if (
        node.classList &&
        node.classList.contains('ql-editor') &&
        node.parentElement &&
        node.parentElement.classList &&
        node.parentElement.classList.contains('ql-container')
      ) {
        return node.parentElement;
      }

      return null;
    };

    var resolveQuillFromContainer = function(container) {
      if (!container) return null;

      var containerWin = (container.ownerDocument && container.ownerDocument.defaultView) || window;
      if (containerWin.Quill && typeof containerWin.Quill.find === 'function') {
        try {
          var found = containerWin.Quill.find(container, true);
          if (found && typeof found.getSelection === 'function') return found;

          if (found && found.scroll && found.scroll.domNode) {
            var q = containerWin.Quill.find(found.scroll.domNode, true);
            if (q && typeof q.getSelection === 'function') return q;
          }
        } catch (_) {}
      }

      if (container.__quill) return container.__quill;

      return null;
    };

    var isNodeWithin = function(node, possibleAncestor) {
      if (!node || !possibleAncestor) return false;

      var current = node;
      var depth = 0;
      while (current && depth++ < 100) {
        if (current === possibleAncestor) {
          return true;
        }

        if (current.parentNode) {
          current = current.parentNode;
          continue;
        }

        var root = fdWebExtension.fdGetSelectionRoot(current);
        if (root && root.host) {
          current = root.host;
          continue;
        }

        break;
      }

      return false;
    };

    var collectContainersFrom = function(startNode) {
      if (!startNode) return;

      var seed = startNode;
      // If the seed is a shadow host, drill to its focused descendant first.
      while (seed && seed.shadowRoot && seed.shadowRoot.activeElement) {
        seed = seed.shadowRoot.activeElement;
      }

      var cursor = seed;
      var maxDepth = 100;
      while (cursor && maxDepth-- > 0) {
        addContainer(resolveContainerFromNode(cursor));

        if (cursor.parentElement) {
          cursor = cursor.parentElement;
          continue;
        }

        var cursorRoot = fdWebExtension.fdGetSelectionRoot(cursor);
        if (cursorRoot && cursorRoot.host) {
          cursor = cursorRoot.host;
          continue;
        }

        break;
      }
    };

    // Collect only from element and active-element ancestry; never first-match query a full shadow root.
    collectContainersFrom(element);
    if (activeEl && activeEl !== element) {
      collectContainersFrom(activeEl);
    }

    if (containers.length <= 0) return null;

    // Prefer the instance that contains the deep active element.
    for (var i = 0; i < containers.length; i++) {
      var instance = resolveQuillFromContainer(containers[i]);
      if (!instance || !instance.root) continue;

      if (isNodeWithin(activeEl, instance.root)) {
        return instance;
      }
    }

    // Fallback to first resolvable instance.
    for (var j = 0; j < containers.length; j++) {
      var fallback = resolveQuillFromContainer(containers[j]);
      if (fallback) return fallback;
    }

    return null;
  };

  fdWebExtension.fdGetFocusedControlIdQuill = function (window) {
    if (!window.Quill) return null;

    var el = fdWebExtension.getActiveElement(window);
    var quillEl = fdWebExtension.fdGetQuillInstanceFromElement(el);

    if(!quillEl){
      return {
        success: false,
        focusedControlId: null
      };
    }

    fdWebExtension.fdSetUniqueId(el);
    return{
      success : true,
      focusedControlId: el.getAttribute(fdWebExtension.fdControlIdAttribute)
    }
  };

  // Maps a native DOM point (node + char/child offset) to a Quill model index.
  // Quill's model has a \n at the end of every block (paragraph, li, etc.).
  // Range.toString() does NOT yield those implicit terminators, so plain text
  // length underestimates the Quill index by 1 per completed paragraph before the caret.
  //
  // We use blot.offset(quill.scroll) which exists in Quill 1.x and 2.x and already
  // returns a block-terminator-correct model index for any blot.
  fdWebExtension.fdGetQuillIndexFromDomPoint = function(quill, node, offset) {
    if (!quill || !quill.root || !node) return null;
    if (!quill.root.contains(node)) return null;

    // Blot-based path: blot.offset(quill.scroll) is available on all Quill 1.x/2.x blots
    // and already accounts for the implicit \n at the end of each block.
    var quillWin = (quill.root.ownerDocument && quill.root.ownerDocument.defaultView) || window;
    if (quillWin.Quill && typeof quillWin.Quill.find === 'function' && quill.scroll) {
      try {
        var blot = quillWin.Quill.find(node, true); // bubble = true: walk up to nearest blot
        if (blot && blot !== quill.scroll && typeof blot.offset === 'function') {
          var blotBase = blot.offset(quill.scroll);
          var localOff = 0;

          if (blot.domNode === node) {
            // Direct hit on the blot's own domNode: offset is a char index into it.
            localOff = offset;
          } else {
            // blot.domNode is an ancestor of node; measure text chars from blot start to caret.
            var lr = quill.root.ownerDocument.createRange();
            lr.setStart(blot.domNode, 0);
            lr.setEnd(node, offset);
            localOff = lr.toString().length;
          }

          return blotBase + localOff;
        }
      } catch (_) {}
    }

    // Fallback: Range.toString() length plus completed block count.
    // Only count blocks that are STRICTLY before the caret node, not ones that CONTAIN it.
    // (compareDocumentPosition returns DOCUMENT_POSITION_FOLLOWING|DOCUMENT_POSITION_CONTAINED_BY
    // when node is a descendant, so we must exclude the CONTAINED_BY case.)
    try {
      var doc = quill.root.ownerDocument;
      var preRange = doc.createRange();
      preRange.setStart(quill.root, 0);
      preRange.setEnd(node, offset);
      var textLen = preRange.toString().length;

      var blocksBefore = 0;
      var blocks = quill.root.children;
      for (var bi = 0; bi < blocks.length; bi++) {
        var block = blocks[bi];
        var pos = block.compareDocumentPosition(node);
        var isAfter      = !!(pos & Node.DOCUMENT_POSITION_FOLLOWING);   // 4
        var isContained  = !!(pos & Node.DOCUMENT_POSITION_CONTAINED_BY); // 16
        if (isAfter && !isContained) {
          blocksBefore++;
        }
      }

      return textLen + blocksBefore;
    } catch (_) {}

    return null;
  };

  fdWebExtension.fdInsertIntoQuill = function(quill, text){
    if (!quill) return { success: false };

    var index = null;
    var selLength = 0;

    // First try Quill's own selection (works correctly in light DOM and Quill 2.x).
    try {
      var qRange = quill.getSelection();
      if (qRange) {
        index = qRange.index;
        selLength = qRange.length || 0;
      }
    } catch (_) {}

    // Always prefer native shadow-root selection when it resolves successfully.
    // quill.getSelection() in shadow DOM (Quill 1.x) uses document.getSelection() which
    // doesn't see inside shadow roots; it may return a stale or wrong index even when
    // non-null/non-zero. fdGetQuillIndexFromDomPoint uses blot.offset() from Quill's own
    // internals so it is equally accurate in light DOM and correct in shadow DOM.
    if (quill.root) {
      try {
        var nativeSel = fdWebExtension.fdGetSelectionForElement(quill.root);
        if (nativeSel && nativeSel.rangeCount > 0) {
          var nativeRange = nativeSel.getRangeAt(0);
          if (quill.root.contains(nativeRange.startContainer)) {
            var nativeStart = fdWebExtension.fdGetQuillIndexFromDomPoint(quill, nativeRange.startContainer, nativeRange.startOffset);
            var nativeEnd   = fdWebExtension.fdGetQuillIndexFromDomPoint(quill, nativeRange.endContainer,   nativeRange.endOffset);
            if (nativeStart !== null) {
              index     = nativeStart;
              selLength = (nativeEnd !== null && nativeEnd > nativeStart) ? nativeEnd - nativeStart : 0;
            }
          }
        }
      } catch (ex) {
        fdWebExtension.fdLog(`error inserting into quill ${ex}`);
      }
    }

    // savedRange fallback.
    if (index === null) {
      try {
        if (quill.selection && quill.selection.savedRange && typeof quill.selection.savedRange.index === 'number') {
          index     = quill.selection.savedRange.index;
          selLength = quill.selection.savedRange.length || 0;
        }
      } catch (_) {}
    }

    if (index === null) {
      index = Math.max(quill.getLength() - 1, 0);
    }

    // Clamp to valid range.
    var maxIndex = Math.max(quill.getLength() - 1, 0);
    index = Math.max(0, Math.min(index, maxIndex));

    // If text was selected, replace it.
    if (selLength > 0) {
      quill.deleteText(index, selLength, 'user');
    }

    quill.insertText(index, text, 'user');
    quill.setSelection(index + text.length, 0, 'silent');
    return { success: true };
  };

  fdWebExtension.fdGetTextQuill = function(quill){
    if (!quill || typeof quill.getText !== 'function') return null;
    return quill.getText();    
  };

  fdWebExtension.fdGetSelectionQuill = function(quill) {
    if (!quill){
      return { success: false, start: 0, end: 0, length: 0 };
    }

    // Always prefer native selection mapped via fdGetQuillIndexFromDomPoint.
    // quill.getSelection() in Quill 1.x uses document.getSelection() internally;
    // in shadow DOM that returns a wrong (off-by-N-paragraphs) index even when non-null.
    if (quill.root) {
      try {
        var nativeSel = fdWebExtension.fdGetSelectionForElement(quill.root);
        if (nativeSel && nativeSel.rangeCount > 0) {
          var nativeRange = nativeSel.getRangeAt(0);
          if (quill.root.contains(nativeRange.startContainer)) {
            var startIdx = fdWebExtension.fdGetQuillIndexFromDomPoint(quill, nativeRange.startContainer, nativeRange.startOffset);
            var endIdx   = fdWebExtension.fdGetQuillIndexFromDomPoint(quill, nativeRange.endContainer,   nativeRange.endOffset);
            if (startIdx !== null && endIdx !== null) {
              return {
                success: true,
                start:  startIdx,
                end:    endIdx,
                length: endIdx - startIdx,
              };
            }
          }
        }
      } catch (_) {}
    }

    // Fallback to Quill's own selection (light DOM, Quill 2.x, or if native failed).
    var range = quill.getSelection();
    if (range) {
      return {
        success: true,
        start: range.index,
        end: range.index + range.length,
        length: range.length,
      };
    }

    return { success: false, start: 0, end: 0, length: 0 };
  };

  fdWebExtension.fdSetSelectionQuill = function(quill, start, end){
    if (!quill) {
      return { success: false };
    }

    var len = end - start;
    if (end < 0) {
      len = Math.max(quill.getLength() - 1, 0); // select all
    }

    var maxLen = Math.max(quill.getLength() - 1, 0);
    var safeStart = Math.max(0, Math.min(start, maxLen));
    var safeLen   = Math.max(0, Math.min(len, maxLen - safeStart));

    // In shadow DOM, quill.setSelection() (Quill 1.x) calls document.getSelection()
    // internally to set the native range, but document.getSelection() cannot reach inside
    // a shadow root. This produces an off-by-1 (or more) visual offset.
    // Fix: use quill.scroll.leaf() to get the exact DOM node+offset for each Quill model
    // index, then apply the range via the shadow-root-scoped selection API.
    if (quill.root && quill.scroll && typeof quill.scroll.leaf === 'function') {
      try {
        var startPair = quill.scroll.leaf(safeStart);
        var endPair   = quill.scroll.leaf(safeStart + safeLen);

        var startBlot = startPair[0];
        var startOff  = startPair[1];
        var endBlot   = endPair[0];
        var endOff    = endPair[1];

        if (startBlot && endBlot && startBlot.domNode && endBlot.domNode) {
          var nativeSel = fdWebExtension.fdGetSelectionForElement(quill.root);
          if (nativeSel) {
            var range = quill.root.ownerDocument.createRange();
            range.setStart(startBlot.domNode, startOff);
            range.setEnd(endBlot.domNode, endOff);
            nativeSel.removeAllRanges();
            nativeSel.addRange(range);
            return { success: true };
          }
        }
      } catch (_) {}
    }

    // Fallback: Quill's own setSelection (works in light DOM / Quill 2.x)
    quill.setSelection(safeStart, safeLen, 'silent');
    return { success: true };
  };

// ---- CKEditor 4 ----------------------------------------------------------

  fdWebExtension.fdGetCkEditor4EditableElement = function(editor) {
    if (!editor) return null;

    try {
      if (typeof editor.editable === 'function') {
        var editable = editor.editable();
        if (editable && editable.$) return editable.$;
      }
    } catch (ex) {
      fdWebExtension.fdLog(`error in ck4 get editable elment ${ex}`);
    }

    try {
      if (editor.container && editor.container.$) return editor.container.$;
    } catch (_) {}

    return null;
  };

  // CK4 is normally loaded on the top page; if we're inside the editor's iframe,
  // window.CKEDITOR will be undefined. Walk up frame parents to find it.
  fdWebExtension.fdFindCkEditor4Global = function(startWin) {
    var win = startWin || window;
    for (var i = 0; i < 10; i++) {
      try {
        if (win && win.CKEDITOR && win.CKEDITOR.instances) return win.CKEDITOR;
      } catch (_) {}
      try {
        if (!win || win.parent === win) break;
        win = win.parent;
      } catch (_) {
        break;
      }
    }
    return null;
  };

  fdWebExtension.fdGetCkEditor4InstanceFromElement = function(element, ckGlobal) {
    if (!element) return null;

    var CKE = ckGlobal ||
      fdWebExtension.fdFindCkEditor4Global(element.ownerDocument && element.ownerDocument.defaultView) ||
      fdWebExtension.fdFindCkEditor4Global(window);
    if (!CKE || !CKE.instances) return null;

    var instances = CKE.instances;

    for (var name in instances) {
      if (!Object.prototype.hasOwnProperty.call(instances, name)) continue;
      var editor = instances[name];
      var editableEl = fdWebExtension.fdGetCkEditor4EditableElement(editor);
      if (!editableEl) continue;

      if (editableEl === element) return editor;

      try {
        if (editableEl.contains && editableEl.contains(element)) return editor;
      } catch (_) {}

      // Classic editors host the editable BODY inside an iframe; the
      // activeElement in the host doc is the IFRAME itself.
      try {
        if (element.tagName === 'IFRAME' &&
            element.contentDocument &&
            element.contentDocument.body === editableEl) {
          return editor;
        }
      } catch (_) {}
    }

    return null;
  };

  fdWebExtension.fdGetFocusedControlIdCkEditor4 = function(window) {
    var CKE = fdWebExtension.fdFindCkEditor4Global(window);
    if (!CKE) {
      return { success: false, focusedControlId: null };
    }

    var el = window.document.activeElement;

    // Drill into iframe (classic CK4) to find the real focused element.
    if (el && el.tagName === 'IFRAME') {
      try {
        var innerDoc = el.contentDocument;
        if (innerDoc && innerDoc.activeElement) {
          el = innerDoc.activeElement;
        } else if (innerDoc && innerDoc.body) {
          el = innerDoc.body;
        }
      } catch (_) {}
    }

    var editor = fdWebExtension.fdGetCkEditor4InstanceFromElement(el, CKE);
    if (!editor) {
      return { success: false, focusedControlId: null };
    }

    var editableEl = fdWebExtension.fdGetCkEditor4EditableElement(editor) || el;
    fdWebExtension.fdSetUniqueId(editableEl);

    return {
      success: true,
      focusedControlId: editableEl.getAttribute(fdWebExtension.fdControlIdAttribute)
    };
  };

  fdWebExtension.fdInsertIntoCkEditor4 = function(editor, text) {
    if (!editor || typeof text !== 'string') {
      return { success: false };
    }

    try {
      editor.focus();
      if (typeof editor.insertText === 'function') {
        editor.insertText(text);
      } else if (typeof editor.insertHtml === 'function') {
        var escaped = text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\n/g, '<br>');
        editor.insertHtml(escaped);
      } else {
        return { success: false };
      }
      return { success: true };
    } catch (_) {
      return { success: false };
    }
  };

  fdWebExtension.fdGetTextCkEditor4 = function(editor) {
    if (!editor) return null;

    var editableEl = fdWebExtension.fdGetCkEditor4EditableElement(editor);
    if (!editableEl) return null;

    return editableEl.innerText || '';
  };

  // Walk text nodes inside the editable, treating BR as a single newline char and
  // adjacent block elements (p, h1, etc.) as \n\n, aligned with innerText semantics.
  fdWebExtension.fdCkEditor4FindNodeAtOffset = function(editableEl, targetOffset) {
    var blockTags = { P: 1, DIV: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1,
                      BLOCKQUOTE: 1, LI: 1, SECTION: 1, ARTICLE: 1, HEADER: 1, FOOTER: 1 };
    var doc = editableEl.ownerDocument;
    var walker = doc.createTreeWalker(
      editableEl,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
      null,
      false
    );

    var consumed = 0;
    var seenBlock = false;
    var lastTextNode = null;
    var node = walker.nextNode();

    while (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var len = node.nodeValue.length;
        if (targetOffset <= consumed + len) {
          return { node: node, offset: targetOffset - consumed };
        }
        consumed += len;
        lastTextNode = node;
      } else if (node.nodeName === 'BR') {
        // Skip a trailing BR only when it has siblings (e.g. <p>text<br></p>).
        // innerText does not produce a newline for those.
        // A BR that is the ONLY child (<p><br></p>) represents a visible empty line
        // and MUST be counted as +1 to match innerText.
        var parentEl = node.parentNode;
        var isTrailingWithSiblings = parentEl !== editableEl &&
                                     blockTags[parentEl.nodeName] &&
                                     parentEl.lastChild === node &&
                                     parentEl.childNodes.length > 1;
        if (!isTrailingWithSiblings) {
          if (targetOffset <= consumed) {
            var idx = Array.prototype.indexOf.call(parentEl.childNodes, node);
            return { node: parentEl, offset: idx };
          }
          consumed += 1;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE && node.parentNode === editableEl &&
                 blockTags[node.nodeName]) {
        // Adjacent block elements produce \n\n in innerText; add 2 per transition (not before the first).
        if (seenBlock) {
          if (targetOffset <= consumed) {
            return { node: node, offset: 0 };
          }
          consumed += 2;
          if (targetOffset <= consumed) {
            return { node: node, offset: 0 };
          }
        }
        seenBlock = true;
      }
      node = walker.nextNode();
    }

    if (lastTextNode) {
      return { node: lastTextNode, offset: lastTextNode.nodeValue.length };
    }
    return { node: editableEl, offset: editableEl.childNodes.length };
  };

  fdWebExtension.fdCkEditor4OffsetOfDomPoint = function(editableEl, targetNode, targetOffset) {
    if (!targetNode) return 0;

    // If the point is on an element, resolve to its child at the offset (or end of children).
    var resolvedNode = targetNode;
    var resolvedOffset = targetOffset;
    if (targetNode.nodeType === Node.ELEMENT_NODE) {
      if (targetOffset < targetNode.childNodes.length) {
        resolvedNode = targetNode.childNodes[targetOffset];
        resolvedOffset = 0;
      } else if (targetNode.childNodes.length > 0) {
        var last = targetNode.childNodes[targetNode.childNodes.length - 1];
        if (last.nodeType === Node.TEXT_NODE) {
          resolvedNode = last;
          resolvedOffset = last.nodeValue.length;
        } else {
          resolvedNode = last;
          resolvedOffset = 0;
          // walk past it below
        }
      }
    }

    var doc = editableEl.ownerDocument;
    var walker = doc.createTreeWalker(
      editableEl,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
      null,
      false
    );

    var blockTags = { P: 1, DIV: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1,
                      BLOCKQUOTE: 1, LI: 1, SECTION: 1, ARTICLE: 1, HEADER: 1, FOOTER: 1 };
    var consumed = 0;
    var seenBlock = false;
    var node = walker.nextNode();

    while (node) {
      if (node === resolvedNode) {
        if (node.nodeType === Node.TEXT_NODE) {
          return consumed + Math.min(resolvedOffset, node.nodeValue.length);
        }
        return consumed;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        consumed += node.nodeValue.length;
      } else if (node.nodeName === 'BR') {
        // Skip a trailing BR only when it has siblings (e.g. <p>text<br></p>).
        // A BR that is the ONLY child (<p><br></p>) is a visible empty line and must be counted.
        var brParent = node.parentNode;
        var isTrailingBrWithSiblings = brParent !== editableEl &&
                                       blockTags[brParent.nodeName] &&
                                       brParent.lastChild === node &&
                                       brParent.childNodes.length > 1;
        if (!isTrailingBrWithSiblings) consumed += 1;
      } else if (node.nodeType === Node.ELEMENT_NODE && node.parentNode === editableEl &&
                 blockTags[node.nodeName]) {
        // Adjacent block elements produce \n\n in innerText; add 2 per transition (not before the first).
        if (seenBlock) consumed += 2;
        seenBlock = true;
      }
      node = walker.nextNode();
    }

    return consumed;
  };

  fdWebExtension.fdGetSelectionCkEditor4 = function(editor) {
    if (!editor) {
      return { success: false, start: 0, end: 0, length: 0 };
    }

    try {
      var sel = editor.getSelection();
      if (!sel) return { success: false, start: 0, end: 0, length: 0 };

      var ranges = sel.getRanges();
      if (!ranges || ranges.length === 0) {
        return { success: false, start: 0, end: 0, length: 0 };
      }

      var range = ranges[0];
      var editableEl = fdWebExtension.fdGetCkEditor4EditableElement(editor);
      if (!editableEl) return { success: false, start: 0, end: 0, length: 0 };

      var startNode = range.startContainer && range.startContainer.$;
      var endNode = range.endContainer && range.endContainer.$;

      var start = fdWebExtension.fdCkEditor4OffsetOfDomPoint(editableEl, startNode, range.startOffset);
      var end = fdWebExtension.fdCkEditor4OffsetOfDomPoint(editableEl, endNode, range.endOffset);

      if (end < start) {
        var tmp = start; start = end; end = tmp;
      }

      return {
        success: true,
        start: start,
        end: end,
        length: end - start,
      };
    } catch (_) {
      return { success: false, start: 0, end: 0, length: 0 };
    }
  };

  fdWebExtension.fdSetSelectionCkEditor4 = function(editor, start, end) {
    if (!editor) return { success: false };

    try {
      var CKEDITOR = window.CKEDITOR;
      if (!CKEDITOR) return { success: false };

      var editableEl = fdWebExtension.fdGetCkEditor4EditableElement(editor);
      if (!editableEl) return { success: false };

      var text = fdWebExtension.fdGetTextCkEditor4(editor) || '';
      var maxOffset = text.length;

      var safeStart = Math.max(0, Math.min(start, maxOffset));
      var safeEnd = end < 0 ? maxOffset : Math.max(safeStart, Math.min(end, maxOffset));

      var startPoint = fdWebExtension.fdCkEditor4FindNodeAtOffset(editableEl, safeStart);
      var endPoint = fdWebExtension.fdCkEditor4FindNodeAtOffset(editableEl, safeEnd);

      var range = editor.createRange();
      var startCkNode = new CKEDITOR.dom.node(startPoint.node);
      var endCkNode = new CKEDITOR.dom.node(endPoint.node);

      range.setStart(startCkNode, startPoint.offset);
      range.setEnd(endCkNode, endPoint.offset);

      var sel = editor.getSelection();
      if (sel && typeof sel.selectRanges === 'function') {
        sel.selectRanges([range]);
      } else {
        range.select();
      }

      return { success: true };
    } catch (_) {
      return { success: false };
    }
  };

  fdWebExtension.fdGetFocusedControlId = function() {
    var customResult = fdWebExtension.fdGetFocusedControlIdCustom
      ? fdWebExtension.fdGetFocusedControlIdCustom()
      : null;

    if(fdWebExtension.fdExtensionConfig.focusDebugMode)
    {
      fdWebExtension.displayFocusDebugLabel('');

      var previous = fdWebExtension.lastFocusedControl;

      if(previous !== undefined)
      {
        previous.style.borderWidth = null;
        previous.style.borderColor = null;
        previous.style.borderStyle = null;
        previous.style.backgroundColor = null;
      }
    }

    if (
      customResult &&
      (customResult.focusedControlId || customResult.errorMessage)
    ) {
      return customResult;
    }

    var richEd = fdWebExtension.fdGetFocusedControlIdRichTextEditor
      ? fdWebExtension.fdGetFocusedControlIdRichTextEditor()
      : null;

    if (richEd && (richEd.focusedControlId || richEd.errorMessage)){
      return richEd;
    }

    return fdWebExtension.fdGetFocusedControlIdStandard();
  };

  fdWebExtension.fdGetControlDetails = function(controlId) {
    fdWebExtension.fdLog('fdGetControlDetails - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
        controlId: null,
        controlDetails: null,
      };
    }

    var textControlEl = null;

    if (fdWebExtension.fdFindControlCustom) {
      textControlEl = fdWebExtension.fdFindControlCustom(controlId);
    }

    if (!textControlEl) {
      textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    }

    // for using FD's correction window with Athena, see comments in FD-13659
    if (!textControlEl && window.AH) {
      var baseEl =
        fdWebExtension.fdCache[
          'greatGrandParentElementOfCorrectionWindowElement'
        ];
      var correctionWinElText =
        fdWebExtension.fdCache['correctionWindowElementText'];
      textControlEl = fdWebExtension.fdGetContenteditableDivChildElWithMatchingText(
        baseEl,
        correctionWinElText,
      );
    }

    if (!textControlEl) {
      return {
        success: false,
        errorMessage: 'text control not found',
        controlId: controlId,
        controlDetails: null,
      };
    }

    var elementPath = fdWebExtension.getPathTo(textControlEl);
    var overrideInsertionMethod = fdWebExtension.fdUseSendKeysForInsertingText(textControlEl) ? "AutoIt" : null;

    var elementDetails = {};
    elementDetails.id = textControlEl.id;
    elementDetails.tagName = textControlEl.tagName;
    elementDetails.className = textControlEl.className;
    elementDetails.xPath = elementPath;
    elementDetails.isContentEditable = textControlEl.isContentEditable;
    elementDetails.pageURL = window.location.href;

    fdWebExtension.fdLog(
      `fdGetControlDetails - controlId='${controlId}'` +
      ` id='${textControlEl.id}'` +
      ` tagName='${textControlEl.tagName}'` +
      ` path='${elementPath}'` +
      ` isContentEditable=${textControlEl.isContentEditable}` +
      ` class='${textControlEl.className}'` +
      ` overrideInsertionMethod=${overrideInsertionMethod}`
    );

    return {
      success: true,
      controlId: controlId,
      controlDetails: fdWebExtension.fdIsOnWin ? elementDetails : null,
      overrideInsertionMethod: overrideInsertionMethod
    };
  };

  fdWebExtension.fdGetTabId = function() {
    if (!fdWebExtension.fdTabId) {
      fdWebExtension.fdTabId = fdWebExtension.fdGuid();
      fdWebExtension.fdLog(
        'fdGetTabId - generated tabId=' + fdWebExtension.fdTabId,
      );
    }
    else
    {
      fdWebExtension.fdLog(
        'fdGetTabId - found existing tabId=' + fdWebExtension.fdTabId,
      );
    }

    return {
      success: true,
      tabId: fdWebExtension.fdTabId,
    };
  };

  fdWebExtension.fdGetText = function(controlId) {
    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
        text: null,
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdGetTextCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      var richHandled = fdWebExtension.fdGetTextRichTextEditor(textControlEl);
      if (richHandled && richHandled.success) {
        return richHandled;
      }

      return fdWebExtension.fdGetTextStandard(textControlEl);
    }

    // for using FD's correction window with Athena, see comments in FD-13659
    if (window.AH) {
      var baseEl =
        fdWebExtension.fdCache[
          'greatGrandParentElementOfCorrectionWindowElement'
        ];
      var correctionWinElText =
        fdWebExtension.fdCache['correctionWindowElementText'];
      textControlEl = fdWebExtension.fdGetContenteditableDivChildElWithMatchingText(
        baseEl,
        correctionWinElText,
      );
      if (textControlEl) {
        return fdWebExtension.fdGetTextStandard(textControlEl);
      }
    }

    return {
      success: false,
      errorMessage: 'text control not found',
      text: null,
    };
  };

  fdWebExtension.fdGetTextLength = function(controlId) {
    fdWebExtension.fdLog('fdGetTextLength - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
        textLength: 0,
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdGetTextLengthCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      return fdWebExtension.fdGetTextLengthStandard(textControlEl);
    }

    return {
      success: false,
      errorMessage: 'text control not found',
      textLength: 0,
    };
  };

  fdWebExtension.fdGetSelection = function(controlId) {
    fdWebExtension.fdLog('fdGetSelection - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
        start: 0,
        end: 0,
        length: 0,
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdGetSelectionCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      var richHandled = fdWebExtension.fdGetSelectionRichTextEditor(textControlEl);
      if (richHandled && richHandled.success){
        return richHandled;
      }

      return fdWebExtension.fdGetSelectionStandard(textControlEl);
    }

    // for using FD's correction window with Athena, see comments in FD-13659
    if (window.AH) {
      var baseEl =
        fdWebExtension.fdCache[
          'greatGrandParentElementOfCorrectionWindowElement'
        ];
      var correctionWindowElText =
        fdWebExtension.fdCache['correctionWindowElementText'];
      textControlEl = fdWebExtension.fdGetContenteditableDivChildElWithMatchingText(
        baseEl,
        correctionWindowElText,
      );
      if (textControlEl) {
        return fdWebExtension.fdGetSelectionStandard(textControlEl);
      }
    }

    return {
      success: false,
      errorMessage: 'text control not found',
      start: 0,
      end: 0,
      length: 0,
    };
  };

  fdWebExtension.fdSetSelection = function(controlId, selStart, selEnd) {
    fdWebExtension.fdLog(
      'fdSetSelection - controlId=' +
        controlId +
        ' selStart=' +
        selStart +
        ' selEnd' +
        selEnd,
    );

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdSetSelectionCustom(controlId, selStart, selEnd);
    }

    var textControlEl;

    // for using FD's correction window with Athena, see comments in FD-13659
    if (window.AH) {
      var baseEl =
        fdWebExtension.fdCache[
          'greatGrandParentElementOfCorrectionWindowElement'
        ];
      var correctionWinElText =
        fdWebExtension.fdCache['correctionWindowElementText'];

      textControlEl = fdWebExtension.fdGetContenteditableDivChildElWithMatchingText(
        baseEl,
        correctionWinElText,
      );
      if (textControlEl) {
        // for some fields, need to click on span element so that the corresponding contenteditable div is focused
        var spanElForCorrectionWin = fdWebExtension.fdGetSpanChildElWithMatchingText(
          baseEl,
          correctionWinElText,
        );
        if (spanElForCorrectionWin != null) {
          spanElForCorrectionWin.click();
        }

        return fdWebExtension.fdSetSelectionStandard(
          textControlEl,
          selStart,
          selEnd,
        );
      }
    }

    textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      var richHandled = fdWebExtension.fdSetSelectionRichTextEditor(textControlEl, selStart, selEnd);
      if(richHandled && richHandled.success){
        return richHandled;
      }

      return fdWebExtension.fdSetSelectionStandard(
        textControlEl,
        selStart,
        selEnd,
      );
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  // for using FD's correction window with Athena, see comments in FD-13659
  fdWebExtension.fdGetContenteditableDivChildElWithMatchingText = function(
    baseElement,
    text,
  ) {
    for (var i = 0; i < baseElement.children.length; i++) {
      var childEl = baseElement.children[i];
      if (
        childEl.getAttribute('contenteditable') &&
        childEl.textContent === text
      ) {
        return childEl;
      }
      var match = fdWebExtension.fdGetContenteditableDivChildElWithMatchingText(
        childEl,
        text,
      );
      if (match != null) {
        return match;
      }
    }

    return null;
  };

  // for using FD's correction window with Athena, see comments in FD-13659
  fdWebExtension.fdGetSpanChildElWithMatchingText = function(
    baseElement,
    text,
  ) {
    for (var i = 0; i < baseElement.children.length; i++) {
      var childEl = baseElement.children[i];
      if (
        childEl.tagName.toLowerCase() === 'span' &&
        childEl.textContent === text
      ) {
        return childEl;
      }
      var match = fdWebExtension.fdGetSpanChildElWithMatchingText(
        childEl,
        text,
      );
      if (match != null) {
        return match;
      }
    }

    return null;
  };

  fdWebExtension.fdInsertText = function(controlId, text) {
    fdWebExtension.fdLog(
      'fdInsertText - controlId=' +
        controlId +
        " text='" +
        text.replace(/\n/g, '\\n') +
        "'",
    );

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (fdWebExtension.fdExtensionConfig.replaceSpacesWithNbsp){
      text = text.replaceAll(' ', '\xa0');
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdInsertTextCustom(controlId, text);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      var richHandled = fdWebExtension.fdInsertTextRichTextEditor(textControlEl, text);
      if (richHandled && richHandled.success){
        return richHandled;
      }

      return fdWebExtension.fdInsertTextStandard(textControlEl, text);
    }

    // for using FD's correction window with Athena, see comments in FD-13659
    if (window.AH) {
      var baseEl =
        fdWebExtension.fdCache[
          'greatGrandParentElementOfCorrectionWindowElement'
        ];
      var correctionWinElText =
        fdWebExtension.fdCache['correctionWindowElementText'];
      textControlEl = fdWebExtension.fdGetContenteditableDivChildElWithMatchingText(
        baseEl,
        correctionWinElText,
      );
      if (textControlEl) {
        return fdWebExtension.fdInsertTextStandard(textControlEl, text);
      }
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  fdWebExtension.fdDeleteSelection = function(controlId, text) {
    fdWebExtension.fdLog('fdDeleteSelection - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdDeleteSelectionCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      return fdWebExtension.fdDeleteSelectionStandard(textControlEl);
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  fdWebExtension.fdBoldSelection = function(controlId) {
    fdWebExtension.fdLog('fdBoldSelection - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdBoldSelectionCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      return fdWebExtension.fdBoldSelectionStandard(textControlEl);
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  fdWebExtension.fdItalicizeSelection = function(controlId) {
    fdWebExtension.fdLog('fdItalicizeSelection - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdItalicizeSelectionCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      return fdWebExtension.fdItalicizeSelectionStandard(textControlEl);
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  fdWebExtension.fdUnderlineSelection = function(controlId) {
    fdWebExtension.fdLog('fdUnderlineSelection - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdUnderlineSelectionCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      return fdWebExtension.fdUnderlineSelectionStandard(textControlEl);
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  fdWebExtension.fdCutSelection = function(controlId) {
    fdWebExtension.fdLog('fdCutSelection - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdCutSelectionCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      return fdWebExtension.fdCutSelectionStandard(textControlEl);
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  fdWebExtension.fdCopySelection = function(controlId) {
    fdWebExtension.fdLog('fdCopySelection - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdCopySelectionCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      return fdWebExtension.fdCopySelectionStandard(textControlEl);
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  fdWebExtension.fdPasteSelection = function(controlId) {
    fdWebExtension.fdLog('fdPasteSelection - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdPasteSelectionCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      return fdWebExtension.fdPasteSelectionStandard(textControlEl);
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  fdWebExtension.fdScrollUp = function(controlId) {
    fdWebExtension.fdLog('fdScrollUp - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdScrollUpCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      return fdWebExtension.fdScrollUpStandard(textControlEl);
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  fdWebExtension.fdScrollDown = function(controlId) {
    fdWebExtension.fdLog('fdScrollDown - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdScrollDownCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      return fdWebExtension.fdScrollDownStandard(textControlEl);
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  fdWebExtension.fdScrollCaret = function(controlId) {
    fdWebExtension.fdLog('fdScrollCaret - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdScrollCaretCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      return fdWebExtension.fdScrollCaretStandard(textControlEl);
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  fdWebExtension.fdUndo = function(controlId) {
    fdWebExtension.fdLog('fdUndo - controlId=' + controlId);

    if (!controlId) {
      return {
        success: false,
        errorMessage: 'controlId must be specified',
      };
    }

    if (
      fdWebExtension.fdFindControlCustom &&
      fdWebExtension.fdFindControlCustom(controlId)
    ) {
      return fdWebExtension.fdUndoCustom(controlId);
    }

    var textControlEl = fdWebExtension.fdFindControlStandard(controlId);
    if (textControlEl) {
      return fdWebExtension.fdUndoStandard(textControlEl);
    }

    return {
      success: false,
      errorMessage: 'text control not found',
    };
  };

  fdWebExtension.fdAddMessageHandler('TextControlHandler', function(obj) {
    if (obj.msg == 'GetFocusedControlId') {
      var result = fdWebExtension.fdGetFocusedControlId();

      var isAthena = !!window.AH;
      var isOncoEMR = !!window.OncoEMR;
      var isSmartReports = fdWebExtension.isSmartReports();

      //A race condition can happen when changing focus so double check we are still on the right control a little bit later (FD-20161)
      if(fdWebExtension.fdExtensionConfig.focusChangeRecheckTimer > 0)
      {
        setTimeout(function() 
        {
          fdWebExtension.fdLog("Checking focus again after " + fdWebExtension.fdExtensionConfig.focusChangeRecheckTimer + "ms")
          fdWebExtension.fdPushFocusChange();
        }, fdWebExtension.fdExtensionConfig.focusChangeRecheckTimer);
      }

      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            focusedControlId: result.focusedControlId,
            focusedControlDetails: result.focusedControlDetails ? result.focusedControlDetails : null,
            isAthena: isAthena,
            isOncoEMR: isOncoEMR || isSmartReports,  // for backward compatibility. Both use draftJs.
            isSmartReports: isSmartReports,
            overrideInsertionMethod: result.overrideInsertionMethod
          },
        }),
      );

      return true;
    } else if (obj.msg == 'GetControlDetails') {
      var result = fdWebExtension.fdGetControlDetails(obj.controlId);

      // isSmartReports omitted because it's not used in FD
      var isAthena = !!window.AH;
      var isOncoEMR = !!window.OncoEMR;

      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            controlId: result.controlId,
            controlDetails: result.controlDetails ? result.controlDetails : null,
            isAthena: isAthena,
            isOncoEMR: isOncoEMR,
            overrideInsertionMethod: result.overrideInsertionMethod
          },
        }),
      );

      return true;
    } else if (obj.msg == 'GetTabId') {
      var result = fdWebExtension.fdGetTabId();
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            tabId: result.tabId,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'GetText') {
      var result = fdWebExtension.fdGetText(obj.controlId);
      if(result && result.text)
        result.text = result.text.replaceAll('\xa0', ' ');   //See FDWC-149
      
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            text: result.text,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'GetTextLength') {
      var result = fdWebExtension.fdGetTextLength(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            textLength: result.textLength,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'GetSelection') {
      var result = fdWebExtension.fdGetSelection(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            selectionStart: result.start,
            selectionEnd: result.end,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'SetSelection') {
      var result = fdWebExtension.fdSetSelection(
        obj.controlId,
        obj.selectionStart,
        obj.selectionEnd,
      );
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
          },
        }),
      );

      return true;
    } else if (obj.msg == 'DeleteSelection') {
      var result = fdWebExtension.fdDeleteSelection(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
          },
        }),
      );

      return true;
    } else if (obj.msg == 'InsertText') {
      var result = fdWebExtension.fdInsertText(obj.controlId, obj.text);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
          },
        }),
      );

      return true;
    } else if (obj.msg == 'BoldSelection') {
      var result = fdWebExtension.fdBoldSelection(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            supported: result.supported,
            sendKeysFromFD: result.sendKeysFromFD,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'ItalicizeSelection') {
      var result = fdWebExtension.fdItalicizeSelection(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            supported: result.supported,
            sendKeysFromFD: result.sendKeysFromFD,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'UnderlineSelection') {
      var result = fdWebExtension.fdUnderlineSelection(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            supported: result.supported,
            sendKeysFromFD: result.sendKeysFromFD,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'CutSelection') {
      var result = fdWebExtension.fdCutSelection(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            supported: result.supported,
            sendKeysFromFD: result.sendKeysFromFD,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'CopySelection') {
      var result = fdWebExtension.fdCopySelection(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            supported: result.supported,
            sendKeysFromFD: result.sendKeysFromFD,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'PasteSelection') {
      var result = fdWebExtension.fdPasteSelection(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            supported: result.supported,
            sendKeysFromFD: result.sendKeysFromFD,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'ScrollUp') {
      var result = fdWebExtension.fdScrollUp(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            supported: result.supported,
            sendKeysFromFD: result.sendKeysFromFD,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'ScrollDown') {
      var result = fdWebExtension.fdScrollDown(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            supported: result.supported,
            sendKeysFromFD: result.sendKeysFromFD,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'ScrollCaret') {
      var result = fdWebExtension.fdScrollCaret(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            supported: result.supported,
            sendKeysFromFD: result.sendKeysFromFD,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'Undo' || obj.msg == 'UndoSelection') {
      var result = fdWebExtension.fdUndo(obj.controlId);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            supported: result.supported,
            sendKeysFromFD: result.sendKeysFromFD,
          },
        }),
      );

      return true;
    } else if (obj.msg == 'ClearTargetMsg') {
      var targetClearedEvent = new CustomEvent('fdWebExtension.TargetCleared');
      document.dispatchEvent(targetClearedEvent);
      fdWebExtension.fdLastKnownCaretPos = undefined;
      fdWebExtension.fdSetTargetElement.removeEventListener("focusout", fdWebExtension.fdTargetedElementFocusOut);
      fdWebExtension.fdSetTargetElement = undefined;
      return true;
    } else if (obj.msg == 'SetTargetMsg') {
      var targetElement = null;
      if (obj.controlId) {
        fdWebExtension.fdLog(`fdWebExtension - SetTargetMsg with controlId=${obj.controlId}`);

        if (fdWebExtension.fdFindControlCustom) {
          targetElement = fdWebExtension.fdFindControlCustom(obj.controlId);
        }

        if (!targetElement) {
          targetElement = fdWebExtension.fdFindControlStandard(obj.controlId);
        }

        if (!targetElement) {
          fdWebExtension.fdLog(`fdWebExtension - SetTargetMsg failed: control not found for controlId=${obj.controlId}`);
          return true;
        }
      } else {
        targetElement = fdWebExtension.getActiveElement();
      }

      if (fdWebExtension.fdSetTargetElement) {
        fdWebExtension.fdSetTargetElement.removeEventListener("focusout", fdWebExtension.fdTargetedElementFocusOut);
        fdWebExtension.fdSetTargetElement = undefined;
        fdWebExtension.fdLastKnownCaretPos = undefined;
      }

      if (fdWebExtension.fdIsContentEditableEl(targetElement)) {
        fdWebExtension.fdSetTargetElement = targetElement;
        var info = {}
        fdWebExtension.fdGetContentEditableElementInfo(targetElement, info, false);
        fdWebExtension.fdLastKnownCaretPos = {start: info.selStart, end: info.selEnd };
        fdWebExtension.fdLog(`fdWebExtension - setting last known caret position in ${targetElement.id} to ${JSON.stringify(fdWebExtension.fdLastKnownCaretPos)}`);
        if (fdWebExtension.fdSetTargetElement) {
          fdWebExtension.fdSetTargetElement.addEventListener("focusout", fdWebExtension.fdTargetedElementFocusOut);
        }
      } else if (fdWebExtension.fdIsInputOrTextArea(targetElement)) {
        fdWebExtension.fdSetTargetElement = targetElement;
        fdWebExtension.fdLastKnownCaretPos = {start: targetElement.selectionStart, end: targetElement.selectionEnd };
        fdWebExtension.fdLog(`fdWebExtension - setting last known caret position in ${targetElement.id} to ${JSON.stringify(fdWebExtension.fdLastKnownCaretPos)}`);
        if (fdWebExtension.fdSetTargetElement) {
          fdWebExtension.fdSetTargetElement.addEventListener("focusout", fdWebExtension.fdTargetedElementFocusOut);
        }
      }

      fdWebExtension.fdLog(`fdWebExtension - setting target to current tab ${document.title}` + (obj.controlId ? ` (controlId=${obj.controlId})` : ''));
      fdWebExtension.fdPushFocusChange(); // just in case...
      return true;
    }

    return false;
  });
}

// Any EMR SSO handler
// If fdGetUserId function is defined, then add a message handler for the GetUserId messages.
if (fdWebExtension.fdGetUserId) {
  fdWebExtension.fdLog('fdWebExtension - found fdGetUserId SSO function');

  fdWebExtension.fdAddMessageHandler('SsoHandler', function(obj) {
    if (obj.msg == 'GetUserId') {
      fdWebExtension.fdLog('fdSsoHandler - getting userId');
      var userId = fdWebExtension.fdGetUserId();
      if (userId !== undefined) {
        //console.debug("fdSsoHandler - userId: " + userId);
        fdWebExtension.fdLog(
          "fdSsoHandler - userId='" + userId + "'",
        );
        fdWebExtension.sendFdMsg(
          JSON.stringify({
            id: obj.id,
            msg: obj.msg,
            result: {
              success: true,
              userId: userId,
            },
          }),
        );
        return true;
      }
    }
    return false;
  });
  
  // call once to set into storage if applicable
  fdWebExtension.fdGetUserId();
}

// Any EMR grammar handler
// If FD grammar functions are defined, then set up a timer and poll for grammar changes.
// If grammar changes, then notify FD of the grammar via a web socket message.
// If FD recognizes a command from the grammar, then it'll send a message to be handled by fdExecuteCommand.
if (fdWebExtension.fdGetGrammar && fdWebExtension.fdExecuteCommand) {
  fdWebExtension.fdLog('fdWebExtension - found grammar functions');

  if (!fdWebExtension.fdGrammarTimerId) {
    fdWebExtension.fdCurrentGrammar = '';

    fdWebExtension.fdAddMessageHandler('GrammarHandler', function(obj) {
      if (obj.msg == 'ExecuteCommand') {
        fdWebExtension.fdLog(
          'fdGrammarHandler - execute command resultDetail=' +
            obj.resultDetailJson,
        );
        var resultDetailObj = JSON.parse(obj.resultDetailJson);
        fdWebExtension.fdExecuteCommand(resultDetailObj);
        return true;
      }

      return false;
    });

    fdWebExtension.fdGrammarTimerId = setInterval(function() {
      // if fd connection isn't ready yet, then set current grammar to empty
      // as soon as connection is ready, then grammar change is detected
      // this is useful for when FD hasn't started yet or is restarted
      if (!fdWebExtension.fdConnected || (fdWebExtension.fdWebSocket && fdWebExtension.fdWebSocket.readyState != 1)) {
        fdWebExtension.fdCurrentGrammar = '';
        return;
      }

      var grammar = fdWebExtension.fdGetGrammar();
      if (grammar != fdWebExtension.fdCurrentGrammar) {
        fdWebExtension.fdCurrentGrammar = grammar;

        if (fdWebExtension.fdCurrentGrammar) {
          fdWebExtension.fdLog('fdGrammarTimer - newGrammar=' + fdWebExtension.fdCurrentGrammar);

          fdWebExtension.sendFdMsg(
            JSON.stringify({
              id: fdWebExtension.fdGuid(),
              msg: 'AddGrammar',
              fieldId: 'AnyEmrGrammar',
              grammar: fdWebExtension.fdCurrentGrammar,
            }),
          );
        } else {
          fdWebExtension.fdLog('fdGrammarTimer - grammar is empty');

          fdWebExtension.sendFdMsg(
            JSON.stringify({
              id: fdWebExtension.fdGuid(),
              msg: 'RemoveGrammar',
              fieldId: 'AnyEmrGrammar',
            }),
          );
        }
      }
    }, 1000);
  }
}

// Chrome/Firefox Scripting API
if (!fdWebExtension.fdScriptingApi) {
  fdWebExtension.fdScriptingApi = 'initialized!';

  fdWebExtension.fdIsElementKeyboardFocusable = function(element) {
    // see https://stackoverflow.com/questions/18261595/how-to-check-if-a-dom-element-is-focusable
    let hasAttributes = element.attributes != null && element.attributes.length;
    let hasHref =
      hasAttributes && element.attributes.getNamedItem('href') != null;
    let hasTabindex =
      hasAttributes && element.attributes.getNamedItem('tabindex') != null;
    let hasDisabled =
      hasAttributes && element.attributes.getNamedItem('disabled') != null;
    let isIFrame = element.nodeName === 'IFRAME';
    let isFormElement =
      element.nodeName === 'INPUT' ||
      element.nodeName === 'SELECT' ||
      element.nodeName === 'TEXTAREA' ||
      element.nodeName === 'BUTTON';

    if (element.nodeName === 'A' || (element.nodeName === 'AREA' && hasHref))
      return true;
    if (hasTabindex) return true;
    if (isIFrame) return true;
    if (isFormElement && !hasDisabled) return true;

    return false;
  };

  // this should be renamed, not really mapping to JSON
  fdWebExtension.fdMapDomToJson = function(element, includeChildNodes) {
    let object = {};

    if (element == null) return object;

    if (element.nodeType === 1)
      // nodeType = 1 indicates an element node
      fdWebExtension.fdSetUniqueId(element);

    // child nodes
    let childNodes = element.childNodes;
    if (childNodes != null && childNodes.length && includeChildNodes) {
      object['children'] = [];
      for (let i = 0; i < childNodes.length; i++) {
        let childNode = childNodes[i];
        if (childNode.nodeType === 3) {
          // if the node is a text node, the nodeType property will return 3
          object['children'].push(childNode.nodeValue);
        } else {
          json = fdWebExtension.fdMapDomToJson(childNode, true);
          object['children'].push(json);
        }
      }
    }

    // attributes
    object['attributes'] = {};
    if (element.attributes != null && element.attributes.length) {
      for (let i = 0; i < element.attributes.length; i++) {
        let attribute = element.attributes[i];
        object['attributes'][attribute.nodeName] = attribute.value;
      }

      object['IsRequiredForForm'] =
        element.attributes.getNamedItem('required') != null;
      object['ClassName'] =
        element.attributes.getNamedItem('class') != null
          ? element.attributes.getNamedItem('class').value
          : '';
    }

    // properties
    try {
      object['BoundingRectangle'] = element.getBoundingClientRect();
    } catch (e) {}
    try {
      object['fdUniqueId'] = element.getAttribute(fdWebExtension.fdControlIdAttribute);
    } catch (e) {}
    object['TextContent'] = element.textContent;
    object['IsChecked'] = element.checked === true;
    object['IsPassword'] = element.type === 'password';
    object['IsKeyboardFocusable'] = fdWebExtension.fdIsElementKeyboardFocusable(
      element,
    );
    object['HasKeyboardFocus'] = element === fdWebExtension.getActiveElement();
    object['Type'] = element.nodeName;
    object['Text'] = element.innerText != null ? element.innerText : '';
    object['Value'] = element.value != null ? element.value.toString() : '';
    object['AutomationId'] = element.id != null ? element.id : '';

    // clean up if element had no attributes
    object['IsRequiredForForm'] =
      object['IsRequiredForForm'] != undefined
        ? object['IsRequiredForForm']
        : false;
    object['ClassName'] =
      object['ClassName'] != undefined ? object['ClassName'] : '';

    return object;
  };

  fdWebExtension.fdElementSatisfiesConditions = function(element, conditions) {
    if (conditions === '') return true;

    try {
      conditions = JSON.parse(conditions);
    } catch (e) {
      fdWebExtension.fdLog(
        'fdwebsocket - chrome/firefox scripting api - JSON.parse() throws error for conditions=' +
          conditions,
      );
      return false;
    }

    for (let key in conditions) {
      var extElement = fdWebExtension.fdMapDomToJson(element, false);
      if (key === 'ClassName' && !extElement[key].includes(conditions[key]))
        // check if subset of class names
        return false;
      if (
        key !== 'ClassName' &&
        extElement[key] !== conditions[key] &&
        extElement['attributes'][key] !== conditions[key]
      )
        return false;
    }

    return true;
  };

  fdWebExtension.fdGetIFrameBody = function(frameRef) {
    var iframeDoc = frameRef.contentWindow
      ? frameRef.contentWindow.document
      : frameRef.contentDocument;
    return iframeDoc.body;
  };

  // gets all elements by searching with getElementsBy methods
  fdWebExtension.fdGetElements = function(
    conditions,
    currentElement,
    includeChildNodes,
  ) {
    try {
      conditions = JSON.parse(conditions);
    } catch (e) {}

    try {
      let elementToSearchOn =
        typeof currentElement !== 'undefined' ? currentElement : document;
      let isElement = elementToSearchOn instanceof Element;
      let isDocument = elementToSearchOn instanceof Document;
      
      let hasClassNameCondition = typeof conditions['ClassName'] !== 'undefined';
      let hasTypeCondition = typeof conditions['Type'] !== 'undefined';
      let elementsFound;

      if(!(isDocument | isElement))
      {
        fdWebExtension.fdLog(`fdGetElements - ERROR elementToSearchOn=${elementToSearchOn} is not a document or element`);
        return null;
      }

      fdWebExtension.fdLog(`fdGetElements - elementToSearchOn=${elementToSearchOn} isElement=${isElement} isDocument=${isDocument} hasClassNameCondition=${hasClassNameCondition} hasTypeCondition=${hasTypeCondition}`)

      if (hasClassNameCondition)
        elementsFound = elementToSearchOn.getElementsByClassName(
          conditions['ClassName'],
        );
      else if (hasTypeCondition)
        elementsFound = elementToSearchOn.getElementsByTagName(
          conditions['Type'],
        );
      else elementsFound = elementToSearchOn.getElementsByTagName('*');

      let elementsArray = Array.from(elementsFound);

      if (
        isElement &&
        hasClassNameCondition &&
        elementToSearchOn.getAttribute('class') === conditions['ClassName']
      )
        elementsArray.push(elementToSearchOn); // because getElementsByClassName doesn't include elementToSearchOn in search
      if (
        isElement &&
        hasTypeCondition &&
        elementToSearchOn.nodeName.toLowerCase() ===
          conditions['Type'].toLowerCase()
      )
        elementsArray.push(elementToSearchOn); // because getElementsByTagName doesn't include elementToSearchOn in search
      if (
        isElement &&
        !hasClassNameCondition &&
        !hasTypeCondition
      )
        elementsArray.push(elementToSearchOn);

      return elementsArray;
    } catch(e)
    {
      fdWebExtension.fdLog(`Exception while trying to get elements: ${e}`);
      return null;
    }
  };

  // gets all elements by searching with getElementsBy methods and by searching through iframes/frames
  fdWebExtension.fdGetAllElements = function(
    conditions,
    element,
    includeChildNodes,
  ) {
    let elements = [];

    let visibleElements = fdWebExtension.fdGetElements(
      conditions,
      element,
      includeChildNodes,
    );

    if(visibleElements != null)
    {
      elements = elements.concat(visibleElements);
    }

    // getElementsBy methods don't search through iframe, so we have to do it ourselves
    let iframes = element.getElementsByTagName('iframe');
    for (let iframe of iframes) {
    try {
      let iframeBody = fdWebExtension.fdGetIFrameBody(iframe);
      let iframeElems = fdWebExtension.fdGetAllElements(
        conditions,
        iframeBody,
        includeChildNodes,
      );
      elements = elements.concat(iframeElems);
    }
    catch (e) { }
    }

    // frames have been removed from Web standards but EMRs still use them
    let frames = element.getElementsByTagName('frame');
    for (let frame of frames) {
      let frameBody = fdWebExtension.fdGetIFrameBody(frame);
      let frameElems = fdWebExtension.fdGetAllElements(
        conditions,
        frameBody,
        includeChildNodes,
      );
      elements = elements.concat(frameElems);
    }

    return elements;
  };

  fdWebExtension.fdGetBaseElement = function(obj, baseElement) {
    if (!obj.fdUniqueId) return baseElement;

    fdWebExtension.fdLog(`fdGetBaseElement - controlId=${obj.fdUniqueId}`);

    try {
      if (baseElement.getAttrribute(fdWebExtension.fdControlIdAttribute) === obj.fdUniqueId)
        return baseElement;
    } catch (e) {}

    let uniqueElement = baseElement.querySelector(
      '[' + fdWebExtension.fdControlIdAttribute + '="' + obj.fdUniqueId + '"]',
    );
    if (uniqueElement !== null && uniqueElement !== undefined)
      return uniqueElement.nodeName.toUpperCase() === 'IFRAME' ||
        uniqueElement.nodeName.toUpperCase() === 'FRAME'
        ? fdWebExtension.fdGetIFrameBody(uniqueElement)
        : uniqueElement;

    let iframes = baseElement.getElementsByTagName('iframe');
    for (let iframe of iframes) {
    try {
      let iframeBody = fdWebExtension.fdGetIFrameBody(iframe);
      uniqueElement = fdWebExtension.fdGetBaseElement(obj, iframeBody);
      if (uniqueElement !== null) return uniqueElement;
    }
    catch (e) {}
    }

    let frames = baseElement.getElementsByTagName('frame');
    for (let frame of frames) {
      let frameBody = fdWebExtension.fdGetIFrameBody(frame);
      uniqueElement = fdWebExtension.fdGetBaseElement(obj, frameBody);
      if (uniqueElement !== null) return uniqueElement;
    }

    return null;
  };

  fdWebExtension.fdFindElement = function(obj) {
    // special case: get body element
    if (obj.conditions === 'html') {
      return document.documentElement;
    }

    // special case: get body element
    if (obj.conditions === 'body') {
      return document.body;
    }

    let baseElement = fdWebExtension.fdGetBaseElement(obj, document);
    let allElements = fdWebExtension.fdGetAllElements(
      obj.conditions,
      baseElement,
      false,
    );
    for (let element of allElements) {
      if (
        fdWebExtension.fdElementSatisfiesConditions(element, obj.conditions)
      ) {
        return element;
      }
    }

    return null;
  };

  fdWebExtension.fdFindAllElements = function(obj) {
    let baseElement = fdWebExtension.fdGetBaseElement(obj, document);
    let allElements = fdWebExtension.fdGetAllElements(
      obj.conditions,
      baseElement,
      false,
    );
    let elementsWithConditions = [];
    for (let element of allElements) {
      if (fdWebExtension.fdElementSatisfiesConditions(element, obj.conditions))
        elementsWithConditions.push(element);
    }

    return elementsWithConditions;
  };

  fdWebExtension.fdFindImmediateChildren = function(obj) {
    let baseElement = fdWebExtension.fdGetBaseElement(obj, document);
    if (baseElement.childNodes == null || !baseElement.childNodes.length) {
      return [];
    }

    let children = Array.from(baseElement.childNodes);
    let immediateChildren = [];
    for (let element of children) {
      if (fdWebExtension.fdElementSatisfiesConditions(element, obj.conditions))
        immediateChildren.push(element);
    }

    return immediateChildren;
  };

  fdWebExtension.fdGetInnerHTML = function(obj) {
    let baseElement = fdWebExtension.fdGetBaseElement(obj, document);
    return {
      success: baseElement != null,
      innerHTML: baseElement.innerHTML,
    };
  };

  fdWebExtension.fdGetParentElement = function(obj) {
    let baseElement = fdWebExtension.fdGetBaseElement(obj, document);
    return {
      success: baseElement != null,
      element: baseElement.parentElement,
    };
  };

  fdWebExtension.fdFindXPathElement = function(obj) {
    let baseElement = fdWebExtension.fdGetBaseElement(obj, document);
    return document.evaluate(obj.xPath, baseElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  };

  fdWebExtension.fdFindXPathElements = function(obj) {
    let baseElement = fdWebExtension.fdGetBaseElement(obj, document);
    return document.evaluate(obj.xPath, baseElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  };


  fdWebExtension.fdInvokeControl = function(obj) {
    var conditions = obj.conditions == undefined ? {} : obj.conditions;
    var id = obj.element.AutomationId;
    var className = obj.element.ClassName;
    //Checks if object is empty
    var numberOfKeys = Object.keys(conditions).length;

    if (
      numberOfKeys == 0 &&
      (id == '' || id == null || className == '' || className == null)
    )
      return {
        success: false,
        errorMessage: 'cannot find element to click',
      };

    if (numberOfKeys == 0) {
      if (id != '' && id != null)
        obj.conditions = '{"AutomationId": "' + id + '"}';
      else if (className != '' && className != null)
        obj.conditions = '{"ClassName": "' + className + '"}';
    }

    var element = fdWebExtension.fdFindElement(obj);
    if (element != null) {
      element.click();
      return {
        success: true,
      };
    }

    return {
      success: false,
      errorMessage: 'cannot find element to click',
    };
  };

  fdWebExtension.fdFocusControl = function(obj) {
    var element = fdWebExtension.fdFindElement(obj);
    if (element != null) {
      element.focus();
      return {
        success: true,
      };
    }

    return {
      success: false,
      errorMessage: 'cannot find element to focus',
    };
  };

  fdWebExtension.fdGetActiveElementInfo = function()
  {
    var activeElement = fdWebExtension.getActiveElement();
    if (!activeElement) {
      fdWebExtension.fdLog('fdGetActiveElementInfo - no active element');
      return {
        success: false,
        activeElement: null,
      };
    }
 
    return {
      success: true,
      activeElement: fdWebExtension.fdMapDomToJson(activeElement, false)
    };
  }

  fdWebExtension.fdAddMessageHandler('ScriptingApiHandler', function(obj) {
    if (obj.msg === 'FindElement') {
      let element = fdWebExtension.fdFindElement(obj);
      var success = element == null ? false : true;
      var errorMessage = element == null ? 'element not found' : '';
      var webElement =
        element == null ? null : fdWebExtension.fdMapDomToJson(element, false);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: success,
            errorMessage: errorMessage,
            element: webElement,
          },
        }),
      );

      return true;
    } else if (obj.msg === 'FindAllElements') {
      let elements = fdWebExtension.fdFindAllElements(obj);
      var success = elements.length == 0 ? false : true;
      var errorMessage = elements.length == 0 ? 'elements not found' : '';
      var extElements = [];
      for (let element of elements) {
        extElements.push(fdWebExtension.fdMapDomToJson(element, false));
      }
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: success,
            errorMessage: errorMessage,
            elements: extElements,
          },
        }),
      );

      return true;
    } else if (obj.msg === 'FindImmediateChildren') {
      let children = fdWebExtension.fdFindImmediateChildren(obj);
      var success = children.length == 0 ? false : true;
      var errorMessage = children.length == 0 ? 'elements not found' : '';
      var extElements = [];
      for (let element of children) {
        extElements.push(fdWebExtension.fdMapDomToJson(element, false));
      }
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: success,
            errorMessage: errorMessage,
            elements: extElements,
          },
        }),
      );
      return true;

    } else if (obj.msg === 'GetInnerHTML') {
      let result = fdWebExtension.fdGetInnerHTML(obj);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            innerHTML: result.innerHTML,
          },
        }),
      );
      return true;

    } else if (obj.msg === 'GetParent') {
      let result = fdWebExtension.fdGetParentElement(obj);
      let parent = fdWebExtension.fdMapDomToJson(result.element, false)
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            element: parent,
          },
        }),
      );
      return true;

    } else if (obj.msg === 'FindXPathElement') {
      let xPathElement = fdWebExtension.fdFindXPathElement(obj);
      let extElement = fdWebExtension.fdMapDomToJson(xPathElement, false)
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: true,
            element: extElement,
          },
        }),
      );
      return true;

    } else if (obj.msg === 'FindXPathElements') {
      let xPathElements = fdWebExtension.fdFindXPathElements(obj);
      let extElements = [];
      for (i = 0; i < xPathElements.snapshotLength; i++) {
        let node = xPathElements.snapshotItem(i);
        if (node.nodeType === Node.ELEMENT_NODE) {
          extElements.push(fdWebExtension.fdMapDomToJson(node, false));    
        }
      }
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: true,
            elements: extElements,
          },
        }),
      );
      return true;

    } else if (obj.msg === 'InvokeControl') {
      let result = fdWebExtension.fdInvokeControl(obj);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
          },
        }),
      );
      return true;
    } else if (obj.msg === 'FocusControl') {
      let result = fdWebExtension.fdFocusControl(obj);
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
          },
        }),
      );
      return true;
    } else if (obj.msg === 'GetActiveElement')
    {
      let result = fdWebExtension.fdGetActiveElementInfo();
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: result
        }),
      );
      return true;
    }

    return false;
  });
}

// Javascript API
if (!fdWebExtension.fdJavascriptAPI) {
  fdWebExtension.fdJavascriptAPI = 'initialized!';

  fdWebExtension.fdExecuteFunction = function(obj) {
    try {
      const funcInfo = JSON.parse(obj.funcInfo);

      const res = fdWebExtension.fdExecuteKnownFunction(funcInfo);
      if (res.known) {
        return res
      };

      throw new Error("fdExecuteFunction cannot process arbitrary script in manifest v3");
    } catch (e) {
      return {
        success: false,
        errorMessage: e.message,
        result: '',
      };
    }
  };

  fdWebExtension.fdExecuteKnownFunction = function (funcInfo) {
    let result = {
      known: true,
      success: true,
      result: '',
    };

    try {
      switch (funcInfo.functionName) {
        case 'MSpeechAPI.controls.enumerate': result.result = window.MSpeechAPI('controls.enumerate()'); break;
        case 'MSpeechAPI.controls.getCurrentControl': result.result = window.MSpeechAPI('controls.getCurrentControl()'); break;
        case 'MSpeechAPI.control.text.read': result.result = window.MSpeechAPI('control.text.read(id)', funcInfo.arguments[0]); break;
        case 'MSpeechAPI.storeValue': result.result = window.MSpeechAPI('storeValue(name,value)', funcInfo.arguments[0], funcInfo.arguments[1]); break;
        case 'Athena.Refresh': result.result = window.top.AH.Frames.Main.Reload(); break;
        case 'fdGetActiveElement': result.result = JSON.stringify(fdWebExtension.fdGetActiveElementInfo()); break;
        default:
          result.known = false;
          result.success = false;
      }
    } catch (e) {
      result.success = false;
      result.errorMessage = e.message;
    }

    return result;
  };
  
  //Helper function to access a property based on a string e.g. window.foo.bar
  fdWebExtension.fdGetPropertyByString = function(obj, variableName) {
    var propertyNames = variableName.split('.');

    for (var i = 0; i < propertyNames.length - 1; i++) {
      var propertyName = propertyNames[i];
      var currentObj = obj[propertyName];

      if (currentObj !== undefined) {
        obj = currentObj;
        continue;
      }

      break;
    }

    return obj[propertyNames[i]];
  }

  fdWebExtension.fdGetJsonObject = function(obj) {
    try {
      let result = fdWebExtension.fdGetPropertyByString(window, obj.varibleName);
      return {
        success: true,
        jsonObject: result,
      };
    } catch (e) {
      return {
        success: false,
        errorMessage: e.message,
        result: '',
      };
    }
  };

  fdWebExtension.fdExecuteFunctionOnObject = function(obj) {
    try {
      let variableObject = fdWebExtension.fdGetPropertyByString(window, obj.varibleName);
      let funcInfo = JSON.parse(obj.funcInfo);
      var args =
        String(funcInfo.arguments) == ''
          ? funcInfo.arguments
          : JSON.parse(funcInfo.arguments);
      let result = variableObject[funcInfo.functionName](...args);
      return {
        success: true,
        result: result,
      };
    } catch (e) {
      return {
        success: false,
        errorMessage: e.message,
        result: '',
      };
    }
  };
  
  //converts object to string
  fdWebExtension.fdConvertObjectToString = function(obj) {
    return JSON.stringify(obj,
      (key, val) => {
        if (typeof val === 'function') {
          return String(val);
        }
        return val;
      });
  }

  fdWebExtension.fdAddMessageHandler('JavascriptApiHandler', function(obj) {
    if (obj.msg === 'ExecuteFunction') {
      const result = fdWebExtension.fdExecuteFunction(obj);
      Promise.resolve(result.result).then(
        resolvedResult =>
          fdWebExtension.sendFdMsg(
            JSON.stringify({
              id: obj.id,
              msg: obj.msg,
              result: {
                success: result.success,
                errorMessage: result.errorMessage || '',
                result: resolvedResult,
              },
            }),
          ),
        err =>
          fdWebExtension.sendFdMsg(
            JSON.stringify({
              id: obj.id,
              msg: obj.msg,
              result: {
                success: false,
                errorMessage: err.message,
                result: '',
              },
            }),
          ),
      );

      return true;
    } else if (obj.msg === 'GetJsonObject') {
      let result = fdWebExtension.fdGetJsonObject(obj);
	  
      fdWebExtension.sendFdMsg(
        JSON.stringify({
          id: obj.id,
          msg: obj.msg,
          result: {
            success: result.success,
            errorMessage: result.errorMessage ? result.errorMessage : '',
            jsonObject: fdWebExtension.fdConvertObjectToString(result.jsonObject)
          },
        }),
      );
      return true;
    } else if (obj.msg === 'ExecuteFunctionOnObject') {
      const result = fdWebExtension.fdExecuteFunctionOnObject(obj);
      Promise.resolve(result.result).then(
        resolvedResult =>
          fdWebExtension.sendFdMsg(
            JSON.stringify({
              id: obj.id,
              msg: obj.msg,
              result: {
                success: result.success,
                errorMessage: result.errorMessage || '',
                result: JSON.stringify(resolvedResult),
              },
            }),
          ),
        err =>
          fdWebExtension.sendFdMsg(
            JSON.stringify({
              id: obj.id,
              msg: obj.msg,
              result: {
                success: false,
                errorMessage: err.message,
                result: JSON.stringify(''),
              },
            }),
          ),
      );
      return true;
    }

    return false;
  });
}
