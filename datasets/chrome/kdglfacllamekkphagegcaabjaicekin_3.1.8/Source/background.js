import { http } from './js/http.js'
import bkutils from './js/bkutils.js'
import {
  fetchServer,
  parseHttpResponse,
  packMsgRep,
  parseHttpResponse2,
} from './js/index.js'
import { updateRules, getParentUrl } from './js/bgTools.js'
import config from './common/config.js'
let localData = {}
let currentTabId = null

// onMessageExternal外部消息监听
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA  background" + message.type);
  new Promise(async (resolve, reject) => {
    switch (message.type) {
      case 'updateRules': {
        updateRules(message)
        break
      }

      case 'getParentUrl': {
        getParentUrl(message, resolve)
        break
      }

      case 'getVersion': {
        resolve(config)
      }
      case 'setQiuToken': {

        chrome.storage.sync.set({ qiuqiToken: message.data.qiuqiToken }, (r) => { })
        break
      }

      case 'getQiuToken': {
        chrome.storage.sync.get('qiuqiToken', (r) => {
          resolve(r)
        })
        break
      }

      case 'updateRFQ': {
        resetData()
        checkRfq()
        break
      }

      case "updateRFQNew": {
        resetData()
        checkRfqNew()
        break
      }

      case 'updateLocalData': {
        console.info(' updateLocalData 前 === ', localData)
        // 更新数据
        for (let i in message.data) {
          localData[i] = message.data[i]
        }
        console.info(' updateLocalData === ', localData)
        bkutils.updateLocalData(localData)
        checkWs()
        checkRfq()

        break
      }

      case "getLSouCookie": {
        chrome.cookies.getAll({ url: config.iframeBaseURL, name: 'qiuqiToken' }, (cook) => {
          if (cook.length && cook[0].value) {
            resolve({ isLoged: true, cook })
          } else {
            resolve({ isLoged: false })
          }
        })
        break
      }

      case 'bqRFQ': {
        //    检查是否已经登录
        chrome.cookies.getAll(
          {
            url: 'https://sourcing.alibaba.com/',
            name: 'xman_us_t',
          },
          function (cook) {
            if (cook && cook.length > 0) {
              sendResponse({
                isLoged: true,
              })
              bqRfqTask(message.data)
            } else {
              sendResponse({
                isLoged: false,
              })
            }
          }
        )
        break
      }

      case 'getRFQCookie': {
        await chrome.cookies.getAll(
          {
            url: 'https://sourcing.alibaba.com',
            name: 'xman_us_t',
          },
          function (cook) {
            //    格式
            //    [{"domain":".alibaba.com","hostOnly":false,"httpOnly":false,"name":"xman_us_t","path":"/","sameSite":"no_restriction","secure":true,"session":true,"storeId":"0","value":"ctoken=mv1q42o1yekn&l_source=alibaba&x_user=4D9i5f7KY48hVyAoRbnTkT7rxxyAyrvaaBs9AcA0QAU=&x_lid=cn1511743186&sign=y&need_popup=y"}]
            // console.info('异步  ---getRfqBuyer ', cook)
            if (cook.length && cook[0].value) {
              resolve({ isLoged: true, cook })
            } else {
              resolve({ isLoged: false })
            }
          }
        )
        break
      }

      case 'getAliCookie': {
        await chrome.cookies.getAll(
          {
            url: 'https://sourcing.alibaba.com',
          },
          function (cook) {
            //    格式
            //    [{"domain":".alibaba.com","hostOnly":false,"httpOnly":false,"name":"xman_us_t","path":"/","sameSite":"no_restriction","secure":true,"session":true,"storeId":"0","value":"ctoken=mv1q42o1yekn&l_source=alibaba&x_user=4D9i5f7KY48hVyAoRbnTkT7rxxyAyrvaaBs9AcA0QAU=&x_lid=cn1511743186&sign=y&need_popup=y"}]
            // console.info('异步  ---getRfqBuyer ', cook)
            if (cook.length && cook[0].value) {
              resolve({ isLoged: true, cook })
            } else {
              resolve({ isLoged: false })
            }
          }
        )
        break
      }
      case 'FetchExcel': {
        await http
          .request(message.data)
          .then((response) => {
            resolve(parseHttpResponse2(response))
          })
          .catch((error) => {
            reject(parseHttpResponse2(error))
          })
        break
      }

      case 'FetchRequest': {
        await http
          .request(message.data)
          .then((response) => {
            resolve(parseHttpResponse(response))
          })
          .catch((error) => {
            reject(parseHttpResponse(error))
          })
        break
      }

      // 开启RFQ定时任务
      case 'initRFQ': {
        try {
          await getMateTabs();
          if (currentTabId) {
            chrome.storage.sync.get(['qiuqiData'], (r) => {
              localData = r.qiuqiData || {}

              if (typeof localData === 'string') {
                // console.log('localData - start', localData)
                localData = JSON.parse(localData)
                console.log('localData - end', localData)
              }

              if (localData.vuex_token) {
                checkRfq()
                checkWs()
              }
            })
          }
        } catch (e) {
          console.log('RFQ异常====', e)
        }

        break
      }
      case "searchImage": {
        await http
          .request(message.data)
          .then(async (response) => {
            const body = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(body);
            reader.onloadend = () => {
              // console.log(reader.result);
              resolve({
                status: response.status,
                statusText: response.statusText,
                data: reader.result,
              });
            };
            reader.onerror = reject;
          })
          .catch((error) => {
            reject(parseHttpResponse(error))
          })
        break;
      }
      case "clearAliCookies":
        (async () => {
          const urls = [
            "https://alibaba.com",
            "https://www.alibaba.com",
            "https://sourcing.alibaba.com",
            "https://mysourcing.alibaba.com",
            "https://onetalk.alibaba.com"
          ];
          console.log("开始清空阿里巴巴所有 Cookie...");

          for (const url of urls) {
            try {
              const cookies = await chrome.cookies.getAll({ url });
              for (const cookie of cookies) {
                await chrome.cookies.remove({ url, name: cookie.name });
              }
            } catch (e) { }
          }
          console.log("阿里巴巴Cookie 已全部清空！");
          sendResponse({ state: true });
        })();
        return true;

      case "searchMadeInChina": {
        const { imageBase64, orgwidth, orgheight, zipsize, orgsize, imgType } = message.data;
        // 将base64转换为文件
        function dataURLtoFile(dataurl, filename) {
          let arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename + '.' + imgType, { type: 'application/octet-stream' });
        }

        let file = dataURLtoFile(imageBase64, 'img');
        // console.log(file);
        const formData = new FormData();
        formData.append('orgwidth', orgwidth)
        formData.append('orgheight', orgheight)
        formData.append('zipsize', zipsize)
        formData.append('orgsize', orgsize)
        formData.append('multipartFile', file);
        http.request({ method: 'post', url: 'https://file.made-in-china.com/img-search/upload', data: formData }).then(response => {
          // console.log(response);
          resolve(parseHttpResponse(response))
        }).catch((error) => {
          reject(parseHttpResponse(error))
        })

        break;
      }
      default: {
        console.log('消息类型非法：', message)
        reject(`消息 ${message} 类型非法。`)
        break
      }
    }
  })
    .then((response) => {
      sendResponse(packMsgRep(true, response, message))
      // console.log(`消息 ${JSON.stringify(message)} 处理完成。`)
    })
    .catch((e) => {
      e.then(eMes => {
        sendResponse(packMsgRep(false, eMes, message))
      })

      // console.error(`消息 ${JSON.stringify(message)} 处理失败：`, e);
    })
  return true
})

