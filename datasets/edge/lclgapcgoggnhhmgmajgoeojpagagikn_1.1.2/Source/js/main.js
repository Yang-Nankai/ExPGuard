var dpIds = [];

function getExtURL(path) {
  return  chrome.runtime.getURL(path)
}

function bdextInit(ali) {
  var s, head;
  s = document.createElement("script");
  s.type = "text/javascript";
  s.charset = "utf-8";
  s.src = getExtURL('js/bjext.js');
  head = document.getElementsByTagName('head')[0];
  head.appendChild(s);

  // insertCss('css/bjext2-new.css')
}

function insertCss(url) {
  var link = document.createElement('link')
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = getExtURL(url);
  document.getElementsByTagName('head')[0].appendChild(link)
}

function sendMsg(obj, callback) {
  chrome.runtime.sendMessage(obj, function(response) {
    if (callback)
      callback(response)
  });
}

function dispatch(b, c, id) {
  var evt = document.createEvent('CustomEvent')
  let payload = {
    type: b,
    value: c,
    id: id
  }
  if (navigator.userAgent.toLowerCase().includes('firefox')) {
    payload = JSON.stringify(payload)
  }
  evt.initCustomEvent('gwd_content', true, true, payload)
  document.dispatchEvent(evt)
}

function insertDom(text, dom) {
  var ss = document.createElement("a");
  ss.id = "gwd_myDiv";
  if (dom) ss.id = dom;
  ss.style.display = 'none';
  ss.innerText = text;
  head = document.getElementsByTagName('body')[0];
  head.appendChild(ss);
}

/*storeCurrency*/
function setStoreRate(currency) {
  chrome.storage.local.set({
    'currency': currency
  })
}

function getStoreRate() {
  chrome.storage.local.get('currency', function(info) {
    if (info)
      dispatch('getStoreRate', info)
  })
}

function proxyRequest(url, callback, referer) {
  chrome.runtime.sendMessage({
    type: 'proxyRequest',
    url: url,
    referer: referer
  }, function(response) {
    if (!response) {
      console.log(chrome.runtime.lastError)
    }
    callback(response)
  });
}

function proxyRequestPost(url, payload, callback, referer) {
  console.log('proxyrequest post')
  chrome.runtime.sendMessage({
    type: 'proxyRequestPost',
    url: url,
    data: payload,
    referer: referer
  }, function(response) {
    if (!response) {
      console.log(chrome.runtime.lastError)
    }
    callback(response)
  });
}

function proxyRequestPostForm(url, payload, callback, referer) {
  console.log('proxyrequest post')
  chrome.runtime.sendMessage({
    type: 'proxyRequestPostForm',
    url: url,
    data: payload,
    referer: referer
  }, function(response) {
    if (!response) {
      console.log(chrome.runtime.lastError)
    }
    callback(response)
  });
}

function setStorages(k, v) {
  var obj = {}
  obj[k] = v;
  chrome.storage.local.set(obj)
  chrome.storage.local.get('permanent', function(d) {
    if (d && d.permanent) {
      d.permanent[k] = v;
      obj = d.permanent
    }
    chrome.storage.local.set({
      'permanent': obj
    })
  })

}
/*taobao img*/
function downloadImg(src) {
  var obj = {
    src: src,
    type: 'taobaoImg'
  }
  sendMsg(obj, function(data) {
    if (!data || data != '') {
      insertDom(data, 'gwd_img_info')
      var evt = document.createEvent('CustomEvent')
      evt.initCustomEvent('gwd_content', true, true, {
        type: 'getTaobaoImgInfo',
        value: '1'
      })
      document.dispatchEvent(evt)
    }
  })
}

function getSrc() {
  var site = {
    '1688': '#mod-detail-bd .content .box-img img',
    'vip': '#J-mer-ImgReview .zoomPad>img',
    'mogujie': '#J_BigImg',
    'meilishuo': '#picture .item-pic-origin>img',
    'amazon': '#imgTagWrapperId img',
    'jd': '#spec-n1 img',
    'jumei': '#etalage li>img',
    '6pm': '#detailImage img',
    'taobao': '#J_ImgBooth',
    'tmall': '#J_ImgBooth',
    'banggo': '.mainPicContent',
    'vancl': '#midimg',
    'vjia': '#FreshDiv_MainPhoto .sp-bigImg img',
    'yougou': '#pD-bimg',
    'yintai': '#J_Magnifier img',
    'okbuy': '#zoom1 img',
    'lovo': '#jqzoom .zoomPad img',
    'handu': '#masterImage',
    'moonbasa': '#largeimg',
    'tonlion': '.good_left .jqzoom',
    'xiu': '#imgPic',
    'lamiu': '#op_product_zoom img',
    'masamaso': '.goods_tp_box .zoomPad img',
    '.s.cn': '.goods-detail-pic a img',
    'paixie': '#zoom1 img',
    'mbaobao': '#goods-zoom img',
    'm18': '#GoodsImage',
    'gap': '#wrap.all-images-box a img',
    'esprit': '#mainImages .m-pic img'
  }
  for (var pattern in site) {
    if (location.host.indexOf(pattern) > -1) {
      var src = document.querySelectorAll(site[pattern])[0] && document.querySelectorAll(site[pattern])[0].getAttribute('src')
      if (src && src.indexOf('base64') == -1) {
        return src;
      } else {
        return null;
      }
    }
  }
}

