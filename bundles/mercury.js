System.registerDynamic("npm:geval@2.1.1/event.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = Event;
  function Event() {
    var listeners = [];
    return {
      broadcast: broadcast,
      listen: event
    };
    function broadcast(value) {
      for (var i = 0; i < listeners.length; i++) {
        listeners[i](value);
      }
    }
    function event(listener) {
      listeners.push(listener);
      return removeListener;
      function removeListener() {
        var index = listeners.indexOf(listener);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      }
    }
  }
  return module.exports;
});

System.registerDynamic("npm:geval@2.1.1/single.js", ["npm:geval@2.1.1/event.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Event = $__require('npm:geval@2.1.1/event.js');
  module.exports = Single;
  function Single() {
    var tuple = Event();
    return function event(value) {
      if (typeof value === "function") {
        return tuple.listen(value);
      } else {
        return tuple.broadcast(value);
      }
    };
  }
  return module.exports;
});

System.registerDynamic("npm:geval@2.1.1/multiple.js", ["npm:geval@2.1.1/single.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var event = $__require('npm:geval@2.1.1/single.js');
  module.exports = multiple;
  function multiple(names) {
    return names.reduce(function(acc, name) {
      acc[name] = event();
      return acc;
    }, {});
  }
  return module.exports;
});

System.registerDynamic("npm:xtend@4.0.1/immutable.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = extend;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function extend() {
    var target = {};
    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
  return module.exports;
});

System.registerDynamic("npm:xtend@4.0.1.js", ["npm:xtend@4.0.1/immutable.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:xtend@4.0.1/immutable.js');
  return module.exports;
});

System.registerDynamic("npm:performance-now@0.1.4/lib/performance-now.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    (function() {
      var getNanoSeconds,
          hrtime,
          loadTime;
      if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
        module.exports = function() {
          return performance.now();
        };
      } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
        module.exports = function() {
          return (getNanoSeconds() - loadTime) / 1e6;
        };
        hrtime = process.hrtime;
        getNanoSeconds = function() {
          var hr;
          hr = hrtime();
          return hr[0] * 1e9 + hr[1];
        };
        loadTime = getNanoSeconds();
      } else if (Date.now) {
        module.exports = function() {
          return Date.now() - loadTime;
        };
        loadTime = Date.now();
      } else {
        module.exports = function() {
          return new Date().getTime() - loadTime;
        };
        loadTime = new Date().getTime();
      }
    }).call(this);
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:performance-now@0.1.4.js", ["npm:performance-now@0.1.4/lib/performance-now.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:performance-now@0.1.4/lib/performance-now.js');
  return module.exports;
});

System.registerDynamic("npm:raf@2.0.4/index.js", ["npm:performance-now@0.1.4.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var now = $__require('npm:performance-now@0.1.4.js'),
      global = typeof window === 'undefined' ? {} : window,
      vendors = ['moz', 'webkit'],
      suffix = 'AnimationFrame',
      raf = global['request' + suffix],
      caf = global['cancel' + suffix] || global['cancelRequest' + suffix],
      isNative = true;
  for (var i = 0; i < vendors.length && !raf; i++) {
    raf = global[vendors[i] + 'Request' + suffix];
    caf = global[vendors[i] + 'Cancel' + suffix] || global[vendors[i] + 'CancelRequest' + suffix];
  }
  if (!raf || !caf) {
    isNative = false;
    var last = 0,
        id = 0,
        queue = [],
        frameDuration = 1000 / 60;
    raf = function(callback) {
      if (queue.length === 0) {
        var _now = now(),
            next = Math.max(0, frameDuration - (_now - last));
        last = next + _now;
        setTimeout(function() {
          var cp = queue.slice(0);
          queue.length = 0;
          for (var i = 0; i < cp.length; i++) {
            if (!cp[i].cancelled) {
              try {
                cp[i].callback(last);
              } catch (e) {
                setTimeout(function() {
                  throw e;
                }, 0);
              }
            }
          }
        }, Math.round(next));
      }
      queue.push({
        handle: ++id,
        callback: callback,
        cancelled: false
      });
      return id;
    };
    caf = function(handle) {
      for (var i = 0; i < queue.length; i++) {
        if (queue[i].handle === handle) {
          queue[i].cancelled = true;
        }
      }
    };
  }
  module.exports = function(fn) {
    if (!isNative) {
      return raf.call(global, fn);
    }
    return raf.call(global, function() {
      try {
        fn.apply(this, arguments);
      } catch (e) {
        setTimeout(function() {
          throw e;
        }, 0);
      }
    });
  };
  module.exports.cancel = function() {
    caf.apply(global, arguments);
  };
  return module.exports;
});

System.registerDynamic("npm:raf@2.0.4.js", ["npm:raf@2.0.4/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:raf@2.0.4/index.js');
  return module.exports;
});

System.registerDynamic("npm:camelize@1.0.0/index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function(obj) {
    if (typeof obj === 'string')
      return camelCase(obj);
    return walk(obj);
  };
  function walk(obj) {
    if (!obj || typeof obj !== 'object')
      return obj;
    if (isDate(obj) || isRegex(obj))
      return obj;
    if (isArray(obj))
      return map(obj, walk);
    return reduce(objectKeys(obj), function(acc, key) {
      var camel = camelCase(key);
      acc[camel] = walk(obj[key]);
      return acc;
    }, {});
  }
  function camelCase(str) {
    return str.replace(/[_.-](\w|$)/g, function(_, x) {
      return x.toUpperCase();
    });
  }
  var isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };
  var isDate = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
  };
  var isRegex = function(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
  };
  var has = Object.prototype.hasOwnProperty;
  var objectKeys = Object.keys || function(obj) {
    var keys = [];
    for (var key in obj) {
      if (has.call(obj, key))
        keys.push(key);
    }
    return keys;
  };
  function map(xs, f) {
    if (xs.map)
      return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      res.push(f(xs[i], i));
    }
    return res;
  }
  function reduce(xs, f, acc) {
    if (xs.reduce)
      return xs.reduce(f, acc);
    for (var i = 0; i < xs.length; i++) {
      acc = f(acc, xs[i], i);
    }
    return acc;
  }
  return module.exports;
});

System.registerDynamic("npm:camelize@1.0.0.js", ["npm:camelize@1.0.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:camelize@1.0.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:string-template@0.2.1/index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var nargs = /\{([0-9a-zA-Z]+)\}/g;
  var slice = Array.prototype.slice;
  module.exports = template;
  function template(string) {
    var args;
    if (arguments.length === 2 && typeof arguments[1] === "object") {
      args = arguments[1];
    } else {
      args = slice.call(arguments, 1);
    }
    if (!args || !args.hasOwnProperty) {
      args = {};
    }
    return string.replace(nargs, function replaceArg(match, i, index) {
      var result;
      if (string[index - 1] === "{" && string[index + match.length] === "}") {
        return i;
      } else {
        result = args.hasOwnProperty(i) ? args[i] : null;
        if (result === null || result === undefined) {
          return "";
        }
        return result;
      }
    });
  }
  return module.exports;
});

System.registerDynamic("npm:string-template@0.2.1.js", ["npm:string-template@0.2.1/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:string-template@0.2.1/index.js');
  return module.exports;
});

System.registerDynamic("npm:xtend@4.0.1/mutable.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = extend;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
  return module.exports;
});

System.registerDynamic("npm:error@4.4.0/typed.js", ["npm:camelize@1.0.0.js", "npm:string-template@0.2.1.js", "npm:xtend@4.0.1/mutable.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var camelize = $__require('npm:camelize@1.0.0.js');
  var template = $__require('npm:string-template@0.2.1.js');
  var extend = $__require('npm:xtend@4.0.1/mutable.js');
  module.exports = TypedError;
  function TypedError(args) {
    if (!args) {
      throw new Error("args is required");
    }
    if (!args.type) {
      throw new Error("args.type is required");
    }
    if (!args.message) {
      throw new Error("args.message is required");
    }
    var message = args.message;
    if (args.type && !args.name) {
      var errorName = camelize(args.type) + "Error";
      args.name = errorName[0].toUpperCase() + errorName.substr(1);
    }
    extend(createError, args);
    createError._name = args.name;
    return createError;
    function createError(opts) {
      var result = new Error();
      Object.defineProperty(result, "type", {
        value: result.type,
        enumerable: true,
        writable: true,
        configurable: true
      });
      var options = extend({}, args, opts);
      extend(result, options);
      result.message = template(message, options);
      return result;
    }
  }
  return module.exports;
});

System.registerDynamic("npm:main-loop@3.2.0/index.js", ["npm:raf@2.0.4.js", "npm:error@4.4.0/typed.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var raf = $__require('npm:raf@2.0.4.js');
  var TypedError = $__require('npm:error@4.4.0/typed.js');
  var InvalidUpdateInRender = TypedError({
    type: "main-loop.invalid.update.in-render",
    message: "main-loop: Unexpected update occurred in loop.\n" + "We are currently rendering a view, " + "you can't change state right now.\n" + "The diff is: {stringDiff}.\n" + "SUGGESTED FIX: find the state mutation in your view " + "or rendering function and remove it.\n" + "The view should not have any side effects.\n",
    diff: null,
    stringDiff: null
  });
  module.exports = main;
  function main(initialState, view, opts) {
    opts = opts || {};
    var currentState = initialState;
    var create = opts.create;
    var diff = opts.diff;
    var patch = opts.patch;
    var redrawScheduled = false;
    var tree = opts.initialTree || view(currentState);
    var target = opts.target || create(tree, opts);
    var inRenderingTransaction = false;
    currentState = null;
    var loop = {
      state: initialState,
      target: target,
      update: update
    };
    return loop;
    function update(state) {
      if (inRenderingTransaction) {
        throw InvalidUpdateInRender({
          diff: state._diff,
          stringDiff: JSON.stringify(state._diff)
        });
      }
      if (currentState === null && !redrawScheduled) {
        redrawScheduled = true;
        raf(redraw);
      }
      currentState = state;
      loop.state = state;
    }
    function redraw() {
      redrawScheduled = false;
      if (currentState === null) {
        return;
      }
      inRenderingTransaction = true;
      var newTree = view(currentState);
      if (opts.createOnly) {
        inRenderingTransaction = false;
        create(newTree, opts);
      } else {
        var patches = diff(tree, newTree, opts);
        inRenderingTransaction = false;
        target = patch(target, patches, opts);
      }
      tree = newTree;
      currentState = null;
    }
  }
  return module.exports;
});

System.registerDynamic("npm:main-loop@3.2.0.js", ["npm:main-loop@3.2.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:main-loop@3.2.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:value-event@5.1.0/event.js", ["npm:value-event@5.1.0/base-event.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var BaseEvent = $__require('npm:value-event@5.1.0/base-event.js');
  module.exports = BaseEvent(eventLambda);
  function eventLambda(ev, broadcast) {
    broadcast(this.data);
  }
  return module.exports;
});

System.registerDynamic("npm:value-event@5.1.0/value.js", ["npm:xtend@2.2.0.js", "npm:form-data-set@2.0.0/element.js", "npm:value-event@5.1.0/base-event.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var extend = $__require('npm:xtend@2.2.0.js');
  var getFormData = $__require('npm:form-data-set@2.0.0/element.js');
  var BaseEvent = $__require('npm:value-event@5.1.0/base-event.js');
  module.exports = BaseEvent(valueLambda);
  function valueLambda(ev, broadcast) {
    var value = getFormData(ev.currentTarget);
    var data = extend(value, this.data);
    broadcast(data);
  }
  return module.exports;
});

System.registerDynamic("npm:value-event@5.1.0/submit.js", ["npm:xtend@2.2.0.js", "npm:form-data-set@2.0.0/element.js", "npm:value-event@5.1.0/base-event.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var extend = $__require('npm:xtend@2.2.0.js');
  var getFormData = $__require('npm:form-data-set@2.0.0/element.js');
  var BaseEvent = $__require('npm:value-event@5.1.0/base-event.js');
  var ENTER = 13;
  module.exports = BaseEvent(submitLambda);
  function submitLambda(ev, broadcast) {
    var target = ev.target;
    var isValid = (ev.type === 'submit' && target.tagName === 'FORM') || (ev.type === 'click' && target.tagName === 'BUTTON') || (ev.type === 'click' && target.type === 'submit') || ((target.type === 'text') && (ev.keyCode === ENTER && ev.type === 'keydown'));
    if (!isValid) {
      if (ev.startPropagation) {
        ev.startPropagation();
      }
      return;
    }
    var value = getFormData(ev.currentTarget);
    var data = extend(value, this.data);
    if (ev.preventDefault) {
      ev.preventDefault();
    }
    broadcast(data);
  }
  return module.exports;
});

System.registerDynamic("npm:xtend@2.2.0/has-keys.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = hasKeys;
  function hasKeys(source) {
    return source !== null && (typeof source === "object" || typeof source === "function");
  }
  return module.exports;
});

System.registerDynamic("npm:xtend@2.2.0/index.js", ["npm:xtend@2.2.0/has-keys.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var hasKeys = $__require('npm:xtend@2.2.0/has-keys.js');
  module.exports = extend;
  function extend() {
    var target = {};
    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];
      if (!hasKeys(source)) {
        continue;
      }
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
  return module.exports;
});

System.registerDynamic("npm:xtend@2.2.0.js", ["npm:xtend@2.2.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:xtend@2.2.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:dom-walk@0.1.1/index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var slice = Array.prototype.slice;
  module.exports = iterativelyWalk;
  function iterativelyWalk(nodes, cb) {
    if (!('length' in nodes)) {
      nodes = [nodes];
    }
    nodes = slice.call(nodes);
    while (nodes.length) {
      var node = nodes.shift(),
          ret = cb(node);
      if (ret) {
        return ret;
      }
      if (node.childNodes && node.childNodes.length) {
        nodes = slice.call(node.childNodes).concat(nodes);
      }
    }
  }
  return module.exports;
});

