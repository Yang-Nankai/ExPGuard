var cm = new CommonMemory(),
  // _domain_ = 'loc.surfe.be',
  _domain_ = 'surfe.be',
  justroll = {
    state: 'loading',
    page: 'loading',
    token: null,
    version: chrome.runtime.getManifest().version.replace(/\./g, '_'),
    onfocus: false,
    infocus: true,
    progress: 0,
    track: false,
    animation: true,
    onpanel_balance: true,
    _d: null,
    tabId: 0,
    // captcha_check: false,
    notify_close_timer: false,
    inited_at: 0,
    vyData: null,

    tpl: {
      t1: {
        tag: 'span',
        id: 'jr-adv-${id}',
        class: 'jr-adv jr-t1',
        children: [
          {
            tag: 'i',
            class: 'jr-cls',
            'data-id': '${id}',
            title: chrome.i18n.getMessage('blockBanner'),
            html: '&times;',
          },
          {
            tag: 'a',
            target: '_blank',
            href: '//surfe.be/ext/click?id=${id}',
            html: '<img id="justroll-adv-img" alt="" src="//surfe.be/ext/banner?key=${key}" />',
          },
        ],
      },
      t2: {
        tag: 'span',
        id: 'jr-adv-${id}',
        class: 'jr-adv jr-t2',
        style:
          'width: 466px !important; height: 60px !important; border:1px solid #EBEBEB !important; background-color: rgb(245, 245, 245) !important;display: inline-block !important;position: relative !important; overflow: hidden !important;padding: 0 !important;',
        children: [
          {
            tag: 'i',
            class: 'jr-cls',
            'data-id': '${id}',
            title: chrome.i18n.getMessage('blockBanner'),
            html: '&times;',
          },
          {
            tag: 'a',
            target: '_blank',
            href: '//surfe.be/ext/click?id=${id}',
            style:
              '-webkit-flex: 1 0 auto !important;-ms-flex: 1 0 auto !important;flex: 1 0 auto !important;display: -webkit-flex !important;display: -ms-flexbox !important;display: flex !important;-webkit-flex-flow: row nowrap !important;-ms-flex-flow: row nowrap !important;flex-flow: row nowrap !important;overflow: hidden !important;min-height: inherit !important;box-sizing: border-box !important;-webkit-justify-content: flex-start !important;-ms-flex-pack: start !important;justify-content: flex-start !important;-webkit-align-items: center !important;-ms-flex-align: center !important;align-items: center !important;padding-right: 15px !important;padding-left: 1em !important;text-decoration: none !important;',
            children: [
              {
                tag: 'sbt',
                style:
                  'display: block !important; background: rgba(0, 0, 0, .1) top !important; background-size: cover !important; margin-right: 1em !important; margin-left: -1em !important; -webkit-align-self: normal !important; -ms-flex-item-align: normal !important; -ms-grid-row-align: normal !important; align-self: normal !important; background-image: url(${img}) !important; width: 75.43px !important; height: 58px !important; background-position: 50% 50% !important;',
              },
              {
                tag: 'sbt',
                style:
                  '-webkit-flex: .9 0 !important; -ms-flex: .9 0 !important; flex: .9 0 !important; box-sizing: content-box !important; color: inherit !important; font-size: inherit !important; font-weight: inherit !important; -webkit-hyphens: manual !important; -ms-hyphens: manual !important; hyphens: manual !important; display: block !important; visibility: visible !important; word-spacing: normal !important; text-align: left !important; text-indent: 0 !important; text-transform: none !important; font-variant: normal !important; letter-spacing: normal !important; line-height: normal !important; border-spacing: 0 !important; border-collapse: collapse !important;',
                children: [
                  {
                    tag: 'sbt',
                    style:
                      'padding: 0 1em .1em 0 !important; -webkit-flex: .9 0 !important; -ms-flex: .9 0 !important; flex: .9 0 !important; color: #2A3B65 !important; font-size: 15px !important; font-weight: 700 !important; line-height: 1.25em !important; display: block !important; font-family: arial, sans-serif, Helvetica, Arial, sans-serif !important; overflow-wrap: break-word !important; word-wrap: break-word !important; -webkit-hyphens: auto !important; -ms-hyphens: auto !important; hyphens: auto !important; text-decoration: none !important;',
                    html: '${title}',
                  },
                  {
                    tag: 'sbt',
                    style:
                      'color: #000 !important; font-size: 12.8px !important; line-height: normal !important; letter-spacing: normal !important; display: block !important; font-family: arial, sans-serif, Helvetica, Arial, sans-serif !important; overflow-wrap: break-word !important; word-wrap: break-word !important; -webkit-hyphens: auto !important; -ms-hyphens: auto !important; hyphens: auto !important; text-decoration: none !important;',
                    html: '${desc}',
                  },
                ],
              },
              {
                tag: 'sbt',
                style:
                  'font-size: 9px !important; right: 3px !important; bottom: 8px !important; position: absolute!important; font-family: Verdana, sans-serif !important; display: block !important; color: #000000 !important; text-align: center !important; line-height: 0px !important; letter-spacing: normal !important; -webkit-hyphens: auto !important; -ms-hyphens: auto !important; hyphens: auto !important; text-decoration: none !important;;',
                html: '${domain}',
              },
            ],
          },
        ],
      },
      ntf_visit: {
        tag: 'div',
        style: 'width: 100%;',
        children: [
          {
            tag: 'div',
            style:
              'font-weight: bold; font-size: 14px; line-height: 16px; color: #FFFFFF; margin-bottom: 4px; text-align: left;',
            html: '${title}',
          },
          {
            tag: 'div',
            class: 'notification_subtitle',
            style:
              'display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-align: center; text-align: left;\
          -ms-flex-align: center; align-items: center;font-size: 12px;line-height: 16px;color: rgb(189, 206, 255);',
            html: '${msg}',
          },
        ],
      },
      ntf_msg: {
        tag: 'div',
        style: 'display: flex; -webkit-box-align: center; align-items: center; height: 100%;',
        children: [
          {
            tag: 'div',
            style: 'width: 100%;',
            children: [
              {
                tag: 'div',
                style: 'font-weight: bold; font-size: 14px; line-height: 16px; color: #FFFFFF; margin-bottom: 4px;',
                html: '${title}',
              },
              {
                tag: 'div',
                class: 'notification_subtitle',
                style:
                  'display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-align: center;\
            -ms-flex-align: center; align-items: center;font-size: 12px;line-height: 16px;color: rgb(189, 206, 255);',
                html: '${msg}',
              },
            ],
          },
        ],
      },
      ntf_nottl: {
        tag: 'div',
        children: [
          {
            tag: 'div',
            style: 'margin:5px 0;font-size:16px;',
            html: '${msg}',
          },
        ],
      },
      ntf_video: {
        tag: 'div',
        children: [
          {
            tag: 'div',
            style: 'font-size:16px;font-weight:bold',
            html: '${title}',
          },
          {
            tag: 'span',
            children: [
              {
                tag: 'div',
                style: 'font-size:12px',
                html: '${msg}',
              },
              {
                tag: 'a',
                style: 'font-size:12px;maring:0;padding:0;color:#51afff;text-decoration:underline;border:0;',
                href: '${href}',
                target: '_blank',
                'data-ajaxe': 'false',
                html: '${link}',
              },
            ],
          },
        ],
      },
    },

    dispatcher: function (d) {
      if (d.user && 'uid' in d.user) cm.set('uid', d.user.uid, 3600)

      tracker.init()

      if (d.token) {
        chrome.storage.local.set(d)
        cm.set('token', d.token)
        justroll.init(d.token)
      }

      if (d.badge >= 0) {
        justroll.bg({ badge: d.badge })
        justroll._d.badge = -1
        if (justroll._d.adv && justroll._d.adv.length) 
          cm.set('curBanner', JSON.stringify(justroll._d), 300)
      }

      if (d.visits >= 0 && justroll.visits(d.visits)) {
        justroll._d.visits = -1
        if (justroll._d.adv && justroll._d.adv.length) 
          cm.set('curBanner', JSON.stringify(justroll._d), 300)
        return
      }

      if (d.notify) {
        justroll.notify(d.notify)
        justroll._d.notify = false
        return
      }

      if (d.adv) justroll.panel(d)
      else if (d.user && 'balance' in d.user) justroll.panel_balance(d)

      if (d.error) justroll.error(d)

      if (d.init) justroll.init()
    },

    // ask token
    auth: function () {
      if (!cm.get('private_policy_agree') && 'applications' in chrome.runtime.getManifest()) {
        console.error('Surfe.be ERROR: You must agree Privacy Policy')
        return
      }
      console.log('surfe.be auth()')

      chrome.runtime.sendMessage({ req_auth: 1 })
    },

    //
    init: function (token) {
      if (new Date().valueOf() - justroll.inited_at < 10000) return
      // console.log('surfe.be init()')

      if (token) justroll.token = token
      else if (justroll.token) token = justroll.token
      else {
        chrome.storage.local.get('token', function (d) {
          if (d.token) justroll.init(d.token)
          else justroll.auth()
        })
        return
      }

      if (!justroll.infocus) return

      if (cm.get('justroll-disabled')) {
        if ($('#justroll').length) $('#justroll').remove()
        return
      }

      if ($('#justroll-notify').length) return

      // if($('#justroll-captcha').length)
      //   $('#justroll-captcha').remove();

      if ($('#justroll-close_dialog').length) return

      justroll.animation = !cm.get('justroll-noamin')
      if ('applications' in chrome.runtime.getManifest()) justroll.animation = !justroll.animation

      justroll.onpanel_balance = !cm.get('justroll-nobal')
      justroll.inited_at = new Date().valueOf()

      chrome.runtime.sendMessage({ req_init: 1, token: token })
    },

    reinit: function () {
      setTimeout(() => {
        if (ifvisible.now()) justroll.init()
        else justroll.reinit()
      }, 30000)
    },

    error: function (d) {
      if (typeof d === 'string') d = { error: d }

      if (d.error === 'token_expired') {
        chrome.storage.local.remove('token')
        justroll.auth()
      }

      if (d.error === 'guest') justroll.guest()

      if (d.error === 'captcha') justroll.captcha(d)

      if (d.error === 'not_allowed') $('#justroll').remove()

      if (d.error === 'break_onfocus' && justroll.onfocus) {
        clearTimeout(justroll.onfocus)
        justroll.onfocus = false
      }
    },

    guest: function () {
      if ($('#justroll-guest').length) return

      var guest_node = $('<div>')
      guest_node.append($('<span>').attr('id', 'justroll-btn-signin').text(chrome.i18n.getMessage('signin')))

      justroll.notify({
        type: 'msg',
        guest: true,
        title: chrome.i18n.getMessage('unauthMsg'),
        msg: guest_node.html(),
      })

      $('#justroll-btn-signin').click(function () {
        justroll.notify_close()
        justroll.window_open('https://surfe.be/ext/direct-auth?ver=' + justroll.version.replace(/_/g, ''), 500, 500)
      })
    },

    window_open: function (url, width, height) {
      var top = screen.height / 2 - height / 2,
        left = screen.width / 2 - width / 2

      window.open(
        url,
        'targetWindow',
        'toolbar=no,\
                    location=no,\
                    status=no,\
                    menubar=no,\
                    scrollbars=yes,\
                    resizable=yes,\
                    left=' +
          left +
          ',\
                    top=' +
          top +
          ',\
                    width=' +
          width +
          ',\
                    height=' +
          height
      )
    },

    captcha: function () {
      justroll.notify({ type: 'captcha', src: 'https://' + _domain_ + '/ext/iframe/captcha' })
    },

    close_dialog: function (m) {
      $('#justroll-close_dialog').remove()
      var dialog_node
      if (!m) {
        dialog_node = $('<div>').attr('id', 'justroll-close_dialog')
        dialog_node.append(
          $('<div>')
            .attr('id', 'justroll-close_dialog-close')
            .attr('title', chrome.i18n.getMessage('hidePanel'))
            .html('&times;')
        )
        dialog_node.append(
          $('<div>')
            .addClass('jr-close_dialog-li')
            .attr('id', 'jr_cd-otw')
            .text(chrome.i18n.getMessage('hidePanel_onthiswebsite'))
        )
        dialog_node.append(
          $('<div>')
            .addClass('jr-close_dialog-li')
            .attr('id', 'jr_cd-otp')
            .text(chrome.i18n.getMessage('hidePanel_onthiswebpage'))
        )
        dialog_node.append(
          $('<div>')
            .addClass('jr-close_dialog-li')
            .attr('id', 'jr_cd-tt')
            .text(chrome.i18n.getMessage('hidePanel_temporary'))
        )
        $('body').append(dialog_node)

        $('#jr_cd-otw').click(function () {
          justroll.bg({
            ajax: {
              adr: 'https://' + _domain_ + '/ext/hide',
              args: { type: 1, val: location.host },
            },
          })
          justroll.close_dialog('ok')
        })
        $('#jr_cd-otp').click(function () {
          justroll.bg({
            ajax: {
              adr: 'https://' + _domain_ + '/ext/hide',
              args: { type: 2, val: location.href },
            },
          })
          justroll.close_dialog('ok')
        })
        $('#jr_cd-tt').click(function () {
          justroll.close_dialog('temp')
        })
        $('#justroll-close_dialog-close').click(function () {
          $('#justroll-close_dialog').remove()
        })
      }

      if (m === 'temp') {
        dialog_node = $('<div>').attr('id', 'justroll-close_dialog')
        dialog_node.append(
          $('<div>')
            .attr('id', 'justroll-close_dialog-close')
            .attr('title', chrome.i18n.getMessage('hidePanel'))
            .html('&times;')
        )
        dialog_node.append(
          $('<div>')
            .addClass('jr-close_dialog-li')
            .attr('id', 'jr_cd-tt_3h')
            .text(chrome.i18n.getMessage('hidePanel_tt_3h'))
        )
        dialog_node.append(
          $('<div>')
            .addClass('jr-close_dialog-li')
            .attr('id', 'jr_cd-tt_1h')
            .text(chrome.i18n.getMessage('hidePanel_tt_1h'))
        )
        dialog_node.append(
          $('<div>')
            .addClass('jr-close_dialog-li')
            .attr('id', 'jr_cd-tt_15m')
            .text(chrome.i18n.getMessage('hidePanel_tt_15m'))
        )
        $('body').append(dialog_node)

        $('#jr_cd-tt_3h').click(function () {
          cm.set('justroll-disabled', 1, 3600 * 3)
          justroll.close_dialog('temp_ok')
        })
        $('#jr_cd-tt_1h').click(function () {
          cm.set('justroll-disabled', 1, 3600)
          justroll.close_dialog('temp_ok')
        })
        $('#jr_cd-tt_15m').click(function () {
          cm.set('justroll-disabled', 1, 900)
          justroll.close_dialog('temp_ok')
        })
        $('#justroll-close_dialog-close').click(function () {
          $('#justroll-close_dialog').remove()
        })
      }

      if (m === 'temp_ok') {
        dialog_node = $('<div>').attr('id', 'justroll-close_dialog')
        dialog_node.append($('<div>').text(chrome.i18n.getMessage('hidePanel_temp_ok')))
        $('body').append(dialog_node)

        setTimeout(function () {
          $('#justroll-close_dialog').remove()
        }, 6000)
      }

      if (m === 'ok') {
        dialog_node = $('<div>').attr('id', 'justroll-close_dialog')
        dialog_node.append(chrome.i18n.getMessage('hidePanel_ok'))
        $('body').append(dialog_node)

        setTimeout(function () {
          $('#justroll-close_dialog').remove()
        }, 2000)
      }

      if (m === 'temp_ok' || m === 'ok') {
        cm.remove('curBanner')
        justroll.progress = 0
        cm.remove('stopList')
      }
    },

    panel: function (d) {
      if ($('#justroll-notify').length) return
      if ($('#justroll-captcha').length) $('#justroll-captcha').remove()

      if (!'adv' in d || !d.adv.length) {
        justroll.reinit()
        return
      }

      if (!$('#justroll').length) {
        justroll.nanobar = null
        var panel_top = cm.get('justroll_top'),
          panel_class = panel_top ? 'jr_top' : 'jr_bottom'
        if (justroll.animation) panel_class += ' anim'

        var panel_node = $('<div>').attr('id', 'justroll').addClass(panel_class)
        // close btn
        panel_node.append(
          $('<div>')
            .attr('id', 'justroll-panel-close')
            .attr('class', 'justroll-panel-btn')
            .attr('title', chrome.i18n.getMessage('hidePanel'))
            .html('&times;')
        )
        // position btn
        panel_node.append(
          $('<div>')
            .attr('id', 'justroll-panel-position')
            .attr('class', 'justroll-panel-btn')
            .attr('title', chrome.i18n.getMessage(panel_top ? 'panelbottom' : 'paneltop'))
            .html('&#10095;')
        )
        // FX btn
        panel_node.append(
          $('<div>')
            .attr('id', 'justroll-panel-anim')
            .attr('class', 'justroll-panel-btn')
            .attr('title', chrome.i18n.getMessage(justroll.animation ? 'animoff' : 'animon'))
            .text('FX')
        )
        // balance btn
        panel_node.append(
          $('<div>')
            .attr('id', 'justroll-panel-balbtn')
            .attr('class', 'justroll-panel-btn')
            .attr('title', chrome.i18n.getMessage('panel_show_balance'))
            .text('$')
        )

        panel_node.append(
          $('<div>')
            .attr('id', 'justroll-user-balance')
            .css('display', justroll.onpanel_balance ? 'block' : 'none')
            .append($('<span>').text('$ '))
            .append($('<span>').attr('id', 'justroll-user-balance-target').text(d.user.balance.toFixed(7)))
        )

        panel_node.append($('<div>').attr('id', 'justroll-adv'))
        panel_node.append(
          $('<div>')
            .attr('id', 'justroll-ver')
            .text('v. ' + justroll.version.replace(/_/g, '.'))
        )

        $('body').append(panel_node)

        $('#justroll-panel-close').click(function () {
          justroll.error('break_onfocus')
          $('#justroll').remove()
          justroll.close_dialog()
        })
        $('#justroll-panel-position').click(function () {
          justroll.error('break_onfocus')
          var panel_top = !cm.get('justroll_top')
          cm.set('justroll_top', panel_top)
          $('#justroll-panel-position').attr('title', chrome.i18n.getMessage(panel_top ? 'panelbottom' : 'paneltop'))
          $('#justroll')
            .removeAttr('class')
            .addClass(panel_top ? 'jr_top' : 'jr_bottom')
          if (justroll.animation) $('#justroll').addClass('anim')
        })
        $('#justroll-panel-anim').click(function () {
          if (justroll.animation) {
            $('#justroll').removeClass('anim')
            $(this).attr('title', chrome.i18n.getMessage('animon'))
          } else {
            $('#justroll').addClass('anim')
            $(this).attr('title', chrome.i18n.getMessage('animoff'))
          }

          if (cm.get('justroll-noamin')) cm.remove('justroll-noamin')
          else cm.set('justroll-noamin', 1, 86400 * 30)

          justroll.animation = !justroll.animation
        })
        $('#justroll-panel-balbtn').click(function () {
          if (justroll.onpanel_balance) {
            $('#justroll-user-balance').hide()
            cm.set('justroll-nobal', 1, 86400 * 30)
          } else {
            $('#justroll-user-balance').show()
            cm.remove('justroll-nobal')
          }

          justroll.onpanel_balance = !justroll.onpanel_balance
        })
      }

      if (!$('#jr-adv-' + d.adv[0].id).length) {
        $('.jr-adv').remove()

        for (var i in d.adv) {
          var ad = d.adv[i]
          $('#justroll-adv').json2html(ad, ad.tpl ? ad.tpl : justroll.tpl['t' + ad.type], { output: 'jquery' })
          if (ad.type === 0) {
            $('#justroll-adv')
              .children('*:last-child')
              .attr('id', 'jr-adv-' + String(parseInt(ad.id)))
              .data('key', ad.key)
              .addClass('jr-adv jr-t' + ad.type)
          }
        }
        $('#justroll-adv span').each(function () {
          $(this)
            .find('i.jr-cls')
            .click(function () {
              var id = $(this).data('id')
              $('#justroll').remove()
              justroll.close_dialog('ok')
              justroll.bg({
                ajax: {
                  adr: 'https://' + _domain_ + '/ext/hide',
                  args: { type: 3, val: id },
                },
              })
            })
        })
      }

      justroll.progress = parseInt(cm.get('progress') || 0)
    },

    panel_balance: function (d) {
      if (!$('#justroll-user-balance-target').length) return

      if (justroll.onpanel_balance && justroll.animation) {
        var ubal = new CountUp('justroll-user-balance-target', d.user.balance.toFixed(7), {
          startVal: parseFloat($('#justroll-user-balance-target').text()),
          decimalPlaces: 7,
          useGrouping: false,
          separator: '',
          decimal: '.',
        })
        if (!ubal.error) {
          ubal.start()
        } else {
          $('#justroll-user-balance-target').text(d.user.balance.toFixed(7))
          console.error(ubal.error)
        }
      } else $('#justroll-user-balance-target').text(d.user.balance.toFixed(7))
    },

    progressbar: function (v) {
      if ($('#justroll').length && !justroll.nanobar) {
        if (!$('#justroll-progressbar').length) $('#justroll').append($('<div>').attr('id', 'justroll-progressbar'))

        justroll.nanobar = new Nanobar({
          id: 'justroll-progressbar',
          className: 'justroll-progressbar',
          target: $('#justroll-progressbar')[0],
        })
      } else if ($('#justroll-adv').children('.jr-adv').length) {
        justroll.progress += (100 / 30) * v
        if (justroll.progress > 100) justroll.progress = 100
        justroll.nanobar.go(justroll.progress)

        cm.set('progress', justroll.progress)

        if (justroll.progress === 100) {
          if (justroll.token) chrome.runtime.sendMessage({ balance: 1, token: justroll.token })
          else justroll.init()
        }
      }
    },

    visits: function (cnt) {
      var crnt = cm.get('visits_cnt')
      cm.set('visits_cnt', cnt, 21600)

      // если стало больше чем было
      // то показываем уведомление
      if (crnt < cnt) {
        justroll.notify({
          type: 'visit',
          title: chrome.i18n.getMessage('visitsAvailable'),
          msg: chrome.i18n.getMessage('visitsClick'),
          autoclose: 5000,
        })

        return true
      }
    },

    notify: function (data) {

      //justroll.notify({type:'visit',title:'Доступно оплачиваемое посещение',msg:'<span>Нажмите на иконку</span><i id="sb-sm-ico"></i><span>расширения чтобы начать</span>'})

      var content = false;

      if (data.type === 'captcha') {
        content = $('<iframe>').attr({
          src: data.src,
          frameborder: '0',
          allowfullscreen: '',
          noscroll: '',
        })
      } else if (data.type === 'captsurfe') {
        content = $('<div>').attr({ id: 'captsurfe' });
      } else if (data.type === 'msg') {
        content = $('<div>').json2html(data, justroll.tpl.ntf_msg, { output: 'jquery' })
      } else if (data.type === 'visit') {
        content = $('<div>').json2html(data, justroll.tpl.ntf_visit, { output: 'jquery' })
      } else if (data.type === 'no_ttl') {
        content = $('<div>').json2html(data, justroll.tpl.ntf_nottl, {output: 'jquery'})
      } else if (data.type === 'video') {
        content = $('<div>').json2html(data.data, justroll.tpl.ntf_video, {output: 'jquery'})
      }

      if (!content) {
        return;
      }

      content = content.addClass('justroll-notify-msg')

      $('#justroll').remove()

      if ($('#justroll-notify').length) {
        $('#justroll-notify .justroll-notify-msg').replaceWith(content)
        if (!$('#justroll-notify').hasClass('show')) {
          $('#justroll-notify').addClass('show')
        }
      } else {
        var ntf_node
        if (data.type === 'visit') {
          ntf_node = $('<div>').attr('id', 'justroll-notify').addClass('a64j0wghk')

          ntf_node.html(
            DOMPurify.sanitize(
              '\
          <div id="sb-notification_close"></div>\
          <div id="sb-notification_ico">\
            <div id="sb-notification_number">1</div>\
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDkiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCA0OSA0OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjEyNDkyIDYuMTI1SDQyLjg3NDlDNDQuMDAyNSA2LjEyNSA0NC45MTY2IDcuMDM5MDkgNDQuOTE2NiA4LjE2NjY3VjQwLjgzMzNDNDQuOTE2NiA0MS45NjA5IDQ0LjAwMjUgNDIuODc1IDQyLjg3NDkgNDIuODc1SDYuMTI0OTJDNC45OTczNCA0Mi44NzUgNC4wODMyNSA0MS45NjA5IDQuMDgzMjUgNDAuODMzM1Y4LjE2NjY3QzQuMDgzMjUgNy4wMzkwOSA0Ljk5NzM0IDYuMTI1IDYuMTI0OTIgNi4xMjVaTTQwLjgzMzMgMjIuNDU4M0g4LjE2NjU5VjM4Ljc5MTdINDAuODMzM1YyMi40NTgzWk00MC44MzMzIDEwLjIwODNWMTguMzc1SDguMTY2NTlWMTAuMjA4M0g0MC44MzMzWk0xOC4zNzQ5IDEyLjI1SDIyLjQ1ODNWMTYuMzMzM0gxOC4zNzQ5VjEyLjI1Wk0xNC4yOTE2IDEyLjI1SDEwLjIwODNWMTYuMzMzM0gxNC4yOTE2VjEyLjI1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==" alt="ico">\
          </div>'
            )
          )
          ntf_node.append(content)
        } else {
          ntf_node = $('<div>').attr('id', 'justroll-notify')
          ntf_node.append($('<div>').attr('id', 'justroll-notify-logo'))
          ntf_node.append($('<div>').attr('id', 'sb-notification_close'))
          ntf_node.append(content)
        }

        $('body').append(ntf_node)

        $('#sb-notification_close').click(function () {
          justroll.notify_close()
        })

        if (data.type !== 'captcha') {
          setTimeout(function () {
            $('#justroll-notify').addClass('show')
          }, 500)
        }
      }

      if (data.type === 'captsurfe') {
        CaptSurfe.init({
            target: '#captsurfe',
            width: 360,
            height: 70,
            lang: (navigator.language || navigator.userLanguage).substring(0,2),
            onSolve: function (value, token) {
                justroll.bg({captcha_solved:{value, token}})
            }
        });
      }

      $('#justroll-notify').data('type', data.type)

      if (justroll.notify_close_timer) clearTimeout(justroll.notify_close_timer)

      if ('timeout' in data) data.autoclose = data.timeout

      if ('autoclose' in data && data.autoclose) {
        justroll.notify_close_timer = setTimeout(function () {
          justroll.notify_close()
          justroll.notify_close_timer = false
        }, data.autoclose)
      }
    },

    notify_close: function () {
      $('#justroll-notify').removeClass('show')
      setTimeout(function () {
        $('#justroll-notify').remove()
        if (justroll._d) {
          if (!('type' in justroll._d) || justroll._d.type !== 'captcha') justroll.dispatcher(justroll._d)
        }
      }, 500)
    },

    // отправка данных в bg.js
    bg: function (msg, cd) {
      chrome.runtime.sendMessage(msg, cd)
    },

    ajax: function (adr, args, handl, errf) {
      if (/\?/.test(adr)) adr += '&ver=' + justroll.version
      else adr += '?ver=' + justroll.version

      $.ajax({
        url: adr,
        method: 'POST',
        data: args,
        xhrFields: {
          withCredentials: true,
        },
      })
        .done(function (d) {
          try {
            d = JSON.parse(d)
          } catch (e) {}
          if (typeof handl === 'function') handl(d)
        })
        .fail(function (d) {
          try {
            d = JSON.parse(d)
          } catch (e) {}
          if (typeof errf === 'function') errf(d)
        })
        .setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    },
  }

