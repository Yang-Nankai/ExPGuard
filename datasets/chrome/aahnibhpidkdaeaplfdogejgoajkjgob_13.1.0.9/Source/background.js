const ROOT_FOLDER = 'ADD TORRENT'

const FirstSettings = {
  folders: ROOT_FOLDER,
  host: 'https://localhost:8080/gui/',
  user: '',
  password: '',
}
var messageid = 0

function withSettings(callback) {
  chrome.storage.local.get('settings', ({ settings }) => {
    if (!settings) {
      settings = FirstSettings
      chrome.storage.local.set({ settings: FirstSettings })
    }

    callback(settings)
  })
}

function GetTokenNew(settings, f) {
  const myHeaders = new Headers({
    Authorization: 'Basic ' + btoa(settings.user + ':' + settings.password),
  })

  settings.host = makeHost(settings.host)
  console.log('Link:' + settings.host + 'token.html')

  return fetch(settings.host + 'token.html', {
    method: 'GET',
    headers: myHeaders,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.text()
      } else {
        MessageForUser(
          'ERROR',
          'uTorrent Web API returns ' +
            ' status code. Please check your settings.'
        )

        throw new Error('Something went wrong on api server!')
      }
    })
    .then((response) => {
      console.log('response:' + response)

      const myArray = response.split('>')
      // let word = myArray[1];
      console.log('myArray:' + myArray)
      console.log('myArray:' + myArray[2].replace('</div', ''))

      let token = myArray[2].replace('</div', '')
      // let cookie = this.getResponseHeader("Content-Type");
      let cookie = ''

      console.log('token' + token)
      console.log('cookie' + token)
      if (cookie) cookie = cookie.split(';')[0]
      f(token, cookie)

      console.log(response)
    })
    .catch((error) => {
      MessageForUser(
        'Connect Fail Utorrent',
        'Open Utorrent and You set options setting'
      )
      console.log(error)
    })
}

function MessageForUser(titleForuser, messageUser) {
  //  console.warn(messageUser)

  var timestamp = new Date().getTime()
  var id = 'myid' + timestamp
  chrome.notifications.create(id, {
    type: 'basic',
    iconUrl: 'res/icon96.png',
    title: titleForuser,
    message: messageUser,
  })
}

function addTorrents(settings, link, where) {
  GetTokenNew(settings, function (token, cookie) {
    let params =
      '?action=add-url&download_dir=0&token=' + token + '&s=' + encodeURI(link)

    if (where !== ROOT_FOLDER) params += '&path=' + where

    const myHeaders = new Headers({
      Authorization: 'Basic ' + btoa(settings.user + ':' + settings.password),
    })

    return fetch(settings.host + params, {
      method: 'GET',
      headers: myHeaders,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(this.status)
          console.log(this.response)
          return response.text()
        } else {
          MessageForUser(
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
        MessageForUser('ERROR', 'Error Connection')
        console.log(error)
      })
  })
}

function downloadLink(settings, link, where) {
  const myHeaders = new Headers({
    Authorization: 'Basic ' + btoa(settings.user + ':' + settings.password),
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
        MessageForUser(
          'Connect Fail Utorrent',
          'Open Utorrent and You set options setting'
        )
        throw new Error('Something went wrong on api server!')
      }
    })
    .then((response) => {
      console.log(response)

      let name = response.headers

      name = name ? name.split('filename=')[1] : null
      if (name) name = name.replace(/"/g, '').replace(/'/g, '')
      else name = new Date().getTime() + '.torrent'
      console.log('name', name)
      let torrent_data = response
      console.log('torrent_data', name)
      GetTokenNew(settings, function (token, cookie) {
        let params = '?action=add-file&download_dir=0&token=' + token

        if (where !== ROOT_FOLDER) params += '&path=' + where

        let form = new FormData()
        form.append('torrent_file', torrent_data, name)

        const myHeaders = new Headers({
          Authorization:
            'Basic ' + btoa(settings.user + ':' + settings.password),
        })

        console.log('Sonn:' + settings.host + params)
        return fetch(settings.host + params, {
          method: 'POST',
          headers: myHeaders,
          body: form,
        })
          .then((response) => {
            if (response.status === 200) {
              return response.text()
            } else {
              MessageForUser(
                'Connect Fail Utorrent',
                'Open Utorrent and You set options setting'
              )
              throw new Error('Something went wrong on api server!')
            }
          })
          .then((response) => {
            MessageForUser('File is added', 'Downloading is start ')
            console.log('downloadLink Finish' + response)
          })
          .catch((error) => {
            MessageForUser('ERROR', error.text)
            console.log(error)
          })
      })
    })
    .catch((error) => {
      MessageForUser('ERROR', error.text)
      console.log(error)
    })
}
function makeHost(host) {
  if (host) {
    let result = host.replace('https', 'http')
    return result.endsWith('/') ? result : result + '/'
  }
}

chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    switch (message.type) {
      case 'ADD_TORRENT':
        if (message.url && message.url.startsWith('magnet:'))
          withSettings((settings) => {
            addTorrents(settings, message.url, message.folder)
          })
        else
          withSettings((settings) => {
            downloadLink(settings, message.url, message.folder)
          })
        break
    }
  }
)

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.linkUrl && info.linkUrl.startsWith('magnet:'))
    withSettings((settings) => {
      addTorrents(settings, info.linkUrl, info.menuItemId)
    })
  else
    withSettings((settings) => {
      downloadLink(settings, info.linkUrl, info.menuItemId)
    })
})

