if (!window.IQ_NL) init()
window.IQ_NL = true

function init () {
  const networkLog = []

  interceptXhrResponses()
  interceptFetchResponses()
  window.addEventListener('Q_HISTORY', () => emitNetworkLogUpdate())

  function interceptXhrResponses () {
    const open = window.XMLHttpRequest.prototype.open
    const send = window.XMLHttpRequest.prototype.send

    function openReplacement (method, url, ...rest) {
      this._url = url
      return open.call(this, method, url, ...rest)
    }

    function sendReplacement (...args) {
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

    maybeAddToNetworkLog(
      window.location.href || '',
      xhr._url || '',
      parsedResponse
    )

    emitNetworkLogUpdate()
  }

  function interceptFetchResponses () {
    const fetch = window.fetch

    window.fetch = async (...args) => {
      const response = await fetch(...args)

      response
        .clone()
        .json()
        .then(body => {
          maybeAddToNetworkLog(
            window.location.href || '',
            response.url || '',
            body
          )
          emitNetworkLogUpdate()
        })
        .catch(() => { /* noop to avoid noise */ })

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

  function maybeAddToNetworkLog (pageUrl, callUrl, response) {
    const allow = [
      '/voyager',
      '/sales-api',
      '/aura'
    ]

    // Preventing these calls from being pushed to the log will help us
    // reduce instances where mirroring would stop.
    const disallow = [
      '/sales-api/salesApiMessagingPresenceStatuses',
      '/sales-api/salesApiLego',
      '/sales-api/salesApiNavChrome',
      '/sales-api/salesApiCrmSeatConnectionInfo',
      '/sales-api/salesApiEntityAlerts',
      '/sales-api/salesApiEntitlements',
      '/sales-api/salesApiAccess',
      '/sales-api/salesApiTreatment',
      '/sales-api/salesApiPrimaryIdentity',
      '/sales-api/salesApiCoach',
      '/sales-api/salesApiPersonas',
      '/sales-api/salesApiBuyerIntentTrend',
      '/sales-api/salesApiNotificationGroups',
      '/sales-api/salesApiAccountDossier',
      '/sales-api/salesApiEmployeeInsights',
      '/sales-api/salesApiBuyerIntentTrend',
      '/sales-api/salesApiRelationshipMap',
      '/sales-api/salesApiCompanyAlsoViewed',
      '/sales-api/salesApiCrmAccounts',
      '/sales-api/salesApiCrmOpportunities',
      '/sales-api/salesApiSellerIdentity',
      '/voyager/api/graphql?variables=(query:', // auto complete search on profile page
      '/voyager/api/messaging/dash/presenceStatuses',
      '/voyager/api/jobs/jobSeekerPreferences',
      '/voyager/api/graphql?variables=()&queryId=voyagerMessagingDashMessagingSettings',
      '/voyager/api/graphql?variables=()&queryId=voyagerDashMySettings',
      '/voyager/api/voyagerPremiumDashAdvertiseBadge',
      '/voyager/api/voyagerPremiumDashSalesNavigatorBadge',
      '/voyager/api/voyagerMessagingGraphQL' // chats
    ]

    if (allow.some(url => callUrl.startsWith(url))) {
      if (!disallow.some(url => callUrl.startsWith(url))) {
        networkLog.unshift({ pageUrl, callUrl, response })
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
}
