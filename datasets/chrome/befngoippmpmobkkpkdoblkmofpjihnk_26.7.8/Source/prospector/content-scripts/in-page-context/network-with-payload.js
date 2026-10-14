if (!window.IQ_NL) init()
window.IQ_NL = true

function init () {
  const networkLog = []

  interceptXhrResponses()
  interceptFetchResponses()

  function interceptXhrResponses () {
    const open = window.XMLHttpRequest.prototype.open
    const send = window.XMLHttpRequest.prototype.send

    function openReplacement (method, url, ...rest) {
      this._url = url
      return open.call(this, method, url, ...rest)
    }

    function sendReplacement (...args) {
      this._payload = args[0]

      if (this.onreadystatechange) {
        this._iq_original_onreadystatechange = this.onreadystatechange
      }

      this.onreadystatechange = onReadyStateChangeReplacement
      return send.call(this, ...args)
    }

    function onReadyStateChangeReplacement (...args) {
      if (this.readyState === 4) saveToNetworkLog(this)
      if (this._iq_original_onreadystatechange) {
        return this._iq_original_onreadystatechange(...args)
      }
    }

    window.XMLHttpRequest.prototype.open = openReplacement
    window.XMLHttpRequest.prototype.send = sendReplacement
  }

  async function saveToNetworkLog (xhr) {
    let parsedResponse = xhr.response

    if (xhr.response instanceof Blob) {
      const asText = await xhr.response.text()
      parsedResponse = toObjectMaybe(asText)
    } else {
      try { parsedResponse = JSON.parse(xhr.response) } catch (e) {
        // skip
      }
    }

    const parsedPayload = parsePayload(xhr._payload)
    maybeAddToNetworkLog(
      window.location.href || '',
      xhr._url || '',
      parsedResponse,
      parsedPayload
    )

    emitNetworkLogUpdate()
  }

  function interceptFetchResponses () {
    const fetch = window.fetch

    window.fetch = async (...args) => {
      const parsedPayload = parsePayload(args[1]?.body)
      const response = await fetch(...args)

      try {
        const clone = response.clone()
        let body

        try {
          // Try parsing as JSON first; may throw AbortError if stream is interrupted
          body = await clone.json()
        } catch {
          // Fallback: read as text if JSON fails or was aborted
          try {
            const text = await clone.text()
            body = toObjectMaybe(text)
          } catch {
            body = undefined
          }
        }

        if (body) {
          maybeAddToNetworkLog(
            window.location.href || '',
            response.url || '',
            body,
            parsedPayload
          )
          emitNetworkLogUpdate()
        }
      } catch {
        // noop to avoid noise
      }

      return response
    }
  }

  async function emitNetworkLogUpdate () {
    // Only keep the latest 50 network calls
    networkLog.splice(50)

    // We had the problem where `detail` was null on the receiving end of this
    // event. Serializing and unserializing is a workaround.
    //
    // Looks like it's a security feature that prevents object references from
    // being passed around between content script and page context
    // See https://stackoverflow.com/a/53914790/1094632
    window.dispatchEvent(new CustomEvent(
      'LIQ_NETWORK_CALL',
      { detail: JSON.parse(JSON.stringify(networkLog)) }
    ))
  }

  function maybeAddToNetworkLog (pageUrl, callUrl, response, requestPayload) {
    const allow = [
      '/graphql/Prospect'
    ]

    // Preventing these calls from being pushed to the log will help us
    // reduce instances where mirroring would stop.
    const disallow = [
      '/graphql/ProspectsList_GetStagePipeline'
    ]

    // Normalize URL to ensure relative vs absolute URLs both match
    const normalizedCallUrl = (() => {
      try {
        return new URL(callUrl).pathname
      } catch {
        return callUrl
      }
    })()

    if (allow.some(url => normalizedCallUrl.startsWith(url))) {
      if (!disallow.some(url => normalizedCallUrl.startsWith(url))) {
        networkLog.unshift({ pageUrl, callUrl, response, requestPayload })
        emitNetworkLogUpdate()
      }
    }
  }

  function toObjectMaybe (text) {
    try {
      return JSON.parse(text)
    } catch (e) {
      return text
    }
  }

  function parsePayload (payload) {
    if (!payload) return
    if (payload instanceof FormData || payload instanceof URLSearchParams) return Object.fromEntries(payload.entries())
    if (typeof payload === 'string') {
      try {
        return JSON.parse(payload)
      } catch {
        return payload
      }
    }
    if (typeof payload === 'object') return payload
  }
}
