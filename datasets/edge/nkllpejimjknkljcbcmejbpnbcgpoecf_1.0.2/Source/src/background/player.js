//
// The player script observes the contents of the page for media elements to
// remotely control. Information regarding the media is sent to the host
// application to determine how playback should be handled. Certain playback
// events are also sent to the page such as play, pause, seek, and volume.
//

;(function() {
  console.debug(`syncfun player content script ${location.href}`)

  //=============================================================================
  // Setup communications between content script and background script.
  //=============================================================================

  // Listen for events from the main world to forward to the
  // background process
  const eventMiddleware = event => {
    if (event.origin !== location.origin) return
    const { data: action } = event
    if (typeof action !== 'object' || typeof action.type !== 'string') return
    if (action.type.startsWith('syncfun-')) {
      // Send to background script
      chrome.runtime.sendMessage(action)
    }
  }
  window.addEventListener('message', eventMiddleware)

  // Forward host events to main world
  chrome.runtime.onMessage.addListener(action => {
    if (typeof action !== 'object' || typeof action.type !== 'string') return
    console.log("收到了消息 action.type: ", action.type, action.payload.type)
    if (action.type === 'syncfun-host-event') {
      // Handle highlight-save-button event
      if (action.payload && action.payload.type === 'highlight-save-button') {
        const { highlight, saved, slot } = action.payload.payload || {}
        highlightSaveButton(highlight, saved, slot)
        return
      }
      // Handle show/hide chat button event
      if (action.payload && action.payload.type === 'toggle-chat-button') {
        const { show } = action.payload.payload || {}
        toggleChatButtonVisibility(show)
        return
      }
      window.postMessage(action.payload, location.origin)
      return
    }
  })

  //=============================================================================
  // Improve visuals of image or video pages
  //=============================================================================

  const body = document.body

  function enhanceVideo(video) {
    Object.assign(video, {
      loop: false,
      controls: false
    })

    Object.assign(video.style, {
      minWidth: '100%',
      minHeight: '100%'
    })
  }

  if (body && body.childElementCount === 1) {
    const video = document.querySelector('body > video[autoplay]')
    if (video) {
      enhanceVideo(video)
    }
  }

  //=============================================================================
  // Inject control buttons (fullscreen toggle & save/favorite)
  //=============================================================================

  let isFullscreen = false
  let controlButtonsContainer = null

  // Create SVG icons
  function createFullscreenIcon() {
    // 视频播放器全屏：播放三角 + 四角向外展开箭头
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="9,8 17,12 9,16" fill="currentColor" stroke="none"/>
      <path d="M3 7V4h3"/>
      <path d="M18 4h3v3"/>
      <path d="M21 17v3h-3"/>
      <path d="M6 21H3v-3"/>
    </svg>`
  }

  function createExitFullscreenIcon() {
    // 视频播放器退出全屏：播放三角 + 四角向内收缩箭头（全屏图标四角翻转）
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="9,8 17,12 9,16" fill="currentColor" stroke="none"/>
      <path d="M6 4v3H3"/>
      <path d="M21 7h-3v-3"/>
      <path d="M18 21v-3h3"/>
      <path d="M3 18h3v3"/>
    </svg>`
  }

  function createSaveIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>`
  }

  function createSavedIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>`
  }

  function createChatIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>`
  }

  function createCloseIcon() {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>`
  }

  function createSendIcon() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>`
  }

  // Inject highlight animation styles
  function injectHighlightStyles() {
    if (document.getElementById('syncfun-highlight-styles')) return
    
    const style = document.createElement('style')
    style.id = 'syncfun-highlight-styles'
    style.textContent = `
      .syncfun-highlight-animation {
        background-color: rgba(255, 20, 147, 0.5) !important;
        color: #FF69B4 !important;
        box-shadow: 0 0 12px rgba(255, 105, 180, 0.6), 0 0 20px rgba(255, 20, 147, 0.4) !important;
      }
      
      .syncfun-highlight-animation:hover {
        background-color: rgba(255, 20, 147, 0.7) !important;
        transform: scale(1.1) !important;
      }
    `
    document.head.appendChild(style)
  }

  // Create and inject control buttons
  function createControlButtons() {
    // Avoid duplicate injection
    if (controlButtonsContainer) return
    
    // Inject highlight animation styles first
    injectHighlightStyles()

    controlButtonsContainer = document.createElement('div')
    controlButtonsContainer.id = 'syncfun-control-buttons'
    
    // For styling purposes, consider small screens
    const isMobile = window.innerWidth <= 768

    // Container styles - positioned at right middle of iframe
    Object.assign(controlButtonsContainer.style, {
      position: 'fixed',
      right: isMobile ? '0' : '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      zIndex: '2147483647',
      opacity: '0.7',
      transition: 'opacity 0.3s ease'
    })

    // Hover effect for container
    controlButtonsContainer.addEventListener('mouseenter', () => {
      controlButtonsContainer.style.opacity = '1'
    })
    controlButtonsContainer.addEventListener('mouseleave', () => {
      controlButtonsContainer.style.opacity = '0.7'
    })

    // Create fullscreen toggle button
    const fullscreenBtn = document.createElement('button')
    fullscreenBtn.id = 'syncfun-fullscreen-btn'
    fullscreenBtn.title = '全屏/缩小'
    fullscreenBtn.innerHTML = createFullscreenIcon()
    applyButtonStyles(fullscreenBtn)

    fullscreenBtn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      toggleFullscreen()
    })

    // Create save/favorite button
    const saveBtn = document.createElement('button')
    saveBtn.id = 'syncfun-save-btn'
    saveBtn.title = '收藏视频'
    saveBtn.innerHTML = createSaveIcon()
    applyButtonStyles(saveBtn)

    let isSaved = false
    let pendingSlot = null // Store the slot info for saving
    
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      isSaved = !isSaved
      saveBtn.innerHTML = isSaved ? createSavedIcon() : createSaveIcon()
      saveBtn.title = isSaved ? '已收藏' : '收藏视频'
      // Remove highlight animation when clicked
      saveBtn.classList.remove('syncfun-highlight-animation')
      
      // Send save event to host with slot info
      sendSaveEventToHost(isSaved, pendingSlot)
    })
    
    // Function to update save button state from host
    window.syncfunUpdateSaveButton = (highlight, saved, slot) => {
      if (saved) {
        // Already saved - show filled icon
        isSaved = true
        // 保存 slot 信息，以便用户点击取消收藏时使用
        pendingSlot = slot || pendingSlot
        saveBtn.innerHTML = createSavedIcon()
        saveBtn.title = '已收藏'
      } else if (highlight) {
        // Not saved and should highlight - add animation
        isSaved = false
        pendingSlot = slot
        saveBtn.innerHTML = createSaveIcon()
        saveBtn.title = '收藏视频'
        saveBtn.classList.add('syncfun-highlight-animation')
      } else {
        // Reset state
        isSaved = false
        pendingSlot = null
        saveBtn.innerHTML = createSaveIcon()
        saveBtn.title = '收藏视频'
        saveBtn.classList.remove('syncfun-highlight-animation')
      }
    }

    // Create chat button (hidden by default, shown only in fullscreen mode)
    const chatBtn = document.createElement('button')
    chatBtn.id = 'syncfun-chat-btn'
    chatBtn.title = '聊天'
    chatBtn.innerHTML = createChatIcon()
    applyButtonStyles(chatBtn)
    chatBtn.style.display = 'none' // Hidden by default

    chatBtn.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      toggleChatWindow()
    })

    controlButtonsContainer.appendChild(fullscreenBtn)
    controlButtonsContainer.appendChild(saveBtn)
    controlButtonsContainer.appendChild(chatBtn)
    document.body.appendChild(controlButtonsContainer)

    // Create chat window (hidden by default)
    createChatWindow()
  }

  // Apply common button styles
  function applyButtonStyles(button) {
    Object.assign(button.style, {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      color: '#ffffff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      transition: 'background-color 0.2s ease, transform 0.2s ease',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
    })

    button.addEventListener('mouseenter', () => {
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
      button.style.transform = 'scale(1.1)'
    })
    button.addEventListener('mouseleave', () => {
      button.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
      button.style.transform = 'scale(1)'
    })
  }

  // Toggle fullscreen functionality - now triggers web fullscreen for specific sites
  function toggleFullscreen() {
    const currentUrl = location.href
    
    // Handle bilibili web fullscreen
    if (currentUrl.includes('bilibili')) {
      const targetDivs = document.querySelectorAll('.bpx-player-ctrl-btn.bpx-player-ctrl-web')
      if (targetDivs.length > 0) {
        targetDivs[0].click()
      }
      //删除bilibili多余的全屏按钮
      const biliFullDiv = document.querySelector('.bpx-player-ctrl-btn.bpx-player-ctrl-full');
      if (biliFullDiv) {
        biliFullDiv.remove();
      }
      //删除bilibili多余的全屏按钮
      const biliWidthDiv = document.querySelector('.bpx-player-ctrl-btn.bpx-player-ctrl-wide');
      if (biliWidthDiv) {
        biliWidthDiv.remove();
      }
      // 更新全屏按钮图标（B站使用网页全屏，不触发 fullscreenchange 事件）
      const fullscreenBtn = document.getElementById('syncfun-fullscreen-btn')
      isFullscreen = !isFullscreen
      if (fullscreenBtn) {
        fullscreenBtn.innerHTML = isFullscreen ? createExitFullscreenIcon() : createFullscreenIcon()
        fullscreenBtn.title = isFullscreen ? '退出全屏' : '全屏'
      }
      return
    }
    
    // Default behavior: use browser fullscreen API for other sites
    const fullscreenBtn = document.getElementById('syncfun-fullscreen-btn')
    
    if (!document.fullscreenElement) {
      // Enter fullscreen
      const target = document.documentElement
      if (target.requestFullscreen) {
        target.requestFullscreen()
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen()
      } else if (target.mozRequestFullScreen) {
        target.mozRequestFullScreen()
      } else if (target.msRequestFullscreen) {
        target.msRequestFullscreen()
      }
      isFullscreen = true
      if (fullscreenBtn) {
        fullscreenBtn.innerHTML = createExitFullscreenIcon()
        fullscreenBtn.title = '退出全屏'
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      isFullscreen = false
      if (fullscreenBtn) {
        fullscreenBtn.innerHTML = createFullscreenIcon()
        fullscreenBtn.title = '全屏'
      }
    }
  }

  // Listen for fullscreen change events
  document.addEventListener('fullscreenchange', updateFullscreenButtonState)
  document.addEventListener('webkitfullscreenchange', updateFullscreenButtonState)
  document.addEventListener('mozfullscreenchange', updateFullscreenButtonState)
  document.addEventListener('MSFullscreenChange', updateFullscreenButtonState)

  function updateFullscreenButtonState() {
    const fullscreenBtn = document.getElementById('syncfun-fullscreen-btn')
    if (!fullscreenBtn) return

    if (document.fullscreenElement) {
      isFullscreen = true
      fullscreenBtn.innerHTML = createExitFullscreenIcon()
      fullscreenBtn.title = '退出全屏'
    } else {
      isFullscreen = false
      fullscreenBtn.innerHTML = createFullscreenIcon()
      fullscreenBtn.title = '全屏'
    }
  }

  // Highlight save button function - called from message listener
  function highlightSaveButton(highlight, saved, slot) {
    // Wait for button to be created if not yet available
    const tryHighlight = () => {
      if (typeof window.syncfunUpdateSaveButton === 'function') {
        window.syncfunUpdateSaveButton(highlight, saved, slot)
      } else {
        // Button not ready, retry after a short delay
        setTimeout(tryHighlight, 100)
      }
    }
    tryHighlight()
  }

  // Toggle chat button visibility - called from message listener
  function toggleChatButtonVisibility(show) {
    const tryToggle = () => {
      const chatBtn = document.getElementById('syncfun-chat-btn')
      if (chatBtn) {
        chatBtn.style.display = show ? 'flex' : 'none'
        // If hiding chat button, also close chat window if open
        if (!show && isChatWindowOpen) {
          toggleChatWindow()
        }
      } else {
        // Button not ready, retry after a short delay
        setTimeout(tryToggle, 100)
      }
    }
    tryToggle()
  }

  // Send save event to host
  function sendSaveEventToHost(saved, slot) {
    // Send via postMessage to content script, then forward to host
    chrome.runtime.sendMessage({
      type: 'syncfun-webview-event',
      payload: {
        type: 'message',
        payload: {
          type: 'save',
          payload: {
            saved: saved,
            href: location.href,
            title: document.title,
            slot: slot // Include slot info if available
          }
        }
      }
    })
  }

  //=============================================================================
  // Chat Window functionality
  //=============================================================================

  let chatWindow = null
  let chatMessagesContainer = null
  let isChatWindowOpen = false

  // Create chat window
  function createChatWindow() {
    if (chatWindow) return

    chatWindow = document.createElement('div')
    chatWindow.id = 'syncfun-chat-window'
    
    Object.assign(chatWindow.style, {
      position: 'fixed',
      right: '60px',
      bottom: '20px',
      width: '320px',
      height: '400px',
      backgroundColor: 'rgba(30, 30, 30, 0.95)',
      borderRadius: '12px',
      display: 'none',
      flexDirection: 'column',
      zIndex: '2147483646',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    })

    // Chat header
    const chatHeader = document.createElement('div')
    Object.assign(chatHeader.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      backgroundColor: 'rgba(50, 50, 50, 0.9)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    })

    const chatTitle = document.createElement('span')
    chatTitle.textContent = '聊天'
    Object.assign(chatTitle.style, {
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: '600'
    })

    const closeBtn = document.createElement('button')
    closeBtn.innerHTML = createCloseIcon()
    Object.assign(closeBtn.style, {
      background: 'none',
      border: 'none',
      color: '#999',
      cursor: 'pointer',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      transition: 'color 0.2s ease'
    })
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.color = '#fff'
    })
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.color = '#999'
    })
    closeBtn.addEventListener('click', () => {
      toggleChatWindow()
    })

    chatHeader.appendChild(chatTitle)
    chatHeader.appendChild(closeBtn)

    // Chat messages container
    chatMessagesContainer = document.createElement('div')
    chatMessagesContainer.id = 'syncfun-chat-messages'
    Object.assign(chatMessagesContainer.style, {
      flex: '1',
      overflowY: 'auto',
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    })

    // Chat input area
    const chatInputArea = document.createElement('div')
    Object.assign(chatInputArea.style, {
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      gap: '8px'
    })

    const chatInput = document.createElement('input')
    chatInput.type = 'text'
    chatInput.id = 'syncfun-chat-input'
    chatInput.placeholder = '输入消息...'
    Object.assign(chatInput.style, {
      flex: '1',
      padding: '10px 14px',
      border: 'none',
      borderRadius: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      fontSize: '14px',
      outline: 'none'
    })
    chatInput.addEventListener('focus', () => {
      chatInput.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'
    })
    chatInput.addEventListener('blur', () => {
      chatInput.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
    })
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        sendChatMessage()
      }
    })

    const sendBtn = document.createElement('button')
    sendBtn.innerHTML = createSendIcon()
    Object.assign(sendBtn.style, {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: 'none',
      backgroundColor: '#007AFF',
      color: '#ffffff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      transition: 'background-color 0.2s ease, transform 0.2s ease'
    })
    sendBtn.addEventListener('mouseenter', () => {
      sendBtn.style.backgroundColor = '#0056CC'
      sendBtn.style.transform = 'scale(1.05)'
    })
    sendBtn.addEventListener('mouseleave', () => {
      sendBtn.style.backgroundColor = '#007AFF'
      sendBtn.style.transform = 'scale(1)'
    })
    sendBtn.addEventListener('click', () => {
      sendChatMessage()
    })

    chatInputArea.appendChild(chatInput)
    chatInputArea.appendChild(sendBtn)

    chatWindow.appendChild(chatHeader)
    chatWindow.appendChild(chatMessagesContainer)
    chatWindow.appendChild(chatInputArea)
    document.body.appendChild(chatWindow)
  }

  // Toggle chat window visibility
  function toggleChatWindow() {
    if (!chatWindow) return

    isChatWindowOpen = !isChatWindowOpen
    chatWindow.style.display = isChatWindowOpen ? 'flex' : 'none'
    
    if (isChatWindowOpen) {
      const chatInput = document.getElementById('syncfun-chat-input')
      if (chatInput) {
        chatInput.focus()
      }
    }
  }

  // Send chat message
  function sendChatMessage() {
    const chatInput = document.getElementById('syncfun-chat-input')
    if (!chatInput) return

    const message = chatInput.value.trim()
    if (!message) return

    // Add message to local chat
    addChatMessage(message, true)

    // Send message to host
    chrome.runtime.sendMessage({
      type: 'syncfun-webview-event',
      payload: {
        type: 'message',
        payload: {
          type: 'chat',
          payload: {
            message: message,
            timestamp: Date.now(),
            href: location.href
          }
        }
      }
    })

    // Clear input
    chatInput.value = ''
  }

  // Add message to chat window
  function addChatMessage(message, isSelf = false, senderName = '') {
    if (!chatMessagesContainer) return

    const messageWrapper = document.createElement('div')
    Object.assign(messageWrapper.style, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: isSelf ? 'flex-end' : 'flex-start',
      maxWidth: '85%',
      alignSelf: isSelf ? 'flex-end' : 'flex-start'
    })

    // Sender name (for received messages)
    if (!isSelf && senderName) {
      const nameLabel = document.createElement('span')
      nameLabel.textContent = senderName
      Object.assign(nameLabel.style, {
        fontSize: '11px',
        color: '#888',
        marginBottom: '2px',
        marginLeft: '8px'
      })
      messageWrapper.appendChild(nameLabel)
    }

    const messageBubble = document.createElement('div')
    messageBubble.textContent = message
    Object.assign(messageBubble.style, {
      padding: '10px 14px',
      borderRadius: isSelf ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
      backgroundColor: isSelf ? '#007AFF' : 'rgba(255, 255, 255, 0.15)',
      color: '#ffffff',
      fontSize: '14px',
      lineHeight: '1.4',
      wordWrap: 'break-word',
      maxWidth: '100%'
    })

    messageWrapper.appendChild(messageBubble)
    chatMessagesContainer.appendChild(messageWrapper)

    // Scroll to bottom
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight
  }

  // Listen for incoming chat messages from host
  chrome.runtime.onMessage.addListener(action => {
    if (typeof action !== 'object' || typeof action.type !== 'string') return
    
    if (action.type === 'syncfun-chat-message') {
      const { message, senderName } = action.payload || {}
      if (message) {
        addChatMessage(message, false, senderName || '对方')
      }
    }
  })

  // Inject buttons when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createControlButtons)
  } else {
    createControlButtons()
  }

  //=============================================================================
  // Main world script - modifies media in the main browser context.
  //=============================================================================

  // 使用外部脚本文件来绕过 CSP 限制
  // 内联脚本在有严格 CSP 的页面上会被阻止
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('src/background/player-main-world.js')
  script.onload = function() {
    this.remove()
  }
  if (document.head) {
    const { firstChild } = document.head
    if (firstChild) {
      document.head.insertBefore(script, firstChild)
    } else {
      document.head.appendChild(script)
    }
  } else {
    const id = setInterval(() => {
      try {
        document.documentElement.appendChild(script)
        clearInterval(id)
      } catch (e) {}
    }, 10)
  }
})()

// Don't serialize result
void 0