// --------------------- onMessage内部消息监听 start ---------------------
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("AAAAAAAbbbbbbbbbbbbbbbb  background" + message.type);
  new Promise(async (resolve, reject) => {
    switch (message.type) {
      // 获取扩展程序id
      case "getChromeId": {
        resolve(chrome.runtime.id)
        break
      }

      case 'getVersion': {
        resolve(config)
      }


      case 'setQiuToken': {
        // console.log(message.data);

        chrome.storage.sync.set({ qiuqiToken: message.data.qiuqiToken }, (r) => { })
        chrome.storage.sync.set({ qiuqiData: message.data.qiuqiData }, (r) => { })
        break
      }

      case 'getQiuToken': {
        chrome.storage.sync.get('qiuqiToken', (r) => {
          resolve(r)
        })
        break
      }

      case "removeQiuToken": {
        chrome.storage.sync.set({ qiuqiToken: '' }, (r) => { resolve(r) })
        break
      }

      case 'FetchRequest': {
        await http
          .request(message.data)
          .then((response) => {
            resolve(parseHttpResponse(response))
          })
          .catch((error) => {
            reject(parseHttpResponse(error))
          })
        break
      }


      case 'updateRules': {
        updateRules(message)
        break
      }


      case 'updateRFQ': {
        resetData()
        checkRfq()
        break
      }

      case "updateRFQNew": {
        resetData()
        checkRfqNew()
        break
      }

      case 'updateLocalData': {
        console.info(' updateLocalData 前 === ', localData)
        // 更新数据
        for (let i in message.data) {
          localData[i] = message.data[i]
        }
        console.info(' updateLocalData === ', localData)
        bkutils.updateLocalData(localData)
        checkWs()
        checkRfq()

        break
      }

      case "getLSouCookie": {
        chrome.cookies.getAll({ url: config.iframeBaseURL, name: 'qiuqiToken' }, (cook) => {
          if (cook.length && cook[0].value) {
            resolve({ isLoged: true, cook })
          } else {
            resolve({ isLoged: false })
          }
        })
        break
      }

      case 'bqRFQ': {
        //    检查是否已经登录
        chrome.cookies.getAll(
          {
            url: 'https://sourcing.alibaba.com/',
            name: 'xman_us_t',
          },
          function (cook) {
            if (cook && cook.length > 0) {
              sendResponse({
                isLoged: true,
              })
              bqRfqTask(message.data)
            } else {
              sendResponse({
                isLoged: false,
              })
            }
          }
        )
        break
      }

      case 'getRFQCookie': {
        await chrome.cookies.getAll(
          {
            url: 'https://sourcing.alibaba.com',
            name: 'xman_us_t',
          },
          function (cook) {
            //    格式
            //    [{"domain":".alibaba.com","hostOnly":false,"httpOnly":false,"name":"xman_us_t","path":"/","sameSite":"no_restriction","secure":true,"session":true,"storeId":"0","value":"ctoken=mv1q42o1yekn&l_source=alibaba&x_user=4D9i5f7KY48hVyAoRbnTkT7rxxyAyrvaaBs9AcA0QAU=&x_lid=cn1511743186&sign=y&need_popup=y"}]
            // console.info('异步  ---getRfqBuyer ', cook)
            if (cook.length && cook[0].value) {
              resolve({ isLoged: true, cook })
            } else {
              resolve({ isLoged: false })
            }
          }
        )
        break
      }

      case 'getAliCookie': {
        await chrome.cookies.getAll(
          {
            url: 'https://sourcing.alibaba.com',
          },
          function (cook) {
            //    格式
            //    [{"domain":".alibaba.com","hostOnly":false,"httpOnly":false,"name":"xman_us_t","path":"/","sameSite":"no_restriction","secure":true,"session":true,"storeId":"0","value":"ctoken=mv1q42o1yekn&l_source=alibaba&x_user=4D9i5f7KY48hVyAoRbnTkT7rxxyAyrvaaBs9AcA0QAU=&x_lid=cn1511743186&sign=y&need_popup=y"}]
            // console.info('异步  ---getRfqBuyer ', cook)
            if (cook.length && cook[0].value) {
              resolve({ isLoged: true, cook })
            } else {
              resolve({ isLoged: false })
            }
          }
        )
        break
      }
      case 'FetchExcel': {
        await http
          .request(message.data)
          .then((response) => {
            resolve(parseHttpResponse2(response))
          })
          .catch((error) => {
            reject(parseHttpResponse2(error))
          })
        break
      }


      // 开启RFQ定时任务
      case 'initRFQ': {
        try {
          await getMateTabs();
          if (currentTabId) {
            chrome.storage.sync.get(['qiuqiData'], (r) => {
              localData = r.qiuqiData || {}

              if (typeof localData === 'string') {
                // console.log('localData - start', localData)
                localData = JSON.parse(localData)
                console.log('localData - end', localData)
              }

              if (localData.vuex_token) {
                checkRfq()
                checkWs()
              }
            })
          }
        } catch (e) {
          console.log('RFQ异常====', e)
        }

        break
      }
      case "searchImage": {

        console.log('111111111111111111111searchImage')
        await http
          .request(message.data)
          .then(async (response) => {
            const body = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(body);
            reader.onloadend = () => {
              console.log('418454545', reader.result);
              resolve({
                status: response.status,
                statusText: response.statusText,
                data: reader.result,
              });
            };
            reader.onerror = reject;
          })
          .catch((error) => {
            reject(parseHttpResponse(error))
          })
        break;
      }

      case "clearAliCookies":
        (async () => {
          const urls = [
            "https://alibaba.com",
            "https://www.alibaba.com",
            "https://sourcing.alibaba.com",
            "https://mysourcing.alibaba.com",
            "https://onetalk.alibaba.com"
          ];
          console.log("开始清空阿里巴巴所有 Cookie...");

          for (const url of urls) {
            try {
              const cookies = await chrome.cookies.getAll({ url });
              for (const cookie of cookies) {
                await chrome.cookies.remove({ url, name: cookie.name });
              }
            } catch (e) { }
          }
          console.log("阿里巴巴Cookie 已全部清空！");
          sendResponse({ state: true });
        })();
        return true;
        
      case "searchMadeInChina": {
        const { imageBase64, orgwidth, orgheight, zipsize, orgsize, imgType } = message.data;
        // 将base64转换为文件
        function dataURLtoFile(dataurl, filename) {
          let arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename + '.' + imgType, { type: 'application/octet-stream' });
        }

        let file = dataURLtoFile(imageBase64, 'img');
        // console.log(file);
        const formData = new FormData();
        formData.append('orgwidth', orgwidth)
        formData.append('orgheight', orgheight)
        formData.append('zipsize', zipsize)
        formData.append('orgsize', orgsize)
        formData.append('multipartFile', file);
        http.request({ method: 'post', url: 'https://file.made-in-china.com/img-search/upload', data: formData }).then(response => {
          // console.log(response);
          resolve(parseHttpResponse(response))
        }).catch((error) => {
          reject(parseHttpResponse(error))
        })

        break;
      }

      case 'getParentUrl': {
        getParentUrl(message, resolve);
        break
      }


    }
  })
    .then((response) => {
      sendResponse(packMsgRep(true, response, message))
      // console.log(`消息 ${JSON.stringify(message)} 处理完成。`)
    })
    .catch((e) => {
      sendResponse(packMsgRep(false, e, message))
      // console.error(`消息 ${JSON.stringify(message)} 处理失败：`, e);
    })
  return true
})
// --------------------- onMessage内部消息监听 end ---------------------

