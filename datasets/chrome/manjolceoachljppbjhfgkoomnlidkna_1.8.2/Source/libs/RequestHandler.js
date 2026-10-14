class RequestHandler {
  static domain
  static version


  static async req_auth(request, cb, sender) {
    if (!('tab' in sender) || isStopListed(sender.url)) {
      return
    }

    cm.set('progress', 0)
    cm.set('curBanner', 0)

    let _sendTimeout = (await ChromeStorage.get('_sendTimeout')) || 0
    if (!_sendTimeout || Date.now() >= _sendTimeout) {
      let post = {}

      if ('url' in sender) post['href'] = btoa(sender.url)

      let _sendCount = (await ChromeStorage.get('_sendCount')) || 0
      if (_sendCount > 9) _sendCount = 9

      ajax(
          'https://' + this.domain + '/ext-v2/auth?ver=' + this.version,
          post,
          async (d) => {
            d = JSON.parse(d)
            if ('token' in d) {
              _sendCount = 0
            } else {
              _sendTimeout = Date.now() + 30000 * ++_sendCount
            }

            ChromeStorage.set({ _sendCount, _sendTimeout })

            console.log('auth response:', d)
            chrome.tabs.sendMessage(sender.tab.id, { d: d })
          },
          () => {
            _sendTimeout = Date.now() + 30000 * ++_sendCount
            ChromeStorage.set({ _sendCount, _sendTimeout })
          }
      )
    }
  }

  static async req_init(request, cb, sender) {
    if (!('tab' in sender) || isStopListed(sender.url) || !request.token) {
      return
    }

    const task = await ChromeStorage.get('task');
    if (task) {
      return;
    }

    const curBanner = cm.get('curBanner')
    if (curBanner && curBanner.length > 1) {
      const d = JSON.parse(curBanner)
      if (d.adv && d.adv.length) {
        chrome.tabs.sendMessage(sender.tab.id, { d: d })
        return
      }
    }

    let post = { token: request.token }
    if ('url' in sender) post['href'] = btoa(sender.url)

    ajax('https://' + this.domain + '/ext/init?ver=' + this.version, post, (resp) => {
      const d = JSON.parse(resp)
      if (d.adv && d.adv.length) {
        cm.set('curBanner', resp, 300)
        cm.remove('progress')
      }
      chrome.tabs.sendMessage(sender.tab.id, { d })
    })
  }

  static async balance(request, cb, sender) {
    if (!('tab' in sender)) {
      return
    }

    cm.set('progress', 0)
    cm.set('curBanner', 0)

    let post = { token: request.token }
    if ('url' in sender) post['href'] = btoa(sender.url)

    ajax(
        'https://' + domain + '/ext/balance?ver=' + version,
        post,
        (d) => {
          d = JSON.parse(d)
          if ('balance' in d) chrome.tabs.sendMessage(sender.tab.id, { d: { user: d } })
          setTimeout(() => {
            chrome.tabs.sendMessage(sender.tab.id, { d: { init: 1 } })
          }, 3000)
        },
        () => {
          setTimeout(() => {
            chrome.tabs.sendMessage(sender.tab.id, { d: { init: 1 } })
          }, 3000)
        }
    )
  }

  static async isTabBusy(req, sendResponse) {
    let task = await ChromeStorage.get('task')

    if (task && task.stime < (new Date()).valueOf() - 1800000) {
      task = null;
      await ChromeStorage.set({task: null})
    }
    sendResponse({ yes: task !== null })
  }

  static async reset(req, sendResponse) {
    chrome.storage.local.clear()
    chrome.storage.sync.clear()
    cm.set('private_policy_agree', 1, 86400 * 365)
    cm.remove('stopList')
    sendResponse({
      popup_notify: chrome.i18n.getMessage('extWasReseted'),
    })
  }

  static async icon(req) {
    chrome.action.setIcon({ path: req.icon })
  }

  static async badge(req) {
    // если больше 0 то устанавливаем бейдж с кол-вом на красном фоне, иначе удаляем бейдж
    if (req.badge > 0) setBadge(req.badge, '#dd0000')
    else setBadge('')
  }

  static async loadCaptImg(req, sendResponse) {
    req = req.loadCaptImg;
    loadCaptImg(req.token, req.lang ,req.width, req.height,
        function (resp) {
          ChromeStorage.set({captImg: resp})
          sendResponse({ captImg: 1 })
        })
  }

  static async captcha_solved(req) {
    visitDone({
      secaptcha_token: req.captcha_solved.token,
      secaptcha_val: req.captcha_solved.value,
    })
  }

  static async visit_start(req) {
    // создаем вкладку с ключем в параметрах
    chrome.tabs.create({
      url: 'https://' + ('domain' in req ? req.domain : this.domain +'/loader.html?') + 'vsid=' + req.visit_start,
    })
  }

  static async ajax(request) {
    if ('args' in request.ajax && 'handl' in request.ajax && 'errf' in request.ajax)
      ajax(request.ajax.adr, request.ajax.args, request.ajax.handl, request.ajax.errf)
    else if ('args' in request.ajax && 'handl' in request.ajax)
      ajax(request.ajax.adr, request.ajax.args, request.ajax.handl)
    else if ('args' in request.ajax) ajax(request.ajax.adr, request.ajax.args)
    else ajax(request.ajax.adr)
  }

  static async video_rated(request, cb, sender) {
    if (!('tab' in sender)) {
      return
    }

    const video_rated = await ChromeStorage.get('video_rated')
    if (!video_rated) {
      await ChromeStorage.set({ video_rated: true })
      ajax('https://' + this.domain + '/ext/video-rated?ver=' + this.version + '&bid=' + request.video_rated, null, (d) => {
        chrome.tabs.sendMessage(sender.tab.id, { d: JSON.parse(d) })
      })
    }
  }

}