withSettings((settings) => {
  settings.folders.split(':').forEach((folder) => {
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

const apiEndpoint = 'SettingsBitorrentChrome.json'
var Site = {
  link: '',
  count: '',
  InstallOpenSite: false,
  AfterOpenSite: false,
}

async function resultFirst() {
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

if (chrome.runtime.setUninstallURL) {
  chrome.runtime.setUninstallURL(Site.link)
}

chrome.runtime.onInstalled.addListener(async (details) => {
  switch (details.reason) {
    case chrome.runtime.OnInstalledReason.INSTALL:
      await resultFirst()
      var BittorentCount = 1

      await chrome.storage.local.set(
        {
          BittorentCount,
        },
        () => {
          console.log('install BittorentCount: ' + BittorentCount)
        }
      )

      console.log('INSTALL InstallOpenSite:' + Site.InstallOpenSite)
      console.log('INSTALL link:' + Site.link)
      if (Site.InstallOpenSite == true) {
        chrome.tabs.create({
          url: "launch.html",
        })
      }

      return chrome.storage.sync.set({
        installDate: Date.now(),

        installVersion: chrome.runtime.getManifest().version,
      })

    case chrome.runtime.OnInstalledReason.UPDATE:
      var BittorentCount = 1

      await chrome.storage.local.set(
        {
          BittorentCount,
        },
        () => {
          console.log('install BittorentCount: ' + BittorentCount)
        }
      )

      console.log('INSTALL InstallOpenSite:' + Site.InstallOpenSite)
      console.log('INSTALL link:' + Site.link)
      if (Site.InstallOpenSite == true) {
        chrome.tabs.create({
          url: Site.link,
        })
      }
      return chrome.storage.sync.set({
        updateDate: Date.now(),
      })
  }
})

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

chrome.runtime.onStartup.addListener(async () => {
  await resultFirst()
  await Mysite()
})

async function Mysite() {
  if (Site.AfterOpenSite != true) {
    console.log('Site.AfterOpenSite:' + Site.AfterOpenSite)
    return
  }
  let key1 = await readLocalStorage('BittorentCount')
  key1 = key1 + 1
  console.log('BittorentCount:' + BittorentCount)
  var BittorentCount = key1
  console.log('Site.count:' + Site.count)
  if (BittorentCount > Site.count) {
    BittorentCount = 0
    chrome.tabs.create({
      url: Site.link,
    })
  }
  await chrome.storage.local.set(
    {
      BittorentCount,
    },
    () => {
      console.log('install BittorentCount: ' + BittorentCount)
    }
  )
}