System.registerDynamic("npm:dom-walk@0.1.1.js", ["npm:dom-walk@0.1.1/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:dom-walk@0.1.1/index.js');
  return module.exports;
});

System.registerDynamic("npm:form-data-set@2.0.0/index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = FormData;
  function FormData(elements) {
    return Object.keys(elements).reduce(function(acc, key) {
      var elem = elements[key];
      acc[key] = valueOfElement(elem);
      return acc;
    }, {});
  }
  function valueOfElement(elem) {
    if (typeof elem === "function") {
      return elem();
    } else if (containsRadio(elem)) {
      var elems = toList(elem);
      var checked = elems.filter(function(elem) {
        return elem.checked;
      })[0] || null;
      return checked ? checked.value : null;
    } else if (Array.isArray(elem)) {
      return elem.map(valueOfElement).filter(filterNull);
    } else if (elem.tagName === undefined && elem.nodeType === undefined) {
      return FormData(elem);
    } else if (elem.tagName === "INPUT" && isChecked(elem)) {
      if (elem.hasAttribute("value")) {
        return elem.checked ? elem.value : null;
      } else {
        return elem.checked;
      }
    } else if (elem.tagName === "INPUT") {
      return elem.value;
    } else if (elem.tagName === "TEXTAREA") {
      return elem.value;
    } else if (elem.tagName === "SELECT") {
      return elem.value;
    }
  }
  function isChecked(elem) {
    return elem.type === "checkbox" || elem.type === "radio";
  }
  function containsRadio(value) {
    if (value.tagName || value.nodeType) {
      return false;
    }
    var elems = toList(value);
    return elems.some(function(elem) {
      return elem.tagName === "INPUT" && elem.type === "radio";
    });
  }
  function toList(value) {
    if (Array.isArray(value)) {
      return value;
    }
    return Object.keys(value).map(prop, value);
  }
  function prop(x) {
    return this[x];
  }
  function filterNull(val) {
    return val !== null;
  }
  return module.exports;
});

System.registerDynamic("npm:form-data-set@2.0.0/element.js", ["npm:dom-walk@0.1.1.js", "npm:form-data-set@2.0.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var walk = $__require('npm:dom-walk@0.1.1.js');
  var FormData = $__require('npm:form-data-set@2.0.0/index.js');
  module.exports = getFormData;
  function buildElems(rootElem) {
    var hash = {};
    if (rootElem.name) {
      hash[rootElem.name] = rootElem;
    }
    walk(rootElem, function(child) {
      if (child.name) {
        hash[child.name] = child;
      }
    });
    return hash;
  }
  function getFormData(rootElem) {
    var elements = buildElems(rootElem);
    return FormData(elements);
  }
  return module.exports;
});

System.registerDynamic("npm:value-event@5.1.0/change.js", ["npm:xtend@2.2.0.js", "npm:form-data-set@2.0.0/element.js", "npm:value-event@5.1.0/base-event.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var extend = $__require('npm:xtend@2.2.0.js');
  var getFormData = $__require('npm:form-data-set@2.0.0/element.js');
  var BaseEvent = $__require('npm:value-event@5.1.0/base-event.js');
  var VALID_CHANGE = ['checkbox', 'file', 'select-multiple', 'select-one'];
  var VALID_INPUT = ['color', 'date', 'datetime', 'datetime-local', 'email', 'month', 'number', 'password', 'range', 'search', 'tel', 'text', 'time', 'url', 'week'];
  module.exports = BaseEvent(changeLambda);
  function changeLambda(ev, broadcast) {
    var target = ev.target;
    var isValid = (ev.type === 'input' && VALID_INPUT.indexOf(target.type) !== -1) || (ev.type === 'change' && VALID_CHANGE.indexOf(target.type) !== -1);
    if (!isValid) {
      if (ev.startPropagation) {
        ev.startPropagation();
      }
      return;
    }
    var value = getFormData(ev.currentTarget);
    var data = extend(value, this.data);
    broadcast(data);
  }
  return module.exports;
});

System.registerDynamic("npm:value-event@5.1.0/key.js", ["npm:value-event@5.1.0/base-event.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var BaseEvent = $__require('npm:value-event@5.1.0/base-event.js');
  module.exports = BaseEvent(keyLambda);
  function keyLambda(ev, broadcast) {
    var key = this.opts.key;
    if (ev.keyCode === key) {
      broadcast(this.data);
    }
  }
  return module.exports;
});

System.registerDynamic("npm:individual@2.0.0/index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
  module.exports = Individual;
  function Individual(key, value) {
    if (root[key]) {
      return root[key];
    }
    Object.defineProperty(root, key, {
      value: value,
      configurable: true
    });
    return value;
  }
  return module.exports;
});

System.registerDynamic("npm:individual@2.0.0.js", ["npm:individual@2.0.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:individual@2.0.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:cuid@1.3.8/dist/browser-cuid.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    (function(app) {
      'use strict';
      var namespace = 'cuid',
          c = 0,
          blockSize = 4,
          base = 36,
          discreteValues = Math.pow(base, blockSize),
          pad = function pad(num, size) {
            var s = "000000000" + num;
            return s.substr(s.length - size);
          },
          randomBlock = function randomBlock() {
            return pad((Math.random() * discreteValues << 0).toString(base), blockSize);
          },
          safeCounter = function() {
            c = (c < discreteValues) ? c : 0;
            c++;
            return c - 1;
          },
          api = function cuid() {
            var letter = 'c',
                timestamp = (new Date().getTime()).toString(base),
                counter,
                fingerprint = api.fingerprint(),
                random = randomBlock() + randomBlock();
            counter = pad(safeCounter().toString(base), blockSize);
            return (letter + timestamp + counter + fingerprint + random);
          };
      api.slug = function slug() {
        var date = new Date().getTime().toString(36),
            counter,
            print = api.fingerprint().slice(0, 1) + api.fingerprint().slice(-1),
            random = randomBlock().slice(-2);
        counter = safeCounter().toString(36).slice(-4);
        return date.slice(-2) + counter + print + random;
      };
      api.globalCount = function globalCount() {
        var cache = (function calc() {
          var i,
              count = 0;
          for (i in window) {
            count++;
          }
          return count;
        }());
        api.globalCount = function() {
          return cache;
        };
        return cache;
      };
      api.fingerprint = function browserPrint() {
        return pad((navigator.mimeTypes.length + navigator.userAgent.length).toString(36) + api.globalCount().toString(36), 4);
      };
      if (app.register) {
        app.register(namespace, api);
      } else if (typeof module !== 'undefined') {
        module.exports = api;
      } else {
        app[namespace] = api;
      }
    }(this.applitude || this));
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:cuid@1.3.8.js", ["npm:cuid@1.3.8/dist/browser-cuid.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:cuid@1.3.8/dist/browser-cuid.js');
  return module.exports;
});

System.registerDynamic("npm:weakmap-shim@1.1.0/hidden-store.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = hiddenStore;
  function hiddenStore(obj, key) {
    var store = {identity: key};
    var valueOf = obj.valueOf;
    Object.defineProperty(obj, "valueOf", {
      value: function(value) {
        return value !== key ? valueOf.apply(this, arguments) : store;
      },
      writable: true
    });
    return store;
  }
  return module.exports;
});

System.registerDynamic("npm:weakmap-shim@1.1.0/create-store.js", ["npm:weakmap-shim@1.1.0/hidden-store.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var hiddenStore = $__require('npm:weakmap-shim@1.1.0/hidden-store.js');
  module.exports = createStore;
  function createStore() {
    var key = {};
    return function(obj) {
      if ((typeof obj !== 'object' || obj === null) && typeof obj !== 'function') {
        throw new Error('Weakmap-shim: Key must be object');
      }
      var store = obj.valueOf(key);
      return store && store.identity === key ? store : hiddenStore(obj, key);
    };
  }
  return module.exports;
});

System.registerDynamic("npm:dom-delegator@13.1.0/add-event.js", ["npm:ev-store@7.0.0.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var EvStore = $__require('npm:ev-store@7.0.0.js');
  module.exports = addEvent;
  function addEvent(target, type, handler) {
    var events = EvStore(target);
    var event = events[type];
    if (!event) {
      events[type] = handler;
    } else if (Array.isArray(event)) {
      if (event.indexOf(handler) === -1) {
        event.push(handler);
      }
    } else if (event !== handler) {
      events[type] = [event, handler];
    }
  }
  return module.exports;
});

System.registerDynamic("npm:dom-delegator@13.1.0/remove-event.js", ["npm:ev-store@7.0.0.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var EvStore = $__require('npm:ev-store@7.0.0.js');
  module.exports = removeEvent;
  function removeEvent(target, type, handler) {
    var events = EvStore(target);
    var event = events[type];
    if (!event) {
      return;
    } else if (Array.isArray(event)) {
      var index = event.indexOf(handler);
      if (index !== -1) {
        event.splice(index, 1);
      }
    } else if (event === handler) {
      events[type] = null;
    }
  }
  return module.exports;
});

System.registerDynamic("npm:inherits@2.0.1/inherits_browser.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  if (typeof Object.create === 'function') {
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }});
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function() {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    };
  }
  return module.exports;
});

System.registerDynamic("npm:inherits@2.0.1.js", ["npm:inherits@2.0.1/inherits_browser.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:inherits@2.0.1/inherits_browser.js');
  return module.exports;
});

System.registerDynamic("npm:dom-delegator@13.1.0/proxy-event.js", ["npm:inherits@2.0.1.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var inherits = $__require('npm:inherits@2.0.1.js');
  var ALL_PROPS = ["altKey", "bubbles", "cancelable", "ctrlKey", "eventPhase", "metaKey", "relatedTarget", "shiftKey", "target", "timeStamp", "type", "view", "which"];
  var KEY_PROPS = ["char", "charCode", "key", "keyCode"];
  var MOUSE_PROPS = ["button", "buttons", "clientX", "clientY", "layerX", "layerY", "offsetX", "offsetY", "pageX", "pageY", "screenX", "screenY", "toElement"];
  var rkeyEvent = /^key|input/;
  var rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/;
  module.exports = ProxyEvent;
  function ProxyEvent(ev) {
    if (!(this instanceof ProxyEvent)) {
      return new ProxyEvent(ev);
    }
    if (rkeyEvent.test(ev.type)) {
      return new KeyEvent(ev);
    } else if (rmouseEvent.test(ev.type)) {
      return new MouseEvent(ev);
    }
    for (var i = 0; i < ALL_PROPS.length; i++) {
      var propKey = ALL_PROPS[i];
      this[propKey] = ev[propKey];
    }
    this._rawEvent = ev;
    this._bubbles = false;
  }
  ProxyEvent.prototype.preventDefault = function() {
    this._rawEvent.preventDefault();
  };
  ProxyEvent.prototype.startPropagation = function() {
    this._bubbles = true;
  };
  function MouseEvent(ev) {
    for (var i = 0; i < ALL_PROPS.length; i++) {
      var propKey = ALL_PROPS[i];
      this[propKey] = ev[propKey];
    }
    for (var j = 0; j < MOUSE_PROPS.length; j++) {
      var mousePropKey = MOUSE_PROPS[j];
      this[mousePropKey] = ev[mousePropKey];
    }
    this._rawEvent = ev;
  }
  inherits(MouseEvent, ProxyEvent);
  function KeyEvent(ev) {
    for (var i = 0; i < ALL_PROPS.length; i++) {
      var propKey = ALL_PROPS[i];
      this[propKey] = ev[propKey];
    }
    for (var j = 0; j < KEY_PROPS.length; j++) {
      var keyPropKey = KEY_PROPS[j];
      this[keyPropKey] = ev[keyPropKey];
    }
    this._rawEvent = ev;
  }
  inherits(KeyEvent, ProxyEvent);
  return module.exports;
});

