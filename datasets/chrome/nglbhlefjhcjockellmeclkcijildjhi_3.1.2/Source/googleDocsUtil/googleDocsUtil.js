(function(global, undefined) {

    const googleDocsUtil = function(){

var classNames = {
    paragraph: '.kix-paragraphrenderer',
    line: '.kix-lineview',
    selectionOverlay: '.kix-selection-overlay',
    wordNode: '.kix-wordhtmlgenerator-word-node',
    cursor: '.kix-cursor',
    cursorName: '.kix-cursor-name',
    cursorCaret: '.kix-cursor-caret',
  };

  function cleanDocumentText(text) {
    var cleanedText = text.replace(/[\u200B\u200C]/g, '');
    var nonBreakingSpaces = String.fromCharCode(160);
    var regex = new RegExp(nonBreakingSpaces, 'g');
    cleanedText = cleanedText.replace(regex, ' ');
    return cleanedText;
  }

  function doesRectsOverlap(RectA, RectB) {
    return (
      RectA.left <= RectB.right &&
      RectA.right >= RectB.left &&
      RectA.top <= RectB.bottom &&
      RectA.bottom >= RectB.top
    );
  }

    function containsUserCaretDom() {
        var carets = document.querySelectorAll(classNames.cursor);
        for (var i = 0; i < carets.length; i++) {
          var nameDom = carets[i].querySelectorAll(classNames.cursorName);
          var name = nameDom[0].innerText;
          if (!name) return true;
        }
        return false;
      }


  function getUserCaretDom() {
    var carets = document.querySelectorAll(classNames.cursor);
    for (var i = 0; i < carets.length; i++) {
      var nameDom = carets[i].querySelectorAll(classNames.cursorName);
      var name = nameDom[0].innerText;
      if (!name) return carets[i].querySelectorAll(classNames.cursorCaret)[0];
    }

    throw 'Could not find the users cursor';
  }

  function getLocalCaretIndex(caretX, element, simulateElement) {
    var text = cleanDocumentText(element.innerText);
    var container = document.createElement('div');
    var letterSpans = [];
    for (var i = 0; i < text.length; i++) {
      var textNode = document.createElement('span');
      textNode.innerText = text[i];
      textNode.style.cssText = element.style.cssText;
      textNode.style.whiteSpace = 'pre';
      letterSpans.push(textNode);
      container.appendChild(textNode);
    }
    container.style.whiteSpace = "nowrap";
    simulateElement.appendChild(container);

    var index = 0;
    var currentMinimumDistance = -1;
    var containerRect = container.getBoundingClientRect();
    for (var i = 0; i < letterSpans.length; i++) {
      var rect = letterSpans[i].getBoundingClientRect();
      var left = rect.left - containerRect.left;
      var right = left + rect.width;
      if (currentMinimumDistance == -1) {
        currentMinimumDistance = Math.abs(caretX - left);
      }
      var leftDistance = Math.abs(caretX - left);
      var rightDistance = Math.abs(caretX - right);

      if (leftDistance <= currentMinimumDistance) {
        index = i;
        currentMinimumDistance = leftDistance;
      }

      if (rightDistance <= currentMinimumDistance) {
        index = i + 1;
        currentMinimumDistance = rightDistance;
      }
    }

    container.remove();
    return index;
  }

  return {
      
    getGoogleDocument: function() {
    var caret, caretRect;
    var caretIndex = 0;
    var caretLineIndex = 0;
    var caretLine = 0;
    var text = [];
    var nodes = [];
    var lineCount = 0;
    var globalIndex = 0;
    var selectedText = '';
    var exportedSelectionRect = undefined;
    var paragraphrenderers = document.querySelectorAll(classNames.paragraph);

    if (containsUserCaretDom()) {
      caret = getUserCaretDom();
      caretRect = caret.getBoundingClientRect();
    }

    for (var i = 0; i < paragraphrenderers.length; i++) {
      var lineviews = paragraphrenderers[i].querySelectorAll(classNames.line);
      for (var j = 0; j < lineviews.length; j++) {
        var lineText = '';
        var selectionOverlays = lineviews[j].querySelectorAll(classNames.selectionOverlay);
        var wordhtmlgeneratorWordNodes = lineviews[j].querySelectorAll(classNames.wordNode);
        for (var k = 0; k < wordhtmlgeneratorWordNodes.length; k++) {
          var wordhtmlgeneratorWordNodeRect = wordhtmlgeneratorWordNodes[k].getBoundingClientRect();
          if (caretRect) {
            if (doesRectsOverlap(wordhtmlgeneratorWordNodeRect, caretRect)) {
              var caretXStart =
                caretRect.left - wordhtmlgeneratorWordNodeRect.left;
              var localCaretIndex = getLocalCaretIndex(
                caretXStart,
                wordhtmlgeneratorWordNodes[k],
                lineviews[j]
              );
              caretIndex = globalIndex + localCaretIndex;
              caretLineIndex = lineText.length + localCaretIndex;
              caretLine = lineCount;
            }
          }
          var nodeText = cleanDocumentText(
            wordhtmlgeneratorWordNodes[k].textContent
          );
          nodes.push({
            index: globalIndex,
            line: lineCount,
            lineIndex: lineText.length,
            node: wordhtmlgeneratorWordNodes[k],
            lineElement: lineviews[j],
            text: nodeText,
          });

          for (var l = 0; l < selectionOverlays.length; l++) {
            var selectionOverlay = selectionOverlays[l];
            var selectionRect = selectionOverlay.getBoundingClientRect();

            if (selectionRect) exportedSelectionRect = selectionRect;

            if (
              doesRectsOverlap(
                wordhtmlgeneratorWordNodeRect,
                selectionOverlay.getBoundingClientRect()
              )
            ) {
              var selectionStartIndex = getLocalCaretIndex(
                selectionRect.left - wordhtmlgeneratorWordNodeRect.left,
                wordhtmlgeneratorWordNodes[k],
                lineviews[j]
              );
              var selectionEndIndex = getLocalCaretIndex(
                selectionRect.left +
                selectionRect.width -
                wordhtmlgeneratorWordNodeRect.left,
                wordhtmlgeneratorWordNodes[k],
                lineviews[j]
              );
              if (!selectionOverlays[l].style.backgroundColor){
                selectedText = nodeText.substring(
                  selectionStartIndex,
                  selectionEndIndex
                );
              }
            }
          }

          globalIndex += nodeText.length;
          lineText += nodeText;
        }
        text.push(lineText);
        lineCount++;
      }
    }
    return {
      nodes: nodes,
      text: text,
      selectedText: selectedText,
      caret: {
        index: caretIndex,
        lineIndex: caretLineIndex,
        line: caretLine,
      },
      selectionRect: exportedSelectionRect,
    };
  }
}
}
  global.googleDocsUtil = (global.module || {}).exports = new googleDocsUtil();

})(this);