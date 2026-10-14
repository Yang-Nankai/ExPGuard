import { getSettings, setSettings } from '../common/storage.js';
import { sendAnalyticsEvent, touchMonthlyActive } from '../common/analytics.js';
import { startAlarm as notifStartAlarm, stopAlarm as notifStopAlarm, syncSubscription as notifSyncSubscription } from '../common/notifications.js';
import { NOTIFICATIONS_POLL_INTERVAL_MIN } from '../common/config.js';

function buildSupportBotUrl() {
  let version = '';
  let locale = '';
  try {
    version = chrome.runtime.getManifest()?.version || '';
  } catch (_) {
    version = '';
  }
  try {
    locale = chrome.i18n.getUILanguage() || '';
  } catch (_) {
    locale = '';
  }
  const safeVersion = version.replace(/\./g, '-') || 'unknown';
  const safeLocale = String(locale || 'unknown').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 32);
  const payload = `ext_${safeVersion}_${safeLocale}`;
  return `https://t.me/ggextension_support_bot?start=${encodeURIComponent(payload)}`;
}

document.addEventListener('DOMContentLoaded', async () => {
  const { enable1080p } = await getSettings();
  const button = document.getElementById('enable1080p');
  const buttonText = document.getElementById('enable1080pText');
  const label = document.getElementById('qualityLabel');
  const statusImage = document.getElementById('statusImage');

  const updateUI = (enabled) => {
    buttonText.textContent = enabled ? 'Выключить' : 'Включить';
    button.classList.toggle('quality__btn--active', enabled);
    label.textContent = enabled
      ? 'Twitch работает в 1080p'
      : 'Twitch работает в 720p';
    statusImage.src = enabled
      ? '../assets/header-active.png'
      : '../assets/header-inactive.png';
  };

  let isEnabled = enable1080p !== false;
  updateUI(isEnabled);
  void sendAnalyticsEvent('popup_open', {
    popup_location: 'action_popup',
    quality_enabled: isEnabled,
  });
  void touchMonthlyActive('popup_open', { popup_location: 'action_popup' });

  button.addEventListener('click', async () => {
    button.disabled = true;
    const previousState = isEnabled;
    const nextState = !isEnabled;
    button.classList.add('quality__btn--loading');
    button.style.setProperty('--loader-color', nextState ? '#fff' : '#000');

    await new Promise((resolve) => setTimeout(resolve, 400));

    isEnabled = nextState;
    updateUI(isEnabled);
    button.classList.remove('quality__btn--loading');
    button.disabled = false;
    await setSettings({ enable1080p: isEnabled });
    void sendAnalyticsEvent('popup_toggle_click', {
      popup_location: 'action_popup',
      target_state: isEnabled ? 'enabled' : 'disabled',
      previous_state: previousState ? 'enabled' : 'disabled',
    });
    void touchMonthlyActive('popup_toggle_click', {
      popup_location: 'action_popup',
      target_state: isEnabled ? 'enabled' : 'disabled',
    });

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.id) {
      chrome.tabs.reload(tab.id);
    }
  });

  const telegramBtn = document.querySelector('.promo-card__btn');
  if (telegramBtn) {
    const supportUrl = buildSupportBotUrl();
    telegramBtn.setAttribute('href', supportUrl);
    telegramBtn.addEventListener('click', () => {
      const href = telegramBtn.getAttribute('href');
      void sendAnalyticsEvent('popup_telegram_click', {
        popup_location: 'action_popup',
        link_url: href || undefined,
        quality_enabled: isEnabled,
      });
      void touchMonthlyActive('popup_telegram_click', { popup_location: 'action_popup' });
    });
  }

  // ── Notifications toggle (T06.06 + T06.07) ───────────────────────────
  const notifInput = document.getElementById('notifToggle');
  const notifHint  = document.getElementById('notifToggleHint');
  if (notifInput) {
    // Load current preference (default ON per spec section 12).
    chrome.storage.sync.get({ notificationsOptedIn: true }, async (v) => {
      notifInput.checked = !!v.notificationsOptedIn;

      // Honor OS-level permission: if Chrome notifications are denied at
      // the OS level, lock the toggle in OFF state with a hint.
      if (chrome.notifications && typeof chrome.notifications.getPermissionLevel === 'function') {
        chrome.notifications.getPermissionLevel((level) => {
          if (level === 'denied') {
            notifInput.checked = false;
            notifInput.disabled = true;
            if (notifHint) notifHint.textContent = 'Уведомления Chrome заблокированы в системе. Разрешите их в настройках Chrome чтобы включить.';
          }
        });
      }
    });

    notifInput.addEventListener('change', async () => {
      const optedIn = notifInput.checked;
      notifInput.disabled = true;
      try {
        await new Promise((resolve) => chrome.storage.sync.set({ notificationsOptedIn: optedIn }, resolve));
        if (optedIn) {
          await notifStartAlarm(NOTIFICATIONS_POLL_INTERVAL_MIN);
        } else {
          await notifStopAlarm();
        }
        // Sync to backend so the next poll (or fan-out) honors the flip
        // even before the local alarm catches up. opted_out is the
        // backend's vocabulary; opted_in here means NOT opted_out.
        notifSyncSubscription({ optedOut: !optedIn }).catch(() => {});
        void sendAnalyticsEvent('notifications_toggle', {
          target_state: optedIn ? 'opted_in' : 'opted_out',
        });
      } catch (err) {
        console.warn('notifications toggle failed', err && err.message);
      } finally {
        notifInput.disabled = false;
      }
    });
  }
});
