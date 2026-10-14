"use strict";

let portClient;
let accounts = [];
let messages = [];
let selected = new Set();
let working = new Set();

function i18n(key, fallback) {
  return exlib.i18nString(key) || fallback;
}

function initLabels() {
  $("#loading > span").textContent = i18n("loading", "Loading") + " ...";
  $("#act-spam").title = i18n("spam", "Spam");
  $("#act-del").title = i18n("del", "Delete");
  $("#act-read").title = i18n("read", "Read");
}

function isTrusted(event) {
  return event.isTrusted === true;
}

function messageKey(host, user, mid) {
  return JSON.stringify([host, user, mid]);
}

function setLoading(value) {
  $("#loading").classList.toggle("hidden", !value);
}

function postCommand(command, payload) {
  return portClient ? portClient.post(command, payload) : false;
}

function onPortMessage(message) {
  if (!message || typeof message !== "object") return;
  switch (message.event) {
    case DashboardEvent.LOADING:
      setLoading(true);
      break;
    case DashboardEvent.DATA:
      setLoading(false);
      render(message.data);
      break;
    case DashboardEvent.COMMAND_RESULT:
      if (!message.ok) {
        setLoading(false);
        working = new Set();
        renderMessages();
        console.warn("Dashboard command rejected:", message.command, message.error);
      }
      break;
  }
}

function render(data) {
  accounts = data && Array.isArray(data.accounts) ? data.accounts : [];
  messages = [];
  selected = new Set();
  working = new Set();

  renderAccounts();

  for (const account of accounts) {
    for (const message of account.messages || []) {
      messages.push({ account: account, message: message });
    }
  }
  messages.sort((left, right) => Number(right.message.time) - Number(left.message.time));
  renderMessages();
}

function renderAccounts() {
  const root = $("#accounts");
  clear(root);

  for (const account of accounts) {
    const accountRoot = createElement("div", "acc");
    const accountButton = createElement(
      "button",
      "acc-title" + (account.count > 0 ? " new-msg" : ""),
      account.user
    );
    accountButton.type = "button";

    const icon = createElement("img", "account-icon");
    icon.src = account.iconURL;
    icon.alt = "";
    icon.referrerPolicy = "no-referrer";
    accountButton.appendChild(icon);
    accountButton.appendChild(document.createTextNode(
      account.user + (account.count > 0 ? " (" + account.count + ")" : "")
    ));
    //middle click fires "auxclick" (not "click"), so bind both
    const handleAccountClick = event => {
      if (!isTrusted(event)) return;
      //shift+left click or middle click refreshes only this account (same as the popup)
      if ((event.button == 0 && event.shiftKey) || event.button == 1) {
        postCommand(DashboardCommand.REFRESH_ACCOUNT, {
          host: account.host,
          user: account.user
        });
        return;
      }
      if (event.button != 0) return; //ignore other aux buttons (e.g. right click)
      postCommand(DashboardCommand.OPEN_ACCOUNT, {
        host: account.host,
        user: account.user
      });
    };
    accountButton.addEventListener("click", handleAccountClick);
    accountButton.addEventListener("auxclick", handleAccountClick);
    accountRoot.appendChild(accountButton);

    const folderRoot = createElement("div", "folder");
    for (const folder of account.folders || []) {
      const folderButton = createElement("button", "folder-item");
      folderButton.type = "button";
      folderButton.textContent = (folder.title || folder.id) + " (" + folder.count + ")";
      folderButton.addEventListener("click", event => {
        if (!isTrusted(event)) return;
        postCommand(DashboardCommand.OPEN_FOLDER, {
          host: account.host,
          user: account.user,
          folderId: folder.id
        });
      });
      folderRoot.appendChild(folderButton);
    }
    accountRoot.appendChild(folderRoot);
    root.appendChild(accountRoot);
  }
}