System.registerDynamic("npm:dom-delegator@13.1.0/dom-delegator.js", ["npm:global@4.3.0/document.js", "npm:ev-store@7.0.0.js", "npm:weakmap-shim@1.1.0/create-store.js", "npm:dom-delegator@13.1.0/add-event.js", "npm:dom-delegator@13.1.0/remove-event.js", "npm:dom-delegator@13.1.0/proxy-event.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var globalDocument = $__require('npm:global@4.3.0/document.js');
  var EvStore = $__require('npm:ev-store@7.0.0.js');
  var createStore = $__require('npm:weakmap-shim@1.1.0/create-store.js');
  var addEvent = $__require('npm:dom-delegator@13.1.0/add-event.js');
  var removeEvent = $__require('npm:dom-delegator@13.1.0/remove-event.js');
  var ProxyEvent = $__require('npm:dom-delegator@13.1.0/proxy-event.js');
  var HANDLER_STORE = createStore();
  module.exports = DOMDelegator;
  function DOMDelegator(document) {
    if (!(this instanceof DOMDelegator)) {
      return new DOMDelegator(document);
    }
    document = document || globalDocument;
    this.target = document.documentElement;
    this.events = {};
    this.rawEventListeners = {};
    this.globalListeners = {};
  }
  DOMDelegator.prototype.addEventListener = addEvent;
  DOMDelegator.prototype.removeEventListener = removeEvent;
  DOMDelegator.allocateHandle = function allocateHandle(func) {
    var handle = new Handle();
    HANDLER_STORE(handle).func = func;
    return handle;
  };
  DOMDelegator.transformHandle = function transformHandle(handle, broadcast) {
    var func = HANDLER_STORE(handle).func;
    return this.allocateHandle(function(ev) {
      broadcast(ev, func);
    });
  };
  DOMDelegator.prototype.addGlobalEventListener = function addGlobalEventListener(eventName, fn) {
    var listeners = this.globalListeners[eventName] || [];
    if (listeners.indexOf(fn) === -1) {
      listeners.push(fn);
    }
    this.globalListeners[eventName] = listeners;
  };
  DOMDelegator.prototype.removeGlobalEventListener = function removeGlobalEventListener(eventName, fn) {
    var listeners = this.globalListeners[eventName] || [];
    var index = listeners.indexOf(fn);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
  DOMDelegator.prototype.listenTo = function listenTo(eventName) {
    if (!(eventName in this.events)) {
      this.events[eventName] = 0;
    }
    this.events[eventName]++;
    if (this.events[eventName] !== 1) {
      return;
    }
    var listener = this.rawEventListeners[eventName];
    if (!listener) {
      listener = this.rawEventListeners[eventName] = createHandler(eventName, this);
    }
    this.target.addEventListener(eventName, listener, true);
  };
  DOMDelegator.prototype.unlistenTo = function unlistenTo(eventName) {
    if (!(eventName in this.events)) {
      this.events[eventName] = 0;
    }
    if (this.events[eventName] === 0) {
      throw new Error("already unlistened to event.");
    }
    this.events[eventName]--;
    if (this.events[eventName] !== 0) {
      return;
    }
    var listener = this.rawEventListeners[eventName];
    if (!listener) {
      throw new Error("dom-delegator#unlistenTo: cannot " + "unlisten to " + eventName);
    }
    this.target.removeEventListener(eventName, listener, true);
  };
  function createHandler(eventName, delegator) {
    var globalListeners = delegator.globalListeners;
    var delegatorTarget = delegator.target;
    return handler;
    function handler(ev) {
      var globalHandlers = globalListeners[eventName] || [];
      if (globalHandlers.length > 0) {
        var globalEvent = new ProxyEvent(ev);
        globalEvent.currentTarget = delegatorTarget;
        callListeners(globalHandlers, globalEvent);
      }
      findAndInvokeListeners(ev.target, ev, eventName);
    }
  }
  function findAndInvokeListeners(elem, ev, eventName) {
    var listener = getListener(elem, eventName);
    if (listener && listener.handlers.length > 0) {
      var listenerEvent = new ProxyEvent(ev);
      listenerEvent.currentTarget = listener.currentTarget;
      callListeners(listener.handlers, listenerEvent);
      if (listenerEvent._bubbles) {
        var nextTarget = listener.currentTarget.parentNode;
        findAndInvokeListeners(nextTarget, ev, eventName);
      }
    }
  }
  function getListener(target, type) {
    if (target === null || typeof target === "undefined") {
      return null;
    }
    var events = EvStore(target);
    var handler = events[type];
    var allHandler = events.event;
    if (!handler && !allHandler) {
      return getListener(target.parentNode, type);
    }
    var handlers = [].concat(handler || [], allHandler || []);
    return new Listener(target, handlers);
  }
  function callListeners(handlers, ev) {
    handlers.forEach(function(handler) {
      if (typeof handler === "function") {
        handler(ev);
      } else if (typeof handler.handleEvent === "function") {
        handler.handleEvent(ev);
      } else if (handler.type === "dom-delegator-handle") {
        HANDLER_STORE(handler).func(ev);
      } else {
        throw new Error("dom-delegator: unknown handler " + "found: " + JSON.stringify(handlers));
      }
    });
  }
  function Listener(target, handlers) {
    this.currentTarget = target;
    this.handlers = handlers;
  }
  function Handle() {
    this.type = "dom-delegator-handle";
  }
  return module.exports;
});

System.registerDynamic("npm:dom-delegator@13.1.0/index.js", ["npm:individual@2.0.0.js", "npm:cuid@1.3.8.js", "npm:global@4.3.0/document.js", "npm:dom-delegator@13.1.0/dom-delegator.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Individual = $__require('npm:individual@2.0.0.js');
  var cuid = $__require('npm:cuid@1.3.8.js');
  var globalDocument = $__require('npm:global@4.3.0/document.js');
  var DOMDelegator = $__require('npm:dom-delegator@13.1.0/dom-delegator.js');
  var versionKey = "13";
  var cacheKey = "__DOM_DELEGATOR_CACHE@" + versionKey;
  var cacheTokenKey = "__DOM_DELEGATOR_CACHE_TOKEN@" + versionKey;
  var delegatorCache = Individual(cacheKey, {delegators: {}});
  var commonEvents = ["blur", "change", "click", "contextmenu", "dblclick", "error", "focus", "focusin", "focusout", "input", "keydown", "keypress", "keyup", "load", "mousedown", "mouseup", "resize", "select", "submit", "touchcancel", "touchend", "touchstart", "unload"];
  module.exports = Delegator;
  function Delegator(opts) {
    opts = opts || {};
    var document = opts.document || globalDocument;
    var cacheKey = document[cacheTokenKey];
    if (!cacheKey) {
      cacheKey = document[cacheTokenKey] = cuid();
    }
    var delegator = delegatorCache.delegators[cacheKey];
    if (!delegator) {
      delegator = delegatorCache.delegators[cacheKey] = new DOMDelegator(document);
    }
    if (opts.defaultEvents !== false) {
      for (var i = 0; i < commonEvents.length; i++) {
        delegator.listenTo(commonEvents[i]);
      }
    }
    return delegator;
  }
  Delegator.allocateHandle = DOMDelegator.allocateHandle;
  Delegator.transformHandle = DOMDelegator.transformHandle;
  return module.exports;
});

System.registerDynamic("npm:dom-delegator@13.1.0.js", ["npm:dom-delegator@13.1.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:dom-delegator@13.1.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:value-event@5.1.0/base-event.js", ["npm:dom-delegator@13.1.0.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Delegator = $__require('npm:dom-delegator@13.1.0.js');
  module.exports = BaseEvent;
  function BaseEvent(lambda) {
    return EventHandler;
    function EventHandler(fn, data, opts) {
      var handler = {
        fn: fn,
        data: data !== undefined ? data : {},
        opts: opts || {},
        handleEvent: handleEvent
      };
      if (fn && fn.type === 'dom-delegator-handle') {
        return Delegator.transformHandle(fn, handleLambda.bind(handler));
      }
      return handler;
    }
    function handleLambda(ev, broadcast) {
      if (this.opts.startPropagation && ev.startPropagation) {
        ev.startPropagation();
      }
      return lambda.call(this, ev, broadcast);
    }
    function handleEvent(ev) {
      var self = this;
      if (self.opts.startPropagation && ev.startPropagation) {
        ev.startPropagation();
      }
      lambda.call(self, ev, broadcast);
      function broadcast(value) {
        if (typeof self.fn === 'function') {
          self.fn(value);
        } else {
          self.fn.write(value);
        }
      }
    }
  }
  return module.exports;
});

System.registerDynamic("npm:value-event@5.1.0/click.js", ["npm:value-event@5.1.0/base-event.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var BaseEvent = $__require('npm:value-event@5.1.0/base-event.js');
  module.exports = BaseEvent(clickLambda);
  function clickLambda(ev, broadcast) {
    var opts = this.opts;
    if (!opts.ctrl && ev.ctrlKey) {
      return;
    }
    if (!opts.meta && ev.metaKey) {
      return;
    }
    if (!opts.rightClick && ev.which === 2) {
      return;
    }
    if (this.opts.preventDefault && ev.preventDefault) {
      ev.preventDefault();
    }
    broadcast(this.data);
  }
  return module.exports;
});

System.registerDynamic("npm:observ-array@3.2.1/splice.js", ["npm:observ-array@3.2.1/add-listener.js", "npm:observ-array@3.2.1/lib/set-non-enumerable.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var slice = Array.prototype.slice;
  var addListener = $__require('npm:observ-array@3.2.1/add-listener.js');
  var setNonEnumerable = $__require('npm:observ-array@3.2.1/lib/set-non-enumerable.js');
  module.exports = splice;
  function splice(index, amount) {
    var obs = this;
    var args = slice.call(arguments, 0);
    var valueList = obs().slice();
    var valueArgs = args.map(function(value, index) {
      if (index === 0 || index === 1) {
        return value;
      }
      return typeof value === "function" ? value() : value;
    });
    valueList.splice.apply(valueList, valueArgs);
    var removed = obs._list.splice.apply(obs._list, args);
    var extraRemoveListeners = args.slice(2).map(function(observ) {
      return typeof observ === "function" ? addListener(obs, observ) : null;
    });
    extraRemoveListeners.unshift(args[0], args[1]);
    var removedListeners = obs._removeListeners.splice.apply(obs._removeListeners, extraRemoveListeners);
    removedListeners.forEach(function(removeObservListener) {
      if (removeObservListener) {
        removeObservListener();
      }
    });
    setNonEnumerable(valueList, "_diff", [valueArgs]);
    obs._observSet(valueList);
    return removed;
  }
  return module.exports;
});

System.registerDynamic("npm:observ-array@3.2.1/put.js", ["npm:observ-array@3.2.1/add-listener.js", "npm:observ-array@3.2.1/lib/set-non-enumerable.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var addListener = $__require('npm:observ-array@3.2.1/add-listener.js');
  var setNonEnumerable = $__require('npm:observ-array@3.2.1/lib/set-non-enumerable.js');
  module.exports = put;
  function put(index, value) {
    var obs = this;
    var valueList = obs().slice();
    var originalLength = valueList.length;
    valueList[index] = typeof value === "function" ? value() : value;
    obs._list[index] = value;
    var removeListener = obs._removeListeners[index];
    if (removeListener) {
      removeListener();
    }
    obs._removeListeners[index] = typeof value === "function" ? addListener(obs, value) : null;
    var valueArgs = index < originalLength ? [index, 1, valueList[index]] : [index, 0, valueList[index]];
    setNonEnumerable(valueList, "_diff", [valueArgs]);
    obs._observSet(valueList);
    return value;
  }
  return module.exports;
});

System.registerDynamic("npm:adiff@0.2.13/index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function head(a) {
    return a[0];
  }
  function last(a) {
    return a[a.length - 1];
  }
  function tail(a) {
    return a.slice(1);
  }
  function retreat(e) {
    return e.pop();
  }
  function hasLength(e) {
    return e.length;
  }
  function any(ary, test) {
    for (var i = 0; i < ary.length; i++)
      if (test(ary[i]))
        return true;
    return false;
  }
  function score(a) {
    return a.reduce(function(s, a) {
      return s + a.length + a[1] + 1;
    }, 0);
  }
  function best(a, b) {
    return score(a) <= score(b) ? a : b;
  }
  var _rules;
  function _equal(a, b) {
    if (a && !b)
      return false;
    if (Array.isArray(a))
      if (a.length != b.length)
        return false;
    if (a && 'object' == typeof a) {
      for (var i in a)
        if (!_equal(a[i], b[i]))
          return false;
      for (var i in b)
        if (!_equal(a[i], b[i]))
          return false;
      return true;
    }
    return a == b;
  }
  function getArgs(args) {
    return args.length == 1 ? args[0] : [].slice.call(args);
  }
  function oddElement(ary, cmp) {
    var c;
    function guess(a) {
      var odd = -1;
      c = 0;
      for (var i = a; i < ary.length; i++) {
        if (!cmp(ary[a], ary[i])) {
          odd = i, c++;
        }
      }
      return c > 1 ? -1 : odd;
    }
    var g = guess(0);
    if (-1 != g)
      return g;
    guess(1);
    return c == 0 ? 0 : -1;
  }
  var exports = module.exports = function(deps, exports) {
    var equal = (deps && deps.equal) || _equal;
    exports = exports || {};
    exports.lcs = function lcs() {
      var cache = {};
      var args = getArgs(arguments);
      var a = args[0],
          b = args[1];
      function key(a, b) {
        return a.length + ':' + b.length;
      }
      if (args.length > 2) {
        args.push(lcs(args.shift(), args.shift()));
        return lcs(args);
      }
      var start = 0,
          end = 0;
      for (var i = 0; i < a.length && i < b.length && equal(a[i], b[i]); i++)
        start = i + 1;
      if (a.length === start)
        return a.slice();
      for (var i = 0; i < a.length - start && i < b.length - start && equal(a[a.length - 1 - i], b[b.length - 1 - i]); i++)
        end = i;
      function recurse(a, b) {
        if (!a.length || !b.length)
          return [];
        if (cache[key(a, b)])
          return cache[key(a, b)];
        if (equal(a[0], b[0]))
          return [head(a)].concat(recurse(tail(a), tail(b)));
        else {
          var _a = recurse(tail(a), b);
          var _b = recurse(a, tail(b));
          return cache[key(a, b)] = _a.length > _b.length ? _a : _b;
        }
      }
      var middleA = a.slice(start, a.length - end);
      var middleB = b.slice(start, b.length - end);
      return (a.slice(0, start).concat(recurse(middleA, middleB)).concat(a.slice(a.length - end)));
    };
    exports.chunk = function(q, build) {
      var q = q.map(function(e) {
        return e.slice();
      });
      var lcs = exports.lcs.apply(null, q);
      var all = [lcs].concat(q);
      function matchLcs(e) {
        if (e.length && !lcs.length || !e.length && lcs.length)
          return false;
        return equal(last(e), last(lcs)) || ((e.length + lcs.length) === 0);
      }
      while (any(q, hasLength)) {
        while (q.every(matchLcs) && q.every(hasLength))
          all.forEach(retreat);
        var c = false;
        var unstable = q.map(function(e) {
          var change = [];
          while (!matchLcs(e)) {
            change.unshift(retreat(e));
            c = true;
          }
          return change;
        });
        if (c)
          build(q[0].length, unstable);
      }
    };
    exports.optimisticDiff = function(a, b) {
      var M = Math.max(a.length, b.length);
      var m = Math.min(a.length, b.length);
      var patch = [];
      for (var i = 0; i < M; i++)
        if (a[i] !== b[i]) {
          var cur = [i, 0],
              deletes = 0;
          while (a[i] !== b[i] && i < m) {
            cur[1] = ++deletes;
            cur.push(b[i++]);
          }
          if (i >= m) {
            if (a.length > b.length)
              cur[1] += a.length - b.length;
            else if (a.length < b.length)
              cur = cur.concat(b.slice(a.length));
          }
          patch.push(cur);
        }
      return patch;
    };
    exports.diff = function(a, b) {
      var optimistic = exports.optimisticDiff(a, b);
      var changes = [];
      exports.chunk([a, b], function(index, unstable) {
        var del = unstable.shift().length;
        var insert = unstable.shift();
        changes.push([index, del].concat(insert));
      });
      return best(optimistic, changes);
    };
    exports.patch = function(a, changes, mutate) {
      if (mutate !== true)
        a = a.slice(a);
      changes.forEach(function(change) {
        [].splice.apply(a, change);
      });
      return a;
    };
    exports.merge = function() {
      var args = getArgs(arguments);
      var patch = exports.diff3(args);
      return exports.patch(args[0], patch);
    };
    exports.diff3 = function() {
      var args = getArgs(arguments);
      var r = [];
      exports.chunk(args, function(index, unstable) {
        var mine = unstable[0];
        var insert = resolve(unstable);
        if (equal(mine, insert))
          return;
        r.push([index, mine.length].concat(insert));
      });
      return r;
    };
    exports.oddOneOut = function oddOneOut(changes) {
      changes = changes.slice();
      changes.unshift(changes.splice(1, 1)[0]);
      var i = oddElement(changes, equal);
      if (i == 0)
        return changes[1];
      if (~i)
        return changes[i];
    };
    exports.insertMergeOverDelete = function insertMergeOverDelete(changes) {
      changes = changes.slice();
      changes.splice(1, 1);
      for (var i = 0,
          nonempty; i < changes.length; i++)
        if (changes[i].length)
          if (!nonempty)
            nonempty = changes[i];
          else
            return;
      return nonempty;
    };
    var rules = (deps && deps.rules) || [exports.oddOneOut, exports.insertMergeOverDelete];
    function resolve(changes) {
      var l = rules.length;
      for (var i in rules) {
        var c = rules[i] && rules[i](changes);
        if (c)
          return c;
      }
      changes.splice(1, 1);
      return {'?': changes};
    }
    return exports;
  };
  exports(null, exports);
  return module.exports;
});

