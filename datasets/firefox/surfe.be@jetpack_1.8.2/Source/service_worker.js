if (!('browser_specific_settings' in chrome.runtime.getManifest())) {
  importScripts('./libs/CommonMemory.js', './libs/ChromeStorage.js', './libs/functions.js', './libs/RequestHandler.js')
}

const cm = new CommonMemory()
const version = chrome.runtime.getManifest().version.replace(/\./g, '')
const domain = 'surfe.be'
// const domain = 'loc.surfe.be';
RequestHandler.domain = domain;
RequestHandler.version = version;

let timer_check

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log(sender, request)

  if (!verifiedSender(sender)) return

  for(let fname in request) {
    if (request.hasOwnProperty(fname)
        && fname in RequestHandler
        && typeof RequestHandler[fname] === 'function') {
      RequestHandler[fname](request, sendResponse, sender);
    }
  }
})

chrome.webNavigation.onCompleted.addListener(function (e) {
  const link = parseURL(e.url)

  console.log('webNavigation.onCompleted', link, e);
  if (link.search.vsid)
    visitStart(link.search.vsid, e.tabId)
})

chrome.webNavigation.onBeforeNavigate.addListener(async (nav) => {
  // console.log('webNavigation.onBeforeNavigate', task, nav.url);
  // let task = await ChromeStorage.get('task')

  /*
  if (task && task.active == false && nav.frameId == 0) {
    const navurl = parseURL(nav.url)
    const taskurl = parseURL(task.url)

    if (navurl.host == taskurl.host) {
      task.active = true
      task.client = false
      taskTimer()
    }
  }
  */

  // if (task) await ChromeStorage.set({ task })
})

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == 'install') {
    chrome.tabs.create({
      url: 'https://' + domain + '/goal_installed',
    })
  } else if (details.reason == 'update') {
    let thisVersion = chrome.runtime.getManifest().version
  }
})

chrome.runtime.setUninstallURL('https://' + domain + '/goal_uninstalled')

const visitStart = async (vsid, tabId) => {
  await ChromeStorage.set({ flag_visitDone: 0 })

  const endpoint = 'https://' + domain + '/ext-v2/task-start?ver=' + version + '&vsid=' + vsid

  const visitStartHandler = async (visit) => {
    visit = JSON.parse(visit)
    if (visit.error) {
      console.log(visit.error)
      //   alert(visit.error_msg)
      //chrome.tabs.remove(tabId)
      return;
    }

    const task = {
      active: true,
      client: false,
      finalization: false,
      key: visit.key,
      bid: visit.bid,
      url: visit.url,
      type: visit.type,
      timer: visit.time,
      captcha: visit.captcha,
      tabId: tabId,
      ttl: visit.ttl,
      stime: new Date().valueOf(),
      ...(visit.type === 6 && {
        yid: visit.yid,
        sht: visit.sht || false,
        flow: visit.flow || false,
        isInViewport: true,
        paused: false,
        muted: false,
        readyState: 1,
        loaded: false,
      }),
    }

    await ChromeStorage.set({ task, ...(task.type === 6 && { video_rated: false }) })
    console.log(task)
    chrome.tabs.update(tabId, { url: task.url })

  }

  ajax(endpoint, null, visitStartHandler, () => {
    // chrome.tabs.remove(tabId)
  })
}

