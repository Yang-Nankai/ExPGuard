try {
  var utype = navigator.userAgent.toLowerCase();
  var browser = "chrome";
  var uninstallUrl = 'https://www.biyibi123.com/uninstall.html?browser=chrome';
  if (utype.indexOf('qqbrowser') > -1) {
    browser = "qq";
    uninstallUrl = 'https://www.biyibi123.com/uninstall.html?browser=qq';
  }
  if (utype.indexOf('edg') > -1) {
    browser = "edge";
    uninstallUrl = 'https://www.biyibi123.com/uninstall.html?browser=edge';
  }
  chrome.storage.local.get('installcache', function(d) {
    console.log('install cache', d)
    if (!d || (d && !d.installcache)) {
      //
      // chrome.tabs.create({
      //   url: url
      // });
      request('https://browser.biyibi123.com/visit?action=install:' + browser, () => {
        console.log('install log sended')
      })
    }
    chrome.storage.local.set({
      'installcache': '1'
    })
  })
} catch (e) {}

let token = 'default'
let _PD_UTMSEO_KEY = ''
let _PD_UTMSEO_TIM = ''

console.log('start', new Date)

function loadKey() {
  chrome.storage.local.get('_PD_UTMSEO_KEY', function(data) {
    _PD_UTMSEO_KEY = data._PD_UTMSEO_KEY ? data._PD_UTMSEO_KEY: ''
  })

  chrome.storage.local.get('_PD_UTMSEO_TIM', function(data) {
    _PD_UTMSEO_TIM = data._PD_UTMSEO_TIM ? data._PD_UTMSEO_TIM: ''
  })
}

let interval = setInterval(loadKey, 3000)

chrome.runtime.onMessage.addListener(
  function(obj, sender, sendResponse) {
    if (obj.type === 'checkUserToken') {
      //debugger
    }
    switch (obj.type) {
      case 'proxyRequestPost':
        // xml = new XMLHttpRequest()
        // xml.open('POST', obj.url)
        // if (url.indexOf('//u.') > -1) {
        //   setHeader(xmlhttp)
        // }
        // xml.addEventListener('load', function() {
        //   try {
        //     let data = JSON.parse(xml.response.replace(/u.bijiago.com/g, 'u.pricedog.com'));
        //     sendResponse(data)
        //   } catch (e) {
        //     sendResponse(null)
        //   }
        // })
        // xml.send(obj.data)
        fetch(obj.url, {
          method: 'post',
          body: obj.data,
          headers: {
            'x-referer': obj.referer
          }
        }).then(r => r.text()).then(r => {
          try {
            let res = JSON.parse(r.replace(/u.bijiago.com/g, 'u.biyibi.com'))
            sendResponse(res)
          } catch (e) {
            sendResponse(null)
          }
        });
        break
      case 'proxyRequestPostForm':
        let formData = new FormData()
        console.log(obj.data)
        Object.keys(obj.data).forEach(item => {
          formData.append(item, obj.data[item])
        })
        const data = new URLSearchParams()

        for (const pair of formData) {
          data.append(pair[0], pair[1]);
        }

        fetch(obj.url, {
          method: 'post',
          body: data,
          headers: {
            'x-referer': obj.referer
          }
        }).then(r => r.text()).then(r => {
          try {
            let res = JSON.parse(r.replace(/u.bijiago.com/g, 'u.biyibi123.com'))
            sendResponse(res)
          } catch (e) {
            sendResponse(null)
          }
        });
        break
      case "proxyRequest":
        request(obj.url.replace('callback=?', ''), function(data) {
          try {
            data = JSON.parse(data.replace(/u.gwdang.com/g, 'u.biyibi123.com'))
          } catch (err) {

          }
          sendResponse(data)
        }, obj.referer)
        break;
      case 'checkHistory':
        checkHistory(function() {
          sendResponse('done')
        });
        break;
      case "setting_feedback":
        opentab()
        sendResponse()
        break;
      case "taobaoImg":
        request(obj.src, function(content) {
          sendResponse(content)
        })
        break;
      case "getTaobaoTrend":
        request(obj.info, function(content) {
          sendResponse(content)
        })
        break;
      case "saveHistory":
        saveHistory(obj)
        sendResponse()
        break;
      case "delHistory":
        delHistory();
        break;
      case "clearReduce":
        clearReduce()
        break;
        // case "checkPermissions":
        //   chrome.permissions.contains({
        //     permissions: [obj.permissions],
        //   }, function(result) {
        //     if (result) {}
        //   });
        //   break;
      case 'checkUserToken':
        chrome.cookies.get({
          url: 'https://i.bijiago.com',
          name: 'GWD_USER_TOKEN'
        }, function(e) {
          let val = e ? e.value: ''
          sendResponse(`${val}`)
        })
        break;
      default:
        if (obj.url)
          request(obj.url, function(content) {
            sendResponse(content)
          })
    }
    return true
  });

