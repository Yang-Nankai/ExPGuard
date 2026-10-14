"use strict";
/***********************************************************
iCloud (mailws2 API)

Folder list + unread counts: POST {mccgateway}/mailws2/v1/geqs/query (domain "mailbox")
INBOX messages: POST {mccgateway}/mailws2/v1/thread/search (THREAD_DIGEST)
Actions: POST {mccgateway}/mailws2/v1/thread/flag (read), /thread/move (spam, delete)

Auth is cookie-based; server-side Origin check is satisfied by the DNR rule that
rewrites Origin to https://www.icloud.com for *.icloud.com/mailws2/* requests.
***********************************************************/
const ICLOUD_FOLDER = Object.freeze({
  INBOX: "INBOX",
  JUNK: "Junk",
  TRASH: "Deleted Messages",
  SYSTEM: ["Archive", "Deleted Messages", "Drafts", "Sent Messages"]
});

const ICLOUD_JSON_HEADERS = { "Content-Type": "application/json", "Accept": "application/json" };

const ICLOUD_SESSION_TAIL =
  '],"sessionHeaders":{"condstore":1,"folder":"INBOX","modseq":null,"qresync":1,"threadmode":1,"threadmodseq":null}}';

scripts["icloud"] = {
  config: {
    inboxOnly: true,
    showFolders: true,
    showSnippets: true,
    includeSpam: true,

    cookies: [{ domain: ".icloud.com", name: "X-APPLE-WEBAUTH-USER" }],

    iconURL: "https://www.icloud.com/system/icloud.com/2624Build32/favicons/mail-favicon-light-32x32.png"
  },

  init: function () {
    this.infoURL = ["https://setup.icloud.com/setup/ws/1/validate", ""];
    this.viewURL = "https://www.icloud.com/mail/";
  },

  getUser: function (aData) {
    let fnd = aData.match(/"primaryEmail":"(\S+?)"/);
    if (fnd) return fnd[1];
    else return null;
  },

  getInfo: function (aData) {
    let fnd = aData.match(/"mccgateway":\{"url":"(\S+?)"/);
    if (!fnd) return false;
    this.mcc = fnd[1].replace(/:443$/, "");
    let dsid = aData.match(/"dsid":"(\d+)"/);
    this.dsid = dsid ? dsid[1] : "";
    let q = "?dsid=" + this.dsid; //mccgateway requires dsid, otherwise 403 INVALID_REQUEST
    this.dataURL = [this.mcc + "/mailws2/v1/geqs/query" + q,
      '{"domain":"mailbox","predicate":{"type":"eq","expression":{"type":"property","property":"isMboxDeleted"},"value":false},"includeLabels":true,"properties":["identifier","name","uidValidity","unseenCount","seenDeletedCount","unseenDeletedCount","messageCount","flags"]}',
      ICLOUD_JSON_HEADERS];
    this.dataURL2 = [this.mcc + "/mailws2/v1/thread/search" + q,
      '{"responseType":"THREAD_DIGEST","includeFolderStatus":false,"maxResults":50,"sessionHeaders":{"folder":"INBOX","modseq":null,"threadmodseq":null,"condstore":1,"qresync":1,"threadmode":1}}',
      ICLOUD_JSON_HEADERS];
    return true;
  },

  getData: function (aData) {
    let obj = [];
    let folders = [];

    let num = 0;
    let found = false;
    let l;
    try {
      l = JSON.parse(aData).domainObjects;
    } catch (e) {
      return null;
    }
    if (!Array.isArray(l)) return null;

    this.spam = 0;
    for (let i = 0; i < l.length; i++) {
      let o = l[i];
      let name = o.name;
      if (!name) continue;
      if (name.indexOf("/") >= 0 || name.indexOf("$") >= 0) continue; //skip category labels
      if (ICLOUD_FOLDER.SYSTEM.includes(name)) continue;
      let n = o.unseenCount == null ? 0 : o.unseenCount;
      if (name == ICLOUD_FOLDER.JUNK) {
        this.spam = n;
      } else if (name == ICLOUD_FOLDER.INBOX || !this.inboxOnly) num += n;
      if (n > 0 && name != ICLOUD_FOLDER.INBOX) {
        let t = { id: name, title: name, count: n, url: this.viewURL, action: name };
        folders.push(t);
      }
      found = true;
    }
    if (found) this.count = num;

    let rs = { count: this.count, user: this.user, folders: folders, msg: obj, spam: this.spam };
    rs.action = {};
    rs.action["read"] = this.getActionUrl("read");
    rs.action["spam"] = this.getActionUrl("spam");
    rs.action["del"] = this.getActionUrl("del");
    return rs;
  },

  getData2: function (aData, rs) {
    try {
      if (rs.msg == null) rs.msg = [];
      let ar = rs.msg;
      let o = JSON.parse(aData).threadList;
      if (!Array.isArray(o)) return false;
      for (let i = 0; i < o.length; i++) {
        let m = o[i];
        let flags = m.flags || [];
        if (flags.indexOf("\\Seen") >= 0) continue; //already read
        let d = {};
        d.mid = m.threadId;
        let from = (m.senders && m.senders[0]) || "";
        let sender = from.match(/(.+?) <(\S+?)>/);
        if (sender) {
          d.email = sender[2];
          d.name = sender[1];
        } else d.name = from;
        d.title = m.subject;
        d.content = m.preview;
        d.time = m.timestamp;
        d.url = this.viewURL;
        ar.push(d);
        if (ar.length >= MAX_MSG) break;
      }
      return true;
    } catch (e) {}
    return false;
  },

  getActionUrl: function (act) {
    let rs = [];
    let q = "?dsid=" + this.dsid;
    switch (act) {
      case "read":
        rs[0] = this.mcc + "/mailws2/v1/thread/flag" + q;
        rs[1] = ['{"method":"ADD","flags":["SEEN"],"threadIds":[',
          '"', '%s', ',', '"', ICLOUD_SESSION_TAIL];
        break;
      case "spam":
        rs[0] = this.mcc + "/mailws2/v1/thread/move" + q;
        rs[1] = ['{"moveMethod":"MOVE","destFolder":"' + ICLOUD_FOLDER.JUNK + '","threadIds":[',
          '"', '%s', ',', '"', ICLOUD_SESSION_TAIL];
        break;
      case "del":
        rs[0] = this.mcc + "/mailws2/v1/thread/move" + q;
        rs[1] = ['{"moveMethod":"DELETE","destFolder":"' + ICLOUD_FOLDER.TRASH + '","threadIds":[',
          '"', '%s', ',', '"', ICLOUD_SESSION_TAIL];
        break;
    }
    rs[2] = { "Content-Type": "application/json" };
    return rs;
  }
}
