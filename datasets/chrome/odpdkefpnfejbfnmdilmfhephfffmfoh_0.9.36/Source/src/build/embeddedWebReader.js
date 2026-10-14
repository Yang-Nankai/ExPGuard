(function () {
	'use strict';

	var l$3,
	  t$2;
	function S$1(n) {
	  return n.children;
	}
	l$3 = {
	  __e: function (n, l, u, t) {
	    for (var i, r, o; l = l.__;) if ((i = l.__c) && !i.__) try {
	      if ((r = i.constructor) && null != r.getDerivedStateFromError && (i.setState(r.getDerivedStateFromError(n)), o = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n, t || {}), o = i.__d), o) return i.__E = i;
	    } catch (l) {
	      n = l;
	    }
	    throw n;
	  }
	}, t$2 = function (n) {
	  return null != n && void 0 === n.constructor;
	}, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Math.random().toString(8);

	var t$1,
	  r$1,
	  u$1,
	  i$1,
	  o$1 = 0,
	  f = [],
	  c$1 = l$3,
	  e$1 = c$1.__b,
	  a$1 = c$1.__r,
	  v$1 = c$1.diffed,
	  l$2 = c$1.__c,
	  m$1 = c$1.unmount,
	  s$1 = c$1.__;
	function p$2(n, t) {
	  c$1.__h && c$1.__h(r$1, n, o$1 || t), o$1 = 0;
	  var u = r$1.__H || (r$1.__H = {
	    __: [],
	    __h: []
	  });
	  return n >= u.__.length && u.__.push({}), u.__[n];
	}
	function T(n, r) {
	  var u = p$2(t$1++, 7);
	  return C(u.__H, r) && (u.__ = n(), u.__H = r, u.__h = n), u.__;
	}
	function j$1() {
	  for (var n; n = f.shift();) {
	    var t = n.__H;
	    if (n.__P && t) try {
	      t.__h.some(z), t.__h.some(B), t.__h = [];
	    } catch (r) {
	      t.__h = [], c$1.__e(r, n.__v);
	    }
	  }
	}
	c$1.__b = function (n) {
	  r$1 = null, e$1 && e$1(n);
	}, c$1.__ = function (n, t) {
	  n && t.__k && t.__k.__m && (n.__m = t.__k.__m), s$1 && s$1(n, t);
	}, c$1.__r = function (n) {
	  a$1 && a$1(n), t$1 = 0;
	  var i = (r$1 = n.__c).__H;
	  i && (u$1 === r$1 ? (i.__h = [], r$1.__h = [], i.__.some(function (n) {
	    n.__N && (n.__ = n.__N), n.u = n.__N = void 0;
	  })) : (i.__h.some(z), i.__h.some(B), i.__h = [], t$1 = 0)), u$1 = r$1;
	}, c$1.diffed = function (n) {
	  v$1 && v$1(n);
	  var t = n.__c;
	  t && t.__H && (t.__H.__h.length && (1 !== f.push(t) && i$1 === c$1.requestAnimationFrame || ((i$1 = c$1.requestAnimationFrame) || w$2)(j$1)), t.__H.__.some(function (n) {
	    n.u && (n.__H = n.u), n.u = void 0;
	  })), u$1 = r$1 = null;
	}, c$1.__c = function (n, t) {
	  t.some(function (n) {
	    try {
	      n.__h.some(z), n.__h = n.__h.filter(function (n) {
	        return !n.__ || B(n);
	      });
	    } catch (r) {
	      t.some(function (n) {
	        n.__h && (n.__h = []);
	      }), t = [], c$1.__e(r, n.__v);
	    }
	  }), l$2 && l$2(n, t);
	}, c$1.unmount = function (n) {
	  m$1 && m$1(n);
	  var t,
	    r = n.__c;
	  r && r.__H && (r.__H.__.some(function (n) {
	    try {
	      z(n);
	    } catch (n) {
	      t = n;
	    }
	  }), r.__H = void 0, t && c$1.__e(t, r.__v));
	};
	var k = "function" == typeof requestAnimationFrame;
	function w$2(n) {
	  var t,
	    r = function () {
	      clearTimeout(u), k && cancelAnimationFrame(t), setTimeout(n);
	    },
	    u = setTimeout(r, 35);
	  k && (t = requestAnimationFrame(r));
	}
	function z(n) {
	  var t = r$1,
	    u = n.__c;
	  "function" == typeof u && (n.__c = void 0, u()), r$1 = t;
	}
	function B(n) {
	  var t = r$1;
	  n.__c = n.__(), r$1 = t;
	}
	function C(n, t) {
	  return !n || n.length !== t.length || t.some(function (t, r) {
	    return t !== n[r];
	  });
	}

	var i = Symbol.for("preact-signals");
	function t() {
	  if (!(s > 1)) {
	    var i,
	      t = false;
	    !function () {
	      var i = c;
	      c = void 0;
	      while (void 0 !== i) {
	        if (i.S.v === i.v) i.S.i = i.i;
	        i = i.o;
	      }
	    }();
	    while (void 0 !== h$1) {
	      var n = h$1;
	      h$1 = void 0;
	      v++;
	      while (void 0 !== n) {
	        var r = n.u;
	        n.u = void 0;
	        n.f &= -3;
	        if (!(8 & n.f) && w$1(n)) try {
	          n.c();
	        } catch (n) {
	          if (!t) {
	            i = n;
	            t = true;
	          }
	        }
	        n = r;
	      }
	    }
	    v = 0;
	    s--;
	    if (t) throw i;
	  } else s--;
	}
	function n(i) {
	  if (s > 0) return i();
	  e = ++u;
	  s++;
	  try {
	    return i();
	  } finally {
	    t();
	  }
	}
	var r = void 0;
	function o(i) {
	  var t = r;
	  r = void 0;
	  try {
	    return i();
	  } finally {
	    r = t;
	  }
	}
	var h$1 = void 0,
	  s = 0,
	  v = 0,
	  u = 0,
	  e = 0,
	  c = void 0,
	  d = 0;
	function a(i) {
	  if (void 0 !== r) {
	    var t = i.n;
	    if (void 0 === t || t.t !== r) {
	      t = {
	        i: 0,
	        S: i,
	        p: r.s,
	        n: void 0,
	        t: r,
	        e: void 0,
	        x: void 0,
	        r: t
	      };
	      if (void 0 !== r.s) r.s.n = t;
	      r.s = t;
	      i.n = t;
	      if (32 & r.f) i.S(t);
	      return t;
	    } else if (-1 === t.i) {
	      t.i = 0;
	      if (void 0 !== t.n) {
	        t.n.p = t.p;
	        if (void 0 !== t.p) t.p.n = t.n;
	        t.p = r.s;
	        t.n = void 0;
	        r.s.n = t;
	        r.s = t;
	      }
	      return t;
	    }
	  }
	}
	function l$1(i, t) {
	  this.v = i;
	  this.i = 0;
	  this.n = void 0;
	  this.t = void 0;
	  this.l = 0;
	  this.W = null == t ? void 0 : t.watched;
	  this.Z = null == t ? void 0 : t.unwatched;
	  this.name = null == t ? void 0 : t.name;
	}
	l$1.prototype.brand = i;
	l$1.prototype.h = function () {
	  return true;
	};
	l$1.prototype.S = function (i) {
	  var t = this,
	    n = this.t;
	  if (n !== i && void 0 === i.e) {
	    i.x = n;
	    this.t = i;
	    if (void 0 !== n) n.e = i;else o(function () {
	      var i;
	      null == (i = t.W) || i.call(t);
	    });
	  }
	};
	l$1.prototype.U = function (i) {
	  var t = this;
	  if (void 0 !== this.t) {
	    var n = i.e,
	      r = i.x;
	    if (void 0 !== n) {
	      n.x = r;
	      i.e = void 0;
	    }
	    if (void 0 !== r) {
	      r.e = n;
	      i.x = void 0;
	    }
	    if (i === this.t) {
	      this.t = r;
	      if (void 0 === r) o(function () {
	        var i;
	        null == (i = t.Z) || i.call(t);
	      });
	    }
	  }
	};
	l$1.prototype.subscribe = function (i) {
	  var t = this;
	  return j(function () {
	    var n = t.value,
	      o = r;
	    r = void 0;
	    try {
	      i(n);
	    } finally {
	      r = o;
	    }
	  }, {
	    name: "sub"
	  });
	};
	l$1.prototype.valueOf = function () {
	  return this.value;
	};
	l$1.prototype.toString = function () {
	  return this.value + "";
	};
	l$1.prototype.toJSON = function () {
	  return this.value;
	};
	l$1.prototype.peek = function () {
	  var i = r;
	  r = void 0;
	  try {
	    return this.value;
	  } finally {
	    r = i;
	  }
	};
	Object.defineProperty(l$1.prototype, "value", {
	  get: function () {
	    var i = a(this);
	    if (void 0 !== i) i.i = this.i;
	    return this.v;
	  },
	  set: function (i) {
	    if (i !== this.v) {
	      if (v > 100) throw new Error("Cycle detected");
	      !function (i) {
	        if (0 !== s && 0 === v) if (i.l !== e) {
	          i.l = e;
	          c = {
	            S: i,
	            v: i.v,
	            i: i.i,
	            o: c
	          };
	        }
	      }(this);
	      this.v = i;
	      this.i++;
	      d++;
	      s++;
	      try {
	        for (var n = this.t; void 0 !== n; n = n.x) n.t.N();
	      } finally {
	        t();
	      }
	    }
	  }
	});
	function y$1(i, t) {
	  return new l$1(i, t);
	}
	function w$1(i) {
	  for (var t = i.s; void 0 !== t; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return true;
	  return false;
	}
	function _$3(i) {
	  for (var t = i.s; void 0 !== t; t = t.n) {
	    var n = t.S.n;
	    if (void 0 !== n) t.r = n;
	    t.S.n = t;
	    t.i = -1;
	    if (void 0 === t.n) {
	      i.s = t;
	      break;
	    }
	  }
	}
	function b$1(i) {
	  var t = i.s,
	    n = void 0;
	  while (void 0 !== t) {
	    var r = t.p;
	    if (-1 === t.i) {
	      t.S.U(t);
	      if (void 0 !== r) r.n = t.n;
	      if (void 0 !== t.n) t.n.p = r;
	    } else n = t;
	    t.S.n = t.r;
	    if (void 0 !== t.r) t.r = void 0;
	    t = r;
	  }
	  i.s = n;
	}
	function p$1(i, t) {
	  l$1.call(this, void 0);
	  this.x = i;
	  this.s = void 0;
	  this.g = d - 1;
	  this.f = 4;
	  this.W = null == t ? void 0 : t.watched;
	  this.Z = null == t ? void 0 : t.unwatched;
	  this.name = null == t ? void 0 : t.name;
	}
	p$1.prototype = new l$1();
	p$1.prototype.h = function () {
	  this.f &= -3;
	  if (1 & this.f) return false;
	  if (32 == (36 & this.f)) return true;
	  this.f &= -5;
	  if (this.g === d) return true;
	  this.g = d;
	  this.f |= 1;
	  if (this.i > 0 && !w$1(this)) {
	    this.f &= -2;
	    return true;
	  }
	  var i = r;
	  try {
	    _$3(this);
	    r = this;
	    var t = this.x();
	    if (16 & this.f || this.v !== t || 0 === this.i) {
	      this.v = t;
	      this.f &= -17;
	      this.i++;
	    }
	  } catch (i) {
	    this.v = i;
	    this.f |= 16;
	    this.i++;
	  }
	  r = i;
	  b$1(this);
	  this.f &= -2;
	  return true;
	};
	p$1.prototype.S = function (i) {
	  if (void 0 === this.t) {
	    this.f |= 36;
	    for (var t = this.s; void 0 !== t; t = t.n) t.S.S(t);
	  }
	  l$1.prototype.S.call(this, i);
	};
	p$1.prototype.U = function (i) {
	  if (void 0 !== this.t) {
	    l$1.prototype.U.call(this, i);
	    if (void 0 === this.t) {
	      this.f &= -33;
	      for (var t = this.s; void 0 !== t; t = t.n) t.S.U(t);
	    }
	  }
	};
	p$1.prototype.N = function () {
	  if (!(2 & this.f)) {
	    this.f |= 6;
	    for (var i = this.t; void 0 !== i; i = i.x) i.t.N();
	  }
	};
	Object.defineProperty(p$1.prototype, "value", {
	  get: function () {
	    if (1 & this.f) throw new Error("Cycle detected");
	    var i = a(this);
	    this.h();
	    if (void 0 !== i) i.i = this.i;
	    if (16 & this.f) throw this.v;
	    return this.v;
	  }
	});
	function g$1(i, t) {
	  return new p$1(i, t);
	}
	function S(i) {
	  var n = i.m;
	  i.m = void 0;
	  if ("function" == typeof n) {
	    s++;
	    var o = r;
	    r = void 0;
	    try {
	      n();
	    } catch (t) {
	      i.f &= -2;
	      i.f |= 8;
	      m(i);
	      throw t;
	    } finally {
	      r = o;
	      t();
	    }
	  }
	}
	function m(i) {
	  for (var t = i.s; void 0 !== t; t = t.n) t.S.U(t);
	  i.x = void 0;
	  i.s = void 0;
	  S(i);
	}
	function x$1(i) {
	  if (r !== this) throw new Error("Out-of-order effect");
	  b$1(this);
	  r = i;
	  this.f &= -2;
	  if (8 & this.f) m(this);
	  t();
	}
	function E(i, t) {
	  this.x = i;
	  this.m = void 0;
	  this.s = void 0;
	  this.u = void 0;
	  this.f = 32;
	  this.name = null == t ? void 0 : t.name;
	}
	E.prototype.c = function () {
	  var i = this.S();
	  try {
	    if (8 & this.f) return;
	    if (void 0 === this.x) return;
	    var t = this.x();
	    if ("function" == typeof t) this.m = t;
	  } finally {
	    i();
	  }
	};
	E.prototype.S = function () {
	  if (1 & this.f) throw new Error("Cycle detected");
	  this.f |= 1;
	  this.f &= -9;
	  S(this);
	  _$3(this);
	  s++;
	  var i = r;
	  r = this;
	  return x$1.bind(this, i);
	};
	E.prototype.N = function () {
	  if (!(2 & this.f)) {
	    this.f |= 2;
	    this.u = h$1;
	    h$1 = this;
	  }
	};
	E.prototype.d = function () {
	  this.f |= 8;
	  if (!(1 & this.f)) m(this);
	};
	E.prototype.dispose = function () {
	  this.d();
	};
	function j(i, t) {
	  var n = new E(i, t);
	  try {
	    n.c();
	  } catch (i) {
	    n.d();
	    throw i;
	  }
	  var r = n.d.bind(n);
	  r[Symbol.dispose] = r;
	  return r;
	}

	var l,
	  h,
	  p = "undefined" != typeof window && !!window.__PREACT_SIGNALS_DEVTOOLS__,
	  _$2 = [];
	j(function () {
	  l = this.N;
	})();
	function g(i, r) {
	  l$3[i] = r.bind(null, l$3[i] || function () {});
	}
	function b(i) {
	  if (h) {
	    var n = h;
	    h = void 0;
	    n();
	  }
	  h = i && i.S();
	}
	function y(i) {
	  var n = this,
	    t = i.data,
	    e = useSignal(t);
	  e.value = t;
	  var f = T(function () {
	      var i = n,
	        t = n.__v;
	      while (t = t.__) if (t.__c) {
	        t.__c.__$f |= 4;
	        break;
	      }
	      var o = g$1(function () {
	          var i = e.value.value;
	          return 0 === i ? 0 : true === i ? "" : i || "";
	        }),
	        f = g$1(function () {
	          return !Array.isArray(o.value) && !t$2(o.value);
	        }),
	        a = j(function () {
	          this.N = F;
	          if (f.value) {
	            var n = o.value;
	            if (i.__v && i.__v.__e && 3 === i.__v.__e.nodeType) i.__v.__e.data = n;
	          }
	        }),
	        v = n.__$u.d;
	      n.__$u.d = function () {
	        a();
	        v.call(this);
	      };
	      return [f, o];
	    }, []),
	    a = f[0],
	    v = f[1];
	  return a.value ? v.peek() : v.value;
	}
	y.displayName = "ReactiveTextNode";
	Object.defineProperties(l$1.prototype, {
	  constructor: {
	    configurable: true,
	    value: void 0
	  },
	  type: {
	    configurable: true,
	    value: y
	  },
	  props: {
	    configurable: true,
	    get: function () {
	      var i = this;
	      return {
	        data: {
	          get value() {
	            return i.value;
	          }
	        }
	      };
	    }
	  },
	  __b: {
	    configurable: true,
	    value: 1
	  }
	});
	g("__b", function (i, n) {
	  if ("string" == typeof n.type) {
	    var r,
	      t = n.props;
	    for (var o in t) if ("children" !== o) {
	      var e = t[o];
	      if (e instanceof l$1) {
	        if (!r) n.__np = r = {};
	        r[o] = e;
	        t[o] = e.peek();
	      }
	    }
	  }
	  i(n);
	});
	g("__r", function (i, n) {
	  i(n);
	  if (n.type !== S$1) {
	    b();
	    var r,
	      o = n.__c;
	    if (o) {
	      o.__$f &= -2;
	      if (void 0 === (r = o.__$u)) o.__$u = r = function (i, n) {
	        var r;
	        j(function () {
	          r = this;
	        }, {
	          name: n
	        });
	        r.c = i;
	        return r;
	      }(function () {
	        var i;
	        if (p) null == (i = r.y) || i.call(r);
	        o.__$f |= 1;
	        o.setState({});
	      }, "function" == typeof n.type ? n.type.displayName || n.type.name : "");
	    }
	    b(r);
	  }
	});
	g("__e", function (i, n, r, t) {
	  b();
	  i(n, r, t);
	});
	g("diffed", function (i, n) {
	  b();
	  var r;
	  if ("string" == typeof n.type && (r = n.__e)) {
	    var t = n.__np,
	      o = n.props;
	    if (t) {
	      var e = r.U;
	      if (e) for (var f in e) {
	        var u = e[f];
	        if (void 0 !== u && !(f in t)) {
	          u.d();
	          e[f] = void 0;
	        }
	      } else {
	        e = {};
	        r.U = e;
	      }
	      for (var a in t) {
	        var c = e[a],
	          v = t[a];
	        if (void 0 === c) {
	          c = w(r, a, v);
	          e[a] = c;
	        } else c.o(v, o);
	      }
	      for (var s in t) o[s] = t[s];
	    }
	  }
	  i(n);
	});
	function w(i, n, r, t) {
	  var o = n in i && void 0 === i.ownerSVGElement,
	    e = y$1(r),
	    f = r.peek();
	  return {
	    o: function (i, n) {
	      e.value = i;
	      f = i.peek();
	    },
	    d: j(function () {
	      this.N = F;
	      var r = e.value.value;
	      if (f !== r) {
	        f = void 0;
	        if (o) i[n] = r;else if (null != r && (false !== r || "-" === n[4])) i.setAttribute(n, r);else i.removeAttribute(n);
	      } else f = void 0;
	    })
	  };
	}
	g("unmount", function (i, n) {
	  if ("string" == typeof n.type) {
	    var r = n.__e;
	    if (r) {
	      var t = r.U;
	      if (t) {
	        r.U = void 0;
	        for (var o in t) {
	          var e = t[o];
	          if (e) e.d();
	        }
	      }
	    }
	    n.__np = void 0;
	  } else {
	    var f = n.__c;
	    if (f) {
	      var u = f.__$u;
	      if (u) {
	        f.__$u = void 0;
	        u.d();
	      }
	    }
	  }
	  i(n);
	});
	g("__h", function (i, n, r, t) {
	  if (t < 3 || 9 === t) n.__$f |= 2;
	  i(n, r, t);
	});
	function useSignal(i, n) {
	  return T(function () {
	    return y$1(i, n);
	  }, []);
	}
	var q = function (i) {
	    queueMicrotask(function () {
	      queueMicrotask(i);
	    });
	  };
	function x() {
	  n(function () {
	    var i;
	    while (i = _$2.shift()) l.call(i);
	  });
	}
	function F() {
	  if (1 === _$2.push(this)) (l$3.requestAnimationFrame || q)(x);
	}

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var jquery1_12_4_min = {exports: {}};

	/*! jQuery v1.12.4 | (c) jQuery Foundation | jquery.org/license */

	(function (module) {
		!function(a,b){module.exports=a.document?b(a,true):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)};}("undefined"!=typeof window?window:commonjsGlobal,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="1.12.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=false;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=false,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:true,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return "function"===n.type(a)},isArray:Array.isArray||function(a){return "array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){var b=a&&a.toString();return !n.isArray(a)&&b-parseFloat(b)+1>=0},isEmptyObject:function(a){var b;for(b in a)return  false;return  true},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return  false;try{if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype,"isPrototypeOf"))return !1}catch(c){return  false}if(!l.ownFirst)for(b in a)return k.call(a,b);for(b in a);return void 0===b||k.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b);})(b);},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===false)break}else for(d in a)if(b.call(a[d],d,a[d])===false)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(h)return h.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return  -1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return "string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=e.call(arguments,2),d=function(){return a.apply(b||this,c.concat(e.call(arguments)))},d.guid=a.guid=a.guid||n.guid++,d):void 0},now:function(){return +new Date},support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase();});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return "function"===c||n.isWindow(a)?false:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=true),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return  -1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m();};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType;}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b));}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1;}};}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else {if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b;}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id");}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=true,a}function ia(a){var b=n.createElement("div");try{return !!a(b)}catch(c){return  false}finally{b.parentNode&&b.parentNode.removeChild(b),b=null;}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b;}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return  -1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return "input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return ("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]));})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:false},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,false):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return "undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return "undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]");}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:");})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O);}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return  true;return  false},B=b?function(a,b){if(a===b)return l=true,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=true,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return (a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1);}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a);}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,true))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return "*"===a?function(){return  true}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":false):true}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return !!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=false;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return  false;o=p="only"===a&&!o&&"nextSibling";}return  true}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===false)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g]);}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f));}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return (b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return  false}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===false},disabled:function(a){return a.disabled===true},checked:function(a){var b=a.nodeName.toLowerCase();return "input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===true},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return  false;return  true},parent:function(a){return !d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return "input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return "input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return [0]}),last:na(function(a,b){return [b-1]}),eq:na(function(a,b,c){return [0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in {radio:true,checkbox:true,file:true,password:true,image:true})d.pseudos[b]=la(b);for(b in {submit:true,reset:true})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=false,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return  true}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return  true}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return  false;return  true}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l));}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i);}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l));}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r);})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,true),l=ra(function(a){return J(b,a)>-1},h,true),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else {if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c);}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y);}c&&((l=!q&&l)&&r--,f&&t.push(l));}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u);}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i);}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a;}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length);}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return (n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===true?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a);}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return !!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a);}return n.grep(a,function(a){return n.inArray(a,b)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return  true}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(z(this,a||[],false))},not:function(a){return this.pushStack(z(this,a||[],true))},is:function(a){return !!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],false).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return !b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,true)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}if(f=d.getElementById(e[2]),f&&f.parentNode){if(f.id!==e[2])return A.find(a);this.length=1,this[0]=f;}return this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:true,contents:true,next:true,prev:true};n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return  true})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return "Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||(e=n.uniqueSort(e)),D.test(a)&&(e=e.reverse())),this.pushStack(e)};});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=true;}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=true;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===false&&a.stopOnFalse&&(h=f.length,c=false);}a.memory||(c=false),b=false,e&&(f=c?[]:"");},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c);});}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--;}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return !f},lock:function(){return e=true,c||j.disable(),this},locked:function(){return !!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return !!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments);});}),a=null;}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h;},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith;}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c);}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:false,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(true);},ready:function(a){(a===true?--n.readyWait:n.isReady)||(n.isReady=true,a!==true&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))));}});function J(){d.addEventListener?(d.removeEventListener("DOMContentLoaded",K),a.removeEventListener("load",K)):(d.detachEvent("onreadystatechange",K),a.detachEvent("onload",K));}function K(){(d.addEventListener||"load"===a.event.type||"complete"===d.readyState)&&(J(),n.ready());}n.ready.promise=function(b){if(!I)if(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll)a.setTimeout(n.ready);else if(d.addEventListener)d.addEventListener("DOMContentLoaded",K),a.addEventListener("load",K);else {d.attachEvent("onreadystatechange",K),a.attachEvent("onload",K);var c=false;try{c=null==a.frameElement&&d.documentElement;}catch(e){}c&&c.doScroll&&!function f(){if(!n.isReady){try{c.doScroll("left");}catch(b){return a.setTimeout(f,50)}J(),n.ready();}}();}return I.promise(b)},n.ready.promise();var L;for(L in n(l))break;l.ownFirst="0"===L,l.inlineBlockNeedsLayout=false,n(function(){var a,b,c,e;c=d.getElementsByTagName("body")[0],c&&c.style&&(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",l.inlineBlockNeedsLayout=a=3===b.offsetWidth,a&&(c.style.zoom=1)),c.removeChild(e));}),function(){var a=d.createElement("div");l.deleteExpando=true;try{delete a.test;}catch(b){l.deleteExpando=false;}a=null;}();var M=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?false:!b||b!==true&&a.getAttribute("classid")===b},N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(O,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c;}catch(e){}n.data(a,b,c);}else c=void 0;
		}return c}function Q(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return  false;return  true}function R(a,b,d,e){if(M(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),"object"!=typeof b&&"function"!=typeof b||(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f}}function S(a,b,c){if(M(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!Q(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,Q(g[h])))&&(f?n.cleanData([a],true):l.deleteExpando||g!=g.window?delete g[h]:g[h]=void 0);}}}n.extend({cache:{},noData:{"applet ":true,"embed ":true,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!Q(a)},data:function(a,b,c){return R(a,b,c)},removeData:function(a,b){return S(a,b)},_data:function(a,b,c){return R(a,b,c,true)},_removeData:function(a,b){return S(a,b,true)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));n._data(f,"parsedAttrs",true);}return e}return "object"==typeof a?this.each(function(){n.data(this,a);}):arguments.length>1?this.each(function(){n.data(this,a,b);}):f?P(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a);})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=n._data(a,b),c&&(!d||n.isArray(c)?d=n._data(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b);};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire();},_queueHooks:function(a,b){var c=b+"queueHooks";return n._data(a,c)||n._data(a,c,{empty:n.Callbacks("once memory").add(function(){n._removeData(a,b+"queue"),n._removeData(a,c);})})}}),n.fn.extend({queue:function(a,b){var c=2;return "string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a);})},dequeue:function(a){return this.each(function(){n.dequeue(this,a);})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f]);};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=n._data(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}}),function(){var a;l.shrinkWrapBlocks=function(){if(null!=a)return a;a=false;var b,c,e;return c=d.getElementsByTagName("body")[0],c&&c.style?(b=d.createElement("div"),e=d.createElement("div"),e.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",c.appendChild(e).appendChild(b),"undefined"!=typeof b.style.zoom&&(b.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",b.appendChild(d.createElement("div")).style.width="5px",a=3!==b.offsetWidth),c.removeChild(e),a):void 0};}();var T=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,U=new RegExp("^(?:([+-])=|)("+T+")([a-z%]*)$","i"),V=["Top","Right","Bottom","Left"],W=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function X(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&U.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var Y=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=true;for(h in c)Y(a,b,h,c[h],true,f,g);}else if(void 0!==d&&(e=true,n.isFunction(d)||(g=true),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},Z=/^(?:checkbox|radio)$/i,$=/<([\w:-]+)/,_=/^$|\/(?:java|ecma)script/i,aa=/^\s+/,ba="abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";function ca(a){var b=ba.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}!function(){var a=d.createElement("div"),b=d.createDocumentFragment(),c=d.createElement("input");a.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",l.leadingWhitespace=3===a.firstChild.nodeType,l.tbody=!a.getElementsByTagName("tbody").length,l.htmlSerialize=!!a.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==d.createElement("nav").cloneNode(true).outerHTML,c.type="checkbox",c.checked=true,b.appendChild(c),l.appendChecked=c.checked,a.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!a.cloneNode(true).lastChild.defaultValue,b.appendChild(a),c=d.createElement("input"),c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),a.appendChild(c),l.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked,l.noCloneEvent=!!a.addEventListener,a[n.expando]=1,l.attributes=!a.getAttribute(n.expando);}();var da={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]};da.optgroup=da.option,da.tbody=da.tfoot=da.colgroup=da.caption=da.thead,da.th=da.td;function ea(a,b){var c,d,e=0,f="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,ea(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function fa(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"));}var ga=/<|&#?\w+;/,ha=/<tbody/i;function ia(a){Z.test(a.type)&&(a.defaultChecked=a.checked);}function ja(a,b,c,d,e){for(var f,g,h,i,j,k,m,o=a.length,p=ca(b),q=[],r=0;o>r;r++)if(g=a[r],g||0===g)if("object"===n.type(g))n.merge(q,g.nodeType?[g]:g);else if(ga.test(g)){i=i||p.appendChild(b.createElement("div")),j=($.exec(g)||["",""])[1].toLowerCase(),m=da[j]||da._default,i.innerHTML=m[1]+n.htmlPrefilter(g)+m[2],f=m[0];while(f--)i=i.lastChild;if(!l.leadingWhitespace&&aa.test(g)&&q.push(b.createTextNode(aa.exec(g)[0])),!l.tbody){g="table"!==j||ha.test(g)?"<table>"!==m[1]||ha.test(g)?0:i:i.firstChild,f=g&&g.childNodes.length;while(f--)n.nodeName(k=g.childNodes[f],"tbody")&&!k.childNodes.length&&g.removeChild(k);}n.merge(q,i.childNodes),i.textContent="";while(i.firstChild)i.removeChild(i.firstChild);i=p.lastChild;}else q.push(b.createTextNode(g));i&&p.removeChild(i),l.appendChecked||n.grep(ea(q,"input"),ia),r=0;while(g=q[r++])if(d&&n.inArray(g,d)>-1)e&&e.push(g);else if(h=n.contains(g.ownerDocument,g),i=ea(p.appendChild(g),"script"),h&&fa(i),c){f=0;while(g=i[f++])_.test(g.type||"")&&c.push(g);}return i=null,p}!function(){var b,c,e=d.createElement("div");for(b in {submit:true,change:true,focusin:true})c="on"+b,(l[b]=c in a)||(e.setAttribute(c,"t"),l[b]=e.attributes[c].expando===false);e=null;}();var ka=/^(?:input|select|textarea)$/i,la=/^key/,ma=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,na=/^(?:focusinfocus|focusoutblur)$/,oa=/^([^.]*)(?:\.(.+)|)/;function pa(){return  true}function qa(){return  false}function ra(){try{return d.activeElement}catch(a){}}function sa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)sa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===false)e=qa;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c);})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return "undefined"==typeof n||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(G)||[""],h=b.length;while(h--)f=oa.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==false||(a.addEventListener?a.addEventListener(o,k,false):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=true);a=null;}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=oa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==false||n.removeEvent(a,o,r.handle),delete k[o]);}else for(o in k)n.event.remove(a,o+b[j],c,d,true);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"));}},trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(i=m=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!na.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),h=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),l=n.event.special[q]||{},f||!l.trigger||l.trigger.apply(e,c)!==false)){if(!f&&!l.noBubble&&!n.isWindow(e)){for(j=l.delegateType||q,na.test(j+q)||(i=i.parentNode);i;i=i.parentNode)p.push(i),m=i;m===(e.ownerDocument||d)&&p.push(m.defaultView||m.parentWindow||a);}o=0;while((i=p[o++])&&!b.isPropagationStopped())b.type=o>1?j:l.bindType||q,g=(n._data(i,"events")||{})[b.type]&&n._data(i,"handle"),g&&g.apply(i,c),g=h&&i[h],g&&g.apply&&M(i)&&(b.result=g.apply(i,c),b.result===false&&b.preventDefault());if(b.type=q,!f&&!b.isDefaultPrevented()&&(!l._default||l._default.apply(p.pop(),c)===false)&&M(e)&&h&&e[q]&&!n.isWindow(e)){m=e[h],m&&(e[h]=null),n.event.triggered=q;try{e[q]();}catch(s){}n.event.triggered=void 0,m&&(e[h]=m);}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==false){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===false&&(a.preventDefault(),a.stopPropagation()));}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==true||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d});}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ma.test(f)?this.mouseHooks:la.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=g.srcElement||d),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,h.filter?h.filter(a,g):a},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button,h=b.fromElement;return null==a.pageX&&null!=b.clientX&&(e=a.target.ownerDocument||d,f=e.documentElement,c=e.body,a.pageX=b.clientX+(f&&f.scrollLeft||c&&c.scrollLeft||0)-(f&&f.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(f&&f.scrollTop||c&&c.scrollTop||0)-(f&&f.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&h&&(a.relatedTarget=h===a.target?b.toElement:h),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},special:{load:{noBubble:true},focus:{trigger:function(){if(this!==ra()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===ra()&&this.blur?(this.blur(),false):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),false):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){ void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result);}}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:true});n.event.trigger(d,null,b),d.isDefaultPrevented()&&c.preventDefault();}},n.removeEvent=d.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c);}:function(a,b,c){var d="on"+b;a.detachEvent&&("undefined"==typeof a[d]&&(a[d]=null),a.detachEvent(d,c));},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===false?pa:qa):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=true)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:qa,isPropagationStopped:qa,isImmediatePropagationStopped:qa,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=pa,a&&(a.preventDefault?a.preventDefault():a.returnValue=false);},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=pa,a&&!this.isSimulated&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=true);},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=pa,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation();}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}};}),l.submit||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?false:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?n.prop(b,"form"):void 0;c&&!n._data(c,"submit")&&(n.event.add(c,"submit._submit",function(a){a._submitBubble=true;}),n._data(c,"submit",true));})},postDispatch:function(a){a._submitBubble&&(delete a._submitBubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a));},teardown:function(){return n.nodeName(this,"form")?false:void n.event.remove(this,"._submit")}}),l.change||(n.event.special.change={setup:function(){return ka.test(this.nodeName)?("checkbox"!==this.type&&"radio"!==this.type||(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._justChanged=true);}),n.event.add(this,"click._change",function(a){this._justChanged&&!a.isTrigger&&(this._justChanged=false),n.event.simulate("change",this,a);})),false):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;ka.test(b.nodeName)&&!n._data(b,"change")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a);}),n._data(b,"change",true));})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!ka.test(this.nodeName)}}),l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a));};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,true),n._data(d,b,(e||0)+1);},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,true),n._removeData(d,b));}};}),n.fn.extend({on:function(a,b,c,d){return sa(this,a,b,c,d)},one:function(a,b,c,d){return sa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==false&&"function"!=typeof b||(c=b,b=void 0),c===false&&(c=qa),this.each(function(){n.event.remove(this,a,c,b);})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this);})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,true):void 0}});var ta=/ jQuery\d+="(?:null|\d+)"/g,ua=new RegExp("<(?:"+ba+")[\\s/>]","i"),va=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,wa=/<script|<style|<link/i,xa=/checked\s*(?:[^=]|=\s*.checked.)/i,ya=/^true\/(.*)/,za=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Aa=ca(d),Ba=Aa.appendChild(d.createElement("div"));function Ca(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function Da(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function Ea(a){var b=ya.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Fa(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d]);}g.data&&(g.data=n.extend({},g.data));}}function Ga(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando);}"script"===c&&b.text!==a.text?(Da(b).text=a.text,Ea(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&Z.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue);}}function Ha(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&xa.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),Ha(f,b,c,d);});if(o&&(k=ja(b,a[0].ownerDocument,false,a,d),e=k.firstChild,1===k.childNodes.length&&(k=e),e||d)){for(i=n.map(ea(k,"script"),Da),h=i.length;o>m;m++)g=k,m!==p&&(g=n.clone(g,true,true),h&&n.merge(i,ea(g,"script"))),c.call(a[m],g,m);if(h)for(j=i[i.length-1].ownerDocument,n.map(i,Ea),m=0;h>m;m++)g=i[m],_.test(g.type||"")&&!n._data(g,"globalEval")&&n.contains(j,g)&&(g.src?n._evalUrl&&n._evalUrl(g.src):n.globalEval((g.text||g.textContent||g.innerHTML||"").replace(za,"")));k=e=null;}return a}function Ia(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(ea(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&fa(ea(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(va,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!ua.test("<"+a.nodeName+">")?f=a.cloneNode(true):(Ba.innerHTML=a.outerHTML,Ba.removeChild(f=Ba.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=ea(f),h=ea(a),g=0;null!=(e=h[g]);++g)d[g]&&Ga(e,d[g]);if(b)if(c)for(h=h||ea(a),d=d||ea(f),g=0;null!=(e=h[g]);g++)Fa(e,d[g]);else Fa(a,f);return d=ea(f,"script"),d.length>0&&fa(d,!i&&ea(a,"script")),d=h=e=null,f},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.attributes,m=n.event.special;null!=(d=a[h]);h++)if((b||M(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k||"undefined"==typeof d.removeAttribute?d[i]=void 0:d.removeAttribute(i),c.push(f));}}}),n.fn.extend({domManip:Ha,detach:function(a){return Ia(this,a,true)},remove:function(a){return Ia(this,a)},text:function(a){return Y(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||d).createTextNode(a))},null,a,arguments.length)},append:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.appendChild(a);}})},prepend:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.insertBefore(a,b.firstChild);}})},before:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this);})},after:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling);})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(ea(a,false));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0);}return this},clone:function(a,b){return a=null==a?false:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return Y(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(ta,""):void 0;if("string"==typeof a&&!wa.test(a)&&(l.htmlSerialize||!ua.test(a))&&(l.leadingWhitespace||!aa.test(a))&&!da[($.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ea(b,!1)),b.innerHTML=a);b=0;}catch(e){}}b&&this.empty().append(a);},null,a,arguments.length)},replaceWith:function(){var a=[];return Ha(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(ea(this)),c&&c.replaceChild(b,this));},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],f=n(a),h=f.length-1;h>=d;d++)c=d===h?this:this.clone(true),n(f[d])[b](c),g.apply(e,c.get());return this.pushStack(e)};});var Ja,Ka={HTML:"block",BODY:"block"};function La(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function Ma(a){var b=d,c=Ka[a];return c||(c=La(a,b),"none"!==c&&c||(Ja=(Ja||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=(Ja[0].contentWindow||Ja[0].contentDocument).document,b.write(),b.close(),c=La(a,b),Ja.detach()),Ka[a]=c),c}var Na=/^margin/,Oa=new RegExp("^("+T+")(?!px)[a-z%]+$","i"),Pa=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Qa=d.documentElement;!function(){var b,c,e,f,g,h,i=d.createElement("div"),j=d.createElement("div");if(j.style){j.style.cssText="float:left;opacity:.5",l.opacity="0.5"===j.style.opacity,l.cssFloat=!!j.style.cssFloat,j.style.backgroundClip="content-box",j.cloneNode(true).style.backgroundClip="",l.clearCloneStyle="content-box"===j.style.backgroundClip,i=d.createElement("div"),i.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",j.innerHTML="",i.appendChild(j),l.boxSizing=""===j.style.boxSizing||""===j.style.MozBoxSizing||""===j.style.WebkitBoxSizing,n.extend(l,{reliableHiddenOffsets:function(){return null==b&&k(),f},boxSizingReliable:function(){return null==b&&k(),e},pixelMarginRight:function(){return null==b&&k(),c},pixelPosition:function(){return null==b&&k(),b},reliableMarginRight:function(){return null==b&&k(),g},reliableMarginLeft:function(){return null==b&&k(),h}});function k(){var k,l,m=d.documentElement;m.appendChild(i),j.style.cssText="-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",b=e=h=false,c=g=true,a.getComputedStyle&&(l=a.getComputedStyle(j),b="1%"!==(l||{}).top,h="2px"===(l||{}).marginLeft,e="4px"===(l||{width:"4px"}).width,j.style.marginRight="50%",c="4px"===(l||{marginRight:"4px"}).marginRight,k=j.appendChild(d.createElement("div")),k.style.cssText=j.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",k.style.marginRight=k.style.width="0",j.style.width="1px",g=!parseFloat((a.getComputedStyle(k)||{}).marginRight),j.removeChild(k)),j.style.display="none",f=0===j.getClientRects().length,f&&(j.style.display="",j.innerHTML="<table><tr><td></td><td>t</td></tr></table>",j.childNodes[0].style.borderCollapse="separate",k=j.getElementsByTagName("td"),k[0].style.cssText="margin:0;border:0;padding:0;display:none",f=0===k[0].offsetHeight,f&&(k[0].style.display="",k[1].style.display="none",f=0===k[0].offsetHeight)),m.removeChild(i);}}}();var Ra,Sa,Ta=/^(top|right|bottom|left)$/;a.getComputedStyle?(Ra=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Oa.test(g)&&Na.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0===g?g:g+""}):Qa.currentStyle&&(Ra=function(a){return a.currentStyle},Sa=function(a,b,c){var d,e,f,g,h=a.style;return c=c||Ra(a),g=c?c[b]:void 0,null==g&&h&&h[b]&&(g=h[b]),Oa.test(g)&&!Ta.test(b)&&(d=h.left,e=a.runtimeStyle,f=e&&e.left,f&&(e.left=a.currentStyle.left),h.left="fontSize"===b?"1em":g,g=h.pixelLeft+"px",h.left=d,f&&(e.left=f)),void 0===g?g:g+""||"auto"});function Ua(a,b){return {get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Va=/alpha\([^)]*\)/i,Wa=/opacity\s*=\s*([^)]*)/i,Xa=/^(none|table(?!-c[ea]).+)/,Ya=new RegExp("^("+T+")(.*)$","i"),Za={position:"absolute",visibility:"hidden",display:"block"},$a={letterSpacing:"0",fontWeight:"400"},_a=["Webkit","O","Moz","ms"],ab=d.createElement("div").style;function bb(a){if(a in ab)return a;var b=a.charAt(0).toUpperCase()+a.slice(1),c=_a.length;while(c--)if(a=_a[c]+b,a in ab)return a}function cb(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=n._data(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&W(d)&&(f[g]=n._data(d,"olddisplay",Ma(d.nodeName)))):(e=W(d),(c&&"none"!==c||!e)&&n._data(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}function db(a,b,c){var d=Ya.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function eb(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+V[f],true,e)),d?("content"===c&&(g-=n.css(a,"padding"+V[f],true,e)),"margin"!==c&&(g-=n.css(a,"border"+V[f]+"Width",true,e))):(g+=n.css(a,"padding"+V[f],true,e),"padding"!==c&&(g+=n.css(a,"border"+V[f]+"Width",true,e)));return g}function fb(a,b,c){var d=true,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ra(a),g=l.boxSizing&&"border-box"===n.css(a,"boxSizing",false,f);if(0>=e||null==e){if(e=Sa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Oa.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0;}return e+eb(a,b,c||(g?"border":"content"),d,f)+"px"}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Sa(a,"opacity");return ""===c?"1":c}}}},cssNumber:{animationIterationCount:true,columnCount:true,fillOpacity:true,flexGrow:true,flexShrink:true,fontWeight:true,lineHeight:true,opacity:true,order:true,orphans:true,widows:true,zIndex:true,zoom:true},cssProps:{"float":l.cssFloat?"cssFloat":"styleFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;if(b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c)return g&&"get"in g&&void 0!==(e=g.get(a,false,d))?e:i[b];if(f=typeof c,"string"===f&&(e=U.exec(c))&&e[1]&&(c=X(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),!(g&&"set"in g&&void 0===(c=g.set(a,c,d)))))try{i[b]=c;}catch(j){}}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=bb(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(f=g.get(a,true,c)),void 0===f&&(f=Sa(a,b,d)),"normal"===f&&b in $a&&(f=$a[b]),""===c||c?(e=parseFloat(f),c===true||isFinite(e)?e||0:f):f}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Xa.test(n.css(a,"display"))&&0===a.offsetWidth?Pa(a,Za,function(){return fb(a,b,d)}):fb(a,b,d):void 0},set:function(a,c,d){var e=d&&Ra(a);return db(a,c,d?eb(a,b,d,l.boxSizing&&"border-box"===n.css(a,"boxSizing",false,e),e):0)}};}),l.opacity||(n.cssHooks.opacity={get:function(a,b){return Wa.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=n.isNumeric(b)?"alpha(opacity="+100*b+")":"",f=d&&d.filter||c.filter||"";c.zoom=1,(b>=1||""===b)&&""===n.trim(f.replace(Va,""))&&c.removeAttribute&&(c.removeAttribute("filter"),""===b||d&&!d.filter)||(c.filter=Va.test(f)?f.replace(Va,e):f+" "+e);}}),n.cssHooks.marginRight=Ua(l.reliableMarginRight,function(a,b){return b?Pa(a,{display:"inline-block"},Sa,[a,"marginRight"]):void 0}),n.cssHooks.marginLeft=Ua(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Sa(a,"marginLeft"))||(n.contains(a.ownerDocument,a)?a.getBoundingClientRect().left-Pa(a,{
		marginLeft:0},function(){return a.getBoundingClientRect().left}):0))+"px":void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+V[d]+b]=f[d]||f[d-2]||f[0];return e}},Na.test(a)||(n.cssHooks[a+b].set=db);}),n.fn.extend({css:function(a,b){return Y(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ra(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],false,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return cb(this,true)},hide:function(){return cb(this)},toggle:function(a){return "boolean"==typeof a?a?this.show():this.hide():this.each(function(){W(this)?n(this).show():n(this).hide();})}});function gb(a,b,c,d,e){return new gb.prototype.init(a,b,c,d,e)}n.Tween=gb,gb.prototype={constructor:gb,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px");},cur:function(){var a=gb.propHooks[this.prop];return a&&a.get?a.get(this):gb.propHooks._default.get(this)},run:function(a){var b,c=gb.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):gb.propHooks._default.set(this),this}},gb.prototype.init.prototype=gb.prototype,gb.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit);}}},gb.propHooks.scrollTop=gb.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now);}},n.easing={linear:function(a){return a},swing:function(a){return .5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=gb.prototype.init,n.fx.step={};var hb,ib,jb=/^(?:toggle|show|hide)$/,kb=/queueHooks$/;function lb(){return a.setTimeout(function(){hb=void 0;}),hb=n.now()}function mb(a,b){var c,d={height:a},e=0;for(b=b?1:0;4>e;e+=2-b)c=V[e],d["margin"+c]=d["padding"+c]=a;return b&&(d.opacity=d.width=a),d}function nb(a,b,c){for(var d,e=(qb.tweeners[b]||[]).concat(qb.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function ob(a,b,c){var d,e,f,g,h,i,j,k,m=this,o={},p=a.style,q=a.nodeType&&W(a),r=n._data(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i();}),h.unqueued++,m.always(function(){m.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire();});})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[p.overflow,p.overflowX,p.overflowY],j=n.css(a,"display"),k="none"===j?n._data(a,"olddisplay")||Ma(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(l.inlineBlockNeedsLayout&&"inline"!==Ma(a.nodeName)?p.zoom=1:p.display="inline-block")),c.overflow&&(p.overflow="hidden",l.shrinkWrapBlocks()||m.always(function(){p.overflow=c.overflow[0],p.overflowX=c.overflow[1],p.overflowY=c.overflow[2];}));for(d in b)if(e=b[d],jb.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(q?"hide":"show")){if("show"!==e||!r||void 0===r[d])continue;q=true;}o[d]=r&&r[d]||n.style(a,d);}else j=void 0;if(n.isEmptyObject(o))"inline"===("none"===j?Ma(a.nodeName):j)&&(p.display=j);else {r?"hidden"in r&&(q=r.hidden):r=n._data(a,"fxshow",{}),f&&(r.hidden=!q),q?n(a).show():m.done(function(){n(a).hide();}),m.done(function(){var b;n._removeData(a,"fxshow");for(b in o)n.style(a,b,o[b]);});for(d in o)g=nb(q?r[d]:0,d,m),d in r||(r[d]=g.start,q&&(g.end=g.start,g.start="width"===d||"height"===d?1:0));}}function pb(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e);}else b[d]=e;}function qb(a,b,c){var d,e,f=0,g=qb.prefilters.length,h=n.Deferred().always(function(){delete i.elem;}),i=function(){if(e)return  false;for(var b=hb||lb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),false)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(true,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:hb||lb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=true;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(pb(k,j.opts.specialEasing);g>f;f++)if(d=qb.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,nb,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(qb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return X(c.elem,a,U.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],qb.tweeners[c]=qb.tweeners[c]||[],qb.tweeners[c].unshift(b);},prefilters:[ob],prefilter:function(a,b){b?qb.prefilters.unshift(a):qb.prefilters.push(a);}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==true||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue);},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(W).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=qb(this,n.extend({},a),f);(e||n._data(this,"finish"))&&b.stop(true);};return g.finish=g,e||f.queue===false?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c);};return "string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==false&&this.queue(a||"fx",[]),this.each(function(){var b=true,e=null!=a&&a+"queueHooks",f=n.timers,g=n._data(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&kb.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=false,f.splice(e,1));!b&&c||n.dequeue(this,a);})},finish:function(a){return a!==false&&(a=a||"fx"),this.each(function(){var b,c=n._data(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=true,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,true),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(true),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish;})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(mb(b,true),a,d,e)};}),n.each({slideDown:mb("show"),slideUp:mb("hide"),slideToggle:mb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)};}),n.timers=[],n.fx.tick=function(){var a,b=n.timers,c=0;for(hb=n.now();c<b.length;c++)a=b[c],a()||b[c]!==a||b.splice(c--,1);b.length||n.fx.stop(),hb=void 0;},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop();},n.fx.interval=13,n.fx.start=function(){ib||(ib=a.setInterval(n.fx.tick,n.fx.interval));},n.fx.stop=function(){a.clearInterval(ib),ib=null;},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e);};})},function(){var a,b=d.createElement("input"),c=d.createElement("div"),e=d.createElement("select"),f=e.appendChild(d.createElement("option"));c=d.createElement("div"),c.setAttribute("className","t"),c.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=c.getElementsByTagName("a")[0],b.setAttribute("type","checkbox"),c.appendChild(b),a=c.getElementsByTagName("a")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==c.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=f.selected,l.enctype=!!d.createElement("form").enctype,e.disabled=true,l.optDisabled=!f.disabled,b=d.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value;}();var rb=/\r/g,sb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e));});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(rb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(sb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b);}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>-1)try{d.selected=c=!0;}catch(h){d.scrollHeight;}else d.selected=false;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value});});var tb,ub,vb=n.expr.attrHandle,wb=/^(?:checked|selected)$/i,xb=l.getSetAttribute,yb=l.input;n.fn.extend({attr:function(a,b){return Y(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a);})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return "undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ub:tb)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?yb&&xb||!wb.test(c)?a[d]=false:a[n.camelCase("default-"+c)]=a[d]=false:n.attr(a,c,""),a.removeAttribute(xb?c:d);}}),ub={set:function(a,b,c){return b===false?n.removeAttr(a,c):yb&&xb||!wb.test(c)?a.setAttribute(!xb&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=true,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=vb[b]||n.find.attr;yb&&xb||!wb.test(b)?vb[b]=function(a,b,d){var e,f;return d||(f=vb[b],vb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,vb[b]=f),e}:vb[b]=function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null};}),yb&&xb||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):tb&&tb.set(a,b,c)}}),xb||(tb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},vb.id=vb.name=vb.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:tb.set},n.attrHooks.contenteditable={set:function(a,b,c){tb.set(a,""===b?false:b,c);}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return ""===c?(a.setAttribute(b,"auto"),c):void 0}};})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var zb=/^(?:input|select|textarea|button|object)$/i,Ab=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return Y(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a];}catch(b){}})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):zb.test(a.nodeName)||Ab.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}};}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this;}),l.enctype||(n.propFix.enctype="encoding");var Bb=/[\t\r\n\f]/g;function Cb(a){return n.attr(a,"class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,Cb(this)));});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&n.attr(c,"class",h);}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,Cb(this)));});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=Cb(c),d=1===c.nodeType&&(" "+e+" ").replace(Bb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&n.attr(c,"class",h);}}return this},toggleClass:function(a,b){var c=typeof a;return "boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,Cb(this),b),b);}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b);}else void 0!==a&&"boolean"!==c||(b=Cb(this),b&&n._data(this,"__className__",b),n.attr(this,"class",b||a===false?"":n._data(this,"__className__")||""));})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+Cb(c)+" ").replace(Bb," ").indexOf(b)>-1)return  true;return  false}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)};}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Db=a.location,Eb=n.now(),Fb=/\?/,Gb=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;n.parseJSON=function(b){if(a.JSON&&a.JSON.parse)return a.JSON.parse(b+"");var c,d=null,e=n.trim(b+"");return e&&!n.trim(e.replace(Gb,function(a,b,e,f){return c&&b&&(d=0),0===d?a:(c=e||b,d+=!f-!e,"")}))?Function("return "+e)():n.error("Invalid JSON: "+b)},n.parseXML=function(b){var c,d;if(!b||"string"!=typeof b)return null;try{a.DOMParser?(d=new a.DOMParser,c=d.parseFromString(b,"text/xml")):(c=new a.ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b));}catch(e){c=void 0;}return c&&c.documentElement&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var Hb=/#.*$/,Ib=/([?&])_=[^&]*/,Jb=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Kb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Lb=/^(?:GET|HEAD)$/,Mb=/^\/\//,Nb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,Ob={},Pb={},Qb="*/".concat("*"),Rb=Db.href,Sb=Nb.exec(Rb.toLowerCase())||[];function Tb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d.charAt(0)?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c);}}function Ub(a,b,c,d){var e={},f=a===Pb;function g(h){var i;return e[h]=true,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return "string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),false)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Vb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(d in b) void 0!==b[d]&&((e[d]?a:c||(c={}))[d]=b[d]);return c&&n.extend(true,a,c),a}function Wb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===e&&(e=a.mimeType||b.getResponseHeader("Content-Type"));if(e)for(g in h)if(h[g]&&h[g].test(e)){i.unshift(g);break}if(i[0]in c)f=i[0];else {for(g in c){if(!i[0]||a.converters[g+" "+i[0]]){f=g;break}d||(d=g);}f=f||d;}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Xb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===true?g=j[e]:j[e]!==true&&(f=h[0],k.unshift(h[1]));break}if(g!==true)if(g&&a["throws"])b=g(b);else try{b=g(b);}catch(l){return {state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return {state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Rb,type:"GET",isLocal:Kb.test(Sb[1]),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Qb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":true,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:true,context:true}},ajaxSetup:function(a,b){return b?Vb(Vb(a,n.ajaxSettings),b):Vb(n.ajaxSettings,a)},ajaxPrefilter:Tb(Ob),ajaxTransport:Tb(Pb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var d,e,f,g,h,i,j,k,l=n.ajaxSetup({},c),m=l.context||l,o=l.context&&(m.nodeType||m.jquery)?n(m):n.event,p=n.Deferred(),q=n.Callbacks("once memory"),r=l.statusCode||{},s={},t={},u=0,v="canceled",w={readyState:0,getResponseHeader:function(a){var b;if(2===u){if(!k){k={};while(b=Jb.exec(g))k[b[1].toLowerCase()]=b[2];}b=k[a.toLowerCase()];}return null==b?null:b},getAllResponseHeaders:function(){return 2===u?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return u||(a=t[c]=t[c]||a,s[a]=b),this},overrideMimeType:function(a){return u||(l.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>u)for(b in a)r[b]=[r[b],a[b]];else w.always(a[w.status]);return this},abort:function(a){var b=a||v;return j&&j.abort(b),y(0,b),this}};if(p.promise(w).complete=q.add,w.success=w.done,w.error=w.fail,l.url=((b||l.url||Rb)+"").replace(Hb,"").replace(Mb,Sb[1]+"//"),l.type=c.method||c.type||l.method||l.type,l.dataTypes=n.trim(l.dataType||"*").toLowerCase().match(G)||[""],null==l.crossDomain&&(d=Nb.exec(l.url.toLowerCase()),l.crossDomain=!(!d||d[1]===Sb[1]&&d[2]===Sb[2]&&(d[3]||("http:"===d[1]?"80":"443"))===(Sb[3]||("http:"===Sb[1]?"80":"443")))),l.data&&l.processData&&"string"!=typeof l.data&&(l.data=n.param(l.data,l.traditional)),Ub(Ob,l,c,w),2===u)return w;i=n.event&&l.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),l.type=l.type.toUpperCase(),l.hasContent=!Lb.test(l.type),f=l.url,l.hasContent||(l.data&&(f=l.url+=(Fb.test(f)?"&":"?")+l.data,delete l.data),l.cache===false&&(l.url=Ib.test(f)?f.replace(Ib,"$1_="+Eb++):f+(Fb.test(f)?"&":"?")+"_="+Eb++)),l.ifModified&&(n.lastModified[f]&&w.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&w.setRequestHeader("If-None-Match",n.etag[f])),(l.data&&l.hasContent&&l.contentType!==false||c.contentType)&&w.setRequestHeader("Content-Type",l.contentType),w.setRequestHeader("Accept",l.dataTypes[0]&&l.accepts[l.dataTypes[0]]?l.accepts[l.dataTypes[0]]+("*"!==l.dataTypes[0]?", "+Qb+"; q=0.01":""):l.accepts["*"]);for(e in l.headers)w.setRequestHeader(e,l.headers[e]);if(l.beforeSend&&(l.beforeSend.call(m,w,l)===false||2===u))return w.abort();v="abort";for(e in {success:1,error:1,complete:1})w[e](l[e]);if(j=Ub(Pb,l,c,w)){if(w.readyState=1,i&&o.trigger("ajaxSend",[w,l]),2===u)return w;l.async&&l.timeout>0&&(h=a.setTimeout(function(){w.abort("timeout");},l.timeout));try{u=1,j.send(s,y);}catch(x){if(!(2>u))throw x;y(-1,x);}}else y(-1,"No Transport");function y(b,c,d,e){var k,s,t,v,x,y=c;2!==u&&(u=2,h&&a.clearTimeout(h),j=void 0,g=e||"",w.readyState=b>0?4:0,k=b>=200&&300>b||304===b,d&&(v=Wb(l,w,d)),v=Xb(l,v,w,k),k?(l.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(n.lastModified[f]=x),x=w.getResponseHeader("etag"),x&&(n.etag[f]=x)),204===b||"HEAD"===l.type?y="nocontent":304===b?y="notmodified":(y=v.state,s=v.data,t=v.error,k=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),w.status=b,w.statusText=(c||y)+"",k?p.resolveWith(m,[s,y,w]):p.rejectWith(m,[w,y,t]),w.statusCode(r),r=void 0,i&&o.trigger(k?"ajaxSuccess":"ajaxError",[w,l,k?s:t]),q.fireWith(m,[w,y]),i&&(o.trigger("ajaxComplete",[w,l]),--n.active||n.event.trigger("ajaxStop")));}return w},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))};}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",cache:true,async:false,global:false,"throws":true})},n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b));});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this);}return this},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b));}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a);})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a);})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes);}).end()}});function Yb(a){return a.style&&a.style.display||n.css(a,"display")}function Zb(a){if(!n.contains(a.ownerDocument||d,a))return  true;while(a&&1===a.nodeType){if("none"===Yb(a)||"hidden"===a.type)return  true;a=a.parentNode;}return  false}n.expr.filters.hidden=function(a){return l.reliableHiddenOffsets()?a.offsetWidth<=0&&a.offsetHeight<=0&&!a.getClientRects().length:Zb(a)},n.expr.filters.visible=function(a){return !n.expr.filters.hidden(a)};var $b=/%20/g,_b=/\[\]$/,ac=/\r?\n/g,bc=/^(?:submit|button|image|reset|file)$/i,cc=/^(?:input|select|textarea|keygen)/i;function dc(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||_b.test(a)?d(a,e):dc(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d);});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)dc(a+"["+e+"]",b[e],c,d);}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b);};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value);});else for(c in a)dc(c,a[c],b,e);return d.join("&").replace($b,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&cc.test(this.nodeName)&&!bc.test(a)&&(this.checked||!Z.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return {name:b.name,value:a.replace(ac,"\r\n")}}):{name:b.name,value:c.replace(ac,"\r\n")}}).get()}}),n.ajaxSettings.xhr=void 0!==a.ActiveXObject?function(){return this.isLocal?ic():d.documentMode>8?hc():/^(get|post|head|put|delete|options)$/i.test(this.type)&&hc()||ic()}:hc;var ec=0,fc={},gc=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in fc)fc[a](void 0,true);}),l.cors=!!gc&&"withCredentials"in gc,gc=l.ajax=!!gc,gc&&n.ajaxTransport(function(b){if(!b.crossDomain||l.cors){var c;return {send:function(d,e){var f,g=b.xhr(),h=++ec;if(g.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(f in b.xhrFields)g[f]=b.xhrFields[f];b.mimeType&&g.overrideMimeType&&g.overrideMimeType(b.mimeType),b.crossDomain||d["X-Requested-With"]||(d["X-Requested-With"]="XMLHttpRequest");for(f in d) void 0!==d[f]&&g.setRequestHeader(f,d[f]+"");g.send(b.hasContent&&b.data||null),c=function(a,d){var f,i,j;if(c&&(d||4===g.readyState))if(delete fc[h],c=void 0,g.onreadystatechange=n.noop,d)4!==g.readyState&&g.abort();else {j={},f=g.status,"string"==typeof g.responseText&&(j.text=g.responseText);try{i=g.statusText;}catch(k){i="";}f||!b.isLocal||b.crossDomain?1223===f&&(f=204):f=j.text?200:404;}j&&e(f,i,j,g.getAllResponseHeaders());},b.async?4===g.readyState?a.setTimeout(c):g.onreadystatechange=fc[h]=c:c();},abort:function(){c&&c(void 0,true);}}}});function hc(){try{return new a.XMLHttpRequest}catch(b){}}function ic(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){ void 0===a.cache&&(a.cache=false),a.crossDomain&&(a.type="GET",a.global=false);}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c=d.head||n("head")[0]||d.documentElement;return {send:function(e,f){b=d.createElement("script"),b.async=true,a.scriptCharset&&(b.charset=a.scriptCharset),b.src=a.url,b.onload=b.onreadystatechange=function(a,c){(c||!b.readyState||/loaded|complete/.test(b.readyState))&&(b.onload=b.onreadystatechange=null,b.parentNode&&b.parentNode.removeChild(b),b=null,c||f(200,"success"));},c.insertBefore(b,c.firstChild);},abort:function(){b&&b.onload(void 0,true);}}}});var jc=[],kc=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=jc.pop()||n.expando+"_"+Eb++;return this[a]=true,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==false&&(kc.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&kc.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(kc,"$1"+e):b.jsonp!==false&&(b.url+=(Fb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments;},d.always(function(){ void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,jc.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0;}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=false),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ja([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var lc=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&lc)return lc.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h,a.length)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a);}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a]);});}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)};}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function mc(a){return n.isWindow(a)?a:9===a.nodeType?a.defaultView||a.parentWindow:false}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&n.inArray("auto",[f,i])>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m);}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b);});var b,c,d={top:0,left:0},e=this[0],f=e&&e.ownerDocument;if(f)return b=f.documentElement,n.contains(b,e)?("undefined"!=typeof e.getBoundingClientRect&&(d=e.getBoundingClientRect()),c=mc(f),{top:d.top+(c.pageYOffset||b.scrollTop)-(b.clientTop||0),left:d.left+(c.pageXOffset||b.scrollLeft)-(b.clientLeft||0)}):d},position:function(){if(this[0]){var a,b,c={top:0,left:0},d=this[0];return "fixed"===n.css(d,"position")?b=d.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(c=a.offset()),c.top+=n.css(a[0],"borderTopWidth",true),c.left+=n.css(a[0],"borderLeftWidth",true)),{top:b.top-c.top-n.css(d,"marginTop",true),left:b.left-c.left-n.css(d,"marginLeft",true)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Qa})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c=/Y/.test(b);n.fn[a]=function(d){return Y(this,function(a,d,e){var f=mc(a);return void 0===e?f?b in f?f[b]:f.document.documentElement[d]:a[d]:void(f?f.scrollTo(c?n(f).scrollLeft():e,c?e:n(f).scrollTop()):a[d]=e)},a,d,arguments.length,null)};}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ua(l.pixelPosition,function(a,c){return c?(c=Sa(a,b),Oa.test(c)?n(a).position()[b]+"px":c):void 0});}),n.each({Height:"height",Width:"width"},function(a,b){n.each({
		padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===true||e===true?"margin":"border");return Y(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)};});}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack;var nc=a.jQuery,oc=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=oc),b&&a.jQuery===n&&(a.jQuery=nc),n},b||(a.jQuery=a.$=n),n}); 
	} (jquery1_12_4_min));

	var jquery1_12_4_minExports = jquery1_12_4_min.exports;
	var $ = /*@__PURE__*/getDefaultExportFromCjs(jquery1_12_4_minExports);

	//     Underscore.js 1.13.6
	//     https://underscorejs.org
	//     (c) 2009-2022 Jeremy Ashkenas, Julian Gonggrijp, and DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	// Current version.
	var VERSION = '1.13.6';

	// Establish the root object, `window` (`self`) in the browser, `global`
	// on the server, or `this` in some virtual machines. We use `self`
	// instead of `window` for `WebWorker` support.
	var root = (typeof self == 'object' && self.self === self && self) ||
	          (typeof global == 'object' && global.global === global && global) ||
	          Function('return this')() ||
	          {};

	// Save bytes in the minified (but not gzipped) version:
	var ArrayProto = Array.prototype, ObjProto = Object.prototype;
	var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

	// Create quick reference variables for speed access to core prototypes.
	var push = ArrayProto.push,
	    slice = ArrayProto.slice,
	    toString = ObjProto.toString,
	    hasOwnProperty = ObjProto.hasOwnProperty;

	// Modern feature detection.
	var supportsArrayBuffer = typeof ArrayBuffer !== 'undefined',
	    supportsDataView = typeof DataView !== 'undefined';

	// All **ECMAScript 5+** native function implementations that we hope to use
	// are declared here.
	var nativeIsArray = Array.isArray,
	    nativeKeys = Object.keys,
	    nativeCreate = Object.create,
	    nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;

	// Create references to these builtin functions because we override them.
	var _isNaN = isNaN,
	    _isFinite = isFinite;

	// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	  'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	// The largest integer that can be represented exactly.
	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

	// Some functions take a variable number of arguments, or a few expected
	// arguments at the beginning and then a variable number of values to operate
	// on. This helper accumulates all remaining arguments past the function’s
	// argument length (or an explicit `startIndex`), into an array that becomes
	// the last argument. Similar to ES6’s "rest parameter".
	function restArguments(func, startIndex) {
	  startIndex = startIndex == null ? func.length - 1 : +startIndex;
	  return function() {
	    var length = Math.max(arguments.length - startIndex, 0),
	        rest = Array(length),
	        index = 0;
	    for (; index < length; index++) {
	      rest[index] = arguments[index + startIndex];
	    }
	    switch (startIndex) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, arguments[0], rest);
	      case 2: return func.call(this, arguments[0], arguments[1], rest);
	    }
	    var args = Array(startIndex + 1);
	    for (index = 0; index < startIndex; index++) {
	      args[index] = arguments[index];
	    }
	    args[startIndex] = rest;
	    return func.apply(this, args);
	  };
	}

	// Is a given variable an object?
	function isObject(obj) {
	  var type = typeof obj;
	  return type === 'function' || (type === 'object' && !!obj);
	}

	// Is a given value equal to null?
	function isNull(obj) {
	  return obj === null;
	}

	// Is a given variable undefined?
	function isUndefined(obj) {
	  return obj === void 0;
	}

	// Is a given value a boolean?
	function isBoolean(obj) {
	  return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	}

	// Is a given value a DOM element?
	function isElement(obj) {
	  return !!(obj && obj.nodeType === 1);
	}

	// Internal function for creating a `toString`-based type tester.
	function tagTester(name) {
	  var tag = '[object ' + name + ']';
	  return function(obj) {
	    return toString.call(obj) === tag;
	  };
	}

	var isString = tagTester('String');

	var isNumber = tagTester('Number');

	var isDate = tagTester('Date');

	var isRegExp = tagTester('RegExp');

	var isError = tagTester('Error');

	var isSymbol = tagTester('Symbol');

	var isArrayBuffer = tagTester('ArrayBuffer');

	var isFunction = tagTester('Function');

	// Optimize `isFunction` if appropriate. Work around some `typeof` bugs in old
	// v8, IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
	var nodelist = root.document && root.document.childNodes;
	if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
	  isFunction = function(obj) {
	    return typeof obj == 'function' || false;
	  };
	}

	var isFunction$1 = isFunction;

	var hasObjectTag = tagTester('Object');

	// In IE 10 - Edge 13, `DataView` has string tag `'[object Object]'`.
	// In IE 11, the most common among them, this problem also applies to
	// `Map`, `WeakMap` and `Set`.
	var hasStringTagBug = (
	      supportsDataView && hasObjectTag(new DataView(new ArrayBuffer(8)))
	    ),
	    isIE11 = (typeof Map !== 'undefined' && hasObjectTag(new Map));

	var isDataView = tagTester('DataView');

	// In IE 10 - Edge 13, we need a different heuristic
	// to determine whether an object is a `DataView`.
	function ie10IsDataView(obj) {
	  return obj != null && isFunction$1(obj.getInt8) && isArrayBuffer(obj.buffer);
	}

	var isDataView$1 = (hasStringTagBug ? ie10IsDataView : isDataView);

	// Is a given value an array?
	// Delegates to ECMA5's native `Array.isArray`.
	var isArray = nativeIsArray || tagTester('Array');

	// Internal function to check whether `key` is an own property name of `obj`.
	function has$1(obj, key) {
	  return obj != null && hasOwnProperty.call(obj, key);
	}

	var isArguments = tagTester('Arguments');

	// Define a fallback version of the method in browsers (ahem, IE < 9), where
	// there isn't any inspectable "Arguments" type.
	(function() {
	  if (!isArguments(arguments)) {
	    isArguments = function(obj) {
	      return has$1(obj, 'callee');
	    };
	  }
	}());

	var isArguments$1 = isArguments;

	// Is a given object a finite number?
	function isFinite$1(obj) {
	  return !isSymbol(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
	}

	// Is the given value `NaN`?
	function isNaN$1(obj) {
	  return isNumber(obj) && _isNaN(obj);
	}

	// Predicate-generating function. Often useful outside of Underscore.
	function constant(value) {
	  return function() {
	    return value;
	  };
	}

	// Common internal logic for `isArrayLike` and `isBufferLike`.
	function createSizePropertyCheck(getSizeProperty) {
	  return function(collection) {
	    var sizeProperty = getSizeProperty(collection);
	    return typeof sizeProperty == 'number' && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
	  }
	}

	// Internal helper to generate a function to obtain property `key` from `obj`.
	function shallowProperty(key) {
	  return function(obj) {
	    return obj == null ? void 0 : obj[key];
	  };
	}

	// Internal helper to obtain the `byteLength` property of an object.
	var getByteLength = shallowProperty('byteLength');

	// Internal helper to determine whether we should spend extensive checks against
	// `ArrayBuffer` et al.
	var isBufferLike = createSizePropertyCheck(getByteLength);

	// Is a given value a typed array?
	var typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
	function isTypedArray(obj) {
	  // `ArrayBuffer.isView` is the most future-proof, so use it when available.
	  // Otherwise, fall back on the above regular expression.
	  return nativeIsView ? (nativeIsView(obj) && !isDataView$1(obj)) :
	                isBufferLike(obj) && typedArrayPattern.test(toString.call(obj));
	}

	var isTypedArray$1 = supportsArrayBuffer ? isTypedArray : constant(false);

	// Internal helper to obtain the `length` property of an object.
	var getLength = shallowProperty('length');

	// Internal helper to create a simple lookup structure.
	// `collectNonEnumProps` used to depend on `_.contains`, but this led to
	// circular imports. `emulatedSet` is a one-off solution that only works for
	// arrays of strings.
	function emulatedSet(keys) {
	  var hash = {};
	  for (var l = keys.length, i = 0; i < l; ++i) hash[keys[i]] = true;
	  return {
	    contains: function(key) { return hash[key] === true; },
	    push: function(key) {
	      hash[key] = true;
	      return keys.push(key);
	    }
	  };
	}

	// Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
	// be iterated by `for key in ...` and thus missed. Extends `keys` in place if
	// needed.
	function collectNonEnumProps(obj, keys) {
	  keys = emulatedSet(keys);
	  var nonEnumIdx = nonEnumerableProps.length;
	  var constructor = obj.constructor;
	  var proto = (isFunction$1(constructor) && constructor.prototype) || ObjProto;

	  // Constructor is a special case.
	  var prop = 'constructor';
	  if (has$1(obj, prop) && !keys.contains(prop)) keys.push(prop);

	  while (nonEnumIdx--) {
	    prop = nonEnumerableProps[nonEnumIdx];
	    if (prop in obj && obj[prop] !== proto[prop] && !keys.contains(prop)) {
	      keys.push(prop);
	    }
	  }
	}

	// Retrieve the names of an object's own properties.
	// Delegates to **ECMAScript 5**'s native `Object.keys`.
	function keys(obj) {
	  if (!isObject(obj)) return [];
	  if (nativeKeys) return nativeKeys(obj);
	  var keys = [];
	  for (var key in obj) if (has$1(obj, key)) keys.push(key);
	  // Ahem, IE < 9.
	  if (hasEnumBug) collectNonEnumProps(obj, keys);
	  return keys;
	}

	// Is a given array, string, or object empty?
	// An "empty" object has no enumerable own-properties.
	function isEmpty(obj) {
	  if (obj == null) return true;
	  // Skip the more expensive `toString`-based type checks if `obj` has no
	  // `.length`.
	  var length = getLength(obj);
	  if (typeof length == 'number' && (
	    isArray(obj) || isString(obj) || isArguments$1(obj)
	  )) return length === 0;
	  return getLength(keys(obj)) === 0;
	}

	// Returns whether an object has a given set of `key:value` pairs.
	function isMatch(object, attrs) {
	  var _keys = keys(attrs), length = _keys.length;
	  if (object == null) return !length;
	  var obj = Object(object);
	  for (var i = 0; i < length; i++) {
	    var key = _keys[i];
	    if (attrs[key] !== obj[key] || !(key in obj)) return false;
	  }
	  return true;
	}

	// If Underscore is called as a function, it returns a wrapped object that can
	// be used OO-style. This wrapper holds altered versions of all functions added
	// through `_.mixin`. Wrapped objects may be chained.
	function _$1(obj) {
	  if (obj instanceof _$1) return obj;
	  if (!(this instanceof _$1)) return new _$1(obj);
	  this._wrapped = obj;
	}

	_$1.VERSION = VERSION;

	// Extracts the result from a wrapped and chained object.
	_$1.prototype.value = function() {
	  return this._wrapped;
	};

	// Provide unwrapping proxies for some methods used in engine operations
	// such as arithmetic and JSON stringification.
	_$1.prototype.valueOf = _$1.prototype.toJSON = _$1.prototype.value;

	_$1.prototype.toString = function() {
	  return String(this._wrapped);
	};

	// Internal function to wrap or shallow-copy an ArrayBuffer,
	// typed array or DataView to a new view, reusing the buffer.
	function toBufferView(bufferSource) {
	  return new Uint8Array(
	    bufferSource.buffer || bufferSource,
	    bufferSource.byteOffset || 0,
	    getByteLength(bufferSource)
	  );
	}

	// We use this string twice, so give it a name for minification.
	var tagDataView = '[object DataView]';

	// Internal recursive comparison function for `_.isEqual`.
	function eq(a, b, aStack, bStack) {
	  // Identical objects are equal. `0 === -0`, but they aren't identical.
	  // See the [Harmony `egal` proposal](https://wiki.ecmascript.org/doku.php?id=harmony:egal).
	  if (a === b) return a !== 0 || 1 / a === 1 / b;
	  // `null` or `undefined` only equal to itself (strict comparison).
	  if (a == null || b == null) return false;
	  // `NaN`s are equivalent, but non-reflexive.
	  if (a !== a) return b !== b;
	  // Exhaust primitive checks
	  var type = typeof a;
	  if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
	  return deepEq(a, b, aStack, bStack);
	}

	// Internal recursive comparison function for `_.isEqual`.
	function deepEq(a, b, aStack, bStack) {
	  // Unwrap any wrapped objects.
	  if (a instanceof _$1) a = a._wrapped;
	  if (b instanceof _$1) b = b._wrapped;
	  // Compare `[[Class]]` names.
	  var className = toString.call(a);
	  if (className !== toString.call(b)) return false;
	  // Work around a bug in IE 10 - Edge 13.
	  if (hasStringTagBug && className == '[object Object]' && isDataView$1(a)) {
	    if (!isDataView$1(b)) return false;
	    className = tagDataView;
	  }
	  switch (className) {
	    // These types are compared by value.
	    case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	    case '[object String]':
	      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	      // equivalent to `new String("5")`.
	      return '' + a === '' + b;
	    case '[object Number]':
	      // `NaN`s are equivalent, but non-reflexive.
	      // Object(NaN) is equivalent to NaN.
	      if (+a !== +a) return +b !== +b;
	      // An `egal` comparison is performed for other numeric values.
	      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	    case '[object Date]':
	    case '[object Boolean]':
	      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	      // millisecond representations. Note that invalid dates with millisecond representations
	      // of `NaN` are not equivalent.
	      return +a === +b;
	    case '[object Symbol]':
	      return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
	    case '[object ArrayBuffer]':
	    case tagDataView:
	      // Coerce to typed array so we can fall through.
	      return deepEq(toBufferView(a), toBufferView(b), aStack, bStack);
	  }

	  var areArrays = className === '[object Array]';
	  if (!areArrays && isTypedArray$1(a)) {
	      var byteLength = getByteLength(a);
	      if (byteLength !== getByteLength(b)) return false;
	      if (a.buffer === b.buffer && a.byteOffset === b.byteOffset) return true;
	      areArrays = true;
	  }
	  if (!areArrays) {
	    if (typeof a != 'object' || typeof b != 'object') return false;

	    // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	    // from different frames are.
	    var aCtor = a.constructor, bCtor = b.constructor;
	    if (aCtor !== bCtor && !(isFunction$1(aCtor) && aCtor instanceof aCtor &&
	                             isFunction$1(bCtor) && bCtor instanceof bCtor)
	                        && ('constructor' in a && 'constructor' in b)) {
	      return false;
	    }
	  }
	  // Assume equality for cyclic structures. The algorithm for detecting cyclic
	  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	  // Initializing stack of traversed objects.
	  // It's done here since we only need them for objects and arrays comparison.
	  aStack = aStack || [];
	  bStack = bStack || [];
	  var length = aStack.length;
	  while (length--) {
	    // Linear search. Performance is inversely proportional to the number of
	    // unique nested structures.
	    if (aStack[length] === a) return bStack[length] === b;
	  }

	  // Add the first object to the stack of traversed objects.
	  aStack.push(a);
	  bStack.push(b);

	  // Recursively compare objects and arrays.
	  if (areArrays) {
	    // Compare array lengths to determine if a deep comparison is necessary.
	    length = a.length;
	    if (length !== b.length) return false;
	    // Deep compare the contents, ignoring non-numeric properties.
	    while (length--) {
	      if (!eq(a[length], b[length], aStack, bStack)) return false;
	    }
	  } else {
	    // Deep compare objects.
	    var _keys = keys(a), key;
	    length = _keys.length;
	    // Ensure that both objects contain the same number of properties before comparing deep equality.
	    if (keys(b).length !== length) return false;
	    while (length--) {
	      // Deep compare each member
	      key = _keys[length];
	      if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	    }
	  }
	  // Remove the first object from the stack of traversed objects.
	  aStack.pop();
	  bStack.pop();
	  return true;
	}

	// Perform a deep comparison to check if two objects are equal.
	function isEqual(a, b) {
	  return eq(a, b);
	}

	// Retrieve all the enumerable property names of an object.
	function allKeys(obj) {
	  if (!isObject(obj)) return [];
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  // Ahem, IE < 9.
	  if (hasEnumBug) collectNonEnumProps(obj, keys);
	  return keys;
	}

	// Since the regular `Object.prototype.toString` type tests don't work for
	// some types in IE 11, we use a fingerprinting heuristic instead, based
	// on the methods. It's not great, but it's the best we got.
	// The fingerprint method lists are defined below.
	function ie11fingerprint(methods) {
	  var length = getLength(methods);
	  return function(obj) {
	    if (obj == null) return false;
	    // `Map`, `WeakMap` and `Set` have no enumerable keys.
	    var keys = allKeys(obj);
	    if (getLength(keys)) return false;
	    for (var i = 0; i < length; i++) {
	      if (!isFunction$1(obj[methods[i]])) return false;
	    }
	    // If we are testing against `WeakMap`, we need to ensure that
	    // `obj` doesn't have a `forEach` method in order to distinguish
	    // it from a regular `Map`.
	    return methods !== weakMapMethods || !isFunction$1(obj[forEachName]);
	  };
	}

	// In the interest of compact minification, we write
	// each string in the fingerprints only once.
	var forEachName = 'forEach',
	    hasName = 'has',
	    commonInit = ['clear', 'delete'],
	    mapTail = ['get', hasName, 'set'];

	// `Map`, `WeakMap` and `Set` each have slightly different
	// combinations of the above sublists.
	var mapMethods = commonInit.concat(forEachName, mapTail),
	    weakMapMethods = commonInit.concat(mapTail),
	    setMethods = ['add'].concat(commonInit, forEachName, hasName);

	var isMap = isIE11 ? ie11fingerprint(mapMethods) : tagTester('Map');

	var isWeakMap = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester('WeakMap');

	var isSet = isIE11 ? ie11fingerprint(setMethods) : tagTester('Set');

	var isWeakSet = tagTester('WeakSet');

	// Retrieve the values of an object's properties.
	function values(obj) {
	  var _keys = keys(obj);
	  var length = _keys.length;
	  var values = Array(length);
	  for (var i = 0; i < length; i++) {
	    values[i] = obj[_keys[i]];
	  }
	  return values;
	}

	// Convert an object into a list of `[key, value]` pairs.
	// The opposite of `_.object` with one argument.
	function pairs(obj) {
	  var _keys = keys(obj);
	  var length = _keys.length;
	  var pairs = Array(length);
	  for (var i = 0; i < length; i++) {
	    pairs[i] = [_keys[i], obj[_keys[i]]];
	  }
	  return pairs;
	}

	// Invert the keys and values of an object. The values must be serializable.
	function invert(obj) {
	  var result = {};
	  var _keys = keys(obj);
	  for (var i = 0, length = _keys.length; i < length; i++) {
	    result[obj[_keys[i]]] = _keys[i];
	  }
	  return result;
	}

	// Return a sorted list of the function names available on the object.
	function functions(obj) {
	  var names = [];
	  for (var key in obj) {
	    if (isFunction$1(obj[key])) names.push(key);
	  }
	  return names.sort();
	}

	// An internal function for creating assigner functions.
	function createAssigner(keysFunc, defaults) {
	  return function(obj) {
	    var length = arguments.length;
	    if (defaults) obj = Object(obj);
	    if (length < 2 || obj == null) return obj;
	    for (var index = 1; index < length; index++) {
	      var source = arguments[index],
	          keys = keysFunc(source),
	          l = keys.length;
	      for (var i = 0; i < l; i++) {
	        var key = keys[i];
	        if (!defaults || obj[key] === void 0) obj[key] = source[key];
	      }
	    }
	    return obj;
	  };
	}

	// Extend a given object with all the properties in passed-in object(s).
	var extend = createAssigner(allKeys);

	// Assigns a given object with all the own properties in the passed-in
	// object(s).
	// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	var extendOwn = createAssigner(keys);

	// Fill in a given object with default properties.
	var defaults = createAssigner(allKeys, true);

	// Create a naked function reference for surrogate-prototype-swapping.
	function ctor() {
	  return function(){};
	}

	// An internal function for creating a new object that inherits from another.
	function baseCreate(prototype) {
	  if (!isObject(prototype)) return {};
	  if (nativeCreate) return nativeCreate(prototype);
	  var Ctor = ctor();
	  Ctor.prototype = prototype;
	  var result = new Ctor;
	  Ctor.prototype = null;
	  return result;
	}

	// Creates an object that inherits from the given prototype object.
	// If additional properties are provided then they will be added to the
	// created object.
	function create(prototype, props) {
	  var result = baseCreate(prototype);
	  if (props) extendOwn(result, props);
	  return result;
	}

	// Create a (shallow-cloned) duplicate of an object.
	function clone(obj) {
	  if (!isObject(obj)) return obj;
	  return isArray(obj) ? obj.slice() : extend({}, obj);
	}

	// Invokes `interceptor` with the `obj` and then returns `obj`.
	// The primary purpose of this method is to "tap into" a method chain, in
	// order to perform operations on intermediate results within the chain.
	function tap(obj, interceptor) {
	  interceptor(obj);
	  return obj;
	}

	// Normalize a (deep) property `path` to array.
	// Like `_.iteratee`, this function can be customized.
	function toPath$1(path) {
	  return isArray(path) ? path : [path];
	}
	_$1.toPath = toPath$1;

	// Internal wrapper for `_.toPath` to enable minification.
	// Similar to `cb` for `_.iteratee`.
	function toPath(path) {
	  return _$1.toPath(path);
	}

	// Internal function to obtain a nested property in `obj` along `path`.
	function deepGet(obj, path) {
	  var length = path.length;
	  for (var i = 0; i < length; i++) {
	    if (obj == null) return void 0;
	    obj = obj[path[i]];
	  }
	  return length ? obj : void 0;
	}

	// Get the value of the (deep) property on `path` from `object`.
	// If any property in `path` does not exist or if the value is
	// `undefined`, return `defaultValue` instead.
	// The `path` is normalized through `_.toPath`.
	function get(object, path, defaultValue) {
	  var value = deepGet(object, toPath(path));
	  return isUndefined(value) ? defaultValue : value;
	}

	// Shortcut function for checking if an object has a given property directly on
	// itself (in other words, not on a prototype). Unlike the internal `has`
	// function, this public version can also traverse nested properties.
	function has(obj, path) {
	  path = toPath(path);
	  var length = path.length;
	  for (var i = 0; i < length; i++) {
	    var key = path[i];
	    if (!has$1(obj, key)) return false;
	    obj = obj[key];
	  }
	  return !!length;
	}

	// Keep the identity function around for default iteratees.
	function identity(value) {
	  return value;
	}

	// Returns a predicate for checking whether an object has a given set of
	// `key:value` pairs.
	function matcher(attrs) {
	  attrs = extendOwn({}, attrs);
	  return function(obj) {
	    return isMatch(obj, attrs);
	  };
	}

	// Creates a function that, when passed an object, will traverse that object’s
	// properties down the given `path`, specified as an array of keys or indices.
	function property(path) {
	  path = toPath(path);
	  return function(obj) {
	    return deepGet(obj, path);
	  };
	}

	// Internal function that returns an efficient (for current engines) version
	// of the passed-in callback, to be repeatedly applied in other Underscore
	// functions.
	function optimizeCb(func, context, argCount) {
	  if (context === void 0) return func;
	  switch (argCount == null ? 3 : argCount) {
	    case 1: return function(value) {
	      return func.call(context, value);
	    };
	    // The 2-argument case is omitted because we’re not using it.
	    case 3: return function(value, index, collection) {
	      return func.call(context, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(context, accumulator, value, index, collection);
	    };
	  }
	  return function() {
	    return func.apply(context, arguments);
	  };
	}

	// An internal function to generate callbacks that can be applied to each
	// element in a collection, returning the desired result — either `_.identity`,
	// an arbitrary callback, a property matcher, or a property accessor.
	function baseIteratee(value, context, argCount) {
	  if (value == null) return identity;
	  if (isFunction$1(value)) return optimizeCb(value, context, argCount);
	  if (isObject(value) && !isArray(value)) return matcher(value);
	  return property(value);
	}

	// External wrapper for our callback generator. Users may customize
	// `_.iteratee` if they want additional predicate/iteratee shorthand styles.
	// This abstraction hides the internal-only `argCount` argument.
	function iteratee(value, context) {
	  return baseIteratee(value, context, Infinity);
	}
	_$1.iteratee = iteratee;

	// The function we call internally to generate a callback. It invokes
	// `_.iteratee` if overridden, otherwise `baseIteratee`.
	function cb(value, context, argCount) {
	  if (_$1.iteratee !== iteratee) return _$1.iteratee(value, context);
	  return baseIteratee(value, context, argCount);
	}

	// Returns the results of applying the `iteratee` to each element of `obj`.
	// In contrast to `_.map` it returns an object.
	function mapObject(obj, iteratee, context) {
	  iteratee = cb(iteratee, context);
	  var _keys = keys(obj),
	      length = _keys.length,
	      results = {};
	  for (var index = 0; index < length; index++) {
	    var currentKey = _keys[index];
	    results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	  }
	  return results;
	}

	// Predicate-generating function. Often useful outside of Underscore.
	function noop(){}

	// Generates a function for a given object that returns a given property.
	function propertyOf(obj) {
	  if (obj == null) return noop;
	  return function(path) {
	    return get(obj, path);
	  };
	}

	// Run a function **n** times.
	function times(n, iteratee, context) {
	  var accum = Array(Math.max(0, n));
	  iteratee = optimizeCb(iteratee, context, 1);
	  for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	  return accum;
	}

	// Return a random integer between `min` and `max` (inclusive).
	function random(min, max) {
	  if (max == null) {
	    max = min;
	    min = 0;
	  }
	  return min + Math.floor(Math.random() * (max - min + 1));
	}

	// A (possibly faster) way to get the current timestamp as an integer.
	var now = Date.now || function() {
	  return new Date().getTime();
	};

	// Internal helper to generate functions for escaping and unescaping strings
	// to/from HTML interpolation.
	function createEscaper(map) {
	  var escaper = function(match) {
	    return map[match];
	  };
	  // Regexes for identifying a key that needs to be escaped.
	  var source = '(?:' + keys(map).join('|') + ')';
	  var testRegexp = RegExp(source);
	  var replaceRegexp = RegExp(source, 'g');
	  return function(string) {
	    string = string == null ? '' : '' + string;
	    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	  };
	}

	// Internal list of HTML entities for escaping.
	var escapeMap = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;'
	};

	// Function for escaping strings to HTML interpolation.
	var _escape = createEscaper(escapeMap);

	// Internal list of HTML entities for unescaping.
	var unescapeMap = invert(escapeMap);

	// Function for unescaping strings from HTML interpolation.
	var _unescape = createEscaper(unescapeMap);

	// By default, Underscore uses ERB-style template delimiters. Change the
	// following template settings to use alternative delimiters.
	var templateSettings = _$1.templateSettings = {
	  evaluate: /<%([\s\S]+?)%>/g,
	  interpolate: /<%=([\s\S]+?)%>/g,
	  escape: /<%-([\s\S]+?)%>/g
	};

	// When customizing `_.templateSettings`, if you don't want to define an
	// interpolation, evaluation or escaping regex, we need one that is
	// guaranteed not to match.
	var noMatch = /(.)^/;

	// Certain characters need to be escaped so that they can be put into a
	// string literal.
	var escapes = {
	  "'": "'",
	  '\\': '\\',
	  '\r': 'r',
	  '\n': 'n',
	  '\u2028': 'u2028',
	  '\u2029': 'u2029'
	};

	var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

	function escapeChar(match) {
	  return '\\' + escapes[match];
	}

	// In order to prevent third-party code injection through
	// `_.templateSettings.variable`, we test it against the following regular
	// expression. It is intentionally a bit more liberal than just matching valid
	// identifiers, but still prevents possible loopholes through defaults or
	// destructuring assignment.
	var bareIdentifier = /^\s*(\w|\$)+\s*$/;

	// JavaScript micro-templating, similar to John Resig's implementation.
	// Underscore templating handles arbitrary delimiters, preserves whitespace,
	// and correctly escapes quotes within interpolated code.
	// NB: `oldSettings` only exists for backwards compatibility.
	function template(text, settings, oldSettings) {
	  if (!settings && oldSettings) settings = oldSettings;
	  settings = defaults({}, settings, _$1.templateSettings);

	  // Combine delimiters into one regular expression via alternation.
	  var matcher = RegExp([
	    (settings.escape || noMatch).source,
	    (settings.interpolate || noMatch).source,
	    (settings.evaluate || noMatch).source
	  ].join('|') + '|$', 'g');

	  // Compile the template source, escaping string literals appropriately.
	  var index = 0;
	  var source = "__p+='";
	  text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	    source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
	    index = offset + match.length;

	    if (escape) {
	      source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	    } else if (interpolate) {
	      source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	    } else if (evaluate) {
	      source += "';\n" + evaluate + "\n__p+='";
	    }

	    // Adobe VMs need the match returned to produce the correct offset.
	    return match;
	  });
	  source += "';\n";

	  var argument = settings.variable;
	  if (argument) {
	    // Insure against third-party code injection. (CVE-2021-23358)
	    if (!bareIdentifier.test(argument)) throw new Error(
	      'variable is not a bare identifier: ' + argument
	    );
	  } else {
	    // If a variable is not specified, place data values in local scope.
	    source = 'with(obj||{}){\n' + source + '}\n';
	    argument = 'obj';
	  }

	  source = "var __t,__p='',__j=Array.prototype.join," +
	    "print=function(){__p+=__j.call(arguments,'');};\n" +
	    source + 'return __p;\n';

	  var render;
	  try {
	    render = new Function(argument, '_', source);
	  } catch (e) {
	    e.source = source;
	    throw e;
	  }

	  var template = function(data) {
	    return render.call(this, data, _$1);
	  };

	  // Provide the compiled source as a convenience for precompilation.
	  template.source = 'function(' + argument + '){\n' + source + '}';

	  return template;
	}

	// Traverses the children of `obj` along `path`. If a child is a function, it
	// is invoked with its parent as context. Returns the value of the final
	// child, or `fallback` if any child is undefined.
	function result(obj, path, fallback) {
	  path = toPath(path);
	  var length = path.length;
	  if (!length) {
	    return isFunction$1(fallback) ? fallback.call(obj) : fallback;
	  }
	  for (var i = 0; i < length; i++) {
	    var prop = obj == null ? void 0 : obj[path[i]];
	    if (prop === void 0) {
	      prop = fallback;
	      i = length; // Ensure we don't continue iterating.
	    }
	    obj = isFunction$1(prop) ? prop.call(obj) : prop;
	  }
	  return obj;
	}

	// Generate a unique integer id (unique within the entire client session).
	// Useful for temporary DOM ids.
	var idCounter = 0;
	function uniqueId(prefix) {
	  var id = ++idCounter + '';
	  return prefix ? prefix + id : id;
	}

	// Start chaining a wrapped Underscore object.
	function chain(obj) {
	  var instance = _$1(obj);
	  instance._chain = true;
	  return instance;
	}

	// Internal function to execute `sourceFunc` bound to `context` with optional
	// `args`. Determines whether to execute a function as a constructor or as a
	// normal function.
	function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
	  if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	  var self = baseCreate(sourceFunc.prototype);
	  var result = sourceFunc.apply(self, args);
	  if (isObject(result)) return result;
	  return self;
	}

	// Partially apply a function by creating a version that has had some of its
	// arguments pre-filled, without changing its dynamic `this` context. `_` acts
	// as a placeholder by default, allowing any combination of arguments to be
	// pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
	var partial = restArguments(function(func, boundArgs) {
	  var placeholder = partial.placeholder;
	  var bound = function() {
	    var position = 0, length = boundArgs.length;
	    var args = Array(length);
	    for (var i = 0; i < length; i++) {
	      args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
	    }
	    while (position < arguments.length) args.push(arguments[position++]);
	    return executeBound(func, bound, this, this, args);
	  };
	  return bound;
	});

	partial.placeholder = _$1;

	// Create a function bound to a given object (assigning `this`, and arguments,
	// optionally).
	var bind = restArguments(function(func, context, args) {
	  if (!isFunction$1(func)) throw new TypeError('Bind must be called on a function');
	  var bound = restArguments(function(callArgs) {
	    return executeBound(func, bound, context, this, args.concat(callArgs));
	  });
	  return bound;
	});

	// Internal helper for collection methods to determine whether a collection
	// should be iterated as an array or as an object.
	// Related: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	var isArrayLike = createSizePropertyCheck(getLength);

	// Internal implementation of a recursive `flatten` function.
	function flatten$1(input, depth, strict, output) {
	  output = output || [];
	  if (!depth && depth !== 0) {
	    depth = Infinity;
	  } else if (depth <= 0) {
	    return output.concat(input);
	  }
	  var idx = output.length;
	  for (var i = 0, length = getLength(input); i < length; i++) {
	    var value = input[i];
	    if (isArrayLike(value) && (isArray(value) || isArguments$1(value))) {
	      // Flatten current level of array or arguments object.
	      if (depth > 1) {
	        flatten$1(value, depth - 1, strict, output);
	        idx = output.length;
	      } else {
	        var j = 0, len = value.length;
	        while (j < len) output[idx++] = value[j++];
	      }
	    } else if (!strict) {
	      output[idx++] = value;
	    }
	  }
	  return output;
	}

	// Bind a number of an object's methods to that object. Remaining arguments
	// are the method names to be bound. Useful for ensuring that all callbacks
	// defined on an object belong to it.
	var bindAll = restArguments(function(obj, keys) {
	  keys = flatten$1(keys, false, false);
	  var index = keys.length;
	  if (index < 1) throw new Error('bindAll must be passed function names');
	  while (index--) {
	    var key = keys[index];
	    obj[key] = bind(obj[key], obj);
	  }
	  return obj;
	});

	// Memoize an expensive function by storing its results.
	function memoize(func, hasher) {
	  var memoize = function(key) {
	    var cache = memoize.cache;
	    var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	    if (!has$1(cache, address)) cache[address] = func.apply(this, arguments);
	    return cache[address];
	  };
	  memoize.cache = {};
	  return memoize;
	}

	// Delays a function for the given number of milliseconds, and then calls
	// it with the arguments supplied.
	var delay = restArguments(function(func, wait, args) {
	  return setTimeout(function() {
	    return func.apply(null, args);
	  }, wait);
	});

	// Defers a function, scheduling it to run after the current call stack has
	// cleared.
	var defer = partial(delay, _$1, 1);

	// Returns a function, that, when invoked, will only be triggered at most once
	// during a given window of time. Normally, the throttled function will run
	// as much as it can, without ever going more than once per `wait` duration;
	// but if you'd like to disable the execution on the leading edge, pass
	// `{leading: false}`. To disable execution on the trailing edge, ditto.
	function throttle(func, wait, options) {
	  var timeout, context, args, result;
	  var previous = 0;
	  if (!options) options = {};

	  var later = function() {
	    previous = options.leading === false ? 0 : now();
	    timeout = null;
	    result = func.apply(context, args);
	    if (!timeout) context = args = null;
	  };

	  var throttled = function() {
	    var _now = now();
	    if (!previous && options.leading === false) previous = _now;
	    var remaining = wait - (_now - previous);
	    context = this;
	    args = arguments;
	    if (remaining <= 0 || remaining > wait) {
	      if (timeout) {
	        clearTimeout(timeout);
	        timeout = null;
	      }
	      previous = _now;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    } else if (!timeout && options.trailing !== false) {
	      timeout = setTimeout(later, remaining);
	    }
	    return result;
	  };

	  throttled.cancel = function() {
	    clearTimeout(timeout);
	    previous = 0;
	    timeout = context = args = null;
	  };

	  return throttled;
	}

	// When a sequence of calls of the returned function ends, the argument
	// function is triggered. The end of a sequence is defined by the `wait`
	// parameter. If `immediate` is passed, the argument function will be
	// triggered at the beginning of the sequence instead of at the end.
	function debounce(func, wait, immediate) {
	  var timeout, previous, args, result, context;

	  var later = function() {
	    var passed = now() - previous;
	    if (wait > passed) {
	      timeout = setTimeout(later, wait - passed);
	    } else {
	      timeout = null;
	      if (!immediate) result = func.apply(context, args);
	      // This check is needed because `func` can recursively invoke `debounced`.
	      if (!timeout) args = context = null;
	    }
	  };

	  var debounced = restArguments(function(_args) {
	    context = this;
	    args = _args;
	    previous = now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	      if (immediate) result = func.apply(context, args);
	    }
	    return result;
	  });

	  debounced.cancel = function() {
	    clearTimeout(timeout);
	    timeout = args = context = null;
	  };

	  return debounced;
	}

	// Returns the first function passed as an argument to the second,
	// allowing you to adjust arguments, run code before and after, and
	// conditionally execute the original function.
	function wrap(func, wrapper) {
	  return partial(wrapper, func);
	}

	// Returns a negated version of the passed-in predicate.
	function negate(predicate) {
	  return function() {
	    return !predicate.apply(this, arguments);
	  };
	}

	// Returns a function that is the composition of a list of functions, each
	// consuming the return value of the function that follows.
	function compose() {
	  var args = arguments;
	  var start = args.length - 1;
	  return function() {
	    var i = start;
	    var result = args[start].apply(this, arguments);
	    while (i--) result = args[i].call(this, result);
	    return result;
	  };
	}

	// Returns a function that will only be executed on and after the Nth call.
	function after(times, func) {
	  return function() {
	    if (--times < 1) {
	      return func.apply(this, arguments);
	    }
	  };
	}

	// Returns a function that will only be executed up to (but not including) the
	// Nth call.
	function before(times, func) {
	  var memo;
	  return function() {
	    if (--times > 0) {
	      memo = func.apply(this, arguments);
	    }
	    if (times <= 1) func = null;
	    return memo;
	  };
	}

	// Returns a function that will be executed at most one time, no matter how
	// often you call it. Useful for lazy initialization.
	var once = partial(before, 2);

	// Returns the first key on an object that passes a truth test.
	function findKey(obj, predicate, context) {
	  predicate = cb(predicate, context);
	  var _keys = keys(obj), key;
	  for (var i = 0, length = _keys.length; i < length; i++) {
	    key = _keys[i];
	    if (predicate(obj[key], key, obj)) return key;
	  }
	}

	// Internal function to generate `_.findIndex` and `_.findLastIndex`.
	function createPredicateIndexFinder(dir) {
	  return function(array, predicate, context) {
	    predicate = cb(predicate, context);
	    var length = getLength(array);
	    var index = dir > 0 ? 0 : length - 1;
	    for (; index >= 0 && index < length; index += dir) {
	      if (predicate(array[index], index, array)) return index;
	    }
	    return -1;
	  };
	}

	// Returns the first index on an array-like that passes a truth test.
	var findIndex = createPredicateIndexFinder(1);

	// Returns the last index on an array-like that passes a truth test.
	var findLastIndex = createPredicateIndexFinder(-1);

	// Use a comparator function to figure out the smallest index at which
	// an object should be inserted so as to maintain order. Uses binary search.
	function sortedIndex(array, obj, iteratee, context) {
	  iteratee = cb(iteratee, context, 1);
	  var value = iteratee(obj);
	  var low = 0, high = getLength(array);
	  while (low < high) {
	    var mid = Math.floor((low + high) / 2);
	    if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	  }
	  return low;
	}

	// Internal function to generate the `_.indexOf` and `_.lastIndexOf` functions.
	function createIndexFinder(dir, predicateFind, sortedIndex) {
	  return function(array, item, idx) {
	    var i = 0, length = getLength(array);
	    if (typeof idx == 'number') {
	      if (dir > 0) {
	        i = idx >= 0 ? idx : Math.max(idx + length, i);
	      } else {
	        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	      }
	    } else if (sortedIndex && idx && length) {
	      idx = sortedIndex(array, item);
	      return array[idx] === item ? idx : -1;
	    }
	    if (item !== item) {
	      idx = predicateFind(slice.call(array, i, length), isNaN$1);
	      return idx >= 0 ? idx + i : -1;
	    }
	    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	      if (array[idx] === item) return idx;
	    }
	    return -1;
	  };
	}

	// Return the position of the first occurrence of an item in an array,
	// or -1 if the item is not included in the array.
	// If the array is large and already in sort order, pass `true`
	// for **isSorted** to use binary search.
	var indexOf = createIndexFinder(1, findIndex, sortedIndex);

	// Return the position of the last occurrence of an item in an array,
	// or -1 if the item is not included in the array.
	var lastIndexOf = createIndexFinder(-1, findLastIndex);

	// Return the first value which passes a truth test.
	function find(obj, predicate, context) {
	  var keyFinder = isArrayLike(obj) ? findIndex : findKey;
	  var key = keyFinder(obj, predicate, context);
	  if (key !== void 0 && key !== -1) return obj[key];
	}

	// Convenience version of a common use case of `_.find`: getting the first
	// object containing specific `key:value` pairs.
	function findWhere(obj, attrs) {
	  return find(obj, matcher(attrs));
	}

	// The cornerstone for collection functions, an `each`
	// implementation, aka `forEach`.
	// Handles raw objects in addition to array-likes. Treats all
	// sparse array-likes as if they were dense.
	function each(obj, iteratee, context) {
	  iteratee = optimizeCb(iteratee, context);
	  var i, length;
	  if (isArrayLike(obj)) {
	    for (i = 0, length = obj.length; i < length; i++) {
	      iteratee(obj[i], i, obj);
	    }
	  } else {
	    var _keys = keys(obj);
	    for (i = 0, length = _keys.length; i < length; i++) {
	      iteratee(obj[_keys[i]], _keys[i], obj);
	    }
	  }
	  return obj;
	}

	// Return the results of applying the iteratee to each element.
	function map$1(obj, iteratee, context) {
	  iteratee = cb(iteratee, context);
	  var _keys = !isArrayLike(obj) && keys(obj),
	      length = (_keys || obj).length,
	      results = Array(length);
	  for (var index = 0; index < length; index++) {
	    var currentKey = _keys ? _keys[index] : index;
	    results[index] = iteratee(obj[currentKey], currentKey, obj);
	  }
	  return results;
	}

	// Internal helper to create a reducing function, iterating left or right.
	function createReduce(dir) {
	  // Wrap code that reassigns argument variables in a separate function than
	  // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
	  var reducer = function(obj, iteratee, memo, initial) {
	    var _keys = !isArrayLike(obj) && keys(obj),
	        length = (_keys || obj).length,
	        index = dir > 0 ? 0 : length - 1;
	    if (!initial) {
	      memo = obj[_keys ? _keys[index] : index];
	      index += dir;
	    }
	    for (; index >= 0 && index < length; index += dir) {
	      var currentKey = _keys ? _keys[index] : index;
	      memo = iteratee(memo, obj[currentKey], currentKey, obj);
	    }
	    return memo;
	  };

	  return function(obj, iteratee, memo, context) {
	    var initial = arguments.length >= 3;
	    return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
	  };
	}

	// **Reduce** builds up a single result from a list of values, aka `inject`,
	// or `foldl`.
	var reduce = createReduce(1);

	// The right-associative version of reduce, also known as `foldr`.
	var reduceRight = createReduce(-1);

	// Return all the elements that pass a truth test.
	function filter(obj, predicate, context) {
	  var results = [];
	  predicate = cb(predicate, context);
	  each(obj, function(value, index, list) {
	    if (predicate(value, index, list)) results.push(value);
	  });
	  return results;
	}

	// Return all the elements for which a truth test fails.
	function reject(obj, predicate, context) {
	  return filter(obj, negate(cb(predicate)), context);
	}

	// Determine whether all of the elements pass a truth test.
	function every(obj, predicate, context) {
	  predicate = cb(predicate, context);
	  var _keys = !isArrayLike(obj) && keys(obj),
	      length = (_keys || obj).length;
	  for (var index = 0; index < length; index++) {
	    var currentKey = _keys ? _keys[index] : index;
	    if (!predicate(obj[currentKey], currentKey, obj)) return false;
	  }
	  return true;
	}

	// Determine if at least one element in the object passes a truth test.
	function some(obj, predicate, context) {
	  predicate = cb(predicate, context);
	  var _keys = !isArrayLike(obj) && keys(obj),
	      length = (_keys || obj).length;
	  for (var index = 0; index < length; index++) {
	    var currentKey = _keys ? _keys[index] : index;
	    if (predicate(obj[currentKey], currentKey, obj)) return true;
	  }
	  return false;
	}

	// Determine if the array or object contains a given item (using `===`).
	function contains(obj, item, fromIndex, guard) {
	  if (!isArrayLike(obj)) obj = values(obj);
	  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	  return indexOf(obj, item, fromIndex) >= 0;
	}

	// Invoke a method (with arguments) on every item in a collection.
	var invoke = restArguments(function(obj, path, args) {
	  var contextPath, func;
	  if (isFunction$1(path)) {
	    func = path;
	  } else {
	    path = toPath(path);
	    contextPath = path.slice(0, -1);
	    path = path[path.length - 1];
	  }
	  return map$1(obj, function(context) {
	    var method = func;
	    if (!method) {
	      if (contextPath && contextPath.length) {
	        context = deepGet(context, contextPath);
	      }
	      if (context == null) return void 0;
	      method = context[path];
	    }
	    return method == null ? method : method.apply(context, args);
	  });
	});

	// Convenience version of a common use case of `_.map`: fetching a property.
	function pluck(obj, key) {
	  return map$1(obj, property(key));
	}

	// Convenience version of a common use case of `_.filter`: selecting only
	// objects containing specific `key:value` pairs.
	function where(obj, attrs) {
	  return filter(obj, matcher(attrs));
	}

	// Return the maximum element (or element-based computation).
	function max(obj, iteratee, context) {
	  var result = -Infinity, lastComputed = -Infinity,
	      value, computed;
	  if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null)) {
	    obj = isArrayLike(obj) ? obj : values(obj);
	    for (var i = 0, length = obj.length; i < length; i++) {
	      value = obj[i];
	      if (value != null && value > result) {
	        result = value;
	      }
	    }
	  } else {
	    iteratee = cb(iteratee, context);
	    each(obj, function(v, index, list) {
	      computed = iteratee(v, index, list);
	      if (computed > lastComputed || (computed === -Infinity && result === -Infinity)) {
	        result = v;
	        lastComputed = computed;
	      }
	    });
	  }
	  return result;
	}

	// Return the minimum element (or element-based computation).
	function min(obj, iteratee, context) {
	  var result = Infinity, lastComputed = Infinity,
	      value, computed;
	  if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object' && obj != null)) {
	    obj = isArrayLike(obj) ? obj : values(obj);
	    for (var i = 0, length = obj.length; i < length; i++) {
	      value = obj[i];
	      if (value != null && value < result) {
	        result = value;
	      }
	    }
	  } else {
	    iteratee = cb(iteratee, context);
	    each(obj, function(v, index, list) {
	      computed = iteratee(v, index, list);
	      if (computed < lastComputed || (computed === Infinity && result === Infinity)) {
	        result = v;
	        lastComputed = computed;
	      }
	    });
	  }
	  return result;
	}

	// Safely create a real, live array from anything iterable.
	var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
	function toArray(obj) {
	  if (!obj) return [];
	  if (isArray(obj)) return slice.call(obj);
	  if (isString(obj)) {
	    // Keep surrogate pair characters together.
	    return obj.match(reStrSymbol);
	  }
	  if (isArrayLike(obj)) return map$1(obj, identity);
	  return values(obj);
	}

	// Sample **n** random values from a collection using the modern version of the
	// [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	// If **n** is not specified, returns a single random element.
	// The internal `guard` argument allows it to work with `_.map`.
	function sample(obj, n, guard) {
	  if (n == null || guard) {
	    if (!isArrayLike(obj)) obj = values(obj);
	    return obj[random(obj.length - 1)];
	  }
	  var sample = toArray(obj);
	  var length = getLength(sample);
	  n = Math.max(Math.min(n, length), 0);
	  var last = length - 1;
	  for (var index = 0; index < n; index++) {
	    var rand = random(index, last);
	    var temp = sample[index];
	    sample[index] = sample[rand];
	    sample[rand] = temp;
	  }
	  return sample.slice(0, n);
	}

	// Shuffle a collection.
	function shuffle(obj) {
	  return sample(obj, Infinity);
	}

	// Sort the object's values by a criterion produced by an iteratee.
	function sortBy$1(obj, iteratee, context) {
	  var index = 0;
	  iteratee = cb(iteratee, context);
	  return pluck(map$1(obj, function(value, key, list) {
	    return {
	      value: value,
	      index: index++,
	      criteria: iteratee(value, key, list)
	    };
	  }).sort(function(left, right) {
	    var a = left.criteria;
	    var b = right.criteria;
	    if (a !== b) {
	      if (a > b || a === void 0) return 1;
	      if (a < b || b === void 0) return -1;
	    }
	    return left.index - right.index;
	  }), 'value');
	}

	// An internal function used for aggregate "group by" operations.
	function group(behavior, partition) {
	  return function(obj, iteratee, context) {
	    var result = partition ? [[], []] : {};
	    iteratee = cb(iteratee, context);
	    each(obj, function(value, index) {
	      var key = iteratee(value, index, obj);
	      behavior(result, value, key);
	    });
	    return result;
	  };
	}

	// Groups the object's values by a criterion. Pass either a string attribute
	// to group by, or a function that returns the criterion.
	var groupBy = group(function(result, value, key) {
	  if (has$1(result, key)) result[key].push(value); else result[key] = [value];
	});

	// Indexes the object's values by a criterion, similar to `_.groupBy`, but for
	// when you know that your index values will be unique.
	var indexBy = group(function(result, value, key) {
	  result[key] = value;
	});

	// Counts instances of an object that group by a certain criterion. Pass
	// either a string attribute to count by, or a function that returns the
	// criterion.
	var countBy = group(function(result, value, key) {
	  if (has$1(result, key)) result[key]++; else result[key] = 1;
	});

	// Split a collection into two arrays: one whose elements all pass the given
	// truth test, and one whose elements all do not pass the truth test.
	var partition = group(function(result, value, pass) {
	  result[pass ? 0 : 1].push(value);
	}, true);

	// Return the number of elements in a collection.
	function size(obj) {
	  if (obj == null) return 0;
	  return isArrayLike(obj) ? obj.length : keys(obj).length;
	}

	// Internal `_.pick` helper function to determine whether `key` is an enumerable
	// property name of `obj`.
	function keyInObj(value, key, obj) {
	  return key in obj;
	}

	// Return a copy of the object only containing the allowed properties.
	var pick = restArguments(function(obj, keys) {
	  var result = {}, iteratee = keys[0];
	  if (obj == null) return result;
	  if (isFunction$1(iteratee)) {
	    if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
	    keys = allKeys(obj);
	  } else {
	    iteratee = keyInObj;
	    keys = flatten$1(keys, false, false);
	    obj = Object(obj);
	  }
	  for (var i = 0, length = keys.length; i < length; i++) {
	    var key = keys[i];
	    var value = obj[key];
	    if (iteratee(value, key, obj)) result[key] = value;
	  }
	  return result;
	});

	// Return a copy of the object without the disallowed properties.
	var omit = restArguments(function(obj, keys) {
	  var iteratee = keys[0], context;
	  if (isFunction$1(iteratee)) {
	    iteratee = negate(iteratee);
	    if (keys.length > 1) context = keys[1];
	  } else {
	    keys = map$1(flatten$1(keys, false, false), String);
	    iteratee = function(value, key) {
	      return !contains(keys, key);
	    };
	  }
	  return pick(obj, iteratee, context);
	});

	// Returns everything but the last entry of the array. Especially useful on
	// the arguments object. Passing **n** will return all the values in
	// the array, excluding the last N.
	function initial(array, n, guard) {
	  return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	}

	// Get the first element of an array. Passing **n** will return the first N
	// values in the array. The **guard** check allows it to work with `_.map`.
	function first(array, n, guard) {
	  if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
	  if (n == null || guard) return array[0];
	  return initial(array, array.length - n);
	}

	// Returns everything but the first entry of the `array`. Especially useful on
	// the `arguments` object. Passing an **n** will return the rest N values in the
	// `array`.
	function rest(array, n, guard) {
	  return slice.call(array, n == null || guard ? 1 : n);
	}

	// Get the last element of an array. Passing **n** will return the last N
	// values in the array.
	function last(array, n, guard) {
	  if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
	  if (n == null || guard) return array[array.length - 1];
	  return rest(array, Math.max(0, array.length - n));
	}

	// Trim out all falsy values from an array.
	function compact(array) {
	  return filter(array, Boolean);
	}

	// Flatten out an array, either recursively (by default), or up to `depth`.
	// Passing `true` or `false` as `depth` means `1` or `Infinity`, respectively.
	function flatten$2(array, depth) {
	  return flatten$1(array, depth, false);
	}

	// Take the difference between one array and a number of other arrays.
	// Only the elements present in just the first array will remain.
	var difference = restArguments(function(array, rest) {
	  rest = flatten$1(rest, true, true);
	  return filter(array, function(value){
	    return !contains(rest, value);
	  });
	});

	// Return a version of the array that does not contain the specified value(s).
	var without = restArguments(function(array, otherArrays) {
	  return difference(array, otherArrays);
	});

	// Produce a duplicate-free version of the array. If the array has already
	// been sorted, you have the option of using a faster algorithm.
	// The faster algorithm will not work with an iteratee if the iteratee
	// is not a one-to-one function, so providing an iteratee will disable
	// the faster algorithm.
	function uniq(array, isSorted, iteratee, context) {
	  if (!isBoolean(isSorted)) {
	    context = iteratee;
	    iteratee = isSorted;
	    isSorted = false;
	  }
	  if (iteratee != null) iteratee = cb(iteratee, context);
	  var result = [];
	  var seen = [];
	  for (var i = 0, length = getLength(array); i < length; i++) {
	    var value = array[i],
	        computed = iteratee ? iteratee(value, i, array) : value;
	    if (isSorted && !iteratee) {
	      if (!i || seen !== computed) result.push(value);
	      seen = computed;
	    } else if (iteratee) {
	      if (!contains(seen, computed)) {
	        seen.push(computed);
	        result.push(value);
	      }
	    } else if (!contains(result, value)) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	// Produce an array that contains the union: each distinct element from all of
	// the passed-in arrays.
	var union = restArguments(function(arrays) {
	  return uniq(flatten$1(arrays, true, true));
	});

	// Produce an array that contains every item shared between all the
	// passed-in arrays.
	function intersection(array) {
	  var result = [];
	  var argsLength = arguments.length;
	  for (var i = 0, length = getLength(array); i < length; i++) {
	    var item = array[i];
	    if (contains(result, item)) continue;
	    var j;
	    for (j = 1; j < argsLength; j++) {
	      if (!contains(arguments[j], item)) break;
	    }
	    if (j === argsLength) result.push(item);
	  }
	  return result;
	}

	// Complement of zip. Unzip accepts an array of arrays and groups
	// each array's elements on shared indices.
	function unzip(array) {
	  var length = (array && max(array, getLength).length) || 0;
	  var result = Array(length);

	  for (var index = 0; index < length; index++) {
	    result[index] = pluck(array, index);
	  }
	  return result;
	}

	// Zip together multiple lists into a single array -- elements that share
	// an index go together.
	var zip = restArguments(unzip);

	// Converts lists into objects. Pass either a single array of `[key, value]`
	// pairs, or two parallel arrays of the same length -- one of keys, and one of
	// the corresponding values. Passing by pairs is the reverse of `_.pairs`.
	function object(list, values) {
	  var result = {};
	  for (var i = 0, length = getLength(list); i < length; i++) {
	    if (values) {
	      result[list[i]] = values[i];
	    } else {
	      result[list[i][0]] = list[i][1];
	    }
	  }
	  return result;
	}

	// Generate an integer Array containing an arithmetic progression. A port of
	// the native Python `range()` function. See
	// [the Python documentation](https://docs.python.org/library/functions.html#range).
	function range(start, stop, step) {
	  if (stop == null) {
	    stop = start || 0;
	    start = 0;
	  }
	  if (!step) {
	    step = stop < start ? -1 : 1;
	  }

	  var length = Math.max(Math.ceil((stop - start) / step), 0);
	  var range = Array(length);

	  for (var idx = 0; idx < length; idx++, start += step) {
	    range[idx] = start;
	  }

	  return range;
	}

	// Chunk a single array into multiple arrays, each containing `count` or fewer
	// items.
	function chunk(array, count) {
	  if (count == null || count < 1) return [];
	  var result = [];
	  var i = 0, length = array.length;
	  while (i < length) {
	    result.push(slice.call(array, i, i += count));
	  }
	  return result;
	}

	// Helper function to continue chaining intermediate results.
	function chainResult(instance, obj) {
	  return instance._chain ? _$1(obj).chain() : obj;
	}

	// Add your own custom functions to the Underscore object.
	function mixin(obj) {
	  each(functions(obj), function(name) {
	    var func = _$1[name] = obj[name];
	    _$1.prototype[name] = function() {
	      var args = [this._wrapped];
	      push.apply(args, arguments);
	      return chainResult(this, func.apply(_$1, args));
	    };
	  });
	  return _$1;
	}

	// Add all mutator `Array` functions to the wrapper.
	each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	  var method = ArrayProto[name];
	  _$1.prototype[name] = function() {
	    var obj = this._wrapped;
	    if (obj != null) {
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) {
	        delete obj[0];
	      }
	    }
	    return chainResult(this, obj);
	  };
	});

	// Add all accessor `Array` functions to the wrapper.
	each(['concat', 'join', 'slice'], function(name) {
	  var method = ArrayProto[name];
	  _$1.prototype[name] = function() {
	    var obj = this._wrapped;
	    if (obj != null) obj = method.apply(obj, arguments);
	    return chainResult(this, obj);
	  };
	});

	// Named Exports

	var allExports = {
	  __proto__: null,
	  VERSION: VERSION,
	  restArguments: restArguments,
	  isObject: isObject,
	  isNull: isNull,
	  isUndefined: isUndefined,
	  isBoolean: isBoolean,
	  isElement: isElement,
	  isString: isString,
	  isNumber: isNumber,
	  isDate: isDate,
	  isRegExp: isRegExp,
	  isError: isError,
	  isSymbol: isSymbol,
	  isArrayBuffer: isArrayBuffer,
	  isDataView: isDataView$1,
	  isArray: isArray,
	  isFunction: isFunction$1,
	  isArguments: isArguments$1,
	  isFinite: isFinite$1,
	  isNaN: isNaN$1,
	  isTypedArray: isTypedArray$1,
	  isEmpty: isEmpty,
	  isMatch: isMatch,
	  isEqual: isEqual,
	  isMap: isMap,
	  isWeakMap: isWeakMap,
	  isSet: isSet,
	  isWeakSet: isWeakSet,
	  keys: keys,
	  allKeys: allKeys,
	  values: values,
	  pairs: pairs,
	  invert: invert,
	  functions: functions,
	  methods: functions,
	  extend: extend,
	  extendOwn: extendOwn,
	  assign: extendOwn,
	  defaults: defaults,
	  create: create,
	  clone: clone,
	  tap: tap,
	  get: get,
	  has: has,
	  mapObject: mapObject,
	  identity: identity,
	  constant: constant,
	  noop: noop,
	  toPath: toPath$1,
	  property: property,
	  propertyOf: propertyOf,
	  matcher: matcher,
	  matches: matcher,
	  times: times,
	  random: random,
	  now: now,
	  escape: _escape,
	  unescape: _unescape,
	  templateSettings: templateSettings,
	  template: template,
	  result: result,
	  uniqueId: uniqueId,
	  chain: chain,
	  iteratee: iteratee,
	  partial: partial,
	  bind: bind,
	  bindAll: bindAll,
	  memoize: memoize,
	  delay: delay,
	  defer: defer,
	  throttle: throttle,
	  debounce: debounce,
	  wrap: wrap,
	  negate: negate,
	  compose: compose,
	  after: after,
	  before: before,
	  once: once,
	  findKey: findKey,
	  findIndex: findIndex,
	  findLastIndex: findLastIndex,
	  sortedIndex: sortedIndex,
	  indexOf: indexOf,
	  lastIndexOf: lastIndexOf,
	  find: find,
	  detect: find,
	  findWhere: findWhere,
	  each: each,
	  forEach: each,
	  map: map$1,
	  collect: map$1,
	  reduce: reduce,
	  foldl: reduce,
	  inject: reduce,
	  reduceRight: reduceRight,
	  foldr: reduceRight,
	  filter: filter,
	  select: filter,
	  reject: reject,
	  every: every,
	  all: every,
	  some: some,
	  any: some,
	  contains: contains,
	  includes: contains,
	  include: contains,
	  invoke: invoke,
	  pluck: pluck,
	  where: where,
	  max: max,
	  min: min,
	  shuffle: shuffle,
	  sample: sample,
	  sortBy: sortBy$1,
	  groupBy: groupBy,
	  indexBy: indexBy,
	  countBy: countBy,
	  partition: partition,
	  toArray: toArray,
	  size: size,
	  pick: pick,
	  omit: omit,
	  first: first,
	  head: first,
	  take: first,
	  initial: initial,
	  last: last,
	  rest: rest,
	  tail: rest,
	  drop: rest,
	  compact: compact,
	  flatten: flatten$2,
	  without: without,
	  uniq: uniq,
	  unique: uniq,
	  union: union,
	  intersection: intersection,
	  difference: difference,
	  unzip: unzip,
	  transpose: unzip,
	  zip: zip,
	  object: object,
	  range: range,
	  chunk: chunk,
	  mixin: mixin,
	  'default': _$1
	};

	// Default Export

	// Add all of the Underscore functions to the wrapper object.
	var _ = mixin(allExports);
	// Legacy Node.js API.
	_._ = _;

	const browserTypes = {
	    chrome: () => {
	        return window.chrome && /chrome/i.test(navigator.userAgent);
	    },
	    safari: () => {
	        return (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));
	    },
	    firefox: () => /Firefox\//.test(navigator.userAgent),
	    ie: () => /Windows.*Trident/.test(navigator.userAgent),
	};
	/**
	 * Identify the kind of machine, can be either OS or more specific device type (e.g. iPhone / iPad)
	 */
	const platformTypes = {
	    iPhone: () => /iPhone/.test(navigator.userAgent),
	    iPad: () => /iPad/.test(navigator.userAgent),
	    android: () => /android/i.test(navigator.userAgent),
	    mac: () => /Mac/.test(navigator.userAgent),
	    windows: () => /Win/.test(navigator.userAgent),
	    linux: () => /Linux/.test(navigator.userAgent),
	};
	const allDeviceTypes = Object.assign(Object.assign(Object.assign({}, browserTypes), platformTypes), { iOS: () => /iPad|iPhone|iPod/.test(navigator.userAgent), mobile: () => {
	        return is("iOS") || is("android");
	    } });
	const is = function (deviceName) {
	    const deviceChecker = allDeviceTypes[deviceName];
	    if (!deviceChecker) {
	        throw Error(`Device "${deviceName}" not recognised`);
	    }
	    return deviceChecker();
	};
	/**
	 * Returns `true` if running as a home-screen app on iOS or Android.
	 */
	memoize(() => {
	    var _a, _b, _c;
	    // on iOS Safari
	    if ((_a = window.navigator) === null || _a === void 0 ? void 0 : _a["standalone"]) {
	        return true;
	    }
	    // on Android Chrome
	    if ((_c = (_b = window.matchMedia) === null || _b === void 0 ? void 0 : _b.call(window, "(display-mode: standalone)")) === null || _c === void 0 ? void 0 : _c.matches) {
	        return true;
	    }
	    return false;
	});

	// Popup Element
	let _popupElement;
	let hoveringOverPopup = false;
	let onPopupUnhover;
	const getPopupElement = () => {
	    if (_popupElement) {
	        return _popupElement;
	    }
	    _popupElement = $("<a>");
	    _popupElement.hover(() => {
	        hoveringOverPopup = true;
	    }, () => {
	        hoveringOverPopup = false;
	        if (onPopupUnhover) {
	            onPopupUnhover();
	            onPopupUnhover = undefined;
	        }
	    });
	    return _popupElement;
	};
	const createLinkPopup = (originalLink) => {
	    const href = originalLink.attr("href");
	    const title = originalLink.attr("title");
	    const position = originalLink.offset();
	    const height = originalLink.outerHeight();
	    const width = originalLink.outerWidth();
	    originalLink.removeAttr("title");
	    const popupElement = getPopupElement();
	    popupElement
	        .html("Open link &#8594;")
	        .addClass("readlang-link-popup")
	        .attr("title", title)
	        .attr("href", href)
	        .css({
	        position: "absolute",
	        top: position.top + height,
	        left: position.left + width / 2,
	    });
	};
	let hideTimer;
	let enabled = true;
	const setEnabled$1 = (_enabled) => {
	    enabled = _enabled;
	};
	let $target;
	let mouseMoveTimer;
	const onMouseMove = () => {
	    clearTimeout(mouseMoveTimer);
	    mouseMoveTimer = setTimeout(showLink, 300);
	};
	var showLink = () => {
	    clearTimeout(hideTimer);
	    createLinkPopup($target);
	    $("body").append(getPopupElement());
	    getPopupElement().stop().css({ opacity: 1 }).show();
	};
	const hideLink = () => {
	    clearTimeout(hideTimer);
	    clearTimeout(mouseMoveTimer);
	    getPopupElement().fadeOut();
	    $target = undefined;
	};
	const onLinkUnhover = () => {
	    clearTimeout(mouseMoveTimer);
	    clearTimeout(hideTimer);
	    hideTimer = setTimeout(() => {
	        if (getPopupElement()) {
	            if (hoveringOverPopup) {
	                onPopupUnhover = hideLink;
	            }
	            else {
	                hideLink();
	            }
	        }
	    }, 500);
	};
	const setup$2 = (element) => {
	    // link pop-up
	    element.find("a[href]").hover((event) => {
	        if (!enabled) {
	            return;
	        }
	        if ($target) {
	            $target.off("mousemove");
	        }
	        $target = $(event.currentTarget);
	        if ($target.closest(".readlang-ignore").length > 0) {
	            return;
	        }
	        clearTimeout(hideTimer);
	        clearTimeout(mouseMoveTimer);
	        mouseMoveTimer = setTimeout(showLink, 300);
	        $target.mousemove(onMouseMove);
	    }, () => {
	        if (!enabled) {
	            return;
	        }
	        if ($target) {
	            $target.off("mousemove");
	            clearTimeout(mouseMoveTimer);
	            onLinkUnhover();
	        }
	    });
	    if (is("iOS") || is("android")) {
	        element.find("a[href]").each((index, link) => {
	            const $link = $(link);
	            if ($link.find("span[data-p]").length > 0) {
	                $link.after($("<a>")
	                    .html(" &#8594; ")
	                    .css({ color: "#080" })
	                    .attr("href", $link.attr("href")));
	            }
	        });
	    }
	};
	const updateLink = () => {
	    if ($target) {
	        createLinkPopup($target);
	    }
	};

	/**
	 * Utility functions to send messages between:
	 * - Extension content script
	 * - Extension background page
	 * - embeddedWebReader.js or importerBookmarklet.js (running within 3rd party website)
	 * - bookmarklet.js or bookmarkletAddDocument.js (running within readlang.com iframe)
	 */
	const readlangMessageType = "readlangMessage";
	/**
	 * This will be set by the embeddedWebReader with a handle to the iFrame, allowing us to send
	 * messages to it.
	 */
	let webReaderIFrame;
	/**
	 * @param to - Which context to send the message to
	 * @param message - The message
	 * @param data - Optional data, will be JSON stringified
	 * @param requestId - Optional, only relevant for extension context, used to match request/response
	 */
	const postMessage = (to, message, data, requestId) => {
	    switch (to) {
	        case "extension":
	            window.postMessage(JSON.stringify({
	                type: readlangMessageType,
	                to,
	                message: "backgroundPageMessage",
	                requestId,
	                data: {
	                    message,
	                    data,
	                },
	            }), 
	            // TODO: Should this be window.location.origin?
	            "*");
	            break;
	        case "embeddedWebReader":
	            top.postMessage(JSON.stringify({
	                type: readlangMessageType,
	                to,
	                message,
	                data,
	            }), "*"); // TODO: Parent origin?
	            break;
	        case "webReaderIFrame":
	            if (!webReaderIFrame) {
	                throw Error("web reader iFrameWindow not set");
	            }
	            webReaderIFrame.postMessage(JSON.stringify({
	                type: readlangMessageType,
	                to,
	                message,
	                data,
	            }), "*");
	            break;
	        case "importerIFrame":
	            {
	                throw Error("importer iFrameWindow not set");
	            }
	    }
	};
	const setWebReaderIFrame = (newIFrameWindow) => {
	    webReaderIFrame = newIFrameWindow;
	};
	const eventListeners = new Map();
	const messageListener = (context, handler) => {
	    if (!("addEventListener" in window)) {
	        alert("The Readlang bookmarklet is not working on this page using this browser." +
	            "\n\nTry using Google Chrome instead.");
	        return;
	    }
	    const listener = (event) => {
	        let data;
	        try {
	            data = JSON.parse(event.data);
	        }
	        catch (_error) {
	            // Ignore non-JSON messages.
	            return;
	        }
	        if ((data === null || data === void 0 ? void 0 : data.type) !== readlangMessageType) {
	            // console.log("Ignoring invalid message", event.data);
	            return;
	        }
	        if (data.to !== context) {
	            // console.log(
	            //   `Ignoring message for different context. ${data.to} !== ${context}`
	            // );
	            return;
	        }
	        handler(data.message, data.data, event);
	    };
	    window.addEventListener("message", listener);
	    eventListeners.set(context, listener);
	};

	// Unicode regex pattern sources, defined as regex literals so that
	// @babel/plugin-transform-unicode-property-regex can transpile them for older browsers.
	// Sharing these constants ensures each character class is expanded only once in the bundle.
	//
	// In native JS: /\p{L}/u.source = "\p{L}" (no brackets)
	// After Babel:  /\p{L}/u.source = "[A-Za-z\xAA...]" (wrapped in brackets)
	// getInner strips brackets when present, so the result can be embedded in [${letter}].

	function getInner(regex) {
	  const source = regex.source;
	  if (source.startsWith("[") && !source.startsWith("[^")) {
	    return source.slice(1, -1);
	  }
	  return source;
	}

	/** Inner content for Unicode letters — use as [${letter}] or in [${letter}${mark}] */
	const letter = getInner(/[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088F\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5C\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDC-\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7DC\uA7F1-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{10300}-\u{1031F}\u{1032D}-\u{10340}\u{10342}-\u{10349}\u{10350}-\u{10375}\u{10380}-\u{1039D}\u{103A0}-\u{103C3}\u{103C8}-\u{103CF}\u{10400}-\u{1049D}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{10570}-\u{1057A}\u{1057C}-\u{1058A}\u{1058C}-\u{10592}\u{10594}\u{10595}\u{10597}-\u{105A1}\u{105A3}-\u{105B1}\u{105B3}-\u{105B9}\u{105BB}\u{105BC}\u{105C0}-\u{105F3}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{10780}-\u{10785}\u{10787}-\u{107B0}\u{107B2}-\u{107BA}\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10860}-\u{10876}\u{10880}-\u{1089E}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{10900}-\u{10915}\u{10920}-\u{10939}\u{10940}-\u{10959}\u{10980}-\u{109B7}\u{109BE}\u{109BF}\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A60}-\u{10A7C}\u{10A80}-\u{10A9C}\u{10AC0}-\u{10AC7}\u{10AC9}-\u{10AE4}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B60}-\u{10B72}\u{10B80}-\u{10B91}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10D00}-\u{10D23}\u{10D4A}-\u{10D65}\u{10D6F}-\u{10D85}\u{10E80}-\u{10EA9}\u{10EB0}\u{10EB1}\u{10EC2}-\u{10EC7}\u{10F00}-\u{10F1C}\u{10F27}\u{10F30}-\u{10F45}\u{10F70}-\u{10F81}\u{10FB0}-\u{10FC4}\u{10FE0}-\u{10FF6}\u{11003}-\u{11037}\u{11071}\u{11072}\u{11075}\u{11083}-\u{110AF}\u{110D0}-\u{110E8}\u{11103}-\u{11126}\u{11144}\u{11147}\u{11150}-\u{11172}\u{11176}\u{11183}-\u{111B2}\u{111C1}-\u{111C4}\u{111DA}\u{111DC}\u{11200}-\u{11211}\u{11213}-\u{1122B}\u{1123F}\u{11240}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A8}\u{112B0}-\u{112DE}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133D}\u{11350}\u{1135D}-\u{11361}\u{11380}-\u{11389}\u{1138B}\u{1138E}\u{11390}-\u{113B5}\u{113B7}\u{113D1}\u{113D3}\u{11400}-\u{11434}\u{11447}-\u{1144A}\u{1145F}-\u{11461}\u{11480}-\u{114AF}\u{114C4}\u{114C5}\u{114C7}\u{11580}-\u{115AE}\u{115D8}-\u{115DB}\u{11600}-\u{1162F}\u{11644}\u{11680}-\u{116AA}\u{116B8}\u{11700}-\u{1171A}\u{11740}-\u{11746}\u{11800}-\u{1182B}\u{118A0}-\u{118DF}\u{118FF}-\u{11906}\u{11909}\u{1190C}-\u{11913}\u{11915}\u{11916}\u{11918}-\u{1192F}\u{1193F}\u{11941}\u{119A0}-\u{119A7}\u{119AA}-\u{119D0}\u{119E1}\u{119E3}\u{11A00}\u{11A0B}-\u{11A32}\u{11A3A}\u{11A50}\u{11A5C}-\u{11A89}\u{11A9D}\u{11AB0}-\u{11AF8}\u{11BC0}-\u{11BE0}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C2E}\u{11C40}\u{11C72}-\u{11C8F}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D30}\u{11D46}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D89}\u{11D98}\u{11DB0}-\u{11DDB}\u{11EE0}-\u{11EF2}\u{11F02}\u{11F04}-\u{11F10}\u{11F12}-\u{11F33}\u{11FB0}\u{12000}-\u{12399}\u{12480}-\u{12543}\u{12F90}-\u{12FF0}\u{13000}-\u{1342F}\u{13441}-\u{13446}\u{13460}-\u{143FA}\u{14400}-\u{14646}\u{16100}-\u{1611D}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16A70}-\u{16ABE}\u{16AD0}-\u{16AED}\u{16B00}-\u{16B2F}\u{16B40}-\u{16B43}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16D40}-\u{16D6C}\u{16E40}-\u{16E7F}\u{16EA0}-\u{16EB8}\u{16EBB}-\u{16ED3}\u{16F00}-\u{16F4A}\u{16F50}\u{16F93}-\u{16F9F}\u{16FE0}\u{16FE1}\u{16FE3}\u{16FF2}\u{16FF3}\u{17000}-\u{18CD5}\u{18CFF}-\u{18D1E}\u{18D80}-\u{18DF2}\u{1AFF0}-\u{1AFF3}\u{1AFF5}-\u{1AFFB}\u{1AFFD}\u{1AFFE}\u{1B000}-\u{1B122}\u{1B132}\u{1B150}-\u{1B152}\u{1B155}\u{1B164}-\u{1B167}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D6C0}\u{1D6C2}-\u{1D6DA}\u{1D6DC}-\u{1D6FA}\u{1D6FC}-\u{1D714}\u{1D716}-\u{1D734}\u{1D736}-\u{1D74E}\u{1D750}-\u{1D76E}\u{1D770}-\u{1D788}\u{1D78A}-\u{1D7A8}\u{1D7AA}-\u{1D7C2}\u{1D7C4}-\u{1D7CB}\u{1DF00}-\u{1DF1E}\u{1DF25}-\u{1DF2A}\u{1E030}-\u{1E06D}\u{1E100}-\u{1E12C}\u{1E137}-\u{1E13D}\u{1E14E}\u{1E290}-\u{1E2AD}\u{1E2C0}-\u{1E2EB}\u{1E4D0}-\u{1E4EB}\u{1E5D0}-\u{1E5ED}\u{1E5F0}\u{1E6C0}-\u{1E6DE}\u{1E6E0}-\u{1E6E2}\u{1E6E4}\u{1E6E5}\u{1E6E7}-\u{1E6ED}\u{1E6F0}-\u{1E6F4}\u{1E6FE}\u{1E6FF}\u{1E7E0}-\u{1E7E6}\u{1E7E8}-\u{1E7EB}\u{1E7ED}\u{1E7EE}\u{1E7F0}-\u{1E7FE}\u{1E800}-\u{1E8C4}\u{1E900}-\u{1E943}\u{1E94B}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}\u{20000}-\u{2A6DF}\u{2A700}-\u{2B81D}\u{2B820}-\u{2CEAD}\u{2CEB0}-\u{2EBE0}\u{2EBF0}-\u{2EE5D}\u{2F800}-\u{2FA1D}\u{30000}-\u{3134A}\u{31350}-\u{33479}]/u);

	/** Inner content for Unicode combining marks — use as [${mark}] */
	const mark = getInner(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u180F\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ADD\u1AE0-\u1AEB\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\u{101FD}\u{102E0}\u{10376}-\u{1037A}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10D24}-\u{10D27}\u{10D69}-\u{10D6D}\u{10EAB}\u{10EAC}\u{10EFA}-\u{10EFF}\u{10F46}-\u{10F50}\u{10F82}-\u{10F85}\u{11000}-\u{11002}\u{11038}-\u{11046}\u{11070}\u{11073}\u{11074}\u{1107F}-\u{11082}\u{110B0}-\u{110BA}\u{110C2}\u{11100}-\u{11102}\u{11127}-\u{11134}\u{11145}\u{11146}\u{11173}\u{11180}-\u{11182}\u{111B3}-\u{111C0}\u{111C9}-\u{111CC}\u{111CE}\u{111CF}\u{1122C}-\u{11237}\u{1123E}\u{11241}\u{112DF}-\u{112EA}\u{11300}-\u{11303}\u{1133B}\u{1133C}\u{1133E}-\u{11344}\u{11347}\u{11348}\u{1134B}-\u{1134D}\u{11357}\u{11362}\u{11363}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{113B8}-\u{113C0}\u{113C2}\u{113C5}\u{113C7}-\u{113CA}\u{113CC}-\u{113D0}\u{113D2}\u{113E1}\u{113E2}\u{11435}-\u{11446}\u{1145E}\u{114B0}-\u{114C3}\u{115AF}-\u{115B5}\u{115B8}-\u{115C0}\u{115DC}\u{115DD}\u{11630}-\u{11640}\u{116AB}-\u{116B7}\u{1171D}-\u{1172B}\u{1182C}-\u{1183A}\u{11930}-\u{11935}\u{11937}\u{11938}\u{1193B}-\u{1193E}\u{11940}\u{11942}\u{11943}\u{119D1}-\u{119D7}\u{119DA}-\u{119E0}\u{119E4}\u{11A01}-\u{11A0A}\u{11A33}-\u{11A39}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A5B}\u{11A8A}-\u{11A99}\u{11B60}-\u{11B67}\u{11C2F}-\u{11C36}\u{11C38}-\u{11C3F}\u{11C92}-\u{11CA7}\u{11CA9}-\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D8A}-\u{11D8E}\u{11D90}\u{11D91}\u{11D93}-\u{11D97}\u{11EF3}-\u{11EF6}\u{11F00}\u{11F01}\u{11F03}\u{11F34}-\u{11F3A}\u{11F3E}-\u{11F42}\u{11F5A}\u{13440}\u{13447}-\u{13455}\u{1611E}-\u{1612F}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F51}-\u{16F87}\u{16F8F}-\u{16F92}\u{16FE4}\u{16FF0}\u{16FF1}\u{1BC9D}\u{1BC9E}\u{1CF00}-\u{1CF2D}\u{1CF30}-\u{1CF46}\u{1D165}-\u{1D169}\u{1D16D}-\u{1D172}\u{1D17B}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D242}-\u{1D244}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E08F}\u{1E130}-\u{1E136}\u{1E2AE}\u{1E2EC}-\u{1E2EF}\u{1E4EC}-\u{1E4EF}\u{1E5EE}\u{1E5EF}\u{1E6E3}\u{1E6E6}\u{1E6EE}\u{1E6EF}\u{1E6F5}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94A}\u{E0100}-\u{E01EF}]/u);

	/** Complete character class pattern for CJK/Thai script detection */
	const cjkThai = /[\u0E01-\u0E3A\u0E40-\u0E5B\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FD-\u30FF\u31F0-\u31FF\u32D0-\u32FE\u3300-\u3357\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFA6D\uFA70-\uFAD9\uFF66-\uFF6F\uFF71-\uFF9D\u{16FE2}\u{16FE3}\u{16FF0}-\u{16FF6}\u{1AFF0}-\u{1AFF3}\u{1AFF5}-\u{1AFFB}\u{1AFFD}\u{1AFFE}\u{1B000}-\u{1B122}\u{1B132}\u{1B150}-\u{1B152}\u{1B155}\u{1B164}-\u{1B167}\u{1F200}\u{20000}-\u{2A6DF}\u{2A700}-\u{2B81D}\u{2B820}-\u{2CEAD}\u{2CEB0}-\u{2EBE0}\u{2EBF0}-\u{2EE5D}\u{2F800}-\u{2FA1D}\u{30000}-\u{3134A}\u{31350}-\u{33479}]/u.source;

	// Given a set of data points, do linear piecewise interpolation
	// envelope is an ordered list of t, w coordinates
	//
	// returns the w value for the given t
	const getWord = (envelope, t) => {
	    if (t <= envelope[0].t || envelope.length === 1) {
	        return envelope[0].w;
	    }
	    const lastIndex = envelope.length - 1;
	    if (t >= envelope[lastIndex].t) {
	        return envelope[lastIndex].w;
	    }
	    let index = 1;
	    while (t > envelope[index].t) {
	        index++;
	    }
	    const t1 = envelope[index - 1].t;
	    const w1 = envelope[index - 1].w;
	    const t2 = envelope[index].t;
	    const w2 = envelope[index].w;
	    return (w1 * (t2 - t) + w2 * (t - t1)) / (t2 - t1);
	};
	const getTime = (envelope, w) => {
	    const inverseEnvelope = map$1(envelope, (point) => ({
	        t: point.w,
	        w: point.t,
	    }));
	    return getWord(inverseEnvelope, w);
	};

	// code from https://github.com/jden/objectid/tree/1.1.0
	const $3_BITS = 0xffffff;
	const $5_BITS = 0xffffffffff;
	const MACHINE_ID_AND_PID = Math.round(Math.random() * $5_BITS);
	let index = 0;
	const nextIndex = () => {
	    index = index + (1 % $3_BITS);
	    return index;
	};
	const currentTimestamp = () => Math.floor(new Date().getTime() / 1000);
	const pad = (value, padAmount) => {
	    while (value.length < padAmount) {
	        value = "0" + value;
	    }
	    return value;
	};
	const makeObjectId = () => {
	    /* ObjectIds
	     * 24 character hex strings of 12 byte objects
	     * 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B
	     * Timestamp     | Machine   | PID   | Index
	     * Since we're running in a browser, we just use random values
	     * for Machine and PID
	     */
	    const groups = [
	        // [value, padding in hex (bytes * 2)]
	        [currentTimestamp(), 8],
	        [MACHINE_ID_AND_PID, 10],
	        [nextIndex(), 6],
	    ];
	    const str = groups.reduce((id, group) => id + pad(group[0].toString(16), group[1]), "");
	    return str;
	};

	function _defineProperty(e, r, t) {
	  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
	    value: t,
	    enumerable: true,
	    configurable: true,
	    writable: true
	  }) : e[r] = t, e;
	}
	function ownKeys(e, r) {
	  var t = Object.keys(e);
	  if (Object.getOwnPropertySymbols) {
	    var o = Object.getOwnPropertySymbols(e);
	    r && (o = o.filter(function (r) {
	      return Object.getOwnPropertyDescriptor(e, r).enumerable;
	    })), t.push.apply(t, o);
	  }
	  return t;
	}
	function _objectSpread2(e) {
	  for (var r = 1; r < arguments.length; r++) {
	    var t = null != arguments[r] ? arguments[r] : {};
	    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
	      _defineProperty(e, r, t[r]);
	    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
	      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
	    });
	  }
	  return e;
	}
	function _toPrimitive(t, r) {
	  if ("object" != typeof t || !t) return t;
	  var e = t[Symbol.toPrimitive];
	  if (void 0 !== e) {
	    var i = e.call(t, r);
	    if ("object" != typeof i) return i;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return ("string" === r ? String : Number)(t);
	}
	function _toPropertyKey(t) {
	  var i = _toPrimitive(t, "string");
	  return "symbol" == typeof i ? i : i + "";
	}

	// sorts an array in place, by an arbitrary number of sort keys
	const sortBy = (array, sortKeys) => {
	  const result = clone(array);
	  const keyPairs = pairs(sortKeys);
	  result.sort((a, b) => {
	    for (let i = 0; i < keyPairs.length; i++) {
	      const key = keyPairs[i][0];
	      const direction = keyPairs[i][1];
	      if (!a[key] && b[key]) return direction;
	      if (a[key] && !b[key]) return -direction;
	      if (a[key] > b[key]) return direction;
	      if (a[key] < b[key]) return -direction;
	    }
	    return 0;
	  });
	  return result;
	};
	const sleep = async duration => new Promise(resolve => {
	  setTimeout(resolve, duration);
	});

	/**
	 * @type {{
	 *   [key: string]: {
	 *     name: string,
	 *     english: string,
	 *     ttsVoiceSelectedText: string,
	 *     frequencies?: true,
	 *     redditUrl?: string,
	 *     dictionaryURL?: string,
	 *     dictionaryCodes?: { [languageCode: string]: string },
	 *     capitalizationImportant?: true,
	 *     monolingualDictionaryURL?: string,
	 *     wiktionary?: boolean,
	 *     alphabet?: string,
	 *     direction?: "RTL"
	 *     noWordBoundaries?: true,
	 *     firstLanguageOnly?: true,
	 *     beta?: true,
	 *     starterStories?: {easy: string, medium: string}
	 *     flag: string,
	 *     transliterations?: string[],
	 *     whisper?: boolean,
	 *     cjkFontRegion?: "JP" | "SC" | "TC" | "HK" | "KR",
	 *     lowResource?: true,
	 *   }
	 * }}
	 */
	const map = {
	  en: {
	    name: "English",
	    english: "English",
	    frequencies: true,
	    monolingualDictionaryURL: "https://en.m.wiktionary.org/wiki/{{query}}",
	    wiktionary: true,
	    starterStories: {
	      easy: "648c8d13e6ebfa9964a44c2e",
	      medium: "6488534a2d6cce87eb44569b"
	    },
	    flag: "🇺🇸",
	    ttsVoiceSelectedText: "Hello, you have selected the voice {{voiceName}}.",
	    whisper: true
	  },
	  es: {
	    name: "Español",
	    english: "Spanish",
	    frequencies: true,
	    redditUrl: "http://www.reddit.com/r/ReadingSpanish/submit?url={{publicUrl}}&title={{title}}",
	    monolingualDictionaryURL: "https://es.wiktionary.org/wiki/{{query}}",
	    wiktionary: true,
	    starterStories: {
	      easy: "648c8c89e6ebfa9964a40adf",
	      medium: "6488535a2d6cce87eb4458f9"
	    },
	    flag: "🇪🇸",
	    ttsVoiceSelectedText: "Hola, has seleccionado la voz {{voiceName}}.",
	    whisper: true
	  },
	  fr: {
	    name: "Français",
	    english: "French",
	    frequencies: true,
	    wiktionary: true,
	    starterStories: {
	      easy: "648c8caae6ebfa9964a4103c",
	      medium: "6488536d2d6cce87eb446f1e"
	    },
	    flag: "🇫🇷",
	    ttsVoiceSelectedText: "Bonjour, vous avez sélectionné la voix {{voiceName}}.",
	    whisper: true
	  },
	  it: {
	    name: "Italiano",
	    english: "Italian",
	    frequencies: true,
	    wiktionary: true,
	    starterStories: {
	      easy: "648c8ccae6ebfa9964a429f9",
	      medium: "6488537c2d6cce87eb447cee"
	    },
	    flag: "🇮🇹",
	    ttsVoiceSelectedText: "Ciao, hai selezionato la voce {{voiceName}}.",
	    whisper: true
	  },
	  de: {
	    name: "Deutsch",
	    english: "German",
	    frequencies: true,
	    capitalizationImportant: true,
	    wiktionary: true,
	    starterStories: {
	      easy: "648c8c5fe6ebfa9964a4018a",
	      medium: "6488533b2d6cce87eb4437cd"
	    },
	    flag: "🇩🇪",
	    ttsVoiceSelectedText: "Hallo, Sie haben die Stimme {{voiceName}} ausgewählt.",
	    whisper: true
	  },
	  ca: {
	    name: "Català",
	    english: "Catalan",
	    frequencies: true,
	    monolingualDictionaryURL: "https://dlc.iec.cat/results.asp?txtEntrada={{query}}&operEntrada=0",
	    wiktionary: true,
	    flag: "🇦🇩",
	    ttsVoiceSelectedText: "Hola, has seleccionat la veu {{voiceName}}.",
	    whisper: true
	  },
	  pl: {
	    name: "Polski",
	    english: "Polish",
	    frequencies: true,
	    alphabet: "latin-ext",
	    wiktionary: true,
	    flag: "🇵🇱",
	    ttsVoiceSelectedText: "Witaj, wybrałeś głos {{voiceName}}.",
	    whisper: true
	  },
	  da: {
	    name: "Dansk",
	    english: "Danish",
	    frequencies: true,
	    flag: "🇩🇰",
	    ttsVoiceSelectedText: "Hej, du har valgt stemmen {{voiceName}}.",
	    whisper: true
	  },
	  pt: {
	    name: "Português",
	    english: "Portuguese",
	    frequencies: true,
	    wiktionary: true,
	    flag: "🇵🇹",
	    ttsVoiceSelectedText: "Olá, você selecionou a voz {{voiceName}}.",
	    whisper: true
	  },
	  sv: {
	    name: "Svenska",
	    english: "Swedish",
	    frequencies: true,
	    dictionaryURL: "https://folkets-lexikon.csc.kth.se/folkets/#lookup&{{query}}",
	    dictionaryCodes: {
	      en: ".en.",
	      sv: "."
	    },
	    wiktionary: true,
	    flag: "🇸🇪",
	    whisper: true,
	    ttsVoiceSelectedText: "Hej, du har valt rösten {{voiceName}}."
	  },
	  sr: {
	    name: "Cрпски",
	    english: "Serbian",
	    frequencies: true,
	    alphabet: "cyrillic",
	    flag: "🇷🇸",
	    ttsVoiceSelectedText: "Здраво, изабрали сте глас {{voiceName}}.",
	    whisper: true
	  },
	  ru: {
	    name: "Русский",
	    english: "Russian",
	    frequencies: true,
	    alphabet: "cyrillic",
	    dictionaryURL: "https://en.openrussian.org/?search={{query}}",
	    dictionaryCodes: {
	      en: "en",
	      ru: "ru"
	    },
	    wiktionary: true,
	    flag: "🇷🇺",
	    ttsVoiceSelectedText: "Здравствуйте, вы выбрали голос {{voiceName}}.",
	    whisper: true
	  },
	  ro: {
	    name: "Română",
	    english: "Romanian",
	    frequencies: true,
	    wiktionary: true,
	    flag: "🇷🇴",
	    ttsVoiceSelectedText: "Bună, ați selectat vocea {{voiceName}}.",
	    whisper: true
	  },
	  cs: {
	    name: "Čeština",
	    english: "Czech",
	    frequencies: true,
	    alphabet: "latin-ext",
	    redditUrl: "http://www.reddit.com/r/ReadingCzech/submit?url={{publicUrl}}&title={{title}}",
	    flag: "🇨🇿",
	    ttsVoiceSelectedText: "Ahoj, vybrali jste hlas {{voiceName}}.",
	    whisper: true
	  },
	  el: {
	    name: "Ελληνικά",
	    english: "Greek",
	    frequencies: true,
	    alphabet: "greek",
	    wiktionary: true,
	    flag: "🇬🇷",
	    ttsVoiceSelectedText: "Γεια σας, έχετε επιλέξει τη φωνή {{voiceName}}.",
	    whisper: true
	  },
	  tr: {
	    name: "Türkçe",
	    english: "Turkish",
	    frequencies: true,
	    alphabet: "latin-ext",
	    wiktionary: true,
	    flag: "🇹🇷",
	    ttsVoiceSelectedText: "Merhaba, {{voiceName}} sesini seçtiniz.",
	    whisper: true
	  },
	  cy: {
	    name: "Cymraeg",
	    english: "Welsh",
	    wiktionary: true,
	    flag: "🏴",
	    ttsVoiceSelectedText: "Helo, rydych wedi dewis y llais {{voiceName}}.",
	    whisper: true
	  },
	  br: {
	    name: "Brezhoneg",
	    english: "Breton",
	    wiktionary: true,
	    flag: "🇫🇷",
	    ttsVoiceSelectedText: "Demat, ar mouezh {{voiceName}} hoc'h eus diuzet."
	  },
	  nl: {
	    name: "Nederlands",
	    english: "Dutch",
	    frequencies: true,
	    dictionaryURL: "https://www.mijnwoordenboek.nl/vertaal/{{source}}/{{target}}/{{query}}",
	    dictionaryCodes: {
	      en: "EN",
	      de: "DE",
	      es: "ES",
	      fr: "FR",
	      nl: "NL"
	    },
	    monolingualDictionaryURL: "https://www.vandale.nl/opzoeken?pattern={{query}}&lang=nn#.Vgvo84-qpBc",
	    alphabet: "latin-ext",
	    starterStories: {
	      easy: "648c8cece6ebfa9964a44143",
	      medium: "648853a42d6cce87eb449a4d"
	    },
	    flag: "🇳🇱",
	    ttsVoiceSelectedText: "Hallo, je hebt de stem {{voiceName}} geselecteerd.",
	    whisper: true
	  },
	  sl: {
	    name: "Slovenski jezik",
	    english: "Slovenian",
	    flag: "🇸🇮",
	    ttsVoiceSelectedText: "Pozdravljeni, izbrali ste glas {{voiceName}}.",
	    whisper: true,
	    lowResource: true
	  },
	  fi: {
	    name: "Suomi",
	    english: "Finnish",
	    frequencies: true,
	    wiktionary: true,
	    flag: "🇫🇮",
	    ttsVoiceSelectedText: "Hei, olet valinnut äänen {{voiceName}}.",
	    whisper: true
	  },
	  ar: {
	    name: "العربية",
	    english: "Arabic",
	    direction: "RTL",
	    frequencies: true,
	    dictionaryURL: "http://www.aljazem.com/en/{{query}}",
	    dictionaryCodes: {
	      en: "en",
	      ar: "ar"
	    },
	    flag: "🇸🇦",
	    ttsVoiceSelectedText: "مرحبًا، لقد اخترت الصوت {{voiceName}}.",
	    whisper: true
	  },
	  iw: {
	    name: "עברית",
	    english: "Hebrew",
	    direction: "RTL",
	    dictionaryURL: "https://www.morfix.co.il/en/{{query}}",
	    dictionaryCodes: {
	      en: "en",
	      iw: "iw"
	    },
	    frequencies: true,
	    flag: "🇮🇱",
	    ttsVoiceSelectedText: "שלום, בחרת את הקול {{voiceName}}.",
	    whisper: true
	  },
	  is: {
	    name: "Íslenska",
	    english: "Icelandic",
	    flag: "🇮🇸",
	    ttsVoiceSelectedText: "Halló, þú hefur valið röddina {{voiceName}}.",
	    whisper: true,
	    lowResource: true
	  },
	  no: {
	    name: "Norsk",
	    english: "Norwegian",
	    frequencies: true,
	    flag: "🇳🇴",
	    ttsVoiceSelectedText: "Hei, du har valgt stemmen {{voiceName}}.",
	    whisper: true
	  },
	  gl: {
	    name: "Galego",
	    english: "Galician",
	    flag: "🇪🇸",
	    ttsVoiceSelectedText: "Ola, escolleches a voz {{voiceName}}.",
	    whisper: true,
	    lowResource: true
	  },
	  eu: {
	    name: "Euskara",
	    english: "Basque",
	    frequencies: true,
	    flag: "🇪🇸",
	    ttsVoiceSelectedText: "Kaixo, {{voiceName}} ahotsa aukeratu duzu.",
	    whisper: true
	  },
	  la: {
	    name: "Latina",
	    english: "Latin",
	    dictionaryURL: "https://www.latin-dictionary.net/search/latin/{{query}}",
	    dictionaryCodes: {
	      en: "en",
	      fa: "la"
	    },
	    alphabet: "latin-ext",
	    flag: "🏛️",
	    ttsVoiceSelectedText: "Salve, vocem {{voiceName}} elegisti.",
	    whisper: true
	  },
	  bn: {
	    name: "বাংলা",
	    english: "Bengali",
	    flag: "🇧🇩",
	    ttsVoiceSelectedText: "হ্যালো, আপনি {{voiceName}} কণ্ঠটি নির্বাচন করেছেন।",
	    whisper: true,
	    lowResource: true
	  },
	  fa: {
	    name: "فارسی",
	    english: "Persian",
	    direction: "RTL",
	    frequencies: true,
	    dictionaryURL: "https://www.farsi123.com/?word={{query}}",
	    dictionaryCodes: {
	      en: "eng",
	      fa: "fa"
	    },
	    flag: "🇮🇷",
	    ttsVoiceSelectedText: "سلام، شما صدای {{voiceName}} را انتخاب کرده‌اید.",
	    whisper: true
	  },
	  sk: {
	    name: "Slovenský",
	    english: "Slovak",
	    frequencies: true,
	    flag: "🇸🇰",
	    ttsVoiceSelectedText: "Ahoj, vybrali ste hlas {{voiceName}}.",
	    whisper: true
	  },
	  hr: {
	    name: "Hrvatski",
	    english: "Croatian",
	    frequencies: true,
	    flag: "🇭🇷",
	    ttsVoiceSelectedText: "Pozdrav, odabrali ste glas {{voiceName}}.",
	    whisper: true
	  },
	  bg: {
	    name: "български",
	    english: "Bulgarian",
	    frequencies: true,
	    alphabet: "cyrillic",
	    wiktionary: true,
	    flag: "🇧🇬",
	    ttsVoiceSelectedText: "Здравейте, вие сте избрали гласа {{voiceName}}.",
	    whisper: true
	  },
	  uk: {
	    name: "українська",
	    english: "Ukrainian",
	    frequencies: true,
	    alphabet: "cyrillic",
	    flag: "🇺🇦",
	    ttsVoiceSelectedText: "Привіт, ви обрали голос {{voiceName}}.",
	    whisper: true
	  },
	  ko: {
	    name: "한국어",
	    english: "Korean",
	    dictionaryURL: "https://dic.daum.net/search.do?q={{query}}&dic={{target}}",
	    dictionaryCodes: {
	      en: "eng",
	      ko: "ko"
	    },
	    wiktionary: true,
	    flag: "🇰🇷",
	    transliterations: ["romanization"],
	    ttsVoiceSelectedText: "안녕하세요, {{voiceName}} 음성을 선택하셨습니다.",
	    whisper: true,
	    cjkFontRegion: "KR"
	  },
	  id: {
	    name: "Indonesia",
	    english: "Indonesian",
	    frequencies: true,
	    flag: "🇮🇩",
	    ttsVoiceSelectedText: "Halo, Anda telah memilih suara {{voiceName}}.",
	    whisper: true
	  },
	  ja: {
	    name: "日本語",
	    english: "Japanese",
	    dictionaryURL: "https://jisho.org/words?jap={{query}}&eng=&dict=edict",
	    dictionaryCodes: {
	      en: "en",
	      ja: "ja"
	    },
	    noWordBoundaries: true,
	    flag: "🇯🇵",
	    transliterations: ["furigana", "romaji"],
	    ttsVoiceSelectedText: "こんにちは、あなたは{{voiceName}}の声を選択しました。",
	    whisper: true,
	    cjkFontRegion: "JP"
	  },
	  zh: {
	    name: "中文",
	    english: "Chinese",
	    noWordBoundaries: true,
	    dictionaryURL: "https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=0&wdqb={{query}}",
	    dictionaryCodes: {
	      en: "en",
	      zh: "zh"
	    },
	    wiktionary: true,
	    flag: "🇨🇳",
	    transliterations: ["pinyin"],
	    ttsVoiceSelectedText: "您好，您已选择语音 {{voiceName}}。",
	    whisper: true,
	    cjkFontRegion: "SC"
	  },
	  "zh-TW": {
	    name: "繁體中文",
	    english: "Traditional Chinese",
	    noWordBoundaries: true,
	    firstLanguageOnly: true,
	    dictionaryURL: "https://www.mdbg.net/chindict/chindict.php?page=worddict&wdrst=0&wdqb={{query}}",
	    dictionaryCodes: {
	      en: "en",
	      "zh-TW": "zh"
	    },
	    flag: "🇹🇼",
	    transliterations: ["pinyin"],
	    ttsVoiceSelectedText: "您好，您已選擇聲音 {{voiceName}}。",
	    whisper: true,
	    cjkFontRegion: "TC"
	  },
	  th: {
	    name: "ภาษาไทย",
	    english: "Thai",
	    noWordBoundaries: true,
	    dictionaryURL: "https://www.thai2english.com/search.aspx?q={{query}}",
	    dictionaryCodes: {
	      en: "en",
	      hi: "th"
	    },
	    wiktionary: true,
	    flag: "🇹🇭",
	    ttsVoiceSelectedText: "สวัสดี คุณได้เลือกเสียง {{voiceName}} แล้ว",
	    whisper: true
	  },
	  ga: {
	    name: "Gaeilge",
	    english: "Irish",
	    flag: "🇮🇪",
	    ttsVoiceSelectedText: "Dia dhuit, tá an guth {{voiceName}} roghnaithe agat.",
	    lowResource: true
	  },
	  ur: {
	    name: "اردو",
	    english: "Urdu",
	    direction: "RTL",
	    flag: "🇵🇰",
	    ttsVoiceSelectedText: "ہیلو، آپ نے {{voiceName}} کی آواز کا انتخاب کیا ہے۔",
	    whisper: true,
	    lowResource: true
	  },
	  lt: {
	    name: "Lietuvių kalba",
	    english: "Lithuanian",
	    frequencies: true,
	    wiktionary: true,
	    flag: "🇱🇹",
	    ttsVoiceSelectedText: "Sveiki, jūs pasirinkote balsą {{voiceName}}.",
	    whisper: true
	  },
	  hi: {
	    name: "हिंदी",
	    english: "Hindi",
	    dictionaryURL: "https://www.shabdkosh.com/hi/translate?e={{query}}&l=hi",
	    dictionaryCodes: {
	      en: "en",
	      hi: "hi"
	    },
	    flag: "🇮🇳",
	    transliterations: ["romanization"],
	    ttsVoiceSelectedText: "नमस्ते, आपने आवाज़ {{voiceName}} को चुना है।",
	    whisper: true
	  },
	  af: {
	    name: "Afrikaans",
	    english: "Afrikaans",
	    flag: "🇿🇦",
	    ttsVoiceSelectedText: "Hallo, jy het die stem {{voiceName}} gekies.",
	    whisper: true,
	    lowResource: true
	  },
	  yi: {
	    name: "ייִדיש",
	    english: "Yiddish",
	    direction: "RTL",
	    flag: "🇮🇱",
	    ttsVoiceSelectedText: "האַלאָ, איר האָט אויסגעקליבן די שטימע {{voiceName}}.",
	    lowResource: true
	  },
	  vi: {
	    name: "tiếng Việt",
	    english: "Vietnamese",
	    alphabet: "vietnamese",
	    wiktionary: true,
	    flag: "🇻🇳",
	    ttsVoiceSelectedText: "Xin chào, bạn đã chọn giọng nói {{voiceName}}.",
	    whisper: true
	  },
	  et: {
	    name: "Eesti",
	    english: "Estonian",
	    frequencies: true,
	    wiktionary: true,
	    monolingualDictionaryURL: "https://www.eki.ee/dict/psv/index.cgi?Q={{query}}",
	    dictionaryURL: "https://www.eki.ee/dict/ies/index.cgi?&F=V&Q={{query}}",
	    dictionaryCodes: {
	      en: "en",
	      et: "et"
	    },
	    flag: "🇪🇪",
	    ttsVoiceSelectedText: "Tere, te olete valinud hääle {{voiceName}}.",
	    whisper: true
	  },
	  mt: {
	    name: "Malti",
	    english: "Maltese",
	    flag: "🇲🇹",
	    ttsVoiceSelectedText: "Bonġu, int għażilt il-leħen {{voiceName}}.",
	    lowResource: true
	  },
	  hu: {
	    name: "Magyar",
	    english: "Hungarian",
	    frequencies: true,
	    dictionaryURL: "http://szotar.sztaki.hu/en/search?fromlang={{source}}&tolang={{target}}&searchWord={{query}}",
	    dictionaryCodes: {
	      en: "eng",
	      hu: "hun"
	    },
	    wiktionary: true,
	    flag: "🇭🇺",
	    ttsVoiceSelectedText: "Helló, a {{voiceName}} hangot választotta.",
	    whisper: true
	  },
	  bs: {
	    name: "Bosanski",
	    english: "Bosnian",
	    alphabet: "cyrillic",
	    flag: "🇧🇦",
	    ttsVoiceSelectedText: "Zdravo, odabrali ste glas {{voiceName}}.",
	    whisper: true,
	    lowResource: true
	  },
	  eo: {
	    name: "Esperanto",
	    english: "Esperanto",
	    alphabet: "latin-ext",
	    flag: "🟢",
	    ttsVoiceSelectedText: "Saluton, vi elektis la voĉon {{voiceName}}."
	  },
	  lv: {
	    name: "Latviešu valoda",
	    english: "Latvian",
	    alphabet: "latin-ext",
	    frequencies: true,
	    dictionaryURL: "https://letonika.lv/groups/default.aspx?g=2&r=10621033&q={{query}}",
	    dictionaryCodes: {
	      en: "en",
	      lv: "lv"
	    },
	    flag: "🇹🇭",
	    ttsVoiceSelectedText: "Sveiki, jūs esat izvēlējies balsi {{voiceName}}.",
	    whisper: true
	  },
	  tl: {
	    name: "Filipino",
	    english: "Filipino",
	    flag: "🇵🇭",
	    ttsVoiceSelectedText: "Kamusta, pinili mo ang boses na {{voiceName}}.",
	    whisper: true,
	    lowResource: true
	  },
	  ht: {
	    name: "Kreyòl ayisyen",
	    english: "Haitian Creole",
	    flag: "🇭🇹",
	    ttsVoiceSelectedText: "Bonjou, ou te chwazi vwa {{voiceName}}.",
	    lowResource: true
	  },
	  ml: {
	    name: "മലയാളം",
	    english: "Malayalam",
	    wiktionary: true,
	    flag: "🇮🇳",
	    ttsVoiceSelectedText: "ഹലോ, നിങ്ങൾ {{voiceName}} ശബ്ദം തിരഞ്ഞെടുത്തിട്ടുണ്ട്."
	  },
	  ka: {
	    name: "ქართული ენა",
	    english: "Georgian",
	    dictionaryURL: "http://next.translate.ge/?#search/{{query}}",
	    dictionaryCodes: {
	      en: "en",
	      ka: "ka"
	    },
	    flag: "🇬🇪",
	    ttsVoiceSelectedText: "გამარჯობა, თქვენ აირჩიეთ ხმა {{voiceName}}."
	  },
	  sw: {
	    name: "Kiswahili",
	    english: "Swahili",
	    flag: "🇰🇪",
	    ttsVoiceSelectedText: "Halo, umechagua sauti {{voiceName}}.",
	    whisper: true,
	    lowResource: true
	  },
	  hy: {
	    name: "հայերեն",
	    english: "Armenian",
	    flag: "🇦🇲",
	    ttsVoiceSelectedText: "Բարեւ, դուք ընտրել եք {{voiceName}} ձայնը:",
	    whisper: true,
	    lowResource: true
	  },
	  my: {
	    name: "မြန်မာ",
	    english: "Burmese",
	    flag: "🇲🇲",
	    ttsVoiceSelectedText: "ဟယ်လို၊ သင်သည် အသံ {{voiceName}} ကို ရွေးချယ်ထားပါသည်။",
	    lowResource: true
	  },
	  mn: {
	    name: "Монгол",
	    english: "Mongolian",
	    flag: "🇲🇳",
	    ttsVoiceSelectedText: "Сайн байна уу, та {{voiceName}} дуу хоолойг сонголоо.",
	    lowResource: true
	  },
	  mi: {
	    name: "Maori",
	    english: "Maori",
	    flag: "🇳🇿",
	    ttsVoiceSelectedText: "Kia ora, kua kōwhiria e koe te reo {{voiceName}}.",
	    whisper: true,
	    lowResource: true
	  },
	  be: {
	    name: "Беларуская",
	    english: "Belarusian",
	    alphabet: "cyrillic",
	    flag: "🇧🇾",
	    ttsVoiceSelectedText: "Прывітанне, вы абралі голас {{voiceName}}.",
	    whisper: true,
	    lowResource: true
	  },
	  tt: {
	    name: "Татарча",
	    english: "Tatar",
	    flag: "🇷🇺",
	    ttsVoiceSelectedText: "Сәлам, сез {{voiceName}} тавышын сайлагансыз.",
	    lowResource: true
	  },
	  sq: {
	    name: "Shqip",
	    english: "Albanian",
	    flag: "🇦🇱",
	    ttsVoiceSelectedText: "Përshëndetje, ju keni zgjedhur zërin {{voiceName}}.",
	    lowResource: true
	  },
	  uz: {
	    name: "O'zbek",
	    english: "Uzbek",
	    flag: "🇺🇿",
	    ttsVoiceSelectedText: "Salom, siz {{voiceName}} ovozini tanladingiz.",
	    lowResource: true
	  },
	  yo: {
	    name: "Yoruba",
	    english: "Yoruba",
	    flag: "🇳🇬",
	    ttsVoiceSelectedText: "Pẹ̀lú àṣírí, o ti yan ohùn {{voiceName}}.",
	    lowResource: true
	  },
	  yue: {
	    name: "粵語",
	    english: "Cantonese",
	    noWordBoundaries: true,
	    flag: "🇭🇰",
	    wiktionary: true,
	    transliterations: ["Jyutping", "Yale"],
	    ttsVoiceSelectedText: "你好，你已選擇了語音{{voiceName}}。",
	    cjkFontRegion: "HK"
	  },
	  kk: {
	    name: "Қазақ",
	    english: "Kazakh",
	    flag: "🇰🇿",
	    ttsVoiceSelectedText: "Сәлеметсіз бе, сіз {{voiceName}} дауысын таңдадыңыз.",
	    whisper: true,
	    lowResource: true
	  },
	  km: {
	    name: "ភាសាខ្មែរ",
	    english: "Khmer",
	    flag: "🇰🇭",
	    ttsVoiceSelectedText: "ជំរាបសួរ, អ្នកបានជ្រើសរើសសំឡេង {{voiceName}}។",
	    lowResource: true
	  },
	  ky: {
	    name: "Кыргызча",
	    english: "Kyrgyz",
	    flag: "🇰🇬",
	    ttsVoiceSelectedText: "Саламатсызбы, сиз {{voiceName}} үнүн тандадыңыз.",
	    lowResource: true
	  },
	  am: {
	    name: "አማርኛ",
	    english: "Amharic",
	    flag: "🇪🇹",
	    ttsVoiceSelectedText: "ሰላም፣ ድምፁን {{voiceName}} ይመርጡ።",
	    lowResource: true
	  },
	  as: {
	    name: "অসমীয়া",
	    english: "Assamese",
	    flag: "🇮🇳",
	    ttsVoiceSelectedText: "নমস্কাৰ, আপুনি {{voiceName}} কন্ঠ বাচনি কৰিছে।",
	    lowResource: true
	  },
	  ay: {
	    name: "Aymar aru",
	    english: "Aymara",
	    flag: "🇧🇴",
	    ttsVoiceSelectedText: "Kamisaraki, {{voiceName}} ukan arupa ajllistawa.",
	    lowResource: true
	  },
	  az: {
	    name: "azərbaycan",
	    english: "Azerbaijani",
	    flag: "🇦🇿",
	    ttsVoiceSelectedText: "Salam, siz {{voiceName}} səsini seçmisiniz.",
	    whisper: true,
	    lowResource: true
	  },
	  bm: {
	    name: "bamanankan",
	    english: "Bambara",
	    flag: "🇲🇱",
	    ttsVoiceSelectedText: "Fo, i ka boloko {{voiceName}} jìla.",
	    lowResource: true
	  },
	  co: {
	    name: "Corsu",
	    english: "Corsican",
	    flag: "🇫🇷",
	    ttsVoiceSelectedText: "Salute, avete sceltu a voce {{voiceName}}.",
	    lowResource: true
	  },
	  dv: {
	    name: "ދިވެހި",
	    english: "Dhivehi",
	    flag: "🇲🇻",
	    direction: "RTL",
	    ttsVoiceSelectedText: "ހެލޯ، ތިބާ ހިމެނޭ ދެން {{voiceName}} ހުރިހާރު.",
	    lowResource: true
	  },
	  ee: {
	    name: "Eʋegbe",
	    english: "Ewe",
	    flag: "🇬🇭",
	    ttsVoiceSelectedText: "Ame nye, wòle le {{voiceName}} gbɔ.",
	    lowResource: true
	  },
	  fy: {
	    name: "Frysk",
	    english: "Frisian",
	    flag: "🇳🇱",
	    ttsVoiceSelectedText: "Hallo, jo hawwe de stim {{voiceName}} selektearre.",
	    lowResource: true
	  },
	  gn: {
	    name: "Avañe'ẽ",
	    english: "Guarani",
	    flag: "🇵🇾",
	    ttsVoiceSelectedText: "Mba'éichapa, reiporavo {{voiceName}} ñe'ẽ.",
	    lowResource: true
	  },
	  gu: {
	    name: "ગુજરાતી",
	    english: "Gujarati",
	    flag: "🇮🇳",
	    transliterations: ["romanization"],
	    ttsVoiceSelectedText: "હેલો, તમે {{voiceName}} અવાજ પસંદ કર્યો છે.",
	    lowResource: true
	  },
	  ha: {
	    name: "Hausa",
	    english: "Hausa",
	    flag: "🇳🇬",
	    ttsVoiceSelectedText: "Sannu, ka zabi muryar {{voiceName}}.",
	    lowResource: true
	  },
	  ig: {
	    name: "Asụsụ Igbo",
	    english: "Igbo",
	    flag: "🇳🇬",
	    ttsVoiceSelectedText: "Ndeewo, ị ahọpụtala olu {{voiceName}}.",
	    lowResource: true
	  },
	  kn: {
	    name: "ಕನ್ನಡ",
	    english: "Kannada",
	    flag: "🇮🇳",
	    ttsVoiceSelectedText: "ಹಲೋ, ನೀವು {{voiceName}} ಧ್ವನಿಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿರುವಿರಿ.",
	    whisper: true,
	    lowResource: true
	  },
	  rw: {
	    name: "Ikinyarwanda",
	    english: "Kinyarwanda",
	    flag: "🇷🇼",
	    ttsVoiceSelectedText: "Muraho, wahisemo ijwi {{voiceName}}.",
	    lowResource: true
	  },
	  ku: {
	    name: "Kurdî",
	    english: "Kurdish (Kurmanji)",
	    flag: "🇮🇶",
	    ttsVoiceSelectedText: "Slav, tu dengê {{voiceName}} hilbijartî.",
	    lowResource: true
	  },
	  lo: {
	    name: "ລາວ",
	    english: "Lao",
	    flag: "🇱🇦",
	    ttsVoiceSelectedText: "ສະບາຍດີ, ທ່ານໄດ້ເລືອກສຽງ {{voiceName}}.",
	    lowResource: true
	  },
	  ln: {
	    name: "Lingála",
	    english: "Lingala",
	    flag: "🇨🇩",
	    ttsVoiceSelectedText: "Mbote, oponi mongongo {{voiceName}}.",
	    lowResource: true
	  },
	  lg: {
	    name: "Luganda",
	    english: "Luganda",
	    flag: "🇺🇬",
	    ttsVoiceSelectedText: "Ki kati, olonze eddoboozi {{voiceName}}.",
	    lowResource: true
	  },
	  lb: {
	    name: "Lëtzebuergesch",
	    english: "Luxembourgish",
	    flag: "🇱🇺",
	    ttsVoiceSelectedText: "Moien, Dir hutt d'Stëmm {{voiceName}} ausgewielt.",
	    lowResource: true
	  },
	  mk: {
	    name: "Македонски",
	    english: "Macedonian",
	    flag: "🇲🇰",
	    ttsVoiceSelectedText: "Здраво, го одбравте гласот {{voiceName}}.",
	    whisper: true,
	    lowResource: true
	  },
	  mg: {
	    name: "Malagasy",
	    english: "Malagasy",
	    flag: "🇲🇬",
	    ttsVoiceSelectedText: "Salama, ianao dia nifidy ny feo {{voiceName}}.",
	    lowResource: true
	  },
	  ms: {
	    name: "Bahasa Melayu",
	    english: "Malay",
	    flag: "🇲🇾",
	    ttsVoiceSelectedText: "Helo, anda telah memilih suara {{voiceName}}.",
	    whisper: true,
	    lowResource: true
	  },
	  mr: {
	    name: "मराठी",
	    english: "Marathi",
	    flag: "🇮🇳",
	    ttsVoiceSelectedText: "नमस्कार, आपण {{voiceName}} या आवाजाचे चयन केले आहे.",
	    whisper: true,
	    lowResource: true
	  },
	  ne: {
	    name: "नेपाली",
	    english: "Nepali",
	    flag: "🇳🇵",
	    ttsVoiceSelectedText: "नमस्ते, तपाईंले स्वर {{voiceName}} चयन गर्नुभएको छ।",
	    whisper: true,
	    lowResource: true
	  },
	  om: {
	    name: "Afaan Oromoo",
	    english: "Oromo",
	    flag: "🇪🇹",
	    ttsVoiceSelectedText: "Akkam, sagalee {{voiceName}} filatteetta.",
	    lowResource: true
	  },
	  ps: {
	    name: "پښتو",
	    english: "Pashto",
	    flag: "🇦🇫",
	    direction: "RTL",
	    ttsVoiceSelectedText: "سلام، تاسو د غږ {{voiceName}} انتخاب کړی دی.",
	    lowResource: true
	  },
	  pa: {
	    name: "ਪੰਜਾਬੀ",
	    english: "Punjabi",
	    flag: "🇮🇳",
	    ttsVoiceSelectedText: "ਹੈਲੋ, ਤੁਸੀਂ ਅਵਾਜ਼ {{voiceName}} ਦਾ ਚੋਣ ਕੀਤਾ ਹੈ।",
	    lowResource: true
	  },
	  qu: {
	    name: "Runasimi",
	    english: "Quechua",
	    flag: "🇵🇪",
	    ttsVoiceSelectedText: "Napaykullayki, {{voiceName}} sutiyuq yawarniyta akllawaykiki.",
	    lowResource: true
	  },
	  sm: {
	    name: "Gagana Samoa",
	    english: "Samoan",
	    flag: "🇼🇸",
	    ttsVoiceSelectedText: "Talofa, ua e filifilia le leo {{voiceName}}.",
	    lowResource: true
	  },
	  sa: {
	    name: "संस्कृतम्",
	    english: "Sanskrit",
	    flag: "🇮🇳",
	    ttsVoiceSelectedText: "हरिः, त्वं {{voiceName}} इति स्वरं चयनं कृतवानसि।",
	    lowResource: true
	  },
	  st: {
	    name: "Sesotho",
	    english: "Sesotho",
	    flag: "🇱🇸",
	    ttsVoiceSelectedText: "Lumela, u khethile lentsoe {{voiceName}}.",
	    lowResource: true
	  },
	  sn: {
	    name: "chiShona",
	    english: "Shona",
	    flag: "🇿🇼",
	    ttsVoiceSelectedText: "Mhoro, wasarudza inzwi {{voiceName}}.",
	    lowResource: true
	  },
	  sd: {
	    name: "سنڌي",
	    english: "Sindhi",
	    flag: "🇵🇰",
	    direction: "RTL",
	    ttsVoiceSelectedText: "سلام، توهان {{voiceName}} آواز چونڊيو آهي.",
	    lowResource: true
	  },
	  so: {
	    name: "Soomaaliga",
	    english: "Somali",
	    flag: "🇸🇴",
	    ttsVoiceSelectedText: "Hello, waxaad dooratay codka {{voiceName}}.",
	    lowResource: true
	  },
	  su: {
	    name: "Basa Sunda",
	    english: "Sundanese",
	    flag: "🇮🇩",
	    ttsVoiceSelectedText: "Halo, anjeun parantos milih sora {{voiceName}}.",
	    lowResource: true
	  },
	  tg: {
	    name: "тоҷикӣ",
	    english: "Tajik",
	    flag: "🇹🇯",
	    ttsVoiceSelectedText: "Салом, шумо овози {{voiceName}}-ро интихоб кардед.",
	    lowResource: true
	  },
	  ta: {
	    name: "தமிழ்",
	    english: "Tamil",
	    flag: "🇮🇳",
	    ttsVoiceSelectedText: "வணக்கம், நீங்கள் {{voiceName}} குரலை தேர்ந்தெடுத்துள்ளீர்கள்.",
	    whisper: true,
	    lowResource: true
	  },
	  te: {
	    name: "తెలుగు",
	    english: "Telugu",
	    flag: "🇮🇳",
	    ttsVoiceSelectedText: "హలో, మీరు {{voiceName}} వాయిస్‌ను ఎంచుకున్నారు.",
	    lowResource: true
	  },
	  ti: {
	    name: "ትግርኛ",
	    english: "Tigrinya",
	    flag: "🇪🇷",
	    ttsVoiceSelectedText: "ሰላም ፣ ድምፂ ዝመርጽካዮ እዩ {{voiceName}}።",
	    lowResource: true
	  },
	  ts: {
	    name: "Xitsonga",
	    english: "Tsonga",
	    flag: "🇿🇦",
	    ttsVoiceSelectedText: "Xewani, u hlawurile rito ra {{voiceName}}.",
	    lowResource: true
	  },
	  tk: {
	    name: "Türkmen",
	    english: "Turkmen",
	    flag: "🇹🇲",
	    ttsVoiceSelectedText: "Salam, siz {{voiceName}} sesini saýladyňyz.",
	    lowResource: true
	  },
	  ug: {
	    name: "ئۇيغۇرچە",
	    english: "Uyghur",
	    flag: "🇨🇳",
	    direction: "RTL",
	    ttsVoiceSelectedText: "ياخشىمۇسىز ، سىز {{voiceName}} ئاۋازىنى تاللىدىڭىز.",
	    lowResource: true
	  },
	  xh: {
	    name: "isiXhosa",
	    english: "Xhosa",
	    flag: "🇿🇦",
	    ttsVoiceSelectedText: "Molo, ukhethe ilizwi {{voiceName}}.",
	    lowResource: true
	  },
	  zu: {
	    name: "isiZulu",
	    english: "Zulu",
	    flag: "🇿🇦",
	    ttsVoiceSelectedText: "Sawubona, ukhethe izwi elithi {{voiceName}}.",
	    lowResource: true
	  },
	  jv: {
	    name: "ꦧꦱꦗꦮ",
	    english: "Javanese",
	    flag: "🇮🇩",
	    ttsVoiceSelectedText: "Halo, sampeyan milih swara {{voiceName}}.",
	    lowResource: true
	  },
	  ny: {
	    name: "Chichewa",
	    english: "Nyanja / Chichewa",
	    flag: "🇲🇼",
	    ttsVoiceSelectedText: "Moni, mwasankha mawu {{voiceName}}.",
	    lowResource: true
	  },
	  or: {
	    name: "ଓଡ଼ିଆ",
	    english: "Odia / Oriya",
	    flag: "🇮🇳",
	    ttsVoiceSelectedText: "ନମସ୍କାର, ଆପଣ {{voiceName}} କଣ୍ଠସ୍ୱର ଚୟନ କରିଛନ୍ତି।",
	    lowResource: true
	  },
	  gd: {
	    name: "Gàidhlig",
	    english: "Scots Gaelic",
	    flag: "🏴",
	    ttsVoiceSelectedText: "Halò, tha thu air a’ ghuth {{voiceName}} a thaghadh.",
	    lowResource: true
	  },
	  si: {
	    name: "සිංහල",
	    english: "Sinhala / Sinhalese",
	    flag: "🇱🇰",
	    ttsVoiceSelectedText: "හෙලෝ, ඔබ {{voiceName}} හදින් ඉව වෝයිස් එක තෝරාගෙන තිබේ.",
	    lowResource: true
	  },
	  ak: {
	    name: "Twi",
	    english: "Twi / Akan",
	    flag: "🇬🇭",
	    ttsVoiceSelectedText: "Hello, wo ayi nne {{voiceName}}.",
	    lowResource: true
	  },
	  ckb: {
	    name: "سۆرانی",
	    english: "Kurdish (Sorani)",
	    direction: "RTL",
	    flag: "🇮🇶",
	    ttsVoiceSelectedText: "سڵاو، تۆ دەنگی {{voiceName}} هەڵبژاردووە.",
	    lowResource: true
	  },
	  ceb: {
	    name: "Bisaya",
	    english: "Cebuano",
	    flag: "🇵🇭",
	    ttsVoiceSelectedText: "Kumusta, gipili nimo ang tingog nga {{voiceName}}.",
	    lowResource: true
	  },
	  pap: {
	    name: "Papiamentu",
	    english: "Papiamento",
	    flag: "🇨🇼",
	    ttsVoiceSelectedText: "Bon dia, bo a skohe e bos {{voiceName}}.",
	    lowResource: true
	  }
	};
	const wordReferenceLanguages = [
	  // "es",
	  // "fr",
	  // "it",
	  // "de",
	  // "pt",
	  // "pl",
	  // "ro",
	  // "cs",
	  // "el",
	  // "tr",
	  // "ja",
	  // "zh",
	  // "ru",
	];
	each(map, (lang, code) => {
	  if (!lang.frequencies || lang.noWordBoundaries || lang.direction === "RTL" || !contains(wordReferenceLanguages, code) && !lang.dictionaryURL) {
	    lang.beta = true;
	  }
	});
	delete map.en.beta;
	const list = sortBy(map$1(map, (info, code) => extend(info, {
	  code: code
	})), {
	  english: 1
	});
	each(map, (info, code) => {
	  if (!info.firstLanguageOnly) ;
	});
	sortBy(filter(list, info => !info.firstLanguageOnly), {
	  english: 1
	});
	const flagLanguageCodes = ["es", "de", "en", "fr", "it", "ru", "nl", "pl", "pt", "ko", "sv", "el", "no"];
	map$1(flagLanguageCodes, code => _objectSpread2(_objectSpread2({}, map[code]), {}, {
	  code
	}));

	let config = null;
	let popoverLayer = null;
	let popoverAnimationFrame = null;
	let popoverListenersBound = false;
	let popoverEntries = {};
	const ensurePopoverLayer = () => {
	    if (popoverLayer === null || popoverLayer === void 0 ? void 0 : popoverLayer.length) {
	        return popoverLayer;
	    }
	    popoverLayer = $("#readerPopoverLayer");
	    if (popoverLayer.length === 0) {
	        popoverLayer = $('<div id="readerPopoverLayer" class="readerPopoverLayer"/>');
	        $("body").append(popoverLayer);
	    }
	    return popoverLayer;
	};
	const removePopoverEntry = (key) => {
	    const entry = popoverEntries[key];
	    if (!entry) {
	        return;
	    }
	    entry.bubble.remove();
	    delete popoverEntries[key];
	};
	const getPopoverViewportRect = () => {
	    var _a;
	    const viewport = document.getElementById("pageTextViewport");
	    return ((_a = viewport === null || viewport === void 0 ? void 0 : viewport.getBoundingClientRect()) !== null && _a !== void 0 ? _a : {
	        top: 0,
	        left: 0,
	        right: window.innerWidth,
	        bottom: window.innerHeight,
	        width: window.innerWidth,
	        height: window.innerHeight,
	    });
	};
	const updatePopoverLayerBounds = () => {
	    const layer = ensurePopoverLayer();
	    const mediaPlayer = $("#mediaPlayer:visible");
	    const clipTop = mediaPlayer.length > 0 && mediaPlayer.height() > 0
	        ? mediaPlayer[0].getBoundingClientRect().bottom
	        : 0;
	    layer.css({
	        top: clipTop + "px",
	        left: "0px",
	        right: "0px",
	        bottom: "0px",
	    });
	};
	const computePopoverPosition = (spanRect, clientRects, bubbleRect, windowWidth) => {
	    const offset = 6;
	    const margin = 8;
	    const arrowMinMargin = 12;
	    const placeBelow = spanRect.top - bubbleRect.height - offset < 0;
	    const targetRect = clientRects.length <= 1
	        ? spanRect
	        : placeBelow
	            ? clientRects[clientRects.length - 1]
	            : clientRects[0];
	    const targetCenter = targetRect.left + targetRect.width / 2;
	    let left = targetCenter - bubbleRect.width / 2;
	    left = Math.max(margin, left);
	    left = Math.min(windowWidth - bubbleRect.width - margin, left);
	    const top = placeBelow
	        ? targetRect.bottom + offset
	        : targetRect.top - bubbleRect.height - offset;
	    const arrowLeft = Math.max(arrowMinMargin, Math.min(targetCenter - left, bubbleRect.width - arrowMinMargin));
	    return { left, top, arrowLeft, placeBelow };
	};
	const repositionPopoverForKey = (key) => {
	    var _a;
	    const entry = popoverEntries[key];
	    if (!entry) {
	        return;
	    }
	    const spanElement = (_a = entry.span) === null || _a === void 0 ? void 0 : _a[0];
	    if (!spanElement ||
	        !document.body.contains(spanElement) ||
	        !entry.span.hasClass("translated")) {
	        removePopoverEntry(key);
	        return;
	    }
	    const spanRect = spanElement.getBoundingClientRect();
	    const viewportRect = getPopoverViewportRect();
	    const layer = ensurePopoverLayer();
	    const layerRect = layer[0].getBoundingClientRect();
	    if (spanRect.bottom < viewportRect.top ||
	        spanRect.top > viewportRect.bottom ||
	        spanRect.right < viewportRect.left ||
	        spanRect.left > viewportRect.right) {
	        entry.bubble.css("display", "none");
	        return;
	    }
	    const bubble = entry.bubble;
	    bubble.css({
	        display: "block",
	        left: "0px",
	        top: "0px",
	        visibility: "hidden",
	    });
	    const bubbleRect = bubble[0].getBoundingClientRect();
	    const { left, top, arrowLeft, placeBelow } = computePopoverPosition(spanRect, spanElement.getClientRects(), bubbleRect, window.innerWidth);
	    bubble[0].style.setProperty("--arrow-left", arrowLeft + "px");
	    bubble.toggleClass("popoverBelow", placeBelow);
	    bubble.css({
	        left: left + "px",
	        top: top - layerRect.top + "px",
	        visibility: "visible",
	    });
	};
	const bindPopoverListeners = () => {
	    if (popoverListenersBound) {
	        return;
	    }
	    $(window).on("resize.spanTranslatorPopover", scheduleRepositionPopovers$1);
	    $(window).on("scroll.spanTranslatorPopover", scheduleRepositionPopovers$1);
	    $(document).on("click.spanTranslatorPopover", ".readerPopoverBubble", (event) => {
	        var _a;
	        event.stopPropagation();
	        event.preventDefault();
	        const key = $(event.currentTarget).attr("data-popover-key");
	        if (!key) {
	            return;
	        }
	        const entry = popoverEntries[key];
	        if (!((_a = entry === null || entry === void 0 ? void 0 : entry.span) === null || _a === void 0 ? void 0 : _a.length)) {
	            removePopoverEntry(key);
	            return;
	        }
	        config === null || config === void 0 ? void 0 : config.dismissSpan(entry.span);
	    });
	    popoverListenersBound = true;
	};
	const setupPopoverLayer = (nextConfig) => {
	    config = nextConfig;
	    popoverEntries = {};
	    popoverLayer = $("#readerPopoverLayer");
	    popoverLayer.empty();
	    bindPopoverListeners();
	};
	const removePopoverForSpan = (span) => {
	    if (!config) {
	        return;
	    }
	    removePopoverEntry(config.getPopoverKey(span));
	};
	const clearPopoverEntries = () => {
	    each(keys(popoverEntries), (key) => {
	        removePopoverEntry(key);
	    });
	};
	const showPopoverForSpan = (span, schedulePosition = true) => {
	    if (!config) {
	        return;
	    }
	    if (!config.isPopoverStyle()) {
	        removePopoverForSpan(span);
	        return;
	    }
	    const translationElement = span.find(".translation");
	    if (translationElement.length === 0) {
	        removePopoverForSpan(span);
	        return;
	    }
	    const key = config.getPopoverKey(span);
	    const layer = ensurePopoverLayer();
	    let entry = popoverEntries[key];
	    if (!entry) {
	        const bubble = $('<div class="readerPopoverBubble"/>');
	        layer.append(bubble);
	        entry = {
	            bubble,
	            span,
	        };
	        popoverEntries[key] = entry;
	    }
	    else {
	        entry.span = span;
	    }
	    entry.bubble.attr("data-popover-key", key);
	    const translationStyles = window.getComputedStyle(translationElement[0]);
	    entry.bubble.html(translationElement.html());
	    entry.bubble.css({
	        fontFamily: translationStyles.fontFamily,
	        fontSize: translationStyles.fontSize,
	        fontWeight: translationStyles.fontWeight,
	        lineHeight: translationStyles.lineHeight,
	    });
	    if (schedulePosition) {
	        scheduleRepositionPopovers$1();
	    }
	};
	const strikeThroughPopoverForSpan = (span) => {
	    if (!config) {
	        return;
	    }
	    const entry = popoverEntries[config.getPopoverKey(span)];
	    if (!entry) {
	        return;
	    }
	    entry.bubble.css("text-decoration", "line-through");
	};
	const scheduleRepositionPopovers$1 = () => {
	    if (!config || popoverAnimationFrame !== null) {
	        return;
	    }
	    popoverAnimationFrame = window.requestAnimationFrame(() => {
	        popoverAnimationFrame = null;
	        if (!(config === null || config === void 0 ? void 0 : config.isPopoverStyle())) {
	            clearPopoverEntries();
	            return;
	        }
	        updatePopoverLayerBounds();
	        config.getTranslatedSpans().each((_index, element) => {
	            showPopoverForSpan($(element), false);
	        });
	        each(keys(popoverEntries), (key) => {
	            repositionPopoverForKey(key);
	        });
	    });
	};

	/**
	 * The maximum total number of words to include in the context sentence. The budget is
	 * distributed flexibly - if a word is near the start of a sentence, more words will be
	 * captured after it (and vice versa), up to this total limit.
	 */
	const maxContextWords = 250;
	const blockTags = /^(address|article|aside|blockquote|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|h[1-6]|header|hr|li|main|nav|ol|p|pre|section|table|td|th|ul)$/i;
	/**
	 * Traverse element and extract all the span[data-p], span[data-group], text,
	 * and line-break boundary nodes into one flat array.
	 *
	 * Exported for tests.
	 */
	const flatten = (element) => {
	    let contentNodes = [];
	    each(element.contents(), (node) => {
	        const $node = $(node);
	        if (node.nodeType === 3 || $node.is("br, span[data-p], span[data-group]")) {
	            contentNodes.push(node);
	            return;
	        }
	        contentNodes = contentNodes.concat(flatten($node));
	    });
	    return contentNodes;
	};
	const getPosition$1 = (span) => {
	    const position = span.attr("data-p");
	    if (position) {
	        return parseInt(position, 10);
	    }
	    else {
	        return null;
	    }
	};
	const getGroup$1 = (span, groups) => {
	    const groupId = span.attr("data-group");
	    if (groupId) {
	        return groups[parseInt(groupId, 10)];
	    }
	    return undefined;
	};
	const getRange = (span, groups) => {
	    const position = getPosition$1(span);
	    if (typeof position === "number") {
	        return {
	            from: position,
	            to: position,
	        };
	    }
	    const group = getGroup$1(span, groups);
	    return group ? pick(group, "from", "to") : undefined;
	};
	/**
	 * Find the block/root container used for selection and context.
	 *
	 * Historically the reader compared `span.parent()` between two positions to decide whether
	 * they were "in the same block". That broke as soon as one word was wrapped in `<strong>`/`<em>`
	 * and the other wasn't, since their direct parents differed even though they visually belonged
	 * to the same paragraph. `getBlockRoot` returns the nearest block-level ancestor instead, so
	 * two words are considered co-located iff they share a paragraph (or similar block container).
	 *
	 * The web reader marks block ancestors explicitly with `data-readlang-block` during
	 * spannification, which is faster and respects author-intended boundaries (e.g. a `<div>`
	 * whose `display` has been customised). When no marker is present - e.g. in Learn/Library
	 * pages where content is pre-wrapped in standard semantic tags - we fall back to a tag-name
	 * heuristic.
	 */
	const getBlockRoot = (wordSpan) => {
	    const markedRoot = wordSpan.closest("[data-readlang-block]");
	    if (markedRoot.length > 0) {
	        return markedRoot.eq(0);
	    }
	    let current = wordSpan.parent();
	    while (current.length > 0 && !current.is("body")) {
	        const tagName = current.prop("tagName");
	        if (tagName && blockTags.test(tagName)) {
	            return current;
	        }
	        current = current.parent();
	    }
	    return wordSpan.parent();
	};
	/**
	 * Returns true if a `<br>` element sits between `span1` and `span2` in document order.
	 *
	 * `<br>` is treated as a soft paragraph boundary - the span translator refuses to form
	 * multi-word groups across it, matching the policy it already applies to separate block
	 * roots. We use a Range (`setStartAfter` / `setEndBefore`) so content inside `span1` and
	 * `span2` themselves is excluded; only nodes strictly between them are inspected.
	 */
	const crossesBrBoundary = (span1, span2) => {
	    if (span1[0] === span2[0]) {
	        return false;
	    }
	    const cmp = span1[0].compareDocumentPosition(span2[0]);
	    const [first, last] = cmp & Node.DOCUMENT_POSITION_FOLLOWING
	        ? [span1[0], span2[0]]
	        : [span2[0], span1[0]];
	    const doc = first.ownerDocument;
	    if (!doc) {
	        return false;
	    }
	    const range = doc.createRange();
	    range.setStartAfter(first);
	    range.setEndBefore(last);
	    const fragment = range.cloneContents();
	    return fragment.querySelector("br") !== null;
	};
	/**
	 * Return true if a phrase range is structurally valid for grouping.
	 *
	 * Exported for tests.
	 */
	const canGroupRange = (element, from, to) => {
	    if (from === to) {
	        return true;
	    }
	    const fromSpan = element.find('span[data-p="' + from + '"]');
	    const toSpan = element.find('span[data-p="' + to + '"]');
	    if (fromSpan.length === 0 || toSpan.length === 0) {
	        return false;
	    }
	    if (!getBlockRoot(fromSpan).is(getBlockRoot(toSpan))) {
	        return false;
	    }
	    return !crossesBrBoundary(fromSpan, toSpan);
	};
	const getContextSentence = (span, groups, contextBeforePage, thisMaxContextWords = maxContextWords) => {
	    var _a;
	    const surroundingNodes = flatten(getBlockRoot(span));
	    let index = -1;
	    $.each(surroundingNodes, (i, node) => {
	        if (node === span[0]) {
	            // @ts-ignore
	            index = i;
	        }
	    });
	    if (index === -1) {
	        throw "error finding context";
	    }
	    // Restrict to a sentence-sized window around the selected span/group.
	    let before = [];
	    let contextStart;
	    let contextEnd;
	    if (span.is("[data-p]")) {
	        contextStart = parseInt(span.attr("data-p"), 10);
	        contextEnd = contextStart;
	    }
	    else {
	        const groupId = span.attr("data-group");
	        contextStart = groups[groupId].from;
	        contextEnd = groups[groupId].to;
	    }
	    const after = [];
	    let remainingBudget = thisMaxContextWords;
	    let backwardIndex = index - 1;
	    let forwardIndex = index + 1;
	    let canGoBackward = true;
	    let canGoForward = !isSentenceBreak(getWordText(span));
	    // Alternate between collecting backward and forward context to keep the
	    // sentence window balanced around the translated word or phrase.
	    while (remainingBudget > 0 && (canGoBackward || canGoForward)) {
	        // Try backward.
	        if (canGoBackward && backwardIndex >= 0) {
	            const $node = $(surroundingNodes[backwardIndex]);
	            const text = getWordText($node);
	            const previousNode = backwardIndex > 0 ? $(surroundingNodes[backwardIndex - 1]) : undefined;
	            if (isSentenceBreak(`${previousNode ? getWordText(previousNode) : ""}${text}`) ||
	                /^(br|p)$/i.test($node.prop("tagName"))) {
	                before.push({ node: $node, text, range: getRange($node, groups) });
	                canGoBackward = false;
	            }
	            else {
	                before.push({ node: $node, text, range: getRange($node, groups) });
	                if ($node.is("[data-p]")) {
	                    contextStart = Math.min(contextStart, parseInt($node.attr("data-p"), 10));
	                    remainingBudget--;
	                }
	                backwardIndex--;
	            }
	        }
	        else {
	            canGoBackward = false;
	        }
	        // Try forward.
	        if (canGoForward &&
	            forwardIndex < surroundingNodes.length &&
	            remainingBudget > 0) {
	            const $node = $(surroundingNodes[forwardIndex]);
	            const text = getWordText($node);
	            if (/^(br|p)$/i.test($node.prop("tagName"))) {
	                canGoForward = false;
	            }
	            else {
	                after.push({ node: $node, text, range: getRange($node, groups) });
	                const nextNode = forwardIndex < surroundingNodes.length - 1
	                    ? $(surroundingNodes[forwardIndex + 1])
	                    : undefined;
	                if (isSentenceBreak(`${text}${nextNode ? getWordText(nextNode) : ""}`)) {
	                    canGoForward = false;
	                }
	                else if ($node.is("[data-p]")) {
	                    contextEnd = Math.max(contextEnd, parseInt($node.attr("data-p"), 10));
	                    remainingBudget--;
	                }
	                forwardIndex++;
	            }
	        }
	        else {
	            canGoForward = false;
	        }
	    }
	    const firstSpan = $("span[data-p], span[data-group]").first();
	    if (contextBeforePage &&
	        (span.is(firstSpan) || ((_a = before[before.length - 1]) === null || _a === void 0 ? void 0 : _a.node.is(firstSpan)))) {
	        before.push({
	            node: undefined,
	            text: contextBeforePage,
	        });
	    }
	    before = before.reverse();
	    const nodes = before
	        .filter((node) => node !== undefined)
	        .concat({
	        node: span,
	        text: getWordText(span),
	        range: getRange(span, groups),
	    })
	        .concat(after);
	    const text = pluck(before, "text")
	        .concat(getWordText(span))
	        .concat(pluck(after, "text"))
	        .join("")
	        .replace(/ {2}/g, " ")
	        .trim()
	        .replace(new RegExp(`([${sentenceBreakCharacters.join()}])\\s+[${startOfSentencePunctuationCharacters.join()}]+$]*$`), "$1")
	        .replace(new RegExp(`^([${sentenceBreakCharacters.join()}])\\s+`), "");
	    return {
	        nodes,
	        text,
	        start: contextStart,
	        end: contextEnd,
	    };
	};
	/**
	 * Split inline wrapper ancestors so the selection starts exactly at `wordSpan`.
	 *
	 * A multi-word group that begins mid-`<strong>` (or any other inline wrapper) cannot be
	 * extracted as a contiguous sibling list without first cloning the wrapper: the leading
	 * siblings of `wordSpan` must stay inside the original left-half wrapper, while `wordSpan`
	 * and everything after it moves into a newly created right-half clone. We walk up the tree
	 * doing this for each ancestor until we reach `blockRoot`.
	 *
	 * Example - selecting `data-p="1"` as start under `<p data-readlang-block>`:
	 *   before: <p><strong><span data-p="0">very</span> <span data-p="1">big</span></strong></p>
	 *   after:  <p><strong><span data-p="0">very</span> </strong>
	 *              <strong><span data-p="1">big</span></strong></p>          ← firstNode
	 *
	 * Each split is recorded so `rejoinDomSplits` can reverse the operation losslessly when
	 * the group is later untranslated.
	 *
	 * Invariant: the returned `firstNode` is a direct child of `blockRoot` whose first leaf is
	 * `wordSpan`, so the caller can safely iterate siblings from `firstNode` to extract the
	 * fragment without crossing any wrapper boundary.
	 *
	 * Exported for tests.
	 */
	const splitBoundaryBefore = (wordSpan, blockRoot) => {
	    const splits = [];
	    let current = wordSpan;
	    while (current.parent().length > 0 && !current.parent().is(blockRoot)) {
	        const parent = current.parent();
	        if (current[0].previousSibling) {
	            const clone = $(parent[0].cloneNode(false));
	            let node = current[0];
	            while (node) {
	                const nextNode = node.nextSibling;
	                clone[0].appendChild(node);
	                node = nextNode;
	            }
	            parent.after(clone);
	            splits.push({ original: parent, clone });
	            current = clone;
	        }
	        else {
	            current = parent;
	        }
	    }
	    return { firstNode: current, splits };
	};
	/**
	 * Mirror of `splitBoundaryBefore` for the end of the range: split inline wrapper ancestors
	 * so that `wordSpan` is the last thing inside its chain of wrappers. Trailing siblings move
	 * into a new right-half clone; `wordSpan` stays in the original left-half. Returns the
	 * top-level node under `blockRoot` whose final leaf is `wordSpan`.
	 *
	 * Exported for tests.
	 */
	const splitBoundaryAfter = (wordSpan, blockRoot) => {
	    const splits = [];
	    let current = wordSpan;
	    while (current.parent().length > 0 && !current.parent().is(blockRoot)) {
	        const parent = current.parent();
	        if (current[0].nextSibling) {
	            const clone = $(parent[0].cloneNode(false));
	            let node = current[0].nextSibling;
	            while (node) {
	                const nextNode = node.nextSibling;
	                clone[0].appendChild(node);
	                node = nextNode;
	            }
	            parent.after(clone);
	            splits.push({ original: parent, clone });
	            current = parent;
	        }
	        else {
	            current = parent;
	        }
	    }
	    return { lastNode: current, splits };
	};
	/**
	 * Undo the wrapper cloning performed by splitBoundaryBefore/After, leaving the DOM
	 * byte-for-byte identical to its pre-group state.
	 *
	 * Iteration order matters. The split helpers push innermost-first (they walk up from the
	 * word span), so `splits` is ordered inside-out. We walk it in reverse to rejoin
	 * outer wrappers first: rejoining an outer wrapper concatenates its split halves, which may
	 * in turn put sibling inner halves back next to each other - cleanly setting up the
	 * subsequent inner rejoin. Doing it in forward order would still produce a correct final
	 * tree in simple cases but leaves transient empty wrappers on deeply nested splits, so we
	 * stick to the defensively-correct reverse order.
	 */
	const rejoinDomSplits = (splits) => {
	    for (let i = splits.length - 1; i >= 0; i--) {
	        const { original, clone } = splits[i];
	        while (clone[0].firstChild) {
	            original[0].appendChild(clone[0].firstChild);
	        }
	        clone.remove();
	    }
	};
	/**
	 * Isolate a selection range into a contiguous sibling list beneath a shared block root.
	 *
	 * Exported for tests.
	 */
	const isolateRangeFragment = (element, from, to) => {
	    const fromSpan = element.find('span[data-p="' + from + '"]');
	    const toSpan = element.find('span[data-p="' + to + '"]');
	    if (fromSpan.length === 0 || toSpan.length === 0) {
	        throw Error(`Unable to isolate group range ${from}-${to}`);
	    }
	    const blockRoot = getBlockRoot(fromSpan);
	    if (!getBlockRoot(toSpan).is(blockRoot)) {
	        throw Error(`Group range ${from}-${to} crosses block boundaries`);
	    }
	    const { firstNode, splits: startSplits } = splitBoundaryBefore(fromSpan, blockRoot);
	    const { lastNode, splits: endSplits } = splitBoundaryAfter(toSpan, blockRoot);
	    return {
	        blockRoot,
	        firstNode,
	        lastNode,
	        domSplits: [...startSplits, ...endSplits],
	    };
	};
	const createDisplayClone = (originalNodes) => {
	    const displayClone = originalNodes.contents().clone();
	    displayClone.filter("span[data-group]").removeAttr("data-group");
	    displayClone.filter("span[data-p]").removeAttr("data-p");
	    displayClone.find("span[data-group]").removeAttr("data-group");
	    displayClone.find("span[data-p]").removeAttr("data-p");
	    return displayClone;
	};
	/**
	 * Install a multi-word group span at the location of range [`from`, `to`] and produce a
	 * pristine detached copy of the nodes it replaces.
	 *
	 * The returned `originalNodes` wrapper must stay detached and untouched for the lifetime of
	 * the group: it is our ground truth for restoring the original DOM (including any
	 * `<strong>`/`<em>` wrappers) on untranslate. The visible group span receives a *clone* of
	 * the range with all `data-p`/`data-group` attributes stripped - the attributes must be
	 * unique in the document, and keeping them on the clone would break `span[data-p=N]`
	 * lookups elsewhere.
	 *
	 * This approach (detach-then-clone) is what makes the cross-formatting-boundary fix
	 * robust: by physically isolating the exact authored fragment we avoid any "rebuild the
	 * text with spaces between nodes" heuristic, which previously lost bold/italic formatting
	 * and mis-placed spaces.
	 */
	const mountMultiWordGroup = (element, groupSpan, from, to) => {
	    const { firstNode, lastNode, domSplits } = isolateRangeFragment(element, from, to);
	    // Anchor the empty group span in the block-flow position of the range. We place it before
	    // `firstNode` because the loop below detaches from `firstNode` forward until it passes
	    // `lastNode`, leaving `groupSpan` in exactly the right spot.
	    groupSpan.insertBefore(firstNode);
	    const originalNodes = $("<div/>");
	    let node = firstNode[0];
	    while (node) {
	        const nextNode = node.nextSibling;
	        originalNodes[0].appendChild(node);
	        if (node === lastNode[0]) {
	            break;
	        }
	        node = nextNode;
	    }
	    groupSpan.append(createDisplayClone(originalNodes));
	    return { originalNodes, domSplits };
	};
	var getWordText = (element) => {
	    let text = element.text();
	    let original = element.attr("data-original");
	    if (original) {
	        text = original;
	    }
	    return text;
	};
	// Duplicated in spannify
	const wordRegExp = () => new RegExp(`([‘’${letter}${mark}]+|[0-9]+)`, "gu");
	const isSentenceBreak = (text) => {
	    if (wordRegExp().test(text[0])) {
	        return false;
	    }
	    if (sentenceBreakRegExp().test(text)) {
	        return true;
	    }
	};
	const startOfSentencePunctuationCharacters = ["¿", "¡", "«"];
	const sentenceBreakCharacters = [".", "?", "!"];
	const noSpaceSentenceBreakCharacters = ["。" /* Chinese full stop */];
	const sentenceBreakRegExp = () => new RegExp([
	    ...sentenceBreakCharacters.map((c) => `\\${c}\\s`),
	    ...noSpaceSentenceBreakCharacters.map((c) => `\\${c}`),
	].join("|"));

	// mimics the momentum scrolling of touch devices
	let start;
	let previous;
	let delta;
	let totalDelta;
	let startScrollTop;
	let active;
	let options$1;
	const body$1 = $("body");
	const setup$1 = (_options) => {
	    options$1 = _options;
	};
	const setStart = (touch) => {
	    const x = touch.pageX - body$1.scrollLeft();
	    const y = touch.pageY - body$1.scrollTop();
	    clearTimeout(momentumScrollTimeout);
	    start = { x, y };
	    delta = {
	        x: 0,
	        y: 0,
	        t: 0,
	    };
	    previous = {
	        x,
	        y,
	        t: new Date().getTime(),
	    };
	    totalDelta = {
	        x: 0,
	        y: 0,
	    };
	    startScrollTop = options$1.element.scrollTop();
	    active = false;
	};
	// return value specifies whether we are in vScroll mode
	const setMove = (touch) => {
	    const x = touch.pageX - body$1.scrollLeft();
	    const y = touch.pageY - body$1.scrollTop();
	    if (!start) {
	        return false;
	    }
	    delta = {
	        x: x - previous.x,
	        y: y - previous.y,
	        t: new Date().getTime() - previous.t,
	    };
	    previous = {
	        x,
	        y,
	        t: new Date().getTime(),
	    };
	    totalDelta = {
	        x: x - start.x,
	        y: y - start.y,
	    };
	    if (active || (Math.abs(totalDelta.y) > 10 && Math.abs(totalDelta.x) < 6)) {
	        // start vScroll!
	        active = true;
	        options$1.element.scrollTop(startScrollTop - totalDelta.y);
	        return true;
	    }
	    if (Math.abs(totalDelta.x) > 5) {
	        // cancel vScroll
	        start = null;
	        delta = null;
	        totalDelta = null;
	        active = false;
	    }
	    return false;
	};
	const setEnd = () => {
	    if (!active) {
	        return false;
	    }
	    active = false;
	    start = null;
	    yScrollPosition = options$1.element.scrollTop();
	    yVelocity = delta.y / Math.max(delta.t, 1);
	    if (Math.abs(yVelocity) > MAX_VELOCITY) {
	        yVelocity = (MAX_VELOCITY * yVelocity) / Math.abs(yVelocity);
	    }
	    momentumScroll();
	    return true;
	};
	var yScrollPosition;
	var yVelocity;
	var momentumScrollTimeout;
	const // in milliseconds
	TIME_STEP = 30;
	var MAX_VELOCITY = 4;
	var momentumScroll = () => {
	    clearTimeout(momentumScrollTimeout);
	    options$1.element.scrollTop(yScrollPosition);
	    const yVelocitySign = yVelocity > 0 ? 1 : -1;
	    if (Math.abs(yVelocity) > 0.015) {
	        yVelocity = yVelocity * 0.92 - yVelocitySign * 0.015;
	        yScrollPosition -= yVelocity * TIME_STEP;
	        momentumScrollTimeout = setTimeout(momentumScroll, TIME_STEP);
	    }
	};

	/**
	 * Known issues:
	 *
	 * - Deletion: if user clicks to delete a word before we've received the response
	 *   from the server after adding the new user word, it won't get deleted. Ideally we would
	 *   keep track of all words deleted by the user in this case and then delete them once we
	 *   receive the response from the server.
	 */
	let options;
	/**
	 * Map of position (integer in string form) to info about the word at that position which has
	 * been selected for translation by the user, either on it's own or as part of a phrase.
	 */
	let selectedPositions;
	let groups;
	let groupCounter;
	let sentPhrases;
	/**
	 * Hash of `${FROM-POSITION}-${TO-POSITION}` to UserWords
	 */
	let translatedGroups;
	const clickHandlers = {}; // change based on whole page
	let dragFrom = null;
	let dragTo = null;
	let allSpans;
	let body;
	/** Position of un-translated word to delete */
	let positionOfWordToDelete;
	const isPopoverStyle = () => body === null || body === void 0 ? void 0 : body.hasClass("popoverStyle");
	const getPopoverKey = (span) => {
	    const groupId = span.attr("data-group");
	    if (groupId) {
	        return "group-" + groupId;
	    }
	    return "position-" + getPosition(span);
	};
	/**
	 * @param {boolean} autoDelete - if true, indicates that this is being automatically deleted due to
	 *                               the selected phrase being expanded
	 */
	const onGroupClick = async function (span, autoDelete = false) {
	    var _a, _b;
	    const group = getGroup(span);
	    if (!group) {
	        return;
	    }
	    positionOfWordToDelete = undefined;
	    each(selectedPositions, (info, i) => {
	        if (info && info.groupId === group.id) {
	            if (options.deleteOnUntranslate) {
	                positionOfWordToDelete = i;
	            }
	            delete selectedPositions[i];
	        }
	    });
	    const deleting = !autoDelete && tryDeletingUntranslatedWord();
	    if (deleting) {
	        group.span.find(".translation").css("text-decoration", "line-through");
	        strikeThroughPopoverForSpan(group.span);
	        await sleep(800);
	    }
	    removePopoverForSpan(group.span);
	    if (group.originalNodes) {
	        // Multi-word groups (`originalNodes` defined) own a detached pristine fragment and
	        // a list of wrapper splits; we put the fragment back in the group span's slot and
	        // merge the split wrappers to get byte-for-byte restoration of the original DOM.
	        (_a = group.span) === null || _a === void 0 ? void 0 : _a.replaceWith(group.originalNodes.contents());
	        rejoinDomSplits(group.domSplits);
	    }
	    else {
	        (_b = group.span) === null || _b === void 0 ? void 0 : _b.remove();
	    }
	    if (options.updateLayout) {
	        options.updateLayout();
	    }
	    delete groups[group.id];
	};
	// TODO: remove source lang - redundant
	const setSourceLanguage = (language) => {
	    options.sourceLang = language;
	};
	const dragStart = (event) => {
	    if (body.attr("data-spansEnabled") !== "enabled") {
	        return;
	    }
	    event.stopPropagation();
	    event.preventDefault();
	    if (event.handled !== true) {
	        const $target = $(event.currentTarget);
	        const clickHandler = clickHandlers[$("body").attr("data-clickMode")];
	        if (clickHandler) {
	            clickHandler($target);
	            return;
	        }
	        $target.addClass("selecting");
	        const dragFromPosition = parseInt($target.attr("data-p"), 10);
	        if (typeof dragFromPosition === "number" && !isNaN(dragFromPosition)) {
	            dragFrom = { start: dragFromPosition, end: dragFromPosition };
	        }
	        else {
	            const dragFromGroup = groups[parseInt($target.attr("data-group"), 10)];
	            dragFrom = {
	                start: dragFromGroup.from,
	                end: dragFromGroup.to,
	                groupSpan: dragFromGroup.span,
	            };
	        }
	        dragTo = dragFrom.end;
	        event.handled = true;
	    }
	    else {
	        return false;
	    }
	};
	/** Exported only for purposes of unit testing */
	const dragMove = (span) => {
	    if (span.length === 0) {
	        allSpans.removeClass("selecting");
	        dragTo = null;
	    }
	    else {
	        dragTo = parseInt(span.attr("data-p"), 10);
	        let start;
	        let end;
	        if (typeof dragTo === "number" && !isNaN(dragTo)) {
	            start = Math.min(dragFrom.start, dragFrom.end, dragTo);
	            end = Math.max(dragFrom.start, dragFrom.end, dragTo);
	        }
	        else {
	            const groupId = parseInt(span.attr("data-group"), 10);
	            const group = groups[groupId];
	            start = Math.min(dragFrom.start, dragFrom.end, group.from, group.to);
	            end = Math.max(dragFrom.start, dragFrom.end, group.from, group.to);
	        }
	        const fromReferenceSpan = dragFrom.groupSpan
	            ? dragFrom.groupSpan
	            : $('span[data-p="' + dragFrom.start + '"]');
	        const paragraph = getBlockRoot(fromReferenceSpan);
	        // deselect those spans not within the range
	        $("span.selecting").each((index, innerSpan) => {
	            const $span = $(innerSpan);
	            const position = parseInt($span.attr("data-p"), 10);
	            if (position < start || position > end) {
	                $span.removeClass("selecting");
	            }
	        });
	        each(range(start, end + 1), (position) => {
	            const innerSpan = $('span[data-p="' + position + '"]');
	            // A span is reachable from the drag origin iff it (1) shares the same block root and
	            // (2) isn't separated from the origin by a <br>. <br> is a soft paragraph boundary -
	            // dragging across it must fail to form a group, matching cross-block-root behavior.
	            if (innerSpan.length > 0 &&
	                getBlockRoot(innerSpan).is(paragraph) &&
	                !crossesBrBoundary(fromReferenceSpan, innerSpan)) {
	                innerSpan.addClass("selecting");
	            }
	            else if (selectedPositions[position]) {
	                dragTo = dragFrom.start === start ? end : start;
	            }
	            else {
	                dragTo = null;
	            }
	        });
	    }
	};
	const dragEnd = (span) => {
	    if (dragFrom === null || dragTo === null || isNaN(dragTo)) {
	        dragFrom = null;
	        dragTo = null;
	        allSpans.removeClass("selecting");
	        return;
	    }
	    dragTo = dragTo || parseInt(span.attr("data-p"), 10);
	    let start;
	    let end;
	    if (typeof dragTo === "number" && !isNaN(dragTo)) {
	        start = Math.min(dragFrom.start, dragFrom.end, dragTo);
	        end = Math.max(dragFrom.start, dragFrom.end, dragTo);
	    }
	    else {
	        const groupId = parseInt(span.attr("data-group"), 10);
	        const group = groups[groupId];
	        start = Math.min(dragFrom.start, dragFrom.end, group.from, group.to);
	        end = Math.max(dragFrom.start, dragFrom.end, group.from, group.to);
	    }
	    const createGroupMode = (() => {
	        const uniqueGroupIds = uniq(range(start, end + 1).map((position) => { var _a; return (_a = selectedPositions[position]) === null || _a === void 0 ? void 0 : _a.groupId; }));
	        return ((uniqueGroupIds.length === 1 && uniqueGroupIds[0] === undefined) ||
	            uniqueGroupIds.length > 1);
	    })();
	    (() => {
	        var _a;
	        // Iterate through all positions in the range
	        for (let position = start; position <= end; position++) {
	            if (selectedPositions[position]) {
	                const group = groups[selectedPositions[position].groupId];
	                position = (_a = group === null || group === void 0 ? void 0 : group.to) !== null && _a !== void 0 ? _a : position;
	                // Unselect the group or span
	                if (group === null || group === void 0 ? void 0 : group.originalNodes) {
	                    onGroupClick(group.span, createGroupMode);
	                }
	                else {
	                    unTranslateSpan(selectedPositions[position].span, undefined, createGroupMode);
	                }
	            }
	        }
	    })();
	    // If createGroupMode is false here, it means that we've just unselected a group. If it's true,
	    // it means we need to go ahead and create a new group.
	    if (createGroupMode) {
	        each(range(start, end + 1), (position) => {
	            selectedPositions[position] = {
	                span: options.element.find('span[data-p="' + position + '"]'),
	            };
	        });
	        createGroup(start, end);
	    }
	    dragFrom = null;
	    dragTo = null;
	    allSpans.removeClass("selecting");
	};
	const touchStart = (event) => {
	    const touches = event.touches || event.originalEvent.touches;
	    if (touches) {
	        if (touches.length > 1) {
	            dragFrom = null;
	            dragTo = null;
	            allSpans.removeClass("selecting");
	            return;
	        }
	        if (options.scrollMode) {
	            setStart(touches[0]);
	        }
	    }
	    dragStart(event);
	};
	const touchMove = (event) => {
	    event = event.originalEvent;
	    const pageX = event.changedTouches[0].pageX;
	    const pageY = event.changedTouches[0].pageY;
	    if (options.scrollMode && setMove(event.changedTouches[0])) {
	        // cancel
	        dragFrom = null;
	        dragTo = null;
	        allSpans.removeClass("selecting");
	        return;
	    }
	    if (dragFrom === null) {
	        // can get here e.g. after multi-touch gesture
	        return;
	    }
	    if (event.touches.length > 1) {
	        // cancel
	        dragFrom = null;
	        dragTo = null;
	        allSpans.removeClass("selecting");
	        return;
	    }
	    const x = pageX - $(document).scrollLeft();
	    const y = pageY - $(document).scrollTop();
	    const span = $(document.elementFromPoint(x, y)).closest("span[data-p], span[data-group]");
	    dragMove(span);
	};
	const touchEnd = (event) => {
	    const pageX = event.originalEvent.changedTouches[0].pageX;
	    const pageY = event.originalEvent.changedTouches[0].pageY;
	    if (options.scrollMode && setEnd()) {
	        event.stopPropagation();
	        event.preventDefault();
	        // cancel drag
	        dragFrom = null;
	        dragTo = null;
	        allSpans.removeClass("selecting");
	        return;
	    }
	    if (dragFrom === null) {
	        return;
	    }
	    event.stopPropagation();
	    event.preventDefault();
	    const x = pageX - $(document).scrollLeft();
	    const y = pageY - $(document).scrollTop();
	    const span = $(document.elementFromPoint(x, y)).closest("span[data-p], span[data-group]");
	    dragEnd(span);
	};
	const mouseMove = (event) => {
	    if (dragFrom === null) {
	        return;
	    }
	    const span = $(event.target).closest("span[data-p], span[data-group]");
	    dragMove(span);
	};
	const mouseEnd = (event) => {
	    const span = $(event.target).closest("span[data-p], span[data-group]");
	    if (span.length > 0) {
	        dragEnd(span);
	        event.stopPropagation();
	        event.preventDefault();
	    }
	    else {
	        dragFrom = null;
	        dragTo = null;
	    }
	};
	/**
	 * Initialize span translator
	 *
	 * @param {typeof options} _options
	 */
	const setup = (_options) => {
	    options = _options;
	    groupCounter = 1;
	    groups = {};
	    selectedPositions = {};
	    if (options.scrollMode) {
	        setup$1({ element: options.element });
	    }
	    /**
	     * @description hash of positions to phrases
	     *
	     * @type {{[position: number]: {wordCount: number, id: string}}} - id is ObjectID
	     **/
	    sentPhrases = {};
	    translatedGroups = {};
	    allSpans = options.element.find("span[data-p]");
	    body = $("body");
	    setupPopoverLayer({
	        dismissSpan: (span) => {
	            if (span.attr("data-group")) {
	                onGroupClick(span);
	            }
	            else {
	                unTranslateSpan(span);
	            }
	        },
	        getPopoverKey,
	        getTranslatedSpans: () => $("span[data-p].translated, span[data-group].translated"),
	        isPopoverStyle,
	    });
	    if ("ontouchend" in document) {
	        allSpans.on("touchstart", touchStart);
	        //allSpans.on('touchmove', touchMove);
	        options.element.on("touchmove", touchMove);
	        options.element.on("touchend", touchEnd);
	        //allSpans.on('touchend', touchEnd);
	    }
	    allSpans.on("mousedown", dragStart);
	    $(document).on("mousemove", mouseMove);
	    $(document).on("mouseup", mouseEnd);
	    allSpans.on("click", (event) => {
	        if (body.attr("data-spansEnabled") === "enabled") {
	            event.stopPropagation();
	            event.preventDefault();
	        }
	    });
	    $("body").attr("data-spansEnabled", "enabled");
	};
	/**
	 * Attempts to delete the context at `positionOfWordToDelete`, along with the whole word if it only
	 * had this one context.
	 *
	 * Returns true if deletion happened.
	 */
	const tryDeletingUntranslatedWord = () => {
	    var _a, _b, _c, _d;
	    if (positionOfWordToDelete === undefined) {
	        return;
	    }
	    const span = getSpanFromPosition(positionOfWordToDelete);
	    if (!span || span.length === 0) {
	        positionOfWordToDelete = undefined;
	        return;
	    }
	    const contextToDelete = getContextSentence(getSpanFromPosition(positionOfWordToDelete), groups, options.contextBeforePage);
	    const sentPhrase = sentPhrases[positionOfWordToDelete];
	    if (!sentPhrase) {
	        // Save to try deleting again later
	        return;
	    }
	    // XXX Having these 2 different collections of user words is messy
	    const word = (_a = options.stores.remoteUserWords.getWord(sentPhrase.id)) !== null && _a !== void 0 ? _a : (_c = (_b = options.userWordsList) === null || _b === void 0 ? void 0 : _b.getWord) === null || _c === void 0 ? void 0 : _c.call(_b, sentPhrase.id);
	    if (!word) {
	        return;
	    }
	    delete sentPhrases[positionOfWordToDelete];
	    positionOfWordToDelete = undefined;
	    if (((_d = word.state.value.contexts) !== null && _d !== void 0 ? _d : []).length === 1) {
	        // Delete the word
	        word.deleteUserWord();
	        return true;
	    }
	    if ("save" in word) {
	        // Remove the context
	        word.save({
	            contexts: word.state.value.contexts.filter((context) => context.text !== contextToDelete.text),
	        });
	        return true;
	    }
	    else if (
	    // This is here only to support the Web Reader which doesn't have the `save` method.
	    // Remove this if/when the Web Reader is updated to use the `save` method.
	    confirm(`You've translated this ${sentPhrase.wordCount > 1 ? "phrase" : "word"} before in other contexts. ` + "Are you sure you want to delete it?")) {
	        // Ask before removing the word
	        word.deleteUserWord();
	        return true;
	    }
	    return false;
	};
	/**
	 * Remove the translation gloss from the given span
	 *
	 * @param {JQuery<HTMLElement>} span
	 * @param {any} group
	 * @param {boolean} autoDelete
	 */
	const unTranslateSpan = async (span, group /* optional - the group corresponding to the span position */, autoDelete = false) => {
	    const originalHtml = span.attr("data-original");
	    const groupId = span.attr("data-group");
	    const position = getPosition(span);
	    if (position) {
	        group = group || getGroupFromPosition(position);
	        if (group) {
	            delete groups[group.id];
	        }
	        else {
	            console.error("NO GROUP!");
	        }
	    }
	    else {
	        console.error("NO POSITION!");
	    }
	    if (!autoDelete && options.deleteOnUntranslate) {
	        positionOfWordToDelete = position;
	        const deleting = tryDeletingUntranslatedWord();
	        if (deleting) {
	            span.find(".translation").css("text-decoration", "line-through");
	            strikeThroughPopoverForSpan(span);
	            await sleep(800);
	        }
	    }
	    if (groupId) {
	        onGroupClick(span);
	        return;
	    }
	    span.removeClass("translated translating monolingual popoverBelow");
	    removePopoverForSpan(span);
	    delete selectedPositions[getPosition(span)];
	    if (!originalHtml) {
	        return;
	    }
	    span.text(originalHtml);
	    span.removeAttr("data-original");
	    if (map[options.stores.user.state.value.currentLearningLanguage]
	        .direction !==
	        map[options.stores.user.state.value.firstLanguage].direction) {
	        span.attr("dir", map[options.stores.user.state.value.currentLearningLanguage]
	            .direction || "LTR");
	    }
	    if (options.updateLayout) {
	        options.updateLayout();
	    }
	};
	const getGroupFromPosition = (position) => {
	    let foundGroup;
	    each(groups, (group) => {
	        if (position >= group.from && position <= group.to) {
	            if (foundGroup) {
	                console.error("OVERLAPPING GROUPS!");
	            }
	            else {
	                foundGroup = group;
	            }
	        }
	    });
	    return foundGroup;
	};
	/**
	 * Returns a group span if it exists at `position`, or a normal single-word span otherwise
	 */
	const getSpanFromPosition = (position) => {
	    var _a;
	    const group = getGroupFromPosition(position);
	    return (_a = group === null || group === void 0 ? void 0 : group.span) !== null && _a !== void 0 ? _a : $('span[data-p="' + position + '"]');
	};
	var getPosition = (span) => {
	    const position = span.attr("data-p");
	    const toPosition = span.attr("data-to");
	    if (position) {
	        return parseInt(position, 10);
	    }
	    else if (toPosition) {
	        return parseInt(toPosition, 10);
	    }
	    else {
	        return null;
	    }
	};
	const getGroup = (span) => {
	    return getGroup$1(span, groups);
	};
	const removeGroup = (groupId) => {
	    if (groups[groupId]) {
	        unTranslateSpan(groups[groupId].span, groups[groupId], true);
	        delete groups[groupId];
	    }
	};
	// direction 'next' or 'previous'
	const isBreak = (node, direction) => {
	    const sibling = node[direction + "Sibling"];
	    if (sibling && sibling.nodeType === 3) {
	        if (/\.|!|\?/.test($(sibling).text())) {
	            return true;
	        }
	        else {
	            return isBreak(sibling, direction);
	        }
	    }
	    else if (sibling && $(sibling).is("br")) {
	        return true;
	    }
	    else {
	        return false;
	    }
	};
	const createGroup = (position, toPosition) => {
	    let from = position;
	    let to = toPosition || position;
	    const id = groupCounter;
	    if (!canGroupRange(options.element, from, to)) {
	        each(range(from, to + 1), (innerPosition) => {
	            delete selectedPositions[innerPosition];
	        });
	        return;
	    }
	    selectedPositions[position].groupId = id;
	    if (toPosition) {
	        each(range(position, toPosition + 1), (innerPosition) => {
	            selectedPositions[innerPosition].groupId = id;
	        });
	    }
	    const paragraph = getBlockRoot(selectedPositions[position].span);
	    const groupsToRemove = {};
	    if (options.stores.user.state.value.readerMergePhrases === "off") ;
	    else {
	        // merge adjacent phrases
	        while (selectedPositions[from - 1] &&
	            (!groups[selectedPositions[from - 1].groupId] ||
	                (!isBreak(groups[selectedPositions[from - 1].groupId].span[0], "next") &&
	                    getBlockRoot(groups[selectedPositions[from - 1].groupId].span)
	                        .is(paragraph)) ||
	                (selectedPositions[from - 1].span &&
	                    getBlockRoot(selectedPositions[from - 1].span)
	                        .is(paragraph) &&
	                    !isBreak(selectedPositions[from - 1].span[0], "next")))) {
	            from--;
	            if (selectedPositions[from].groupId) {
	                groupsToRemove[selectedPositions[from].groupId] = true;
	            }
	            selectedPositions[from] = { groupId: id };
	        }
	        while (selectedPositions[to + 1] &&
	            (!groups[selectedPositions[to + 1].groupId] ||
	                (!isBreak(groups[selectedPositions[to + 1].groupId].span[0], "previous") &&
	                    getBlockRoot(groups[selectedPositions[to + 1].groupId].span)
	                        .is(paragraph)) ||
	                (selectedPositions[to + 1].span &&
	                    getBlockRoot(selectedPositions[to + 1].span)
	                        .is(paragraph) &&
	                    !isBreak(selectedPositions[to + 1].span[0], "next")))) {
	            to++;
	            if (selectedPositions[to].groupId) {
	                groupsToRemove[selectedPositions[to].groupId] = true;
	            }
	            selectedPositions[to] = { groupId: id };
	        }
	    }
	    // Remove the absorbed groups before validating the extended range. A multi-word group
	    // keeps its constituent `data-p` spans inside a detached `originalNodes` fragment, so
	    // `canGroupRange` (and the subsequent `mountMultiWordGroup` call) cannot see them via
	    // `element.find('span[data-p="N"]')` while the group is still mounted. Tearing the old
	    // groups down here re-attaches the originals into the document, restoring the lookups
	    // that the merge path depends on.
	    const oldSelectedPositions = clone(selectedPositions);
	    each(groupsToRemove, (value, groupId) => {
	        removeGroup(groupId);
	    });
	    selectedPositions = oldSelectedPositions;
	    if (!canGroupRange(options.element, from, to)) {
	        each(range(from, to + 1), (innerPosition) => {
	            delete selectedPositions[innerPosition];
	        });
	        return;
	    }
	    let span;
	    // `originalNodes === undefined` is the sentinel for the single-word path.
	    let originalNodes;
	    let domSplits = [];
	    // Create group span
	    if (from === to) {
	        span = selectedPositions[position].span;
	    }
	    else {
	        const fromSpan = options.element.find("span[data-p=" + from + "]");
	        span = $("<span/>").attr("data-group", id);
	        if (fromSpan.hasClass("dark")) {
	            span.addClass("dark");
	        }
	        span.on("mousedown", dragStart);
	        span.on("touchstart", dragStart);
	        span.on("touchmove", touchMove);
	        span.on("touchend", touchEnd);
	        // Isolate the exact original DOM fragment for the range, then render a clone
	        // of it inside the in-flow group span. The detached original fragment is kept
	        // pristine so untranslate can restore it exactly later.
	        try {
	            ({ originalNodes, domSplits } = mountMultiWordGroup(options.element, span, from, to));
	        }
	        catch (error) {
	            console.error("Failed to create phrase group", {
	                error,
	                from,
	                to,
	            });
	            each(range(from, to + 1), (innerPosition) => {
	                delete selectedPositions[innerPosition];
	            });
	            span === null || span === void 0 ? void 0 : span.remove();
	            return;
	        }
	    }
	    groupCounter++;
	    const group = {
	        from: from,
	        to: to,
	        id: id,
	        originalNodes: originalNodes,
	        domSplits: domSplits,
	        span: span,
	    };
	    groups[id] = group;
	    translateGroup(group);
	};
	const setTranslated = (span) => {
	    span.addClass("translated");
	    const sourceDirection = map[options.stores.user.state.value.currentLearningLanguage]
	        .direction;
	    const targetDirection = map[options.stores.user.state.value.firstLanguage].direction;
	    if (sourceDirection !== targetDirection) {
	        // The wrapper sits inline within the source-language flow, so its `dir` must match the
	        // source direction - otherwise an RTL paragraph that contains an LTR-attributed wrapper
	        // gets re-ordered by the browser's bidi algorithm (forum #5052: dragging multiple
	        // Hebrew words made the first/last words visually swap in Chrome/Safari). The
	        // `.translation` and `.original` children are then explicitly anchored to their own
	        // languages so neither inherits the wrong direction.
	        span.attr("dir", sourceDirection || "LTR");
	        span.find(".translation").attr("dir", targetDirection || "LTR");
	        span.find(".original").attr("dir", sourceDirection || "LTR");
	    }
	};
	const unTranslateAll = () => {
	    $("span[data-p].translating, span[data-group].translating").each((index, span) => {
	        unTranslateSpan($(span), undefined, true);
	    });
	    clearPopoverEntries();
	};
	const monolingualMode = () => !options.forceReaderTranslations &&
	    options.stores.user.state.value.readerTranslations === "off";
	const translateGroup = async (group) => {
	    var _a, _b;
	    const span = group.span;
	    const word = span.text();
	    const context = getContextSentence(span, groups, options.contextBeforePage);
	    const data = {
	        source: options.sourceLang,
	        target: options.stores.user.state.value.firstLanguage,
	        // Consolidate multiple white-space characters into one to avoid hitting phrase limit
	        // incorrectly
	        q: word.replace(/\s+/g, " ").trim(),
	        position: span.attr("data-p"),
	        bookID: options.bookModel ? options.bookModel.id : undefined,
	        context: context.text,
	    };
	    /**
	     * Punctuation characters. Make sure it's kept in sync with punctuation in `wordRegExp` in
	     * spannify.js
	     */
	    const punctuation = '«»"”“.,?!¡¿'.split("");
	    if (punctuation.includes(data.q)) {
	        // In this case, user has clicked on a lone punctuation character, which we shouldn't try
	        // to translate
	        unTranslateSpan(span, group);
	        return;
	    }
	    (_a = options.beforeTranslate) === null || _a === void 0 ? void 0 : _a.call(options);
	    (_b = options.speak) === null || _b === void 0 ? void 0 : _b.call(options, options.sourceLang, word);
	    if (options.sourceLang === options.stores.user.state.value.firstLanguage) {
	        if (options.chooseFirstLanguage) {
	            await options.chooseFirstLanguage();
	        }
	        data.target = options.stores.user.state.value.firstLanguage;
	        // Do this check again, only if the user has chosen an appropriate first language can we proceed
	        if (options.sourceLang === options.stores.user.state.value.firstLanguage) {
	            alert("Can't translate to the same language. Please ensure that you have different " +
	                "languages set for your first language and the one you are reading. " +
	                "Note: Even when using Readlang in monolingual mode, you still " +
	                "need these languages to be different for Readlang to generate the flashcards you will practice with " +
	                "later.");
	            return;
	        }
	    }
	    if (span.hasClass("translating")) {
	        return;
	    }
	    if (monolingualMode()) {
	        unTranslateAll();
	        span.addClass("translating translated monolingual");
	    }
	    else {
	        $("span.monolingual").removeClass("translating translated monolingual");
	        span.addClass("translating");
	    }
	    const respondToTranslate = (translationResponse) => {
	        var _a;
	        if (span.parent().length === 0) {
	            // Resetting `positionOfWordToDelete` in this way could lead to a race condition
	            positionOfWordToDelete = undefined;
	            return;
	        }
	        if (!groups[group.id]) {
	            // Resetting `positionOfWordToDelete` in this way could lead to a race condition
	            positionOfWordToDelete = undefined;
	            return;
	        }
	        const translation = translationResponse.translations[0];
	        const alternativeTranslations = translationResponse.translations.slice(1);
	        if (!monolingualMode()) {
	            if (span.hasClass("translating")) {
	                // Preserve the formatted HTML (e.g. "<strong>mujer</strong> llamada
	                // <strong>Sofia</strong>") for the visible .original div so bold/italic
	                // from the source text still renders under the translation. data-original
	                // keeps the plain text since unTranslateSpan restores single-word spans
	                // via span.text(data-original) and would otherwise render literal HTML.
	                const originalHtml = span.html();
	                span.attr("data-original", span.text());
	                span.html('<div class="translation">' +
	                    [translation, ...alternativeTranslations].join(" / ") +
	                    "</div>" +
	                    '<div class="original">' +
	                    originalHtml +
	                    "</div>");
	                setTranslated(span);
	                showPopoverForSpan(span);
	            }
	            else {
	                // don't translate if the user clicked another word
	                return;
	            }
	        }
	        const newWordDefinition = {
	            word: word,
	            language: options.sourceLang,
	            translation: translation,
	            contexts: [
	                {
	                    _id: makeObjectId(),
	                    text: context.text,
	                },
	            ],
	        };
	        if ((_a = options.bookModel) === null || _a === void 0 ? void 0 : _a.id) {
	            const book = options.bookModel.book.value;
	            newWordDefinition.contexts[0].bookID = options.bookModel.id;
	            newWordDefinition.contexts[0].source = "book:" + options.bookModel.id;
	            if (book.audioURL || book.youTubeID) {
	                if (book.youTubeID) {
	                    newWordDefinition.contexts[0].youTubeID = book.youTubeID;
	                }
	                else {
	                    newWordDefinition.contexts[0].audioURL = book.audioURL;
	                }
	                newWordDefinition.contexts[0].audioStart = Math.max(0, getTime(book.audioMap, context.start) - 1);
	                newWordDefinition.contexts[0].audioEnd =
	                    getTime(book.audioMap, context.end + 1) + 1;
	            }
	            // no position for now because:
	            //
	            // 1. book can be edited rendering it out of date
	            // 2. complicated to get position from learn page context translations
	            //
	            //newWordDefinition.contexts[0].position = context.start;
	        }
	        const newWord = options.userWordCreator(newWordDefinition);
	        options.stores.remoteUserWords.addWord(newWord, (addedWord) => {
	            var _a, _b;
	            translatedGroups[group.from + "-" + group.to] = addedWord;
	            const disposeAddedWordDestroyed = j(() => {
	                if (addedWord.deletedSequence.value > 0) {
	                    delete translatedGroups[group.from + "-" + group.to];
	                    disposeAddedWordDestroyed();
	                }
	            });
	            (_a = options.translateDictionaryLookup) === null || _a === void 0 ? void 0 : _a.call(options, addedWord, span);
	            if (monolingualMode()) {
	                (_b = options.monolingualLookup) === null || _b === void 0 ? void 0 : _b.call(options, word, span, context.text);
	            }
	            const wordCount = group.to - group.from + 1;
	            const toDelete = {};
	            each(range(group.from, group.to + 1), (sentPosition) => {
	                const sent = sentPhrases[sentPosition];
	                if (sent) {
	                    // Can this ever not be true?
	                    if (sent.wordCount < wordCount) {
	                        toDelete[sent.id] = true;
	                        sentPhrases[sentPosition] = {
	                            wordCount: wordCount,
	                            id: addedWord.state.value._id,
	                        };
	                    }
	                }
	                else {
	                    sentPhrases[sentPosition] = {
	                        wordCount: wordCount,
	                        id: addedWord.state.value._id,
	                    };
	                }
	            });
	            each(keys(toDelete), (id) => {
	                let wordToDelete = options.stores.remoteUserWords.getWord(id);
	                if (wordToDelete) {
	                    wordToDelete.deleteUserWord();
	                }
	                if (options.userWordsList) {
	                    wordToDelete = options.userWordsList.getWord(id);
	                    if (wordToDelete) {
	                        wordToDelete.deleteUserWord();
	                    }
	                }
	            });
	            if (options.userWordsList) {
	                options.userWordsList.addUserWord(addedWord, { at: 0, merge: true });
	            }
	            tryDeletingUntranslatedWord();
	        });
	    };
	    options.translator(data, respondToTranslate, () => {
	        // Something went wrong, so un-translate
	        if (group.originalNodes) {
	            onGroupClick(group.span);
	        }
	        else {
	            unTranslateSpan(span, group);
	        }
	    }, (transliteration) => {
	        // Add transliteration to the UI
	        // This must be called **after** the translation callback
	        if (!span.hasClass("translated")) {
	            console.error("span isn't translated yet");
	            return;
	        }
	        const translationElement = span.find(".translation");
	        const translationText = translationElement.text();
	        translationElement.html(`<div class="transliteration">${transliteration}</div><div>${translationText}</div>`);
	        showPopoverForSpan(span);
	        // Pass the span so the reader's pagination can keep it on screen — the transliteration
	        // adds an extra line above the translation, increasing widget height, which can push a
	        // bottom-row selection onto the next page if we relayout without retaining.
	        setTimeout(() => options === null || options === void 0 ? void 0 : options.updateLayout(span), 100);
	    });
	};
	const setEnabled = (enabled) => {
	    if (enabled) {
	        $("body").attr("data-spansEnabled", "enabled");
	    }
	    else {
	        $("body").attr("data-spansEnabled", "disabled");
	    }
	};
	const scheduleRepositionPopovers = () => {
	    scheduleRepositionPopovers$1();
	};
	/** @param {boolean} deleteOnUntranslate */
	const setDeleteOnUntranslate = (deleteOnUntranslate) => {
	    options.deleteOnUntranslate = deleteOnUntranslate;
	};

	/* global Readability: false */
	(() => {
	    var _a;
	    // Don't load the bookmarklet twice
	    if (window.READLANG.loadingEmbeddedWebReader) {
	        console.log("Readlang Web Reader already loaded");
	        return;
	    }
	    window.READLANG.loadingEmbeddedWebReader = true;
	    let stores;
	    let enabled = true;
	    let spannified = false;
	    let iFrameHeight = 37;
	    let callbacks = {};
	    let callbackID = 0;
	    let originalDocument;
	    if (window.location.host === window.readlangHostname) {
	        // In the past we've shown a message to the user here, or redirected them to the links page.
	        // This is currently disabled to fix an issue where linking from the importer bookmarklet to
	        // the newly imported document was causing a redirect loop to /links.
	        /*
	        alert('To use the Readlang Web Reader:\n\n' +
	          '1. Drag this "Readlang Web Reader" link to your bookmarks bar\n' +
	          '2. Browse to the page you want to read\n' +
	          '3. Click the "Readlang Web Reader" bookmark');
	         */
	        // window.location.pathname = "/links";
	        return;
	    }
	    if (!window.localStorage) {
	        alert("The Readlang Web Reader requires the use of third party cookies and site data to work. " +
	            "Please enable this in your browser settings and try again.");
	        return;
	    }
	    const userWordCreator = (wordDefinition) => {
	        var _a, _b;
	        const state = y$1(wordDefinition);
	        return {
	            state,
	            userWord: state,
	            deletedSequence: y$1((_a = wordDefinition.deletedSequence) !== null && _a !== void 0 ? _a : 0),
	            on: function () { },
	            get: function (field) {
	                return state.value[field];
	            },
	            set: function (field, value) {
	                state.value = Object.assign(Object.assign({}, state.value), { [field]: value });
	            },
	            patch: function (attrs) {
	                state.value = Object.assign(Object.assign({}, state.value), attrs);
	            },
	            deleteUserWord: function () { },
	            id: (_b = wordDefinition._id) !== null && _b !== void 0 ? _b : wordDefinition.id,
	        };
	    };
	    const loadLibrary = (librarySrc, libraryVariable, callback) => {
	        if (window[libraryVariable]) {
	            callback();
	            return;
	        }
	        // prepare script element
	        const script = document.createElement("script");
	        script.type = "text/javascript";
	        script.src = librarySrc;
	        // trigger callback when loaded
	        script.onload = () => {
	            callback();
	        };
	        // @ts-ignore
	        script.onreadystatechange = function () {
	            // @ts-ignore
	            if (this.readyState == "complete" || this.readyState === "loaded") {
	                callback();
	            }
	        };
	        // add to DOM
	        document.body.appendChild(script);
	    };
	    let readlangDomain;
	    if ((_a = window.readlangHostname) === null || _a === void 0 ? void 0 : _a.startsWith("localhost")) {
	        readlangDomain = "http://" + window.readlangHostname;
	    }
	    else {
	        readlangDomain = "https://" + window.readlangHostname;
	    }
	    $(document).ready(() => {
	        const dummyReferenceDiv = $("<div/>").css({
	            position: "fixed",
	            left: 0,
	            top: 0,
	        });
	        $("body").append(dummyReferenceDiv);
	        const searchQuery = "?bust=" +
	            window.READLANG.gitCommit +
	            // Initially we used "true" and then moved to numbers for versioning, starting with "2"
	            (window.READLANG.chromeExtension
	                ? `&chromeExtension=${typeof window.READLANG.chromeExtension === "number"
                    ? window.READLANG.chromeExtension > 1
                        ? window.READLANG.chromeExtension
                        : "true"
                    : "true"}`
	                : "");
	        const iFrame = $("<iframe/>")
	            .attr("id", "readlangWebReaderIFrame")
	            .attr("src", readlangDomain + "/bookmarklet" + searchQuery)
	            .attr("allowTransparency", "true")
	            .css({
	            position: "fixed",
	            /*'left': '0',*/
	            right: "0",
	            top: "0",
	            bottom: "0",
	            display: "block",
	            "max-width": "500px",
	            width: "100%",
	            height: iFrameHeight,
	            "background-color": "transparent",
	            border: "none",
	            "z-index": "99999999999",
	        });
	        const updateTranslationStyleCss = () => {
	            $("body").removeClass("glossStyle");
	            $("body").removeClass("glossStyleNew");
	            $("body").removeClass("popoverStyle");
	            if (stores.user.state.value.readerTranslationStyle === "gloss") {
	                $("body").addClass("glossStyle");
	            }
	            else if (stores.user.state.value.readerTranslationStyle === "glossNew") {
	                $("body").addClass("glossStyleNew");
	            }
	            else if (stores.user.state.value.readerTranslationStyle === "popover") {
	                $("body").addClass("popoverStyle");
	            }
	            scheduleRepositionPopovers();
	        };
	        const updateBookmarkletPosition = () => {
	            switch (stores.user.state.value.bookmarkletPosition || "topRight") {
	                case "topLeft":
	                    iFrame.css({
	                        top: 0,
	                        bottom: "auto",
	                        left: 0,
	                        right: "auto",
	                    });
	                    break;
	                case "topRight":
	                    iFrame.css({
	                        top: 0,
	                        bottom: "auto",
	                        left: "auto",
	                        right: 0,
	                    });
	                    break;
	                case "bottomLeft":
	                    iFrame.css({
	                        top: "auto",
	                        bottom: 0,
	                        left: 0,
	                        right: "auto",
	                    });
	                    break;
	                case "bottomRight":
	                    iFrame.css({
	                        top: "auto",
	                        bottom: 0,
	                        left: "auto",
	                        right: 0,
	                    });
	                    break;
	                default:
	                    console.error("position not recognized");
	            }
	        };
	        messageListener("embeddedWebReader", (message, data, rawEvent) => {
	            var _a;
	            // XXX Is it important to verify origin?????
	            if (rawEvent.origin !== readlangDomain) {
	                return;
	            }
	            switch (message) {
	                case "bookmarkletLoading": {
	                    setWebReaderIFrame(rawEvent.source);
	                    break;
	                }
	                case "bookmarkletLoaded": {
	                    setWebReaderIFrame(rawEvent.source);
	                    if (data.basicLatin) {
	                        $("body").addClass("basicLatinFirstLanguage");
	                    }
	                    let detectedLanguage;
	                    if (!spannified) {
	                        detectedLanguage = $("html").attr("lang");
	                        let lang;
	                        if (!detectedLanguage) {
	                            lang = $("meta[name=lang][content]");
	                            if (lang.length > 0) {
	                                detectedLanguage = lang.attr("content");
	                            }
	                        }
	                        if (!detectedLanguage) {
	                            lang = $('meta[http-equiv="content-language"][content]');
	                            if (lang.length > 0) {
	                                detectedLanguage = lang.attr("content");
	                            }
	                        }
	                    }
	                    const userState = y$1(data.user);
	                    stores = {
	                        user: {
	                            state: userState,
	                            get: function (field) {
	                                return userState.value[field];
	                            },
	                            set: function (field, value) {
	                                this.patch(typeof field === "string" ? { [field]: value } : field);
	                            },
	                            patch: function (attrs) {
	                                userState.value = Object.assign(Object.assign({}, userState.value), attrs);
	                            },
	                        },
	                        remoteUserWords: {
	                            modelsById: {},
	                            getWord: function (id) {
	                                return this.modelsById[id];
	                            },
	                            addWord: function (word, callback) {
	                                const that = this;
	                                const contexts = word.state.value.contexts;
	                                $.each(contexts, (index, context) => {
	                                    context.URL = window.location.href;
	                                    context.source =
	                                        "url:" + new URL(window.location.href).hostname;
	                                    context.text = context.text.replace(/ →/g, "");
	                                });
	                                if (callback) {
	                                    callbacks[callbackID] = (newWord) => {
	                                        const addedWord = userWordCreator(newWord);
	                                        addedWord.deleteUserWord = () => {
	                                            postMessage("webReaderIFrame", "deleteUserWord", {
	                                                id: addedWord.id,
	                                            });
	                                        };
	                                        that.modelsById[addedWord.id] = addedWord;
	                                        callback(addedWord);
	                                    };
	                                }
	                                postMessage("webReaderIFrame", "addUserWord", {
	                                    word: word.state.value.word,
	                                    translation: word.state.value.translation,
	                                    contexts: contexts,
	                                    callbackID: callbackID++,
	                                });
	                            },
	                        },
	                    };
	                    updateTranslationStyleCss();
	                    updateBookmarkletPosition();
	                    if (!spannified) {
	                        enableTranslation();
	                    }
	                    iFrame.css({ height: iFrameHeight });
	                    setTimeout(() => {
	                        if (!spannified) {
	                            setup({
	                                element: $("body"),
	                                sourceLang: stores.user.state.value.currentLearningLanguage,
	                                stores: stores,
	                                translator: function (options, callback, errorCallback, transliterationCallback) {
	                                    translateWord(options, function (...args) {
	                                        callback(...args);
	                                        updateLink();
	                                    }, errorCallback, transliterationCallback);
	                                },
	                                scrollMode: true,
	                                userWordCreator,
	                                deleteOnUntranslate: stores.user.state.value.readerDeselectBehavior === "delete",
	                                updateLayout: () => { }, // No-op for extension context
	                            });
	                            setup$2($("body"));
	                            spannified = true;
	                        }
	                        postMessage("webReaderIFrame", "spannified", {
	                            language: detectedLanguage,
	                            url: window.location.href,
	                            title: $("title").text(),
	                        });
	                        // set any embedded buttons to loaded state
	                        $(".readlang-web-reader-button")
	                            .removeClass("loading")
	                            .addClass("active");
	                    }, 100);
	                    // When click happens anywhere, send message to iframe so that it can cancel any
	                    // modal dialogs
	                    $(document).click(() => {
	                        postMessage("webReaderIFrame", "clickOnPage");
	                    });
	                    break;
	                }
	                case "removeReadlangBookmarklet": {
	                    window.location.reload();
	                    break;
	                }
	                case "translation": {
	                    if (data.error) {
	                        const errorCallback = errorCallbacks[data.id];
	                        if (errorCallback) {
	                            errorCallback(data);
	                        }
	                        delete errorCallbacks[data.id];
	                        delete callbacks[data.id];
	                        delete transliterationCallbacks[data.id];
	                        return;
	                    }
	                    const callback = callbacks[data.id];
	                    if (callback) {
	                        callback({
	                            translations: [data.translation],
	                        });
	                    }
	                    // Clean up translation callbacks (but keep transliteration callback for separate message)
	                    delete callbacks[data.id];
	                    delete errorCallbacks[data.id];
	                    break;
	                }
	                case "transliteration": {
	                    // Handle transliteration sent separately from translation
	                    const transliterationCallback = transliterationCallbacks[data.id];
	                    if (transliterationCallback && data.transliteration) {
	                        transliterationCallback(data.transliteration);
	                    }
	                    delete transliterationCallbacks[data.id];
	                    break;
	                }
	                case "toggleState": {
	                    enabled = data.state === "on";
	                    setEnabled(enabled);
	                    setEnabled$1(enabled);
	                    break;
	                }
	                case "import": {
	                    loadLibrary(readlangDomain + "/external/Readability.js", "Readability", () => {
	                        // @ts-ignore
	                        const article = new Readability(window.location.href, originalDocument).parse();
	                        window.READLANG = window.READLANG || {};
	                        window.READLANG.readableHTML =
	                            /*'<h1>' + article.title + '</h1>\n\n' + */ (article &&
	                                article.content) ||
	                                "";
	                        document
	                            .getElementsByTagName("body")[0]
	                            .appendChild(document.createElement("script"))
	                            .setAttribute("src", readlangDomain +
	                            "/src/importerBookmarklet.js?bust=" +
	                            new Date().getTime());
	                    });
	                    break;
	                }
	                case "setHeight": {
	                    if (data.height > iFrameHeight) {
	                        iFrame.stop().animate({
	                            height: Math.min(data.height, $(window).height()),
	                        });
	                    }
	                    break;
	                }
	                case "resetHeight": {
	                    iFrame.stop().animate({ height: iFrameHeight });
	                    break;
	                }
	                case "addWordCallback": {
	                    if (callbacks[data.callbackID]) {
	                        callbacks[data.callbackID].call(null, userWordCreator(data.userWord));
	                        delete callbacks[data.callbackID];
	                    }
	                    break;
	                }
	                case "patchUser": {
	                    if (stores && stores.user) {
	                        stores.user.patch(data.user);
	                    }
	                    if ((_a = data.user) === null || _a === void 0 ? void 0 : _a.currentLearningLanguage) {
	                        setSourceLanguage(data.user.currentLearningLanguage);
	                    }
	                    if (data.basicLatin) {
	                        $("body").addClass("basicLatinFirstLanguage");
	                    }
	                    else {
	                        $("body").removeClass("basicLatinFirstLanguage");
	                    }
	                    break;
	                }
	                case "closeWebReader": {
	                    // page reload is the most reliable way to accomplish this, though may result in data loss
	                    window.location.reload();
	                    break;
	                }
	                case "setPosition": {
	                    stores.user.patch({ bookmarkletPosition: data.position });
	                    updateBookmarkletPosition();
	                    break;
	                }
	                case "setTranslationStyle": {
	                    stores.user.patch({ readerTranslationStyle: data.style });
	                    updateTranslationStyleCss();
	                    break;
	                }
	                case "setMergePhrases": {
	                    stores.user.patch({ readerMergePhrases: data.mergePhrases });
	                    break;
	                }
	                case "setDeselectBehavior": {
	                    stores.user.patch({ readerDeselectBehavior: data.behavior });
	                    setDeleteOnUntranslate(data.behavior === "delete");
	                    break;
	                }
	            }
	        });
	        $("body").append(iFrame);
	        var enableTranslation = () => {
	            // store clone of original document
	            originalDocument = document.cloneNode(true);
	            $(originalDocument).find("script").remove();
	            // spanning
	            const body = $("body");
	            const blockQuotes = body.find("blockquote");
	            blockQuotes.find("p").addClass("quotedText");
	            body.append($("<style>" +
	                "body span[data-group]," +
	                "body span[data-p] {" +
	                "  display:inline!important;" +
	                "  cursor:pointer!important;" +
	                "  float:none!important;" +
	                "  width:auto!important;" +
	                "  position:static!important;" +
	                "  text-indent:0!important;" +
	                "}" +
	                "body span[data-p].selecting," +
	                "body span[data-p]:hover," +
	                "body span.translating {" +
	                "  outline:2px solid rgb(153,204,153);}" +
	                "body span.translated {" +
	                "  background-color:rgb(230,242,230);color:#000;}" +
	                "body span.translated .original {" +
	                "  display:none;}" +
	                "body span.translated .translation {" +
	                "  display:inline;}" +
	                // with gloss style enabled
	                "body.glossStyle span[data-group]," +
	                "body.glossStyle span[data-p] {" +
	                "  display:inline-block!important;" +
	                "  text-decoration: inherit;" +
	                "}" +
	                "body.glossStyleNew span[data-group]," +
	                "body.glossStyleNew span[data-p] {" +
	                "  display:inline-block!important;" +
	                "  text-decoration: inherit;" +
	                "}" +
	                "body.glossStyle span[data-p].selecting," +
	                "body.glossStyle span[data-p]:hover," +
	                "body.glossStyle span.translating {" +
	                "  outline: none;" +
	                "  border-bottom: 0px solid rgba(0, 127, 0, 0.4);" +
	                "  box-shadow: 0 -5px 0 rgba(0, 127, 0, 0.4) inset;}" +
	                "body.glossStyleNew span[data-p].selecting," +
	                "body.glossStyleNew span[data-p]:hover," +
	                "body.glossStyleNew span.translating {" +
	                "  outline: none;" +
	                "  background-color: rgba(42, 185, 123, 0.3);}" +
	                "body.glossStyleNew span[data-p].translated:hover {" +
	                "  background-color: inherit;" +
	                "}" +
	                "body.glossStyle span[data-p].selecting.dark," +
	                "body.glossStyle span[data-p].dark:hover," +
	                "body.glossStyle span.translating.dark {" +
	                "  box-shadow: 0 -5px 0 rgba(81, 187, 255, 0.5) inset;}" +
	                "body.glossStyleNew span.translated, " +
	                "body.glossStyle span.translated {" +
	                "  background-color: inherit;" +
	                "  color: inherit;" +
	                "  text-align: center;" +
	                "  text-decoration: none;" +
	                "}" +
	                /*
	              'body.glossStyle span.translated:hover {' +
	              '  background-color: inherit;' +
	              '  color: inherit;' +
	              '  text-align: center;}' +
	             */
	                "body.glossStyle span.translated .translation," +
	                "body.glossStyleNew span.translated .translation {" +
	                "  color: #4B9C79;" +
	                "  text-decoration: none;" +
	                "}" +
	                "body.glossStyle span.translated.dark .translation {" +
	                "  color:rgb(199,226,244);}" +
	                "body.glossStyleNew span.translated.dark .translation {" +
	                "  color: #90CFB4;}" +
	                "body.glossStyle span.translated .original {" +
	                "  display:block;}" +
	                "body.basicLatinFirstLanguage.glossStyleNew span.translated .translation," +
	                "body.basicLatinFirstLanguage.glossStyle span.translated .translation {" +
	                "  font-weight: normal;" +
	                "  line-height: 1;" +
	                "  padding-top: 4px;" +
	                "  padding-bottom: 4px;" +
	                "  opacity: 1;" +
	                "  display: block;" +
	                (stores.user.state.value.readerTranslationFont === "normal"
	                    ? '  font-family: "Open Sans", sans-serif;}'
	                    : '  font-family: "Coming Soon", sans-serif;}') +
	                "a {" +
	                "  position: relative;" +
	                "}" +
	                "body.glossStyleNew span.translating.monolingual," +
	                "body.glossStyleNew span.translating .original {" +
	                "  display: block;" +
	                "  " +
	                "  background-color: rgb(42, 185, 123);" +
	                "  color: white;" +
	                "  padding: 2px 5px;" +
	                "  position: relative;" +
	                "}" +
	                "body.glossStyleNew span.translating .original {" +
	                "  margin-top: 9px;" +
	                "}" +
	                "body.glossStyleNew span.translating .original:after {" +
	                "  bottom: 100%;" +
	                "  left: 50%;" +
	                "  border: solid transparent;" +
	                '  content: " ";' +
	                "  height: 0;" +
	                "  width: 0;" +
	                "  position: absolute;" +
	                "  border-color: rgba(194, 225, 245, 0);" +
	                "  border-bottom-color: rgb(42, 185, 123);" +
	                "  border-width: 8px;" +
	                "  margin-left: -8px;" +
	                "}" +
	                // Popover style
	                "body.popoverStyle span[data-p].selecting," +
	                "body.popoverStyle span[data-p]:hover," +
	                "body.popoverStyle span.translating {" +
	                "  outline: none;" +
	                "  background-color: rgba(42, 185, 123, 0.3);}" +
	                "body.popoverStyle span[data-p].translated:hover {" +
	                "  background-color: inherit;}" +
	                "body.popoverStyle span.translated {" +
	                "  background-color: inherit;" +
	                "  color: #4B9C79;}" +
	                "body.popoverStyle span.translating .original {" +
	                "  display: inline;}" +
	                "body.popoverStyle span.translating .translation {" +
	                "  display: none;}" +
	                ".readerPopoverLayer {" +
	                "  pointer-events: none;" +
	                "  position: fixed;" +
	                "  overflow: hidden;" +
	                "  z-index: 100;}" +
	                ".readerPopoverBubble {" +
	                "  pointer-events: auto;" +
	                "  cursor: pointer;" +
	                "  position: absolute;" +
	                "  display: none;" +
	                "  max-width: min(320px, calc(100vw - 16px));" +
	                "  padding: 4px 8px;" +
	                "  border-radius: 6px;" +
	                "  background-color: rgb(42, 185, 123);" +
	                "  color: white;" +
	                "  font-family: inherit;" +
	                "  font-size: inherit;" +
	                "  text-align: center;" +
	                "  line-height: 1.4;" +
	                "  font-weight: normal;" +
	                "  white-space: normal;" +
	                "  overflow-wrap: break-word;}" +
	                ".readerPopoverBubble .transliteration {" +
	                "  font-size: 80%;" +
	                '  font-family: "Open Sans", sans-serif;' +
	                "  font-weight: 400;}" +
	                ".readerPopoverBubble:after {" +
	                "  top: 100%;" +
	                "  left: var(--arrow-left, 50%);" +
	                "  border: solid transparent;" +
	                '  content: " ";' +
	                "  height: 0;" +
	                "  width: 0;" +
	                "  position: absolute;" +
	                "  border-top-color: rgb(42, 185, 123);" +
	                "  border-width: 6px;" +
	                "  margin-left: -6px;}" +
	                ".readerPopoverBubble.popoverBelow:after {" +
	                "  top: auto;" +
	                "  bottom: 100%;" +
	                "  border-top-color: transparent;" +
	                "  border-bottom-color: rgb(42, 185, 123);}" +
	                ".readlang-link-popup {" +
	                "  font-weight: normal!important;" +
	                '  font-family: "Helvetica", "Arial", "Sans Serif" !important;' +
	                "  font-style: normal!important;" +
	                "  font-size: 12px!important;" +
	                "  line-height: 1.3!important;" +
	                "  height: auto!important;" +
	                "  text-align: center!important;" +
	                "  text-decoration: none!important;" +
	                "  text-transform: none!important;" +
	                "  position: absolute!important;" +
	                "  z-index: 2147483647!important;" +
	                "  width: 80px!important;" +
	                "  margin-top: 0px!important;" +
	                "  margin-bottom: 0px!important;" +
	                "  background-color: rgb(42, 185, 123)!important;" +
	                "  color: white!important;" +
	                "  padding: 5px 5px!important;" +
	                "}" +
	                ".readlang-link-popup:after {" +
	                "  left: 100%;" +
	                "  top: 50%;" +
	                "  border: solid transparent;" +
	                '  content: " ";' +
	                "  height: 0;" +
	                "  width: 0;" +
	                "  position: absolute;" +
	                "  border-color: rgba(194, 225, 245, 0);" +
	                "  border-left-color: rgb(42, 185, 123);" +
	                "  border-width: 8px;" +
	                "  margin-top: -8px;" +
	                "}" +
	                // Transliteration styles (furigana, pinyin, etc.)
	                ".transliteration {" +
	                "  display: block;" +
	                "  font-size: 80%;" +
	                '  font-family: "Helvetica", "Arial", sans-serif;' +
	                "  font-weight: 400;" +
	                "  opacity: 0.85;" +
	                "  margin-bottom: 7px;" +
	                "}" +
	                "</style>" +
	                '<link href="//fonts.googleapis.com/css?family=Coming+Soon" rel="stylesheet" type="text/css">' +
	                '<link href="//fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet" type="text/css">' +
	                // add a bit of text to force loading of Coming Soon font
	                '<p style="font-family:\'Coming Soon\';opacity:0;position:fixed;pointer-events:none;height:0;" class="readlang-ignore">' +
	                "to load Coming Soon font" +
	                "</p>"));
	            let position = 0;
	            const ignore = {
	                style: true,
	                script: true,
	                link: true,
	                head: true,
	                div: {
	                    class: "readlang-ignore",
	                },
	                span: {
	                    class: "readlang-ignore",
	                },
	            };
	            const traverse = (element, action) => {
	                const ignoreConditions = ignore[element.nodeName.toLowerCase()];
	                if (ignoreConditions) {
	                    if (ignoreConditions === true) {
	                        return;
	                    }
	                    if (some(ignoreConditions, (value, attribute) => {
	                        if (attribute === "class") {
	                            if ($(element).hasClass(value)) {
	                                return true;
	                            }
	                        }
	                    })) {
	                        return;
	                    }
	                }
	                let nextChild = element.childNodes[0];
	                while (nextChild) {
	                    let result;
	                    if (nextChild.nodeType === Node.TEXT_NODE &&
	                        /\S/.test(nextChild.nodeValue)) {
	                        result = action(nextChild);
	                        if (result === "stop") {
	                            return "stop";
	                        }
	                        nextChild = result.nextSibling;
	                    }
	                    else {
	                        result = traverse(nextChild, action);
	                        if (result === "stop") {
	                            return "stop";
	                        }
	                        nextChild = nextChild.nextSibling;
	                    }
	                }
	            };
	            let keepGoing = false;
	            // TODO: share this code with the similar code in shared/spannify.js instead of duplicating
	            const wordRegExp = new RegExp(`([<>/${letter}${mark}\\u200D]+)`, "gu");
	            const hanRegExp = new RegExp(cjkThai, "u");
	            const combiningMark = new RegExp(`[${mark}]`, "u");
	            // Tag the nearest block-level ancestor of each spannified text node with
	            // `data-readlang-block`. `spanUtils.getBlockRoot` uses these markers to decide whether
	            // two word spans share a paragraph, which drives multi-word drag selection across
	            // inline formatting like <strong>/<em>. We look at computed `display` (not tag name)
	            // because author CSS can reclassify a tag - e.g. `span { display: block }` or
	            // `p { display: inline }` on third-party pages - and `contents` is treated as inline
	            // since it has no box of its own. If every ancestor is inline up to <body>, we mark
	            // <body> itself so there's always a defined root.
	            const markReadlangBlock = (element) => {
	                let current = $(element);
	                while (current.length > 0 && current[0] !== body[0]) {
	                    const display = current.css("display");
	                    if (!/^inline/.test(display) && display !== "contents") {
	                        current.attr("data-readlang-block", "true");
	                        return;
	                    }
	                    current = current.parent();
	                }
	                if (current.length > 0) {
	                    current.attr("data-readlang-block", "true");
	                }
	            };
	            traverse(body[0], (textElement) => {
	                const newHtml = textElement.textContent
	                    .replace(/\u00AD/, "") // this is the &shy; char - soft hyphen
	                    .replace(wordRegExp, (wholeMatch, group1) => {
	                    if (hanRegExp.test(group1)) {
	                        let result = "";
	                        for (let i = 0; i < group1.length; i++) {
	                            const startTag = "<span data-p=" + position++ + ">";
	                            const endTag = "</span>";
	                            result += startTag + group1[i];
	                            while (i < group1.length - 1 &&
	                                combiningMark.test(group1[i + 1])) {
	                                i++;
	                                result += group1[i];
	                            }
	                            result += endTag;
	                        }
	                        return result;
	                    }
	                    return '<span data-p="' + position++ + '">' + group1 + "</span>";
	                });
	                const temp = $("<div/>");
	                temp.html(newHtml);
	                const childNodes = temp[0].childNodes;
	                if (childNodes.length === 0) {
	                    return textElement;
	                }
	                const parentElement = textElement.parentElement;
	                markReadlangBlock(parentElement);
	                let lastAdded = childNodes[childNodes.length - 1];
	                const firstAdded = lastAdded;
	                parentElement.replaceChild(lastAdded, textElement);
	                while (childNodes.length > 0) {
	                    const newChild = childNodes[childNodes.length - 1];
	                    parentElement.insertBefore(newChild, lastAdded);
	                    lastAdded = newChild;
	                }
	                if (position > 25000 && !keepGoing) {
	                    keepGoing = confirm("This is a very large page and the Readlang translator may cause it to slow down.\n\n" +
	                        'It may be better to click "Cancel" and use the "Import to Readlang" button from the menu instead.\n\n' +
	                        "Are you sure you want to carry on?");
	                    if (!keepGoing) {
	                        return "stop";
	                    }
	                }
	                return firstAdded;
	            });
	            // TODO: move to more sensible location
	            const rgbaRegExp = new RegExp("rgba\\(([0-9\\.]+),\\s*([0-9\\.]+),\\s*([0-9\\.]+),\\s*([0-9\\.]+)\\)");
	            const rgbRegExp = new RegExp("rgb\\(([0-9\\.]+),\\s*([0-9\\.]+),\\s*([0-9\\.]+)\\)");
	            // returns array of RGBA values
	            const getBackgroundColor = (element) => {
	                const backgroundColor = element.css("background-color");
	                const rgba = rgbaRegExp.exec(backgroundColor);
	                if (rgba) {
	                    return rgba.slice(1);
	                }
	                const rgb = rgbRegExp.exec(backgroundColor);
	                if (rgb) {
	                    const result = rgb.slice(1);
	                    result.push("1");
	                    return result;
	                }
	                // default: assume transparent
	                return [0, 0, 0, 0];
	            };
	            const getCalculatedBackgroundColor = (element, stack) => {
	                stack = stack || [];
	                if (!element) {
	                    return composeColors(stack);
	                }
	                const backgroundColor = getBackgroundColor(element);
	                if (backgroundColor[3] === 1) {
	                    stack.splice(0, 0, backgroundColor);
	                    return composeColors(stack);
	                }
	                if (element.is("html")) {
	                    return composeColors(stack);
	                }
	                return getCalculatedBackgroundColor(element.parent(), stack);
	            };
	            var composeColors = (colorStack) => {
	                const rgb = [255, 255, 255];
	                each(colorStack, (rgba) => {
	                    rgb[0] = rgb[0] * (1 - rgba[3]) + rgba[0] * rgba[3];
	                    rgb[1] = rgb[1] * (1 - rgba[3]) + rgba[1] * rgba[3];
	                    rgb[2] = rgb[2] * (1 - rgba[3]) + rgba[2] * rgba[3];
	                });
	                return rgb;
	            };
	            const isDark = (element) => {
	                const color = getCalculatedBackgroundColor(element);
	                return (color[0] + color[1] + color[2]) / 3 < 127;
	            };
	            $("span[data-p]").each((index, span) => {
	                const $span = $(span);
	                // check if on dark background
	                if (isDark($span.parent())) {
	                    $span.addClass("dark");
	                }
	            });
	        };
	    });
	    var errorCallbacks = {};
	    var transliterationCallbacks = {};
	    callbacks = {};
	    var translateWord = (options, callback, errorCallback, transliterationCallback) => {
	        const id = callbackID;
	        callbackID += 1;
	        if (callback) {
	            callbacks[id] = callback;
	        }
	        if (errorCallback) {
	            errorCallbacks[id] = errorCallback;
	        }
	        if (transliterationCallback) {
	            transliterationCallbacks[id] = transliterationCallback;
	        }
	        postMessage("webReaderIFrame", "translate", {
	            id: id,
	            word: options.q,
	            context: options.context,
	        });
	    };
	})();

})();
//# sourceMappingURL=embeddedWebReader.js.map