justroll.infocus = document.hasFocus()
cm.set('version', justroll.version, 86400 * 7)

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log('message from bg:', request)

  if (request.token) justroll.token = request.token

  // if(request.ext_enable)
  //   justroll.init();

  if (request.d) {
    justroll._d = request.d
    justroll.dispatcher(request.d)
  }

  if ('open_captcha' in request) {
    // открываем капчу в отедльном окне
    justroll.window_open(request.open_captcha.url, request.open_captcha.width, request.open_captcha.height)
    justroll.notify_close()
  }

  if (request.notify) justroll.notify(request.notify)

  if (request.ping) sendResponse({ pong: 1 })

  // if (request.captcha_check) {
  //   if (justroll.captcha_check === false) {
  //     justroll.captcha_check = 0
  //     var p = document.createElement('iframe')
  //     p.style = 'position:absolute;left:-9999px;width:1px;height:1px;'
  //     p.src = 'https://captcha.surfe.be'
  //     document.body.appendChild(p)
  //   } else sendResponse({ ok: justroll.captcha_check })
  // }


  if (request.check_viewport) {

    let selector = 'video';
    if (location.host === 'vk.com')
      selector = '#video_player video'
    if (location.host === 't.me')
      selector = 'video.js-message_video'
    var videoPlayer = document.querySelector(selector)

    if (!videoPlayer && location.host === 'vk.com' && justroll.vyData) {
      sendResponse({
        viewport: isInViewport(document.querySelector('iframe.video_yt_player')),
        paused: justroll.vyData.paused,
        readyState: justroll.vyData.readyState,
        muted: justroll.vyData.muted,
        ended: justroll.vyData.ended,
      })
      return;
    }

    if (!videoPlayer && location.host === 't.me') {
      sendResponse({
        setTypeVisit: true
      })
      return
    }

    if (!('src' in videoPlayer.attributes) && document.readyState === 'complete') {
      sendResponse({
        viewport: true,
        paused: false,
        readyState: -15,
        muted: false,
        ended: false,
      })
      return
    }

    if (videoPlayer) {
      if (videoPlayer 
        && !videoPlayer.loop 
        && videoPlayer.readyState > 2
        && document.querySelector('.ad-interrupting') === null) {
        videoPlayer.loop = true
      }

      sendResponse({
        viewport: isInViewport(videoPlayer),
        paused: videoPlayer.paused,
        readyState: videoPlayer.readyState,
        muted: videoPlayer.muted,
        ended: videoPlayer.ended,
      })
      return;
    }

  }

  if (request.video_rate) {
    var bid = request.video_rate
    if ($('#info-contents ytd-toggle-button-renderer[is-icon-button]').hasClass('style-default-active'))
      $('#justroll-notify .notification_subtitle sp').remove()
    else
      $('#info-contents ytd-toggle-button-renderer[is-icon-button]').on('click', function () {
        if ($(this).hasClass('style-default-active')) {
          justroll.bg({ video_rated: bid })
        }
      })
  }
})
chrome.storage.onChanged.addListener(function (changes) {
  if (changes.token) justroll.token = changes.token.newValue
})

