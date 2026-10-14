//
// Listens for webview events
// 监听 webview 事件，包括检测视频和获取网页信息
//

;(function() {
  const throttle = (func, limit) => {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  // 防抖函数，用于避免频繁发送
  const debounce = (func, delay) => {
    let timeoutId
    return function() {
      const args = arguments
      const context = this
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(context, args), delay)
    }
  }

  // 上一次发送的URL，避免重复发送
  let lastSentUrl = ''

  // 判断视频源名称
  const judgeSourceName = (url) => {
    if (!url) return 'unknown'
    if (url.includes('bilibili.com') || url.includes('b23.tv')) return 'bili'
    if (url.includes('youku.com')) return 'youku'
    if (url.includes('qq.com') || url.includes('v.qq.com')) return 'tencent'
    if (url.includes('iqiyi.com')) return 'iqiyi'
    return 'unknown'
  }

  // 检测页面是否包含视频
  const detectVideo = () => {
    const currentUrl = window.location.href
    
    // 检查 video 标签
    const videoTags = document.querySelectorAll('video')
    console.log('[webview.js] Video tags found:', videoTags)
    if (videoTags.length > 0) {
      return true
    }
    
    // 腾讯视频特殊检测（没有 video 标签）
    if (currentUrl.includes('qq.com')) {
      const txpControls = document.querySelector('.txp_left_controls')
      if (txpControls) {
        return true
      }
    }
    
    return false
  }

  // 获取网页信息并发送到应用层
  const getHtmlInfoAndSend = () => {
    const currentUrl = window.location.href
    
    // 避免重复发送同一URL
    if (currentUrl === lastSentUrl) {
      return
    }
    
    // 检测是否有视频
    if (!detectVideo()) {
      console.log('[webview.js] No video detected, skipping html info send')
      return
    }
    
    const title = document.title
    const sourceName = judgeSourceName(currentUrl)
    let fullHTML = ''
    
    // 根据不同网站获取不同的HTML内容
    if (currentUrl.includes('bilibili')) {
      if (currentUrl.includes('bangumi')) {
        // 番剧需要完整的body HTML来解析季集信息
        fullHTML = document.body.innerHTML
      }
      // 普通B站视频不需要HTML，API可以直接获取信息
    } else if (currentUrl.includes('youku.com')) {
      fullHTML = document.body.innerHTML
    } else if (currentUrl.includes('qq.com')) {
      fullHTML = document.head.innerHTML
    }
    
    lastSentUrl = currentUrl
    
    // 发送 js_have_video_only 消息（通知有视频）
    chrome.runtime.sendMessage({
      type: 'syncfun-webview-event',
      payload: {
        type: 'message',
        payload: {
          type: 'js_have_video_only',
          payload: {
            have: true,
            color: currentUrl.includes('youku.com') || currentUrl.includes('qq.com') ? false : true
          }
        }
      }
    })
    
    // 发送 js_html_info 消息（网页信息）
    console.log('[webview.js] Sending html info:', { currentUrl, title, sourceName })
    chrome.runtime.sendMessage({
      type: 'syncfun-webview-event',
      payload: {
        type: 'message',
        payload: {
          type: 'js_html_info',
          payload: {
            currentUrl,
            fullHTML,
            title,
            sourceName
          }
        }
      }
    })
  }

  // 防抖处理的发送函数，避免页面加载时频繁发送
  const debouncedGetHtmlInfo = debounce(getHtmlInfoAndSend, 1000)

  chrome.runtime.onMessage.addListener(action => {
    if (typeof action !== 'object' || typeof action.type !== 'string') return
    switch (action.type) {
      case 'navigate':
        history.go(Number(action.payload) || 0)
        break
      case 'reload':
        location.reload(Boolean(action.payload))
        break
      case 'stop':
        stop()
        break
      case 'syncfun-get-html-info':
        // 手动触发获取HTML信息
        getHtmlInfoAndSend()
        break
    }
  })

  console.log('[webview.js] Script loaded')
  chrome.runtime.sendMessage({
    type: 'syncfun-webview-event',
    payload: { type: 'load-script' }
  })

  // 页面加载完成后检测视频并发送信息
  const onPageReady = () => {
    // 延迟检测，等待动态内容加载
    setTimeout(() => {
      debouncedGetHtmlInfo()
    }, 1500)
  }

  if (document.readyState === 'complete') {
    onPageReady()
  } else {
    window.addEventListener('load', onPageReady)
  }

  // 监听 URL 变化（SPA 应用）
  let currentPath = window.location.href
  const checkUrlChange = () => {
    if (window.location.href !== currentPath) {
      currentPath = window.location.href
      lastSentUrl = '' // 重置，允许发送新URL
      console.log('[webview.js] URL changed:', currentPath)
      debouncedGetHtmlInfo()
    }
  }

  // 使用 MutationObserver 监听 DOM 变化来检测 SPA 导航
  const observer = new MutationObserver(() => {
    checkUrlChange()
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // 同时监听 popstate 事件
  window.addEventListener('popstate', () => {
    checkUrlChange()
  })

  // 监听 pushState 和 replaceState
  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState
  
  history.pushState = function() {
    originalPushState.apply(this, arguments)
    setTimeout(checkUrlChange, 100)
  }
  
  history.replaceState = function() {
    originalReplaceState.apply(this, arguments)
    setTimeout(checkUrlChange, 100)
  }

  // Forward activity signal to top frame
  // Used for determining inactivity in interactive mode and for verifying
  // whether user triggered media state changes.
  const onWebviewActivity = event => {
    if (!event.isTrusted) return
    chrome.runtime.sendMessage({
      type: 'syncfun-webview-event',
      payload: { type: 'activity', payload: event.type }
    })
  }
  const onFrequentWebviewActivity = throttle(onWebviewActivity, 500)
  const onImportantWebviewActivity = throttle(onWebviewActivity, 80)
  document.addEventListener('mousemove', onFrequentWebviewActivity, true)
  document.addEventListener('mousedown', onImportantWebviewActivity, true)
  document.addEventListener('mouseup', onImportantWebviewActivity, true)
  document.addEventListener('mousewheel', onFrequentWebviewActivity, true)
  document.addEventListener('keydown', onImportantWebviewActivity, true)

  const mainWorldScript = function() {
    // Fix for setting document.domain in sandboxed iframe
    try {
      Object.defineProperty(document, 'domain', {
        value: document.domain,
        writable: true
      })
    } catch (e) {}

    // Fix for sandboxed iframe detection
    try {
      Object.defineProperty(HTMLObjectElement.prototype, 'onerror', {
        set: () => {}
      })
    } catch (e) {}
  }

  // 直接执行脚本，避免通过内联 script 标签执行导致 CSP 错误
  // 原来的方式是创建 <script> 标签注入内联脚本，会被 CSP 的 script-src 策略阻止
  const executeMainWorldScript = () => {
    try {
      mainWorldScript()
    } catch (e) {
      console.warn('[webview.js] Failed to execute main world script:', e)
    }
  }

  if (document.documentElement) {
    executeMainWorldScript()
  }
})()