const taskTimer = async () => {
  if (timer_check) clearTimeout(timer_check)

  let task = await ChromeStorage.get('task')

  if (task && task.active === true)
    chrome.tabs.get(task.tabId, async (tab) => {
      if (chrome.runtime.lastError) {
        onVisitFinish()
        // alert(chrome.i18n.getMessage('visitClosed'))
        return
      }

      if (typeof tab !== 'object') {
        console.error('tab is not object')
        return
      }

      if (task.type === 6) {
        chrome.tabs.sendMessage(tab.id, { check_viewport: true }, async (resp) => {
          if (resp) {
            if ('viewport' in resp) task.isInViewport = resp.viewport
            if ('paused' in resp) task.paused = resp.paused
            if ('muted' in resp) task.muted = resp.muted
            if ('readyState' in resp) task.readyState = resp.readyState
            if ('video_rate' in resp) await ChromeStorage.set({ video_rated: true })
            if ('setTypeVisit' in resp) task.type = 5

            if ('sht' in task && task.sht) task.isInViewport = true;
            if ('flow' in task && task.flow) {
              task.muted = false;
              // task.paused = false;
            }

            await ChromeStorage.set({ task })
          }
        })
      }

      if (!task.loaded) {
        let notify = {
          type: 'msg',
          title: chrome.i18n.getMessage('pageLoading'),
          msg: chrome.i18n.getMessage('pageLoadingMsg'),
        }

        if (tab.status === 'complete') {
          task.loaded = true
          await ChromeStorage.set({ task })
        }
        if (task.type === 6 && new RegExp(task.yid).test(tab.url)) {
          // если воспроизведение уже началось, то loaded = true
          if (task.readyState === 4) {
            task.loaded = true
            await ChromeStorage.set({ task })
          }
        }

        if (task.type === 5) {
          // если загрузка длится 30 секунд, то loaded = ture
          // отправляем жалобу на медленную загрузку страницы
          if (new Date().valueOf() > task.stime + 20000) {
            task.loaded = true
            await ChromeStorage.set({ task })
          }

          if (new Date().valueOf() > task.stime + 15000) {
            notify = {
              type: 'msg',
              title: chrome.i18n.getMessage('pageLoadingLong'),
              msg: chrome.i18n.getMessage('pageLoadingLongMsg'),
            }
          }
        }

        chrome.tabs.sendMessage(tab.id, { notify: notify })
        return
      }

      if (!task.client && task.timer < 3) {
        chrome.tabs.sendMessage(tab.id, { ping: 1 }, async (resp) => {
          console.log('ping resp:', resp)

          if (resp && resp.pong) {
            task.client = true
            await ChromeStorage.set({ task })
          }
        })
      }

      if (task.timer <= 0 && !task.finalization) {
        // сообщение о завершении задания
        chrome.tabs.sendMessage(tab.id, {
          notify: {
            type: 'no_ttl',
            msg: chrome.i18n.getMessage('visitDoneLoading'),
          },
        })

        console.log('task:', task)

        task.finalization = true
        await ChromeStorage.set({ task })

        if (task.captcha) {
          if (task.client) {
            chrome.tabs.sendMessage(task.tabId, {notify: {type: 'captsurfe'}})
          } else {
            // покажет капчу во всплывающем окне
            sendResp('/ext-v2/open-captcha?key=' + task.key)
          }
        } else {
          visitDone()
        }

        return
      }

      // страница загружена, таймер еще не кончился
      if (task.timer > 0)
      chrome.windows.get(tab.windowId, async (response) => {
        if (task.flow || (response.focused == true && tab.active == true)) {
          if (task.type === 6) {

            if (task.readyState == -15) {
              visitSkip()
              chrome.tabs.sendMessage(tab.id, {
                notify: {
                  type: 'msg',
                  title: chrome.i18n.getMessage('videoUnavailable'),
                  msg: chrome.i18n.getMessage('videoUnavailableMsg'),
                },
              })
              return
            }

            // покинул страницу
            if (!new RegExp(task.yid).test(tab.url)) {
              onVisitFinish()
              chrome.tabs.sendMessage(tab.id, {
                notify: {
                  type: 'msg',
                  title: chrome.i18n.getMessage('videoClosed'),
                  msg: chrome.i18n.getMessage('videoClosedMsg'),
                },
              })
              return
            }

            // видео остановлено
            if (task.paused) {
              chrome.tabs.sendMessage(tab.id, {
                notify: {
                  type: 'msg',
                  title: chrome.i18n.getMessage('videoPaused'),
                  msg: chrome.i18n.getMessage('videoPausedMsg'),
                },
              })
              setBadge(parseInt(task.timer), '#FA0')

              return
            }

            // выключен звук
            if (task.muted) {
              chrome.tabs.sendMessage(tab.id, {
                notify: {
                  type: 'msg',
                  title: chrome.i18n.getMessage('videoMuted'),
                  msg: chrome.i18n.getMessage('videoMutedMsg'),
                },
              })
              setBadge(parseInt(task.timer), '#FA0')

              return
            }

            // видео не видно
            if (!task.isInViewport) {
              chrome.tabs.sendMessage(tab.id, {
                notify: {
                  type: 'msg',
                  title: chrome.i18n.getMessage('videoViewport'),
                  msg: chrome.i18n.getMessage('videoViewportMsg'),
                },
              })
              setBadge(parseInt(task.timer), '#FA0')

              return
            }

            // видео грузится
            if (task.readyState < 4) {
              chrome.tabs.sendMessage(tab.id, {
                notify: {
                  type: 'msg',
                  title: chrome.i18n.getMessage('videoBuffering'),
                  msg: chrome.i18n.getMessage('videoBufferingMsg'),
                },
              })
              setBadge(parseInt(task.timer), '#FA0')

              return
            }
          }

          task.timer -= 0.5
          await ChromeStorage.set({ task })

          let left_sec = parseInt(task.timer)

          setBadge(left_sec, '#0af')

          let timerMsg = task.type === 6 ? 'videoDontClose' : 'visitDontClose'
          chrome.tabs.sendMessage(tab.id, {
            notify: {
              type: 'msg',
              title: chrome.i18n.getMessage(timerMsg) + left_sec + chrome.i18n.getMessage('sec'),
              msg: chrome.i18n.getMessage('visitWaitToComplite'),
            },
          })
        } else {
          setBadge(parseInt(task.timer), '#FA0')
        }
      })
    })

  timer_check = setTimeout(taskTimer, 500)
}


