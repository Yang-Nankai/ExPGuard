function getEl(id) {
    return document.getElementById(id);
}


//// Show/Hide Elements

function isHiddenEl(id) {
    return getEl(id).classList.contains("hidden");
}

function hideEl(id) {
    // Don't re-hide if already hidden
    if (!isHiddenEl(id)) {
        getEl(id).classList.add("hidden");
    }
}

function showEl(id) {
    getEl(id).classList.remove("hidden");
}


//// Clicks

function addClickListener(id, listener) {
    getEl(id).addEventListener("click", listener);
}

function disableClicks(id) {
    getEl(id).classList.add("disabled_clicks");
}

function enableClicks(id) {
    getEl(id).classList.remove("disabled_clicks");
}


//// Checkbox

function addCheckboxChangeListener(id, listener) {
    const checkbox = document.querySelector("input[id=" + id + "]");
    checkbox.addEventListener("change", function() {
        listener(this.checked);
    });
}

function setCheckboxChecked(id, checked) {
    const checkbox = getEl(id);
    checkbox.checked = checked;
    checkbox.setAttribute("checked", checked.toString());
}


//// href

function openUrl(url) {
    chrome.tabs.create({url: url});
}