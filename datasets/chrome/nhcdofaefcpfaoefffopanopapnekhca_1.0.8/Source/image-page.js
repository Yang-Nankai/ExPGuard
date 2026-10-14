!(function () {
  "use strict";
  const e = (e) => {
      const t = /\.(gif|jpe?g|tiff?|png|webp|bmp|svg)/i.exec(e);
      return (t && t[0].replace(".", "").toLocaleLowerCase()) || "";
    },
    t = () => {
      const t = ((e) => {
        const t = Array.from(e.querySelectorAll("svg")),
          o = [];
        for (const e of t) {
          e.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          const t = new Blob(['<?xml version="1.0" standalone="no"?>\r\n', e.outerHTML], { type: "image/svg+xml;charset=utf-8" }),
            d = URL.createObjectURL(t),
            { height: u, width: a } =
              ((r = void 0),
              (n = void 0),
              (s = void 0),
              (l = void 0),
              {
                height:
                  (null === (n = null === (r = null == (i = e) ? void 0 : i.height) || void 0 === r ? void 0 : r.baseVal) || void 0 === n
                    ? void 0
                    : n.value) || 400,
                width:
                  (null === (l = null === (s = null == i ? void 0 : i.width) || void 0 === s ? void 0 : s.baseVal) || void 0 === l
                    ? void 0
                    : l.value) || 400,
              });
          u > 100 && a > 100 && o.push({ height: u, width: a, type: "svg", url: d, extension: "svg", alt: "" });
        }
        var i, r, n, s, l;
        return o;
      })(document);
      return [
        ...((t) => {
          const o = Array.from(t.querySelectorAll("img")),
            i = [],
            r = new Set();
          for (const t of o)
            if (t.src) {
              const { width: o, height: s } = { width: (n = t).naturalWidth || n.width, height: n.naturalHeight || n.height },
                l = e(t.src);
              !r.has(t.src) && o > 50 && s > 50 && i.push({ type: "img", width: o, height: s, url: t.src, extension: l, alt: t.alt || "" }),
                r.add(t.src);
            }
          var n;
          return i;
        })(document),
        ...t,
      ];
    };
  console.log("Loaded!😎"),
    window.addEventListener(
      "scroll",
      ((e, t = 3e3) => {
        let o;
        return (...i) => {
          o && clearTimeout(o), (o = setTimeout(() => e(...i), t));
        };
      })(() => {
        const e = t().reduce((e, t) => ((e[t.url] = t), e), {});
        chrome.runtime.sendMessage({ type: "SEND_IMAGES", payload: e });
      })
    ),
    chrome.runtime.onMessage.addListener(function (e, o, i) {
      switch (null == e ? void 0 : e.type) {
        case "GET_IMAGES":
          return i(t());
      }
    });
})();
