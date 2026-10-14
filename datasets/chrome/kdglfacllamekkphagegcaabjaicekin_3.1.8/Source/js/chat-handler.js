/**
 * @Date: 2026-03-26
 * @Description: 阿里聊天详情页 - 复制聊天内容 + 复制客户信息（含等级 + 当前TAB内容）
 * 页面: https://message.alibaba.com/message/maDetail.htm
 */

// 监听来自 iframe 的消息
window.addEventListener('message', (event) => {
  const { cmd } = event.data || {};
  if (cmd === 'copyAllChatContent') {
    copyAllChatContent();
  } else if (cmd === 'copyCustomerInfo') {
    copyCustomerInfo();
  }
});

/**
 * 复制所有聊天内容
 */
async function copyAllChatContent() {
  try {
    const messageElements = document.querySelectorAll('.message-item-wrapper');
    if (messageElements.length === 0) {
      showMessage('未找到聊天内容', 'warning');
      return;
    }
    console.log('[ChatHandler] 找到', messageElements.length, '条消息');
    const chatContent = extractAndFormatChatContent(messageElements);
    const textMessageCount = chatContent.split('\n').filter(line => line.startsWith('【')).length;
    await copyToClipboard(chatContent);
    showMessage(`已复制 ${textMessageCount} 条文本消息`, 'success');
    console.log('[ChatHandler] 聊天内容复制成功');
  } catch (error) {
    console.error('[ChatHandler] 复制失败:', error);
    showMessage('复制失败: ' + error.message, 'error');
  }
}

/**
 * 提取并格式化聊天内容（倒序，过滤链接/文件碎片，提取文件名）
 */
function extractAndFormatChatContent(messageElements) {
  const lines = [];
  lines.push('========== 聊天记录 ==========');
  lines.push(`时间: ${new Date().toLocaleString()}`);
  lines.push(`共 ${messageElements.length} 条消息`);
  lines.push('');
  let textMessageCount = 0;

  const urlRegex = /https?:\/\/[^\s]+/g;
  const fileParamRegex = /(&?[a-zA-Z0-9_]+=)+[a-zA-Z0-9_\.]+(&[a-zA-Z0-9_]+=[a-zA-Z0-9_\.]+)*/g;
  const suffixRegex = /\.[a-zA-Z0-9]{2,5}/g;

  for (let i = messageElements.length - 1; i >= 0; i--) {
    const element = messageElements[i];
    try {
      const expInfo = element.dataset.expinfo;
      let parsedInfo = {};
      if (expInfo) {
        try {
          const decodedInfo = expInfo.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
          parsedInfo = JSON.parse(decodedInfo);
        } catch (e) { }
      }

      const productCard = element.querySelector('[view-name="ImageView"] div[style*="background-image"]');
      const directImage = element.querySelector('.normal-text-card-item img');
      if (productCard || directImage) continue;

      const nameElement = element.querySelector('.name');
      const timeElement = element.querySelector('.item-base-info span:last-child');
      const contentElement = element.querySelector('.session-rich-content.text');
      const translationElement = element.querySelector('.translate-result .target-content');
      const originalContent = element.dataset.original || '';
      const isLeft = element.classList.contains('item-left');
      const sender = nameElement?.textContent?.trim() || '未知';
      const time = timeElement?.textContent?.trim() || '';
      const direction = isLeft ? '客户' : '我';

      let content = contentElement?.textContent?.trim() || originalContent;
      content = content.replace(urlRegex, '').trim();
      content = content.replace(fileParamRegex, '').trim();

      const fileItem = element.querySelector('.inquiry-file-item');
      const fileName = fileItem?.querySelector('.file-name')?.textContent?.trim() || '';
      if (fileName) {
        content = `发送文件：${fileName}`;
      }
      if (content.match(suffixRegex) && content.length <= 10) content = '';

      if (!content) continue;

      textMessageCount++;
      lines.push(`【${textMessageCount}】${time} ${sender} (${direction})`);
      lines.push(`内容: ${content}`);
      const translation = translationElement?.textContent?.trim() || '';
      if (translation) lines.push(`翻译: ${translation}`);
      lines.push('');
    } catch (error) {
      console.error('[ChatHandler] 解析消息失败:', error);
    }
  }

  lines[2] = `共 ${textMessageCount} 条文本消息`;
  lines.push('========== 聊天记录结束 ==========');
  return lines.join('\n');
}

/**
 * 复制客户信息
 */
