/**
 * Paywall Support & Customer Portal Buttons
 * Добавляет кнопки в правый верхний угол popup
 */

(function createPaywallButtons() {
  'use strict';

  const PAYWALL_ID = '657';
  
  // Ждем загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  async function init() {
    console.log('[PAYWALL BUTTONS] 🔍 Checking user subscription status...');
    
    // Проверяем доступность paywall SDK
    if (typeof window.paywall === 'undefined') {
      console.warn('[PAYWALL BUTTONS] ⚠️ Paywall SDK not loaded, buttons will not be shown');
      return;
    }

    // Пауза для инициализации SDK
    await new Promise(resolve => setTimeout(resolve, 500));

    let isPaidUser = false;
    let userEmail = null;

    try {
      // Получаем информацию о пользователе
      const userInfo = await window.paywall.getUser();
      
      isPaidUser = userInfo.paid;
      userEmail = userInfo.user?.email || 'unknown';

      console.log('[PAYWALL BUTTONS] ✅ User info retrieved:', {
        paid: isPaidUser,
        email: userEmail,
        trial: userInfo.trial ? 'active' : 'none',
        purchases: userInfo.purchases?.length || 0
      });

      if (isPaidUser) {
        console.log('[PAYWALL BUTTONS] 🎉 PAID USER DETECTED - Showing support buttons');
      } else {
        console.log('[PAYWALL BUTTONS] ❌ FREE USER - Buttons hidden');
        return; // Не показываем кнопки для бесплатных пользователей
      }

    } catch (error) {
      console.log('[PAYWALL BUTTONS] ℹ️ User not authenticated or error:', error.message);
      console.log('[PAYWALL BUTTONS] 🚫 Buttons will not be shown (authentication required)');
      return; // Не показываем кнопки для неавторизованных
    }

    // Создаем контейнер для кнопок (только для оплаченных пользователей)
    console.log('[PAYWALL BUTTONS] 🎨 Creating buttons UI...');
    
    const container = document.createElement('div');
    container.id = 'paywall-buttons-container';
    container.innerHTML = `
      <button id="paywall-support-btn" class="paywall-action-btn" title="Support">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>Support</span>
      </button>
      
      <button id="paywall-portal-btn" class="paywall-action-btn" title="Account">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Account</span>
      </button>
    `;

    // Добавляем стили
    const style = document.createElement('style');
    style.textContent = `
      #paywall-buttons-container {
        position: fixed;
        top: 8px;
        right: 8px;
        display: flex;
        gap: 6px;
        z-index: 999999;
      }

      .paywall-action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        padding: 4px 8px;
        background: rgba(255, 255, 255, 0.98);
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 5px;
        cursor: pointer;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 10px;
        font-weight: 500;
        color: #555;
        transition: all 0.15s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        min-width: unset;
        height: 24px;
      }

      .paywall-action-btn:hover {
        background: #fff;
        border-color: rgba(0, 0, 0, 0.15);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        color: #333;
      }

      .paywall-action-btn:active {
        transform: scale(0.97);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
      }

      .paywall-action-btn svg {
        flex-shrink: 0;
        width: 13px;
        height: 13px;
      }

      .paywall-action-btn span {
        white-space: nowrap;
        line-height: 1;
      }

      /* Адаптивность - на узких экранах показываем только иконки */
      @media (max-width: 450px) {
        .paywall-action-btn span {
          display: none;
        }
        
        .paywall-action-btn {
          padding: 5px;
          width: 24px;
        }
      }

      /* Темная тема */
      body.dark #paywall-buttons-container .paywall-action-btn {
        background: rgba(50, 50, 50, 0.98);
        border-color: rgba(255, 255, 255, 0.08);
        color: #ccc;
      }

      body.dark #paywall-buttons-container .paywall-action-btn:hover {
        background: #3a3a3a;
        border-color: rgba(255, 255, 255, 0.15);
        color: #fff;
      }
    `;

    // Добавляем на страницу
    document.head.appendChild(style);
    document.body.appendChild(container);

    // Обработчики кликов
    document.getElementById('paywall-support-btn').addEventListener('click', () => {
      console.log('[PAYWALL BUTTONS] 📧 Opening support page...');
      chrome.tabs.create({
        url: `https://appbox.space/paywall/${PAYWALL_ID}/customer-portal/get?tab=support`
      });
    });

    document.getElementById('paywall-portal-btn').addEventListener('click', () => {
      console.log('[PAYWALL BUTTONS] 👤 Opening account portal...');
      chrome.tabs.create({
        url: `https://appbox.space/paywall/${PAYWALL_ID}/customer-portal/get`
      });
    });

    console.log('[PAYWALL BUTTONS] ✨ Buttons successfully added for user:', userEmail);
  }
})();
