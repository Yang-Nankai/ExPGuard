"use strict";
/***********************************************************
Hotmail (Outlook.com)
Fetches mail data from the OWA startupdata endpoint using the
MSAuth1.0 token captured by content/hotmail.js. The token is
provided by the service worker (main.getHotmailToken); when it is
missing the handler asks main to acquire one (main.ensureHotmailToken).

Cannot get messages in folders other than inbox.

Read/Delete/Spam actions use the OWA ApplyConversationAction API, which
operates on ConversationId (== message mid), so no extra id is needed.
***********************************************************/
const HOTMAIL_CONV_ACTION = Object.freeze({
  SET_READ: "SetReadState",
  MOVE: "Move"
});

const HOTMAIL_FOLDER = Object.freeze({
  DELETED: "deleteditems",
  JUNK: "junkemail"
});

const HOTMAIL_ACTION_URL =
  "https://outlook.live.com/owa/service.svc?action=ApplyConversationAction&app=Mail";

scripts["hotmail"] = {
  config: {
    inboxOnly: true,
    showFolders: true,
    showSnippets: true,
    includeSpam: true,

    cookies: [{ domain: ".live.com", name: "WLSSC" }],

    iconURL: "https://outlook.live.com/mail/favicon.ico"
  },

  init: function () {
    this.infoURL = ["https://outlook.live.com/owa/startupdata.ashx?app=Mail&n=0", ""];
    this.viewURL = "https://outlook.live.com/mail/";
    this.action = {
      [MailAction.READ]: { executor: MailActionExecutor.HANDLER },
      [MailAction.DELETE]: { executor: MailActionExecutor.HANDLER },
      [MailAction.SPAM]: { executor: MailActionExecutor.HANDLER }
    };
  },

  process: function (aData, aHttp) {
    switch (this.stage) {
      case ST_COOKIE_RES: //logged out
        this.main.invalidateHotmailToken();
        break;
      case ST_INFO:
      case ST_DATA: {
        let token = this.main.getHotmailToken();
        if (!token) {
          this.main.ensureHotmailToken();
          this.reset();
          this.setResult(null, true); //keep previous count until token arrives
          return true;
        }
        this.getHtml([this.infoURL[0], "", {
          "Authorization": token,
          "X-Req-Source": "Mail",
          "Action": "StartupData"
        }, "POST"]);
        return false;
      }
      case ST_INFO_RES:
      case ST_DATA_RES: {
        if (aHttp === 401 || aHttp === 403) {
          this.main.invalidateHotmailToken();
          if (this.checkRetry()) return true;
          this.reset();
          this.setResult(null, true); //transient, keep previous count
          return true;
        }
        let user = this.getUser(aData);
        if (user && this.user != user) this.setUser(user);
        let data = this.getData(aData);
        if (!data || this.count < 0) {
          if (this.checkRetry()) return true;
          this.reset();
          this.setResult(null, true); //cookie present -> treat as transient
          return true;
        }
        this.retry = 0;
        this.stage = ST_DATA;
        this.setResult(data, false);
        return true;
      }
    }
    return this.baseProcess(aData, aHttp);
  },

  getUser: function (aData) {
    let fnd = aData.match(/"LogonEmailAddress":\s*"(\S+?)"/);
    if (fnd) return fnd[1];
    return null;
  },

  //deep link to a folder; fid is a distinguished name (inbox, archive, ...) or a FolderId
  folderURL: function (fid) {
    return this.viewURL + encodeURIComponent(fid);
  },

  //deep link to a specific message inside its folder: /mail/<folder>/id/<conversationId>
  mailURL: function (fid, mid) {
    return this.folderURL(fid) + "/id/" + encodeURIComponent(mid);
  },

  getData: function (aData) {
    let obj = [];
    let folders = [];
    let o;
    try {
      o = JSON.parse(aData);
    } catch (e) {
      return null;
    }
    if (!o.findFolders) return null;

    let l = o.findFolders.Body.ResponseMessages.Items[0].RootFolder.Folders;
    this.count = 0;
    this.spam = 0;
    let flds = {};
    for (let i in l) {
      let f = l[i];
      flds[f.FolderId.Id] = f.DisplayName;
      if (f.FolderClass != "IPF.Note") continue;
      let fid = f.DistinguishedFolderId ? f.DistinguishedFolderId : f.FolderId.Id;
      if (fid == "sentitems" || fid == "drafts" || fid == "deleteditems" || fid == "outbox") continue;
      let n = f.UnreadCount;
      if (fid == "junkemail") {
        this.spam = n;
      } else if (this.inboxOnly) {
        if (fid == "inbox") this.count += n;
      } else this.count += n;
      if (n > 0 && fid != "inbox") {
        let fname;
        if (flds[f.ParentFolderId.Id]) fname = flds[f.ParentFolderId.Id] + "/" + f.DisplayName;
        else fname = f.DisplayName;
        folders.push({ id: fid, title: fname, count: n, url: this.folderURL(fid) });
      }
    }

    if (o.findConversation) {
      //findConversation is scoped to a single folder (Body.FolderId)
      let fid = o.findConversation.Body.FolderId.Id;
      let conv = o.findConversation.Body.Conversations;
      for (let i = 0; i < conv.length; i++) {
        let m = conv[i];
        if (m.GlobalUnreadCount == 0) continue;
        let d = {};
        d.mid = m.ConversationId.Id;
        d.name = m.UniqueSenders[0];
        d.title = m.ConversationTopic;
        d.content = m.Preview;
        d.time = new Date(m.LastDeliveryTime).getTime();
        d.url = this.mailURL(fid, d.mid);
        d.folderId = fid;
        obj.push(d);
        if (obj.length >= MAX_MSG) break;
      }
    } else if (o.findMailFolderItem) {
      let root = o.findMailFolderItem.Body.ResponseMessages.Items[0].RootFolder;
      let conv = root.Items;
      for (let i = 0; i < conv.length; i++) {
        let m = conv[i];
        if (m.IsRead) continue;
        let d = {};
        d.mid = m.ConversationId.Id;
        d.name = m.From.Mailbox.Name;
        d.title = m.Subject;
        d.content = m.Preview;
        d.time = new Date(m.DateTimeReceived).getTime();
        //each item carries its own ParentFolderId
        let pid = m.ParentFolderId ? m.ParentFolderId.Id : null;
        d.url = this.mailURL(pid || "inbox", d.mid);
        d.folderId = pid;
        obj.push(d);
        if (obj.length >= MAX_MSG) break;
      }
    }

    return {
      count: this.count, user: this.user, folders: folders,
      msg: obj, spam: this.spam, action: this.action
    };
  },

  targetFolder: function (id, distinguished) {
    return {
      "__type": "TargetFolderId:#Exchange",
      "BaseFolderId": {
        "__type": distinguished ? "DistinguishedFolderId:#Exchange" : "FolderId:#Exchange",
        "Id": id
      }
    };
  },

  getActionRequest: function (action, messages) {
    let token = this.main.getHotmailToken();
    if (!token || !Array.isArray(messages) || messages.length === 0) return null;

    let type;
    let destination;
    if (action == MailAction.READ) {
      type = HOTMAIL_CONV_ACTION.SET_READ;
    } else if (action == MailAction.DELETE) {
      type = HOTMAIL_CONV_ACTION.MOVE;
      destination = HOTMAIL_FOLDER.DELETED;
    } else if (action == MailAction.SPAM) {
      type = HOTMAIL_CONV_ACTION.MOVE;
      destination = HOTMAIL_FOLDER.JUNK;
    } else {
      return null;
    }

    let actions = [];
    for (let m of messages) {
      if (!m || !m.mid) return null;
      let ca = {
        "__type": "ConversationAction:#Exchange",
        "Action": type,
        "ConversationId": { "__type": "ItemId:#Exchange", "Id": m.mid },
        "ProcessRightAway": true
      };
      if (m.folderId) ca.ContextFolderId = this.targetFolder(m.folderId);
      if (type == HOTMAIL_CONV_ACTION.SET_READ) ca.IsRead = true;
      else ca.DestinationFolderId = this.targetFolder(destination, true);
      actions.push(ca);
    }

    let payload = {
      "__type": "ApplyConversationActionJsonRequest:#Exchange",
      "Header": { "__type": "JsonRequestHeaders:#Exchange", "RequestServerVersion": "V2018_01_08" },
      "Body": {
        "__type": "ApplyConversationActionRequest:#Exchange",
        "ConversationActions": actions
      }
    };

    return [HOTMAIL_ACTION_URL, JSON.stringify(payload), {
      "Authorization": token,
      "Action": "ApplyConversationAction",
      "X-Req-Source": "Mail",
      "Content-Type": "application/json; charset=UTF-8"
    }, "POST"];
  },

  isActionSuccess: function (aData) {
    try {
      let items = JSON.parse(aData).Body.ResponseMessages.Items;
      return items.length > 0 && items.every(it => it.ResponseClass == "Success");
    } catch (e) {
      return false;
    }
  },

  performAction: function (action, messages) {
    let request = this.getActionRequest(action, messages);
    if (!request) return Promise.resolve(false);

    return new Promise(resolve => {
      this.getHtml(request, aData => {
        resolve(this.isActionSuccess(aData));
      });
    });
  }
};
