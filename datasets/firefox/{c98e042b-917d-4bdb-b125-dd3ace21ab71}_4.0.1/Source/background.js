"use strict";

const DASHBOARD = "https://xnotifier.tobwithu.com/xn/";
const DASHBOARD_HELP = "https://xnotifier.tobwithu.com/dp/web/forum/10";

const MAX_ACTION_MESSAGES = 200;
const dashboardPorts = new Set();
const toolbarPorts = new Set();
const toolbarCommands = new Set([
  DashboardCommand.REFRESH,
  DashboardCommand.OPEN_OPTIONS,
  DashboardCommand.OPEN_HELP
]);

let flag = {
  checkGoogle: false
}

let changed = false;
let refresh = false;
let isStartup = false;

let prefs;

let scriptInfo;

let scripts = {};

let hostList = [];

let msgData = {};

let hdls = [];

let soundData;

// Hotmail (Outlook) token capture ///////////////////////////////////
// The token has no reliable expiry we can read, so it is kept until a
// 401/403 proves it stale (then invalidated and re-captured).
const HOTMAIL_TOKEN_KEY = "hotmailToken";
const HOTMAIL_CAPTURE_TIMEOUT = 30000;
const HOTMAIL_CAPTURE_COOLDOWN = 3 * 60 * 1000;
let hotmailTokenData = null; //{ token }
let hotmailCapture = { windowId: null, timer: null, pending: false, lastAttempt: 0 };

extApi.declarativeNetRequest.getDynamicRules()
  .then(rs => extApi.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rs.map(r => r.id),
    addRules: rules
  }))
  .catch(dout);

const onInit = async () => {
  const list = scriptList.slice(0);//copy
  list.splice(0, 0, "google");

  prefs = await loadOptionsA();
  hotmailTokenData = await exlib.loadPrefsA(HOTMAIL_TOKEN_KEY, null);
  const ver0 = await exlib.loadPrefsA("ver");
  const ver = extApi.runtime.getManifest().version;
  let si = await exlib.loadPrefsA("scriptInfo", [{}, {}, {}]);
  if (ver0 != ver || si == null) {
    si = [{}, {}, {}];
    for (let id in scripts) {
      if (scripts[id].config.cookies) si[0][id] = scripts[id].config.cookies;
      if (scripts[id].config.isGoogle) si[1][id] = scripts[id].config.multi;
      if (scripts[id].config.inboxOnly) si[2][id] = scripts[id].config.inboxOnly;
    }
    await exlib.savePrefsA("scriptInfo", si);
    await exlib.savePrefsA("ver", ver);
  }
  scriptInfo = si;
  hostList = getHostList(list);

  for (let i in scripts) {//remove unused scripts
    if (hostList.indexOf(i) == -1) delete scripts[i];
  }

  if (prefs["customSound"]) soundData = await exlib.loadPrefsA("soundData", "");
  if (!soundData) soundData = 'notify.ogg';

  changed = true;
  flag.checkGoogle = true;
  isStartup = true;
  check();

}
document.addEventListener("DOMContentLoaded", onInit, { once: true });

function onAlarm(alarm) {
  check();
}
function setTimer() {
  extApi.alarms.clear("refresh");
  if (prefs["updateInterval"] > 0) extApi.alarms.create("refresh", { periodInMinutes: prefs["updateInterval"] });
}

function isFinished() {
  for (let i in hdls) {
    if (hdls[i].started) {
      return false;
    }
  }
  return true;
}

async function check(hosts) {//entry point for checking
  //dout("\ncheck ["+(hosts?hosts:"")+"] --------------- "+new Date());
  if (!isFinished()) {
    dout("on checking already " + new Date().toISOString());
    return false;
  }
  if (!hosts) hosts = hostList;

  await onLoad(hosts);
  if (isStartup) {
    isStartup = false;
    setTimer();
  }
  return true;
}

extApi.alarms.onAlarm.addListener(onAlarm);

let lastCheck;

//hosts whose monitored cookie was just removed (logout signal);
//they must re-check from the cookie stage instead of reusing the token/session
const forceCookieRecheck = new Set();

const onCookiesChanged = async (changeInfo) => {
  if (!scriptInfo) return;
  let list = scriptInfo[0];
  let rs;
  for (let i in list) {
    let o = list[i];
    for (let j in o) {
      if (o[j].monitor == false) continue;
      if (changeInfo.cookie.domain == o[j].domain && changeInfo.cookie.name == o[j].name) {
        //dout(changeInfo);      
        //console.log(changeInfo.cookie);      
        if (!rs) rs = {};
        rs[i] = true;
        if (changeInfo.removed) forceCookieRecheck.add(i);
        if (i == "google") {
          for (let k in scriptInfo[1]) rs[k] = true;
        }
        break;
      }
    }
  }
  if (rs) {
    if (lastCheck != null) {
      if (new Date() - lastCheck < 200) return; //prevent duplicate check when cookie is updated
    }
    lastCheck = new Date();
    flag.checkGoogle = true;
    check(Object.keys(rs));
  }
}
extApi.cookies.onChanged.addListener(onCookiesChanged);