function getImg(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.responseType = 'blob';
  xmlhttp.addEventListener('load', function() {
    if (!xmlhttp.response) return;
    postMsg(xmlhttp.response, callback)
  })
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function saveHistory(obj) {
  if (!obj.dp_id) return;
  var arr = []
  var obj = {
    'dp_id': obj.dp_id,
    'time': new Date().getTime(),
    'lowest_pri': obj.price,
    'price': obj.price
  }
  chrome.storage.local.get('historyList', function(data) {
    if (data && data.historyList) {
      arr = data.historyList
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].dp_id === obj.dp_id) {
        let obj2 = arr.splice(i, 1);
        obj.lowest_pri = Math.min(Number(obj2.lowest_pri), Number(obj.price));
      }
    }
    arr.push(obj)
    if (arr.length > 50) {
      arr.shift()
    }
    chrome.storage.local.set({
      historyList: arr
    })
  })
}



function postMsg(data, callback) {
  var str = "0123456789abcdefgABCDEFG";
  var imgName = "";
  for (var i = 0; i < 17; i++) {
    imgName += str.charAt(Math.round(Math.random() * 23))
  }
  var formData = new FormData();
  formData.append('imgfile', data, imgName + '.jpg');
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.addEventListener('load', function() {
    try {
      var name = JSON.parse(xmlhttp.response).name;
    } catch (e) {
      var name = "";
    }
    buildUrl(name, callback)
  })
  xmlhttp.open("POST", 'https://s.taobao.com/image', true)
  xmlhttp.send(formData);
}

function opentab() {
  chrome.tabs.create({
    url: chrome.extension.getURL("html/setting_feedback.html")
  });
}

function buildUrl(name, callback) {
  if (!name || name == '') {
    callback();
    return;
  }
  var y = (new Date()).getFullYear();
  var m = (new Date()).getMonth() + 1;
  var d = (new Date()).getDate();
  if (m < 10) m = '0' + m.toString()
  else m = m.toString();
  if (d < 10) d = '0' + d.toString()
  else d = d.toString();
  var datastr = 'staobaoz_' + y.toString() + m + d;
  var url = "https://s.taobao.com/search?q=&imgfile=&js=1&stats_click=search_radio_all%253A1&initiative_id=" + datastr + "&ie=utf8&tfsid=" + name + "&app=imgsearch";
  request(url, function(data) {
    var newdata = data.match(/\<script\>\s+g_page_config\s=\s(.*)/);
    if (newdata) newdata = newdata[1].match(/(\{.*\});/)
    if (newdata) newdata = newdata[1];
    callback(newdata)
  })
}

function requestPost(info, callback) {
  info = info.url;
  var url = "https://browserre.taotaosou.com/get_bd_comparision_info";
  var xml = new XMLHttpRequest()
  xml.addEventListener('load', function() {
    if (xml.responseText) {
      callback(xml.responseText)
    }
  })
  xml.open('POST', url);
  xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xml.send(info)
}

function request(url, callback, referer = '') {
  fetch(url, {
    headers: {
      'x-referer': referer
    }
  }).then(r => r.text()).then(r => callback(r))
}
var blocks = {
  "urls": [
    "auto\\.alicdn\\.com/up/kirov/tmall\\.js"
  ],
  "csp-headers": [
    "mogujie",
    "vip.com",
    "jumei.com",
    "jumeiglobal.com",
    "steampowered.com"
  ]
};;

function setHeader(xmlhttp, referer = '') {
  xmlhttp.setRequestHeader('x-token', token)
  if (_PD_UTMSEO_KEY) {
    xmlhttp.setRequestHeader('_PD_UTMSEO_KEY', _PD_UTMSEO_KEY)
    xmlhttp.setRequestHeader('_PD_UTMSEO_TIM', _PD_UTMSEO_TIM)
  }
  if (referer) {
    xmlhttp.setRequestHeader('x-referer', referer)
  }
}