// ------------------------ws和notify start ---------------------------------
var wsIns = null

function initWs(token) {
  console.log('checkWs')
  if (wsIns) {
    wsIns.close()
    wsIns = null
  }

  if (!wsIns) {
    try {
      wsIns = new WebSocket(config.wsBaseUrl + '/ws/connect?token=' + token)
      wsIns.onopen = (e) => {
        console.log('ws open', e)
      }
      wsIns.onmessage = (e) => {
        console.log('wx接收=>', e)
        let data = JSON.parse(e.data)
        if (data.type === 'notify') {
          let notifyOptions = {
            type: 'basic',
            title: data.data.title || '来搜提醒您',
            iconUrl: 'icons/128.png',
            message: data.data.message || '您有新的通知消息',
            isClickable: true,
          }
          chrome.notifications.create('lsou-rfqItem-' + new Date().getTime(), notifyOptions)
        }
      }
      wsIns.onclose = (e) => {
        console.info('ws关闭 ', e)
        wsIns = null
        // if (!wsIns && localData.vuex_token) {
        //   initWs(localData.vuex_token)
        // }
      }
    } catch (error) {
      console.log('initWs异常=>', error)
    }
  }
}

function clearWs() {
  if (wsIns) {
    wsIns.close()
  }
  wsIns = null
}

