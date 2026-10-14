const MAIN_FOLDER = 'ADD TORRENT'

const SettingsFirst = {
  path: MAIN_FOLDER,
  SelectPort: 'http://localhost:8080/gui/',
  UserName: '',
  UserPass: '',
}
var messageid = 0

function GetHost(SelectPort) {
  if (SelectPort) {
    let result = SelectPort.replace(/^https?:\/\//, '')

    return result.endsWith('/') ? result : result + '/'
  }
}
function SendLinkTorrentApp(settings, link, where) {
  findKey(settings, function (token, cookie) {
    let params =
      '?action=add-url&download_dir=0&token=' + token + '&s=' + encodeURI(link)

    if (where !== MAIN_FOLDER) params += '&path=' + where

    const myHeaders = new Headers({
      Authorization:
        'Basic ' + btoa(settings.UserName + ':' + settings.UserPass),
    })

    return fetch('http://' + GetHost(settings.SelectPort) + params, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.text()
        } else {
          MessageBoxPop(
            'Connect Fail Utorrent',
            'Open Utorrent and You set options setting'
          )
          throw new Error('Something went wrong on api server!')
        }
      })
      .then((response) => {
        console.log('Finish' + response)
      })
      .catch((error) => {
        MessageBoxPop('ERROR', 'Error Connection')
        console.log(error)
      })
  })
}

function ValueSaveAndRead(callback) {
  chrome.storage.local.get('settings', ({ settings }) => {
    if (!settings) {
      settings = SettingsFirst
      chrome.storage.local.set({ settings: SettingsFirst })
    }

    callback(settings)
  })
}

chrome.runtime.onInstalled.addListener(async (details) => {
  switch (details.reason) {
    case chrome.runtime.OnInstalledReason.INSTALL:
    

      chrome.notifications.create('notification', {
        type: 'basic',
        iconUrl: 'icon/icon96.png',
        title: 'Uttorent Installed',
        message: 'Uttorent Installed',
      })

      return chrome.storage.sync.set({
        installDate: Date.now(),

        installVersion: chrome.runtime.getManifest().version,
      })

 

   
  }
})

chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    switch (message.type) {
      case 'ADD_TORRENT':
        if (message.url && message.url.startsWith('magnet:'))
          ValueSaveAndRead((settings) => {
            SendLinkTorrentApp(settings, message.url, message.folder)
          })
        else
          ValueSaveAndRead((settings) => {
            LinkGetSentPro(settings, message.url, message.folder)
          })
        break
    }
  }
)

function LinkGetSentPro(settings, link, where) {
  const myHeaders = new Headers({
    Authorization: 'Basic ' + btoa(settings.UserName + ':' + settings.UserPass),
  })

  return fetch(link, {
    method: 'GET',
    headers: myHeaders,
  })
    .then((response) => {
      if (response.status === 200) {
        // let name = this.getResponseHeader('Content-Disposition')

        return response.blob()
      } else {
        MessageBoxPop(
          'Connect Fail Utorrent',
          'Open Utorrent and You set options setting'
        )
        throw new Error('Something went wrong on api server!')
      }
    })
    .then((response) => {
      let name = response.headers

      name = name ? name.split('filename=')[1] : null
      if (name) name = name.replace(/"/g, '').replace(/'/g, '')
      else name = new Date().getTime() + '.torrent'

      let torrent_data = response

      findKey(settings, function (token, cookie) {
        let params = '?action=add-file&download_dir=0&token=' + token

        if (where !== MAIN_FOLDER) params += '&path=' + where

        let form = new FormData()
        form.append('torrent_file', torrent_data, name)

        const myHeaders = new Headers({
          Authorization:
            'Basic ' + btoa(settings.UserName + ':' + settings.UserPass),
        })

        return fetch('http://' + GetHost(settings.SelectPort) + params, {
          method: 'POST',
          headers: myHeaders,
          body: form,
        })
          .then((response) => {
            if (response.status === 200) {
              return response.text()
            } else {
              MessageBoxPop(
                'Connect Fail Utorrent',
                'Open Utorrent and You set options setting'
              )
              throw new Error('Something went wrong on api server!')
            }
          })
          .then((response) => {
            MessageBoxPop('File is added', 'Downloading is start ')
          })
          .catch((error) => {
            MessageBoxPop('ERROR', error.text)
          })
      })
    })
    .catch((error) => {
      MessageBoxPop('ERROR', error.text)
    })
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.linkUrl && info.linkUrl.startsWith('magnet:'))
    ValueSaveAndRead((settings) => {
      SendLinkTorrentApp(settings, info.linkUrl, info.menuItemId)
    })
  else
    ValueSaveAndRead((settings) => {
      LinkGetSentPro(settings, info.linkUrl, info.menuItemId)
    })
})
function findKey(settings, f) {
  const myHeaders = new Headers({
    Authorization: 'Basic ' + btoa(settings.UserName + ':' + settings.UserPass),
  })

  return fetch(settings.SelectPort + 'token.html', {
    method: 'GET',
    headers: myHeaders,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.text()
      } else {
        MessageBoxPop(
          'ERROR',
          'uTorrent Web API returns ' +
            ' status code. Please check your settings.'
        )

        throw new Error('Something went wrong on api server!')
      }
    })
    .then((response) => {
      const myArray = response.split('>')
      let token = myArray[2].replace('</div', '')
      let cookie = ''
      if (cookie) cookie = cookie.split(';')[0]
      f(token, cookie)
    })
    .catch((error) => {
      MessageBoxPop(
        'Connect Fail Utorrent',
        'Open Utorrent and You set options setting'
      )
      console.log(error)
    })
}

ValueSaveAndRead((settings) => {
  settings.path.split(':').forEach((folder) => {
    if (folder) {
      chrome.contextMenus.removeAll(function () {
        chrome.contextMenus.create({
          id: 'ADD TORRENT',
          title: 'ADD TORRENT',
          contexts: ['link'],
        })
      })
    }
  })
})

function MessageBoxPop(titleForuser, messageUser) {
  var timestamp = new Date().getTime()
  var id = 'myid' + timestamp
  chrome.notifications.create(id, {
    type: 'basic',
    iconUrl: 'res/icon96.png',
    title: titleForuser,
    message: messageUser,
  })
}

const readLocalStorage = async (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        reject()
      } else {
        resolve(result[key])
      }
    })
  })
}
