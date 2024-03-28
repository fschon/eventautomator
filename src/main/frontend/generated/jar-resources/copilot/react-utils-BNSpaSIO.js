var Y = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function j(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function D(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
const m = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), p = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), E = Symbol.for("react.provider"), g = Symbol.for("react.context"), i = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), h = Symbol.for("react.lazy");
function C(e, t, n) {
  const r = e.displayName;
  if (r)
    return r;
  const o = t.displayName || t.name || "";
  return o !== "" ? `${n}(${o})` : n;
}
function l(e) {
  return e.displayName || "Context";
}
function u(e) {
  if (e == null)
    return null;
  if (typeof e == "function")
    return e.displayName || e.name || null;
  if (typeof e == "string")
    return e;
  switch (e) {
    case y:
      return "Fragment";
    case m:
      return "Portal";
    case _:
      return "Profiler";
    case p:
      return "StrictMode";
    case S:
      return "Suspense";
    case T:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case g:
        return `${l(e)}.Consumer`;
      case E:
        return `${l(e._context)}.Provider`;
      case i:
        return C(e, e.render, "ForwardRef");
      case b:
        const t = e.displayName || null;
        return t !== null ? t : u(e.type) || "Memo";
      case h: {
        const n = e, r = n._payload, o = n._init;
        try {
          return u(o(r));
        } catch {
          return null;
        }
      }
    }
  return null;
}
let a;
function K() {
  const e = /* @__PURE__ */ new Set();
  return Array.from(document.body.querySelectorAll("*")).flatMap(P).filter(R).forEach((n) => e.add(n.fileName)), Array.from(e);
}
function R(e) {
  return !!e && e.fileName;
}
function A(e) {
  return e?._debugSource || void 0;
}
function P(e) {
  return A(f(e));
}
function N() {
  return `__reactFiber$${s()}`;
}
function F() {
  return `__reactContainer$${s()}`;
}
function s() {
  if (!(!a && (a = Array.from(document.querySelectorAll("*")).flatMap((e) => Object.keys(e)).filter((e) => e.startsWith("__reactFiber$")).map((e) => e.replace("__reactFiber$", "")).find((e) => e), !a)))
    return a;
}
function v(e) {
  const t = e.type;
  return t?.$$typeof === i && !t.displayName && e.child ? v(e.child) : u(e.type) ?? u(e.elementType) ?? "???";
}
function L() {
  const e = Array.from(document.querySelectorAll("body > *")).flatMap((n) => n[F()]).find((n) => n), t = c(e);
  return c(t?.child);
}
function O(e) {
  const t = [];
  let n = c(e.child);
  for (; n; )
    t.push(n), n = c(n.sibling);
  return t;
}
const $ = (e) => {
  const t = O(e);
  if (t.length === 0)
    return [];
  const n = t.filter((r) => w(r) || M(r));
  return n.length === t.length ? t : t.flatMap((r) => n.includes(r) ? r : $(r));
};
function c(e) {
  const t = e?.stateNode?.current;
  if (t)
    return t;
  if (!e)
    return;
  if (!e.alternate)
    return e;
  const n = e.alternate, r = e?.actualStartTime, o = n?.actualStartTime;
  return o !== r && o > r ? n : e;
}
function f(e) {
  const t = N(), n = c(e[t]);
  if (n?._debugSource)
    return n;
  let r = n?.return || void 0;
  for (; r && !r._debugSource; )
    r = r.return || void 0;
  return r;
}
function d(e) {
  if (e.stateNode?.isConnected === !0)
    return e.stateNode;
  if (e.child)
    return d(e.child);
}
function w(e) {
  const t = d(e);
  return t && c(f(t)) === e;
}
function M(e) {
  return typeof e.type == "function" && !!e._debugSource;
}
export {
  j as a,
  P as b,
  Y as c,
  v as d,
  d as e,
  $ as f,
  D as g,
  L as h,
  w as i,
  K as j
};