function checkWs() {
  if (!wsIns && localData.vuex_token) {
    initWs(localData.vuex_token)
  }

  if (!localData.vuex_token) {
    clearWs()
  }
}

// ------------------------ws和notify end ---------------------------------

// ---------------------rfq 定时任务 start----------------

let rfqListIns = null
let rfqDataIns = null
let rfqBQ = null;
let rfqTaskData = []
let timestamp = new Date().getTime()
let rfqDataList = []

// 设置定时任务
async function setRfq(data) {
  // console.info('setrfq  ', data)

  if (!data || !data.state) {
    console.info('未开启rfq订阅')
    return
  }
  if (!data.tips || !data.tips.length) {
    console.info('未设置 tips')
    return
  }
  // 已开启rfq订阅
  chrome.cookies.getAll(
    {
      url: 'https://sourcing.alibaba.com/',
      name: 'xman_us_t',
    },
    function (cook) {
      //  格式
      //  [{"domain":".alibaba.com","hostOnly":false,"httpOnly":false,"name":"xman_us_t","path":"/","sameSite":"no_restriction","secure":true,"session":true,"storeId":"0","value":"ctoken=mv1q42o1yekn&l_source=alibaba&x_user=4D9i5f7KY48hVyAoRbnTkT7rxxyAyrvaaBs9AcA0QAU=&x_lid=cn1511743186&sign=y&need_popup=y"}]
      if (!cook.length || !cook[0].value) {
        chrome.notifications.create('lsou-rfqLogin-' + timestamp, {
          type: 'basic',
          title: '来搜-RFQ登录提醒',
          iconUrl: 'icons/128.png',
          message: '您尚未登录alibaba，为完整体验RFQ订阅功能，请及时登录',
          isClickable: true,
        })
      }
    }
  )
  // console.info('重新设置 === ', data)
  localData.rfqSet = data || {}
  // 获取对应的关键词最大id
  await getMaxIds()
  if (!rfqListIns) {
    parseTask()
    // console.log(data.step * 60 * 1000,data.step);
    rfqListIns = setInterval(parseTask, data.step * 60 * 1000)
  }
}


async function setRfqNew(data) {
  if (!data || !data.state) {
    console.info('未开启rfq订阅')
    return
  }
  if (!data.tips || !data.tips.length) {
    console.info('未设置 tips')
    return
  }
  // 已开启rfq订阅
  chrome.cookies.getAll(
    {
      url: 'https://sourcing.alibaba.com/',
      name: 'xman_us_t',
    },
    function (cook) {
      if (!cook.length || !cook[0].value) {
        chrome.notifications.create('lsou-rfqLogin-' + timestamp, {
          type: 'basic',
          title: '来搜-RFQ登录提醒',
          iconUrl: 'icons/128.png',
          message: '您尚未登录alibaba，为完整体验RFQ订阅功能，请及时登录',
          isClickable: true,
        })
      }
    }
  )
  localData.rfqSet = data || {}
  await getMaxIds()
}

function clearRfqData() {
  console.log('clearRfqData', rfqDataIns)
  if (rfqDataIns) {
    clearInterval(rfqDataIns)
  }
  rfqDataIns = null
  rfqBQ = null
}