(function getCookies() {
  chrome.cookies.getAll({}, function(e) {
    e = e || [];
    for (var i = 0; i < e.length; i++) {
      if (e[i].name === 'bajbgcodue_fugnhijoknl') {
        chrome.storage.local.set({
          'bajbgcodue_fugnhijoknl': e[i].value
        })
      }
    }
  })
})();

// chrome.alarms.onAlarm.addListener(function(alarm) {
//   console.log('alarm fired')
//   switch (alarm.name) {
//     case "checkHistory":
//       checkHistory()
//       break;
//   }
// })

// 暂时关闭历史降价查询
// chrome.alarms.create('checkHistory', {
//   periodInMinutes: 5
// })
// chrome.alarms.clear('checkHistory');

var couponObj = {},
  couponStart = 0,
  couponEnd = 0,
  runsize = 0,
  historyLists = [],
  historyArr = [];


function checkHistory(callback) {
  historyLists = [];
  console.log('checkHistory called', new Date)
  chrome.storage.local.get('historyList', function(data) {
    if (data && data.historyList) {
      historyLists = data.historyList;
      let dpidArr = data.historyList.map(function(v) {
        return v.dp_id
      })
      let checkSize = Math.ceil(dpidArr.length / 15);
      for (let i = 0; i < checkSize; i++) {
        let arr2 = dpidArr.slice(15 * i, 15 * (i + 1));
        let str = arr2.join(",");
        let url = 'https://browser.bijiago.com/window/footprint?dp_ids=' + str + '&format=json&from_device=bijiago&crc64=1';
        request(url, function(data) {
          try {
            data = JSON.parse(data)
            console.log(data)
            data = data.map(item => {
              if (item.dp_id.match(/(?:-83|-123)$/)) {
                item.url = `https://browser.bijiago.com/extension/RedirectInTime?id=${item.dp_id.replace('-83', '').replace('-123', '')}&site=&source=common&from_device=bijiago`
              }
              return item
            })
            runsize++;
            historyArr = historyArr.concat(data)
            for (let j = 0; j < arr2.length; j++) {
              if (arr2[j].match(/(?:-83|-123)$/)) {
                couponStart++
                getTbCoupon(arr2[j].split('-')[0], checkSize)
              }
            }
            if (couponStart === couponEnd && couponStart === 0 && runsize === checkSize) {
              calCouponPrice()
            }
          } catch (e) {}
          callback()
        })
      }


    } else {
      callback()
    }
  })
}

function clearReduce() {
  localStorage.setItem("reduceNum", "0");
  localStorage.setItem("clearTime", new Date().getTime())
  chrome.browserAction.setBadgeText({
    text: ""
  })
  chrome.storage.local.get('historyData', function(data) {
    if (data && data.historyData) {
      for (let i = 0; i < data.historyData.length; i++) {
        data.historyData[i].newreduce = "";
      }
    }
    chrome.storage.local.set(data)
  })
}

function sendChromeNotification(id, content) {
  try {
    //chrome.notifications.create(id, content)
  } catch (e) {}
}


function sendNotifacation(num, remindIds) {
  if (!num) return;
  let size = remindIds.length;
  chrome.storage.local.get('remindDpIds', function(data) {
    if (data && data.remindDpIds) {
      for (let i = size - 1; i >= 0; i--) {
        if (data.remindDpIds.indexOf(remindIds[i]) > -1) {
          remindIds.splice(i, 1);
          num--
        }
      }
    } else {
      data.remindDpIds = []
    }
    if (num > 0) {
      let reducenum = localStorage.getItem("reduceNum") || "0";
      reducenum = Number(reducenum);
      let num2 = num + reducenum;
      chrome.browserAction.setBadgeText({
        text: num2.toString()
      })
      localStorage.setItem("reduceNum", num2.toString());
      sendChromeNotification(new Date().getTime().toString(), {
        type: "basic",
        title: "降价提醒",
        message: "您浏览的商品有" + num + "件降价哦",
        iconUrl: '../images/icon128.png'
      })
      let newArr = data.remindDpIds.concat(remindIds)
      chrome.storage.local.set({
        remindDpIds: newArr
      })
    }
  })

}

