
//var configEmoji -> emoji inserted before the script

var configEmoji = document.querySelector("#configEmoji").innerHTML;
var currentUrl = window.location.href;
if(currentUrl.indexOf("instagram.com/") >= 0){
	if(document.querySelector('textarea') != null){
		document.querySelector('textarea').focus();
	}
	document.execCommand('insertHTML', false, configEmoji);
} else if(currentUrl.indexOf("twitter.com/") >= 0){
	if(document.querySelector('[contenteditable]') != null){
		placeCaretAtEnd(document.querySelector('[contenteditable]'));
	}
	document.execCommand('insertHTML', false, configEmoji);
} else if (currentUrl.indexOf("messenger.com/") >= 0){
	if(document.querySelector("[data-text*='true']").tagName == "SPAN"){
		if(document.querySelector('[contenteditable]') != null){
			placeCaretAtEnd(document.querySelector('[contenteditable]'));
		}
		document.execCommand('insertHTML', false, configEmoji);
	}
} else if (currentUrl.indexOf("skype.com/") >= 0){
	if(document.querySelector("[data-text*='true']").tagName == "SPAN"){
		if(document.querySelector('[contenteditable]') != null){
			placeCaretAtEnd(document.querySelector('[contenteditable]'));
		}
		document.execCommand('insertHTML', false, configEmoji);
	}
} else {
	document.execCommand('insertHTML', false, configEmoji);
}

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}