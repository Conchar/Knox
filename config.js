System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "bundles/mercury.js": [
      "npm:mercury@14.1.0.js",
      "npm:mercury@14.1.0/index.js",
      "npm:observ@0.2.0/watch.js",
      "npm:observ@0.2.0/computed.js",
      "npm:observ@0.2.0/index.js",
      "npm:virtual-dom@2.1.1/virtual-hyperscript.js",
      "npm:virtual-dom@2.1.1/virtual-hyperscript/index.js",
      "npm:virtual-dom@2.1.1/virtual-hyperscript/hooks/ev-hook.js",
      "npm:ev-store@7.0.0.js",
      "npm:ev-store@7.0.0/index.js",
      "npm:individual@3.0.0/one-version.js",
      "npm:individual@3.0.0/index.js",
      "npm:virtual-dom@2.1.1/virtual-hyperscript/hooks/soft-set-hook.js",
      "npm:virtual-dom@2.1.1/virtual-hyperscript/parse-tag.js",
      "npm:browser-split@0.0.1.js",
      "npm:browser-split@0.0.1/index.js",
      "npm:virtual-dom@2.1.1/vnode/is-thunk.js",
      "npm:virtual-dom@2.1.1/vnode/is-vhook.js",
      "npm:virtual-dom@2.1.1/vnode/is-widget.js",
      "npm:virtual-dom@2.1.1/vnode/is-vtext.js",
      "npm:virtual-dom@2.1.1/vnode/version.js",
      "npm:virtual-dom@2.1.1/vnode/is-vnode.js",
      "npm:virtual-dom@2.1.1/vnode/vtext.js",
      "npm:virtual-dom@2.1.1/vnode/vnode.js",
      "npm:x-is-array@0.1.0.js",
      "npm:x-is-array@0.1.0/index.js",
      "npm:virtual-dom@2.1.1/vdom/create-element.js",
      "npm:virtual-dom@2.1.1/vnode/handle-thunk.js",
      "npm:virtual-dom@2.1.1/vdom/apply-properties.js",
      "npm:is-object@1.0.1.js",
      "npm:is-object@1.0.1/index.js",
      "npm:global@4.3.0/document.js",
      "npm:vdom-thunk@3.0.0.js",
      "npm:vdom-thunk@3.0.0/index.js",
      "npm:vdom-thunk@3.0.0/partial.js",
      "npm:vdom-thunk@3.0.0/immutable-thunk.js",
      "npm:vdom-thunk@3.0.0/shallow-eq.js",
      "npm:virtual-dom@2.1.1/vdom/patch.js",
      "npm:virtual-dom@2.1.1/vdom/patch-op.js",
      "npm:virtual-dom@2.1.1/vdom/update-widget.js",
      "npm:virtual-dom@2.1.1/vnode/vpatch.js",
      "npm:virtual-dom@2.1.1/vdom/dom-index.js",
      "npm:virtual-dom@2.1.1/vtree/diff.js",
      "npm:virtual-dom@2.1.1/vtree/diff-props.js",
      "npm:observ@0.2.0.js",
      "npm:observ-varhash@1.0.8.js",
      "npm:observ-varhash@1.0.8/index.js",
      "github:jspm/nodelibs-process@0.1.2.js",
      "github:jspm/nodelibs-process@0.1.2/index.js",
      "npm:process@0.11.3.js",
      "npm:process@0.11.3/browser.js",
      "npm:xtend@3.0.0.js",
      "npm:xtend@3.0.0/index.js",
      "npm:observ-struct@5.0.1.js",
      "npm:observ-struct@5.0.1/index.js",
      "npm:observ-array@3.2.1.js",
      "npm:observ-array@3.2.1/index.js",
      "npm:observ-array@3.2.1/add-listener.js",
      "npm:observ-array@3.2.1/lib/set-non-enumerable.js",
      "npm:observ-array@3.2.1/array-methods.js",
      "npm:observ-array@3.2.1/array-sort.js",
      "npm:observ-array@3.2.1/apply-patch.js",
      "npm:observ-array@3.2.1/array-reverse.js",
      "npm:observ-array@3.2.1/transaction.js",
      "npm:observ-array@3.2.1/set.js",
      "npm:adiff@0.2.13.js",
      "npm:adiff@0.2.13/index.js",
      "npm:observ-array@3.2.1/put.js",
      "npm:observ-array@3.2.1/splice.js",
      "npm:value-event@5.1.0/click.js",
      "npm:value-event@5.1.0/base-event.js",
      "npm:dom-delegator@13.1.0.js",
      "npm:dom-delegator@13.1.0/index.js",
      "npm:dom-delegator@13.1.0/dom-delegator.js",
      "npm:dom-delegator@13.1.0/proxy-event.js",
      "npm:inherits@2.0.1.js",
      "npm:inherits@2.0.1/inherits_browser.js",
      "npm:dom-delegator@13.1.0/remove-event.js",
      "npm:dom-delegator@13.1.0/add-event.js",
      "npm:weakmap-shim@1.1.0/create-store.js",
      "npm:weakmap-shim@1.1.0/hidden-store.js",
      "npm:cuid@1.3.8.js",
      "npm:cuid@1.3.8/dist/browser-cuid.js",
      "npm:individual@2.0.0.js",
      "npm:individual@2.0.0/index.js",
      "npm:value-event@5.1.0/key.js",
      "npm:value-event@5.1.0/change.js",
      "npm:form-data-set@2.0.0/element.js",
      "npm:form-data-set@2.0.0/index.js",
      "npm:dom-walk@0.1.1.js",
      "npm:dom-walk@0.1.1/index.js",
      "npm:xtend@2.2.0.js",
      "npm:xtend@2.2.0/index.js",
      "npm:xtend@2.2.0/has-keys.js",
      "npm:value-event@5.1.0/submit.js",
      "npm:value-event@5.1.0/value.js",
      "npm:value-event@5.1.0/event.js",
      "npm:main-loop@3.2.0.js",
      "npm:main-loop@3.2.0/index.js",
      "npm:error@4.4.0/typed.js",
      "npm:xtend@4.0.1/mutable.js",
      "npm:string-template@0.2.1.js",
      "npm:string-template@0.2.1/index.js",
      "npm:camelize@1.0.0.js",
      "npm:camelize@1.0.0/index.js",
      "npm:raf@2.0.4.js",
      "npm:raf@2.0.4/index.js",
      "npm:performance-now@0.1.4.js",
      "npm:performance-now@0.1.4/lib/performance-now.js",
      "npm:xtend@4.0.1.js",
      "npm:xtend@4.0.1/immutable.js",
      "npm:geval@2.1.1/multiple.js",
      "npm:geval@2.1.1/single.js",
      "npm:geval@2.1.1/event.js"
    ]
  },

  map: {
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "core-js": "npm:core-js@1.2.6",
    "hyperscript-helpers": "npm:hyperscript-helpers@2.1.1",
    "mercury": "npm:mercury@14.1.0",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-console@0.1.0": {
      "console-browserify": "npm:console-browserify@1.1.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.3"
    },
    "github:jspm/nodelibs-querystring@0.1.0": {
      "querystring": "npm:querystring@0.2.0"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-timers@0.1.0": {
      "timers-browserify": "npm:timers-browserify@1.4.2"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:body@0.1.0": {
      "content-types": "npm:content-types@0.1.0",
      "querystring": "github:jspm/nodelibs-querystring@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:console-browserify@1.1.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "date-now": "npm:date-now@0.1.4",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:content-types@0.1.0": {
      "iterators": "npm:iterators@0.1.0"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:cuid@1.3.8": {
      "browser-fingerprint": "npm:browser-fingerprint@0.0.1",
      "core-js": "npm:core-js@1.2.6",
      "node-fingerprint": "npm:node-fingerprint@0.0.2",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:dom-delegator@13.1.0": {
      "cuid": "npm:cuid@1.3.8",
      "ev-store": "npm:ev-store@7.0.0",
      "global": "npm:global@4.3.0",
      "individual": "npm:individual@2.0.0",
      "inherits": "npm:inherits@2.0.1",
      "weakmap-shim": "npm:weakmap-shim@1.1.0",
      "xtend": "npm:xtend@2.2.0"
    },
    "npm:error@4.4.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "camelize": "npm:camelize@1.0.0",
      "string-template": "npm:string-template@0.2.1",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:error@5.2.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "camelize": "npm:camelize@1.0.0",
      "is-error": "npm:is-error@2.2.0",
      "string-template": "npm:string-template@0.2.1",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:ev-store@7.0.0": {
      "individual": "npm:individual@3.0.0"
    },
    "npm:form-data-set@2.0.0": {
      "console": "github:jspm/nodelibs-console@0.1.0",
      "dom-walk": "npm:dom-walk@0.1.1"
    },
    "npm:global@4.3.0": {
      "process": "npm:process@0.5.2"
    },
    "npm:http-hash-router@1.1.0": {
      "error": "npm:error@5.2.0",
      "http-hash": "npm:http-hash@1.1.1",
      "http-methods": "npm:http-methods@1.0.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:http-methods@1.0.0": {
      "body": "npm:body@0.1.0",
      "content-types": "npm:content-types@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:iterators@0.1.0": {
      "ap": "npm:ap@0.1.0"
    },
    "npm:main-loop@3.2.0": {
      "error": "npm:error@4.4.0",
      "raf": "npm:raf@2.0.4"
    },
    "npm:mercury@14.1.0": {
      "console": "github:jspm/nodelibs-console@0.1.0",
      "dom-delegator": "npm:dom-delegator@13.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "geval": "npm:geval@2.1.1",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "http-hash-router": "npm:http-hash-router@1.1.0",
      "main-loop": "npm:main-loop@3.2.0",
      "observ": "npm:observ@0.2.0",
      "observ-array": "npm:observ-array@3.2.1",
      "observ-struct": "npm:observ-struct@5.0.1",
      "observ-varhash": "npm:observ-varhash@1.0.8",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2",
      "timers": "github:jspm/nodelibs-timers@0.1.0",
      "value-event": "npm:value-event@5.1.0",
      "vdom-thunk": "npm:vdom-thunk@3.0.0",
      "virtual-dom": "npm:virtual-dom@2.1.1",
      "xtend": "npm:xtend@4.0.1"
    },
    "npm:next-tick@0.2.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:node-fingerprint@0.0.2": {
      "os": "github:jspm/nodelibs-os@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:observ-array@3.2.1": {
      "adiff": "npm:adiff@0.2.13",
      "observ": "npm:observ@0.2.0",
      "xtend": "npm:xtend@3.0.0"
    },
    "npm:observ-struct@5.0.1": {
      "observ": "npm:observ@0.2.0",
      "xtend": "npm:xtend@3.0.0"
    },
    "npm:observ-varhash@1.0.8": {
      "observ": "npm:observ@0.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "xtend": "npm:xtend@3.0.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:performance-now@0.1.4": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:raf@2.0.4": {
      "performance-now": "npm:performance-now@0.1.4"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:timers-browserify@1.4.2": {
      "process": "npm:process@0.11.3"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:value-event@5.1.0": {
      "dom-delegator": "npm:dom-delegator@13.1.0",
      "dom-walk": "npm:dom-walk@0.1.1",
      "form-data-set": "npm:form-data-set@2.0.0",
      "global": "npm:global@4.3.0",
      "xtend": "npm:xtend@2.2.0"
    },
    "npm:virtual-dom@2.1.1": {
      "browser-split": "npm:browser-split@0.0.1",
      "error": "npm:error@4.4.0",
      "ev-store": "npm:ev-store@7.0.0",
      "global": "npm:global@4.3.0",
      "is-object": "npm:is-object@1.0.1",
      "next-tick": "npm:next-tick@0.2.2",
      "x-is-array": "npm:x-is-array@0.1.0",
      "x-is-string": "npm:x-is-string@0.1.0"
    }
  }
});