const checkGoogle = (list) => {
  for (let i in list) {
    if (list[i] in scriptInfo[1]) {
      return true;
    }
  }
  return false;
}
function checkHostPref(list) {
  for (let i = 0; i < list.length; i++) {//remove disabled hosts
    if (list[i] == "google") continue;
    let h = prefs.host[list[i]];
    if (h == false) list.splice(i--, 1);
  }
  let ind;
  if ((ind = list.indexOf("google")) >= 0) {
    if (!checkGoogle(list)) {
      list.splice(ind, 1);
    }
  }
}
function getHostList(list) {
  checkHostPref(list);
  if (flag.checkGoogle && list.indexOf("google") == -1) {
    for (let i in list) {
      if (list[i] in scriptInfo[1]) {
        list.splice(0, 0, "google");
        break;
      }
    }
  }
  return list;
}

const onLoad = async (list) => {
  //dout('Init Hosts -------------------');
  //dout(list);

  msgData = await exlib.loadPrefsA("msgData", {});
  let gAccount = await exlib.loadPrefsA("gAccount", {});

  for (let i in list) {
    let id = list[i];
    if (!scripts[id]) {
      delete msgData[id];
      continue;
    }
    let googleMulti = scripts[id].config.isGoogle && scripts[id].config.multi;
    if (flag.checkGoogle) {
      if (googleMulti) continue;
    } else if (id == "google") continue;

    let h = null;
    if (id in msgData) {
      //use previous settings if available;
      for (let u in msgData[id]) {
        let o = msgData[id][u];

        if (o.enabled && (o.active || (googleMulti && gAccount[u]))) {
          h = getHandler(id, o.nid, u);
          if (o.settings) {
            for (let k in o.settings) {
              h[k] = o.settings[k];
            }
          }
          if (forceCookieRecheck.has(id)) h.count = -1; //cookie removed -> re-verify login state
          h.check();
          if (!scripts[id].config.multi) break;
        }
      }
    }
    if (h == null && !googleMulti) {
      let h = getHandler(id, 0);
      h.check();
    }
  }
  flag.checkGoogle = false;
  forceCookieRecheck.clear();
}

function getAccountPref(id, user) {
  if (user != null && prefs.acc[id] && prefs.acc[id][user]) {
    return prefs.acc[id][user];
  } else return null;
}
function checkAccount(id, user) {
  if (user != null && prefs.acc[id] && prefs.acc[id][user] && !prefs.acc[id][user].enabled) {
    return false;
  } else return true;
}

function findHandler(id, user, nid) {
  for (let i in hdls) {
    let o = hdls[i];
    if (o.id == id && (nid == null || o.nid == nid) && (user == null || o.user == user)) {
      return o;
    }
  }
  return null;
}

function getHandler(id, nid, user) {
  let h = findHandler(id, user, nid);
  //if(h!=null)dout("reuse  "+id+" "+nid+" "+user+" "+h.user);  
  if (h != null) return h;

  //dout("create "+id+" "+nid+" "+user);  
  h = new Handler();
  hdls.push(h);
  h.main = self;
  h.id = id;
  if (nid != null) h.nid = nid;

  let s = scripts[id];
  for (let i in s) {
    h[i] = s[i];
  }
  initHandler(h, user);
  return h;
}

function initHandler(h, user) {
  h.user = user;
  h.enabled = true;
  let p = getAccountPref(h.id, user);
  if (p) {
    for (let i in p) h[i] = p[i];
  }

  h.initHandler();
}

function setUser(hdl, user) {
  //dout("setUser "+hdl.id+" "+user);
  if (!scripts[hdl.id].config.multi && hdl.user != null && hdl.user != user) {
    msgData[hdl.id][hdl.user].active = false;
  }
  initHandler(hdl, user);
}

