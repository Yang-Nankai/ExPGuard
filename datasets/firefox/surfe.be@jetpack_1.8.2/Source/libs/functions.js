const parseURL = (url) => {
  const urlObject = new URL(url)

  const searchObject = [...urlObject.searchParams.entries()].reduce((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {})

  const newHost = urlObject.host.replace(/^www\./, '')

  return {
    url: urlObject.href,
    urlnh: urlObject.origin + urlObject.pathname + urlObject.search,
    host: newHost,
    search: searchObject,
  }
}

const genToken = (length) => {
    let result = 'T';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    while (result.length < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const setBadge = (a, b) => {
    chrome.action.setBadgeText({ text: a.toString() })
    chrome.action.setBadgeBackgroundColor({ color: b ? b : '#000' })
}

const onVisitFinish = () => {
    ChromeStorage.set({ task: null, visit_retry: 0 })

    let visits_cnt = cm.get('visits_cnt')
    if (visits_cnt !== null && visits_cnt > 1) {
        cm.set('visits_cnt', visits_cnt - 1, 21600)
        setBadge(visits_cnt - 1, '#d00')
    } else setBadge('')
}

const ajax = async (endpoint, args, onSuccess, onError) => {
    if (endpoint.startsWith('//')) endpoint = 'https:' + endpoint

    const options = {
        method: 'POST',
        credentials: 'include',
    }

    if (args && typeof args === 'object') {
        const formData = new FormData()
        Object.entries(args).forEach(([key, value]) => {
            formData.append(key, value)
        })
        options.body = formData
    }

    try {
        const response = await fetch(endpoint, options)
        console.log('fetch:', response)

        if (response.ok && onSuccess) {
            onSuccess(await response.text())
        } else if (onError) {
            onError(response.statusText)
        }
    } catch (error) {
        console.error('Error on ajax(): ', error)
        if (typeof onError === 'function') {
            onError(error.message)
        }
    }
}

const verifiedSender = (sender) => {
    return (
        sender.id === 'gfhdccbjbnkaclgngkaiiaodimokdpnk' || // chrome
        sender.id === 'manjolceoachljppbjhfgkoomnlidkna' || // prod
        sender.id === 'fobhipjgedjcckggpeeacoogfaiopkap' || // opera
        sender.id === 'cpdodgacekceebphnobhobhgbnjcilom' || // brave
        sender.id === 'surfe.be@jetpack' || // firefox
        sender.id === 'lkniobfjjnmbhkapbobnhfmghncmfeoe' // dev-vlad
    )
}

const loadCaptImg = (token, lang, width, height, cb) => {
    ajax('https://captcha.surfe.be/collage/preview.php?data=true&token='+
        token+'&lang='+lang+'&w='+width+'&h='+height+
        '&rand='+Math.floor(Math.random()*10000), null, cb)
}