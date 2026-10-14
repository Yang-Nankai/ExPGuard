const getMatadorJwtToken = async function () {
  let result = await chrome.storage.local.get('matadorSessionKey');

  if (result) {
    return result['matadorSessionKey'];
  }
};

const getUnreadMessagesCount = async function () {
  const matadorJwtToken = await getMatadorJwtToken();

  if (matadorJwtToken) {
    const unreadCount = await fetch(
      `https://api.matador.ai/api/v1/messages/extension/conversations/state`,
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + matadorJwtToken,
        },
      }
    )
      .then(async (response) => {
        if (response.status === 401) {
          chrome.storage.local.remove('matadorSessionKey');
          return 0;
        }

        return (
          (await response.json()).logged_user_unread_conversations ||
          0
        );
      })
      .catch(() => 0);

    chrome.storage.local.set({ unreadMessages: unreadCount });
    return unreadCount;
  } else {
    chrome.storage.local.remove('unreadMessages');
  }
};

function toggleBadge(unreadCount) {
  let badgeText = '';

  if (unreadCount && unreadCount !== 0) {
    badgeText = unreadCount.toString();
  }

  chrome.action.setBadgeText({ text: badgeText });
  chrome.action.setBadgeTextColor({ color: '#FFFFFF' });
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
}

let isBlinking = false;
let unreadCount = 0;

async function updateBadge() {
  unreadCount = await getUnreadMessagesCount();
}

setInterval(() => updateBadge(), 15000);
setInterval(() => {
  if (isBlinking) {
    toggleBadge(unreadCount);
  } else {
    toggleBadge(0);
  }
  isBlinking = !isBlinking;
}, 500);