System.registerDynamic("npm:adiff@0.2.13.js", ["npm:adiff@0.2.13/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:adiff@0.2.13/index.js');
  return module.exports;
});

System.registerDynamic("npm:observ-array@3.2.1/set.js", ["npm:observ-array@3.2.1/apply-patch.js", "npm:observ-array@3.2.1/lib/set-non-enumerable.js", "npm:adiff@0.2.13.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var applyPatch = $__require('npm:observ-array@3.2.1/apply-patch.js');
  var setNonEnumerable = $__require('npm:observ-array@3.2.1/lib/set-non-enumerable.js');
  var adiff = $__require('npm:adiff@0.2.13.js');
  module.exports = set;
  function set(rawList) {
    if (!Array.isArray(rawList))
      rawList = [];
    var obs = this;
    var changes = adiff.diff(obs._list, rawList);
    var valueList = obs().slice();
    var valueChanges = changes.map(applyPatch.bind(obs, valueList));
    setNonEnumerable(valueList, "_diff", valueChanges);
    obs._observSet(valueList);
    return changes;
  }
  return module.exports;
});

System.registerDynamic("npm:observ-array@3.2.1/transaction.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = transaction;
  function transaction(func) {
    var obs = this;
    var rawList = obs._list.slice();
    if (func(rawList) !== false) {
      return obs.set(rawList);
    }
  }
  return module.exports;
});

System.registerDynamic("npm:observ-array@3.2.1/array-reverse.js", ["npm:observ-array@3.2.1/apply-patch.js", "npm:observ-array@3.2.1/lib/set-non-enumerable.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var applyPatch = $__require('npm:observ-array@3.2.1/apply-patch.js');
  var setNonEnumerable = $__require('npm:observ-array@3.2.1/lib/set-non-enumerable.js');
  module.exports = reverse;
  function reverse() {
    var obs = this;
    var changes = fakeDiff(obs._list.slice().reverse());
    var valueList = obs().slice().reverse();
    var valueChanges = changes.map(applyPatch.bind(obs, valueList));
    setNonEnumerable(valueList, "_diff", valueChanges);
    obs._observSet(valueList);
    return changes;
  }
  function fakeDiff(arr) {
    var _diff;
    var len = arr.length;
    if (len % 2) {
      var midPoint = (len - 1) / 2;
      var a = [0, midPoint].concat(arr.slice(0, midPoint));
      var b = [midPoint + 1, midPoint].concat(arr.slice(midPoint + 1, len));
      var _diff = [a, b];
    } else {
      _diff = [[0, len].concat(arr)];
    }
    return _diff;
  }
  return module.exports;
});

System.registerDynamic("npm:observ-array@3.2.1/apply-patch.js", ["npm:observ-array@3.2.1/add-listener.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var addListener = $__require('npm:observ-array@3.2.1/add-listener.js');
  module.exports = applyPatch;
  function applyPatch(valueList, args) {
    var obs = this;
    var valueArgs = args.map(unpack);
    valueList.splice.apply(valueList, valueArgs);
    obs._list.splice.apply(obs._list, args);
    var extraRemoveListeners = args.slice(2).map(function(observ) {
      return typeof observ === "function" ? addListener(obs, observ) : null;
    });
    extraRemoveListeners.unshift(args[0], args[1]);
    var removedListeners = obs._removeListeners.splice.apply(obs._removeListeners, extraRemoveListeners);
    removedListeners.forEach(function(removeObservListener) {
      if (removeObservListener) {
        removeObservListener();
      }
    });
    return valueArgs;
  }
  function unpack(value, index) {
    if (index === 0 || index === 1) {
      return value;
    }
    return typeof value === "function" ? value() : value;
  }
  return module.exports;
});

System.registerDynamic("npm:observ-array@3.2.1/array-sort.js", ["npm:observ-array@3.2.1/apply-patch.js", "npm:observ-array@3.2.1/lib/set-non-enumerable.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var applyPatch = $__require('npm:observ-array@3.2.1/apply-patch.js');
  var setNonEnumerable = $__require('npm:observ-array@3.2.1/lib/set-non-enumerable.js');
  module.exports = sort;
  function sort(compare) {
    var obs = this;
    var list = obs._list.slice();
    var unpacked = unpack(list);
    var sorted = unpacked.map(function(it) {
      return it.val;
    }).sort(compare);
    var packed = repack(sorted, unpacked);
    var changes = [[0, packed.length].concat(packed)];
    var valueChanges = changes.map(applyPatch.bind(obs, sorted));
    setNonEnumerable(sorted, "_diff", valueChanges);
    obs._observSet(sorted);
    return changes;
  }
  function unpack(list) {
    var unpacked = [];
    for (var i = 0; i < list.length; i++) {
      unpacked.push({
        val: ("function" == typeof list[i]) ? list[i]() : list[i],
        obj: list[i]
      });
    }
    return unpacked;
  }
  function repack(sorted, unpacked) {
    var packed = [];
    while (sorted.length) {
      var s = sorted.shift();
      var indx = indexOf(s, unpacked);
      if (~indx)
        packed.push(unpacked.splice(indx, 1)[0].obj);
    }
    return packed;
  }
  function indexOf(n, h) {
    for (var i = 0; i < h.length; i++) {
      if (n === h[i].val)
        return i;
    }
    return -1;
  }
  return module.exports;
});

System.registerDynamic("npm:observ-array@3.2.1/array-methods.js", ["npm:observ-array@3.2.1/index.js", "npm:observ-array@3.2.1/array-reverse.js", "npm:observ-array@3.2.1/array-sort.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ObservArray = $__require('npm:observ-array@3.2.1/index.js');
  var slice = Array.prototype.slice;
  var ARRAY_METHODS = ["concat", "slice", "every", "filter", "forEach", "indexOf", "join", "lastIndexOf", "map", "reduce", "reduceRight", "some", "toString", "toLocaleString"];
  var methods = ARRAY_METHODS.map(function(name) {
    return [name, function() {
      var res = this._list[name].apply(this._list, arguments);
      if (res && Array.isArray(res)) {
        res = ObservArray(res);
      }
      return res;
    }];
  });
  module.exports = ArrayMethods;
  function ArrayMethods(obs) {
    obs.push = observArrayPush;
    obs.pop = observArrayPop;
    obs.shift = observArrayShift;
    obs.unshift = observArrayUnshift;
    obs.reverse = $__require('npm:observ-array@3.2.1/array-reverse.js');
    obs.sort = $__require('npm:observ-array@3.2.1/array-sort.js');
    methods.forEach(function(tuple) {
      obs[tuple[0]] = tuple[1];
    });
    return obs;
  }
  function observArrayPush() {
    var args = slice.call(arguments);
    args.unshift(this._list.length, 0);
    this.splice.apply(this, args);
    return this._list.length;
  }
  function observArrayPop() {
    return this.splice(this._list.length - 1, 1)[0];
  }
  function observArrayShift() {
    return this.splice(0, 1)[0];
  }
  function observArrayUnshift() {
    var args = slice.call(arguments);
    args.unshift(0, 0);
    this.splice.apply(this, args);
    return this._list.length;
  }
  function notImplemented() {
    throw new Error("Pull request welcome");
  }
  return module.exports;
});

System.registerDynamic("npm:observ-array@3.2.1/lib/set-non-enumerable.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = setNonEnumerable;
  function setNonEnumerable(object, key, value) {
    Object.defineProperty(object, key, {
      value: value,
      writable: true,
      configurable: true,
      enumerable: false
    });
  }
  return module.exports;
});

System.registerDynamic("npm:observ-array@3.2.1/add-listener.js", ["npm:observ-array@3.2.1/lib/set-non-enumerable.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var setNonEnumerable = $__require('npm:observ-array@3.2.1/lib/set-non-enumerable.js');
  module.exports = addListener;
  function addListener(observArray, observ) {
    var list = observArray._list;
    return observ(function(value) {
      var valueList = observArray().slice();
      var index = list.indexOf(observ);
      if (index === -1) {
        var message = "observ-array: Unremoved observ listener";
        var err = new Error(message);
        err.list = list;
        err.index = index;
        err.observ = observ;
        throw err;
      }
      valueList.splice(index, 1, value);
      setNonEnumerable(valueList, "_diff", [[index, 1, value]]);
      observArray._observSet(valueList);
    });
  }
  return module.exports;
});

System.registerDynamic("npm:observ-array@3.2.1/index.js", ["npm:observ@0.2.0.js", "npm:observ-array@3.2.1/splice.js", "npm:observ-array@3.2.1/put.js", "npm:observ-array@3.2.1/set.js", "npm:observ-array@3.2.1/transaction.js", "npm:observ-array@3.2.1/array-methods.js", "npm:observ-array@3.2.1/add-listener.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observ = $__require('npm:observ@0.2.0.js');
  module.exports = ObservArray;
  var splice = $__require('npm:observ-array@3.2.1/splice.js');
  var put = $__require('npm:observ-array@3.2.1/put.js');
  var set = $__require('npm:observ-array@3.2.1/set.js');
  var transaction = $__require('npm:observ-array@3.2.1/transaction.js');
  var ArrayMethods = $__require('npm:observ-array@3.2.1/array-methods.js');
  var addListener = $__require('npm:observ-array@3.2.1/add-listener.js');
  function ObservArray(initialList) {
    var list = initialList;
    var initialState = [];
    list.forEach(function(observ, index) {
      initialState[index] = typeof observ === "function" ? observ() : observ;
    });
    var obs = Observ(initialState);
    obs.splice = splice;
    obs._observSet = obs.set;
    obs.set = set;
    obs.get = get;
    obs.getLength = getLength;
    obs.put = put;
    obs.transaction = transaction;
    obs._list = list;
    var removeListeners = list.map(function(observ) {
      return typeof observ === "function" ? addListener(obs, observ) : null;
    });
    obs._removeListeners = removeListeners;
    obs._type = "observ-array";
    obs._version = "3";
    return ArrayMethods(obs, list);
  }
  function get(index) {
    return this._list[index];
  }
  function getLength() {
    return this._list.length;
  }
  return module.exports;
});

System.registerDynamic("npm:observ-array@3.2.1.js", ["npm:observ-array@3.2.1/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:observ-array@3.2.1/index.js');
  return module.exports;
});

