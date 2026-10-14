var account = {};

var requiredHostPermissions = {
  origins: ["https://*.wishlistr.com/"]
};

function save() {
  account.tags = document.getElementById('tags').checked;

  chrome.runtime.sendMessage(null, {type: 'set-userdata', data: account});

  var status = document.getElementById('status');
  status.innerText = 'Options saved.';
  setTimeout(function() {
    status.innerText = '';
  }, 1250);
}

function restore() {
  chrome.storage.sync.get(null, function(data) {
    account = data.accounts[0];
    document.getElementById('username').innerText = account.username;
    document.getElementById('tags').checked = account.tags;
  });
}

function changeUser() {
  chrome.permissions.request(requiredHostPermissions).then(function(hasRequiredHostPermissions) {
    if (hasRequiredHostPermissions) {
      chrome.runtime.sendMessage(null, {type: 'auth'});
    }
  });
}

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);
document.getElementById('change-user').addEventListener('click', changeUser);