async function getMaxIds() {
  let result = await fetchServer(config.baseURL + '/subscribe/getmaxrfqid', localData)
  console.info(' get mas id s === ', result)
  localData.maxids = result.data.data || {}
  bkutils.updateLocalData(localData)
  // console.info('localData.rfqSet.maxids ',localData)
}

// 监听
function checkRfq() {
  if (localData.vuex_token) {
    bkutils.getUserRfqSet(localData, setRfq)
  }
}
function checkRfqNew() {
  if (localData.vuex_token) {
    bkutils.getUserRfqSet(localData, setRfqNew)
  }
}

function bqRfqTask(dataList) {
  //    仅用作前端提交保存rfq
  dataList.forEach((item) => {
    rfqTaskData.push({
      item: item.base,
      type: 'rfqDesc',
      key: item.key,
    })
  })

  if (!rfqDataIns) {
    rfqBQ = true;
    rfqDataIns = setInterval(parseRfqDataTask, 4000)
  }
}
function parseTask() {
  console.info('localdata  tips', localData.rfqSet.tips)

  // TODO 测试
  // localData.rfqSet.tips = ['Shoulders']

  if (!localData.rfqSet.tips || !localData.rfqSet.tips.length) return
  localData.rfqSet.tips.forEach((item) =>
    rfqTaskData.push({
      type: 'rfqList',
      keyword: JSON.parse(JSON.stringify(item)),
    })
  )
  if (!rfqDataIns) {
    parseRfqDataTask()
    rfqDataIns = setInterval(parseRfqDataTask, 4000)
  }
}

async function parseRfqDataTask() {
  if (!rfqTaskData || !rfqTaskData.length) {
    if (rfqDataList.length) {
      // 上传
      let maxIds = {}
      rfqDataList.forEach((item) => {
        console.info('item ==== ', item)
        let key = item.key
        maxIds[key] = maxIds[key] || 0
        if (maxIds[key] < item.base.id) {
          maxIds[key] = item.base.id
        }
        // ---------------- 筛选字段 start ---------------
        item.title = item.base.subject
        item.content = item.base.description

        item.category = null

        item.countrySimple = item.base.countrySimple
        item.country = item.base.country

        item.rfqLeve = null
        for (let i = 0; i < item.base.tags.length; i++) {
          if (item.base.tags[i].tagName === 'RFQ_MKT_ST_28101') {
            // 铜
            item.rfqLeve = 2
          } else if (item.base.tags[i].tagName === 'RFQ_MKT_ST_28102') {
            // 银
            item.rfqLeve = 1
          } else if (item.base.tags[i].tagName === 'RFQ_MKT_ST_28104') {
            // 金
            item.rfqLeve = 0
          }
        }

        item.quantity = item.base.quantity
        // TODO 字段不清楚
        item.yusuan = null

        item.visitLastTime = null
        item.rfqLeftCount = item.base.rfqLeftCount

        // 近90登录天数
        item.dlts = null

        item.sscs = null
        // 浏览产品
        item.llcp = null
        item.yxxp = null
        item.rfqBj = null
        item.ckbj = null
        // --------------------筛选字段 end -----------------

        if (item.desc && item.desc.rfqId) {
          item.category = item.desc.breadcrumb.last
          item.categorylist = []
          if (
            item.desc.breadcrumb &&
            item.desc.breadcrumb.list &&
            item.desc.breadcrumb.list.length
          ) {
            for (let i = 0; i < item.desc.breadcrumb.list.length; i++) {
              item.categorylist.push(item.desc.breadcrumb.list[i].label)
            }
          }
          item.categorylist.push(item.desc.breadcrumb.last.label)
          item.categorylist = item.categorylist.join(',')

          item.content = item.desc.content
          //
        }

        item.rfqBj =
          item.desc.records && item.desc.records.quotes && item.desc.records.quotes.length
        if (item.buyerNew) {
          item.visitLastTime = item.buyerNew.buyerActs && item.buyerNew.siteLastLoginTime
          item.dlts =
            item.buyerNew.privacyController && item.buyerNew.privacyController.loginDays90dNum
          item.sscs =
            item.buyerNew.privacyController && item.buyerNew.privacyController.search90dNum
          item.llcp =
            item.buyerNew.privacyController &&
            item.buyerNew.privacyController.browseProductTimes90dNum
          item.yxxp = item.buyerNew.privacyController && item.buyerNew.privacyController.mc90dNum
          item.ckbj = item.buyerNew.buyerActs && item.buyerNew.buyerActs.rfq90dViewQuotationCnt
        }

        //    检查其他字段
      })
      // 保存到服务器
      let result = await fetchServer(config.baseURL + '/subscribe/addrfq', localData, {
        method: 'post',
        data: { data: rfqDataList },
      })
      let maxData = []
      for (const maxIdsKey in maxIds) {
        maxData.push({
          tip: maxIdsKey,
          maxid: maxIds[maxIdsKey],
        })
      }
      fetchServer(config.baseURL + '/subscribe/setmaxrfqid', localData, {
        method: 'post',
        data: { data: maxData },
      })
      getMaxIds()
      rfqDataList = []
    }

    clearRfqData()
    return
  }

  let taskData = rfqTaskData.shift()
  console.log('rfqTaskData', rfqTaskData)
  console.log('taskData', taskData)
  if (taskData.type === 'rfqList') {
    //    请求rfq列表
    let keyword = encodeURIComponent(taskData.keyword)
    //获取设置参数
    //    请求列表
    getRfqList(keyword)
  } else if (taskData.type === 'rfqDesc') {
    // console.info('taskData ')
    // 如果存在登录信息则请求rfq详情
    chrome.cookies.getAll(
      {
        url: 'https://sourcing.alibaba.com/',
        name: 'xman_us_t',
      },
      function (cook) {
        // console.info('cook 信息', cook)
        let tmp = {
          base: taskData.item,
          desc: {},
          key: taskData.key,
          buyer: {},
          buyerNew: {},
        }
        if (cook.length) {
          getRfqDesc(tmp)
        } else {
          rfqDataList.push(tmp)
        }
      }
    )
    //    请求rfq详情
  } else if (taskData.type === 'buyer') {
    //
    getRfqBuyer(taskData.item)
  }
}

