"use strict";
/***********************************************************
Naver

Naver moved the message list out of /json/initData; initData now only
returns folders/settings. The unread list (with preview) comes from a
separate POST /json/list call, which this handler fetches as the second
data stage (dataURL2 -> getData2).
***********************************************************/
const NAVER_FOLDER = Object.freeze({
    INBOX: 0,
    SPAM: 5,
    SYSTEM_MAX: 6 //folderSN 1..6 are system folders shown via their own counts
});

scripts["naver"] = {
    config: {
        inboxOnly: true,
        showFolders: true,
        showSnippets: true,
        includeSpam: true,

        cookies: [{ domain: ".naver.com", name: "NID_AUT" }],

        iconURL: "https://mail.naver.com/favicon.ico"
    },

    init: function () {
        this.infoURL = ["https://mail.naver.com/json/initData", ""];
        this.reuseInfo = true;
        this.viewURL = "https://mail.naver.com/";
    },

    getUser: function (aData) {
        var fnd = aData.match(/"mailAddress":\s*"(\S+?)"/);
        if (fnd) {
            return fnd[1];
        }
        return null;
    },

    //deep link to a folder's message list
    folderURL: function (folderSN) {
        return this.viewURL + "v2/folders/" + folderSN + "/all";
    },

    //deep link to a single mail (full read view)
    mailURL: function (folderSN, mailSN) {
        return this.viewURL + "v2/folders/" + folderSN + "/read/" + mailSN;
    },

    getUserId: function () {
        return this.user ? this.user.split("@")[0] : "";
    },

    getData: function (aData) {
        this.count = -1;
        this.spam = 0;
        var folders = [];
        var fnd;
        try {
            fnd = JSON.parse(aData);
        } catch (e) { };
        if (fnd && Array.isArray(fnd.folders)) {
            var fld = fnd.folders;
            var num = 0;
            for (var i = 0; i < fld.length; i++) {
                var o = fld[i];
                if (o.folderSN == NAVER_FOLDER.SPAM) {
                    this.spam = o.unreadMailCount;
                    continue;
                }
                if (o.folderSN > NAVER_FOLDER.INBOX && o.folderSN <= NAVER_FOLDER.SYSTEM_MAX) continue;
                var n = o.unreadMailCount;
                if (this.inboxOnly) {
                    if (o.folderSN == NAVER_FOLDER.INBOX) num = n;
                } else num += n;
                if (n > 0 && o.folderSN != NAVER_FOLDER.INBOX) {
                    folders.push({ id: o.folderSN, title: o.folderName, count: n, url: this.folderURL(o.folderSN) });
                }
            }
            this.count = num;
        }
        if (this.spam > 0) folders.push({ id: "Spam", count: this.spam, url: this.folderURL(NAVER_FOLDER.SPAM) });

        //the unread list moved to POST /json/list; fetch it as the second stage
        this.dataURL2 = ["https://mail.naver.com/json/list?folderSN=" + NAVER_FOLDER.INBOX
            + "&startOffset=1&pageSize4SeeMore=100&viewMode=conversation&previewMode=1"
            + "&sortField=1&sortType=0&u=" + this.getUserId(), ""];

        var user = this.getUserId();
        var rs = { count: this.count, user: this.user, folders: folders, spam: this.spam, msg: [] };
        rs.action = {};
        rs.action["read"] = ["https://mail.naver.com/json/select/setStatus/read/",
            ["mailSNList=", "", "%s", "", "%3B", "&status=read&u=" + user]];
        rs.action["spam"] = ["https://mail.naver.com/json/spam/report/",
            ["mailSNList=", "", "%s", ";", "", "&from=list&spamMoveType=0&autoMove=Y&rejectCheck=N&retroactivity=N&showSpamLayer=Y&u=" + user]];
        rs.action["del"] = ["https://mail.naver.com/json/select/delete/",
            ["mailSNList=", "", "%s", "%3B", "", "&deleteSpamDirect=-1&currentFolderType=etc&folderSNList=",
                "0", "%r", "", ";", "", "&u=" + user]];

        return rs;
    },

    getData2: function (aData, rs) {
        var o;
        try {
            o = JSON.parse(aData);
        } catch (e) {
            return false;
        }
        if (!o || !Array.isArray(o.mailData)) return false;

        var msg = o.mailData;
        for (var i = 0; i < msg.length; i++) {
            var m = msg[i];
            if (m.unreadThreadCount == 0) continue;
            var d = {};
            d.mid = m.mailSN;
            d.email = m.from ? m.from.email : "";
            d.name = m.from ? m.from.name : "";
            d.title = m.subject;
            d.content = m.preview || "";
            d.time = m.receivedTime * 1000;
            d.url = this.mailURL(m.folderSN != null ? m.folderSN : NAVER_FOLDER.INBOX, d.mid);
            rs.msg.push(d);
            if (rs.msg.length >= MAX_MSG) break;
        }
        return true;
    }
}