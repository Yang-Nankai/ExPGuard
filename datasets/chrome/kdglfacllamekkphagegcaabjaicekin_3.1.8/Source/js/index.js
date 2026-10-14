import { http } from './http.js'
import config from '../common/config.js'
// 防抖
export function debounce(fn, limit = 10) {
  let debItem = null
  return function () {
    let arg = arguments[0] //获取事件
    if (debItem) {
      clearTimeout(debItem)
    }
    debItem = setTimeout(function () {
      fn(arg) //事件传入函数
    }, limit)
  }
}


// 检查当前地址是否匹配任一地址
export function createMatchesFunction(matches) {
  const patterns = matches.map(pattern => {
    pattern = pattern.replace('*://', '(http|https)://');
    pattern = pattern.replace(/\./g, '\\.').replace('*\\.', '([^.]+\\.)?');
    pattern = pattern.replace(/\*/g, '.*');
    return new RegExp(`^${pattern}$`);
  });

  return function (url) {
    return patterns.some(pattern => pattern.test(url));
  };
}

// 传递消息至沙盒
export function postMessage(params, id = 'qiuqi-iframe') {
  // console.log(id);
  let frame = document.getElementById(id)
  frame.contentWindow.postMessage(params, '*')
}

// 获取URL参数
export function getQueryParams(url, query) {
  // str为？之后的参数部分字符串
  const str = url.substr(url.indexOf('?') + 1)
  // arr每个元素都是完整的参数键值
  const arr = str.split('&')
  // result为存储参数键值的集合
  const result = {}
  for (let i = 0; i < arr.length; i++) {
    // item的两个元素分别为参数名和参数值
    const item = arr[i].split('=')
    result[item[0]] = item[1]
  }
  if (query) {
    return result[query]
  } else {
    return result
  }
}

export function showToast(text, delay) {
  if (!delay) {
    delay = 2000
  }

  // 先查看是否存在
  let toastEl = window.document.getElementById('qiToast')
  if (!toastEl) {
    //     不存在创建
    let toastHtml = [
      '<div id="qiToast" style="' +
      'z-index: 999999;' +
      'color: white;' +
      'padding: 10px 20px;' +
      'background: rgba(0,0,0,0.5);' +
      'position: fixed;' +
      'top: 300px;' +
      'line-height: 16px;' +
      'left: 50%;' +
      'border-radius: 15px;' +
      'font-size: 14px;' +
      '">',
      text,
      '</div>',
    ]
    toastHtml = toastHtml.join('')
    // 阿里部分页面限制使用insertAdjacentHTML
    window.document.body.insertAdjacentHTML('beforeend', toastHtml)
    // window.document.body.insertAdjacentHTML("afterend", toastHtml);
  } else {
    //    修改
    toastEl.innerText = text
    toastEl.removeAttribute('hidden')
  }
  setTimeout(() => {
    let toast = document.getElementById('qiToast')
    toast.hidden = 'hidden'
  }, delay)
}

export function getQueryVariable(variable) {
  let query = window.location.search.substring(1)
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}

export function packMsgRep(state, data, message) {
  return {
    state,
    uuid: message.uuid,
    data,
    timestamp: Date.now(),
  }
}

export function packMsgReq(type, data) {
  console.log('type',type)
  console.log('data',data)
  console.log("AAAAAAAAAAAAAAAAAA      pack");
  return {
    uuid: (function () {
      return 'generate-uuid-4you-seem-professional'.replace(/[genratuidyosmpfl]/g, function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      })
    })(),
    type: type,
    data: data,
    timestamp: Date.now(),
  }
}

export async function parseHttpResponse(response) {
  if (response == null) {
    return {
      status: -2,
      statusText: null,
      body: null,
    }
  } else if (response instanceof Error) {
    return {
      status: -1,
      statusText: `${response.name}: ${response.message}`,
      body: response.stack,
    }
  } else {
    return {
      status: response.status,
      statusText: response.statusText,
      body: await response.text(),
    }
  }
}

export async function parseHttpResponse3(response) {
  if (response == null) {
    return {
      status: -2,
      statusText: null,
      data: null,
    }
  } else if (response instanceof Error) {
    return {
      status: -1,
      statusText: `${response.name}: ${response.message}`,
      data: response.stack,
    }
  } else {
    return {
      status: response.status,
      statusText: response.statusText,
      data: await response.text(),
    }
  }
}

export async function serverRequest(options) {
  return new Promise((resolve, reject) => {
    http
      .request(options)
      .then((response) => {
        resolve(parseHttpResponse3(response))
      })
      .catch((error) => {
        reject(parseHttpResponse3(error))
      })
  })
}




