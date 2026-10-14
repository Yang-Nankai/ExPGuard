window.onload = () => {
  console.log("Meeting loaded")
  console.log(window.location)
  let language, email, uid
  let widgetLoaded = false
  let meetingRequested = false
  let meetingType = null
  let selectedDocument = document
  chrome.runtime.sendMessage({ action: "requestUid" }, function(response) {
    if(response.success) {
      language = response.language
      uid = response.uid
      email = response.email
      const targetNode = document.body
      const mutationCallback = function(mutationsList, observer) {
        console.log("mutation detected", widgetLoaded)
        if(!widgetLoaded) {
          checkMeeting()
        }
      }
      const observer = new MutationObserver(mutationCallback)
      const config = { childList: true, subtree: true }
      observer.observe(targetNode, config)
    }
  })

  function makeHttpRequest(url, method, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.setRequestHeader("Content-Type", "application/json")

    xhr.onreadystatechange = function () {
      console.log(xhr)
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText)
          onSuccess(response)
        } else {
          console.log("Triggering error")
          console.log(onError)
          onError(xhr.status, xhr.statusText)
        }
      }
      else {
        console.log(xhr)
      }
    };

    xhr.send(JSON.stringify(data))
  }

  function checkIfElementIsVisible(elementSelector) {
    let element = selectedDocument.querySelector(elementSelector)
    if(element) {
      return elementInViewport2(element)
    }
    else {
      return false
    }
  }

  function elementInViewport2(el) {
    console.log(el)
    var top = el.offsetTop
    var left = el.offsetLeft
    var width = el.offsetWidth
    var height = el.offsetHeight

    while(el.offsetParent) {
      el = el.offsetParent
      top += el.offsetTop
      left += el.offsetLeft
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    )
  }

  async function checkMeeting() {
    let xpath3 = "//i[text()='call_end']"
    let meetCallEnd = document.evaluate(xpath3, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    let zoomCallEnd = document.querySelector(".footer__leave-btn")
    let zoomIframe = document.querySelector("#webclient")
    let teamsCallEnd = document.querySelector("#hangup-button")
    let teamsIframe = document.querySelector("iframe")
    let extraDocument = null
    if(zoomIframe) {
      selectedDocument = zoomIframe.contentDocument
      zoomCallEnd = selectedDocument.querySelector(".footer__leave-btn")
    }
    if(teamsIframe) {
      if(teamsIframe.id.startsWith("experience-container-")) {
        selectedDocument = teamsIframe.contentDocument
        teamsCallEnd = selectedDocument.querySelector("#hangup-button")
        if(!teamsCallEnd) {
          setTimeout(() => { checkMeeting() }, 5000)
        }
      }
    }
    if(meetCallEnd) {
      meetingType = "meet"
      addElement()
    }
    else if(teamsCallEnd) {
      meetingType = "teams"
      addElement()
    }
    else if(zoomCallEnd) {
      let endButtonCheck = checkIfElementIsVisible(".footer__leave-btn")
      console.log("visible", endButtonCheck)
      if(endButtonCheck) {
        let loadingElementCheck = checkIfElementIsVisible("#wc-loading")
        if(!loadingElementCheck) {
          meetingType = "zoom"
          addElement()
        }
      }
      else {
        let zoomCallEndInterval = setInterval(() => {
          if(!zoomCallEnd) {
            clearInterval(zoomCallEndInterval)
          }
          let endButtonCheck = checkIfElementIsVisible(".footer__leave-btn")
          console.log("visible", endButtonCheck)
          if(endButtonCheck) {
            let loadingElementCheck = checkIfElementIsVisible("#wc-loading")
            if(!loadingElementCheck) {
              clearInterval(zoomCallEndInterval)
              meetingType = "zoom"
              addElement()
            }
          }
        }, 1000)
      }
    }
  }

  function urlify(text) {
    var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if(text) {
      let match = text.match(urlRegex)
      if(match) {
        if(match.length > 0) {
          return match
        }
      }
    }
    return []
  }

  function addElement() {
    if(widgetLoaded) {
      return
    }
    widgetLoaded = true
    const transkriptorLinkElement = selectedDocument.createElement('link')
    transkriptorLinkElement.rel = 'stylesheet'
    transkriptorLinkElement.id = 'transkriptor-styles'
    transkriptorLinkElement.href = chrome.runtime.getURL('meeting.css')
    selectedDocument.head.appendChild(transkriptorLinkElement)
    if(meetingType == "teams") {
      const parentLinkElement = document.createElement('link')
      parentLinkElement.rel = 'stylesheet'
      parentLinkElement.id = 'transkriptor-styles-parent'
      parentLinkElement.href = chrome.runtime.getURL('meeting.css')
      document.head.appendChild(parentLinkElement)
    }

    const transkriptorFwElement = selectedDocument.createElement('link')
    transkriptorFwElement.rel = 'stylesheet'
    transkriptorFwElement.id = 'transkriptor-fw-styles'
    transkriptorFwElement.href = chrome.runtime.getURL('fw.min.css')
    selectedDocument.head.appendChild(transkriptorFwElement)

    // Adding floating element
    const floatingElement = selectedDocument.createElement('div')
    floatingElement.className = 'transkriptor-floating'

    // Transkriptor modal use bot
    const transkriptorModalUseBot = selectedDocument.createElement('div')
    transkriptorModalUseBot.className = "transkriptor-modal"
    transkriptorModalUseBot.id = "transkriptor-modal-useBot"
    transkriptorModalUseBot.innerHTML = `<div class="transkriptor-modal-content">
      <div class="transkriptor-modal-header">
        <span class="transkriptor-modal-close" id="transkriptor-modal-close">&times;</span>
        <h2>Record Meeting?</h2>
      </div>
      <div class="transkriptor-modal-body">
        <button class="transkriptor-button" id="transkriptorYes">Yes</button>
        <button class="transkriptor-button" id="transkriptorNo">No</button>
      </div>
    </div>`
    selectedDocument.body.appendChild(transkriptorModalUseBot)

    // Transkriptor Modal meeting controller
    const transkriptorModalMeetingController = selectedDocument.createElement('div')
    transkriptorModalMeetingController.className = "transkriptor-modal"
    transkriptorModalMeetingController.id = "transkriptor-modal-meetingController"
    transkriptorModalMeetingController.innerHTML = `<div class="transkriptor-modal-content">
      <div class="transkriptor-modal-header">
        <span class="transkriptor-modal-close" id="transkriptor-modal-controllerClose">&times;</span>
        <h2>Record Meeting?</h2>
      </div>
      <div class="transkriptor-modal-body">
        <button class="transkriptor-button" id="transkriptorPause">Pause</button>
        <button class="transkriptor-button" id="transkriptorResume">Resume</button>
        <button class="transkriptor-button" id="transkriptorStop">Stop</button>
      </div>
    </div>`
    transkriptorModalMeetingController.style.display = "none"
    selectedDocument.body.appendChild(transkriptorModalMeetingController)

    const logo = selectedDocument.createElement('img')
    logo.src = 'https://app.transkriptor.com/favicon.png'
    logo.alt = 'Transkriptor'
    floatingElement.appendChild(logo)
    selectedDocument.body.appendChild(floatingElement)

    floatingElement.addEventListener("click", () => {
      if(!meetingRequested) {
        showSwal()
        floatingElement.style.display = 'none'
      }
      else {
        transkriptorModalMeetingController.style.display = 'flex'
        floatingElement.style.display = 'none'
      }
    })

    function showSwal() {
      Swal.fire({
        title: "Do you want to add your Transkriptor Meeting Assistant to this meeting?",
        html: "<small style='font-size: smaller;font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;'>It will automatically join to this meeting and once the meeting is finished, it will send you the transcription.</small>",
        showCancelButton: true,
        showConfirmButton: true,
        focusConfirm: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        imageUrl: "https://transkriptor.com/wp-content/uploads/2021/05/website_logo_transparent_background-300x73.png",
        confirmButtonColor: "#007bff",
        reverseButtons: true,
        width: "700px",
        input: 'select',
        inputOptions: {
          "PT": "Portuguese (Português)",
          "EN": "English (English)",
          "ES": "Spanish (español)",
          "TR": "Turkish (Türkçe)",
          "DE": "German (Deutsch)",
          "IT": "Italian (Italiano)",
          "AR": "Arabic (عربي)",
          "FR": "French (Français)",
          "ID": "Indonesian (bahasa Indonesia)",
          "KO": "Korean (한국인)",
          "JA": "Japanese (日本)",
          "ZH": "Chinese (中国人)",
          "HI": "Hindi (हिंदी)",
          "RU": "Russian (Русский)",
          "TH": "Thai (แบบไทย)",
          "VI": "Vietnamese (Tiếng Việt)",
          "af-ZA": "Afrikaans (South Africa) (Afrikaans (Suid-Afrika))",
          "am-ET": "Amharic (Ethiopia) (አማርኛ (ኢትዮጵያ))",
          "ar-DZ": "Arabic (Algeria) (العربية (الجزائر))",
          "ar-BH": "Arabic (Bahrain), modern standard (العربية (البحرين) ، المعيار الحديث)",
          "ar-EG": "Arabic (Egypt) (العربية (مصر))",
          "ar-IQ": "Arabic (Iraq) (العربية (العراق))",
          "ar-IL": "Arabic (Israel) (العربية (إسرائيل))",
          "ar-JO": "Arabic (Jordan) (العربية (الأردن))",
          "ar-KW": "Arabic (Kuwait) (العربية (الكويت))",
          "ar-LB": "Arabic (Lebanon) (العربية (لبنان))",
          "ar-LY": "Arabic (Libya) (العربية (ليبيا))",
          "ar-MA": "Arabic (Morocco) (العربية (المغرب))",
          "ar-OM": "Arabic (Oman) (العربية (عمان))",
          "ar-PS": "Arabic (Palestinian Authority) (العربية (السلطة الفلسطينية))",
          "ar-QA": "Arabic (Qatar) (العربية (قطر))",
          "ar-SA": "Arabic (Saudi Arabia) (العربية (المملكة العربية السعودية))",
          "ar-SY": "Arabic (Syria) (العربية (سوريا))",
          "ar-TN": "Arabic (Tunisia) (العربية (تونس))",
          "ar-AE": "Arabic (United Arab Emirates) (العربية (الإمارات العربية المتحدة))",
          "ar-YE": "Arabic (Yemen) (العربية (اليمن))",
          "BN": "Bengali (বাংলা)",
          "bg-BG": "Bulgarian (Bulgaria) (български (България))",
          "MY": "Burmese (Myanmar) (ဗမာ (မြန်မာ))",
          "ca-ES": "Catalan (Spain) (català (Espanya))",
          "zh-HK": "Chinese (Cantonese, Traditional) (中文（粤语、繁体）)",
          "zh-CN": "Chinese (Mandarin, Simplified) (中文（普通话、简体）)",
          "zh-TW": "Chinese (Taiwanese Mandarin) (中文（台湾普通话）)",
          "hr-HR": "Croatian (Croatia) (hrvatski (Hrvatska))",
          "cs-CZ": "Czech (Czech) (český (český))",
          "da-DK": "Danish (Denmark) (Dansk (Danmark))",
          "nl-BE": "Dutch (Belgium) (Nederlands (België))",
          "nl-NL": "Dutch (Netherlands) (Nederlands (Nederland))",
          "en-AU": "English (Australia)",
          "en-CA": "English (Canada)",
          "en-GH": "English (Ghana)",
          "en-HK": "English (Hong Kong)",
          "en-IN": "English (India)",
          "en-IE": "English (Ireland)",
          "en-KE": "English (Kenya)",
          "en-NZ": "English (New Zealand)",
          "en-NG": "English (Nigeria)",
          "en-PH": "English (Philippines)",
          "en-SG": "English (Singapore)",
          "en-ZA": "English (South Africa)",
          "en-TZ": "English (Tanzania)",
          "en-GB": "English (United Kingdom)",
          "en-US": "English (United States)",
          "et-EE": "Estonian (Estonia) (eesti keel (Eesti))",
          "fil-PH": "Filipino (Philippines) (filippiiniläinen (Filippiinit))",
          "FI": "Finnish (Finland) (suomi (Suomi))",
          "fr-BE": "French (Belgium) (Français (Belgique))",
          "fr-CA": "French (Canada) (Français (Canada))",
          "fr-FR": "French (France) (France francaise))",
          "fr-CH": "French (Switzerland) (Français (Suisse))",
          "de-AT": "German (Austria) (Deutsch (Österreich))",
          "de-DE": "German (Germany) (Deutsches Deutschland))",
          "de-CH": "German (Switzerland) (Deutsch (Schweiz))",
          "el-GR": "Greek (Greece) (Ελληνικά (Ελλάδα))",
          "gu-IN": "Gujarati (Indian) (ગુજરાતી (ભારતીય))",
          "he-IL": "Hebrew (Israel) (עברית (ישראל))",
          "hi-IN": "Hindi (India) (हिंदी भारत))",
          "hu-HU": "Hungarian (Hungary) (magyar (Magyarország))",
          "is-IS": "Icelandic (Iceland) (Íslenska (Ísland))",
          "id-ID": "Indonesian (Indonesia) (Indonesia (Indonesia))",
          "ga-IE": "Irish (Ireland) (Gaeilge (Éire))",
          "it-IT": "Italian (Italy) (Italiano (Italia))",
          "ja-JP": "Japanese (Japan) (日本語（日本）)",
          "jv-ID": "Javanese (Indonesia) (Basa Jawa (Indonesia))",
          "kn-IN": "Kannada (India) (ಕನ್ನಡ (ಭಾರತ))",
          "km-KH": "Khmer (Cambodia) (ខ្មែរ (កម្ពុជា))",
          "ko-KR": "Korean (Korea) (한국어(한국))",
          "lo-LA": "Lao (Laos) (ລາວ (ລາວ))",
          "lv-LV": "Latvian (Latvia) (latviešu (Latvija))",
          "lt-LT": "Lithuanian (Lithuania) (lietuvių (Lietuva))",
          "mk-MK": "Macedonian (North Macedonia) (македонски (Северна Македонија))",
          "MS": "Malay (Malaysia) (Melayu (Malaysia))",
          "mt-MT": "Maltese (Malta) (Malti (Malta))",
          "mr-IN": "Marathi (India) (मराठी (भारत))",
          "nb-NO": "Norwegian (Bokmål, Norway) (Norsk (bokmål, Norge))",
          "fa-IR": "Persian (Iran) (فارسی (ایران))",
          "pl-PL": "Polish (Poland) (polski (Polska))",
          "pt-BR": "Portuguese (Brazil) (Português (Brasil))",
          "pt-PT": "Portuguese (Portugal) (Português (Portugal))",
          "ro-RO": "Romanian (Romania) (romana (Romania))",
          "ru-RU": "Russian (Russia) (Русский (Россия))",
          "sr-RS": "Serbian (Serbia) (српски (Србија))",
          "si-LK": "Sinhala (Sri Lanka) (සිංහල (ශ්‍රී ලංකාව))",
          "sk-SK": "Slovak (Slovakia) (slovenčina (Slovensko))",
          "sl-SI": "Slovenian (Slovenia) (Slovenščina (Slovenija))",
          "es-AR": "Spanish (Argentina) (Español (Argentina))",
          "es-BO": "Spanish (Bolivia) (Español (Bolivia))",
          "es-CL": "Spanish (Chile) (Español (Chile))",
          "es-CO": "Spanish (Colombia) (Español (Colombia))",
          "es-CR": "Spanish (Costa Rica) (Español (Costa Rica))",
          "es-CU": "Spanish (Cuba) (Español (Cuba))",
          "es-DO": "Spanish (Dominican Republic) (Español (República Dominicana))",
          "es-EC": "Spanish (Ecuador) (Español (Ecuador))",
          "es-SV": "Spanish (El Salvador) (Español (El Salvador))",
          "es-GQ": "Spanish (Equatorial Guinea) (Español (Guinea Ecuatorial))",
          "es-GT": "Spanish (Guatemala) (Español (Guatemala))",
          "es-HN": "Spanish (Honduras) (Español (Honduras))",
          "es-MX": "Spanish (Mexico) (Español (México))",
          "es-NI": "Spanish (Nicaragua) (Español (Nicaragua))",
          "es-PA": "Spanish (Panama) (Español (Panamá))",
          "es-PY": "Spanish (Paraguay) (Español (Paraguay))",
          "es-PE": "Spanish (Peru) (Español (Perú))",
          "es-PR": "Spanish (Puerto Rico) (Español (Puerto Rico))",
          "es-ES": "Spanish (Spain) (Español (España))",
          "es-UY": "Spanish (Uruguay) (Español (Uruguay))",
          "es-US": "Spanish (USA) (Español (EE. UU.))",
          "es-VE": "Spanish (Venezuela) (Español (Venezuela))",
          "sw-KE": "Swahili (Kenya) (Kiswahili (Kenya))",
          "sw-TZ": "Swahili (Tanzania) (Kiswahili (Tanzania))",
          "sv-SE": "Swedish (Sweden) (svenska (Sverige))",
          "TA": "Tamil (India) (தமிழ் (இந்தியா))",
          "TE": "Telugu (India) (తెలుగు (భారతదేశం))",
          "th-TH": "Thai (Thailand) (ไทย (ประเทศไทย))",
          "tr-TR": "Turkish (Turkey) (Türkçe (Türkiye))",
          "uk-UA": "Ukrainian (Ukraine) (Українська (Україна))",
          "UR": "Urdu (اردو)",
          "uz-UZ": "Uzbek (Uzbekistan) (O'zbek (O'zbekiston))",
          "vi-VN": "Vietnamese (Vietnam) (Tiếng Việt (Việt Nam))",
          "zu-ZA": "Zulu (South Africa) (IsiZulu (Ningizimu Afrika))"
        },
        preConfirm: () => {
          const inputValue = document.getElementById('swal2-select').value
          if (!inputValue) {
            Swal.showValidationMessage('Please select meeting language')
          }
          return inputValue
        },
        inputPlaceholder: 'Meeting language',
        inputValue: language,
      }).then((interacted) => {
        if(interacted.isConfirmed) {
          let selectedLanguage = interacted.value
          Swal.fire({
            title: 'Adding your Assistant',
            html: "<small style='font-size: smaller;font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;'>Please wait for few seconds</small>",
            didOpen: () => {
              Swal.showLoading()
            }
          })
          closeButton.style.display = "none"
          const onSuccess = () => {
            Swal.close()
            // floatingElement.style.display = 'block'
            meetingRequested = true
          }
          const onError = () => {
            yesButton.disabled = false
            noButton.disabled = false
            yesButton.textContent = "Yes"
            closeButton.style.display = "block"
            Swal.fire({
              title: "An error occurred",
              html: "We got an error while adding bot to your meeting.",
              icon: "error"
            }).then(() => {
              floatingElement.style.display = 'block'
            })
          }
          let meetingUrl = ""
          if(meetingType == "meet") {
            meetingUrl = window.location.href
            sendMeetingRequest(meetingUrl, selectedLanguage, onSuccess, onError)
          }
          else if(meetingType == "teams") {
            try {
              selectedDocument.querySelector('#divider-primary').previousSibling.children[0].click()
              selectedDocument.querySelector('button[data-track-module-name="meetingInfoPanel"]').click()
            }
            catch(e) {}
            if(selectedDocument.querySelector('.me-email-headline')) {
              meetingUrl = selectedDocument.querySelector('.me-email-headline').href
              sendMeetingRequest(meetingUrl, selectedLanguage, onSuccess, onError)
              try {
                selectedDocument.querySelector('#divider-primary').previousSibling.children[0].click()
                selectedDocument.querySelector('button[data-track-module-name="meetingInfoPanel"]').click()
              }
              catch(e) {}
            }
            else {
              setTimeout(() => {
                if(selectedDocument.querySelector('.me-email-headline')) {
                  meetingUrl = selectedDocument.querySelector('.me-email-headline').href
                  sendMeetingRequest(meetingUrl, selectedLanguage, onSuccess, onError)
                  try {
                    selectedDocument.querySelector('#divider-primary').previousSibling.children[0].click()
                    selectedDocument.querySelector('button[data-track-module-name="meetingInfoPanel"]').click()
                  }
                  catch(e) {}
                }
                else {
                  return onError()
                }
              }, 1000)
            }
          }
          else if(meetingType == "zoom") {
            if(selectedDocument.getElementById("invite_email")) {
              let zoomInviteText = selectedDocument.getElementById("invite_email").value
              let urls = urlify(zoomInviteText)
              if(urls[0]) {
                meetingUrl = urls[0]
                sendMeetingRequest(meetingUrl, selectedLanguage, onSuccess, onError)
              }
              else {
                if(selectedDocument.querySelector('#meeting-info-indication')) {
                  selectedDocument.querySelector('#meeting-info-indication').click()
                  meetingUrl = selectedDocument.querySelectorAll('.meeting-info-icon__meeting-url')[1].textContent
                  sendMeetingRequest(meetingUrl, selectedLanguage, onSuccess, onError)
                }
              }
            }
            else {
              return onError()
            }
          }
        }
        else {
          floatingElement.style.display = 'block'
        }
      })
    }

    let closeButton = selectedDocument.querySelector('#transkriptor-modal-close')
    closeButton.addEventListener("click", () => {
      transkriptorModalUseBot.style.display = 'none'
      floatingElement.style.display = 'block'
    })

    let controllerCloseButton = selectedDocument.querySelector('#transkriptor-modal-controllerClose')
    controllerCloseButton.addEventListener("click", () => {
      transkriptorModalMeetingController.style.display = 'none'
      floatingElement.style.display = 'block'
    })

    let noButton = selectedDocument.querySelector('#transkriptorNo')
    noButton.addEventListener("click", () => {
      transkriptorModalUseBot.style.display = 'none'
      floatingElement.style.display = 'block'
    })

    let yesButton = selectedDocument.querySelector('#transkriptorYes')
    console.log(yesButton, "YesButton")
    yesButton.addEventListener("click", () => {
      console.log("Clicked click button")
      yesButton.disabled = true
      noButton.disabled = true
      yesButton.textContent = "Loading..."
      closeButton.style.display = "none"
      const onSuccess = () => {
        transkriptorModalUseBot.style.display = "none"
        yesButton.disabled = false
        noButton.disabled = false
        yesButton.textContent = "Yes"
        closeButton.style.display = "block"
        floatingElement.style.display = 'none'
        meetingRequested = true
      }
      const onError = () => {
        yesButton.disabled = false
        noButton.disabled = false
        yesButton.textContent = "Yes"
        closeButton.style.display = "block"
      }
      let meetingUrl = ""
      if(meetingType == "meet") {
        meetingUrl = window.location.href
        sendMeetingRequest(meetingUrl, selectedLanguage, onSuccess, onError)
      }
      else if(meetingType == "teams") {
        try {
          selectedDocument.querySelector('#divider-primary').previousSibling.children[0].click()
          selectedDocument.querySelector('button[data-track-module-name="meetingInfoPanel"]').click()
        }
        catch(e) {}
        if(selectedDocument.querySelector('.me-email-headline')) {
          meetingUrl = selectedDocument.querySelector('.me-email-headline').title
          sendMeetingRequest(meetingUrl, selectedLanguage, onSuccess, onError)
          try {
            selectedDocument.querySelector('#divider-primary').previousSibling.children[0].click()
            selectedDocument.querySelector('button[data-track-module-name="meetingInfoPanel"]').click()
          }
          catch(e) {}
        }
        else {
          setTimeout(() => {
            if(selectedDocument.querySelector('.me-email-headline')) {
              meetingUrl = selectedDocument.querySelector('.me-email-headline').title
              sendMeetingRequest(meetingUrl, selectedLanguage, onSuccess, onError)
              try {
                selectedDocument.querySelector('#divider-primary').previousSibling.children[0].click()
                selectedDocument.querySelector('button[data-track-module-name="meetingInfoPanel"]').click()
              }
              catch(e) {}
            }
            else {
              return onError()
            }
          }, 1000)
        }
      }
      else if(meetingType == "zoom") {
        if(selectedDocument.getElementById("invite_email")) {
          let zoomInviteText = selectedDocument.getElementById("invite_email").value
          let urls = urlify(zoomInviteText)
          if(urls[0]) {
            meetingUrl = urls[0]
            sendMeetingRequest(meetingUrl, selectedLanguage, onSuccess, onError)
          }
          else {
            if(selectedDocument.querySelector('#meeting-info-indication')) {
              selectedDocument.querySelector('#meeting-info-indication').click()
              meetingUrl = selectedDocument.querySelectorAll('.meeting-info-icon__meeting-url')[1].textContent
              sendMeetingRequest(meetingUrl, selectedLanguage, onSuccess, onError)
            }
          }
        }
        else {
          return onError()
        }
      }
    })

    function sendMeetingRequest(meetingUrl, selectedLanguage, onSuccess, onError) {
      let url = "https://9367iu6ljh.execute-api.eu-central-1.amazonaws.com/default/Prod-Tran-MeetingBot-MeetingHandler"
      let dataToSend = {
        service: "8",
        language: selectedLanguage,
        meetingUrl: meetingUrl,
        instant: true,
        meetingType: "instant",
        uid: uid,
        email: email,
        timezone: "",
        fromExtension: true
      }
      makeHttpRequest(url, "POST", dataToSend, onSuccess, onError)
    }

    showSwal()
  }
}