System.registerDynamic("npm:observ-struct@5.0.1/index.js", ["npm:observ@0.2.0.js", "npm:xtend@3.0.0.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observ = $__require('npm:observ@0.2.0.js');
  var extend = $__require('npm:xtend@3.0.0.js');
  var blackList = ["name", "_diff", "_type", "_version"];
  var blackListReasons = {
    "name": "Clashes with `Function.prototype.name`.\n",
    "_diff": "_diff is reserved key of observ-struct.\n",
    "_type": "_type is reserved key of observ-struct.\n",
    "_version": "_version is reserved key of observ-struct.\n"
  };
  var NO_TRANSACTION = {};
  function setNonEnumerable(object, key, value) {
    Object.defineProperty(object, key, {
      value: value,
      writable: true,
      configurable: true,
      enumerable: false
    });
  }
  module.exports = ObservStruct;
  function ObservStruct(struct) {
    var keys = Object.keys(struct);
    var initialState = {};
    var currentTransaction = NO_TRANSACTION;
    var nestedTransaction = NO_TRANSACTION;
    keys.forEach(function(key) {
      if (blackList.indexOf(key) !== -1) {
        throw new Error("cannot create an observ-struct " + "with a key named '" + key + "'.\n" + blackListReasons[key]);
      }
      var observ = struct[key];
      initialState[key] = typeof observ === "function" ? observ() : observ;
    });
    var obs = Observ(initialState);
    keys.forEach(function(key) {
      var observ = struct[key];
      obs[key] = observ;
      if (typeof observ === "function") {
        observ(function(value) {
          if (nestedTransaction === value) {
            return;
          }
          var state = extend(obs());
          state[key] = value;
          var diff = {};
          diff[key] = value && value._diff ? value._diff : value;
          setNonEnumerable(state, "_diff", diff);
          currentTransaction = state;
          obs.set(state);
          currentTransaction = NO_TRANSACTION;
        });
      }
    });
    var _set = obs.set;
    obs.set = function trackDiff(value) {
      if (currentTransaction === value) {
        return _set(value);
      }
      var newState = extend(value);
      setNonEnumerable(newState, "_diff", value);
      _set(newState);
    };
    obs(function(newState) {
      if (currentTransaction === newState) {
        return;
      }
      keys.forEach(function(key) {
        var observ = struct[key];
        var newObservValue = newState[key];
        if (typeof observ === "function" && observ() !== newObservValue) {
          nestedTransaction = newObservValue;
          observ.set(newState[key]);
          nestedTransaction = NO_TRANSACTION;
        }
      });
    });
    obs._type = "observ-struct";
    obs._version = "5";
    return obs;
  }
  return module.exports;
});

System.registerDynamic("npm:observ-struct@5.0.1.js", ["npm:observ-struct@5.0.1/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:observ-struct@5.0.1/index.js');
  return module.exports;
});

System.registerDynamic("npm:xtend@3.0.0/index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = extend;
  function extend() {
    var target = {};
    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }
  return module.exports;
});

System.registerDynamic("npm:xtend@3.0.0.js", ["npm:xtend@3.0.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:xtend@3.0.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:process@0.11.3/browser.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  return module.exports;
});

System.registerDynamic("npm:process@0.11.3.js", ["npm:process@0.11.3/browser.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:process@0.11.3/browser.js');
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2/index.js", ["npm:process@0.11.3.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.3.js');
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('github:jspm/nodelibs-process@0.1.2/index.js');
  return module.exports;
});

System.registerDynamic("npm:observ-varhash@1.0.8/index.js", ["npm:observ@0.2.0.js", "npm:xtend@3.0.0.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    var Observ = $__require('npm:observ@0.2.0.js');
    var extend = $__require('npm:xtend@3.0.0.js');
    var NO_TRANSACTION = {};
    module.exports = ObservVarhash;
    function ObservVarhash(hash, createValue) {
      createValue = createValue || function(obj) {
        return obj;
      };
      var initialState = {};
      var currentTransaction = NO_TRANSACTION;
      var nestedTransaction = NO_TRANSACTION;
      var obs = Observ(initialState);
      setNonEnumerable(obs, '_removeListeners', {});
      setNonEnumerable(obs, 'get', get.bind(obs));
      setNonEnumerable(obs, 'put', put.bind(obs));
      setNonEnumerable(obs, 'delete', del.bind(obs));
      for (var key in hash) {
        obs[key] = isFn(hash[key]) ? hash[key] : createValue(hash[key], key);
        if (isFn(obs[key])) {
          obs._removeListeners[key] = obs[key](watch(obs, key));
        }
      }
      var _set = obs.set;
      obs.set = function trackDiff(value) {
        if (currentTransaction === value) {
          return _set(value);
        }
        var newState = extend(value);
        setNonEnumerable(newState, '_diff', value);
        _set(newState);
      };
      setNonEnumerable(obs, 'set', obs.set);
      var newState = {};
      for (key in hash) {
        var observ = obs[key];
        checkKey(key);
        newState[key] = isFn(observ) ? observ() : observ;
      }
      obs.set(newState);
      obs(function(newState) {
        if (currentTransaction === newState) {
          return;
        }
        for (var key in hash) {
          var observ = hash[key];
          var newObservValue = newState[key];
          if (isFn(observ) && observ() !== newState[key]) {
            nestedTransaction = newObservValue;
            observ.set(newState[key]);
            nestedTransaction = NO_TRANSACTION;
          }
        }
      });
      function put(key, val) {
        checkKey(key);
        if (val === undefined) {
          throw new Error('cannot varhash.put(key, undefined).');
        }
        var observ = isFn(val) ? val : createValue(val, key);
        var state = extend(this());
        state[key] = isFn(observ) ? observ() : observ;
        if (isFn(this._removeListeners[key])) {
          this._removeListeners[key]();
        }
        this._removeListeners[key] = isFn(observ) ? observ(watch(this, key)) : null;
        setNonEnumerable(state, '_diff', diff(key, state[key]));
        this[key] = observ;
        currentTransaction = state;
        _set(state);
        currentTransaction = NO_TRANSACTION;
        return this;
      }
      function del(key) {
        var state = extend(this());
        if (isFn(this._removeListeners[key])) {
          this._removeListeners[key]();
        }
        delete this._removeListeners[key];
        delete state[key];
        delete this[key];
        setNonEnumerable(state, '_diff', diff(key, undefined));
        _set(state);
        return this;
      }
      return obs;
      function watch(obs, key) {
        return function(value) {
          if (nestedTransaction === value) {
            return;
          }
          var state = extend(obs());
          state[key] = value;
          setNonEnumerable(state, '_diff', diff(key, value));
          currentTransaction = state;
          obs.set(state);
          currentTransaction = NO_TRANSACTION;
        };
      }
    }
    function get(key) {
      return this[key];
    }
    function diff(key, value) {
      var obj = {};
      obj[key] = value && value._diff ? value._diff : value;
      return obj;
    }
    function isFn(obj) {
      return typeof obj === 'function';
    }
    function setNonEnumerable(object, key, value) {
      Object.defineProperty(object, key, {
        value: value,
        writable: true,
        configurable: true,
        enumerable: false
      });
    }
    var blacklist = {
      name: 'Clashes with `Function.prototype.name`.',
      get: 'get is a reserved key of observ-varhash method',
      put: 'put is a reserved key of observ-varhash method',
      'delete': 'delete is a reserved key of observ-varhash method',
      _diff: '_diff is a reserved key of observ-varhash method',
      _removeListeners: '_removeListeners is a reserved key of observ-varhash'
    };
    function checkKey(key) {
      if (!blacklist[key])
        return;
      throw new Error('cannot create an observ-varhash with key `' + key + '`. ' + blacklist[key]);
    }
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:observ-varhash@1.0.8.js", ["npm:observ-varhash@1.0.8/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:observ-varhash@1.0.8/index.js');
  return module.exports;
});

