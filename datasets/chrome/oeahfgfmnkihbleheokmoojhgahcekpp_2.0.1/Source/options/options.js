function SettingsSave(e) {
  if (e) {
    e.preventDefault()
    chrome.storage.local.set({
      settings: {
        path: 'ADD TORRENT',

        SelectPort:
          'http://localhost:' +
          document.querySelector('#SelectPort').value +
          '/gui/',
        UserName: document.querySelector('#UserName').value,
        UserPass: document.querySelector('#UserPass').value,
      },
    })
  }
}

function RightMenus() {
  chrome.storage.local.get('settings', ({ settings }) => {
    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        id: 'ADD TORRENT',
        title: 'ADD TORRENT',
        contexts: ['link'],
      })
    })
  })
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

  function onError(error) {
    console.log(`Error: ${error}`)
  }

  chrome.storage.local.get('settings', setCurrentChoice)
}

document.getElementById('SelectPort').addEventListener('blur', SettingsSave)
document.getElementById('UserName').addEventListener('blur', SettingsSave)
document.getElementById('UserPass').addEventListener('blur', SettingsSave)

RightMenus()