async function setResult(hdl, data, error) {
  if (!error) {//check network error
    if (hdl.id == "google") {
      let d = data;
      if (d && d.length > 0) {
        let gAccount = {};
        for (let i = 0; i < d.length; i++) {
          gAccount[d[i][0]] = true;
        }
        await exlib.savePrefsA("gAccount", gAccount);

        for (let id in scripts) {
          if (id == "google") continue;
          if (scripts[id].config.isGoogle && scripts[id].config.multi) {
            let accs = msgData[id];
            if (accs) {
              for (let i in accs) {
                if (!gAccount[i]) accs[i].active = false;
              }
            }

            let ar = [];
            for (let i = 0; i < d.length; i++) {//sort with nid
              ar[d[i][3]] = d[i][0];
            }
            for (let i in ar) {
              let h = getHandler(id, i, ar[i]);
              h.count = -1; //start again
              h.check();
            }
          }
        }
        return;
      } else {//google logout
        await exlib.savePrefsA("gAccount", {});

        for (let id in scripts) {
          if (id == "google") continue;
          if (scripts[id].config.isGoogle) {
            let accs = msgData[id];
            for (let i in accs) {
              accs[i].active = false;
            }

            for (let i = 0; i < hdls.length; i++) {
              let o = hdls[i];
              if (o.id == id) {
                hdls.splice(i, 1);
              }
            }
          }
        }
      }
    } else {
      if (hdl.user) {//disable unused accounts after getting userId
        hdl.enabled = checkAccount(hdl.id, hdl.user);
      }
      if (data) {
        if (!msgData[hdl.id]) msgData[hdl.id] = {};
        let d = data;
        if (hdl.settings) {
          d.settings = {};
          for (let i in hdl.settings) {
            let k = hdl.settings[i];
            d.settings[k] = hdl[k];
          }
        }
        if (hdl.id == "gmail") {
          d.iconURL = exlib.getURL("res/gmail/" + hdl.nid + ".png");
        } else d.iconURL = hdl.config.iconURL;
        d.viewURL = hdl.viewURL;
        d.nid = hdl.nid;
        d.active = true;
        d.enabled = hdl.enabled;
        d.host = hdl.id;
        if (msgData[hdl.id][hdl.user]) d.lastTime = msgData[hdl.id][hdl.user].lastTime;
        msgData[hdl.id][hdl.user] = d;
      } else {
        if (msgData[hdl.id]) {
          let acc = msgData[hdl.id][hdl.user];
          if (acc) acc.active = false;
        }
      }
    }
  }

  if (isFinished()) {
    msgData = sortData(msgData);
    //console.log(msgData);
    //compare data
    let prev = await exlib.loadPrefsA("msgData", {});
    let hasNoti = false;

    compareData(prev, msgData, function (host, o, m) {
      //dout(m);
      changed = true;

      let showNoti = true;
      if (o.lastTime != null && m.time <= o.lastTime) {
        showNoti = false;
      } else o.lastTime = m.time;
      if (prefs["showNotification"]) {
        if (showNoti) {
          hasNoti = true;
          extApi.notifications.create(host + "|" + o.user + "|" + m.mid, {
            type: "basic", iconUrl: "res/" + host + (host == "gmail" && o.nid > 0 ? o.nid : "") + ".png", title: m.name, message: m.title, contextMessage: m.content
          });
        }
      }
    });
    //check removed data and remove notifications
    compareData(msgData, prev, function (host, o, m) {
      changed = true;
      clearNotification(host + "|" + o.user + "|" + m.mid);
    });

    let preCount = getCount(prev);
    let ar = [];
    let count = getCount(msgData, ar);
    if (count > preCount || hasNoti) {
      if (prefs["alertSound"]) playSound();
    }
    setCount(count, ar);
    await exlib.savePrefsA("msgData", msgData);

    if (count != preCount) refresh = true;

    if (!changed) {
      if (checkActiveState(msgData, prev) || checkActiveState(prev, msgData)) {//check login/logout
        changed = true;
        refresh = true;
      }
    }
    if (changed || refresh) {
      const updateChanged = changed;
      refresh = false;
      broadcastDashboardData(updateChanged);
      try {
        await extApi.runtime.sendMessage({ cmd: "update", data: msgData, changed: updateChanged });
      } catch (e) { }
      changed = false;
    }
  }
}

// data manage /////////////////////////////////////////////////////////////////
function sortData(data) {
  let data2 = {};
  for (let i in scriptList) {//sort to script order
    let o = scriptList[i];
    if (data[o]) data2[o] = data[o];
  }
  data = data2;

  //sort with nid
  for (let h in data) {
    let acc = data[h];
    let ar = [];
    for (let u in acc) {
      ar.push(acc[u]);
    }
    ar = ar.sort(function (a, b) { let t = a.active - b.active; return t == 0 ? (a.nid - b.nid) : t; });
    let t = {};
    for (let i in ar) {
      t[ar[i].user] = ar[i];
    }
    data[h] = t;
  }
  return data;
}

function getMailActionExecutor(action) {
  if (Array.isArray(action)) return MailActionExecutor.STATIC;
  if (
    action &&
    typeof action === "object" &&
    Object.values(MailActionExecutor).includes(action.executor)
  ) {
    return action.executor;
  }
  return null;
}