window.addEventListener('blur', function (e) {
  justroll.infocus = false
})

window.addEventListener('focus', function (e) {
  justroll.infocus = true
  if (isStopListed(location.href)) return

  var curBanner = cm.get('curBanner')
  if (curBanner && curBanner.length > 1) {
    d = JSON.parse(curBanner)
    justroll._d = d
    justroll.dispatcher(d)

    if (justroll.animation) {
      $('#justroll').addClass('anim')
      $('#justroll-panel-anim').attr('title', chrome.i18n.getMessage('animoff'))
    } else {
      $('#justroll').removeClass('anim')
      $('#justroll-panel-anim').attr('title', chrome.i18n.getMessage('animon'))
    }
  } else {
    $('#justroll').remove()
  }

  justroll.animation = !cm.get('justroll-noamin')
  if ('applications' in chrome.runtime.getManifest()) justroll.animation = !justroll.animation
  justroll.onpanel_balance = !cm.get('justroll-nobal')

  if (new Date().valueOf() - justroll.inited_at > 30000) {
    setTimeout(function () {
      if (justroll.infocus && ifvisible.now() && (!justroll.progress || justroll.progress === 100)) justroll.init()
    }, 4000)
  }
})

window.addEventListener(
  'message',
  function (e) {

    if (e.origin === 'https://www.youtube.com') {
      let data = JSON.parse(e.data);

      if (!justroll.vyData)
        justroll.vyData = {
          paused: true,
          readyState: 1,
          muted: false,
          ended: false
        };
       
      if (data.event === 'initialDelivery') {
        justroll.vyData.muted = data.info.muted
      }

      if (data.event === 'infoDelivery' && 'muted' in data.info) {
        justroll.vyData.muted = data.info.muted
      }

      if (data.event === 'onReady') {
        justroll.vyData.readyState = 4
      }

      if (data.event === 'onStateChange') {
        if (data.info === -1)
          justroll.vyData.readyState = 1

        if (data.info === 3)
          justroll.vyData.readyState = 3

        if (data.info === 1) {
          justroll.vyData.readyState = 4
          justroll.vyData.paused = false
        }

        if (data.info === 2) {
          justroll.vyData.paused = true
        }

        if (data.info === 0) {
          justroll.vyData.ended = true
        }
      }
    }

    // if (e.data === 'captcha_check') justroll.captcha_check = 1

    if (!e.data || e.data.target !== _domain_) return

    if (e.data.cmd === 'auth') {
      if (e.data.token) {
        justroll.dispatcher(e.data)
      } else {
        justroll._d = null
        if (typeof ntf_close !== 'undefined') clearTimeout(ntf_close)
        justroll.guest()
      }
    }
    if (e.data.cmd === 'ntf_close') {
      justroll._d = null
      ntf_close = setTimeout(function () {
        justroll.notify_close()
      }, 1500)
    }
  },
  false
)