function runTaobaoImg(imgsrc) {
  var src
  if (imgsrc)
    src = imgsrc
  else
    src = getSrc();
  if (src)
    downloadImg(src)
}
/*taobao img end*/

/*taobao uniqpid*/
function runTaobaoUniq(nid, uniqid) {
  var url = 'https://s.taobao.com/search?type=samestyle&app=i2i&rec_type=1&uniqpid=' + uniqid + '&nid=' + nid;
  var obj = {
    type: 'taobaoUniq',
    url: url
  }
  sendMsg(obj, function(data) {
    if (!data || data != '') {
      var newdata = data.match(/\<script\>\s+g_page_config\s=\s(.*)/);
      if (newdata) newdata = newdata[1].match(/(\{.*\});/)
      if (newdata) newdata = newdata[1];
      insertDom(newdata, 'gwd_uniq_info')
      var evt = document.createEvent('CustomEvent')
      evt.initCustomEvent('gwd_content', true, true, {
        type: 'getTaobaouniq',
        value: '1'
      })
      document.dispatchEvent(evt)
    }
  })
}
/*taobao uniqpid end*/

function createUserId() {
  var time = (new Date()).getTime();
  var beforestr = 'bdext';
  var str = "abcdefghij";
  for (var i = 0; i < 3; i++) {
    beforestr = beforestr + str[parseInt(Math.random() * 10)]
  }
  var userid = beforestr + time;
  chrome.storage.local.set({
    'user_extension_id': userid
  });
  return userid;
}
document.addEventListener('gwd_extension', function(e) {
  switch (e.detail.type) {
    case 'backgroundReq':
      let reqId = e.detail.reqId
      chrome.runtime.sendMessage({
        type: 'backgroundReq',
        path: e.detail.path,
        params: e.detail.params
      }, function(response) {
        dispatch('backgroundResp', {
          reqId: reqId,
          data: response
        })
      })
      break;
    case 'proxyRequestPost':
      proxyRequestPost(e.detail.url, e.detail.payload, function(data) {
        dispatch('proxyRequestPost', data, e.detail.reqId)
      }, e.detail.referer)
      break;
    case 'proxyRequestPostForm':
      proxyRequestPostForm(e.detail.url, e.detail.payload, function(data) {
        dispatch('proxyRequestPostForm', data, e.detail.reqId)
      }, e.detail.referer)
      break;
    case 'proxyRequest':
      proxyRequest(e.detail.url, function(data) {
        dispatch('proxyRequest', data, e.detail.url)
      }, e.detail.referer)
      break
    case "get_permanent":
      chrome.storage.local.get('permanent', function(data) {
        dispatch('get_permanent', JSON.stringify(data.permanent))
      })
      break;
    case "get_local_img":
      dispatch("get_local_img", getExtURL('images/'))
      break;
    case "setStoreRate":
      setStoreRate(e.detail.info)
      break;
    case "getToken":
      chrome.storage.local.get('token', function(data) {
        dispatch('getToken', data)
      })
      break;
    case "setToken":
      chrome.storage.local.set({
        '_PD_UTMSEO_KEY': e.detail._PD_UTMSEO_KEY,
        '_PD_UTMSEO_TIM': e.detail._PD_UTMSEO_TIM
      })
      break;
    case "getStoreRate":
      getStoreRate()
      break;
    case "getTaobaoImgInfo":
      runTaobaoImg(e.detail.src);
      break;
    case "getTaobaouniq":
      var info = e.detail.info;
      try {
        if (info != '') {
          info = JSON.parse(info)
          runTaobaoUniq(info.nid, info.uniqid)
        }
      } catch (e) {}
      break;
    case "user_extension_id":
      chrome.storage.local.get('user_extension_id', function(data) {
        var userid
        if (data && data.user_extension_id) {
          userid = data.user_extension_id;
        } else {
          userid = createUserId();
        }
        dispatch('user_extension_id', userid);
      })
      break;
    case "getTaobaoTrend":
      sendMsg(e.detail, function(data) {
        dispatch('getTaobaoTrend', data)
      });
      break;
    case "setting_feedback":
      sendMsg({
        type: 'setting_feedback'
      })
      break;
    case "setStorage":
      setStorages(e.detail.key, e.detail.value)
      break;
    case "setStorageChrome":
      setStorages(e.detail.key, e.detail.value)
      break;
    case "getStorage":
      chrome.storage.local.get(e.detail.key, function(data) {
        dispatch('getStorage' + e.detail.id, data)
      })
      break;
    case "saveHistory":
      sendMsg(e.detail, function() {});
      break;
    case "getUnion":
      chrome.storage.local.get('bajbgcodue_fugnhijoknl', function(data) {
        if (data && data.bajbgcodue_fugnhijoknl)
          dispatch('getUnion', data.bajbgcodue_fugnhijoknl)
      })
      break;
    case 'checkUserToken':
      sendMsg({
        type: 'checkUserToken'
      }, function(e) {
        dispatch('checkUserToken', e)
      })
  }
});
bdextInit()
console.log("比一比隐私说明：")
console.log("    我们不会收集用户个人隐私信息，只会收集一些简单的产品交互行为，帮助改善产品，例如记录某个模块点击次数，更多信息请关注：")
console.log("隐私协议: https://www.biyibi123.com/privacy.html");