function delay(timer = 300) {
  return new Promise((resolve) => setTimeout(resolve, timer))
}

async function getRfqList(keyword) {
  console.info('getRfqList === ', localData.maxids, keyword)
  // let url = `https://sourcing.alibaba.com/rfq_search_list.htm?openTime=12h&page=${page}&recently=Y&tracelog=newest`
  let url = `https://sourcing.alibaba.com/rfq_search_list.htm?searchText=${keyword}&openTime=12h&recently=Y&tracelog=newest`
  let rfqHtmlData = await fetchServer(url, localData)
  rfqHtmlData = rfqHtmlData.data.replace(/[\n\t\r]/g, '')
  let glob = /window\.PAGE_DATA\[\"index\"\]\.data\.push\(.*?\);/g
  let glogData = rfqHtmlData.match(glob)
  // console.log('glogData=>',glogData);
  await getMateTabs()
  glogData.forEach((item) => {
    try {
      let d = item.replace('window.PAGE_DATA["index"].data', 'window.tempData')
      d = d.substr(0, d.length - 1)
      chrome.tabs.sendMessage(currentTabId, { type: 'rfqList', data: d }, (res) => {
        try {
          // console.log('res', res)
          let gpData = res
          //  检查rfqid
          localData.maxids[keyword] = localData.maxids[keyword] || 0
          // console.info(localData.maxids[keyword] < gpData.id)
          if (localData.maxids[keyword] < gpData.id && gpData.id) {
            // console.log('rfqList', res)
            // 判断是否满足条件
            if (checkRfqValidate(gpData, 'base')) {
              // 报价链接
              rfqTaskData.push({
                type: 'rfqDesc',
                item: gpData,
                key: keyword,
              })
              console.info('base 满足');
            } else {
              console.info('base 不满足')
            }
          }
        } catch (error) {
          console.log('chrome-rfqList异常=>', error);
        }
      })
    } catch (e) {
      console.info('getRfqList===异常=== ', e)
    }
  })
}

async function getRfqDesc(item) {
  let url = item.base.url
  if (url.indexOf('//') === 0) {
    url = 'https:' + url
  }
  await getMateTabs()

  fetchServer(url, localData).then((result) => {
    try {
      // console.log('fetchServer=>', url, result);
      let rfqDescReg = /window.PAGE_DATA = ({ userType.*)?; \}\)\(\); </
      let descHtml = result.data.replace(/[\n\r\t]/g, '').replace(/\s{2,}/g, ' ')
      descHtml.replace('window.PAGE_DATA = {}', '')
      let descStr = descHtml.match(rfqDescReg)[1]
      descStr = descStr.replace(/[\n\r\t]/g, ' ').replace('getAttr()', '[]')
      chrome.tabs.sendMessage(
        currentTabId,
        { type: 'rfqDesc', data: descStr.replace(/categoryName:[^,}]+(,|\s*})/g, '') },
        (res) => {
          // console.log('goodsDesc', res)
          if (checkRfqValidate(res, 'desc')) {
            item.desc = res
            rfqTaskData.push({
              type: 'buyer',
              item: item,
            })
            rfqDataList.push(item)
          }
        }
      )
    } catch (e) {
      console.error('rfqError====>', e)
    }
  })
}

