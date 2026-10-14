"use strict";
/***********************************************************
Yahoo
***********************************************************/
const YAHOO_REQUEST_ID = Object.freeze({
  FOLDERS: "GetFolders",
  MESSAGES: "GetMessageGroupList"
});

const YAHOO_FOLDER_TYPE = Object.freeze({
  BULK: "BULK",
  CHATS: "CHATS",
  DRAFT: "DRAFT",
  INBOX: "INBOX",
  INVISIBLE: "INVISIBLE",
  SENT: "SENT",
  SYNC: "SYNC",
  TRASH: "TRASH"
});

const YAHOO_ACTION_METHOD = Object.freeze({
  READ: "messages.readFlagUpdate",
  MOVE: "messages.move"
});

const YAHOO_ACTION_REQUEST_ID = "UnifiedUpdateMessage_0";

scripts["yahoo"] = {
  config: {
    inboxOnly: true,
    showFolders: true,
    showSnippets: true,
    includeSpam: true,

    cookies: [{ domain: ".yahoo.com", name: "T" }],

    iconURL: "https://s.yimg.com/nq/favicons/2/favicons/favicon-no-badge-32x32.png"
  },

  init: function () {
    this.infoURL = "https://mail.yahoo.com/";
    this.reuseInfo = false;
    this.viewURL = "https://mail.yahoo.com/";
    this.mailPath = "/n/folders/";
    this.oldUI = false;
    this.apiUI = false;
    this.folderByType = {};
    delete this.dataURL2;
    delete this.mailboxId;
    delete this.wssid;
    delete this.action;
  },

  getUser: function (aData) {
    let fnd = aData.match(/"yid":"(\S+?)"/);
    let fnd2 = aData.match(/"accounts".+?"email":"(\S+?)"/);
    if (fnd && fnd2) return fnd2[1];
    fnd = aData.match(/"defaultID":"(\S+?)"/);
    if (fnd) return fnd[1];
    else return null;
  },

  getInfo: function (aData) {
    const mailbox = aData.match(/"selectedMailboxId":"([^"]+)"/);
    if (mailbox) {
      const wssid = aData.match(/"mailWssid":"([^"]+)"/);
      this.apiUI = true;
      this.mailboxId = mailbox[1];
      this.wssid = wssid && wssid[1];
      this.baseHost = "https://mail.yahoo.com";
      this.config.iconURL = "https://s.yimg.com/nq/nv/img/favicon_9M3teX-y8bHufVYohCS18MI2TBsY8fWmcRAMH3268Yo_v1.ico";
      if (this.wssid) {
        this.action = {
          [MailAction.READ]: { executor: MailActionExecutor.HANDLER },
          [MailAction.DELETE]: { executor: MailActionExecutor.HANDLER },
          [MailAction.SPAM]: { executor: MailActionExecutor.HANDLER }
        };
      }

      const mailboxURL = "/ws/v3/mailboxes/@.id==" + encodeURIComponent(this.mailboxId);
      this.dataURL = this.getBatchRequest(
        YAHOO_REQUEST_ID.FOLDERS,
        mailboxURL + "/folders"
      );

      const query = ' userQuery:("is:unread") acctId:1 groupBy:conversationId count:100 offset:0'
        + " -folderType:(TRASH)-folderType:(BULK)-folderType:(SYNC)-folderType:(INVISIBLE)";
      this.dataURL2 = this.getBatchRequest(
        YAHOO_REQUEST_ID.MESSAGES,
        mailboxURL + "/messages/@.select==q?q=" + encodeURIComponent(query)
      );
      return true;
    }

    this.apiUI = false;
    this.reuseInfo = true;
    let fnd = aData.match(/"yid":"(\S+?)"/);
    if (!fnd) this.oldUI = true;
    if (this.oldUI) {
      this.config.iconURL = "https://s.yimg.com/nq/favicons/2/favicons/favicon-no-badge-32x32.png";
      let fnd = aData.match(/data-host="(\S+?)"/);
      if (fnd) {
        this.baseHost = "https://" + fnd[1]
        this.dataURL = this.baseHost + "/neo/launch";
      }
      let fnd2 = aData.match(/str_nav_spam\s*:\s*"(.+?)"/);
      if (fnd2) this.spamName = fnd2[1];
      else this.spamName = "Spam";
    } else {
      this.config.iconURL = "https://s.yimg.com/nq/nr/img/favicon_kJCAOFliMOfdwulmDAg-b-Rr1cVzRHU8pkXZ517KhvQ_v1.ico";
      this.baseHost = "https://mail.yahoo.com";
    }
    return true;
  },

  getBatchRequest: function (id, uri, options) {
    options = options || {};
    const request = {
      id: id,
      uri: uri,
      method: options.method || "GET"
    };
    if (options.payload) {
      request.payloadType = "embedded";
      request.payload = options.payload;
    }

    const form = new FormData();
    form.append("batchJson", JSON.stringify({
      requests: [request],
      responseType: "json"
    }));
    let url = this.baseHost + "/ws/v3/batch";
    if (options.operation && this.wssid) {
      const params = new URLSearchParams({
        name: options.operation,
        appId: "YMailNovation",
        wssid: this.wssid,
        nonblocking: "true"
      });
      url += "?" + params.toString();
    }
    return [url, form];
  },

  getBatchResponse: function (aData, id) {
    try {
      const data = JSON.parse(aData);
      const responses = data && data.result && data.result.responses;
      if (!Array.isArray(responses)) return null;
      return responses.find(item => item.id == id) || null;
    } catch (error) {
      return null;
    }
  },

  getBatchResult: function (aData, id) {
    const response = this.getBatchResponse(aData, id);
    if (!response || response.httpCode != 200 || !response.response) return null;
    return response.response.result || null;
  },

  getActionRequest: function (action, messages) {
    if (
      !this.apiUI ||
      !this.mailboxId ||
      !this.wssid ||
      !Array.isArray(messages)
    ) {
      return null;
    }

    let operation;
    let payload;
    if (action == MailAction.READ) {
      operation = YAHOO_ACTION_METHOD.READ;
      payload = { message: { flags: { read: true } } };
    } else if (action == MailAction.DELETE || action == MailAction.SPAM) {
      operation = YAHOO_ACTION_METHOD.MOVE;
      const folderType = action == MailAction.DELETE
        ? YAHOO_FOLDER_TYPE.TRASH
        : YAHOO_FOLDER_TYPE.BULK;
      const folderId = this.folderByType[folderType];
      if (!folderId) return null;
      payload = { message: { folder: { id: folderId } } };
    } else {
      return null;
    }

    const messageIds = [...new Set(
      messages.map(message => message && message.mid).filter(Boolean)
    )];
    if (messageIds.length === 0 || messageIds.length !== messages.length) return null;

    const query = encodeURIComponent("id:(" + messageIds.join(" ") + ")");
    const uri = "/ws/v3/mailboxes/@.id==" + encodeURIComponent(this.mailboxId)
      + "/messages/@.select==q?q=" + query;
    return this.getBatchRequest(YAHOO_ACTION_REQUEST_ID, uri, {
      method: "POST",
      operation: operation,
      payload: payload
    });
  },

  performAction: function (action, messages) {
    const request = this.getActionRequest(action, messages);
    if (!request) return Promise.resolve(false);

    return new Promise(resolve => {
      this.getHtml(request, aData => {
        const response = this.getBatchResponse(aData, YAHOO_ACTION_REQUEST_ID);
        resolve(Boolean(
          response &&
          response.httpCode >= 200 &&
          response.httpCode < 300 &&
          (!response.response || !response.response.error)
        ));
      });
    });
  },

  getApiData: function (aData) {
    const result = this.getBatchResult(aData, YAHOO_REQUEST_ID.FOLDERS);
    if (!result || !Array.isArray(result.folders)) return null;

    const folders = [];
    this.count = 0;
    this.spam = 0;

    for (const folder of result.folders) {
      const types = Array.isArray(folder.types) ? folder.types : [];
      for (const type of types) {
        if (Object.values(YAHOO_FOLDER_TYPE).includes(type)) {
          this.folderByType[type] = folder.id;
        }
      }
      if (types.some(type => [
        YAHOO_FOLDER_TYPE.CHATS,
        YAHOO_FOLDER_TYPE.DRAFT,
        YAHOO_FOLDER_TYPE.SENT,
        YAHOO_FOLDER_TYPE.SYNC,
        YAHOO_FOLDER_TYPE.TRASH,
        YAHOO_FOLDER_TYPE.INVISIBLE
      ].includes(type))) continue;

      const unread = Number(folder.unread) || 0;
      const isInbox = types.includes(YAHOO_FOLDER_TYPE.INBOX);
      const isSpam = types.includes(YAHOO_FOLDER_TYPE.BULK);

      if (isSpam) this.spam = unread;
      else if (isInbox || !this.inboxOnly) this.count += unread;

      if (unread > 0 && !isInbox) {
        folders.push({
          id: folder.id,
          title: folder.name,
          count: unread,
          url: this.baseHost + this.mailPath + encodeURIComponent(folder.id)
        });
      }
    }

    return {
      count: this.count,
      user: this.user,
      folders: folders,
      msg: [],
      spam: this.spam,
      action: this.action
    };
  },

  getData2: function (aData, result) {
    const data = this.getBatchResult(aData, YAHOO_REQUEST_ID.MESSAGES);
    if (!data || !Array.isArray(data.messages)) return false;

    const seen = new Set();
    for (const message of data.messages) {
      if (result.msg.length >= MAX_MSG) break;

      const types = message.folder && Array.isArray(message.folder.types)
        ? message.folder.types
        : [];
      if (types.some(type => [
        YAHOO_FOLDER_TYPE.BULK,
        YAHOO_FOLDER_TYPE.INVISIBLE,
        YAHOO_FOLDER_TYPE.SYNC,
        YAHOO_FOLDER_TYPE.TRASH
      ].includes(type))) continue;
      if (this.inboxOnly && !types.includes(YAHOO_FOLDER_TYPE.INBOX)) continue;

      const conversationId = message.conversationId || message.id;
      if (seen.has(conversationId)) continue;
      seen.add(conversationId);

      const headers = message.headers || {};
      const sender = Array.isArray(headers.from) && headers.from[0]
        ? headers.from[0]
        : {};
      let time = Number(headers.date || headers.internalDate) || 0;
      if (time > 0 && time < 1000000000000) time *= 1000;

      result.msg.push({
        mid: message.id,
        folderId: message.folder.id,
        email: sender.email,
        name: sender.name,
        title: headers.subject,
        content: message.snippet,
        time: time,
        url: this.baseHost + this.mailPath
          + encodeURIComponent(message.folder.id)
          + "/messages/" + encodeURIComponent(conversationId)
      });
    }

    result.msg.sort((left, right) => right.time - left.time);
    return true;
  },

  getData: function (aData) {
    if (this.apiUI) return this.getApiData(aData);

    if (this.user != this.getUser(aData)) {//check account because of yahoo account manager
      this.count = -1;
      return null;
    }

    let obj = [];
    let folders = [];

    if (!this.oldUI) {
      let fnd = aData.match(/,"folders":(\[[\s\S]+?\]),"hasMoreItems"/);
      if (fnd) {
        let num = 0;
        let l = JSON.parse(fnd[1]);
        for (let i in l) {
          let o = l[i].folder;
          let fid = o.types[0];
          if (fid == "CHATS") continue;
          if (fid == "DRAFT") continue;
          if (fid == "SENT") continue;
          if (fid == "TRASH") continue;
          if (o.types.indexOf("INVISIBLE") != -1) continue;
          let n = o.unread;
          if (fid == "BULK") {
            this.spam = n;
          } else if (fid == "INBOX" || !this.inboxOnly) num += n;
          if (n > 0 && fid != "INBOX") {
            let t = { id: o.id, title: o.name, count: n, url: this.baseHost + this.mailPath + o.id };
            folders.push(t);
          }
        }
        this.count = num;

        fnd = aData.match(/"messageGroupList":(\[{[\S\s]+?}\]),"optedOutMarketingProducts"/);
        l = JSON.parse(fnd[1].replace(/:(undefined)([,}])/g, ":null$2"));
        let n = 0;
        for (let i in l) {
          if (n >= MAX_MSG) break;
          let mg = l[i].messages;
          for (let j in mg) {
            if (n >= MAX_MSG) break;
            let m = mg[j];
            if (m.flags.read) continue;
            let d = {};
            d.mid = m.id;
            d.email = m.headers.from[0].email;
            d.name = m.headers.from[0].name;
            d.title = m.headers.subject;
            d.content = m.snippet;
            d.time = m.headers.date * 1000;
            d.url = this.baseHost + this.mailPath + m.folder.id + "/messages/" + m.conversationId;
            obj.push(d);
            ++n;
          }
        }
        let rs = { count: this.count, user: this.user, folders: folders, msg: obj, spam: this.spam };
        return rs;
      }
    }

    let fnd = aData.match(/\.folders\s*?=\s*?({[\s\S]+?});/);
    if (fnd) {
      let num = 0;
      let l = JSON.parse(fnd[1]).folder;
      for (let i = 0; i < l.length; i++) {
        let o = l[i];
        let fid = o.folderInfo.fid;
        if (fid == "%40C%40Chats") continue;
        if (fid == "Draft") continue;
        if (fid == "Sent") continue;
        if (fid == "Trash") continue;
        let n = o.unread;
        if (fid == "%40B%40Bulk") {
          this.spam = n;
        } else if (fid == "Inbox" || !this.inboxOnly) num += n;
        if (n > 0 && fid != "Inbox") {
          let fn = fid == "%40B%40Bulk" ? this.spamName : unescape(o.folderInfo.name.replace(/\\u/g, "%u"));
          let t = { id: fid, title: fn, count: n, url: this.baseHost + "?fid=" + encodeURIComponent(fid) };
          folders.push(t);
        }
      }
      this.count = num;
    }
    fnd = aData.match(/\.msgListObj\s*?=\s*?(\[[\s\S]*?\]);/);
    if (fnd) {
      let l = JSON.parse(fnd[1]);
      for (let i = 0; i < l.length && i < MAX_MSG; i++) {
        let m = l[i];
        if (m.totalUnread == 0) continue;
        let d = {};
        d.mid = m.mid;
        d.email = m.messageInfo[0].from.email;
        d.name = m.messageInfo[0].from.name;
        d.title = m.subject;
        d.content = decodeHtmlEntity(m.snippetStr);//decode HTML entity
        d.time = m.rawDate * 1000;
        d.url = this.viewURL;
        obj.push(d);
      }
    }
    let rs = { count: this.count, user: this.user, folders: folders, msg: obj, spam: this.spam };
    return rs;
  }
}