function buildDashboardData(data) {
  const accounts = [];
  for (const host of scriptList) {
    const sourceAccounts = data && data[host];
    if (!sourceAccounts) continue;

    const sortedAccounts = Object.values(sourceAccounts).sort((left, right) => {
      const activeOrder = Number(left.active) - Number(right.active);
      return activeOrder === 0 ? Number(left.nid) - Number(right.nid) : activeOrder;
    });

    for (const account of sortedAccounts) {
      if (!account || !account.active || !account.enabled) continue;

      const folders = [];
      for (const key in account.folders || {}) {
        const folder = account.folders[key];
        if (!folder) continue;
        folders.push({
          id: folder.id,
          title: folder.title || "",
          count: Number(folder.count) || 0
        });
      }

      const messages = [];
      for (const key in account.msg || {}) {
        const message = account.msg[key];
        if (!message) continue;
        messages.push({
          mid: message.mid,
          email: message.email || "",
          name: message.name || "",
          title: message.title || "",
          content: message.content || "",
          time: Number(message.time) || 0
        });
      }

      const actions = [];
      for (const value of Object.values(MailAction)) {
        if (
          account.action &&
          getMailActionExecutor(account.action[value])
        ) {
          actions.push(value);
        }
      }

      accounts.push({
        host: host,
        user: account.user,
        count: Number(account.count) || 0,
        iconURL: account.iconURL || "",
        folders: folders,
        messages: messages,
        actions: actions
      });
    }
  }
  return { accounts: accounts };
}

function isDashboardParentUrl(value) {
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname === "xnotifier.tobwithu.com" &&
      url.port === "" &&
      url.pathname === "/xn/";
  } catch (error) {
    return false;
  }
}

function isExtensionFrameSender(sender, page) {
  if (!sender || sender.id !== extApi.runtime.id || !sender.tab || sender.tab.incognito) return false;
  if (!Number.isInteger(sender.frameId) || sender.frameId <= 0) return false;
  if (!isDashboardParentUrl(sender.tab.url)) return false;
  try {
    return new URL(sender.url).href === extApi.runtime.getURL(page);
  } catch (error) {
    return false;
  }
}

function isDashboardPortSender(sender) {
  return isExtensionFrameSender(sender, "dashboard.html");
}

function isToolbarPortSender(sender) {
  return isExtensionFrameSender(sender, "toolbar.html");
}

async function isExtensionPortActive(port, ports, validateSender) {
  if (!ports.has(port) || !validateSender(port.sender)) return false;
  try {
    const tab = await extApi.tabs.get(port.sender.tab.id);
    return !tab.incognito && isDashboardParentUrl(tab.url);
  } catch (error) {
    return false;
  }
}

async function isDashboardPortActive(port) {
  return isExtensionPortActive(port, dashboardPorts, isDashboardPortSender);
}

async function isToolbarPortActive(port) {
  return isExtensionPortActive(port, toolbarPorts, isToolbarPortSender);
}

function postPortMessage(port, ports, message) {
  try {
    port.postMessage(message);
    return true;
  } catch (error) {
    ports.delete(port);
    return false;
  }
}

function postDashboardMessage(port, message) {
  return postPortMessage(port, dashboardPorts, message);
}

function postToolbarMessage(port, message) {
  return postPortMessage(port, toolbarPorts, message);
}

async function sendInitialDashboardData(port) {
  const storedData = await exlib.loadPrefsA("msgData", {});
  if (Object.keys(msgData).length === 0) msgData = sortData(storedData);
  if (!dashboardPorts.has(port)) return;
  postDashboardMessage(port, {
    event: DashboardEvent.DATA,
    data: buildDashboardData(msgData),
    changed: true
  });
}

function broadcastDashboardData(dataChanged) {
  const message = {
    event: DashboardEvent.DATA,
    data: buildDashboardData(msgData),
    changed: Boolean(dataChanged)
  };
  for (const port of dashboardPorts) postDashboardMessage(port, message);
}

function broadcastDashboardLoading() {
  const message = { event: DashboardEvent.LOADING };
  for (const port of dashboardPorts) postDashboardMessage(port, message);
}

function sendDashboardCommandResult(port, command, ok, error) {
  postDashboardMessage(port, {
    event: DashboardEvent.COMMAND_RESULT,
    command: command,
    ok: ok,
    error: error || null
  });
}

function sendToolbarCommandResult(port, command, ok, error) {
  postToolbarMessage(port, {
    event: DashboardEvent.COMMAND_RESULT,
    command: command,
    ok: ok,
    error: error || null
  });
}

function getDashboardAccount(host, user) {
  if (typeof host !== "string" || typeof user !== "string") return null;
  const hostData = msgData[host];
  if (!hostData || !Object.prototype.hasOwnProperty.call(hostData, user)) return null;
  const account = hostData[user];
  return account && account.active && account.enabled ? account : null;
}

function findDashboardMessage(account, messageId) {
  if (typeof messageId !== "string" && typeof messageId !== "number") return null;
  for (const key in account.msg || {}) {
    const message = account.msg[key];
    if (message && String(message.mid) === String(messageId)) return message;
  }
  return null;
}

function findDashboardFolder(account, folderId) {
  if (typeof folderId !== "string" && typeof folderId !== "number") return null;
  for (const key in account.folders || {}) {
    const folder = account.folders[key];
    if (folder && String(folder.id) === String(folderId)) return folder;
  }
  return null;
}

