chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: 'https://app.nanogst.in' })
})

async function chromeDownload(url, filename) {
  const currentId = await startdownload(url, filename)

  if (!currentId) {
    console.log(`Couldn't start download`, url)
    return false
  }

  const result = await completeDownload(currentId)

  if (result !== 'complete') {
    console.log(`Download failed`, currentId, url, result)
    chrome.downloads.erase({ id: currentId })
  }

  return result
}

function startdownload(url, filename) {
  return new Promise(resolve => chrome.downloads.download({ url, filename }, resolve))
}

function completeDownload(itemId) {
  return new Promise(resolve => {
    chrome.downloads.onChanged.addListener(function onChanged({ id, state }) {
      if (id === itemId && state && state.current !== 'in_progress') {
        chrome.downloads.onChanged.removeListener(onChanged)
        resolve(state.current)
      }
    })
  })
}

function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

async function processAsync(request, sendResponse) {
  if (['GET', 'POST', 'HEAD'].includes(request.method)) {
    try {
      const headers = {
        Accept: 'application/json, text/plain, */*',
      }

      if (request.contentType) {
        headers['Content-Type'] = request.contentType
      }

      if (request.at) {
        headers['at'] = request.at
      }

      const fetchResponse = await fetch(request.url, {
        method: request.method,
        credentials: 'include',
        redirect: 'follow',
        headers,
        body: request.body,
      })

      //GSTN redirects to urls in response of API in some special conditions
      //- In case of system error, it redirects to: https://www.gst.gov.in/error/system
      //- In case of authentication failure, it redirects to: https://services.gst.gov.in/services/error/accessdenied
      if (fetchResponse.redirected && request.responseType === 'json') {
        const response = {
          ok: false,
          status: 302,
          statusText: 'REDIRECTED',
          location: fetchResponse.url,
          at: fetchResponse.headers.get('at'),
          contentType: fetchResponse.headers.get('Content-Type') ?? undefined,
        }

        sendResponse(response)
      } else {
        const response = {
          ok: fetchResponse.ok,
          status: fetchResponse.status,
          statusText: fetchResponse.statusText,
          location: fetchResponse.url,
          at: fetchResponse.headers.get('at'),
          contentType: fetchResponse.headers.get('Content-Type') ?? undefined,
        }

        if (fetchResponse.ok) {
          if (request.responseType === 'json') {
            response.body = await fetchResponse.text()
          } else if (request.responseType === 'buffer' || request.responseType === 'blob') {
            const buffer = await fetchResponse.arrayBuffer()
            const bufferBase64 = arrayBufferToBase64(buffer)
            response.body = bufferBase64
          }
        }

        sendResponse(response)
      }
    } catch (e) {
      const response = {
        ok: false,
        status: 400,
        statusText: 'Failed to fetch',
        body: e?.message,
      }

      sendResponse(response)
    }
  } else if (request.method === 'DOWNLOAD') {
    try {
      const result = await chromeDownload(request.url, request.filename)

      const responseMessage = {
        ok: result === 'complete',
        status: result === 'complete' ? 200 : result === 'interrupted' ? 400 : 404,
        statusText: result === 'complete' ? 'OK' : result === 'interrupted' ? 'Download interrupted' : 'Not Found',
      }

      sendResponse(responseMessage)
    } catch (e) {
      const response = {
        ok: false,
        status: 400,
        statusText: 'Failed to download',
        body: e?.message,
      }

      sendResponse(response)
    }
  } else if (request.method === 'HELLO') {
    const response = {
      ok: true,
      status: 200,
      statusText: 'OK',
      body: JSON.stringify({
        version: 1,
      }),
    }
    sendResponse(response)
  }
}

chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
  processAsync(request, sendResponse)
  return true
})