async function copyCustomerInfo() {
  try {
    const customerInfo = extractCustomerInfoWithActiveTab();
    if (!customerInfo || customerInfo.includes('未找到客户信息')) {
      showMessage('未找到客户信息', 'warning');
      return;
    }
    await copyToClipboard(customerInfo);
    showMessage('客户信息复制成功', 'success');
    console.log('[ChatHandler] 客户信息复制成功');
  } catch (error) {
    console.error('[ChatHandler] 复制客户信息失败:', error);
    showMessage('复制失败: ' + error.message, 'error');
  }
}

/**
 * 根据图片URL获取等级文本
 * @param {string} src 图片地址
 * @returns {string|null} 等级文本（如 "L3"）或 null
 */
function getLevelFromImageSrc(src) {
  const levelMap = {
    'https://img.alicdn.com/imgextra/i3/O1CN016s9YtC1jJsEn1Insi_!!6000000004528-2-tps-144-82.png': 'L3',
    'https://img.alicdn.com/imgextra/i2/O1CN01QPXkVq1xUmP6u0guh_!!6000000006447-2-tps-136-80.png': 'L1',
    'https://img.alicdn.com/imgextra/i2/O1CN01NQDNGN1GXxg1QhmCW_!!6000000000633-2-tps-136-80.png': 'L2',
    'https://img.alicdn.com/imgextra/i4/O1CN01Y2kXyK27mJc8CmtgL_!!6000000007839-2-tps-144-82.png': 'L4'
  };
  return levelMap[src] || null;
}

/**
 * 获取当前激活的 Tab 名称
 */
function getActiveTabName() {
  const activeTab = document.querySelector('.im-next-tabs-tab.active');
  if (!activeTab) return '未知Tab';
  return activeTab.textContent.trim();
}
/**
 * 提取当前激活 Tab 的内容
 */
/**
 * 提取当前激活 Tab 的内容
 */
function extractActiveTabContent() {
  const activePane = document.querySelector('.im-next-tabs-tabpane.active');
  if (!activePane) return '未选中任何Tab';

  const tabName = getActiveTabName();
  const lines = [];
  lines.push(`========== ${tabName} ==========`);

  // 行为数据
  if (tabName.includes('客户行为数据')) {
    const titleElem = activePane.querySelector('.alicrm-customer-behavioral-card-last-behavior-count-title span');
    if (titleElem) {
      lines.push(titleElem.textContent.trim());
    }

    const counts = activePane.querySelectorAll('.indicator');
    counts.forEach(item => {
      const count = item.querySelector('.count')?.textContent.trim() || '';
      const label = item.querySelector('.label')?.textContent.trim() || '';
      if (label && count) lines.push(`${label}：${count}`);
    });

    const rows = activePane.querySelectorAll('.alicrm-customer-behavioral-card-last-behavior-secondary-container > div');
    rows.forEach(row => {
      const title = row.querySelector('.title')?.textContent.trim() || '';
      const content = row.querySelector('.content')?.textContent.trim() || '';
      if (title) lines.push(`${title}：${content}`);
    });
  }

  // 跟进建议 & 工具
  else if (tabName.includes('跟进建议')) {
    const suggest = activePane.querySelector('.stage-content');
    if (suggest) lines.push(`跟进建议：${suggest.textContent.trim()}`);

    const tools = activePane.querySelectorAll('.tool-item');
    if (tools.length) {
      lines.push('跟进工具：');
      tools.forEach(t => {
        const name = t.querySelector('.tool-name')?.textContent.trim();
        if (name) lines.push(`- ${name}`);
      });
    }

    const infos = activePane.querySelectorAll('.info-item');
    infos.forEach(info => {
      const name = info.querySelector('.item-name')?.textContent.trim() || '';
      const value = info.querySelector('.item-value')?.textContent.trim() || '';
      if (name) lines.push(`${name}：${value}`);
    });
  }

  // 跟进管理
  else if (tabName.includes('跟进管理')) {
    const labels = activePane.querySelectorAll('.form-label');
    labels.forEach(labelEl => {
      const label = labelEl.textContent.trim().replace('：', '');
      const content = labelEl.nextElementSibling?.textContent.trim() || '';

      // 跳过 起草复购订单 按钮
      if (label === '订单跟踪') return;

      if (label && !content.includes('icon') && content) {
        // 历史小记 每条换行
        if (label === '历史小记') {
          lines.push(`${label}：`);
          const noteItems = activePane.querySelectorAll('.history-note-info-item');
          noteItems.forEach(item => {
            const text = item.querySelector('.note-text')?.textContent.trim() || '';
            const date = item.querySelector('.note-date')?.textContent.trim() || '';
            const contentText = item.querySelector('.note-text-content')?.textContent.trim() || '';
            if (text) lines.push(`  ${text} ${date} ${contentText}`);
          });
        } else {
          lines.push(`${label}：${content}`);
        }
      }
    });

    const orderInfos = activePane.querySelectorAll('.alicrm-customer-edit-info-card-manage-info-order-info .indicator');
    orderInfos.forEach(item => {
      const cnt = item.querySelector('.count')?.textContent.trim() || '';
      const lab = item.querySelector('.label')?.textContent.trim() || '';
      if (lab && cnt) lines.push(`${lab}：${cnt}`);
    });
  }

  return lines.join('\n');
}

