// Dark Mode Google Docs - Paywall integration

(function() {
    'use strict';

    const PAYWALL_ID = 704;
    let userIsPaid = false;

    // Создать кнопки в filter-settings
    function createPaywallButtons() {
        if (document.getElementById('paywall-buttons-container')) {
            return;
        }

        const container = document.createElement('div');
        container.id = 'paywall-buttons-container';
        container.innerHTML = `
            <button id="subscription-btn" class="paywall-link-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Subscription
            </button>
            <a href="https://appbox.space/paywall/${PAYWALL_ID}/customer-portal/get?tab=support" target="_blank" class="paywall-link-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                Support
            </a>
        `;
        return container;
    }

    // Обработчик клика по кнопке Subscription
    function handleSubscriptionClick() {
        if (userIsPaid) {
            // Оплаченный пользователь — открываем customer portal
            window.open(`https://appbox.space/paywall/${PAYWALL_ID}/customer-portal/get`, '_blank');
        } else {
            // Неоплаченный — открываем paywall (игнорируя триал)
            paywall.open({ consumeTrialOpen: false }).then(() => {
                // Успешная оплата
                userIsPaid = true;
                unblockUI();
            }).catch(e => {
                console.log('Paywall closed:', e?.visibility_status_reason);
                if (e?.visibility_status_reason === 'active-payment-found') {
                    userIsPaid = true;
                    unblockUI();
                } else if (e?.visibility_status_reason === 'country-not-match') {
                    // Страна не поддерживается — открываем customer portal
                    console.log('🌍 Country not supported, opening customer portal');
                    window.open(`https://appbox.space/paywall/${PAYWALL_ID}/customer-portal/get`, '_blank');
                }
            });
        }
    }

    // Добавить стили для кнопок и блокировки UI
    function addButtonStyles() {
        if (document.getElementById('paywall-buttons-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'paywall-buttons-styles';
        style.textContent = `
            #paywall-buttons-container {
                display: flex;
                gap: 0.375rem;
                margin-top: 0.5rem;
            }
            .paywall-link-btn {
                flex: 1;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 0.25rem;
                padding: 0.25rem 0.375rem;
                background-color: #141e24;
                color: #e8e6e3;
                border: 1px solid #3a5a6a;
                border-radius: 0.1875rem;
                font-family: "Open Sans", sans-serif;
                font-size: 0.625rem;
                text-decoration: none;
                cursor: pointer;
                transition: all 150ms ease;
                white-space: nowrap;
            }
            .paywall-link-btn:hover {
                background-color: #193945;
                border-color: #43b6dc;
                color: #ffffff;
            }
            .paywall-link-btn:active {
                background-color: #43b6dc;
                color: #0B2228;
            }
            .paywall-link-btn svg {
                flex-shrink: 0;
                opacity: 0.7;
                width: 12px;
                height: 12px;
            }
            .paywall-link-btn:hover svg {
                opacity: 1;
            }
            /* Keep buttons working when extension is disabled */
            .ext-disabled #paywall-buttons-container {
                opacity: 1;
                pointer-events: auto;
            }
            .ext-disabled #paywall-buttons-container .paywall-link-btn {
                pointer-events: auto;
            }
            
            /* Стили для заблокированного UI (триал истёк) */
            .paywall-blocked .header,
            .paywall-blocked .filter-settings > *:not(#paywall-buttons-container) {
                opacity: 0.4;
                pointer-events: none;
                user-select: none;
            }
            .paywall-blocked #paywall-buttons-container {
                opacity: 1;
                pointer-events: auto;
            }
            
            /* Paywall loader overlay */
            #paywall-loader {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(11, 34, 40, 0.95);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 1;
                transition: opacity 0.3s ease;
            }
            #paywall-loader.hidden {
                opacity: 0;
                pointer-events: none;
            }
            #paywall-loader.removed {
                display: none;
            }
            .paywall-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid #1e4a5a;
                border-top-color: #43b6dc;
                border-radius: 50%;
                animation: paywall-spin 1s linear infinite;
            }
            .paywall-loader-text {
                margin-top: 12px;
                color: #7cb8c9;
                font-size: 12px;
                font-family: "Open Sans", sans-serif;
            }
            @keyframes paywall-spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Создать и показать loader
    function showPaywallLoader() {
        if (document.getElementById('paywall-loader')) return;
        
        const loader = document.createElement('div');
        loader.id = 'paywall-loader';
        loader.innerHTML = `
            <div class="paywall-spinner"></div>
            <div class="paywall-loader-text">Loading...</div>
        `;
        document.body.appendChild(loader);
    }

    // Скрыть loader
    function hidePaywallLoader() {
        const loader = document.getElementById('paywall-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.classList.add('removed'), 300);
        }
    }

    // Заблокировать UI (триал истёк)
    function blockUI() {
        document.body.classList.add('paywall-blocked');
        console.log('%c 🔒 UI BLOCKED — waiting for payment or trial ', 'background: #7f1d1d; color: #fecaca; padding: 4px 8px; border-radius: 4px; font-weight: bold');
    }

    // Разблокировать UI (триал активен или оплачено)
    function unblockUI() {
        document.body.classList.remove('paywall-blocked');
        console.log('%c 🔓 UI UNLOCKED — access granted ', 'background: #14532d; color: #bbf7d0; padding: 4px 8px; border-radius: 4px; font-weight: bold');
    }

    // Показать кнопки управления подпиской
    function showPaywallButtons() {
        addButtonStyles();

        const checkInterval = setInterval(() => {
            const filterSettings = document.querySelector('.filter-settings');
            if (filterSettings) {
                clearInterval(checkInterval);
                const buttons = createPaywallButtons();
                if (buttons) {
                    filterSettings.appendChild(buttons);
                    
                    // Добавляем обработчик клика на кнопку Subscription
                    const subscriptionBtn = document.getElementById('subscription-btn');
                    if (subscriptionBtn) {
                        subscriptionBtn.addEventListener('click', handleSubscriptionClick);
                    }
                }
            }
        }, 100);

        setTimeout(() => clearInterval(checkInterval), 5000);
    }

    // Проверить статус пользователя
    async function checkUserStatus() {
        if (typeof paywall === 'undefined') {
            console.error('Paywall SDK not loaded');
            return { paid: false, isNewUser: false };
        }

        // Проверяем, новый ли это пользователь
        const { installDate } = await chrome.storage.sync.get('installDate');
        const isNewUser = !!installDate;

        try {
            const userInfo = await paywall.getUser();
            if (userInfo && userInfo.paid) {
                userIsPaid = true;
                return { paid: true, isNewUser };
            }
        } catch (error) {
            console.log('User not authorized');
        }

        return { paid: false, isNewUser };
    }

    // Показать информацию о триале в консоли
    async function logTrialInfo() {
        try {
            const trialInfo = await paywall.getTrialInfo();
            if (trialInfo && trialInfo.expirationEnd) {
                const remaining = trialInfo.expirationEnd - Date.now();
                if (remaining > 0) {
                    const hours = Math.floor(remaining / (1000 * 60 * 60));
                    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
                    
                    console.log('%c╔══════════════════════════════════════╗', 'color: #43b6dc');
                    console.log('%c║           ⏱️  TRIAL ACTIVE           ║', 'color: #43b6dc; font-weight: bold');
                    console.log('%c╠══════════════════════════════════════╣', 'color: #43b6dc');
                    console.log(`%c║  ⏳ Remaining: ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s            ║`, 'color: #4ade80');
                    console.log(`%c║  📅 Ends: ${new Date(trialInfo.expirationEnd).toLocaleString().padEnd(20)}   ║`, 'color: #fbbf24');
                    console.log('%c╚══════════════════════════════════════╝', 'color: #43b6dc');
                } else {
                    console.log('%c╔══════════════════════════════════════╗', 'color: #ef4444');
                    console.log('%c║           ⛔ TRIAL EXPIRED           ║', 'color: #ef4444; font-weight: bold');
                    console.log('%c╠══════════════════════════════════════╣', 'color: #ef4444');
                    console.log(`%c║  📅 Ended: ${new Date(trialInfo.expirationEnd).toLocaleString().padEnd(19)}   ║`, 'color: #f87171');
                    console.log('%c╚══════════════════════════════════════╝', 'color: #ef4444');
                }
            } else {
                console.log('%c ℹ️  No trial data available', 'color: #94a3b8');
            }
        } catch (e) {
            console.log('%c ℹ️  Trial not started yet', 'color: #94a3b8');
        }
    }

    // Главная функция инициализации
    async function init() {
        // 1. Сразу показываем кнопки ВСЕМ
        showPaywallButtons();

        // 2. Проверяем статус пользователя
        const { paid, isNewUser } = await checkUserStatus();

        console.log('%c╔══════════════════════════════════════╗', 'color: #8b5cf6');
        console.log('%c║         👤 USER STATUS               ║', 'color: #8b5cf6; font-weight: bold');
        console.log('%c╠══════════════════════════════════════╣', 'color: #8b5cf6');
        console.log(`%c║  ${isNewUser ? '🆕 NEW USER (has installDate)' : '👴 OLD USER (no installDate)'}      ║`, isNewUser ? 'color: #22d3ee' : 'color: #a3e635');
        console.log(`%c║  💳 Paid: ${paid ? 'YES ✅' : 'NO ❌'}                        ║`, paid ? 'color: #4ade80' : 'color: #f87171');
        console.log('%c╚══════════════════════════════════════╝', 'color: #8b5cf6');

        // 3. Логируем информацию о триале
        await logTrialInfo();

        // 4. Если пользователь оплатил — разблокируем и выходим
        if (paid) {
            console.log('%c 💳 USER IS PAID — full access ', 'background: #064e3b; color: #6ee7b7; padding: 4px 8px; border-radius: 4px; font-weight: bold');
            unblockUI();
            return;
        }

        // 5. Для новых неоплаченных пользователей — показываем loader и проверяем
        if (isNewUser) {
            // Показываем loader чтобы заблокировать взаимодействие
            showPaywallLoader();
            
            // 6. Вызываем paywall.open() — он определит статус триала
            try {
                await paywall.open(); // С триалом (consumeTrialOpen: true по умолчанию)
                // Если дошли сюда — пользователь оплатил через paywall
                userIsPaid = true;
                hidePaywallLoader();
                unblockUI();
            } catch (e) {
                const reason = e?.visibility_status_reason;
                console.log('%c PAYWALL RESULT: ' + reason + ' ', 'background: #1e3a5f; color: #7dd3fc; padding: 2px 6px; border-radius: 3px');
                
                // Скрываем loader после получения результата
                hidePaywallLoader();
                
                if (reason === 'active-payment-found') {
                    // Уже оплачено
                    console.log('%c ✅ Payment found! ', 'background: #14532d; color: #bbf7d0; padding: 2px 6px; border-radius: 3px');
                    userIsPaid = true;
                    unblockUI();
                } else if (reason === 'time-trial') {
                    // Триал активен — РАЗБЛОКИРУЕМ UI!
                    console.log('%c ✅ Trial is ACTIVE — unlocking UI ', 'background: #0f766e; color: #99f6e4; padding: 2px 6px; border-radius: 3px');
                    unblockUI();
                } else if (reason === 'country-not-match') {
                    // Страна не поддерживается — не блокируем, расширение работает как обычно
                    console.log('%c 🌍 Country not supported — full access granted ', 'background: #1e3a8a; color: #93c5fd; padding: 2px 6px; border-radius: 3px');
                    unblockUI();
                } else {
                    console.log('%c ⚠️ Paywall closed, UI stays blocked ', 'background: #78350f; color: #fde68a; padding: 2px 6px; border-radius: 3px');
                    blockUI();
                }
            }
        } else {
            // Старый пользователь — не блокируем, не показываем paywall
            console.log('%c 👴 OLD USER — no paywall, full access ', 'background: #365314; color: #d9f99d; padding: 4px 8px; border-radius: 4px; font-weight: bold');
        }
    }

    // Запуск после загрузки страницы
    window.addEventListener('load', function() {
        setTimeout(init, 300);
    });
    
})();
