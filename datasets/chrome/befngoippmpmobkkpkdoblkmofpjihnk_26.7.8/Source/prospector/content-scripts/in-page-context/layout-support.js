;(function () {
  const OriginalIO = window.IntersectionObserver
  window.IntersectionObserver = function (cb, opts) {
    return new OriginalIO(function (entries, obs) {
      entries.forEach(function (e) {
        if (!e.isIntersecting && e.target.closest('[componentkey^="profileCardsBelowActivity"]')) {
          Object.defineProperty(e, 'isIntersecting', { value: true })
          Object.defineProperty(e, 'intersectionRatio', { value: 1 })
        }
      })
      cb(entries, obs)
    }, opts)
  }
  window.IntersectionObserver.prototype = OriginalIO.prototype
})()