$(function () {
  if (location.host === _domain_) {
    if (location.pathname === '/loader.html') return

    if ($('#notify_ext_install').length) $('#notify_ext_install').remove()
  }

  chrome.runtime.sendMessage({ isTabBusy: 1 }, function (resp) {
    if (resp?.yes)
      return

    chrome.storage.local.get('token', function (d) {
      if (d.token) justroll.init(d.token)
      else justroll.auth()
    })
  })

  ifvisible.setIdleDuration(35)

  ifvisible.onEvery(30, function () {
    if (justroll.infocus && (justroll.progress === 100 || !justroll.progress)) justroll.init()
  })

  ifvisible.onEvery(1, function () {
    if (justroll.infocus && justroll.progress < 100) justroll.progressbar(1)
  })
})

function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  // console.log(rect)
  return (
    rect.top >= rect.height * -0.15 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

function isStopListed(url) {
  var stopList = cm.get('stopList')
  if (!stopList) {
    chrome.runtime.sendMessage({ req_init: 1, token: justroll.token })
    return true
  } else {
    stopList = JSON.parse(stopList)
  }

  url = parseURL(url)
  if ('hosts' in stopList && stopList.hosts.length && stopList.hosts.indexOf(url.host) > -1) {
    return true
  }

  if ('pages' in stopList && stopList.pages.length && stopList.pages.indexOf(url.urlnh) > -1) {
    return true
  }

  return false
}