System.registerDynamic("npm:observ@0.2.0.js", ["npm:observ@0.2.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:observ@0.2.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vtree/diff-props.js", ["npm:is-object@1.0.1.js", "npm:virtual-dom@2.1.1/vnode/is-vhook.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isObject = $__require('npm:is-object@1.0.1.js');
  var isHook = $__require('npm:virtual-dom@2.1.1/vnode/is-vhook.js');
  module.exports = diffProps;
  function diffProps(a, b) {
    var diff;
    for (var aKey in a) {
      if (!(aKey in b)) {
        diff = diff || {};
        diff[aKey] = undefined;
      }
      var aValue = a[aKey];
      var bValue = b[aKey];
      if (aValue === bValue) {
        continue;
      } else if (isObject(aValue) && isObject(bValue)) {
        if (getPrototype(bValue) !== getPrototype(aValue)) {
          diff = diff || {};
          diff[aKey] = bValue;
        } else if (isHook(bValue)) {
          diff = diff || {};
          diff[aKey] = bValue;
        } else {
          var objectDiff = diffProps(aValue, bValue);
          if (objectDiff) {
            diff = diff || {};
            diff[aKey] = objectDiff;
          }
        }
      } else {
        diff = diff || {};
        diff[aKey] = bValue;
      }
    }
    for (var bKey in b) {
      if (!(bKey in a)) {
        diff = diff || {};
        diff[bKey] = b[bKey];
      }
    }
    return diff;
  }
  function getPrototype(value) {
    if (Object.getPrototypeOf) {
      return Object.getPrototypeOf(value);
    } else if (value.__proto__) {
      return value.__proto__;
    } else if (value.constructor) {
      return value.constructor.prototype;
    }
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vtree/diff.js", ["npm:x-is-array@0.1.0.js", "npm:virtual-dom@2.1.1/vnode/vpatch.js", "npm:virtual-dom@2.1.1/vnode/is-vnode.js", "npm:virtual-dom@2.1.1/vnode/is-vtext.js", "npm:virtual-dom@2.1.1/vnode/is-widget.js", "npm:virtual-dom@2.1.1/vnode/is-thunk.js", "npm:virtual-dom@2.1.1/vnode/handle-thunk.js", "npm:virtual-dom@2.1.1/vtree/diff-props.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isArray = $__require('npm:x-is-array@0.1.0.js');
  var VPatch = $__require('npm:virtual-dom@2.1.1/vnode/vpatch.js');
  var isVNode = $__require('npm:virtual-dom@2.1.1/vnode/is-vnode.js');
  var isVText = $__require('npm:virtual-dom@2.1.1/vnode/is-vtext.js');
  var isWidget = $__require('npm:virtual-dom@2.1.1/vnode/is-widget.js');
  var isThunk = $__require('npm:virtual-dom@2.1.1/vnode/is-thunk.js');
  var handleThunk = $__require('npm:virtual-dom@2.1.1/vnode/handle-thunk.js');
  var diffProps = $__require('npm:virtual-dom@2.1.1/vtree/diff-props.js');
  module.exports = diff;
  function diff(a, b) {
    var patch = {a: a};
    walk(a, b, patch, 0);
    return patch;
  }
  function walk(a, b, patch, index) {
    if (a === b) {
      return;
    }
    var apply = patch[index];
    var applyClear = false;
    if (isThunk(a) || isThunk(b)) {
      thunks(a, b, patch, index);
    } else if (b == null) {
      if (!isWidget(a)) {
        clearState(a, patch, index);
        apply = patch[index];
      }
      apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b));
    } else if (isVNode(b)) {
      if (isVNode(a)) {
        if (a.tagName === b.tagName && a.namespace === b.namespace && a.key === b.key) {
          var propsPatch = diffProps(a.properties, b.properties);
          if (propsPatch) {
            apply = appendPatch(apply, new VPatch(VPatch.PROPS, a, propsPatch));
          }
          apply = diffChildren(a, b, patch, apply, index);
        } else {
          apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
          applyClear = true;
        }
      } else {
        apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
        applyClear = true;
      }
    } else if (isVText(b)) {
      if (!isVText(a)) {
        apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
        applyClear = true;
      } else if (a.text !== b.text) {
        apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
      }
    } else if (isWidget(b)) {
      if (!isWidget(a)) {
        applyClear = true;
      }
      apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b));
    }
    if (apply) {
      patch[index] = apply;
    }
    if (applyClear) {
      clearState(a, patch, index);
    }
  }
  function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children;
    var orderedSet = reorder(aChildren, b.children);
    var bChildren = orderedSet.children;
    var aLen = aChildren.length;
    var bLen = bChildren.length;
    var len = aLen > bLen ? aLen : bLen;
    for (var i = 0; i < len; i++) {
      var leftNode = aChildren[i];
      var rightNode = bChildren[i];
      index += 1;
      if (!leftNode) {
        if (rightNode) {
          apply = appendPatch(apply, new VPatch(VPatch.INSERT, null, rightNode));
        }
      } else {
        walk(leftNode, rightNode, patch, index);
      }
      if (isVNode(leftNode) && leftNode.count) {
        index += leftNode.count;
      }
    }
    if (orderedSet.moves) {
      apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, orderedSet.moves));
    }
    return apply;
  }
  function clearState(vNode, patch, index) {
    unhook(vNode, patch, index);
    destroyWidgets(vNode, patch, index);
  }
  function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
      if (typeof vNode.destroy === "function") {
        patch[index] = appendPatch(patch[index], new VPatch(VPatch.REMOVE, vNode, null));
      }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
      var children = vNode.children;
      var len = children.length;
      for (var i = 0; i < len; i++) {
        var child = children[i];
        index += 1;
        destroyWidgets(child, patch, index);
        if (isVNode(child) && child.count) {
          index += child.count;
        }
      }
    } else if (isThunk(vNode)) {
      thunks(vNode, null, patch, index);
    }
  }
  function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b);
    var thunkPatch = diff(nodes.a, nodes.b);
    if (hasPatches(thunkPatch)) {
      patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch);
    }
  }
  function hasPatches(patch) {
    for (var index in patch) {
      if (index !== "a") {
        return true;
      }
    }
    return false;
  }
  function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
      if (vNode.hooks) {
        patch[index] = appendPatch(patch[index], new VPatch(VPatch.PROPS, vNode, undefinedKeys(vNode.hooks)));
      }
      if (vNode.descendantHooks || vNode.hasThunks) {
        var children = vNode.children;
        var len = children.length;
        for (var i = 0; i < len; i++) {
          var child = children[i];
          index += 1;
          unhook(child, patch, index);
          if (isVNode(child) && child.count) {
            index += child.count;
          }
        }
      }
    } else if (isThunk(vNode)) {
      thunks(vNode, null, patch, index);
    }
  }
  function undefinedKeys(obj) {
    var result = {};
    for (var key in obj) {
      result[key] = undefined;
    }
    return result;
  }
  function reorder(aChildren, bChildren) {
    var bChildIndex = keyIndex(bChildren);
    var bKeys = bChildIndex.keys;
    var bFree = bChildIndex.free;
    if (bFree.length === bChildren.length) {
      return {
        children: bChildren,
        moves: null
      };
    }
    var aChildIndex = keyIndex(aChildren);
    var aKeys = aChildIndex.keys;
    var aFree = aChildIndex.free;
    if (aFree.length === aChildren.length) {
      return {
        children: bChildren,
        moves: null
      };
    }
    var newChildren = [];
    var freeIndex = 0;
    var freeCount = bFree.length;
    var deletedItems = 0;
    for (var i = 0; i < aChildren.length; i++) {
      var aItem = aChildren[i];
      var itemIndex;
      if (aItem.key) {
        if (bKeys.hasOwnProperty(aItem.key)) {
          itemIndex = bKeys[aItem.key];
          newChildren.push(bChildren[itemIndex]);
        } else {
          itemIndex = i - deletedItems++;
          newChildren.push(null);
        }
      } else {
        if (freeIndex < freeCount) {
          itemIndex = bFree[freeIndex++];
          newChildren.push(bChildren[itemIndex]);
        } else {
          itemIndex = i - deletedItems++;
          newChildren.push(null);
        }
      }
    }
    var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex];
    for (var j = 0; j < bChildren.length; j++) {
      var newItem = bChildren[j];
      if (newItem.key) {
        if (!aKeys.hasOwnProperty(newItem.key)) {
          newChildren.push(newItem);
        }
      } else if (j >= lastFreeIndex) {
        newChildren.push(newItem);
      }
    }
    var simulate = newChildren.slice();
    var simulateIndex = 0;
    var removes = [];
    var inserts = [];
    var simulateItem;
    for (var k = 0; k < bChildren.length; ) {
      var wantedItem = bChildren[k];
      simulateItem = simulate[simulateIndex];
      while (simulateItem === null && simulate.length) {
        removes.push(remove(simulate, simulateIndex, null));
        simulateItem = simulate[simulateIndex];
      }
      if (!simulateItem || simulateItem.key !== wantedItem.key) {
        if (wantedItem.key) {
          if (simulateItem && simulateItem.key) {
            if (bKeys[simulateItem.key] !== k + 1) {
              removes.push(remove(simulate, simulateIndex, simulateItem.key));
              simulateItem = simulate[simulateIndex];
              if (!simulateItem || simulateItem.key !== wantedItem.key) {
                inserts.push({
                  key: wantedItem.key,
                  to: k
                });
              } else {
                simulateIndex++;
              }
            } else {
              inserts.push({
                key: wantedItem.key,
                to: k
              });
            }
          } else {
            inserts.push({
              key: wantedItem.key,
              to: k
            });
          }
          k++;
        } else if (simulateItem && simulateItem.key) {
          removes.push(remove(simulate, simulateIndex, simulateItem.key));
        }
      } else {
        simulateIndex++;
        k++;
      }
    }
    while (simulateIndex < simulate.length) {
      simulateItem = simulate[simulateIndex];
      removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key));
    }
    if (removes.length === deletedItems && !inserts.length) {
      return {
        children: newChildren,
        moves: null
      };
    }
    return {
      children: newChildren,
      moves: {
        removes: removes,
        inserts: inserts
      }
    };
  }
  function remove(arr, index, key) {
    arr.splice(index, 1);
    return {
      from: index,
      key: key
    };
  }
  function keyIndex(children) {
    var keys = {};
    var free = [];
    var length = children.length;
    for (var i = 0; i < length; i++) {
      var child = children[i];
      if (child.key) {
        keys[child.key] = i;
      } else {
        free.push(i);
      }
    }
    return {
      keys: keys,
      free: free
    };
  }
  function appendPatch(apply, patch) {
    if (apply) {
      if (isArray(apply)) {
        apply.push(patch);
      } else {
        apply = [apply, patch];
      }
      return apply;
    } else {
      return patch;
    }
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vdom/dom-index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var noChild = {};
  module.exports = domIndex;
  function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
      return {};
    } else {
      indices.sort(ascending);
      return recurse(rootNode, tree, indices, nodes, 0);
    }
  }
  function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {};
    if (rootNode) {
      if (indexInRange(indices, rootIndex, rootIndex)) {
        nodes[rootIndex] = rootNode;
      }
      var vChildren = tree.children;
      if (vChildren) {
        var childNodes = rootNode.childNodes;
        for (var i = 0; i < tree.children.length; i++) {
          rootIndex += 1;
          var vChild = vChildren[i] || noChild;
          var nextIndex = rootIndex + (vChild.count || 0);
          if (indexInRange(indices, rootIndex, nextIndex)) {
            recurse(childNodes[i], vChild, indices, nodes, rootIndex);
          }
          rootIndex = nextIndex;
        }
      }
    }
    return nodes;
  }
  function indexInRange(indices, left, right) {
    if (indices.length === 0) {
      return false;
    }
    var minIndex = 0;
    var maxIndex = indices.length - 1;
    var currentIndex;
    var currentItem;
    while (minIndex <= maxIndex) {
      currentIndex = ((maxIndex + minIndex) / 2) >> 0;
      currentItem = indices[currentIndex];
      if (minIndex === maxIndex) {
        return currentItem >= left && currentItem <= right;
      } else if (currentItem < left) {
        minIndex = currentIndex + 1;
      } else if (currentItem > right) {
        maxIndex = currentIndex - 1;
      } else {
        return true;
      }
    }
    return false;
  }
  function ascending(a, b) {
    return a > b ? 1 : -1;
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vnode/vpatch.js", ["npm:virtual-dom@2.1.1/vnode/version.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var version = $__require('npm:virtual-dom@2.1.1/vnode/version.js');
  VirtualPatch.NONE = 0;
  VirtualPatch.VTEXT = 1;
  VirtualPatch.VNODE = 2;
  VirtualPatch.WIDGET = 3;
  VirtualPatch.PROPS = 4;
  VirtualPatch.ORDER = 5;
  VirtualPatch.INSERT = 6;
  VirtualPatch.REMOVE = 7;
  VirtualPatch.THUNK = 8;
  module.exports = VirtualPatch;
  function VirtualPatch(type, vNode, patch) {
    this.type = Number(type);
    this.vNode = vNode;
    this.patch = patch;
  }
  VirtualPatch.prototype.version = version;
  VirtualPatch.prototype.type = "VirtualPatch";
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vdom/update-widget.js", ["npm:virtual-dom@2.1.1/vnode/is-widget.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isWidget = $__require('npm:virtual-dom@2.1.1/vnode/is-widget.js');
  module.exports = updateWidget;
  function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
      if ("name" in a && "name" in b) {
        return a.id === b.id;
      } else {
        return a.init === b.init;
      }
    }
    return false;
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vdom/patch-op.js", ["npm:virtual-dom@2.1.1/vdom/apply-properties.js", "npm:virtual-dom@2.1.1/vnode/is-widget.js", "npm:virtual-dom@2.1.1/vnode/vpatch.js", "npm:virtual-dom@2.1.1/vdom/update-widget.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var applyProperties = $__require('npm:virtual-dom@2.1.1/vdom/apply-properties.js');
  var isWidget = $__require('npm:virtual-dom@2.1.1/vnode/is-widget.js');
  var VPatch = $__require('npm:virtual-dom@2.1.1/vnode/vpatch.js');
  var updateWidget = $__require('npm:virtual-dom@2.1.1/vdom/update-widget.js');
  module.exports = applyPatch;
  function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type;
    var vNode = vpatch.vNode;
    var patch = vpatch.patch;
    switch (type) {
      case VPatch.REMOVE:
        return removeNode(domNode, vNode);
      case VPatch.INSERT:
        return insertNode(domNode, patch, renderOptions);
      case VPatch.VTEXT:
        return stringPatch(domNode, vNode, patch, renderOptions);
      case VPatch.WIDGET:
        return widgetPatch(domNode, vNode, patch, renderOptions);
      case VPatch.VNODE:
        return vNodePatch(domNode, vNode, patch, renderOptions);
      case VPatch.ORDER:
        reorderChildren(domNode, patch);
        return domNode;
      case VPatch.PROPS:
        applyProperties(domNode, patch, vNode.properties);
        return domNode;
      case VPatch.THUNK:
        return replaceRoot(domNode, renderOptions.patch(domNode, patch, renderOptions));
      default:
        return domNode;
    }
  }
  function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode;
    if (parentNode) {
      parentNode.removeChild(domNode);
    }
    destroyWidget(domNode, vNode);
    return null;
  }
  function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions);
    if (parentNode) {
      parentNode.appendChild(newNode);
    }
    return parentNode;
  }
  function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode;
    if (domNode.nodeType === 3) {
      domNode.replaceData(0, domNode.length, vText.text);
      newNode = domNode;
    } else {
      var parentNode = domNode.parentNode;
      newNode = renderOptions.render(vText, renderOptions);
      if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode);
      }
    }
    return newNode;
  }
  function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget);
    var newNode;
    if (updating) {
      newNode = widget.update(leftVNode, domNode) || domNode;
    } else {
      newNode = renderOptions.render(widget, renderOptions);
    }
    var parentNode = domNode.parentNode;
    if (parentNode && newNode !== domNode) {
      parentNode.replaceChild(newNode, domNode);
    }
    if (!updating) {
      destroyWidget(domNode, leftVNode);
    }
    return newNode;
  }
  function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode;
    var newNode = renderOptions.render(vNode, renderOptions);
    if (parentNode && newNode !== domNode) {
      parentNode.replaceChild(newNode, domNode);
    }
    return newNode;
  }
  function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
      w.destroy(domNode);
    }
  }
  function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes;
    var keyMap = {};
    var node;
    var remove;
    var insert;
    for (var i = 0; i < moves.removes.length; i++) {
      remove = moves.removes[i];
      node = childNodes[remove.from];
      if (remove.key) {
        keyMap[remove.key] = node;
      }
      domNode.removeChild(node);
    }
    var length = childNodes.length;
    for (var j = 0; j < moves.inserts.length; j++) {
      insert = moves.inserts[j];
      node = keyMap[insert.key];
      domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
    }
  }
  function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
      oldRoot.parentNode.replaceChild(newRoot, oldRoot);
    }
    return newRoot;
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vdom/patch.js", ["npm:global@4.3.0/document.js", "npm:x-is-array@0.1.0.js", "npm:virtual-dom@2.1.1/vdom/create-element.js", "npm:virtual-dom@2.1.1/vdom/dom-index.js", "npm:virtual-dom@2.1.1/vdom/patch-op.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var document = $__require('npm:global@4.3.0/document.js');
  var isArray = $__require('npm:x-is-array@0.1.0.js');
  var render = $__require('npm:virtual-dom@2.1.1/vdom/create-element.js');
  var domIndex = $__require('npm:virtual-dom@2.1.1/vdom/dom-index.js');
  var patchOp = $__require('npm:virtual-dom@2.1.1/vdom/patch-op.js');
  module.exports = patch;
  function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {};
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch ? renderOptions.patch : patchRecursive;
    renderOptions.render = renderOptions.render || render;
    return renderOptions.patch(rootNode, patches, renderOptions);
  }
  function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches);
    if (indices.length === 0) {
      return rootNode;
    }
    var index = domIndex(rootNode, patches.a, indices);
    var ownerDocument = rootNode.ownerDocument;
    if (!renderOptions.document && ownerDocument !== document) {
      renderOptions.document = ownerDocument;
    }
    for (var i = 0; i < indices.length; i++) {
      var nodeIndex = indices[i];
      rootNode = applyPatch(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
    }
    return rootNode;
  }
  function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
      return rootNode;
    }
    var newNode;
    if (isArray(patchList)) {
      for (var i = 0; i < patchList.length; i++) {
        newNode = patchOp(patchList[i], domNode, renderOptions);
        if (domNode === rootNode) {
          rootNode = newNode;
        }
      }
    } else {
      newNode = patchOp(patchList, domNode, renderOptions);
      if (domNode === rootNode) {
        rootNode = newNode;
      }
    }
    return rootNode;
  }
  function patchIndices(patches) {
    var indices = [];
    for (var key in patches) {
      if (key !== "a") {
        indices.push(Number(key));
      }
    }
    return indices;
  }
  return module.exports;
});

System.registerDynamic("npm:vdom-thunk@3.0.0/shallow-eq.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = shallowEq;
  function shallowEq(currentArgs, previousArgs) {
    if (currentArgs.length === 0 && previousArgs.length === 0) {
      return true;
    }
    if (currentArgs.length !== previousArgs.length) {
      return false;
    }
    var len = currentArgs.length;
    for (var i = 0; i < len; i++) {
      if (currentArgs[i] !== previousArgs[i]) {
        return false;
      }
    }
    return true;
  }
  return module.exports;
});

System.registerDynamic("npm:vdom-thunk@3.0.0/immutable-thunk.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function Thunk(fn, args, key, eqArgs) {
    this.fn = fn;
    this.args = args;
    this.key = key;
    this.eqArgs = eqArgs;
  }
  Thunk.prototype.type = 'Thunk';
  Thunk.prototype.render = render;
  module.exports = Thunk;
  function shouldUpdate(current, previous) {
    if (!current || !previous || current.fn !== previous.fn) {
      return true;
    }
    var cargs = current.args;
    var pargs = previous.args;
    return !current.eqArgs(cargs, pargs);
  }
  function render(previous) {
    if (shouldUpdate(this, previous)) {
      return this.fn.apply(null, this.args);
    } else {
      return previous.vnode;
    }
  }
  return module.exports;
});