const visitDone = async (captcha_solve) => {
  const task = await ChromeStorage.get('task')
  sendResp('/ext-v2/task-complete?ver=' + version + '&key=' + task.key, captcha_solve)
}
const visitSkip = async () => {
  const task = await ChromeStorage.get('task')
  sendResp('/ext-v2/task-skip?ver=' + version + '&key=' + task.key)
}
const sendResp = async (url, captcha_solve) => {
  const flag_visitDone = await ChromeStorage.get('flag_visitDone')
  if (flag_visitDone !== 0) return

  await ChromeStorage.set({ flag_visitDone: 1 })
  const task = await ChromeStorage.get('task')

  const onError = async () => {
    let visit_retry = (await ChromeStorage.get('visit_retry')) || 0
    setTimeout(async () => {
      await ChromeStorage.set({ flag_visitDone: 0, visit_retry })
    }, 2000 * ++visit_retry)

    console.error(chrome.i18n.getMessage('connectionErrorRetry'))

    chrome.tabs.sendMessage(task.tabId, {
      notify: {
        type: 'no_ttl',
        msg: chrome.i18n.getMessage('connectionErrorRetry'),
      },
    })
  }

  ChromeStorage.set({captImg: null})

  ajax( 'https://' + domain + url, captcha_solve || null,
    async (d) => {
      try {
        d = JSON.parse(d)
      } catch (e) {
        console.error('JSON parsing error', e)
        onError()
        return
      }

      if (d.error) {
        // alert(d.error_msg)
        chrome.tabs.remove(task.tabId)
      } else if (d.open_captcha) {
        chrome.tabs.sendMessage(task.tabId, d)
      } else if (d.notify) {

        let req = {
          notify: d.notify,
        }

        if (task.type === 6) {
          const video_rated = await ChromeStorage.get('video_rated')
          if (video_rated) {
            if (req.notify.msg.indexOf('<sp>') > 0)
              req.notify.msg = req.notify.msg.substr(0, req.notify.msg.indexOf('<sp>'))
          } else req['video_rate'] = task.bid
        }
        chrome.tabs.sendMessage(task.tabId, req)


        if ('hint' in d.notify && d.notify.hint === 'wrong_img') {
          setTimeout(() => {
            chrome.tabs.sendMessage(task.tabId, {notify: {type: 'captsurfe'}})
          }, 1800)
          await ChromeStorage.set({ flag_visitDone: 0 })
          return;
        }
      }

      if (d.next) {
        setTimeout(function(){
          chrome.tabs.sendMessage(task.tabId, {
            notify: {
              type: 'msg',
              title: chrome.i18n.getMessage('flowNextTitle'),
              msg: chrome.i18n.getMessage('flowNextDesc'),
            },
          })
        },5000)

        setTimeout(function(){
          chrome.tabs.update(task.tabId, { url: d.next })
        },7000 + Math.random()*10000)
      }

      onVisitFinish()
    },
    onError
  )
}

const isStopListed = (url) => {
  let stopList = cm.get('stopList')
  if (!stopList) {
    ajax('https://' + domain + '/ext/get-stop-list?ver=' + version, null, function (resp) {
      console.log('STOP LIST: ', resp)
      cm.set('stopList', resp, 3600)
      stopList = JSON.parse(resp)
    })
    return true
  } else {
    stopList = JSON.parse(stopList)

    if ('hosts' in stopList) stopList.hosts.push('captcha.surfe.be')
    else stopList.hosts = ['captcha.surfe.be']

    if ('pages' in stopList) stopList.pages.push('surfe.be/ext/visit')
    else stopList.pages = ['surfe.be/ext/visit']
  }

  url = parseURL(url)
  if (stopList?.hosts.length && stopList.hosts.indexOf(url.host) > -1) {
    return true
  }

  return !!(stopList?.pages.length && stopList.pages.indexOf(url.urlnh) > -1);


}

setBadge('')
taskTimer()
