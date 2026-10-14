"use strict";
const MAX_MSG = 5;

const ST_COOKIE = 200;
const ST_COOKIE_RES = 201;
const ST_INFO = 300;
const ST_INFO_RES = 301;
const ST_DATA = 400;
const ST_DATA_RES = 401;
const ST_DATA2 = 500;
const ST_DATA2_RES = 501;

function Handler(main) {
  this.main = main;
}
Handler.prototype = {
  inboxOnly: true,

  stage: 0,
  initStage: ST_INFO,
  count: -1,
  user: "",
  started: false,
  retry: 0,
  lastCheck: null,

  initHandler: function () {
    this.initStage = this.config.cookies ? ST_COOKIE : ST_INFO;
    this.count = -1;
    this.retry = 0;
    delete this.dataURL;
    this.init();
    if (!this.dataURL) this.dataURL = this.infoURL;
    if (!this.config.iconURL) {
      try {
        let url = this.viewURL.match(/(((\S+):\/\/([^/]+))(\S*\/)?)([^/]*)/);
        if (url) this.config.iconURL = url[2] + "/favicon.ico";
      } catch (e) { }
    }
  },

  reset: function () {
    this.count = -1;
    this.stage = this.initStage;
  },

  check: function () {
    if (!this.enabled) return;
    if (this.started) dout("started " + this.user + " " + this.lastCheck);
    if (this.started && this.lastCheck != null && (new Date() - this.lastCheck < 6000)) return; //prevent duplicate check;
    this.lastCheck = new Date();
    this.stop();
    if (this.count < 0) this.reset();
    else this.stage = ST_DATA;
    this.started = true;
    this.doNext("");
  },
  stop: function () {
    if (this.abort) {
      this.abort.abort();
      delete this.abort;
    }
  },
  doNext: function (aData, aHttp) {
    if (aData == null) {//suspend
      if (this.checkRetry()) return;
      this.onError(aData);
      return;
    }
    try {
      if (!this.process(aData, aHttp)) ++this.stage;
      delete this.abort;
    } catch (e) {
      this.onError(aData);
      if (e && e.stack) console.info(e.stack);
    }
  },
  checkRetry: function () {
    if (this.retry < 1) {
      ++this.retry;
      this.count = -1;
      this.started = false;
      this.check();
      return true;
    } else return false;
  },
  process: function (aData, aHttp) {
    //dout(this.stage);
    //dout(this.stage+" "+aData);
    switch (this.stage) {
      case ST_COOKIE:
        this.checkCookies();
        return false;
      case ST_COOKIE_RES: //no cookie
        this.reset();
        this.setResult(null);
        return true;
      case ST_INFO:
        this.getHtml(this.infoURL);
        return false;
      case ST_INFO_RES:
        let user = this.getUser(aData);
        if (this.user != user) this.setUser(user);
        if (!this.getInfo(aData)) {
          if (this.checkRetry()) return true;
          else break;
        }
        this.stage = this.reuseInfo ? ST_DATA_RES : ST_DATA;
        this.doNext(aData, aHttp);
        return true;
      /*if(this.user==user){
          if(!this.getInfo(aData)){
              if(checkRetry())return true;
              else break;                    
          }
          this.stage=this.reuseInfo?ST_DATA_RES:ST_DATA;
          return this.process(aData,aHttp);
      }else{
          this.setUser(user);
          this.check();
          return true;
      }*/
      case ST_DATA:
        this.getHtml(this.dataURL);
        return false;
      case ST_DATA_RES: {
        //let n=parseInt(this.getCount(aData));
        //this.count=isNaN(n)?-1:n;
        this.count = -1;
        let data;
        if (aData != null) data = this.getData(aData);
        if (this.count < 0) {
          if (this.checkRetry()) {
            return true;
          } else {
            data = null;
            this.reset();
          }
        } else {
          if (this.dataURL2) {
            this.stage = ST_DATA2;
            this.data = data;
            return this.process("");
          } else {
            this.retry = 0;
            this.stage = ST_DATA;
          }
        }
        this.setResult(data, aData == null);
        return true;
      }
      case ST_DATA2:
        this.getHtml(this.dataURL2);
        return false;
      case ST_DATA2_RES: {
        let data = this.data;
        if (!this.getData2(aData, data)) {
          if (this.checkRetry()) {
            return true;
          } else {
            data = null;
          }
        }
        delete this.data;

        this.retry = 0;
        this.stage = ST_DATA;
        this.setResult(data, aData == null);
        return true;
      }
    }
    this.onError(aData);
    return true;
  },
  onError: function (aData) {
    console.log(new Error("[onError] " + this.id + " " + this.user + " " + this.stage + " " + new Date().toISOString()));
    this.reset();
    this.setResult(null, aData == null);
  },

  getHtml: function (req, func) {
    this.abort = getHtml(req, func || this.doNext.bind(this));
    return this.abort;
  },

  getViewURL: function (aFolder) {
    return this.viewURL;
  },

  getCount: function (aData) {
    return -1;
  },
  getData: function (aData) {
    return {};
  },
  getUser: function (aData) {
    return this.user;
  },
  getInfo: function (aData) {
    return true;
  },
  getData2: function (aData, rs) {
    return true;
  },

  getForm: function (data, name, action) {
    let url = null;
    if (name) {
      let reg = new RegExp("<form([^>]+?id\\s*=\\s*[\"\']" + name + "[\"\'][\\S\\s]+?)<\/form>", "i");
      let s = data.match(reg);
      if (!s) return "";
      data = s[1];
    }
    if (action) {
      let fnd = data.match(/action\s*=\s*[\"\'](\S+?)[\"\']/);
      if (fnd) url = fnd[1];
    }
    let re = /<input[^>]+?name\s*=\s*[\"\'](\S+?)[\"\'][^>]+?value\s*=\s*[\"\']([\s\S]*?)[\"\'][\s\S]*?>/ig;
    let o;
    let post = "";
    while ((o = re.exec(data)) != null) {
      if (o[0].match(/type\s*=\s*[\"\']?hidden[\"\']?/i)) {
        if (post) post += "&";
        post += o[1] + "=" + encodeURIComponent(o[2]);
      }
    }
    if (action) return url ? [url, post] : null;
    return post;
  },

  delay: function (sec) {
    let self = this;
    window.setTimeout(function () { self.doNext(""); }, sec);
  },
  setResult: function (data, error) {
    this.started = false;
    this.main.setResult(this, data, error);
  },
  setUser: function (user) {
    this.main.setUser(this, user);
  },
  performAction: function () {
    return Promise.resolve(false);
  },
  setOption: function () {
  },
  checkCookies: function () {
    let cks = this.config.cookies;
    this.cookieCount = cks.length;
    this.cookieFound = false;
    let self = this;
    for (let i = 0; i < cks.length; i++) {
      extApi.cookies.getAll({ domain: cks[i].domain, name: cks[i].name })
        .then(
          cookies => self.onCheckCookie(cookies),
          () => self.onCheckCookie([])
        );
    }
  },
  onCheckCookie: function (cookies) {
    if (this.cookieCount < 0) return;
    if (cookies && cookies.length > 0) this.cookieFound = true;
    --this.cookieCount;
    if (this.cookieCount == 0) {
      this.cookieCount = -1;
      this.stage = this.cookieFound ? ST_INFO : ST_COOKIE_RES;
      this.doNext("");
    }
  }
}
Handler.prototype.baseProcess = Handler.prototype.process;

function getHtml(req, func) {
  let aURL, aPostData, aHeaders, aMethod;
  if (req instanceof Array) {
    aURL = req[0];
    aPostData = req[1];
    aHeaders = req[2];
    aMethod = req[3];
  } else aURL = req;

  const ac = new AbortController();
  const headers = {}
  const options = {
    method: "GET",
    signal: ac.signal,
    headers: headers,
    body: aPostData
  };

  let setContentType = false;
  if (aPostData || aPostData == "") {
    options.method = "POST";
    setContentType = !(typeof FormData != "undefined" && aPostData instanceof FormData);
  }
  if (aHeaders) {
    for (let t in aHeaders) {
      if (t.toLocaleLowerCase() == "content-type") setContentType = false;
      headers[t] = aHeaders[t];
    }
  }
  if (setContentType) headers["Content-Type"] = "application/x-www-form-urlencoded";

  fetch(aURL, options).then((res) => res.text())
    .then(text => {
      func(text)
    })
    .catch(e => {
      func(null);
      dout(e);
    });
  return ac;
}

const decodeHtmlEntity = (s) => {
  const named = {
    quot: '"',
    apos: "'",
    lt: "<",
    gt: ">",
    nbsp: "\u00a0",
    amp: "&",
  };
  return s.replace(/&#x([0-9a-fA-F]+);/g, (_, p1) => String.fromCodePoint(parseInt(p1, 16)))
    .replace(/&#(\d+);/g, (_, p1) => String.fromCodePoint(parseInt(p1, 10)))
    .replace(/&(quot|apos|lt|gt|nbsp|amp);/g, (_, p1) => named[p1]);
}
