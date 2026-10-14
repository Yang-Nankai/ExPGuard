function Menu() {
  chrome.storage.local.get('settings', ({ settings }) => {
    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        id: 'Send uTorrent',
        title: 'Send uTorrent',
        contexts: ['link'],
      })
    })
  })
}

function AyarlariKaydet(e) {
  if (e) {
    e.preventDefault()
    chrome.storage.local.set({
      settings: {
        path: 'Send uTorrent',

        SelectPort:
          'http://localhost:' + document.querySelector('#SelectPort').value + '/gui/',
        UserName: document.querySelector('#UserName').value,
        UserPass: document.querySelector('#UserPass').value,
      },
    })
  }
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector('#SelectPort').value =
      result.settings.SelectPort.replace('http://localhost:', '').replace(
        '/gui/',
        ''
      )
    document.querySelector('#UserName').value = result.settings.UserName
    document.querySelector('#UserPass').value = result.settings.UserPass
  }

  chrome.storage.local.get('settings', setCurrentChoice)
}

document.getElementById('SelectPort').addEventListener('blur', AyarlariKaydet)
document.getElementById('UserName').addEventListener('blur', AyarlariKaydet)
document.getElementById('UserPass').addEventListener('blur', AyarlariKaydet)

Menu()