System.registerDynamic("npm:vdom-thunk@3.0.0/partial.js", ["npm:vdom-thunk@3.0.0/shallow-eq.js", "npm:vdom-thunk@3.0.0/immutable-thunk.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var shallowEq = $__require('npm:vdom-thunk@3.0.0/shallow-eq.js');
  var Thunk = $__require('npm:vdom-thunk@3.0.0/immutable-thunk.js');
  module.exports = createPartial;
  function createPartial(eq) {
    return function partial(fn) {
      var args = copyOver(arguments, 1);
      var firstArg = args[0];
      var key;
      var eqArgs = eq || shallowEq;
      if (typeof firstArg === 'object' && firstArg !== null) {
        if ('key' in firstArg) {
          key = firstArg.key;
        } else if ('id' in firstArg) {
          key = firstArg.id;
        }
      }
      return new Thunk(fn, args, key, eqArgs);
    };
  }
  function copyOver(list, offset) {
    var newList = [];
    for (var i = list.length - 1; i >= offset; i--) {
      newList[i - offset] = list[i];
    }
    return newList;
  }
  return module.exports;
});

System.registerDynamic("npm:vdom-thunk@3.0.0/index.js", ["npm:vdom-thunk@3.0.0/partial.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Partial = $__require('npm:vdom-thunk@3.0.0/partial.js');
  module.exports = Partial();
  return module.exports;
});

System.registerDynamic("npm:vdom-thunk@3.0.0.js", ["npm:vdom-thunk@3.0.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:vdom-thunk@3.0.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:global@4.3.0/document.js", ["@empty"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var topLevel = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
  var minDoc = $__require('@empty');
  if (typeof document !== 'undefined') {
    module.exports = document;
  } else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];
    if (!doccy) {
      doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
    module.exports = doccy;
  }
  return module.exports;
});

System.registerDynamic("npm:is-object@1.0.1/index.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function isObject(x) {
    return typeof x === "object" && x !== null;
  };
  return module.exports;
});

System.registerDynamic("npm:is-object@1.0.1.js", ["npm:is-object@1.0.1/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:is-object@1.0.1/index.js');
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vdom/apply-properties.js", ["npm:is-object@1.0.1.js", "npm:virtual-dom@2.1.1/vnode/is-vhook.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isObject = $__require('npm:is-object@1.0.1.js');
  var isHook = $__require('npm:virtual-dom@2.1.1/vnode/is-vhook.js');
  module.exports = applyProperties;
  function applyProperties(node, props, previous) {
    for (var propName in props) {
      var propValue = props[propName];
      if (propValue === undefined) {
        removeProperty(node, propName, propValue, previous);
      } else if (isHook(propValue)) {
        removeProperty(node, propName, propValue, previous);
        if (propValue.hook) {
          propValue.hook(node, propName, previous ? previous[propName] : undefined);
        }
      } else {
        if (isObject(propValue)) {
          patchObject(node, props, previous, propName, propValue);
        } else {
          node[propName] = propValue;
        }
      }
    }
  }
  function removeProperty(node, propName, propValue, previous) {
    if (previous) {
      var previousValue = previous[propName];
      if (!isHook(previousValue)) {
        if (propName === "attributes") {
          for (var attrName in previousValue) {
            node.removeAttribute(attrName);
          }
        } else if (propName === "style") {
          for (var i in previousValue) {
            node.style[i] = "";
          }
        } else if (typeof previousValue === "string") {
          node[propName] = "";
        } else {
          node[propName] = null;
        }
      } else if (previousValue.unhook) {
        previousValue.unhook(node, propName, propValue);
      }
    }
  }
  function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined;
    if (propName === "attributes") {
      for (var attrName in propValue) {
        var attrValue = propValue[attrName];
        if (attrValue === undefined) {
          node.removeAttribute(attrName);
        } else {
          node.setAttribute(attrName, attrValue);
        }
      }
      return;
    }
    if (previousValue && isObject(previousValue) && getPrototype(previousValue) !== getPrototype(propValue)) {
      node[propName] = propValue;
      return;
    }
    if (!isObject(node[propName])) {
      node[propName] = {};
    }
    var replacer = propName === "style" ? "" : undefined;
    for (var k in propValue) {
      var value = propValue[k];
      node[propName][k] = (value === undefined) ? replacer : value;
    }
  }
  function getPrototype(value) {
    if (Object.getPrototypeOf) {
      return Object.getPrototypeOf(value);
    } else if (value.__proto__) {
      return value.__proto__;
    } else if (value.constructor) {
      return value.constructor.prototype;
    }
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vnode/handle-thunk.js", ["npm:virtual-dom@2.1.1/vnode/is-vnode.js", "npm:virtual-dom@2.1.1/vnode/is-vtext.js", "npm:virtual-dom@2.1.1/vnode/is-widget.js", "npm:virtual-dom@2.1.1/vnode/is-thunk.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isVNode = $__require('npm:virtual-dom@2.1.1/vnode/is-vnode.js');
  var isVText = $__require('npm:virtual-dom@2.1.1/vnode/is-vtext.js');
  var isWidget = $__require('npm:virtual-dom@2.1.1/vnode/is-widget.js');
  var isThunk = $__require('npm:virtual-dom@2.1.1/vnode/is-thunk.js');
  module.exports = handleThunk;
  function handleThunk(a, b) {
    var renderedA = a;
    var renderedB = b;
    if (isThunk(b)) {
      renderedB = renderThunk(b, a);
    }
    if (isThunk(a)) {
      renderedA = renderThunk(a, null);
    }
    return {
      a: renderedA,
      b: renderedB
    };
  }
  function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode;
    if (!renderedThunk) {
      renderedThunk = thunk.vnode = thunk.render(previous);
    }
    if (!(isVNode(renderedThunk) || isVText(renderedThunk) || isWidget(renderedThunk))) {
      throw new Error("thunk did not return a valid node");
    }
    return renderedThunk;
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vdom/create-element.js", ["npm:global@4.3.0/document.js", "npm:virtual-dom@2.1.1/vdom/apply-properties.js", "npm:virtual-dom@2.1.1/vnode/is-vnode.js", "npm:virtual-dom@2.1.1/vnode/is-vtext.js", "npm:virtual-dom@2.1.1/vnode/is-widget.js", "npm:virtual-dom@2.1.1/vnode/handle-thunk.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var document = $__require('npm:global@4.3.0/document.js');
  var applyProperties = $__require('npm:virtual-dom@2.1.1/vdom/apply-properties.js');
  var isVNode = $__require('npm:virtual-dom@2.1.1/vnode/is-vnode.js');
  var isVText = $__require('npm:virtual-dom@2.1.1/vnode/is-vtext.js');
  var isWidget = $__require('npm:virtual-dom@2.1.1/vnode/is-widget.js');
  var handleThunk = $__require('npm:virtual-dom@2.1.1/vnode/handle-thunk.js');
  module.exports = createElement;
  function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document;
    var warn = opts ? opts.warn : null;
    vnode = handleThunk(vnode).a;
    if (isWidget(vnode)) {
      return vnode.init();
    } else if (isVText(vnode)) {
      return doc.createTextNode(vnode.text);
    } else if (!isVNode(vnode)) {
      if (warn) {
        warn("Item is not a valid virtual dom node", vnode);
      }
      return null;
    }
    var node = (vnode.namespace === null) ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);
    var props = vnode.properties;
    applyProperties(node, props);
    var children = vnode.children;
    for (var i = 0; i < children.length; i++) {
      var childNode = createElement(children[i], opts);
      if (childNode) {
        node.appendChild(childNode);
      }
    }
    return node;
  }
  return module.exports;
});

System.registerDynamic("npm:x-is-array@0.1.0/index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var nativeIsArray = Array.isArray;
  var toString = Object.prototype.toString;
  module.exports = nativeIsArray || isArray;
  function isArray(obj) {
    return toString.call(obj) === "[object Array]";
  }
  return module.exports;
});

System.registerDynamic("npm:x-is-array@0.1.0.js", ["npm:x-is-array@0.1.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:x-is-array@0.1.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vnode/vnode.js", ["npm:virtual-dom@2.1.1/vnode/version.js", "npm:virtual-dom@2.1.1/vnode/is-vnode.js", "npm:virtual-dom@2.1.1/vnode/is-widget.js", "npm:virtual-dom@2.1.1/vnode/is-thunk.js", "npm:virtual-dom@2.1.1/vnode/is-vhook.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var version = $__require('npm:virtual-dom@2.1.1/vnode/version.js');
  var isVNode = $__require('npm:virtual-dom@2.1.1/vnode/is-vnode.js');
  var isWidget = $__require('npm:virtual-dom@2.1.1/vnode/is-widget.js');
  var isThunk = $__require('npm:virtual-dom@2.1.1/vnode/is-thunk.js');
  var isVHook = $__require('npm:virtual-dom@2.1.1/vnode/is-vhook.js');
  module.exports = VirtualNode;
  var noProperties = {};
  var noChildren = [];
  function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName;
    this.properties = properties || noProperties;
    this.children = children || noChildren;
    this.key = key != null ? String(key) : undefined;
    this.namespace = (typeof namespace === "string") ? namespace : null;
    var count = (children && children.length) || 0;
    var descendants = 0;
    var hasWidgets = false;
    var hasThunks = false;
    var descendantHooks = false;
    var hooks;
    for (var propName in properties) {
      if (properties.hasOwnProperty(propName)) {
        var property = properties[propName];
        if (isVHook(property) && property.unhook) {
          if (!hooks) {
            hooks = {};
          }
          hooks[propName] = property;
        }
      }
    }
    for (var i = 0; i < count; i++) {
      var child = children[i];
      if (isVNode(child)) {
        descendants += child.count || 0;
        if (!hasWidgets && child.hasWidgets) {
          hasWidgets = true;
        }
        if (!hasThunks && child.hasThunks) {
          hasThunks = true;
        }
        if (!descendantHooks && (child.hooks || child.descendantHooks)) {
          descendantHooks = true;
        }
      } else if (!hasWidgets && isWidget(child)) {
        if (typeof child.destroy === "function") {
          hasWidgets = true;
        }
      } else if (!hasThunks && isThunk(child)) {
        hasThunks = true;
      }
    }
    this.count = count + descendants;
    this.hasWidgets = hasWidgets;
    this.hasThunks = hasThunks;
    this.hooks = hooks;
    this.descendantHooks = descendantHooks;
  }
  VirtualNode.prototype.version = version;
  VirtualNode.prototype.type = "VirtualNode";
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vnode/vtext.js", ["npm:virtual-dom@2.1.1/vnode/version.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var version = $__require('npm:virtual-dom@2.1.1/vnode/version.js');
  module.exports = VirtualText;
  function VirtualText(text) {
    this.text = String(text);
  }
  VirtualText.prototype.version = version;
  VirtualText.prototype.type = "VirtualText";
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vnode/is-vnode.js", ["npm:virtual-dom@2.1.1/vnode/version.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var version = $__require('npm:virtual-dom@2.1.1/vnode/version.js');
  module.exports = isVirtualNode;
  function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version;
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vnode/version.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = "2";
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vnode/is-vtext.js", ["npm:virtual-dom@2.1.1/vnode/version.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var version = $__require('npm:virtual-dom@2.1.1/vnode/version.js');
  module.exports = isVirtualText;
  function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version;
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vnode/is-widget.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = isWidget;
  function isWidget(w) {
    return w && w.type === "Widget";
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vnode/is-vhook.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = isHook;
  function isHook(hook) {
    return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/vnode/is-thunk.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = isThunk;
  function isThunk(t) {
    return t && t.type === "Thunk";
  }
  return module.exports;
});

System.registerDynamic("npm:browser-split@0.0.1/index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = (function split(undef) {
    var nativeSplit = String.prototype.split,
        compliantExecNpcg = /()??/.exec("")[1] === undef,
        self;
    self = function(str, separator, limit) {
      if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
        return nativeSplit.call(str, separator, limit);
      }
      var output = [],
          flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + (separator.sticky ? "y" : ""),
          lastLastIndex = 0,
          separator = new RegExp(separator.source, flags + "g"),
          separator2,
          match,
          lastIndex,
          lastLength;
      str += "";
      if (!compliantExecNpcg) {
        separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
      }
      limit = limit === undef ? -1 >>> 0 : limit >>> 0;
      while (match = separator.exec(str)) {
        lastIndex = match.index + match[0].length;
        if (lastIndex > lastLastIndex) {
          output.push(str.slice(lastLastIndex, match.index));
          if (!compliantExecNpcg && match.length > 1) {
            match[0].replace(separator2, function() {
              for (var i = 1; i < arguments.length - 2; i++) {
                if (arguments[i] === undef) {
                  match[i] = undef;
                }
              }
            });
          }
          if (match.length > 1 && match.index < str.length) {
            Array.prototype.push.apply(output, match.slice(1));
          }
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= limit) {
            break;
          }
        }
        if (separator.lastIndex === match.index) {
          separator.lastIndex++;
        }
      }
      if (lastLastIndex === str.length) {
        if (lastLength || !separator.test("")) {
          output.push("");
        }
      } else {
        output.push(str.slice(lastLastIndex));
      }
      return output.length > limit ? output.slice(0, limit) : output;
    };
    return self;
  })();
  return module.exports;
});

