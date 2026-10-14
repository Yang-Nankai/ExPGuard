"use strict";
/***********************************************************
Gmail

Read/Delete/Spam actions use the same /s/?v=or endpoint as
"Checker Plus for Gmail": a FormData "s_jr" JSON payload with a
numeric action code, authenticated by the GMAIL_AT token and the
ik (== GM_ID_KEY) already parsed in getInfo. Gmail may answer with
a short spreauth redirect body when the session must be
re-authenticated; that cannot be resolved by fetch, so we open the
spreauth URL for the user (same behaviour as Checker Plus).
***********************************************************/
const GMAIL_ACTION_CODE = Object.freeze({
  [MailAction.READ]: 3,
  [MailAction.DELETE]: 9,
  [MailAction.SPAM]: 7
});

scripts["gmail"] = {
  config: {
    isGoogle: true,
    multi: true,

    inboxOnly: true,
    showFolders: true,
    showSnippets: true,
    includeSpam: true,

    iconURL: "https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon5.ico"
  },

  init: function () {
    this.infoURL = "https://mail.google.com/mail/u/" + this.nid + "/?rt=c";
    this.viewURL = "https://mail.google.com/mail/u/" + this.nid + "/";
    this.dataURL = this.viewURL + "feed/atom";
    this.dataURL2 = this.dataURL;
    this.action = {
      [MailAction.READ]: { executor: MailActionExecutor.HANDLER },
      [MailAction.DELETE]: { executor: MailActionExecutor.HANDLER },
      [MailAction.SPAM]: { executor: MailActionExecutor.HANDLER }
    };
  },

  getInfo: function (aData) {
    let fnd1 = aData.match(/"\/mail(?:\/u\/(\d+))?",\S+?,"(\S+?)"/);
    if (fnd1) {
      this.ik = fnd1[2];
      let fnd = aData.match(/GM_ACTION_TOKEN\s*=\s*['"](\S+?)['"]/);
      if (fnd) this.actionToken = fnd[1];
      return true;
    }
    return false;
  },

  process: function (aData, aHttp) {
    switch (this.stage) {
      case ST_INFO_RES:
        let user = this.getUser(aData);
        if (this.user != user) this.setUser(user);
        if (!this.getInfo(aData)) {
          if (this.checkRetry()) return true;
          else break;
        }
        this.getHtml(this.viewURL + "?ui=2&ik=" + this.ik + "&view=omni&rt=j");
        return false;
      case ST_INFO_RES + 1:
        this.labels = [];
        this.labelsCount = 0;
        let ind = aData.indexOf("[[[");
        if (ind >= 0) {
          aData = aData.substring(ind);
          try {
            let obj = JSON.parse(aData)[0];
            let ar = [];
            for (let i in obj) {
              let o = obj[i];
              if (o[0] == "omni") {
                ar = o[1];
                break;
              }
            }
            for (let i in ar) {
              let o = ar[i];
              if (!o[0].startsWith("^")) {
                this.labels.push(o[0]);
              }
            }
            this.labels.push("^s");
          } catch (e) { }
        }
        this.stage = ST_DATA;
        break;
      case ST_DATA2:
        this.getData2().then(() => {
          let data = this.data;
          delete this.data;

          this.retry = 0;
          this.labelsCount = 0;
          this.stage = ST_DATA;
          data.msg.sort(function (a, b) { return b.time - a.time; });
          data.msg = data.msg.slice(0, MAX_MSG);
          this.setResult(data, aData == null);
          return true;
        });
        return true;
    }
    return this.baseProcess(aData, aHttp);
  },

  getData: function (aData) {
    this.count = -1;
    this.inboxMsgs = [];
    let obj = [];
    let folders = [];
    let fnd = aData.match(/<fullcount>(\d+)<\/fullcount>/);
    if (fnd) {
      this.count = parseInt(fnd[1]);
      if (this.count >= 0) {
        const ar = [...aData.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
        for (let i = 0; i < ar.length; i++) {
          const em = ar[i][1];
          const id = em.match(/<link[\s\S]+?href[\s\S]+?message_id=(\S+?)&/)[1];
          this.inboxMsgs.push(id);
          obj.push(this.getMsg(em, id));
          if (obj.length >= MAX_MSG) break;
        }
      }
    }

    return {
      count: this.count, user: this.user, folders: folders,
      msg: obj, spam: this.spam, action: this.action
    };
  },

  getMsg: function (em, id) {
    let d = {};
    d.mid = id;
    d.email = em.match(/<author>[\s\S]*?<email>([\s\S]*?)<\/email>[\s\S]*?<\/author>/)[1];
    d.name = em.match(/<author>[\s\S]*?<name>([\s\S]*?)<\/name>[\s\S]*?<\/author>/)[1];
    d.title = decodeHtmlEntity(em.match(/<title>([\s\S]*?)<\/title>/)[1]);
    d.content = decodeHtmlEntity(em.match(/<summary>([\s\S]*?)<\/summary>/)[1]);
    d.time = new Date(em.match(/<issued>([\s\S]*?)<\/issued>/)[1]).getTime();
    d.url = this.viewURL + (this.inboxOnly ? "#inbox" : "#all") + "/" + d.mid;
    return d;
  },

  getData2: async function () {
    let promises = [];
    for (let i = 0; i < this.labels.length; i++) {
      promises.push(this.getLabelData(this.data, this.labels[i]));
      if (promises.length == 5 || i == this.labels.length - 1) {
        await Promise.allSettled(promises);
        promises = [];
      }
    }
  },

  getLabelData: async function (rs, label) {
    try {
      const res = await fetch(this.viewURL + "feed/atom/" + encodeURIComponent(label.replaceAll("/","-")), { method: "GET", credentials: "include" });
      if (!res.ok) return false;
      const aData = await res.text();
      let fnd = aData.match(/<fullcount>(\d+)<\/fullcount>/);
      let n = parseInt(fnd[1]);
      let n2 = n;
      if (label != "^s") {
        if (n > 0) {
          const ar = [...aData.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
          for (let i = 0; i < ar.length; i++) {
            const em = ar[i][1];
            const id = em.match(/<link[\s\S]+?href[\s\S]+?message_id=(\S+?)&/)[1];
            if (this.inboxMsgs.indexOf(id) >= 0) {
              --n2;
            } else {
              this.inboxMsgs.push(id);
              if (i < MAX_MSG) rs.msg.push(this.getMsg(em, id));
            }
          }

          if (!this.inboxOnly) {
            this.count += n2;
            rs.count += n2;
          }
          rs.folders.push({ id: label, count: n, url: this.viewURL + "#label/" + label });
        }
      } else {
        if (n > 0) rs.folders.push({ id: "Spam", count: n, url: this.viewURL + "#spam" });
      }
      return true;
    } catch (e) { }
    return false;
  },

  getAT: async function () {
    //prefer the live token captured from real Gmail traffic, fall back to the cookie
    let at = this.main.getGmailAT(this.nid);
    if (at) return at;
    try {
      const cookie = await extApi.cookies.get({ name: "GMAIL_AT", url: this.viewURL });
      return cookie ? cookie.value : null;
    } catch (e) {
      return null;
    }
  },

  //Checker Plus for Gmail payload: s_jr carries [action code, thread, ...]
  buildActionBody: function (code, thread) {
    const body = new FormData();
    body.append("s_jr", JSON.stringify([null, [[null, null, null,
      [null, code, thread, thread, "l:all", [], [], null]],
      [null, null, null, null, null, null, [null, true, false]],
      [null, null, null, null, null, null, [null, true, false]]
    ], 2, null, null, null, this.ik]));
    return body;
  },

  performAction: async function (action, messages) {
    const code = GMAIL_ACTION_CODE[action];
    if (code == null || !this.ik || !Array.isArray(messages) || messages.length === 0) return false;

    const at = await this.getAT();
    if (!at) return false;

    const base = this.viewURL + "s/?v=or&ik=" + this.ik + "&at=" + at + "&subui=chrome&hl=en&ts=";
    let ok = true;
    for (const m of messages) {
      if (!m || !m.mid) { ok = false; continue; }
      try {
        const res = await fetch(base + Date.now(), {
          method: "POST",
          credentials: "include",
          body: this.buildActionBody(code, m.mid)
        });
        const text = await res.text();
        //short body containing a spreauth url == session must be re-authenticated (cannot be done via fetch)
        const fnd = text.length < 200 && text.match(/https?:\/\/[\w.-]+\/[\w\/.-]*spreauth[\w\/.-]*/);
        if (fnd) {
          this.main.openUrl(fnd[0]);
          return false;
        }
        if (!res.ok) ok = false;
      } catch (e) {
        ok = false;
      }
    }
    return ok;
  }
}