function buildMailActionRequest(actionName, targets) {
  if (!Object.values(MailAction).includes(actionName) || !Array.isArray(targets)) return null;
  if (targets.length === 0 || targets.length > MAX_ACTION_MESSAGES) return null;

  const actions = [];
  const hosts = Object.create(null);
  const seenMessages = new Set();
  let messageCount = 0;

  for (const target of targets) {
    if (!target || !Array.isArray(target.messageIds) || target.messageIds.length === 0) return null;
    const account = getDashboardAccount(target.host, target.user);
    if (!account || !account.action) return null;
    const action = account.action[actionName];
    const executor = getMailActionExecutor(action);
    if (!executor) return null;

    const messages = [];
    for (const messageId of target.messageIds) {
      if (++messageCount > MAX_ACTION_MESSAGES) return null;
      const message = findDashboardMessage(account, messageId);
      if (!message) return null;
      const messageKey = JSON.stringify([target.host, target.user, message.mid]);
      if (seenMessages.has(messageKey)) return null;
      seenMessages.add(messageKey);
      messages.push(message);
    }

    actions.push({
      host: target.host,
      user: target.user,
      actionName: actionName,
      executor: executor,
      action: action,
      messages: messages
    });
    if (!hosts[target.host]) hosts[target.host] = [];
    if (!hosts[target.host].includes(target.user)) hosts[target.host].push(target.user);
  }

  return { actions: actions, hosts: hosts };
}

function handleDashboardUtilityCommand(command) {
  switch (command) {
    case DashboardCommand.REFRESH:
      refresh = true;
      broadcastDashboardLoading();
      check().then(started => {
        if (!started) broadcastDashboardData(false);
      });
      return true;
    case DashboardCommand.OPEN_OPTIONS:
      extApi.runtime.openOptionsPage();
      return true;
    case DashboardCommand.OPEN_HELP:
      openUrl(DASHBOARD_HELP);
      return true;
    default:
      return false;
  }
}

async function handleDashboardCommand(port, request) {
  if (!request || typeof request.command !== "string") {
    sendDashboardCommandResult(port, null, false, "invalid-command");
    return;
  }
  if (!await isDashboardPortActive(port)) {
    sendDashboardCommandResult(port, request.command, false, "invalid-sender");
    port.disconnect();
    return;
  }
  if (handleDashboardUtilityCommand(request.command)) {
    sendDashboardCommandResult(port, request.command, true);
    return;
  }

  let account;
  switch (request.command) {
    case DashboardCommand.OPEN_ACCOUNT:
      account = getDashboardAccount(request.host, request.user);
      if (!account || !account.viewURL) {
        sendDashboardCommandResult(port, request.command, false, "account-not-found");
        break;
      }
      openUrl(null, account.viewURL);
      sendDashboardCommandResult(port, request.command, true);
      break;
    case DashboardCommand.REFRESH_ACCOUNT: {
      const handler = findHandler(request.host, request.user);
      if (!handler) {
        sendDashboardCommandResult(port, request.command, false, "account-not-found");
        break;
      }
      refresh = true;
      broadcastDashboardLoading();
      handler.lastCheck = null; //bypass the duplicate-check guard for a user-initiated refresh
      handler.check();
      sendDashboardCommandResult(port, request.command, true);
      break;
    }
    case DashboardCommand.OPEN_FOLDER: {
      account = getDashboardAccount(request.host, request.user);
      const folder = account && findDashboardFolder(account, request.folderId);
      if (!folder || !folder.url || !account.viewURL) {
        sendDashboardCommandResult(port, request.command, false, "folder-not-found");
        break;
      }
      if (folder.action) action = folder.action;
      openUrl(folder.url, account.viewURL, Boolean(folder.action));
      sendDashboardCommandResult(port, request.command, true);
      break;
    }
    case DashboardCommand.OPEN_MESSAGE: {
      account = getDashboardAccount(request.host, request.user);
      const message = account && findDashboardMessage(account, request.messageId);
      if (!message || !message.url || !account.viewURL) {
        sendDashboardCommandResult(port, request.command, false, "message-not-found");
        break;
      }
      openUrl(message.url, account.viewURL);
      if (
        account.action &&
        getMailActionExecutor(account.action[MailAction.READ])
      ) {
        const actionRequest = buildMailActionRequest(MailAction.READ, [{
          host: request.host,
          user: request.user,
          messageIds: [message.mid]
        }]);
        if (!actionRequest) {
          sendDashboardCommandResult(port, request.command, false, "invalid-action");
          break;
        }
        refresh = true;
        const ok = await performMailActions(actionRequest.actions, actionRequest.hosts);
        sendDashboardCommandResult(
          port,
          request.command,
          ok,
          ok ? null : "action-failed"
        );
        break;
      }
      sendDashboardCommandResult(port, request.command, true);
      break;
    }
    case DashboardCommand.MAIL_ACTION: {
      const actionRequest = buildMailActionRequest(request.action, request.targets);
      if (!actionRequest) {
        sendDashboardCommandResult(port, request.command, false, "invalid-action");
        break;
      }
      refresh = true;
      const ok = await performMailActions(actionRequest.actions, actionRequest.hosts);
      sendDashboardCommandResult(
        port,
        request.command,
        ok,
        ok ? null : "action-failed"
      );
      break;
    }
    default:
      sendDashboardCommandResult(port, request.command, false, "unknown-command");
      break;
  }
}

