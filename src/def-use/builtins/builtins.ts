import { SourceType, taintManager as tm } from "../../taint";
import { AttributeSchema, BuiltinSchema, FunctionSchema } from "./builtinTypes";

// Helper to create method schemas
const method = (name: string, effect?: string): FunctionSchema => ({
  type: "function",
  name,
  effect: effect || name,
});

const attribute = (name: string, sourceType?: SourceType): AttributeSchema => ({
  type: "attribute",
  name,
  sourceType,
});

const BUILTINS: BuiltinSchema[] = [
  {
    type: "constructor",
    name: "Object",
    proto: "Function",
    prototypeName: "Object.prototype",
    staticMethods: {
      assign: method("Object.assign"),
      create: method("Object.create"),
      defineProperties: method("Object.defineProperties"),
      defineProperty: method("Object.defineProperty"),
      entries: method("Object.entries"),
      values: method("Object.values"),
      keys: method("Object.keys"),
      getPrototypeOf: method("Object.getPrototypeOf"),
      setPrototypeOf: method("Object.setPrototypeOf"),
    },
    prototypeMethods: {},
  },
  {
    type: "constructor",
    name: "TextEncoder",
    proto: "Function",
    prototypeName: "TextEncoder.prototype",
    staticMethods: {},
    prototypeMethods: {
      encode: method("TextEncoder.prototype.encode"),
    },
  },
  {
    type: "constructor",
    name: "Uint8Array",
    proto: "Function",
    prototypeName: "Uint8Array.prototype",
    prototypeProto: "Array.prototype",
    staticMethods: {
      fromBase64: method("Uint8Array.fromBase64"),
      fromHex: method("Uint8Array.fromHex"),
    },
    prototypeMethods: {
      constructor: method("Uint8Array.prototype.constructor"),
      setFromBase64: method("Uint8Array.prototype.setFromBase64"),
      setFromHex: method("Uint8Array.prototype.setFromHex"),
      toBase64: method("Uint8Array.prototype.toBase64"),
      toHex: method("Uint8Array.prototype.toHex"),
    },
  },
  {
    type: "constructor",
    name: "Array",
    proto: "Function",
    prototypeName: "Array.prototype",
    staticMethods: {
      from: method("Array.from"),
      of: method("Array.of"),
    },
    prototypeMethods: {
      constructor: method("Array.prototype.constructor"),
      at: method("Array.prototype.at"),
      concat: method("Array.prototype.concat"),
      fill: method("Array.prototype.fill"),
      filter: method("Array.prototype.filter"),
      find: method("Array.prototype.find"),
      forEach: method("Array.prototype.forEach"),
      map: method("Array.prototype.map"),
      pop: method("Array.prototype.pop"),
      push: method("Array.prototype.push"),
      reduce: method("Array.prototype.reduce"),
      reverse: method("Array.prototype.reverse"),
      shift: method("Array.prototype.shift"),
      unshift: method("Array.prototype.unshift"),
      sort: method("Array.prototype.sort"),
      toString: method("Array.prototype.toString"),
      join: method("Array.prototype.join"),
      slice: method("Array.prototype.slice"),
      splice: method("Array.prototype.splice"),
      // set: method("Array.prototype.set"),
    },
  },
  {
    type: "constructor",
    name: "Function",
    proto: "Function",
    prototypeName: "Function.prototype",
    staticMethods: {},
    prototypeMethods: {
      constructor: method("Function.prototype.constructor"),
      call: method("Function.prototype.call"),
      apply: method("Function.prototype.apply"),
      bind: method("Function.prototype.bind"),
    },
  },
  {
    type: "constructor",
    name: "Map",
    proto: "Function",
    prototypeName: "Map.prototype",
    staticMethods: {},
    prototypeMethods: {
      constructor: method("Map.prototype.constructor"),
      set: method("Map.prototype.set"),
      get: method("Map.prototype.get"),
      clear: method("Map.prototype.clear"),
    },
  },
  {
    type: "constructor",
    name: "URL",
    proto: "Function",
    prototypeName: "URL.prototype",
    staticMethods: {},
    prototypeMethods: {
      constructor: method("URL.prototype.constructor"),
    },
  },
  {
    type: "constructor",
    name: "URLSearchParams",
    proto: "Function",
    prototypeName: "URLSearchParams.prototype",
    staticMethods: {},
    prototypeMethods: {
      constructor: method("URLSearchParams.prototype.constructor"),
      append: method("URLSearchParams.prototype.append"),
      set: method(
        "URLSearchParams.prototype.set",
        "URLSearchParams.prototype.append",
      ),
      toString: method("URLSearchParams.prototype.toString"),
    },
  },
  {
    type: "constructor",
    name: "String",
    proto: "Function",
    prototypeName: "String.prototype",
    staticMethods: {
      fromCharCode: method("String.fromCharCode"),
    },
    prototypeMethods: {
      concat: method("String.prototype.concat"),
      normalize: method("String.prototype.normalize"),
      repeat: method("String.prototype.repeat"),
      replace: method("String.prototype.replace"),
      // search: method("String.prototype.search"),
      replaceAll: method("String.prototype.replaceAll"),
      slice: method("String.prototype.slice"),
      split: method("String.prototype.split"),
      substring: method("String.prototype.substring"),
      trim: method("String.prototype.trim"),
      trimEnd: method("String.prototype.trimEnd"),
      trimStart: method("String.prototype.trimStart"),
    },
  },
  {
    type: "constructor",
    name: "Promise",
    proto: "Function",
    prototypeName: "Promise.prototype",
    staticMethods: {
      resolve: method("Promise.resolve"),
      all: method("Promise.all"),
      // any: method("Promise.any"),
    },
    prototypeMethods: {
      constructor: method("Promise.prototype.constructor"),
      then: method("Promise.prototype.then"),
    },
  },
  {
    type: "constructor",
    name: "Set",
    proto: "Function",
    prototypeName: "Set.prototype",
    staticMethods: {},
    prototypeMethods: {
      constructor: method("Set.prototype.constructor"),
      add: method("Set.prototype.add"),
      forEach: method("Set.prototype.forEach"),
      clear: method("Set.prototype.clear"),
      union: method("Set.prototype.union"),
    },
  },
  {
    type: "constructor",
    name: "JSON",
    proto: "Function",
    prototypeName: "JSON.prototype",
    staticMethods: {
      parse: method("JSON.parse"),
      stringify: method("JSON.stringify"),
    },
    prototypeMethods: {},
  },
  {
    type: "constructor",
    name: "Blob",
    proto: "Function",
    prototypeName: "Blob.prototype",
    staticMethods: {},
    prototypeMethods: {
      constructor: method("Blob.prototype.constructor"),
      arrayBuffer: method("Blob.prototype.arrayBuffer"),
      bytes: method("Blob.prototype.bytes"),
      slice: method("Blob.prototype.slice"),
      stream: method("Blob.prototype.stream"),
      text: method("Blob.prototype.text"),
    },
  },
  {
    type: "constructor",
    name: "Worker",
    proto: "Function",
    prototypeName: "Worker.prototype",
    staticMethods: {},
    prototypeMethods: {
      constructor: method("Worker.prototype.constructor"),
    },
  },
  {
    type: "object",
    name: "WebAssembly",
    props: {
      instantiate: method("WebAssembly.instantiate"),
      instantiateStreaming: method("WebAssembly.instantiateStreaming"),
      compile: method("WebAssembly.compile"),
      compileStreaming: method("WebAssembly.compileStreaming"),
    },
  },
  {
    type: "constructor",
    name: "FormData",
    proto: "Function",
    prototypeName: "FormData.prototype",
    staticMethods: {},
    prototypeMethods: {
      constructor: method("FormData.prototype.constructor"),
      append: method("FormData.prototype.append"),
      set: method("FormData.prototype.set"),
      get: method("FormData.prototype.get"),
      getAll: method("FormData.prototype.getAll"),
    },
  },
  {
    type: "constructor",
    name: "XMLHttpRequest",
    proto: "Function",
    prototypeName: "XMLHttpRequest.prototype",
    staticMethods: {},
    prototypeMethods: {
      // constructor: method("XMLHttpRequest.prototype.constructor"),
      open: method("XMLHttpRequest.prototype.open"),
      send: method("XMLHttpRequest.prototype.send"),
      setRequestHeader: method("XMLHttpRequest.prototype.setRequestHeader"),
    },
  },
  {
    type: "constructor",
    name: "WebSocket",
    proto: "Function",
    prototypeName: "WebSocket.prototype",
    staticMethods: {},
    prototypeMethods: {
      constructor: method("WebSocket.prototype.constructor"),
      send: method("WebSocket.prototype.send"),
    },
  },
  {
    type: "object",
    name: "chrome",
    // Firefox WebExtensions expose the same API surface under the `browser.*`
    // namespace (heavily used alongside `chrome.*` in real add-ons). Aliasing
    // it to the very same Def tree means every chrome.* semantic handler fires
    // for browser.* too — no handler duplication, identical taint results.
    alias: "browser",
    props: {
      action: {
        type: "object",
        name: "chrome.action",
        props: {
          disable: method("chrome.action.disable"),
          enable: method("chrome.action.enable"),
          openPopup: method("chrome.action.openPopup"),
          setBadgeText: method("chrome.action.setBadgeText"),
          setIcon: method("chrome.action.setIcon"),
          setPopup: method("chrome.action.setPopup"),
          setTitle: method("chrome.action.setTitle"),
        },
      },
      alarms: {
        type: "object",
        name: "chrome.alarms",
        props: {
          create: method("chrome.alarms.create"),
          clear: method("chrome.alarms.clear"),
        },
      },
      bookmarks: {
        type: "object",
        name: "chrome.bookmarks",
        props: {
          get: method("chrome.bookmarks.get"),
          getChildren: method("chrome.bookmarks.getChildren"),
          getRecent: method("chrome.bookmarks.getRecent"),
          getSubTree: method("chrome.bookmarks.getSubTree"),
          getTree: method("chrome.bookmarks.getTree"),
          search: method("chrome.bookmarks.search"),
          create: method("chrome.bookmarks.create"),
          move: method("chrome.bookmarks.move"),
          remove: method("chrome.bookmarks.remove"),
          removeTree: method("chrome.bookmarks.removeTree"),
          update: method("chrome.bookmarks.update"),
          onCreated: {
            type: "object",
            name: "chrome.bookmarks.onCreated",
            props: {
              addListener: method("chrome.bookmarks.onCreated.addListener"),
            },
          },
        },
      },
      browsingData: {
        type: "object",
        name: "chrome.browsingData",
        props: {
          remove: method("chrome.browsingData.remove"),
          removeAppcache: method("chrome.browsingData.removeAppcache"),
          removeCache: method("chrome.browsingData.removeCache"),
          removeCacheStorage: method("chrome.browsingData.removeCacheStorage"),
          removeCookies: method("chrome.browsingData.removeCookies"),
          removeDownloads: method("chrome.browsingData.removeDownloads"),
          removeFileSystems: method("chrome.browsingData.removeFileSystems"),
          removeFormData: method("chrome.browsingData.removeFormData"),
          removeHistory: method("chrome.browsingData.removeHistory"),
          removeIndexedDB: method("chrome.browsingData.removeIndexedDB"),
          removeLocalStorage: method("chrome.browsingData.removeLocalStorage"),
          removePasswords: method("chrome.browsingData.removePasswords"),
          removeServiceWorkers: method(
            "chrome.browsingData.removeServiceWorkers",
          ),
          removeWebSQL: method("chrome.browsingData.removeWebSQL"),
        },
      },
      contentSettings: {
        type: "object",
        name: "chrome.contentSettings",
        props: {
          cookies: {
            type: "object",
            name: "chrome.contentSettings.cookies",
            props: {
              set: method("chrome.contentSettings.cookies.set"),
              clear: method("chrome.contentSettings.cookies.clear"),
            },
          },
          images: {
            type: "object",
            name: "chrome.contentSettings.images",
            props: {
              set: method("chrome.contentSettings.images.set"),
              clear: method("chrome.contentSettings.images.clear"),
            },
          },
          javascript: {
            type: "object",
            name: "chrome.contentSettings.javascript",
            props: {
              set: method("chrome.contentSettings.javascript.set"),
              clear: method("chrome.contentSettings.javascript.clear"),
            },
          },
          plugins: {
            type: "object",
            name: "chrome.contentSettings.plugins",
            props: {
              set: method("chrome.contentSettings.plugins.set"),
              clear: method("chrome.contentSettings.plugins.clear"),
            },
          },
          popups: {
            type: "object",
            name: "chrome.contentSettings.popups",
            props: {
              set: method("chrome.contentSettings.popups.set"),
              clear: method("chrome.contentSettings.popups.clear"),
            },
          },
          notifications: {
            type: "object",
            name: "chrome.contentSettings.notifications",
            props: {
              set: method("chrome.contentSettings.notifications.set"),
              clear: method("chrome.contentSettings.notifications.clear"),
            },
          },
          microphone: {
            type: "object",
            name: "chrome.contentSettings.microphone",
            props: {
              set: method("chrome.contentSettings.microphone.set"),
              clear: method("chrome.contentSettings.microphone.clear"),
            },
          },
          camera: {
            type: "object",
            name: "chrome.contentSettings.camera",
            props: {
              set: method("chrome.contentSettings.camera.set"),
              clear: method("chrome.contentSettings.camera.clear"),
            },
          },
          geolocation: {
            type: "object",
            name: "chrome.contentSettings.geolocation",
            props: {
              set: method("chrome.contentSettings.geolocation.set"),
              clear: method("chrome.contentSettings.geolocation.clear"),
            },
          },
          midi: {
            type: "object",
            name: "chrome.contentSettings.midi",
            props: {
              set: method("chrome.contentSettings.midi.set"),
              clear: method("chrome.contentSettings.midi.clear"),
            },
          },
          backgroundSync: {
            type: "object",
            name: "chrome.contentSettings.backgroundSync",
            props: {
              set: method("chrome.contentSettings.backgroundSync.set"),
              clear: method("chrome.contentSettings.backgroundSync.clear"),
            },
          },
          automaticDownloads: {
            type: "object",
            name: "chrome.contentSettings.automaticDownloads",
            props: {
              set: method("chrome.contentSettings.automaticDownloads.set"),
              clear: method("chrome.contentSettings.automaticDownloads.clear"),
            },
          },
        },
      },
      cookies: {
        type: "object",
        name: "chrome.cookies",
        props: {
          get: method("chrome.cookies.get"),
          getAll: method("chrome.cookies.getAll"),
          getAllCookieStores: method("chrome.cookies.getAllCookieStores"),
          remove: method("chrome.cookies.remove"),
          set: method("chrome.cookies.set"),
          onChanged: {
            type: "object",
            name: "chrome.cookies.onChanged",
            props: {
              addListener: method("chrome.cookies.onChanged.addListener"),
            },
          },
        },
      },
      declarativeContent: {
        type: "object",
        name: "chrome.declarativeContent",
        props: {
          onPageChanged: {
            type: "object",
            name: "chrome.declarativeContent.onPageChanged",
            props: {
              addRules: method(
                "chrome.declarativeContent.onPageChanged.addRules",
              ),
              removeRules: method(
                "chrome.declarativeContent.onPageChanged.removeRules",
              ),
            },
          },
        },
      },
      devtools: {
        type: "object",
        name: "chrome.devtools",
        props: {
          panels: {
            type: "object",
            name: "chrome.devtools.panels",
            props: {
              create: method("chrome.devtools.panels.create"),
            },
          },
        },
      },
      debugger: {
        type: "object",
        name: "chrome.debugger",
        props: {
          sendCommand: method("chrome.debugger.sendCommand"),
        },
      },
      declarativeNetRequest: {
        type: "object",
        name: "chrome.declarativeNetRequest",
        props: {
          updateDynamicRules: method(
            "chrome.declarativeNetRequest.updateDynamicRules",
          ),
          updateSessionRules: method(
            "chrome.declarativeNetRequest.updateSessionRules",
          ),
          updateEnabledRulesets: method(
            "chrome.declarativeNetRequest.updateEnabledRulesets",
          ),
        },
      },
      downloads: {
        type: "object",
        name: "chrome.downloads",
        props: {
          search: method("chrome.downloads.search"),
          download: method("chrome.downloads.download"),
          removeFile: method("chrome.downloads.removeFile"),
          getFileIcon: method("chrome.downloads.getFileIcon"),
          onChanged: {
            type: "object",
            name: "chrome.downloads.onChanged",
            props: {
              addListener: method("chrome.downloads.onChanged.addListener"),
            },
          },
          onCreated: {
            type: "object",
            name: "chrome.downloads.onCreated",
            props: {
              addListener: method("chrome.downloads.onCreated.addListener"),
            },
          },
        },
      },
      fontSettings: {
        type: "object",
        name: "chrome.fontSettings",
        props: {
          setFont: method("chrome.fontSettings.setFont"),
          getFontList: method("chrome.fontSettings.getFontList"),
          setDefaultFontSize: method("chrome.fontSettings.setDefaultFontSize"),
        },
      },
      gcm: {
        type: "object",
        name: "chrome.gcm",
        props: {
          send: method("chrome.gcm.send"),
        },
      },
      history: {
        type: "object",
        name: "chrome.history",
        props: {
          search: method("chrome.history.search"),
          getVisits: method("chrome.history.getVisits"),
          addUrl: method("chrome.history.addUrl"),
          deleteRange: method("chrome.history.deleteRange"),
          deleteUrl: method("chrome.history.deleteUrl"),
          onVisited: {
            type: "object",
            name: "chrome.history.onVisited",
            props: {
              addListener: method("chrome.history.onVisited.addListener"),
            },
          },
        },
      },
      identity: {
        type: "object",
        name: "chrome.identity",
        props: {
          getAuthToken: method("chrome.identity.getAuthToken"),
          getProfileUserInfo: method("chrome.identity.getProfileUserInfo"),
        },
      },
      management: {
        type: "object",
        name: "chrome.management",
        props: {
          get: method("chrome.management.get"),
          getAll: method("chrome.management.getAll"),
          setEnabled: method("chrome.management.setEnabled"),
          uninstall: method("chrome.management.uninstall"),
          launchApp: method("chrome.management.launchApp"),
          onEnabled: {
            type: "object",
            name: "chrome.management.onEnabled",
            props: {
              addListener: method("chrome.management.onEnabled.addListener"),
            },
          },
          onDisabled: {
            type: "object",
            name: "chrome.management.onDisabled",
            props: {
              addListener: method("chrome.management.onDisabled.addListener"),
            },
          },
          onInstalled: {
            type: "object",
            name: "chrome.management.onInstalled",
            props: {
              addListener: method("chrome.management.onInstalled.addListener"),
            },
          },
        },
      },
      notifications: {
        type: "object",
        name: "chrome.notifications",
        props: {
          create: method("chrome.notifications.create"),
          update: method("chrome.notifications.update"),
          clear: method("chrome.notifications.clear"),
        },
      },
      pageCapture: {
        type: "object",
        name: "chrome.pageCapture",
        props: {
          saveAsMHTML: method("chrome.pageCapture.saveAsMHTML"),
        },
      },
      offscreen: {
        type: "object",
        name: "chrome.offscreen",
        props: {
          createDocument: method("chrome.offscreen.createDocument"),
          closeDocument: method("chrome.offscreen.closeDocument"),
          hasDocument: method("chrome.offscreen.hasDocument"),
        },
      },
      proxy: {
        type: "object",
        name: "chrome.proxy",
        props: {
          settings: {
            type: "object",
            name: "chrome.proxy.settings",
            props: {
              set: method("chrome.proxy.settings.set"),
            },
          },
        },
      },
      readingList: {
        type: "object",
        name: "chrome.readingList",
        props: {
          query: method("chrome.readingList.query"),
        },
      },
      runtime: {
        type: "object",
        name: "chrome.runtime",
        props: {
          // self extension id
          id: attribute("chrome.runtime.id"),
          getURL: method("chrome.runtime.getURL"),
          sendMessage: method("chrome.runtime.sendMessage"),
          sendNativeMessage: method("chrome.runtime.sendNativeMessage"),
          connect: method("chrome.runtime.connect"),
          connectNative: method("chrome.runtime.connectNative"),
          onConnect: {
            type: "object",
            name: "chrome.runtime.onConnect",
            props: {
              addListener: method("chrome.runtime.onConnect.addListener"),
            },
          },
          onMessage: {
            type: "object",
            name: "chrome.runtime.onMessage",
            props: {
              addListener: method("chrome.runtime.onMessage.addListener"),
            },
          },
          onMessageExternal: {
            type: "object",
            name: "chrome.runtime.onMessageExternal",
            props: {
              addListener: method(
                "chrome.runtime.onMessageExternal.addListener",
              ),
            },
          },
          onConnectExternal: {
            type: "object",
            name: "chrome.runtime.onConnectExternal",
            props: {
              addListener: method(
                "chrome.runtime.onConnectExternal.addListener",
              ),
            },
          },
          onConnectNative: {
            type: "object",
            name: "chrome.runtime.onConnectNative",
            props: {
              addListener: method("chrome.runtime.onConnectNative.addListener"),
            },
          },
        },
      },
      scripting: {
        type: "object",
        name: "chrome.scripting",
        props: {
          executeScript: method("chrome.scripting.executeScript"),
        },
      },
      sidePanel: {
        type: "object",
        name: "chrome.sidePanel",
        props: {
          // Modeled as side-effect-only no-ops; nothing taints through here today.
          setOptions: method("chrome.sidePanel.setOptions"),
          setPanelBehavior: method("chrome.sidePanel.setPanelBehavior"),
          open: method("chrome.sidePanel.open"),
        },
      },
      storage: {
        type: "object",
        name: "chrome.storage",
        props: {
          local: {
            type: "object",
            name: "chrome.storage.local",
            props: {
              set: method("chrome.storage.local.set"),
              get: method("chrome.storage.local.get"),
            },
          },
          sync: {
            type: "object",
            name: "chrome.storage.sync",
            props: {
              set: method("chrome.storage.sync.set"),
              get: method("chrome.storage.sync.get"),
            },
          },
          session: {
            type: "object",
            name: "chrome.storage.session",
            props: {
              set: method("chrome.storage.session.set"),
              get: method("chrome.storage.session.get"),
            },
          },
          managed: {
            type: "object",
            name: "chrome.storage.managed",
            props: {
              get: method("chrome.storage.managed.get"),
            },
          },
        },
      },
      system: {
        type: "object",
        name: "chrome.system",
        props: {
          cpu: {
            type: "object",
            name: "chrome.system.cpu",
            props: {
              getInfo: method("chrome.system.cpu.getInfo"),
            },
          },
          display: {
            type: "object",
            name: "chrome.system.display",
            props: {
              getInfo: method("chrome.system.display.getInfo"),
              getDisplayLayout: method(
                "chrome.system.display.getDisplayLayout",
              ),
            },
          },
          memory: {
            type: "object",
            name: "chrome.system.memory",
            props: {
              getInfo: method("chrome.system.memory.getInfo"),
            },
          },
          storage: {
            type: "object",
            name: "chrome.system.storage",
            props: {
              getInfo: method("chrome.system.storage.getInfo"),
            },
          },
        },
      },

      tabs: {
        type: "object",
        name: "chrome.tabs",
        props: {
          create: method("chrome.tabs.create"),
          captureVisibleTab: method("chrome.tabs.captureVisibleTab"),
          detectLanguage: method("chrome.tabs.detectLanguage"),
          sendMessage: method("chrome.tabs.sendMessage"),
          connect: method("chrome.tabs.connect", "chrome.runtime.connect"), // effect is same as runtime
          executeScript: method("chrome.tabs.executeScript"),
        },
      },
      topSites: {
        type: "object",
        name: "chrome.topSites",
        props: {
          get: method("chrome.topSites.get"),
        },
      },
      windows: {
        type: "object",
        name: "chrome.windows",
        props: {
          create: method("chrome.windows.create"),
          update: method("chrome.windows.update"),
        },
      },
    },
  },
  {
    type: "object",
    name: "navigator",
    props: {
      geolocation: {
        type: "object",
        name: "navigator.geolocation",
        props: {
          getCurrentPosition: method(
            "navigator.geolocation.getCurrentPosition",
          ),
          watchPosition: method("navigator.geolocation.watchPosition"),
        },
      },
      clipboard: {
        type: "object",
        name: "navigator.clipboard",
        props: {
          read: method("navigator.clipboard.read"),
          readText: method("navigator.clipboard.readText"),
        },
      },
      connection: {
        type: "object",
        name: "navigator.connection",
        props: {
          downlink: attribute(
            "navigator.connection.downlink",
            "NAVIGATOR_CONNECTION",
          ),
          effectiveType: attribute(
            "navigator.connection.effectiveType",
            "NAVIGATOR_CONNECTION",
          ),
          rtt: attribute("navigator.connection.rtt", "NAVIGATOR_CONNECTION"),
        },
      },
      deviceMemory: attribute(
        "navigator.deviceMemory",
        "NAVIGATOR_DEVICE_MEMORY",
      ),
      gpu: {
        type: "object",
        name: "navigator.gpu",
        props: {
          requestAdapter: method("navigator.gpu.requestAdapter"),
        },
      },
      hardwareConcurrency: attribute(
        "navigator.hardwareConcurrency",
        "NAVIGATOR_HARDWARE_CONCURRENCY",
      ),
      language: attribute("navigator.language", "NAVIGATOR_LANGUAGE"),
      languages: attribute("navigator.languages", "NAVIGATOR_LANGUAGE"),
      maxTouchPoints: attribute(
        "navigator.maxTouchPoints",
        "NAVIGATOR_MAX_TOUCH_POINTS",
      ),
      platform: attribute("navigator.platform", "NAVIGATOR_PLATFORM"),
      plugins: attribute("navigator.plugins", "NAVIGATOR_PLUGINS"),
      userAgent: attribute("navigator.userAgent", "NAVIGATOR_USER_AGENT"),
      userAgentData: attribute(
        "navigator.userAgentData",
        "NAVIGATOR_USER_AGENT",
      ),
      // vendor: attribute("navigator.vendor", "NAVIGATOR_USER_AGENT"),
    },
  },
  {
    type: "function",
    name: "fetch",
    effect: "fetch",
  },
  {
    type: "function",
    name: "decodeURI",
    effect: "decodeURI",
  },
  {
    type: "function",
    name: "encodeURI",
    effect: "encodeURI",
  },
  {
    type: "function",
    name: "decodeURIComponent",
    effect: "decodeURIComponent",
  },
  {
    type: "function",
    name: "encodeURIComponent",
    effect: "encodeURIComponent",
  },
  {
    type: "function",
    name: "eval",
    effect: "eval",
  },
  {
    type: "function",
    name: "setTimeout",
    effect: "setTimeout",
  },
  {
    type: "function",
    name: "setInterval",
    effect: "setInterval",
  },
  {
    type: "function",
    name: "atob",
    effect: "atob",
  },
  {
    type: "function",
    name: "btoa",
    effect: "btoa",
  },
  // Numeric/string casting built-ins. These appear constantly in extension
  // code (URL params, querystring parsing, JSON-ish payloads). Without
  // semantics, a tainted `parseInt(window.location.search.slice(1))` would
  // silently drop its taint on the cast and downstream sinks would miss it.
  //
  // We intentionally skip `Number`/`String`/`Boolean`/`Array` here — they
  // collide with the constructor/object schemas registered elsewhere; the
  // safest taint-preserving coverage comes from the four globals below.
  {
    type: "function",
    name: "parseInt",
    effect: "parseInt",
  },
  {
    type: "function",
    name: "parseFloat",
    effect: "parseFloat",
  },
  {
    type: "function",
    name: "isNaN",
    effect: "isNaN",
  },
  {
    type: "function",
    name: "isFinite",
    effect: "isFinite",
  },
  {
    type: "function",
    name: "postMessage",
    effect: "postMessage",
  },
  {
    type: "function",
    name: "addEventListener",
    effect: "addEventListener",
  },
  {
    type: "object",
    name: "localStorage",
    props: {
      setItem: method("localStorage.setItem"),
      removeItem: method("localStorage.removeItem"),
    },
  },
  {
    type: "object",
    name: "sessionStorage",
    props: {
      setItem: method("sessionStorage.setItem"),
      removeItem: method("sessionStorage.removeItem"),
    },
  },
  {
    // Document.location / Window.location
    type: "object",
    name: "location",
    props: {
      href: attribute("location.href", "DOCUMENT_LOCATION"),
      // protocol: attribute("location.protocol", "DOCUMENT_LOCATION"),
      host: attribute("location.host", "DOCUMENT_LOCATION"),
      hostname: attribute("location.hostname", "DOCUMENT_LOCATION"),
      port: attribute("location.port", "DOCUMENT_LOCATION"),
      pathname: attribute("location.pathname", "DOCUMENT_LOCATION"),
      search: attribute("location.search", "DOCUMENT_LOCATION"),
      hash: attribute("location.hash", "DOCUMENT_LOCATION"),
      origin: attribute("location.origin", "DOCUMENT_LOCATION"),
      username: attribute("location.username", "DOCUMENT_LOCATION"),
      password: attribute("location.password", "DOCUMENT_LOCATION"),
      toString: method("location.toString"),
    },
  },
  {
    type: "object",
    name: "document",
    props: {
      cookie: attribute("document.cookie", "DOCUMENT_COOKIE"),
      URL: attribute("document.URL", "DOCUMENT_URL"),
      documentURI: attribute("document.documentURI", "DOCUMENT_URL"),
      referrer: attribute("document.referrer", "DOCUMENT_URL"),
      title: attribute("document.title", "DOCUMENT_TITLE"),
      getElementById: method("document.getElementById"),
      querySelector: method("document.querySelector"),
      // querySelectorAll: method("document.querySelectorAll"),
      addEventListener: method("target.addEventListener")
    },
  },
  {
    type: "object",
    name: "crypto",
    props: {
      subtle: {
        type: "object",
        name: "crypto.subtle",
        props: {
          encrypt: method("crypto.subtle.encrypt"),
          decrypt: method("crypto.subtle.decrypt"),
          digest: method("crypto.subtle.digest"),
          sign: method("crypto.subtle.sign"),
        },
      },
    },
  },
  {
    type: "object",
    name: "screen",
    props: {
      width: attribute("screen.width", "SCREEN_INFO"),
      height: attribute("screen.height", "SCREEN_INFO"),
      colorDepth: attribute("screen.colorDepth", "SCREEN_INFO"),
    },
  },
  // JS Library
  {
    type: "function",
    name: "JQuery",
    effect: "JQuery.fn",
    props: {
      ajax: method("JQuery.ajax"),
      get: method("JQuery.get"),
      post: method("JQuery.post"),
      globalEval: method("JQuery.globalEval"),
    },
    alias: "$",
  },
  {
    type: "object",
    name: "lodash",
    props: {
      map: method("lodash.map"),
      filter: method("lodash.filter"),
      get: method("lodash.get"),
      set: method("lodash.set"),
      clone: method("lodash.clone"),
      cloneDeep: method("lodash.cloneDeep"),
      assign: method("lodash.assign"),
      debounce: method("lodash.debounce"),
      throttle: method("lodash.throttle", "lodash.debounce"),
      once: method("lodash.once"),
    },
    alias: "_",
  },
  {
    type: "function",
    name: "axios",
    effect: "axios.fn",
    props: {
      create: method("axios.create"),
      request: method("axios.request"),
      get: method("axios.get"),
      post: method("axios.post"),
    },
  },
  {
    type: "object",
    name: "CryptoJS",
    props: {
      MD5: method("CryptoJS.MD5"),
      SHA1: method("CryptoJS.SHA1", "CryptoJS.MD5"),
      SHA256: method("CryptoJS.SHA256", "CryptoJS.MD5"),
      SHA512: method("CryptoJS.SHA512", "CryptoJS.MD5"),
      HmacSHA256: method("CryptoJS.HmacSHA256", "CryptoJS.MD5"),
      AES: {
        type: "object",
        name: "CryptoJS.AES",
        props: {
          encrypt: method("CryptoJS.AES.encrypt"),
          decrypt: method("CryptoJS.AES.decrypt"),
        },
      },
      DES: {
        type: "object",
        name: "CryptoJS.DES",
        props: {
          encrypt: method("CryptoJS.DES.encrypt", "CryptoJS.AES.encrypt"),
          decrypt: method("CryptoJS.DES.decrypt", "CryptoJS.AES.decrypt"),
        },
      },
      enc: {
        type: "object",
        name: "CryptoJS.enc",
        props: {
          Hex: {
            type: "object",
            name: "CryptoJS.enc.Hex",
            props: {
              stringfy: method("CryptoJS.enc.Hex.stringify"),
              parse: method(
                "CryptoJS.enc.Hex.parse",
                "CryptoJS.enc.Hex.stringify",
              ),
            },
          },
          Utf8: {
            type: "object",
            name: "CryptoJS.enc.Utf8",
            props: {
              stringfy: method(
                "CryptoJS.enc.Utf8.stringify",
                "CryptoJS.enc.Hex.stringify",
              ),
              parse: method(
                "CryptoJS.enc.Utf8.parse",
                "CryptoJS.enc.Hex.stringify",
              ),
            },
          },
          Base64: {
            type: "object",
            name: "CryptoJS.enc.Base64",
            props: {
              stringfy: method(
                "CryptoJS.enc.Base64.stringify",
                "CryptoJS.enc.Hex.stringify",
              ),
              parse: method(
                "CryptoJS.enc.Base64.parse",
                "CryptoJS.enc.Hex.stringify",
              ),
            },
          },
        },
      },
    },
  },
  {
    type: "function",
    name: "base64",
    props: {
      encode: method("base64.encode"),
      decode: method("base64.decode"),
    },
  },
  // ======================================================
  // Front-end frameworks (React / Vue / Angular)
  // ------------------------------------------------------
  // Only the taint-relevant HTML-injection surface is modeled. The frameworks'
  // own vendor files stay `ignore`d (see constants/library.ts); these schemas
  // make framework calls in *user* code resolve to modeled semantics.
  // ======================================================
  {
    type: "object",
    name: "React",
    props: {
      createElement: method("React.createElement"),
    },
  },
  {
    type: "object",
    name: "ReactDOM",
    props: {
      render: method("ReactDOM.render"),
    },
  },
  {
    type: "function",
    name: "Vue",
    effect: "Vue.fn",
    props: {
      compile: method("Vue.compile"),
      createApp: method("Vue.createApp"),
    },
  },
  {
    type: "object",
    name: "$sce",
    props: {
      trustAsHtml: method("$sce.trustAs"),
      trustAsUrl: method("$sce.trustAs"),
      trustAsResourceUrl: method("$sce.trustAs"),
    },
  },
  {
    type: "constructor",
    name: "DomSanitizer",
    proto: "Function",
    prototypeName: "DomSanitizer.prototype",
    staticMethods: {},
    prototypeMethods: {
      bypassSecurityTrustHtml: method("angular.bypassSecurity"),
      bypassSecurityTrustUrl: method("angular.bypassSecurity"),
      bypassSecurityTrustResourceUrl: method("angular.bypassSecurity"),
      bypassSecurityTrustStyle: method("angular.bypassSecurity"),
      bypassSecurityTrustScript: method("angular.bypassSecurity"),
    },
  },
];

export default BUILTINS;
