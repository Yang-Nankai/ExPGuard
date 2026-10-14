"use strict";
/***********************************************************
AOL
***********************************************************/
const AOL_ACTION_METHOD = Object.freeze({
  READ: "messages.readFlagUpdate",
  MOVE: "messages.move"
});

const AOL_FOLDER_TYPE = Object.freeze({
  BULK: "BULK",
  TRASH: "TRASH"
});

scripts["aol"] = {
  config: {
    inboxOnly: true,
    showFolders: true,
    showSnippets: true,
    includeSpam: true,

    cookies: [{ domain: ".aol.com", name: "OTH" }],

    iconURL: "https://s.yimg.com/nq/nr/img/aol_favicon_afYliGTEgGH181tujkoqqgnZUo0MWJfO0YO89iYimHY_v1.ico"
  },

  init: function () {
    this.infoURL = "https://mail.aol.com";
    this.viewURL = "https://mail.aol.com";
  },

  process: function (aData, aHttp) {
    switch (this.stage) {
      case ST_INFO:
        this.stage = ST_INFO_RES + 2;
        this.getHtml(this.infoURL);
        return true;
      case ST_INFO_RES + 2:
        let fnd = aData.match(/"guidHash"\s*:\s*"(\S+?)"/);
        if (fnd) {
          this.ymreqid = fnd[1];
          this.stage = ST_INFO_RES;
          this.getHtml("https://mail.aol.com/ws/v3/mailboxes?appid=aolwebmail&ymreqid=" + fnd[1]);
          return true;
        }
    }
    return this.baseProcess(aData, aHttp);
  },

  getUser: function (aData) {
    let obj = JSON.parse(aData);
    this.mailbox = obj["result"]["mailboxes"][0]["id"];
    let fnd = aData.match(/"wssid":"(\S+?)"/);
    if (fnd) {
      this.wssid = fnd[1];
      this.action = {
        [MailAction.READ]: { executor: MailActionExecutor.HANDLER },
        [MailAction.DELETE]: { executor: MailActionExecutor.HANDLER },
        [MailAction.SPAM]: { executor: MailActionExecutor.HANDLER }
      };
      this.dataURL = ["https://mail.aol.com/ws/v3/batch?appid=aolwebmail&ymreqid=" + this.ymreqid + "&webstdver=95.0&wssid=" + fnd[1],
      '{"responseType":"json","requests":[{"id":"ListFolders","uri":"/ws/v3/mailboxes/@.id==' + this.mailbox + '/folders","method":"GET"},{"id":"ListMessages1","uri":"/ws/v3/mailboxes/@.id==' + this.mailbox + '/messages/@.select==q?&q=folderId%3A1%20offset%3A0%20count%3A100%20sort%3A(-date)","method":"GET"}]}',
      { "content-type": "application/json" }];
    }
    fnd = aData.match(/"email":"(\S+?)"/);
    if (fnd) return fnd[1];
    else return null;
  },

  folderURL: function (folderId) {
    return this.viewURL + "/d/folders/" + folderId;
  },

  getData: function (aData) {
    let msg = [];
    let folders = [];

    let num = 0;
    let found = false;
    let flds;
    let mails;
    try {
      let o = JSON.parse(aData);
      flds = o.result.responses[0].response.result.folders;
      mails = o.result.responses[1].response.result.messages;
    } catch (e) {
      return null;
    }
    if (!flds || !mails) return null;

    this.folderByType = {};
    for (let i = 0; i < flds.length; i++) {
      let o = flds[i];
      let fid = o.name;
      if (Array.isArray(o.types)) for (let ft of o.types) this.folderByType[ft] = o.id;
      if (o.types.indexOf("INVISIBLE") >= 0) continue;
      if (fid == "Drafts") continue;
      if (fid == "Sent") continue;
      if (fid == "Trash") continue;
      if (fid == "Saved") continue;
      if (fid == "SavedIMs") continue;
      let n = o.unread;
      if (fid == "Spam") {
        this.spam = n;
      } else if (fid == "Inbox" || fid == "NewMail" || !this.inboxOnly) num += n;
      if (n > 0 && fid != "Inbox" && fid != "NewMail") {
        let t = { id: o.id, title: o.name, count: n, url: this.folderURL(o.id) };
        folders.push(t);
      }
      found = true;
    }
    if (found) this.count = num;

    for (let i = 0; i < mails.length; i++) {
      let m = mails[i];
      if (m.flags.read) continue;
      let hd = m.headers;
      let d = {};
      d.mid = m.conversationId;
      d.id = m.id;
      d.email = hd.from[0].email;
      d.name = hd.from[0].name;
      d.title = hd.subject;
      d.content = m.snippet;
      d.time = hd.date * 1000;
      let fid = (m.folder && m.folder.id) || "1";
      d.url = this.folderURL(fid) + "/messages/" + m.id;
      msg.push(d);
      if (msg.length >= MAX_MSG) break;
    }

    let rs = { count: this.count, user: this.user, folders: folders, msg: msg, spam: this.spam, action: this.action };
    return rs;
  },

  getActionRequest: function (action, messages) {
    if (!this.mailbox || !this.wssid || !Array.isArray(messages)) return null;

    let operation;
    let payload;
    if (action == MailAction.READ) {
      operation = AOL_ACTION_METHOD.READ;
      payload = { message: { flags: { read: true } } };
    } else if (action == MailAction.DELETE || action == MailAction.SPAM) {
      operation = AOL_ACTION_METHOD.MOVE;
      let type = action == MailAction.DELETE ? AOL_FOLDER_TYPE.TRASH : AOL_FOLDER_TYPE.BULK;
      let folderId = this.folderByType && this.folderByType[type];
      if (!folderId) return null;
      payload = { message: { folder: { id: folderId } } };
    } else {
      return null;
    }

    let ids = [...new Set(messages.map(m => m && (m.id || m.mid)).filter(Boolean))];
    if (ids.length == 0) return null;

    let uri = "/ws/v3/mailboxes/@.id==" + this.mailbox
      + "/messages/@.select==q?q=" + encodeURIComponent("id:(" + ids.join(" ") + ")");
    let url = "https://mail.aol.com/ws/v3/batch?appid=aolwebmail&ymreqid=" + this.ymreqid
      + "&webstdver=95.0&wssid=" + this.wssid + "&name=" + operation + "&nonblocking=true";
    let body = JSON.stringify({
      responseType: "json",
      requests: [{ id: "UpdateMessage", uri: uri, method: "POST", payloadType: "embedded", payload: payload }]
    });
    return [url, body, { "content-type": "application/json" }];
  },

  performAction: function (action, messages) {
    let request = this.getActionRequest(action, messages);
    if (!request) return Promise.resolve(false);

    return new Promise(resolve => {
      this.getHtml(request, aData => {
        try {
          let resp = JSON.parse(aData).result.responses[0];
          resolve(Boolean(resp && resp.httpCode >= 200 && resp.httpCode < 300
            && (!resp.response || !resp.response.error)));
        } catch (e) {
          resolve(false);
        }
      });
    });
  }
}