async function getRfqBuyer(item) {
  let buyerUrl = item.desc.buyerUrl
  if (!buyerUrl) {
    return
  }
  if (buyerUrl.indexOf('//') === 0) {
    buyerUrl = 'https:' + buyerUrl
  }

  chrome.cookies.getAll(
    {
      url: 'https://sourcing.alibaba.com/',
      name: 'xman_us_t',
    },
    async function (cook) {
      //    格式
      //    [{"domain":".alibaba.com","hostOnly":false,"httpOnly":false,"name":"xman_us_t","path":"/","sameSite":"no_restriction","secure":true,"session":true,"storeId":"0","value":"ctoken=mv1q42o1yekn&l_source=alibaba&x_user=4D9i5f7KY48hVyAoRbnTkT7rxxyAyrvaaBs9AcA0QAU=&x_lid=cn1511743186&sign=y&need_popup=y"}]
      console.info('异步  ---getRfqBuyer ', cook[0])
      if (cook.length && cook[0].value) {
        // item.buyerNew = await getRfqDesc2(buyerUrl,cook[0])
        let ctoken = cook[0].value.match(/(?:^|&)\s*ctoken\s*=\s*([^&]+)/)[1]
        console.info('getRfqBuyer 1 ====')
        item.buyerNew = await getRfqBuyerInfo(buyerUrl, ctoken)
        console.info('getRfqBuyer ===', item)
      }
    }
  )
}

async function getRfqBuyerInfo(buyerUrl, ctoken) {
  console.info('getRfqBuyerInfo  ', buyerUrl, ctoken)
  let params = decodeURIComponent(buyerUrl.split('?')[1].replace(/&amp;/g, '&'))
  // let ctoken = cook.value.match(/(?:^|&)\s*ctoken\s*=\s*([^&]+)/)[1]
  let buyerUlrNew =
    'https://mysourcing.alibaba.com/buyerprofile/buyer_profile_detail_ajax.do?' +
    params +
    '&ctoken=' +
    ctoken
  console.info('buyerUlrNew == ', buyerUlrNew)
  let buyerInfoNew = {}
  try {
    let result = await fetchServer(buyerUlrNew, localData)
    if (result.data) {
      buyerInfoNew = result.data.data
    }
  } catch (e) {
    console.error('buyer error ', e)
  }
  console.info('buyerInfoNew ==== ', buyerInfoNew)
  return buyerInfoNew
}

// ---------------------rfq 定时任务 end----------------

/**
 * 判断 地区 是否存在
 */
function checkRfqArea(countrySimple, data = null) {
  if (!data) {
    data = localData.rfqSet.area
  }
  for (let i = 0; i < data.length; i++) {
    let tmp = data[i]
    if (tmp.countryList && tmp.countryList.length) {
      return checkRfqArea(countrySimple, tmp.countryList)
    }
    if (tmp.code === countrySimple) {
      return true
    }
  }
  return false
}

/**
 * 判断 关键词 是否存在
 */
function checkRfqWord(words, str) {
  for (let i = 0; i < words.length; i++) {
    let word = words[i]
    if (str && str.indexOf(word) > -1) {
      return true
    }
  }
  return false
}