System.registerDynamic("npm:browser-split@0.0.1.js", ["npm:browser-split@0.0.1/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:browser-split@0.0.1/index.js');
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/virtual-hyperscript/parse-tag.js", ["npm:browser-split@0.0.1.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var split = $__require('npm:browser-split@0.0.1.js');
  var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
  var notClassId = /^\.|#/;
  module.exports = parseTag;
  function parseTag(tag, props) {
    if (!tag) {
      return 'DIV';
    }
    var noId = !(props.hasOwnProperty('id'));
    var tagParts = split(tag, classIdSplit);
    var tagName = null;
    if (notClassId.test(tagParts[1])) {
      tagName = 'DIV';
    }
    var classes,
        part,
        type,
        i;
    for (i = 0; i < tagParts.length; i++) {
      part = tagParts[i];
      if (!part) {
        continue;
      }
      type = part.charAt(0);
      if (!tagName) {
        tagName = part;
      } else if (type === '.') {
        classes = classes || [];
        classes.push(part.substring(1, part.length));
      } else if (type === '#' && noId) {
        props.id = part.substring(1, part.length);
      }
    }
    if (classes) {
      if (props.className) {
        classes.push(props.className);
      }
      props.className = classes.join(' ');
    }
    return props.namespace ? tagName : tagName.toUpperCase();
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/virtual-hyperscript/hooks/soft-set-hook.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = SoftSetHook;
  function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
      return new SoftSetHook(value);
    }
    this.value = value;
  }
  SoftSetHook.prototype.hook = function(node, propertyName) {
    if (node[propertyName] !== this.value) {
      node[propertyName] = this.value;
    }
  };
  return module.exports;
});

System.registerDynamic("npm:individual@3.0.0/index.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
  module.exports = Individual;
  function Individual(key, value) {
    if (key in root) {
      return root[key];
    }
    root[key] = value;
    return value;
  }
  return module.exports;
});

System.registerDynamic("npm:individual@3.0.0/one-version.js", ["npm:individual@3.0.0/index.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Individual = $__require('npm:individual@3.0.0/index.js');
  module.exports = OneVersion;
  function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';
    var versionValue = Individual(enforceKey, version);
    if (versionValue !== version) {
      throw new Error('Can only have one copy of ' + moduleName + '.\n' + 'You already have version ' + versionValue + ' installed.\n' + 'This means you cannot install version ' + version);
    }
    return Individual(key, defaultValue);
  }
  return module.exports;
});

System.registerDynamic("npm:ev-store@7.0.0/index.js", ["npm:individual@3.0.0/one-version.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var OneVersionConstraint = $__require('npm:individual@3.0.0/one-version.js');
  var MY_VERSION = '7';
  OneVersionConstraint('ev-store', MY_VERSION);
  var hashKey = '__EV_STORE_KEY@' + MY_VERSION;
  module.exports = EvStore;
  function EvStore(elem) {
    var hash = elem[hashKey];
    if (!hash) {
      hash = elem[hashKey] = {};
    }
    return hash;
  }
  return module.exports;
});

System.registerDynamic("npm:ev-store@7.0.0.js", ["npm:ev-store@7.0.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:ev-store@7.0.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/virtual-hyperscript/hooks/ev-hook.js", ["npm:ev-store@7.0.0.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var EvStore = $__require('npm:ev-store@7.0.0.js');
  module.exports = EvHook;
  function EvHook(value) {
    if (!(this instanceof EvHook)) {
      return new EvHook(value);
    }
    this.value = value;
  }
  EvHook.prototype.hook = function(node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);
    es[propName] = this.value;
  };
  EvHook.prototype.unhook = function(node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);
    es[propName] = undefined;
  };
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/virtual-hyperscript/index.js", ["npm:x-is-array@0.1.0.js", "npm:virtual-dom@2.1.1/vnode/vnode.js", "npm:virtual-dom@2.1.1/vnode/vtext.js", "npm:virtual-dom@2.1.1/vnode/is-vnode.js", "npm:virtual-dom@2.1.1/vnode/is-vtext.js", "npm:virtual-dom@2.1.1/vnode/is-widget.js", "npm:virtual-dom@2.1.1/vnode/is-vhook.js", "npm:virtual-dom@2.1.1/vnode/is-thunk.js", "npm:virtual-dom@2.1.1/virtual-hyperscript/parse-tag.js", "npm:virtual-dom@2.1.1/virtual-hyperscript/hooks/soft-set-hook.js", "npm:virtual-dom@2.1.1/virtual-hyperscript/hooks/ev-hook.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isArray = $__require('npm:x-is-array@0.1.0.js');
  var VNode = $__require('npm:virtual-dom@2.1.1/vnode/vnode.js');
  var VText = $__require('npm:virtual-dom@2.1.1/vnode/vtext.js');
  var isVNode = $__require('npm:virtual-dom@2.1.1/vnode/is-vnode.js');
  var isVText = $__require('npm:virtual-dom@2.1.1/vnode/is-vtext.js');
  var isWidget = $__require('npm:virtual-dom@2.1.1/vnode/is-widget.js');
  var isHook = $__require('npm:virtual-dom@2.1.1/vnode/is-vhook.js');
  var isVThunk = $__require('npm:virtual-dom@2.1.1/vnode/is-thunk.js');
  var parseTag = $__require('npm:virtual-dom@2.1.1/virtual-hyperscript/parse-tag.js');
  var softSetHook = $__require('npm:virtual-dom@2.1.1/virtual-hyperscript/hooks/soft-set-hook.js');
  var evHook = $__require('npm:virtual-dom@2.1.1/virtual-hyperscript/hooks/ev-hook.js');
  module.exports = h;
  function h(tagName, properties, children) {
    var childNodes = [];
    var tag,
        props,
        key,
        namespace;
    if (!children && isChildren(properties)) {
      children = properties;
      props = {};
    }
    props = props || properties || {};
    tag = parseTag(tagName, props);
    if (props.hasOwnProperty('key')) {
      key = props.key;
      props.key = undefined;
    }
    if (props.hasOwnProperty('namespace')) {
      namespace = props.namespace;
      props.namespace = undefined;
    }
    if (tag === 'INPUT' && !namespace && props.hasOwnProperty('value') && props.value !== undefined && !isHook(props.value)) {
      props.value = softSetHook(props.value);
    }
    transformProperties(props);
    if (children !== undefined && children !== null) {
      addChild(children, childNodes, tag, props);
    }
    return new VNode(tag, props, childNodes, key, namespace);
  }
  function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
      childNodes.push(new VText(c));
    } else if (typeof c === 'number') {
      childNodes.push(new VText(String(c)));
    } else if (isChild(c)) {
      childNodes.push(c);
    } else if (isArray(c)) {
      for (var i = 0; i < c.length; i++) {
        addChild(c[i], childNodes, tag, props);
      }
    } else if (c === null || c === undefined) {
      return;
    } else {
      throw UnexpectedVirtualElement({
        foreignObject: c,
        parentVnode: {
          tagName: tag,
          properties: props
        }
      });
    }
  }
  function transformProperties(props) {
    for (var propName in props) {
      if (props.hasOwnProperty(propName)) {
        var value = props[propName];
        if (isHook(value)) {
          continue;
        }
        if (propName.substr(0, 3) === 'ev-') {
          props[propName] = evHook(value);
        }
      }
    }
  }
  function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
  }
  function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
  }
  function UnexpectedVirtualElement(data) {
    var err = new Error();
    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' + 'Expected a VNode / Vthunk / VWidget / string but:\n' + 'got:\n' + errorString(data.foreignObject) + '.\n' + 'The parent vnode is:\n' + errorString(data.parentVnode);
    '\n' + 'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;
    return err;
  }
  function errorString(obj) {
    try {
      return JSON.stringify(obj, null, '    ');
    } catch (e) {
      return String(obj);
    }
  }
  return module.exports;
});

System.registerDynamic("npm:virtual-dom@2.1.1/virtual-hyperscript.js", ["npm:virtual-dom@2.1.1/virtual-hyperscript/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:virtual-dom@2.1.1/virtual-hyperscript/index.js');
  return module.exports;
});

System.registerDynamic("npm:observ@0.2.0/index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = Observable;
  function Observable(value) {
    var listeners = [];
    value = value === undefined ? null : value;
    observable.set = function(v) {
      value = v;
      listeners.forEach(function(f) {
        f(v);
      });
    };
    return observable;
    function observable(listener) {
      if (!listener) {
        return value;
      }
      listeners.push(listener);
      return function remove() {
        listeners.splice(listeners.indexOf(listener), 1);
      };
    }
  }
  return module.exports;
});

System.registerDynamic("npm:observ@0.2.0/computed.js", ["npm:observ@0.2.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable = $__require('npm:observ@0.2.0/index.js');
  module.exports = computed;
  function computed(observables, lambda) {
    var values = observables.map(function(o) {
      return o();
    });
    var result = Observable(lambda.apply(null, values));
    observables.forEach(function(o, index) {
      o(function(newValue) {
        values[index] = newValue;
        result.set(lambda.apply(null, values));
      });
    });
    return result;
  }
  return module.exports;
});

System.registerDynamic("npm:observ@0.2.0/watch.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = watch;
  function watch(observable, listener) {
    var remove = observable(listener);
    listener(observable());
    return remove;
  }
  return module.exports;
});

System.registerDynamic("npm:mercury@14.1.0/index.js", ["npm:geval@2.1.1/single.js", "npm:geval@2.1.1/multiple.js", "npm:xtend@4.0.1.js", "npm:main-loop@3.2.0.js", "npm:value-event@5.1.0/base-event.js", "npm:dom-delegator@13.1.0.js", "npm:value-event@5.1.0/event.js", "npm:value-event@5.1.0/value.js", "npm:value-event@5.1.0/submit.js", "npm:value-event@5.1.0/change.js", "npm:value-event@5.1.0/key.js", "npm:value-event@5.1.0/click.js", "npm:observ-array@3.2.1.js", "npm:observ-struct@5.0.1.js", "npm:observ-varhash@1.0.8.js", "npm:observ@0.2.0.js", "npm:virtual-dom@2.1.1/vtree/diff.js", "npm:virtual-dom@2.1.1/vdom/patch.js", "npm:vdom-thunk@3.0.0.js", "npm:virtual-dom@2.1.1/vdom/create-element.js", "npm:virtual-dom@2.1.1/virtual-hyperscript.js", "npm:observ@0.2.0/computed.js", "npm:observ@0.2.0/watch.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SingleEvent = $__require('npm:geval@2.1.1/single.js');
  var MultipleEvent = $__require('npm:geval@2.1.1/multiple.js');
  var extend = $__require('npm:xtend@4.0.1.js');
  var mercury = module.exports = {
    main: $__require('npm:main-loop@3.2.0.js'),
    app: app,
    BaseEvent: $__require('npm:value-event@5.1.0/base-event.js'),
    Delegator: $__require('npm:dom-delegator@13.1.0.js'),
    input: input,
    handles: channels,
    channels: channels,
    event: $__require('npm:value-event@5.1.0/event.js'),
    send: $__require('npm:value-event@5.1.0/event.js'),
    valueEvent: $__require('npm:value-event@5.1.0/value.js'),
    sendValue: $__require('npm:value-event@5.1.0/value.js'),
    submitEvent: $__require('npm:value-event@5.1.0/submit.js'),
    sendSubmit: $__require('npm:value-event@5.1.0/submit.js'),
    changeEvent: $__require('npm:value-event@5.1.0/change.js'),
    sendChange: $__require('npm:value-event@5.1.0/change.js'),
    keyEvent: $__require('npm:value-event@5.1.0/key.js'),
    sendKey: $__require('npm:value-event@5.1.0/key.js'),
    clickEvent: $__require('npm:value-event@5.1.0/click.js'),
    sendClick: $__require('npm:value-event@5.1.0/click.js'),
    array: $__require('npm:observ-array@3.2.1.js'),
    struct: $__require('npm:observ-struct@5.0.1.js'),
    hash: $__require('npm:observ-struct@5.0.1.js'),
    varhash: $__require('npm:observ-varhash@1.0.8.js'),
    value: $__require('npm:observ@0.2.0.js'),
    state: state,
    diff: $__require('npm:virtual-dom@2.1.1/vtree/diff.js'),
    patch: $__require('npm:virtual-dom@2.1.1/vdom/patch.js'),
    partial: $__require('npm:vdom-thunk@3.0.0.js'),
    create: $__require('npm:virtual-dom@2.1.1/vdom/create-element.js'),
    h: $__require('npm:virtual-dom@2.1.1/virtual-hyperscript.js'),
    computed: $__require('npm:observ@0.2.0/computed.js'),
    watch: $__require('npm:observ@0.2.0/watch.js')
  };
  function input(names) {
    if (!names) {
      return SingleEvent();
    }
    return MultipleEvent(names);
  }
  function state(obj) {
    var copy = extend(obj);
    var $channels = copy.channels;
    var $handles = copy.handles;
    if ($channels) {
      copy.channels = mercury.value(null);
    } else if ($handles) {
      copy.handles = mercury.value(null);
    }
    var observ = mercury.struct(copy);
    if ($channels) {
      observ.channels.set(mercury.channels($channels, observ));
    } else if ($handles) {
      observ.handles.set(mercury.channels($handles, observ));
    }
    return observ;
  }
  function channels(funcs, context) {
    return Object.keys(funcs).reduce(createHandle, {});
    function createHandle(acc, name) {
      var handle = mercury.Delegator.allocateHandle(funcs[name].bind(null, context));
      acc[name] = handle;
      return acc;
    }
  }
  function app(elem, observ, render, opts) {
    if (!elem) {
      throw new Error('Element does not exist. ' + 'Mercury cannot be initialized.');
    }
    mercury.Delegator(opts);
    var loop = mercury.main(observ(), render, extend({
      diff: mercury.diff,
      create: mercury.create,
      patch: mercury.patch
    }, opts));
    elem.appendChild(loop.target);
    return observ(loop.update);
  }
  return module.exports;
});

System.registerDynamic("npm:mercury@14.1.0.js", ["npm:mercury@14.1.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:mercury@14.1.0/index.js');
  return module.exports;
});

//# sourceMappingURL=mercury.js.map