const pageValue = document.getElementById("message-action-source").value;
chrome.runtime.sendMessage({ type: "SAVE_DRAFT", draft: pageValue });
