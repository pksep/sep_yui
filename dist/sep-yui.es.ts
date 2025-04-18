import { effectScope as Y0, ref as ie, markRaw as ho, toRaw as Ki, watch as $e, unref as L, hasInjectionContext as tv, inject as $o, getCurrentInstance as nv, reactive as Fe, isRef as Zn, isReactive as H1, toRef as Zr, nextTick as po, computed as T, getCurrentScope as R1, onScopeDispose as V1, toRefs as g1, defineComponent as oe, openBlock as $, createElementBlock as P, normalizeStyle as Pt, createElementVNode as V, onMounted as ze, normalizeClass as le, toDisplayString as ye, createVNode as J, Fragment as Re, renderList as Ze, createCommentVNode as ne, createTextVNode as Qn, createBlock as ge, withKeys as _o, renderSlot as Be, readonly as rv, customRef as ov, watchEffect as It, onUnmounted as ai, withDirectives as jt, vShow as B0, withCtx as me, provide as li, resolveDynamicComponent as Y1, normalizeProps as mo, mergeProps as kr, guardReactiveProps as Ji, Transition as B1, resolveComponent as In, resolveDirective as iv, toHandlers as sv, withModifiers as kn, mergeModels as En, useModel as Co, pushScopeId as er, popScopeId as tr, useAttrs as W0, vModelText as ss, vModelDynamic as av, vModelCheckbox as lv, onBeforeUnmount as F0, vModelRadio as uv } from "vue";
var N0 = !1;
function ra(e, t, r) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, r), r) : (e[t] = r, r);
}
function n1(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function cv() {
  return j0().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function j0() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const dv = typeof Proxy == "function", fv = "devtools-plugin:setup", hv = "plugin:settings:set";
let jo, m1;
function pv() {
  var e;
  return jo !== void 0 || (typeof window < "u" && window.performance ? (jo = !0, m1 = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (jo = !0, m1 = globalThis.perf_hooks.performance) : jo = !1), jo;
}
function vv() {
  return pv() ? m1.now() : Date.now();
}
class gv {
  constructor(t, r) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = r;
    const i = {};
    if (t.settings)
      for (const u in t.settings) {
        const c = t.settings[u];
        i[u] = c.defaultValue;
      }
    const a = `__vue-devtools-plugin-settings__${t.id}`;
    let l = Object.assign({}, i);
    try {
      const u = localStorage.getItem(a), c = JSON.parse(u);
      Object.assign(l, c);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return l;
      },
      setSettings(u) {
        try {
          localStorage.setItem(a, JSON.stringify(u));
        } catch {
        }
        l = u;
      },
      now() {
        return vv();
      }
    }, r && r.on(hv, (u, c) => {
      u === this.plugin.id && this.fallbacks.setSettings(c);
    }), this.proxiedOn = new Proxy({}, {
      get: (u, c) => this.target ? this.target.on[c] : (...f) => {
        this.onQueue.push({
          method: c,
          args: f
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (u, c) => this.target ? this.target[c] : c === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(c) ? (...f) => (this.targetQueue.push({
        method: c,
        args: f,
        resolve: () => {
        }
      }), this.fallbacks[c](...f)) : (...f) => new Promise((h) => {
        this.targetQueue.push({
          method: c,
          args: f,
          resolve: h
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const r of this.onQueue)
      this.target.on[r.method](...r.args);
    for (const r of this.targetQueue)
      r.resolve(await this.target[r.method](...r.args));
  }
}
function U0(e, t) {
  const r = e, i = j0(), a = cv(), l = dv && r.enableEarlyProxy;
  if (a && (i.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !l))
    a.emit(fv, e, t);
  else {
    const u = l ? new gv(r, a) : null;
    (i.__VUE_DEVTOOLS_PLUGINS__ = i.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: r,
      setupFn: t,
      proxy: u
    }), u && t(u.proxiedTarget);
  }
}
/*!
 * pinia v2.2.2
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let Ni;
const Qi = (e) => Ni = e, Z0 = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function bo(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Xn;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Xn || (Xn = {}));
const vo = typeof window < "u", nf = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function mv(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function W1(e, t, r) {
  const i = new XMLHttpRequest();
  i.open("GET", e), i.responseType = "blob", i.onload = function() {
    G0(i.response, t, r);
  }, i.onerror = function() {
    console.error("could not download file");
  }, i.send();
}
function z0(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function da(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const r = document.createEvent("MouseEvents");
    r.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(r);
  }
}
const fa = typeof navigator == "object" ? navigator : { userAgent: "" }, q0 = /Macintosh/.test(fa.userAgent) && /AppleWebKit/.test(fa.userAgent) && !/Safari/.test(fa.userAgent), G0 = vo ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !q0 ? yv : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in fa ? _v : (
      // Fallback to using FileReader and a popup
      Cv
    )
  )
) : () => {
};
function yv(e, t = "download", r) {
  const i = document.createElement("a");
  i.download = t, i.rel = "noopener", typeof e == "string" ? (i.href = e, i.origin !== location.origin ? z0(i.href) ? W1(e, t, r) : (i.target = "_blank", da(i)) : da(i)) : (i.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(i.href);
  }, 4e4), setTimeout(function() {
    da(i);
  }, 0));
}
function _v(e, t = "download", r) {
  if (typeof e == "string")
    if (z0(e))
      W1(e, t, r);
    else {
      const i = document.createElement("a");
      i.href = e, i.target = "_blank", setTimeout(function() {
        da(i);
      });
    }
  else
    navigator.msSaveOrOpenBlob(mv(e, r), t);
}
function Cv(e, t, r, i) {
  if (i = i || open("", "_blank"), i && (i.document.title = i.document.body.innerText = "downloading..."), typeof e == "string")
    return W1(e, t, r);
  const a = e.type === "application/octet-stream", l = /constructor/i.test(String(nf.HTMLElement)) || "safari" in nf, u = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((u || a && l || q0) && typeof FileReader < "u") {
    const c = new FileReader();
    c.onloadend = function() {
      let f = c.result;
      if (typeof f != "string")
        throw i = null, new Error("Wrong reader.result type");
      f = u ? f : f.replace(/^data:[^;]*;/, "data:attachment/file;"), i ? i.location.href = f : location.assign(f), i = null;
    }, c.readAsDataURL(e);
  } else {
    const c = URL.createObjectURL(e);
    i ? i.location.assign(c) : location.href = c, i = null, setTimeout(function() {
      URL.revokeObjectURL(c);
    }, 4e4);
  }
}
function _t(e, t) {
  const r = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(r, t) : t === "error" ? console.error(r) : t === "warn" ? console.warn(r) : console.log(r);
}
function F1(e) {
  return "_a" in e && "install" in e;
}
function X0() {
  if (!("clipboard" in navigator))
    return _t("Your browser doesn't support the Clipboard API", "error"), !0;
}
function K0(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (_t('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function bv(e) {
  if (!X0())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), _t("Global state copied to clipboard.");
    } catch (t) {
      if (K0(t))
        return;
      _t("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function wv(e) {
  if (!X0())
    try {
      J0(e, JSON.parse(await navigator.clipboard.readText())), _t("Global state pasted from clipboard.");
    } catch (t) {
      if (K0(t))
        return;
      _t("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function kv(e) {
  try {
    G0(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    _t("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let gr;
function $v() {
  gr || (gr = document.createElement("input"), gr.type = "file", gr.accept = ".json");
  function e() {
    return new Promise((t, r) => {
      gr.onchange = async () => {
        const i = gr.files;
        if (!i)
          return t(null);
        const a = i.item(0);
        return t(a ? { text: await a.text(), file: a } : null);
      }, gr.oncancel = () => t(null), gr.onerror = r, gr.click();
    });
  }
  return e;
}
async function Mv(e) {
  try {
    const r = await $v()();
    if (!r)
      return;
    const { text: i, file: a } = r;
    J0(e, JSON.parse(i)), _t(`Global state imported from "${a.name}".`);
  } catch (t) {
    _t("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function J0(e, t) {
  for (const r in t) {
    const i = e.state.value[r];
    i ? Object.assign(i, t[r]) : e.state.value[r] = t[r];
  }
}
function Pn(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Q0 = "🍍 Pinia (root)", ha = "_root";
function Dv(e) {
  return F1(e) ? {
    id: ha,
    label: Q0
  } : {
    id: e.$id,
    label: e.$id
  };
}
function Sv(e) {
  if (F1(e)) {
    const r = Array.from(e._s.keys()), i = e._s;
    return {
      state: r.map((l) => ({
        editable: !0,
        key: l,
        value: e.state.value[l]
      })),
      getters: r.filter((l) => i.get(l)._getters).map((l) => {
        const u = i.get(l);
        return {
          editable: !1,
          key: l,
          value: u._getters.reduce((c, f) => (c[f] = u[f], c), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((r) => ({
      editable: !0,
      key: r,
      value: e.$state[r]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((r) => ({
    editable: !1,
    key: r,
    value: e[r]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((r) => ({
    editable: !0,
    key: r,
    value: e[r]
  }))), t;
}
function Ov(e) {
  return e ? Array.isArray(e) ? e.reduce((t, r) => (t.keys.push(r.key), t.operations.push(r.type), t.oldValue[r.key] = r.oldValue, t.newValue[r.key] = r.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: Pn(e.type),
    key: Pn(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function Lv(e) {
  switch (e) {
    case Xn.direct:
      return "mutation";
    case Xn.patchFunction:
      return "$patch";
    case Xn.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let qo = !0;
const pa = [], uo = "pinia:mutations", At = "pinia", { assign: xv } = Object, ba = (e) => "🍍 " + e;
function Tv(e, t) {
  U0({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: pa,
    app: e
  }, (r) => {
    typeof r.now != "function" && _t("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), r.addTimelineLayer({
      id: uo,
      label: "Pinia 🍍",
      color: 15064968
    }), r.addInspector({
      id: At,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            bv(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await wv(t), r.sendInspectorTree(At), r.sendInspectorState(At);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            kv(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Mv(t), r.sendInspectorTree(At), r.sendInspectorState(At);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (i) => {
            const a = t._s.get(i);
            a ? typeof a.$reset != "function" ? _t(`Cannot reset "${i}" store because it doesn't have a "$reset" method implemented.`, "warn") : (a.$reset(), _t(`Store "${i}" reset.`)) : _t(`Cannot reset "${i}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), r.on.inspectComponent((i, a) => {
      const l = i.componentInstance && i.componentInstance.proxy;
      if (l && l._pStores) {
        const u = i.componentInstance.proxy._pStores;
        Object.values(u).forEach((c) => {
          i.instanceData.state.push({
            type: ba(c.$id),
            key: "state",
            editable: !0,
            value: c._isOptionsAPI ? {
              _custom: {
                value: Ki(c.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => c.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(c.$state).reduce((f, h) => (f[h] = c.$state[h], f), {})
            )
          }), c._getters && c._getters.length && i.instanceData.state.push({
            type: ba(c.$id),
            key: "getters",
            editable: !1,
            value: c._getters.reduce((f, h) => {
              try {
                f[h] = c[h];
              } catch (p) {
                f[h] = p;
              }
              return f;
            }, {})
          });
        });
      }
    }), r.on.getInspectorTree((i) => {
      if (i.app === e && i.inspectorId === At) {
        let a = [t];
        a = a.concat(Array.from(t._s.values())), i.rootNodes = (i.filter ? a.filter((l) => "$id" in l ? l.$id.toLowerCase().includes(i.filter.toLowerCase()) : Q0.toLowerCase().includes(i.filter.toLowerCase())) : a).map(Dv);
      }
    }), globalThis.$pinia = t, r.on.getInspectorState((i) => {
      if (i.app === e && i.inspectorId === At) {
        const a = i.nodeId === ha ? t : t._s.get(i.nodeId);
        if (!a)
          return;
        a && (i.nodeId !== ha && (globalThis.$store = Ki(a)), i.state = Sv(a));
      }
    }), r.on.editInspectorState((i, a) => {
      if (i.app === e && i.inspectorId === At) {
        const l = i.nodeId === ha ? t : t._s.get(i.nodeId);
        if (!l)
          return _t(`store "${i.nodeId}" not found`, "error");
        const { path: u } = i;
        F1(l) ? u.unshift("state") : (u.length !== 1 || !l._customProperties.has(u[0]) || u[0] in l.$state) && u.unshift("$state"), qo = !1, i.set(l, u, i.state.value), qo = !0;
      }
    }), r.on.editComponentState((i) => {
      if (i.type.startsWith("🍍")) {
        const a = i.type.replace(/^🍍\s*/, ""), l = t._s.get(a);
        if (!l)
          return _t(`store "${a}" not found`, "error");
        const { path: u } = i;
        if (u[0] !== "state")
          return _t(`Invalid path for store "${a}":
${u}
Only state can be modified.`);
        u[0] = "$state", qo = !1, i.set(l, u, i.state.value), qo = !0;
      }
    });
  });
}
function Av(e, t) {
  pa.includes(ba(t.$id)) || pa.push(ba(t.$id)), U0({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: pa,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (r) => {
    const i = typeof r.now == "function" ? r.now.bind(r) : Date.now;
    t.$onAction(({ after: u, onError: c, name: f, args: h }) => {
      const p = e2++;
      r.addTimelineEvent({
        layerId: uo,
        event: {
          time: i(),
          title: "🛫 " + f,
          subtitle: "start",
          data: {
            store: Pn(t.$id),
            action: Pn(f),
            args: h
          },
          groupId: p
        }
      }), u((m) => {
        jr = void 0, r.addTimelineEvent({
          layerId: uo,
          event: {
            time: i(),
            title: "🛬 " + f,
            subtitle: "end",
            data: {
              store: Pn(t.$id),
              action: Pn(f),
              args: h,
              result: m
            },
            groupId: p
          }
        });
      }), c((m) => {
        jr = void 0, r.addTimelineEvent({
          layerId: uo,
          event: {
            time: i(),
            logType: "error",
            title: "💥 " + f,
            subtitle: "end",
            data: {
              store: Pn(t.$id),
              action: Pn(f),
              args: h,
              error: m
            },
            groupId: p
          }
        });
      });
    }, !0), t._customProperties.forEach((u) => {
      $e(() => L(t[u]), (c, f) => {
        r.notifyComponentUpdate(), r.sendInspectorState(At), qo && r.addTimelineEvent({
          layerId: uo,
          event: {
            time: i(),
            title: "Change",
            subtitle: u,
            data: {
              newValue: c,
              oldValue: f
            },
            groupId: jr
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: u, type: c }, f) => {
      if (r.notifyComponentUpdate(), r.sendInspectorState(At), !qo)
        return;
      const h = {
        time: i(),
        title: Lv(c),
        data: xv({ store: Pn(t.$id) }, Ov(u)),
        groupId: jr
      };
      c === Xn.patchFunction ? h.subtitle = "⤵️" : c === Xn.patchObject ? h.subtitle = "🧩" : u && !Array.isArray(u) && (h.subtitle = u.type), u && (h.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: u
        }
      }), r.addTimelineEvent({
        layerId: uo,
        event: h
      });
    }, { detached: !0, flush: "sync" });
    const a = t._hotUpdate;
    t._hotUpdate = ho((u) => {
      a(u), r.addTimelineEvent({
        layerId: uo,
        event: {
          time: i(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: Pn(t.$id),
            info: Pn("HMR update")
          }
        }
      }), r.notifyComponentUpdate(), r.sendInspectorTree(At), r.sendInspectorState(At);
    });
    const { $dispose: l } = t;
    t.$dispose = () => {
      l(), r.notifyComponentUpdate(), r.sendInspectorTree(At), r.sendInspectorState(At), r.getSettings().logStoreChanges && _t(`Disposed "${t.$id}" store 🗑`);
    }, r.notifyComponentUpdate(), r.sendInspectorTree(At), r.sendInspectorState(At), r.getSettings().logStoreChanges && _t(`"${t.$id}" store installed 🆕`);
  });
}
let e2 = 0, jr;
function rf(e, t, r) {
  const i = t.reduce((a, l) => (a[l] = Ki(e)[l], a), {});
  for (const a in i)
    e[a] = function() {
      const l = e2, u = r ? new Proxy(e, {
        get(...f) {
          return jr = l, Reflect.get(...f);
        },
        set(...f) {
          return jr = l, Reflect.set(...f);
        }
      }) : e;
      jr = l;
      const c = i[a].apply(u, arguments);
      return jr = void 0, c;
    };
}
function Pv({ app: e, store: t, options: r }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!r.state, !t._p._testing) {
      rf(t, Object.keys(r.actions), t._isOptionsAPI);
      const i = t._hotUpdate;
      Ki(t)._hotUpdate = function(a) {
        i.apply(this, arguments), rf(t, Object.keys(a._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    Av(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function Iv() {
  const e = Y0(!0), t = e.run(() => ie({}));
  let r = [], i = [];
  const a = ho({
    install(l) {
      Qi(a), a._a = l, l.provide(Z0, a), l.config.globalProperties.$pinia = a, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && vo && Tv(l, a), i.forEach((u) => r.push(u)), i = [];
    },
    use(l) {
      return !this._a && !N0 ? i.push(l) : r.push(l), this;
    },
    _p: r,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && typeof Proxy < "u" && a.use(Pv), a;
}
function t2(e, t) {
  for (const r in t) {
    const i = t[r];
    if (!(r in e))
      continue;
    const a = e[r];
    bo(a) && bo(i) && !Zn(i) && !H1(i) ? e[r] = t2(a, i) : e[r] = i;
  }
  return e;
}
const n2 = () => {
};
function of(e, t, r, i = n2) {
  e.push(t);
  const a = () => {
    const l = e.indexOf(t);
    l > -1 && (e.splice(l, 1), i());
  };
  return !r && R1() && V1(a), a;
}
function Uo(e, ...t) {
  e.slice().forEach((r) => {
    r(...t);
  });
}
const Ev = (e) => e(), sf = Symbol(), r1 = Symbol();
function y1(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((r, i) => e.set(i, r)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const r in t) {
    if (!t.hasOwnProperty(r))
      continue;
    const i = t[r], a = e[r];
    bo(a) && bo(i) && e.hasOwnProperty(r) && !Zn(i) && !H1(i) ? e[r] = y1(a, i) : e[r] = i;
  }
  return e;
}
const Hv = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Rv(e) {
  return !bo(e) || !e.hasOwnProperty(Hv);
}
const { assign: bn } = Object;
function af(e) {
  return !!(Zn(e) && e.effect);
}
function lf(e, t, r, i) {
  const { state: a, actions: l, getters: u } = t, c = r.state.value[e];
  let f;
  function h() {
    !c && (process.env.NODE_ENV === "production" || !i) && (r.state.value[e] = a ? a() : {});
    const p = process.env.NODE_ENV !== "production" && i ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      g1(ie(a ? a() : {}).value)
    ) : g1(r.state.value[e]);
    return bn(p, l, Object.keys(u || {}).reduce((m, C) => (process.env.NODE_ENV !== "production" && C in p && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${C}" in store "${e}".`), m[C] = ho(T(() => {
      Qi(r);
      const g = r._s.get(e);
      return u[C].call(g, g);
    })), m), {}));
  }
  return f = _1(e, h, t, r, i, !0), f;
}
function _1(e, t, r = {}, i, a, l) {
  let u;
  const c = bn({ actions: {} }, r);
  if (process.env.NODE_ENV !== "production" && !i._e.active)
    throw new Error("Pinia destroyed");
  const f = { deep: !0 };
  process.env.NODE_ENV !== "production" && !N0 && (f.onTrigger = (W) => {
    h ? g = W : h == !1 && !E._hotUpdating && (Array.isArray(g) ? g.push(W) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let h, p, m = [], C = [], g;
  const b = i.state.value[e];
  !l && !b && (process.env.NODE_ENV === "production" || !a) && (i.state.value[e] = {});
  const M = ie({});
  let A;
  function D(W) {
    let N;
    h = p = !1, process.env.NODE_ENV !== "production" && (g = []), typeof W == "function" ? (W(i.state.value[e]), N = {
      type: Xn.patchFunction,
      storeId: e,
      events: g
    }) : (y1(i.state.value[e], W), N = {
      type: Xn.patchObject,
      payload: W,
      storeId: e,
      events: g
    });
    const G = A = Symbol();
    po().then(() => {
      A === G && (h = !0);
    }), p = !0, Uo(m, N, i.state.value[e]);
  }
  const Y = l ? function() {
    const { state: N } = r, G = N ? N() : {};
    this.$patch((re) => {
      bn(re, G);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : n2
  );
  function K() {
    u.stop(), m = [], C = [], i._s.delete(e);
  }
  const H = (W, N = "") => {
    if (sf in W)
      return W[r1] = N, W;
    const G = function() {
      Qi(i);
      const re = Array.from(arguments), Ce = [], se = [];
      function Oe(Se) {
        Ce.push(Se);
      }
      function De(Se) {
        se.push(Se);
      }
      Uo(C, {
        args: re,
        name: G[r1],
        store: E,
        after: Oe,
        onError: De
      });
      let Ae;
      try {
        Ae = W.apply(this && this.$id === e ? this : E, re);
      } catch (Se) {
        throw Uo(se, Se), Se;
      }
      return Ae instanceof Promise ? Ae.then((Se) => (Uo(Ce, Se), Se)).catch((Se) => (Uo(se, Se), Promise.reject(Se))) : (Uo(Ce, Ae), Ae);
    };
    return G[sf] = !0, G[r1] = N, G;
  }, I = /* @__PURE__ */ ho({
    actions: {},
    getters: {},
    state: [],
    hotState: M
  }), U = {
    _p: i,
    // _s: scope,
    $id: e,
    $onAction: of.bind(null, C),
    $patch: D,
    $reset: Y,
    $subscribe(W, N = {}) {
      const G = of(m, W, N.detached, () => re()), re = u.run(() => $e(() => i.state.value[e], (Ce) => {
        (N.flush === "sync" ? p : h) && W({
          storeId: e,
          type: Xn.direct,
          events: g
        }, Ce);
      }, bn({}, f, N)));
      return G;
    },
    $dispose: K
  }, E = Fe(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && vo ? bn(
    {
      _hmrPayload: I,
      _customProperties: ho(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    U
    // must be added later
    // setupStore
  ) : U);
  i._s.set(e, E);
  const ue = (i._a && i._a.runWithContext || Ev)(() => i._e.run(() => (u = Y0()).run(() => t({ action: H }))));
  for (const W in ue) {
    const N = ue[W];
    if (Zn(N) && !af(N) || H1(N))
      process.env.NODE_ENV !== "production" && a ? ra(M.value, W, Zr(ue, W)) : l || (b && Rv(N) && (Zn(N) ? N.value = b[W] : y1(N, b[W])), i.state.value[e][W] = N), process.env.NODE_ENV !== "production" && I.state.push(W);
    else if (typeof N == "function") {
      const G = process.env.NODE_ENV !== "production" && a ? N : H(N, W);
      ue[W] = G, process.env.NODE_ENV !== "production" && (I.actions[W] = N), c.actions[W] = N;
    } else process.env.NODE_ENV !== "production" && af(N) && (I.getters[W] = l ? (
      // @ts-expect-error
      r.getters[W]
    ) : N, vo && (ue._getters || // @ts-expect-error: same
    (ue._getters = ho([]))).push(W));
  }
  if (bn(E, ue), bn(Ki(E), ue), Object.defineProperty(E, "$state", {
    get: () => process.env.NODE_ENV !== "production" && a ? M.value : i.state.value[e],
    set: (W) => {
      if (process.env.NODE_ENV !== "production" && a)
        throw new Error("cannot set hotState");
      D((N) => {
        bn(N, W);
      });
    }
  }), process.env.NODE_ENV !== "production" && (E._hotUpdate = ho((W) => {
    E._hotUpdating = !0, W._hmrPayload.state.forEach((N) => {
      if (N in E.$state) {
        const G = W.$state[N], re = E.$state[N];
        typeof G == "object" && bo(G) && bo(re) ? t2(G, re) : W.$state[N] = re;
      }
      ra(E, N, Zr(W.$state, N));
    }), Object.keys(E.$state).forEach((N) => {
      N in W.$state || n1(E, N);
    }), h = !1, p = !1, i.state.value[e] = Zr(W._hmrPayload, "hotState"), p = !0, po().then(() => {
      h = !0;
    });
    for (const N in W._hmrPayload.actions) {
      const G = W[N];
      ra(E, N, H(G, N));
    }
    for (const N in W._hmrPayload.getters) {
      const G = W._hmrPayload.getters[N], re = l ? (
        // special handling of options api
        T(() => (Qi(i), G.call(E, E)))
      ) : G;
      ra(E, N, re);
    }
    Object.keys(E._hmrPayload.getters).forEach((N) => {
      N in W._hmrPayload.getters || n1(E, N);
    }), Object.keys(E._hmrPayload.actions).forEach((N) => {
      N in W._hmrPayload.actions || n1(E, N);
    }), E._hmrPayload = W._hmrPayload, E._getters = W._getters, E._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && vo) {
    const W = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((N) => {
      Object.defineProperty(E, N, bn({ value: E[N] }, W));
    });
  }
  return i._p.forEach((W) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && vo) {
      const N = u.run(() => W({
        store: E,
        app: i._a,
        pinia: i,
        options: c
      }));
      Object.keys(N || {}).forEach((G) => E._customProperties.add(G)), bn(E, N);
    } else
      bn(E, u.run(() => W({
        store: E,
        app: i._a,
        pinia: i,
        options: c
      })));
  }), process.env.NODE_ENV !== "production" && E.$state && typeof E.$state == "object" && typeof E.$state.constructor == "function" && !E.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${E.$id}".`), b && l && r.hydrate && r.hydrate(E.$state, b), h = !0, p = !0, E;
}
// @__NO_SIDE_EFFECTS__
function Vv(e, t, r) {
  let i, a;
  const l = typeof t == "function";
  i = e, a = l ? r : t;
  function u(c, f) {
    const h = tv();
    if (c = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Ni && Ni._testing ? null : c) || (h ? $o(Z0, null) : null), c && Qi(c), process.env.NODE_ENV !== "production" && !Ni)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    c = Ni, c._s.has(i) || (l ? _1(i, t, a, c) : lf(i, a, c), process.env.NODE_ENV !== "production" && (u._pinia = c));
    const p = c._s.get(i);
    if (process.env.NODE_ENV !== "production" && f) {
      const m = "__hot:" + i, C = l ? _1(m, t, a, c, !0) : lf(m, bn({}, a), c, !0);
      f._hotUpdate(C), delete c.state.value[m], c._s.delete(m);
    }
    if (process.env.NODE_ENV !== "production" && vo) {
      const m = nv();
      if (m && m.proxy && // avoid adding stores that are just built for hot module replacement
      !f) {
        const C = m.proxy, g = "_pStores" in C ? C._pStores : C._pStores = {};
        g[i] = p;
      }
    }
    return p;
  }
  return u.$id = i, u;
}
var ut = /* @__PURE__ */ ((e) => (e.default = "default", e.lightBlue = "light-blue", e.blue = "blue", e.green = "green", e.red = "red", e.orange = "orange", e.pink = "pink", e.violet = "violet", e))(ut || {}), xe = /* @__PURE__ */ ((e) => (e.notification = "notification", e.notificationYes = "notification-yes", e.help = "help", e.moonFill = "moon-fill", e.arrowLeft = "arrow-left", e.chevronDown = "chevron-down", e.chevronUp = "chevron-up", e.checkbox = "checkbox", e.chevronRight = "chevron-right", e.chevronLeft = "chevron-left", e.dark = "dark", e.deleteSmall = "delete-small", e.exitBig = "exit-big", e.exitSmall = "exit-small", e.exit = "exit", e.exitCircle = "exit-circle", e.externalLink = "external-link", e.leftBigSmall = "left-big-small", e.light = "light", e.leftBig = "left-big", e.rightSmall = "right-small", e.settings = "settings", e.settingsDark = "settings-dark", e.searchNormal = "search-normal", e.search = "search", e.filter = "filter", e.bgNotContent = "bg-not-content", e.document = "document", e.baseDetail = "base-detail", e.plusSmall = "plus-small", e.plus = "plus", e.addPlus = "add-plus", e.closeVision = "close-vision", e.openVision = "open-vision", e.trash = "trash", e.printer = "printer", e.uploadCloud = "upload-cloud", e.archive = "archive", e.menuClose = "menu-close", e.menuOpen = "menu-open", e.bookOpen = "book-open", e.chartLine = "chart-line", e.marriage = "marriage", e.baseOfAssemblyUnits = "base-of-assembly-units", e.equipmentBase = "equipment-base", e.supplierDatabase = "supplier-database", e.theDatabaseOfMaterials = "the-database-of-materials", e.theBaseOfTheTool = "the-base-of-the-tool", e.fileDatabase = "file-database", e.baseOfEquipmentAndInventory = "base-of-equipment-and-inventory", e.mainPage = "main-page", e.shopping = "shopping", e.shippingTasks = "shipping-tasks", e.warehouse = "warehouse", e.production = "production", e.wastes = "wastes", e.paperClip = "paper-clip", e.writeDowns = "write-downs", e.theComplaint = "the-complaint", e.usersGroup = "users-group", e.reports = "reports", e.editing = "editing", e.shadedArrowDown = "shaded-arrow-down", e.shadedArrowRight = "shaded-arrow-right", e.shadedArrowLeft = "shaded-arrow-left", e.shadedArrowUp = "shaded-arrow-up", e.star = "star", e.info = "info", e.files = "files", e.moreHorizontal = "more-horizontal", e.moreVertical = "more-vertical", e.fileText = "file-text", e.gitPullRequest = "git-pull-request", e.folder = "folder", e.crossLarge = "cross-large", e.crossSmall = "cross-small", e.profileIcon = "profile-icon", e.profile = "profile", e.rightBig = "right-big", e.alertTriangle = "alert-triangle", e.copy = "copy", e.action = "action", e.reset = "reset", e.move = "move", e.eye = "eye", e.eyeOff = "eye-off", e.handSignEmoji = "hand-sign-emoji", e.calendar = "calendar", e.paint = "paint", e.closeTag = "close-tag", e))(xe || {});
const Yv = {
  name: "alert-triangle",
  style: "line",
  viewbox: "0 0 20 20",
  path: `
<path d="M8.57465 3.21659L1.51632 14.9999C1.37079 15.2519 1.29379 15.5377 1.29298 15.8287C1.29216 16.1197 1.36756 16.4059 1.51167 16.6587C1.65579 16.9115 1.86359 17.1222 2.11441 17.2698C2.36523 17.4174 2.65032 17.4967 2.94132 17.4999H17.058C17.349 17.4967 17.6341 17.4174 17.8849 17.2698C18.1357 17.1222 18.3435 16.9115 18.4876 16.6587C18.6317 16.4059 18.7071 16.1197 18.7063 15.8287C18.7055 15.5377 18.6285 15.2519 18.483 14.9999L11.4247 3.21659C11.2761 2.97168 11.0669 2.76919 10.8173 2.62866C10.5677 2.48813 10.2861 2.41431 9.99965 2.41431C9.71321 2.41431 9.43159 2.48813 9.18199 2.62866C8.93238 2.76919 8.72321 2.97168 8.57465 3.21659Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M10 7.5V10.8333" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 14.1666H10.0095" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
`
}, Bv = {
  name: "help",
  style: "line",
  path: `
  <path fill="none" d="M11.5 19.5C15.6421 19.5 19 16.1421 19 12C19 7.85786 15.6421 4.5 11.5 4.5C7.35786 4.5 4 7.85786 4 12C4 16.1421 7.35786 19.5 11.5 19.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  </path>
  <path d="M11.5 9V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  </path>
  <path d="M11.5 15H11.508" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  </path>`
}, Wv = {
  name: "notification",
  style: "line",
  path: `
    <path
      d="M11.7199 21.1649C12.2013 21.1631 12.6628 20.9711 13.0031 20.6306C13.3436 20.2901 13.5357 19.8288 13.5374 19.3474H9.90235C9.90404 19.8288 10.0962 20.2901 10.4367 20.6306C10.777 20.9711 11.2385 21.1631 11.7199 21.1649ZM18.2665 16.3565C17.8556 15.9477 17.624 15.3921 17.6225 14.8123V10.7184C17.6225 9.48322 17.2346 8.27925 16.5136 7.2764C15.7925 6.27339 14.7746 5.52242 13.6037 5.12914C13.4529 5.08036 13.3215 4.98513 13.228 4.85727C13.1344 4.72926 13.0838 4.57509 13.0832 4.4166C13.0883 4.05534 12.9532 3.70609 12.7065 3.44223C12.4598 3.17821 12.1205 3.01987 11.7597 3.00065C11.3915 2.98927 11.0346 3.12759 10.7702 3.38407C10.5058 3.64055 10.3567 3.9932 10.3568 4.36151V4.41659C10.3562 4.57507 10.3056 4.72923 10.212 4.85726C10.1185 4.98512 9.9871 5.08036 9.83632 5.12913C8.66544 5.52239 7.64754 6.27338 6.92639 7.27639C6.2054 8.27925 5.81755 9.48317 5.81755 10.7184V14.8056C5.81601 15.3854 5.58445 15.9408 5.17348 16.3496L4.6419 16.8812C4.23357 17.2917 4.00307 17.8462 4 18.4251H19.44C19.4369 17.8462 19.2064 17.2917 18.7981 16.8812L18.2665 16.3565Z"
      fill="currentColor">
    </path>`
}, Fv = {
  name: "moon-fill",
  style: "line",
  path: `
    <path
      d="M21.958 15.325C22.162 14.839 21.579 14.425 21.09 14.641C20.1126 15.07 19.0565 15.2907 17.989 15.289C13.804 15.289 10.412 11.965 10.412 7.864C10.4105 6.47934 10.8039 5.12297 11.546 3.954C11.83 3.506 11.489 2.886 10.969 3.018C6.96 4.041 4 7.613 4 11.862C4 16.909 8.175 21 13.326 21C17.226 21 20.566 18.655 21.958 15.325Z"
      fill="currentColor" />
    <path
      d="M15.611 3.103C15.081 2.749 14.449 3.381 14.802 3.911L15.432 4.856C15.6876 5.23916 15.824 5.68942 15.824 6.15C15.824 6.61057 15.6876 7.06084 15.432 7.444L14.802 8.389C14.449 8.919 15.082 9.551 15.612 9.197L16.556 8.567C16.9392 8.31143 17.3894 8.17505 17.85 8.17505C18.3106 8.17505 18.7608 8.31143 19.144 8.567L20.089 9.197C20.619 9.551 21.251 8.919 20.897 8.389L20.267 7.444C20.0114 7.06084 19.8751 6.61057 19.8751 6.15C19.8751 5.68942 20.0114 5.23916 20.267 4.856L20.897 3.911C21.251 3.381 20.619 2.749 20.088 3.103L19.144 3.733C18.7608 3.98857 18.3106 4.12495 17.85 4.12495C17.3894 4.12495 16.9392 3.98857 16.556 3.733L15.611 3.103Z"
      fill="currentColor" />`
}, Nv = {
  name: "arrow-left",
  style: "line",
  path: `
    <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  />
    <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>`
}, jv = {
  name: "chevron-down",
  style: "line",
  fill: "none",
  path: `
    <path d="M18 9L12 15L6 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
    `
}, Uv = {
  name: "chevron-right",
  viewbox: "0 0 24 25",
  style: "line",
  path: `
<path d="M9 18.6271L15 12.6271L9 6.62714" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  `
}, Zv = {
  name: "chevron-left",
  viewbox: "0 0 24 25",
  style: "line",
  path: `
<path d="M15 18.6271L9 12.6271L15 6.62714" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    `
}, zv = {
  name: "chevron-up",
  style: "line",
  fill: "none",
  path: `
<path d="M6.97559 15L12.9756 9L18.9756 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
  `
}, qv = {
  name: "checkbox",
  style: "line",
  fill: "none",
  path: `
<path d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0Z" fill="currentColor"/>
<path d="M19 7L9 17.01L6 14.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `
}, Gv = {
  name: "dark",
  style: "line",
  path: `
    <path
      d="M15.3636 16.6364C15.3636 15.6117 14.9566 14.6289 14.232 13.9044C13.5074 13.1798 12.5247 12.7727 11.5 12.7727C10.4753 12.7727 9.49257 13.1798 8.768 13.9044C8.04342 14.6289 7.63636 15.6117 7.63636 16.6364"
      stroke="currentColor" stroke-width="1.54545" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M11.5 9.68182V4.27273" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M5.48818 10.6245L6.58545 11.7218" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M3 16.6364H4.54545" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round"  />
    <path d="M18.4545 16.6364H20" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M16.4145 11.7218L17.5118 10.6245" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M20 19.7273H3" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M14.5909 6.59091L11.5 9.68182L8.40909 6.59091" stroke="currentColor" stroke-width="1.54545"
      stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
}, Xv = {
  name: "exit-big",
  style: "line",
  fill: "none",
  path: `
    <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`
}, Kv = {
  name: "exit-small",
  style: "line",
  path: `
    <path d="M16 8L8 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8 8L16 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />`
}, Jv = {
  name: "external-link",
  style: "line",
  fill: "none",
  path: `<path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 3H21V9" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 14L21 3" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `
}, Qv = {
  name: "exit",
  style: "line",
  path: `
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M20.7569 12.5228L17.944 15.2781C17.1669 16.0531 16.0008 14.8906 16.7779 14.1155L17.7274 13.1721C17.9436 12.9574 17.8725 12.7834 17.5686 12.7834H8.29528C7.83503 12.7834 7.4685 12.4153 7.4685 11.9612C7.4685 11.5082 7.83866 11.1392 8.29528 11.1392H17.5686C17.8713 11.1392 17.9436 10.965 17.7274 10.7503L16.7779 9.80675C16.0008 9.03193 17.1668 7.86914 17.944 8.64416L20.753 11.3712C21.0814 11.6899 21.082 12.2044 20.7569 12.5229L20.7569 12.5228ZM15.9011 6.61737C16.2766 6.99289 16.2766 7.60188 15.9011 7.97763C15.5254 8.35315 14.9164 8.35315 14.5409 7.97763C12.3408 5.77758 8.77377 5.77758 6.57382 7.97763C4.37386 10.1777 4.37377 13.7447 6.57382 15.9447C8.77387 18.1447 12.3409 18.1447 14.5409 15.9447C14.9164 15.569 15.5254 15.569 15.9011 15.9447C16.2766 16.3202 16.2766 16.9292 15.9011 17.3049C12.9498 20.2562 8.16472 20.2562 5.21346 17.3049C2.2622 14.3536 2.26215 9.56853 5.21346 6.61727C8.16477 3.66601 12.9498 3.66596 15.9011 6.61727V6.61737Z"
      fill="currentColor" />`
}, eg = {
  name: "exit-circle",
  style: "line",
  fill: "none",
  path: `
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF6868" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `
}, tg = {
  name: "left-big-small",
  style: "line",
  path: `
    <path d="M12.5 15L10 12L12.5 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" fill="none"/>`
}, ng = {
  name: "left-big",
  style: "line",
  path: `
     <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
`
}, rg = {
  name: "light",
  style: "line",
  path: `
    <path
      d="M15.3636 16.6364C15.3636 15.6117 14.9566 14.6289 14.232 13.9044C13.5074 13.1798 12.5247 12.7727 11.5 12.7727C10.4753 12.7727 9.49257 13.1798 8.76799 13.9044C8.04342 14.6289 7.63636 15.6117 7.63636 16.6364"
      stroke="currentColor" stroke-width="1.54545" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M11.5 4.27273V9.68182" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M5.48818 10.6245L6.58545 11.7218" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M3 16.6364H4.54545" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M18.4545 16.6364H20" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M16.4145 11.7218L17.5118 10.6245" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M20 19.7273H3" stroke="currentColor" stroke-width="1.54545" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M8.40909 7.36364L11.5 4.27273L14.5909 7.36364" stroke="currentColor" stroke-width="1.54545"
      stroke-linecap="round" stroke-linejoin="round" fill="none"/>`
}, og = {
  name: "notification-yes",
  style: "line",
  path: `
    <path
      d="M11.7199 21.1649C12.2013 21.1631 12.6628 20.9711 13.0031 20.6306C13.3436 20.2901 13.5357 19.8288 13.5374 19.3474H9.90235C9.90404 19.8288 10.0962 20.2901 10.4367 20.6306C10.777 20.9711 11.2385 21.1631 11.7199 21.1649ZM18.2665 16.3565C17.8556 15.9477 17.624 15.3921 17.6225 14.8123V10.7184C17.6225 9.48322 17.2346 8.27925 16.5136 7.2764C15.7925 6.27339 14.7746 5.52242 13.6037 5.12914C13.4529 5.08036 13.3215 4.98513 13.228 4.85727C13.1344 4.72926 13.0838 4.57509 13.0832 4.4166C13.0883 4.05534 12.9532 3.70609 12.7065 3.44223C12.4598 3.17821 12.1205 3.01987 11.7597 3.00065C11.3915 2.98927 11.0346 3.12759 10.7702 3.38407C10.5058 3.64055 10.3567 3.9932 10.3568 4.36151V4.41659C10.3562 4.57507 10.3056 4.72923 10.212 4.85726C10.1185 4.98512 9.9871 5.08036 9.83632 5.12913C8.66544 5.52239 7.64754 6.27338 6.92639 7.27639C6.2054 8.27925 5.81755 9.48317 5.81755 10.7184V14.8056C5.81601 15.3854 5.58445 15.9408 5.17348 16.3496L4.6419 16.8812C4.23357 17.2917 4.00307 17.8462 4 18.4251H19.44C19.4369 17.8462 19.2064 17.2917 18.7981 16.8812L18.2665 16.3565Z"
      fill="currentColor" />
    <circle cx="17" cy="7" r="4" fill="#FF344D" />`
}, ig = {
  name: "plus-small",
  style: "line",
  viewbox: "0 0 24 24",
  path: `
<path d="M12 6.34315V17.6569" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.34314 12H17.6568" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>`
}, sg = {
  name: "plus-16",
  style: "line",
  viewbox: "0 0 16 16",
  path: `
<path d="M7.6665 3.6665V12.3331" stroke="currentColor" stroke-width="1.23809" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.3335 8H12.0001" stroke="currentColor" stroke-width="1.23809" stroke-linecap="round" stroke-linejoin="round"/>
`
}, ag = {
  name: "plus",
  style: "line",
  viewbox: "0 0 24 22",
  path: `
<path d="M12.0001 3.51472V20.4853" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.51477 12H20.4853" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
}, lg = {
  name: "minus",
  style: "line",
  viewbox: "0 0 24 24",
  path: `
    <path d="M3.51465 12H20.4852" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `
}, ug = {
  name: "profile-icon",
  style: "line",
  path: `
         <path
      d="M15.8498 8.84991C15.8498 6.73244 14.1173 5 11.9999 5C9.88252 5 8.15002 6.7325 8.15002 8.84991C8.15002 10.9673 9.88252 12.6998 11.9999 12.6998C14.1173 12.6998 15.8498 10.9673 15.8498 8.84991Z"
      fill="currentColor" />
    <path
      d="M13.5224 13.5047C13.0325 13.6622 12.5249 13.7497 11.9999 13.7497C11.4749 13.7497 10.9674 13.6622 10.4774 13.5047C8.93745 12.9972 7.2224 13.4172 6.2075 14.6597C5.45492 15.5872 5 16.7773 5 18.0548C5 18.7724 5.5775 19.3499 6.29504 19.3499H17.705C18.4225 19.3499 19 18.7724 19 18.0548C19 16.7774 18.545 15.5873 17.7925 14.6597C16.76 13.4173 15.0624 12.9973 13.5223 13.5047H13.5224Z"
      fill="currentColor" />`
}, cg = {
  name: "profile",
  style: "line",
  path: `
    <path
      d="M19 19.875V18.125C19 17.1967 18.6313 16.3065 17.9749 15.6501C17.3185 14.9937 16.4283 14.625 15.5 14.625H8.5C7.57174 14.625 6.6815 14.9937 6.02513 15.6501C5.36875 16.3065 5 17.1967 5 18.125V19.875"
      stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>
    <path
      d="M12 11.125C13.933 11.125 15.5 9.558 15.5 7.625C15.5 5.692 13.933 4.125 12 4.125C10.067 4.125 8.5 5.692 8.5 7.625C8.5 9.558 10.067 11.125 12 11.125Z"
      stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>`
}, dg = {
  name: "right-big",
  style: "line",
  path: `
    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>
`
}, fg = {
  name: "right-small",
  style: "line",
  path: `
    <path d="M11 9L13.5529 11.9551L11.1066 14.9991" stroke="currentColor" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round"  fill="none" />`
}, hg = {
  name: "settings",
  style: "line",
  path: `
    <path
      d="M12 14.4545C13.3556 14.4545 14.4545 13.3556 14.4545 12C14.4545 10.6444 13.3556 9.54546 12 9.54546C10.6444 9.54546 9.54544 10.6444 9.54544 12C9.54544 13.3556 10.6444 14.4545 12 14.4545Z"
      stroke="currentColor" stroke-width="1.63636" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>
    <path
      d="M18.0545 14.4545C17.9456 14.7013 17.9131 14.9751 17.9613 15.2405C18.0094 15.5059 18.1359 15.7508 18.3245 15.9436L18.3736 15.9927C18.5258 16.1447 18.6465 16.3252 18.7288 16.5238C18.8112 16.7225 18.8536 16.9354 18.8536 17.1505C18.8536 17.3655 18.8112 17.5784 18.7288 17.7771C18.6465 17.9757 18.5258 18.1562 18.3736 18.3082C18.2217 18.4603 18.0412 18.581 17.8425 18.6634C17.6439 18.7457 17.431 18.7881 17.2159 18.7881C17.0009 18.7881 16.7879 18.7457 16.5893 18.6634C16.3906 18.581 16.2102 18.4603 16.0582 18.3082L16.0091 18.2591C15.8163 18.0705 15.5714 17.9439 15.3059 17.8958C15.0405 17.8477 14.7668 17.8802 14.52 17.9891C14.278 18.0928 14.0716 18.265 13.9263 18.4845C13.7809 18.704 13.7029 18.9613 13.7018 19.2245V19.3636C13.7018 19.7976 13.5294 20.2138 13.2225 20.5207C12.9157 20.8276 12.4994 21 12.0655 21C11.6315 21 11.2152 20.8276 10.9084 20.5207C10.6015 20.2138 10.4291 19.7976 10.4291 19.3636V19.29C10.4228 19.0192 10.3351 18.7565 10.1775 18.5362C10.0199 18.3159 9.79969 18.1481 9.54545 18.0545C9.29868 17.9456 9.02493 17.9131 8.75952 17.9613C8.4941 18.0094 8.24919 18.1359 8.05636 18.3245L8.00727 18.3736C7.8553 18.5258 7.67483 18.6465 7.47617 18.7288C7.27752 18.8112 7.06459 18.8536 6.84955 18.8536C6.6345 18.8536 6.42157 18.8112 6.22292 18.7288C6.02426 18.6465 5.84379 18.5258 5.69182 18.3736C5.53967 18.2217 5.41898 18.0412 5.33663 17.8425C5.25428 17.6439 5.21189 17.431 5.21189 17.2159C5.21189 17.0009 5.25428 16.7879 5.33663 16.5893C5.41898 16.3906 5.53967 16.2102 5.69182 16.0582L5.74091 16.0091C5.92953 15.8163 6.05606 15.5714 6.10419 15.3059C6.15231 15.0405 6.11982 14.7668 6.01091 14.52C5.90719 14.278 5.73498 14.0716 5.51547 13.9263C5.29596 13.7809 5.03873 13.7029 4.77545 13.7018H4.63636C4.20237 13.7018 3.78616 13.5294 3.47928 13.2225C3.1724 12.9157 3 12.4994 3 12.0655C3 11.6315 3.1724 11.2152 3.47928 10.9084C3.78616 10.6015 4.20237 10.4291 4.63636 10.4291H4.71C4.98081 10.4228 5.24346 10.3351 5.46379 10.1775C5.68412 10.0199 5.85195 9.79969 5.94545 9.54545C6.05437 9.29868 6.08686 9.02493 6.03873 8.75952C5.99061 8.4941 5.86408 8.24919 5.67545 8.05636L5.62636 8.00727C5.47422 7.8553 5.35352 7.67483 5.27118 7.47617C5.18883 7.27752 5.14644 7.06459 5.14644 6.84955C5.14644 6.6345 5.18883 6.42157 5.27118 6.22292C5.35352 6.02426 5.47422 5.84379 5.62636 5.69182C5.77834 5.53967 5.95881 5.41898 6.15746 5.33663C6.35611 5.25428 6.56905 5.21189 6.78409 5.21189C6.99913 5.21189 7.21207 5.25428 7.41072 5.33663C7.60937 5.41898 7.78984 5.53967 7.94182 5.69182L7.99091 5.74091C8.18374 5.92953 8.42865 6.05606 8.69406 6.10419C8.95948 6.15231 9.23322 6.11982 9.48 6.01091H9.54545C9.78745 5.90719 9.99383 5.73498 10.1392 5.51547C10.2846 5.29596 10.3626 5.03873 10.3636 4.77545V4.63636C10.3636 4.20237 10.536 3.78616 10.8429 3.47928C11.1498 3.1724 11.566 3 12 3C12.434 3 12.8502 3.1724 13.1571 3.47928C13.464 3.78616 13.6364 4.20237 13.6364 4.63636V4.71C13.6374 4.97328 13.7154 5.23051 13.8608 5.45002C14.0062 5.66953 14.2126 5.84174 14.4545 5.94545C14.7013 6.05437 14.9751 6.08686 15.2405 6.03873C15.5059 5.99061 15.7508 5.86408 15.9436 5.67545L15.9927 5.62636C16.1447 5.47422 16.3252 5.35352 16.5238 5.27118C16.7225 5.18883 16.9354 5.14644 17.1505 5.14644C17.3655 5.14644 17.5784 5.18883 17.7771 5.27118C17.9757 5.35352 18.1562 5.47422 18.3082 5.62636C18.4603 5.77834 18.581 5.95881 18.6634 6.15746C18.7457 6.35611 18.7881 6.56905 18.7881 6.78409C18.7881 6.99913 18.7457 7.21207 18.6634 7.41072C18.581 7.60937 18.4603 7.78984 18.3082 7.94182L18.2591 7.99091C18.0705 8.18374 17.9439 8.42865 17.8958 8.69406C17.8477 8.95948 17.8802 9.23322 17.9891 9.48V9.54545C18.0928 9.78745 18.265 9.99383 18.4845 10.1392C18.704 10.2846 18.9613 10.3626 19.2245 10.3636H19.3636C19.7976 10.3636 20.2138 10.536 20.5207 10.8429C20.8276 11.1498 21 11.566 21 12C21 12.434 20.8276 12.8502 20.5207 13.1571C20.2138 13.464 19.7976 13.6364 19.3636 13.6364H19.29C19.0267 13.6374 18.7695 13.7154 18.55 13.8608C18.3305 14.0062 18.1583 14.2126 18.0545 14.4545Z"
      stroke="currentColor" stroke-width="1.63636" stroke-linecap="round" stroke-linejoin="round"  fill="none" />`
}, pg = {
  name: "settings-dark",
  style: "line",
  path: `
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M12.6242 4H10.9557C10.7047 4.00516 10.4623 4.09264 10.2657 4.24896C10.0693 4.4054 9.92973 4.62203 9.86844 4.86559L9.74211 5.34388C9.6845 5.56196 9.5284 5.74052 9.31996 5.82676C9.11165 5.91312 8.87494 5.89706 8.68008 5.78353L8.25268 5.53479C8.03179 5.40284 7.77284 5.34905 7.51758 5.38218C7.26244 5.41519 7.02572 5.53333 6.84582 5.71727L5.71744 6.84576H5.71755C5.53361 7.02577 5.41569 7.26238 5.38258 7.51752C5.34946 7.77267 5.40324 8.03152 5.53508 8.25239L5.78314 8.67968C5.89668 8.87452 5.91274 9.11125 5.82649 9.31968C5.74013 9.52799 5.56147 9.68421 5.34337 9.7417L4.86566 9.86838C4.61613 9.93137 4.39514 10.0764 4.23814 10.2802C4.08114 10.484 3.99726 10.7347 4.00007 10.992V12.5882C3.99726 12.8454 4.08115 13.0961 4.23814 13.3C4.39513 13.5038 4.61612 13.6488 4.86566 13.7118L5.34418 13.838C5.56226 13.8954 5.74094 14.0515 5.8273 14.2598C5.91354 14.4683 5.89748 14.705 5.78384 14.8998L5.53521 15.3272C5.40337 15.5482 5.34958 15.8071 5.38271 16.0623C5.41583 16.3175 5.53375 16.5541 5.71768 16.7341L6.84606 17.8626C7.02596 18.0465 7.26257 18.1646 7.51783 18.1977C7.77297 18.2308 8.03193 18.1771 8.25281 18.0452L8.68021 17.7961C8.87516 17.6827 9.1119 17.6667 9.32021 17.7531C9.52864 17.8394 9.68474 18.0181 9.74235 18.2362L9.86846 18.7143C9.93146 18.9638 10.0764 19.1848 10.2803 19.3418C10.4841 19.4988 10.7348 19.5827 10.9921 19.5799H12.5879C12.8452 19.5827 13.0959 19.4989 13.2998 19.3419C13.5036 19.1848 13.6487 18.9638 13.7116 18.7143L13.8379 18.236C13.8955 18.0179 14.0516 17.8392 14.2599 17.753C14.4682 17.6666 14.7049 17.6824 14.8999 17.796L15.3275 18.0449V18.0448C15.5484 18.1769 15.8074 18.2307 16.0625 18.1976C16.3178 18.1644 16.5544 18.0464 16.7343 17.8624L17.8624 16.7339C18.0464 16.554 18.1645 16.3174 18.1976 16.0622C18.2308 15.8071 18.177 15.5481 18.0451 15.3272L17.7969 14.8997C17.6833 14.7048 17.6673 14.468 17.7535 14.2597C17.8399 14.0513 18.0185 13.8952 18.2366 13.8376L18.7143 13.7115C18.9639 13.6485 19.1849 13.5034 19.3419 13.2996C19.4989 13.0957 19.5827 12.8451 19.5799 12.5878V10.9917C19.5827 10.7344 19.499 10.4836 19.342 10.2798C19.1849 10.076 18.9639 9.9309 18.7143 9.86802L18.2357 9.74169C18.0176 9.68419 17.839 9.5281 17.7527 9.31978C17.6664 9.11135 17.6824 8.87464 17.7961 8.67978L18.0448 8.25215V8.25226C18.1767 8.03125 18.2303 7.77242 18.1972 7.51728C18.1641 7.26213 18.0461 7.02553 17.8621 6.84563L16.734 5.71713V5.71702C16.5541 5.53308 16.3173 5.41505 16.0621 5.38205C15.8069 5.34892 15.548 5.40271 15.327 5.53466L14.8999 5.78306C14.7051 5.89648 14.4685 5.91243 14.2602 5.82619C14.0517 5.74005 13.8956 5.5615 13.8379 5.34353L13.7116 4.86559C13.6504 4.62201 13.5108 4.40527 13.3143 4.24885C13.1179 4.09253 12.8753 4.00504 12.6243 3.99999L12.6242 4ZM11.79 14.5225C11.0652 14.5225 10.37 14.2346 9.85752 13.722C9.34499 13.2094 9.05705 12.5142 9.05705 11.7895C9.05716 11.0646 9.34511 10.3696 9.85763 9.85703C10.3702 9.3445 11.0654 9.05667 11.7902 9.05667C12.515 9.05679 13.2101 9.34473 13.7226 9.85738C14.235 10.3699 14.523 11.0652 14.5229 11.7899C14.5222 12.5145 14.234 13.2092 13.7216 13.7215C13.2092 14.2338 12.5145 14.5218 11.79 14.5225H11.79ZM11.79 8.61728V8.61717C12.6314 8.61717 13.4384 8.95137 14.0333 9.54632C14.6283 10.1413 14.9626 10.9482 14.9627 11.7896C14.9627 12.6311 14.6285 13.438 14.0336 14.033C13.4386 14.6279 12.6317 14.9622 11.7903 14.9624C10.9488 14.9624 10.1419 14.6282 9.54692 14.0332C8.95197 13.4383 8.61765 12.6314 8.61754 11.7899C8.61855 10.9488 8.95298 10.1424 9.5477 9.54756C10.1424 8.95281 10.9488 8.61818 11.79 8.61717V8.61728Z"
      fill="currentColor" />`
}, vg = {
  name: "search-normal",
  style: "line",
  path: `
    <path
      d="M9.58329 17.5C13.9555 17.5 17.5 13.9556 17.5 9.58332C17.5 5.21107 13.9555 1.66666 9.58329 1.66666C5.21104 1.66666 1.66663 5.21107 1.66663 9.58332C1.66663 13.9556 5.21104 17.5 9.58329 17.5Z"
      stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"  fill="none" />
    <path d="M18.3333 18.3333L16.6666 16.6667" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"
      stroke-linejoin="round"  />`
}, gg = {
  name: "search",
  style: "line",
  path: `
<path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>
  <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>`
}, mg = {
  name: "filter",
  style: "line",
  path: `
<path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>`
}, yg = {
  name: "bg-not-content",
  style: "line",
  path: `
<path d="M106.375 87.875C106.375 90.3283 105.4 92.681 103.666 94.4157C101.931 96.1504 99.5783 97.125 97.125 97.125H13.875C11.4217 97.125 9.06897 96.1504 7.33426 94.4157C5.59955 92.681 4.625 90.3283 4.625 87.875V37C4.625 34.5467 5.59955 32.194 7.33426 30.4593C9.06897 28.7246 11.4217 27.75 13.875 27.75H32.375L41.625 13.875H69.375L78.625 27.75H97.125C99.5783 27.75 101.931 28.7246 103.666 30.4593C105.4 32.194 106.375 34.5467 106.375 37V87.875Z" stroke="currentColor" stroke-width="9.25" stroke-linecap="round" stroke-linejoin="round"  fill="none"/>
<path d="M55.5 78.625C65.7173 78.625 74 70.3423 74 60.125C74 49.9077 65.7173 41.625 55.5 41.625C45.2827 41.625 37 49.9077 37 60.125C37 70.3423 45.2827 78.625 55.5 78.625Z" stroke="currentColor" stroke-width="9.25" stroke-linecap="round" stroke-linejoin="round"  fill="none" />`
}, _g = {
  name: "document",
  style: "line",
  path: `
    <path d="M8.71429 16.6428H14.2857M8.71429 13.8571H14.2857M12.4289 3.64363C12.3402 3.64282 12.2404 3.64282 12.1265 3.64282H7.97161C6.93151 3.64282 6.41108 3.64282 6.01381 3.84524C5.66437 4.02329 5.38047 4.30719 5.20242 4.65663C5 5.0539 5 5.57433 5 6.61443V17.3859C5 18.426 5 18.9457 5.20242 19.343C5.38047 19.6924 5.66437 19.9768 6.01381 20.1549C6.41069 20.3571 6.9305 20.3571 7.96859 20.3571L15.0314 20.3571C16.0695 20.3571 16.5886 20.3571 16.9854 20.1549C17.3349 19.9768 17.6197 19.6924 17.7978 19.343C18 18.9461 18 18.4271 18 17.389V9.51667C18 9.40277 17.9999 9.30296 17.9991 9.21425M12.4289 3.64363C12.694 3.64605 12.861 3.65588 13.0212 3.69433C13.2107 3.73982 13.3923 3.81485 13.5585 3.91668C13.7458 4.03149 13.9067 4.19236 14.2277 4.51336L17.1299 7.41559C17.4511 7.73679 17.6108 7.89694 17.7257 8.08436C17.8275 8.25052 17.9028 8.4317 17.9483 8.6212C17.9868 8.78134 17.9967 8.94919 17.9991 9.21425M12.4289 3.64363L12.4286 6.24302C12.4286 7.28311 12.4286 7.80296 12.631 8.20023C12.809 8.54967 13.0929 8.83398 13.4424 9.01203C13.8393 9.21425 14.3591 9.21425 15.3971 9.21425H17.9991" stroke="currentColor" stroke-width="0.928571" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  `
}, Cg = {
  name: "base-detail",
  style: "line",
  fill: "none",
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.39106 17C9.26443 17 9.1676 16.9625 9.10056 16.8876C9.03352 16.8127 9 16.7079 9 16.573V15.1798C9 14.8802 9.14898 14.7303 9.44693 14.7303H9.98324L9.44693 14.9213C9.64804 14.6517 9.80819 14.3596 9.92737 14.0449C10.054 13.7228 10.1471 13.3633 10.2067 12.9663C10.2663 12.5693 10.2961 12.1161 10.2961 11.6067V10.5169C10.2961 10.3446 10.3408 10.2172 10.4302 10.1348C10.5196 10.0449 10.6462 10 10.8101 10H13.6257C13.797 10 13.9237 10.0449 14.0056 10.1348C14.095 10.2172 14.1397 10.3446 14.1397 10.5169V15.1461L13.7263 14.7303H14.5531C14.6946 14.7303 14.8026 14.7678 14.8771 14.8427C14.959 14.9176 15 15.03 15 15.1798V16.573C15 16.8577 14.8696 17 14.6089 17C14.4823 17 14.3855 16.9625 14.3184 16.8876C14.2514 16.8127 14.2179 16.7079 14.2179 16.573V15.4607H9.77095V16.573C9.77095 16.8577 9.64432 17 9.39106 17ZM10.4413 14.7303H13.2793V10.7191H11.1006V11.764C11.1006 12.3258 11.0447 12.8689 10.933 13.3933C10.8212 13.9101 10.6574 14.3558 10.4413 14.7303Z" fill="currentColor"/>
`
}, bg = {
  name: "add-plus",
  style: "line",
  path: `
   <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
`
}, wg = {
  name: "close-vision",
  style: "line",
  path: `
   <g clip-path="url(#clip0_2721_198626)">
<path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M1 1L23 23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</g>
<defs>
<clipPath id="clip0_2721_198626" >
<rect width="24" height="24" fill="currentColor"/>
</clipPath>
</defs>
`
}, kg = {
  name: "deleteSmall",
  style: "line",
  fill: "none",
  path: `
<path d="M4.5 7.87256H5.77778H19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 7.87256V19.1726C18 19.6234 17.8194 20.0558 17.4979 20.3746C17.1764 20.6935 16.7404 20.8726 16.2857 20.8726H7.71429C7.25963 20.8726 6.82359 20.6935 6.5021 20.3746C6.18061 20.0558 6 19.6234 6 19.1726V7.87256M8.57143 7.27256V5.57256C8.57143 5.12169 8.75204 4.68929 9.07353 4.37048C9.39502 4.05167 9.83106 3.87256 10.2857 3.87256H13.7143C14.1689 3.87256 14.605 4.05167 14.9265 4.37048C15.248 4.68929 15.4286 5.12169 15.4286 5.57256V7.27256" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 11.8726V16.8726" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 11.8726V16.8726" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `
}, $g = {
  name: "openVision",
  style: "line",
  path: `
   <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
`
}, Mg = {
  name: "trash",
  style: "line",
  path: `
   <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
<path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
`
}, Dg = {
  name: "trashSmall",
  style: "line",
  path: `
    <path d="M4.5 7H5.77778H19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18 7V18.3C18 18.7509 17.8194 19.1833 17.4979 19.5021C17.1764 19.8209 16.7404 20 16.2857 20H7.71429C7.25963 20 6.82359 19.8209 6.5021 19.5021C6.18061 19.1833 6 18.7509 6 18.3V7M8.57143 6.4V4.7C8.57143 4.24913 8.75204 3.81673 9.07353 3.49792C9.39502 3.17911 9.83106 3 10.2857 3H13.7143C14.1689 3 14.605 3.17911 14.9265 3.49792C15.248 3.81673 15.4286 4.24913 15.4286 4.7V6.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10 11V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 11V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  `
}, Sg = {
  name: "printer",
  style: "line",
  viewbox: "0 0 16 16",
  path: `
   <g clip-path="url(#clip0_2392_27633)">
<path d="M4 5.99998V1.33331H12V5.99998" stroke="currentColor" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M4.00001 12H2.66668C2.31305 12 1.97392 11.8595 1.72387 11.6095C1.47382 11.3594 1.33334 11.0203 1.33334 10.6667V7.33333C1.33334 6.97971 1.47382 6.64057 1.72387 6.39052C1.97392 6.14048 2.31305 6 2.66668 6H13.3333C13.687 6 14.0261 6.14048 14.2762 6.39052C14.5262 6.64057 14.6667 6.97971 14.6667 7.33333V10.6667C14.6667 11.0203 14.5262 11.3594 14.2762 11.6095C14.0261 11.8595 13.687 12 13.3333 12H12" stroke="currentColor" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M12 9.33331H4V14.6666H12V9.33331Z" stroke="currentColor" stroke-width="1.375" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
<defs>
<clipPath id="clip0_2392_27633">
<rect width="16" height="16" fill="currentColor"/>
</clipPath>
</defs>
`
}, Og = {
  name: "upload-cloud",
  style: "line",
  viewbox: "0 0 16 16",
  path: `
<path d="M10.6667 10.6667L8.00001 8L5.33334 10.6667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"fill="none" />
<path d="M8 8V14" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
<path d="M13.5936 12.26C14.2439 11.9055 14.7575 11.3446 15.0536 10.6658C15.3496 9.98692 15.4111 9.22883 15.2284 8.51114C15.0458 7.79344 14.6293 7.15702 14.0448 6.70231C13.4602 6.2476 12.7409 6.0005 12.0003 6.00001H11.1603C10.9585 5.2195 10.5824 4.4949 10.0603 3.88067C9.53813 3.26644 8.88354 2.77858 8.14571 2.45375C7.40788 2.12892 6.60601 1.97558 5.80039 2.00526C4.99477 2.03495 4.20635 2.24688 3.49443 2.62512C2.7825 3.00336 2.16558 3.53808 1.69006 4.18906C1.21453 4.84005 0.892769 5.59037 0.748962 6.38361C0.605156 7.17684 0.643046 7.99236 0.859785 8.76885C1.07652 9.54534 1.46647 10.2626 2.00031 10.8667" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M10.6667 10.6667L8.00001 8L5.33334 10.6667" stroke="blacurrentColorck" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
`
}, Lg = {
  name: "archive",
  style: "line",
  viewbox: "0 0 16 13",
  path: `
    <path d="M14 5.33344V13.2001C14 13.6419 13.6418 14.0001 13.2 14.0001H2.8C2.35817 14.0001 2 13.6419 2 13.2001V5.33344" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M14.5332 2H1.4665C1.02468 2 0.666504 2.35817 0.666504 2.8V4.53333C0.666504 4.97516 1.02468 5.33333 1.4665 5.33333H14.5332C14.975 5.33333 15.3332 4.97516 15.3332 4.53333V2.8C15.3332 2.35817 14.975 2 14.5332 2Z" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M6.6665 8H9.33317" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  `
}, xg = {
  name: "menu-close",
  style: "line",
  path: `
   <path d="M11 17L6 12L11 6.99997" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M17.9998 17L12.9998 12L17.9998 6.99997" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
`
}, Tg = {
  name: "menu-open",
  style: "line",
  path: `
   <path d="M17 9.99997H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M21 6H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M21 14H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M17 18H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
`
}, Ag = {
  name: "book-open",
  style: "line",
  path: `
<g id="menu/bookOpen">
<path id="Vector" d="M11.5 10.4799V20M11.5 10.4799C11.5 8.91171 11.5 8.12795 11.7725 7.52899C12.0122 7.00213 12.3943 6.57363 12.8647 6.30519C13.3995 6 14.0997 6 15.4998 6H17.6665C18.1332 6 18.3667 6 18.545 6.10173C18.7018 6.19121 18.829 6.33389 18.9089 6.50951C18.9997 6.70917 19 6.97072 19 7.49344V15.7069C19 16.2296 18.9997 16.4906 18.9089 16.6903C18.829 16.8659 18.7021 17.009 18.5453 17.0985C18.3672 17.2001 18.1342 17.2001 17.6684 17.2001H15.3078C14.5251 17.2001 14.1331 17.2001 13.7778 17.321C13.4634 17.4279 13.1714 17.6031 12.9175 17.8368C12.6307 18.1008 12.4134 18.4655 11.9792 19.1949L11.5 20M11.5 10.4799C11.5 8.91171 11.4999 8.12795 11.2274 7.52899C10.9877 7.00213 10.6052 6.57363 10.1348 6.30519C9.60003 6 8.89981 6 7.49967 6H5.33301C4.8663 6 4.63318 6 4.45492 6.10173C4.29811 6.19121 4.17072 6.33389 4.09083 6.50951C4 6.70917 4 6.97072 4 7.49344V15.7069C4 16.2296 4 16.4906 4.09083 16.6903C4.17072 16.8659 4.29811 17.009 4.45492 17.0985C4.633 17.2001 4.86584 17.2001 5.33164 17.2001H7.69227C8.47495 17.2001 8.86618 17.2001 9.2214 17.321C9.53588 17.4279 9.82927 17.6031 10.0832 17.8368C10.3688 18.0997 10.5848 18.4626 11.0154 19.186L11.5 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
}, Pg = {
  name: "chart-line",
  style: "line",
  path: `
<g id="menu/chartLine">
<path id="Vector" d="M5 14.6669V16.2267C5 17.1974 5 17.6825 5.16954 18.0532C5.31868 18.3794 5.55647 18.6451 5.84917 18.8113C6.18159 19 6.61698 19 7.48646 19H19M5 14.6669V6M5 14.6669L7.99705 11.8839L7.99953 11.8816C8.5417 11.3782 8.81331 11.126 9.10782 11.0235C9.45574 10.9025 9.8305 10.9217 10.1672 11.0773C10.4526 11.2092 10.7028 11.4881 11.2033 12.0458L11.2083 12.0514C11.7166 12.6177 11.9714 12.9017 12.2614 13.0333C12.6045 13.1891 12.9865 13.2025 13.3382 13.0725C13.6364 12.9623 13.9087 12.6972 14.4532 12.1663L18.9998 7.73333" stroke="currentColor" stroke-width="0.888879" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
}, Ig = {
  name: "marriage",
  style: "line",
  path: `
<g id="menu/marriage">
<path id="Vector" d="M6 9.81909V17.6353C6 18.5767 6 19.0471 6.18321 19.4067C6.34436 19.723 6.60132 19.9806 6.91761 20.1418C7.27682 20.3248 7.74731 20.3248 8.68687 20.3248H13.3986C14.3382 20.3248 14.808 20.3248 15.1672 20.1418C15.4835 19.9806 15.7413 19.723 15.9025 19.4067C16.0855 19.0475 16.0855 18.5775 16.0855 17.6379V9.81909" stroke="currentColor" stroke-width="0.840457" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path id="Vector_2" d="M6.80635 5.33121L8.54187 5.84109M6.80635 5.33121L5.99997 5.0943M6.80635 5.33121L8.41911 5.80502M8.54187 5.84109L14.8701 7.70027M8.54187 5.84109C8.76264 5.08964 8.75021 4.67803 8.96004 4.41772M14.8701 7.70027L16.4829 8.17408L17.2893 8.41099M14.8701 7.70027C15.0909 6.94882 15.2011 6.57326 15.1654 6.24081C15.1179 5.79756 14.8963 5.39119 14.5492 5.11141C14.2889 4.90157 13.9132 4.79119 13.1617 4.57042L11.549 4.09661C10.7975 3.87584 10.4216 3.76539 10.0891 3.80108C9.64587 3.84867 9.23982 4.07064 8.96004 4.41772M14.8701 7.70027L8.41911 5.80502M8.96004 4.41772C8.75021 4.67803 8.63988 5.05357 8.41911 5.80502" stroke="currentColor" stroke-width="0.840457" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<g id="Vector 1">
<path d="M9.7821 12.3404V13.1809H11.0428V11.9202H9.7821V12.3404Z" fill="currentColor"/>
<path d="M9.7821 13.1809V12.3404V11.9202M9.7821 13.1809H11.0428V11.9202H9.7821M9.7821 13.1809V11.9202" stroke="currentColor" stroke-width="0.840457"/>
</g>
<g id="Vector 3">
<path d="M8.32306 8.45776L8.03974 8.72483L8.47973 9.19158L8.90471 8.79097L8.46472 8.32422L8.32306 8.45776Z" fill="currentColor"/>
<path d="M8.03974 8.72483L8.32306 8.45776L8.46472 8.32422M8.03974 8.72483L8.47973 9.19158L8.90471 8.79097L8.46472 8.32422M8.03974 8.72483L8.46472 8.32422" stroke="currentColor" stroke-width="0.840457"/>
</g>
<g id="Vector 2">
<path d="M9.72908 16.4218L9.36181 17.0202L10.3551 17.6298L10.906 16.7322L9.91272 16.1226L9.72908 16.4218Z" fill="currentColor"/>
<path d="M9.36181 17.0202L9.72908 16.4218L9.91272 16.1226M9.36181 17.0202L10.3551 17.6298L10.906 16.7322L9.91272 16.1226M9.36181 17.0202L9.91272 16.1226" stroke="currentColor" stroke-width="0.840457"/>
</g>
<g id="Vector 4">
<path d="M13.2956 13.7254L13.0532 13.824L13.2275 14.2525L13.591 14.1047L13.4167 13.6761L13.2956 13.7254Z" fill="currentColor"/>
<path d="M13.0532 13.824L13.2956 13.7254L13.4167 13.6761M13.0532 13.824L13.2275 14.2525L13.591 14.1047L13.4167 13.6761M13.0532 13.824L13.4167 13.6761" stroke="currentColor" stroke-width="0.840457"/>
</g>
</g>
`
}, Eg = {
  name: "base-of-assembly-units",
  style: "line",
  fill: "none",
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.571 17c-.736 0-1.372-.148-1.906-.444a3.116 3.116 0 0 1-1.241-1.237C9.14 14.782 9 14.162 9 13.46c0-.538.08-1.02.242-1.445a2.87 2.87 0 0 1 .711-1.083 3.085 3.085 0 0 1 1.12-.695A4.463 4.463 0 0 1 12.571 10c.363 0 .742.05 1.135.153a2.94 2.94 0 0 1 1.075.528.45.45 0 0 1 .196.236c.03.092.03.185 0 .277a.559.559 0 0 1-.151.223.492.492 0 0 1-.59 0 2.554 2.554 0 0 0-.802-.39 2.995 2.995 0 0 0-.787-.11c-.393 0-.736.06-1.03.18-.292.111-.539.273-.74.486a2.195 2.195 0 0 0-.47.792 3.6 3.6 0 0 0-.151 1.097c0 .806.207 1.445.62 1.917.414.463 1.004.694 1.77.694a2.831 2.831 0 0 0 1.59-.5.492.492 0 0 1 .318-.097c.1.01.186.046.257.111.07.056.116.13.136.222.03.093.03.186 0 .278a.46.46 0 0 1-.197.222 3.29 3.29 0 0 1-1.059.528 4.35 4.35 0 0 1-1.12.153Z" fill="currentColor"/>
  `
}, Hg = {
  name: "equipment-base",
  style: "line",
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M12 17C11.3879 17 10.8578 16.836 10.4095 16.5079C9.96121 16.1799 9.61207 15.7196 9.36207 15.127C9.12069 14.5238 9 13.8148 9 13C9 12.3862 9.06897 11.836 9.2069 11.3492C9.34483 10.8519 9.54741 10.4286 9.81466 10.0794C10.0819 9.73016 10.3966 9.46561 10.7586 9.28572C11.1293 9.09524 11.5431 9 12 9C12.6121 9 13.1422 9.16402 13.5905 9.49206C14.0388 9.82011 14.3836 10.2857 14.625 10.8889C14.875 11.4815 15 12.1852 15 13C15 13.6138 14.931 14.164 14.7931 14.6508C14.6552 15.1376 14.4526 15.5608 14.1853 15.9206C13.9181 16.2698 13.5991 16.5397 13.2284 16.7302C12.8664 16.9101 12.4569 17 12 17ZM12 15.9683C12.3879 15.9683 12.7284 15.8519 13.0216 15.619C13.3147 15.3862 13.5388 15.0476 13.694 14.6032C13.8578 14.1587 13.9397 13.6243 13.9397 13C13.9397 12.037 13.7629 11.3016 13.4095 10.7937C13.0647 10.2857 12.5948 10.0317 12 10.0317C11.6034 10.0317 11.2586 10.1481 10.9655 10.381C10.681 10.6032 10.4569 10.9365 10.2931 11.381C10.1379 11.8148 10.0603 12.3545 10.0603 13C10.0603 13.9524 10.2371 14.6878 10.5905 15.2063C10.944 15.7143 11.4138 15.9683 12 15.9683Z" fill="currentColor"/>
`
}, Rg = {
  name: "supplier-database",
  style: "line",
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M9.58019 16C9.39151 16 9.24528 15.9554 9.14151 15.8661C9.04717 15.7769 9 15.6511 9 15.4888V10.5598C9 10.3732 9.0566 10.2353 9.16981 10.146C9.28302 10.0487 9.4434 10 9.65094 10H14.3491C14.5566 10 14.717 10.0487 14.8302 10.146C14.9434 10.2353 15 10.3732 15 10.5598V15.4888C15 15.6511 14.9481 15.7769 14.8443 15.8661C14.7406 15.9554 14.5991 16 14.4198 16C14.2406 16 14.0991 15.9554 13.9953 15.8661C13.9009 15.7769 13.8538 15.6511 13.8538 15.4888V10.7911H10.1462V15.4888C10.1462 15.6511 10.0991 15.7769 10.0047 15.8661C9.91038 15.9554 9.76887 16 9.58019 16Z" fill="currentColor"/>
`
}, Vg = {
  name: "the-database-of-materials",
  style: "line",
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M9.432 16C9.296 16 9.188 15.96 9.108 15.88C9.036 15.792 9 15.676 9 15.532V10.516C9 10.404 9.016 10.312 9.048 10.24C9.08 10.16 9.128 10.1 9.192 10.06C9.256 10.02 9.336 10 9.432 10C9.528 10 9.608 10.016 9.672 10.048C9.736 10.072 9.792 10.112 9.84 10.168C9.888 10.216 9.928 10.276 9.96 10.348L12 13.984L14.04 10.348C14.072 10.276 14.112 10.216 14.16 10.168C14.208 10.112 14.264 10.072 14.328 10.048C14.392 10.016 14.468 10 14.556 10C14.7 10 14.808 10.044 14.88 10.132C14.952 10.212 14.988 10.34 14.988 10.516V15.532C14.988 15.676 14.952 15.792 14.88 15.88C14.808 15.96 14.7 16 14.556 16C14.42 16 14.312 15.96 14.232 15.88C14.16 15.792 14.124 15.676 14.124 15.532V11.2H14.4L12.348 14.8C12.316 14.864 12.272 14.92 12.216 14.968C12.16 15.008 12.088 15.028 12 15.028C11.904 15.028 11.828 15.004 11.772 14.956C11.724 14.908 11.68 14.856 11.64 14.8L9.588 11.2H9.864V15.532C9.864 15.676 9.824 15.792 9.744 15.88C9.672 15.96 9.568 16 9.432 16Z" fill="currentColor"/>
`
}, Yg = {
  name: "the-base-of-the-tool",
  style: "line",
  fill: "none",
  path: `
<path d="M19 6.57576V14.5V17.9091C19 19.6162 15.866 21 12 21C8.13401 21 5 19.6162 5 17.9091V14.5V6.57576M19 6.57576C19 4.8687 15.866 4 12 4C8.13401 4 5 4.8687 5 6.57576M19 6.57576C19 7.5 15.866 8.5 12 8.5C8.13401 8.5 5 7.5 5 6.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.52358 17C9.41981 17 9.32547 16.98 9.24057 16.94C9.16509 16.908 9.10377 16.852 9.0566 16.772C9.01887 16.692 9 16.592 9 16.472V11.48C9 11.32 9.04717 11.2 9.14151 11.12C9.23585 11.04 9.36321 11 9.52358 11C9.6934 11 9.82075 11.04 9.90566 11.12C10 11.2 10.0472 11.32 10.0472 11.48V15.992H9.6934L13.8113 11.312C13.8868 11.224 13.9764 11.152 14.0802 11.096C14.184 11.032 14.316 11 14.4764 11C14.5896 11 14.684 11.016 14.7594 11.048C14.8349 11.08 14.8915 11.136 14.9292 11.216C14.9764 11.288 15 11.388 15 11.516V16.52C15 16.672 14.9528 16.792 14.8585 16.88C14.7736 16.96 14.6462 17 14.4764 17C14.3066 17 14.1745 16.96 14.0802 16.88C13.9953 16.792 13.9528 16.672 13.9528 16.52V11.996H14.4764L10.1745 16.688C10.1085 16.768 10.0236 16.84 9.91981 16.904C9.82547 16.968 9.6934 17 9.52358 17Z" fill="currentColor"/>
`
}, Bg = {
  name: "file-database",
  style: "line",
  path: `
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M12.0055 18C11.858 18 11.7437 17.957 11.6625 17.8711C11.5814 17.7852 11.5408 17.6641 11.5408 17.5078V16.7344L11.7953 17.0039H11.5187C10.7884 17.0039 10.1614 16.8594 9.63762 16.5703C9.11388 16.2813 8.70816 15.875 8.42047 15.3516C8.14016 14.8203 8 14.1914 8 13.4648C8 12.9102 8.07746 12.4141 8.23237 11.9766C8.38728 11.5391 8.61595 11.1719 8.9184 10.875C9.22084 10.5703 9.58967 10.3398 10.0249 10.1836C10.4601 10.0195 10.958 9.9375 11.5187 9.9375H11.7953L11.5408 10.207V9.49219C11.5408 9.32812 11.5814 9.20703 11.6625 9.12891C11.7437 9.04297 11.858 9 12.0055 9C12.1531 9 12.2637 9.04297 12.3375 9.12891C12.4186 9.20703 12.4592 9.32812 12.4592 9.49219V10.207L12.2158 9.9375H12.4924C13.2374 9.9375 13.8718 10.0781 14.3956 10.3594C14.9193 10.6406 15.3177 11.0469 15.5906 11.5781C15.8635 12.1016 16 12.7305 16 13.4648C16 14.0117 15.9189 14.5039 15.7566 14.9414C15.6017 15.3789 15.373 15.75 15.0705 16.0547C14.7681 16.3594 14.3993 16.5938 13.964 16.7578C13.5288 16.9219 13.0383 17.0039 12.4924 17.0039H12.2158L12.4592 16.7344V17.5078C12.4592 17.6641 12.4223 17.7852 12.3485 17.8711C12.2748 17.957 12.1604 18 12.0055 18ZM11.5519 16.4297V10.5117L11.7732 10.7109H11.3859C11.0171 10.7109 10.6814 10.7734 10.379 10.8984C10.0765 11.0156 9.81835 11.1914 9.60443 11.4258C9.3905 11.6602 9.22453 11.9492 9.1065 12.293C8.99585 12.6289 8.94053 13.0195 8.94053 13.4648C8.94053 14.0352 9.0438 14.5273 9.25035 14.9414C9.45689 15.3555 9.74458 15.6719 10.1134 15.8906C10.4822 16.1094 10.9064 16.2188 11.3859 16.2188H11.7732L11.5519 16.4297ZM12.4592 16.4297L12.2268 16.2188H12.6141C12.9756 16.2188 13.3075 16.1562 13.61 16.0312C13.9124 15.9062 14.1706 15.7266 14.3845 15.4922C14.5984 15.25 14.7644 14.9609 14.8824 14.625C15.0005 14.2813 15.0595 13.8945 15.0595 13.4648C15.0595 12.8711 14.9599 12.3711 14.7607 11.9648C14.5615 11.5508 14.2775 11.2383 13.9087 11.0273C13.5473 10.8164 13.1157 10.7109 12.6141 10.7109H12.2268L12.4592 10.5117V16.4297Z" fill="currentColor"/>
`
}, Wg = {
  name: "main-page",
  style: "line",
  path: `
<path d="M4 18.2952H5.6M5.6 18.2952H10.4M5.6 18.2952V11.4955C5.6 11.0705 5.6 10.8578 5.65198 10.66C5.69804 10.4848 5.77423 10.3189 5.87656 10.169C5.99203 9.99986 6.15251 9.85961 6.47422 9.5797L10.3155 6.23759C10.9119 5.7187 11.2101 5.45924 11.5459 5.36048C11.8421 5.27339 12.1578 5.27339 12.4539 5.36048C12.79 5.45931 13.0886 5.71902 13.6859 6.23869L17.5259 9.5797C17.8476 9.8596 18.0082 9.99987 18.1237 10.169C18.226 10.3189 18.3016 10.4848 18.3477 10.66C18.3996 10.8578 18.4 11.0705 18.4 11.4955V18.2952M10.4 18.2952H13.6M10.4 18.2952V15.1133C10.4 14.2346 11.1163 13.5223 12 13.5223C12.8837 13.5223 13.6 14.2346 13.6 15.1133V18.2952M13.6 18.2952H18.4M18.4 18.2952H20" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
`
}, Fg = {
  name: "shopping",
  style: "line",
  path: `
<g id="menu/shopping">
<path id="Vector" d="M15.8918 16.6667C14.9535 16.6667 14.1929 17.4129 14.1929 18.3333C14.1929 19.2538 14.9535 20 15.8918 20C16.83 20 17.5906 19.2538 17.5906 18.3333C17.5906 17.4129 16.83 16.6667 15.8918 16.6667ZM15.8918 16.6667H9.34615C8.95452 16.6667 8.75834 16.6667 8.59711 16.5983C8.45487 16.538 8.33147 16.4409 8.24157 16.3171C8.1408 16.1783 8.10027 15.9928 8.02005 15.6254L5.92942 6.05387C5.84733 5.67803 5.80574 5.49031 5.7038 5.34993C5.61389 5.22612 5.49052 5.12868 5.34828 5.06837C5.18701 5 4.99193 5 4.60014 5H4M6.54823 7.5H17.4829C18.096 7.5 18.4022 7.5 18.608 7.6253C18.7882 7.73505 18.9202 7.90718 18.9777 8.1075C19.0434 8.33619 18.959 8.62497 18.7891 9.20288L17.613 13.2029C17.5114 13.5484 17.4606 13.7209 17.3575 13.8491C17.2665 13.9622 17.1465 14.0508 17.0105 14.1052C16.8568 14.1667 16.6742 14.1667 16.3098 14.1667H8.01811M8.24706 20C7.30882 20 6.54823 19.2538 6.54823 18.3333C6.54823 17.4129 7.30882 16.6667 8.24706 16.6667C9.18529 16.6667 9.94588 17.4129 9.94588 18.3333C9.94588 19.2538 9.18529 20 8.24706 20Z" stroke="currentColor" stroke-width="0.906039" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
}, Ng = {
  name: "shipping-tasks",
  style: "line",
  path: `
<g id="menu/shippingTasks">
<path id="Vector" d="M12 15.6428V10.9286M12 10.9286L9.81818 12.5M12 10.9286L14.1818 12.5M20 14.8571C20 13.1214 18.6976 11.7143 17.0909 11.7143C17.0737 11.7143 17.0569 11.7144 17.0398 11.7147C16.6871 9.04915 14.5649 7 12 7C9.96607 7 8.21105 8.2886 7.3956 10.1513C5.49968 10.2854 4 11.9891 4 14.0713C4 16.241 5.62806 18 7.63636 18L17.0909 17.9999C18.6976 17.9999 20 16.5928 20 14.8571Z" stroke="currentColor" stroke-width="0.863636" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
}, jg = {
  name: "warehouse",
  style: "line",
  path: `
<g id="menu/warehouse">
<path id="Vector" d="M4 19H5.6M5.6 19H14.4M5.6 19V14.4241C5.6 13.9973 5.6 13.7837 5.6504 13.5847C5.69507 13.4082 5.76859 13.2409 5.86797 13.0892C5.98004 12.9182 6.13691 12.775 6.44922 12.49L8.29048 10.81C8.89427 10.2591 9.19639 9.98339 9.53799 9.87881C9.83915 9.78662 10.1606 9.78662 10.4617 9.87881C10.8036 9.98348 11.1061 10.2593 11.7109 10.8111L13.5509 12.49C13.8636 12.7753 14.0196 12.9181 14.1317 13.0892C14.2311 13.2409 14.3046 13.4082 14.3492 13.5847C14.3996 13.7837 14.4 13.9973 14.4 14.4241V19M14.4 19H18.4M18.4 19H20M18.4 19V8.59749C18.4 7.68918 18.4 7.23435 18.2258 6.88708C18.0724 6.58132 17.827 6.33291 17.5259 6.17711C17.1837 6 16.7362 6 15.8402 6H10.5602C9.66407 6 9.2157 6 8.87344 6.17711C8.57238 6.33291 8.32779 6.58132 8.17439 6.88708C8 7.23469 8 7.69007 8 8.60016V10.8752" stroke="currentColor" stroke-width="0.85" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
}, Ug = {
  name: "action",
  style: "line",
  fill: "none",
  path: `
<path d="M13.6153 10.8848L8.15381 10.8848" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.8461 14.1152H8.15381" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.6923 7.65381H9.23073H8.15381" stroke="currentColor" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5715 19H6V6.66683C6 5.73341 6 5.26635 6.21799 4.90983C6.40973 4.59623 6.71547 4.34144 7.0918 4.18166C7.51962 4 8.08009 4 9.20019 4H13.6747C13.7973 4 13.9045 4 14 4.00072" stroke="currentColor" stroke-width="0.942296" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18 12V5.95568C18 5.27117 18 4.92866 17.8365 4.66721C17.6927 4.43723 17.4634 4.25039 17.1812 4.13321C16.8603 4 16.4399 4 15.5999 4H12.244C12.152 4 12.0716 4 12 4.00053" stroke="currentColor" stroke-width="0.942296" stroke-linecap="round" stroke-linejoin="round"/>
<g clip-path="url(#clip0_8085_22453)">
<path d="M15.6923 20.9363C17.6748 20.9363 19.282 19.3291 19.282 17.3466C19.282 15.364 17.6748 13.7568 15.6923 13.7568C13.7097 13.7568 12.1025 15.364 12.1025 17.3466C12.1025 19.3291 13.7097 20.9363 15.6923 20.9363Z" stroke="currentColor" stroke-width="0.861539" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.6924 15.1924V17.3462L17.1283 18.0642" stroke="currentColor" stroke-width="0.861539" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_8085_22453">
<rect width="8.61539" height="8.61539" fill="white" transform="translate(11.3848 13.0386)"/>
</clipPath>
</defs>
`
}, Zg = {
  name: "company",
  style: "line",
  fill: "none",
  path: `
<path d="M0 0H24V24H0V0Z" fill="white" fill-opacity="0.01"/>
<path d="M6 10H10V19H6V10Z" stroke="currentColor" stroke-width="0.691338" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 5H15V19H10V5Z" stroke="currentColor" stroke-width="0.691338" stroke-linejoin="round"/>
<path d="M15 13H19V19H15V13Z" stroke="currentColor" stroke-width="0.691338" stroke-linecap="round" stroke-linejoin="round"/>
`
}, zg = {
  name: "production",
  style: "line",
  path: `
<path d="M14.802 20.7087H4.79445C4.57346 20.7087 4.38403 20.5351 4.38403 20.3327V18.8865C4.38403 18.684 4.57346 18.5105 4.79445 18.5105H14.802C15.023 18.5105 15.2125 18.684 15.2125 18.8865V20.3327C15.1809 20.5351 14.9915 20.7087 14.802 20.7087ZM5.20485 19.9856H14.3601V19.2625H5.20485V19.9856Z" fill="currentColor"/>
<path d="M17.9906 19.2626H14.8021C14.6127 19.2626 14.4548 19.1469 14.4232 18.9734L12.7816 11.7426C12.75 11.6269 12.7816 11.5112 12.8763 11.4533C12.9395 11.3666 13.0657 11.3087 13.192 11.3087H15.9702C16.1596 11.3087 16.3174 11.4244 16.349 11.569L18.3695 18.7998C18.401 18.9155 18.3695 19.0312 18.3063 19.118C18.2116 19.2048 18.0853 19.2626 17.9906 19.2626ZM15.1178 18.5395H17.4855L15.6545 12.0318H13.6024L15.1178 18.5395Z" fill="currentColor"/>
<path d="M14.802 19.2625H4.79445C4.66817 19.2625 4.57346 19.2047 4.47875 19.1179C4.41561 19.0311 4.38403 18.9154 4.38403 18.8287L6.40449 9.80461C6.43606 9.63107 6.59392 9.51538 6.78333 9.51538H12.7816C12.971 9.51538 13.1289 9.63107 13.1604 9.80461L13.5077 11.5979L15.1493 18.8287C15.1809 18.9444 15.1493 19.0601 15.0546 19.1179C15.023 19.2047 14.8968 19.2625 14.802 19.2625ZM5.26799 18.5394H14.2654L12.7184 11.7425L12.4343 10.2385H7.09903L5.26799 18.5394Z" fill="currentColor"/>
<path d="M17.9907 20.7087H14.8021C14.5811 20.7087 14.3917 20.5351 14.3917 20.3327V18.8865C14.3917 18.684 14.5811 18.5105 14.8021 18.5105H17.9907C18.2117 18.5105 18.4011 18.684 18.4011 18.8865V20.3327C18.3695 20.5351 18.1801 20.7087 17.9907 20.7087ZM15.181 19.9856H17.5803V19.2625H15.181V19.9856Z" fill="currentColor"/>
<path d="M17.8747 20.7087H14.4288C14.3012 20.7087 14.1918 20.5448 14.1918 20.3537V18.9884C14.1918 18.7973 14.3012 18.6334 14.4288 18.6334H17.8747C18.0023 18.6334 18.1117 18.7973 18.1117 18.9884V20.3537C18.1117 20.5448 18.0023 20.7087 17.8747 20.7087ZM14.6476 20.026H17.6559V19.3434H14.6476V20.026Z" fill="currentColor"/>
<path d="M12.7816 10.2384H6.81495C6.59397 10.2384 6.40454 10.0649 6.40454 9.86245V8.41628C6.40454 8.21382 6.59397 8.04028 6.81495 8.04028H12.7816C13.0026 8.04028 13.192 8.21382 13.192 8.41628V9.86245C13.192 10.0649 13.0026 10.2384 12.7816 10.2384ZM7.19378 9.51536H12.4028V8.79228H7.19378V9.51536Z" fill="currentColor"/>
<path d="M18.5208 20.7086H4.3249C4.14995 20.7086 4 20.549 4 20.3627C4 20.1765 4.14995 20.0168 4.3249 20.0168H18.5707C18.7457 20.0168 18.8956 20.1765 18.8956 20.3627C18.8457 20.549 18.6957 20.7086 18.5208 20.7086Z" fill="currentColor"/>
<path d="M15.3723 8.51845C14.4177 8.51845 13.6062 7.90506 13.3437 7.03214C12.9141 6.96136 12.5084 6.70185 12.2697 6.34796C12.1026 6.41874 11.9356 6.46592 11.7446 6.46592C11.6014 6.46592 11.4582 6.44233 11.315 6.39514C11.1241 6.79621 10.7184 7.05573 10.2172 7.05573C9.54893 7.05573 9 6.5367 9 5.87612C9 5.21553 9.52506 4.6965 10.2172 4.6965C10.3604 4.6965 10.5036 4.72009 10.6468 4.76727C10.8377 4.3662 11.2434 4.10669 11.7446 4.10669C12.0549 4.10669 12.3652 4.22465 12.58 4.43698C12.8425 4.22465 13.1766 4.10669 13.5346 4.10669C13.9403 4.10669 14.2983 4.27183 14.6086 4.53135C14.8473 4.43698 15.0859 4.38979 15.3484 4.38979C15.6826 4.38979 16.0167 4.46057 16.3031 4.62572C16.5895 4.29542 16.9952 4.10669 17.4725 4.10669C18.284 4.10669 19 4.76727 19 5.593C19 6.41874 18.3317 7.07933 17.4725 7.07933C17.4487 7.07933 17.4248 7.07933 17.3771 7.07933C17.1146 7.88147 16.2792 8.51845 15.3723 8.51845ZM13.5823 6.44233C13.7255 6.44233 13.8449 6.5367 13.8687 6.67825C13.9881 7.38602 14.6086 7.90506 15.3723 7.90506C16.1122 7.90506 16.7566 7.36243 16.8759 6.63107C16.8998 6.5367 16.9475 6.46592 17.0191 6.41874C17.0907 6.37155 17.1862 6.34796 17.2578 6.37156C17.3294 6.39515 17.4248 6.39514 17.4964 6.39514C17.9976 6.39514 18.4033 5.99408 18.4033 5.49864C18.4033 5.0032 17.9976 4.60213 17.4964 4.60213C17.1623 4.60213 16.852 4.79087 16.7088 5.07398C16.6611 5.14475 16.5895 5.19193 16.5179 5.21553C16.4463 5.23912 16.3508 5.21553 16.2792 5.16834C16.0167 4.97961 15.7303 4.88523 15.4201 4.88523C15.1814 4.88523 14.9427 4.93242 14.7279 5.05038C14.5847 5.12116 14.4415 5.07398 14.3461 4.95602C14.179 4.72009 13.9165 4.57854 13.6301 4.57854C13.3437 4.57854 13.0573 4.72009 12.8902 4.95602C12.8186 5.05038 12.7232 5.09757 12.6277 5.07398C12.5322 5.07398 12.4368 5.0032 12.389 4.90883C12.2936 4.6965 12.0788 4.57854 11.8401 4.57854C11.5298 4.57854 11.2673 4.81446 11.2434 5.12116C11.2434 5.23912 11.1718 5.33349 11.0525 5.38067C10.957 5.42786 10.8377 5.40426 10.7422 5.33349C10.6229 5.23912 10.4797 5.19194 10.3365 5.19194C10.0024 5.19194 9.73986 5.45145 9.73986 5.78175C9.73986 6.11204 10.0024 6.37156 10.3365 6.37156C10.6468 6.37156 10.9093 6.13563 10.9332 5.82893C10.9332 5.71097 11.0048 5.6166 11.1241 5.56941C11.2196 5.52223 11.3389 5.54582 11.4344 5.6166C11.5537 5.71097 11.6969 5.75815 11.8401 5.75815C12.0072 5.75815 12.1504 5.68737 12.2697 5.56941C12.3413 5.49863 12.4606 5.45145 12.5561 5.49864C12.6516 5.52223 12.747 5.593 12.7709 5.71097C12.8902 6.08844 13.2243 6.34796 13.6301 6.34796V6.44233C13.5585 6.44233 13.5585 6.44233 13.5823 6.44233Z" fill="currentColor"/>
`
}, qg = {
  name: "wastes",
  style: "line",
  path: `
<g id="menu/wastes">
<g id="Vector">
<path d="M12.842 6.02625C12.8413 5.71666 12.5053 4.63997 12.421 4.34204C16.6048 4.34663 19.9953 7.74397 19.9999 11.921C20.0135 16.0999 16.6067 19.486 12.421 19.4997C8.23527 19.5132 4.85564 17.3631 4.84204 13.1841C5.77819 13.3827 6.57654 14.0137 8.21046 13.6052C9.89467 13.1841 9.47362 9.81573 9.05257 8.97362C8.84204 8.55257 8.67033 8.34265 8.63151 8.12535C9.48864 8.46519 10.8207 8.6557 11.5789 8.13151C12.42 7.5452 12.842 6.86836 12.842 6.02625Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M4.84369 7.71215V7.71046H4.84204V7.71211L4.84369 7.71215Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.05421 4.34373V4.34204H9.05257V4.34369L9.05421 4.34373Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.68579 4.34373V4.34204H5.68415V4.34369L5.68579 4.34373Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.7384 16.1332V16.1315H10.7368V16.1332L10.7384 16.1332Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.9489 14.449V14.4473H14.9473V14.4489L14.9489 14.449Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.5805 11.9227V11.921H11.5789V11.9226L11.5805 11.9227Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.7911 10.2385V10.2368H15.7894V10.2384L15.7911 10.2385Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.84369 7.71215V7.71046H4.84204V7.71211L4.84369 7.71215Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.05421 4.34373V4.34204H9.05257V4.34369L9.05421 4.34373Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.68579 4.34373V4.34204H5.68415V4.34369L5.68579 4.34373Z" stroke="currentColor" stroke-width="0.842105" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<circle id="Ellipse 16" cx="11.5789" cy="11.921" r="0.842105" fill="currentColor"/>
<circle id="Ellipse 17" cx="15.7895" cy="10.2369" r="0.842105" fill="currentColor"/>
<circle id="Ellipse 18" cx="14.9473" cy="14.4473" r="0.842105" fill="currentColor"/>
<circle id="Ellipse 19" cx="10.7369" cy="16.1315" r="0.842105" fill="currentColor"/>
<circle id="Ellipse 20" cx="4.84211" cy="7.71051" r="0.842105" fill="currentColor"/>
<circle id="Ellipse 21" cx="9.05268" cy="4.34211" r="0.842105" fill="currentColor"/>
<circle id="Ellipse 22" cx="5.68415" cy="4.34211" r="0.842105" fill="currentColor"/>
</g>
`
}, Gg = {
  name: "write-downs",
  style: "line",
  path: `
<g id="menu/write-downs">
<path id="Vector" d="M9.33327 12.8888H14.6665M4 6.66667V16.2666C4 17.2622 4 17.7595 4.19376 18.1398C4.3642 18.4743 4.63597 18.747 4.97047 18.9174C5.35039 19.111 5.84797 19.111 6.84166 19.111H17.1587C18.1524 19.111 18.6493 19.111 19.0292 18.9174C19.3637 18.747 19.6358 18.4746 19.8062 18.1401C20 17.7598 20 17.262 20 16.2664L20 9.51089C20 8.51525 20 8.01743 19.8062 7.63715C19.6358 7.30264 19.3631 7.03088 19.0286 6.86044C18.6483 6.66667 18.151 6.66667 17.1554 6.66667H11.9999M4 6.66667H11.9999M4 6.66667C4 5.68484 4.79593 4.88892 5.77776 4.88892H9.04395C9.47878 4.88892 9.69696 4.88892 9.90155 4.93804C10.0829 4.98158 10.2558 5.05359 10.4149 5.15107C10.5942 5.26097 10.7482 5.41498 11.0555 5.72224L11.9999 6.66667" stroke="currentColor" stroke-width="0.888878" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
}, Xg = {
  name: "the-complaint",
  style: "line",
  path: `
<g id="menu/theComplaint">
<path id="Vector" d="M11.5 8.76276V12.573M19 10.8251C19 17.0817 14.3424 19.8867 12.3679 20.7948L12.3654 20.7959C12.1578 20.8914 12.0537 20.9393 11.8177 20.9804C11.6682 21.0065 11.3327 21.0065 11.1833 20.9804C10.9463 20.9391 10.8412 20.8911 10.6318 20.7948C8.65731 19.8867 4 17.0817 4 10.8251V7.04835C4 5.98139 4 5.44752 4.20436 5.03999C4.38413 4.68152 4.67076 4.39029 5.02356 4.20764C5.42464 4 5.95008 4 7.00018 4H16.0002C17.0503 4 17.5746 4 17.9757 4.20764C18.3285 4.39029 18.6161 4.68152 18.7958 5.03999C19 5.44712 19 5.98035 19 7.04522V10.8251ZM11.5467 15.4306V15.5259L11.4533 15.5261V15.4306H11.5467Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
}, Kg = {
  name: "base-of-equipment-and-inventory",
  style: "line",
  path: `
<g id="menu/baseOfEquipmentAndInventory">
<path d="M19 5.57576V13.5V16.9091C19 18.6162 15.866 20 12 20C8.13401 20 5 18.6162 5 16.9091V13.5V5.57576M19 5.57576C19 3.8687 15.866 3 12 3C8.13401 3 5 3.8687 5 5.57576M19 5.57576C19 6.5 15.866 7.5 12 7.5C8.13401 7.5 5 6.5 5 5.57576" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M12.0067 16C11.8374 16 11.7038 15.9554 11.6058 15.8661C11.5078 15.7769 11.4588 15.6511 11.4588 15.4888V10.7911H9.5078C9.16927 10.7911 9 10.6572 9 10.3895C9 10.2677 9.04454 10.1744 9.13363 10.1095C9.22272 10.0365 9.34744 10 9.5078 10H14.5056C14.8352 10 15 10.1298 15 10.3895C15 10.5193 14.9555 10.6207 14.8664 10.6937C14.7862 10.7586 14.6659 10.7911 14.5056 10.7911H12.5412V15.4888C12.5412 15.6511 12.4967 15.7769 12.4076 15.8661C12.3274 15.9554 12.1938 16 12.0067 16Z" fill="currentColor"/>
</g>
`
}, Jg = {
  name: "users-group",
  style: "line",
  path: `
<g id="menu/usersGroup">
<path id="Vector" d="M16.4444 19.1667C16.4444 17.6939 14.4546 16.5 12 16.5C9.5454 16.5 7.55556 17.6939 7.55556 19.1667M20 16.5004C20 15.4069 18.903 14.4671 17.3333 14.0556M4 16.5004C4 15.4069 5.09697 14.4671 6.66667 14.0556M17.3333 10.4877C17.8789 9.99941 18.2222 9.28982 18.2222 8.50004C18.2222 7.02728 17.0283 5.83337 15.5556 5.83337C14.8726 5.83337 14.2496 6.09013 13.7778 6.51239M6.66667 10.4877C6.12111 9.99941 5.77778 9.28982 5.77778 8.50004C5.77778 7.02728 6.97169 5.83337 8.44444 5.83337C9.12743 5.83337 9.75044 6.09013 10.2222 6.51239M12 13.8334C10.5272 13.8334 9.33333 12.6395 9.33333 11.1667C9.33333 9.69395 10.5272 8.50004 12 8.50004C13.4728 8.50004 14.6667 9.69395 14.6667 11.1667C14.6667 12.6395 13.4728 13.8334 12 13.8334Z" stroke="currentColor" stroke-width="0.888889" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
}, Qg = {
  name: "reports",
  style: "line",
  path: `
<g id="menu/reports">
<path id="Vector" d="M6.74998 11.1252V6.92526C6.74998 5.94518 6.74998 5.45477 6.94071 5.08043C7.10849 4.75115 7.37601 4.48363 7.70529 4.31586C8.07963 4.12512 8.57004 4.12512 9.55012 4.12512H13.4653C13.5725 4.12512 13.6663 4.12512 13.7499 4.12588M18.999 9.37506C18.9998 9.45871 18.9998 9.55265 18.9998 9.66003V17.0781C18.9998 18.0562 18.9998 18.5454 18.8093 18.9193C18.6415 19.2486 18.3733 19.5166 18.044 19.6844C17.67 19.8749 17.1807 19.8749 16.2025 19.8749L12.8749 19.8749M18.999 9.37506C18.9966 9.12526 18.9873 8.9671 18.9511 8.81623C18.9083 8.63767 18.8373 8.46694 18.7413 8.31037C18.6331 8.13377 18.4826 7.98285 18.1799 7.68019L15.4452 4.94542C15.1427 4.64296 14.9911 4.49136 14.8146 4.38318C14.658 4.28723 14.4874 4.21634 14.3089 4.17347C14.1579 4.13724 13.9998 4.12816 13.7499 4.12588M18.999 9.37506H19M18.999 9.37506H16.5472C15.569 9.37506 15.0792 9.37506 14.7052 9.18451C14.3759 9.01673 14.1084 8.74849 13.9406 8.41921C13.7499 8.04487 13.7499 7.55517 13.7499 6.57509V4.12588M9.37495 13.75L11.1249 15.5M5 19.8749V17.6875L11.5624 11.125L13.7499 13.3125L7.18747 19.8749H5Z" stroke="currentColor" stroke-width="0.874989" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</g>
`
}, em = {
  name: "editing",
  style: "line",
  viewbox: "0 0 16 14",
  path: `
    <g id="menu/editing">
      <path d="M8 13.3336H14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M11 2.33377C11.2652 2.06855 11.6249 1.91956 12 1.91956C12.1857 1.91956 12.3696 1.95614 12.5412 2.02721C12.7128 2.09828 12.8687 2.20245 13 2.33377C13.1313 2.46509 13.2355 2.62099 13.3066 2.79257C13.3776 2.96415 13.4142 3.14805 13.4142 3.33377C13.4142 3.51949 13.3776 3.70338 13.3066 3.87497C13.2355 4.04655 13.1313 4.20245 13 4.33377L4.66667 12.6671L2 13.3338L2.66667 10.6671L11 2.33377Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    </g>
`
}, tm = {
  name: "paper-clip",
  style: "line",
  path: `
    <path d="M20.4398 11.0509L11.2498 20.2409C10.124 21.3667 8.59699 21.9992 7.0048 21.9992C5.41262 21.9992 3.88565 21.3667 2.7598 20.2409C1.63396 19.1151 1.00146 17.5881 1.00146 15.9959C1.00146 14.4037 1.63396 12.8767 2.7598 11.7509L11.9498 2.5609C12.7004 1.81033 13.7183 1.38867 14.7798 1.38867C15.8413 1.38867 16.8592 1.81033 17.6098 2.5609C18.3604 3.31146 18.782 4.32944 18.782 5.3909C18.782 6.45235 18.3604 7.47033 17.6098 8.2209L8.4098 17.4109C8.03452 17.7862 7.52553 17.997 6.9948 17.997C6.46407 17.997 5.95508 17.7862 5.5798 17.4109C5.20452 17.0356 4.99369 16.5266 4.99369 15.9959C4.99369 15.4652 5.20452 14.9562 5.5798 14.5809L14.0698 6.1009" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  `
}, nm = {
  name: "shaded-arrow-down",
  style: "line",
  path: `
    <path d="M4 6L0.535898 6.52533e-07L7.4641 4.68497e-08L4 6Z" fill="none" stroke="currentColor" />
  `
}, rm = {
  name: "shaded-arrow-right",
  style: "line",
  path: `
    <path d="M6 4L-3.26266e-07 7.4641L-2.34249e-08 0.535898L6 4Z" fill="none" stroke="currentColor" />
  `
}, om = {
  name: "shaded-arrow-left",
  style: "line",
  path: `
    <path d="M4.76995e-08 4L6 0.535898L6 7.4641L4.76995e-08 4Z" fill="none" stroke="currentColor" />
  `
}, im = {
  name: "shaded-arrow-up",
  style: "line",
  path: `
    <path d="M4 0L7.4641 6L0.535898 6L4 0Z" fill="none" stroke="currentColor" />
  `
}, sm = {
  name: "star",
  style: "line",
  path: `
    <path d="M11 1L14.09 7.26L21 8.27L16 13.14L17.18 20.02L11 16.77L4.82 20.02L6 13.14L1 8.27L7.91 7.26L11 1Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `
}, am = {
  name: "info",
  style: "line",
  path: `
    <g id="info">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 16V12" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 8H12.01" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  `
}, lm = {
  name: "files",
  style: "line",
  path: `
    <path d="M20.0306 6.21938L16.2806 2.46938C16.2109 2.39975 16.1282 2.34454 16.0371 2.3069C15.9461 2.26926 15.8485 2.24992 15.75 2.25H8.25C7.85218 2.25 7.47064 2.40804 7.18934 2.68934C6.90804 2.97064 6.75 3.35218 6.75 3.75V5.25H5.25C4.85218 5.25 4.47064 5.40804 4.18934 5.68934C3.90804 5.97064 3.75 6.35218 3.75 6.75V20.25C3.75 20.6478 3.90804 21.0294 4.18934 21.3107C4.47064 21.592 4.85218 21.75 5.25 21.75H15.75C16.1478 21.75 16.5294 21.592 16.8107 21.3107C17.092 21.0294 17.25 20.6478 17.25 20.25V18.75H18.75C19.1478 18.75 19.5294 18.592 19.8107 18.3107C20.092 18.0294 20.25 17.6478 20.25 17.25V6.75C20.2501 6.65148 20.2307 6.55391 20.1931 6.46286C20.1555 6.37182 20.1003 6.28908 20.0306 6.21938ZM15.75 20.25H5.25V6.75H12.4397L15.75 10.0603V20.25ZM18.75 17.25H17.25V9.75C17.2501 9.65148 17.2307 9.55391 17.1931 9.46286C17.1555 9.37182 17.1003 9.28908 17.0306 9.21937L13.2806 5.46938C13.2109 5.39975 13.1282 5.34454 13.0371 5.3069C12.9461 5.26926 12.8485 5.24992 12.75 5.25H8.25V3.75H15.4397L18.75 7.06031V17.25ZM13.5 14.25C13.5 14.4489 13.421 14.6397 13.2803 14.7803C13.1397 14.921 12.9489 15 12.75 15H8.25C8.05109 15 7.86032 14.921 7.71967 14.7803C7.57902 14.6397 7.5 14.4489 7.5 14.25C7.5 14.0511 7.57902 13.8603 7.71967 13.7197C7.86032 13.579 8.05109 13.5 8.25 13.5H12.75C12.9489 13.5 13.1397 13.579 13.2803 13.7197C13.421 13.8603 13.5 14.0511 13.5 14.25ZM13.5 17.25C13.5 17.4489 13.421 17.6397 13.2803 17.7803C13.1397 17.921 12.9489 18 12.75 18H8.25C8.05109 18 7.86032 17.921 7.71967 17.7803C7.57902 17.6397 7.5 17.4489 7.5 17.25C7.5 17.0511 7.57902 16.8603 7.71967 16.7197C7.86032 16.579 8.05109 16.5 8.25 16.5H12.75C12.9489 16.5 13.1397 16.579 13.2803 16.7197C13.421 16.8603 13.5 17.0511 13.5 17.25Z" fill="black"/>
  `
}, um = {
  name: "more-horizontal",
  style: "line",
  path: `
    <g id="moreHorizontal">
      <path d="M12 13.6271C12.5523 13.6271 13 13.1794 13 12.6271C13 12.0749 12.5523 11.6271 12 11.6271C11.4477 11.6271 11 12.0749 11 12.6271C11 13.1794 11.4477 13.6271 12 13.6271Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M19 13.6271C19.5523 13.6271 20 13.1794 20 12.6271C20 12.0749 19.5523 11.6271 19 11.6271C18.4477 11.6271 18 12.0749 18 12.6271C18 13.1794 18.4477 13.6271 19 13.6271Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5 13.6271C5.55228 13.6271 6 13.1794 6 12.6271C6 12.0749 5.55228 11.6271 5 11.6271C4.44772 11.6271 4 12.0749 4 12.6271C4 13.1794 4.44772 13.6271 5 13.6271Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  `
}, cm = {
  name: "more-vertical",
  style: "line",
  path: `
    <g id="moreVertical">
      <path d="M8.66683 8.0013C8.66683 7.63311 8.36835 7.33464 8.00016 7.33464C7.63197 7.33464 7.3335 7.63311 7.3335 8.0013C7.3335 8.36949 7.63197 8.66797 8.00016 8.66797C8.36835 8.66797 8.66683 8.36949 8.66683 8.0013Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.66683 3.33333C8.66683 2.96514 8.36835 2.66667 8.00016 2.66667C7.63197 2.66667 7.3335 2.96514 7.3335 3.33333C7.3335 3.70152 7.63197 4 8.00016 4C8.36835 4 8.66683 3.70152 8.66683 3.33333Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.66683 12.6654C8.66683 12.2972 8.36835 11.9987 8.00016 11.9987C7.63197 11.9987 7.3335 12.2972 7.3335 12.6654C7.3335 13.0336 7.63197 13.332 8.00016 13.332C8.36835 13.332 8.66683 13.0336 8.66683 12.6654Z" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  `,
  viewbox: "0 0 16 16"
}, dm = {
  name: "file-text",
  style: "line",
  path: `
    <g id="fileText">
      <path d="M14 2.87256H6C5.46957 2.87256 4.96086 3.08327 4.58579 3.45834C4.21071 3.83342 4 4.34213 4 4.87256V20.8726C4 21.403 4.21071 21.9117 4.58579 22.2868C4.96086 22.6618 5.46957 22.8726 6 22.8726H18C18.5304 22.8726 19.0391 22.6618 19.4142 22.2868C19.7893 21.9117 20 21.403 20 20.8726V8.87256L14 2.87256Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 2.87256V8.87256H20" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 13.8726H8" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16 17.8726H8" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 9.87256H9H8" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  `
}, fm = {
  name: "git-pull-request",
  style: "line",
  path: `
    <g id="gitPullRequest">
      <path d="M18 21C19.6569 21 21 19.6569 21 18C21 16.3431 19.6569 15 18 15C16.3431 15 15 16.3431 15 18C15 19.6569 16.3431 21 18 21Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13 6H16C16.5304 6 17.0391 6.21071 17.4142 6.58579C17.7893 6.96086 18 7.46957 18 8V15" stroke="currentColor" fill="none"stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 9V21" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  `
}, hm = {
  name: "folder",
  style: "line",
  path: `
    <path d="M14.3333 12.1667C14.3333 12.5203 14.1929 12.8594 13.9428 13.1095C13.6928 13.3595 13.3536 13.5 13 13.5H2.33333C1.97971 13.5 1.64057 13.3595 1.39052 13.1095C1.14048 12.8594 1 12.5203 1 12.1667V2.83333C1 2.47971 1.14048 2.14057 1.39052 1.89052C1.64057 1.64048 1.97971 1.5 2.33333 1.5H5.66667L7 3.5H13C13.3536 3.5 13.6928 3.64048 13.9428 3.89052C14.1929 4.14057 14.3333 4.47971 14.3333 4.83333V12.1667Z" stroke="currentColor" fill="none" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
  `
}, pm = {
  name: "cross-small",
  style: "line",
  path: `
<path d="M16 8.62714L8 16.6271" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 8.62714L16 16.6271" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
  `
}, vm = {
  name: "cross-large",
  style: "line",
  path: `
    <path d="M18 6.62714L6 18.6271" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" fill="none"/>
    <path d="M6 6.62714L18 18.6271" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" fill="none"/>
  `
}, gm = {
  name: "copy",
  style: "line",
  path: `
    <path d="M18 6.94C17.9897 6.84812 17.9695 6.75761 17.94 6.67V6.58C17.893 6.47655 17.8288 6.38186 17.75 6.3L11.75 0.3C11.6681 0.221221 11.5734 0.156968 11.47 0.11C11.4402 0.105474 11.4098 0.105474 11.38 0.11C11.2782 0.0522223 11.1661 0.014858 11.05 0H7C6.20435 0 5.44129 0.316071 4.87868 0.87868C4.31607 1.44129 4 2.20435 4 3V4H3C2.20435 4 1.44129 4.31607 0.87868 4.87868C0.316071 5.44129 0 6.20435 0 7V17C0 17.7956 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H11C11.7956 20 12.5587 19.6839 13.1213 19.1213C13.6839 18.5587 14 17.7956 14 17V16H15C15.7956 16 16.5587 15.6839 17.1213 15.1213C17.6839 14.5587 18 13.7956 18 13V6.94ZM12 3.41L14.59 6H13C12.7348 6 12.4804 5.89464 12.2929 5.70711C12.1054 5.51957 12 5.26522 12 5V3.41ZM12 17C12 17.2652 11.8946 17.5196 11.7071 17.7071C11.5196 17.8946 11.2652 18 11 18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V7C2 6.73478 2.10536 6.48043 2.29289 6.29289C2.48043 6.10536 2.73478 6 3 6H4V13C4 13.7956 4.31607 14.5587 4.87868 15.1213C5.44129 15.6839 6.20435 16 7 16H12V17ZM16 13C16 13.2652 15.8946 13.5196 15.7071 13.7071C15.5196 13.8946 15.2652 14 15 14H7C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13V3C6 2.73478 6.10536 2.48043 6.29289 2.29289C6.48043 2.10536 6.73478 2 7 2H10V5C10 5.79565 10.3161 6.55871 10.8787 7.12132C11.4413 7.68393 12.2044 8 13 8H16V13Z" fill="#A6A3AD"/>
  `
}, mm = {
  name: "reset",
  style: "line",
  fill: "none",
  path: `
<path d="M4 6.00195V10.5023H8.50032" stroke-width="1.50011" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" />
<path d="M5.88263 14.2534C6.36896 15.6338 7.29073 16.8187 8.50906 17.6297C9.72739 18.4406 11.1763 18.8337 12.6374 18.7496C14.0985 18.6655 15.4927 18.1088 16.61 17.1634C17.7272 16.2181 18.507 14.9352 18.8317 13.5081C19.1565 12.0811 19.0086 10.5871 18.4105 9.25138C17.8123 7.91564 16.7963 6.81047 15.5154 6.1024C14.2346 5.39433 12.7583 5.12171 11.309 5.32561C9.85975 5.52952 8.516 6.1989 7.48025 7.23291L4 10.5031" stroke="currentColor" stroke-width="1.50011" stroke-linecap="round" stroke-linejoin="round"/>
   `
}, ym = {
  name: "move",
  style: "line",
  fill: "none",
  path: `
<circle cx="8.5" cy="4.5" r="1.5" fill="currentColor"/>
<circle cx="8.5" cy="11.5" r="1.5" fill="currentColor"/>
<circle cx="8.5" cy="18.5" r="1.5" fill="currentColor"/>
<circle cx="15.5" cy="18.5" r="1.5" fill="currentColor"/>
<circle cx="15.5" cy="11.5" r="1.5" fill="currentColor"/>
<circle cx="15.5" cy="4.5" r="1.5" fill="currentColor"/>
  `
}, _m = {
  name: "eye",
  fill: "none",
  style: "line",
  path: `
<path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `
}, Cm = {
  name: "eye-off",
  fill: "none",
  style: "line",
  path: `
<path d="M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 2.5L21.5 21.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  `
}, bm = {
  name: "hand-sign-emoji",
  fill: "none",
  style: "line",
  viewbox: "0 0 40 40",
  path: `
<path d="M10.463 29.8727C10.1628 29.8136 9.92276 29.7546 9.62266 29.6365C9.32255 29.5184 9.08247 29.4593 8.84239 29.3412C8.3022 29.105 7.82203 28.8098 7.34186 28.4555C6.38153 27.8059 5.60126 26.9202 5.00105 25.8573C4.40084 24.8535 4.04071 23.6725 3.98069 22.5506C3.92067 21.9601 3.98069 21.4287 4.04071 20.8382C4.10073 20.5429 4.16075 20.3067 4.22077 20.0115C4.2808 19.7162 4.40084 19.48 4.46086 19.1848L4.52088 20.0115C4.52088 20.3067 4.5809 20.5429 4.64092 20.8382C4.70094 21.3696 4.82098 21.9011 4.94103 22.3734C5.18111 23.3773 5.54124 24.3221 6.08142 25.2078C6.62161 26.0935 7.22182 26.9202 8.00209 27.6878C8.36222 28.0421 8.78237 28.3964 9.20251 28.7507C9.38258 28.9279 9.62266 29.105 9.86274 29.2822L10.463 29.8727ZM10.2829 31.9984C10.1028 32.1165 9.86274 32.1756 9.62266 32.2346C9.38258 32.2937 9.20251 32.3527 8.96243 32.3527C8.54228 32.4118 8.06211 32.4708 7.58195 32.4118C6.68163 32.3527 5.7213 32.1165 4.94103 31.7032C4.10073 31.2898 3.38048 30.6403 2.90031 29.8727C2.66023 29.5184 2.42015 29.105 2.24008 28.6917C2.18006 28.5145 2.12004 28.2783 2.06002 28.0421C2.06002 27.865 2 27.6878 2 27.4516C2.18006 27.6288 2.3001 27.8059 2.42015 27.924C2.60021 28.1012 2.72025 28.2783 2.84029 28.3964C3.1404 28.6917 3.38048 28.9869 3.68059 29.2231C4.2808 29.7546 4.881 30.2269 5.60126 30.5812C6.26149 30.9355 7.04176 31.2308 7.76201 31.467C8.12214 31.5851 8.54228 31.6441 8.96243 31.7622C9.14249 31.8213 9.38258 31.8213 9.56264 31.8803C9.86274 31.9394 10.0428 31.9394 10.2829 31.9984ZM23.8476 3.30065C24.1477 3.3597 24.3878 3.4778 24.6879 3.59589C24.988 3.71399 25.2281 3.83209 25.4682 3.95019C26.0084 4.24543 26.4885 4.54068 26.9687 4.89497C27.929 5.60356 28.7093 6.54834 29.2495 7.61122C29.7897 8.6741 30.0898 9.85508 30.0898 10.977C30.0898 11.5675 30.0298 12.0989 29.9097 12.6894C29.8497 12.9847 29.7897 13.2209 29.6697 13.5161C29.5496 13.8114 29.4896 14.0475 29.3695 14.2837L29.3095 13.4571C29.3095 13.1618 29.3095 12.9256 29.2495 12.6304L29.0694 11.0361C28.8894 10.0322 28.5293 9.02839 28.0491 8.08361C27.5689 7.13883 26.9687 6.31214 26.2485 5.54451C25.8883 5.13116 25.4682 4.77687 25.1081 4.36353C24.928 4.18638 24.6879 4.00924 24.4478 3.83209L23.8476 3.30065ZM29.0694 3.06445C29.3095 3.1235 29.4896 3.18255 29.6697 3.30065C29.8497 3.3597 30.0898 3.4778 30.2699 3.59589C30.63 3.83209 30.9901 4.06828 31.3502 4.36353C32.0105 4.95402 32.5507 5.6626 32.8508 6.48929C33.2109 7.31597 33.3309 8.20171 33.2109 9.08744C33.1509 9.50078 33.0308 9.91412 32.9108 10.3275C32.8508 10.5046 32.7307 10.7408 32.6707 10.918C32.5507 11.0951 32.4906 11.2722 32.3106 11.4494V10.8589V10.2684C32.3106 9.85508 32.2506 9.50078 32.2506 9.14649C32.1305 8.37885 32.0105 7.67027 31.7104 7.02073C31.4103 6.31214 31.0501 5.72165 30.63 5.07212C30.3899 4.77687 30.1498 4.42258 29.9097 4.12733C29.7897 3.95019 29.6697 3.83209 29.4896 3.65494C29.3695 3.3597 29.1895 3.18255 29.0694 3.06445Z" fill="currentColor"/>
<path d="M6.789 11.8622C5.58859 12.3937 5.16844 13.8108 5.70863 14.9918L13.2713 30.5217L17.4727 28.573L9.91009 12.9841C9.3699 11.8032 7.98942 11.2717 6.789 11.8622ZM26.6559 24.2034L31.0975 22.1367L22.4545 4.42205C21.8543 3.24107 20.4138 2.70963 19.1533 3.30012C17.9529 3.89061 17.4127 5.30778 18.0129 6.54781L26.6559 24.2034Z" fill="#FFDD67"/>
<path d="M19.2195 3.24123C19.0995 3.30028 18.9794 3.35933 18.8594 3.47742C19.9998 3.18218 21.2002 3.71362 21.7404 4.7765L30.3834 22.4912L31.1637 22.1369L22.5207 4.42221C21.9204 3.18218 20.4799 2.65074 19.2195 3.24123Z" fill="#EBA352"/>
<path d="M17.498 28.5134L22.1196 26.3286L13.2965 8.25962C12.6963 7.01959 11.1357 6.4291 9.87531 7.01959C8.61487 7.61008 8.07468 9.14535 8.67489 10.3854L17.498 28.5134Z" fill="#FFDD67"/>
<path d="M9.87575 7.07983C9.75571 7.13888 9.63567 7.19793 9.51562 7.31602C10.656 7.02078 11.9765 7.55222 12.5167 8.67415L17.9786 19.9525L19.299 20.7201L13.2969 8.31985C12.6967 7.02078 11.1962 6.48934 9.87575 7.07983Z" fill="#EBA352"/>
<path d="M21.3964 24.9126L26.018 22.7278L17.1949 4.65884C16.5947 3.41881 15.0342 2.82832 13.7737 3.47786C12.5133 4.06835 11.9731 5.60362 12.5733 6.84365L21.3964 24.9126Z" fill="#FFDD67"/>
<path d="M13.7679 3.41869C13.6478 3.47774 13.5278 3.59584 13.4077 3.65489C14.5481 3.35965 15.8686 3.89109 16.4088 5.01302L22.5909 17.7676L23.9114 18.5352L17.1891 4.65872C16.5888 3.35965 15.0283 2.82821 13.7679 3.41869ZM6.80544 11.8627C6.6854 11.9217 6.56535 11.9808 6.44531 12.0989C7.52569 11.8036 8.66609 12.3351 9.14625 13.398L13.6478 22.6686L14.9683 23.4363L9.92653 13.0437C9.38634 11.8036 8.00586 11.2722 6.80544 11.8627Z" fill="#EBA352"/>
<path d="M37.2968 10.0913C35.6763 8.85128 33.0353 10.2094 31.7149 14.4609C30.8146 17.4134 30.6945 18.2991 28.7738 19.1848L27.6935 17C27.6935 17 10.6475 25.0897 11.3078 26.3888C11.3078 26.3888 13.3485 32.648 16.8297 35.5414C21.9915 39.911 34.0557 35.2461 34.5959 23.9678C34.896 17.4134 39.0374 11.4494 37.2968 10.0913Z" fill="#FFDD67"/>
<path d="M37.2841 10.0901C36.984 9.8539 36.6238 9.73581 36.2637 9.67676C36.3237 9.73581 36.4438 9.73581 36.5038 9.79486C38.3044 11.153 36.4438 14.2826 35.4234 17.1169C34.5831 19.3608 33.8629 21.6637 33.9829 23.9075C34.4631 33.7097 24.4396 38.3745 18.4375 36.6031C24.3196 39.0241 35.2434 34.4182 34.7632 24.2028C34.6432 21.9589 35.3034 19.7741 36.2037 17.4122C37.164 14.5778 39.0247 11.4482 37.2841 10.0901Z" fill="#EBA352"/>
<path d="M29.2855 18.9473C25.5642 19.3606 20.1023 24.616 23.9437 30.3437C21.1227 24.5569 25.7443 20.6597 28.6853 19.3016C28.9854 19.0654 29.2855 18.9473 29.2855 18.9473Z" fill="#EBA352"/>
`
}, wm = {
  name: "calendar",
  fill: "none",
  style: "line",
  path: `
<path d="M19 5H5C3.89543 5 3 5.79594 3 6.77778V19.2222C3 20.2041 3.89543 21 5 21H19C20.1046 21 21 20.2041 21 19.2222V6.77778C21 5.79594 20.1046 5 19 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 3V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 3V7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3 11H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `
}, km = {
  name: "paint",
  fill: "none",
  style: "line",
  viewbox: "0 0 24 24",
  path: `
  <path d="M10.4185 14.3826C10.2133 13.8535 9.83866 13.4155 9.35871 13.1435C8.87876 12.8716 8.32336 12.7827 7.78765 12.8921C7.25194 13.0015 6.76924 13.3023 6.42224 13.743C6.07524 14.1838 5.88552 14.7371 5.88558 15.3081C5.88558 15.5609 5.83596 15.8109 5.73978 16.0428C5.6436 16.2747 5.50292 16.4835 5.32646 16.6562C5.15 16.8289 4.94151 16.9618 4.71393 17.0467C4.48635 17.1317 4.24451 17.1668 4.00342 17.1499C4.39118 17.8546 4.99048 18.4057 5.70829 18.7176C6.42609 19.0295 7.22224 19.0848 7.97314 18.8748C8.72404 18.6649 9.38768 18.2014 9.86104 17.5565C10.3344 16.9116 10.591 16.1212 10.591 15.3081C10.591 14.9807 10.5298 14.6681 10.4185 14.3826ZM10.4185 14.3826C11.3509 14.0502 12.2427 13.6041 13.0755 13.0535C14.5626 12.0705 15.8347 10.7712 16.8108 9.24019L19.8505 4.47023C19.9669 4.28855 20.0195 4.07022 19.9991 3.85252C19.9788 3.63482 19.8869 3.43125 19.739 3.27658C19.5912 3.12191 19.3966 3.02574 19.1885 3.00447C18.9804 2.98321 18.7717 3.03818 18.598 3.16001L14.0385 6.3408C12.5747 7.36184 11.3325 8.69349 10.3926 10.2493C11.5859 10.8079 12.5408 11.8068 13.0747 13.0552M9.12056 13.033C9.43838 12.0555 9.86534 11.1206 10.3926 10.2477" stroke="currentColor" stroke-width="1.41615" stroke-linecap="round" stroke-linejoin="round"/>
`
}, $m = {
  name: "close-tag",
  fill: "none",
  style: "line",
  path: `
    <path d="M7.5 2.5L2.5 7.5" stroke="#757D8A" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2.5 2.5L7.5 7.5" stroke="#757D8A" stroke-width="0.833333" stroke-linecap="round" stroke-linejoin="round"/>
`,
  viewbox: "0 0 10 10"
}, o1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: Ug,
  addPlus: bg,
  alertTriangle: Yv,
  archive: Lg,
  arrowLeft: Nv,
  baseDetail: Cg,
  baseOfAssemblyUnits: Eg,
  baseOfEquipmentAndInventory: Kg,
  bgNotContent: yg,
  bookOpen: Ag,
  calendar: wm,
  chartLine: Pg,
  checkbox: qv,
  chevronDown: jv,
  chevronLeft: Zv,
  chevronRight: Uv,
  chevronUp: zv,
  closeTag: $m,
  closeVision: wg,
  company: Zg,
  copy: gm,
  crossLarge: vm,
  crossSmall: pm,
  dark: Gv,
  deleteSmall: kg,
  document: _g,
  editing: em,
  equipmentBase: Hg,
  exit: Qv,
  exitBig: Xv,
  exitCircle: eg,
  exitSmall: Kv,
  externalLink: Jv,
  eye: _m,
  eyeOff: Cm,
  fileDatabase: Bg,
  fileText: dm,
  files: lm,
  filter: mg,
  folder: hm,
  gitPullRequest: fm,
  handSignEmoji: bm,
  help: Bv,
  info: am,
  leftBig: ng,
  leftBigSmall: tg,
  light: rg,
  mainPage: Wg,
  marriage: Ig,
  menuClose: xg,
  menuOpen: Tg,
  minus: lg,
  moonFill: Fv,
  moreHorizontal: um,
  moreVertical: cm,
  move: ym,
  notification: Wv,
  notificationYes: og,
  openVision: $g,
  paint: km,
  paperClip: tm,
  plus: ag,
  plus16: sg,
  plusSmall: ig,
  printer: Sg,
  production: zg,
  profile: cg,
  profileIcon: ug,
  reports: Qg,
  reset: mm,
  rightBig: dg,
  rightSmall: fg,
  search: gg,
  searchNormal: vg,
  settings: hg,
  settingsDark: pg,
  shadedArrowDown: nm,
  shadedArrowLeft: om,
  shadedArrowRight: rm,
  shadedArrowUp: im,
  shippingTasks: Ng,
  shopping: Fg,
  star: sm,
  supplierDatabase: Rg,
  theBaseOfTheTool: Yg,
  theComplaint: Xg,
  theDatabaseOfMaterials: Vg,
  trash: Mg,
  trashSmall: Dg,
  uploadCloud: Og,
  usersGroup: Jg,
  warehouse: jg,
  wastes: qg,
  writeDowns: Gg
}, Symbol.toStringTag, { value: "Module" })), Mm = ["width", "height", "fill", "viewBox"], Dm = ["innerHTML"], Ee = /* @__PURE__ */ oe({
  __name: "Icon",
  props: {
    height: { default: 24 },
    width: { default: 24 },
    name: {},
    color: {}
  },
  setup(e) {
    const t = e, r = T(() => ({
      color: t.color
    })), i = (l) => l.replace(/-./g, (u) => u[1].toUpperCase()), a = T(() => o1[i(t.name)]);
    return (l, u) => {
      var c, f, h;
      return $(), P("svg", {
        class: "icon-yui-kit",
        width: t.width,
        height: t.height,
        style: Pt(r.value),
        fill: (c = L(o1)[i(t.name)]) == null ? void 0 : c.fill,
        viewBox: ((f = L(o1)[i(t.name)]) == null ? void 0 : f.viewbox) || "0 0 24 24"
      }, [
        V("g", {
          innerHTML: (h = a.value) == null ? void 0 : h.path
        }, null, 8, Dm)
      ], 12, Mm);
    };
  }
}), Sm = /* @__PURE__ */ oe({
  __name: "Badges",
  props: {
    text: {},
    type: { default: ut.default },
    choosed: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["choose"],
  setup(e, { expose: t, emit: r }) {
    const i = e, a = r, l = Fe({
      choosed: i.choosed
    }), u = ie(null), c = () => !!(u.value && u.value.scrollWidth > u.value.clientWidth), f = ie(c()), h = T(() => ({
      "base-yui-kit": !0,
      "default-yui-kit": i.type === ut.default,
      "blue-yui-kit": i.type === ut.blue,
      "light-blue-yui-kit": i.type === ut.lightBlue,
      "green-yui-kit": i.type === ut.green,
      "orange-yui-kit": i.type === ut.orange,
      "red-yui-kit": i.type === ut.red,
      "pink-yui-kit": i.type === ut.pink,
      "violet-yui-kit": i.type === ut.violet,
      "choosed-yui-kit": i.choosed || l.choosed
    })), p = () => {
      a("choose", l.choosed, i.text), i.disabled || (l.choosed = !l.choosed);
    }, m = new ResizeObserver(() => {
      f.value = c();
    });
    return t({
      isSpanOverflow: f
    }), ze(() => {
      u.value && m.observe(u.value);
    }), (C, g) => ($(), P("div", {
      class: le(h.value),
      onClick: p
    }, [
      V("span", {
        ref_key: "spanRef",
        ref: u,
        class: "badges-text"
      }, ye(i.text), 513),
      J(Ee, {
        class: "close-icon",
        width: 10,
        height: 10,
        name: L(xe).closeTag,
        color: "var(--grey6)"
      }, null, 8, ["name"])
    ], 2));
  }
}), be = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [i, a] of t)
    r[i] = a;
  return r;
}, Dt = /* @__PURE__ */ be(Sm, [["__scopeId", "data-v-5cfccfda"]]), Om = { class: "bread-crumbs-yui-kit" }, Lm = { key: 0 }, xm = ["title", "onClick"], Tm = ["onClick"], Am = {
  key: 0,
  class: "fullName-yui-kit"
}, i1 = 25, Pm = /* @__PURE__ */ oe({
  __name: "BreadCrumbs",
  props: {
    items: {}
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const r = e, i = t, a = Fe({
      items: [],
      crumbs: T(() => {
        const m = r.items.length < 4 ? r.items.length - 1 : 3;
        let C = [r.items[0], ...r.items.slice(-m)];
        return r.items.length === 1 && (C = [r.items[0]]), C.map((g) => (g.isSub = !1, g));
      }),
      subCrumbs: T(() => r.items.slice(1, -3).map((m) => (m.isSub = !0, m))),
      getClassesLink: T(() => (m, C = !1) => ({
        "bread-crumbs-yui-kit__link": !0,
        "disabled-yui-kit": !m.path,
        active: C
      })),
      getClassesSpan: T(() => (m) => ({
        "checked-yui-kit": m === a.crumbs.length - 1
      })),
      fullTitle: T(
        () => (m) => m.title.length > i1
      ),
      isShowList: !1
    }), l = T(() => ({
      crumbs: {
        "bread-crumbs-yui-kit__item": !0
      },
      subcrumbs: {
        "bread-subcrumbs-yui-kit__item": !0
      }
    })), u = T(() => ({
      crumbs: {
        "bread-subcrumbs-yui-kit": !0,
        "scroll-yui-kit": !0,
        "active-yui-kit": a.isShowList
      }
    })), c = (m, C) => {
      C !== a.items.length - 1 && (m.isSub && f(), r.items.forEach(({ path: g }, b) => {
        g === m.path && i("click", {
          title: m.title,
          path: m.path,
          inx: b + 1
        });
      }));
    }, f = () => a.isShowList = !a.isShowList, h = (m) => m.title.length > i1 ? m.title.slice(0, i1).trim() + "..." : m.title, p = (m) => a.items.length >= 5 && m === 1;
    return ze(() => a.items = a.crumbs.concat(a.subCrumbs)), (m, C) => ($(), P("ul", Om, [
      ($(!0), P(Re, null, Ze(a.items, (g, b) => ($(), P("li", {
        class: le(l.value.crumbs),
        key: g.path
      }, [
        p(b) ? ($(), P("div", Lm, [
          V("span", {
            class: "bread-crumbs-yui-kit--closed",
            onClick: f
          }, "..."),
          V("ul", {
            class: le(u.value.crumbs)
          }, [
            ($(!0), P(Re, null, Ze(a.subCrumbs, (M, A) => ($(), P("li", {
              key: M.path,
              class: le(l.value.subcrumbs)
            }, [
              V("span", {
                title: M.title,
                onClick: (D) => c(M, A),
                class: le({
                  "disabled-yui-kit": !M.path
                })
              }, ye(h(M)), 11, xm)
            ], 2))), 128))
          ], 2)
        ])) : ne("", !0),
        g.isSub ? ne("", !0) : ($(), P("div", {
          key: 1,
          class: le(a.getClassesLink(g, b === a.crumbs.length - 1))
        }, [
          V("span", {
            class: le(a.getClassesSpan(b)),
            onClick: (M) => c(g, b)
          }, [
            Qn(ye(b !== a.crumbs.length - 1 ? h(g) : g.title), 1),
            a.fullTitle(g) && b !== a.crumbs.length - 1 ? ($(), P("span", Am, ye(g.title), 1)) : ne("", !0)
          ], 10, Tm),
          b !== a.crumbs.length - 1 ? ($(), ge(Ee, {
            key: 0,
            name: L(xe).rightSmall
          }, null, 8, ["name"])) : ne("", !0)
        ], 2))
      ], 2))), 128))
    ]));
  }
}), r2 = /* @__PURE__ */ be(Pm, [["__scopeId", "data-v-a9b88773"]]);
var as = /* @__PURE__ */ ((e) => (e.small = "small", e.medium = "medium", e.large = "large", e))(as || {}), Wt = /* @__PURE__ */ ((e) => (e.primary = "primary", e.outline = "outline", e.ghost = "ghost", e.secondary = "secondary", e.reject = "reject", e))(Wt || {});
const Im = ["disabled"], Em = /* @__PURE__ */ oe({
  __name: "Button",
  props: {
    disabled: { type: Boolean, default: !1 },
    size: { default: as.medium },
    type: { default: Wt.primary },
    pill: { type: Boolean, default: !1 },
    backgroundColor: {},
    color: { default: "" }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const r = e, i = t, a = T(() => ({
      "button-yui-kit": !0,
      [r.size]: !0,
      "disabled-yui-kit": r.disabled,
      "pill-yui-kit": r.pill,
      "primary-yui-kit": r.type === Wt.primary,
      "secondary-yui-kit": r.type === Wt.secondary,
      "outline-yui-kit": r.type === Wt.outline,
      "reject-yui-kit": r.type === Wt.reject,
      "ghost-yui-kit": r.type === Wt.ghost
    })), l = T(() => ({
      backgroundColor: r.backgroundColor
    })), u = T(() => ({
      color: r.color === "primary" || r.color === "secondary" ? "black" : r.color
    })), c = (f) => i("click", f);
    return (f, h) => ($(), P("button", {
      class: le(a.value),
      disabled: r.disabled,
      tabindex: "0",
      style: Pt(l.value),
      onClick: c,
      onKeyup: _o(c, ["enter"])
    }, [
      f.$slots["left-icon"] ? ($(), P("span", {
        key: 0,
        style: Pt(u.value)
      }, [
        Be(f.$slots, "left-icon", {}, void 0, !0)
      ], 4)) : ne("", !0),
      Be(f.$slots, "default", {}, void 0, !0),
      f.$slots["right-icon"] ? ($(), P("span", {
        key: 1,
        style: Pt(u.value)
      }, [
        Be(f.$slots, "right-icon", {}, void 0, !0)
      ], 4)) : ne("", !0)
    ], 46, Im));
  }
}), yr = /* @__PURE__ */ be(Em, [["__scopeId", "data-v-609111c3"]]), Hm = { class: "switch-yui-kit-list" }, Rm = ["onClick"], Vm = /* @__PURE__ */ oe({
  __name: "Switch",
  props: {
    items: {},
    defaultValue: {},
    isIcons: { type: Boolean }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const r = e, i = Fe({
      activeIndex: 0
    }), a = t, l = (c) => ({
      "switch-yui-kit-item": !0,
      "switch-yui-kit-active": i.activeIndex === c
    }), u = (c) => {
      i.activeIndex = c, a("change", {
        index: c,
        value: r.items[c]
      });
    };
    return $e(
      () => r.defaultValue,
      () => {
        var c;
        i.activeIndex = r.defaultValue ? (c = r.items) == null ? void 0 : c.indexOf(r.defaultValue) : 0;
      }
    ), ze(() => {
      r.defaultValue && r.items.includes(r.defaultValue) && (i.activeIndex = r.items.indexOf(r.defaultValue));
    }), (c, f) => ($(), P("ul", Hm, [
      ($(!0), P(Re, null, Ze(r.items, (h, p) => ($(), P("li", {
        key: h,
        class: le(l(p)),
        onClick: (m) => u(p)
      }, [
        r.isIcons ? ($(), ge(Ee, {
          key: 0,
          name: h
        }, null, 8, ["name"])) : ($(), P(Re, { key: 1 }, [
          Qn(ye(h), 1)
        ], 64))
      ], 10, Rm))), 128))
    ]));
  }
}), N1 = /* @__PURE__ */ be(Vm, [["__scopeId", "data-v-ea9b6d06"]]);
function o2(e) {
  return R1() ? (V1(e), !0) : !1;
}
function Jo(e) {
  return typeof e == "function" ? e() : L(e);
}
const uf = {
  mounted: "mounted",
  updated: "updated",
  unmounted: "unmounted"
}, i2 = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Ym = Object.prototype.toString, Bm = (e) => Ym.call(e) === "[object Object]", qi = () => {
}, C1 = /* @__PURE__ */ Wm();
function Wm() {
  var e, t;
  return i2 && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Fm(...e) {
  if (e.length !== 1)
    return Zr(...e);
  const t = e[0];
  return typeof t == "function" ? rv(ov(() => ({ get: t, set: qi }))) : ie(t);
}
const s2 = i2 ? window : void 0;
function ji(e) {
  var t;
  const r = Jo(e);
  return (t = r == null ? void 0 : r.$el) != null ? t : r;
}
function va(...e) {
  let t, r, i, a;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([r, i, a] = e, t = s2) : [t, r, i, a] = e, !t)
    return qi;
  Array.isArray(r) || (r = [r]), Array.isArray(i) || (i = [i]);
  const l = [], u = () => {
    l.forEach((p) => p()), l.length = 0;
  }, c = (p, m, C, g) => (p.addEventListener(m, C, g), () => p.removeEventListener(m, C, g)), f = $e(
    () => [ji(t), Jo(a)],
    ([p, m]) => {
      if (u(), !p)
        return;
      const C = Bm(m) ? { ...m } : m;
      l.push(
        ...r.flatMap((g) => i.map((b) => c(p, g, b, C)))
      );
    },
    { immediate: !0, flush: "post" }
  ), h = () => {
    f(), u();
  };
  return o2(h), h;
}
let cf = !1;
function df(e, t, r = {}) {
  const { window: i = s2, ignore: a = [], capture: l = !0, detectIframe: u = !1 } = r;
  if (!i)
    return qi;
  C1 && !cf && (cf = !0, Array.from(i.document.body.children).forEach((g) => g.addEventListener("click", qi)), i.document.documentElement.addEventListener("click", qi));
  let c = !0;
  const f = (g) => Jo(a).some((b) => {
    if (typeof b == "string")
      return Array.from(i.document.querySelectorAll(b)).some((M) => M === g.target || g.composedPath().includes(M));
    {
      const M = ji(b);
      return M && (g.target === M || g.composedPath().includes(M));
    }
  }), h = (g) => {
    const b = ji(e);
    if (!(!b || b === g.target || g.composedPath().includes(b))) {
      if (g.detail === 0 && (c = !f(g)), !c) {
        c = !0;
        return;
      }
      t(g);
    }
  };
  let p = !1;
  const m = [
    va(i, "click", (g) => {
      p || (p = !0, setTimeout(() => {
        p = !1;
      }, 0), h(g));
    }, { passive: !0, capture: l }),
    va(i, "pointerdown", (g) => {
      const b = ji(e);
      c = !f(g) && !!(b && !g.composedPath().includes(b));
    }, { passive: !0 }),
    u && va(i, "blur", (g) => {
      setTimeout(() => {
        var b;
        const M = ji(e);
        ((b = i.document.activeElement) == null ? void 0 : b.tagName) === "IFRAME" && !(M != null && M.contains(i.document.activeElement)) && t(g);
      }, 0);
    })
  ].filter(Boolean);
  return () => m.forEach((g) => g());
}
const j1 = {
  [uf.mounted](e, t) {
    const r = !t.modifiers.bubble;
    if (typeof t.value == "function")
      e.__onClickOutside_stop = df(e, t.value, { capture: r });
    else {
      const [i, a] = t.value;
      e.__onClickOutside_stop = df(e, i, Object.assign({ capture: r }, a));
    }
  },
  [uf.unmounted](e) {
    e.__onClickOutside_stop();
  }
};
function s1(e) {
  return typeof Window < "u" && e instanceof Window ? e.document.documentElement : typeof Document < "u" && e instanceof Document ? e.documentElement : e;
}
function a2(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const r = e.parentNode;
    return !r || r.tagName === "BODY" ? !1 : a2(r);
  }
}
function Nm(e) {
  const t = e || window.event, r = t.target;
  return a2(r) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.preventDefault(), !1);
}
const a1 = /* @__PURE__ */ new WeakMap();
function jm(e, t = !1) {
  const r = ie(t);
  let i = null, a = "";
  $e(Fm(e), (c) => {
    const f = s1(Jo(c));
    if (f) {
      const h = f;
      if (a1.get(h) || a1.set(h, h.style.overflow), h.style.overflow !== "hidden" && (a = h.style.overflow), h.style.overflow === "hidden")
        return r.value = !0;
      if (r.value)
        return h.style.overflow = "hidden";
    }
  }, {
    immediate: !0
  });
  const l = () => {
    const c = s1(Jo(e));
    !c || r.value || (C1 && (i = va(
      c,
      "touchmove",
      (f) => {
        Nm(f);
      },
      { passive: !1 }
    )), c.style.overflow = "hidden", r.value = !0);
  }, u = () => {
    const c = s1(Jo(e));
    !c || !r.value || (C1 && (i == null || i()), c.style.overflow = a, a1.delete(c), r.value = !1);
  };
  return o2(u), T({
    get() {
      return r.value;
    },
    set(c) {
      c ? l() : u();
    }
  });
}
function Um() {
  let e = !1;
  const t = ie(!1);
  return (r, i) => {
    if (t.value = i.value, e)
      return;
    e = !0;
    const a = jm(r, i.value);
    $e(t, (l) => a.value = l);
  };
}
Um();
const Zm = { class: "select-list-yui-kit" }, zm = ["open"], qm = /* @__PURE__ */ oe({
  __name: "SelectList",
  props: {
    isOpened: { type: Boolean, default: !1 },
    disableOpen: { type: Boolean },
    headerClasses: {},
    optionsClasses: {},
    disabled: { type: Boolean }
  },
  emits: ["change", "focusout-options"],
  setup(e, { emit: t }) {
    const r = e, i = Fe({
      isOpened: !1
    }), a = ie(null), l = ie(null), u = t;
    It(() => i.isOpened = r.isOpened);
    const c = () => {
      r.disabled || r.disableOpen || (i.isOpened = !i.isOpened, u("change", i.isOpened));
    }, f = () => {
      i.isOpened = !1, u("focusout-options"), u("change", i.isOpened);
    }, h = () => {
      if (l.value && a.value && i.isOpened) {
        const p = l.value.getBoundingClientRect();
        a.value.style.top = `${p.top + p.height}px`;
      }
    };
    return $e(
      () => r.isOpened,
      () => {
        i.isOpened = r.isOpened;
      }
    ), $e(() => i.isOpened, h), ze(() => {
      window.addEventListener("scroll", h, !0);
    }), ai(() => {
      window.removeEventListener("scroll", h, !0);
    }), (p, m) => jt(($(), P("div", Zm, [
      V("div", {
        ref_key: "currentRef",
        ref: l,
        class: le([
          "select-list-yui-kit__current",
          { "active-yui-kit": i.isOpened },
          { "disabled-yui-kit": r.disabled },
          r == null ? void 0 : r.headerClasses
        ]),
        tabindex: "0",
        onKeyup: _o(c, ["enter"]),
        onClick: c
      }, [
        Be(p.$slots, "header", {}, void 0, !0)
      ], 34),
      jt(V("ul", {
        ref_key: "dropdownRef",
        ref: a,
        class: le(["select-list-yui-kit__list", r == null ? void 0 : r.optionsClasses]),
        open: i.isOpened
      }, [
        Be(p.$slots, "options", {}, void 0, !0)
      ], 10, zm), [
        [B0, i.isOpened]
      ])
    ])), [
      [
        L(j1),
        f,
        void 0,
        { bubble: !0 }
      ]
    ]);
  }
}), ui = /* @__PURE__ */ be(qm, [["__scopeId", "data-v-e66ee65f"]]);
function Hi(e) {
  return e !== null && typeof e == "object" && "key" in e;
}
function ff(e) {
  return e !== null && Array.isArray(e) && typeof e[0] == "object" && "key" in e[0];
}
const U1 = (e) => e !== null && typeof e == "object" && "hint" in e, Ri = (e) => e !== null && Array.isArray(e) && U1(e[0]), Gm = ["onClick"], Xm = /* @__PURE__ */ oe({
  __name: "Options",
  props: {
    options: {},
    defaultOption: {},
    class: {},
    disabled: { type: Boolean }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const r = e, i = Fe({
      choosedOption: r.defaultOption ?? (r.options[0] || ""),
      lengthOption: 0
    });
    $e(
      () => r.defaultOption,
      () => {
        r.defaultOption ? i.choosedOption = r.defaultOption : i.choosedOption = "";
      },
      { immediate: !0 }
    );
    const a = t, l = T(() => ({
      "select-list-yui-kit__item": !0,
      "truncate-yui-kit": !0
    })), u = (h) => {
      i.choosedOption = h, Hi(i.choosedOption) ? a("change", i.choosedOption.key) : a("change", i.choosedOption);
    }, c = (h) => {
      let p = !1;
      return Hi(h) ? Hi(i.choosedOption) ? h.value === i.choosedOption.value && (p = !0) : ((h.key === "null" || h.key === null) && i.choosedOption === "" && (p = !0), h.value === i.choosedOption && (p = !0)) : Hi(i.choosedOption) ? h === i.choosedOption.value && (p = !0) : h === i.choosedOption && (p = !0), {
        active: p
      };
    }, f = (h) => U1(h) ? h.hint : Hi(h) ? h.value : h;
    return (h, p) => ($(!0), P(Re, null, Ze(r.options, (m) => ($(), P(Re, { key: m }, [
      V("li", {
        class: le([l.value, c(m), r.class]),
        onClick: () => u(m)
      }, ye(f(m)), 11, Gm),
      Be(h.$slots, "default", {}, void 0, !0)
    ], 64))), 128));
  }
}), Ha = /* @__PURE__ */ be(Xm, [["__scopeId", "data-v-df12a2c6"]]), Km = { class: "truncate-yui-kit dropdown-yui-kit__text" }, Jm = /* @__PURE__ */ oe({
  __name: "Dropdown",
  props: {
    options: {},
    defaultOption: {},
    class: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const r = e, i = Fe({
      choosedOption: r.defaultOption || r.options[0] || "",
      isOpened: !1
    }), a = t, l = (c) => {
      i.isOpened = c;
    }, u = (c) => {
      let f;
      if (ff(r.options)) {
        const h = r.options.find((p) => p.key === c);
        i.choosedOption = (h == null ? void 0 : h.value) || c, f = h == null ? void 0 : h.key;
      } else
        i.choosedOption = c;
      i.isOpened = !1, a("change", f || c);
    };
    return $e(
      () => r.defaultOption,
      () => {
        r.defaultOption && (i.choosedOption = r.defaultOption);
      }
    ), ze(() => {
      ff(r.options) && (i.choosedOption = r.defaultOption || r.options[0].value);
    }), (c, f) => ($(), ge(ui, {
      onChange: l,
      "is-opened": i.isOpened,
      class: le([r.class, "dropdown-yui-kit"]),
      disabled: r.disabled
    }, {
      header: me(() => [
        V("span", Km, ye(i.choosedOption), 1),
        i.isOpened ? ($(), ge(Ee, {
          key: 0,
          name: L(xe).chevronUp
        }, null, 8, ["name"])) : ne("", !0),
        i.isOpened ? ne("", !0) : ($(), ge(Ee, {
          key: 1,
          name: L(xe).chevronDown
        }, null, 8, ["name"]))
      ]),
      options: me(() => [
        J(Ha, {
          options: r.options,
          "default-option": r.defaultOption,
          onChange: u
        }, null, 8, ["options", "default-option"])
      ]),
      _: 1
    }, 8, ["is-opened", "class", "disabled"]));
  }
}), l2 = /* @__PURE__ */ be(Jm, [["__scopeId", "data-v-3671695a"]]);
var Jt = "top", Dn = "bottom", Sn = "right", Qt = "left", Z1 = "auto", ls = [Jt, Dn, Sn, Qt], ti = "start", es = "end", Qm = "clippingParents", u2 = "viewport", Vi = "popper", ey = "reference", hf = /* @__PURE__ */ ls.reduce(function(e, t) {
  return e.concat([t + "-" + ti, t + "-" + es]);
}, []), c2 = /* @__PURE__ */ [].concat(ls, [Z1]).reduce(function(e, t) {
  return e.concat([t, t + "-" + ti, t + "-" + es]);
}, []), ty = "beforeRead", ny = "read", ry = "afterRead", oy = "beforeMain", iy = "main", sy = "afterMain", ay = "beforeWrite", ly = "write", uy = "afterWrite", cy = [ty, ny, ry, oy, iy, sy, ay, ly, uy];
function Jn(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function cn(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function wo(e) {
  var t = cn(e).Element;
  return e instanceof t || e instanceof Element;
}
function $n(e) {
  var t = cn(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function z1(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = cn(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function dy(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var i = t.styles[r] || {}, a = t.attributes[r] || {}, l = t.elements[r];
    !$n(l) || !Jn(l) || (Object.assign(l.style, i), Object.keys(a).forEach(function(u) {
      var c = a[u];
      c === !1 ? l.removeAttribute(u) : l.setAttribute(u, c === !0 ? "" : c);
    }));
  });
}
function fy(e) {
  var t = e.state, r = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow), function() {
    Object.keys(t.elements).forEach(function(i) {
      var a = t.elements[i], l = t.attributes[i] || {}, u = Object.keys(t.styles.hasOwnProperty(i) ? t.styles[i] : r[i]), c = u.reduce(function(f, h) {
        return f[h] = "", f;
      }, {});
      !$n(a) || !Jn(a) || (Object.assign(a.style, c), Object.keys(l).forEach(function(f) {
        a.removeAttribute(f);
      }));
    });
  };
}
const hy = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: dy,
  effect: fy,
  requires: ["computeStyles"]
};
function Kn(e) {
  return e.split("-")[0];
}
var yo = Math.max, wa = Math.min, ni = Math.round;
function b1() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function d2() {
  return !/^((?!chrome|android).)*safari/i.test(b1());
}
function ri(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var i = e.getBoundingClientRect(), a = 1, l = 1;
  t && $n(e) && (a = e.offsetWidth > 0 && ni(i.width) / e.offsetWidth || 1, l = e.offsetHeight > 0 && ni(i.height) / e.offsetHeight || 1);
  var u = wo(e) ? cn(e) : window, c = u.visualViewport, f = !d2() && r, h = (i.left + (f && c ? c.offsetLeft : 0)) / a, p = (i.top + (f && c ? c.offsetTop : 0)) / l, m = i.width / a, C = i.height / l;
  return {
    width: m,
    height: C,
    top: p,
    right: h + m,
    bottom: p + C,
    left: h,
    x: h,
    y: p
  };
}
function q1(e) {
  var t = ri(e), r = e.offsetWidth, i = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: i
  };
}
function f2(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && z1(r)) {
    var i = t;
    do {
      if (i && e.isSameNode(i))
        return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function _r(e) {
  return cn(e).getComputedStyle(e);
}
function py(e) {
  return ["table", "td", "th"].indexOf(Jn(e)) >= 0;
}
function qr(e) {
  return ((wo(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Ra(e) {
  return Jn(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (z1(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    qr(e)
  );
}
function pf(e) {
  return !$n(e) || // https://github.com/popperjs/popper-core/issues/837
  _r(e).position === "fixed" ? null : e.offsetParent;
}
function vy(e) {
  var t = /firefox/i.test(b1()), r = /Trident/i.test(b1());
  if (r && $n(e)) {
    var i = _r(e);
    if (i.position === "fixed")
      return null;
  }
  var a = Ra(e);
  for (z1(a) && (a = a.host); $n(a) && ["html", "body"].indexOf(Jn(a)) < 0; ) {
    var l = _r(a);
    if (l.transform !== "none" || l.perspective !== "none" || l.contain === "paint" || ["transform", "perspective"].indexOf(l.willChange) !== -1 || t && l.willChange === "filter" || t && l.filter && l.filter !== "none")
      return a;
    a = a.parentNode;
  }
  return null;
}
function us(e) {
  for (var t = cn(e), r = pf(e); r && py(r) && _r(r).position === "static"; )
    r = pf(r);
  return r && (Jn(r) === "html" || Jn(r) === "body" && _r(r).position === "static") ? t : r || vy(e) || t;
}
function G1(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Gi(e, t, r) {
  return yo(e, wa(t, r));
}
function gy(e, t, r) {
  var i = Gi(e, t, r);
  return i > r ? r : i;
}
function h2() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function p2(e) {
  return Object.assign({}, h2(), e);
}
function v2(e, t) {
  return t.reduce(function(r, i) {
    return r[i] = e, r;
  }, {});
}
var my = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, p2(typeof t != "number" ? t : v2(t, ls));
};
function yy(e) {
  var t, r = e.state, i = e.name, a = e.options, l = r.elements.arrow, u = r.modifiersData.popperOffsets, c = Kn(r.placement), f = G1(c), h = [Qt, Sn].indexOf(c) >= 0, p = h ? "height" : "width";
  if (!(!l || !u)) {
    var m = my(a.padding, r), C = q1(l), g = f === "y" ? Jt : Qt, b = f === "y" ? Dn : Sn, M = r.rects.reference[p] + r.rects.reference[f] - u[f] - r.rects.popper[p], A = u[f] - r.rects.reference[f], D = us(l), Y = D ? f === "y" ? D.clientHeight || 0 : D.clientWidth || 0 : 0, K = M / 2 - A / 2, H = m[g], I = Y - C[p] - m[b], U = Y / 2 - C[p] / 2 + K, E = Gi(H, U, I), ee = f;
    r.modifiersData[i] = (t = {}, t[ee] = E, t.centerOffset = E - U, t);
  }
}
function _y(e) {
  var t = e.state, r = e.options, i = r.element, a = i === void 0 ? "[data-popper-arrow]" : i;
  a != null && (typeof a == "string" && (a = t.elements.popper.querySelector(a), !a) || f2(t.elements.popper, a) && (t.elements.arrow = a));
}
const Cy = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: yy,
  effect: _y,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function oi(e) {
  return e.split("-")[1];
}
var by = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function wy(e, t) {
  var r = e.x, i = e.y, a = t.devicePixelRatio || 1;
  return {
    x: ni(r * a) / a || 0,
    y: ni(i * a) / a || 0
  };
}
function vf(e) {
  var t, r = e.popper, i = e.popperRect, a = e.placement, l = e.variation, u = e.offsets, c = e.position, f = e.gpuAcceleration, h = e.adaptive, p = e.roundOffsets, m = e.isFixed, C = u.x, g = C === void 0 ? 0 : C, b = u.y, M = b === void 0 ? 0 : b, A = typeof p == "function" ? p({
    x: g,
    y: M
  }) : {
    x: g,
    y: M
  };
  g = A.x, M = A.y;
  var D = u.hasOwnProperty("x"), Y = u.hasOwnProperty("y"), K = Qt, H = Jt, I = window;
  if (h) {
    var U = us(r), E = "clientHeight", ee = "clientWidth";
    if (U === cn(r) && (U = qr(r), _r(U).position !== "static" && c === "absolute" && (E = "scrollHeight", ee = "scrollWidth")), U = U, a === Jt || (a === Qt || a === Sn) && l === es) {
      H = Dn;
      var ue = m && U === I && I.visualViewport ? I.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        U[E]
      );
      M -= ue - i.height, M *= f ? 1 : -1;
    }
    if (a === Qt || (a === Jt || a === Dn) && l === es) {
      K = Sn;
      var W = m && U === I && I.visualViewport ? I.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        U[ee]
      );
      g -= W - i.width, g *= f ? 1 : -1;
    }
  }
  var N = Object.assign({
    position: c
  }, h && by), G = p === !0 ? wy({
    x: g,
    y: M
  }, cn(r)) : {
    x: g,
    y: M
  };
  if (g = G.x, M = G.y, f) {
    var re;
    return Object.assign({}, N, (re = {}, re[H] = Y ? "0" : "", re[K] = D ? "0" : "", re.transform = (I.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + M + "px)" : "translate3d(" + g + "px, " + M + "px, 0)", re));
  }
  return Object.assign({}, N, (t = {}, t[H] = Y ? M + "px" : "", t[K] = D ? g + "px" : "", t.transform = "", t));
}
function ky(e) {
  var t = e.state, r = e.options, i = r.gpuAcceleration, a = i === void 0 ? !0 : i, l = r.adaptive, u = l === void 0 ? !0 : l, c = r.roundOffsets, f = c === void 0 ? !0 : c, h = {
    placement: Kn(t.placement),
    variation: oi(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: a,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, vf(Object.assign({}, h, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: u,
    roundOffsets: f
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, vf(Object.assign({}, h, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: f
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const $y = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: ky,
  data: {}
};
var oa = {
  passive: !0
};
function My(e) {
  var t = e.state, r = e.instance, i = e.options, a = i.scroll, l = a === void 0 ? !0 : a, u = i.resize, c = u === void 0 ? !0 : u, f = cn(t.elements.popper), h = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return l && h.forEach(function(p) {
    p.addEventListener("scroll", r.update, oa);
  }), c && f.addEventListener("resize", r.update, oa), function() {
    l && h.forEach(function(p) {
      p.removeEventListener("scroll", r.update, oa);
    }), c && f.removeEventListener("resize", r.update, oa);
  };
}
const Dy = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: My,
  data: {}
};
var Sy = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ga(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Sy[t];
  });
}
var Oy = {
  start: "end",
  end: "start"
};
function gf(e) {
  return e.replace(/start|end/g, function(t) {
    return Oy[t];
  });
}
function X1(e) {
  var t = cn(e), r = t.pageXOffset, i = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: i
  };
}
function K1(e) {
  return ri(qr(e)).left + X1(e).scrollLeft;
}
function Ly(e, t) {
  var r = cn(e), i = qr(e), a = r.visualViewport, l = i.clientWidth, u = i.clientHeight, c = 0, f = 0;
  if (a) {
    l = a.width, u = a.height;
    var h = d2();
    (h || !h && t === "fixed") && (c = a.offsetLeft, f = a.offsetTop);
  }
  return {
    width: l,
    height: u,
    x: c + K1(e),
    y: f
  };
}
function xy(e) {
  var t, r = qr(e), i = X1(e), a = (t = e.ownerDocument) == null ? void 0 : t.body, l = yo(r.scrollWidth, r.clientWidth, a ? a.scrollWidth : 0, a ? a.clientWidth : 0), u = yo(r.scrollHeight, r.clientHeight, a ? a.scrollHeight : 0, a ? a.clientHeight : 0), c = -i.scrollLeft + K1(e), f = -i.scrollTop;
  return _r(a || r).direction === "rtl" && (c += yo(r.clientWidth, a ? a.clientWidth : 0) - l), {
    width: l,
    height: u,
    x: c,
    y: f
  };
}
function J1(e) {
  var t = _r(e), r = t.overflow, i = t.overflowX, a = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + a + i);
}
function g2(e) {
  return ["html", "body", "#document"].indexOf(Jn(e)) >= 0 ? e.ownerDocument.body : $n(e) && J1(e) ? e : g2(Ra(e));
}
function Xi(e, t) {
  var r;
  t === void 0 && (t = []);
  var i = g2(e), a = i === ((r = e.ownerDocument) == null ? void 0 : r.body), l = cn(i), u = a ? [l].concat(l.visualViewport || [], J1(i) ? i : []) : i, c = t.concat(u);
  return a ? c : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    c.concat(Xi(Ra(u)))
  );
}
function w1(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Ty(e, t) {
  var r = ri(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function mf(e, t, r) {
  return t === u2 ? w1(Ly(e, r)) : wo(t) ? Ty(t, r) : w1(xy(qr(e)));
}
function Ay(e) {
  var t = Xi(Ra(e)), r = ["absolute", "fixed"].indexOf(_r(e).position) >= 0, i = r && $n(e) ? us(e) : e;
  return wo(i) ? t.filter(function(a) {
    return wo(a) && f2(a, i) && Jn(a) !== "body";
  }) : [];
}
function Py(e, t, r, i) {
  var a = t === "clippingParents" ? Ay(e) : [].concat(t), l = [].concat(a, [r]), u = l[0], c = l.reduce(function(f, h) {
    var p = mf(e, h, i);
    return f.top = yo(p.top, f.top), f.right = wa(p.right, f.right), f.bottom = wa(p.bottom, f.bottom), f.left = yo(p.left, f.left), f;
  }, mf(e, u, i));
  return c.width = c.right - c.left, c.height = c.bottom - c.top, c.x = c.left, c.y = c.top, c;
}
function m2(e) {
  var t = e.reference, r = e.element, i = e.placement, a = i ? Kn(i) : null, l = i ? oi(i) : null, u = t.x + t.width / 2 - r.width / 2, c = t.y + t.height / 2 - r.height / 2, f;
  switch (a) {
    case Jt:
      f = {
        x: u,
        y: t.y - r.height
      };
      break;
    case Dn:
      f = {
        x: u,
        y: t.y + t.height
      };
      break;
    case Sn:
      f = {
        x: t.x + t.width,
        y: c
      };
      break;
    case Qt:
      f = {
        x: t.x - r.width,
        y: c
      };
      break;
    default:
      f = {
        x: t.x,
        y: t.y
      };
  }
  var h = a ? G1(a) : null;
  if (h != null) {
    var p = h === "y" ? "height" : "width";
    switch (l) {
      case ti:
        f[h] = f[h] - (t[p] / 2 - r[p] / 2);
        break;
      case es:
        f[h] = f[h] + (t[p] / 2 - r[p] / 2);
        break;
    }
  }
  return f;
}
function ts(e, t) {
  t === void 0 && (t = {});
  var r = t, i = r.placement, a = i === void 0 ? e.placement : i, l = r.strategy, u = l === void 0 ? e.strategy : l, c = r.boundary, f = c === void 0 ? Qm : c, h = r.rootBoundary, p = h === void 0 ? u2 : h, m = r.elementContext, C = m === void 0 ? Vi : m, g = r.altBoundary, b = g === void 0 ? !1 : g, M = r.padding, A = M === void 0 ? 0 : M, D = p2(typeof A != "number" ? A : v2(A, ls)), Y = C === Vi ? ey : Vi, K = e.rects.popper, H = e.elements[b ? Y : C], I = Py(wo(H) ? H : H.contextElement || qr(e.elements.popper), f, p, u), U = ri(e.elements.reference), E = m2({
    reference: U,
    element: K,
    strategy: "absolute",
    placement: a
  }), ee = w1(Object.assign({}, K, E)), ue = C === Vi ? ee : U, W = {
    top: I.top - ue.top + D.top,
    bottom: ue.bottom - I.bottom + D.bottom,
    left: I.left - ue.left + D.left,
    right: ue.right - I.right + D.right
  }, N = e.modifiersData.offset;
  if (C === Vi && N) {
    var G = N[a];
    Object.keys(W).forEach(function(re) {
      var Ce = [Sn, Dn].indexOf(re) >= 0 ? 1 : -1, se = [Jt, Dn].indexOf(re) >= 0 ? "y" : "x";
      W[re] += G[se] * Ce;
    });
  }
  return W;
}
function Iy(e, t) {
  t === void 0 && (t = {});
  var r = t, i = r.placement, a = r.boundary, l = r.rootBoundary, u = r.padding, c = r.flipVariations, f = r.allowedAutoPlacements, h = f === void 0 ? c2 : f, p = oi(i), m = p ? c ? hf : hf.filter(function(b) {
    return oi(b) === p;
  }) : ls, C = m.filter(function(b) {
    return h.indexOf(b) >= 0;
  });
  C.length === 0 && (C = m);
  var g = C.reduce(function(b, M) {
    return b[M] = ts(e, {
      placement: M,
      boundary: a,
      rootBoundary: l,
      padding: u
    })[Kn(M)], b;
  }, {});
  return Object.keys(g).sort(function(b, M) {
    return g[b] - g[M];
  });
}
function Ey(e) {
  if (Kn(e) === Z1)
    return [];
  var t = ga(e);
  return [gf(e), t, gf(t)];
}
function Hy(e) {
  var t = e.state, r = e.options, i = e.name;
  if (!t.modifiersData[i]._skip) {
    for (var a = r.mainAxis, l = a === void 0 ? !0 : a, u = r.altAxis, c = u === void 0 ? !0 : u, f = r.fallbackPlacements, h = r.padding, p = r.boundary, m = r.rootBoundary, C = r.altBoundary, g = r.flipVariations, b = g === void 0 ? !0 : g, M = r.allowedAutoPlacements, A = t.options.placement, D = Kn(A), Y = D === A, K = f || (Y || !b ? [ga(A)] : Ey(A)), H = [A].concat(K).reduce(function(Ve, qe) {
      return Ve.concat(Kn(qe) === Z1 ? Iy(t, {
        placement: qe,
        boundary: p,
        rootBoundary: m,
        padding: h,
        flipVariations: b,
        allowedAutoPlacements: M
      }) : qe);
    }, []), I = t.rects.reference, U = t.rects.popper, E = /* @__PURE__ */ new Map(), ee = !0, ue = H[0], W = 0; W < H.length; W++) {
      var N = H[W], G = Kn(N), re = oi(N) === ti, Ce = [Jt, Dn].indexOf(G) >= 0, se = Ce ? "width" : "height", Oe = ts(t, {
        placement: N,
        boundary: p,
        rootBoundary: m,
        altBoundary: C,
        padding: h
      }), De = Ce ? re ? Sn : Qt : re ? Dn : Jt;
      I[se] > U[se] && (De = ga(De));
      var Ae = ga(De), Se = [];
      if (l && Se.push(Oe[G] <= 0), c && Se.push(Oe[De] <= 0, Oe[Ae] <= 0), Se.every(function(Ve) {
        return Ve;
      })) {
        ue = N, ee = !1;
        break;
      }
      E.set(N, Se);
    }
    if (ee)
      for (var X = b ? 3 : 1, _e = function(qe) {
        var st = H.find(function(at) {
          var rt = E.get(at);
          if (rt)
            return rt.slice(0, qe).every(function(vt) {
              return vt;
            });
        });
        if (st)
          return ue = st, "break";
      }, de = X; de > 0; de--) {
        var Qe = _e(de);
        if (Qe === "break") break;
      }
    t.placement !== ue && (t.modifiersData[i]._skip = !0, t.placement = ue, t.reset = !0);
  }
}
const Ry = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Hy,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function yf(e, t, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - r.y,
    right: e.right - t.width + r.x,
    bottom: e.bottom - t.height + r.y,
    left: e.left - t.width - r.x
  };
}
function _f(e) {
  return [Jt, Sn, Dn, Qt].some(function(t) {
    return e[t] >= 0;
  });
}
function Vy(e) {
  var t = e.state, r = e.name, i = t.rects.reference, a = t.rects.popper, l = t.modifiersData.preventOverflow, u = ts(t, {
    elementContext: "reference"
  }), c = ts(t, {
    altBoundary: !0
  }), f = yf(u, i), h = yf(c, a, l), p = _f(f), m = _f(h);
  t.modifiersData[r] = {
    referenceClippingOffsets: f,
    popperEscapeOffsets: h,
    isReferenceHidden: p,
    hasPopperEscaped: m
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": p,
    "data-popper-escaped": m
  });
}
const Yy = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Vy
};
function By(e, t, r) {
  var i = Kn(e), a = [Qt, Jt].indexOf(i) >= 0 ? -1 : 1, l = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, u = l[0], c = l[1];
  return u = u || 0, c = (c || 0) * a, [Qt, Sn].indexOf(i) >= 0 ? {
    x: c,
    y: u
  } : {
    x: u,
    y: c
  };
}
function Wy(e) {
  var t = e.state, r = e.options, i = e.name, a = r.offset, l = a === void 0 ? [0, 0] : a, u = c2.reduce(function(p, m) {
    return p[m] = By(m, t.rects, l), p;
  }, {}), c = u[t.placement], f = c.x, h = c.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += f, t.modifiersData.popperOffsets.y += h), t.modifiersData[i] = u;
}
const Fy = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Wy
};
function Ny(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = m2({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const jy = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Ny,
  data: {}
};
function Uy(e) {
  return e === "x" ? "y" : "x";
}
function Zy(e) {
  var t = e.state, r = e.options, i = e.name, a = r.mainAxis, l = a === void 0 ? !0 : a, u = r.altAxis, c = u === void 0 ? !1 : u, f = r.boundary, h = r.rootBoundary, p = r.altBoundary, m = r.padding, C = r.tether, g = C === void 0 ? !0 : C, b = r.tetherOffset, M = b === void 0 ? 0 : b, A = ts(t, {
    boundary: f,
    rootBoundary: h,
    padding: m,
    altBoundary: p
  }), D = Kn(t.placement), Y = oi(t.placement), K = !Y, H = G1(D), I = Uy(H), U = t.modifiersData.popperOffsets, E = t.rects.reference, ee = t.rects.popper, ue = typeof M == "function" ? M(Object.assign({}, t.rects, {
    placement: t.placement
  })) : M, W = typeof ue == "number" ? {
    mainAxis: ue,
    altAxis: ue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, ue), N = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, G = {
    x: 0,
    y: 0
  };
  if (U) {
    if (l) {
      var re, Ce = H === "y" ? Jt : Qt, se = H === "y" ? Dn : Sn, Oe = H === "y" ? "height" : "width", De = U[H], Ae = De + A[Ce], Se = De - A[se], X = g ? -ee[Oe] / 2 : 0, _e = Y === ti ? E[Oe] : ee[Oe], de = Y === ti ? -ee[Oe] : -E[Oe], Qe = t.elements.arrow, Ve = g && Qe ? q1(Qe) : {
        width: 0,
        height: 0
      }, qe = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : h2(), st = qe[Ce], at = qe[se], rt = Gi(0, E[Oe], Ve[Oe]), vt = K ? E[Oe] / 2 - X - rt - st - W.mainAxis : _e - rt - st - W.mainAxis, On = K ? -E[Oe] / 2 + X + rt + at + W.mainAxis : de + rt + at + W.mainAxis, St = t.elements.arrow && us(t.elements.arrow), Ct = St ? H === "y" ? St.clientTop || 0 : St.clientLeft || 0 : 0, Ht = (re = N == null ? void 0 : N[H]) != null ? re : 0, ft = De + vt - Ht - Ct, dn = De + On - Ht, fn = Gi(g ? wa(Ae, ft) : Ae, De, g ? yo(Se, dn) : Se);
      U[H] = fn, G[H] = fn - De;
    }
    if (c) {
      var bt, Yn = H === "x" ? Jt : Qt, or = H === "x" ? Dn : Sn, wt = U[I], ht = I === "y" ? "height" : "width", Ut = wt + A[Yn], en = wt - A[or], Bn = [Jt, Qt].indexOf(D) !== -1, Zt = (bt = N == null ? void 0 : N[I]) != null ? bt : 0, Wn = Bn ? Ut : wt - E[ht] - ee[ht] - Zt + W.altAxis, tn = Bn ? wt + E[ht] + ee[ht] - Zt - W.altAxis : en, nn = g && Bn ? gy(Wn, wt, tn) : Gi(g ? Wn : Ut, wt, g ? tn : en);
      U[I] = nn, G[I] = nn - wt;
    }
    t.modifiersData[i] = G;
  }
}
const zy = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Zy,
  requiresIfExists: ["offset"]
};
function qy(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Gy(e) {
  return e === cn(e) || !$n(e) ? X1(e) : qy(e);
}
function Xy(e) {
  var t = e.getBoundingClientRect(), r = ni(t.width) / e.offsetWidth || 1, i = ni(t.height) / e.offsetHeight || 1;
  return r !== 1 || i !== 1;
}
function Ky(e, t, r) {
  r === void 0 && (r = !1);
  var i = $n(t), a = $n(t) && Xy(t), l = qr(t), u = ri(e, a, r), c = {
    scrollLeft: 0,
    scrollTop: 0
  }, f = {
    x: 0,
    y: 0
  };
  return (i || !i && !r) && ((Jn(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  J1(l)) && (c = Gy(t)), $n(t) ? (f = ri(t, !0), f.x += t.clientLeft, f.y += t.clientTop) : l && (f.x = K1(l))), {
    x: u.left + c.scrollLeft - f.x,
    y: u.top + c.scrollTop - f.y,
    width: u.width,
    height: u.height
  };
}
function Jy(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), i = [];
  e.forEach(function(l) {
    t.set(l.name, l);
  });
  function a(l) {
    r.add(l.name);
    var u = [].concat(l.requires || [], l.requiresIfExists || []);
    u.forEach(function(c) {
      if (!r.has(c)) {
        var f = t.get(c);
        f && a(f);
      }
    }), i.push(l);
  }
  return e.forEach(function(l) {
    r.has(l.name) || a(l);
  }), i;
}
function Qy(e) {
  var t = Jy(e);
  return cy.reduce(function(r, i) {
    return r.concat(t.filter(function(a) {
      return a.phase === i;
    }));
  }, []);
}
function e_(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function t_(e) {
  var t = e.reduce(function(r, i) {
    var a = r[i.name];
    return r[i.name] = a ? Object.assign({}, a, i, {
      options: Object.assign({}, a.options, i.options),
      data: Object.assign({}, a.data, i.data)
    }) : i, r;
  }, {});
  return Object.keys(t).map(function(r) {
    return t[r];
  });
}
var Cf = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function bf() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(i) {
    return !(i && typeof i.getBoundingClientRect == "function");
  });
}
function n_(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, i = r === void 0 ? [] : r, a = t.defaultOptions, l = a === void 0 ? Cf : a;
  return function(c, f, h) {
    h === void 0 && (h = l);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Cf, l),
      modifiersData: {},
      elements: {
        reference: c,
        popper: f
      },
      attributes: {},
      styles: {}
    }, m = [], C = !1, g = {
      state: p,
      setOptions: function(D) {
        var Y = typeof D == "function" ? D(p.options) : D;
        M(), p.options = Object.assign({}, l, p.options, Y), p.scrollParents = {
          reference: wo(c) ? Xi(c) : c.contextElement ? Xi(c.contextElement) : [],
          popper: Xi(f)
        };
        var K = Qy(t_([].concat(i, p.options.modifiers)));
        return p.orderedModifiers = K.filter(function(H) {
          return H.enabled;
        }), b(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!C) {
          var D = p.elements, Y = D.reference, K = D.popper;
          if (bf(Y, K)) {
            p.rects = {
              reference: Ky(Y, us(K), p.options.strategy === "fixed"),
              popper: q1(K)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(W) {
              return p.modifiersData[W.name] = Object.assign({}, W.data);
            });
            for (var H = 0; H < p.orderedModifiers.length; H++) {
              if (p.reset === !0) {
                p.reset = !1, H = -1;
                continue;
              }
              var I = p.orderedModifiers[H], U = I.fn, E = I.options, ee = E === void 0 ? {} : E, ue = I.name;
              typeof U == "function" && (p = U({
                state: p,
                options: ee,
                name: ue,
                instance: g
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: e_(function() {
        return new Promise(function(A) {
          g.forceUpdate(), A(p);
        });
      }),
      destroy: function() {
        M(), C = !0;
      }
    };
    if (!bf(c, f))
      return g;
    g.setOptions(h).then(function(A) {
      !C && h.onFirstUpdate && h.onFirstUpdate(A);
    });
    function b() {
      p.orderedModifiers.forEach(function(A) {
        var D = A.name, Y = A.options, K = Y === void 0 ? {} : Y, H = A.effect;
        if (typeof H == "function") {
          var I = H({
            state: p,
            name: D,
            instance: g,
            options: K
          }), U = function() {
          };
          m.push(I || U);
        }
      });
    }
    function M() {
      m.forEach(function(A) {
        return A();
      }), m = [];
    }
    return g;
  };
}
var r_ = [Dy, jy, $y, hy, Fy, Ry, zy, Cy, Yy], o_ = /* @__PURE__ */ n_({
  defaultModifiers: r_
}), i_ = Object.defineProperty, s_ = (e, t, r) => t in e ? i_(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, fe = (e, t, r) => (s_(e, typeof t != "symbol" ? t + "" : t, r), r), ia = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function y2(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var a_ = Object.prototype, l_ = a_.hasOwnProperty;
function u_(e, t) {
  return e != null && l_.call(e, t);
}
var c_ = u_, d_ = Array.isArray, Rn = d_, f_ = typeof ia == "object" && ia && ia.Object === Object && ia, _2 = f_, h_ = _2, p_ = typeof self == "object" && self && self.Object === Object && self, v_ = h_ || p_ || Function("return this")(), nr = v_, g_ = nr, m_ = g_.Symbol, Va = m_, wf = Va, C2 = Object.prototype, y_ = C2.hasOwnProperty, __ = C2.toString, Yi = wf ? wf.toStringTag : void 0;
function C_(e) {
  var t = y_.call(e, Yi), r = e[Yi];
  try {
    e[Yi] = void 0;
    var i = !0;
  } catch {
  }
  var a = __.call(e);
  return i && (t ? e[Yi] = r : delete e[Yi]), a;
}
var b_ = C_, w_ = Object.prototype, k_ = w_.toString;
function $_(e) {
  return k_.call(e);
}
var M_ = $_, kf = Va, D_ = b_, S_ = M_, O_ = "[object Null]", L_ = "[object Undefined]", $f = kf ? kf.toStringTag : void 0;
function x_(e) {
  return e == null ? e === void 0 ? L_ : O_ : $f && $f in Object(e) ? D_(e) : S_(e);
}
var rr = x_;
function T_(e) {
  return e != null && typeof e == "object";
}
var Vn = T_, A_ = rr, P_ = Vn, I_ = "[object Symbol]";
function E_(e) {
  return typeof e == "symbol" || P_(e) && A_(e) == I_;
}
var Q1 = E_, H_ = Rn, R_ = Q1, V_ = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Y_ = /^\w*$/;
function B_(e, t) {
  if (H_(e))
    return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || R_(e) ? !0 : Y_.test(e) || !V_.test(e) || t != null && e in Object(t);
}
var eu = B_;
function W_(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var $r = W_, F_ = rr, N_ = $r, j_ = "[object AsyncFunction]", U_ = "[object Function]", Z_ = "[object GeneratorFunction]", z_ = "[object Proxy]";
function q_(e) {
  if (!N_(e))
    return !1;
  var t = F_(e);
  return t == U_ || t == Z_ || t == j_ || t == z_;
}
var Mo = q_, G_ = nr, X_ = G_["__core-js_shared__"], K_ = X_, l1 = K_, Mf = function() {
  var e = /[^.]+$/.exec(l1 && l1.keys && l1.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function J_(e) {
  return !!Mf && Mf in e;
}
var Q_ = J_, eC = Function.prototype, tC = eC.toString;
function nC(e) {
  if (e != null) {
    try {
      return tC.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var b2 = nC, rC = Mo, oC = Q_, iC = $r, sC = b2, aC = /[\\^$.*+?()[\]{}|]/g, lC = /^\[object .+?Constructor\]$/, uC = Function.prototype, cC = Object.prototype, dC = uC.toString, fC = cC.hasOwnProperty, hC = RegExp(
  "^" + dC.call(fC).replace(aC, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function pC(e) {
  if (!iC(e) || oC(e))
    return !1;
  var t = rC(e) ? hC : lC;
  return t.test(sC(e));
}
var vC = pC;
function gC(e, t) {
  return e == null ? void 0 : e[t];
}
var mC = gC, yC = vC, _C = mC;
function CC(e, t) {
  var r = _C(e, t);
  return yC(r) ? r : void 0;
}
var Do = CC, bC = Do, wC = bC(Object, "create"), Ya = wC, Df = Ya;
function kC() {
  this.__data__ = Df ? Df(null) : {}, this.size = 0;
}
var $C = kC;
function MC(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var DC = MC, SC = Ya, OC = "__lodash_hash_undefined__", LC = Object.prototype, xC = LC.hasOwnProperty;
function TC(e) {
  var t = this.__data__;
  if (SC) {
    var r = t[e];
    return r === OC ? void 0 : r;
  }
  return xC.call(t, e) ? t[e] : void 0;
}
var AC = TC, PC = Ya, IC = Object.prototype, EC = IC.hasOwnProperty;
function HC(e) {
  var t = this.__data__;
  return PC ? t[e] !== void 0 : EC.call(t, e);
}
var RC = HC, VC = Ya, YC = "__lodash_hash_undefined__";
function BC(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = VC && t === void 0 ? YC : t, this;
}
var WC = BC, FC = $C, NC = DC, jC = AC, UC = RC, ZC = WC;
function ci(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var i = e[t];
    this.set(i[0], i[1]);
  }
}
ci.prototype.clear = FC;
ci.prototype.delete = NC;
ci.prototype.get = jC;
ci.prototype.has = UC;
ci.prototype.set = ZC;
var zC = ci;
function qC() {
  this.__data__ = [], this.size = 0;
}
var GC = qC;
function XC(e, t) {
  return e === t || e !== e && t !== t;
}
var di = XC, KC = di;
function JC(e, t) {
  for (var r = e.length; r--; )
    if (KC(e[r][0], t))
      return r;
  return -1;
}
var Ba = JC, QC = Ba, eb = Array.prototype, tb = eb.splice;
function nb(e) {
  var t = this.__data__, r = QC(t, e);
  if (r < 0)
    return !1;
  var i = t.length - 1;
  return r == i ? t.pop() : tb.call(t, r, 1), --this.size, !0;
}
var rb = nb, ob = Ba;
function ib(e) {
  var t = this.__data__, r = ob(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var sb = ib, ab = Ba;
function lb(e) {
  return ab(this.__data__, e) > -1;
}
var ub = lb, cb = Ba;
function db(e, t) {
  var r = this.__data__, i = cb(r, e);
  return i < 0 ? (++this.size, r.push([e, t])) : r[i][1] = t, this;
}
var fb = db, hb = GC, pb = rb, vb = sb, gb = ub, mb = fb;
function fi(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var i = e[t];
    this.set(i[0], i[1]);
  }
}
fi.prototype.clear = hb;
fi.prototype.delete = pb;
fi.prototype.get = vb;
fi.prototype.has = gb;
fi.prototype.set = mb;
var Wa = fi, yb = Do, _b = nr, Cb = yb(_b, "Map"), tu = Cb, Sf = zC, bb = Wa, wb = tu;
function kb() {
  this.size = 0, this.__data__ = {
    hash: new Sf(),
    map: new (wb || bb)(),
    string: new Sf()
  };
}
var $b = kb;
function Mb(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Db = Mb, Sb = Db;
function Ob(e, t) {
  var r = e.__data__;
  return Sb(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var Fa = Ob, Lb = Fa;
function xb(e) {
  var t = Lb(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var Tb = xb, Ab = Fa;
function Pb(e) {
  return Ab(this, e).get(e);
}
var Ib = Pb, Eb = Fa;
function Hb(e) {
  return Eb(this, e).has(e);
}
var Rb = Hb, Vb = Fa;
function Yb(e, t) {
  var r = Vb(this, e), i = r.size;
  return r.set(e, t), this.size += r.size == i ? 0 : 1, this;
}
var Bb = Yb, Wb = $b, Fb = Tb, Nb = Ib, jb = Rb, Ub = Bb;
function hi(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var i = e[t];
    this.set(i[0], i[1]);
  }
}
hi.prototype.clear = Wb;
hi.prototype.delete = Fb;
hi.prototype.get = Nb;
hi.prototype.has = jb;
hi.prototype.set = Ub;
var nu = hi, w2 = nu, Zb = "Expected a function";
function ru(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Zb);
  var r = function() {
    var i = arguments, a = t ? t.apply(this, i) : i[0], l = r.cache;
    if (l.has(a))
      return l.get(a);
    var u = e.apply(this, i);
    return r.cache = l.set(a, u) || l, u;
  };
  return r.cache = new (ru.Cache || w2)(), r;
}
ru.Cache = w2;
var zb = ru, qb = zb, Gb = 500;
function Xb(e) {
  var t = qb(e, function(i) {
    return r.size === Gb && r.clear(), i;
  }), r = t.cache;
  return t;
}
var Kb = Xb, Jb = Kb, Qb = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ew = /\\(\\)?/g, tw = Jb(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Qb, function(r, i, a, l) {
    t.push(a ? l.replace(ew, "$1") : i || r);
  }), t;
}), nw = tw;
function rw(e, t) {
  for (var r = -1, i = e == null ? 0 : e.length, a = Array(i); ++r < i; )
    a[r] = t(e[r], r, e);
  return a;
}
var ow = rw, Of = Va, iw = ow, sw = Rn, aw = Q1, lw = 1 / 0, Lf = Of ? Of.prototype : void 0, xf = Lf ? Lf.toString : void 0;
function k2(e) {
  if (typeof e == "string")
    return e;
  if (sw(e))
    return iw(e, k2) + "";
  if (aw(e))
    return xf ? xf.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -lw ? "-0" : t;
}
var uw = k2, cw = uw;
function dw(e) {
  return e == null ? "" : cw(e);
}
var fw = dw, hw = Rn, pw = eu, vw = nw, gw = fw;
function mw(e, t) {
  return hw(e) ? e : pw(e, t) ? [e] : vw(gw(e));
}
var $2 = mw, yw = rr, _w = Vn, Cw = "[object Arguments]";
function bw(e) {
  return _w(e) && yw(e) == Cw;
}
var ww = bw, Tf = ww, kw = Vn, M2 = Object.prototype, $w = M2.hasOwnProperty, Mw = M2.propertyIsEnumerable, Dw = Tf(/* @__PURE__ */ function() {
  return arguments;
}()) ? Tf : function(e) {
  return kw(e) && $w.call(e, "callee") && !Mw.call(e, "callee");
}, ou = Dw, Sw = 9007199254740991, Ow = /^(?:0|[1-9]\d*)$/;
function Lw(e, t) {
  var r = typeof e;
  return t = t ?? Sw, !!t && (r == "number" || r != "symbol" && Ow.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var iu = Lw, xw = 9007199254740991;
function Tw(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= xw;
}
var su = Tw, Aw = Q1, Pw = 1 / 0;
function Iw(e) {
  if (typeof e == "string" || Aw(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Pw ? "-0" : t;
}
var Na = Iw, Ew = $2, Hw = ou, Rw = Rn, Vw = iu, Yw = su, Bw = Na;
function Ww(e, t, r) {
  t = Ew(t, e);
  for (var i = -1, a = t.length, l = !1; ++i < a; ) {
    var u = Bw(t[i]);
    if (!(l = e != null && r(e, u)))
      break;
    e = e[u];
  }
  return l || ++i != a ? l : (a = e == null ? 0 : e.length, !!a && Yw(a) && Vw(u, a) && (Rw(e) || Hw(e)));
}
var D2 = Ww, Fw = c_, Nw = D2;
function jw(e, t) {
  return e != null && Nw(e, t, Fw);
}
var S2 = jw, Uw = rr, Zw = Vn, zw = "[object Date]";
function qw(e) {
  return Zw(e) && Uw(e) == zw;
}
var Gw = qw;
function Xw(e) {
  return function(t) {
    return e(t);
  };
}
var O2 = Xw, ns = {}, Kw = {
  get exports() {
    return ns;
  },
  set exports(e) {
    ns = e;
  }
};
(function(e, t) {
  var r = _2, i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, l = a && a.exports === i, u = l && r.process, c = function() {
    try {
      var f = a && a.require && a.require("util").types;
      return f || u && u.binding && u.binding("util");
    } catch {
    }
  }();
  e.exports = c;
})(Kw, ns);
var Jw = Gw, Qw = O2, Af = ns, Pf = Af && Af.isDate, ek = Pf ? Qw(Pf) : Jw, tk = ek, nk = rr, rk = Rn, ok = Vn, ik = "[object String]";
function sk(e) {
  return typeof e == "string" || !rk(e) && ok(e) && nk(e) == ik;
}
var zn = sk;
function ak(e, t) {
  for (var r = -1, i = e == null ? 0 : e.length; ++r < i; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
var L2 = ak, lk = Wa;
function uk() {
  this.__data__ = new lk(), this.size = 0;
}
var ck = uk;
function dk(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var fk = dk;
function hk(e) {
  return this.__data__.get(e);
}
var pk = hk;
function vk(e) {
  return this.__data__.has(e);
}
var gk = vk, mk = Wa, yk = tu, _k = nu, Ck = 200;
function bk(e, t) {
  var r = this.__data__;
  if (r instanceof mk) {
    var i = r.__data__;
    if (!yk || i.length < Ck - 1)
      return i.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new _k(i);
  }
  return r.set(e, t), this.size = r.size, this;
}
var wk = bk, kk = Wa, $k = ck, Mk = fk, Dk = pk, Sk = gk, Ok = wk;
function pi(e) {
  var t = this.__data__ = new kk(e);
  this.size = t.size;
}
pi.prototype.clear = $k;
pi.prototype.delete = Mk;
pi.prototype.get = Dk;
pi.prototype.has = Sk;
pi.prototype.set = Ok;
var au = pi, Lk = "__lodash_hash_undefined__";
function xk(e) {
  return this.__data__.set(e, Lk), this;
}
var Tk = xk;
function Ak(e) {
  return this.__data__.has(e);
}
var Pk = Ak, Ik = nu, Ek = Tk, Hk = Pk;
function ka(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new Ik(); ++t < r; )
    this.add(e[t]);
}
ka.prototype.add = ka.prototype.push = Ek;
ka.prototype.has = Hk;
var Rk = ka;
function Vk(e, t) {
  return e.has(t);
}
var Yk = Vk, Bk = Rk, Wk = L2, Fk = Yk, Nk = 1, jk = 2;
function Uk(e, t, r, i, a, l) {
  var u = r & Nk, c = e.length, f = t.length;
  if (c != f && !(u && f > c))
    return !1;
  var h = l.get(e), p = l.get(t);
  if (h && p)
    return h == t && p == e;
  var m = -1, C = !0, g = r & jk ? new Bk() : void 0;
  for (l.set(e, t), l.set(t, e); ++m < c; ) {
    var b = e[m], M = t[m];
    if (i)
      var A = u ? i(M, b, m, t, e, l) : i(b, M, m, e, t, l);
    if (A !== void 0) {
      if (A)
        continue;
      C = !1;
      break;
    }
    if (g) {
      if (!Wk(t, function(D, Y) {
        if (!Fk(g, Y) && (b === D || a(b, D, r, i, l)))
          return g.push(Y);
      })) {
        C = !1;
        break;
      }
    } else if (!(b === M || a(b, M, r, i, l))) {
      C = !1;
      break;
    }
  }
  return l.delete(e), l.delete(t), C;
}
var x2 = Uk, Zk = nr, zk = Zk.Uint8Array, T2 = zk;
function qk(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(i, a) {
    r[++t] = [a, i];
  }), r;
}
var Gk = qk;
function Xk(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(i) {
    r[++t] = i;
  }), r;
}
var Kk = Xk, If = Va, Ef = T2, Jk = di, Qk = x2, e$ = Gk, t$ = Kk, n$ = 1, r$ = 2, o$ = "[object Boolean]", i$ = "[object Date]", s$ = "[object Error]", a$ = "[object Map]", l$ = "[object Number]", u$ = "[object RegExp]", c$ = "[object Set]", d$ = "[object String]", f$ = "[object Symbol]", h$ = "[object ArrayBuffer]", p$ = "[object DataView]", Hf = If ? If.prototype : void 0, u1 = Hf ? Hf.valueOf : void 0;
function v$(e, t, r, i, a, l, u) {
  switch (r) {
    case p$:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case h$:
      return !(e.byteLength != t.byteLength || !l(new Ef(e), new Ef(t)));
    case o$:
    case i$:
    case l$:
      return Jk(+e, +t);
    case s$:
      return e.name == t.name && e.message == t.message;
    case u$:
    case d$:
      return e == t + "";
    case a$:
      var c = e$;
    case c$:
      var f = i & n$;
      if (c || (c = t$), e.size != t.size && !f)
        return !1;
      var h = u.get(e);
      if (h)
        return h == t;
      i |= r$, u.set(e, t);
      var p = Qk(c(e), c(t), i, a, l, u);
      return u.delete(e), p;
    case f$:
      if (u1)
        return u1.call(e) == u1.call(t);
  }
  return !1;
}
var g$ = v$;
function m$(e, t) {
  for (var r = -1, i = t.length, a = e.length; ++r < i; )
    e[a + r] = t[r];
  return e;
}
var y$ = m$, _$ = y$, C$ = Rn;
function b$(e, t, r) {
  var i = t(e);
  return C$(e) ? i : _$(i, r(e));
}
var w$ = b$;
function k$(e, t) {
  for (var r = -1, i = e == null ? 0 : e.length, a = 0, l = []; ++r < i; ) {
    var u = e[r];
    t(u, r, e) && (l[a++] = u);
  }
  return l;
}
var $$ = k$;
function M$() {
  return [];
}
var D$ = M$, S$ = $$, O$ = D$, L$ = Object.prototype, x$ = L$.propertyIsEnumerable, Rf = Object.getOwnPropertySymbols, T$ = Rf ? function(e) {
  return e == null ? [] : (e = Object(e), S$(Rf(e), function(t) {
    return x$.call(e, t);
  }));
} : O$, A$ = T$;
function P$(e, t) {
  for (var r = -1, i = Array(e); ++r < e; )
    i[r] = t(r);
  return i;
}
var I$ = P$, ii = {}, E$ = {
  get exports() {
    return ii;
  },
  set exports(e) {
    ii = e;
  }
};
function H$() {
  return !1;
}
var R$ = H$;
(function(e, t) {
  var r = nr, i = R$, a = t && !t.nodeType && t, l = a && !0 && e && !e.nodeType && e, u = l && l.exports === a, c = u ? r.Buffer : void 0, f = c ? c.isBuffer : void 0, h = f || i;
  e.exports = h;
})(E$, ii);
var V$ = rr, Y$ = su, B$ = Vn, W$ = "[object Arguments]", F$ = "[object Array]", N$ = "[object Boolean]", j$ = "[object Date]", U$ = "[object Error]", Z$ = "[object Function]", z$ = "[object Map]", q$ = "[object Number]", G$ = "[object Object]", X$ = "[object RegExp]", K$ = "[object Set]", J$ = "[object String]", Q$ = "[object WeakMap]", eM = "[object ArrayBuffer]", tM = "[object DataView]", nM = "[object Float32Array]", rM = "[object Float64Array]", oM = "[object Int8Array]", iM = "[object Int16Array]", sM = "[object Int32Array]", aM = "[object Uint8Array]", lM = "[object Uint8ClampedArray]", uM = "[object Uint16Array]", cM = "[object Uint32Array]", tt = {};
tt[nM] = tt[rM] = tt[oM] = tt[iM] = tt[sM] = tt[aM] = tt[lM] = tt[uM] = tt[cM] = !0;
tt[W$] = tt[F$] = tt[eM] = tt[N$] = tt[tM] = tt[j$] = tt[U$] = tt[Z$] = tt[z$] = tt[q$] = tt[G$] = tt[X$] = tt[K$] = tt[J$] = tt[Q$] = !1;
function dM(e) {
  return B$(e) && Y$(e.length) && !!tt[V$(e)];
}
var fM = dM, hM = fM, pM = O2, Vf = ns, Yf = Vf && Vf.isTypedArray, vM = Yf ? pM(Yf) : hM, lu = vM, gM = I$, mM = ou, yM = Rn, _M = ii, CM = iu, bM = lu, wM = Object.prototype, kM = wM.hasOwnProperty;
function $M(e, t) {
  var r = yM(e), i = !r && mM(e), a = !r && !i && _M(e), l = !r && !i && !a && bM(e), u = r || i || a || l, c = u ? gM(e.length, String) : [], f = c.length;
  for (var h in e)
    (t || kM.call(e, h)) && !(u && // Safari 9 has enumerable `arguments.length` in strict mode.
    (h == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    a && (h == "offset" || h == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    l && (h == "buffer" || h == "byteLength" || h == "byteOffset") || // Skip index properties.
    CM(h, f))) && c.push(h);
  return c;
}
var A2 = $M, MM = Object.prototype;
function DM(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || MM;
  return e === r;
}
var uu = DM;
function SM(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var P2 = SM, OM = P2, LM = OM(Object.keys, Object), xM = LM, TM = uu, AM = xM, PM = Object.prototype, IM = PM.hasOwnProperty;
function EM(e) {
  if (!TM(e))
    return AM(e);
  var t = [];
  for (var r in Object(e))
    IM.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var HM = EM, RM = Mo, VM = su;
function YM(e) {
  return e != null && VM(e.length) && !RM(e);
}
var cs = YM, BM = A2, WM = HM, FM = cs;
function NM(e) {
  return FM(e) ? BM(e) : WM(e);
}
var cu = NM, jM = w$, UM = A$, ZM = cu;
function zM(e) {
  return jM(e, ZM, UM);
}
var qM = zM, Bf = qM, GM = 1, XM = Object.prototype, KM = XM.hasOwnProperty;
function JM(e, t, r, i, a, l) {
  var u = r & GM, c = Bf(e), f = c.length, h = Bf(t), p = h.length;
  if (f != p && !u)
    return !1;
  for (var m = f; m--; ) {
    var C = c[m];
    if (!(u ? C in t : KM.call(t, C)))
      return !1;
  }
  var g = l.get(e), b = l.get(t);
  if (g && b)
    return g == t && b == e;
  var M = !0;
  l.set(e, t), l.set(t, e);
  for (var A = u; ++m < f; ) {
    C = c[m];
    var D = e[C], Y = t[C];
    if (i)
      var K = u ? i(Y, D, C, t, e, l) : i(D, Y, C, e, t, l);
    if (!(K === void 0 ? D === Y || a(D, Y, r, i, l) : K)) {
      M = !1;
      break;
    }
    A || (A = C == "constructor");
  }
  if (M && !A) {
    var H = e.constructor, I = t.constructor;
    H != I && "constructor" in e && "constructor" in t && !(typeof H == "function" && H instanceof H && typeof I == "function" && I instanceof I) && (M = !1);
  }
  return l.delete(e), l.delete(t), M;
}
var QM = JM, eD = Do, tD = nr, nD = eD(tD, "DataView"), rD = nD, oD = Do, iD = nr, sD = oD(iD, "Promise"), aD = sD, lD = Do, uD = nr, cD = lD(uD, "Set"), dD = cD, fD = Do, hD = nr, pD = fD(hD, "WeakMap"), vD = pD, k1 = rD, $1 = tu, M1 = aD, D1 = dD, S1 = vD, I2 = rr, vi = b2, Wf = "[object Map]", gD = "[object Object]", Ff = "[object Promise]", Nf = "[object Set]", jf = "[object WeakMap]", Uf = "[object DataView]", mD = vi(k1), yD = vi($1), _D = vi(M1), CD = vi(D1), bD = vi(S1), co = I2;
(k1 && co(new k1(new ArrayBuffer(1))) != Uf || $1 && co(new $1()) != Wf || M1 && co(M1.resolve()) != Ff || D1 && co(new D1()) != Nf || S1 && co(new S1()) != jf) && (co = function(e) {
  var t = I2(e), r = t == gD ? e.constructor : void 0, i = r ? vi(r) : "";
  if (i)
    switch (i) {
      case mD:
        return Uf;
      case yD:
        return Wf;
      case _D:
        return Ff;
      case CD:
        return Nf;
      case bD:
        return jf;
    }
  return t;
});
var wD = co, c1 = au, kD = x2, $D = g$, MD = QM, Zf = wD, zf = Rn, qf = ii, DD = lu, SD = 1, Gf = "[object Arguments]", Xf = "[object Array]", sa = "[object Object]", OD = Object.prototype, Kf = OD.hasOwnProperty;
function LD(e, t, r, i, a, l) {
  var u = zf(e), c = zf(t), f = u ? Xf : Zf(e), h = c ? Xf : Zf(t);
  f = f == Gf ? sa : f, h = h == Gf ? sa : h;
  var p = f == sa, m = h == sa, C = f == h;
  if (C && qf(e)) {
    if (!qf(t))
      return !1;
    u = !0, p = !1;
  }
  if (C && !p)
    return l || (l = new c1()), u || DD(e) ? kD(e, t, r, i, a, l) : $D(e, t, f, r, i, a, l);
  if (!(r & SD)) {
    var g = p && Kf.call(e, "__wrapped__"), b = m && Kf.call(t, "__wrapped__");
    if (g || b) {
      var M = g ? e.value() : e, A = b ? t.value() : t;
      return l || (l = new c1()), a(M, A, r, i, l);
    }
  }
  return C ? (l || (l = new c1()), MD(e, t, r, i, a, l)) : !1;
}
var xD = LD, TD = xD, Jf = Vn;
function E2(e, t, r, i, a) {
  return e === t ? !0 : e == null || t == null || !Jf(e) && !Jf(t) ? e !== e && t !== t : TD(e, t, r, i, E2, a);
}
var H2 = E2, AD = au, PD = H2, ID = 1, ED = 2;
function HD(e, t, r, i) {
  var a = r.length, l = a, u = !i;
  if (e == null)
    return !l;
  for (e = Object(e); a--; ) {
    var c = r[a];
    if (u && c[2] ? c[1] !== e[c[0]] : !(c[0] in e))
      return !1;
  }
  for (; ++a < l; ) {
    c = r[a];
    var f = c[0], h = e[f], p = c[1];
    if (u && c[2]) {
      if (h === void 0 && !(f in e))
        return !1;
    } else {
      var m = new AD();
      if (i)
        var C = i(h, p, f, e, t, m);
      if (!(C === void 0 ? PD(p, h, ID | ED, i, m) : C))
        return !1;
    }
  }
  return !0;
}
var RD = HD, VD = $r;
function YD(e) {
  return e === e && !VD(e);
}
var R2 = YD, BD = R2, WD = cu;
function FD(e) {
  for (var t = WD(e), r = t.length; r--; ) {
    var i = t[r], a = e[i];
    t[r] = [i, a, BD(a)];
  }
  return t;
}
var ND = FD;
function jD(e, t) {
  return function(r) {
    return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
  };
}
var V2 = jD, UD = RD, ZD = ND, zD = V2;
function qD(e) {
  var t = ZD(e);
  return t.length == 1 && t[0][2] ? zD(t[0][0], t[0][1]) : function(r) {
    return r === e || UD(r, e, t);
  };
}
var GD = qD, XD = $2, KD = Na;
function JD(e, t) {
  t = XD(t, e);
  for (var r = 0, i = t.length; e != null && r < i; )
    e = e[KD(t[r++])];
  return r && r == i ? e : void 0;
}
var Y2 = JD, QD = Y2;
function eS(e, t, r) {
  var i = e == null ? void 0 : QD(e, t);
  return i === void 0 ? r : i;
}
var go = eS;
function tS(e, t) {
  return e != null && t in Object(e);
}
var nS = tS, rS = nS, oS = D2;
function iS(e, t) {
  return e != null && oS(e, t, rS);
}
var sS = iS, aS = H2, lS = go, uS = sS, cS = eu, dS = R2, fS = V2, hS = Na, pS = 1, vS = 2;
function gS(e, t) {
  return cS(e) && dS(t) ? fS(hS(e), t) : function(r) {
    var i = lS(r, e);
    return i === void 0 && i === t ? uS(r, e) : aS(t, i, pS | vS);
  };
}
var mS = gS;
function yS(e) {
  return e;
}
var du = yS;
function _S(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
var CS = _S, bS = Y2;
function wS(e) {
  return function(t) {
    return bS(t, e);
  };
}
var kS = wS, $S = CS, MS = kS, DS = eu, SS = Na;
function OS(e) {
  return DS(e) ? $S(SS(e)) : MS(e);
}
var LS = OS, xS = GD, TS = mS, AS = du, PS = Rn, IS = LS;
function ES(e) {
  return typeof e == "function" ? e : e == null ? AS : typeof e == "object" ? PS(e) ? TS(e[0], e[1]) : xS(e) : IS(e);
}
var B2 = ES;
function HS(e) {
  return function(t, r, i) {
    for (var a = -1, l = Object(t), u = i(t), c = u.length; c--; ) {
      var f = u[e ? c : ++a];
      if (r(l[f], f, l) === !1)
        break;
    }
    return t;
  };
}
var RS = HS, VS = RS, YS = VS(), W2 = YS, BS = W2, WS = cu;
function FS(e, t) {
  return e && BS(e, t, WS);
}
var F2 = FS, NS = cs;
function jS(e, t) {
  return function(r, i) {
    if (r == null)
      return r;
    if (!NS(r))
      return e(r, i);
    for (var a = r.length, l = t ? a : -1, u = Object(r); (t ? l-- : ++l < a) && i(u[l], l, u) !== !1; )
      ;
    return r;
  };
}
var US = jS, ZS = F2, zS = US, qS = zS(ZS), GS = qS, XS = GS;
function KS(e, t) {
  var r;
  return XS(e, function(i, a, l) {
    return r = t(i, a, l), !r;
  }), !!r;
}
var JS = KS, QS = di, eO = cs, tO = iu, nO = $r;
function rO(e, t, r) {
  if (!nO(r))
    return !1;
  var i = typeof t;
  return (i == "number" ? eO(r) && tO(t, r.length) : i == "string" && t in r) ? QS(r[t], e) : !1;
}
var fu = rO, oO = L2, iO = B2, sO = JS, aO = Rn, lO = fu;
function uO(e, t, r) {
  var i = aO(e) ? oO : sO;
  return r && lO(e, t, r) && (t = void 0), i(e, iO(t));
}
var cO = uO, dO = rr, fO = Vn, hO = "[object Boolean]";
function pO(e) {
  return e === !0 || e === !1 || fO(e) && dO(e) == hO;
}
var vO = pO, gO = rr, mO = Vn, yO = "[object Number]";
function _O(e) {
  return typeof e == "number" || mO(e) && gO(e) == yO;
}
var Hn = _O, CO = Do, bO = function() {
  try {
    var e = CO(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), N2 = bO, Qf = N2;
function wO(e, t, r) {
  t == "__proto__" && Qf ? Qf(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var ja = wO, kO = ja, $O = di, MO = Object.prototype, DO = MO.hasOwnProperty;
function SO(e, t, r) {
  var i = e[t];
  (!(DO.call(e, t) && $O(i, r)) || r === void 0 && !(t in e)) && kO(e, t, r);
}
var OO = SO, LO = ja, xO = F2, TO = B2;
function AO(e, t) {
  var r = {};
  return t = TO(t), xO(e, function(i, a, l) {
    LO(r, a, t(i, a, l));
  }), r;
}
var PO = AO;
function IO(e, t, r) {
  switch (r.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, r[0]);
    case 2:
      return e.call(t, r[0], r[1]);
    case 3:
      return e.call(t, r[0], r[1], r[2]);
  }
  return e.apply(t, r);
}
var j2 = IO, EO = j2, e0 = Math.max;
function HO(e, t, r) {
  return t = e0(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var i = arguments, a = -1, l = e0(i.length - t, 0), u = Array(l); ++a < l; )
      u[a] = i[t + a];
    a = -1;
    for (var c = Array(t + 1); ++a < t; )
      c[a] = i[a];
    return c[t] = r(u), EO(e, this, c);
  };
}
var RO = HO;
function VO(e) {
  return function() {
    return e;
  };
}
var YO = VO, BO = YO, t0 = N2, WO = du, FO = t0 ? function(e, t) {
  return t0(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: BO(t),
    writable: !0
  });
} : WO, NO = FO, jO = 800, UO = 16, ZO = Date.now;
function zO(e) {
  var t = 0, r = 0;
  return function() {
    var i = ZO(), a = UO - (i - r);
    if (r = i, a > 0) {
      if (++t >= jO)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var qO = zO, GO = NO, XO = qO, KO = XO(GO), JO = KO, QO = du, eL = RO, tL = JO;
function nL(e, t) {
  return tL(eL(e, t, QO), e + "");
}
var hu = nL;
function rL(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var oL = rL, iL = $r, sL = uu, aL = oL, lL = Object.prototype, uL = lL.hasOwnProperty;
function cL(e) {
  if (!iL(e))
    return aL(e);
  var t = sL(e), r = [];
  for (var i in e)
    i == "constructor" && (t || !uL.call(e, i)) || r.push(i);
  return r;
}
var dL = cL, fL = A2, hL = dL, pL = cs;
function vL(e) {
  return pL(e) ? fL(e, !0) : hL(e);
}
var pu = vL, gL = hu, mL = di, yL = fu, _L = pu, U2 = Object.prototype, CL = U2.hasOwnProperty, bL = gL(function(e, t) {
  e = Object(e);
  var r = -1, i = t.length, a = i > 2 ? t[2] : void 0;
  for (a && yL(t[0], t[1], a) && (i = 1); ++r < i; )
    for (var l = t[r], u = _L(l), c = -1, f = u.length; ++c < f; ) {
      var h = u[c], p = e[h];
      (p === void 0 || mL(p, U2[h]) && !CL.call(e, h)) && (e[h] = l[h]);
    }
  return e;
}), n0 = bL, wL = ja, kL = di;
function $L(e, t, r) {
  (r !== void 0 && !kL(e[t], r) || r === void 0 && !(t in e)) && wL(e, t, r);
}
var Z2 = $L, $a = {}, ML = {
  get exports() {
    return $a;
  },
  set exports(e) {
    $a = e;
  }
};
(function(e, t) {
  var r = nr, i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, l = a && a.exports === i, u = l ? r.Buffer : void 0, c = u ? u.allocUnsafe : void 0;
  function f(h, p) {
    if (p)
      return h.slice();
    var m = h.length, C = c ? c(m) : new h.constructor(m);
    return h.copy(C), C;
  }
  e.exports = f;
})(ML, $a);
var r0 = T2;
function DL(e) {
  var t = new e.constructor(e.byteLength);
  return new r0(t).set(new r0(e)), t;
}
var SL = DL, OL = SL;
function LL(e, t) {
  var r = t ? OL(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var xL = LL;
function TL(e, t) {
  var r = -1, i = e.length;
  for (t || (t = Array(i)); ++r < i; )
    t[r] = e[r];
  return t;
}
var AL = TL, PL = $r, o0 = Object.create, IL = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!PL(t))
      return {};
    if (o0)
      return o0(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), EL = IL, HL = P2, RL = HL(Object.getPrototypeOf, Object), z2 = RL, VL = EL, YL = z2, BL = uu;
function WL(e) {
  return typeof e.constructor == "function" && !BL(e) ? VL(YL(e)) : {};
}
var FL = WL, NL = cs, jL = Vn;
function UL(e) {
  return jL(e) && NL(e);
}
var ZL = UL, zL = rr, qL = z2, GL = Vn, XL = "[object Object]", KL = Function.prototype, JL = Object.prototype, q2 = KL.toString, QL = JL.hasOwnProperty, ex = q2.call(Object);
function tx(e) {
  if (!GL(e) || zL(e) != XL)
    return !1;
  var t = qL(e);
  if (t === null)
    return !0;
  var r = QL.call(t, "constructor") && t.constructor;
  return typeof r == "function" && r instanceof r && q2.call(r) == ex;
}
var nx = tx;
function rx(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var G2 = rx, ox = OO, ix = ja;
function sx(e, t, r, i) {
  var a = !r;
  r || (r = {});
  for (var l = -1, u = t.length; ++l < u; ) {
    var c = t[l], f = i ? i(r[c], e[c], c, r, e) : void 0;
    f === void 0 && (f = e[c]), a ? ix(r, c, f) : ox(r, c, f);
  }
  return r;
}
var ax = sx, lx = ax, ux = pu;
function cx(e) {
  return lx(e, ux(e));
}
var dx = cx, i0 = Z2, fx = $a, hx = xL, px = AL, vx = FL, s0 = ou, a0 = Rn, gx = ZL, mx = ii, yx = Mo, _x = $r, Cx = nx, bx = lu, l0 = G2, wx = dx;
function kx(e, t, r, i, a, l, u) {
  var c = l0(e, r), f = l0(t, r), h = u.get(f);
  if (h) {
    i0(e, r, h);
    return;
  }
  var p = l ? l(c, f, r + "", e, t, u) : void 0, m = p === void 0;
  if (m) {
    var C = a0(f), g = !C && mx(f), b = !C && !g && bx(f);
    p = f, C || g || b ? a0(c) ? p = c : gx(c) ? p = px(c) : g ? (m = !1, p = fx(f, !0)) : b ? (m = !1, p = hx(f, !0)) : p = [] : Cx(f) || s0(f) ? (p = c, s0(c) ? p = wx(c) : (!_x(c) || yx(c)) && (p = vx(f))) : m = !1;
  }
  m && (u.set(f, p), a(p, f, i, l, u), u.delete(f)), i0(e, r, p);
}
var $x = kx, Mx = au, Dx = Z2, Sx = W2, Ox = $x, Lx = $r, xx = pu, Tx = G2;
function X2(e, t, r, i, a) {
  e !== t && Sx(t, function(l, u) {
    if (a || (a = new Mx()), Lx(l))
      Ox(e, t, u, r, X2, i, a);
    else {
      var c = i ? i(Tx(e, u), l, u + "", e, t, a) : void 0;
      c === void 0 && (c = l), Dx(e, u, c);
    }
  }, xx);
}
var K2 = X2, Ax = K2, u0 = $r;
function J2(e, t, r, i, a, l) {
  return u0(e) && u0(t) && (l.set(t, e), Ax(e, t, void 0, J2, l), l.delete(t)), e;
}
var Px = J2, Ix = hu, Ex = fu;
function Hx(e) {
  return Ix(function(t, r) {
    var i = -1, a = r.length, l = a > 1 ? r[a - 1] : void 0, u = a > 2 ? r[2] : void 0;
    for (l = e.length > 3 && typeof l == "function" ? (a--, l) : void 0, u && Ex(r[0], r[1], u) && (l = a < 3 ? void 0 : l, a = 1), t = Object(t); ++i < a; ) {
      var c = r[i];
      c && e(t, c, i, l);
    }
    return t;
  });
}
var Rx = Hx, Vx = K2, Yx = Rx, Bx = Yx(function(e, t, r, i) {
  Vx(e, t, r, i);
}), Wx = Bx, Fx = j2, Nx = hu, jx = Px, Ux = Wx, Zx = Nx(function(e) {
  return e.push(void 0, jx), Fx(Ux, void 0, e);
}), rs = Zx;
function zx(e) {
  return e && e.length ? e[0] : void 0;
}
var Q2 = zx;
function qx(e) {
  var t = e == null ? 0 : e.length;
  return t ? e[t - 1] : void 0;
}
var Go = qx;
const Gx = (e) => Object.prototype.toString.call(e).slice(8, -1), Qo = (e) => tk(e) && !isNaN(e.getTime()), Cr = (e) => Gx(e) === "Object", eh = S2, c0 = (e, t) => cO(t, (r) => S2(e, r)), Ue = (e, t, r = "0") => {
  for (e = e != null ? String(e) : "", t = t || 2; e.length < t; )
    e = `${r}${e}`;
  return e;
}, Mn = (e) => Array.isArray(e), mr = (e) => Mn(e) && e.length > 0, Ma = (e) => e == null ? null : document && zn(e) ? document.querySelector(e) : e.$el ?? e, Fr = (e, t, r, i = void 0) => {
  e.removeEventListener(t, r, i);
}, Nr = (e, t, r, i = void 0) => (e.addEventListener(t, r, i), () => Fr(e, t, r, i)), ma = (e, t) => !!e && !!t && (e === t || e.contains(t)), aa = (e, t) => {
  (e.key === " " || e.key === "Enter") && (t(e), e.preventDefault());
}, th = (e, ...t) => {
  const r = {};
  let i;
  for (i in e)
    t.includes(i) || (r[i] = e[i]);
  return r;
}, nh = (e, t) => {
  const r = {};
  return t.forEach((i) => {
    i in e && (r[i] = e[i]);
  }), r;
};
function Xx(e, t, r) {
  return Math.min(Math.max(e, t), r);
}
var Da = {}, Kx = {
  get exports() {
    return Da;
  },
  set exports(e) {
    Da = e;
  }
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(i) {
    if (i === null || i === !0 || i === !1)
      return NaN;
    var a = Number(i);
    return isNaN(a) ? a : a < 0 ? Math.ceil(a) : Math.floor(a);
  }
  e.exports = t.default;
})(Kx, Da);
const Jx = /* @__PURE__ */ y2(Da);
var Sa = {}, Qx = {
  get exports() {
    return Sa;
  },
  set exports(e) {
    Sa = e;
  }
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = r;
  function r(i) {
    var a = new Date(Date.UTC(i.getFullYear(), i.getMonth(), i.getDate(), i.getHours(), i.getMinutes(), i.getSeconds(), i.getMilliseconds()));
    return a.setUTCFullYear(i.getFullYear()), i.getTime() - a.getTime();
  }
  e.exports = t.default;
})(Qx, Sa);
const d0 = /* @__PURE__ */ y2(Sa);
function eT(e, t) {
  var r = oT(t);
  return r.formatToParts ? nT(r, e) : rT(r, e);
}
var tT = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function nT(e, t) {
  try {
    for (var r = e.formatToParts(t), i = [], a = 0; a < r.length; a++) {
      var l = tT[r[a].type];
      l >= 0 && (i[l] = parseInt(r[a].value, 10));
    }
    return i;
  } catch (u) {
    if (u instanceof RangeError)
      return [NaN];
    throw u;
  }
}
function rT(e, t) {
  var r = e.format(t).replace(/\u200E/g, ""), i = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(r);
  return [i[3], i[1], i[2], i[4], i[5], i[6]];
}
var d1 = {};
function oT(e) {
  if (!d1[e]) {
    var t = new Intl.DateTimeFormat("en-US", {
      hour12: !1,
      timeZone: "America/New_York",
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(/* @__PURE__ */ new Date("2014-06-25T04:00:00.123Z")), r = t === "06/25/2014, 00:00:00" || t === "‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";
    d1[e] = r ? new Intl.DateTimeFormat("en-US", {
      hour12: !1,
      timeZone: e,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }) : new Intl.DateTimeFormat("en-US", {
      hourCycle: "h23",
      timeZone: e,
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  return d1[e];
}
function rh(e, t, r, i, a, l, u) {
  var c = /* @__PURE__ */ new Date(0);
  return c.setUTCFullYear(e, t, r), c.setUTCHours(i, a, l, u), c;
}
var f0 = 36e5, iT = 6e4, f1 = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-]\d{2})$/,
  timezoneHHMM: /^([+-]\d{2}):?(\d{2})$/
};
function sT(e, t, r) {
  var i, a;
  if (!e || (i = f1.timezoneZ.exec(e), i))
    return 0;
  var l;
  if (i = f1.timezoneHH.exec(e), i)
    return l = parseInt(i[1], 10), h0(l) ? -(l * f0) : NaN;
  if (i = f1.timezoneHHMM.exec(e), i) {
    l = parseInt(i[1], 10);
    var u = parseInt(i[2], 10);
    return h0(l, u) ? (a = Math.abs(l) * f0 + u * iT, l > 0 ? -a : a) : NaN;
  }
  if (uT(e)) {
    t = new Date(t || Date.now());
    var c = aT(t), f = O1(c, e), h = lT(t, f, e);
    return -h;
  }
  return NaN;
}
function aT(e) {
  return rh(
    e.getFullYear(),
    e.getMonth(),
    e.getDate(),
    e.getHours(),
    e.getMinutes(),
    e.getSeconds(),
    e.getMilliseconds()
  );
}
function O1(e, t) {
  var r = eT(e, t), i = rh(
    r[0],
    r[1] - 1,
    r[2],
    r[3] % 24,
    r[4],
    r[5],
    0
  ).getTime(), a = e.getTime(), l = a % 1e3;
  return a -= l >= 0 ? l : 1e3 + l, i - a;
}
function lT(e, t, r) {
  var i = e.getTime(), a = i - t, l = O1(new Date(a), r);
  if (t === l)
    return t;
  a -= l - t;
  var u = O1(new Date(a), r);
  return l === u ? l : Math.max(l, u);
}
function h0(e, t) {
  return -23 <= e && e <= 23 && (t == null || 0 <= t && t <= 59);
}
var p0 = {};
function uT(e) {
  if (p0[e])
    return !0;
  try {
    return new Intl.DateTimeFormat(void 0, { timeZone: e }), p0[e] = !0, !0;
  } catch {
    return !1;
  }
}
var cT = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;
const dT = cT;
var h1 = 36e5, v0 = 6e4, fT = 2, Nt = {
  dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
  datePattern: /^([0-9W+-]+)(.*)/,
  plainTime: /:/,
  // year tokens
  YY: /^(\d{2})$/,
  YYY: [
    /^([+-]\d{2})$/,
    // 0 additional digits
    /^([+-]\d{3})$/,
    // 1 additional digit
    /^([+-]\d{4})$/
    // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [
    /^([+-]\d{4})/,
    // 0 additional digits
    /^([+-]\d{5})/,
    // 1 additional digit
    /^([+-]\d{6})/
    // 2 additional digits
  ],
  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,
  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // time zone tokens (to identify the presence of a tz)
  timeZone: dT
};
function hT(e, t) {
  if (arguments.length < 1)
    throw new TypeError("1 argument required, but only " + arguments.length + " present");
  if (e === null)
    return /* @__PURE__ */ new Date(NaN);
  var r = t || {}, i = r.additionalDigits == null ? fT : Jx(r.additionalDigits);
  if (i !== 2 && i !== 1 && i !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]")
    return new Date(e.getTime());
  if (typeof e == "number" || Object.prototype.toString.call(e) === "[object Number]")
    return new Date(e);
  if (!(typeof e == "string" || Object.prototype.toString.call(e) === "[object String]"))
    return /* @__PURE__ */ new Date(NaN);
  var a = pT(e), l = vT(a.date, i), u = l.year, c = l.restDateString, f = gT(c, u);
  if (isNaN(f))
    return /* @__PURE__ */ new Date(NaN);
  if (f) {
    var h = f.getTime(), p = 0, m;
    if (a.time && (p = mT(a.time), isNaN(p)))
      return /* @__PURE__ */ new Date(NaN);
    if (a.timeZone || r.timeZone) {
      if (m = sT(a.timeZone || r.timeZone, new Date(h + p)), isNaN(m))
        return /* @__PURE__ */ new Date(NaN);
    } else
      m = d0(new Date(h + p)), m = d0(new Date(h + p + m));
    return new Date(h + p + m);
  } else
    return /* @__PURE__ */ new Date(NaN);
}
function pT(e) {
  var t = {}, r = Nt.dateTimePattern.exec(e), i;
  if (r ? (t.date = r[1], i = r[3]) : (r = Nt.datePattern.exec(e), r ? (t.date = r[1], i = r[2]) : (t.date = null, i = e)), i) {
    var a = Nt.timeZone.exec(i);
    a ? (t.time = i.replace(a[1], ""), t.timeZone = a[1].trim()) : t.time = i;
  }
  return t;
}
function vT(e, t) {
  var r = Nt.YYY[t], i = Nt.YYYYY[t], a;
  if (a = Nt.YYYY.exec(e) || i.exec(e), a) {
    var l = a[1];
    return {
      year: parseInt(l, 10),
      restDateString: e.slice(l.length)
    };
  }
  if (a = Nt.YY.exec(e) || r.exec(e), a) {
    var u = a[1];
    return {
      year: parseInt(u, 10) * 100,
      restDateString: e.slice(u.length)
    };
  }
  return {
    year: null
  };
}
function gT(e, t) {
  if (t === null)
    return null;
  var r, i, a, l;
  if (e.length === 0)
    return i = /* @__PURE__ */ new Date(0), i.setUTCFullYear(t), i;
  if (r = Nt.MM.exec(e), r)
    return i = /* @__PURE__ */ new Date(0), a = parseInt(r[1], 10) - 1, m0(t, a) ? (i.setUTCFullYear(t, a), i) : /* @__PURE__ */ new Date(NaN);
  if (r = Nt.DDD.exec(e), r) {
    i = /* @__PURE__ */ new Date(0);
    var u = parseInt(r[1], 10);
    return CT(t, u) ? (i.setUTCFullYear(t, 0, u), i) : /* @__PURE__ */ new Date(NaN);
  }
  if (r = Nt.MMDD.exec(e), r) {
    i = /* @__PURE__ */ new Date(0), a = parseInt(r[1], 10) - 1;
    var c = parseInt(r[2], 10);
    return m0(t, a, c) ? (i.setUTCFullYear(t, a, c), i) : /* @__PURE__ */ new Date(NaN);
  }
  if (r = Nt.Www.exec(e), r)
    return l = parseInt(r[1], 10) - 1, y0(t, l) ? g0(t, l) : /* @__PURE__ */ new Date(NaN);
  if (r = Nt.WwwD.exec(e), r) {
    l = parseInt(r[1], 10) - 1;
    var f = parseInt(r[2], 10) - 1;
    return y0(t, l, f) ? g0(t, l, f) : /* @__PURE__ */ new Date(NaN);
  }
  return null;
}
function mT(e) {
  var t, r, i;
  if (t = Nt.HH.exec(e), t)
    return r = parseFloat(t[1].replace(",", ".")), p1(r) ? r % 24 * h1 : NaN;
  if (t = Nt.HHMM.exec(e), t)
    return r = parseInt(t[1], 10), i = parseFloat(t[2].replace(",", ".")), p1(r, i) ? r % 24 * h1 + i * v0 : NaN;
  if (t = Nt.HHMMSS.exec(e), t) {
    r = parseInt(t[1], 10), i = parseInt(t[2], 10);
    var a = parseFloat(t[3].replace(",", "."));
    return p1(r, i, a) ? r % 24 * h1 + i * v0 + a * 1e3 : NaN;
  }
  return null;
}
function g0(e, t, r) {
  t = t || 0, r = r || 0;
  var i = /* @__PURE__ */ new Date(0);
  i.setUTCFullYear(e, 0, 4);
  var a = i.getUTCDay() || 7, l = t * 7 + r + 1 - a;
  return i.setUTCDate(i.getUTCDate() + l), i;
}
var yT = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], _T = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function oh(e) {
  return e % 400 === 0 || e % 4 === 0 && e % 100 !== 0;
}
function m0(e, t, r) {
  if (t < 0 || t > 11)
    return !1;
  if (r != null) {
    if (r < 1)
      return !1;
    var i = oh(e);
    if (i && r > _T[t] || !i && r > yT[t])
      return !1;
  }
  return !0;
}
function CT(e, t) {
  if (t < 1)
    return !1;
  var r = oh(e);
  return !(r && t > 366 || !r && t > 365);
}
function y0(e, t, r) {
  return !(t < 0 || t > 52 || r != null && (r < 0 || r > 6));
}
function p1(e, t, r) {
  return !(e != null && (e < 0 || e >= 25) || t != null && (t < 0 || t >= 60) || r != null && (r < 0 || r >= 60));
}
function Et(e, t) {
  if (t.length < e)
    throw new TypeError(e + " argument" + (e > 1 ? "s" : "") + " required, but only " + t.length + " present");
}
function ya(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? ya = function(r) {
    return typeof r;
  } : ya = function(r) {
    return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
  }, ya(e);
}
function Mr(e) {
  Et(1, arguments);
  var t = Object.prototype.toString.call(e);
  return e instanceof Date || ya(e) === "object" && t === "[object Date]" ? new Date(e.getTime()) : typeof e == "number" || t === "[object Number]" ? new Date(e) : ((typeof e == "string" || t === "[object String]") && typeof console < "u" && (console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"), console.warn(new Error().stack)), /* @__PURE__ */ new Date(NaN));
}
function gi(e) {
  if (e === null || e === !0 || e === !1)
    return NaN;
  var t = Number(e);
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
var bT = {};
function vu() {
  return bT;
}
function ko(e, t) {
  var r, i, a, l, u, c, f, h;
  Et(1, arguments);
  var p = vu(), m = gi((r = (i = (a = (l = t == null ? void 0 : t.weekStartsOn) !== null && l !== void 0 ? l : t == null || (u = t.locale) === null || u === void 0 || (c = u.options) === null || c === void 0 ? void 0 : c.weekStartsOn) !== null && a !== void 0 ? a : p.weekStartsOn) !== null && i !== void 0 ? i : (f = p.locale) === null || f === void 0 || (h = f.options) === null || h === void 0 ? void 0 : h.weekStartsOn) !== null && r !== void 0 ? r : 0);
  if (!(m >= 0 && m <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var C = Mr(e), g = C.getDay(), b = (g < m ? 7 : 0) + g - m;
  return C.setDate(C.getDate() - b), C.setHours(0, 0, 0, 0), C;
}
function _0(e) {
  var t = new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  return t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime();
}
var wT = 6048e5;
function kT(e, t, r) {
  Et(2, arguments);
  var i = ko(e, r), a = ko(t, r), l = i.getTime() - _0(i), u = a.getTime() - _0(a);
  return Math.round((l - u) / wT);
}
function $T(e) {
  Et(1, arguments);
  var t = Mr(e), r = t.getMonth();
  return t.setFullYear(t.getFullYear(), r + 1, 0), t.setHours(0, 0, 0, 0), t;
}
function MT(e) {
  Et(1, arguments);
  var t = Mr(e);
  return t.setDate(1), t.setHours(0, 0, 0, 0), t;
}
function DT(e, t) {
  return Et(1, arguments), kT($T(e), MT(e), t) + 1;
}
function ST(e, t) {
  var r, i, a, l, u, c, f, h;
  Et(1, arguments);
  var p = Mr(e), m = p.getFullYear(), C = vu(), g = gi((r = (i = (a = (l = t == null ? void 0 : t.firstWeekContainsDate) !== null && l !== void 0 ? l : t == null || (u = t.locale) === null || u === void 0 || (c = u.options) === null || c === void 0 ? void 0 : c.firstWeekContainsDate) !== null && a !== void 0 ? a : C.firstWeekContainsDate) !== null && i !== void 0 ? i : (f = C.locale) === null || f === void 0 || (h = f.options) === null || h === void 0 ? void 0 : h.firstWeekContainsDate) !== null && r !== void 0 ? r : 1);
  if (!(g >= 1 && g <= 7))
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  var b = /* @__PURE__ */ new Date(0);
  b.setFullYear(m + 1, 0, g), b.setHours(0, 0, 0, 0);
  var M = ko(b, t), A = /* @__PURE__ */ new Date(0);
  A.setFullYear(m, 0, g), A.setHours(0, 0, 0, 0);
  var D = ko(A, t);
  return p.getTime() >= M.getTime() ? m + 1 : p.getTime() >= D.getTime() ? m : m - 1;
}
function OT(e, t) {
  var r, i, a, l, u, c, f, h;
  Et(1, arguments);
  var p = vu(), m = gi((r = (i = (a = (l = t == null ? void 0 : t.firstWeekContainsDate) !== null && l !== void 0 ? l : t == null || (u = t.locale) === null || u === void 0 || (c = u.options) === null || c === void 0 ? void 0 : c.firstWeekContainsDate) !== null && a !== void 0 ? a : p.firstWeekContainsDate) !== null && i !== void 0 ? i : (f = p.locale) === null || f === void 0 || (h = f.options) === null || h === void 0 ? void 0 : h.firstWeekContainsDate) !== null && r !== void 0 ? r : 1), C = ST(e, t), g = /* @__PURE__ */ new Date(0);
  g.setFullYear(C, 0, m), g.setHours(0, 0, 0, 0);
  var b = ko(g, t);
  return b;
}
var LT = 6048e5;
function xT(e, t) {
  Et(1, arguments);
  var r = Mr(e), i = ko(r, t).getTime() - OT(r, t).getTime();
  return Math.round(i / LT) + 1;
}
function Oa(e) {
  return Et(1, arguments), ko(e, {
    weekStartsOn: 1
  });
}
function TT(e) {
  Et(1, arguments);
  var t = Mr(e), r = t.getFullYear(), i = /* @__PURE__ */ new Date(0);
  i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
  var a = Oa(i), l = /* @__PURE__ */ new Date(0);
  l.setFullYear(r, 0, 4), l.setHours(0, 0, 0, 0);
  var u = Oa(l);
  return t.getTime() >= a.getTime() ? r + 1 : t.getTime() >= u.getTime() ? r : r - 1;
}
function AT(e) {
  Et(1, arguments);
  var t = TT(e), r = /* @__PURE__ */ new Date(0);
  r.setFullYear(t, 0, 4), r.setHours(0, 0, 0, 0);
  var i = Oa(r);
  return i;
}
var PT = 6048e5;
function IT(e) {
  Et(1, arguments);
  var t = Mr(e), r = Oa(t).getTime() - AT(t).getTime();
  return Math.round(r / PT) + 1;
}
function Ft(e, t) {
  Et(2, arguments);
  var r = Mr(e), i = gi(t);
  return isNaN(i) ? /* @__PURE__ */ new Date(NaN) : (i && r.setDate(r.getDate() + i), r);
}
function La(e, t) {
  Et(2, arguments);
  var r = Mr(e), i = gi(t);
  if (isNaN(i))
    return /* @__PURE__ */ new Date(NaN);
  if (!i)
    return r;
  var a = r.getDate(), l = new Date(r.getTime());
  l.setMonth(r.getMonth() + i + 1, 0);
  var u = l.getDate();
  return a >= u ? l : (r.setFullYear(l.getFullYear(), l.getMonth(), a), r);
}
function C0(e, t) {
  Et(2, arguments);
  var r = gi(t);
  return La(e, r * 12);
}
const ET = {
  daily: ["year", "month", "day"],
  weekly: ["year", "month", "week"],
  monthly: ["year", "month"]
};
function HT({
  monthComps: e,
  prevMonthComps: t,
  nextMonthComps: r
}, i) {
  const a = [], {
    firstDayOfWeek: l,
    firstWeekday: u,
    isoWeeknumbers: c,
    weeknumbers: f,
    numDays: h,
    numWeeks: p
  } = e, m = u + (u < l ? Tt : 0) - l;
  let C = !0, g = !1, b = !1, M = 0;
  const A = new Intl.DateTimeFormat(i.id, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  let D = t.numDays - m + 1, Y = t.numDays - D + 1, K = Math.floor((D - 1) / Tt + 1), H = 1, I = t.numWeeks, U = 1, E = t.month, ee = t.year;
  const ue = /* @__PURE__ */ new Date(), W = ue.getDate(), N = ue.getMonth() + 1, G = ue.getFullYear();
  for (let re = 1; re <= OA; re++) {
    for (let Ce = 1, se = l; Ce <= Tt; Ce++, se += se === Tt ? 1 - Tt : 1) {
      C && se === u && (D = 1, Y = e.numDays, K = Math.floor((D - 1) / Tt + 1), H = Math.floor((h - D) / Tt + 1), I = 1, U = p, E = e.month, ee = e.year, C = !1, g = !0);
      const Oe = i.getDateFromParams(ee, E, D, 0, 0, 0, 0), De = i.getDateFromParams(ee, E, D, 12, 0, 0, 0), Ae = i.getDateFromParams(
        ee,
        E,
        D,
        23,
        59,
        59,
        999
      ), Se = Oe, X = `${Ue(ee, 4)}-${Ue(E, 2)}-${Ue(D, 2)}`, _e = Ce, de = Tt - Ce, Qe = f[re - 1], Ve = c[re - 1], qe = D === W && E === N && ee === G, st = g && D === 1, at = g && D === h, rt = re === 1, vt = re === p, On = Ce === 1, St = Ce === Tt, Ct = gh(ee, E, D);
      a.push({
        locale: i,
        id: X,
        position: ++M,
        label: D.toString(),
        ariaLabel: A.format(new Date(ee, E - 1, D)),
        day: D,
        dayFromEnd: Y,
        weekday: se,
        weekdayPosition: _e,
        weekdayPositionFromEnd: de,
        weekdayOrdinal: K,
        weekdayOrdinalFromEnd: H,
        week: I,
        weekFromEnd: U,
        weekPosition: re,
        weeknumber: Qe,
        isoWeeknumber: Ve,
        month: E,
        year: ee,
        date: Se,
        startDate: Oe,
        endDate: Ae,
        noonDate: De,
        dayIndex: Ct,
        isToday: qe,
        isFirstDay: st,
        isLastDay: at,
        isDisabled: !g,
        isFocusable: !g,
        isFocused: !1,
        inMonth: g,
        inPrevMonth: C,
        inNextMonth: b,
        onTop: rt,
        onBottom: vt,
        onLeft: On,
        onRight: St,
        classes: [
          `id-${X}`,
          `day-${D}`,
          `day-from-end-${Y}`,
          `weekday-${se}`,
          `weekday-position-${_e}`,
          `weekday-ordinal-${K}`,
          `weekday-ordinal-from-end-${H}`,
          `week-${I}`,
          `week-from-end-${U}`,
          {
            "is-today": qe,
            "is-first-day": st,
            "is-last-day": at,
            "in-month": g,
            "in-prev-month": C,
            "in-next-month": b,
            "on-top": rt,
            "on-bottom": vt,
            "on-left": On,
            "on-right": St
          }
        ]
      }), g && at ? (g = !1, b = !0, D = 1, Y = h, K = 1, H = Math.floor((h - D) / Tt + 1), I = 1, U = r.numWeeks, E = r.month, ee = r.year) : (D++, Y--, K = Math.floor((D - 1) / Tt + 1), H = Math.floor((h - D) / Tt + 1));
    }
    I++, U--;
  }
  return a;
}
function RT(e, t, r, i) {
  const a = e.reduce((l, u, c) => {
    const f = Math.floor(c / 7);
    let h = l[f];
    return h || (h = {
      id: `week-${f + 1}`,
      title: "",
      week: u.week,
      weekPosition: u.weekPosition,
      weeknumber: u.weeknumber,
      isoWeeknumber: u.isoWeeknumber,
      weeknumberDisplay: t ? u.weeknumber : r ? u.isoWeeknumber : void 0,
      days: []
    }, l[f] = h), h.days.push(u), l;
  }, Array(e.length / Tt));
  return a.forEach((l) => {
    const u = l.days[0], c = l.days[l.days.length - 1];
    u.month === c.month ? l.title = `${i.formatDate(u.date, "MMMM YYYY")}` : u.year === c.year ? l.title = `${i.formatDate(
      u.date,
      "MMM"
    )} - ${i.formatDate(c.date, "MMM YYYY")}` : l.title = `${i.formatDate(
      u.date,
      "MMM YYYY"
    )} - ${i.formatDate(c.date, "MMM YYYY")}`;
  }), a;
}
function VT(e, t) {
  return e.days.map((r) => ({
    label: t.formatDate(r.date, t.masks.weekdays),
    weekday: r.weekday
  }));
}
function YT(e, t) {
  return `${t}.${Ue(e, 2)}`;
}
function ih(e, t, r) {
  return nh(
    r.getDateParts(r.toDate(e)),
    ET[t]
  );
}
function sh({ day: e, week: t, month: r, year: i }, a, l, u) {
  if (l === "daily" && e) {
    const c = new Date(i, r - 1, e), f = Ft(c, a);
    return {
      day: f.getDate(),
      month: f.getMonth() + 1,
      year: f.getFullYear()
    };
  } else if (l === "weekly" && t) {
    const f = u.getMonthParts(r, i).firstDayOfMonth, h = Ft(f, (t - 1 + a) * 7), p = u.getDateParts(h);
    return {
      week: p.week,
      month: p.month,
      year: p.year
    };
  } else {
    const c = new Date(i, r - 1, 1), f = La(c, a);
    return {
      month: f.getMonth() + 1,
      year: f.getFullYear()
    };
  }
}
function qn(e) {
  return e != null && e.month != null && e.year != null;
}
function L1(e, t) {
  return !qn(e) || !qn(t) ? !1 : (e = e, t = t, e.year !== t.year ? e.year < t.year : e.month && t.month && e.month !== t.month ? e.month < t.month : e.week && t.week && e.week !== t.week ? e.week < t.week : e.day && t.day && e.day !== t.day ? e.day < t.day : !1);
}
function xa(e, t) {
  return !qn(e) || !qn(t) ? !1 : (e = e, t = t, e.year !== t.year ? e.year > t.year : e.month && t.month && e.month !== t.month ? e.month > t.month : e.week && t.week && e.week !== t.week ? e.week > t.week : e.day && t.day && e.day !== t.day ? e.day > t.day : !1);
}
function BT(e, t, r) {
  return (e || !1) && !L1(e, t) && !xa(e, r);
}
function WT(e, t) {
  return !e && t || e && !t ? !1 : !e && !t ? !0 : (e = e, t = t, e.year === t.year && e.month === t.month && e.week === t.week && e.day === t.day);
}
function FT(e, t, r, i) {
  if (!qn(e) || !qn(t))
    return [];
  const a = [];
  for (; !xa(e, t); )
    a.push(e), e = sh(e, 1, r, i);
  return a;
}
function ah(e) {
  const { day: t, week: r, month: i, year: a } = e;
  let l = `${a}-${Ue(i, 2)}`;
  return r && (l = `${l}-w${r}`), t && (l = `${l}-${Ue(t, 2)}`), l;
}
function NT(e, t) {
  const { month: r, year: i, showWeeknumbers: a, showIsoWeeknumbers: l } = e, u = new Date(i, r - 1, 15), c = t.getMonthParts(r, i), f = t.getPrevMonthParts(r, i), h = t.getNextMonthParts(r, i), p = HT({ monthComps: c, prevMonthComps: f, nextMonthComps: h }, t), m = RT(p, a, l, t), C = VT(m[0], t);
  return {
    id: ah(e),
    month: r,
    year: i,
    monthTitle: t.formatDate(u, t.masks.title),
    shortMonthLabel: t.formatDate(u, "MMM"),
    monthLabel: t.formatDate(u, "MMMM"),
    shortYearLabel: i.toString().substring(2),
    yearLabel: i.toString(),
    monthComps: c,
    prevMonthComps: f,
    nextMonthComps: h,
    days: p,
    weeks: m,
    weekdays: C
  };
}
function jT(e, t) {
  const { day: r, week: i, view: a, trimWeeks: l } = e, u = {
    ...t,
    ...e,
    title: "",
    viewDays: [],
    viewWeeks: []
  };
  switch (a) {
    case "daily": {
      let c = u.days.find((h) => h.inMonth);
      r ? c = u.days.find((h) => h.day === r && h.inMonth) || c : i && (c = u.days.find((h) => h.week === i && h.inMonth));
      const f = u.weeks[c.week - 1];
      u.viewWeeks = [f], u.viewDays = [c], u.week = c.week, u.weekTitle = f.title, u.day = c.day, u.dayTitle = c.ariaLabel, u.title = u.dayTitle;
      break;
    }
    case "weekly": {
      u.week = i || 1;
      const c = u.weeks[u.week - 1];
      u.viewWeeks = [c], u.viewDays = c.days, u.weekTitle = c.title, u.title = u.weekTitle;
      break;
    }
    default: {
      u.title = u.monthTitle, u.viewWeeks = u.weeks.slice(
        0,
        l ? u.monthComps.numWeeks : void 0
      ), u.viewDays = u.days;
      break;
    }
  }
  return u;
}
class b0 {
  constructor(t, r, i) {
    fe(this, "keys", []), fe(this, "store", {}), this.size = t, this.createKey = r, this.createItem = i;
  }
  get(...t) {
    const r = this.createKey(...t);
    return this.store[r];
  }
  getOrSet(...t) {
    const r = this.createKey(...t);
    if (this.store[r])
      return this.store[r];
    const i = this.createItem(...t);
    if (this.keys.length >= this.size) {
      const a = this.keys.shift();
      a != null && delete this.store[a];
    }
    return this.keys.push(r), this.store[r] = i, i;
  }
}
class ei {
  constructor(t, r = new Ta()) {
    fe(this, "order"), fe(this, "locale"), fe(this, "start", null), fe(this, "end", null), fe(this, "repeat", null);
    var i;
    this.locale = r;
    const { start: a, end: l, span: u, order: c, repeat: f } = t;
    Qo(a) && (this.start = r.getDateParts(a)), Qo(l) ? this.end = r.getDateParts(l) : this.start != null && u && (this.end = r.getDateParts(Ft(this.start.date, u - 1))), this.order = c ?? 0, f && (this.repeat = new Aa(
      {
        from: (i = this.start) == null ? void 0 : i.date,
        ...f
      },
      {
        locale: this.locale
      }
    ));
  }
  static fromMany(t, r) {
    return (Mn(t) ? t : [t]).filter((i) => i).map((i) => ei.from(i, r));
  }
  static from(t, r) {
    if (t instanceof ei)
      return t;
    const i = {
      start: null,
      end: null
    };
    return t != null && (Mn(t) ? (i.start = t[0] ?? null, i.end = t[1] ?? null) : Cr(t) ? Object.assign(i, t) : (i.start = t, i.end = t)), i.start != null && (i.start = new Date(i.start)), i.end != null && (i.end = new Date(i.end)), new ei(i, r);
  }
  get opts() {
    const { order: t, locale: r } = this;
    return { order: t, locale: r };
  }
  get hasRepeat() {
    return !!this.repeat;
  }
  get isSingleDay() {
    const { start: t, end: r } = this;
    return t && r && t.year === r.year && t.month === r.month && t.day === r.day;
  }
  get isMultiDay() {
    return !this.isSingleDay;
  }
  get daySpan() {
    return this.start == null || this.end == null ? this.hasRepeat ? 1 : 1 / 0 : this.end.dayIndex - this.start.dayIndex;
  }
  startsOnDay(t) {
    var r, i;
    return ((r = this.start) == null ? void 0 : r.dayIndex) === t.dayIndex || !!((i = this.repeat) != null && i.passes(t));
  }
  intersectsDay(t) {
    return this.intersectsDayRange(t, t);
  }
  intersectsRange(t) {
    var r, i;
    return this.intersectsDayRange(
      ((r = t.start) == null ? void 0 : r.dayIndex) ?? -1 / 0,
      ((i = t.end) == null ? void 0 : i.dayIndex) ?? 1 / 0
    );
  }
  intersectsDayRange(t, r) {
    return !(this.start && this.start.dayIndex > r || this.end && this.end.dayIndex < t);
  }
}
class UT {
  constructor() {
    fe(this, "records", {});
  }
  render(t, r, i) {
    var a, l, u, c, f, h;
    let p = null;
    const m = ((a = i[0]) == null ? void 0 : a.dayIndex) ?? 0, C = ((l = i[i.length - 1]) == null ? void 0 : l.dayIndex) ?? 0;
    return r.hasRepeat ? i.forEach((g) => {
      var b, M;
      if (r.startsOnDay(g)) {
        const A = r.daySpan < 1 / 0 ? r.daySpan : 1;
        p = {
          startDay: g.dayIndex,
          startTime: ((b = r.start) == null ? void 0 : b.time) ?? 0,
          endDay: g.dayIndex + A - 1,
          endTime: ((M = r.end) == null ? void 0 : M.time) ?? _a
        }, this.getRangeRecords(t).push(p);
      }
    }) : r.intersectsDayRange(m, C) && (p = {
      startDay: ((u = r.start) == null ? void 0 : u.dayIndex) ?? -1 / 0,
      startTime: ((c = r.start) == null ? void 0 : c.time) ?? -1 / 0,
      endDay: ((f = r.end) == null ? void 0 : f.dayIndex) ?? 1 / 0,
      endTime: ((h = r.end) == null ? void 0 : h.time) ?? 1 / 0
    }, this.getRangeRecords(t).push(p)), p;
  }
  getRangeRecords(t) {
    let r = this.records[t.key];
    return r || (r = {
      ranges: [],
      data: t
    }, this.records[t.key] = r), r.ranges;
  }
  getCell(t, r) {
    return this.getCells(r).find((l) => l.data.key === t);
  }
  cellExists(t, r) {
    const i = this.records[t];
    return i == null ? !1 : i.ranges.some(
      (a) => a.startDay <= r && a.endDay >= r
    );
  }
  getCells(t) {
    const r = Object.values(this.records), i = [], { dayIndex: a } = t;
    return r.forEach(({ data: l, ranges: u }) => {
      u.filter((c) => c.startDay <= a && c.endDay >= a).forEach((c) => {
        const f = a === c.startDay, h = a === c.endDay, p = f ? c.startTime : 0, m = new Date(t.startDate.getTime() + p), C = h ? c.endTime : _a, g = new Date(t.endDate.getTime() + C), b = p === 0 && C === _a, M = l.order || 0;
        i.push({
          ...c,
          data: l,
          onStart: f,
          onEnd: h,
          startTime: p,
          startDate: m,
          endTime: C,
          endDate: g,
          allDay: b,
          order: M
        });
      });
    }), i.sort((l, u) => l.order - u.order), i;
  }
}
const br = {
  // Arabic
  ar: { dow: 7, L: "D/‏M/‏YYYY" },
  // Bulgarian
  bg: { dow: 2, L: "D.MM.YYYY" },
  // Catalan
  ca: { dow: 2, L: "DD/MM/YYYY" },
  // Chinese (China)
  "zh-CN": { dow: 2, L: "YYYY/MM/DD" },
  // Chinese (Taiwan)
  "zh-TW": { dow: 1, L: "YYYY/MM/DD" },
  // Croatian
  hr: { dow: 2, L: "DD.MM.YYYY" },
  // Czech
  cs: { dow: 2, L: "DD.MM.YYYY" },
  // Danish
  da: { dow: 2, L: "DD.MM.YYYY" },
  // Dutch
  nl: { dow: 2, L: "DD-MM-YYYY" },
  // English (US)
  "en-US": { dow: 1, L: "MM/DD/YYYY" },
  // English (Australia)
  "en-AU": { dow: 2, L: "DD/MM/YYYY" },
  // English (Canada)
  "en-CA": { dow: 1, L: "YYYY-MM-DD" },
  // English (Great Britain)
  "en-GB": { dow: 2, L: "DD/MM/YYYY" },
  // English (Ireland)
  "en-IE": { dow: 2, L: "DD-MM-YYYY" },
  // English (New Zealand)
  "en-NZ": { dow: 2, L: "DD/MM/YYYY" },
  // English (South Africa)
  "en-ZA": { dow: 1, L: "YYYY/MM/DD" },
  // Esperanto
  eo: { dow: 2, L: "YYYY-MM-DD" },
  // Estonian
  et: { dow: 2, L: "DD.MM.YYYY" },
  // Finnish
  fi: { dow: 2, L: "DD.MM.YYYY" },
  // French
  fr: { dow: 2, L: "DD/MM/YYYY" },
  // French (Canada)
  "fr-CA": { dow: 1, L: "YYYY-MM-DD" },
  // French (Switzerland)
  "fr-CH": { dow: 2, L: "DD.MM.YYYY" },
  // German
  de: { dow: 2, L: "DD.MM.YYYY" },
  // Hebrew
  he: { dow: 1, L: "DD.MM.YYYY" },
  // Indonesian
  id: { dow: 2, L: "DD/MM/YYYY" },
  // Italian
  it: { dow: 2, L: "DD/MM/YYYY" },
  // Japanese
  ja: { dow: 1, L: "YYYY年M月D日" },
  // Korean
  ko: { dow: 1, L: "YYYY.MM.DD" },
  // Latvian
  lv: { dow: 2, L: "DD.MM.YYYY" },
  // Lithuanian
  lt: { dow: 2, L: "DD.MM.YYYY" },
  // Macedonian
  mk: { dow: 2, L: "D.MM.YYYY" },
  // Norwegian
  nb: { dow: 2, L: "D. MMMM YYYY" },
  nn: { dow: 2, L: "D. MMMM YYYY" },
  // Polish
  pl: { dow: 2, L: "DD.MM.YYYY" },
  // Portuguese
  pt: { dow: 2, L: "DD/MM/YYYY" },
  // Romanian
  ro: { dow: 2, L: "DD.MM.YYYY" },
  // Russian
  ru: { dow: 2, L: "DD.MM.YYYY" },
  // Slovak
  sk: { dow: 2, L: "DD.MM.YYYY" },
  // Spanish (Spain)
  "es-ES": { dow: 2, L: "DD/MM/YYYY" },
  // Spanish (Mexico)
  "es-MX": { dow: 2, L: "DD/MM/YYYY" },
  // Swedish
  sv: { dow: 2, L: "YYYY-MM-DD" },
  // Thai
  th: { dow: 1, L: "DD/MM/YYYY" },
  // Turkish
  tr: { dow: 2, L: "DD.MM.YYYY" },
  // Ukrainian
  uk: { dow: 2, L: "DD.MM.YYYY" },
  // Vietnam
  vi: { dow: 2, L: "DD/MM/YYYY" }
};
br.en = br["en-US"];
br.es = br["es-ES"];
br.no = br.nb;
br.zh = br["zh-CN"];
const ZT = Object.entries(br).reduce(
  (e, [t, { dow: r, L: i }]) => (e[t] = {
    id: t,
    firstDayOfWeek: r,
    masks: { L: i }
  }, e),
  {}
), zT = "MMMM YYYY", qT = "W", GT = "MMM", XT = "h A", KT = [
  "L",
  "YYYY-MM-DD",
  "YYYY/MM/DD"
], JT = [
  "L h:mm A",
  "YYYY-MM-DD h:mm A",
  "YYYY/MM/DD h:mm A"
], QT = [
  "L HH:mm",
  "YYYY-MM-DD HH:mm",
  "YYYY/MM/DD HH:mm"
], eA = [
  "h:mm A"
], tA = [
  "HH:mm"
], nA = "WWW, MMM D, YYYY", rA = [
  "L",
  "YYYY-MM-DD",
  "YYYY/MM/DD"
], oA = "iso", iA = "YYYY-MM-DDTHH:mm:ss.SSSZ", sA = {
  title: zT,
  weekdays: qT,
  navMonths: GT,
  hours: XT,
  input: KT,
  inputDateTime: JT,
  inputDateTime24hr: QT,
  inputTime: eA,
  inputTime24hr: tA,
  dayPopover: nA,
  data: rA,
  model: oA,
  iso: iA
}, aA = 300, lA = 60, uA = 80, cA = {
  maxSwipeTime: aA,
  minHorizontalSwipeDistance: lA,
  maxVerticalSwipeDistance: uA
}, dA = {
  componentPrefix: "V",
  color: "blue",
  isDark: !1,
  navVisibility: "click",
  titlePosition: "center",
  transition: "slide-h",
  touch: cA,
  masks: sA,
  locales: ZT,
  datePicker: {
    updateOnInput: !0,
    inputDebounce: 1e3,
    popover: {
      visibility: "hover-focus",
      placement: "bottom-start",
      isInteractive: !0
    }
  }
}, x1 = Fe(dA), fA = T(() => PO(x1.locales, (e) => (e.masks = rs(e.masks, x1.masks), e))), zr = (e) => typeof window < "u" && eh(window.__vcalendar__, e) ? go(window.__vcalendar__, e) : go(x1, e), hA = 12, pA = 5;
function vA(e, t) {
  const r = new Intl.DateTimeFormat().resolvedOptions().locale;
  let i;
  zn(e) ? i = e : eh(e, "id") && (i = e.id), i = (i || r).toLowerCase();
  const a = Object.keys(t), l = (f) => a.find((h) => h.toLowerCase() === f);
  i = l(i) || l(i.substring(0, 2)) || r;
  const u = {
    ...t["en-IE"],
    ...t[i],
    id: i,
    monthCacheSize: hA,
    pageCacheSize: pA
  };
  return Cr(e) ? rs(e, u) : u;
}
class Ta {
  constructor(t = void 0, r) {
    fe(this, "id"), fe(this, "daysInWeek"), fe(this, "firstDayOfWeek"), fe(this, "masks"), fe(this, "timezone"), fe(this, "hourLabels"), fe(this, "dayNames"), fe(this, "dayNamesShort"), fe(this, "dayNamesShorter"), fe(this, "dayNamesNarrow"), fe(this, "monthNames"), fe(this, "monthNamesShort"), fe(this, "relativeTimeNames"), fe(this, "amPm", ["am", "pm"]), fe(this, "monthCache"), fe(this, "pageCache");
    const { id: i, firstDayOfWeek: a, masks: l, monthCacheSize: u, pageCacheSize: c } = vA(t, fA.value);
    this.monthCache = new b0(
      u,
      RA,
      VA
    ), this.pageCache = new b0(c, ah, NT), this.id = i, this.daysInWeek = Tt, this.firstDayOfWeek = Xx(a, 1, Tt), this.masks = l, this.timezone = r || void 0, this.hourLabels = this.getHourLabels(), this.dayNames = v1("long", this.id), this.dayNamesShort = v1("short", this.id), this.dayNamesShorter = this.dayNamesShort.map((f) => f.substring(0, 2)), this.dayNamesNarrow = v1("narrow", this.id), this.monthNames = S0("long", this.id), this.monthNamesShort = S0("short", this.id), this.relativeTimeNames = WA(this.id);
  }
  formatDate(t, r) {
    return ZA(t, r, this);
  }
  parseDate(t, r) {
    return O0(t, r, this);
  }
  toDate(t, r = {}) {
    const i = /* @__PURE__ */ new Date(NaN);
    let a = i;
    const { fillDate: l, mask: u, patch: c, rules: f } = r;
    if (Hn(t) ? (r.type = "number", a = /* @__PURE__ */ new Date(+t)) : zn(t) ? (r.type = "string", a = t ? O0(t, u || "iso", this) : i) : Qo(t) ? (r.type = "date", a = new Date(t.getTime())) : gu(t) && (r.type = "object", a = this.getDateFromParts(t)), a && (c || f)) {
      let h = this.getDateParts(a);
      if (c && l != null) {
        const p = this.getDateParts(this.toDate(l));
        h = this.getDateParts(
          this.toDate({ ...p, ...nh(h, SA[c]) })
        );
      }
      f && (h = UA(h, f)), a = this.getDateFromParts(h);
    }
    return a || i;
  }
  toDateOrNull(t, r = {}) {
    const i = this.toDate(t, r);
    return isNaN(i.getTime()) ? null : i;
  }
  fromDate(t, { type: r, mask: i } = {}) {
    switch (r) {
      case "number":
        return t ? t.getTime() : NaN;
      case "string":
        return t ? this.formatDate(t, i || "iso") : "";
      case "object":
        return t ? this.getDateParts(t) : null;
      default:
        return t ? new Date(t) : null;
    }
  }
  range(t) {
    return ei.from(t, this);
  }
  ranges(t) {
    return ei.fromMany(t, this);
  }
  getDateParts(t) {
    return HA(t, this);
  }
  getDateFromParts(t) {
    return yh(t, this.timezone);
  }
  getDateFromParams(t, r, i, a, l, u, c) {
    return this.getDateFromParts({
      year: t,
      month: r,
      day: i,
      hours: a,
      minutes: l,
      seconds: u,
      milliseconds: c
    });
  }
  getPage(t) {
    const r = this.pageCache.getOrSet(t, this);
    return jT(t, r);
  }
  getMonthParts(t, r) {
    const { firstDayOfWeek: i } = this;
    return this.monthCache.getOrSet(t, r, i);
  }
  getThisMonthParts() {
    const t = /* @__PURE__ */ new Date();
    return this.getMonthParts(
      t.getMonth() + 1,
      t.getFullYear()
    );
  }
  getPrevMonthParts(t, r) {
    return t === 1 ? this.getMonthParts(12, r - 1) : this.getMonthParts(t - 1, r);
  }
  getNextMonthParts(t, r) {
    return t === 12 ? this.getMonthParts(1, r + 1) : this.getMonthParts(t + 1, r);
  }
  getHourLabels() {
    return BA().map((t) => this.formatDate(t, this.masks.hours));
  }
  getDayId(t) {
    return this.formatDate(t, "YYYY-MM-DD");
  }
}
var Zo = /* @__PURE__ */ ((e) => (e.Any = "any", e.All = "all", e))(Zo || {}), lh = /* @__PURE__ */ ((e) => (e.Days = "days", e.Weeks = "weeks", e.Months = "months", e.Years = "years", e))(lh || {}), uh = /* @__PURE__ */ ((e) => (e.Days = "days", e.Weekdays = "weekdays", e.Weeks = "weeks", e.Months = "months", e.Years = "years", e))(uh || {}), ch = /* @__PURE__ */ ((e) => (e.OrdinalWeekdays = "ordinalWeekdays", e))(ch || {});
class gA {
  constructor(t, r, i) {
    fe(this, "validated", !0), this.type = t, this.interval = r, this.from = i, this.from || (console.error(
      'A valid "from" date is required for date interval rule. This rule will be skipped.'
    ), this.validated = !1);
  }
  passes(t) {
    if (!this.validated)
      return !0;
    const { date: r } = t;
    switch (this.type) {
      case "days":
        return mu(this.from.date, r) % this.interval === 0;
      case "weeks":
        return IA(this.from.date, r) % this.interval === 0;
      case "months":
        return EA(this.from.date, r) % this.interval === 0;
      case "years":
        return mh(this.from.date, r) % this.interval === 0;
      default:
        return !1;
    }
  }
}
class mi {
  constructor(t, r, i, a) {
    fe(this, "components", []), this.type = t, this.validator = i, this.getter = a, this.components = this.normalizeComponents(r);
  }
  static create(t, r) {
    switch (t) {
      case "days":
        return new mA(r);
      case "weekdays":
        return new yA(r);
      case "weeks":
        return new _A(r);
      case "months":
        return new CA(r);
      case "years":
        return new bA(r);
    }
  }
  normalizeComponents(t) {
    if (this.validator(t))
      return [t];
    if (!Mn(t))
      return [];
    const r = [];
    return t.forEach((i) => {
      if (!this.validator(i)) {
        console.error(
          `Component value ${i} in invalid for "${this.type}" rule. This rule will be skipped.`
        );
        return;
      }
      r.push(i);
    }), r;
  }
  passes(t) {
    return this.getter(t).some((a) => this.components.includes(a));
  }
}
class mA extends mi {
  constructor(t) {
    super(
      "days",
      t,
      $A,
      ({ day: r, dayFromEnd: i }) => [r, -i]
    );
  }
}
class yA extends mi {
  constructor(t) {
    super(
      "weekdays",
      t,
      T1,
      ({ weekday: r }) => [r]
    );
  }
}
class _A extends mi {
  constructor(t) {
    super(
      "weeks",
      t,
      MA,
      ({ week: r, weekFromEnd: i }) => [r, -i]
    );
  }
}
class CA extends mi {
  constructor(t) {
    super("months", t, DA, ({ month: r }) => [
      r
    ]);
  }
}
class bA extends mi {
  constructor(t) {
    super("years", t, Hn, ({ year: r }) => [r]);
  }
}
class wA {
  constructor(t, r) {
    fe(this, "components"), this.type = t, this.components = this.normalizeComponents(r);
  }
  normalizeArrayConfig(t) {
    const r = [];
    return t.forEach((i, a) => {
      if (Hn(i)) {
        if (a === 0)
          return;
        if (!w0(t[0])) {
          console.error(
            `Ordinal range for "${this.type}" rule is from -5 to -1 or 1 to 5. This rule will be skipped.`
          );
          return;
        }
        if (!T1(i)) {
          console.error(
            `Acceptable range for "${this.type}" rule is from 1 to 5. This rule will be skipped`
          );
          return;
        }
        r.push([t[0], i]);
      } else Mn(i) && r.push(...this.normalizeArrayConfig(i));
    }), r;
  }
  normalizeComponents(t) {
    const r = [];
    return t.forEach((i, a) => {
      if (Hn(i)) {
        if (a === 0)
          return;
        if (!w0(t[0])) {
          console.error(
            `Ordinal range for "${this.type}" rule is from -5 to -1 or 1 to 5. This rule will be skipped.`
          );
          return;
        }
        if (!T1(i)) {
          console.error(
            `Acceptable range for "${this.type}" rule is from 1 to 5. This rule will be skipped`
          );
          return;
        }
        r.push([t[0], i]);
      } else Mn(i) && r.push(...this.normalizeArrayConfig(i));
    }), r;
  }
  passes(t) {
    const { weekday: r, weekdayOrdinal: i, weekdayOrdinalFromEnd: a } = t;
    return this.components.some(
      ([l, u]) => (l === i || l === -a) && r === u
    );
  }
}
class kA {
  constructor(t) {
    fe(this, "type", "function"), fe(this, "validated", !0), this.fn = t, Mo(t) || (console.error(
      "The function rule requires a valid function. This rule will be skipped."
    ), this.validated = !1);
  }
  passes(t) {
    return this.validated ? this.fn(t) : !0;
  }
}
class Aa {
  constructor(t, r = {}, i) {
    fe(this, "validated", !0), fe(this, "config"), fe(this, "type", Zo.Any), fe(this, "from"), fe(this, "until"), fe(this, "rules", []), fe(this, "locale", new Ta()), this.parent = i, r.locale && (this.locale = r.locale), this.config = t, Mo(t) ? (this.type = Zo.All, this.rules = [new kA(t)]) : Mn(t) ? (this.type = Zo.Any, this.rules = t.map((a) => new Aa(a, r, this))) : Cr(t) ? (this.type = Zo.All, this.from = t.from ? this.locale.getDateParts(t.from) : i == null ? void 0 : i.from, this.until = t.until ? this.locale.getDateParts(t.until) : i == null ? void 0 : i.until, this.rules = this.getObjectRules(t)) : (console.error("Rule group configuration must be an object or an array."), this.validated = !1);
  }
  getObjectRules(t) {
    const r = [];
    if (t.every && (zn(t.every) && (t.every = [1, `${t.every}s`]), Mn(t.every))) {
      const [i = 1, a = lh.Days] = t.every;
      r.push(new gA(a, i, this.from));
    }
    return Object.values(uh).forEach((i) => {
      i in t && r.push(mi.create(i, t[i]));
    }), Object.values(ch).forEach((i) => {
      i in t && r.push(new wA(i, t[i]));
    }), t.on != null && (Mn(t.on) || (t.on = [t.on]), r.push(
      new Aa(t.on, { locale: this.locale }, this.parent)
    )), r;
  }
  passes(t) {
    return this.validated ? this.from && t.dayIndex <= this.from.dayIndex || this.until && t.dayIndex >= this.until.dayIndex ? !1 : this.type === Zo.Any ? this.rules.some((r) => r.passes(t)) : this.rules.every((r) => r.passes(t)) : !0;
  }
}
function $A(e) {
  return Hn(e) ? e >= 1 && e <= 31 : !1;
}
function T1(e) {
  return Hn(e) ? e >= 1 && e <= 7 : !1;
}
function MA(e) {
  return Hn(e) ? e >= -6 && e <= -1 || e >= 1 && e <= 6 : !1;
}
function DA(e) {
  return Hn(e) ? e >= 1 && e <= 12 : !1;
}
function w0(e) {
  return !(!Hn(e) || e < -5 || e > 5 || e === 0);
}
const SA = {
  dateTime: [
    "year",
    "month",
    "day",
    "hours",
    "minutes",
    "seconds",
    "milliseconds"
  ],
  date: ["year", "month", "day"],
  time: ["hours", "minutes", "seconds", "milliseconds"]
}, Tt = 7, OA = 6, dh = 1e3, fh = dh * 60, hh = fh * 60, _a = hh * 24, LA = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], xA = ["L", "iso"], Ui = {
  milliseconds: [0, 999, 3],
  seconds: [0, 59, 2],
  minutes: [0, 59, 2],
  hours: [0, 23, 2]
}, ph = /d{1,2}|W{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|Z{1,4}|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g, TA = /\[([^]*?)\]/gm, k0 = {
  D(e) {
    return e.day;
  },
  DD(e) {
    return Ue(e.day, 2);
  },
  // Do(d: DateParts, l: Locale) {
  //   return l.DoFn(d.day);
  // },
  d(e) {
    return e.weekday - 1;
  },
  dd(e) {
    return Ue(e.weekday - 1, 2);
  },
  W(e, t) {
    return t.dayNamesNarrow[e.weekday - 1];
  },
  WW(e, t) {
    return t.dayNamesShorter[e.weekday - 1];
  },
  WWW(e, t) {
    return t.dayNamesShort[e.weekday - 1];
  },
  WWWW(e, t) {
    return t.dayNames[e.weekday - 1];
  },
  M(e) {
    return e.month;
  },
  MM(e) {
    return Ue(e.month, 2);
  },
  MMM(e, t) {
    return t.monthNamesShort[e.month - 1];
  },
  MMMM(e, t) {
    return t.monthNames[e.month - 1];
  },
  YY(e) {
    return String(e.year).substr(2);
  },
  YYYY(e) {
    return Ue(e.year, 4);
  },
  h(e) {
    return e.hours % 12 || 12;
  },
  hh(e) {
    return Ue(e.hours % 12 || 12, 2);
  },
  H(e) {
    return e.hours;
  },
  HH(e) {
    return Ue(e.hours, 2);
  },
  m(e) {
    return e.minutes;
  },
  mm(e) {
    return Ue(e.minutes, 2);
  },
  s(e) {
    return e.seconds;
  },
  ss(e) {
    return Ue(e.seconds, 2);
  },
  S(e) {
    return Math.round(e.milliseconds / 100);
  },
  SS(e) {
    return Ue(Math.round(e.milliseconds / 10), 2);
  },
  SSS(e) {
    return Ue(e.milliseconds, 3);
  },
  a(e, t) {
    return e.hours < 12 ? t.amPm[0] : t.amPm[1];
  },
  A(e, t) {
    return e.hours < 12 ? t.amPm[0].toUpperCase() : t.amPm[1].toUpperCase();
  },
  Z() {
    return "Z";
  },
  ZZ(e) {
    const t = e.timezoneOffset;
    return `${t > 0 ? "-" : "+"}${Ue(Math.floor(Math.abs(t) / 60), 2)}`;
  },
  ZZZ(e) {
    const t = e.timezoneOffset;
    return `${t > 0 ? "-" : "+"}${Ue(
      Math.floor(Math.abs(t) / 60) * 100 + Math.abs(t) % 60,
      4
    )}`;
  },
  ZZZZ(e) {
    const t = e.timezoneOffset;
    return `${t > 0 ? "-" : "+"}${Ue(Math.floor(Math.abs(t) / 60), 2)}:${Ue(
      Math.abs(t) % 60,
      2
    )}`;
  }
}, Wr = /\d\d?/, AA = /\d{3}/, PA = /\d{4}/, Bi = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF/]+(\s*?[\u0600-\u06FF]+){1,2}/i, $0 = () => {
}, M0 = (e) => (t, r, i) => {
  const a = i[e].indexOf(
    r.charAt(0).toUpperCase() + r.substr(1).toLowerCase()
  );
  ~a && (t.month = a);
}, Xe = {
  D: [
    Wr,
    (e, t) => {
      e.day = t;
    }
  ],
  Do: [
    new RegExp(Wr.source + Bi.source),
    (e, t) => {
      e.day = parseInt(t, 10);
    }
  ],
  d: [Wr, $0],
  W: [Bi, $0],
  M: [
    Wr,
    (e, t) => {
      e.month = t - 1;
    }
  ],
  MMM: [Bi, M0("monthNamesShort")],
  MMMM: [Bi, M0("monthNames")],
  YY: [
    Wr,
    (e, t) => {
      const i = +(/* @__PURE__ */ new Date()).getFullYear().toString().substr(0, 2);
      e.year = +`${t > 68 ? i - 1 : i}${t}`;
    }
  ],
  YYYY: [
    PA,
    (e, t) => {
      e.year = t;
    }
  ],
  S: [
    /\d/,
    (e, t) => {
      e.milliseconds = t * 100;
    }
  ],
  SS: [
    /\d{2}/,
    (e, t) => {
      e.milliseconds = t * 10;
    }
  ],
  SSS: [
    AA,
    (e, t) => {
      e.milliseconds = t;
    }
  ],
  h: [
    Wr,
    (e, t) => {
      e.hours = t;
    }
  ],
  m: [
    Wr,
    (e, t) => {
      e.minutes = t;
    }
  ],
  s: [
    Wr,
    (e, t) => {
      e.seconds = t;
    }
  ],
  a: [
    Bi,
    (e, t, r) => {
      const i = t.toLowerCase();
      i === r.amPm[0] ? e.isPm = !1 : i === r.amPm[1] && (e.isPm = !0);
    }
  ],
  Z: [
    /[^\s]*?[+-]\d\d:?\d\d|[^\s]*?Z?/,
    (e, t) => {
      t === "Z" && (t = "+00:00");
      const r = `${t}`.match(/([+-]|\d\d)/gi);
      if (r) {
        const i = +r[1] * 60 + parseInt(r[2], 10);
        e.timezoneOffset = r[0] === "+" ? i : -i;
      }
    }
  ]
};
Xe.DD = Xe.D;
Xe.dd = Xe.d;
Xe.WWWW = Xe.WWW = Xe.WW = Xe.W;
Xe.MM = Xe.M;
Xe.mm = Xe.m;
Xe.hh = Xe.H = Xe.HH = Xe.h;
Xe.ss = Xe.s;
Xe.A = Xe.a;
Xe.ZZZZ = Xe.ZZZ = Xe.ZZ = Xe.Z;
function vh(e, t) {
  return (mr(e) && e || [
    zn(e) && e || "YYYY-MM-DD"
  ]).map(
    (r) => xA.reduce(
      (i, a) => i.replace(a, t.masks[a] || ""),
      r
    )
  );
}
function gu(e) {
  return Cr(e) && "year" in e && "month" in e && "day" in e;
}
function D0(e, t = 1) {
  const r = e.getDay() + 1, i = r >= t ? t - r : -(7 - (t - r));
  return Ft(e, i);
}
function gh(e, t, r) {
  const i = Date.UTC(e, t - 1, r);
  return mu(/* @__PURE__ */ new Date(0), new Date(i));
}
function mu(e, t) {
  return Math.round((t.getTime() - e.getTime()) / _a);
}
function IA(e, t) {
  return Math.ceil(mu(D0(e), D0(t)) / 7);
}
function mh(e, t) {
  return t.getUTCFullYear() - e.getUTCFullYear();
}
function EA(e, t) {
  return mh(e, t) * 12 + (t.getMonth() - e.getMonth());
}
function yh(e, t = "") {
  const r = /* @__PURE__ */ new Date(), {
    year: i = r.getFullYear(),
    month: a = r.getMonth() + 1,
    day: l = r.getDate(),
    hours: u = 0,
    minutes: c = 0,
    seconds: f = 0,
    milliseconds: h = 0
  } = e;
  if (t) {
    const p = `${Ue(i, 4)}-${Ue(a, 2)}-${Ue(l, 2)}T${Ue(
      u,
      2
    )}:${Ue(c, 2)}:${Ue(f, 2)}.${Ue(h, 3)}`;
    return hT(p, { timeZone: t });
  }
  return new Date(i, a - 1, l, u, c, f, h);
}
function HA(e, t) {
  let r = new Date(e.getTime());
  t.timezone && (r = new Date(
    e.toLocaleString("en-US", { timeZone: t.timezone })
  ), r.setMilliseconds(e.getMilliseconds()));
  const i = r.getMilliseconds(), a = r.getSeconds(), l = r.getMinutes(), u = r.getHours(), c = i + a * dh + l * fh + u * hh, f = r.getMonth() + 1, h = r.getFullYear(), p = t.getMonthParts(f, h), m = r.getDate(), C = p.numDays - m + 1, g = r.getDay() + 1, b = Math.floor((m - 1) / 7 + 1), M = Math.floor((p.numDays - m) / 7 + 1), A = Math.ceil(
    (m + Math.abs(p.firstWeekday - p.firstDayOfWeek)) / 7
  ), D = p.numWeeks - A + 1, Y = p.weeknumbers[A], K = gh(h, f, m);
  return {
    milliseconds: i,
    seconds: a,
    minutes: l,
    hours: u,
    time: c,
    day: m,
    dayFromEnd: C,
    weekday: g,
    weekdayOrdinal: b,
    weekdayOrdinalFromEnd: M,
    week: A,
    weekFromEnd: D,
    weeknumber: Y,
    month: f,
    year: h,
    date: r,
    dateTime: r.getTime(),
    dayIndex: K,
    timezoneOffset: 0,
    isValid: !0
  };
}
function RA(e, t, r) {
  return `${t}-${e}-${r}`;
}
function VA(e, t, r) {
  const i = t % 4 === 0 && t % 100 !== 0 || t % 400 === 0, a = new Date(t, e - 1, 1), l = a.getDay() + 1, u = e === 2 && i ? 29 : LA[e - 1], c = r - 1, f = DT(a, {
    weekStartsOn: c
  }), h = [], p = [];
  for (let m = 0; m < f; m++) {
    const C = Ft(a, m * 7);
    h.push(xT(C, { weekStartsOn: c })), p.push(IT(C));
  }
  return {
    firstDayOfWeek: r,
    firstDayOfMonth: a,
    inLeapYear: i,
    firstWeekday: l,
    numDays: u,
    numWeeks: f,
    month: e,
    year: t,
    weeknumbers: h,
    isoWeeknumbers: p
  };
}
function YA() {
  const e = [];
  for (let a = 0; a < Tt; a++)
    e.push(
      yh({
        year: 2020,
        month: 1,
        day: 5 + a,
        hours: 12
      })
    );
  return e;
}
function v1(e, t = void 0) {
  const r = new Intl.DateTimeFormat(t, {
    weekday: e
  });
  return YA().map((i) => r.format(i));
}
function BA() {
  const e = [];
  for (let t = 0; t <= 24; t++)
    e.push(new Date(2e3, 0, 1, t));
  return e;
}
function WA(e = void 0) {
  const t = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "quarter",
    "year"
  ], r = new Intl.RelativeTimeFormat(e);
  return t.reduce((i, a) => {
    const l = r.formatToParts(100, a);
    return i[a] = l[1].unit, i;
  }, {});
}
function _h() {
  const e = [];
  for (let t = 0; t < 12; t++)
    e.push(new Date(2e3, t, 15));
  return e;
}
function S0(e, t = void 0) {
  const r = new Intl.DateTimeFormat(t, {
    month: e,
    timeZone: "UTC"
  });
  return _h().map((i) => r.format(i));
}
function FA(e, t, r) {
  return Hn(t) ? t === e : Mn(t) ? t.includes(e) : Mo(t) ? t(e, r) : !(t.min != null && t.min > e || t.max != null && t.max < e || t.interval != null && e % t.interval !== 0);
}
function Zi(e, t, r) {
  const i = [], [a, l, u] = t;
  for (let c = a; c <= l; c++)
    (r == null || FA(c, r, e)) && i.push({
      value: c,
      label: Ue(c, u)
    });
  return i;
}
function NA(e, t) {
  return {
    milliseconds: Zi(
      e,
      Ui.milliseconds,
      t.milliseconds
    ),
    seconds: Zi(e, Ui.seconds, t.seconds),
    minutes: Zi(e, Ui.minutes, t.minutes),
    hours: Zi(e, Ui.hours, t.hours)
  };
}
function jA(e, t, r, i) {
  const l = Zi(e, t, i).reduce((u, c) => {
    if (c.disabled)
      return u;
    if (isNaN(u))
      return c.value;
    const f = Math.abs(u - r);
    return Math.abs(c.value - r) < f ? c.value : u;
  }, NaN);
  return isNaN(l) ? r : l;
}
function UA(e, t) {
  const r = { ...e };
  return Object.entries(t).forEach(([i, a]) => {
    const l = Ui[i], u = e[i];
    r[i] = jA(
      e,
      l,
      u,
      a
    );
  }), r;
}
function O0(e, t, r) {
  return vh(t, r).map((a) => {
    if (typeof a != "string")
      throw new Error("Invalid mask");
    let l = e;
    if (l.length > 1e3)
      return !1;
    let u = !0;
    const c = {};
    if (a.replace(ph, (p) => {
      if (Xe[p]) {
        const m = Xe[p], C = l.search(m[0]);
        ~C ? l.replace(m[0], (g) => (m[1](c, g, r), l = l.substr(C + g.length), g)) : u = !1;
      }
      return Xe[p] ? "" : p.slice(1, p.length - 1);
    }), !u)
      return !1;
    const f = /* @__PURE__ */ new Date();
    c.hours != null && (c.isPm === !0 && +c.hours != 12 ? c.hours = +c.hours + 12 : c.isPm === !1 && +c.hours == 12 && (c.hours = 0));
    let h;
    return c.timezoneOffset != null ? (c.minutes = +(c.minutes || 0) - +c.timezoneOffset, h = new Date(
      Date.UTC(
        c.year || f.getFullYear(),
        c.month || 0,
        c.day || 1,
        c.hours || 0,
        c.minutes || 0,
        c.seconds || 0,
        c.milliseconds || 0
      )
    )) : h = r.getDateFromParts({
      year: c.year || f.getFullYear(),
      month: (c.month || 0) + 1,
      day: c.day || 1,
      hours: c.hours || 0,
      minutes: c.minutes || 0,
      seconds: c.seconds || 0,
      milliseconds: c.milliseconds || 0
    }), h;
  }).find((a) => a) || new Date(e);
}
function ZA(e, t, r) {
  if (e == null)
    return "";
  let i = vh(t, r)[0];
  /Z$/.test(i) && (r.timezone = "utc");
  const a = [];
  i = i.replace(TA, (u, c) => (a.push(c), "??"));
  const l = r.getDateParts(e);
  return i = i.replace(
    ph,
    (u) => u in k0 ? k0[u](l, r) : u.slice(1, u.length - 1)
  ), i.replace(/\?\?/g, () => a.shift());
}
let zA = 0;
class Ch {
  constructor(t, r, i) {
    fe(this, "key", ""), fe(this, "hashcode", ""), fe(this, "highlight", null), fe(this, "content", null), fe(this, "dot", null), fe(this, "bar", null), fe(this, "event", null), fe(this, "popover", null), fe(this, "customData", null), fe(this, "ranges"), fe(this, "hasRanges", !1), fe(this, "order", 0), fe(this, "pinPage", !1), fe(this, "maxRepeatSpan", 0), fe(this, "locale");
    const { dates: a } = Object.assign(
      this,
      { hashcode: "", order: 0, pinPage: !1 },
      t
    );
    this.key || (this.key = ++zA), this.locale = i, r.normalizeGlyphs(this), this.ranges = i.ranges(a ?? []), this.hasRanges = !!mr(this.ranges), this.maxRepeatSpan = this.ranges.filter((l) => l.hasRepeat).map((l) => l.daySpan).reduce((l, u) => Math.max(l, u), 0);
  }
  intersectsRange({ start: t, end: r }) {
    if (t == null || r == null)
      return !1;
    const i = this.ranges.filter((u) => !u.hasRepeat);
    for (const u of i)
      if (u.intersectsDayRange(t.dayIndex, r.dayIndex))
        return !0;
    const a = this.ranges.filter((u) => u.hasRepeat);
    if (!a.length)
      return !1;
    let l = t;
    for (this.maxRepeatSpan > 1 && (l = this.locale.getDateParts(Ft(l.date, -this.maxRepeatSpan))); l.dayIndex <= r.dayIndex; ) {
      for (const u of a)
        if (u.startsOnDay(l))
          return !0;
      l = this.locale.getDateParts(Ft(l.date, 1));
    }
    return !1;
  }
}
function A1(e) {
  document && document.dispatchEvent(
    new CustomEvent("show-popover", {
      detail: e
    })
  );
}
function os(e) {
  document && document.dispatchEvent(
    new CustomEvent("hide-popover", {
      detail: e
    })
  );
}
function bh(e) {
  document && document.dispatchEvent(
    new CustomEvent("toggle-popover", {
      detail: e
    })
  );
}
function wh(e) {
  const { visibility: t } = e, r = t === "click", i = t === "hover", a = t === "hover-focus", l = t === "focus";
  e.autoHide = !r;
  let u = !1, c = !1;
  const f = (b) => {
    r && (bh({
      ...e,
      target: e.target || b.currentTarget
    }), b.stopPropagation());
  }, h = (b) => {
    u || (u = !0, (i || a) && A1({
      ...e,
      target: e.target || b.currentTarget
    }));
  }, p = () => {
    u && (u = !1, (i || a && !c) && os(e));
  }, m = (b) => {
    c || (c = !0, (l || a) && A1({
      ...e,
      target: e.target || b.currentTarget
    }));
  }, C = (b) => {
    c && !ma(b.currentTarget, b.relatedTarget) && (c = !1, (l || a && !u) && os(e));
  }, g = {};
  switch (e.visibility) {
    case "click":
      g.click = f;
      break;
    case "hover":
      g.mousemove = h, g.mouseleave = p;
      break;
    case "focus":
      g.focusin = m, g.focusout = C;
      break;
    case "hover-focus":
      g.mousemove = h, g.mouseleave = p, g.focusin = m, g.focusout = C;
      break;
  }
  return g;
}
const L0 = (e) => {
  const t = Ma(e);
  if (t == null)
    return;
  const r = t.popoverHandlers;
  !r || !r.length || (r.forEach((i) => i()), delete t.popoverHandlers);
}, x0 = (e, t) => {
  const r = Ma(e);
  if (r == null)
    return;
  const i = [], a = wh(t);
  Object.entries(a).forEach(([l, u]) => {
    i.push(Nr(r, l, u));
  }), r.popoverHandlers = i;
}, kh = {
  mounted(e, t) {
    const { value: r } = t;
    r && x0(e, r);
  },
  updated(e, t) {
    const { oldValue: r, value: i } = t, a = r == null ? void 0 : r.visibility, l = i == null ? void 0 : i.visibility;
    a !== l && (a && (L0(e), l || os(r)), l && x0(e, i));
  },
  unmounted(e) {
    L0(e);
  }
}, qA = (e, t, {
  maxSwipeTime: r,
  minHorizontalSwipeDistance: i,
  maxVerticalSwipeDistance: a
}) => {
  if (!e || !e.addEventListener || !Mo(t))
    return null;
  let l = 0, u = 0, c = null, f = !1;
  function h(m) {
    const C = m.changedTouches[0];
    l = C.screenX, u = C.screenY, c = (/* @__PURE__ */ new Date()).getTime(), f = !0;
  }
  function p(m) {
    if (!f || !c)
      return;
    f = !1;
    const C = m.changedTouches[0], g = C.screenX - l, b = C.screenY - u;
    if ((/* @__PURE__ */ new Date()).getTime() - c < r && Math.abs(g) >= i && Math.abs(b) <= a) {
      const A = { toLeft: !1, toRight: !1 };
      g < 0 ? A.toLeft = !0 : A.toRight = !0, t(A);
    }
  }
  return Nr(e, "touchstart", h, { passive: !0 }), Nr(e, "touchend", p, { passive: !0 }), () => {
    Fr(e, "touchstart", h), Fr(e, "touchend", p);
  };
}, Ca = {}, GA = (e, t = 10) => {
  Ca[e] = Date.now() + t;
}, XA = (e, t) => {
  if (e in Ca) {
    const r = Ca[e];
    if (Date.now() < r)
      return;
    delete Ca[e];
  }
  t();
};
function $h() {
  return typeof window < "u";
}
function KA(e) {
  return $h() && e in window;
}
function JA(e) {
  const t = ie(!1), r = T(() => t.value ? "dark" : "light");
  let i, a;
  function l(g) {
    t.value = g.matches;
  }
  function u() {
    KA("matchMedia") && (i = window.matchMedia("(prefers-color-scheme: dark)"), i.addEventListener("change", l), t.value = i.matches);
  }
  function c() {
    const { selector: g = ":root", darkClass: b = "dark" } = e.value, M = document.querySelector(g);
    t.value = M.classList.contains(b);
  }
  function f(g) {
    const { selector: b = ":root", darkClass: M = "dark" } = g;
    if ($h() && b && M) {
      const A = document.querySelector(b);
      A && (a = new MutationObserver(c), a.observe(A, {
        attributes: !0,
        attributeFilter: ["class"]
      }), t.value = A.classList.contains(M));
    }
  }
  function h() {
    m();
    const g = typeof e.value;
    g === "string" && e.value.toLowerCase() === "system" ? u() : g === "object" ? f(e.value) : t.value = !!e.value;
  }
  const p = $e(() => e.value, () => h(), {
    immediate: !0
  });
  function m() {
    i && (i.removeEventListener("change", l), i = void 0), a && (a.disconnect(), a = void 0);
  }
  function C() {
    m(), p();
  }
  return ai(() => C()), {
    isDark: t,
    displayMode: r,
    cleanup: C
  };
}
const QA = ["base", "start", "end", "startEnd"], eP = [
  "class",
  "wrapperClass",
  "contentClass",
  "style",
  "contentStyle",
  "color",
  "fillMode"
], tP = { base: {}, start: {}, end: {} };
function yu(e, t, r = tP) {
  let i = e, a = {};
  t === !0 || zn(t) ? (i = zn(t) ? t : i, a = { ...r }) : Cr(t) && (c0(t, QA) ? a = { ...t } : a = {
    base: { ...t },
    start: { ...t },
    end: { ...t }
  });
  const l = rs(
    a,
    { start: a.startEnd, end: a.startEnd },
    r
  );
  return Object.entries(l).forEach(([u, c]) => {
    let f = i;
    c === !0 || zn(c) ? (f = zn(c) ? c : f, l[u] = { color: f }) : Cr(c) && (c0(c, eP) ? l[u] = { ...c } : l[u] = {}), rs(l[u], { color: f });
  }), l;
}
class nP {
  constructor() {
    fe(this, "type", "highlight");
  }
  normalizeConfig(t, r) {
    return yu(t, r, {
      base: { fillMode: "light" },
      start: { fillMode: "solid" },
      end: { fillMode: "solid" }
    });
  }
  prepareRender(t) {
    t.highlights = [], t.content || (t.content = []);
  }
  render({ data: t, onStart: r, onEnd: i }, a) {
    const { key: l, highlight: u } = t;
    if (!u)
      return;
    const { highlights: c } = a, { base: f, start: h, end: p } = u;
    r && i ? c.push({
      ...h,
      key: l,
      wrapperClass: `vc-day-layer vc-day-box-center-center vc-attr vc-${h.color}`,
      class: [`vc-highlight vc-highlight-bg-${h.fillMode}`, h.class],
      contentClass: [
        `vc-attr vc-highlight-content-${h.fillMode} vc-${h.color}`,
        h.contentClass
      ]
    }) : r ? (c.push({
      ...f,
      key: `${l}-base`,
      wrapperClass: `vc-day-layer vc-day-box-right-center vc-attr vc-${f.color}`,
      class: [
        `vc-highlight vc-highlight-base-start vc-highlight-bg-${f.fillMode}`,
        f.class
      ]
    }), c.push({
      ...h,
      key: l,
      wrapperClass: `vc-day-layer vc-day-box-center-center vc-attr vc-${h.color}`,
      class: [`vc-highlight vc-highlight-bg-${h.fillMode}`, h.class],
      contentClass: [
        `vc-attr vc-highlight-content-${h.fillMode} vc-${h.color}`,
        h.contentClass
      ]
    })) : i ? (c.push({
      ...f,
      key: `${l}-base`,
      wrapperClass: `vc-day-layer vc-day-box-left-center vc-attr vc-${f.color}`,
      class: [
        `vc-highlight vc-highlight-base-end vc-highlight-bg-${f.fillMode}`,
        f.class
      ]
    }), c.push({
      ...p,
      key: l,
      wrapperClass: `vc-day-layer vc-day-box-center-center vc-attr vc-${p.color}`,
      class: [`vc-highlight vc-highlight-bg-${p.fillMode}`, p.class],
      contentClass: [
        `vc-attr vc-highlight-content-${p.fillMode} vc-${p.color}`,
        p.contentClass
      ]
    })) : c.push({
      ...f,
      key: `${l}-middle`,
      wrapperClass: `vc-day-layer vc-day-box-center-center vc-attr vc-${f.color}`,
      class: [
        `vc-highlight vc-highlight-base-middle vc-highlight-bg-${f.fillMode}`,
        f.class
      ],
      contentClass: [
        `vc-attr vc-highlight-content-${f.fillMode} vc-${f.color}`,
        f.contentClass
      ]
    });
  }
}
class _u {
  constructor(t, r) {
    fe(this, "type", ""), fe(this, "collectionType", ""), this.type = t, this.collectionType = r;
  }
  normalizeConfig(t, r) {
    return yu(t, r);
  }
  prepareRender(t) {
    t[this.collectionType] = [];
  }
  render({ data: t, onStart: r, onEnd: i }, a) {
    const { key: l } = t, u = t[this.type];
    if (!l || !u)
      return;
    const c = a[this.collectionType], { base: f, start: h, end: p } = u;
    r ? c.push({
      ...h,
      key: l,
      class: [
        `vc-${this.type} vc-${this.type}-start vc-${h.color} vc-attr`,
        h.class
      ]
    }) : i ? c.push({
      ...p,
      key: l,
      class: [
        `vc-${this.type} vc-${this.type}-end vc-${p.color} vc-attr`,
        p.class
      ]
    }) : c.push({
      ...f,
      key: l,
      class: [
        `vc-${this.type} vc-${this.type}-base vc-${f.color} vc-attr`,
        f.class
      ]
    });
  }
}
class rP extends _u {
  constructor() {
    super("content", "content");
  }
  normalizeConfig(t, r) {
    return yu("base", r);
  }
}
class oP extends _u {
  constructor() {
    super("dot", "dots");
  }
}
class iP extends _u {
  constructor() {
    super("bar", "bars");
  }
}
class sP {
  constructor(t) {
    fe(this, "color"), fe(this, "renderers", [
      new rP(),
      new nP(),
      new oP(),
      new iP()
    ]), this.color = t;
  }
  normalizeGlyphs(t) {
    this.renderers.forEach((r) => {
      const i = r.type;
      t[i] != null && (t[i] = r.normalizeConfig(this.color, t[i]));
    });
  }
  prepareRender(t = {}) {
    return this.renderers.forEach((r) => {
      r.prepareRender(t);
    }), t;
  }
  render(t, r) {
    this.renderers.forEach((i) => {
      i.render(t, r);
    });
  }
}
const Mh = Symbol("__vc_base_context__"), Dh = {
  color: {
    type: String,
    default: () => zr("color")
  },
  isDark: {
    type: [Boolean, String, Object],
    default: () => zr("isDark")
  },
  firstDayOfWeek: Number,
  masks: Object,
  locale: [String, Object],
  timezone: String,
  minDate: null,
  maxDate: null,
  disabledDates: null
};
function Sh(e) {
  const t = T(() => e.color ?? ""), r = T(() => e.isDark ?? !1), { displayMode: i } = JA(r), a = T(() => new sP(t.value)), l = T(() => {
    if (e.locale instanceof Ta)
      return e.locale;
    const C = Cr(e.locale) ? e.locale : {
      id: e.locale,
      firstDayOfWeek: e.firstDayOfWeek,
      masks: e.masks
    };
    return new Ta(C, e.timezone);
  }), u = T(() => l.value.masks), c = T(() => e.minDate), f = T(() => e.maxDate), h = T(() => {
    const C = e.disabledDates ? [...e.disabledDates] : [];
    return c.value != null && C.push({
      start: null,
      end: Ft(l.value.toDate(c.value), -1)
    }), f.value != null && C.push({
      start: Ft(l.value.toDate(f.value), 1),
      end: null
    }), l.value.ranges(C);
  }), p = T(() => new Ch(
    {
      key: "disabled",
      dates: h.value,
      order: 100
    },
    a.value,
    l.value
  )), m = {
    color: t,
    isDark: r,
    displayMode: i,
    theme: a,
    locale: l,
    masks: u,
    minDate: c,
    maxDate: f,
    disabledDates: h,
    disabledAttribute: p
  };
  return li(Mh, m), m;
}
function aP(e) {
  return $o(Mh, () => Sh(e), !0);
}
function Oh(e) {
  return `__vc_slot_${e}__`;
}
function Lh(e, t = {}) {
  Object.keys(e).forEach((r) => {
    li(Oh(t[r] ?? r), e[r]);
  });
}
function xh(e) {
  return $o(Oh(e), null);
}
const lP = {
  ...Dh,
  view: {
    type: String,
    default: "monthly",
    validator(e) {
      return ["daily", "weekly", "monthly"].includes(e);
    }
  },
  rows: {
    type: Number,
    default: 1
  },
  columns: {
    type: Number,
    default: 1
  },
  step: Number,
  titlePosition: {
    type: String,
    default: () => zr("titlePosition")
  },
  navVisibility: {
    type: String,
    default: () => zr("navVisibility")
  },
  showWeeknumbers: [Boolean, String],
  showIsoWeeknumbers: [Boolean, String],
  expanded: Boolean,
  borderless: Boolean,
  transparent: Boolean,
  initialPage: Object,
  initialPagePosition: { type: Number, default: 1 },
  minPage: Object,
  maxPage: Object,
  transition: String,
  attributes: Array,
  trimWeeks: Boolean,
  disablePageSwipe: Boolean
}, uP = [
  "dayclick",
  "daymouseenter",
  "daymouseleave",
  "dayfocusin",
  "dayfocusout",
  "daykeydown",
  "weeknumberclick",
  "transition-start",
  "transition-end",
  "did-move",
  "update:view",
  "update:pages"
], Th = Symbol("__vc_calendar_context__");
function cP(e, { slots: t, emit: r }) {
  const i = ie(null), a = ie(null), l = ie((/* @__PURE__ */ new Date()).getDate()), u = ie(!1), c = ie(Symbol()), f = ie(Symbol()), h = ie(e.view), p = ie([]), m = ie("");
  let C = null, g = null;
  Lh(t);
  const {
    theme: b,
    color: M,
    displayMode: A,
    locale: D,
    masks: Y,
    minDate: K,
    maxDate: H,
    disabledAttribute: I,
    disabledDates: U
  } = aP(e), E = T(() => e.rows * e.columns), ee = T(() => e.step || E.value), ue = T(() => Q2(p.value) ?? null), W = T(() => Go(p.value) ?? null), N = T(
    () => e.minPage || (K.value ? de(K.value) : null)
  ), G = T(
    () => e.maxPage || (H.value ? de(H.value) : null)
  ), re = T(() => e.navVisibility), Ce = T(() => !!e.showWeeknumbers), se = T(() => !!e.showIsoWeeknumbers), Oe = T(() => h.value === "monthly"), De = T(() => h.value === "weekly"), Ae = T(() => h.value === "daily"), Se = () => {
    u.value = !0, r("transition-start");
  }, X = () => {
    u.value = !1, r("transition-end"), C && (C.resolve(!0), C = null);
  }, _e = (q, k, Z = h.value) => sh(q, k, Z, D.value), de = (q) => ih(q, h.value, D.value), Qe = (q) => {
    !I.value || !vt.value || (q.isDisabled = vt.value.cellExists(
      I.value.key,
      q.dayIndex
    ));
  }, Ve = (q) => {
    q.isFocusable = q.inMonth && q.day === l.value;
  }, qe = (q, k) => {
    for (const Z of q)
      for (const Q of Z.days)
        if (k(Q) === !1)
          return;
  }, st = T(
    () => p.value.reduce((q, k) => (q.push(...k.viewDays), q), [])
  ), at = T(() => {
    const q = [];
    return (e.attributes || []).forEach((k, Z) => {
      !k || !k.dates || q.push(
        new Ch(
          {
            ...k,
            order: k.order || 0
          },
          b.value,
          D.value
        )
      );
    }), I.value && q.push(I.value), q;
  }), rt = T(() => mr(at.value)), vt = T(() => {
    const q = new UT();
    return at.value.forEach((k) => {
      k.ranges.forEach((Z) => {
        q.render(k, Z, st.value);
      });
    }), q;
  }), On = T(() => st.value.reduce((q, k) => (q[k.dayIndex] = { day: k, cells: [] }, q[k.dayIndex].cells.push(...vt.value.getCells(k)), q), {})), St = (q, k) => {
    const Z = e.showWeeknumbers || e.showIsoWeeknumbers;
    return Z == null ? "" : vO(Z) ? Z ? "left" : "" : Z.startsWith("right") ? k > 1 ? "right" : Z : q > 1 ? "left" : Z;
  }, Ct = () => {
    var q, k;
    if (!rt.value)
      return null;
    const Z = at.value.find((Ke) => Ke.pinPage) || at.value[0];
    if (!Z || !Z.hasRanges)
      return null;
    const [Q] = Z.ranges, we = ((q = Q.start) == null ? void 0 : q.date) || ((k = Q.end) == null ? void 0 : k.date);
    return we ? de(we) : null;
  }, Ht = () => {
    if (qn(ue.value))
      return ue.value;
    const q = Ct();
    return qn(q) ? q : de(/* @__PURE__ */ new Date());
  }, ft = (q, k = {}) => {
    const { view: Z = h.value, position: Q = 1, force: we } = k, Ke = Q > 0 ? 1 - Q : -(E.value + Q);
    let kt = _e(q, Ke, Z), Rt = _e(kt, E.value - 1, Z);
    return we || (L1(kt, N.value) ? kt = N.value : xa(Rt, G.value) && (kt = _e(G.value, 1 - E.value)), Rt = _e(kt, E.value - 1)), { fromPage: kt, toPage: Rt };
  }, dn = (q, k, Z = "") => {
    if (Z === "none" || Z === "fade")
      return Z;
    if ((q == null ? void 0 : q.view) !== (k == null ? void 0 : k.view))
      return "fade";
    const Q = xa(k, q), we = L1(k, q);
    return !Q && !we ? "fade" : Z === "slide-v" ? we ? "slide-down" : "slide-up" : we ? "slide-right" : "slide-left";
  }, fn = (q = {}) => new Promise((k, Z) => {
    const { position: Q = 1, force: we = !1, transition: Ke } = q, kt = qn(q.page) ? q.page : Ht(), { fromPage: Rt } = ft(kt, {
      position: Q,
      force: we
    }), xr = [];
    for (let Tr = 0; Tr < E.value; Tr++) {
      const Oo = _e(Rt, Tr), Ot = Tr + 1, _i = Math.ceil(Ot / e.columns), Lo = e.rows - _i + 1, sr = Ot % e.columns || e.columns, Qr = e.columns - sr + 1, Ci = St(sr, Qr);
      xr.push(
        D.value.getPage({
          ...Oo,
          view: h.value,
          titlePosition: e.titlePosition,
          trimWeeks: e.trimWeeks,
          position: Ot,
          row: _i,
          rowFromEnd: Lo,
          column: sr,
          columnFromEnd: Qr,
          showWeeknumbers: Ce.value,
          showIsoWeeknumbers: se.value,
          weeknumberPosition: Ci
        })
      );
    }
    m.value = dn(
      p.value[0],
      xr[0],
      Ke
    ), p.value = xr, m.value && m.value !== "none" ? C = {
      resolve: k,
      reject: Z
    } : k(!0);
  }), bt = (q) => {
    const k = ue.value ?? de(/* @__PURE__ */ new Date());
    return _e(k, q);
  }, Yn = (q, k = {}) => {
    const Z = qn(q) ? q : de(q);
    return Object.assign(
      k,
      ft(Z, {
        ...k,
        force: !0
      })
    ), FT(
      k.fromPage,
      k.toPage,
      h.value,
      D.value
    ).map((we) => BT(we, N.value, G.value)).some((we) => we);
  }, or = (q, k = {}) => Yn(bt(q), k), wt = T(() => or(-ee.value)), ht = T(() => or(ee.value)), Ut = async (q, k = {}) => !k.force && !Yn(q, k) ? !1 : (k.fromPage && !WT(k.fromPage, ue.value) && (os({ id: c.value, hideDelay: 0 }), k.view && (GA("view", 10), h.value = k.view), await fn({
    ...k,
    page: k.fromPage,
    position: 1,
    force: !0
  }), r("did-move", p.value)), !0), en = (q, k = {}) => Ut(bt(q), k), Bn = () => en(-ee.value), Zt = () => en(ee.value), Wn = (q) => {
    const k = Oe.value ? ".in-month" : "", Z = `.id-${D.value.getDayId(q)}${k}`, Q = `${Z}.vc-focusable, ${Z} .vc-focusable`, we = i.value;
    if (we) {
      const Ke = we.querySelector(Q);
      if (Ke)
        return Ke.focus(), !0;
    }
    return !1;
  }, tn = async (q, k = {}) => Wn(q) ? !0 : (await Ut(q, k), Wn(q)), nn = (q, k) => {
    l.value = q.day, r("dayclick", q, k);
  }, Xr = (q, k) => {
    r("daymouseenter", q, k);
  }, ir = (q, k) => {
    r("daymouseleave", q, k);
  }, Kr = (q, k) => {
    l.value = q.day, a.value = q, q.isFocused = !0, r("dayfocusin", q, k);
  }, Dr = (q, k) => {
    a.value = null, q.isFocused = !1, r("dayfocusout", q, k);
  }, Sr = (q, k) => {
    r("daykeydown", q, k);
    const Z = q.noonDate;
    let Q = null;
    switch (k.key) {
      case "ArrowLeft": {
        Q = Ft(Z, -1);
        break;
      }
      case "ArrowRight": {
        Q = Ft(Z, 1);
        break;
      }
      case "ArrowUp": {
        Q = Ft(Z, -7);
        break;
      }
      case "ArrowDown": {
        Q = Ft(Z, 7);
        break;
      }
      case "Home": {
        Q = Ft(Z, -q.weekdayPosition + 1);
        break;
      }
      case "End": {
        Q = Ft(Z, q.weekdayPositionFromEnd);
        break;
      }
      case "PageUp": {
        k.altKey ? Q = C0(Z, -1) : Q = La(Z, -1);
        break;
      }
      case "PageDown": {
        k.altKey ? Q = C0(Z, 1) : Q = La(Z, 1);
        break;
      }
    }
    Q && (k.preventDefault(), tn(Q).catch());
  }, Jr = (q) => {
    const k = a.value;
    k != null && Sr(k, q);
  }, Or = (q, k) => {
    r("weeknumberclick", q, k);
  };
  fn({
    page: e.initialPage,
    position: e.initialPagePosition
  }), ze(() => {
    !e.disablePageSwipe && i.value && (g = qA(
      i.value,
      ({ toLeft: q = !1, toRight: k = !1 }) => {
        q ? Zt() : k && Bn();
      },
      zr("touch")
    ));
  }), ai(() => {
    p.value = [], g && g();
  }), $e(
    () => D.value,
    () => {
      fn();
    }
  ), $e(
    () => E.value,
    () => fn()
  ), $e(
    () => e.view,
    () => h.value = e.view
  ), $e(
    () => h.value,
    () => {
      XA("view", () => {
        fn();
      }), r("update:view", h.value);
    }
  ), $e(
    () => l.value,
    () => {
      qe(p.value, (q) => Ve(q));
    }
  ), It(() => {
    r("update:pages", p.value), qe(p.value, (q) => {
      Qe(q), Ve(q);
    });
  });
  const Lr = {
    emit: r,
    containerRef: i,
    focusedDay: a,
    inTransition: u,
    navPopoverId: c,
    dayPopoverId: f,
    view: h,
    pages: p,
    transitionName: m,
    theme: b,
    color: M,
    displayMode: A,
    locale: D,
    masks: Y,
    attributes: at,
    disabledAttribute: I,
    disabledDates: U,
    attributeContext: vt,
    days: st,
    dayCells: On,
    count: E,
    step: ee,
    firstPage: ue,
    lastPage: W,
    canMovePrev: wt,
    canMoveNext: ht,
    minPage: N,
    maxPage: G,
    isMonthly: Oe,
    isWeekly: De,
    isDaily: Ae,
    navVisibility: re,
    showWeeknumbers: Ce,
    showIsoWeeknumbers: se,
    getDateAddress: de,
    canMove: Yn,
    canMoveBy: or,
    move: Ut,
    moveBy: en,
    movePrev: Bn,
    moveNext: Zt,
    onTransitionBeforeEnter: Se,
    onTransitionAfterEnter: X,
    tryFocusDate: Wn,
    focusDate: tn,
    onKeydown: Jr,
    onDayKeydown: Sr,
    onDayClick: nn,
    onDayMouseenter: Xr,
    onDayMouseleave: ir,
    onDayFocusin: Kr,
    onDayFocusout: Dr,
    onWeeknumberClick: Or
  };
  return li(Th, Lr), Lr;
}
function So() {
  const e = $o(Th);
  if (e)
    return e;
  throw new Error(
    "Calendar context missing. Please verify this component is nested within a valid context provider."
  );
}
const dP = oe({
  inheritAttrs: !1,
  emits: ["before-show", "after-show", "before-hide", "after-hide"],
  props: {
    id: { type: [Number, String, Symbol], required: !0 },
    showDelay: { type: Number, default: 0 },
    hideDelay: { type: Number, default: 110 },
    boundarySelector: { type: String }
  },
  setup(e, { emit: t }) {
    let r;
    const i = ie();
    let a = null, l = null;
    const u = Fe({
      isVisible: !1,
      target: null,
      data: null,
      transition: "slide-fade",
      placement: "bottom",
      direction: "",
      positionFixed: !1,
      modifiers: [],
      isInteractive: !0,
      visibility: "click",
      isHovered: !1,
      isFocused: !1,
      autoHide: !1,
      force: !1
    });
    function c(X) {
      X && (u.direction = X.split("-")[0]);
    }
    function f({ placement: X, options: _e }) {
      c(X || (_e == null ? void 0 : _e.placement));
    }
    const h = T(() => ({
      placement: u.placement,
      strategy: u.positionFixed ? "fixed" : "absolute",
      boundary: "",
      modifiers: [
        {
          name: "onUpdate",
          enabled: !0,
          phase: "afterWrite",
          fn: f
        },
        ...u.modifiers || []
      ],
      onFirstUpdate: f
    })), p = T(() => {
      const X = u.direction === "left" || u.direction === "right";
      let _e = "";
      if (u.placement) {
        const de = u.placement.split("-");
        de.length > 1 && (_e = de[1]);
      }
      return ["start", "top", "left"].includes(_e) ? X ? "top" : "left" : ["end", "bottom", "right"].includes(_e) ? X ? "bottom" : "right" : X ? "middle" : "center";
    });
    function m() {
      l && (l.destroy(), l = null);
    }
    function C() {
      po(() => {
        const X = Ma(u.target);
        !X || !i.value || (l && l.state.elements.reference !== X && m(), l ? l.update() : l = o_(
          X,
          i.value,
          h.value
        ));
      });
    }
    function g(X) {
      Object.assign(u, th(X, "force"));
    }
    function b(X, _e) {
      clearTimeout(r), X > 0 ? r = setTimeout(_e, X) : _e();
    }
    function M(X) {
      return !X || !l ? !1 : Ma(X) === l.state.elements.reference;
    }
    async function A(X = {}) {
      u.force || (X.force && (u.force = !0), b(X.showDelay ?? e.showDelay, () => {
        u.isVisible && (u.force = !1), g({
          ...X,
          isVisible: !0
        }), C();
      }));
    }
    function D(X = {}) {
      l && (X.target && !M(X.target) || u.force || (X.force && (u.force = !0), b(X.hideDelay ?? e.hideDelay, () => {
        u.isVisible || (u.force = !1), u.isVisible = !1;
      })));
    }
    function Y(X = {}) {
      X.target != null && (u.isVisible && M(X.target) ? D(X) : A(X));
    }
    function K(X) {
      if (!l)
        return;
      const _e = l.state.elements.reference;
      if (!i.value || !_e)
        return;
      const de = X.target;
      ma(i.value, de) || ma(_e, de) || D({ force: !0 });
    }
    function H(X) {
      (X.key === "Esc" || X.key === "Escape") && D();
    }
    function I({ detail: X }) {
      !X.id || X.id !== e.id || A(X);
    }
    function U({ detail: X }) {
      !X.id || X.id !== e.id || D(X);
    }
    function E({ detail: X }) {
      !X.id || X.id !== e.id || Y(X);
    }
    function ee() {
      Nr(document, "keydown", H), Nr(document, "click", K), Nr(document, "show-popover", I), Nr(document, "hide-popover", U), Nr(document, "toggle-popover", E);
    }
    function ue() {
      Fr(document, "keydown", H), Fr(document, "click", K), Fr(document, "show-popover", I), Fr(document, "hide-popover", U), Fr(document, "toggle-popover", E);
    }
    function W(X) {
      t("before-show", X);
    }
    function N(X) {
      u.force = !1, t("after-show", X);
    }
    function G(X) {
      t("before-hide", X);
    }
    function re(X) {
      u.force = !1, m(), t("after-hide", X);
    }
    function Ce(X) {
      X.stopPropagation();
    }
    function se() {
      u.isHovered = !0, u.isInteractive && ["hover", "hover-focus"].includes(u.visibility) && A();
    }
    function Oe() {
      if (u.isHovered = !1, !l)
        return;
      const X = l.state.elements.reference;
      u.autoHide && !u.isFocused && (!X || X !== document.activeElement) && ["hover", "hover-focus"].includes(u.visibility) && D();
    }
    function De() {
      u.isFocused = !0, u.isInteractive && ["focus", "hover-focus"].includes(u.visibility) && A();
    }
    function Ae(X) {
      ["focus", "hover-focus"].includes(u.visibility) && (!X.relatedTarget || !ma(i.value, X.relatedTarget)) && (u.isFocused = !1, !u.isHovered && u.autoHide && D());
    }
    function Se() {
      a != null && (a.disconnect(), a = null);
    }
    return $e(
      () => i.value,
      (X) => {
        Se(), X && (a = new ResizeObserver(() => {
          l && l.update();
        }), a.observe(X));
      }
    ), $e(() => u.placement, c, {
      immediate: !0
    }), ze(() => {
      ee();
    }), ai(() => {
      m(), Se(), ue();
    }), {
      ...g1(u),
      popoverRef: i,
      alignment: p,
      hide: D,
      setupPopper: C,
      beforeEnter: W,
      afterEnter: N,
      beforeLeave: G,
      afterLeave: re,
      onClick: Ce,
      onMouseOver: se,
      onMouseLeave: Oe,
      onFocusIn: De,
      onFocusOut: Ae
    };
  }
}), Gr = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [i, a] of t)
    r[i] = a;
  return r;
};
function fP(e, t, r, i, a, l) {
  return $(), P("div", {
    class: le(["vc-popover-content-wrapper", { "is-interactive": e.isInteractive }]),
    ref: "popoverRef",
    onClick: t[0] || (t[0] = (...u) => e.onClick && e.onClick(...u)),
    onMouseover: t[1] || (t[1] = (...u) => e.onMouseOver && e.onMouseOver(...u)),
    onMouseleave: t[2] || (t[2] = (...u) => e.onMouseLeave && e.onMouseLeave(...u)),
    onFocusin: t[3] || (t[3] = (...u) => e.onFocusIn && e.onFocusIn(...u)),
    onFocusout: t[4] || (t[4] = (...u) => e.onFocusOut && e.onFocusOut(...u))
  }, [
    J(B1, {
      name: `vc-${e.transition}`,
      appear: "",
      onBeforeEnter: e.beforeEnter,
      onAfterEnter: e.afterEnter,
      onBeforeLeave: e.beforeLeave,
      onAfterLeave: e.afterLeave
    }, {
      default: me(() => [
        e.isVisible ? ($(), P("div", kr({
          key: 0,
          tabindex: "-1",
          class: `vc-popover-content direction-${e.direction}`
        }, e.$attrs), [
          Be(e.$slots, "default", {
            direction: e.direction,
            alignment: e.alignment,
            data: e.data,
            hide: e.hide
          }, () => [
            Qn(ye(e.data), 1)
          ]),
          V("span", {
            class: le([
              "vc-popover-caret",
              `direction-${e.direction}`,
              `align-${e.alignment}`
            ])
          }, null, 2)
        ], 16)) : ne("", !0)
      ]),
      _: 3
    }, 8, ["name", "onBeforeEnter", "onAfterEnter", "onBeforeLeave", "onAfterLeave"])
  ], 34);
}
const Cu = /* @__PURE__ */ Gr(dP, [["render", fP]]), hP = { class: "vc-day-popover-row" }, pP = {
  key: 0,
  class: "vc-day-popover-row-indicator"
}, vP = { class: "vc-day-popover-row-label" }, gP = /* @__PURE__ */ oe({
  __name: "PopoverRow",
  props: {
    attribute: null
  },
  setup(e) {
    const t = e, r = T(() => {
      const { content: i, highlight: a, dot: l, bar: u, popover: c } = t.attribute;
      return c && c.hideIndicator ? null : i ? {
        class: `vc-bar vc-day-popover-row-bar vc-attr vc-${i.base.color}`
      } : a ? {
        class: `vc-highlight-bg-solid vc-day-popover-row-highlight vc-attr vc-${a.base.color}`
      } : l ? {
        class: `vc-dot vc-attr vc-${l.base.color}`
      } : u ? {
        class: `vc-bar vc-day-popover-row-bar vc-attr vc-${u.base.color}`
      } : null;
    });
    return (i, a) => ($(), P("div", hP, [
      L(r) ? ($(), P("div", pP, [
        V("span", {
          class: le(L(r).class)
        }, null, 2)
      ])) : ne("", !0),
      V("div", vP, [
        Be(i.$slots, "default", {}, () => [
          Qn(ye(e.attribute.popover ? e.attribute.popover.label : "No content provided"), 1)
        ])
      ])
    ]));
  }
}), mP = {
  inheritAttrs: !1
}, wn = /* @__PURE__ */ oe({
  ...mP,
  __name: "CalendarSlot",
  props: {
    name: null
  },
  setup(e) {
    const r = xh(e.name);
    return (i, a) => L(r) ? ($(), ge(Y1(L(r)), mo(kr({ key: 0 }, i.$attrs)), null, 16)) : Be(i.$slots, "default", { key: 1 });
  }
}), yP = { class: "vc-day-popover-container" }, _P = {
  key: 0,
  class: "vc-day-popover-header"
}, CP = /* @__PURE__ */ oe({
  __name: "CalendarDayPopover",
  setup(e) {
    const { dayPopoverId: t, displayMode: r, color: i, masks: a, locale: l } = So();
    function u(f, h) {
      return l.value.formatDate(f, h);
    }
    function c(f) {
      return l.value.formatDate(f.date, a.value.dayPopover);
    }
    return (f, h) => ($(), ge(Cu, {
      id: L(t),
      class: le([`vc-${L(i)}`, `vc-${L(r)}`])
    }, {
      default: me(({ data: { day: p, attributes: m }, hide: C }) => [
        J(wn, {
          name: "day-popover",
          day: p,
          "day-title": c(p),
          attributes: m,
          format: u,
          masks: L(a),
          hide: C
        }, {
          default: me(() => [
            V("div", yP, [
              L(a).dayPopover ? ($(), P("div", _P, ye(c(p)), 1)) : ne("", !0),
              ($(!0), P(Re, null, Ze(m, (g) => ($(), ge(gP, {
                key: g.key,
                attribute: g
              }, null, 8, ["attribute"]))), 128))
            ])
          ]),
          _: 2
        }, 1032, ["day", "day-title", "attributes", "masks", "hide"])
      ]),
      _: 1
    }, 8, ["id", "class"]));
  }
}), bP = {}, wP = {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  viewBox: "0 0 24 24"
}, kP = /* @__PURE__ */ V("polyline", { points: "9 18 15 12 9 6" }, null, -1), $P = [
  kP
];
function MP(e, t) {
  return $(), P("svg", wP, $P);
}
const DP = /* @__PURE__ */ Gr(bP, [["render", MP]]), SP = {}, OP = {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  viewBox: "0 0 24 24"
}, LP = /* @__PURE__ */ V("polyline", { points: "15 18 9 12 15 6" }, null, -1), xP = [
  LP
];
function TP(e, t) {
  return $(), P("svg", OP, xP);
}
const AP = /* @__PURE__ */ Gr(SP, [["render", TP]]), PP = {}, IP = {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  viewBox: "0 0 24 24"
}, EP = /* @__PURE__ */ V("polyline", { points: "6 9 12 15 18 9" }, null, -1), HP = [
  EP
];
function RP(e, t) {
  return $(), P("svg", IP, HP);
}
const VP = /* @__PURE__ */ Gr(PP, [["render", RP]]), YP = {}, BP = {
  fill: "none",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
}, WP = /* @__PURE__ */ V("path", { d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }, null, -1), FP = [
  WP
];
function NP(e, t) {
  return $(), P("svg", BP, FP);
}
const jP = /* @__PURE__ */ Gr(YP, [["render", NP]]), UP = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  IconChevronDown: VP,
  IconChevronLeft: AP,
  IconChevronRight: DP,
  IconClock: jP
}, Symbol.toStringTag, { value: "Module" })), si = /* @__PURE__ */ oe({
  __name: "BaseIcon",
  props: {
    name: { type: String, required: !0 },
    width: { type: String },
    height: { type: String },
    size: { type: String, default: "26" },
    viewBox: { type: String }
  },
  setup(e) {
    const t = e, r = T(() => t.width || t.size), i = T(() => t.height || t.size), a = T(() => UP[`Icon${t.name}`]);
    return (l, u) => ($(), ge(Y1(L(a)), {
      width: L(r),
      height: L(i),
      class: "vc-base-icon"
    }, null, 8, ["width", "height"]));
  }
}), ZP = ["disabled"], zP = {
  key: 1,
  class: "vc-title-wrapper"
}, qP = {
  type: "button",
  class: "vc-title"
}, GP = ["disabled"], Ah = /* @__PURE__ */ oe({
  __name: "CalendarHeader",
  props: {
    page: null,
    layout: null,
    isLg: { type: Boolean },
    isXl: { type: Boolean },
    is2xl: { type: Boolean },
    hideTitle: { type: Boolean },
    hideArrows: { type: Boolean }
  },
  setup(e) {
    const t = e, {
      navPopoverId: r,
      navVisibility: i,
      canMovePrev: a,
      movePrev: l,
      canMoveNext: u,
      moveNext: c
    } = So(), f = T(() => {
      switch (t.page.titlePosition) {
        case "left":
          return "bottom-start";
        case "right":
          return "bottom-end";
        default:
          return "bottom";
      }
    }), h = T(() => {
      const { page: M } = t;
      return {
        id: r.value,
        visibility: i.value,
        placement: f.value,
        modifiers: [{ name: "flip", options: { fallbackPlacements: ["bottom"] } }],
        data: { page: M },
        isInteractive: !0
      };
    }), p = T(() => t.page.titlePosition.includes("left")), m = T(() => t.page.titlePosition.includes("right")), C = T(() => t.layout ? t.layout : p.value ? "tu-pn" : m.value ? "pn-tu" : "p-tu-n;"), g = T(() => ({
      prev: C.value.includes("p") && !t.hideArrows,
      title: C.value.includes("t") && !t.hideTitle,
      next: C.value.includes("n") && !t.hideArrows
    })), b = T(() => ({ gridTemplateColumns: C.value.split("").map((A) => {
      switch (A) {
        case "p":
          return "[prev] auto";
        case "n":
          return "[next] auto";
        case "t":
          return "[title] auto";
        case "-":
          return "1fr";
        default:
          return "";
      }
    }).join(" ") }));
    return (M, A) => ($(), P("div", {
      class: le(["vc-header", { "is-lg": e.isLg, "is-xl": e.isXl, "is-2xl": e.is2xl }]),
      style: Pt(L(b))
    }, [
      L(g).prev ? ($(), P("button", {
        key: 0,
        type: "button",
        class: "vc-arrow vc-prev vc-focus",
        disabled: !L(a),
        onClick: A[0] || (A[0] = //@ts-ignore
        (...D) => L(l) && L(l)(...D)),
        onKeydown: A[1] || (A[1] = _o(
          //@ts-ignore
          (...D) => L(l) && L(l)(...D),
          ["space", "enter"]
        ))
      }, [
        J(wn, {
          name: "header-prev-button",
          disabled: !L(a)
        }, {
          default: me(() => [
            J(si, {
              name: "ChevronLeft",
              size: "24"
            })
          ]),
          _: 1
        }, 8, ["disabled"])
      ], 40, ZP)) : ne("", !0),
      L(g).title ? ($(), P("div", zP, [
        J(wn, { name: "header-title-wrapper" }, {
          default: me(() => [
            jt(($(), P("button", qP, [
              J(wn, {
                name: "header-title",
                title: e.page.title
              }, {
                default: me(() => [
                  V("span", null, ye(e.page.title), 1)
                ]),
                _: 1
              }, 8, ["title"])
            ])), [
              [L(kh), L(h)]
            ])
          ]),
          _: 1
        })
      ])) : ne("", !0),
      L(g).next ? ($(), P("button", {
        key: 2,
        type: "button",
        class: "vc-arrow vc-next vc-focus",
        disabled: !L(u),
        onClick: A[2] || (A[2] = //@ts-ignore
        (...D) => L(c) && L(c)(...D)),
        onKeydown: A[3] || (A[3] = _o(
          //@ts-ignore
          (...D) => L(c) && L(c)(...D),
          ["space", "enter"]
        ))
      }, [
        J(wn, {
          name: "header-next-button",
          disabled: !L(u)
        }, {
          default: me(() => [
            J(si, {
              name: "ChevronRight",
              size: "24"
            })
          ]),
          _: 1
        }, 8, ["disabled"])
      ], 40, GP)) : ne("", !0)
    ], 6));
  }
}), Ph = Symbol("__vc_page_context__");
function XP(e) {
  const { locale: t, getDateAddress: r, canMove: i } = So();
  function a(c, f) {
    const { month: h, year: p } = r(/* @__PURE__ */ new Date());
    return _h().map((m, C) => {
      const g = C + 1;
      return {
        month: g,
        year: c,
        id: YT(g, c),
        label: t.value.formatDate(m, f),
        ariaLabel: t.value.formatDate(m, "MMMM"),
        isActive: g === e.value.month && c === e.value.year,
        isCurrent: g === h && c === p,
        isDisabled: !i(
          { month: g, year: c },
          { position: e.value.position }
        )
      };
    });
  }
  function l(c, f) {
    const { year: h } = r(/* @__PURE__ */ new Date()), { position: p } = e.value, m = [];
    for (let C = c; C <= f; C += 1) {
      const g = [...Array(12).keys()].some(
        (b) => i({ month: b + 1, year: C }, { position: p })
      );
      m.push({
        year: C,
        id: C.toString(),
        label: C.toString(),
        ariaLabel: C.toString(),
        isActive: C === e.value.year,
        isCurrent: C === h,
        isDisabled: !g
      });
    }
    return m;
  }
  const u = { page: e, getMonthItems: a, getYearItems: l };
  return li(Ph, u), u;
}
function Ih() {
  const e = $o(Ph);
  if (e)
    return e;
  throw new Error(
    "Page context missing. Please verify this component is nested within a valid context provider."
  );
}
const KP = { class: "vc-nav-header" }, JP = ["disabled"], QP = ["disabled"], eI = { class: "vc-nav-items" }, tI = ["data-id", "aria-label", "disabled", "onClick", "onKeydown"], nI = /* @__PURE__ */ oe({
  __name: "CalendarNav",
  setup(e) {
    const { masks: t, move: r } = So(), { page: i, getMonthItems: a, getYearItems: l } = Ih(), u = ie(!0), c = 12, f = ie(i.value.year), h = ie(C(i.value.year)), p = ie(null);
    function m() {
      setTimeout(() => {
        if (p.value == null)
          return;
        const de = p.value.querySelector(
          ".vc-nav-item:not(:disabled)"
        );
        de && de.focus();
      }, 10);
    }
    function C(de) {
      return Math.floor(de / c);
    }
    function g() {
      u.value = !u.value;
    }
    function b(de) {
      return de * c;
    }
    function M(de) {
      return c * (de + 1) - 1;
    }
    function A() {
      De.value && (u.value && Y(), H());
    }
    function D() {
      Ae.value && (u.value && K(), I());
    }
    function Y() {
      f.value--;
    }
    function K() {
      f.value++;
    }
    function H() {
      h.value--;
    }
    function I() {
      h.value++;
    }
    const U = T(
      () => a(f.value, t.value.navMonths).map((de) => ({
        ...de,
        click: () => r(
          { month: de.month, year: de.year },
          { position: i.value.position }
        )
      }))
    ), E = T(
      () => a(f.value - 1, t.value.navMonths)
    ), ee = T(
      () => E.value.some((de) => !de.isDisabled)
    ), ue = T(
      () => a(f.value + 1, t.value.navMonths)
    ), W = T(
      () => ue.value.some((de) => !de.isDisabled)
    ), N = T(
      () => l(
        b(h.value),
        M(h.value)
      ).map((de) => ({
        ...de,
        click: () => {
          f.value = de.year, u.value = !0, m();
        }
      }))
    ), G = T(
      () => l(
        b(h.value - 1),
        M(h.value - 1)
      )
    ), re = T(
      () => G.value.some((de) => !de.isDisabled)
    ), Ce = T(
      () => l(
        b(h.value + 1),
        M(h.value + 1)
      )
    ), se = T(
      () => Ce.value.some((de) => !de.isDisabled)
    ), Oe = T(
      () => u.value ? U.value : N.value
    ), De = T(
      () => u.value ? ee.value : re.value
    ), Ae = T(
      () => u.value ? W.value : se.value
    ), Se = T(() => Q2(N.value.map((de) => de.year))), X = T(() => Go(N.value.map((de) => de.year))), _e = T(() => u.value ? f.value : `${Se.value} - ${X.value}`);
    return It(() => {
      f.value = i.value.year, m();
    }), $e(
      () => f.value,
      (de) => h.value = C(de)
    ), ze(() => m()), (de, Qe) => ($(), P("div", {
      class: "vc-nav-container",
      ref_key: "navContainer",
      ref: p
    }, [
      V("div", KP, [
        V("button", {
          type: "button",
          class: "vc-nav-arrow is-left vc-focus",
          disabled: !L(De),
          onClick: A,
          onKeydown: Qe[0] || (Qe[0] = (Ve) => L(aa)(Ve, A))
        }, [
          J(wn, {
            name: "nav-prev-button",
            move: A,
            disabled: !L(De)
          }, {
            default: me(() => [
              J(si, {
                name: "ChevronLeft",
                width: "22px",
                height: "24px"
              })
            ]),
            _: 1
          }, 8, ["disabled"])
        ], 40, JP),
        V("button", {
          type: "button",
          class: "vc-nav-title vc-focus",
          onClick: g,
          onKeydown: Qe[1] || (Qe[1] = (Ve) => L(aa)(Ve, g))
        }, ye(L(_e)), 33),
        V("button", {
          type: "button",
          class: "vc-nav-arrow is-right vc-focus",
          disabled: !L(Ae),
          onClick: D,
          onKeydown: Qe[2] || (Qe[2] = (Ve) => L(aa)(Ve, D))
        }, [
          J(wn, {
            name: "nav-next-button",
            move: D,
            disabled: !L(Ae)
          }, {
            default: me(() => [
              J(si, {
                name: "ChevronRight",
                width: "22px",
                height: "24px"
              })
            ]),
            _: 1
          }, 8, ["disabled"])
        ], 40, QP)
      ]),
      V("div", eI, [
        ($(!0), P(Re, null, Ze(L(Oe), (Ve) => ($(), P("button", {
          key: Ve.label,
          type: "button",
          "data-id": Ve.id,
          "aria-label": Ve.ariaLabel,
          class: le(["vc-nav-item vc-focus", [
            Ve.isActive ? "is-active" : Ve.isCurrent ? "is-current" : ""
          ]]),
          disabled: Ve.isDisabled,
          onClick: Ve.click,
          onKeydown: (qe) => L(aa)(qe, Ve.click)
        }, ye(Ve.label), 43, tI))), 128))
      ])
    ], 512));
  }
}), Eh = /* @__PURE__ */ oe({
  __name: "CalendarPageProvider",
  props: {
    page: null
  },
  setup(e) {
    return XP(Zr(e, "page")), (r, i) => Be(r.$slots, "default");
  }
}), rI = /* @__PURE__ */ oe({
  __name: "CalendarNavPopover",
  setup(e) {
    const { navPopoverId: t, color: r, displayMode: i } = So();
    return (a, l) => ($(), ge(Cu, {
      id: L(t),
      class: le(["vc-nav-popover-container", `vc-${L(r)}`, `vc-${L(i)}`])
    }, {
      default: me(({ data: u }) => [
        J(Eh, {
          page: u.page
        }, {
          default: me(() => [
            J(wn, { name: "nav" }, {
              default: me(() => [
                J(nI)
              ]),
              _: 1
            })
          ]),
          _: 2
        }, 1032, ["page"])
      ]),
      _: 1
    }, 8, ["id", "class"]));
  }
}), oI = oe({
  directives: { popover: kh },
  components: { CalendarSlot: wn },
  props: {
    day: { type: Object, required: !0 }
  },
  setup(e) {
    const {
      locale: t,
      theme: r,
      attributeContext: i,
      dayPopoverId: a,
      onDayClick: l,
      onDayMouseenter: u,
      onDayMouseleave: c,
      onDayFocusin: f,
      onDayFocusout: h,
      onDayKeydown: p
    } = So(), m = T(() => e.day), C = T(() => i.value.getCells(m.value)), g = T(
      () => C.value.map((se) => se.data)
    ), b = T(() => ({
      ...m.value,
      attributes: g.value,
      attributeCells: C.value
    }));
    function M({ data: se }, { popovers: Oe }) {
      const { key: De, customData: Ae, popover: Se } = se;
      if (!Se)
        return;
      const X = n0(
        {
          key: De,
          customData: Ae,
          attribute: se
        },
        { ...Se },
        {
          visibility: Se.label ? "hover" : "click",
          placement: "bottom",
          isInteractive: !Se.label
        }
      );
      Oe.splice(0, 0, X);
    }
    const A = T(() => {
      const se = {
        ...r.value.prepareRender({}),
        popovers: []
      };
      return C.value.forEach((Oe) => {
        r.value.render(Oe, se), M(Oe, se);
      }), se;
    }), D = T(() => A.value.highlights), Y = T(() => !!mr(D.value)), K = T(() => A.value.content), H = T(() => A.value.dots), I = T(() => !!mr(H.value)), U = T(() => A.value.bars), E = T(() => !!mr(U.value)), ee = T(() => A.value.popovers), ue = T(
      () => ee.value.map((se) => se.attribute)
    ), W = xh("day-content"), N = T(() => [
      "vc-day",
      ...m.value.classes,
      { "vc-day-box-center-center": !W },
      { "is-not-in-month": !e.day.inMonth }
    ]), G = T(() => {
      let se;
      m.value.isFocusable ? se = "0" : se = "-1";
      const Oe = [
        "vc-day-content vc-focusable vc-focus vc-attr",
        { "vc-disabled": m.value.isDisabled },
        go(Go(D.value), "contentClass"),
        go(Go(K.value), "class") || ""
      ], De = {
        ...go(Go(D.value), "contentStyle"),
        ...go(Go(K.value), "style")
      };
      return {
        class: Oe,
        style: De,
        tabindex: se,
        "aria-label": m.value.ariaLabel,
        "aria-disabled": !!m.value.isDisabled,
        role: "button"
      };
    }), re = T(() => ({
      click(se) {
        l(b.value, se);
      },
      mouseenter(se) {
        u(b.value, se);
      },
      mouseleave(se) {
        c(b.value, se);
      },
      focusin(se) {
        f(b.value, se);
      },
      focusout(se) {
        h(b.value, se);
      },
      keydown(se) {
        p(b.value, se);
      }
    })), Ce = T(() => mr(ee.value) ? n0(
      {
        id: a.value,
        data: { day: m, attributes: ue.value }
      },
      ...ee.value
    ) : null);
    return {
      attributes: g,
      attributeCells: C,
      bars: U,
      dayClasses: N,
      dayContentProps: G,
      dayContentEvents: re,
      dayPopover: Ce,
      glyphs: A,
      dots: H,
      hasDots: I,
      hasBars: E,
      highlights: D,
      hasHighlights: Y,
      locale: t,
      popovers: ee
    };
  }
}), iI = {
  key: 0,
  class: "vc-highlights vc-day-layer"
}, sI = {
  key: 1,
  class: "vc-day-layer vc-day-box-center-bottom"
}, aI = { class: "vc-dots" }, lI = {
  key: 2,
  class: "vc-day-layer vc-day-box-center-bottom"
}, uI = { class: "vc-bars" };
function cI(e, t, r, i, a, l) {
  const u = In("CalendarSlot"), c = iv("popover");
  return $(), P("div", {
    class: le(e.dayClasses)
  }, [
    e.hasHighlights ? ($(), P("div", iI, [
      ($(!0), P(Re, null, Ze(e.highlights, ({ key: f, wrapperClass: h, class: p, style: m }) => ($(), P("div", {
        key: f,
        class: le(h)
      }, [
        V("div", {
          class: le(p),
          style: Pt(m)
        }, null, 6)
      ], 2))), 128))
    ])) : ne("", !0),
    J(u, {
      name: "day-content",
      day: e.day,
      attributes: e.attributes,
      "attribute-cells": e.attributeCells,
      dayProps: e.dayContentProps,
      dayEvents: e.dayContentEvents,
      locale: e.locale
    }, {
      default: me(() => [
        jt(($(), P("div", kr(e.dayContentProps, sv(e.dayContentEvents, !0)), [
          Qn(ye(e.day.label), 1)
        ], 16)), [
          [c, e.dayPopover]
        ])
      ]),
      _: 1
    }, 8, ["day", "attributes", "attribute-cells", "dayProps", "dayEvents", "locale"]),
    e.hasDots ? ($(), P("div", sI, [
      V("div", aI, [
        ($(!0), P(Re, null, Ze(e.dots, ({ key: f, class: h, style: p }) => ($(), P("span", {
          key: f,
          class: le(h),
          style: Pt(p)
        }, null, 6))), 128))
      ])
    ])) : ne("", !0),
    e.hasBars ? ($(), P("div", lI, [
      V("div", uI, [
        ($(!0), P(Re, null, Ze(e.bars, ({ key: f, class: h, style: p }) => ($(), P("span", {
          key: f,
          class: le(h),
          style: Pt(p)
        }, null, 6))), 128))
      ])
    ])) : ne("", !0)
  ], 2);
}
const dI = /* @__PURE__ */ Gr(oI, [["render", cI]]), fI = { class: "vc-weekdays" }, hI = ["onClick"], pI = {
  inheritAttrs: !1
}, vI = /* @__PURE__ */ oe({
  ...pI,
  __name: "CalendarPage",
  setup(e) {
    const { page: t } = Ih(), { onWeeknumberClick: r } = So();
    return (i, a) => ($(), P("div", {
      class: le([
        "vc-pane",
        `row-${L(t).row}`,
        `row-from-end-${L(t).rowFromEnd}`,
        `column-${L(t).column}`,
        `column-from-end-${L(t).columnFromEnd}`
      ]),
      ref: "pane"
    }, [
      J(Ah, {
        page: L(t),
        "is-lg": "",
        "hide-arrows": ""
      }, null, 8, ["page"]),
      V("div", {
        class: le(["vc-weeks", {
          [`vc-show-weeknumbers-${L(t).weeknumberPosition}`]: L(t).weeknumberPosition
        }])
      }, [
        V("div", fI, [
          ($(!0), P(Re, null, Ze(L(t).weekdays, ({ weekday: l, label: u }, c) => ($(), P("div", {
            key: c,
            class: le(`vc-weekday vc-weekday-${l}`)
          }, ye(u), 3))), 128))
        ]),
        ($(!0), P(Re, null, Ze(L(t).viewWeeks, (l) => ($(), P("div", {
          key: `weeknumber-${l.weeknumber}`,
          class: "vc-week"
        }, [
          L(t).weeknumberPosition ? ($(), P("div", {
            key: 0,
            class: le(["vc-weeknumber", `is-${L(t).weeknumberPosition}`])
          }, [
            V("span", {
              class: le(["vc-weeknumber-content"]),
              onClick: (u) => L(r)(l, u)
            }, ye(l.weeknumberDisplay), 9, hI)
          ], 2)) : ne("", !0),
          ($(!0), P(Re, null, Ze(l.days, (u) => ($(), ge(dI, {
            key: u.id,
            day: u
          }, null, 8, ["day"]))), 128))
        ]))), 128))
      ], 2)
    ], 2));
  }
}), gI = oe({
  components: {
    CalendarHeader: Ah,
    CalendarPage: vI,
    CalendarNavPopover: rI,
    CalendarDayPopover: CP,
    CalendarPageProvider: Eh,
    CalendarSlot: wn
  },
  props: lP,
  emit: uP,
  setup(e, { emit: t, slots: r }) {
    return cP(e, { emit: t, slots: r });
  }
}), mI = { class: "vc-pane-header-wrapper" };
function yI(e, t, r, i, a, l) {
  const u = In("CalendarHeader"), c = In("CalendarPage"), f = In("CalendarSlot"), h = In("CalendarPageProvider"), p = In("CalendarDayPopover"), m = In("CalendarNavPopover");
  return $(), P(Re, null, [
    V("div", kr({ "data-helptext": "Press the arrow keys to navigate by day, Home and End to navigate to week ends, PageUp and PageDown to navigate by month, Alt+PageUp and Alt+PageDown to navigate by year" }, e.$attrs, {
      class: [
        "vc-container",
        `vc-${e.view}`,
        `vc-${e.color}`,
        `vc-${e.displayMode}`,
        {
          "vc-expanded": e.expanded,
          "vc-bordered": !e.borderless,
          "vc-transparent": e.transparent
        }
      ],
      onMouseup: t[0] || (t[0] = kn(() => {
      }, ["prevent"])),
      ref: "containerRef"
    }), [
      V("div", {
        class: le(["vc-pane-container", { "in-transition": e.inTransition }])
      }, [
        V("div", mI, [
          e.firstPage ? ($(), ge(u, {
            key: 0,
            page: e.firstPage,
            "is-lg": "",
            "hide-title": ""
          }, null, 8, ["page"])) : ne("", !0)
        ]),
        J(B1, {
          name: `vc-${e.transitionName}`,
          onBeforeEnter: e.onTransitionBeforeEnter,
          onAfterEnter: e.onTransitionAfterEnter
        }, {
          default: me(() => [
            ($(), P("div", {
              key: e.pages[0].id,
              class: "vc-pane-layout",
              style: Pt({
                gridTemplateColumns: `repeat(${e.columns}, 1fr)`
              })
            }, [
              ($(!0), P(Re, null, Ze(e.pages, (C) => ($(), ge(h, {
                key: C.id,
                page: C
              }, {
                default: me(() => [
                  J(f, {
                    name: "page",
                    page: C
                  }, {
                    default: me(() => [
                      J(c)
                    ]),
                    _: 2
                  }, 1032, ["page"])
                ]),
                _: 2
              }, 1032, ["page"]))), 128))
            ], 4))
          ]),
          _: 1
        }, 8, ["name", "onBeforeEnter", "onAfterEnter"]),
        J(f, { name: "footer" })
      ], 2)
    ], 16),
    J(p),
    J(m)
  ], 64);
}
const _I = /* @__PURE__ */ Gr(gI, [["render", yI]]), Hh = Symbol("__vc_date_picker_context__"), CI = {
  ...Dh,
  mode: { type: String, default: "date" },
  modelValue: {
    type: [Number, String, Date, Object]
  },
  modelModifiers: {
    type: Object,
    default: () => ({})
  },
  rules: [String, Object],
  is24hr: Boolean,
  hideTimeHeader: Boolean,
  timeAccuracy: { type: Number, default: 2 },
  isRequired: Boolean,
  isRange: Boolean,
  updateOnInput: {
    type: Boolean,
    default: () => zr("datePicker.updateOnInput")
  },
  inputDebounce: {
    type: Number,
    default: () => zr("datePicker.inputDebounce")
  },
  popover: {
    type: [Boolean, Object],
    default: !0
  },
  dragAttribute: Object,
  selectAttribute: Object,
  attributes: [Object, Array]
}, bI = [
  "update:modelValue",
  "drag",
  "dayclick",
  "daykeydown",
  "popover-will-show",
  "popover-did-show",
  "popover-will-hide",
  "popover-did-hide"
];
function wI(e, { emit: t, slots: r }) {
  Lh(r, { footer: "dp-footer" });
  const i = Sh(e), { locale: a, masks: l, disabledAttribute: u } = i, c = ie(!1), f = ie(Symbol()), h = ie(null), p = ie(null), m = ie(["", ""]), C = ie(null), g = ie(null);
  let b, M, A = !0;
  const D = T(() => e.isRange || e.modelModifiers.range === !0), Y = T(
    () => D.value && h.value != null ? h.value.start : null
  ), K = T(
    () => D.value && h.value != null ? h.value.end : null
  ), H = T(() => e.mode.toLowerCase() === "date"), I = T(
    () => e.mode.toLowerCase() === "datetime"
  ), U = T(() => e.mode.toLowerCase() === "time"), E = T(() => !!p.value), ee = T(() => {
    let k = "date";
    e.modelModifiers.number && (k = "number"), e.modelModifiers.string && (k = "string");
    const Z = l.value.modelValue || "iso";
    return Qe({ type: k, mask: Z });
  }), ue = T(
    () => or(p.value ?? h.value)
  ), W = T(() => U.value ? e.is24hr ? l.value.inputTime24hr : l.value.inputTime : I.value ? e.is24hr ? l.value.inputDateTime24hr : l.value.inputDateTime : l.value.input), N = T(() => /[Hh]/g.test(W.value)), G = T(
    () => /[dD]{1,2}|Do|W{1,4}|M{1,4}|YY(?:YY)?/g.test(W.value)
  ), re = T(() => {
    if (N.value && G.value)
      return "dateTime";
    if (G.value)
      return "date";
    if (N.value)
      return "time";
  }), Ce = T(() => {
    var k;
    const Z = ((k = C.value) == null ? void 0 : k.$el.previousElementSibling) ?? void 0;
    return rs({}, e.popover, zr("datePicker.popover"), {
      target: Z
    });
  }), se = T(
    () => wh({
      ...Ce.value,
      id: f.value
    })
  ), Oe = T(() => D.value ? {
    start: m.value[0],
    end: m.value[1]
  } : m.value[0]), De = T(() => {
    const k = ["start", "end"].map((Z) => ({
      input: fn(Z),
      change: bt(Z),
      keyup: Yn,
      ...e.popover && se.value
    }));
    return D.value ? {
      start: k[0],
      end: k[1]
    } : k[0];
  }), Ae = T(() => {
    if (!at(h.value))
      return null;
    const k = {
      key: "select-drag",
      ...e.selectAttribute,
      dates: h.value,
      pinPage: !0
    }, { dot: Z, bar: Q, highlight: we, content: Ke } = k;
    return !Z && !Q && !we && !Ke && (k.highlight = !0), k;
  }), Se = T(() => {
    if (!D.value || !at(p.value))
      return null;
    const k = {
      key: "select-drag",
      ...e.dragAttribute,
      dates: p.value
    }, { dot: Z, bar: Q, highlight: we, content: Ke } = k;
    return !Z && !Q && !we && !Ke && (k.highlight = {
      startEnd: {
        fillMode: "outline"
      }
    }), k;
  }), X = T(() => {
    const k = Mn(e.attributes) ? [...e.attributes] : [];
    return Se.value ? k.unshift(Se.value) : Ae.value && k.unshift(Ae.value), k;
  }), _e = T(() => Qe(
    e.rules === "auto" ? de() : e.rules ?? {}
  ));
  function de() {
    const k = {
      ms: [0, 999],
      sec: [0, 59],
      min: [0, 59],
      hr: [0, 23]
    }, Z = H.value ? 0 : e.timeAccuracy;
    return [0, 1].map((Q) => {
      switch (Z) {
        case 0:
          return {
            hours: k.hr[Q],
            minutes: k.min[Q],
            seconds: k.sec[Q],
            milliseconds: k.ms[Q]
          };
        case 1:
          return {
            minutes: k.min[Q],
            seconds: k.sec[Q],
            milliseconds: k.ms[Q]
          };
        case 3:
          return { milliseconds: k.ms[Q] };
        case 4:
          return {};
        default:
          return { seconds: k.sec[Q], milliseconds: k.ms[Q] };
      }
    });
  }
  function Qe(k) {
    return Mn(k) ? k.length === 1 ? [k[0], k[0]] : k : [k, k];
  }
  function Ve(k) {
    return Qe(k).map(
      (Z, Q) => ({
        ...Z,
        rules: _e.value[Q]
      })
    );
  }
  function qe(k) {
    return k == null ? !1 : Hn(k) ? !isNaN(k) : Qo(k) ? !isNaN(k.getTime()) : zn(k) ? k !== "" : gu(k);
  }
  function st(k) {
    return Cr(k) && "start" in k && "end" in k && qe(k.start ?? null) && qe(k.end ?? null);
  }
  function at(k) {
    return st(k) || qe(k);
  }
  function rt(k, Z) {
    if (k == null && Z == null)
      return !0;
    if (k == null || Z == null)
      return !1;
    const Q = Qo(k), we = Qo(Z);
    return Q && we ? k.getTime() === Z.getTime() : Q || we ? !1 : rt(k.start, Z.start) && rt(k.end, Z.end);
  }
  function vt(k) {
    return !at(k) || !u.value ? !1 : u.value.intersectsRange(a.value.range(k));
  }
  function On(k, Z, Q, we) {
    if (!at(k))
      return null;
    if (st(k)) {
      const Ke = a.value.toDate(k.start, {
        ...Z[0],
        fillDate: Y.value ?? void 0,
        patch: Q
      }), kt = a.value.toDate(k.end, {
        ...Z[1],
        fillDate: K.value ?? void 0,
        patch: Q
      });
      return Dr({ start: Ke, end: kt }, we);
    }
    return a.value.toDateOrNull(k, {
      ...Z[0],
      fillDate: h.value,
      patch: Q
    });
  }
  function St(k, Z) {
    return st(k) ? {
      start: a.value.fromDate(k.start, Z[0]),
      end: a.value.fromDate(k.end, Z[1])
    } : D.value ? null : a.value.fromDate(k, Z[0]);
  }
  function Ct(k, Z = {}) {
    return clearTimeout(b), new Promise((Q) => {
      const { debounce: we = 0, ...Ke } = Z;
      we > 0 ? b = window.setTimeout(() => {
        Q(Ht(k, Ke));
      }, we) : Q(Ht(k, Ke));
    });
  }
  function Ht(k, {
    config: Z = ee.value,
    patch: Q = "dateTime",
    clearIfEqual: we = !1,
    formatInput: Ke = !0,
    hidePopover: kt = !1,
    dragging: Rt = E.value,
    targetPriority: xr,
    moveToValue: Tr = !1
  } = {}) {
    const Oo = Ve(Z);
    let Ot = On(
      k,
      Oo,
      Q,
      xr
    );
    if (vt(Ot)) {
      if (Rt)
        return null;
      Ot = h.value, kt = !1;
    } else Ot == null && e.isRequired ? Ot = h.value : (
      // Clear value if same value was passed
      Ot != null && rt(h.value, Ot) && we && (Ot = null)
    );
    const Lo = Rt ? p : h, sr = !rt(Lo.value, Ot);
    Lo.value = Ot, Rt || (p.value = null);
    const Qr = St(
      Ot,
      ee.value
    );
    return sr && (A = !1, t(Rt ? "drag" : "update:modelValue", Qr), po(() => A = !0)), kt && !Rt && ir(), Ke && ft(), Tr && po(() => Or(xr ?? "start")), Qr;
  }
  function ft() {
    po(() => {
      const k = Ve({
        type: "string",
        mask: W.value
      }), Z = St(
        p.value ?? h.value,
        k
      );
      D.value ? m.value = [Z && Z.start, Z && Z.end] : m.value = [Z, ""];
    });
  }
  function dn(k, Z, Q) {
    m.value.splice(Z === "start" ? 0 : 1, 1, k);
    const we = D.value ? {
      start: m.value[0],
      end: m.value[1] || m.value[0]
    } : k, Ke = {
      type: "string",
      mask: W.value
    };
    Ct(we, {
      ...Q,
      config: Ke,
      patch: re.value,
      targetPriority: Z,
      moveToValue: !0
    });
  }
  function fn(k) {
    return (Z) => {
      e.updateOnInput && dn(Z.currentTarget.value, k, {
        formatInput: !1,
        hidePopover: !1,
        debounce: e.inputDebounce
      });
    };
  }
  function bt(k) {
    return (Z) => {
      dn(Z.currentTarget.value, k, {
        formatInput: !0,
        hidePopover: !1
      });
    };
  }
  function Yn(k) {
    k.key === "Escape" && Ct(h.value, {
      formatInput: !0,
      hidePopover: !0
    });
  }
  function or(k) {
    return D.value ? [
      k && k.start ? a.value.getDateParts(k.start) : null,
      k && k.end ? a.value.getDateParts(k.end) : null
    ] : [k ? a.value.getDateParts(k) : null];
  }
  function wt() {
    p.value = null, ft();
  }
  function ht(k) {
    t("popover-will-show", k);
  }
  function Ut(k) {
    t("popover-did-show", k);
  }
  function en(k) {
    wt(), t("popover-will-hide", k);
  }
  function Bn(k) {
    t("popover-did-hide", k);
  }
  function Zt(k) {
    const Z = {
      patch: "date",
      formatInput: !0,
      hidePopover: !0
    };
    if (D.value) {
      const Q = !E.value;
      Q ? M = { start: k.startDate, end: k.endDate } : M != null && (M.end = k.date), Ct(M, {
        ...Z,
        dragging: Q
      });
    } else
      Ct(k.date, {
        ...Z,
        clearIfEqual: !e.isRequired
      });
  }
  function Wn(k, Z) {
    Zt(k), t("dayclick", k, Z);
  }
  function tn(k, Z) {
    switch (Z.key) {
      case " ":
      case "Enter": {
        Zt(k), Z.preventDefault();
        break;
      }
      case "Escape":
        ir();
    }
    t("daykeydown", k, Z);
  }
  function nn(k, Z) {
    !E.value || M == null || (M.end = k.date, Ct(Dr(M), {
      patch: "date",
      formatInput: !0
    }));
  }
  function Xr(k = {}) {
    A1({
      ...Ce.value,
      ...k,
      isInteractive: !0,
      id: f.value
    });
  }
  function ir(k = {}) {
    os({
      hideDelay: 10,
      force: !0,
      ...Ce.value,
      ...k,
      id: f.value
    });
  }
  function Kr(k) {
    bh({
      ...Ce.value,
      ...k,
      isInteractive: !0,
      id: f.value
    });
  }
  function Dr(k, Z) {
    const { start: Q, end: we } = k;
    if (Q > we)
      switch (Z) {
        case "start":
          return { start: Q, end: Q };
        case "end":
          return { start: we, end: we };
        default:
          return { start: we, end: Q };
      }
    return { start: Q, end: we };
  }
  async function Sr(k, Z = {}) {
    return g.value == null ? !1 : g.value.move(k, Z);
  }
  async function Jr(k, Z = {}) {
    return g.value == null ? !1 : g.value.moveBy(k, Z);
  }
  async function Or(k, Z = {}) {
    const Q = h.value;
    if (g.value == null || !at(Q))
      return !1;
    const we = k !== "end", Ke = we ? 1 : -1, kt = st(Q) ? we ? Q.start : Q.end : Q, Rt = ih(kt, "monthly", a.value);
    return g.value.move(Rt, { position: Ke, ...Z });
  }
  $e(
    () => e.isRange,
    (k) => {
      k && console.warn(
        "The `is-range` prop will be deprecated in future releases. Please use the `range` modifier."
      );
    },
    { immediate: !0 }
  ), $e(
    () => D.value,
    () => {
      Ht(null, { formatInput: !0 });
    }
  ), $e(
    () => W.value,
    () => ft()
  ), $e(
    () => e.modelValue,
    (k) => {
      A && Ht(k, {
        formatInput: !0,
        hidePopover: !1
      });
    }
  ), $e(
    () => _e.value,
    () => {
      Cr(e.rules) && Ht(e.modelValue, {
        formatInput: !0,
        hidePopover: !1
      });
    }
  ), $e(
    () => e.timezone,
    () => {
      Ht(h.value, { formatInput: !0 });
    }
  );
  const Lr = Qe(ee.value);
  h.value = On(
    e.modelValue ?? null,
    Lr,
    "dateTime"
  ), ze(() => {
    Ht(e.modelValue, {
      formatInput: !0,
      hidePopover: !1
    });
  }), po(() => c.value = !0);
  const q = {
    ...i,
    showCalendar: c,
    datePickerPopoverId: f,
    popoverRef: C,
    popoverEvents: se,
    calendarRef: g,
    isRange: D,
    isTimeMode: U,
    isDateTimeMode: I,
    is24hr: Zr(e, "is24hr"),
    hideTimeHeader: Zr(e, "hideTimeHeader"),
    timeAccuracy: Zr(e, "timeAccuracy"),
    isDragging: E,
    inputValue: Oe,
    inputEvents: De,
    dateParts: ue,
    attributes: X,
    rules: _e,
    move: Sr,
    moveBy: Jr,
    moveToValue: Or,
    updateValue: Ct,
    showPopover: Xr,
    hidePopover: ir,
    togglePopover: Kr,
    onDayClick: Wn,
    onDayKeydown: tn,
    onDayMouseEnter: nn,
    onPopoverBeforeShow: ht,
    onPopoverAfterShow: Ut,
    onPopoverBeforeHide: en,
    onPopoverAfterHide: Bn
  };
  return li(Hh, q), q;
}
function bu() {
  const e = $o(Hh);
  if (e)
    return e;
  throw new Error(
    "DatePicker context missing. Please verify this component is nested within a valid context provider."
  );
}
const kI = [
  { value: 0, label: "12" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" }
], $I = [
  { value: 12, label: "12" },
  { value: 13, label: "1" },
  { value: 14, label: "2" },
  { value: 15, label: "3" },
  { value: 16, label: "4" },
  { value: 17, label: "5" },
  { value: 18, label: "6" },
  { value: 19, label: "7" },
  { value: 20, label: "8" },
  { value: 21, label: "9" },
  { value: 22, label: "10" },
  { value: 23, label: "11" }
];
function MI(e) {
  const t = bu(), {
    locale: r,
    isRange: i,
    isTimeMode: a,
    dateParts: l,
    rules: u,
    is24hr: c,
    hideTimeHeader: f,
    timeAccuracy: h,
    updateValue: p
  } = t;
  function m(G) {
    G = Object.assign(g.value, G);
    let re = null;
    if (i.value) {
      const Ce = C.value ? G : l.value[0], se = C.value ? l.value[1] : G;
      re = { start: Ce, end: se };
    } else
      re = G;
    p(re, {
      patch: "time",
      targetPriority: C.value ? "start" : "end",
      moveToValue: !0
    });
  }
  const C = T(() => e.position === 0), g = T(
    () => l.value[e.position] || { isValid: !1 }
  ), b = T(() => gu(g.value)), M = T(() => !!g.value.isValid), A = T(() => !f.value && M.value), D = T(() => {
    if (!b.value)
      return null;
    let G = r.value.toDate(g.value);
    return g.value.hours === 24 && (G = new Date(G.getTime() - 1)), G;
  }), Y = T({
    get() {
      return g.value.hours;
    },
    set(G) {
      m({ hours: G });
    }
  }), K = T({
    get() {
      return g.value.minutes;
    },
    set(G) {
      m({ minutes: G });
    }
  }), H = T({
    get() {
      return g.value.seconds;
    },
    set(G) {
      m({ seconds: G });
    }
  }), I = T({
    get() {
      return g.value.milliseconds;
    },
    set(G) {
      m({ milliseconds: G });
    }
  }), U = T({
    get() {
      return g.value.hours < 12;
    },
    set(G) {
      G = String(G).toLowerCase() == "true";
      let re = Y.value;
      G && re >= 12 ? re -= 12 : !G && re < 12 && (re += 12), m({ hours: re });
    }
  }), E = T(
    () => NA(g.value, u.value[e.position])
  ), ee = T(() => kI.filter(
    (G) => E.value.hours.some((re) => re.value === G.value)
  )), ue = T(() => $I.filter(
    (G) => E.value.hours.some((re) => re.value === G.value)
  )), W = T(() => c.value ? E.value.hours : U.value ? ee.value : ue.value), N = T(() => {
    const G = [];
    return mr(ee.value) && G.push({ value: !0, label: "AM" }), mr(ue.value) && G.push({ value: !1, label: "PM" }), G;
  });
  return {
    ...t,
    showHeader: A,
    timeAccuracy: h,
    parts: g,
    isValid: M,
    date: D,
    hours: Y,
    minutes: K,
    seconds: H,
    milliseconds: I,
    options: E,
    hourOptions: W,
    isAM: U,
    isAMOptions: N,
    is24hr: c
  };
}
const DI = ["value"], SI = ["value", "disabled"], OI = {
  key: 1,
  class: "vc-base-sizer",
  "aria-hidden": "true"
}, LI = {
  inheritAttrs: !1
}, Wi = /* @__PURE__ */ oe({
  ...LI,
  __name: "BaseSelect",
  props: {
    options: null,
    modelValue: null,
    alignRight: { type: Boolean },
    alignLeft: { type: Boolean },
    showIcon: { type: Boolean },
    fitContent: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e) {
    const t = e, r = T(() => {
      const i = t.options.find((a) => a.value === t.modelValue);
      return i == null ? void 0 : i.label;
    });
    return (i, a) => ($(), P("div", {
      class: le(["vc-base-select", {
        "vc-fit-content": e.fitContent,
        "vc-has-icon": e.showIcon
      }])
    }, [
      V("select", kr(i.$attrs, {
        value: e.modelValue,
        class: ["vc-focus", {
          "vc-align-right": e.alignRight,
          "vc-align-left": e.alignLeft
        }],
        onChange: a[0] || (a[0] = (l) => i.$emit("update:modelValue", l.target.value))
      }), [
        ($(!0), P(Re, null, Ze(e.options, (l) => ($(), P("option", {
          key: l.value,
          value: l.value,
          disabled: l.disabled
        }, ye(l.label), 9, SI))), 128))
      ], 16, DI),
      e.showIcon ? ($(), ge(si, {
        key: 0,
        name: "ChevronDown",
        size: "18"
      })) : ne("", !0),
      e.fitContent ? ($(), P("div", OI, ye(L(r)), 1)) : ne("", !0)
    ], 2));
  }
}), xI = {
  key: 0,
  class: "vc-time-header"
}, TI = { class: "vc-time-weekday" }, AI = { class: "vc-time-month" }, PI = { class: "vc-time-day" }, II = { class: "vc-time-year" }, EI = { class: "vc-time-select-group" }, HI = /* @__PURE__ */ V("span", { class: "vc-time-colon" }, ":", -1), RI = /* @__PURE__ */ V("span", { class: "vc-time-colon" }, ":", -1), VI = /* @__PURE__ */ V("span", { class: "vc-time-decimal" }, ".", -1), T0 = /* @__PURE__ */ oe({
  __name: "TimePicker",
  props: {
    position: null
  },
  setup(e, { expose: t }) {
    const i = MI(e);
    t(i);
    const {
      locale: a,
      isValid: l,
      date: u,
      hours: c,
      minutes: f,
      seconds: h,
      milliseconds: p,
      options: m,
      hourOptions: C,
      isTimeMode: g,
      isAM: b,
      isAMOptions: M,
      is24hr: A,
      showHeader: D,
      timeAccuracy: Y
    } = i;
    return (K, H) => ($(), P("div", {
      class: le(["vc-time-picker", [{ "vc-invalid": !L(l), "vc-attached": !L(g) }]])
    }, [
      J(wn, { name: "time-header" }, {
        default: me(() => [
          L(D) && L(u) ? ($(), P("div", xI, [
            V("span", TI, ye(L(a).formatDate(L(u), "WWW")), 1),
            V("span", AI, ye(L(a).formatDate(L(u), "MMM")), 1),
            V("span", PI, ye(L(a).formatDate(L(u), "D")), 1),
            V("span", II, ye(L(a).formatDate(L(u), "YYYY")), 1)
          ])) : ne("", !0)
        ]),
        _: 1
      }),
      V("div", EI, [
        J(si, {
          name: "Clock",
          size: "17"
        }),
        J(Wi, {
          modelValue: L(c),
          "onUpdate:modelValue": H[0] || (H[0] = (I) => Zn(c) ? c.value = I : null),
          modelModifiers: { number: !0 },
          options: L(C),
          class: "vc-time-select-hours",
          "align-right": ""
        }, null, 8, ["modelValue", "options"]),
        L(Y) > 1 ? ($(), P(Re, { key: 0 }, [
          HI,
          J(Wi, {
            modelValue: L(f),
            "onUpdate:modelValue": H[1] || (H[1] = (I) => Zn(f) ? f.value = I : null),
            modelModifiers: { number: !0 },
            options: L(m).minutes,
            class: "vc-time-select-minutes",
            "align-left": L(Y) === 2
          }, null, 8, ["modelValue", "options", "align-left"])
        ], 64)) : ne("", !0),
        L(Y) > 2 ? ($(), P(Re, { key: 1 }, [
          RI,
          J(Wi, {
            modelValue: L(h),
            "onUpdate:modelValue": H[2] || (H[2] = (I) => Zn(h) ? h.value = I : null),
            modelModifiers: { number: !0 },
            options: L(m).seconds,
            class: "vc-time-select-seconds",
            "align-left": L(Y) === 3
          }, null, 8, ["modelValue", "options", "align-left"])
        ], 64)) : ne("", !0),
        L(Y) > 3 ? ($(), P(Re, { key: 2 }, [
          VI,
          J(Wi, {
            modelValue: L(p),
            "onUpdate:modelValue": H[3] || (H[3] = (I) => Zn(p) ? p.value = I : null),
            modelModifiers: { number: !0 },
            options: L(m).milliseconds,
            class: "vc-time-select-milliseconds",
            "align-left": ""
          }, null, 8, ["modelValue", "options"])
        ], 64)) : ne("", !0),
        L(A) ? ne("", !0) : ($(), ge(Wi, {
          key: 3,
          modelValue: L(b),
          "onUpdate:modelValue": H[4] || (H[4] = (I) => Zn(b) ? b.value = I : null),
          options: L(M)
        }, null, 8, ["modelValue", "options"]))
      ])
    ], 2));
  }
}), Rh = /* @__PURE__ */ oe({
  __name: "DatePickerBase",
  setup(e) {
    const {
      attributes: t,
      calendarRef: r,
      color: i,
      displayMode: a,
      isDateTimeMode: l,
      isTimeMode: u,
      isRange: c,
      onDayClick: f,
      onDayMouseEnter: h,
      onDayKeydown: p
    } = bu(), m = c.value ? [0, 1] : [0];
    return (C, g) => L(u) ? ($(), P("div", {
      key: 0,
      class: le(`vc-container vc-bordered vc-${L(i)} vc-${L(a)}`)
    }, [
      ($(!0), P(Re, null, Ze(L(m), (b) => ($(), ge(T0, {
        key: b,
        position: b
      }, null, 8, ["position"]))), 128))
    ], 2)) : ($(), ge(_I, {
      key: 1,
      attributes: L(t),
      ref_key: "calendarRef",
      ref: r,
      onDayclick: L(f),
      onDaymouseenter: L(h),
      onDaykeydown: L(p)
    }, {
      footer: me(() => [
        L(l) ? ($(!0), P(Re, { key: 0 }, Ze(L(m), (b) => ($(), ge(T0, {
          key: b,
          position: b
        }, null, 8, ["position"]))), 128)) : ne("", !0),
        J(wn, { name: "dp-footer" })
      ]),
      _: 1
    }, 8, ["attributes", "onDayclick", "onDaymouseenter", "onDaykeydown"]));
  }
}), YI = {
  inheritAttrs: !1
}, BI = /* @__PURE__ */ oe({
  ...YI,
  __name: "DatePickerPopover",
  setup(e) {
    const {
      datePickerPopoverId: t,
      color: r,
      displayMode: i,
      popoverRef: a,
      onPopoverBeforeShow: l,
      onPopoverAfterShow: u,
      onPopoverBeforeHide: c,
      onPopoverAfterHide: f
    } = bu();
    return (h, p) => ($(), ge(Cu, {
      id: L(t),
      placement: "bottom-start",
      class: le(`vc-date-picker-content vc-${L(r)} vc-${L(i)}`),
      ref_key: "popoverRef",
      ref: a,
      onBeforeShow: L(l),
      onAfterShow: L(u),
      onBeforeHide: L(c),
      onAfterHide: L(f)
    }, {
      default: me(() => [
        J(Rh, mo(Ji(h.$attrs)), null, 16)
      ]),
      _: 1
    }, 8, ["id", "class", "onBeforeShow", "onAfterShow", "onBeforeHide", "onAfterHide"]));
  }
}), WI = oe({
  inheritAttrs: !1,
  emits: bI,
  props: CI,
  components: { DatePickerBase: Rh, DatePickerPopover: BI },
  setup(e, t) {
    const r = wI(e, t), i = Fe(th(r, "calendarRef", "popoverRef"));
    return { ...r, slotCtx: i };
  }
});
function FI(e, t, r, i, a, l) {
  const u = In("DatePickerPopover"), c = In("DatePickerBase");
  return e.$slots.default ? ($(), P(Re, { key: 0 }, [
    Be(e.$slots, "default", mo(Ji(e.slotCtx))),
    J(u, mo(Ji(e.$attrs)), null, 16)
  ], 64)) : ($(), ge(c, mo(kr({ key: 1 }, e.$attrs)), null, 16));
}
const NI = /* @__PURE__ */ Gr(WI, [["render", FI]]), jI = { key: 0 }, UI = {
  key: 1,
  class: "date-picker-yui-kit__header-btn__dash"
}, ZI = /* @__PURE__ */ oe({
  __name: "DataPickerChoose",
  props: {
    value: {},
    isActive: { type: Boolean },
    isRange: { type: Boolean },
    isSmall: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["clear", "click"],
  setup(e, { emit: t }) {
    const r = e, i = Fe({
      defaultValue: "-- -- ----",
      value: "",
      isActive: !1
    }), a = t;
    It(() => i.isActive = r.isActive), It(() => i.value = r.value);
    const l = () => {
      a("clear");
    }, u = () => {
      a("click");
    }, c = (f) => {
      if (!f) return null;
      const h = f.indexOf(" "), p = h === -1 ? 3 : Math.min(h, 3);
      return `${f.charAt(0).toUpperCase()}${f.slice(1, p)}${f.slice(h)}`;
    };
    return (f, h) => ($(), P("button", {
      onClick: u,
      class: le([
        "date-picker-yui-kit__header-btn",
        { "date-picker-yui-kit__header-btn_table-view": r.isSmall },
        { "date-picker-yui-kit__header-btn_range-view": r.isRange },
        { "date-disable-yui-kit": r.disabled },
        { "date-active-yui-kit": i.isActive }
      ])
    }, [
      J(Ee, {
        name: L(xe).calendar
      }, null, 8, ["name"]),
      i.value ? ($(), P("span", jI, ye(c(i.value)), 1)) : ($(), P("span", UI, ye(i.defaultValue), 1)),
      i.value ? ($(), ge(yr, {
        key: 2,
        size: L(as).small,
        type: L(Wt).ghost,
        disabled: r.disabled,
        onClick: kn(l, ["stop"])
      }, {
        default: me(() => [
          J(Ee, {
            name: L(xe).crossSmall
          }, null, 8, ["name"])
        ]),
        _: 1
      }, 8, ["size", "type", "disabled"])) : ne("", !0)
    ], 2));
  }
}), zI = /* @__PURE__ */ be(ZI, [["__scopeId", "data-v-f2d1fe0b"]]), qI = { class: "date-picker-yui-kit__wrapper" }, P1 = /* @__PURE__ */ oe({
  __name: "DatePicker",
  props: /* @__PURE__ */ En({
    range: {},
    locale: { default: "ru-RU" },
    fromTodayTime: { type: Boolean },
    setDate: {},
    startDate: {},
    endDate: {},
    isRange: { type: Boolean },
    isSmall: { type: Boolean },
    disabled: { type: Boolean }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ En(["clear", "change"], ["update:modelValue"]),
  setup(e, { expose: t, emit: r }) {
    const i = e, a = Fe({
      isActive: !1,
      startDate: null,
      endDate: null,
      isNotClear: !0,
      masks: {
        input: "MMMM DD, YYYY"
      }
    }), l = r, u = (C) => {
      if (a.isNotClear && (C(), !a.isActive)) {
        a.isActive = !0;
        return;
      }
      a.isActive = !1;
    }, c = Co(e, "modelValue"), f = () => {
      a.isNotClear = !1, c.value = null, l("clear"), setTimeout(() => a.isNotClear = !0, 1), h(null);
    }, h = (C) => {
      c.value = C, l("change", C);
    };
    It(() => a.startDate = i.startDate ?? null), It(() => a.endDate = i.endDate ?? null);
    const p = () => {
      const C = a.startDate ?? /* @__PURE__ */ new Date();
      if (i.startDate) {
        const g = c.value ?? /* @__PURE__ */ new Date();
        if (C.valueOf() <= g.valueOf())
          return C;
        if (C != null)
          return C;
      }
      return null;
    }, m = () => {
      const C = a.endDate ?? /* @__PURE__ */ new Date();
      if (i.endDate) {
        const g = c.value ?? /* @__PURE__ */ new Date();
        if (C.valueOf() >= g.valueOf())
          return C;
        if (C != null)
          return C;
      }
      return null;
    };
    return $e(
      () => c.value,
      () => {
        c.value || (c.value = null, a.isNotClear = !1, c.value = null, setTimeout(() => a.isNotClear = !0, 1));
      }
    ), t({
      clearChoose: f
    }), (C, g) => ($(), P("div", qI, [
      J(L(NI), {
        locale: i.locale || "ru",
        "title-position": "left",
        modelValue: c.value,
        "onUpdate:modelValue": g[0] || (g[0] = (b) => c.value = b),
        onDayclick: g[1] || (g[1] = ({ date: b }) => h(b)),
        masks: a.masks,
        "min-date": p(),
        "max-date": m(),
        popover: { visibility: "click" },
        onPopoverDidHide: g[2] || (g[2] = (b) => a.isActive = !1),
        borderless: "",
        "is-required": a.isNotClear,
        class: "date-picker-yui-kit"
      }, {
        default: me(({ inputValue: b, togglePopover: M }) => [
          J(zI, {
            onClick: (A) => u(M),
            onClear: f,
            "is-active": a.isActive,
            "is-small": i.isSmall,
            "is-range": i.isRange,
            value: b,
            disabled: i.disabled
          }, null, 8, ["onClick", "is-active", "is-small", "is-range", "value", "disabled"])
        ]),
        _: 1
      }, 8, ["locale", "modelValue", "masks", "min-date", "max-date", "is-required"])
    ]));
  }
});
var zi = /* @__PURE__ */ ((e) => (e.start = "start", e.end = "end", e))(zi || {});
const GI = (e) => (er("data-v-2221e591"), e = e(), tr(), e), XI = /* @__PURE__ */ GI(() => /* @__PURE__ */ V("div", { class: "date-picker-yui-kit__header__dash" }, null, -1)), KI = /* @__PURE__ */ oe({
  __name: "DatePickerRange",
  props: /* @__PURE__ */ En({
    range: {},
    locale: { default: "ru-RU" },
    fromTodayTime: { type: Boolean },
    setDate: {},
    startDate: {},
    endDate: {},
    isRange: { type: Boolean },
    isSmall: { type: Boolean },
    disabled: { type: Boolean }
  }, {
    startDate: {},
    startDateModifiers: {},
    endDate: {},
    endDateModifiers: {}
  }),
  emits: /* @__PURE__ */ En(["change"], ["update:startDate", "update:endDate"]),
  setup(e, { expose: t, emit: r }) {
    const i = e, a = r, l = Fe({
      date: {
        start: null,
        end: null
      },
      isActive: !1
    }), u = Co(e, "startDate"), c = Co(e, "endDate"), f = (m, C) => {
      l.date[C] = m, a("change", l.date);
    }, h = (m) => {
      l.date[m] = null;
    }, p = () => {
      Object.values(l.date).fill(null);
    };
    return $e([u, c], () => {
      (u.value || c.value) && (l.date = {
        start: u.value,
        end: c.value
      });
    }), ze(() => {
      (u.value || c.value) && (l.date = {
        start: u.value,
        end: c.value
      });
    }), t({
      clear: p
    }), (m, C) => {
      var g, b;
      return $(), P("div", {
        class: le([
          "date-picker-yui-kit__header",
          { "date-disable-yui-kit": i.disabled },
          { "date-active-yui-kit": l.isActive }
        ])
      }, [
        J(P1, {
          modelValue: l.date.start,
          "onUpdate:modelValue": C[0] || (C[0] = (M) => l.date.start = M),
          locale: i.locale,
          "is-range": "",
          disabled: i.disabled,
          "end-date": (g = l.date) == null ? void 0 : g.end,
          onChange: C[1] || (C[1] = (M) => f(M, L(zi).start)),
          onClear: C[2] || (C[2] = (M) => h(L(zi).start))
        }, null, 8, ["modelValue", "locale", "disabled", "end-date"]),
        XI,
        J(P1, {
          modelValue: l.date.end,
          "onUpdate:modelValue": C[3] || (C[3] = (M) => l.date.end = M),
          locale: i.locale,
          "is-range": "",
          disabled: i.disabled,
          "start-date": (b = l.date) == null ? void 0 : b.start,
          onChange: C[4] || (C[4] = (M) => f(M, L(zi).end)),
          onClear: C[5] || (C[5] = (M) => h(L(zi).end))
        }, null, 8, ["modelValue", "locale", "disabled", "start-date"])
      ], 2);
    };
  }
}), JI = /* @__PURE__ */ be(KI, [["__scopeId", "data-v-2221e591"]]), Vh = /* @__PURE__ */ oe({
  __name: "Calendar",
  props: {
    range: {},
    locale: {},
    fromTodayTime: { type: Boolean },
    setDate: {},
    startDate: {},
    endDate: {},
    isRange: { type: Boolean },
    isSmall: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["change", "click"],
  setup(e, { emit: t }) {
    const r = e, i = Fe({
      date: null,
      dateObject: {
        start: null,
        end: null
      }
    }), a = t, l = ie(), u = (f) => {
      a("change", f);
    };
    It(() => i.date = r.setDate || null);
    const c = () => {
      var f, h;
      return {
        start: r.fromTodayTime ? new Date(Date.now()) : ((f = r.range) == null ? void 0 : f.start) ?? null,
        end: ((h = r.range) == null ? void 0 : h.end) ?? null
      };
    };
    return $e(
      () => r.range,
      () => {
        var f;
        r.isRange && (i.dateObject = c()), r.range || (f = l.value) == null || f.clear();
      }
    ), ze(() => {
      if (r.isRange) {
        i.dateObject = c();
        return;
      }
      r.setDate && (i.date = r.setDate ?? null);
    }), (f, h) => r.isRange ? ($(), ge(JI, {
      key: 0,
      ref_key: "datePickerRangeRef",
      ref: l,
      "start-date": i.dateObject.start,
      "onUpdate:startDate": h[0] || (h[0] = (p) => i.dateObject.start = p),
      "end-date": i.dateObject.end,
      "onUpdate:endDate": h[1] || (h[1] = (p) => i.dateObject.end = p),
      disabled: r.disabled,
      locale: r.locale,
      onClick: h[2] || (h[2] = (p) => a("click")),
      onChange: u
    }, null, 8, ["start-date", "end-date", "disabled", "locale"])) : ($(), ge(P1, {
      key: 1,
      modelValue: i.date,
      "onUpdate:modelValue": h[3] || (h[3] = (p) => i.date = p),
      disabled: r.disabled,
      locale: r.locale,
      "is-small": r.isSmall,
      onClick: h[4] || (h[4] = (p) => a("click")),
      onChange: u
    }, null, 8, ["modelValue", "disabled", "locale", "is-small"]));
  }
});
function QI(e) {
  return R1() ? (V1(e), !0) : !1;
}
function Yh(e) {
  return typeof e == "function" ? e() : L(e);
}
const eE = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const tE = Object.prototype.toString, nE = (e) => tE.call(e) === "[object Object]", rE = () => {
};
function oE(e) {
  var t;
  const r = Yh(e);
  return (t = r == null ? void 0 : r.$el) != null ? t : r;
}
const iE = eE ? window : void 0;
function Pa(...e) {
  let t, r, i, a;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([r, i, a] = e, t = iE) : [t, r, i, a] = e, !t)
    return rE;
  Array.isArray(r) || (r = [r]), Array.isArray(i) || (i = [i]);
  const l = [], u = () => {
    l.forEach((p) => p()), l.length = 0;
  }, c = (p, m, C, g) => (p.addEventListener(m, C, g), () => p.removeEventListener(m, C, g)), f = $e(
    () => [oE(t), Yh(a)],
    ([p, m]) => {
      if (u(), !p)
        return;
      const C = nE(m) ? { ...m } : m;
      l.push(
        ...r.flatMap((g) => i.map((b) => c(p, g, b, C)))
      );
    },
    { immediate: !0, flush: "post" }
  ), h = () => {
    f(), u();
  };
  return QI(h), h;
}
const sE = /* @__PURE__ */ oe({
  __name: "Dialog",
  props: {
    open: { type: Boolean },
    width: {},
    height: {},
    noClose: { type: Boolean }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const r = e, i = ie(null), a = W0(), l = ie(!1), u = T(() => ({
      width: r.width,
      height: r.height
    })), c = t, f = () => {
      var p;
      (p = i.value) == null || p.close(), c("close");
    }, h = () => {
      var p;
      return r.open ? (p = i.value) == null ? void 0 : p.showModal() : f();
    };
    return Pa(i, "mousedown", (p) => {
      !r.noClose && p.target === i.value && f();
    }), Pa(i, "keydown", (p) => {
      (p.key === "Escape" || p.key === "Esc") && r.noClose && p.preventDefault();
    }), ze(() => {
      It(() => {
        r.open !== l.value && (h(), l.value = r.open);
      });
    }), (p, m) => ($(), P("dialog", kr({
      ref_key: "dialog",
      ref: i
    }, L(a), { class: "dialog-yui-kit" }), [
      V("div", {
        class: "dialog-yui-kit__dialog-content",
        style: Pt(u.value)
      }, [
        Be(p.$slots, "default", {}, void 0, !0)
      ], 4)
    ], 16));
  }
}), Bh = /* @__PURE__ */ be(sE, [["__scopeId", "data-v-1e950ad3"]]), aE = { class: "accordion-yui-kit" }, lE = { class: "accordion-yui-kit__summary" }, uE = /* @__PURE__ */ oe({
  __name: "Accordion",
  setup(e) {
    return (t, r) => ($(), P("details", aE, [
      V("summary", lE, [
        Be(t.$slots, "summary", {}, void 0, !0),
        J(Ee, {
          name: L(xe).chevronUp,
          class: "chevron-up",
          "stroke-width": "2"
        }, null, 8, ["name"]),
        J(Ee, {
          name: L(xe).chevronDown,
          class: "chevron-down",
          "stroke-width": "2"
        }, null, 8, ["name"])
      ]),
      Be(t.$slots, "default", {}, void 0, !0)
    ]));
  }
}), Wh = /* @__PURE__ */ be(uE, [["__scopeId", "data-v-9ace546d"]]), cE = { class: "dnd-yui-kit__span" }, dE = ["multiple"], fE = /* @__PURE__ */ oe({
  __name: "DragAndDrop",
  props: {
    singleFileMode: { type: Boolean, default: !1 },
    title: { default: "Кликните или перенесите файлы" }
  },
  emits: ["fileDropped"],
  setup(e, { emit: t }) {
    const r = e, i = t, a = Fe({
      isPressed: !1
    }), l = ie(null), u = (g) => {
      const b = g.target;
      C(b.files);
    }, c = () => {
      l.value && (l.value.value = "");
    }, f = (g) => {
      var M;
      g.preventDefault();
      const b = (M = g.currentTarget) == null ? void 0 : M.children[0];
      b.classList.contains("active") || b.classList.add("active");
    }, h = (g) => {
      g.currentTarget.children[0].classList.remove("active");
    }, p = (g) => {
      var M;
      g.preventDefault(), C(((M = g.dataTransfer) == null ? void 0 : M.files) || null), g.currentTarget.children[0].classList.remove("active");
    }, m = () => {
      a.isPressed = !a.isPressed;
    }, C = (g) => {
      a.isPressed = !1, i("fileDropped", g);
    };
    return ze(() => {
      var g;
      (g = l.value) == null || g.addEventListener("cancel", () => {
        a.isPressed = !1;
      });
    }), (g, b) => ($(), P("div", {
      onDragover: f,
      onDragleave: h,
      onDrop: p,
      class: "dnd-yui-kit"
    }, [
      V("label", {
        for: "docsFileSelected",
        class: le(["dnd-yui-kit__label", { "is-pressed": a.isPressed }]),
        onClick: m
      }, [
        J(Ee, {
          name: L(xe).paperClip,
          "stroke-width": "2"
        }, null, 8, ["name"]),
        V("span", cE, ye(r.title), 1)
      ], 2),
      V("input", {
        id: "docsFileSelected",
        onChange: u,
        onClick: c,
        type: "file",
        style: { display: "none" },
        required: "",
        multiple: !r.singleFileMode,
        ref_key: "fileInputRef",
        ref: l
      }, null, 40, dE)
    ], 32));
  }
}), Fh = /* @__PURE__ */ be(fE, [["__scopeId", "data-v-665b3775"]]), hE = {}, pE = { class: "card-yui-kit" }, vE = {
  key: 0,
  class: "card-yui-kit__left"
};
function gE(e, t) {
  return $(), P("div", pE, [
    e.$slots.left ? ($(), P("div", vE, [
      Be(e.$slots, "left", {}, void 0, !0)
    ])) : ne("", !0),
    Be(e.$slots, "default", {}, void 0, !0)
  ]);
}
const Nh = /* @__PURE__ */ be(hE, [["render", gE], ["__scopeId", "data-v-455a44e2"]]), jh = /* @__PURE__ */ Vv("search", {
  state: () => ({
    _historySearch: localStorage.getItem("historySearch") ? JSON.parse(localStorage.getItem("historySearch")) : []
  }),
  getters: {
    getHistorySearch: (e) => e._historySearch
  },
  actions: {
    addHistorySearch(e) {
      e && (this._historySearch = this._historySearch.filter(
        (t) => t !== e
      ), this._historySearch.unshift(e), this._historySearch.length > 10 && this._historySearch.pop(), localStorage.setItem(
        "historySearch",
        JSON.stringify(this._historySearch)
      ));
    },
    removeHistorySearch(e) {
      this._historySearch = this._historySearch.filter(
        (t) => t !== e
      ), localStorage.setItem(
        "historySearch",
        JSON.stringify(this._historySearch)
      );
    }
  }
}), I1 = (e, t = 33) => e.length > t ? e.slice(0, t - 3) + "..." : e, Uh = (e) => (er("data-v-e887c54e"), e = e(), tr(), e), mE = {
  key: 0,
  class: "search-yui-kit__history history-yui-kit"
}, yE = /* @__PURE__ */ Uh(() => /* @__PURE__ */ V("span", null, " Просмотреть историю запросов ", -1)), _E = ["onClick"], CE = /* @__PURE__ */ Uh(() => /* @__PURE__ */ V("span", { class: "empty-content" }, "По вашему запросу ничего не найдено", -1)), bE = /* @__PURE__ */ oe({
  __name: "History",
  props: {
    defaultValue: {},
    placeholder: {},
    showHistory: { type: Boolean },
    global: { type: Boolean },
    options: {},
    globalResultsFunction: { type: Function },
    isShowResult: { type: Boolean },
    isShowList: { type: Boolean },
    isShowButtonHistory: { type: Boolean },
    searchValue: {},
    width: {},
    height: {},
    modelValue: {}
  },
  emits: ["choosePost"],
  setup(e, { emit: t }) {
    const r = jh(), i = e, a = Fe({
      getHistorySearch: T(() => r.getHistorySearch),
      isShowList: i.isShowList,
      isShowButtonHistory: i.isShowButtonHistory
    }), l = t, u = T(() => ({
      "history-yui-kit__list": !0,
      "history-yui-kit__list--opened": a.isShowList,
      "history-yui-kit__list--scroll": a.getHistorySearch.length >= 5 && a.isShowList
    })), c = () => {
      a.isShowList = !0, a.isShowButtonHistory = !1;
    }, f = (p) => {
      r.removeHistorySearch(p);
    }, h = (p) => {
      l("choosePost", p);
    };
    return (p, m) => {
      var C;
      return i.showHistory ? ($(), P("div", mE, [
        a.isShowButtonHistory ? ($(), ge(yr, {
          key: 0,
          type: L(Wt).outline,
          onClick: c,
          class: le("history-yui-kit__button-text show-result")
        }, {
          default: me(() => [
            yE
          ]),
          _: 1
        }, 8, ["type"])) : ne("", !0),
        (C = a.getHistorySearch) != null && C.length ? ($(), P("ul", {
          key: 1,
          class: le(u.value)
        }, [
          ($(!0), P(Re, null, Ze(a.getHistorySearch, (g) => ($(), P("li", {
            class: "history-yui-kit__item",
            key: g
          }, [
            V("span", {
              onClick: (b) => h(g)
            }, ye(L(I1)(g)), 9, _E),
            J(yr, {
              type: L(Wt).ghost,
              onClick: (b) => f(g)
            }, {
              default: me(() => [
                J(Ee, {
                  name: L(xe).exitSmall,
                  width: 16
                }, null, 8, ["name"])
              ]),
              _: 2
            }, 1032, ["type", "onClick"])
          ]))), 128))
        ], 2)) : a.isShowButtonHistory ? ne("", !0) : ($(), ge(yr, {
          key: 2,
          type: L(Wt).outline,
          class: le("history-yui-kit__button-text")
        }, {
          default: me(() => [
            CE
          ]),
          _: 1
        }, 8, ["type"]))
      ])) : ne("", !0);
    };
  }
}), wE = /* @__PURE__ */ be(bE, [["__scopeId", "data-v-e887c54e"]]), Zh = (e) => (er("data-v-37362fce"), e = e(), tr(), e), kE = { class: "search-yui-kit__history history-yui-kit" }, $E = ["onClick"], ME = { class: "result-yui-kit" }, DE = /* @__PURE__ */ Zh(() => /* @__PURE__ */ V("span", { class: "result-yui-kit blue-yui-kit" }, "/", -1)), SE = { class: "result-yui-kit blue-yui-kit" }, OE = /* @__PURE__ */ Zh(() => /* @__PURE__ */ V("li", { class: "history-yui-kit__item history-yui-kit__item--notfound" }, [
  /* @__PURE__ */ V("p", { class: "history-yui-kit__text" }, "По вашему запросу ничего не найдено")
], -1)), LE = [
  OE
], xE = /* @__PURE__ */ oe({
  __name: "SearchResult",
  props: {
    defaultValue: {},
    placeholder: {},
    showHistory: { type: Boolean },
    global: { type: Boolean },
    options: {},
    globalResultsFunction: { type: Function },
    isShowResult: { type: Boolean },
    isShowList: { type: Boolean },
    isShowButtonHistory: { type: Boolean },
    searchValue: {},
    width: {},
    height: {},
    modelValue: {}
  },
  emits: ["choosePost"],
  setup(e, { emit: t }) {
    const r = e, i = Fe({
      isShowList: r.isShowList,
      globalResultsFunction: T(
        () => typeof r.globalResultsFunction == "function" ? r.globalResultsFunction() : []
      ),
      isShowResult: r.isShowResult,
      searchValue: r.searchValue
    }), a = t, l = T(() => ({
      "history-yui-kit__list": !0,
      "history-yui-kit__list--opened": i.isShowResult,
      "history-yui-kit__list--scroll": i.globalResultsFunction.length >= 5 && i.isShowResult
    })), u = (c) => {
      a("choosePost", c);
    };
    return (c, f) => ($(), P("div", kE, [
      i.globalResultsFunction ? ($(), P("ul", {
        key: 0,
        class: le(l.value)
      }, [
        ($(!0), P(Re, null, Ze(i.globalResultsFunction, (h) => ($(), P("li", {
          class: "history-yui-kit__item",
          key: h.nameArea + h.searchResult
        }, [
          J(Ee, {
            name: L(xe).document
          }, null, 8, ["name"]),
          V("p", {
            class: "history-yui-kit__text",
            onClick: (p) => u(h)
          }, [
            V("span", ME, ye(L(I1)(h.nameArea)), 1),
            DE,
            V("span", SE, ye(L(I1)(h.searchResult)), 1)
          ], 8, $E)
        ]))), 128))
      ], 2)) : ne("", !0),
      i.globalResultsFunction.length ? ne("", !0) : ($(), P("ul", {
        key: 1,
        class: le(l.value)
      }, LE, 2))
    ]));
  }
}), TE = /* @__PURE__ */ be(xE, [["__scopeId", "data-v-37362fce"]]), AE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function PE(e) {
  return AE.test(e);
}
function zh() {
  var e = URL.createObjectURL(new Blob()), t = e.toString();
  return URL.revokeObjectURL(e), t.split(/[:\/]/g).pop().toLowerCase();
}
zh.valid = PE;
const qh = (e = "") => e + zh(), IE = { class: "search-yui-kit__dropdown" }, EE = ["placeholder"], HE = /* @__PURE__ */ oe({
  __name: "Search",
  props: {
    defaultValue: {},
    placeholder: { default: "Поиск" },
    showHistory: { type: Boolean },
    global: { type: Boolean },
    options: {},
    globalResultsFunction: {},
    isShowResult: { type: Boolean },
    isShowList: { type: Boolean },
    isShowButtonHistory: { type: Boolean },
    searchValue: {},
    width: {},
    height: { default: "42px" },
    modelValue: { default: "" }
  },
  emits: ["enter", "input", "update:modelValue"],
  setup(e, { emit: t }) {
    const r = jh(), i = e, a = t, l = Fe({
      isShowList: !1,
      isShowButtonHistory: i.showHistory ?? !1,
      globalResultsFunction: T(() => i.globalResultsFunction),
      isShowResult: !1,
      searchValue: i.modelValue,
      generateUniqueId: qh,
      placeholder: i.placeholder ?? ""
    }), u = {
      position: "relative",
      width: "100%",
      height: i.height
    }, c = (b) => {
      l.searchValue = b, l.isShowList = !1, a("input", b), a("update:modelValue", l.searchValue);
    }, f = T(() => ({
      "search-yui-kit__icon-wrapper": !0
    })), h = () => {
      l.isShowResult = !0;
    }, p = () => {
      l.isShowList = !1, l.isShowResult = !1, l.isShowButtonHistory = !1;
    }, m = () => {
      l.isShowButtonHistory = !0, l.isShowResult = !0, l.isShowButtonHistory || (l.isShowList = !0);
    }, C = () => {
      a("enter", l.searchValue), i.showHistory && r.addHistorySearch(l.searchValue.trim());
    }, g = () => {
      a("input", l.searchValue), a("update:modelValue", l.searchValue);
    };
    return ze(() => {
      i.defaultValue && (l.searchValue = i.defaultValue);
    }), $e(
      () => i.modelValue,
      (b) => {
        l.searchValue = b;
      }
    ), (b, M) => ($(), P("div", {
      class: "search-yui-kit",
      style: u,
      onMousemove: m,
      onMouseleave: p
    }, [
      V("div", {
        class: le(f.value)
      }, [
        V("div", IE, [
          jt(V("input", {
            type: "text",
            class: "search-yui-kit__input",
            "onUpdate:modelValue": M[0] || (M[0] = (A) => l.searchValue = A),
            placeholder: i.placeholder,
            onKeydown: _o(C, ["enter"]),
            onInput: g,
            onFocus: h
          }, null, 40, EE), [
            [ss, l.searchValue]
          ]),
          J(Ee, {
            name: L(xe).searchNormal
          }, null, 8, ["name"])
        ])
      ], 2),
      i.showHistory ? ($(), ge(wE, {
        key: 0,
        "show-history": i.showHistory,
        "is-show-button-history": l.isShowButtonHistory,
        "is-show-list": l.isShowList,
        onChoosePost: c
      }, null, 8, ["show-history", "is-show-button-history", "is-show-list"])) : ne("", !0),
      i.global ? ($(), ge(TE, {
        "is-show-list": l.isShowList,
        "global-results-function": l.globalResultsFunction,
        "is-show-result": l.isShowResult,
        key: l.generateUniqueId(),
        "search-value": l.searchValue
      }, null, 8, ["is-show-list", "global-results-function", "is-show-result", "search-value"])) : ne("", !0)
    ], 32));
  }
}), ds = /* @__PURE__ */ be(HE, [["__scopeId", "data-v-8658c71c"]]);
var Fi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ia = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
Ia.exports;
(function(e, t) {
  (function() {
    var r, i = "4.17.21", a = 200, l = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", u = "Expected a function", c = "Invalid `variable` option passed into `_.template`", f = "__lodash_hash_undefined__", h = 500, p = "__lodash_placeholder__", m = 1, C = 2, g = 4, b = 1, M = 2, A = 1, D = 2, Y = 4, K = 8, H = 16, I = 32, U = 64, E = 128, ee = 256, ue = 512, W = 30, N = "...", G = 800, re = 16, Ce = 1, se = 2, Oe = 3, De = 1 / 0, Ae = 9007199254740991, Se = 17976931348623157e292, X = NaN, _e = 4294967295, de = _e - 1, Qe = _e >>> 1, Ve = [
      ["ary", E],
      ["bind", A],
      ["bindKey", D],
      ["curry", K],
      ["curryRight", H],
      ["flip", ue],
      ["partial", I],
      ["partialRight", U],
      ["rearg", ee]
    ], qe = "[object Arguments]", st = "[object Array]", at = "[object AsyncFunction]", rt = "[object Boolean]", vt = "[object Date]", On = "[object DOMException]", St = "[object Error]", Ct = "[object Function]", Ht = "[object GeneratorFunction]", ft = "[object Map]", dn = "[object Number]", fn = "[object Null]", bt = "[object Object]", Yn = "[object Promise]", or = "[object Proxy]", wt = "[object RegExp]", ht = "[object Set]", Ut = "[object String]", en = "[object Symbol]", Bn = "[object Undefined]", Zt = "[object WeakMap]", Wn = "[object WeakSet]", tn = "[object ArrayBuffer]", nn = "[object DataView]", Xr = "[object Float32Array]", ir = "[object Float64Array]", Kr = "[object Int8Array]", Dr = "[object Int16Array]", Sr = "[object Int32Array]", Jr = "[object Uint8Array]", Or = "[object Uint8ClampedArray]", Lr = "[object Uint16Array]", q = "[object Uint32Array]", k = /\b__p \+= '';/g, Z = /\b(__p \+=) '' \+/g, Q = /(__e\(.*?\)|\b__t\)) \+\n'';/g, we = /&(?:amp|lt|gt|quot|#39);/g, Ke = /[&<>"']/g, kt = RegExp(we.source), Rt = RegExp(Ke.source), xr = /<%-([\s\S]+?)%>/g, Tr = /<%([\s\S]+?)%>/g, Oo = /<%=([\s\S]+?)%>/g, Ot = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, _i = /^\w*$/, Lo = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, sr = /[\\^$.*+?()[\]{}|]/g, Qr = RegExp(sr.source), Ci = /^\s+/, Pp = /\s/, Ip = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Ep = /\{\n\/\* \[wrapped with (.+)\] \*/, Hp = /,? & /, Rp = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Vp = /[()=,{}\[\]\/\s]/, Yp = /\\(\\)?/g, Bp = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, xu = /\w*$/, Wp = /^[-+]0x[0-9a-f]+$/i, Fp = /^0b[01]+$/i, Np = /^\[object .+?Constructor\]$/, jp = /^0o[0-7]+$/i, Up = /^(?:0|[1-9]\d*)$/, Zp = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, vs = /($^)/, zp = /['\n\r\u2028\u2029\\]/g, gs = "\\ud800-\\udfff", qp = "\\u0300-\\u036f", Gp = "\\ufe20-\\ufe2f", Xp = "\\u20d0-\\u20ff", Tu = qp + Gp + Xp, Au = "\\u2700-\\u27bf", Pu = "a-z\\xdf-\\xf6\\xf8-\\xff", Kp = "\\xac\\xb1\\xd7\\xf7", Jp = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Qp = "\\u2000-\\u206f", e5 = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Iu = "A-Z\\xc0-\\xd6\\xd8-\\xde", Eu = "\\ufe0e\\ufe0f", Hu = Kp + Jp + Qp + e5, Za = "['’]", t5 = "[" + gs + "]", Ru = "[" + Hu + "]", ms = "[" + Tu + "]", Vu = "\\d+", n5 = "[" + Au + "]", Yu = "[" + Pu + "]", Bu = "[^" + gs + Hu + Vu + Au + Pu + Iu + "]", za = "\\ud83c[\\udffb-\\udfff]", r5 = "(?:" + ms + "|" + za + ")", Wu = "[^" + gs + "]", qa = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ga = "[\\ud800-\\udbff][\\udc00-\\udfff]", xo = "[" + Iu + "]", Fu = "\\u200d", Nu = "(?:" + Yu + "|" + Bu + ")", o5 = "(?:" + xo + "|" + Bu + ")", ju = "(?:" + Za + "(?:d|ll|m|re|s|t|ve))?", Uu = "(?:" + Za + "(?:D|LL|M|RE|S|T|VE))?", Zu = r5 + "?", zu = "[" + Eu + "]?", i5 = "(?:" + Fu + "(?:" + [Wu, qa, Ga].join("|") + ")" + zu + Zu + ")*", s5 = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", a5 = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", qu = zu + Zu + i5, l5 = "(?:" + [n5, qa, Ga].join("|") + ")" + qu, u5 = "(?:" + [Wu + ms + "?", ms, qa, Ga, t5].join("|") + ")", c5 = RegExp(Za, "g"), d5 = RegExp(ms, "g"), Xa = RegExp(za + "(?=" + za + ")|" + u5 + qu, "g"), f5 = RegExp([
      xo + "?" + Yu + "+" + ju + "(?=" + [Ru, xo, "$"].join("|") + ")",
      o5 + "+" + Uu + "(?=" + [Ru, xo + Nu, "$"].join("|") + ")",
      xo + "?" + Nu + "+" + ju,
      xo + "+" + Uu,
      a5,
      s5,
      Vu,
      l5
    ].join("|"), "g"), h5 = RegExp("[" + Fu + gs + Tu + Eu + "]"), p5 = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, v5 = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], g5 = -1, et = {};
    et[Xr] = et[ir] = et[Kr] = et[Dr] = et[Sr] = et[Jr] = et[Or] = et[Lr] = et[q] = !0, et[qe] = et[st] = et[tn] = et[rt] = et[nn] = et[vt] = et[St] = et[Ct] = et[ft] = et[dn] = et[bt] = et[wt] = et[ht] = et[Ut] = et[Zt] = !1;
    var Je = {};
    Je[qe] = Je[st] = Je[tn] = Je[nn] = Je[rt] = Je[vt] = Je[Xr] = Je[ir] = Je[Kr] = Je[Dr] = Je[Sr] = Je[ft] = Je[dn] = Je[bt] = Je[wt] = Je[ht] = Je[Ut] = Je[en] = Je[Jr] = Je[Or] = Je[Lr] = Je[q] = !0, Je[St] = Je[Ct] = Je[Zt] = !1;
    var m5 = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, y5 = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, _5 = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, C5 = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, b5 = parseFloat, w5 = parseInt, Gu = typeof Fi == "object" && Fi && Fi.Object === Object && Fi, k5 = typeof self == "object" && self && self.Object === Object && self, $t = Gu || k5 || Function("return this")(), Ka = t && !t.nodeType && t, eo = Ka && !0 && e && !e.nodeType && e, Xu = eo && eo.exports === Ka, Ja = Xu && Gu.process, hn = function() {
      try {
        var O = eo && eo.require && eo.require("util").types;
        return O || Ja && Ja.binding && Ja.binding("util");
      } catch {
      }
    }(), Ku = hn && hn.isArrayBuffer, Ju = hn && hn.isDate, Qu = hn && hn.isMap, ec = hn && hn.isRegExp, tc = hn && hn.isSet, nc = hn && hn.isTypedArray;
    function rn(O, B, R) {
      switch (R.length) {
        case 0:
          return O.call(B);
        case 1:
          return O.call(B, R[0]);
        case 2:
          return O.call(B, R[0], R[1]);
        case 3:
          return O.call(B, R[0], R[1], R[2]);
      }
      return O.apply(B, R);
    }
    function $5(O, B, R, ae) {
      for (var ke = -1, We = O == null ? 0 : O.length; ++ke < We; ) {
        var gt = O[ke];
        B(ae, gt, R(gt), O);
      }
      return ae;
    }
    function pn(O, B) {
      for (var R = -1, ae = O == null ? 0 : O.length; ++R < ae && B(O[R], R, O) !== !1; )
        ;
      return O;
    }
    function M5(O, B) {
      for (var R = O == null ? 0 : O.length; R-- && B(O[R], R, O) !== !1; )
        ;
      return O;
    }
    function rc(O, B) {
      for (var R = -1, ae = O == null ? 0 : O.length; ++R < ae; )
        if (!B(O[R], R, O))
          return !1;
      return !0;
    }
    function Ar(O, B) {
      for (var R = -1, ae = O == null ? 0 : O.length, ke = 0, We = []; ++R < ae; ) {
        var gt = O[R];
        B(gt, R, O) && (We[ke++] = gt);
      }
      return We;
    }
    function ys(O, B) {
      var R = O == null ? 0 : O.length;
      return !!R && To(O, B, 0) > -1;
    }
    function Qa(O, B, R) {
      for (var ae = -1, ke = O == null ? 0 : O.length; ++ae < ke; )
        if (R(B, O[ae]))
          return !0;
      return !1;
    }
    function nt(O, B) {
      for (var R = -1, ae = O == null ? 0 : O.length, ke = Array(ae); ++R < ae; )
        ke[R] = B(O[R], R, O);
      return ke;
    }
    function Pr(O, B) {
      for (var R = -1, ae = B.length, ke = O.length; ++R < ae; )
        O[ke + R] = B[R];
      return O;
    }
    function el(O, B, R, ae) {
      var ke = -1, We = O == null ? 0 : O.length;
      for (ae && We && (R = O[++ke]); ++ke < We; )
        R = B(R, O[ke], ke, O);
      return R;
    }
    function D5(O, B, R, ae) {
      var ke = O == null ? 0 : O.length;
      for (ae && ke && (R = O[--ke]); ke--; )
        R = B(R, O[ke], ke, O);
      return R;
    }
    function tl(O, B) {
      for (var R = -1, ae = O == null ? 0 : O.length; ++R < ae; )
        if (B(O[R], R, O))
          return !0;
      return !1;
    }
    var S5 = nl("length");
    function O5(O) {
      return O.split("");
    }
    function L5(O) {
      return O.match(Rp) || [];
    }
    function oc(O, B, R) {
      var ae;
      return R(O, function(ke, We, gt) {
        if (B(ke, We, gt))
          return ae = We, !1;
      }), ae;
    }
    function _s(O, B, R, ae) {
      for (var ke = O.length, We = R + (ae ? 1 : -1); ae ? We-- : ++We < ke; )
        if (B(O[We], We, O))
          return We;
      return -1;
    }
    function To(O, B, R) {
      return B === B ? W5(O, B, R) : _s(O, ic, R);
    }
    function x5(O, B, R, ae) {
      for (var ke = R - 1, We = O.length; ++ke < We; )
        if (ae(O[ke], B))
          return ke;
      return -1;
    }
    function ic(O) {
      return O !== O;
    }
    function sc(O, B) {
      var R = O == null ? 0 : O.length;
      return R ? ol(O, B) / R : X;
    }
    function nl(O) {
      return function(B) {
        return B == null ? r : B[O];
      };
    }
    function rl(O) {
      return function(B) {
        return O == null ? r : O[B];
      };
    }
    function ac(O, B, R, ae, ke) {
      return ke(O, function(We, gt, Ge) {
        R = ae ? (ae = !1, We) : B(R, We, gt, Ge);
      }), R;
    }
    function T5(O, B) {
      var R = O.length;
      for (O.sort(B); R--; )
        O[R] = O[R].value;
      return O;
    }
    function ol(O, B) {
      for (var R, ae = -1, ke = O.length; ++ae < ke; ) {
        var We = B(O[ae]);
        We !== r && (R = R === r ? We : R + We);
      }
      return R;
    }
    function il(O, B) {
      for (var R = -1, ae = Array(O); ++R < O; )
        ae[R] = B(R);
      return ae;
    }
    function A5(O, B) {
      return nt(B, function(R) {
        return [R, O[R]];
      });
    }
    function lc(O) {
      return O && O.slice(0, fc(O) + 1).replace(Ci, "");
    }
    function on(O) {
      return function(B) {
        return O(B);
      };
    }
    function sl(O, B) {
      return nt(B, function(R) {
        return O[R];
      });
    }
    function bi(O, B) {
      return O.has(B);
    }
    function uc(O, B) {
      for (var R = -1, ae = O.length; ++R < ae && To(B, O[R], 0) > -1; )
        ;
      return R;
    }
    function cc(O, B) {
      for (var R = O.length; R-- && To(B, O[R], 0) > -1; )
        ;
      return R;
    }
    function P5(O, B) {
      for (var R = O.length, ae = 0; R--; )
        O[R] === B && ++ae;
      return ae;
    }
    var I5 = rl(m5), E5 = rl(y5);
    function H5(O) {
      return "\\" + C5[O];
    }
    function R5(O, B) {
      return O == null ? r : O[B];
    }
    function Ao(O) {
      return h5.test(O);
    }
    function V5(O) {
      return p5.test(O);
    }
    function Y5(O) {
      for (var B, R = []; !(B = O.next()).done; )
        R.push(B.value);
      return R;
    }
    function al(O) {
      var B = -1, R = Array(O.size);
      return O.forEach(function(ae, ke) {
        R[++B] = [ke, ae];
      }), R;
    }
    function dc(O, B) {
      return function(R) {
        return O(B(R));
      };
    }
    function Ir(O, B) {
      for (var R = -1, ae = O.length, ke = 0, We = []; ++R < ae; ) {
        var gt = O[R];
        (gt === B || gt === p) && (O[R] = p, We[ke++] = R);
      }
      return We;
    }
    function Cs(O) {
      var B = -1, R = Array(O.size);
      return O.forEach(function(ae) {
        R[++B] = ae;
      }), R;
    }
    function B5(O) {
      var B = -1, R = Array(O.size);
      return O.forEach(function(ae) {
        R[++B] = [ae, ae];
      }), R;
    }
    function W5(O, B, R) {
      for (var ae = R - 1, ke = O.length; ++ae < ke; )
        if (O[ae] === B)
          return ae;
      return -1;
    }
    function F5(O, B, R) {
      for (var ae = R + 1; ae--; )
        if (O[ae] === B)
          return ae;
      return ae;
    }
    function Po(O) {
      return Ao(O) ? j5(O) : S5(O);
    }
    function Ln(O) {
      return Ao(O) ? U5(O) : O5(O);
    }
    function fc(O) {
      for (var B = O.length; B-- && Pp.test(O.charAt(B)); )
        ;
      return B;
    }
    var N5 = rl(_5);
    function j5(O) {
      for (var B = Xa.lastIndex = 0; Xa.test(O); )
        ++B;
      return B;
    }
    function U5(O) {
      return O.match(Xa) || [];
    }
    function Z5(O) {
      return O.match(f5) || [];
    }
    var z5 = function O(B) {
      B = B == null ? $t : Io.defaults($t.Object(), B, Io.pick($t, v5));
      var R = B.Array, ae = B.Date, ke = B.Error, We = B.Function, gt = B.Math, Ge = B.Object, ll = B.RegExp, q5 = B.String, vn = B.TypeError, bs = R.prototype, G5 = We.prototype, Eo = Ge.prototype, ws = B["__core-js_shared__"], ks = G5.toString, je = Eo.hasOwnProperty, X5 = 0, hc = function() {
        var n = /[^.]+$/.exec(ws && ws.keys && ws.keys.IE_PROTO || "");
        return n ? "Symbol(src)_1." + n : "";
      }(), $s = Eo.toString, K5 = ks.call(Ge), J5 = $t._, Q5 = ll(
        "^" + ks.call(je).replace(sr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), Ms = Xu ? B.Buffer : r, Er = B.Symbol, Ds = B.Uint8Array, pc = Ms ? Ms.allocUnsafe : r, Ss = dc(Ge.getPrototypeOf, Ge), vc = Ge.create, gc = Eo.propertyIsEnumerable, Os = bs.splice, mc = Er ? Er.isConcatSpreadable : r, wi = Er ? Er.iterator : r, to = Er ? Er.toStringTag : r, Ls = function() {
        try {
          var n = so(Ge, "defineProperty");
          return n({}, "", {}), n;
        } catch {
        }
      }(), e3 = B.clearTimeout !== $t.clearTimeout && B.clearTimeout, t3 = ae && ae.now !== $t.Date.now && ae.now, n3 = B.setTimeout !== $t.setTimeout && B.setTimeout, xs = gt.ceil, Ts = gt.floor, ul = Ge.getOwnPropertySymbols, r3 = Ms ? Ms.isBuffer : r, yc = B.isFinite, o3 = bs.join, i3 = dc(Ge.keys, Ge), mt = gt.max, Lt = gt.min, s3 = ae.now, a3 = B.parseInt, _c = gt.random, l3 = bs.reverse, cl = so(B, "DataView"), ki = so(B, "Map"), dl = so(B, "Promise"), Ho = so(B, "Set"), $i = so(B, "WeakMap"), Mi = so(Ge, "create"), As = $i && new $i(), Ro = {}, u3 = ao(cl), c3 = ao(ki), d3 = ao(dl), f3 = ao(Ho), h3 = ao($i), Ps = Er ? Er.prototype : r, Di = Ps ? Ps.valueOf : r, Cc = Ps ? Ps.toString : r;
      function y(n) {
        if (lt(n) && !Me(n) && !(n instanceof He)) {
          if (n instanceof gn)
            return n;
          if (je.call(n, "__wrapped__"))
            return bd(n);
        }
        return new gn(n);
      }
      var Vo = /* @__PURE__ */ function() {
        function n() {
        }
        return function(o) {
          if (!ot(o))
            return {};
          if (vc)
            return vc(o);
          n.prototype = o;
          var s = new n();
          return n.prototype = r, s;
        };
      }();
      function Is() {
      }
      function gn(n, o) {
        this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!o, this.__index__ = 0, this.__values__ = r;
      }
      y.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: xr,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: Tr,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: Oo,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: y
        }
      }, y.prototype = Is.prototype, y.prototype.constructor = y, gn.prototype = Vo(Is.prototype), gn.prototype.constructor = gn;
      function He(n) {
        this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = _e, this.__views__ = [];
      }
      function p3() {
        var n = new He(this.__wrapped__);
        return n.__actions__ = zt(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = zt(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = zt(this.__views__), n;
      }
      function v3() {
        if (this.__filtered__) {
          var n = new He(this);
          n.__dir__ = -1, n.__filtered__ = !0;
        } else
          n = this.clone(), n.__dir__ *= -1;
        return n;
      }
      function g3() {
        var n = this.__wrapped__.value(), o = this.__dir__, s = Me(n), d = o < 0, v = s ? n.length : 0, _ = O6(0, v, this.__views__), w = _.start, S = _.end, x = S - w, F = d ? S : w - 1, j = this.__iteratees__, z = j.length, te = 0, ce = Lt(x, this.__takeCount__);
        if (!s || !d && v == x && ce == x)
          return jc(n, this.__actions__);
        var pe = [];
        e:
          for (; x-- && te < ce; ) {
            F += o;
            for (var Te = -1, ve = n[F]; ++Te < z; ) {
              var Ie = j[Te], Ye = Ie.iteratee, ln = Ie.type, Bt = Ye(ve);
              if (ln == se)
                ve = Bt;
              else if (!Bt) {
                if (ln == Ce)
                  continue e;
                break e;
              }
            }
            pe[te++] = ve;
          }
        return pe;
      }
      He.prototype = Vo(Is.prototype), He.prototype.constructor = He;
      function no(n) {
        var o = -1, s = n == null ? 0 : n.length;
        for (this.clear(); ++o < s; ) {
          var d = n[o];
          this.set(d[0], d[1]);
        }
      }
      function m3() {
        this.__data__ = Mi ? Mi(null) : {}, this.size = 0;
      }
      function y3(n) {
        var o = this.has(n) && delete this.__data__[n];
        return this.size -= o ? 1 : 0, o;
      }
      function _3(n) {
        var o = this.__data__;
        if (Mi) {
          var s = o[n];
          return s === f ? r : s;
        }
        return je.call(o, n) ? o[n] : r;
      }
      function C3(n) {
        var o = this.__data__;
        return Mi ? o[n] !== r : je.call(o, n);
      }
      function b3(n, o) {
        var s = this.__data__;
        return this.size += this.has(n) ? 0 : 1, s[n] = Mi && o === r ? f : o, this;
      }
      no.prototype.clear = m3, no.prototype.delete = y3, no.prototype.get = _3, no.prototype.has = C3, no.prototype.set = b3;
      function ar(n) {
        var o = -1, s = n == null ? 0 : n.length;
        for (this.clear(); ++o < s; ) {
          var d = n[o];
          this.set(d[0], d[1]);
        }
      }
      function w3() {
        this.__data__ = [], this.size = 0;
      }
      function k3(n) {
        var o = this.__data__, s = Es(o, n);
        if (s < 0)
          return !1;
        var d = o.length - 1;
        return s == d ? o.pop() : Os.call(o, s, 1), --this.size, !0;
      }
      function $3(n) {
        var o = this.__data__, s = Es(o, n);
        return s < 0 ? r : o[s][1];
      }
      function M3(n) {
        return Es(this.__data__, n) > -1;
      }
      function D3(n, o) {
        var s = this.__data__, d = Es(s, n);
        return d < 0 ? (++this.size, s.push([n, o])) : s[d][1] = o, this;
      }
      ar.prototype.clear = w3, ar.prototype.delete = k3, ar.prototype.get = $3, ar.prototype.has = M3, ar.prototype.set = D3;
      function lr(n) {
        var o = -1, s = n == null ? 0 : n.length;
        for (this.clear(); ++o < s; ) {
          var d = n[o];
          this.set(d[0], d[1]);
        }
      }
      function S3() {
        this.size = 0, this.__data__ = {
          hash: new no(),
          map: new (ki || ar)(),
          string: new no()
        };
      }
      function O3(n) {
        var o = zs(this, n).delete(n);
        return this.size -= o ? 1 : 0, o;
      }
      function L3(n) {
        return zs(this, n).get(n);
      }
      function x3(n) {
        return zs(this, n).has(n);
      }
      function T3(n, o) {
        var s = zs(this, n), d = s.size;
        return s.set(n, o), this.size += s.size == d ? 0 : 1, this;
      }
      lr.prototype.clear = S3, lr.prototype.delete = O3, lr.prototype.get = L3, lr.prototype.has = x3, lr.prototype.set = T3;
      function ro(n) {
        var o = -1, s = n == null ? 0 : n.length;
        for (this.__data__ = new lr(); ++o < s; )
          this.add(n[o]);
      }
      function A3(n) {
        return this.__data__.set(n, f), this;
      }
      function P3(n) {
        return this.__data__.has(n);
      }
      ro.prototype.add = ro.prototype.push = A3, ro.prototype.has = P3;
      function xn(n) {
        var o = this.__data__ = new ar(n);
        this.size = o.size;
      }
      function I3() {
        this.__data__ = new ar(), this.size = 0;
      }
      function E3(n) {
        var o = this.__data__, s = o.delete(n);
        return this.size = o.size, s;
      }
      function H3(n) {
        return this.__data__.get(n);
      }
      function R3(n) {
        return this.__data__.has(n);
      }
      function V3(n, o) {
        var s = this.__data__;
        if (s instanceof ar) {
          var d = s.__data__;
          if (!ki || d.length < a - 1)
            return d.push([n, o]), this.size = ++s.size, this;
          s = this.__data__ = new lr(d);
        }
        return s.set(n, o), this.size = s.size, this;
      }
      xn.prototype.clear = I3, xn.prototype.delete = E3, xn.prototype.get = H3, xn.prototype.has = R3, xn.prototype.set = V3;
      function bc(n, o) {
        var s = Me(n), d = !s && lo(n), v = !s && !d && Br(n), _ = !s && !d && !v && Fo(n), w = s || d || v || _, S = w ? il(n.length, q5) : [], x = S.length;
        for (var F in n)
          (o || je.call(n, F)) && !(w && // Safari 9 has enumerable `arguments.length` in strict mode.
          (F == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          v && (F == "offset" || F == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          _ && (F == "buffer" || F == "byteLength" || F == "byteOffset") || // Skip index properties.
          fr(F, x))) && S.push(F);
        return S;
      }
      function wc(n) {
        var o = n.length;
        return o ? n[wl(0, o - 1)] : r;
      }
      function Y3(n, o) {
        return qs(zt(n), oo(o, 0, n.length));
      }
      function B3(n) {
        return qs(zt(n));
      }
      function fl(n, o, s) {
        (s !== r && !Tn(n[o], s) || s === r && !(o in n)) && ur(n, o, s);
      }
      function Si(n, o, s) {
        var d = n[o];
        (!(je.call(n, o) && Tn(d, s)) || s === r && !(o in n)) && ur(n, o, s);
      }
      function Es(n, o) {
        for (var s = n.length; s--; )
          if (Tn(n[s][0], o))
            return s;
        return -1;
      }
      function W3(n, o, s, d) {
        return Hr(n, function(v, _, w) {
          o(d, v, s(v), w);
        }), d;
      }
      function kc(n, o) {
        return n && Nn(o, yt(o), n);
      }
      function F3(n, o) {
        return n && Nn(o, Gt(o), n);
      }
      function ur(n, o, s) {
        o == "__proto__" && Ls ? Ls(n, o, {
          configurable: !0,
          enumerable: !0,
          value: s,
          writable: !0
        }) : n[o] = s;
      }
      function hl(n, o) {
        for (var s = -1, d = o.length, v = R(d), _ = n == null; ++s < d; )
          v[s] = _ ? r : zl(n, o[s]);
        return v;
      }
      function oo(n, o, s) {
        return n === n && (s !== r && (n = n <= s ? n : s), o !== r && (n = n >= o ? n : o)), n;
      }
      function mn(n, o, s, d, v, _) {
        var w, S = o & m, x = o & C, F = o & g;
        if (s && (w = v ? s(n, d, v, _) : s(n)), w !== r)
          return w;
        if (!ot(n))
          return n;
        var j = Me(n);
        if (j) {
          if (w = x6(n), !S)
            return zt(n, w);
        } else {
          var z = xt(n), te = z == Ct || z == Ht;
          if (Br(n))
            return zc(n, S);
          if (z == bt || z == qe || te && !v) {
            if (w = x || te ? {} : fd(n), !S)
              return x ? _6(n, F3(w, n)) : y6(n, kc(w, n));
          } else {
            if (!Je[z])
              return v ? n : {};
            w = T6(n, z, S);
          }
        }
        _ || (_ = new xn());
        var ce = _.get(n);
        if (ce)
          return ce;
        _.set(n, w), Wd(n) ? n.forEach(function(ve) {
          w.add(mn(ve, o, s, ve, n, _));
        }) : Yd(n) && n.forEach(function(ve, Ie) {
          w.set(Ie, mn(ve, o, s, Ie, n, _));
        });
        var pe = F ? x ? Pl : Al : x ? Gt : yt, Te = j ? r : pe(n);
        return pn(Te || n, function(ve, Ie) {
          Te && (Ie = ve, ve = n[Ie]), Si(w, Ie, mn(ve, o, s, Ie, n, _));
        }), w;
      }
      function N3(n) {
        var o = yt(n);
        return function(s) {
          return $c(s, n, o);
        };
      }
      function $c(n, o, s) {
        var d = s.length;
        if (n == null)
          return !d;
        for (n = Ge(n); d--; ) {
          var v = s[d], _ = o[v], w = n[v];
          if (w === r && !(v in n) || !_(w))
            return !1;
        }
        return !0;
      }
      function Mc(n, o, s) {
        if (typeof n != "function")
          throw new vn(u);
        return Ii(function() {
          n.apply(r, s);
        }, o);
      }
      function Oi(n, o, s, d) {
        var v = -1, _ = ys, w = !0, S = n.length, x = [], F = o.length;
        if (!S)
          return x;
        s && (o = nt(o, on(s))), d ? (_ = Qa, w = !1) : o.length >= a && (_ = bi, w = !1, o = new ro(o));
        e:
          for (; ++v < S; ) {
            var j = n[v], z = s == null ? j : s(j);
            if (j = d || j !== 0 ? j : 0, w && z === z) {
              for (var te = F; te--; )
                if (o[te] === z)
                  continue e;
              x.push(j);
            } else _(o, z, d) || x.push(j);
          }
        return x;
      }
      var Hr = Jc(Fn), Dc = Jc(vl, !0);
      function j3(n, o) {
        var s = !0;
        return Hr(n, function(d, v, _) {
          return s = !!o(d, v, _), s;
        }), s;
      }
      function Hs(n, o, s) {
        for (var d = -1, v = n.length; ++d < v; ) {
          var _ = n[d], w = o(_);
          if (w != null && (S === r ? w === w && !an(w) : s(w, S)))
            var S = w, x = _;
        }
        return x;
      }
      function U3(n, o, s, d) {
        var v = n.length;
        for (s = Le(s), s < 0 && (s = -s > v ? 0 : v + s), d = d === r || d > v ? v : Le(d), d < 0 && (d += v), d = s > d ? 0 : Nd(d); s < d; )
          n[s++] = o;
        return n;
      }
      function Sc(n, o) {
        var s = [];
        return Hr(n, function(d, v, _) {
          o(d, v, _) && s.push(d);
        }), s;
      }
      function Mt(n, o, s, d, v) {
        var _ = -1, w = n.length;
        for (s || (s = P6), v || (v = []); ++_ < w; ) {
          var S = n[_];
          o > 0 && s(S) ? o > 1 ? Mt(S, o - 1, s, d, v) : Pr(v, S) : d || (v[v.length] = S);
        }
        return v;
      }
      var pl = Qc(), Oc = Qc(!0);
      function Fn(n, o) {
        return n && pl(n, o, yt);
      }
      function vl(n, o) {
        return n && Oc(n, o, yt);
      }
      function Rs(n, o) {
        return Ar(o, function(s) {
          return hr(n[s]);
        });
      }
      function io(n, o) {
        o = Vr(o, n);
        for (var s = 0, d = o.length; n != null && s < d; )
          n = n[jn(o[s++])];
        return s && s == d ? n : r;
      }
      function Lc(n, o, s) {
        var d = o(n);
        return Me(n) ? d : Pr(d, s(n));
      }
      function Vt(n) {
        return n == null ? n === r ? Bn : fn : to && to in Ge(n) ? S6(n) : B6(n);
      }
      function gl(n, o) {
        return n > o;
      }
      function Z3(n, o) {
        return n != null && je.call(n, o);
      }
      function z3(n, o) {
        return n != null && o in Ge(n);
      }
      function q3(n, o, s) {
        return n >= Lt(o, s) && n < mt(o, s);
      }
      function ml(n, o, s) {
        for (var d = s ? Qa : ys, v = n[0].length, _ = n.length, w = _, S = R(_), x = 1 / 0, F = []; w--; ) {
          var j = n[w];
          w && o && (j = nt(j, on(o))), x = Lt(j.length, x), S[w] = !s && (o || v >= 120 && j.length >= 120) ? new ro(w && j) : r;
        }
        j = n[0];
        var z = -1, te = S[0];
        e:
          for (; ++z < v && F.length < x; ) {
            var ce = j[z], pe = o ? o(ce) : ce;
            if (ce = s || ce !== 0 ? ce : 0, !(te ? bi(te, pe) : d(F, pe, s))) {
              for (w = _; --w; ) {
                var Te = S[w];
                if (!(Te ? bi(Te, pe) : d(n[w], pe, s)))
                  continue e;
              }
              te && te.push(pe), F.push(ce);
            }
          }
        return F;
      }
      function G3(n, o, s, d) {
        return Fn(n, function(v, _, w) {
          o(d, s(v), _, w);
        }), d;
      }
      function Li(n, o, s) {
        o = Vr(o, n), n = gd(n, o);
        var d = n == null ? n : n[jn(_n(o))];
        return d == null ? r : rn(d, n, s);
      }
      function xc(n) {
        return lt(n) && Vt(n) == qe;
      }
      function X3(n) {
        return lt(n) && Vt(n) == tn;
      }
      function K3(n) {
        return lt(n) && Vt(n) == vt;
      }
      function xi(n, o, s, d, v) {
        return n === o ? !0 : n == null || o == null || !lt(n) && !lt(o) ? n !== n && o !== o : J3(n, o, s, d, xi, v);
      }
      function J3(n, o, s, d, v, _) {
        var w = Me(n), S = Me(o), x = w ? st : xt(n), F = S ? st : xt(o);
        x = x == qe ? bt : x, F = F == qe ? bt : F;
        var j = x == bt, z = F == bt, te = x == F;
        if (te && Br(n)) {
          if (!Br(o))
            return !1;
          w = !0, j = !1;
        }
        if (te && !j)
          return _ || (_ = new xn()), w || Fo(n) ? ud(n, o, s, d, v, _) : M6(n, o, x, s, d, v, _);
        if (!(s & b)) {
          var ce = j && je.call(n, "__wrapped__"), pe = z && je.call(o, "__wrapped__");
          if (ce || pe) {
            var Te = ce ? n.value() : n, ve = pe ? o.value() : o;
            return _ || (_ = new xn()), v(Te, ve, s, d, _);
          }
        }
        return te ? (_ || (_ = new xn()), D6(n, o, s, d, v, _)) : !1;
      }
      function Q3(n) {
        return lt(n) && xt(n) == ft;
      }
      function yl(n, o, s, d) {
        var v = s.length, _ = v, w = !d;
        if (n == null)
          return !_;
        for (n = Ge(n); v--; ) {
          var S = s[v];
          if (w && S[2] ? S[1] !== n[S[0]] : !(S[0] in n))
            return !1;
        }
        for (; ++v < _; ) {
          S = s[v];
          var x = S[0], F = n[x], j = S[1];
          if (w && S[2]) {
            if (F === r && !(x in n))
              return !1;
          } else {
            var z = new xn();
            if (d)
              var te = d(F, j, x, n, o, z);
            if (!(te === r ? xi(j, F, b | M, d, z) : te))
              return !1;
          }
        }
        return !0;
      }
      function Tc(n) {
        if (!ot(n) || E6(n))
          return !1;
        var o = hr(n) ? Q5 : Np;
        return o.test(ao(n));
      }
      function e6(n) {
        return lt(n) && Vt(n) == wt;
      }
      function t6(n) {
        return lt(n) && xt(n) == ht;
      }
      function n6(n) {
        return lt(n) && ea(n.length) && !!et[Vt(n)];
      }
      function Ac(n) {
        return typeof n == "function" ? n : n == null ? Xt : typeof n == "object" ? Me(n) ? Ec(n[0], n[1]) : Ic(n) : ef(n);
      }
      function _l(n) {
        if (!Pi(n))
          return i3(n);
        var o = [];
        for (var s in Ge(n))
          je.call(n, s) && s != "constructor" && o.push(s);
        return o;
      }
      function r6(n) {
        if (!ot(n))
          return Y6(n);
        var o = Pi(n), s = [];
        for (var d in n)
          d == "constructor" && (o || !je.call(n, d)) || s.push(d);
        return s;
      }
      function Cl(n, o) {
        return n < o;
      }
      function Pc(n, o) {
        var s = -1, d = qt(n) ? R(n.length) : [];
        return Hr(n, function(v, _, w) {
          d[++s] = o(v, _, w);
        }), d;
      }
      function Ic(n) {
        var o = El(n);
        return o.length == 1 && o[0][2] ? pd(o[0][0], o[0][1]) : function(s) {
          return s === n || yl(s, n, o);
        };
      }
      function Ec(n, o) {
        return Rl(n) && hd(o) ? pd(jn(n), o) : function(s) {
          var d = zl(s, n);
          return d === r && d === o ? ql(s, n) : xi(o, d, b | M);
        };
      }
      function Vs(n, o, s, d, v) {
        n !== o && pl(o, function(_, w) {
          if (v || (v = new xn()), ot(_))
            o6(n, o, w, s, Vs, d, v);
          else {
            var S = d ? d(Yl(n, w), _, w + "", n, o, v) : r;
            S === r && (S = _), fl(n, w, S);
          }
        }, Gt);
      }
      function o6(n, o, s, d, v, _, w) {
        var S = Yl(n, s), x = Yl(o, s), F = w.get(x);
        if (F) {
          fl(n, s, F);
          return;
        }
        var j = _ ? _(S, x, s + "", n, o, w) : r, z = j === r;
        if (z) {
          var te = Me(x), ce = !te && Br(x), pe = !te && !ce && Fo(x);
          j = x, te || ce || pe ? Me(S) ? j = S : ct(S) ? j = zt(S) : ce ? (z = !1, j = zc(x, !0)) : pe ? (z = !1, j = qc(x, !0)) : j = [] : Ei(x) || lo(x) ? (j = S, lo(S) ? j = jd(S) : (!ot(S) || hr(S)) && (j = fd(x))) : z = !1;
        }
        z && (w.set(x, j), v(j, x, d, _, w), w.delete(x)), fl(n, s, j);
      }
      function Hc(n, o) {
        var s = n.length;
        if (s)
          return o += o < 0 ? s : 0, fr(o, s) ? n[o] : r;
      }
      function Rc(n, o, s) {
        o.length ? o = nt(o, function(_) {
          return Me(_) ? function(w) {
            return io(w, _.length === 1 ? _[0] : _);
          } : _;
        }) : o = [Xt];
        var d = -1;
        o = nt(o, on(he()));
        var v = Pc(n, function(_, w, S) {
          var x = nt(o, function(F) {
            return F(_);
          });
          return { criteria: x, index: ++d, value: _ };
        });
        return T5(v, function(_, w) {
          return m6(_, w, s);
        });
      }
      function i6(n, o) {
        return Vc(n, o, function(s, d) {
          return ql(n, d);
        });
      }
      function Vc(n, o, s) {
        for (var d = -1, v = o.length, _ = {}; ++d < v; ) {
          var w = o[d], S = io(n, w);
          s(S, w) && Ti(_, Vr(w, n), S);
        }
        return _;
      }
      function s6(n) {
        return function(o) {
          return io(o, n);
        };
      }
      function bl(n, o, s, d) {
        var v = d ? x5 : To, _ = -1, w = o.length, S = n;
        for (n === o && (o = zt(o)), s && (S = nt(n, on(s))); ++_ < w; )
          for (var x = 0, F = o[_], j = s ? s(F) : F; (x = v(S, j, x, d)) > -1; )
            S !== n && Os.call(S, x, 1), Os.call(n, x, 1);
        return n;
      }
      function Yc(n, o) {
        for (var s = n ? o.length : 0, d = s - 1; s--; ) {
          var v = o[s];
          if (s == d || v !== _) {
            var _ = v;
            fr(v) ? Os.call(n, v, 1) : Ml(n, v);
          }
        }
        return n;
      }
      function wl(n, o) {
        return n + Ts(_c() * (o - n + 1));
      }
      function a6(n, o, s, d) {
        for (var v = -1, _ = mt(xs((o - n) / (s || 1)), 0), w = R(_); _--; )
          w[d ? _ : ++v] = n, n += s;
        return w;
      }
      function kl(n, o) {
        var s = "";
        if (!n || o < 1 || o > Ae)
          return s;
        do
          o % 2 && (s += n), o = Ts(o / 2), o && (n += n);
        while (o);
        return s;
      }
      function Pe(n, o) {
        return Bl(vd(n, o, Xt), n + "");
      }
      function l6(n) {
        return wc(No(n));
      }
      function u6(n, o) {
        var s = No(n);
        return qs(s, oo(o, 0, s.length));
      }
      function Ti(n, o, s, d) {
        if (!ot(n))
          return n;
        o = Vr(o, n);
        for (var v = -1, _ = o.length, w = _ - 1, S = n; S != null && ++v < _; ) {
          var x = jn(o[v]), F = s;
          if (x === "__proto__" || x === "constructor" || x === "prototype")
            return n;
          if (v != w) {
            var j = S[x];
            F = d ? d(j, x, S) : r, F === r && (F = ot(j) ? j : fr(o[v + 1]) ? [] : {});
          }
          Si(S, x, F), S = S[x];
        }
        return n;
      }
      var Bc = As ? function(n, o) {
        return As.set(n, o), n;
      } : Xt, c6 = Ls ? function(n, o) {
        return Ls(n, "toString", {
          configurable: !0,
          enumerable: !1,
          value: Xl(o),
          writable: !0
        });
      } : Xt;
      function d6(n) {
        return qs(No(n));
      }
      function yn(n, o, s) {
        var d = -1, v = n.length;
        o < 0 && (o = -o > v ? 0 : v + o), s = s > v ? v : s, s < 0 && (s += v), v = o > s ? 0 : s - o >>> 0, o >>>= 0;
        for (var _ = R(v); ++d < v; )
          _[d] = n[d + o];
        return _;
      }
      function f6(n, o) {
        var s;
        return Hr(n, function(d, v, _) {
          return s = o(d, v, _), !s;
        }), !!s;
      }
      function Ys(n, o, s) {
        var d = 0, v = n == null ? d : n.length;
        if (typeof o == "number" && o === o && v <= Qe) {
          for (; d < v; ) {
            var _ = d + v >>> 1, w = n[_];
            w !== null && !an(w) && (s ? w <= o : w < o) ? d = _ + 1 : v = _;
          }
          return v;
        }
        return $l(n, o, Xt, s);
      }
      function $l(n, o, s, d) {
        var v = 0, _ = n == null ? 0 : n.length;
        if (_ === 0)
          return 0;
        o = s(o);
        for (var w = o !== o, S = o === null, x = an(o), F = o === r; v < _; ) {
          var j = Ts((v + _) / 2), z = s(n[j]), te = z !== r, ce = z === null, pe = z === z, Te = an(z);
          if (w)
            var ve = d || pe;
          else F ? ve = pe && (d || te) : S ? ve = pe && te && (d || !ce) : x ? ve = pe && te && !ce && (d || !Te) : ce || Te ? ve = !1 : ve = d ? z <= o : z < o;
          ve ? v = j + 1 : _ = j;
        }
        return Lt(_, de);
      }
      function Wc(n, o) {
        for (var s = -1, d = n.length, v = 0, _ = []; ++s < d; ) {
          var w = n[s], S = o ? o(w) : w;
          if (!s || !Tn(S, x)) {
            var x = S;
            _[v++] = w === 0 ? 0 : w;
          }
        }
        return _;
      }
      function Fc(n) {
        return typeof n == "number" ? n : an(n) ? X : +n;
      }
      function sn(n) {
        if (typeof n == "string")
          return n;
        if (Me(n))
          return nt(n, sn) + "";
        if (an(n))
          return Cc ? Cc.call(n) : "";
        var o = n + "";
        return o == "0" && 1 / n == -De ? "-0" : o;
      }
      function Rr(n, o, s) {
        var d = -1, v = ys, _ = n.length, w = !0, S = [], x = S;
        if (s)
          w = !1, v = Qa;
        else if (_ >= a) {
          var F = o ? null : k6(n);
          if (F)
            return Cs(F);
          w = !1, v = bi, x = new ro();
        } else
          x = o ? [] : S;
        e:
          for (; ++d < _; ) {
            var j = n[d], z = o ? o(j) : j;
            if (j = s || j !== 0 ? j : 0, w && z === z) {
              for (var te = x.length; te--; )
                if (x[te] === z)
                  continue e;
              o && x.push(z), S.push(j);
            } else v(x, z, s) || (x !== S && x.push(z), S.push(j));
          }
        return S;
      }
      function Ml(n, o) {
        return o = Vr(o, n), n = gd(n, o), n == null || delete n[jn(_n(o))];
      }
      function Nc(n, o, s, d) {
        return Ti(n, o, s(io(n, o)), d);
      }
      function Bs(n, o, s, d) {
        for (var v = n.length, _ = d ? v : -1; (d ? _-- : ++_ < v) && o(n[_], _, n); )
          ;
        return s ? yn(n, d ? 0 : _, d ? _ + 1 : v) : yn(n, d ? _ + 1 : 0, d ? v : _);
      }
      function jc(n, o) {
        var s = n;
        return s instanceof He && (s = s.value()), el(o, function(d, v) {
          return v.func.apply(v.thisArg, Pr([d], v.args));
        }, s);
      }
      function Dl(n, o, s) {
        var d = n.length;
        if (d < 2)
          return d ? Rr(n[0]) : [];
        for (var v = -1, _ = R(d); ++v < d; )
          for (var w = n[v], S = -1; ++S < d; )
            S != v && (_[v] = Oi(_[v] || w, n[S], o, s));
        return Rr(Mt(_, 1), o, s);
      }
      function Uc(n, o, s) {
        for (var d = -1, v = n.length, _ = o.length, w = {}; ++d < v; ) {
          var S = d < _ ? o[d] : r;
          s(w, n[d], S);
        }
        return w;
      }
      function Sl(n) {
        return ct(n) ? n : [];
      }
      function Ol(n) {
        return typeof n == "function" ? n : Xt;
      }
      function Vr(n, o) {
        return Me(n) ? n : Rl(n, o) ? [n] : Cd(Ne(n));
      }
      var h6 = Pe;
      function Yr(n, o, s) {
        var d = n.length;
        return s = s === r ? d : s, !o && s >= d ? n : yn(n, o, s);
      }
      var Zc = e3 || function(n) {
        return $t.clearTimeout(n);
      };
      function zc(n, o) {
        if (o)
          return n.slice();
        var s = n.length, d = pc ? pc(s) : new n.constructor(s);
        return n.copy(d), d;
      }
      function Ll(n) {
        var o = new n.constructor(n.byteLength);
        return new Ds(o).set(new Ds(n)), o;
      }
      function p6(n, o) {
        var s = o ? Ll(n.buffer) : n.buffer;
        return new n.constructor(s, n.byteOffset, n.byteLength);
      }
      function v6(n) {
        var o = new n.constructor(n.source, xu.exec(n));
        return o.lastIndex = n.lastIndex, o;
      }
      function g6(n) {
        return Di ? Ge(Di.call(n)) : {};
      }
      function qc(n, o) {
        var s = o ? Ll(n.buffer) : n.buffer;
        return new n.constructor(s, n.byteOffset, n.length);
      }
      function Gc(n, o) {
        if (n !== o) {
          var s = n !== r, d = n === null, v = n === n, _ = an(n), w = o !== r, S = o === null, x = o === o, F = an(o);
          if (!S && !F && !_ && n > o || _ && w && x && !S && !F || d && w && x || !s && x || !v)
            return 1;
          if (!d && !_ && !F && n < o || F && s && v && !d && !_ || S && s && v || !w && v || !x)
            return -1;
        }
        return 0;
      }
      function m6(n, o, s) {
        for (var d = -1, v = n.criteria, _ = o.criteria, w = v.length, S = s.length; ++d < w; ) {
          var x = Gc(v[d], _[d]);
          if (x) {
            if (d >= S)
              return x;
            var F = s[d];
            return x * (F == "desc" ? -1 : 1);
          }
        }
        return n.index - o.index;
      }
      function Xc(n, o, s, d) {
        for (var v = -1, _ = n.length, w = s.length, S = -1, x = o.length, F = mt(_ - w, 0), j = R(x + F), z = !d; ++S < x; )
          j[S] = o[S];
        for (; ++v < w; )
          (z || v < _) && (j[s[v]] = n[v]);
        for (; F--; )
          j[S++] = n[v++];
        return j;
      }
      function Kc(n, o, s, d) {
        for (var v = -1, _ = n.length, w = -1, S = s.length, x = -1, F = o.length, j = mt(_ - S, 0), z = R(j + F), te = !d; ++v < j; )
          z[v] = n[v];
        for (var ce = v; ++x < F; )
          z[ce + x] = o[x];
        for (; ++w < S; )
          (te || v < _) && (z[ce + s[w]] = n[v++]);
        return z;
      }
      function zt(n, o) {
        var s = -1, d = n.length;
        for (o || (o = R(d)); ++s < d; )
          o[s] = n[s];
        return o;
      }
      function Nn(n, o, s, d) {
        var v = !s;
        s || (s = {});
        for (var _ = -1, w = o.length; ++_ < w; ) {
          var S = o[_], x = d ? d(s[S], n[S], S, s, n) : r;
          x === r && (x = n[S]), v ? ur(s, S, x) : Si(s, S, x);
        }
        return s;
      }
      function y6(n, o) {
        return Nn(n, Hl(n), o);
      }
      function _6(n, o) {
        return Nn(n, cd(n), o);
      }
      function Ws(n, o) {
        return function(s, d) {
          var v = Me(s) ? $5 : W3, _ = o ? o() : {};
          return v(s, n, he(d, 2), _);
        };
      }
      function Yo(n) {
        return Pe(function(o, s) {
          var d = -1, v = s.length, _ = v > 1 ? s[v - 1] : r, w = v > 2 ? s[2] : r;
          for (_ = n.length > 3 && typeof _ == "function" ? (v--, _) : r, w && Yt(s[0], s[1], w) && (_ = v < 3 ? r : _, v = 1), o = Ge(o); ++d < v; ) {
            var S = s[d];
            S && n(o, S, d, _);
          }
          return o;
        });
      }
      function Jc(n, o) {
        return function(s, d) {
          if (s == null)
            return s;
          if (!qt(s))
            return n(s, d);
          for (var v = s.length, _ = o ? v : -1, w = Ge(s); (o ? _-- : ++_ < v) && d(w[_], _, w) !== !1; )
            ;
          return s;
        };
      }
      function Qc(n) {
        return function(o, s, d) {
          for (var v = -1, _ = Ge(o), w = d(o), S = w.length; S--; ) {
            var x = w[n ? S : ++v];
            if (s(_[x], x, _) === !1)
              break;
          }
          return o;
        };
      }
      function C6(n, o, s) {
        var d = o & A, v = Ai(n);
        function _() {
          var w = this && this !== $t && this instanceof _ ? v : n;
          return w.apply(d ? s : this, arguments);
        }
        return _;
      }
      function ed(n) {
        return function(o) {
          o = Ne(o);
          var s = Ao(o) ? Ln(o) : r, d = s ? s[0] : o.charAt(0), v = s ? Yr(s, 1).join("") : o.slice(1);
          return d[n]() + v;
        };
      }
      function Bo(n) {
        return function(o) {
          return el(Jd(Kd(o).replace(c5, "")), n, "");
        };
      }
      function Ai(n) {
        return function() {
          var o = arguments;
          switch (o.length) {
            case 0:
              return new n();
            case 1:
              return new n(o[0]);
            case 2:
              return new n(o[0], o[1]);
            case 3:
              return new n(o[0], o[1], o[2]);
            case 4:
              return new n(o[0], o[1], o[2], o[3]);
            case 5:
              return new n(o[0], o[1], o[2], o[3], o[4]);
            case 6:
              return new n(o[0], o[1], o[2], o[3], o[4], o[5]);
            case 7:
              return new n(o[0], o[1], o[2], o[3], o[4], o[5], o[6]);
          }
          var s = Vo(n.prototype), d = n.apply(s, o);
          return ot(d) ? d : s;
        };
      }
      function b6(n, o, s) {
        var d = Ai(n);
        function v() {
          for (var _ = arguments.length, w = R(_), S = _, x = Wo(v); S--; )
            w[S] = arguments[S];
          var F = _ < 3 && w[0] !== x && w[_ - 1] !== x ? [] : Ir(w, x);
          if (_ -= F.length, _ < s)
            return id(
              n,
              o,
              Fs,
              v.placeholder,
              r,
              w,
              F,
              r,
              r,
              s - _
            );
          var j = this && this !== $t && this instanceof v ? d : n;
          return rn(j, this, w);
        }
        return v;
      }
      function td(n) {
        return function(o, s, d) {
          var v = Ge(o);
          if (!qt(o)) {
            var _ = he(s, 3);
            o = yt(o), s = function(S) {
              return _(v[S], S, v);
            };
          }
          var w = n(o, s, d);
          return w > -1 ? v[_ ? o[w] : w] : r;
        };
      }
      function nd(n) {
        return dr(function(o) {
          var s = o.length, d = s, v = gn.prototype.thru;
          for (n && o.reverse(); d--; ) {
            var _ = o[d];
            if (typeof _ != "function")
              throw new vn(u);
            if (v && !w && Zs(_) == "wrapper")
              var w = new gn([], !0);
          }
          for (d = w ? d : s; ++d < s; ) {
            _ = o[d];
            var S = Zs(_), x = S == "wrapper" ? Il(_) : r;
            x && Vl(x[0]) && x[1] == (E | K | I | ee) && !x[4].length && x[9] == 1 ? w = w[Zs(x[0])].apply(w, x[3]) : w = _.length == 1 && Vl(_) ? w[S]() : w.thru(_);
          }
          return function() {
            var F = arguments, j = F[0];
            if (w && F.length == 1 && Me(j))
              return w.plant(j).value();
            for (var z = 0, te = s ? o[z].apply(this, F) : j; ++z < s; )
              te = o[z].call(this, te);
            return te;
          };
        });
      }
      function Fs(n, o, s, d, v, _, w, S, x, F) {
        var j = o & E, z = o & A, te = o & D, ce = o & (K | H), pe = o & ue, Te = te ? r : Ai(n);
        function ve() {
          for (var Ie = arguments.length, Ye = R(Ie), ln = Ie; ln--; )
            Ye[ln] = arguments[ln];
          if (ce)
            var Bt = Wo(ve), un = P5(Ye, Bt);
          if (d && (Ye = Xc(Ye, d, v, ce)), _ && (Ye = Kc(Ye, _, w, ce)), Ie -= un, ce && Ie < F) {
            var dt = Ir(Ye, Bt);
            return id(
              n,
              o,
              Fs,
              ve.placeholder,
              s,
              Ye,
              dt,
              S,
              x,
              F - Ie
            );
          }
          var An = z ? s : this, vr = te ? An[n] : n;
          return Ie = Ye.length, S ? Ye = W6(Ye, S) : pe && Ie > 1 && Ye.reverse(), j && x < Ie && (Ye.length = x), this && this !== $t && this instanceof ve && (vr = Te || Ai(vr)), vr.apply(An, Ye);
        }
        return ve;
      }
      function rd(n, o) {
        return function(s, d) {
          return G3(s, n, o(d), {});
        };
      }
      function Ns(n, o) {
        return function(s, d) {
          var v;
          if (s === r && d === r)
            return o;
          if (s !== r && (v = s), d !== r) {
            if (v === r)
              return d;
            typeof s == "string" || typeof d == "string" ? (s = sn(s), d = sn(d)) : (s = Fc(s), d = Fc(d)), v = n(s, d);
          }
          return v;
        };
      }
      function xl(n) {
        return dr(function(o) {
          return o = nt(o, on(he())), Pe(function(s) {
            var d = this;
            return n(o, function(v) {
              return rn(v, d, s);
            });
          });
        });
      }
      function js(n, o) {
        o = o === r ? " " : sn(o);
        var s = o.length;
        if (s < 2)
          return s ? kl(o, n) : o;
        var d = kl(o, xs(n / Po(o)));
        return Ao(o) ? Yr(Ln(d), 0, n).join("") : d.slice(0, n);
      }
      function w6(n, o, s, d) {
        var v = o & A, _ = Ai(n);
        function w() {
          for (var S = -1, x = arguments.length, F = -1, j = d.length, z = R(j + x), te = this && this !== $t && this instanceof w ? _ : n; ++F < j; )
            z[F] = d[F];
          for (; x--; )
            z[F++] = arguments[++S];
          return rn(te, v ? s : this, z);
        }
        return w;
      }
      function od(n) {
        return function(o, s, d) {
          return d && typeof d != "number" && Yt(o, s, d) && (s = d = r), o = pr(o), s === r ? (s = o, o = 0) : s = pr(s), d = d === r ? o < s ? 1 : -1 : pr(d), a6(o, s, d, n);
        };
      }
      function Us(n) {
        return function(o, s) {
          return typeof o == "string" && typeof s == "string" || (o = Cn(o), s = Cn(s)), n(o, s);
        };
      }
      function id(n, o, s, d, v, _, w, S, x, F) {
        var j = o & K, z = j ? w : r, te = j ? r : w, ce = j ? _ : r, pe = j ? r : _;
        o |= j ? I : U, o &= ~(j ? U : I), o & Y || (o &= ~(A | D));
        var Te = [
          n,
          o,
          v,
          ce,
          z,
          pe,
          te,
          S,
          x,
          F
        ], ve = s.apply(r, Te);
        return Vl(n) && md(ve, Te), ve.placeholder = d, yd(ve, n, o);
      }
      function Tl(n) {
        var o = gt[n];
        return function(s, d) {
          if (s = Cn(s), d = d == null ? 0 : Lt(Le(d), 292), d && yc(s)) {
            var v = (Ne(s) + "e").split("e"), _ = o(v[0] + "e" + (+v[1] + d));
            return v = (Ne(_) + "e").split("e"), +(v[0] + "e" + (+v[1] - d));
          }
          return o(s);
        };
      }
      var k6 = Ho && 1 / Cs(new Ho([, -0]))[1] == De ? function(n) {
        return new Ho(n);
      } : Ql;
      function sd(n) {
        return function(o) {
          var s = xt(o);
          return s == ft ? al(o) : s == ht ? B5(o) : A5(o, n(o));
        };
      }
      function cr(n, o, s, d, v, _, w, S) {
        var x = o & D;
        if (!x && typeof n != "function")
          throw new vn(u);
        var F = d ? d.length : 0;
        if (F || (o &= ~(I | U), d = v = r), w = w === r ? w : mt(Le(w), 0), S = S === r ? S : Le(S), F -= v ? v.length : 0, o & U) {
          var j = d, z = v;
          d = v = r;
        }
        var te = x ? r : Il(n), ce = [
          n,
          o,
          s,
          d,
          v,
          j,
          z,
          _,
          w,
          S
        ];
        if (te && V6(ce, te), n = ce[0], o = ce[1], s = ce[2], d = ce[3], v = ce[4], S = ce[9] = ce[9] === r ? x ? 0 : n.length : mt(ce[9] - F, 0), !S && o & (K | H) && (o &= ~(K | H)), !o || o == A)
          var pe = C6(n, o, s);
        else o == K || o == H ? pe = b6(n, o, S) : (o == I || o == (A | I)) && !v.length ? pe = w6(n, o, s, d) : pe = Fs.apply(r, ce);
        var Te = te ? Bc : md;
        return yd(Te(pe, ce), n, o);
      }
      function ad(n, o, s, d) {
        return n === r || Tn(n, Eo[s]) && !je.call(d, s) ? o : n;
      }
      function ld(n, o, s, d, v, _) {
        return ot(n) && ot(o) && (_.set(o, n), Vs(n, o, r, ld, _), _.delete(o)), n;
      }
      function $6(n) {
        return Ei(n) ? r : n;
      }
      function ud(n, o, s, d, v, _) {
        var w = s & b, S = n.length, x = o.length;
        if (S != x && !(w && x > S))
          return !1;
        var F = _.get(n), j = _.get(o);
        if (F && j)
          return F == o && j == n;
        var z = -1, te = !0, ce = s & M ? new ro() : r;
        for (_.set(n, o), _.set(o, n); ++z < S; ) {
          var pe = n[z], Te = o[z];
          if (d)
            var ve = w ? d(Te, pe, z, o, n, _) : d(pe, Te, z, n, o, _);
          if (ve !== r) {
            if (ve)
              continue;
            te = !1;
            break;
          }
          if (ce) {
            if (!tl(o, function(Ie, Ye) {
              if (!bi(ce, Ye) && (pe === Ie || v(pe, Ie, s, d, _)))
                return ce.push(Ye);
            })) {
              te = !1;
              break;
            }
          } else if (!(pe === Te || v(pe, Te, s, d, _))) {
            te = !1;
            break;
          }
        }
        return _.delete(n), _.delete(o), te;
      }
      function M6(n, o, s, d, v, _, w) {
        switch (s) {
          case nn:
            if (n.byteLength != o.byteLength || n.byteOffset != o.byteOffset)
              return !1;
            n = n.buffer, o = o.buffer;
          case tn:
            return !(n.byteLength != o.byteLength || !_(new Ds(n), new Ds(o)));
          case rt:
          case vt:
          case dn:
            return Tn(+n, +o);
          case St:
            return n.name == o.name && n.message == o.message;
          case wt:
          case Ut:
            return n == o + "";
          case ft:
            var S = al;
          case ht:
            var x = d & b;
            if (S || (S = Cs), n.size != o.size && !x)
              return !1;
            var F = w.get(n);
            if (F)
              return F == o;
            d |= M, w.set(n, o);
            var j = ud(S(n), S(o), d, v, _, w);
            return w.delete(n), j;
          case en:
            if (Di)
              return Di.call(n) == Di.call(o);
        }
        return !1;
      }
      function D6(n, o, s, d, v, _) {
        var w = s & b, S = Al(n), x = S.length, F = Al(o), j = F.length;
        if (x != j && !w)
          return !1;
        for (var z = x; z--; ) {
          var te = S[z];
          if (!(w ? te in o : je.call(o, te)))
            return !1;
        }
        var ce = _.get(n), pe = _.get(o);
        if (ce && pe)
          return ce == o && pe == n;
        var Te = !0;
        _.set(n, o), _.set(o, n);
        for (var ve = w; ++z < x; ) {
          te = S[z];
          var Ie = n[te], Ye = o[te];
          if (d)
            var ln = w ? d(Ye, Ie, te, o, n, _) : d(Ie, Ye, te, n, o, _);
          if (!(ln === r ? Ie === Ye || v(Ie, Ye, s, d, _) : ln)) {
            Te = !1;
            break;
          }
          ve || (ve = te == "constructor");
        }
        if (Te && !ve) {
          var Bt = n.constructor, un = o.constructor;
          Bt != un && "constructor" in n && "constructor" in o && !(typeof Bt == "function" && Bt instanceof Bt && typeof un == "function" && un instanceof un) && (Te = !1);
        }
        return _.delete(n), _.delete(o), Te;
      }
      function dr(n) {
        return Bl(vd(n, r, $d), n + "");
      }
      function Al(n) {
        return Lc(n, yt, Hl);
      }
      function Pl(n) {
        return Lc(n, Gt, cd);
      }
      var Il = As ? function(n) {
        return As.get(n);
      } : Ql;
      function Zs(n) {
        for (var o = n.name + "", s = Ro[o], d = je.call(Ro, o) ? s.length : 0; d--; ) {
          var v = s[d], _ = v.func;
          if (_ == null || _ == n)
            return v.name;
        }
        return o;
      }
      function Wo(n) {
        var o = je.call(y, "placeholder") ? y : n;
        return o.placeholder;
      }
      function he() {
        var n = y.iteratee || Kl;
        return n = n === Kl ? Ac : n, arguments.length ? n(arguments[0], arguments[1]) : n;
      }
      function zs(n, o) {
        var s = n.__data__;
        return I6(o) ? s[typeof o == "string" ? "string" : "hash"] : s.map;
      }
      function El(n) {
        for (var o = yt(n), s = o.length; s--; ) {
          var d = o[s], v = n[d];
          o[s] = [d, v, hd(v)];
        }
        return o;
      }
      function so(n, o) {
        var s = R5(n, o);
        return Tc(s) ? s : r;
      }
      function S6(n) {
        var o = je.call(n, to), s = n[to];
        try {
          n[to] = r;
          var d = !0;
        } catch {
        }
        var v = $s.call(n);
        return d && (o ? n[to] = s : delete n[to]), v;
      }
      var Hl = ul ? function(n) {
        return n == null ? [] : (n = Ge(n), Ar(ul(n), function(o) {
          return gc.call(n, o);
        }));
      } : e1, cd = ul ? function(n) {
        for (var o = []; n; )
          Pr(o, Hl(n)), n = Ss(n);
        return o;
      } : e1, xt = Vt;
      (cl && xt(new cl(new ArrayBuffer(1))) != nn || ki && xt(new ki()) != ft || dl && xt(dl.resolve()) != Yn || Ho && xt(new Ho()) != ht || $i && xt(new $i()) != Zt) && (xt = function(n) {
        var o = Vt(n), s = o == bt ? n.constructor : r, d = s ? ao(s) : "";
        if (d)
          switch (d) {
            case u3:
              return nn;
            case c3:
              return ft;
            case d3:
              return Yn;
            case f3:
              return ht;
            case h3:
              return Zt;
          }
        return o;
      });
      function O6(n, o, s) {
        for (var d = -1, v = s.length; ++d < v; ) {
          var _ = s[d], w = _.size;
          switch (_.type) {
            case "drop":
              n += w;
              break;
            case "dropRight":
              o -= w;
              break;
            case "take":
              o = Lt(o, n + w);
              break;
            case "takeRight":
              n = mt(n, o - w);
              break;
          }
        }
        return { start: n, end: o };
      }
      function L6(n) {
        var o = n.match(Ep);
        return o ? o[1].split(Hp) : [];
      }
      function dd(n, o, s) {
        o = Vr(o, n);
        for (var d = -1, v = o.length, _ = !1; ++d < v; ) {
          var w = jn(o[d]);
          if (!(_ = n != null && s(n, w)))
            break;
          n = n[w];
        }
        return _ || ++d != v ? _ : (v = n == null ? 0 : n.length, !!v && ea(v) && fr(w, v) && (Me(n) || lo(n)));
      }
      function x6(n) {
        var o = n.length, s = new n.constructor(o);
        return o && typeof n[0] == "string" && je.call(n, "index") && (s.index = n.index, s.input = n.input), s;
      }
      function fd(n) {
        return typeof n.constructor == "function" && !Pi(n) ? Vo(Ss(n)) : {};
      }
      function T6(n, o, s) {
        var d = n.constructor;
        switch (o) {
          case tn:
            return Ll(n);
          case rt:
          case vt:
            return new d(+n);
          case nn:
            return p6(n, s);
          case Xr:
          case ir:
          case Kr:
          case Dr:
          case Sr:
          case Jr:
          case Or:
          case Lr:
          case q:
            return qc(n, s);
          case ft:
            return new d();
          case dn:
          case Ut:
            return new d(n);
          case wt:
            return v6(n);
          case ht:
            return new d();
          case en:
            return g6(n);
        }
      }
      function A6(n, o) {
        var s = o.length;
        if (!s)
          return n;
        var d = s - 1;
        return o[d] = (s > 1 ? "& " : "") + o[d], o = o.join(s > 2 ? ", " : " "), n.replace(Ip, `{
/* [wrapped with ` + o + `] */
`);
      }
      function P6(n) {
        return Me(n) || lo(n) || !!(mc && n && n[mc]);
      }
      function fr(n, o) {
        var s = typeof n;
        return o = o ?? Ae, !!o && (s == "number" || s != "symbol" && Up.test(n)) && n > -1 && n % 1 == 0 && n < o;
      }
      function Yt(n, o, s) {
        if (!ot(s))
          return !1;
        var d = typeof o;
        return (d == "number" ? qt(s) && fr(o, s.length) : d == "string" && o in s) ? Tn(s[o], n) : !1;
      }
      function Rl(n, o) {
        if (Me(n))
          return !1;
        var s = typeof n;
        return s == "number" || s == "symbol" || s == "boolean" || n == null || an(n) ? !0 : _i.test(n) || !Ot.test(n) || o != null && n in Ge(o);
      }
      function I6(n) {
        var o = typeof n;
        return o == "string" || o == "number" || o == "symbol" || o == "boolean" ? n !== "__proto__" : n === null;
      }
      function Vl(n) {
        var o = Zs(n), s = y[o];
        if (typeof s != "function" || !(o in He.prototype))
          return !1;
        if (n === s)
          return !0;
        var d = Il(s);
        return !!d && n === d[0];
      }
      function E6(n) {
        return !!hc && hc in n;
      }
      var H6 = ws ? hr : t1;
      function Pi(n) {
        var o = n && n.constructor, s = typeof o == "function" && o.prototype || Eo;
        return n === s;
      }
      function hd(n) {
        return n === n && !ot(n);
      }
      function pd(n, o) {
        return function(s) {
          return s == null ? !1 : s[n] === o && (o !== r || n in Ge(s));
        };
      }
      function R6(n) {
        var o = Js(n, function(d) {
          return s.size === h && s.clear(), d;
        }), s = o.cache;
        return o;
      }
      function V6(n, o) {
        var s = n[1], d = o[1], v = s | d, _ = v < (A | D | E), w = d == E && s == K || d == E && s == ee && n[7].length <= o[8] || d == (E | ee) && o[7].length <= o[8] && s == K;
        if (!(_ || w))
          return n;
        d & A && (n[2] = o[2], v |= s & A ? 0 : Y);
        var S = o[3];
        if (S) {
          var x = n[3];
          n[3] = x ? Xc(x, S, o[4]) : S, n[4] = x ? Ir(n[3], p) : o[4];
        }
        return S = o[5], S && (x = n[5], n[5] = x ? Kc(x, S, o[6]) : S, n[6] = x ? Ir(n[5], p) : o[6]), S = o[7], S && (n[7] = S), d & E && (n[8] = n[8] == null ? o[8] : Lt(n[8], o[8])), n[9] == null && (n[9] = o[9]), n[0] = o[0], n[1] = v, n;
      }
      function Y6(n) {
        var o = [];
        if (n != null)
          for (var s in Ge(n))
            o.push(s);
        return o;
      }
      function B6(n) {
        return $s.call(n);
      }
      function vd(n, o, s) {
        return o = mt(o === r ? n.length - 1 : o, 0), function() {
          for (var d = arguments, v = -1, _ = mt(d.length - o, 0), w = R(_); ++v < _; )
            w[v] = d[o + v];
          v = -1;
          for (var S = R(o + 1); ++v < o; )
            S[v] = d[v];
          return S[o] = s(w), rn(n, this, S);
        };
      }
      function gd(n, o) {
        return o.length < 2 ? n : io(n, yn(o, 0, -1));
      }
      function W6(n, o) {
        for (var s = n.length, d = Lt(o.length, s), v = zt(n); d--; ) {
          var _ = o[d];
          n[d] = fr(_, s) ? v[_] : r;
        }
        return n;
      }
      function Yl(n, o) {
        if (!(o === "constructor" && typeof n[o] == "function") && o != "__proto__")
          return n[o];
      }
      var md = _d(Bc), Ii = n3 || function(n, o) {
        return $t.setTimeout(n, o);
      }, Bl = _d(c6);
      function yd(n, o, s) {
        var d = o + "";
        return Bl(n, A6(d, F6(L6(d), s)));
      }
      function _d(n) {
        var o = 0, s = 0;
        return function() {
          var d = s3(), v = re - (d - s);
          if (s = d, v > 0) {
            if (++o >= G)
              return arguments[0];
          } else
            o = 0;
          return n.apply(r, arguments);
        };
      }
      function qs(n, o) {
        var s = -1, d = n.length, v = d - 1;
        for (o = o === r ? d : o; ++s < o; ) {
          var _ = wl(s, v), w = n[_];
          n[_] = n[s], n[s] = w;
        }
        return n.length = o, n;
      }
      var Cd = R6(function(n) {
        var o = [];
        return n.charCodeAt(0) === 46 && o.push(""), n.replace(Lo, function(s, d, v, _) {
          o.push(v ? _.replace(Yp, "$1") : d || s);
        }), o;
      });
      function jn(n) {
        if (typeof n == "string" || an(n))
          return n;
        var o = n + "";
        return o == "0" && 1 / n == -De ? "-0" : o;
      }
      function ao(n) {
        if (n != null) {
          try {
            return ks.call(n);
          } catch {
          }
          try {
            return n + "";
          } catch {
          }
        }
        return "";
      }
      function F6(n, o) {
        return pn(Ve, function(s) {
          var d = "_." + s[0];
          o & s[1] && !ys(n, d) && n.push(d);
        }), n.sort();
      }
      function bd(n) {
        if (n instanceof He)
          return n.clone();
        var o = new gn(n.__wrapped__, n.__chain__);
        return o.__actions__ = zt(n.__actions__), o.__index__ = n.__index__, o.__values__ = n.__values__, o;
      }
      function N6(n, o, s) {
        (s ? Yt(n, o, s) : o === r) ? o = 1 : o = mt(Le(o), 0);
        var d = n == null ? 0 : n.length;
        if (!d || o < 1)
          return [];
        for (var v = 0, _ = 0, w = R(xs(d / o)); v < d; )
          w[_++] = yn(n, v, v += o);
        return w;
      }
      function j6(n) {
        for (var o = -1, s = n == null ? 0 : n.length, d = 0, v = []; ++o < s; ) {
          var _ = n[o];
          _ && (v[d++] = _);
        }
        return v;
      }
      function U6() {
        var n = arguments.length;
        if (!n)
          return [];
        for (var o = R(n - 1), s = arguments[0], d = n; d--; )
          o[d - 1] = arguments[d];
        return Pr(Me(s) ? zt(s) : [s], Mt(o, 1));
      }
      var Z6 = Pe(function(n, o) {
        return ct(n) ? Oi(n, Mt(o, 1, ct, !0)) : [];
      }), z6 = Pe(function(n, o) {
        var s = _n(o);
        return ct(s) && (s = r), ct(n) ? Oi(n, Mt(o, 1, ct, !0), he(s, 2)) : [];
      }), q6 = Pe(function(n, o) {
        var s = _n(o);
        return ct(s) && (s = r), ct(n) ? Oi(n, Mt(o, 1, ct, !0), r, s) : [];
      });
      function G6(n, o, s) {
        var d = n == null ? 0 : n.length;
        return d ? (o = s || o === r ? 1 : Le(o), yn(n, o < 0 ? 0 : o, d)) : [];
      }
      function X6(n, o, s) {
        var d = n == null ? 0 : n.length;
        return d ? (o = s || o === r ? 1 : Le(o), o = d - o, yn(n, 0, o < 0 ? 0 : o)) : [];
      }
      function K6(n, o) {
        return n && n.length ? Bs(n, he(o, 3), !0, !0) : [];
      }
      function J6(n, o) {
        return n && n.length ? Bs(n, he(o, 3), !0) : [];
      }
      function Q6(n, o, s, d) {
        var v = n == null ? 0 : n.length;
        return v ? (s && typeof s != "number" && Yt(n, o, s) && (s = 0, d = v), U3(n, o, s, d)) : [];
      }
      function wd(n, o, s) {
        var d = n == null ? 0 : n.length;
        if (!d)
          return -1;
        var v = s == null ? 0 : Le(s);
        return v < 0 && (v = mt(d + v, 0)), _s(n, he(o, 3), v);
      }
      function kd(n, o, s) {
        var d = n == null ? 0 : n.length;
        if (!d)
          return -1;
        var v = d - 1;
        return s !== r && (v = Le(s), v = s < 0 ? mt(d + v, 0) : Lt(v, d - 1)), _s(n, he(o, 3), v, !0);
      }
      function $d(n) {
        var o = n == null ? 0 : n.length;
        return o ? Mt(n, 1) : [];
      }
      function e4(n) {
        var o = n == null ? 0 : n.length;
        return o ? Mt(n, De) : [];
      }
      function t4(n, o) {
        var s = n == null ? 0 : n.length;
        return s ? (o = o === r ? 1 : Le(o), Mt(n, o)) : [];
      }
      function n4(n) {
        for (var o = -1, s = n == null ? 0 : n.length, d = {}; ++o < s; ) {
          var v = n[o];
          d[v[0]] = v[1];
        }
        return d;
      }
      function Md(n) {
        return n && n.length ? n[0] : r;
      }
      function r4(n, o, s) {
        var d = n == null ? 0 : n.length;
        if (!d)
          return -1;
        var v = s == null ? 0 : Le(s);
        return v < 0 && (v = mt(d + v, 0)), To(n, o, v);
      }
      function o4(n) {
        var o = n == null ? 0 : n.length;
        return o ? yn(n, 0, -1) : [];
      }
      var i4 = Pe(function(n) {
        var o = nt(n, Sl);
        return o.length && o[0] === n[0] ? ml(o) : [];
      }), s4 = Pe(function(n) {
        var o = _n(n), s = nt(n, Sl);
        return o === _n(s) ? o = r : s.pop(), s.length && s[0] === n[0] ? ml(s, he(o, 2)) : [];
      }), a4 = Pe(function(n) {
        var o = _n(n), s = nt(n, Sl);
        return o = typeof o == "function" ? o : r, o && s.pop(), s.length && s[0] === n[0] ? ml(s, r, o) : [];
      });
      function l4(n, o) {
        return n == null ? "" : o3.call(n, o);
      }
      function _n(n) {
        var o = n == null ? 0 : n.length;
        return o ? n[o - 1] : r;
      }
      function u4(n, o, s) {
        var d = n == null ? 0 : n.length;
        if (!d)
          return -1;
        var v = d;
        return s !== r && (v = Le(s), v = v < 0 ? mt(d + v, 0) : Lt(v, d - 1)), o === o ? F5(n, o, v) : _s(n, ic, v, !0);
      }
      function c4(n, o) {
        return n && n.length ? Hc(n, Le(o)) : r;
      }
      var d4 = Pe(Dd);
      function Dd(n, o) {
        return n && n.length && o && o.length ? bl(n, o) : n;
      }
      function f4(n, o, s) {
        return n && n.length && o && o.length ? bl(n, o, he(s, 2)) : n;
      }
      function h4(n, o, s) {
        return n && n.length && o && o.length ? bl(n, o, r, s) : n;
      }
      var p4 = dr(function(n, o) {
        var s = n == null ? 0 : n.length, d = hl(n, o);
        return Yc(n, nt(o, function(v) {
          return fr(v, s) ? +v : v;
        }).sort(Gc)), d;
      });
      function v4(n, o) {
        var s = [];
        if (!(n && n.length))
          return s;
        var d = -1, v = [], _ = n.length;
        for (o = he(o, 3); ++d < _; ) {
          var w = n[d];
          o(w, d, n) && (s.push(w), v.push(d));
        }
        return Yc(n, v), s;
      }
      function Wl(n) {
        return n == null ? n : l3.call(n);
      }
      function g4(n, o, s) {
        var d = n == null ? 0 : n.length;
        return d ? (s && typeof s != "number" && Yt(n, o, s) ? (o = 0, s = d) : (o = o == null ? 0 : Le(o), s = s === r ? d : Le(s)), yn(n, o, s)) : [];
      }
      function m4(n, o) {
        return Ys(n, o);
      }
      function y4(n, o, s) {
        return $l(n, o, he(s, 2));
      }
      function _4(n, o) {
        var s = n == null ? 0 : n.length;
        if (s) {
          var d = Ys(n, o);
          if (d < s && Tn(n[d], o))
            return d;
        }
        return -1;
      }
      function C4(n, o) {
        return Ys(n, o, !0);
      }
      function b4(n, o, s) {
        return $l(n, o, he(s, 2), !0);
      }
      function w4(n, o) {
        var s = n == null ? 0 : n.length;
        if (s) {
          var d = Ys(n, o, !0) - 1;
          if (Tn(n[d], o))
            return d;
        }
        return -1;
      }
      function k4(n) {
        return n && n.length ? Wc(n) : [];
      }
      function $4(n, o) {
        return n && n.length ? Wc(n, he(o, 2)) : [];
      }
      function M4(n) {
        var o = n == null ? 0 : n.length;
        return o ? yn(n, 1, o) : [];
      }
      function D4(n, o, s) {
        return n && n.length ? (o = s || o === r ? 1 : Le(o), yn(n, 0, o < 0 ? 0 : o)) : [];
      }
      function S4(n, o, s) {
        var d = n == null ? 0 : n.length;
        return d ? (o = s || o === r ? 1 : Le(o), o = d - o, yn(n, o < 0 ? 0 : o, d)) : [];
      }
      function O4(n, o) {
        return n && n.length ? Bs(n, he(o, 3), !1, !0) : [];
      }
      function L4(n, o) {
        return n && n.length ? Bs(n, he(o, 3)) : [];
      }
      var x4 = Pe(function(n) {
        return Rr(Mt(n, 1, ct, !0));
      }), T4 = Pe(function(n) {
        var o = _n(n);
        return ct(o) && (o = r), Rr(Mt(n, 1, ct, !0), he(o, 2));
      }), A4 = Pe(function(n) {
        var o = _n(n);
        return o = typeof o == "function" ? o : r, Rr(Mt(n, 1, ct, !0), r, o);
      });
      function P4(n) {
        return n && n.length ? Rr(n) : [];
      }
      function I4(n, o) {
        return n && n.length ? Rr(n, he(o, 2)) : [];
      }
      function E4(n, o) {
        return o = typeof o == "function" ? o : r, n && n.length ? Rr(n, r, o) : [];
      }
      function Fl(n) {
        if (!(n && n.length))
          return [];
        var o = 0;
        return n = Ar(n, function(s) {
          if (ct(s))
            return o = mt(s.length, o), !0;
        }), il(o, function(s) {
          return nt(n, nl(s));
        });
      }
      function Sd(n, o) {
        if (!(n && n.length))
          return [];
        var s = Fl(n);
        return o == null ? s : nt(s, function(d) {
          return rn(o, r, d);
        });
      }
      var H4 = Pe(function(n, o) {
        return ct(n) ? Oi(n, o) : [];
      }), R4 = Pe(function(n) {
        return Dl(Ar(n, ct));
      }), V4 = Pe(function(n) {
        var o = _n(n);
        return ct(o) && (o = r), Dl(Ar(n, ct), he(o, 2));
      }), Y4 = Pe(function(n) {
        var o = _n(n);
        return o = typeof o == "function" ? o : r, Dl(Ar(n, ct), r, o);
      }), B4 = Pe(Fl);
      function W4(n, o) {
        return Uc(n || [], o || [], Si);
      }
      function F4(n, o) {
        return Uc(n || [], o || [], Ti);
      }
      var N4 = Pe(function(n) {
        var o = n.length, s = o > 1 ? n[o - 1] : r;
        return s = typeof s == "function" ? (n.pop(), s) : r, Sd(n, s);
      });
      function Od(n) {
        var o = y(n);
        return o.__chain__ = !0, o;
      }
      function j4(n, o) {
        return o(n), n;
      }
      function Gs(n, o) {
        return o(n);
      }
      var U4 = dr(function(n) {
        var o = n.length, s = o ? n[0] : 0, d = this.__wrapped__, v = function(_) {
          return hl(_, n);
        };
        return o > 1 || this.__actions__.length || !(d instanceof He) || !fr(s) ? this.thru(v) : (d = d.slice(s, +s + (o ? 1 : 0)), d.__actions__.push({
          func: Gs,
          args: [v],
          thisArg: r
        }), new gn(d, this.__chain__).thru(function(_) {
          return o && !_.length && _.push(r), _;
        }));
      });
      function Z4() {
        return Od(this);
      }
      function z4() {
        return new gn(this.value(), this.__chain__);
      }
      function q4() {
        this.__values__ === r && (this.__values__ = Fd(this.value()));
        var n = this.__index__ >= this.__values__.length, o = n ? r : this.__values__[this.__index__++];
        return { done: n, value: o };
      }
      function G4() {
        return this;
      }
      function X4(n) {
        for (var o, s = this; s instanceof Is; ) {
          var d = bd(s);
          d.__index__ = 0, d.__values__ = r, o ? v.__wrapped__ = d : o = d;
          var v = d;
          s = s.__wrapped__;
        }
        return v.__wrapped__ = n, o;
      }
      function K4() {
        var n = this.__wrapped__;
        if (n instanceof He) {
          var o = n;
          return this.__actions__.length && (o = new He(this)), o = o.reverse(), o.__actions__.push({
            func: Gs,
            args: [Wl],
            thisArg: r
          }), new gn(o, this.__chain__);
        }
        return this.thru(Wl);
      }
      function J4() {
        return jc(this.__wrapped__, this.__actions__);
      }
      var Q4 = Ws(function(n, o, s) {
        je.call(n, s) ? ++n[s] : ur(n, s, 1);
      });
      function e8(n, o, s) {
        var d = Me(n) ? rc : j3;
        return s && Yt(n, o, s) && (o = r), d(n, he(o, 3));
      }
      function t8(n, o) {
        var s = Me(n) ? Ar : Sc;
        return s(n, he(o, 3));
      }
      var n8 = td(wd), r8 = td(kd);
      function o8(n, o) {
        return Mt(Xs(n, o), 1);
      }
      function i8(n, o) {
        return Mt(Xs(n, o), De);
      }
      function s8(n, o, s) {
        return s = s === r ? 1 : Le(s), Mt(Xs(n, o), s);
      }
      function Ld(n, o) {
        var s = Me(n) ? pn : Hr;
        return s(n, he(o, 3));
      }
      function xd(n, o) {
        var s = Me(n) ? M5 : Dc;
        return s(n, he(o, 3));
      }
      var a8 = Ws(function(n, o, s) {
        je.call(n, s) ? n[s].push(o) : ur(n, s, [o]);
      });
      function l8(n, o, s, d) {
        n = qt(n) ? n : No(n), s = s && !d ? Le(s) : 0;
        var v = n.length;
        return s < 0 && (s = mt(v + s, 0)), ta(n) ? s <= v && n.indexOf(o, s) > -1 : !!v && To(n, o, s) > -1;
      }
      var u8 = Pe(function(n, o, s) {
        var d = -1, v = typeof o == "function", _ = qt(n) ? R(n.length) : [];
        return Hr(n, function(w) {
          _[++d] = v ? rn(o, w, s) : Li(w, o, s);
        }), _;
      }), c8 = Ws(function(n, o, s) {
        ur(n, s, o);
      });
      function Xs(n, o) {
        var s = Me(n) ? nt : Pc;
        return s(n, he(o, 3));
      }
      function d8(n, o, s, d) {
        return n == null ? [] : (Me(o) || (o = o == null ? [] : [o]), s = d ? r : s, Me(s) || (s = s == null ? [] : [s]), Rc(n, o, s));
      }
      var f8 = Ws(function(n, o, s) {
        n[s ? 0 : 1].push(o);
      }, function() {
        return [[], []];
      });
      function h8(n, o, s) {
        var d = Me(n) ? el : ac, v = arguments.length < 3;
        return d(n, he(o, 4), s, v, Hr);
      }
      function p8(n, o, s) {
        var d = Me(n) ? D5 : ac, v = arguments.length < 3;
        return d(n, he(o, 4), s, v, Dc);
      }
      function v8(n, o) {
        var s = Me(n) ? Ar : Sc;
        return s(n, Qs(he(o, 3)));
      }
      function g8(n) {
        var o = Me(n) ? wc : l6;
        return o(n);
      }
      function m8(n, o, s) {
        (s ? Yt(n, o, s) : o === r) ? o = 1 : o = Le(o);
        var d = Me(n) ? Y3 : u6;
        return d(n, o);
      }
      function y8(n) {
        var o = Me(n) ? B3 : d6;
        return o(n);
      }
      function _8(n) {
        if (n == null)
          return 0;
        if (qt(n))
          return ta(n) ? Po(n) : n.length;
        var o = xt(n);
        return o == ft || o == ht ? n.size : _l(n).length;
      }
      function C8(n, o, s) {
        var d = Me(n) ? tl : f6;
        return s && Yt(n, o, s) && (o = r), d(n, he(o, 3));
      }
      var b8 = Pe(function(n, o) {
        if (n == null)
          return [];
        var s = o.length;
        return s > 1 && Yt(n, o[0], o[1]) ? o = [] : s > 2 && Yt(o[0], o[1], o[2]) && (o = [o[0]]), Rc(n, Mt(o, 1), []);
      }), Ks = t3 || function() {
        return $t.Date.now();
      };
      function w8(n, o) {
        if (typeof o != "function")
          throw new vn(u);
        return n = Le(n), function() {
          if (--n < 1)
            return o.apply(this, arguments);
        };
      }
      function Td(n, o, s) {
        return o = s ? r : o, o = n && o == null ? n.length : o, cr(n, E, r, r, r, r, o);
      }
      function Ad(n, o) {
        var s;
        if (typeof o != "function")
          throw new vn(u);
        return n = Le(n), function() {
          return --n > 0 && (s = o.apply(this, arguments)), n <= 1 && (o = r), s;
        };
      }
      var Nl = Pe(function(n, o, s) {
        var d = A;
        if (s.length) {
          var v = Ir(s, Wo(Nl));
          d |= I;
        }
        return cr(n, d, o, s, v);
      }), Pd = Pe(function(n, o, s) {
        var d = A | D;
        if (s.length) {
          var v = Ir(s, Wo(Pd));
          d |= I;
        }
        return cr(o, d, n, s, v);
      });
      function Id(n, o, s) {
        o = s ? r : o;
        var d = cr(n, K, r, r, r, r, r, o);
        return d.placeholder = Id.placeholder, d;
      }
      function Ed(n, o, s) {
        o = s ? r : o;
        var d = cr(n, H, r, r, r, r, r, o);
        return d.placeholder = Ed.placeholder, d;
      }
      function Hd(n, o, s) {
        var d, v, _, w, S, x, F = 0, j = !1, z = !1, te = !0;
        if (typeof n != "function")
          throw new vn(u);
        o = Cn(o) || 0, ot(s) && (j = !!s.leading, z = "maxWait" in s, _ = z ? mt(Cn(s.maxWait) || 0, o) : _, te = "trailing" in s ? !!s.trailing : te);
        function ce(dt) {
          var An = d, vr = v;
          return d = v = r, F = dt, w = n.apply(vr, An), w;
        }
        function pe(dt) {
          return F = dt, S = Ii(Ie, o), j ? ce(dt) : w;
        }
        function Te(dt) {
          var An = dt - x, vr = dt - F, tf = o - An;
          return z ? Lt(tf, _ - vr) : tf;
        }
        function ve(dt) {
          var An = dt - x, vr = dt - F;
          return x === r || An >= o || An < 0 || z && vr >= _;
        }
        function Ie() {
          var dt = Ks();
          if (ve(dt))
            return Ye(dt);
          S = Ii(Ie, Te(dt));
        }
        function Ye(dt) {
          return S = r, te && d ? ce(dt) : (d = v = r, w);
        }
        function ln() {
          S !== r && Zc(S), F = 0, d = x = v = S = r;
        }
        function Bt() {
          return S === r ? w : Ye(Ks());
        }
        function un() {
          var dt = Ks(), An = ve(dt);
          if (d = arguments, v = this, x = dt, An) {
            if (S === r)
              return pe(x);
            if (z)
              return Zc(S), S = Ii(Ie, o), ce(x);
          }
          return S === r && (S = Ii(Ie, o)), w;
        }
        return un.cancel = ln, un.flush = Bt, un;
      }
      var k8 = Pe(function(n, o) {
        return Mc(n, 1, o);
      }), $8 = Pe(function(n, o, s) {
        return Mc(n, Cn(o) || 0, s);
      });
      function M8(n) {
        return cr(n, ue);
      }
      function Js(n, o) {
        if (typeof n != "function" || o != null && typeof o != "function")
          throw new vn(u);
        var s = function() {
          var d = arguments, v = o ? o.apply(this, d) : d[0], _ = s.cache;
          if (_.has(v))
            return _.get(v);
          var w = n.apply(this, d);
          return s.cache = _.set(v, w) || _, w;
        };
        return s.cache = new (Js.Cache || lr)(), s;
      }
      Js.Cache = lr;
      function Qs(n) {
        if (typeof n != "function")
          throw new vn(u);
        return function() {
          var o = arguments;
          switch (o.length) {
            case 0:
              return !n.call(this);
            case 1:
              return !n.call(this, o[0]);
            case 2:
              return !n.call(this, o[0], o[1]);
            case 3:
              return !n.call(this, o[0], o[1], o[2]);
          }
          return !n.apply(this, o);
        };
      }
      function D8(n) {
        return Ad(2, n);
      }
      var S8 = h6(function(n, o) {
        o = o.length == 1 && Me(o[0]) ? nt(o[0], on(he())) : nt(Mt(o, 1), on(he()));
        var s = o.length;
        return Pe(function(d) {
          for (var v = -1, _ = Lt(d.length, s); ++v < _; )
            d[v] = o[v].call(this, d[v]);
          return rn(n, this, d);
        });
      }), jl = Pe(function(n, o) {
        var s = Ir(o, Wo(jl));
        return cr(n, I, r, o, s);
      }), Rd = Pe(function(n, o) {
        var s = Ir(o, Wo(Rd));
        return cr(n, U, r, o, s);
      }), O8 = dr(function(n, o) {
        return cr(n, ee, r, r, r, o);
      });
      function L8(n, o) {
        if (typeof n != "function")
          throw new vn(u);
        return o = o === r ? o : Le(o), Pe(n, o);
      }
      function x8(n, o) {
        if (typeof n != "function")
          throw new vn(u);
        return o = o == null ? 0 : mt(Le(o), 0), Pe(function(s) {
          var d = s[o], v = Yr(s, 0, o);
          return d && Pr(v, d), rn(n, this, v);
        });
      }
      function T8(n, o, s) {
        var d = !0, v = !0;
        if (typeof n != "function")
          throw new vn(u);
        return ot(s) && (d = "leading" in s ? !!s.leading : d, v = "trailing" in s ? !!s.trailing : v), Hd(n, o, {
          leading: d,
          maxWait: o,
          trailing: v
        });
      }
      function A8(n) {
        return Td(n, 1);
      }
      function P8(n, o) {
        return jl(Ol(o), n);
      }
      function I8() {
        if (!arguments.length)
          return [];
        var n = arguments[0];
        return Me(n) ? n : [n];
      }
      function E8(n) {
        return mn(n, g);
      }
      function H8(n, o) {
        return o = typeof o == "function" ? o : r, mn(n, g, o);
      }
      function R8(n) {
        return mn(n, m | g);
      }
      function V8(n, o) {
        return o = typeof o == "function" ? o : r, mn(n, m | g, o);
      }
      function Y8(n, o) {
        return o == null || $c(n, o, yt(o));
      }
      function Tn(n, o) {
        return n === o || n !== n && o !== o;
      }
      var B8 = Us(gl), W8 = Us(function(n, o) {
        return n >= o;
      }), lo = xc(/* @__PURE__ */ function() {
        return arguments;
      }()) ? xc : function(n) {
        return lt(n) && je.call(n, "callee") && !gc.call(n, "callee");
      }, Me = R.isArray, F8 = Ku ? on(Ku) : X3;
      function qt(n) {
        return n != null && ea(n.length) && !hr(n);
      }
      function ct(n) {
        return lt(n) && qt(n);
      }
      function N8(n) {
        return n === !0 || n === !1 || lt(n) && Vt(n) == rt;
      }
      var Br = r3 || t1, j8 = Ju ? on(Ju) : K3;
      function U8(n) {
        return lt(n) && n.nodeType === 1 && !Ei(n);
      }
      function Z8(n) {
        if (n == null)
          return !0;
        if (qt(n) && (Me(n) || typeof n == "string" || typeof n.splice == "function" || Br(n) || Fo(n) || lo(n)))
          return !n.length;
        var o = xt(n);
        if (o == ft || o == ht)
          return !n.size;
        if (Pi(n))
          return !_l(n).length;
        for (var s in n)
          if (je.call(n, s))
            return !1;
        return !0;
      }
      function z8(n, o) {
        return xi(n, o);
      }
      function q8(n, o, s) {
        s = typeof s == "function" ? s : r;
        var d = s ? s(n, o) : r;
        return d === r ? xi(n, o, r, s) : !!d;
      }
      function Ul(n) {
        if (!lt(n))
          return !1;
        var o = Vt(n);
        return o == St || o == On || typeof n.message == "string" && typeof n.name == "string" && !Ei(n);
      }
      function G8(n) {
        return typeof n == "number" && yc(n);
      }
      function hr(n) {
        if (!ot(n))
          return !1;
        var o = Vt(n);
        return o == Ct || o == Ht || o == at || o == or;
      }
      function Vd(n) {
        return typeof n == "number" && n == Le(n);
      }
      function ea(n) {
        return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Ae;
      }
      function ot(n) {
        var o = typeof n;
        return n != null && (o == "object" || o == "function");
      }
      function lt(n) {
        return n != null && typeof n == "object";
      }
      var Yd = Qu ? on(Qu) : Q3;
      function X8(n, o) {
        return n === o || yl(n, o, El(o));
      }
      function K8(n, o, s) {
        return s = typeof s == "function" ? s : r, yl(n, o, El(o), s);
      }
      function J8(n) {
        return Bd(n) && n != +n;
      }
      function Q8(n) {
        if (H6(n))
          throw new ke(l);
        return Tc(n);
      }
      function e9(n) {
        return n === null;
      }
      function t9(n) {
        return n == null;
      }
      function Bd(n) {
        return typeof n == "number" || lt(n) && Vt(n) == dn;
      }
      function Ei(n) {
        if (!lt(n) || Vt(n) != bt)
          return !1;
        var o = Ss(n);
        if (o === null)
          return !0;
        var s = je.call(o, "constructor") && o.constructor;
        return typeof s == "function" && s instanceof s && ks.call(s) == K5;
      }
      var Zl = ec ? on(ec) : e6;
      function n9(n) {
        return Vd(n) && n >= -Ae && n <= Ae;
      }
      var Wd = tc ? on(tc) : t6;
      function ta(n) {
        return typeof n == "string" || !Me(n) && lt(n) && Vt(n) == Ut;
      }
      function an(n) {
        return typeof n == "symbol" || lt(n) && Vt(n) == en;
      }
      var Fo = nc ? on(nc) : n6;
      function r9(n) {
        return n === r;
      }
      function o9(n) {
        return lt(n) && xt(n) == Zt;
      }
      function i9(n) {
        return lt(n) && Vt(n) == Wn;
      }
      var s9 = Us(Cl), a9 = Us(function(n, o) {
        return n <= o;
      });
      function Fd(n) {
        if (!n)
          return [];
        if (qt(n))
          return ta(n) ? Ln(n) : zt(n);
        if (wi && n[wi])
          return Y5(n[wi]());
        var o = xt(n), s = o == ft ? al : o == ht ? Cs : No;
        return s(n);
      }
      function pr(n) {
        if (!n)
          return n === 0 ? n : 0;
        if (n = Cn(n), n === De || n === -De) {
          var o = n < 0 ? -1 : 1;
          return o * Se;
        }
        return n === n ? n : 0;
      }
      function Le(n) {
        var o = pr(n), s = o % 1;
        return o === o ? s ? o - s : o : 0;
      }
      function Nd(n) {
        return n ? oo(Le(n), 0, _e) : 0;
      }
      function Cn(n) {
        if (typeof n == "number")
          return n;
        if (an(n))
          return X;
        if (ot(n)) {
          var o = typeof n.valueOf == "function" ? n.valueOf() : n;
          n = ot(o) ? o + "" : o;
        }
        if (typeof n != "string")
          return n === 0 ? n : +n;
        n = lc(n);
        var s = Fp.test(n);
        return s || jp.test(n) ? w5(n.slice(2), s ? 2 : 8) : Wp.test(n) ? X : +n;
      }
      function jd(n) {
        return Nn(n, Gt(n));
      }
      function l9(n) {
        return n ? oo(Le(n), -Ae, Ae) : n === 0 ? n : 0;
      }
      function Ne(n) {
        return n == null ? "" : sn(n);
      }
      var u9 = Yo(function(n, o) {
        if (Pi(o) || qt(o)) {
          Nn(o, yt(o), n);
          return;
        }
        for (var s in o)
          je.call(o, s) && Si(n, s, o[s]);
      }), Ud = Yo(function(n, o) {
        Nn(o, Gt(o), n);
      }), na = Yo(function(n, o, s, d) {
        Nn(o, Gt(o), n, d);
      }), c9 = Yo(function(n, o, s, d) {
        Nn(o, yt(o), n, d);
      }), d9 = dr(hl);
      function f9(n, o) {
        var s = Vo(n);
        return o == null ? s : kc(s, o);
      }
      var h9 = Pe(function(n, o) {
        n = Ge(n);
        var s = -1, d = o.length, v = d > 2 ? o[2] : r;
        for (v && Yt(o[0], o[1], v) && (d = 1); ++s < d; )
          for (var _ = o[s], w = Gt(_), S = -1, x = w.length; ++S < x; ) {
            var F = w[S], j = n[F];
            (j === r || Tn(j, Eo[F]) && !je.call(n, F)) && (n[F] = _[F]);
          }
        return n;
      }), p9 = Pe(function(n) {
        return n.push(r, ld), rn(Zd, r, n);
      });
      function v9(n, o) {
        return oc(n, he(o, 3), Fn);
      }
      function g9(n, o) {
        return oc(n, he(o, 3), vl);
      }
      function m9(n, o) {
        return n == null ? n : pl(n, he(o, 3), Gt);
      }
      function y9(n, o) {
        return n == null ? n : Oc(n, he(o, 3), Gt);
      }
      function _9(n, o) {
        return n && Fn(n, he(o, 3));
      }
      function C9(n, o) {
        return n && vl(n, he(o, 3));
      }
      function b9(n) {
        return n == null ? [] : Rs(n, yt(n));
      }
      function w9(n) {
        return n == null ? [] : Rs(n, Gt(n));
      }
      function zl(n, o, s) {
        var d = n == null ? r : io(n, o);
        return d === r ? s : d;
      }
      function k9(n, o) {
        return n != null && dd(n, o, Z3);
      }
      function ql(n, o) {
        return n != null && dd(n, o, z3);
      }
      var $9 = rd(function(n, o, s) {
        o != null && typeof o.toString != "function" && (o = $s.call(o)), n[o] = s;
      }, Xl(Xt)), M9 = rd(function(n, o, s) {
        o != null && typeof o.toString != "function" && (o = $s.call(o)), je.call(n, o) ? n[o].push(s) : n[o] = [s];
      }, he), D9 = Pe(Li);
      function yt(n) {
        return qt(n) ? bc(n) : _l(n);
      }
      function Gt(n) {
        return qt(n) ? bc(n, !0) : r6(n);
      }
      function S9(n, o) {
        var s = {};
        return o = he(o, 3), Fn(n, function(d, v, _) {
          ur(s, o(d, v, _), d);
        }), s;
      }
      function O9(n, o) {
        var s = {};
        return o = he(o, 3), Fn(n, function(d, v, _) {
          ur(s, v, o(d, v, _));
        }), s;
      }
      var L9 = Yo(function(n, o, s) {
        Vs(n, o, s);
      }), Zd = Yo(function(n, o, s, d) {
        Vs(n, o, s, d);
      }), x9 = dr(function(n, o) {
        var s = {};
        if (n == null)
          return s;
        var d = !1;
        o = nt(o, function(_) {
          return _ = Vr(_, n), d || (d = _.length > 1), _;
        }), Nn(n, Pl(n), s), d && (s = mn(s, m | C | g, $6));
        for (var v = o.length; v--; )
          Ml(s, o[v]);
        return s;
      });
      function T9(n, o) {
        return zd(n, Qs(he(o)));
      }
      var A9 = dr(function(n, o) {
        return n == null ? {} : i6(n, o);
      });
      function zd(n, o) {
        if (n == null)
          return {};
        var s = nt(Pl(n), function(d) {
          return [d];
        });
        return o = he(o), Vc(n, s, function(d, v) {
          return o(d, v[0]);
        });
      }
      function P9(n, o, s) {
        o = Vr(o, n);
        var d = -1, v = o.length;
        for (v || (v = 1, n = r); ++d < v; ) {
          var _ = n == null ? r : n[jn(o[d])];
          _ === r && (d = v, _ = s), n = hr(_) ? _.call(n) : _;
        }
        return n;
      }
      function I9(n, o, s) {
        return n == null ? n : Ti(n, o, s);
      }
      function E9(n, o, s, d) {
        return d = typeof d == "function" ? d : r, n == null ? n : Ti(n, o, s, d);
      }
      var qd = sd(yt), Gd = sd(Gt);
      function H9(n, o, s) {
        var d = Me(n), v = d || Br(n) || Fo(n);
        if (o = he(o, 4), s == null) {
          var _ = n && n.constructor;
          v ? s = d ? new _() : [] : ot(n) ? s = hr(_) ? Vo(Ss(n)) : {} : s = {};
        }
        return (v ? pn : Fn)(n, function(w, S, x) {
          return o(s, w, S, x);
        }), s;
      }
      function R9(n, o) {
        return n == null ? !0 : Ml(n, o);
      }
      function V9(n, o, s) {
        return n == null ? n : Nc(n, o, Ol(s));
      }
      function Y9(n, o, s, d) {
        return d = typeof d == "function" ? d : r, n == null ? n : Nc(n, o, Ol(s), d);
      }
      function No(n) {
        return n == null ? [] : sl(n, yt(n));
      }
      function B9(n) {
        return n == null ? [] : sl(n, Gt(n));
      }
      function W9(n, o, s) {
        return s === r && (s = o, o = r), s !== r && (s = Cn(s), s = s === s ? s : 0), o !== r && (o = Cn(o), o = o === o ? o : 0), oo(Cn(n), o, s);
      }
      function F9(n, o, s) {
        return o = pr(o), s === r ? (s = o, o = 0) : s = pr(s), n = Cn(n), q3(n, o, s);
      }
      function N9(n, o, s) {
        if (s && typeof s != "boolean" && Yt(n, o, s) && (o = s = r), s === r && (typeof o == "boolean" ? (s = o, o = r) : typeof n == "boolean" && (s = n, n = r)), n === r && o === r ? (n = 0, o = 1) : (n = pr(n), o === r ? (o = n, n = 0) : o = pr(o)), n > o) {
          var d = n;
          n = o, o = d;
        }
        if (s || n % 1 || o % 1) {
          var v = _c();
          return Lt(n + v * (o - n + b5("1e-" + ((v + "").length - 1))), o);
        }
        return wl(n, o);
      }
      var j9 = Bo(function(n, o, s) {
        return o = o.toLowerCase(), n + (s ? Xd(o) : o);
      });
      function Xd(n) {
        return Gl(Ne(n).toLowerCase());
      }
      function Kd(n) {
        return n = Ne(n), n && n.replace(Zp, I5).replace(d5, "");
      }
      function U9(n, o, s) {
        n = Ne(n), o = sn(o);
        var d = n.length;
        s = s === r ? d : oo(Le(s), 0, d);
        var v = s;
        return s -= o.length, s >= 0 && n.slice(s, v) == o;
      }
      function Z9(n) {
        return n = Ne(n), n && Rt.test(n) ? n.replace(Ke, E5) : n;
      }
      function z9(n) {
        return n = Ne(n), n && Qr.test(n) ? n.replace(sr, "\\$&") : n;
      }
      var q9 = Bo(function(n, o, s) {
        return n + (s ? "-" : "") + o.toLowerCase();
      }), G9 = Bo(function(n, o, s) {
        return n + (s ? " " : "") + o.toLowerCase();
      }), X9 = ed("toLowerCase");
      function K9(n, o, s) {
        n = Ne(n), o = Le(o);
        var d = o ? Po(n) : 0;
        if (!o || d >= o)
          return n;
        var v = (o - d) / 2;
        return js(Ts(v), s) + n + js(xs(v), s);
      }
      function J9(n, o, s) {
        n = Ne(n), o = Le(o);
        var d = o ? Po(n) : 0;
        return o && d < o ? n + js(o - d, s) : n;
      }
      function Q9(n, o, s) {
        n = Ne(n), o = Le(o);
        var d = o ? Po(n) : 0;
        return o && d < o ? js(o - d, s) + n : n;
      }
      function e7(n, o, s) {
        return s || o == null ? o = 0 : o && (o = +o), a3(Ne(n).replace(Ci, ""), o || 0);
      }
      function t7(n, o, s) {
        return (s ? Yt(n, o, s) : o === r) ? o = 1 : o = Le(o), kl(Ne(n), o);
      }
      function n7() {
        var n = arguments, o = Ne(n[0]);
        return n.length < 3 ? o : o.replace(n[1], n[2]);
      }
      var r7 = Bo(function(n, o, s) {
        return n + (s ? "_" : "") + o.toLowerCase();
      });
      function o7(n, o, s) {
        return s && typeof s != "number" && Yt(n, o, s) && (o = s = r), s = s === r ? _e : s >>> 0, s ? (n = Ne(n), n && (typeof o == "string" || o != null && !Zl(o)) && (o = sn(o), !o && Ao(n)) ? Yr(Ln(n), 0, s) : n.split(o, s)) : [];
      }
      var i7 = Bo(function(n, o, s) {
        return n + (s ? " " : "") + Gl(o);
      });
      function s7(n, o, s) {
        return n = Ne(n), s = s == null ? 0 : oo(Le(s), 0, n.length), o = sn(o), n.slice(s, s + o.length) == o;
      }
      function a7(n, o, s) {
        var d = y.templateSettings;
        s && Yt(n, o, s) && (o = r), n = Ne(n), o = na({}, o, d, ad);
        var v = na({}, o.imports, d.imports, ad), _ = yt(v), w = sl(v, _), S, x, F = 0, j = o.interpolate || vs, z = "__p += '", te = ll(
          (o.escape || vs).source + "|" + j.source + "|" + (j === Oo ? Bp : vs).source + "|" + (o.evaluate || vs).source + "|$",
          "g"
        ), ce = "//# sourceURL=" + (je.call(o, "sourceURL") ? (o.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++g5 + "]") + `
`;
        n.replace(te, function(ve, Ie, Ye, ln, Bt, un) {
          return Ye || (Ye = ln), z += n.slice(F, un).replace(zp, H5), Ie && (S = !0, z += `' +
__e(` + Ie + `) +
'`), Bt && (x = !0, z += `';
` + Bt + `;
__p += '`), Ye && (z += `' +
((__t = (` + Ye + `)) == null ? '' : __t) +
'`), F = un + ve.length, ve;
        }), z += `';
`;
        var pe = je.call(o, "variable") && o.variable;
        if (!pe)
          z = `with (obj) {
` + z + `
}
`;
        else if (Vp.test(pe))
          throw new ke(c);
        z = (x ? z.replace(k, "") : z).replace(Z, "$1").replace(Q, "$1;"), z = "function(" + (pe || "obj") + `) {
` + (pe ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (S ? ", __e = _.escape" : "") + (x ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + z + `return __p
}`;
        var Te = Qd(function() {
          return We(_, ce + "return " + z).apply(r, w);
        });
        if (Te.source = z, Ul(Te))
          throw Te;
        return Te;
      }
      function l7(n) {
        return Ne(n).toLowerCase();
      }
      function u7(n) {
        return Ne(n).toUpperCase();
      }
      function c7(n, o, s) {
        if (n = Ne(n), n && (s || o === r))
          return lc(n);
        if (!n || !(o = sn(o)))
          return n;
        var d = Ln(n), v = Ln(o), _ = uc(d, v), w = cc(d, v) + 1;
        return Yr(d, _, w).join("");
      }
      function d7(n, o, s) {
        if (n = Ne(n), n && (s || o === r))
          return n.slice(0, fc(n) + 1);
        if (!n || !(o = sn(o)))
          return n;
        var d = Ln(n), v = cc(d, Ln(o)) + 1;
        return Yr(d, 0, v).join("");
      }
      function f7(n, o, s) {
        if (n = Ne(n), n && (s || o === r))
          return n.replace(Ci, "");
        if (!n || !(o = sn(o)))
          return n;
        var d = Ln(n), v = uc(d, Ln(o));
        return Yr(d, v).join("");
      }
      function h7(n, o) {
        var s = W, d = N;
        if (ot(o)) {
          var v = "separator" in o ? o.separator : v;
          s = "length" in o ? Le(o.length) : s, d = "omission" in o ? sn(o.omission) : d;
        }
        n = Ne(n);
        var _ = n.length;
        if (Ao(n)) {
          var w = Ln(n);
          _ = w.length;
        }
        if (s >= _)
          return n;
        var S = s - Po(d);
        if (S < 1)
          return d;
        var x = w ? Yr(w, 0, S).join("") : n.slice(0, S);
        if (v === r)
          return x + d;
        if (w && (S += x.length - S), Zl(v)) {
          if (n.slice(S).search(v)) {
            var F, j = x;
            for (v.global || (v = ll(v.source, Ne(xu.exec(v)) + "g")), v.lastIndex = 0; F = v.exec(j); )
              var z = F.index;
            x = x.slice(0, z === r ? S : z);
          }
        } else if (n.indexOf(sn(v), S) != S) {
          var te = x.lastIndexOf(v);
          te > -1 && (x = x.slice(0, te));
        }
        return x + d;
      }
      function p7(n) {
        return n = Ne(n), n && kt.test(n) ? n.replace(we, N5) : n;
      }
      var v7 = Bo(function(n, o, s) {
        return n + (s ? " " : "") + o.toUpperCase();
      }), Gl = ed("toUpperCase");
      function Jd(n, o, s) {
        return n = Ne(n), o = s ? r : o, o === r ? V5(n) ? Z5(n) : L5(n) : n.match(o) || [];
      }
      var Qd = Pe(function(n, o) {
        try {
          return rn(n, r, o);
        } catch (s) {
          return Ul(s) ? s : new ke(s);
        }
      }), g7 = dr(function(n, o) {
        return pn(o, function(s) {
          s = jn(s), ur(n, s, Nl(n[s], n));
        }), n;
      });
      function m7(n) {
        var o = n == null ? 0 : n.length, s = he();
        return n = o ? nt(n, function(d) {
          if (typeof d[1] != "function")
            throw new vn(u);
          return [s(d[0]), d[1]];
        }) : [], Pe(function(d) {
          for (var v = -1; ++v < o; ) {
            var _ = n[v];
            if (rn(_[0], this, d))
              return rn(_[1], this, d);
          }
        });
      }
      function y7(n) {
        return N3(mn(n, m));
      }
      function Xl(n) {
        return function() {
          return n;
        };
      }
      function _7(n, o) {
        return n == null || n !== n ? o : n;
      }
      var C7 = nd(), b7 = nd(!0);
      function Xt(n) {
        return n;
      }
      function Kl(n) {
        return Ac(typeof n == "function" ? n : mn(n, m));
      }
      function w7(n) {
        return Ic(mn(n, m));
      }
      function k7(n, o) {
        return Ec(n, mn(o, m));
      }
      var $7 = Pe(function(n, o) {
        return function(s) {
          return Li(s, n, o);
        };
      }), M7 = Pe(function(n, o) {
        return function(s) {
          return Li(n, s, o);
        };
      });
      function Jl(n, o, s) {
        var d = yt(o), v = Rs(o, d);
        s == null && !(ot(o) && (v.length || !d.length)) && (s = o, o = n, n = this, v = Rs(o, yt(o)));
        var _ = !(ot(s) && "chain" in s) || !!s.chain, w = hr(n);
        return pn(v, function(S) {
          var x = o[S];
          n[S] = x, w && (n.prototype[S] = function() {
            var F = this.__chain__;
            if (_ || F) {
              var j = n(this.__wrapped__), z = j.__actions__ = zt(this.__actions__);
              return z.push({ func: x, args: arguments, thisArg: n }), j.__chain__ = F, j;
            }
            return x.apply(n, Pr([this.value()], arguments));
          });
        }), n;
      }
      function D7() {
        return $t._ === this && ($t._ = J5), this;
      }
      function Ql() {
      }
      function S7(n) {
        return n = Le(n), Pe(function(o) {
          return Hc(o, n);
        });
      }
      var O7 = xl(nt), L7 = xl(rc), x7 = xl(tl);
      function ef(n) {
        return Rl(n) ? nl(jn(n)) : s6(n);
      }
      function T7(n) {
        return function(o) {
          return n == null ? r : io(n, o);
        };
      }
      var A7 = od(), P7 = od(!0);
      function e1() {
        return [];
      }
      function t1() {
        return !1;
      }
      function I7() {
        return {};
      }
      function E7() {
        return "";
      }
      function H7() {
        return !0;
      }
      function R7(n, o) {
        if (n = Le(n), n < 1 || n > Ae)
          return [];
        var s = _e, d = Lt(n, _e);
        o = he(o), n -= _e;
        for (var v = il(d, o); ++s < n; )
          o(s);
        return v;
      }
      function V7(n) {
        return Me(n) ? nt(n, jn) : an(n) ? [n] : zt(Cd(Ne(n)));
      }
      function Y7(n) {
        var o = ++X5;
        return Ne(n) + o;
      }
      var B7 = Ns(function(n, o) {
        return n + o;
      }, 0), W7 = Tl("ceil"), F7 = Ns(function(n, o) {
        return n / o;
      }, 1), N7 = Tl("floor");
      function j7(n) {
        return n && n.length ? Hs(n, Xt, gl) : r;
      }
      function U7(n, o) {
        return n && n.length ? Hs(n, he(o, 2), gl) : r;
      }
      function Z7(n) {
        return sc(n, Xt);
      }
      function z7(n, o) {
        return sc(n, he(o, 2));
      }
      function q7(n) {
        return n && n.length ? Hs(n, Xt, Cl) : r;
      }
      function G7(n, o) {
        return n && n.length ? Hs(n, he(o, 2), Cl) : r;
      }
      var X7 = Ns(function(n, o) {
        return n * o;
      }, 1), K7 = Tl("round"), J7 = Ns(function(n, o) {
        return n - o;
      }, 0);
      function Q7(n) {
        return n && n.length ? ol(n, Xt) : 0;
      }
      function ev(n, o) {
        return n && n.length ? ol(n, he(o, 2)) : 0;
      }
      return y.after = w8, y.ary = Td, y.assign = u9, y.assignIn = Ud, y.assignInWith = na, y.assignWith = c9, y.at = d9, y.before = Ad, y.bind = Nl, y.bindAll = g7, y.bindKey = Pd, y.castArray = I8, y.chain = Od, y.chunk = N6, y.compact = j6, y.concat = U6, y.cond = m7, y.conforms = y7, y.constant = Xl, y.countBy = Q4, y.create = f9, y.curry = Id, y.curryRight = Ed, y.debounce = Hd, y.defaults = h9, y.defaultsDeep = p9, y.defer = k8, y.delay = $8, y.difference = Z6, y.differenceBy = z6, y.differenceWith = q6, y.drop = G6, y.dropRight = X6, y.dropRightWhile = K6, y.dropWhile = J6, y.fill = Q6, y.filter = t8, y.flatMap = o8, y.flatMapDeep = i8, y.flatMapDepth = s8, y.flatten = $d, y.flattenDeep = e4, y.flattenDepth = t4, y.flip = M8, y.flow = C7, y.flowRight = b7, y.fromPairs = n4, y.functions = b9, y.functionsIn = w9, y.groupBy = a8, y.initial = o4, y.intersection = i4, y.intersectionBy = s4, y.intersectionWith = a4, y.invert = $9, y.invertBy = M9, y.invokeMap = u8, y.iteratee = Kl, y.keyBy = c8, y.keys = yt, y.keysIn = Gt, y.map = Xs, y.mapKeys = S9, y.mapValues = O9, y.matches = w7, y.matchesProperty = k7, y.memoize = Js, y.merge = L9, y.mergeWith = Zd, y.method = $7, y.methodOf = M7, y.mixin = Jl, y.negate = Qs, y.nthArg = S7, y.omit = x9, y.omitBy = T9, y.once = D8, y.orderBy = d8, y.over = O7, y.overArgs = S8, y.overEvery = L7, y.overSome = x7, y.partial = jl, y.partialRight = Rd, y.partition = f8, y.pick = A9, y.pickBy = zd, y.property = ef, y.propertyOf = T7, y.pull = d4, y.pullAll = Dd, y.pullAllBy = f4, y.pullAllWith = h4, y.pullAt = p4, y.range = A7, y.rangeRight = P7, y.rearg = O8, y.reject = v8, y.remove = v4, y.rest = L8, y.reverse = Wl, y.sampleSize = m8, y.set = I9, y.setWith = E9, y.shuffle = y8, y.slice = g4, y.sortBy = b8, y.sortedUniq = k4, y.sortedUniqBy = $4, y.split = o7, y.spread = x8, y.tail = M4, y.take = D4, y.takeRight = S4, y.takeRightWhile = O4, y.takeWhile = L4, y.tap = j4, y.throttle = T8, y.thru = Gs, y.toArray = Fd, y.toPairs = qd, y.toPairsIn = Gd, y.toPath = V7, y.toPlainObject = jd, y.transform = H9, y.unary = A8, y.union = x4, y.unionBy = T4, y.unionWith = A4, y.uniq = P4, y.uniqBy = I4, y.uniqWith = E4, y.unset = R9, y.unzip = Fl, y.unzipWith = Sd, y.update = V9, y.updateWith = Y9, y.values = No, y.valuesIn = B9, y.without = H4, y.words = Jd, y.wrap = P8, y.xor = R4, y.xorBy = V4, y.xorWith = Y4, y.zip = B4, y.zipObject = W4, y.zipObjectDeep = F4, y.zipWith = N4, y.entries = qd, y.entriesIn = Gd, y.extend = Ud, y.extendWith = na, Jl(y, y), y.add = B7, y.attempt = Qd, y.camelCase = j9, y.capitalize = Xd, y.ceil = W7, y.clamp = W9, y.clone = E8, y.cloneDeep = R8, y.cloneDeepWith = V8, y.cloneWith = H8, y.conformsTo = Y8, y.deburr = Kd, y.defaultTo = _7, y.divide = F7, y.endsWith = U9, y.eq = Tn, y.escape = Z9, y.escapeRegExp = z9, y.every = e8, y.find = n8, y.findIndex = wd, y.findKey = v9, y.findLast = r8, y.findLastIndex = kd, y.findLastKey = g9, y.floor = N7, y.forEach = Ld, y.forEachRight = xd, y.forIn = m9, y.forInRight = y9, y.forOwn = _9, y.forOwnRight = C9, y.get = zl, y.gt = B8, y.gte = W8, y.has = k9, y.hasIn = ql, y.head = Md, y.identity = Xt, y.includes = l8, y.indexOf = r4, y.inRange = F9, y.invoke = D9, y.isArguments = lo, y.isArray = Me, y.isArrayBuffer = F8, y.isArrayLike = qt, y.isArrayLikeObject = ct, y.isBoolean = N8, y.isBuffer = Br, y.isDate = j8, y.isElement = U8, y.isEmpty = Z8, y.isEqual = z8, y.isEqualWith = q8, y.isError = Ul, y.isFinite = G8, y.isFunction = hr, y.isInteger = Vd, y.isLength = ea, y.isMap = Yd, y.isMatch = X8, y.isMatchWith = K8, y.isNaN = J8, y.isNative = Q8, y.isNil = t9, y.isNull = e9, y.isNumber = Bd, y.isObject = ot, y.isObjectLike = lt, y.isPlainObject = Ei, y.isRegExp = Zl, y.isSafeInteger = n9, y.isSet = Wd, y.isString = ta, y.isSymbol = an, y.isTypedArray = Fo, y.isUndefined = r9, y.isWeakMap = o9, y.isWeakSet = i9, y.join = l4, y.kebabCase = q9, y.last = _n, y.lastIndexOf = u4, y.lowerCase = G9, y.lowerFirst = X9, y.lt = s9, y.lte = a9, y.max = j7, y.maxBy = U7, y.mean = Z7, y.meanBy = z7, y.min = q7, y.minBy = G7, y.stubArray = e1, y.stubFalse = t1, y.stubObject = I7, y.stubString = E7, y.stubTrue = H7, y.multiply = X7, y.nth = c4, y.noConflict = D7, y.noop = Ql, y.now = Ks, y.pad = K9, y.padEnd = J9, y.padStart = Q9, y.parseInt = e7, y.random = N9, y.reduce = h8, y.reduceRight = p8, y.repeat = t7, y.replace = n7, y.result = P9, y.round = K7, y.runInContext = O, y.sample = g8, y.size = _8, y.snakeCase = r7, y.some = C8, y.sortedIndex = m4, y.sortedIndexBy = y4, y.sortedIndexOf = _4, y.sortedLastIndex = C4, y.sortedLastIndexBy = b4, y.sortedLastIndexOf = w4, y.startCase = i7, y.startsWith = s7, y.subtract = J7, y.sum = Q7, y.sumBy = ev, y.template = a7, y.times = R7, y.toFinite = pr, y.toInteger = Le, y.toLength = Nd, y.toLower = l7, y.toNumber = Cn, y.toSafeInteger = l9, y.toString = Ne, y.toUpper = u7, y.trim = c7, y.trimEnd = d7, y.trimStart = f7, y.truncate = h7, y.unescape = p7, y.uniqueId = Y7, y.upperCase = v7, y.upperFirst = Gl, y.each = Ld, y.eachRight = xd, y.first = Md, Jl(y, function() {
        var n = {};
        return Fn(y, function(o, s) {
          je.call(y.prototype, s) || (n[s] = o);
        }), n;
      }(), { chain: !1 }), y.VERSION = i, pn(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n) {
        y[n].placeholder = y;
      }), pn(["drop", "take"], function(n, o) {
        He.prototype[n] = function(s) {
          s = s === r ? 1 : mt(Le(s), 0);
          var d = this.__filtered__ && !o ? new He(this) : this.clone();
          return d.__filtered__ ? d.__takeCount__ = Lt(s, d.__takeCount__) : d.__views__.push({
            size: Lt(s, _e),
            type: n + (d.__dir__ < 0 ? "Right" : "")
          }), d;
        }, He.prototype[n + "Right"] = function(s) {
          return this.reverse()[n](s).reverse();
        };
      }), pn(["filter", "map", "takeWhile"], function(n, o) {
        var s = o + 1, d = s == Ce || s == Oe;
        He.prototype[n] = function(v) {
          var _ = this.clone();
          return _.__iteratees__.push({
            iteratee: he(v, 3),
            type: s
          }), _.__filtered__ = _.__filtered__ || d, _;
        };
      }), pn(["head", "last"], function(n, o) {
        var s = "take" + (o ? "Right" : "");
        He.prototype[n] = function() {
          return this[s](1).value()[0];
        };
      }), pn(["initial", "tail"], function(n, o) {
        var s = "drop" + (o ? "" : "Right");
        He.prototype[n] = function() {
          return this.__filtered__ ? new He(this) : this[s](1);
        };
      }), He.prototype.compact = function() {
        return this.filter(Xt);
      }, He.prototype.find = function(n) {
        return this.filter(n).head();
      }, He.prototype.findLast = function(n) {
        return this.reverse().find(n);
      }, He.prototype.invokeMap = Pe(function(n, o) {
        return typeof n == "function" ? new He(this) : this.map(function(s) {
          return Li(s, n, o);
        });
      }), He.prototype.reject = function(n) {
        return this.filter(Qs(he(n)));
      }, He.prototype.slice = function(n, o) {
        n = Le(n);
        var s = this;
        return s.__filtered__ && (n > 0 || o < 0) ? new He(s) : (n < 0 ? s = s.takeRight(-n) : n && (s = s.drop(n)), o !== r && (o = Le(o), s = o < 0 ? s.dropRight(-o) : s.take(o - n)), s);
      }, He.prototype.takeRightWhile = function(n) {
        return this.reverse().takeWhile(n).reverse();
      }, He.prototype.toArray = function() {
        return this.take(_e);
      }, Fn(He.prototype, function(n, o) {
        var s = /^(?:filter|find|map|reject)|While$/.test(o), d = /^(?:head|last)$/.test(o), v = y[d ? "take" + (o == "last" ? "Right" : "") : o], _ = d || /^find/.test(o);
        v && (y.prototype[o] = function() {
          var w = this.__wrapped__, S = d ? [1] : arguments, x = w instanceof He, F = S[0], j = x || Me(w), z = function(Ie) {
            var Ye = v.apply(y, Pr([Ie], S));
            return d && te ? Ye[0] : Ye;
          };
          j && s && typeof F == "function" && F.length != 1 && (x = j = !1);
          var te = this.__chain__, ce = !!this.__actions__.length, pe = _ && !te, Te = x && !ce;
          if (!_ && j) {
            w = Te ? w : new He(this);
            var ve = n.apply(w, S);
            return ve.__actions__.push({ func: Gs, args: [z], thisArg: r }), new gn(ve, te);
          }
          return pe && Te ? n.apply(this, S) : (ve = this.thru(z), pe ? d ? ve.value()[0] : ve.value() : ve);
        });
      }), pn(["pop", "push", "shift", "sort", "splice", "unshift"], function(n) {
        var o = bs[n], s = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru", d = /^(?:pop|shift)$/.test(n);
        y.prototype[n] = function() {
          var v = arguments;
          if (d && !this.__chain__) {
            var _ = this.value();
            return o.apply(Me(_) ? _ : [], v);
          }
          return this[s](function(w) {
            return o.apply(Me(w) ? w : [], v);
          });
        };
      }), Fn(He.prototype, function(n, o) {
        var s = y[o];
        if (s) {
          var d = s.name + "";
          je.call(Ro, d) || (Ro[d] = []), Ro[d].push({ name: o, func: s });
        }
      }), Ro[Fs(r, D).name] = [{
        name: "wrapper",
        func: r
      }], He.prototype.clone = p3, He.prototype.reverse = v3, He.prototype.value = g3, y.prototype.at = U4, y.prototype.chain = Z4, y.prototype.commit = z4, y.prototype.next = q4, y.prototype.plant = X4, y.prototype.reverse = K4, y.prototype.toJSON = y.prototype.valueOf = y.prototype.value = J4, y.prototype.first = y.prototype.head, wi && (y.prototype[wi] = G4), y;
    }, Io = z5();
    eo ? ((eo.exports = Io)._ = Io, Ka._ = Io) : $t._ = Io;
  }).call(Fi);
})(Ia, Ia.exports);
var Un = Ia.exports;
const RE = { class: "filter-yui-kit" }, VE = {
  key: 0,
  class: "counter-yui-kit__value"
}, YE = { class: "counter-yui-kit__list" }, BE = { class: "counter-yui-kit__list-wrapper" }, WE = {
  class: "filter-yui-kit__select-list select-yui-kit-counter",
  style: "padding: 2px; gap: 2px"
}, FE = {
  key: 1,
  class: "filter-yui-kit__select-list"
}, NE = ["onClick"], jE = /* @__PURE__ */ oe({
  __name: "Filter",
  props: {
    title: {},
    iconName: { default: xe.filter },
    multiselect: { type: Boolean, default: !1 },
    options: {},
    defaultValue: {},
    closeOnSelect: { type: Boolean },
    searchable: { type: Boolean }
  },
  emits: ["scroll"],
  setup(e, { emit: t }) {
    const r = e, i = Fe({
      options: [],
      isShow: !1,
      searchString: "",
      choosenStatus: !1,
      searchItems: []
    }), a = t, l = T(() => ({
      "filter-yui-kit__counter": !0,
      "counter-yui-kit": !0,
      "counter-yui-kit--search": r.searchable
    })), u = T(() => ({
      "filter-yui-kit__select-list": !0,
      "selected-yui-kit": !0,
      "selected-yui-kit--search": r.searchable,
      "border-none-yui-kit": r.searchable && b.value.length < 2
    })), c = T(() => ({
      "filter-yui-kit__wrapper": !0,
      "active-yui-kit": i.isShow,
      "filter-yui-kit--search": r.searchable
    })), f = T(() => {
      var I, U;
      return b.value.length > 1 && r.searchable ? (I = b.value[1]) == null ? void 0 : I.value : (U = b.value[0]) == null ? void 0 : U.value;
    }), h = Object.values(ut), p = (I) => {
      i.searchString = I.trim();
    }, m = (I) => {
      setTimeout(() => {
        i.searchString = I;
      }, 1e3);
    }, C = () => i.isShow = !i.isShow, g = (I) => {
      I.stopPropagation(), i.options.forEach(
        (U, E) => D(U, E)
      ), i.isShow = !1;
    }, b = T(() => {
      let I = i.options.filter((U) => U.choose);
      return r.searchable && I.length > 1 && (I = I.filter(
        (U) => U.type !== ut.default
      )), I;
    }), M = T(
      () => i.options.filter((I) => {
        let U = !0;
        return i.searchString && (U = I.value.toLowerCase().includes(i.searchString.toLowerCase()), U) ? I : !I.choose && U;
      })
    ), A = (I) => {
      r.multiselect || i.options.forEach(
        (U) => U !== I && (U.choose = !1)
      ), I.choose = !I.choose, b.value.length || i.options.forEach((U, E) => {
        D(U, E);
      });
    }, D = (I, U) => {
      typeof r.defaultValue == "string" && I.value === r.defaultValue ? I.choose = !0 : Un.isArray(r.defaultValue) ? r.defaultValue.forEach(
        (ee) => ee === I.value && (I.choose = !0)
      ) : I.choose = U === 0;
    }, Y = () => {
      i.isShow = !1, i.searchString && (i.searchString = "");
    }, K = (I) => {
      const U = I.target;
      U.scrollHeight - U.scrollTop === U.clientHeight && a("scroll", !0);
    }, H = T(
      () => {
        var I, U, E;
        return b.value.length <= 1 && r.searchable ? ((I = b.value[0]) == null ? void 0 : I.type) === ut.default || (U = b.value[0]) == null ? void 0 : U.type : (E = b.value[0]) == null ? void 0 : E.type;
      }
    );
    return ze(() => {
      i.options = r.options.map(
        (I, U) => {
          const E = {
            value: typeof I == "string" ? I : I.value,
            type: typeof I == "string" ? "blue" : I.type,
            choose: !1
          };
          return D(E, U), r.searchable && E.type === ut.default && (E.value = "Не выбрано"), E;
        }
      );
    }), (I, U) => ($(), P("div", RE, [
      V("div", {
        class: le(c.value),
        onClick: C
      }, [
        J(Ee, {
          name: r.iconName
        }, null, 8, ["name"]),
        V("span", null, ye(r.title), 1),
        J(Dt, {
          disabled: !0,
          type: H.value,
          text: f.value,
          style: "margin:0 3px;"
        }, null, 8, ["type", "text"]),
        V("div", {
          class: le(l.value)
        }, [
          b.value.length > 1 ? ($(), P("span", VE, ye("+" + b.value.length), 1)) : ne("", !0),
          V("div", YE, [
            V("div", BE, [
              V("ul", WE, [
                ($(!0), P(Re, null, Ze(b.value, (E, ee) => ($(), P("li", {
                  class: "filter-yui-kit__select-item",
                  key: E.value
                }, [
                  J(Dt, {
                    type: r.searchable ? L(ut).blue : L(h)[ee],
                    disabled: !0,
                    text: E.value
                  }, null, 8, ["type", "text"])
                ]))), 128))
              ])
            ])
          ])
        ], 2),
        V("button", {
          type: "button",
          class: "filter-yui-kit__close",
          onClick: kn(g, ["stop"])
        }, [
          J(Ee, {
            name: L(xe).exitBig
          }, null, 8, ["name"])
        ])
      ], 2),
      i.isShow ? ($(), P("div", {
        key: 0,
        class: "filter-yui-kit__select-wrapper",
        onMouseleave: Y
      }, [
        V("ul", {
          class: le(u.value)
        }, [
          ($(!0), P(Re, null, Ze(b.value, (E, ee) => ($(), P("li", {
            class: "filter-yui-kit__select-item",
            key: E.value
          }, [
            J(Dt, {
              disabled: !0,
              choosed: E.choose,
              type: r.searchable ? L(ut).blue : L(h)[ee],
              onClick: (ue) => A(E),
              text: E.value
            }, null, 8, ["choosed", "type", "onClick", "text"])
          ]))), 128))
        ], 2),
        r.searchable ? ($(), ge(ds, {
          key: 0,
          onEnter: p,
          onInput: m,
          style: { margin: "5px 0" }
        })) : ne("", !0),
        i.isShow && !r.searchable ? ($(), P("ul", FE, [
          ($(!0), P(Re, null, Ze(M.value, (E, ee) => ($(), P("li", {
            class: "filter-yui-kit__select-item",
            key: E.value,
            style: Pt(ee === 0 ? { paddingTop: "10px" } : "")
          }, [
            E.choose ? ne("", !0) : ($(), ge(Dt, {
              key: 0,
              disabled: !0,
              choosed: E.choose,
              type: L(h)[ee],
              text: E.value,
              onClick: (ue) => A(E)
            }, null, 8, ["choosed", "type", "text", "onClick"]))
          ], 4))), 128))
        ])) : ne("", !0),
        i.isShow && r.searchable ? ($(), P("ul", {
          key: 2,
          class: "filter-yui-kit__select-list filter-yui-kit__select-list--search",
          onScroll: K
        }, [
          ($(!0), P(Re, null, Ze(M.value, (E) => ($(), P("li", {
            class: "filter-yui-kit__select-item",
            key: E.value,
            onClick: (ee) => A(E)
          }, ye(E.value), 9, NE))), 128))
        ], 32)) : ne("", !0)
      ], 32)) : ne("", !0)
    ]));
  }
}), Gh = /* @__PURE__ */ be(jE, [["__scopeId", "data-v-f15cc790"]]), UE = ["aria-label"], ZE = /* @__PURE__ */ oe({
  name: "Tooltip",
  __name: "Tooltip",
  props: {
    hint: {},
    isShow: { type: Boolean, default: !1 },
    isCanShow: { type: Boolean, default: !0 },
    position: { default: "bottom-center" },
    size: { default: "small" },
    type: { default: "black" },
    hintGap: {}
  },
  setup(e) {
    const t = e, r = ie(!1), i = ie(null), a = ie(null), l = T(() => [
      {
        "tooltip-yui-kit__hint_show": t.isShow || r.value,
        "tooltip-yui-kit__hint_bottom-center": t.position === "bottom-center",
        "tooltip-yui-kit__hint_bottom-left": t.position === "bottom-left",
        "tooltip-yui-kit__hint_bottom-right": t.position === "bottom-right",
        "tooltip-yui-kit__hint_top-center": t.position === "top-center",
        "tooltip-yui-kit__hint_top-left": t.position === "top-left",
        "tooltip-yui-kit__hint_top-right": t.position === "top-right",
        "tooltip-yui-kit__hint_left-top": t.position === "left-top",
        "tooltip-yui-kit__hint_left-center": t.position === "left-center",
        "tooltip-yui-kit__hint_left-bottom": t.position === "left-bottom",
        "tooltip-yui-kit__hint_right-top": t.position === "right-top",
        "tooltip-yui-kit__hint_right-center": t.position === "right-center",
        "tooltip-yui-kit__hint_right-bottom": t.position === "right-bottom",
        "tooltip-yui-kit__hint_small": t.size === "small",
        "tooltip-yui-kit__hint_medium": t.size === "medium",
        "tooltip-yui-kit__hint_large": t.size === "large",
        "tooltip-yui-kit__hint_black": t.type === "black",
        "tooltip-yui-kit__hint_blue": t.type === "blue",
        "tooltip-yui-kit__hint_white": t.type === "white"
      }
    ]), u = () => {
      r.value = !0;
    }, c = () => {
      r.value = !1;
    };
    return (f, h) => ($(), P("div", {
      ref_key: "tooltipRef",
      ref: i,
      class: "tooltip-yui-kit",
      "aria-label": f.hint,
      onMouseenter: u,
      onMouseleave: c
    }, [
      Be(f.$slots, "default", {}, void 0, !0),
      f.isCanShow ? ($(), P("div", {
        key: 0,
        ref_key: "hintRef",
        ref: a,
        class: le(["tooltip-yui-kit__hint", l.value])
      }, ye(f.hint), 3)) : ne("", !0)
    ], 40, UE));
  }
}), fs = /* @__PURE__ */ be(ZE, [["__scopeId", "data-v-b859a31a"]]), zE = (e) => (er("data-v-fe7d7eee"), e = e(), tr(), e), qE = { class: "filter__options-list" }, GE = /* @__PURE__ */ zE(() => /* @__PURE__ */ V("li", { class: "filter__options-underline" }, [
  /* @__PURE__ */ V("hr", { class: "filter__options-underline-hr" })
], -1)), XE = /* @__PURE__ */ oe({
  __name: "Filter",
  props: {
    options: {},
    title: {},
    noOptionText: { default: "Не выбран" },
    enableClearAll: { type: Boolean, default: !1 },
    defaultOption: {},
    class: {},
    disabled: { type: Boolean }
  },
  emits: ["change", "search"],
  setup(e, { emit: t }) {
    const r = e, i = Fe({
      choosedOption: r.defaultOption || r.noOptionText,
      defaultOption: r.defaultOption || r.noOptionText,
      tooltipText: "",
      searchData: "",
      options: [
        {
          key: "",
          value: ""
        }
      ],
      optionStrings: [""],
      isOpened: !1,
      isNoOpen: !1,
      isClear: !1
    }), a = ie(null), l = T(
      () => i.optionStrings.filter(
        (g) => g.toLowerCase().includes(i.searchData.toLowerCase())
      )
    ), u = T(() => {
      var g;
      return !!((g = a.value) != null && g.isSpanOverflow);
    }), c = t, f = (g) => {
      i.isOpened = g;
    }, h = () => {
      i.isOpened = !1, i.isClear = !1, i.isNoOpen = !0, i.choosedOption = r.noOptionText, i.defaultOption = r.noOptionText, setTimeout(() => i.isNoOpen = !1, 1), c("change", r.noOptionText);
    }, p = (g) => {
      var b;
      i.choosedOption = ((b = i.options.find((M) => M.value === g)) == null ? void 0 : b.key) || "", i.isOpened = !1, i.isClear = !0, i.tooltipText = g, c("change", g);
    }, m = (g) => {
      i.defaultOption && (i.isClear = !g, g && (i.choosedOption = r.noOptionText, i.tooltipText = ""), c("change", r.noOptionText));
    }, C = () => {
      r.options.every((g) => typeof g == "string") ? i.options = r.options.map((g) => ({ key: g, value: g })) : i.options = r.options, i.optionStrings = i.options.map((g) => g.value);
    };
    return ze(() => {
      C();
    }), $e(
      () => r.options,
      () => {
        C();
      },
      { deep: !0 }
    ), $e(
      () => r.defaultOption,
      () => {
        var g;
        r.defaultOption && (i.defaultOption = r.defaultOption, i.choosedOption = r.defaultOption, i.tooltipText = ((g = i.options.find((b) => b.key === r.defaultOption)) == null ? void 0 : g.value) || r.defaultOption || "");
      },
      { deep: !0 }
    ), (g, b) => {
      const M = In("YIcon"), A = In("YButton");
      return $(), ge(ui, {
        onChange: f,
        "is-opened": i.isOpened,
        "disable-open": i.isNoOpen,
        class: le(r.class),
        "header-classes": "filter__header",
        "options-classes": "filter__options"
      }, {
        header: me(() => [
          V("span", {
            class: le([
              "filter__header-title",
              { "filter__header-title__active": i.isOpened }
            ])
          }, ye(r.title), 3),
          J(fs, {
            class: "filter__header-tooltip",
            type: "blue",
            hint: i.choosedOption,
            "hint-gap": 28,
            "is-can-show": u.value,
            position: "top-center"
          }, {
            default: me(() => [
              J(Dt, {
                ref_key: "badgesRef",
                ref: a,
                type: i.choosedOption === r.noOptionText ? L(ut).default : L(ut).blue,
                class: "filter__options-badge",
                text: i.choosedOption,
                disabled: ""
              }, null, 8, ["type", "text"])
            ]),
            _: 1
          }, 8, ["hint", "is-can-show"]),
          r.enableClearAll && i.isClear ? ($(), ge(A, {
            key: 0,
            onClick: h,
            type: L(Wt).ghost,
            size: L(as).small
          }, {
            default: me(() => [
              J(M, {
                name: L(xe).crossLarge,
                width: "16",
                height: "16"
              }, null, 8, ["name"])
            ]),
            _: 1
          }, 8, ["type", "size"])) : ne("", !0)
        ]),
        options: me(() => [
          !r.enableClearAll && i.choosedOption !== r.noOptionText ? ($(), ge(Dt, {
            key: 0,
            type: L(ut).blue,
            class: "filter__options-badge selected-badge",
            text: i.choosedOption,
            onChoose: m,
            disabled: "",
            choosed: ""
          }, null, 8, ["type", "text"])) : ne("", !0),
          J(ds, {
            "show-history": !1,
            modelValue: i.searchData,
            "onUpdate:modelValue": b[0] || (b[0] = (D) => i.searchData = D)
          }, null, 8, ["modelValue"]),
          V("div", qE, [
            J(Ha, {
              class: "filter__options-option",
              options: l.value,
              "default-option": i.choosedOption,
              onChange: p
            }, {
              default: me(() => [
                GE
              ]),
              _: 1
            }, 8, ["options", "default-option"])
          ])
        ]),
        _: 1
      }, 8, ["is-opened", "disable-open", "class"]);
    };
  }
}), Xh = /* @__PURE__ */ be(XE, [["__scopeId", "data-v-fe7d7eee"]]), KE = ["placeholder"], JE = /* @__PURE__ */ oe({
  __name: "Combobox",
  props: {
    options: {},
    placeholder: {},
    disableOpen: { type: Boolean },
    defaultOption: {},
    class: {},
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change", "error", "focusout-option"],
  setup(e, { emit: t }) {
    const r = t, i = e, a = Fe({
      isOpened: !1,
      placeholder: i.placeholder,
      values: i.options,
      searchValue: ""
    }), l = () => {
      r("focusout-option");
    }, u = (h) => {
      var p;
      (((p = a.values) == null ? void 0 : p.length) != 0 || !i.disableOpen) && (a.isOpened = h, !a.isOpened && a.searchValue != "" && r("error"));
    };
    It(() => a.values = i.options), It(() => a.searchValue = i.defaultOption || ""), $e(
      () => a.searchValue,
      () => {
        a.searchValue == "" && (a.values = i.options);
      }
    );
    const c = () => {
      var h;
      a.isOpened = !0, a.values = i.options.filter(
        (p) => a.searchValue.toLowerCase().split(" ").every((m) => p.toLowerCase().includes(m))
      ), r("change", a.searchValue), ((h = a.values) == null ? void 0 : h.length) == 0 && (a.isOpened = !1);
    }, f = (h) => {
      a.searchValue = h, a.isOpened = !1, r("change", h);
    };
    return (h, p) => {
      var m;
      return $(), ge(ui, {
        onChange: u,
        "is-opened": a.isOpened,
        "disable-open": ((m = a.values) == null ? void 0 : m.length) == 0,
        class: le(i.class),
        disabled: i.disabled,
        onFocusoutOptions: l,
        "header-classes": "filter__header",
        "options-classes": "filter__options"
      }, {
        header: me(() => [
          jt(V("input", {
            type: "search",
            class: "combobox__input",
            "onUpdate:modelValue": p[0] || (p[0] = (C) => a.searchValue = C),
            placeholder: a.placeholder,
            onKeydown: _o(c, ["enter"]),
            onInput: c
          }, null, 40, KE), [
            [ss, a.searchValue]
          ])
        ]),
        options: me(() => [
          J(Ha, {
            "default-option": a.searchValue,
            options: a.values,
            onChange: f
          }, null, 8, ["default-option", "options"])
        ]),
        _: 1
      }, 8, ["is-opened", "disable-open", "class", "disabled"]);
    };
  }
}), Kh = /* @__PURE__ */ be(JE, [["__scopeId", "data-v-fd34a13c"]]);
var Jh = /* @__PURE__ */ ((e) => (e.text = "text", e.email = "email", e.password = "password", e.tel = "tel", e.url = "url", e.week = "week", e))(Jh || {});
const QE = {
  key: 0,
  class: "input-yui-kit__legend"
}, eH = {
  key: 0,
  class: "input-yui-kit__star"
}, tH = ["type", "autocomplete", "placeholder", "required"], nH = /* @__PURE__ */ oe({
  __name: "Input",
  props: {
    placeholder: {},
    inputMessage: { default: "" },
    type: { default: Jh.text },
    required: { type: Boolean, default: !1 },
    modelValue: { default: "" },
    hideClearButton: { type: Boolean, default: !1 },
    autocomplete: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const r = t, i = e, a = Fe({
      isPressed: !1,
      inputElement: i.modelValue
    }), l = ie(null), u = () => {
      var p;
      a.inputElement = "", (p = l.value) == null || p.focus(), r("update:modelValue", "");
    }, c = () => {
      r("update:modelValue", a.inputElement);
    }, f = () => {
      a.isPressed = !0;
    }, h = () => {
      a.isPressed = !1;
    };
    return $e(
      () => i.modelValue,
      (p) => {
        a.inputElement = p;
      }
    ), $e(
      () => a.inputElement,
      (p) => {
        i.modelValue != p && (a.isPressed = (p == null ? void 0 : p.length) > 0, a.inputElement = p);
      }
    ), (p, m) => ($(), P("fieldset", {
      class: le(["input-yui-kit", {
        pressed: a.isPressed
      }]),
      onFocusout: h
    }, [
      i.inputMessage ? ($(), P("legend", QE, [
        Qn(ye(i.inputMessage), 1),
        i.required ? ($(), P("sup", eH, "*")) : ne("", !0)
      ])) : ne("", !0),
      jt(V("input", {
        ref_key: "inputRef",
        ref: l,
        "onUpdate:modelValue": m[0] || (m[0] = (C) => a.inputElement = C),
        onFocus: f,
        onInput: c,
        type: i.type,
        autocomplete: i.autocomplete,
        class: "input-yui-kit__input",
        placeholder: i.placeholder,
        required: i.required
      }, null, 40, tH), [
        [av, a.inputElement]
      ]),
      !i.hideClearButton && a.isPressed && a.inputElement ? ($(), ge(yr, {
        key: 1,
        type: L(Wt).ghost,
        class: "input-yui-kit__close",
        onMousedown: kn(u, ["prevent"]),
        tabindex: "-1"
      }, {
        default: me(() => [
          J(Ee, {
            name: L(xe).exitSmall,
            color: "currentColor"
          }, null, 8, ["name"])
        ]),
        _: 1
      }, 8, ["type"])) : ne("", !0)
    ], 34));
  }
}), Qh = /* @__PURE__ */ be(nH, [["__scopeId", "data-v-2445e191"]]), rH = {
  key: 0,
  class: "input-yui-kit__legend"
}, oH = {
  key: 0,
  class: "input-yui-kit__star"
}, iH = ["required", "min", "max"], sH = { class: "input-yui-kit__buttons" }, aH = ["disabled"], lH = ["disabled"], uH = /* @__PURE__ */ oe({
  __name: "InputNumber",
  props: {
    inputMessage: {},
    modelValue: { default: 0 },
    required: { type: Boolean },
    min: { default: -1 / 0 },
    max: { default: 1 / 0 },
    size: { default: as.medium }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const r = t, i = e, a = Fe({
      isPressed: !1,
      inputElement: i.modelValue || (i.min > 0 ? i.min : 0)
    }), l = ie(null), u = (m) => {
      const g = +m.currentTarget.value;
      g > i.max ? a.inputElement = i.max : g < i.min ? a.inputElement = i.min : a.inputElement = g, r("update:modelValue", a.inputElement);
    }, c = () => {
      a.isPressed = !0;
    }, f = () => {
      (a.inputElement === null || isNaN(a.inputElement)) && (a.inputElement = i.min > 0 ? i.min : 0), r("update:modelValue", a.inputElement), a.isPressed = !1;
    }, h = () => {
      var m;
      a.inputElement < i.max && (a.inputElement = +a.inputElement + 1, r("update:modelValue", a.inputElement), (m = l.value) == null || m.focus());
    }, p = () => {
      var m;
      Number(a.inputElement) - 1 >= i.min && (a.inputElement = +a.inputElement - 1, r("update:modelValue", a.inputElement), (m = l.value) == null || m.focus());
    };
    return $e(
      () => i.modelValue,
      (m) => {
        a.inputElement = m;
      }
    ), (m, C) => ($(), P("fieldset", {
      class: le(["input-yui-kit initial", {
        pressed: a.isPressed,
        [i.size]: !0
      }]),
      onFocusout: f
    }, [
      i.inputMessage ? ($(), P("legend", rH, [
        Qn(ye(i.inputMessage), 1),
        i.required ? ($(), P("sup", oH, "*")) : ne("", !0)
      ])) : ne("", !0),
      jt(V("input", {
        ref_key: "inputNumberRef",
        ref: l,
        "onUpdate:modelValue": C[0] || (C[0] = (g) => a.inputElement = g),
        onFocus: c,
        onInput: u,
        class: "input-yui-kit__input",
        required: i.required,
        min: i.min,
        max: i.max,
        type: "number"
      }, null, 40, iH), [
        [ss, a.inputElement]
      ]),
      V("div", sH, [
        V("button", {
          class: "input-yui-kit__button-up",
          onMousedown: kn(h, ["prevent"]),
          disabled: a.inputElement >= i.max
        }, [
          J(Ee, {
            name: L(xe).chevronUp
          }, null, 8, ["name"])
        ], 40, aH),
        V("button", {
          class: "input-yui-kit__button-down",
          onMousedown: kn(p, ["prevent"]),
          disabled: a.inputElement <= i.min
        }, [
          J(Ee, {
            name: L(xe).chevronDown
          }, null, 8, ["name"])
        ], 40, lH)
      ])
    ], 34));
  }
}), ep = /* @__PURE__ */ be(uH, [["__scopeId", "data-v-c3b1bb34"]]), cH = "data:image/svg+xml,%3csvg%20width='111'%20height='111'%20viewBox='0%200%20111%20111'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M106.375%2087.875C106.375%2090.3283%20105.4%2092.681%20103.666%2094.4157C101.931%2096.1504%2099.5783%2097.125%2097.125%2097.125H13.875C11.4217%2097.125%209.06897%2096.1504%207.33426%2094.4157C5.59955%2092.681%204.625%2090.3283%204.625%2087.875V37C4.625%2034.5467%205.59955%2032.194%207.33426%2030.4593C9.06897%2028.7246%2011.4217%2027.75%2013.875%2027.75H32.375L41.625%2013.875H69.375L78.625%2027.75H97.125C99.5783%2027.75%20101.931%2028.7246%20103.666%2030.4593C105.4%2032.194%20106.375%2034.5467%20106.375%2037V87.875Z'%20stroke='%23A6A3AD'%20stroke-width='9.25'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M55.5%2078.625C65.7173%2078.625%2074%2070.3423%2074%2060.125C74%2049.9077%2065.7173%2041.625%2055.5%2041.625C45.2827%2041.625%2037%2049.9077%2037%2060.125C37%2070.3423%2045.2827%2078.625%2055.5%2078.625Z'%20stroke='%23A6A3AD'%20stroke-width='9.25'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e", dH = "data:image/svg+xml,%3csvg%20width='147'%20height='111'%20viewBox='0%200%20147%20111'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M132.938%2087.875C132.938%2090.3283%20131.871%2092.681%20129.973%2094.4157C128.074%2096.1504%20125.499%2097.125%20122.814%2097.125H31.6978C29.0128%2097.125%2026.4377%2096.1504%2024.5391%2094.4157C22.6405%2092.681%2021.5738%2090.3283%2021.5738%2087.875V37C21.5738%2034.5467%2022.6405%2032.194%2024.5391%2030.4593C26.4377%2028.7246%2029.0128%2027.75%2031.6978%2027.75H51.9459L62.0699%2013.875H92.4419L102.566%2027.75H122.814C125.499%2027.75%20128.074%2028.7246%20129.973%2030.4593C131.871%2032.194%20132.938%2034.5467%20132.938%2037V87.875Z'%20stroke='%23A6A3AD'%20stroke-width='9.25'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M77.2559%2078.625C88.4386%2078.625%2097.5039%2070.3423%2097.5039%2060.125C97.5039%2049.9077%2088.4386%2041.625%2077.2559%2041.625C66.0732%2041.625%2057.0079%2049.9077%2057.0079%2060.125C57.0079%2070.3423%2066.0732%2078.625%2077.2559%2078.625Z'%20stroke='%23A6A3AD'%20stroke-width='9.25'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15%2026L138.699%2097.4178'%20stroke='%23A6A3AD'%20stroke-width='10'%20stroke-linecap='round'/%3e%3c/svg%3e";
var tp = /* @__PURE__ */ ((e) => (e.jpg = "jpg", e.png = "png", e.jpeg = "jpeg", e.webp = "webp", e.svg = "svg", e.pdf = "pdf", e))(tp || {}), np = /* @__PURE__ */ ((e) => (e.mp4 = "mp4", e.mp3 = "mp3", e.avif = "avif", e))(np || {});
const wu = (e) => (er("data-v-2c6e1bf0"), e = e(), tr(), e), fH = { class: "slider-yui-kit" }, hH = {
  class: "slider-yui-kit__wrapper",
  ref: "slider-yui-kitWrapperRef"
}, pH = ["disabled"], vH = { class: "slider-yui-kit__slides" }, gH = {
  key: 0,
  class: "placeholder-yui-kit"
}, mH = /* @__PURE__ */ wu(() => /* @__PURE__ */ V("img", {
  src: cH,
  alt: "",
  width: "111px",
  height: "111px"
}, null, -1)), yH = /* @__PURE__ */ wu(() => /* @__PURE__ */ V("p", null, "Контент отсутствует", -1)), _H = [
  mH,
  yH
], CH = {
  key: 1,
  class: "placeholder-yui-kit"
}, bH = /* @__PURE__ */ wu(() => /* @__PURE__ */ V("img", {
  src: dH,
  alt: "",
  width: "111px",
  height: "111px"
}, null, -1)), wH = ["src"], kH = ["src"], $H = ["disabled"], la = "slider-yui-kit__full-size", MH = /* @__PURE__ */ oe({
  __name: "Slider",
  props: {
    items: {},
    defaultIndex: {}
  },
  setup(e, { expose: t }) {
    const r = e, i = Fe({
      files: r.items.length ? r.items : [],
      file: null,
      currentIndex: r.defaultIndex || 0,
      extension: null
    }), a = ie(null), l = ie(null), u = () => {
      var D;
      return (D = r.items) != null && D.length ? i.currentIndex === r.items.length - 1 : !0;
    }, c = (D) => {
      if (!D) return null;
      const Y = /\.\w+$/, K = D.match(Y);
      return i.extension = K ? K[0].replace(".", "") : null, i.extension;
    }, f = (D) => {
      const Y = c(D);
      return Y ? Object.values(tp).includes(
        Y.toLowerCase()
      ) : !1;
    }, h = (D) => {
      const Y = c(D);
      return Y ? Object.values(np).includes(Y) : !1;
    }, p = (D) => {
      D instanceof KeyboardEvent && D.key === "Escape" && l.value && l.value.classList.contains(la) && (l.value.classList.remove(la), document.body.style.overflow = "auto");
    }, m = (D) => {
      if (D.type === "click") {
        const Y = D.target;
        Y.classList.toggle(la), Y.classList.contains(la) ? (window.addEventListener("keydown", p), a.value && (a.value.style.cursor = "zoom-out")) : (window.removeEventListener("keydown", p), a.value && (a.value.style.cursor = "zoom-in"));
      }
    }, C = () => {
      i.currentIndex--, i.file = i.files[i.currentIndex];
    }, g = () => {
      i.currentIndex++, i.file = i.files[i.currentIndex];
    }, b = () => i.files.length === 0, M = () => {
      var D, Y;
      return f(((D = i.file) == null ? void 0 : D.path) ?? null) == !1 && h(((Y = i.file) == null ? void 0 : Y.path) ?? null) == !1 && i.files.length > 0;
    };
    ze(() => {
      if (!r.items) return 0;
      i.files = r.items, r.defaultIndex && (i.file = i.files[i.currentIndex]), i.file = i.files[i.currentIndex];
    });
    const A = (D) => {
      D >= 0 && D < i.files.length && (i.currentIndex = D, i.file = i.files[i.currentIndex]);
    };
    return $e(
      () => r.items,
      () => {
        i.files = r.items;
      },
      { deep: !0 }
    ), t({
      setSlide: A
    }), (D, Y) => {
      var K, H, I, U;
      return $(), P("div", fH, [
        V("div", hH, [
          V("button", {
            class: "slider-yui-kit__button slider-yui-kit__button--prev",
            onClick: C,
            disabled: i.currentIndex === 0
          }, [
            J(Ee, {
              name: L(xe).leftBig
            }, null, 8, ["name"])
          ], 8, pH),
          V("div", vH, [
            b() ? ($(), P("div", gH, _H)) : ne("", !0),
            M() ? ($(), P("div", CH, [
              bH,
              V("p", null, "." + ye(i.extension), 1)
            ])) : ne("", !0),
            f(((K = i.file) == null ? void 0 : K.path) ?? "") ? ($(), P("img", {
              key: 2,
              onClick: Y[0] || (Y[0] = (E) => m(E)),
              src: ((H = i.file) == null ? void 0 : H.path) ?? "",
              ref_key: "fullsizeImageRef",
              ref: l
            }, null, 8, wH)) : ne("", !0),
            h(((I = i.file) == null ? void 0 : I.path) ?? "") ? ($(), P("video", {
              key: 3,
              onClick: Y[1] || (Y[1] = (E) => m(E)),
              controls: ""
            }, [
              V("source", {
                src: ((U = i.file) == null ? void 0 : U.path) ?? ""
              }, null, 8, kH)
            ])) : ne("", !0)
          ]),
          V("button", {
            class: "slider-yui-kit__button slider-yui-kit__button--next",
            onClick: g,
            disabled: u()
          }, [
            J(Ee, {
              name: L(xe).rightBig
            }, null, 8, ["name"])
          ], 8, $H)
        ], 512)
      ]);
    };
  }
}), rp = /* @__PURE__ */ be(MH, [["__scopeId", "data-v-2c6e1bf0"]]);
var Xo = /* @__PURE__ */ ((e) => (e.small = "small", e.medium = "medium", e.big = "big", e.large = "large", e))(Xo || {});
const DH = ["disabled"], SH = ["id", "disabled"], OH = ["for"], LH = /* @__PURE__ */ oe({
  __name: "Toggle",
  props: /* @__PURE__ */ En({
    disabled: { type: Boolean, default: !1 },
    backgroundColor: {},
    type: { default: Xo.small }
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ En(["change"], ["update:modelValue"]),
  setup(e, { emit: t }) {
    const r = e, i = t, a = Co(e, "modelValue"), l = qh(), u = T(() => ({
      "toggle-yui-kit": !0,
      "toggle-yui-kit_small": r.type === Xo.small,
      "toggle-yui-kit_medium": r.type === Xo.medium,
      "toggle-yui-kit_large": r.type === Xo.large
    })), c = T(() => ({
      backgroundColor: r.backgroundColor
    })), f = () => i("change", !!a.value);
    return (h, p) => ($(), P("div", {
      class: le(u.value),
      disabled: r.disabled,
      style: Pt(c.value)
    }, [
      jt(V("input", {
        class: "toggle-yui-kit-input",
        id: L(l),
        type: "checkbox",
        disabled: h.disabled,
        "onUpdate:modelValue": p[0] || (p[0] = (m) => a.value = m),
        onChange: f
      }, null, 40, SH), [
        [lv, a.value]
      ]),
      V("label", {
        class: "toggle-yui-kit-label",
        for: L(l)
      }, null, 8, OH)
    ], 14, DH));
  }
}), ku = /* @__PURE__ */ be(LH, [["__scopeId", "data-v-44d2874e"]]);
/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */
function Gn(e) {
  return getComputedStyle(e);
}
function Kt(e, t) {
  for (var r in t) {
    var i = t[r];
    typeof i == "number" && (i = i + "px"), e.style[r] = i;
  }
  return e;
}
function ua(e) {
  var t = document.createElement("div");
  return t.className = e, t;
}
var A0 = typeof Element < "u" && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector);
function Ur(e, t) {
  if (!A0)
    throw new Error("No element matching method supported");
  return A0.call(e, t);
}
function Ko(e) {
  e.remove ? e.remove() : e.parentNode && e.parentNode.removeChild(e);
}
function P0(e, t) {
  return Array.prototype.filter.call(
    e.children,
    function(r) {
      return Ur(r, t);
    }
  );
}
var pt = {
  main: "ps",
  rtl: "ps__rtl",
  element: {
    thumb: function(e) {
      return "ps__thumb-" + e;
    },
    rail: function(e) {
      return "ps__rail-" + e;
    },
    consuming: "ps__child--consume"
  },
  state: {
    focus: "ps--focus",
    clicking: "ps--clicking",
    active: function(e) {
      return "ps--active-" + e;
    },
    scrolling: function(e) {
      return "ps--scrolling-" + e;
    }
  }
}, op = { x: null, y: null };
function ip(e, t) {
  var r = e.element.classList, i = pt.state.scrolling(t);
  r.contains(i) ? clearTimeout(op[t]) : r.add(i);
}
function sp(e, t) {
  op[t] = setTimeout(
    function() {
      return e.isAlive && e.element.classList.remove(pt.state.scrolling(t));
    },
    e.settings.scrollingThreshold
  );
}
function xH(e, t) {
  ip(e, t), sp(e, t);
}
var hs = function(t) {
  this.element = t, this.handlers = {};
}, ap = { isEmpty: { configurable: !0 } };
hs.prototype.bind = function(t, r) {
  typeof this.handlers[t] > "u" && (this.handlers[t] = []), this.handlers[t].push(r), this.element.addEventListener(t, r, !1);
};
hs.prototype.unbind = function(t, r) {
  var i = this;
  this.handlers[t] = this.handlers[t].filter(function(a) {
    return r && a !== r ? !0 : (i.element.removeEventListener(t, a, !1), !1);
  });
};
hs.prototype.unbindAll = function() {
  for (var t in this.handlers)
    this.unbind(t);
};
ap.isEmpty.get = function() {
  var e = this;
  return Object.keys(this.handlers).every(
    function(t) {
      return e.handlers[t].length === 0;
    }
  );
};
Object.defineProperties(hs.prototype, ap);
var yi = function() {
  this.eventElements = [];
};
yi.prototype.eventElement = function(t) {
  var r = this.eventElements.filter(function(i) {
    return i.element === t;
  })[0];
  return r || (r = new hs(t), this.eventElements.push(r)), r;
};
yi.prototype.bind = function(t, r, i) {
  this.eventElement(t).bind(r, i);
};
yi.prototype.unbind = function(t, r, i) {
  var a = this.eventElement(t);
  a.unbind(r, i), a.isEmpty && this.eventElements.splice(this.eventElements.indexOf(a), 1);
};
yi.prototype.unbindAll = function() {
  this.eventElements.forEach(function(t) {
    return t.unbindAll();
  }), this.eventElements = [];
};
yi.prototype.once = function(t, r, i) {
  var a = this.eventElement(t), l = function(u) {
    a.unbind(r, l), i(u);
  };
  a.bind(r, l);
};
function ca(e) {
  if (typeof window.CustomEvent == "function")
    return new CustomEvent(e);
  var t = document.createEvent("CustomEvent");
  return t.initCustomEvent(e, !1, !1, void 0), t;
}
function Ea(e, t, r, i, a) {
  i === void 0 && (i = !0), a === void 0 && (a = !1);
  var l;
  if (t === "top")
    l = [
      "contentHeight",
      "containerHeight",
      "scrollTop",
      "y",
      "up",
      "down"
    ];
  else if (t === "left")
    l = [
      "contentWidth",
      "containerWidth",
      "scrollLeft",
      "x",
      "left",
      "right"
    ];
  else
    throw new Error("A proper axis should be provided");
  TH(e, r, l, i, a);
}
function TH(e, t, r, i, a) {
  var l = r[0], u = r[1], c = r[2], f = r[3], h = r[4], p = r[5];
  i === void 0 && (i = !0), a === void 0 && (a = !1);
  var m = e.element;
  e.reach[f] = null, m[c] < 1 && (e.reach[f] = "start"), m[c] > e[l] - e[u] - 1 && (e.reach[f] = "end"), t && (m.dispatchEvent(ca("ps-scroll-" + f)), t < 0 ? m.dispatchEvent(ca("ps-scroll-" + h)) : t > 0 && m.dispatchEvent(ca("ps-scroll-" + p)), i && xH(e, f)), e.reach[f] && (t || a) && m.dispatchEvent(ca("ps-" + f + "-reach-" + e.reach[f]));
}
function it(e) {
  return parseInt(e, 10) || 0;
}
function AH(e) {
  return Ur(e, "input,[contenteditable]") || Ur(e, "select,[contenteditable]") || Ur(e, "textarea,[contenteditable]") || Ur(e, "button,[contenteditable]");
}
function PH(e) {
  var t = Gn(e);
  return it(t.width) + it(t.paddingLeft) + it(t.paddingRight) + it(t.borderLeftWidth) + it(t.borderRightWidth);
}
var zo = {
  isWebKit: typeof document < "u" && "WebkitAppearance" in document.documentElement.style,
  supportsTouch: typeof window < "u" && ("ontouchstart" in window || "maxTouchPoints" in window.navigator && window.navigator.maxTouchPoints > 0 || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: typeof navigator < "u" && navigator.msMaxTouchPoints,
  isChrome: typeof navigator < "u" && /Chrome/i.test(navigator && navigator.userAgent)
};
function wr(e) {
  var t = e.element, r = Math.floor(t.scrollTop), i = t.getBoundingClientRect();
  e.containerWidth = Math.round(i.width), e.containerHeight = Math.round(i.height), e.contentWidth = t.scrollWidth, e.contentHeight = t.scrollHeight, t.contains(e.scrollbarXRail) || (P0(t, pt.element.rail("x")).forEach(
    function(a) {
      return Ko(a);
    }
  ), t.appendChild(e.scrollbarXRail)), t.contains(e.scrollbarYRail) || (P0(t, pt.element.rail("y")).forEach(
    function(a) {
      return Ko(a);
    }
  ), t.appendChild(e.scrollbarYRail)), !e.settings.suppressScrollX && e.containerWidth + e.settings.scrollXMarginOffset < e.contentWidth ? (e.scrollbarXActive = !0, e.railXWidth = e.containerWidth - e.railXMarginWidth, e.railXRatio = e.containerWidth / e.railXWidth, e.scrollbarXWidth = I0(
    e,
    it(e.railXWidth * e.containerWidth / e.contentWidth)
  ), e.scrollbarXLeft = it(
    (e.negativeScrollAdjustment + t.scrollLeft) * (e.railXWidth - e.scrollbarXWidth) / (e.contentWidth - e.containerWidth)
  )) : e.scrollbarXActive = !1, !e.settings.suppressScrollY && e.containerHeight + e.settings.scrollYMarginOffset < e.contentHeight ? (e.scrollbarYActive = !0, e.railYHeight = e.containerHeight - e.railYMarginHeight, e.railYRatio = e.containerHeight / e.railYHeight, e.scrollbarYHeight = I0(
    e,
    it(e.railYHeight * e.containerHeight / e.contentHeight)
  ), e.scrollbarYTop = it(
    r * (e.railYHeight - e.scrollbarYHeight) / (e.contentHeight - e.containerHeight)
  )) : e.scrollbarYActive = !1, e.scrollbarXLeft >= e.railXWidth - e.scrollbarXWidth && (e.scrollbarXLeft = e.railXWidth - e.scrollbarXWidth), e.scrollbarYTop >= e.railYHeight - e.scrollbarYHeight && (e.scrollbarYTop = e.railYHeight - e.scrollbarYHeight), IH(t, e), e.scrollbarXActive ? t.classList.add(pt.state.active("x")) : (t.classList.remove(pt.state.active("x")), e.scrollbarXWidth = 0, e.scrollbarXLeft = 0, t.scrollLeft = e.isRtl === !0 ? e.contentWidth : 0), e.scrollbarYActive ? t.classList.add(pt.state.active("y")) : (t.classList.remove(pt.state.active("y")), e.scrollbarYHeight = 0, e.scrollbarYTop = 0, t.scrollTop = 0);
}
function I0(e, t) {
  return e.settings.minScrollbarLength && (t = Math.max(t, e.settings.minScrollbarLength)), e.settings.maxScrollbarLength && (t = Math.min(t, e.settings.maxScrollbarLength)), t;
}
function IH(e, t) {
  var r = { width: t.railXWidth }, i = Math.floor(e.scrollTop);
  t.isRtl ? r.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth - t.contentWidth : r.left = e.scrollLeft, t.isScrollbarXUsingBottom ? r.bottom = t.scrollbarXBottom - i : r.top = t.scrollbarXTop + i, Kt(t.scrollbarXRail, r);
  var a = { top: i, height: t.railYHeight };
  t.isScrollbarYUsingRight ? t.isRtl ? a.right = t.contentWidth - (t.negativeScrollAdjustment + e.scrollLeft) - t.scrollbarYRight - t.scrollbarYOuterWidth - 9 : a.right = t.scrollbarYRight - e.scrollLeft : t.isRtl ? a.left = t.negativeScrollAdjustment + e.scrollLeft + t.containerWidth * 2 - t.contentWidth - t.scrollbarYLeft - t.scrollbarYOuterWidth : a.left = t.scrollbarYLeft + e.scrollLeft, Kt(t.scrollbarYRail, a), Kt(t.scrollbarX, {
    left: t.scrollbarXLeft,
    width: t.scrollbarXWidth - t.railBorderXWidth
  }), Kt(t.scrollbarY, {
    top: t.scrollbarYTop,
    height: t.scrollbarYHeight - t.railBorderYWidth
  });
}
function EH(e) {
  e.element, e.event.bind(e.scrollbarY, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarYRail, "mousedown", function(t) {
    var r = t.pageY - window.pageYOffset - e.scrollbarYRail.getBoundingClientRect().top, i = r > e.scrollbarYTop ? 1 : -1;
    e.element.scrollTop += i * e.containerHeight, wr(e), t.stopPropagation();
  }), e.event.bind(e.scrollbarX, "mousedown", function(t) {
    return t.stopPropagation();
  }), e.event.bind(e.scrollbarXRail, "mousedown", function(t) {
    var r = t.pageX - window.pageXOffset - e.scrollbarXRail.getBoundingClientRect().left, i = r > e.scrollbarXLeft ? 1 : -1;
    e.element.scrollLeft += i * e.containerWidth, wr(e), t.stopPropagation();
  });
}
function HH(e) {
  E0(e, [
    "containerWidth",
    "contentWidth",
    "pageX",
    "railXWidth",
    "scrollbarX",
    "scrollbarXWidth",
    "scrollLeft",
    "x",
    "scrollbarXRail"
  ]), E0(e, [
    "containerHeight",
    "contentHeight",
    "pageY",
    "railYHeight",
    "scrollbarY",
    "scrollbarYHeight",
    "scrollTop",
    "y",
    "scrollbarYRail"
  ]);
}
function E0(e, t) {
  var r = t[0], i = t[1], a = t[2], l = t[3], u = t[4], c = t[5], f = t[6], h = t[7], p = t[8], m = e.element, C = null, g = null, b = null;
  function M(Y) {
    Y.touches && Y.touches[0] && (Y[a] = Y.touches[0].pageY), m[f] = C + b * (Y[a] - g), ip(e, h), wr(e), Y.stopPropagation(), Y.type.startsWith("touch") && Y.changedTouches.length > 1 && Y.preventDefault();
  }
  function A() {
    sp(e, h), e[p].classList.remove(pt.state.clicking), e.event.unbind(e.ownerDocument, "mousemove", M);
  }
  function D(Y, K) {
    C = m[f], K && Y.touches && (Y[a] = Y.touches[0].pageY), g = Y[a], b = (e[i] - e[r]) / (e[l] - e[c]), K ? e.event.bind(e.ownerDocument, "touchmove", M) : (e.event.bind(e.ownerDocument, "mousemove", M), e.event.once(e.ownerDocument, "mouseup", A), Y.preventDefault()), e[p].classList.add(pt.state.clicking), Y.stopPropagation();
  }
  e.event.bind(e[u], "mousedown", function(Y) {
    D(Y);
  }), e.event.bind(e[u], "touchstart", function(Y) {
    D(Y, !0);
  });
}
function RH(e) {
  var t = e.element, r = function() {
    return Ur(t, ":hover");
  }, i = function() {
    return Ur(e.scrollbarX, ":focus") || Ur(e.scrollbarY, ":focus");
  };
  function a(l, u) {
    var c = Math.floor(t.scrollTop);
    if (l === 0) {
      if (!e.scrollbarYActive)
        return !1;
      if (c === 0 && u > 0 || c >= e.contentHeight - e.containerHeight && u < 0)
        return !e.settings.wheelPropagation;
    }
    var f = t.scrollLeft;
    if (u === 0) {
      if (!e.scrollbarXActive)
        return !1;
      if (f === 0 && l < 0 || f >= e.contentWidth - e.containerWidth && l > 0)
        return !e.settings.wheelPropagation;
    }
    return !0;
  }
  e.event.bind(e.ownerDocument, "keydown", function(l) {
    if (!(l.isDefaultPrevented && l.isDefaultPrevented() || l.defaultPrevented) && !(!r() && !i())) {
      var u = document.activeElement ? document.activeElement : e.ownerDocument.activeElement;
      if (u) {
        if (u.tagName === "IFRAME")
          u = u.contentDocument.activeElement;
        else
          for (; u.shadowRoot; )
            u = u.shadowRoot.activeElement;
        if (AH(u))
          return;
      }
      var c = 0, f = 0;
      switch (l.which) {
        case 37:
          l.metaKey ? c = -e.contentWidth : l.altKey ? c = -e.containerWidth : c = -30;
          break;
        case 38:
          l.metaKey ? f = e.contentHeight : l.altKey ? f = e.containerHeight : f = 30;
          break;
        case 39:
          l.metaKey ? c = e.contentWidth : l.altKey ? c = e.containerWidth : c = 30;
          break;
        case 40:
          l.metaKey ? f = -e.contentHeight : l.altKey ? f = -e.containerHeight : f = -30;
          break;
        case 32:
          l.shiftKey ? f = e.containerHeight : f = -e.containerHeight;
          break;
        case 33:
          f = e.containerHeight;
          break;
        case 34:
          f = -e.containerHeight;
          break;
        case 36:
          f = e.contentHeight;
          break;
        case 35:
          f = -e.contentHeight;
          break;
        default:
          return;
      }
      e.settings.suppressScrollX && c !== 0 || e.settings.suppressScrollY && f !== 0 || (t.scrollTop -= f, t.scrollLeft += c, wr(e), a(c, f) && l.preventDefault());
    }
  });
}
function VH(e) {
  var t = e.element;
  function r(u, c) {
    var f = Math.floor(t.scrollTop), h = t.scrollTop === 0, p = f + t.offsetHeight === t.scrollHeight, m = t.scrollLeft === 0, C = t.scrollLeft + t.offsetWidth === t.scrollWidth, g;
    return Math.abs(c) > Math.abs(u) ? g = h || p : g = m || C, g ? !e.settings.wheelPropagation : !0;
  }
  function i(u) {
    var c = u.deltaX, f = -1 * u.deltaY;
    return (typeof c > "u" || typeof f > "u") && (c = -1 * u.wheelDeltaX / 6, f = u.wheelDeltaY / 6), u.deltaMode && u.deltaMode === 1 && (c *= 10, f *= 10), c !== c && f !== f && (c = 0, f = u.wheelDelta), u.shiftKey ? [-f, -c] : [c, f];
  }
  function a(u, c, f) {
    if (!zo.isWebKit && t.querySelector("select:focus"))
      return !0;
    if (!t.contains(u))
      return !1;
    for (var h = u; h && h !== t; ) {
      if (h.classList.contains(pt.element.consuming))
        return !0;
      var p = Gn(h);
      if (f && p.overflowY.match(/(scroll|auto)/)) {
        var m = h.scrollHeight - h.clientHeight;
        if (m > 0 && (h.scrollTop > 0 && f < 0 || h.scrollTop < m && f > 0))
          return !0;
      }
      if (c && p.overflowX.match(/(scroll|auto)/)) {
        var C = h.scrollWidth - h.clientWidth;
        if (C > 0 && (h.scrollLeft > 0 && c < 0 || h.scrollLeft < C && c > 0))
          return !0;
      }
      h = h.parentNode;
    }
    return !1;
  }
  function l(u) {
    var c = i(u), f = c[0], h = c[1];
    if (!a(u.target, f, h)) {
      var p = !1;
      e.settings.useBothWheelAxes ? e.scrollbarYActive && !e.scrollbarXActive ? (h ? t.scrollTop -= h * e.settings.wheelSpeed : t.scrollTop += f * e.settings.wheelSpeed, p = !0) : e.scrollbarXActive && !e.scrollbarYActive && (f ? t.scrollLeft += f * e.settings.wheelSpeed : t.scrollLeft -= h * e.settings.wheelSpeed, p = !0) : (t.scrollTop -= h * e.settings.wheelSpeed, t.scrollLeft += f * e.settings.wheelSpeed), wr(e), p = p || r(f, h), p && !u.ctrlKey && (u.stopPropagation(), u.preventDefault());
    }
  }
  typeof window.onwheel < "u" ? e.event.bind(t, "wheel", l) : typeof window.onmousewheel < "u" && e.event.bind(t, "mousewheel", l);
}
function YH(e) {
  if (!zo.supportsTouch && !zo.supportsIePointer)
    return;
  var t = e.element;
  function r(b, M) {
    var A = Math.floor(t.scrollTop), D = t.scrollLeft, Y = Math.abs(b), K = Math.abs(M);
    if (K > Y) {
      if (M < 0 && A === e.contentHeight - e.containerHeight || M > 0 && A === 0)
        return window.scrollY === 0 && M > 0 && zo.isChrome;
    } else if (Y > K && (b < 0 && D === e.contentWidth - e.containerWidth || b > 0 && D === 0))
      return !0;
    return !0;
  }
  function i(b, M) {
    t.scrollTop -= M, t.scrollLeft -= b, wr(e);
  }
  var a = {}, l = 0, u = {}, c = null;
  function f(b) {
    return b.targetTouches ? b.targetTouches[0] : b;
  }
  function h(b) {
    return b.pointerType && b.pointerType === "pen" && b.buttons === 0 ? !1 : !!(b.targetTouches && b.targetTouches.length === 1 || b.pointerType && b.pointerType !== "mouse" && b.pointerType !== b.MSPOINTER_TYPE_MOUSE);
  }
  function p(b) {
    if (h(b)) {
      var M = f(b);
      a.pageX = M.pageX, a.pageY = M.pageY, l = (/* @__PURE__ */ new Date()).getTime(), c !== null && clearInterval(c);
    }
  }
  function m(b, M, A) {
    if (!t.contains(b))
      return !1;
    for (var D = b; D && D !== t; ) {
      if (D.classList.contains(pt.element.consuming))
        return !0;
      var Y = Gn(D);
      if (A && Y.overflowY.match(/(scroll|auto)/)) {
        var K = D.scrollHeight - D.clientHeight;
        if (K > 0 && (D.scrollTop > 0 && A < 0 || D.scrollTop < K && A > 0))
          return !0;
      }
      if (M && Y.overflowX.match(/(scroll|auto)/)) {
        var H = D.scrollWidth - D.clientWidth;
        if (H > 0 && (D.scrollLeft > 0 && M < 0 || D.scrollLeft < H && M > 0))
          return !0;
      }
      D = D.parentNode;
    }
    return !1;
  }
  function C(b) {
    if (h(b)) {
      var M = f(b), A = { pageX: M.pageX, pageY: M.pageY }, D = A.pageX - a.pageX, Y = A.pageY - a.pageY;
      if (m(b.target, D, Y))
        return;
      i(D, Y), a = A;
      var K = (/* @__PURE__ */ new Date()).getTime(), H = K - l;
      H > 0 && (u.x = D / H, u.y = Y / H, l = K), r(D, Y) && b.preventDefault();
    }
  }
  function g() {
    e.settings.swipeEasing && (clearInterval(c), c = setInterval(function() {
      if (e.isInitialized) {
        clearInterval(c);
        return;
      }
      if (!u.x && !u.y) {
        clearInterval(c);
        return;
      }
      if (Math.abs(u.x) < 0.01 && Math.abs(u.y) < 0.01) {
        clearInterval(c);
        return;
      }
      if (!e.element) {
        clearInterval(c);
        return;
      }
      i(u.x * 30, u.y * 30), u.x *= 0.8, u.y *= 0.8;
    }, 10));
  }
  zo.supportsTouch ? (e.event.bind(t, "touchstart", p), e.event.bind(t, "touchmove", C), e.event.bind(t, "touchend", g)) : zo.supportsIePointer && (window.PointerEvent ? (e.event.bind(t, "pointerdown", p), e.event.bind(t, "pointermove", C), e.event.bind(t, "pointerup", g)) : window.MSPointerEvent && (e.event.bind(t, "MSPointerDown", p), e.event.bind(t, "MSPointerMove", C), e.event.bind(t, "MSPointerUp", g)));
}
var BH = function() {
  return {
    handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
    maxScrollbarLength: null,
    minScrollbarLength: null,
    scrollingThreshold: 1e3,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: !1,
    suppressScrollY: !1,
    swipeEasing: !0,
    useBothWheelAxes: !1,
    wheelPropagation: !0,
    wheelSpeed: 1
  };
}, WH = {
  "click-rail": EH,
  "drag-thumb": HH,
  keyboard: RH,
  wheel: VH,
  touch: YH
}, ps = function(t, r) {
  var i = this;
  if (r === void 0 && (r = {}), typeof t == "string" && (t = document.querySelector(t)), !t || !t.nodeName)
    throw new Error("no element is specified to initialize PerfectScrollbar");
  this.element = t, t.classList.add(pt.main), this.settings = BH();
  for (var a in r)
    this.settings[a] = r[a];
  this.containerWidth = null, this.containerHeight = null, this.contentWidth = null, this.contentHeight = null;
  var l = function() {
    return t.classList.add(pt.state.focus);
  }, u = function() {
    return t.classList.remove(pt.state.focus);
  };
  this.isRtl = Gn(t).direction === "rtl", this.isRtl === !0 && t.classList.add(pt.rtl), this.isNegativeScroll = function() {
    var h = t.scrollLeft, p = null;
    return t.scrollLeft = -1, p = t.scrollLeft < 0, t.scrollLeft = h, p;
  }(), this.negativeScrollAdjustment = this.isNegativeScroll ? t.scrollWidth - t.clientWidth : 0, this.event = new yi(), this.ownerDocument = t.ownerDocument || document, this.scrollbarXRail = ua(pt.element.rail("x")), t.appendChild(this.scrollbarXRail), this.scrollbarX = ua(pt.element.thumb("x")), this.scrollbarXRail.appendChild(this.scrollbarX), this.scrollbarX.setAttribute("tabindex", 0), this.event.bind(this.scrollbarX, "focus", l), this.event.bind(this.scrollbarX, "blur", u), this.scrollbarXActive = null, this.scrollbarXWidth = null, this.scrollbarXLeft = null;
  var c = Gn(this.scrollbarXRail);
  this.scrollbarXBottom = parseInt(c.bottom, 10), isNaN(this.scrollbarXBottom) ? (this.isScrollbarXUsingBottom = !1, this.scrollbarXTop = it(c.top)) : this.isScrollbarXUsingBottom = !0, this.railBorderXWidth = it(c.borderLeftWidth) + it(c.borderRightWidth), Kt(this.scrollbarXRail, { display: "block" }), this.railXMarginWidth = it(c.marginLeft) + it(c.marginRight), Kt(this.scrollbarXRail, { display: "" }), this.railXWidth = null, this.railXRatio = null, this.scrollbarYRail = ua(pt.element.rail("y")), t.appendChild(this.scrollbarYRail), this.scrollbarY = ua(pt.element.thumb("y")), this.scrollbarYRail.appendChild(this.scrollbarY), this.scrollbarY.setAttribute("tabindex", 0), this.event.bind(this.scrollbarY, "focus", l), this.event.bind(this.scrollbarY, "blur", u), this.scrollbarYActive = null, this.scrollbarYHeight = null, this.scrollbarYTop = null;
  var f = Gn(this.scrollbarYRail);
  this.scrollbarYRight = parseInt(f.right, 10), isNaN(this.scrollbarYRight) ? (this.isScrollbarYUsingRight = !1, this.scrollbarYLeft = it(f.left)) : this.isScrollbarYUsingRight = !0, this.scrollbarYOuterWidth = this.isRtl ? PH(this.scrollbarY) : null, this.railBorderYWidth = it(f.borderTopWidth) + it(f.borderBottomWidth), Kt(this.scrollbarYRail, { display: "block" }), this.railYMarginHeight = it(f.marginTop) + it(f.marginBottom), Kt(this.scrollbarYRail, { display: "" }), this.railYHeight = null, this.railYRatio = null, this.reach = {
    x: t.scrollLeft <= 0 ? "start" : t.scrollLeft >= this.contentWidth - this.containerWidth ? "end" : null,
    y: t.scrollTop <= 0 ? "start" : t.scrollTop >= this.contentHeight - this.containerHeight ? "end" : null
  }, this.isAlive = !0, this.settings.handlers.forEach(function(h) {
    return WH[h](i);
  }), this.lastScrollTop = Math.floor(t.scrollTop), this.lastScrollLeft = t.scrollLeft, this.event.bind(this.element, "scroll", function(h) {
    return i.onScroll(h);
  }), wr(this);
};
ps.prototype.update = function() {
  this.isAlive && (this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0, Kt(this.scrollbarXRail, { display: "block" }), Kt(this.scrollbarYRail, { display: "block" }), this.railXMarginWidth = it(Gn(this.scrollbarXRail).marginLeft) + it(Gn(this.scrollbarXRail).marginRight), this.railYMarginHeight = it(Gn(this.scrollbarYRail).marginTop) + it(Gn(this.scrollbarYRail).marginBottom), Kt(this.scrollbarXRail, { display: "none" }), Kt(this.scrollbarYRail, { display: "none" }), wr(this), Ea(this, "top", 0, !1, !0), Ea(this, "left", 0, !1, !0), Kt(this.scrollbarXRail, { display: "" }), Kt(this.scrollbarYRail, { display: "" }));
};
ps.prototype.onScroll = function(t) {
  this.isAlive && (wr(this), Ea(this, "top", this.element.scrollTop - this.lastScrollTop), Ea(
    this,
    "left",
    this.element.scrollLeft - this.lastScrollLeft
  ), this.lastScrollTop = Math.floor(this.element.scrollTop), this.lastScrollLeft = this.element.scrollLeft);
};
ps.prototype.destroy = function() {
  this.isAlive && (this.event.unbindAll(), Ko(this.scrollbarX), Ko(this.scrollbarY), Ko(this.scrollbarXRail), Ko(this.scrollbarYRail), this.removePsClasses(), this.element = null, this.scrollbarX = null, this.scrollbarY = null, this.scrollbarXRail = null, this.scrollbarYRail = null, this.isAlive = !1);
};
ps.prototype.removePsClasses = function() {
  this.element.className = this.element.className.split(" ").filter(function(t) {
    return !t.match(/^ps([-_].+|)$/);
  }).join(" ");
};
const FH = /* @__PURE__ */ oe({
  __name: "PerfectScrollbar",
  props: {
    tag: { default: "div" },
    options: { default: () => ({}) }
  },
  emits: ["scroll", "ps-scroll-y", "ps-scroll-x", "ps-scroll-up", "ps-scroll-down", "ps-scroll-left", "ps-scroll-right", "ps-y-reach-start", "ps-y-reach-end", "ps-x-reach-start", "ps-x-reach-end"],
  setup(e, { expose: t, emit: r }) {
    const i = e, a = r, l = ie(null), u = ie(null);
    $e(
      () => i.options,
      () => {
        f(), c();
      },
      { deep: !0 }
    ), ze(() => {
      l.value && c();
    }), F0(() => {
      f();
    });
    function c() {
      l.value && (u.value = new ps(l.value, i.options), m());
    }
    function f() {
      u.value && (m(!1), u.value.destroy(), u.value = null);
    }
    const h = {
      scroll: p("scroll"),
      "ps-scroll-y": p("ps-scroll-y"),
      "ps-scroll-x": p("ps-scroll-x"),
      "ps-scroll-up": p("ps-scroll-up"),
      "ps-scroll-down": p("ps-scroll-down"),
      "ps-scroll-left": p("ps-scroll-left"),
      "ps-scroll-right": p("ps-scroll-right"),
      "ps-y-reach-start": p("ps-y-reach-start"),
      "ps-y-reach-end": p("ps-y-reach-end"),
      "ps-x-reach-start": p("ps-x-reach-start"),
      "ps-x-reach-end": p("ps-x-reach-end")
    };
    function p(C) {
      return function(g) {
        a(C, g);
      };
    }
    function m(C = !0) {
      var g;
      (g = u.value) != null && g.element && Object.entries(h).forEach(([b, M]) => {
        var A, D;
        C ? (A = u.value) == null || A.element.addEventListener(b, M) : (D = u.value) == null || D.element.removeEventListener(b, M);
      });
    }
    return t({
      ps: u
    }), (C, g) => ($(), ge(Y1(C.tag), {
      ref_key: "scrollbar",
      ref: l,
      class: "ps"
    }, {
      default: me(() => [
        Be(C.$slots, "default")
      ]),
      _: 3
    }, 512));
  }
}), lp = /* @__PURE__ */ oe({
  __name: "Scrollbar",
  props: {
    options: {},
    tag: {},
    class: {},
    style: {},
    thrumbStyle: {},
    railStyle: {}
  },
  emits: ["scroll", "ps-scroll-y", "ps-scroll-x", "ps-scroll-up", "ps-scroll-down", "ps-scroll-left", "ps-scroll-right", "ps-y-reach-start", "ps-y-reach-end", "ps-x-reach-start", "ps-x-reach-end"],
  setup(e, { expose: t, emit: r }) {
    const i = e, a = ie(null), l = r, u = (m) => {
      l("scroll", m);
    }, c = { attributes: !0, attributeFilter: ["style"] }, f = (m, C) => (g) => {
      for (const b of g)
        b.type === "attributes" && b.attributeName === "style" && m.style.right !== C && (m.style.right = C);
    }, h = () => {
      var D, Y, K, H, I, U, E, ee, ue, W, N, G, re, Ce, se, Oe, De, Ae, Se, X, _e, de, Qe, Ve;
      if (!a.value) return;
      const m = a.value.querySelector(".ps__thumb-y"), C = a.value.querySelector(".ps__thumb-x"), g = a.value.querySelector(".ps__rail-y"), b = a.value.querySelector(".ps__rail-x");
      m.style.background = ((Y = (D = i.thrumbStyle) == null ? void 0 : D.y) == null ? void 0 : Y.background) || "#77a6ff", m.style.width = ((H = (K = i.thrumbStyle) == null ? void 0 : K.y) == null ? void 0 : H.width) || "6px", m.style.right = "0px", C.style.background = ((U = (I = i.thrumbStyle) == null ? void 0 : I.x) == null ? void 0 : U.background) || "#77a6ff", C.style.width = ((ee = (E = i.thrumbStyle) == null ? void 0 : E.x) == null ? void 0 : ee.width) || "6px", C.style.right = "0px", g.style.background = ((W = (ue = i.railStyle) == null ? void 0 : ue.y) == null ? void 0 : W.background) || "#F5F5F5", g.style.width = ((G = (N = i.thrumbStyle) == null ? void 0 : N.y) == null ? void 0 : G.width) || "6px", g.style.right = ((Ce = (re = i.railStyle) == null ? void 0 : re.y) == null ? void 0 : Ce.right) || "0px", b.style.background = ((Oe = (se = i.railStyle) == null ? void 0 : se.x) == null ? void 0 : Oe.background) || "#F5F5F5", b.style.width = ((Ae = (De = i.thrumbStyle) == null ? void 0 : De.x) == null ? void 0 : Ae.width) || "6px", b.style.right = ((X = (Se = i.railStyle) == null ? void 0 : Se.x) == null ? void 0 : X.right) || "0px";
      const M = new MutationObserver(
        f(g, ((de = (_e = i.railStyle) == null ? void 0 : _e.y) == null ? void 0 : de.right) || "0px")
      ), A = new MutationObserver(
        f(b, ((Ve = (Qe = i.railStyle) == null ? void 0 : Qe.x) == null ? void 0 : Ve.right) || "0px")
      );
      M.observe(g, c), A.observe(b, c);
    };
    return $e(
      () => i,
      () => {
        h();
      },
      { immediate: !0 }
    ), t({
      scrollToTop: () => {
        a.value && (a.value.children[0].scrollTop = 0);
      }
    }), ze(() => {
      h();
    }), (m, C) => ($(), P("div", {
      ref_key: "scrollbar",
      ref: a
    }, [
      J(L(FH), {
        onScroll: u,
        options: i.options,
        tag: i.tag,
        class: le(i.class),
        style: Pt(i.style),
        ref_key: "scrollbar",
        ref: a
      }, {
        default: me(() => [
          Be(m.$slots, "default")
        ]),
        _: 3
      }, 8, ["options", "tag", "class", "style"])
    ], 512));
  }
});
function is(e, t = document.documentElement) {
  for (const [r, i] of Object.entries(e))
    t.style.setProperty(r, String(i));
}
const NH = /* @__PURE__ */ oe({
  __name: "Modal",
  props: {
    open: { type: Boolean },
    width: {},
    height: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const r = e, i = ie(null), a = W0(), l = ie(!1), u = T(() => ({
      width: r.width,
      height: r.height
    })), c = t;
    let f = 0;
    const h = () => {
      var g;
      f = Date.now(), r.open ? (g = i.value) == null || g.showModal() : p();
    }, p = () => {
      var b;
      Date.now() - f < 300 || ((b = i.value) == null || b.close(), c("close"), document.documentElement.focus());
    }, m = (g) => {
      g.key === "Escape" && p();
    }, C = () => window.innerWidth - document.documentElement.clientWidth;
    return Pa(i, "mousedown", (g) => {
      g.target === i.value && p();
    }), ze(() => {
      It(() => {
        r.open !== l.value && (h(), l.value = r.open);
      });
      const g = C();
      is(
        {
          overflow: "hidden",
          "padding-right": `${g}px`
        },
        document.body
      ), document.addEventListener("keydown", m);
    }), ai(() => {
      is(
        {
          overflow: "",
          "padding-right": ""
        },
        document.body
      ), document.removeEventListener("keydown", m);
    }), (g, b) => ($(), P("dialog", kr({
      ref_key: "dialog",
      ref: i
    }, L(a), { class: "modal-yui-kit" }), [
      V("div", {
        class: "modal-yui-kit__modal-content",
        style: Pt(u.value)
      }, [
        Be(g.$slots, "default", {}, void 0, !0)
      ], 4)
    ], 16));
  }
}), jH = /* @__PURE__ */ be(NH, [["__scopeId", "data-v-9c088a93"]]), UH = /* @__PURE__ */ oe({
  __name: "ModalAnimated",
  props: {
    open: { type: Boolean },
    width: {},
    height: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const r = e, i = t, a = () => {
      i("close");
    };
    return (l, u) => ($(), ge(B1, { name: "modal" }, {
      default: me(() => [
        r.open ? ($(), ge(jH, {
          key: 0,
          open: r.open,
          width: r.width,
          height: r.height,
          onClose: a
        }, {
          default: me(() => [
            Be(l.$slots, "default", {}, void 0, !0)
          ]),
          _: 3
        }, 8, ["open", "width", "height"])) : ne("", !0)
      ]),
      _: 3
    }));
  }
}), up = /* @__PURE__ */ be(UH, [["__scopeId", "data-v-391a08cf"]]);
var cp = /* @__PURE__ */ ((e) => (e.small = "small", e.medium = "medium", e.big = "big", e))(cp || {}), dp = /* @__PURE__ */ ((e) => (e.circled = "circled", e.rounded = "rounded", e))(dp || {});
const ZH = ["checked", "disabled"], zH = /* @__PURE__ */ oe({
  __name: "Checkbox",
  props: {
    size: { default: cp.medium },
    circular: { default: dp.rounded },
    checked: { type: Boolean },
    modelValue: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change", "update:modelValue"],
  setup(e, { emit: t }) {
    const r = e, i = t, a = Fe({
      isChecked: r.modelValue
    });
    It(() => {
      a.isChecked = r.modelValue;
    });
    const l = () => {
      a.isChecked = !a.isChecked, i("change", a.isChecked), i("update:modelValue", a.isChecked);
    };
    return (u, c) => ($(), P("input", {
      type: "checkbox",
      class: le(`checkbox-yui-kit checkbox-yui-kit_${r.size} checkbox-yui-kit_${r.circular}`),
      tabindex: "0",
      onChange: l,
      checked: a.isChecked,
      disabled: r.disabled,
      onKeyup: _o(l, ["enter"])
    }, null, 42, ZH));
  }
}), fp = /* @__PURE__ */ be(zH, [["__scopeId", "data-v-025dad3e"]]);
var fo = /* @__PURE__ */ ((e) => (e.profile = "profile", e.theme = "theme", e.options = "options", e.exit = "exit", e.help = "help", e))(fo || {});
const $u = (e) => (er("data-v-6bc810e4"), e = e(), tr(), e), qH = { class: "menu-yui-kit__wrapper" }, GH = { class: "menu-yui-kit__avatar" }, XH = ["src"], KH = { class: "menu-yui-kit__names" }, JH = { class: "menu-yui-kit__name" }, QH = { class: "menu-yui-kit__role" }, eR = {
  key: 0,
  class: "menu-yui-kit__list"
}, tR = { class: "list-yui-kit" }, nR = /* @__PURE__ */ $u(() => /* @__PURE__ */ V("span", { class: "list-yui-kit__item-text" }, "Профиль", -1)), rR = { class: "list-yui-kit__item" }, oR = /* @__PURE__ */ $u(() => /* @__PURE__ */ V("span", { class: "list-yui-kit__item-text" }, "Настройки", -1)), iR = /* @__PURE__ */ $u(() => /* @__PURE__ */ V("span", { class: "list-yui-kit__item-text" }, "Выход", -1)), sR = ["data-type"], aR = /* @__PURE__ */ oe({
  __name: "UserMenu",
  props: {
    closeAfterClick: { type: Boolean },
    user: {},
    languages: {},
    isBlackTheme: { type: Boolean }
  },
  emits: ["click", "themeChange", "languageSwitch"],
  setup(e, { emit: t }) {
    const r = e, i = Fe({
      isShow: !1,
      option: "",
      isBlackTheme: r.isBlackTheme ?? !1
    }), a = t, l = T(() => ({
      "menu-yui-kit__heading": !0,
      "active-yui-kit": i.isShow
    })), u = T(
      () => i.isBlackTheme ? xe.dark : xe.light
    ), c = ie(null), f = (M) => {
      c.value && !c.value.contains(M.target) && (i.isShow = !1);
    };
    ze(() => {
      document.addEventListener("click", f);
    }), F0(() => {
      document.removeEventListener("click", f);
    });
    const h = (M) => {
      M !== void 0 ? (i.option = M, a("click", M), r.closeAfterClick && (i.isShow = !1)) : console.error("Option type is undefined");
    }, p = T(() => i.isShow ? xe.chevronUp : xe.chevronDown), m = T(() => r.user.avatar !== "" && r.user.avatar !== null && r.user.avatar !== void 0), C = () => {
      i.isShow = !i.isShow;
    }, g = (M) => {
      r.closeAfterClick && (i.isShow = !1), a("themeChange", M), i.isBlackTheme = M;
    }, b = (M) => {
      r.closeAfterClick && (i.isShow = !1), a("languageSwitch", M);
    };
    return (M, A) => {
      var D, Y, K;
      return $(), P("div", {
        class: "menu-yui-kit",
        ref_key: "menuRef",
        ref: c
      }, [
        V("div", qH, [
          V("div", GH, [
            m.value ? ($(), P("img", {
              key: 0,
              src: r.user.avatar
            }, null, 8, XH)) : ($(), ge(Ee, {
              key: 1,
              name: L(xe).profile
            }, null, 8, ["name"]))
          ]),
          V("div", {
            class: le(l.value),
            onClick: C
          }, [
            V("div", KH, [
              V("p", JH, ye(r.user.name), 1),
              V("p", QH, ye(r.user.role), 1)
            ]),
            J(yr, {
              type: L(Wt).ghost,
              class: "menu-yui-kit__button"
            }, {
              default: me(() => [
                J(Ee, {
                  class: "menu-yui-kit__button-icon",
                  name: p.value
                }, null, 8, ["name"])
              ]),
              _: 1
            }, 8, ["type"])
          ], 2)
        ]),
        i.isShow ? ($(), P("div", eR, [
          V("ul", tR, [
            V("li", {
              class: "list-yui-kit__item",
              onClick: A[0] || (A[0] = (H) => h(L(fo).profile))
            }, [
              J(Ee, {
                name: L(xe).profile
              }, null, 8, ["name"]),
              nR
            ]),
            V("li", rR, [
              J(Ee, { name: u.value }, null, 8, ["name"]),
              V("span", {
                class: "list-yui-kit__item-text",
                onClick: A[1] || (A[1] = (H) => h(L(fo).theme))
              }, "Темная тема"),
              J(ku, {
                type: L(Xo).small,
                onChange: g,
                checked: i.isBlackTheme
              }, null, 8, ["type", "checked"])
            ]),
            V("li", {
              class: "list-yui-kit__item",
              onClick: A[2] || (A[2] = (H) => h(L(fo).options))
            }, [
              J(Ee, {
                name: L(xe).settings
              }, null, 8, ["name"]),
              oR
            ]),
            V("li", {
              class: "list-yui-kit__item",
              onClick: A[3] || (A[3] = (H) => h(L(fo).exit))
            }, [
              J(Ee, {
                name: L(xe).exit
              }, null, 8, ["name"]),
              iR
            ]),
            V("li", {
              class: "list-yui-kit__item",
              onClick: A[4] || (A[4] = (H) => h(L(fo).help))
            }, [
              J(Ee, {
                name: L(xe).help
              }, null, 8, ["name"]),
              V("span", {
                class: "list-yui-kit__item-text",
                "data-type": L(fo).help
              }, "Помощь", 8, sR)
            ])
          ]),
          (D = r.languages) != null && D.items ? ($(), ge(N1, {
            key: 0,
            items: (Y = r.languages) == null ? void 0 : Y.items,
            defaultValue: (K = r.languages) == null ? void 0 : K.defaultValue,
            onChange: b
          }, null, 8, ["items", "defaultValue"])) : ne("", !0)
        ])) : ne("", !0)
      ], 512);
    };
  }
}), hp = /* @__PURE__ */ be(aR, [["__scopeId", "data-v-6bc810e4"]]);
var pp = /* @__PURE__ */ ((e) => (e.default = "default", e.minor = "minor", e))(pp || {});
const lR = {
  key: 0,
  class: "input-yui-kit__legend"
}, uR = {
  key: 0,
  class: "input-yui-kit__star"
}, cR = ["placeholder", "required", "maxlength", "readonly"], dR = /* @__PURE__ */ oe({
  __name: "Textarea",
  props: {
    placeholder: {},
    inputMessage: {},
    required: { type: Boolean, default: !1 },
    maxlength: {},
    modelValue: { default: "" },
    readonly: { type: Boolean, default: !1 },
    type: { default: pp.default }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const r = e, i = t, a = Fe({
      isPressed: !1,
      inputElement: r.modelValue
    }), l = T(() => [
      {
        pressed: a.isPressed,
        readonly: r.readonly,
        [r.type]: !0
      }
    ]), u = () => {
      i("update:modelValue", a.inputElement);
    }, c = () => {
      r.readonly || (a.isPressed = !0);
    }, f = () => {
      a.isPressed = !1;
    };
    return $e(
      () => r.modelValue,
      (h) => {
        a.inputElement = h;
      }
    ), (h, p) => ($(), P("fieldset", {
      class: le(["input-yui-kit", l.value]),
      onFocusout: f
    }, [
      r.inputMessage ? ($(), P("legend", lR, [
        Qn(ye(r.inputMessage) + " ", 1),
        r.required ? ($(), P("sup", uR, "*")) : ne("", !0)
      ])) : ne("", !0),
      jt(V("textarea", {
        "onUpdate:modelValue": p[0] || (p[0] = (m) => a.inputElement = m),
        onFocus: c,
        onInput: u,
        class: "input-yui-kit__input",
        placeholder: r.placeholder,
        required: r.required,
        maxlength: r.maxlength,
        readonly: r.readonly
      }, null, 40, cR), [
        [ss, a.inputElement]
      ])
    ], 34));
  }
}), vp = /* @__PURE__ */ be(dR, [["__scopeId", "data-v-8997e9c0"]]);
var gp = /* @__PURE__ */ ((e) => (e.img = "img", e.pdf = "pdf", e.docx = "docx", e))(gp || {});
const fR = { class: "picture-yui-kit" }, hR = { class: "picture-yui-kit__picture" }, pR = ["src", "alt"], vR = { class: "picture-yui-kit__picture__caption" }, gR = {
  key: 1,
  class: "picture-yui-kit__caption"
}, mR = { class: "picture-yui-kit__caption__title" }, yR = /* @__PURE__ */ oe({
  __name: "Picture",
  props: {
    type: {},
    alt: {},
    url: {},
    caption: {}
  },
  setup(e) {
    const t = e;
    return (r, i) => ($(), P("figure", fR, [
      t.type == L(gp).img ? ($(), P(Re, { key: 0 }, [
        V("picture", hR, [
          V("img", {
            class: "picture-yui-kit__picture__image",
            src: t.url,
            alt: t.alt
          }, null, 8, pR)
        ]),
        V("figcaption", vR, ye(t.caption), 1)
      ], 64)) : ($(), P("div", gR, [
        V("h4", mR, ye(t.caption), 1)
      ]))
    ]));
  }
}), mp = /* @__PURE__ */ be(yR, [["__scopeId", "data-v-24b82f4c"]]);
var yp = /* @__PURE__ */ ((e) => (e.success = "success", e.warning = "warning", e.error = "error", e.info = "info", e))(yp || {}), _p = /* @__PURE__ */ ((e) => (e.success = "Успешно", e.warning = "Предупреждение", e.error = "Ошибка", e.info = "Уведомление", e))(_p || {}), Cp = ((e) => (e[e.success = xe.checkbox] = "success", e[e.warning = xe.alertTriangle] = "warning", e[e.error = xe.exitCircle] = "error", e[e.info = xe.info] = "info", e))(Cp || {});
const _R = ["id"], CR = { class: "notification-yui-kit" }, bR = { class: "notification-yui-kit__block" }, wR = { class: "notification-yui-kit__block-title" }, kR = { class: "notification-yui-kit__block-text" }, $R = /* @__PURE__ */ oe({
  __name: "Notification",
  props: {
    type: { default: yp.info },
    title: {},
    pushKey: {},
    description: { default: "" },
    timeout: { default: 3 },
    showPopover: { type: Boolean, default: !0 }
  },
  emits: ["close"],
  setup(e, { expose: t, emit: r }) {
    const i = e, a = r, l = ie(null);
    Pa(l, "toggle", () => {
      i.timeout > 0 && setTimeout(() => {
        var h;
        return (h = l.value) == null ? void 0 : h.hidePopover();
      }, i.timeout * 1e3);
    });
    const u = () => (a("close"), "hide"), c = () => {
      var h;
      (h = l.value) == null || h.showPopover();
    }, f = Fe({
      message: {
        icon: Cp[i.type],
        title: i.title || _p[i.type],
        description: i.description
      }
    });
    return ze(() => {
      var h;
      i.showPopover && ((h = l.value) == null || h.showPopover());
    }), t({
      showPopover: c
    }), (h, p) => ($(), P("div", {
      popover: "manual",
      id: i.pushKey.toString(),
      class: le(`push-notification-yui-kit push-notification-yui-kit_${i.type}`),
      ref_key: "popover",
      ref: l
    }, [
      V("div", CR, [
        V("div", bR, [
          J(Ee, {
            name: f.message.icon,
            class: "notification-yui-kit__block-icon"
          }, null, 8, ["name"]),
          V("h4", wR, ye(f.message.title), 1),
          V("span", kR, ye(f.message.description), 1)
        ]),
        J(yr, {
          class: "notification-yui-kit__exit",
          type: L(Wt).ghost,
          popovertarget: i.pushKey.toString(),
          popovertargetaction: u
        }, {
          default: me(() => [
            J(Ee, {
              name: L(xe).crossSmall
            }, null, 8, ["name"])
          ]),
          _: 1
        }, 8, ["type", "popovertarget"])
      ])
    ], 10, _R));
  }
}), bp = /* @__PURE__ */ be($R, [["__scopeId", "data-v-3436b980"]]), wp = /* @__PURE__ */ oe({
  __name: "CopyIcon",
  props: {
    content: { default: "" }
  },
  setup(e) {
    const t = e, r = () => {
      const i = t.content, a = document.createElement("textarea");
      a.value = i;
      const l = document.querySelectorAll("dialog[open]"), u = l.length ? l[l.length - 1] : null;
      u ? u.append(a) : document.body.append(a), a.select(), a.setSelectionRange(0, 99999), document.execCommand("copy"), a.remove();
    };
    return (i, a) => ($(), ge(Ee, {
      class: "copy-icon-yui-kit",
      name: L(xe).copy,
      onClick: r
    }, null, 8, ["name"]));
  }
}), MR = (e) => (er("data-v-af82b924"), e = e(), tr(), e), DR = { class: "loader" }, SR = /* @__PURE__ */ MR(() => /* @__PURE__ */ V("div", { class: "loader__area" }, [
  /* @__PURE__ */ V("div", { class: "loader__circle loader__circle--light-blue" }),
  /* @__PURE__ */ V("div", { class: "loader__circle loader__circle--blue" })
], -1)), OR = {
  key: 0,
  class: "loader__span"
}, LR = /* @__PURE__ */ oe({
  __name: "Loader",
  props: {
    title: { default: "Загрузка..." }
  },
  setup(e) {
    const t = e;
    return (r, i) => ($(), P("div", DR, [
      SR,
      t.title ? ($(), P("span", OR, ye(t.title), 1)) : ne("", !0)
    ]));
  }
}), kp = /* @__PURE__ */ be(LR, [["__scopeId", "data-v-af82b924"]]), xR = (e) => (er("data-v-830c7ee5"), e = e(), tr(), e), TR = { class: "filter-yui-kit" }, AR = {
  key: 2,
  class: "filter-yui-kit__counter"
}, PR = { class: "filter-yui-kit__counter-content" }, IR = {
  key: 0,
  class: "filter-yui-kit__select-wrapper"
}, ER = { class: "filter-yui-kit__select-list selected-yui-kit" }, HR = { class: "filter-yui-kit__select-item" }, RR = /* @__PURE__ */ xR(() => /* @__PURE__ */ V("div", { class: "filter-yui-kit__select__divider" }, null, -1)), VR = {
  key: 0,
  class: "filter-yui-kit__select-list"
}, YR = { class: "filter-yui-kit__select-item" }, BR = /* @__PURE__ */ oe({
  __name: "FilterTag",
  props: {
    title: {},
    iconName: { default: xe.filter },
    options: { default: () => [] },
    selectedValues: { default: () => [] },
    maxShowCount: { default: 5 },
    showClearButton: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const r = e, i = Fe({
      isShow: !1,
      options: []
    }), a = t, l = T(() => ({
      "filter-yui-kit__wrapper": !0,
      "active-yui-kit": i.isShow
    })), u = () => i.isShow = !i.isShow, c = () => {
      i.isShow = !1;
    }, f = T(() => i.options.filter((g) => g.chose)), h = T(() => i.options.filter((g) => !g.chose)), p = (g) => {
      g.chose = !g.chose, i.options.every((b) => b.chose) && (i.options = i.options.map((b) => ({ ...b, chose: !1 }))), a(
        "change",
        f.value.map((b) => b.value)
      );
    }, m = () => {
      i.options = i.options.map((g) => ({ ...g, chose: !1 })), a("change", []);
    }, C = () => {
      i.options = r.options.map((g) => ({
        ...g,
        chose: r.selectedValues.includes(g.value)
      })), i.options.every((g) => g.chose) && (i.options = i.options.map((g) => ({ ...g, chose: !1 })));
    };
    return ze(C), $e(() => r.options, C), $e(() => JSON.stringify(r.selectedValues), C), (g, b) => jt(($(), P("div", TR, [
      V("div", {
        class: le(l.value),
        onClick: u
      }, [
        J(Ee, {
          name: r.iconName
        }, null, 8, ["name"]),
        V("span", null, ye(r.title), 1),
        f.value.length ? ($(!0), P(Re, { key: 1 }, Ze(f.value.filter((M, A) => A < r.maxShowCount), (M) => ($(), ge(Dt, {
          key: M.value,
          type: M.type,
          disabled: "",
          text: M.label
        }, null, 8, ["type", "text"]))), 128)) : ($(), ge(Dt, {
          key: 0,
          disabled: "",
          text: "Все"
        })),
        r.maxShowCount < f.value.length ? ($(), P("div", AR, [
          Qn(" +" + ye(f.value.length - r.maxShowCount) + " ", 1),
          V("div", PR, [
            ($(!0), P(Re, null, Ze(f.value.filter((M, A) => A >= r.maxShowCount), (M) => ($(), ge(Dt, {
              key: M.value,
              type: M.type,
              disabled: "",
              text: M.label
            }, null, 8, ["type", "text"]))), 128))
          ])
        ])) : ne("", !0),
        r.showClearButton && f.value.length > 0 ? ($(), P("button", {
          key: 3,
          type: "button",
          class: "filter-yui-kit__close",
          onClick: kn(m, ["stop"])
        }, [
          J(Ee, {
            name: L(xe).crossSmall
          }, null, 8, ["name"])
        ])) : ne("", !0)
      ], 2),
      i.isShow ? ($(), P("div", IR, [
        V("ul", ER, [
          V("li", HR, [
            f.value.length ? ne("", !0) : ($(), ge(Dt, {
              key: 0,
              disabled: "",
              text: "Все"
            }))
          ]),
          ($(!0), P(Re, null, Ze(f.value, (M) => ($(), P("li", {
            class: "filter-yui-kit__select-item",
            key: M.value
          }, [
            J(Dt, {
              disabled: !0,
              choosed: M.chose,
              type: M.type,
              onClick: (A) => p(M),
              text: M.label
            }, null, 8, ["choosed", "type", "onClick", "text"])
          ]))), 128))
        ]),
        RR,
        i.isShow ? ($(), P("ul", VR, [
          ($(!0), P(Re, null, Ze(h.value, (M) => ($(), P("li", {
            class: "filter-yui-kit__select-item",
            key: M.value
          }, [
            J(Dt, {
              disabled: !0,
              choosed: !1,
              type: M.type,
              text: M.label,
              onClick: (A) => p(M)
            }, null, 8, ["type", "text", "onClick"])
          ]))), 128)),
          V("li", YR, [
            f.value.length ? ($(), ge(Dt, {
              key: 0,
              disabled: "",
              text: "Все",
              onClick: m
            })) : ne("", !0)
          ])
        ])) : ne("", !0)
      ])) : ne("", !0)
    ])), [
      [
        L(j1),
        c,
        void 0,
        { bubble: !0 }
      ]
    ]);
  }
}), $p = /* @__PURE__ */ be(BR, [["__scopeId", "data-v-830c7ee5"]]), Mu = (e) => (er("data-v-6974725a"), e = e(), tr(), e), WR = {
  key: 0,
  class: "pie-chart"
}, FR = {
  key: 1,
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, NR = /* @__PURE__ */ Mu(() => /* @__PURE__ */ V("path", {
  d: "M8 1C4.136 1 1 4.136 1 8C1 11.864 4.136 15 8 15C11.864 15 15 11.864 15 8C15 4.136 11.864 1 8 1ZM8 13.6C4.906 13.6 2.4 11.094 2.4 8C2.4 4.906 4.906 2.4 8 2.4C11.094 2.4 13.6 4.906 13.6 8C13.6 11.094 11.094 13.6 8 13.6Z",
  fill: "#3BC648"
}, null, -1)), jR = /* @__PURE__ */ Mu(() => /* @__PURE__ */ V("circle", {
  cx: "8",
  cy: "8",
  r: "4",
  transform: "rotate(-180 8 8)",
  fill: "#3BC648"
}, null, -1)), UR = /* @__PURE__ */ Mu(() => /* @__PURE__ */ V("path", {
  d: "M10 6L7.5 9.83935L6 8.5",
  stroke: "white",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1)), ZR = [
  NR,
  jR,
  UR
], zR = /* @__PURE__ */ oe({
  __name: "CircularProgress",
  props: {
    percent: {}
  },
  setup(e) {
    const t = e, r = () => {
      const i = Math.min(Math.max(t.percent, 0), 100), a = i / 100 * 360;
      if (i <= 25)
        return `polygon(50% 50%, 50% 0%, calc(50% + 50% * cos(${a - 90}deg)) 0,calc(50% + 50% * cos(${a - 90}deg)) calc(50% + 50% * sin(${a - 90}deg)), 50% 50%)`;
      if (i <= 50)
        return `polygon(50% 50%, 50% 0%, 100% 0%, 100% calc(50% + 50% * sin(${a - 90}deg)), calc(50% + 50% * cos(${a - 90}deg)) calc(50% + 50% * sin(${a - 90}deg)), 50% 50%)`;
      if (i <= 75)
        return `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%,
    calc(50% + 50% * cos(${a - 90}deg)) 100%, calc(50% + 50% * cos(${a - 90}deg)) calc(50% + 50% * sin(${a - 90}deg)), 50% 50%)`;
      if (i <= 100)
        return `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%,0% 100%, 0% calc(50% + 50% * sin(${a - 90}deg)), 50% 50%)`;
    };
    return (i, a) => t.percent < 100 ? ($(), P("div", WR, [
      V("div", {
        class: "pie-chart-border",
        style: Pt({
          "border-color": t.percent < 50 ? "#ef9b8f" : "#ffcc00"
        })
      }, [
        V("div", {
          class: "sector",
          style: Pt({
            clipPath: r(),
            "background-color": t.percent < 50 ? "#ef9b8f" : "#ffcc00"
          })
        }, null, 4)
      ], 4)
    ])) : ($(), P("svg", FR, ZR));
  }
}), Mp = /* @__PURE__ */ be(zR, [["__scopeId", "data-v-6974725a"]]), qR = { class: "popover-yui-kit" }, GR = ["onClick"], XR = /* @__PURE__ */ oe({
  __name: "Popover",
  props: {
    iconName: { default: xe.moreVertical },
    options: { default: () => [] },
    tooltip: { default: "" }
  },
  setup(e) {
    const t = e, r = Fe({
      isShow: !1
    }), i = ie(null), a = ie(null), l = T(() => ({
      "popover-yui-kit__wrapper": !0,
      "active-yui-kit": r.isShow
    })), u = () => r.isShow = !r.isShow, c = () => {
      r.isShow = !1;
    }, f = (p) => {
      p.function(), r.isShow = !1;
    }, h = () => {
      if (a.value && i.value && r.isShow) {
        const p = a.value.getBoundingClientRect();
        i.value.style.top = `${p.top + p.height + 10}px`, i.value.style.left = `${p.left}px`;
      }
    };
    return ze(h), $e(() => r.isShow, h), ze(() => {
      window.addEventListener("scroll", () => r.isShow = !1, !0);
    }), ai(() => {
      window.removeEventListener("scroll", () => r.isShow = !1, !0);
    }), (p, m) => ($(), ge(fs, {
      hint: t.tooltip,
      size: "small",
      type: "black",
      position: "top-left",
      "is-can-show": !!t.tooltip && !r.isShow
    }, {
      default: me(() => [
        jt(($(), P("div", qR, [
          V("div", {
            class: le(l.value),
            onClick: u,
            ref_key: "currentRef",
            ref: a
          }, [
            J(Ee, {
              class: "popover-yui-kit__icon",
              name: t.iconName,
              width: 16,
              height: 16
            }, null, 8, ["name"])
          ], 2),
          jt(V("div", {
            class: "popover-yui-kit__options",
            ref_key: "dropdownRef",
            ref: i
          }, [
            ($(!0), P(Re, null, Ze(t.options, (C, g) => ($(), P("div", {
              class: "popover-yui-kit__options__item",
              key: g,
              onClick: (b) => f(C)
            }, ye(C.value), 9, GR))), 128))
          ], 512), [
            [B0, r.isShow]
          ])
        ])), [
          [
            L(j1),
            c,
            void 0,
            { bubble: !0 }
          ]
        ])
      ]),
      _: 1
    }, 8, ["hint", "is-can-show"]));
  }
}), Dp = /* @__PURE__ */ be(XR, [["__scopeId", "data-v-51f5cab4"]]), KR = /* @__PURE__ */ oe({
  name: "ScrollWrapper",
  __name: "ScrollWrapper",
  props: {
    isShowVerticalScroll: { type: Boolean, default: !1 }
  },
  emits: ["unmountScroll", "onMounted"],
  setup(e, { expose: t, emit: r }) {
    const i = r, a = ie(null), l = ie(null), u = ie(null), c = $o(
      "scrolledElement"
    ), f = ie(100), h = ie(!1), p = T(() => f.value !== 100);
    let m = 0, C = 0;
    const g = T(() => [
      {
        "scroll-wrapper__track_hide": f.value === 100,
        "scroll-wrapper__track_drag": h.value
      }
    ]);
    It(() => {
      c && c.value && M();
    }), It(() => {
      f.value === 100 && a.value && b(
        {
          "--scroll-bar-top-postion": "0%"
        },
        a.value
      );
    });
    const b = (...W) => {
      is(...W);
    }, M = () => {
      if (a.value) {
        const W = A();
        f.value = W, requestAnimationFrame(() => {
          a.value && b(
            {
              "--scroll-bar-height": `${W}%`
            },
            a.value
          );
        });
      }
    }, A = () => {
      if (c && c.value) {
        const W = c.value.clientHeight, N = c.value.scrollHeight;
        if (W >= N) return 100;
        if (W < N)
          return W / N * 100;
      }
      return 100;
    }, D = (W) => {
      Y(), i("unmountScroll", W);
    }, Y = () => {
      if (c && c.value && u.value) {
        const { scrollTop: W, scrollHeight: N, clientHeight: G } = c.value, re = N - G;
        if (re <= 0) return;
        const Ce = W / re, se = c.value.clientHeight, Oe = u.value.clientHeight, De = se - Oe, Ae = Ce * De;
        requestAnimationFrame(() => {
          a.value && b(
            { "--scroll-bar-top-postion": `${Ae}px` },
            a.value
          );
        });
      }
    }, K = (W) => {
      c && c.value && (h.value = !0, m = W.clientY, C = c.value.scrollTop, document.addEventListener("mousemove", H), document.addEventListener("mouseup", I));
    }, H = (W) => {
      if (h.value && c && c.value && u.value) {
        const N = W.clientY - m, G = (c.value.scrollHeight - c.value.clientHeight) / (c.value.clientHeight - u.value.clientHeight);
        c.value.scrollTop = C + N * G, Y();
      }
    }, I = () => {
      h.value = !1, document.removeEventListener("mousemove", H), document.removeEventListener("mouseup", I);
    }, U = (W) => {
      if (c && c.value && u.value) {
        const N = W.currentTarget.getBoundingClientRect(), G = W.clientY - N.top, re = u.value.clientHeight, Ce = N.height;
        let se = (G - re / 2) * ((c.value.scrollHeight - c.value.clientHeight) / (Ce - re));
        se = Math.max(
          0,
          Math.min(
            se,
            c.value.scrollHeight - c.value.clientHeight
          )
        ), c.value.scrollTop = se, Y();
      }
    }, E = new MutationObserver(() => {
      requestAnimationFrame(() => {
        M();
      });
    }), ee = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        M();
      });
    });
    return t({
      isVerticalScroll: p,
      handleScroll: D,
      setResizeElement: (W) => {
        E.observe(W, {
          childList: !0,
          subtree: !0
        }), ee.observe(W);
      },
      setScrollStyle: M
    }), ze(() => {
      i("onMounted");
    }), (W, N) => ($(), P("div", {
      ref_key: "scrollWrapper",
      ref: a,
      class: "scroll-wrapper",
      "data-testId": "ScrollWrapper"
    }, [
      V("div", {
        ref_key: "scrollSlot",
        ref: l,
        class: "scroll-wrapper__slot",
        "data-testId": "ScrollWrapper-Slot"
      }, [
        Be(W.$slots, "default", {}, void 0, !0)
      ], 512),
      p.value || W.isShowVerticalScroll ? ($(), P("div", {
        key: 0,
        class: le(["scroll-wrapper__track", g.value]),
        "data-testId": "ScrollWrapper-Track",
        onClick: kn(U, ["prevent"])
      }, [
        V("div", {
          ref_key: "scrollBar",
          ref: u,
          class: "scroll-wrapper__bar",
          "data-testId": "ScrollWrapper-Track-Bar",
          onMousedown: kn(K, ["prevent"])
        }, null, 544)
      ], 2)) : ne("", !0)
    ], 512));
  }
}), Du = /* @__PURE__ */ be(KR, [["__scopeId", "data-v-c16eccea"]]), JR = ["colspan", "rowspan"], QR = /* @__PURE__ */ oe({
  name: "TableTh",
  __name: "TableTh",
  props: {
    colspan: { default: 1 },
    rowspan: { default: 1 }
  },
  setup(e) {
    return (t, r) => ($(), P("th", {
      colspan: t.colspan,
      rowspan: t.rowspan,
      class: "table-th"
    }, [
      Be(t.$slots, "default", {}, void 0, !0)
    ], 8, JR));
  }
}), Su = /* @__PURE__ */ be(QR, [["__scopeId", "data-v-dbf15bc3"]]), eV = { class: "head-table-row" }, tV = /* @__PURE__ */ oe({
  name: "HeadTableRow",
  __name: "HeadTableRow",
  setup(e) {
    return (t, r) => ($(), P("tr", eV, [
      Be(t.$slots, "default", {}, void 0, !0)
    ]));
  }
}), Ou = /* @__PURE__ */ be(tV, [["__scopeId", "data-v-ff95e1da"]]), nV = /* @__PURE__ */ oe({
  name: "TableRow",
  __name: "TableRow",
  props: {
    type: { default: "default" }
  },
  setup(e) {
    const t = e, r = T(() => [
      { "table-row_selected": t.type === "selected" }
    ]);
    return (i, a) => ($(), P("tr", {
      class: le(["table-row", r.value])
    }, [
      Be(i.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Ua = /* @__PURE__ */ be(nV, [["__scopeId", "data-v-62276f74"]]), rV = {
  class: "table__table",
  "data-testid": "BaseTable-Head"
}, oV = /* @__PURE__ */ oe({
  name: "BaseTable",
  __name: "Table",
  props: {
    isShowVerticalScroll: { type: Boolean, default: !1 }
  },
  emits: ["unmountScroll", "unmount-intersection"],
  setup(e, { expose: t, emit: r }) {
    const i = r, a = ie(null), l = ie(null), u = ie(null), c = ie(null), f = ie(null), h = ie(null), p = Fe({
      // Получаем количество столбцов
      countColumn: T(() => {
        let D = 1;
        if (u.value)
          for (let Y = 0; Y < u.value.children.length; Y++)
            D = Math.max(
              u.value.children[Y].children.length,
              D
            );
        return D;
      })
    });
    li("scrolledElement", c), It(() => {
      c.value && (h.value = c.value);
    });
    const m = () => {
      if (u.value && a.value) {
        const D = u.value.getBoundingClientRect(), Y = D.width, K = D.height;
        requestAnimationFrame(() => {
          a.value && is(
            {
              "--scroll-track-margin": `${K}px 0 0 0`,
              "--table-width": `${Y}px`
            },
            a.value
          );
        });
      }
    }, C = new ResizeObserver((D) => {
      D.forEach(() => {
        m();
      });
    }), g = new IntersectionObserver(
      (D) => {
        D.forEach((Y) => {
          Y.isIntersecting && i("unmount-intersection");
        });
      },
      {
        rootMargin: "0px 0px 100px 0px"
      }
    ), b = (D) => {
      i("unmountScroll", D);
    }, M = () => {
      c.value && (c.value.scrollTop = 0);
    }, A = () => {
      c.value && l.value && (c.value.addEventListener(
        "scroll",
        l.value.handleScroll
      ), l.value.setResizeElement(c.value), l.value.setScrollStyle());
    };
    return t({
      scrollToTop: M
    }), ze(() => {
      u.value && a.value && (m(), C.observe(u.value)), f.value && g.observe(f.value.$el);
    }), (D, Y) => ($(), P("div", {
      ref_key: "tableDivRef",
      ref: a,
      class: "table",
      "data-testid": "BaseTable"
    }, [
      J(Du, {
        ref_key: "scrollWrapperRef",
        ref: l,
        class: "table__scroll-wrapper table__scroll-wrapper_head",
        isShowVerticalScroll: D.isShowVerticalScroll,
        onUnmountScroll: b,
        onOnMounted: A
      }, {
        default: me(() => [
          V("table", rV, [
            Be(D.$slots, "colgroup", {}, void 0, !0),
            V("thead", {
              ref_key: "refThead",
              ref: u,
              class: "table__header",
              "data-testid": "BaseTable-Header"
            }, [
              Be(D.$slots, "head", mo(Ji(p)), void 0, !0),
              D.$slots.search ? ($(), ge(Ou, {
                key: 0,
                class: "table__search-tr",
                "data-testid": "BaseTable-Head-SearchRow"
              }, {
                default: me(() => [
                  J(Su, {
                    colspan: p.countColumn,
                    class: "table__search-th",
                    "data-testid": "BaseTable-Head-SearchRow-Search"
                  }, {
                    default: me(() => [
                      Be(D.$slots, "search", {}, void 0, !0)
                    ]),
                    _: 3
                  }, 8, ["colspan"])
                ]),
                _: 3
              })) : ne("", !0)
            ], 512),
            V("tbody", {
              ref_key: "refTbody",
              ref: c,
              class: "table__body",
              "data-testid": "BaseTable-Body"
            }, [
              Be(D.$slots, "body", mo(Ji(p)), void 0, !0),
              J(Ua, {
                ref_key: "intersectionRef",
                ref: f,
                class: "table__intersection"
              }, null, 512)
            ], 512)
          ])
        ]),
        _: 3
      }, 8, ["isShowVerticalScroll"])
    ], 512));
  }
}), Sp = /* @__PURE__ */ be(oV, [["__scopeId", "data-v-abb175dc"]]), iV = ["rowspan", "colspan"], Lu = /* @__PURE__ */ oe({
  name: "TableTd",
  __name: "TableTd",
  props: {
    colspan: { default: 1 },
    rowspan: { default: 1 }
  },
  setup(e) {
    return (t, r) => ($(), P("td", {
      rowspan: t.rowspan,
      colspan: t.colspan,
      class: "table-td"
    }, [
      Be(t.$slots, "default")
    ], 8, iV));
  }
}), sV = /* @__PURE__ */ oe({
  name: "SectionTableRow",
  __name: "SectionTableRow",
  props: {
    colspan: {}
  },
  setup(e) {
    return (t, r) => ($(), ge(Ua, { class: "section-table-row" }, {
      default: me(() => [
        J(Lu, {
          colspan: t.colspan,
          class: "section-table-row__td"
        }, {
          default: me(() => [
            Be(t.$slots, "default", {}, void 0, !0)
          ]),
          _: 3
        }, 8, ["colspan"])
      ]),
      _: 3
    }));
  }
}), Op = /* @__PURE__ */ be(sV, [["__scopeId", "data-v-fc0d18dd"]]);
var E1 = /* @__PURE__ */ ((e) => (e.top = "top", e.bottom = "bottom", e))(E1 || {});
const aV = /* @__PURE__ */ oe({
  __name: "PopoverHover",
  props: {
    position: { default: E1.bottom }
  },
  setup(e) {
    const t = e, r = T(() => ({
      "popover-hover-yui-kit": !0,
      "popover_hover-yui-kit_top": t.position == E1.top
    }));
    return (i, a) => ($(), P("div", {
      class: le(r.value)
    }, [
      Be(i.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Lp = /* @__PURE__ */ be(aV, [["__scopeId", "data-v-4fa5feaa"]]), lV = ["disabled", "name", "value"], uV = /* @__PURE__ */ oe({
  name: "Radio",
  __name: "Radio",
  props: /* @__PURE__ */ En({
    name: {},
    value: {},
    disabled: { type: Boolean, default: !1 }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = Co(e, "modelValue");
    return (r, i) => jt(($(), P("input", {
      "onUpdate:modelValue": i[0] || (i[0] = (a) => t.value = a),
      type: "radio",
      disabled: r.disabled,
      name: r.name,
      value: r.value,
      class: "radio"
    }, null, 8, lV)), [
      [uv, t.value]
    ]);
  }
}), xp = /* @__PURE__ */ be(uV, [["__scopeId", "data-v-39a5175d"]]), cV = { class: "choosen-mini-options" }, dV = /* @__PURE__ */ oe({
  name: "ChoosenMiniOptions",
  __name: "ChoosenMiniOptions",
  props: {
    options: {}
  },
  emits: ["remove"],
  setup(e, { emit: t }) {
    const r = t, i = (a) => {
      r("remove", a);
    };
    return (a, l) => ($(), P("div", cV, [
      ($(!0), P(Re, null, Ze(a.options, (u) => ($(), P("div", {
        key: u.key,
        class: "choosen-mini-options__option"
      }, [
        J(Dt, {
          type: L(ut).blue,
          text: L(U1)(u) ? u.hint : u.value,
          class: "choosen-mini-options__badges",
          disabled: ""
        }, null, 8, ["type", "text"]),
        J(Ee, {
          name: L(xe).crossLarge,
          width: 10,
          height: 10,
          class: "choosen-mini-options__cross",
          onClick: (c) => i(u.key)
        }, null, 8, ["name", "onClick"])
      ]))), 128))
    ]));
  }
}), H0 = /* @__PURE__ */ be(dV, [["__scopeId", "data-v-e8e818a9"]]), fV = (e) => (er("data-v-40e0f617"), e = e(), tr(), e), hV = {
  key: 0,
  class: "filter__values"
}, pV = {
  key: 0,
  class: "filter__count"
}, vV = {
  key: 0,
  class: "filter__values"
}, gV = /* @__PURE__ */ fV(() => /* @__PURE__ */ V("li", { class: "filter__options-underline" }, [
  /* @__PURE__ */ V("hr", { class: "filter__options-underline-hr" })
], -1)), mV = /* @__PURE__ */ oe({
  name: "BaseFilter",
  __name: "BaseFilter",
  props: /* @__PURE__ */ En({
    options: {},
    title: {},
    isSearch: { type: Boolean, default: !1 },
    isPosibleToClear: { type: Boolean, default: !1 },
    isShowMiniOptions: { type: Boolean, default: !1 },
    defaultOption: { default: "Выберите значение" },
    class: {},
    disabled: { type: Boolean }
  }, {
    modelValue: {
      default: []
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ En(["change"], ["update:modelValue"]),
  setup(e, { emit: t }) {
    const r = e, i = t, a = ie(null), l = Co(e, "modelValue"), u = ie(), c = ie(""), f = T(() => {
      let H = [];
      return c.value ? (Ri(r.options) ? H = r.options.filter((I) => {
        var U;
        return I.value.toLowerCase().includes(c.value.toLowerCase()) || ((U = I == null ? void 0 : I.hint) == null ? void 0 : U.toLowerCase().includes(c.value.toLowerCase()));
      }) : H = r.options.filter((I) => I.value.toLowerCase().includes(c.value.toLowerCase())), H) : (Ri(r.options), H = r.options, H);
    }), h = T(() => {
      var I;
      return ((I = r.options.find((U) => Un.isArray(l.value) ? l.value.includes(U.key) : U.key === String(l.value))) == null ? void 0 : I.value) || r.defaultOption;
    }), p = T(() => r.options.filter((H) => Un.isArray(l.value) ? l.value.includes(H.key) && H.value !== h.value : H.key === String(l.value))), m = T(() => r.options.filter((H) => Un.isArray(l.value) ? l.value.includes(H.key) && H.value === h.value : H.key === String(l.value))), C = T(() => {
      var U, E, ee;
      const H = r.options;
      let I;
      return Un.isArray(l.value) ? Ri(H) ? I = (U = H.find(
        (ue) => ue.value === h.value
      )) == null ? void 0 : U.hint : I = (E = H.find(
        (ue) => ue.value === h.value
      )) == null ? void 0 : E.value : I = (ee = H.find((ue) => ue.key === String(l.value))) == null ? void 0 : ee.value, I || "";
    }), g = T(() => {
      var H;
      return Ri(r.options) ? !!C.value : ((H = a.value) == null ? void 0 : H.isSpanOverflow) || !1;
    }), b = T(() => Un.isArray(l.value) ? r.isPosibleToClear && l.value.length > 0 : r.isPosibleToClear && l.value), M = T(
      () => Un.isArray(l.value) && l.value.length > 1
    ), A = T(() => Un.isArray(l.value) ? l.value.length : null), D = (H) => {
      if (Un.isArray(l.value))
        l.value.includes(H) ? l.value = l.value.filter((I) => I !== H) : l.value = [...l.value, H];
      else {
        let I = r.options.find((U) => U.key === H);
        !I && Ri(r.options) && (I = r.options.find((U) => U.hint === H)), l.value = (I == null ? void 0 : I.key) || "", u.value = !1;
      }
      i("change", String(l.value));
    }, Y = (H) => {
      u.value = H;
    }, K = () => {
      Un.isArray(l.value) ? l.value = [] : l.value = "", i("change", l.value);
    };
    return (H, I) => ($(), ge(ui, {
      onChange: Y,
      "is-opened": u.value,
      class: le(r.class),
      "header-classes": "filter__header",
      "options-classes": "filter__options"
    }, {
      header: me(() => [
        V("span", {
          class: le([
            "filter__header-title",
            { "filter__header-title__active": u.value }
          ])
        }, ye(H.title), 3),
        J(fs, {
          position: "top-center",
          type: "blue",
          "is-can-show": g.value && !(M.value && H.isShowMiniOptions),
          hint: C.value,
          "hint-gap": 28,
          class: "filter__header-tooltip"
        }, {
          default: me(() => [
            J(Dt, {
              ref_key: "badgesRef",
              ref: a,
              type: h.value === r.defaultOption ? L(ut).default : L(ut).blue,
              class: "filter__options-badge",
              text: h.value,
              disabled: ""
            }, null, 8, ["type", "text"]),
            M.value && H.isShowMiniOptions ? ($(), P("div", hV, [
              J(H0, {
                onClick: I[0] || (I[0] = kn(() => {
                }, ["stop"])),
                options: m.value,
                onRemove: D
              }, null, 8, ["options"])
            ])) : ne("", !0)
          ]),
          _: 1
        }, 8, ["is-can-show", "hint"]),
        A.value && A.value > 1 ? ($(), P("span", pV, [
          Qn(" +" + ye(A.value - 1) + " ", 1),
          M.value ? ($(), P("div", vV, [
            J(H0, {
              onClick: I[1] || (I[1] = kn(() => {
              }, ["stop"])),
              options: p.value,
              onRemove: D
            }, null, 8, ["options"])
          ])) : ne("", !0)
        ])) : ne("", !0),
        b.value ? ($(), P("span", {
          key: 1,
          class: "filter__cross",
          onClick: kn(K, ["stop"])
        }, [
          J(Ee, {
            name: L(xe).crossLarge,
            width: 16,
            height: 16
          }, null, 8, ["name"])
        ])) : ne("", !0)
      ]),
      options: me(() => [
        H.isSearch ? ($(), ge(ds, {
          key: 0,
          "show-history": !1,
          modelValue: c.value,
          "onUpdate:modelValue": I[2] || (I[2] = (U) => c.value = U)
        }, null, 8, ["modelValue"])) : ne("", !0),
        J(Ha, {
          class: "filter__options-option",
          options: f.value,
          "default-option": h.value,
          onChange: D
        }, {
          default: me(() => [
            gV
          ]),
          _: 1
        }, 8, ["options", "default-option"])
      ]),
      _: 1
    }, 8, ["is-opened", "class"]));
  }
}), Tp = /* @__PURE__ */ be(mV, [["__scopeId", "data-v-40e0f617"]]), yV = /* @__PURE__ */ oe({
  name: "Range",
  __name: "Range",
  props: /* @__PURE__ */ En({
    min: { default: 0 },
    max: { default: 100 },
    step: { default: 1 },
    disabled: { type: Boolean, default: !1 }
  }, {
    modelValue: {
      default: 0
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ En(["unmount-change", "unmount-input"], ["update:modelValue"]),
  setup(e, { emit: t }) {
    const r = e, i = t, a = Co(e, "modelValue"), l = ie(null);
    $e(a, () => {
      c();
    });
    const u = () => (a.value - r.min) / (r.max - r.min) * 100, c = () => {
      requestAnimationFrame(() => {
        l.value && is(
          {
            "--progress": u() + "%"
          },
          l.value
        );
      });
    }, f = (p) => {
      const m = p.target;
      m && i("unmount-change", Number(m.value));
    }, h = (p) => {
      const m = p.target;
      m && i("unmount-change", Number(m.value));
    };
    return ze(() => {
      c();
    }), (p, m) => jt(($(), P("input", kr({
      ref_key: "input",
      ref: l,
      type: "range"
    }, r, {
      class: "range",
      "onUpdate:modelValue": m[0] || (m[0] = (C) => a.value = C),
      onChange: f,
      onInput: h
    }), null, 16)), [
      [ss, a.value]
    ]);
  }
}), Ap = /* @__PURE__ */ be(yV, [["__scopeId", "data-v-c1163d00"]]), R0 = {
  Accordion: Wh,
  Badges: Dt,
  BreadCrumbs: r2,
  Dialog: Bh,
  DragAndDrop: Fh,
  Card: Nh,
  Combobox: Kh,
  Calendar: Vh,
  Button: yr,
  Switch: N1,
  SelectList: ui,
  Dropdown: l2,
  Textarea: vp,
  Filter: Gh,
  SelectFilter: Xh,
  Icon: Ee,
  Input: Qh,
  InputNumber: ep,
  Picture: mp,
  PopoverHover: Lp,
  PushNotification: bp,
  Scroll: lp,
  Search: ds,
  Modal: up,
  Slider: rp,
  Checkbox: fp,
  Toggle: ku,
  UserMenu: hp,
  CopyIcon: wp,
  Loader: kp,
  FilterTag: $p,
  CircularProgress: Mp,
  Popover: Dp,
  Table: Sp,
  TableRow: Ua,
  TableTd: Lu,
  TableTh: Su,
  SectionTableRow: Op,
  HeadTableRow: Ou,
  ScrollWrapper: Du,
  Radio: xp,
  Tooltip: fs,
  BaseFilter: Tp,
  Range: Ap
}, _V = Iv(), CV = (e) => {
  e.use(_V), Object.keys(R0).forEach((t) => {
    e.component("Y" + t, R0[t]);
  });
}, bV = {
  install: CV
}, V0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Accordion: Wh,
  Badges: Dt,
  BaseFilter: Tp,
  BreadCrumbs: r2,
  Button: yr,
  Calendar: Vh,
  Card: Nh,
  Checkbox: fp,
  CircularProgress: Mp,
  Combobox: Kh,
  CopyIcon: wp,
  Dialog: Bh,
  DragAndDrop: Fh,
  Dropdown: l2,
  Filter: Gh,
  FilterTag: $p,
  HeadTableRow: Ou,
  Icon: Ee,
  Input: Qh,
  InputNumber: ep,
  Loader: kp,
  Modal: up,
  Picture: mp,
  Popover: Dp,
  PopoverHover: Lp,
  PushNotification: bp,
  Radio: xp,
  Range: Ap,
  Scroll: lp,
  ScrollWrapper: Du,
  Search: ds,
  SectionTableRow: Op,
  SelectFilter: Xh,
  SelectList: ui,
  Slider: rp,
  Switch: N1,
  Table: Sp,
  TableRow: Ua,
  TableTd: Lu,
  TableTh: Su,
  Textarea: vp,
  Toggle: ku,
  Tooltip: fs,
  UserMenu: hp,
  default: bV
}, Symbol.toStringTag, { value: "Module" })), kV = {
  install(e) {
    for (const t in V0) {
      const r = V0[t];
      e.use(r);
    }
  }
};
export {
  Wh as Accordion,
  Dt as Badges,
  Tp as BaseFilter,
  r2 as BreadCrumbs,
  yr as Button,
  Vh as Calendar,
  Nh as Card,
  fp as Checkbox,
  Mp as CircularProgress,
  Kh as Combobox,
  wp as CopyIcon,
  Bh as Dialog,
  Fh as DragAndDrop,
  l2 as Dropdown,
  Gh as Filter,
  $p as FilterTag,
  Ou as HeadTableRow,
  Ee as Icon,
  Qh as Input,
  ep as InputNumber,
  kp as Loader,
  up as Modal,
  mp as Picture,
  Dp as Popover,
  Lp as PopoverHover,
  bp as PushNotification,
  xp as Radio,
  Ap as Range,
  lp as Scroll,
  Du as ScrollWrapper,
  ds as Search,
  Op as SectionTableRow,
  Xh as SelectFilter,
  ui as SelectList,
  rp as Slider,
  N1 as Switch,
  Sp as Table,
  Ua as TableRow,
  Lu as TableTd,
  Su as TableTh,
  vp as Textarea,
  ku as Toggle,
  fs as Tooltip,
  hp as UserMenu,
  kV as default
};