export async function fetchServer(url, localData, options = { method: 'get' }) {
  // console.info('fetchServer  ', localData.vuex_token)
  if (options.method === 'post') {
    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localData.vuex_token,
    }
  }
  let result = await serverRequest({
    method: options.method,
    url,
    data: options.data || {},
    param: options.param || {},
    headers: options.headers
      ? options.headers
      : {
        Authorization: localData.vuex_token,
      },
  })
  let data = result.data
  result.data = isJSON(data) ? JSON.parse(data) : data
  return result
}

export function isJSON(str) {
  if (typeof str == 'string') {
    try {
      let obj = JSON.parse(str)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      // console.log('error：'+str+'!!!'+e);
      return false
    }
  }
}

export function bufToFile(buf, filename) {
  return new File([buf], filename)
}

export async function parseHttpResponse2(response) {
  const fileAsBase64 = () => {
    return new Promise(async function (resolve, reject) {
      const file = bufToFile(await response.arrayBuffer(), 'excel.xls') // your file object
      console.log(file)
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        resolve(reader.result)
      }
    })
  }

  if (response == null) {
    return {
      status: -2,
      statusText: null,
      body: null,
    }
  } else if (response instanceof Error) {
    return {
      status: -1,
      statusText: `${response.name}: ${response.message}`,
      body: response.stack,
    }
  } else {
    return {
      status: response.status,
      statusText: response.statusText,
      body: await fileAsBase64(),
    }
  }
}

export async function httpRequest(options) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(window.qiuqiChromeId, packMsgReq('FetchRequest', options), (response) => {
      if (response.state) {
        resolve(response.data)
      } else {
        reject(response.data)
      }
    })
  })
}

/**
 * Base64字符串转二进制流
 * @param {String} dataurl Base64字符串(字符串包含Data URI scheme，例如：data:image/png;base64, )
*/
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}

export function complteUrl(url) {
  if (url.indexOf('//') === 0) {
    return 'https:' + url
  }
  return url
}



export async function initIframe(iframeId = 'qiuqi-iframe', data = {}) {
  // const aliDetailReg = /^https:\/\/www\.alibaba\.com\/product-detail/
  // 业务逻辑
  const params = {
    injectId: window.qiuqiChromeId,
    qiuqiToken: window.qiuToken,
    aliCookie: document.cookie,
    parentUrl: window.location.href,
    parentOriginUrl: window.location.origin,
    versionCode: config.versionCode,
    versionNum: config.versionNum,
    parentDetailData: window.detailData || {},
    ...data
  }
  // if (window.location.href.match(aliDetailReg)) {
  //   params.getCatList = getCatList()
  //   params.parseKw = parseKw()
  // }

  // if (iframeId.indexOf('qiuqi-productSearchDetails') !== -1) {
  //   params.prodUrl = data.prodUrl
  //   params.idx = data.idx
  // }
  postMessage({ cmd: 'id', params }, iframeId)
}

export function getCatList() {
  //  获取类目信息
  const catReg = new RegExp('itemListElement":(.*?])')
  let sc = document.scripts
  let parseCatHtml = function (html, replaceSpace = true) {
    let reg = ''
    if (replaceSpace) {
      reg = /[\s\n]/g
    } else {
      reg = /\n/g
    }
    html = html.replace(reg, '')
    let result = html.match(catReg)
    console.log(result)

    if (result && result.length > 1) {
      return JSON.parse(result[1])
    }
    return null
  }
  for (let i = 0; i < sc.length; i++) {
    let html = sc[i].innerText.replace(/[\s\n]/g, '')
    let data = parseCatHtml(html)
    if (data) {
      return data
    }
  }
  return []
}

// 获取商品管关键词
export function parseKw() {
  let metas = document.querySelectorAll('meta')
  let keywords = []
  for (let i = 0; i < metas.length; i++) {
    let meta = metas[i]
    if (meta.name === 'keywords') {
      let content = meta.content
      keywords = content.split('Buy')[1].split('Product on')[0].split(',')
    }
  }
  return keywords
}

// 动态加载css文件
export function loadStyles(url) {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  let head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
}

// 动态加载js文件
export function loadScript(url) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.body.appendChild(script);
}


// 延迟方法
export function delayTimes(time = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

// 商品类型：问鼎/顶展/全站推
export function getSubTypeData() {
  const subTypeList = [
    { label: "star_brand_industry_flow_supplement", value: "问鼎" },
    { label: "topranking_allsite_flow_supplement", value: "顶展" },
    { label: "whole_store", value: "全站推" },
    { label: "whole_store_product", value: "全站推" },
    { label: "whole_store_hot_product", value: "全站推优品助推" },
    { label: "whole_store_new_product", value: "全站推新品成长" },
    { label: "ai_whole_site", value: "AI智投" },
    { label: "budget_300", value: "控预算300" },
    { label: "budget_500", value: "控预算500" },
    { label: "normal", value: "自然" }
  ]
  return subTypeList
}