async function handleToolbarCommand(port, request) {
  if (!request || typeof request.command !== "string") {
    sendToolbarCommandResult(port, null, false, "invalid-command");
    return;
  }
  if (!await isToolbarPortActive(port)) {
    sendToolbarCommandResult(port, request.command, false, "invalid-sender");
    port.disconnect();
    return;
  }
  if (!toolbarCommands.has(request.command) || !handleDashboardUtilityCommand(request.command)) {
    sendToolbarCommandResult(port, request.command, false, "command-not-allowed");
    return;
  }
  sendToolbarCommandResult(port, request.command, true);
}

extApi.runtime.onConnect.addListener(port => {
  if (port.name === DashboardPort.DASHBOARD && isDashboardPortSender(port.sender)) {
    dashboardPorts.add(port);
    port.onMessage.addListener(request => {
      handleDashboardCommand(port, request);
    });
    port.onDisconnect.addListener(() => dashboardPorts.delete(port));
    sendInitialDashboardData(port);
    return;
  }

  if (port.name === DashboardPort.TOOLBAR && isToolbarPortSender(port.sender)) {
    toolbarPorts.add(port);
    port.onMessage.addListener(request => {
      handleToolbarCommand(port, request);
    });
    port.onDisconnect.addListener(() => toolbarPorts.delete(port));
    return;
  }

  port.disconnect();
});

function getCount(data, ar) {
  let count = 0;
  for (let h in data) {
    let acc = data[h];
    for (let i in acc) {
      let o = acc[i];
      if (!o.active || !o.enabled) continue;
      if (o.count > 0) {
        count += o.count;
        if (ar != null) ar.push(o.user + " : " + o.count);
      }
    }
  }
  return count;
}
function compareData(data1, data2, func/*(host,acc,msg)*/) {
  for (let i in data2) {
    let host = data2[i];
    for (let j in host) {
      let o = host[j];
      let msg = o.msg;
      for (let k in msg) {
        let m = msg[k];
        if (getMsg(data1, i, o.user, m.mid) == null) {
          func(i, o, m);
        }
      }
    }
  }
}
function getMsg(data, host, acc, mid) {
  if (!(host in data)) return null;
  let a = data[host][acc];
  if (!a) return null;
  let msg = a.msg;
  for (let k in msg) {
    let m = msg[k];
    if (m.mid == mid) return [m, a];
  }
  return null;
}
function checkActiveState(data1, data2) {
  for (let h in data1) {
    let b = data2[h];
    if (!b) return true;
    let a = data1[h];
    for (let i in a) {
      if (!b[i] || b[i].active != a[i].active) return true;
    }
  }
  return false;
}

function getAction(url, list) {
  let ar = [];
  for (let i in url) {
    let o = url[i];
    if (o instanceof Array) {
      if (!(list instanceof Array)) list = [list];
      ar[i] = "";
      for (let j = 0; j < o.length; j++) {
        if (o[j] == "%s") {
          ar[i] += list.join(o[j + 2] + o[j + 1] + o[j - 1]);
          j++;
        } else if (o[j] == "%r") {
          let t = [];
          for (let k in list) t.push(o[j + 1]);
          ar[i] += t.join(o[j + 3] + o[j + 2] + o[j - 1]);
          j += 2;
        } else ar[i] += o[j];
      }
    } else {
      ar[i] = o;
    }
  }
  return ar;
}
////////////////////////////////////////////////////////////////////////////////

function getStaticActionRequest(action) {
  if (Array.isArray(action)) return action;
  if (
    action &&
    action.executor === MailActionExecutor.STATIC &&
    Array.isArray(action.request)
  ) {
    return action.request;
  }
  return null;
}

function performStaticMailAction(action, messages) {
  const request = getStaticActionRequest(action);
  if (!request) return Promise.resolve(false);

  return new Promise(resolve => {
    getHtml(getAction(request, messages.map(message => message.mid)), aData => {
      resolve(aData != null);
    });
  });
}

async function performHandlerMailAction(action) {
  const handler = findHandler(action.host, action.user);
  if (!handler || typeof handler.performAction !== "function") return false;
  return await handler.performAction(action.actionName, action.messages) === true;
}

