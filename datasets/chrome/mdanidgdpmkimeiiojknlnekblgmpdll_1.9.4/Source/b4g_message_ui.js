function showServerMessage(message) {
    var messageType = (message["type"] || "").toLowerCase();
    var messagePriority = (message["priority"] || "").toLowerCase();
    var messageTitle = message["messageTitle"];
    var messageSubtitle = message["messageSubtitle"];
    var messageButton = message["button"];
    var messageClose = message["close"];
    var messageID = message["messageID"];

    if (messageID) {
        var repeats = (message["repeats"] == null) ? true : message["repeats"];
        var seenMessageIDsString = (localStorage.getItem("b4g_seen_messages") || "[]");
        var seenMessageIDs = JSON.parse(seenMessageIDsString);
        var hasSeenThisMessage = seenMessageIDs.includes(messageID);
        if (!hasSeenThisMessage) {
            seenMessageIDs.push(messageID);
            localStorage.setItem("b4g_seen_messages", JSON.stringify(seenMessageIDs));
        } else if ((typeof repeats == "boolean" && repeats === false) ||
                (typeof repeats == "string" && repeats.toLowerCase() == "false")) {
            return;
        }
    }

    if (messageType == "banner") {
        var banner = document.createElement("div");
        banner.id = "b4g-message-banner";

        if (messagePriority == "high") {
            banner.classList.add("b4g-high-priority");
        } else if (messagePriority == "med" || messagePriority == "medium") {
            banner.classList.add("b4g-med-priority");
        } else if (messagePriority == "low") {
            banner.classList.add("b4g-low-priority");
        }

        var table = document.createElement("table");
        banner.appendChild(table);    
        var row = document.createElement("tr");
        row.setAttribute("class", "main-tr");
        table.appendChild(row);

        var iconCell = document.createElement("td");
        iconCell.setAttribute("class", "icon-cell")
        row.appendChild(iconCell);
        var icon = document.createElement("img");
        iconCell.appendChild(icon);
        icon.src = chrome.runtime.getURL("b4g_128.png");
        icon.setAttribute("class", "icon");

        var messageCell = document.createElement("td");
        messageCell.setAttribute("class", "message-cell")
        row.appendChild(messageCell);
        var messageWrapperSpan = document.createElement("span");
        messageWrapperSpan.setAttribute("class", "message-wrapper-span")
        if (messageTitle) {
            var title = document.createElement("span");
            title.setAttribute("class", "message-title");
            title.innerText = messageTitle + " ";
            messageWrapperSpan.appendChild(title);    
        }
        if (messageSubtitle) {
            var subtitle = document.createElement("span");
            subtitle.setAttribute("class", "message-subtitle");
            subtitle.innerText = messageSubtitle;
            messageWrapperSpan.appendChild(subtitle);
            var tooltip = document.createElement("span");
            tooltip.setAttribute("class", "message-subtitle-tooltip");
            tooltip.innerText = messageSubtitle;
            subtitle.appendChild(tooltip);

        }
        messageCell.appendChild(messageWrapperSpan);

        // Button
        var noButton;  // Needed for close button positioning
        if (messageButton && messageButton["show"] === true) {
            var buttonCell = document.createElement("td");
            buttonCell.setAttribute("class", "button-cell");
            row.appendChild(buttonCell);
    
            var button = document.createElement("input");
            buttonCell.appendChild(button);
            button.id = "b4g-message-action-button";
            button.type = "submit";
            button.value = messageButton["text"];
            button.onclick = function() {
                window.open(messageButton["url"], '_blank');
            }
            noButton = false;
        } else {
            noButton = true;
        }

        // Close
        if (messageClose && messageClose["show"] === true) {
            var closeCell = document.createElement("td");
            var closeBtnClass = "banner-close";
            if (noButton) {
                closeBtnClass += " needs-left-margin";
            }
            closeCell.setAttribute("class", closeBtnClass);
            row.appendChild(closeCell);
            closeCell.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:auto;height:100%;">
            <path d="M1.22505 13.825L0.175049 12.775L5.95005 7.00005L0.175049 1.22505L1.22505 0.175049L7.00005 5.95005L12.775 0.175049L13.825 1.22505L8.05005 7.00005L13.825 12.775L12.775 13.825L7.00005 8.05005L1.22505 13.825Z" fill="black"/>
            </svg>`
            closeCell.onclick = function() {
                document.getElementById("b4g-message-banner").remove();
            }
        }

        document.body.insertBefore(banner, document.body.firstChild);
    } else if (messageType == "dialog") {
        var dialog = document.createElement("div");
        dialog.id = "b4g-message-dialog";

        var dialogContent = document.createElement("div");
        dialog.appendChild(dialogContent);
        dialogContent.id = "b4g-message-dialog-content";
        
        if (messagePriority == "high") {
            dialogContent.classList.add("b4g-high-priority");
        } else if (messagePriority == "med" || messagePriority == "medium") {
            dialogContent.classList.add("b4g-med-priority");
        } else if (messagePriority == "low") {
            dialogContent.classList.add("b4g-low-priority");
        }

        var icon = document.createElement("img");
        dialogContent.appendChild(icon);
        icon.src = chrome.runtime.getURL("b4g_128.png");
        icon.setAttribute("class", "icon");

        if (messageTitle) {
            var title = document.createElement("div");
            title.setAttribute("class", "message-title");
            title.innerText = messageTitle + " ";
            dialogContent.appendChild(title);    
        }
        if (messageSubtitle) {
            var subtitle = document.createElement("div");
            subtitle.setAttribute("class", "message-subtitle");
            subtitle.innerText = messageSubtitle;
            dialogContent.appendChild(subtitle);
        }

        // Button
        if (messageButton && messageButton["show"] === true) {    
            var button = document.createElement("input");
            dialogContent.appendChild(button);
            button.id = "b4g-message-action-button";
            button.type = "submit";
            button.value = messageButton["text"];
            button.onclick = function() {
                window.open(messageButton["url"], '_blank');
            }
        }

        // Close
        if (messageClose && messageClose["show"] === true) {
            var button = document.createElement("input");
            dialogContent.appendChild(button);
            button.id = "b4g-message-close-button";
            button.type = "submit";
            button.value = messageClose["text"];
            button.onclick = function() {
                dialog.remove();
            }
        }

        window.onclick = function(event) {
            if (event.target == dialog) {
                dialog.remove();
            }
        }
        
        document.body.insertBefore(dialog, document.body.firstChild);
    }
}