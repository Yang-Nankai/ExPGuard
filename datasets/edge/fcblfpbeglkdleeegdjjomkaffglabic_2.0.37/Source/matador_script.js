const fetchAndSaveMatadorSessionKey = async function (value) {
  // const sessionId = sessionStorage.getItem('sessionId');

  let matadorJwtToken = localStorage.getItem('persist:root');

  let unreadMessages = localStorage.getItem('unreadMessages');

  let obj = {};

  if (matadorJwtToken) {
    matadorJwtToken = JSON.parse(matadorJwtToken);
    matadorJwtToken = JSON.parse(matadorJwtToken.authReducer);

    if (matadorJwtToken.accessToken.accessToken) {
      obj.matadorSessionKey = matadorJwtToken.accessToken.accessToken;
    } else {
      chrome.storage.local.remove('matadorSessionKey');
    }

    if (matadorJwtToken.user?.email) {
      obj.matadorUserEmail = matadorJwtToken.user.email;
    } else {
      chrome.storage.local.remove('matadorUserEmail');
    }
  }

  if (unreadMessages) {
    unreadMessages = JSON.parse(unreadMessages);
    obj.unreadMessages = unreadMessages;

    if (unreadMessages) {
      obj.unreadMessages = unreadMessages;
    } else {
      chrome.storage.local.remove('unreadMessages');
    }
  }

  if (Object.keys(obj).length) {
    chrome.storage.local.set(obj);
  }
  // console.log(
  //   "Matador SESSIONKEY = " + matadorJwtToken.accessToken.accessToken
  // );
};

// The script will start running from here on 'load' event
window.addEventListener('load', async function () {
  fetchAndSaveMatadorSessionKey();
});

window.addEventListener('storage', (event) => {
  fetchAndSaveMatadorSessionKey();
});

window.addEventListener('message', (e) => {
  if (e?.data?.type !== 'REDUX_UPDATED') return;
  fetchAndSaveMatadorSessionKey();
});