function refreshMailActionHosts(hosts, failed) {
  const handlers = [];
  const hostList = [];
  let foundAllHandlers = true;

  for (const host in hosts) {
    hostList.push(host);
    for (const user of hosts[host]) {
      const handler = findHandler(host, user);
      if (!handler) {
        foundAllHandlers = false;
        break;
      }
      handlers.push(handler);
    }
  }

  if (foundAllHandlers && prefs && !failed) {
    for (const handler of handlers) {
      handler.lastCheck = null;
      handler.check();
    }
  } else if (hostList.length > 0) {
    if (failed) flag.checkGoogle = true;
    check(hostList);
  }
}

async function performMailActions(actions, hosts) {
  const results = await Promise.allSettled(actions.map(action => {
    if (action.executor === MailActionExecutor.STATIC) {
      return performStaticMailAction(action.action, action.messages);
    }
    if (action.executor === MailActionExecutor.HANDLER) {
      return performHandlerMailAction(action);
    }
    return false;
  }));
  const failed = results.some(result => (
    result.status !== "fulfilled" || result.value !== true
  ));
  refreshMailActionHosts(hosts, failed);
  return !failed;
}

let action = null;
function onMessage(req, sender, sendResponse) {
  switch (req.cmd) {
    case "getData":
      exlib.loadPrefsA("msgData", {}).then(data => {
        data = sortData(data);
        extApi.runtime.sendMessage({ cmd: "update", data: data })
      });
      break;
    case "openUrl":
      openUrl(req.url, req.match);
      break;
    case "refresh":
      refresh = true;
      check();
      break;
    case "options":
      extApi.runtime.openOptionsPage();
      break;
    case "getAction":
      sendResponse(action);
      action = null;
      break;
    case "iconClick":
      onIconClick();
      break;
    case "checkOne":
      let h = findHandler(req.host, req.user);
      if (h) {
        refresh = true;
        h.check();
      }
      break;
    case "hotmailToken": {
      if (
        !sender ||
        sender.id !== extApi.runtime.id ||
        !sender.tab ||
        sender.tab.incognito ||
        !sender.url ||
        !sender.url.startsWith("https://outlook.live.com/") ||
        typeof req.token !== "string" ||
        !req.token
      ) {
        break;
      }
      storeHotmailToken(req.token);
      closeHotmailCapture();
      let hm = findHandler("hotmail");
      if (hm) {
        hm.count = -1;
        hm.started = false;
        hm.lastCheck = null;
        refresh = true;
        hm.check();
      } else {
        refresh = true;
        check(["hotmail"]);
      }
      break;
    }
  }
}
extApi.runtime.onMessage.addListener(onMessage);

//Gmail live AT capture //////////////////////////////////////////////
// GMAIL_AT rotates; capture the value actually sent on real /s/ traffic
// (keyed by account nid) so mail actions use a fresh token.
let gmailATMap = Object.create(null);
function getGmailAT(nid) {
  return gmailATMap[nid] || null;
}
extApi.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    const nid = (details.url.match(/\/mail\/u\/(\d+)\//) || [])[1];
    if (nid == null) return;
    for (const header of details.requestHeaders || []) {
      if (header.name.toLowerCase() != "cookie") continue;
      const at = (header.value.split("GMAIL_AT=")[1] || "").split(";")[0];
      if (at) gmailATMap[nid] = at;
      break;
    }
  },
  { urls: ["*://mail.google.com/mail/u/*/s/*"], types: ["xmlhttprequest"] },
  extApi.webRequest.OnBeforeSendHeadersOptions &&
    extApi.webRequest.OnBeforeSendHeadersOptions.EXTRA_HEADERS
    ? ["requestHeaders", "extraHeaders"]
    : ["requestHeaders"]
);


function openUrl(aUrl, aMatch, forceReload) {
  let match = aMatch ? aMatch : aUrl;
  let url = aUrl ? aUrl : aMatch;
  exlib.getTabs(function (tabs) {
    for (let i = 0, tab; tab = tabs[i]; i++) {
      if (tab.url.indexOf(match) == 0 && !tab.incognito) {
        if (forceReload && tab.url == aUrl) {
          extApi.tabs.update(tab.id, { active: true });
          extApi.tabs.reload(tab.id);
        } else if ((tab.url == aUrl || !aUrl)) extApi.tabs.update(tab.id, { active: true });
        else extApi.tabs.update(tab.id, { url: url, active: true });
        extApi.windows.update(tab.windowId, { focused: true });
        return;
      }
    }
    extApi.windows.getAll().then(function (win) {
      if (win && win.length > 0) {
        for (let i = win.length - 1; i >= 0; i--) {
          if (win[i].focused && !win[i].incognito) {
            extApi.windows.update(win[i].id, { focused: true });
            extApi.tabs.create({ url: url });
            return;
          }
        }
        for (let i = win.length - 1; i >= 0; i--) {
          if (!win[i].incognito) {
            extApi.windows.update(win[i].id, { focused: true });
            extApi.tabs.create({ url: url });
            return;
          }
        }
      }
      extApi.windows.create({ url: url });
    });
  });
}
function onIconClick(tab) {
  openUrl(DASHBOARD);
}