function calCouponPrice() {
  let remindIds = []
  let reduceNum = 0;
  for (let i = 0; i < historyArr.length; i++) {
    let url_crc = historyArr[i].url_crc;
    // 淘宝天猫优惠券
    if (couponObj[url_crc]) {
      historyArr[i].coupon = couponObj[url_crc].money;
      historyArr[i].url = couponObj[url_crc].url;
      // 天猫优惠券不参与价格计算
      // historyArr[i].price = historyArr[i].price - couponObj[url_crc].money;
    }
    // if (historyArr[i].price === 1299) {
    //   historyArr[i].price = 1088;
    // }
    historyArr[i].priceStr = historyArr[i].price.toFixed(2);
    if (historyArr[i].plus_price) {
      historyArr[i].plus_price_str = historyArr[i].plus_price.toFixed(2)
    }

    for (let k = 0; k < historyLists.length; k++) {
      if (historyArr[i].dp_id === historyLists[k].dp_id) {
        if (historyLists[k].lowest_pri && historyArr[i].price < historyLists[k].lowest_pri) {
          reduceNum++;
          historyLists[k].lowest_pri = historyArr[i].price;
          remindIds.push(historyArr[i].dp_id)
          historyLists[k].reductTime = new Date().getTime()

        }
        if (historyArr[i].site_id === "123") {
          historyArr[i].site_name = "淘宝";
        }
        if (historyArr[i].price < historyLists[k].price) {
          let reduceN = historyLists[k].price - historyArr[i].price;
          if (reduceN.toString().indexOf('.') > -1) {
            historyArr[i].reduced = reduceN.toFixed(2)
          } else {
            historyArr[i].reduced = reduceN
          }
          let time1 = Number(localStorage.getItem("clearTime"))
          if (historyLists[k].reductTime > time1) {
            historyArr[i].newreduce = "newreduce";
          } else {
            historyArr[i].newreduce = "";
          }
          historyArr[i].reductTime = historyLists[k].reductTime || 0;
        } else {
          historyArr[i].reduced = null;
        }

      }
      if (historyArr[i].dp_id === historyLists[k].dp_id) {
        historyArr[i].histime = historyLists[k].time;
      }
    }
    chrome.storage.local.set({
      'historyList': historyLists
    })
  }
  historyArr.sort(function(v1, v2) {
    return v1.time - v2.time
  });
  console.log('setting history data', historyArr)
  chrome.storage.local.set({
    historyData: historyArr
  })
  sendNotifacation(reduceNum, remindIds);
  historyArr = [];
  couponObj = {}
  couponStart = 0;
  couponEnd = 0;
  runsize = 0;
}



function getTbCoupon(id, total) {
  var url = "https://open.lesiclub.cn/coupon/get_ext/10005/10038/" + id;
  request(url, function(data) {
    try {
      data = JSON.parse(data)
      if (data && data.data && data.data.coupon.coupon_money) {
        couponObj[id] = {
          money: data.data.coupon.coupon_money,
          url: data.data.click_url
        }
      }
      couponEnd++
      if (couponEnd === couponStart && runsize === total) {
        calCouponPrice()
      }
    } catch (e) {
      couponEnd++
      if (couponEnd === couponStart && runsize === total) {
        calCouponPrice()
      }
    }
  })
}

// let ifr = document.createElement('iframe')
// ifr.src = 'https://pcsitepp-fm.jd.com/'
// document.body.appendChild(ifr)

// request('https://pcsitepp-fm.jd.com/', data => {
//   console.log(data)
// })
//
// function jdRequest(url, cb) {
//
// }
//
// jdRequest('https://api.m.jd.com/api?appid=siteppPc&functionId=siteppPC_priceskusPull&loginType=3&t=' + (new Date).getTime(), data => { console.log(data) })

/*添加卸载时候的请求*/
chrome.runtime.setUninstallURL(uninstallUrl);

chrome.storage.local.get('permanent', function(k) {
  if (!k.lang) {
    if (chrome.i18n.getUILanguage().indexOf('en') > -1) {
      chrome.storage.local.set({
        permanent: {
          lang: 'en'
        }
      })
    } else {

    }
  }
})

import './backgroundTask.js'
