//
// Main world script for first.js
// This script runs in the page's main world to capture media elements
//

;(function() {
  console.error("first.js 开始执行", window.self)

  const INIT_TIMEOUT = 5e3
  const isFirefox = navigator.userAgent.toLowerCase().includes('firefox')

  //=========================================================================
  // Mobile viewport scaling using CSS transform
  // 使用 CSS transform 缩放页面，让移动端可以完整查看桌面版页面
  //=========================================================================

  const urlParamsForViewport = new URLSearchParams(window.location.search)
  const enableMobileViewport = urlParamsForViewport.get('mobileViewport') === 'true'

  if (enableMobileViewport) {
    console.log('[SyncFun] Mobile viewport scaling enabled for:', window.location.href)

    const injectScaleStyles = () => {
      // 计算缩放比例：假设桌面页面宽度为 1280px，根据实际视口宽度计算
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 375
      const desktopWidth = 1080  // 假设桌面页面的设计宽度
      const scale = Math.min(viewportWidth / desktopWidth, 1)  // 最大不超过 1
      
      console.log('[SyncFun] Viewport width:', viewportWidth, 'Scale:', scale)

      // 创建样式元素
      // 将 scale 值同步到 CSS 自定义属性，供其他脚本读取并做反向补偿
      document.documentElement.style.setProperty('--syncfun-page-scale', scale)

      const style = document.createElement('style')
      style.id = 'syncfun-mobile-scale-style'
      style.textContent = `
        /* 移动端缩放样式 */
        html {
          /* 使用 zoom 属性进行缩放（兼容性更好） */
          zoom: ${scale};
        }
        
        /* 备用方案：某些浏览器不支持 zoom，使用 transform */
        @supports not (zoom: ${scale}) {
          html {
            transform: scale(${scale});
            transform-origin: 0 0;
            width: ${100 / scale}%;
          }
        }
        
        /* 确保页面可以滚动 */
        body {
          overflow: auto !important;
          min-height: 100vh;
        }

        /* 控制按钮容器：反向补偿页面缩放，保持按钮原始大小 */
        #syncfun-control-buttons {
          zoom: ${1 / scale};
        }
      `

      // 插入样式
      if (document.head) {
        // 移除旧的样式（如果存在）
        const oldStyle = document.getElementById('syncfun-mobile-scale-style')
        if (oldStyle) {
          oldStyle.remove()
        }
        document.head.appendChild(style)
        console.log('[SyncFun] Scale styles injected with scale:', scale)
      } else if (document.documentElement) {
        document.documentElement.appendChild(style)
      }
    }

    // 立即尝试注入
    if (document.head || document.documentElement) {
      injectScaleStyles()
    }

    // DOM 准备好后再次注入
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectScaleStyles)
    }

    // 页面完全加载后最终注入
    window.addEventListener('load', injectScaleStyles)

    // 监听窗口大小变化，重新计算缩放
    window.addEventListener('resize', () => {
      // 防抖处理
      clearTimeout(window.__syncfunResizeTimer)
      window.__syncfunResizeTimer = setTimeout(injectScaleStyles, 200)
    })
  }

  //=========================================================================
  // document.createElement proxy
  //=========================================================================

  window.__syncfunMediaElements = new Set()

  // Proxy document.createElement to trap media elements created in-memory
  const origCreateElement = document.createElement
  const proxyCreateElement = function() {
    const element = origCreateElement.apply(document, arguments)
    if (window.__syncfunMediaElements && element instanceof HTMLMediaElement) {
      window.__syncfunMediaElements.add(element)
    }
    return element
  }
  proxyCreateElement.toString = origCreateElement.toString.bind(origCreateElement)
  document.createElement = proxyCreateElement

  setTimeout(() => {
    if (window.__syncfunMediaElements) {
      window.__syncfunMediaElements.clear()
      window.__syncfunMediaElements = undefined
    }
  }, INIT_TIMEOUT)

  //=========================================================================
  // navigator.mediaSession proxy (Firefox)
  //=========================================================================

  if (isFirefox) {
    // stub out MediaSession API until Firefox supports this natively
    if (!navigator.mediaSession) {
      const noop = () => {}
      const mediaSessionStub = {
        __installedBySyncFunRemote__: true,
        setActionHandler: noop
      }
      Object.defineProperty(window.navigator, 'mediaSession', {
        value: mediaSessionStub,
        enumerable: false,
        writable: true
      })

      function MediaMetadata(metadata) {
        Object.assign(this, metadata)
      }
      window.MediaMetadata = MediaMetadata
    }

    const { mediaSession } = navigator

    // Capture action handlers for player.js proxy
    mediaSession._handlers = {}

    const _setActionHandler = mediaSession.setActionHandler
    mediaSession.setActionHandler = function(name, handler) {
      mediaSession._handlers[name] = handler
      _setActionHandler.apply(mediaSession, arguments)
    }
  }

  //=========================================================================
  // document.domain fix (Firefox)
  //=========================================================================

  if (isFirefox) {
    const domains = ['twitch.tv', 'crunchyroll.com']

    // Fix for setting document.domain in sandboxed iframe
    try {
      const { domain } = document
      if (domain && domains.some(d => domain.includes(d))) {
        Object.defineProperty(document, 'domain', {
          value: domain,
          writable: true
        })
      }
    } catch (e) {}
  }

  //=========================================================================
  // Inline script embed prevention fix
  //=========================================================================

  const observeScripts = () => {
    const scriptSnippets = [
      { code: 'window.top !== window.self', replacement: 'false' },
      { code: 'self == top', replacement: 'true' },
      { code: 'top.location != window.location', replacement: 'false' }
    ]

    const getAddedScripts = mutationList =>
      mutationList.reduce((scripts, mutation) => {
        if (mutation.type !== 'childList') return scripts
        const inlineScripts = Array.from(mutation.addedNodes).filter(
          node => node instanceof HTMLScriptElement && node.textContent.length > 0
        )
        return inlineScripts.length > 0 ? [...scripts, ...inlineScripts] : scripts
      }, [])

    // Modifies inline scripts to allow embedding content in iframe
    const inlineScriptModifier = mutationsList => {
      const scripts = getAddedScripts(mutationsList)
      for (let script of scripts) {
        for (let snippet of scriptSnippets) {
          if (script.textContent.includes(snippet.code)) {
            script.textContent = script.textContent.split(snippet.code).join(snippet.replacement)
          }
        }
      }
    }

    const observer = new MutationObserver(inlineScriptModifier)
    observer.observe(document.documentElement, { childList: true, subtree: true })

    // Stop watching for changes after we finish loading
    window.addEventListener('load', () => observer.disconnect())
  }

  observeScripts()

  //=========================================================================
  // Internal navigation for MediaBrowserModal
  // 拦截链接点击、window.open、表单提交、location 变更等，在 iframe 内部导航而不是打开新窗口
  //=========================================================================

  // 检查是否需要启用内部导航（通过 URL 参数判断）
  const urlParams = new URLSearchParams(window.location.search)
  const enableInternalNavigation = urlParams.get('internalNav') === 'true'

  if (enableInternalNavigation) {
    console.log('[SyncFun] Internal navigation mode enabled for:', window.location.href)

    // 用于去重，避免重复发送相同的 URL
    // 初始化为当前页面的 URL（不带 internalNav 参数），避免页面加载时的重复导航
    let lastNavigatedUrl = ''
    try {
      const currentUrlObj = new URL(window.location.href)
      currentUrlObj.searchParams.delete('internalNav')
      lastNavigatedUrl = currentUrlObj.toString()
    } catch (e) {}

    // 发送内部导航请求的函数
    const sendInternalNavigate = (url, forceNavigate = false) => {
      // 移除 URL 中的 internalNav 参数用于比较
      let cleanUrl = url
      try {
        const urlObj = new URL(url)
        urlObj.searchParams.delete('internalNav')
        cleanUrl = urlObj.toString()
      } catch (e) {}

      // 如果是相同的 URL，不重复发送（除非强制导航）
      if (!forceNavigate && cleanUrl === lastNavigatedUrl) {
        console.log('[SyncFun] Skipping duplicate navigation:', cleanUrl)
        return false
      }
      lastNavigatedUrl = cleanUrl

      console.log('[SyncFun] Sending internal navigate request:', cleanUrl)
      window.parent.postMessage({
        type: 'syncfun-internal-navigate',
        url: cleanUrl
      }, '*')
      return true
    }

    // =========================================================================
    // 1. 拦截链接点击（包括所有可能导致页面跳转的链接）
    // =========================================================================
    document.addEventListener('click', function(event) {
      // 查找被点击的链接
      let target = event.target
      while (target && target.tagName !== 'A') {
        target = target.parentElement
      }

      if (!target || target.tagName !== 'A') return

      const href = target.getAttribute('href')
      if (!href) return

      // 跳过特殊链接
      if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return
      }

      // 检查 target 属性
      const linkTarget = target.getAttribute('target')
      
      // 拦截 _blank、_top、_parent 的链接，以及会导致跳出 iframe 的链接
      if (linkTarget === '_blank' || linkTarget === '_top' || linkTarget === '_parent') {
        event.preventDefault()
        event.stopPropagation()

        // 将相对 URL 转换为绝对 URL
        let absoluteUrl = href
        try {
          absoluteUrl = new URL(href, window.location.href).href
        } catch (e) {
          console.warn('[SyncFun] Failed to parse URL:', href)
          return
        }

        console.log('[SyncFun] Intercepted link click:', absoluteUrl)
        sendInternalNavigate(absoluteUrl)
      }
    }, true)  // 使用捕获阶段确保先执行

    // =========================================================================
    // 2. 拦截 window.open() 调用
    // =========================================================================
    const originalWindowOpen = window.open
    window.open = function(url, target, features) {
      console.log('[SyncFun] Intercepted window.open:', url, 'target:', target)
      
      if (url) {
        try {
          const absoluteUrl = new URL(url, window.location.href).href
          // 对于新窗口打开，直接在当前 iframe 内导航
          if (sendInternalNavigate(absoluteUrl)) {
            return null  // 返回 null 表示窗口未打开
          }
        } catch (e) {
          console.warn('[SyncFun] Failed to parse window.open URL:', url)
        }
      }
      
      // 如果没有 URL 或者是相同 URL，调用原始方法
      return originalWindowOpen.call(window, url, target, features)
    }
    // 保持 toString 行为一致，避免被检测
    window.open.toString = originalWindowOpen.toString.bind(originalWindowOpen)

    // =========================================================================
    // 4. 拦截 location 对象的修改
    // =========================================================================
    
    // 拦截 location.href 赋值
    const originalLocationDescriptor = Object.getOwnPropertyDescriptor(window, 'location')
    
    // 由于 location 对象的特殊性，我们使用代理 location.assign 和 location.replace
    const originalAssign = window.location.assign
    const originalReplace = window.location.replace
    
    window.location.assign = function(url) {
      console.log('[SyncFun] Intercepted location.assign:', url)
      try {
        const absoluteUrl = new URL(url, window.location.href).href
        if (sendInternalNavigate(absoluteUrl)) {
          return  // 阻止原始导航
        }
      } catch (e) {
        console.warn('[SyncFun] Failed to parse location.assign URL:', url)
      }
      return originalAssign.call(window.location, url)
    }
    window.location.assign.toString = originalAssign.toString.bind(originalAssign)
    
    window.location.replace = function(url) {
      console.log('[SyncFun] Intercepted location.replace:', url)
      try {
        const absoluteUrl = new URL(url, window.location.href).href
        if (sendInternalNavigate(absoluteUrl)) {
          return  // 阻止原始导航
        }
      } catch (e) {
        console.warn('[SyncFun] Failed to parse location.replace URL:', url)
      }
      return originalReplace.call(window.location, url)
    }
    window.location.replace.toString = originalReplace.toString.bind(originalReplace)

    // =========================================================================
    // 5. 拦截通过修改 location.href 的导航（使用 Proxy）
    // =========================================================================
    try {
      // 创建一个包装器来拦截 href 设置
      const locationProxy = new Proxy(window.location, {
        set: function(target, prop, value) {
          if (prop === 'href') {
            console.log('[SyncFun] Intercepted location.href =', value)
            try {
              const absoluteUrl = new URL(value, window.location.href).href
              if (sendInternalNavigate(absoluteUrl)) {
                return true  // 阻止原始导航
              }
            } catch (e) {
              console.warn('[SyncFun] Failed to parse location.href URL:', value)
            }
          }
          target[prop] = value
          return true
        },
        get: function(target, prop) {
          const value = target[prop]
          if (typeof value === 'function') {
            return value.bind(target)
          }
          return value
        }
      })
      
      // 尝试替换 window.location（在某些浏览器中可能失败）
      try {
        Object.defineProperty(window, 'location', {
          get: function() { return locationProxy },
          configurable: false
        })
      } catch (e) {
        // 某些浏览器不允许重新定义 location，忽略错误
        console.log('[SyncFun] Cannot redefine window.location, using fallback')
      }
    } catch (e) {
      console.log('[SyncFun] Proxy for location not supported:', e)
    }

    // =========================================================================
    // 6. 监听 beforeunload 事件作为最后的拦截手段
    // =========================================================================
    window.addEventListener('beforeunload', function(event) {
      // 注意：beforeunload 中无法阻止导航或获取目标 URL
      // 这里只用于调试日志
      console.log('[SyncFun] beforeunload triggered, page is navigating away')
    })

    // =========================================================================
    // 7. 拦截动态创建的 <a> 标签点击（通过 MutationObserver）
    // =========================================================================
    const observeNewLinks = () => {
      const processLink = (link) => {
        if (link.__syncfunProcessed) return
        link.__syncfunProcessed = true
        
        const href = link.getAttribute('href')
        const target = link.getAttribute('target')
        
        // 对于 _blank 等目标的链接，添加点击拦截
        if (target === '_blank' || target === '_top' || target === '_parent') {
          link.addEventListener('click', function(event) {
            event.preventDefault()
            event.stopPropagation()
            
            if (href) {
              try {
                const absoluteUrl = new URL(href, window.location.href).href
                sendInternalNavigate(absoluteUrl)
              } catch (e) {}
            }
          }, true)
        }
      }
      
      // 处理现有的链接
      document.querySelectorAll('a[target="_blank"], a[target="_top"], a[target="_parent"]').forEach(processLink)
      
      // 监听新添加的链接
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLAnchorElement) {
                processLink(node)
              } else if (node instanceof HTMLElement) {
                node.querySelectorAll && node.querySelectorAll('a[target="_blank"], a[target="_top"], a[target="_parent"]').forEach(processLink)
              }
            })
          } else if (mutation.type === 'attributes' && mutation.target instanceof HTMLAnchorElement) {
            processLink(mutation.target)
          }
        }
      })
      
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['target', 'href']
      })
    }
    
    // DOM 准备好后开始监听
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeNewLinks)
    } else {
      observeNewLinks()
    }
  }
})()