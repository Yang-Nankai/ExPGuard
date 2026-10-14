var cm = new CommonMemory()
// var domain = 'loc.surfe.be';
var domain = 'surfe.be'
var popup = {
  init: function () {
    popup.resize()

    $(document).on('click', '.pointer', function () {
      var data = $(this).data()
      if (!data) return

      if ('hrefbg' in data) {
        popup.bg({ ajax: { adr: data.hrefbg } })
        return
      }

      if ('ajax' in data) {
        popup.bg({ ajax: data })
        return
      }

      if ('href' in data) window.open(data.href)
    })

    $('.version-info').text(chrome.i18n.getMessage('Version') + ': ' + chrome.runtime.getManifest().version)

    $('.btn').unbind('click')
    $('.btn').on('click', function () {
      popup.bg($(this).data())
    })

    if ($('#badge').length) {
      popup.bg({
        badge: parseInt($('#badge').data('value')),
      })
    }

    $('.rate-task_btn.like').click(function () {
      $('.rate-task').hide()
      $('.rate-tnx').show()
    })

    $('.task_close').click(function () {
      popup.bg({ ajax: { adr: $(this).data('hrefbg') } })
      $(this).parent().slideUp(200)
    })

    init_view()
  },

  resize: function () {
    var h = $('.body').height()
    if (h > 500) {
      $('body')
        .css('height', '500px')
        .mCustomScrollbar({
          theme: 'minimal',
          scrollInertia: 100,
        })
        .css('overflow', 'hidden')
    } else $('body').css('height', h + 'px')
  },

  privacy_optin: function () {
    $('.body').html(
      '<div id="opt-in-prompt">\
      <p>' +
        chrome.i18n.getMessage('privacyOptinText') +
        '</p>\
      <p><a href="https://surfe.be/site/privacy-policy" target="_blank">\
        ' +
        chrome.i18n.getMessage('privacyOptinLink') +
        '</a></p>\
      <div id="button-container">\
        <button id="button-enable">' +
        chrome.i18n.getMessage('privacyOptinAgree') +
        '</button>\
        <button id="button-cancel" autofocus="true">' +
        chrome.i18n.getMessage('privacyOptinCancel') +
        '</button>\
      </div>\
    </div>'
    )
    $('#button-enable').click(function () {
      cm.set('private_policy_agree', 1, 86400 * 365)
      popup.load()
    })
    $('#button-cancel').click(function () {
      popup.load()
    })
  },

  bg: function (msg) {
    chrome.runtime.sendMessage(msg, function (response) {
      if (!response) {
        return
      }
      if ('reload' in response) {
        popup.load()
      }

      if ('popup_notify' in response) {
        $('.notify').text(response.popup_notify)
        $('.notify').show(300)
        setTimeout(() => $('.notify').hide(300), 2500)
      }
    })
  },

  load: async function () {
    let data = await chrome.storage.local.get('task')
    console.log(data)
    ajax(
      'https://' + domain + '/ext-v2/popup?ver=' + chrome.runtime.getManifest().version.replace(/\./g, ''),
      {task: data && 'task' in data && data.task !== null},
      function (d) {
        console.log(d)
        var content = d

        try {
          d = JSON.parse(d)
          content = d.content

          if ('badge' in d) chrome.runtime.sendMessage({ badge: d.badge })
        } catch (e) {
          console.error(e)
        }

        $('.version,.reset-wrap').remove()
        $('.body').html(DOMPurify.sanitize(content))
        popup.init()
      }
    )
  },
}

setTimeout(function () {
  if (!cm.get('private_policy_agree') && 'browser_specific_settings' in chrome.runtime.getManifest()) popup.privacy_optin()
  else popup.load()
}, 300)

$('.btn').on('click', function () {
  popup.bg($(this).data())
})

$('.version').text('v. ' + chrome.runtime.getManifest().version)
$('.reset-wrap .btn').text(chrome.i18n.getMessage('extReset'))

function ajax(adr, args, handl, errf) {
  var oXmlHttp = createXMLHttp()

  oXmlHttp.open('POST', adr, true)
  oXmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

  oXmlHttp.onreadystatechange = function () {
    if (oXmlHttp.readyState == 4) {
      if (oXmlHttp.status == 200) {
        handl(oXmlHttp.responseText)
      } else {
        console.error('Error on ajax(): ', oXmlHttp)

        if (typeof errf === 'function') errf(oXmlHttp.statusText)
      }
      delete oXmlHttp
    }
  }
  if (typeof args == 'object') {
    var _args = []
    for (var n in args) {
      _args.push(n + '=' + encodeURIComponent(args[n]))
    }
    args = _args.join('&')
  }

  oXmlHttp.send(args)
  function createXMLHttp() {
    if (typeof XMLHttpRequest != 'undefined') {
      return new XMLHttpRequest()
    } else if (window.ActiveXObject) {
      var aVersions = [
        'MSXML2.XMLHttp.5.0',
        'MSXML2.XMLHttp.4.0',
        'MSXML2.XMLHttp.3.0',
        'MSXML2.XMLHttp',
        'Microsoft.XMLHttp',
      ]
      for (var i = 0; i < aVersions.length; i++) {
        try {
          //
          var oXmlHttp = new ActiveXObject(aVersions[i])
          return oXmlHttp
        } catch (oError) {}
      }
    }
  }
}

function init_view() {
  // Nav
  $('.nav_list li').on('click', function () {
    $('.nav_list li').removeClass('active')
    $(this).addClass('active')

    var id = $(this).data('id')
    $('.tab').removeClass('active')
    $('.tab.' + id).addClass('active')

    popup.resize()

  })

  // Progress bar
  var container = $('#statistics_item__current-income')
  if (container.length) {
    var bar = new ProgressBar.Circle(container[0], {
      color: '#3F8EFA',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 4,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false,
      },

      // Set default step function for all animate calls
      step: function (state, circle) {
        var value = Math.round(circle.value() * 100)
        circle.setText(100 + parseInt(value) + '%')
      },
    })
    bar.text.style.fontFamily = '"Open Sans", Helvetica, sans-serif'
    bar.text.style.fontSize = '24px'
    bar.text.style.fontWeight = '800'
    bar.animate(parseFloat(container.data('val'))) // Number from 0.0 to 1.0
  }

  // Statistics Slider
  $('.statistics_slider').slick({
    dots: true,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    prevArrow: '<div class="statistics_slider__arrow prev"><img src="img/slider_arrow-prev.svg" alt="ico"></div>',
    nextArrow: '<div class="statistics_slider__arrow next"><img src="img/slider_arrow.svg" alt="ico"></div>',
  })

  // Statistic Switch
  $('.statistic_tab__list li').on('click', function () {
    var statisticInfo = $(this).attr('data-info')

    $('.statistic_tab__list li').removeClass('active')
    $(this).addClass('active')

    if (statisticInfo == 'expansion-revenue') {
      $('.statistic_tab__list').removeClass('affiliate-revenue').addClass('expansion-revenue')

      $('.statistic_expansion-revenue').show()
      $('.statistic_affiliate-revenue').hide()
    } else {
      $('.statistic_tab__list').removeClass('expansion-revenue').addClass('affiliate-revenue')

      $('.statistic_expansion-revenue').hide()
      $('.statistic_affiliate-revenue').show()
    }
  })
}