/**
 * 从页面提取客户信息 + 当前TAB内容（新版）
 * @returns {string} 格式化后的客户信息文本
 */
function extractCustomerInfoWithActiveTab() {
  const card = document.querySelector('.alicrm-customer-detail-card');
  if (!card) return '未找到客户信息卡片';

  const lines = [];
  lines.push('========== 客户信息 ==========');
  lines.push(`导出时间: ${new Date().toLocaleString()}`);
  lines.push('');

  // 1. 顶部基本信息
  const nameElem = card.querySelector('.name-text');
  const name = nameElem?.textContent?.trim() || '未知';
  lines.push(`姓名: ${name}`);

  const levelImg = card.querySelector('.alicrm-customer-detail-card-header-name-container .icon-content img');
  let level = '';
  if (levelImg && levelImg.src) {
    const levelText = getLevelFromImageSrc(levelImg.src);
    if (levelText) level = levelText;
  }
  if (level) lines.push(`等级: ${level}`);

  const countryElem = card.querySelector('.country-flag-label');
  const country = countryElem?.textContent?.trim() || '未知';
  lines.push(`国家: ${country}`);

  const ownerElem = card.querySelector('.alicrm-customer-detail-card-header-operations .text');
  const owner = ownerElem?.textContent?.trim() || '未知归属';
  lines.push(`归属: ${owner}`);

  lines.push('');

  // 2. 基础信息项
  const formItems = card.querySelectorAll('.base-information-form-item');
  formItems.forEach(item => {
    const labelElem = item.querySelector('.base-information-form-item-label');
    const contentElem = item.querySelector('.base-information-form-item-content');
    if (!labelElem) return;

    let label = labelElem.textContent?.trim();
    if (labelElem.querySelector('.ai-tag-form-item')) label = '买家特征';
    if (!label) return;

    let content = '';
    if (label === '买家标签' || label === '买家特征') {
      const tags = item.querySelectorAll('.ai-tag-content-list-item');
      content = tags.length ? Array.from(tags).map(t => t.textContent.trim()).filter(Boolean).join(', ') : '-';
    } else {
      content = (contentElem?.textContent || '-').trim().replace(/\s+/g, ' ');
    }
    lines.push(`${label}: ${content}`);
  });

  lines.push('');
  // 3. 加入当前选中TAB的内容
  const tabContent = extractActiveTabContent();
  lines.push(tabContent);

  lines.push('');
  lines.push('========== 复制完成 ==========');
  return lines.join('\n');
}

/**
 * 复制到剪贴板
 */
async function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
}

/**
 * 显示提示消息
 */
function showMessage(message, type = 'info') {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
        position: fixed;top: 20px;right: 20px;padding: 12px 20px;
        background: ${type === 'success' ? '#52c41a' : type === 'error' ? '#ff4d4f' : '#1890ff'};
        color: white;border-radius: 4px;box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 999999;font-size: 14px;animation: slideIn 0.3s ease;
    `;
  if (!document.querySelector('#chat-copy-toast-style')) {
    const style = document.createElement('style');
    style.id = 'chat-copy-toast-style';
    style.textContent = `
            @keyframes slideIn {from {transform: translateX(100%);opacity: 0;}to {transform: translateX(0);opacity: 1;}}
            @keyframes slideOut {from {transform: translateX(0);opacity: 1;}to {transform: translateX(100%);opacity: 0;}}
        `;
    document.head.appendChild(style);
  }
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
}

// 监听URL变化
let lastUrl = location.href;
new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    console.log('[ChatHandler] URL变化');
  }
}).observe(document, { subtree: true, childList: true });