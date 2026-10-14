!(function (e) {
  var t = {}
  function n(r) {
    if (t[r]) return t[r].exports
    var o = (t[r] = { i: r, l: !1, exports: {} })
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
  }
  ;(n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e
      var r = Object.create(null)
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function (t) {
              return e[t]
            }.bind(null, o)
          )
      return r
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
              return e
            }
      return n.d(t, 'a', t), t
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (n.p = ''),
    n((n.s = 2))
})({
  2: function (e, t) {
    function n(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e
        })(e) ||
        (function (e, t) {
          var n =
            null == e
              ? null
              : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                e['@@iterator']
          if (null != n) {
            var r,
              o,
              i,
              a,
              u = [],
              c = !0,
              l = !1
            try {
              if (((i = (n = n.call(e)).next), 0 === t)) {
                if (Object(n) !== n) return
                c = !1
              } else
                for (
                  ;
                  !(c = (r = i.call(n)).done) &&
                  (u.push(r.value), u.length !== t);
                  c = !0
                );
            } catch (e) {
              ;(l = !0), (o = e)
            } finally {
              try {
                if (
                  !c &&
                  null != n.return &&
                  ((a = n.return()), Object(a) !== a)
                )
                  return
              } finally {
                if (l) throw o
              }
            }
            return u
          }
        })(e, t) ||
        (function (e, t) {
          if (!e) return
          if ('string' == typeof e) return r(e, t)
          var n = Object.prototype.toString.call(e).slice(8, -1)
          'Object' === n && e.constructor && (n = e.constructor.name)
          if ('Map' === n || 'Set' === n) return Array.from(e)
          if (
            'Arguments' === n ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return r(e, t)
        })(e, t) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        })()
      )
    }
    function r(e, t) {
      ;(null == t || t > e.length) && (t = e.length)
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n]
      return r
    }
    var o
    function i(e) {
      var t = Object.fromEntries(
        Object.entries(e).map(function (e) {
          var t = n(e, 2)
          return [t[0], t[1].newValue]
        })
      )
      o.innerText = JSON.stringify(t)
    }
    chrome.storage.local.get(function (e) {
      'dim' == e.twitterBlueChecks && (e.twitterBlueChecks = 'replace'),
        ((o = document.createElement('script')).type = 'text/json'),
        (o.id = 'tnt_settings'),
        document.documentElement.appendChild(o),
        (o.innerText = JSON.stringify(e))
      var t = document.createElement('script')
      ;(t.src = chrome.runtime.getURL('script.js')),
        (t.onload = function () {
          this.remove()
        }),
        document.documentElement.appendChild(t),
        chrome.storage.onChanged.addListener(i)
    }),
      window.addEventListener(
        'message',
        function (e) {
          e.source === window &&
            'tntConfigChange' === e.data.type &&
            e.data.changes &&
            (chrome.storage.onChanged.removeListener(i),
            chrome.storage.local.set(e.data.changes, function () {
              chrome.storage.onChanged.addListener(i)
            }))
        },
        !1
      )
  },
})
