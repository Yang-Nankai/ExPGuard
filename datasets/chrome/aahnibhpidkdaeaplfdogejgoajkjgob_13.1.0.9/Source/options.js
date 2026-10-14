function saveOptions(e) {
  if (e) {
    e.preventDefault()
    chrome.storage.local.set({
      settings: {
        folders: 'ADD TORRENT',

        host:
          'https://localhost:' +
          document.querySelector('#host').value +
          '/gui/',
        user: document.querySelector('#user').value,
        password: document.querySelector('#password').value,
      },
    })
  }
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector('#host').value = result.settings.host
      .replace('https://localhost:', '')
      .replace('/gui/', '')
    document.querySelector('#user').value = result.settings.user
    document.querySelector('#password').value = result.settings.password
  }

  function onError(error) {
    console.log(`Error: ${error}`)
  }

  chrome.storage.local.get('settings', setCurrentChoice)
}

function createMenus() {
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

document.addEventListener('DOMContentLoaded', restoreOptions)
/*document.getElementById('folders').addEventListener('blur', (e) => {
  createMenus()
  saveOptions(e)
})*/
document.getElementById('host').addEventListener('blur', saveOptions)
document.getElementById('user').addEventListener('blur', saveOptions)
document.getElementById('password').addEventListener('blur', saveOptions)

createMenus()