function renderMessages() {
  const noLogin = $("#no-login");
  const messageView = $("#message-view");
  const list = $("#message-list");
  clear(list);

  if (accounts.length === 0) {
    noLogin.classList.remove("hidden");
    messageView.classList.add("hidden");
    return;
  }

  noLogin.classList.add("hidden");
  messageView.classList.remove("hidden");

  for (const record of messages) {
    const account = record.account;
    const message = record.message;
    const key = messageKey(account.host, account.user, message.mid);
    const canAct = Array.isArray(account.actions) && account.actions.length > 0;
    const row = document.createElement("tr");
    row.dataset.messageKey = key;
    row.classList.toggle("working", working.has(key));

    const checkCell = createElement("td", "msg-check");
    const checkbox = createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = selected.has(key);
    checkbox.disabled = !canAct || working.has(key);
    checkbox.addEventListener("click", event => {
      if (!isTrusted(event)) return;
      if (checkbox.checked) selected.add(key);
      else selected.delete(key);
      updateControls();
    });
    checkCell.appendChild(checkbox);
    row.appendChild(checkCell);

    const accountCell = createElement("td", "msg-acc", account.user);
    const icon = createElement("img");
    icon.src = account.iconURL;
    icon.alt = "";
    icon.referrerPolicy = "no-referrer";
    accountCell.appendChild(icon);
    row.appendChild(accountCell);

    const nameCell = createElement("td", "name", message.email);
    nameCell.textContent = message.name || message.email || "";
    row.appendChild(nameCell);

    const titleCell = createElement("td", "msg-title");
    titleCell.appendChild(document.createTextNode(message.title || ""));
    if (message.content) {
      const content = createElement("span", "msg-content");
      content.textContent = " - " + message.content;
      titleCell.appendChild(content);
    }
    titleCell.addEventListener("click", event => openMessage(event, account, message));
    row.appendChild(titleCell);

    const date = new Date(Number(message.time));
    const timeCell = createElement(
      "td",
      "msg-time",
      Number.isNaN(date.getTime()) ? "" : date.toLocaleString()
    );
    timeCell.textContent = Number.isNaN(date.getTime()) ? "" : getTimeStr(date);
    timeCell.addEventListener("click", event => openMessage(event, account, message));
    row.appendChild(timeCell);

    list.appendChild(row);
  }
  updateControls();
}

function openMessage(event, account, message) {
  if (!isTrusted(event)) return;
  postCommand(DashboardCommand.OPEN_MESSAGE, {
    host: account.host,
    user: account.user,
    messageId: message.mid
  });
}

function getActionableRecords(action) {
  return messages.filter(record => {
    const account = record.account;
    const message = record.message;
    const key = messageKey(account.host, account.user, message.mid);
    return selected.has(key) && account.actions.includes(action) && !working.has(key);
  });
}

function updateControls() {
  const actionable = messages.filter(record => {
    const key = messageKey(record.account.host, record.account.user, record.message.mid);
    return record.account.actions.length > 0 && !working.has(key);
  });
  const selectedRecords = actionable.filter(record => {
    return selected.has(messageKey(record.account.host, record.account.user, record.message.mid));
  });
  const hasSelection = selectedRecords.length > 0;

  $("#all-selector").checked = actionable.length > 0 && selectedRecords.length === actionable.length;
  $("#all-selector").disabled = actionable.length === 0;
  $("#act-spam").classList.toggle(
    "hidden",
    !selectedRecords.some(record => record.account.actions.includes(MailAction.SPAM))
  );
  $("#act-del").classList.toggle(
    "hidden",
    !selectedRecords.some(record => record.account.actions.includes(MailAction.DELETE))
  );
  $("#act-read").classList.toggle(
    "hidden",
    !selectedRecords.some(record => record.account.actions.includes(MailAction.READ))
  );

  if (!hasSelection) $("#all-selector").checked = false;
}

function selectAll(event) {
  if (!isTrusted(event)) return;
  selected = new Set();
  if (event.currentTarget.checked) {
    for (const record of messages) {
      if (record.account.actions.length === 0) continue;
      const key = messageKey(record.account.host, record.account.user, record.message.mid);
      if (!working.has(key)) selected.add(key);
    }
  }
  renderMessages();
}

function requestAction(event, action) {
  if (!isTrusted(event)) return;
  const records = getActionableRecords(action);
  if (records.length === 0) return;

  const groups = new Map();
  for (const record of records) {
    const account = record.account;
    const message = record.message;
    const groupKey = JSON.stringify([account.host, account.user]);
    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        host: account.host,
        user: account.user,
        messageIds: []
      });
    }
    groups.get(groupKey).messageIds.push(message.mid);
    working.add(messageKey(account.host, account.user, message.mid));
  }

  setLoading(true);
  renderMessages();
  if (!postCommand(DashboardCommand.MAIL_ACTION, {
    action: action,
    targets: Array.from(groups.values())
  })) {
    setLoading(false);
  }
}

function initEvents() {
  $("#all-selector").addEventListener("click", selectAll);
  $("#act-spam").addEventListener("click", event => requestAction(event, MailAction.SPAM));
  $("#act-del").addEventListener("click", event => requestAction(event, MailAction.DELETE));
  $("#act-read").addEventListener("click", event => requestAction(event, MailAction.READ));
}

document.addEventListener("DOMContentLoaded", () => {
  initLabels();
  initEvents();
  setLoading(true);
  portClient = createDashboardPortClient(
    DashboardPort.DASHBOARD,
    onPortMessage,
    connected => {
      if (!connected) setLoading(true);
    }
  );
});

window.addEventListener("unload", () => {
  if (portClient) portClient.close();
});
