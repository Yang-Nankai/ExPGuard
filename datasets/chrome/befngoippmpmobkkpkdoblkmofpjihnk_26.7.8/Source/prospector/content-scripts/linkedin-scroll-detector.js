(function () {
  // Exclude "LinkedIn Member" results from the search results
  const LI_SEARCH_SELECTOR = '.search-results-container .entity-result:not([data-chameleon-result-urn="urn:li:member:headless"]) .entity-result__title-text'

  // Fallback selector since LI is rolling out a new DOM change
  const LI_SEARCH_SELECTOR_FALLBACK = '.search-results-container .reusable-search__result-container > div:not([data-chameleon-result-urn="urn:li:member:headless"]) .entity-result__title-text'

  // Sales Navigator
  // We want to select just the name, not the whole box. However we cannot
  // select the name for unrendered boxes. This is normally not an issue unless
  // you pressed the "Back" button on your browser, then you might be near the
  // bottom of the page and the next page with results above you that are not
  // rendered.
  //
  // This is why we have a combo selector that selects name if available,
  // otherwise selects this aria-hidden item.
  // https://leadiq.atlassian.net/browse/PROS-1933?focusedCommentId=63502
  const SN_SEARCH_SELECTOR = '#search-results-container .artdeco-list__item [data-x-search-result="LEAD"], #search-results-container .artdeco-list__item article[aria-hidden]'
  const SN_SAVED_LIST_SELECTOR = '[data-x--people-list--person-name]'

  const LI_NON_SCROLL_CONTAINER_SELECTOR = '.scaffold-layout__main'
  const SN_SCROLL_CONTAINER_SELECTOR = '#search-results-container'
  const SN_SAVED_LIST_SCROLL_CONTAINER_SELECTOR = '#lead-lists'

  let intervalId = null

  detectScrollOnLeadsList()

  function detectScrollOnLeadsList () {
    let previousIndexOfFirstVisibleLead = 0

    intervalId = setInterval(() => {
      if (cleanUpIfOrphaned()) return

      let currentIndexOfFirstVisibleLead = 0
      const leads = getLeadsFromDOM()

      if (leads.length) {
        for (let i = 0; i < leads.length; i++) {
          const element = leads[i]
          if (!isScrolledUpOutOfView(element)) {
            currentIndexOfFirstVisibleLead = i
            break
          }
        }
      }

      if (leads.length && currentIndexOfFirstVisibleLead !== previousIndexOfFirstVisibleLead) {
        chrome.runtime.sendMessage({
          type: 'SCROLL_DETECTED',
          indexOfFirstVisibleLead: currentIndexOfFirstVisibleLead
        })
      }

      previousIndexOfFirstVisibleLead = currentIndexOfFirstVisibleLead
    }, 2000)
  }

  function isScrolledUpOutOfView (el) {
    const nameBounds = el.getBoundingClientRect()

    const upperEdge = getUpperEdgeOfVisibility()
    const nameBottom = nameBounds.bottom

    const isAtLeastPartiallyVisible = nameBottom > upperEdge
    return !isAtLeastPartiallyVisible
  }

  function getLeadsFromDOM () {
    const salesNavSearchLeads = document.querySelectorAll(SN_SEARCH_SELECTOR)
    const salesNavSavedLeads = document.querySelectorAll(SN_SAVED_LIST_SELECTOR)
    const linkedinLeads = document.querySelectorAll(LI_SEARCH_SELECTOR)
    const linkedinLeadsFallback = document.querySelectorAll(LI_SEARCH_SELECTOR_FALLBACK)

    if (salesNavSearchLeads.length) {
      return salesNavSearchLeads
    } else if (salesNavSavedLeads.length) {
      return salesNavSavedLeads
    } else if (linkedinLeads.length) {
      return linkedinLeads
    } else if (linkedinLeadsFallback.length) {
      return linkedinLeadsFallback
    }

    return []
  }

  /**
   * @returns {number} The upper edge past which leads scroll out of view
   */
  function getUpperEdgeOfVisibility () {
    const scrollContainer = getScrollContainer()
    if (scrollContainer) {
      const boundingRect = scrollContainer.getBoundingClientRect()
      if (boundingRect) {
        return boundingRect.top
      }
    }

    const nonScrollContainer = document.querySelector(LI_NON_SCROLL_CONTAINER_SELECTOR)
    if (nonScrollContainer) {
      return nonScrollContainer.offsetTop
    }

    // Fallback in case selectors were changed and can't be found
    // Assume 50px of menus above the main content
    return 50
  }

  function getScrollContainer () {
    return (
      document.querySelector(SN_SCROLL_CONTAINER_SELECTOR) ||
      document.querySelector(SN_SAVED_LIST_SCROLL_CONTAINER_SELECTOR) ||
      null
    )
  }

  function cleanUpIfOrphaned () {
    if (chrome.runtime.id === undefined) {
      clearInterval(intervalId)
      return true
    }
  }
})()