//extApi.action.onClicked.addListener(onIconClick);

// notification //////////////////////////////////////////////////////
extApi.notifications.onClicked.addListener(onNotificationClick);
extApi.notifications.onButtonClicked.addListener(onNotificationClick);
async function onNotificationClick(notificationId, buttonId) {
  let id = notificationId.split("|");
  let data = await exlib.loadPrefsA("msgData", {});
  let ar = getMsg(data, id[0], id[1], id[2]);
  if (ar != null) {
    let m = ar[0];
    let acc = ar[1];
    let actionName;
    if (buttonId == null) {
      openUrl(m.url, acc.viewURL);
      actionName = MailAction.READ;
    } else if (buttonId == 0) {
      actionName = MailAction.READ;
    } else {
      actionName = MailAction.DELETE;
    }

    const actionRequest = buildMailActionRequest(actionName, [{
      host: id[0],
      user: id[1],
      messageIds: [m.mid]
    }]);
    if (actionRequest) {
      refresh = true;
      await performMailActions(actionRequest.actions, actionRequest.hosts);
    }
  }
  clearNotification(notificationId);
}

function clearNotification(notificationId) {
  extApi.notifications.clear(notificationId);
  /*
  extApi.notifications.clear(notificationId, function (cleared) {
    //bug : for notification panel is not updated correctly
    //fix : remove focus from notification panel
    if (cleared) {
      extApi.windows.getAll(null, function (win) {//check if the current window exists
        if (win && win.length > 0) extApi.windows.update(extApi.windows.WINDOW_ID_CURRENT, { focused: true });
      });
    }
  });
  */
}
//////////////////////////////////////////////////////////////////////

//UI//////////////////////////////////////////////////////////////////
let icons = [{ "19": "icon_19_gray.png", "38": "icon_38_gray.png" }, { "19": "icon_19.png", "38": "icon_38.png" }];
function setCount(n, list) {
  exlib.setIcon(icons[n > 0 ? 1 : 0]);
  exlib.setBadgeText(n > 0 ? "" + n : "");
  let title = exlib.i18nString("app_name");
  if (n > 0) {
    for (let i in list) {
      let o = list[i];
      title += "\n" + o;
    }
  } else title += "\n" + exlib.i18nString("noNewMsg");
  exlib.setTitle(title);
}
//////////////////////////////////////////////////////////////////////

//Hotmail token /////////////////////////////////////////////////////
function getHotmailToken() {
  return hotmailTokenData && hotmailTokenData.token ? hotmailTokenData.token : null;
}

function storeHotmailToken(token) {
  hotmailTokenData = { token: token };
  exlib.savePrefsA(HOTMAIL_TOKEN_KEY, hotmailTokenData);
}

function invalidateHotmailToken() {
  if (hotmailTokenData == null) return;
  hotmailTokenData = null;
  exlib.savePrefsA(HOTMAIL_TOKEN_KEY, null);
}

async function hasOutlookTab() {
  try {
    const tabs = await extApi.tabs.query({ url: "https://outlook.live.com/*" });
    return tabs.some((t) => !t.incognito);
  } catch (e) {
    return false;
  }
}

function closeHotmailCapture() {
  if (hotmailCapture.timer) {
    clearTimeout(hotmailCapture.timer);
    hotmailCapture.timer = null;
  }
  if (hotmailCapture.windowId != null) {
    extApi.windows.remove(hotmailCapture.windowId).catch(() => {});
    hotmailCapture.windowId = null;
  }
  hotmailCapture.pending = false;
}

async function ensureHotmailToken() {
  if (hotmailCapture.pending) return;
  //a live Outlook tab captures the token passively; no window needed
  if (await hasOutlookTab()) return;
  if (Date.now() - hotmailCapture.lastAttempt < HOTMAIL_CAPTURE_COOLDOWN) return;
  hotmailCapture.lastAttempt = Date.now();
  hotmailCapture.pending = true;
  try {
    const win = await extApi.windows.create({
      url: "https://outlook.live.com/mail/",
      focused: false,
      state: "minimized"
    });
    hotmailCapture.windowId = win.id;
  } catch (e) {
    hotmailCapture.pending = false;
    return;
  }
  hotmailCapture.timer = setTimeout(closeHotmailCapture, HOTMAIL_CAPTURE_TIMEOUT);
}
//////////////////////////////////////////////////////////////////////

//Sound///////////////////////////////////////////////////////////////
const playSound = async () => {
  const audio = document.getElementById("sound");
  if (!audio) return;
  audio.src = soundData;
  try {
    await audio.play();
  } catch (error) {
    dout(error);
  }
}
//////////////////////////////////////////////////////////////////////