function checkRfqValidate(data, type) {
  // console.info('checkRfqValidate === ', data)
  if (rfqBQ) {
    return true;
  }
  // 筛选   关键词在desc中检查，
  if (type === 'base') {
    // 检查采购数量
    let quantity = data.quantity ? Number(data.quantity) : 0
    if (localData.rfqSet.buymin && localData.rfqSet.buymin < quantity) {
      console.info('rfq 采购量最小不满足 ', quantity)
      return false
    }
    if (localData.rfqSet.buymax && localData.rfqSet.buymax > quantity) {
      console.info('rfq 采购量最大不满足 ', quantity)
      return false
    }
    // 检查剩余报价席位
    if (localData.rfqSet.surplus && localData.rfqSet.surplus > data.rfqLeftCount) {
      console.info('报价席位不满足', localData.rfqSet.surplus, data.rfqLeftCount)
      return false
    }
    // 检查地区
    if (
      localData.rfqSet.area &&
      localData.rfqSet.area.length &&
      !checkRfqArea(data.countrySimple)
    ) {
      console.info(
        '地区不满足 ',
        localData.rfqSet.area,
        data.countrySimple,
        checkRfqArea(data.countrySimple)
      )
      return false
    }

    // 检查标签 和商机等级
    for (let i = 0; i < data.tags.length; i++) {
      let tag = data.tags[i]
      if (tag.type === 'rfq_level') {
        if (localData.rfqSet.bo && localData.rfqSet.bo.length) {
          //    存在 等级限制
          // 商机等级完全匹配
          if (tag.tagName === 'RFQ_MKT_ST_28101' && localData.rfqSet.bo.indexOf(2) === -1) {
            console.info('rfq等级不满足RFQ_MKT_ST_28101')
            return false
          }
          if (tag.tagName === 'RFQ_MKT_ST_28102' && localData.rfqSet.bo.indexOf(1) === -1) {
            console.info('rfq等级不满足 RFQ_MKT_ST_28102')
            return false
          }
          if (tag.tagName === 'RFQ_MKT_ST_28104' && localData.rfqSet.bo.indexOf(0) === -1) {
            console.info('rfq等级不满足 RFQ_MKT_ST_28104')
            return false
          }
        }
      }
      if (tag.type === 'buyer' && localData.rfqSet.tag && localData.rfqSet.tag.length) {
        // 前端设定的 0 rfq有成交 complete_order_via_rfq ，
        // 1历史订单较高 experienced_buyer
        // 2 邮件认证 emailConfirm
        // 3 rfq高效回复 typically_replies
        // 4 买家互动能力强 interactive_user
        // 5 历史联系买家
        // 6 有交易记录
        //{'', '', '', '', ''}
        if (tag.tagName === 'interactive_user' && localData.rfqSet.tag.indexOf(4) === -1) {
          console.info('rfq 买家标签不满足 买家互动能力强')
          return false
        }
        if (tag.tagName === 'emailConfirm' && localData.rfqSet.tag.indexOf(2) === -1) {
          console.info('rfq 买家标签不满足 邮件认证')
          return false
        }

        if (tag.tagName === 'typically_replies' && localData.rfqSet.tag.indexOf(3) === -1) {
          console.info('rfq 买家标签不满足 rfq高效回复')
          return false
        }
        if (tag.tagName === 'experienced_buyer' && localData.rfqSet.tag.indexOf(1) === -1) {
          console.info('rfq 买家标签不满足 1历史订单较高')
          return false
        }
        if (tag.tagName === 'complete_order_via_rfq' && localData.rfqSet.tag.indexOf(0) === -1) {
          console.info('rfq 买家标签不满足 rfq有成交')
          return false
        }
      }
      //    检查 地区，采购量 ，报价席位
    }
  } else if (type === 'desc') {
    //    判断关键词
    //    屏蔽词
    if (localData.rfqSet.blocks && localData.rfqSet.blocks.length) {
      if (!data) {
        console.info('no data')
        return
      }
      //    判断详情内的词开销比较大
      if (checkRfqWord(localData.rfqSet.blocks, data.subject)) {
        console.info('标题存在屏蔽词 忽略')
        return false
      }
      if (checkRfqWord(localData.rfqSet.blocks, data.content)) {
        console.info('内容存在屏蔽词 忽略')
        return false
      }
    }
    //    关键词
    if (localData.rfqSet.tag && localData.rfqSet.tag.length) {
      if (!data) {
        console.info('no data')
        return
      }
      if (!checkRfqWord(localData.rfqSet.tag, data.subject)) {
        console.info('标题不存在关键词 忽略')
        return false
      }
      if (!checkRfqWord(localData.rfqSet.tag, data.content)) {
        console.info('内容不存在关键词 忽略')
        return false
      }
    }

    //    判断类目
    if (localData.rfqSet.types && localData.rfqSet.types.length) {
      let flag = false
      // console.log('breadcrumbList=>', data.breadcrumb.list);
      for (let i = 0; i < localData.rfqSet.types.length; i++) {
        //
        let serIds = localData.rfqSet.types[i].ids
        let dataIds = []
        let leimu = []
        for (let j = 0; j < data.breadcrumb.list.length; j++) {
          dataIds.push(data.breadcrumb.list[j].label)
          leimu.push(data.breadcrumb.list[j].val)
        }
        dataIds.push(data.breadcrumb.last.label)
        dataIds = dataIds.join(',')
        if (dataIds.indexOf(serIds) >= 0) {
          //    找到
          flag = true
          break
        }
      }
      if (!flag) {
        console.info('类目不匹配,忽略')
        return false
      }
    }
  }
  return true
}
// bg---->content

async function getMateTabs() {
  try {
    const tabs = await chrome.tabs.query({})

    const currentTabObj = tabs.find(v => v.url.indexOf('http') !== -1 && v.active);
    if ((currentTabObj && currentTabObj.id) || !currentTabId) {
      currentTabId = currentTabObj.id
    }
  } catch (error) {
    console.log('getMateTabs-Error=>', error);

  }
}

function resetData() {
  clearInterval(rfqListIns)
  clearInterval(rfqDataIns)
  rfqDataIns = null
  rfqListIns = null
  currentTabId = null
  rfqDataList = []
  rfqTaskData = []
}


// 监听本地存储变化
chrome.storage.onChanged.addListener(function (changes, namespace) {
  // console.log('key=>', changes, namespace)
  for (const key in changes) {
    console.log('key=>', key)
    // if (Object.hasOwnProperty.call(changes, key)) {
    //   if (key === 'network') {
    //     let storageChange = changes[key]
    //     let network = storageChange.newValue
    //     config.baseURL = network.baseURL
    //     config.personBaseHost = network.personBaseHost
    //     config.iframeBaseURL = network.iframeBaseURL
    //     config.wsBaseUrl = network.wsBaseUrl
    //     // console.log('storageChange=>', storageChange, config)
    //   }
    // }
  }
})


// 脚本文件通过标签页与background.js通信
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(async function (msg) {

  });
});
