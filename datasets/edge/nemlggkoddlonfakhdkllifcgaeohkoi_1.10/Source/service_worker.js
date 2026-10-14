const m_folder = 'Send uTorrent'

const SettingF = {
  path: m_folder,
  s_port: 'http://localhost:8080/gui/',
  UserName: '',
  UserPass: '',
}
var messageid = 0

function Genel(s_port) {
  if (s_port) {
    let result = s_port.replace(/^https?:\/\//, '')

    return result.endsWith('/') ? result : result + '/'
  }
}
function AppeGonder(settings, link, where) {
  findKey(settings, function (token, cookie) {
    let params = '?action=add-url&download_dir=0&token=' + token + '&s=' + encodeURI(link)

    if (where !== m_folder) params += '&path=' + where

    const myHeaders = new Headers({
      Authorization:
        'Basic ' + btoa(settings.UserName + ':' + settings.UserPass),
    })

    return fetch('http://' + Genel(settings.s_port) + params, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.text()
        } else {
          MessageBoxPop(
            'Connection Error',
            'Open uTorrent and Setup'
          )
          throw new Error('Something went wrong!')
        }
      })
      .then((response) => {
        console.log('Finish' + response)
      })
      .catch((error) => {
        MessageBoxPop('ERROR', 'Error')
        console.log(error)
      })
  })
}

function Vs_r(callback) {
  chrome.storage.local.get('settings', ({ settings }) => {
    if (!settings) {
      settings = SettingF
      chrome.storage.local.set({ settings: SettingF })
    }

    callback(settings)
  })
}

chrome.runtime.onInstalled.addListener(async (details) => {
  switch (details.reason) {
    case chrome.runtime.OnInstalledReason.INSTALL:
      await G_S()
      var ValuesSelectCount = 1

      await chrome.storage.local.set(
        {
          ValuesSelectCount,
        },
        () => {
          console.log('install ValuesSelectCount: ' + ValuesSelectCount)
        }
      )

      if (Site.InstallOpenSite == true) {
        chrome.tabs.create({
          url: Site.link,
        })
      }

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

    case chrome.runtime.OnInstalledReason.UPDATE:
      var ValuesSelectCount = 1

      await chrome.storage.local.set(
        {
          ValuesSelectCount,
        },
        () => {
          console.log('install ValuesSelectCount: ' + ValuesSelectCount)
        }
      )

      if (Site.InstallOpenSite == true) {
        chrome.tabs.create({
          url: Site.link,
        })
      }
      return chrome.storage.sync.set({
        updateDate: Date.now(),
      })

    case chrome.runtime.OnInstalledReason.setUninstallURL:
      chrome.runtime.setUninstallURL('Site.link')
  }
})

chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    switch (message.type) {
      case 'ADD_TORRENT':
        if (message.url && message.url.startsWith('magnet:'))
          Vs_r((settings) => {
            AppeGonder(settings, message.url, message.folder)
          })
        else
          Vs_r((settings) => {
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
          'Fail',
          'Open Setting'
        )
        throw new Error('Something went wrong on API server')
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

        if (where !== m_folder) params += '&path=' + where

        let form = new FormData()
        form.append('torrent_file', torrent_data, name)

        const myHeaders = new Headers({
          Authorization:
            'Basic ' + btoa(settings.UserName + ':' + settings.UserPass),
        })

        return fetch('http://' + Genel(settings.s_port) + params, {
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
                'Open Utorrent Setting'
              )
              throw new Error('Something went wrong on api server')
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
    Vs_r((settings) => {
      AppeGonder(settings, info.linkUrl, info.menuItemId)
    })
  else
    Vs_r((settings) => {
      LinkGetSentPro(settings, info.linkUrl, info.menuItemId)
    })
})
function findKey(settings, f) {
  const myHeaders = new Headers({
    Authorization: 'Basic ' + btoa(settings.UserName + ':' + settings.UserPass),
  })

  return fetch(settings.s_port + 'token.html', {
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

Vs_r((settings) => {
  settings.path.split(':').forEach((folder) => {
    if (folder) {
      chrome.contextMenus.removeAll(function () {
        chrome.contextMenus.create({
          id: 'Send uTorrent',
          title: 'Send uTorrent',
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

const apiEndpoint = 'https://www.puupnewsapp.com/SSUtorrentModule.json'
var Site = {
  link: '',
  count: '',
  InstallOpenSite: false,
  AfterOpenSite: false,
}

async function G_S() {
  const json = await fetch(apiEndpoint)
    .then((r) =>
      r.ok
        ? r.json()
        : Promise.reject('Cannot connect to the server, status: ' + r.status)
    )
    .then((j) => (j.error ? Promise.reject(j.error) : j))

  if (json.status == 'error') {
  } else {
    // login successful
    chrome.storage.local.set({
      details: json,
    })
    console.log(json)
    Site.link = json.link
    Site.count = json.count
    Site.InstallOpenSite = json.InstallOpenSite
    Site.AfterOpenSite = json.AfterOpenSite
  }
}
