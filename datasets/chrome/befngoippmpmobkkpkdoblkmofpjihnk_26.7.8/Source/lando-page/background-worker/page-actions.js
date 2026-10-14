// Lando page actions: generic interpreters injected into the active tab via
// chrome.scripting.executeScript, driven by a declarative `config` relayed from
// the web client (PAGE_ACTION_CONFIG) so selector fixes ship as a web deploy.
//
// Each function runs in the page's isolated world, so it must be fully
// self-contained, and fails soft ({} / false) on any missing element.

// Reads the recipient email per the matching site's `read` rule; { email } may
// be empty so callers treat a missing recipient as an unsupported page.
self.readPageContact = function readPageContact (config) {
  function isEmail (text) {
    return /[^@]+@[^@]+/.test(text)
  }

  // Turn the raw element string into an email per the rule's `extract` mode.
  function extract (raw, mode) {
    const text = raw || ''
    switch (mode) {
      case 'angle-or-email': {
        const match = text.match(/<([^>]+)>/)
        if (match) return match[1]
        return isEmail(text) ? text.trim() : undefined
      }
      case 'first-email-line':
        return text.split('\n').filter(isEmail).shift()
      default:
        return text.trim() || undefined
    }
  }

  const site = (config || []).find(s => s.hostnames && s.hostnames.includes(location.hostname))
  const rule = site && site.read
  if (!rule) return {}

  const el = document.querySelector(rule.selector)
  if (!el) {
    // Site matched but selector missed - likely stale after a site UI change.
    // Flag it so the web client can log an error to DataDog (this page console
    // isn't ours); a non-matching site returns {} and stays silent.
    return { noElement: true }
  }

  let raw
  switch (rule.source) {
    case 'value':
      raw = el.value || ''
      break
    case 'attr':
      raw = (rule.attr && el.getAttribute(rule.attr)) || ''
      break
    case 'text':
      raw = el.innerText || ''
      break
    default:
      return {}
  }

  const email = extract(raw, rule.extract)
  return email ? { email } : {}
}

// Inserts subject and/or body per the matching site's `insert` rules. Pastes
// body before subject so a partial failure leaves the idempotent subject
// untouched. Returns { subjectOk, bodyOk }; an unrequested field reports true.
self.insertEmail = function insertEmail ({ subject, body } = {}, config) {
  // Inject text per the field's `kind`: contenteditable gets a synthetic paste,
  // input/textarea get their value set. Mismatched kind = stale selector, so miss.
  function paste (target, data, kind) {
    const dataType = 'text/plain'

    switch (kind) {
      case 'contenteditable': {
        if (!target.getAttribute('contenteditable')) {
          console.warn('[insertEmail] element is not contenteditable', target)
          return false
        }
        const clipboardData = new DataTransfer()
        clipboardData.setData(dataType, data)
        target.dispatchEvent(new ClipboardEvent('paste', {
          clipboardData,
          data,
          dataType,
          bubbles: true
        }))
        return true
      }
      case 'input':
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          console.warn('[insertEmail] element is not an input', target)
          return false
        }
        // Assign (not append) so a retry replaces rather than duplicates.
        target.value = data
        target.dispatchEvent(new InputEvent('change', { bubbles: true }))
        return true
      default:
        return false
    }
  }

  // Resolve a field's target, descending into its iframe document when set.
  function resolveTarget (field) {
    if (!field) return undefined
    let doc = document
    if (field.iframe) {
      const iframe = document.querySelector(field.iframe)
      try {
        doc = iframe && iframe.contentWindow && iframe.contentWindow.document
      } catch (error) {
        // A cross-origin iframe throws on .document; degrade to "no composer".
        console.warn('[insertEmail] cannot access iframe document', field.iframe, error)
        return undefined
      }
      if (!doc) return undefined
    }
    return doc.querySelector(field.selector)
  }

  function insertField (field, value) {
    const target = resolveTarget(field)
    if (!target) {
      if (field) console.warn('[insertEmail] no element for selector', field.selector)
      return false
    }
    if (field.focus) target.focus()
    const data = field.transform === 'double-newline' ? value.replaceAll('\n', '\n\n') : value
    return paste(target, data, field.kind) === true
  }

  const site = (config || []).find(s => s.hostnames && s.hostnames.includes(location.hostname))
  const rules = (site && site.insert) || {}

  const wantSubject = typeof subject === 'string' && subject
  const wantBody = typeof body === 'string' && body
  const bodyOk = wantBody ? insertField(rules.body, body) : true
  const subjectOk = wantSubject ? insertField(rules.subject, subject) : true
  return { subjectOk, bodyOk }
}
