/**
 * Paywall Check Script
 * Проверяет статус подписки при каждом открытии popup расширения
 */

(async function initPaywallCheck() {
  'use strict';

  // Ждем загрузки DOM и paywall SDK
  if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
  }

  // Небольшая задержка для инициализации paywall SDK
  await new Promise(resolve => setTimeout(resolve, 100));

  // Проверяем доступность paywall
  if (typeof window.paywall === 'undefined') {
    console.warn('[PAYWALL] SDK not loaded');
    return;
  }

  try {
    // Пытаемся получить информацию о пользователе
    const userInfo = await window.paywall.getUser();
    
    if (userInfo.paid) {
      // ✅ Пользователь оплатил подписку
      console.log('[PAYWALL] Premium user detected');
      document.body.classList.add('paywall-premium-user');
    } else {
      // ⚠️ Нет активной подписки
      console.log('[PAYWALL] Free user detected');
      document.body.classList.add('paywall-free-user');
      
      // Показываем пейволл через короткую задержку (не сразу, чтобы не раздражать)
      setTimeout(() => {
        window.paywall.open().catch(error => {
          console.log('[PAYWALL] User closed paywall or already has subscription');
        });
      }, 800); // 800ms задержка перед показом
    }

    // Проверка триала
    if (userInfo.trial) {
      const trialEnd = new Date(userInfo.trial.expiresAt);
      const now = new Date();
      const daysRemaining = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
      
      if (daysRemaining > 0) {
        console.log(`[PAYWALL] Trial active: ${daysRemaining} days remaining`);
        document.body.classList.add('paywall-trial-active');
      }
    }

  } catch (error) {
    // Пользователь не авторизован
    if (error.message && (error.message.includes('401') || error.message.includes('Unauthorized'))) {
      console.log('[PAYWALL] User not authenticated');
      document.body.classList.add('paywall-not-authenticated');
      
      // Показываем пейволл для новых пользователей (авторизация + покупка)
      setTimeout(() => {
        window.paywall.open().catch(err => {
          console.log('[PAYWALL] User skipped authentication');
        });
      }, 1000); // 1 секунда задержка для первого показа
    } else {
      console.error('[PAYWALL] Error checking user status:', error);
    }
  }

  // Добавляем глобальную функцию для ручного открытия пейволла
  window.openPaywall = function() {
    return window.paywall.open();
  };

  // Добавляем функцию для проверки подписки перед действием
  window.requirePremium = async function() {
    try {
      const userInfo = await window.paywall.getUser();
      
      if (userInfo.paid) {
        return true;
      } else {
        // Показать пейволл и дождаться покупки
        try {
          await window.paywall.open({ resolveEvent: 'success-purchase' });
          return true;
        } catch (error) {
          return false;
        }
      }
    } catch (error) {
      // Не авторизован - показать пейволл
      try {
        await window.paywall.open({ resolveEvent: 'signed-in' });
        return window.requirePremium(); // Повторить проверку
      } catch (authError) {
        return false;
      }
    }
  };

})();
