self.wickedElements = (function (exports) {
  'use strict';

  var asCustomElement = (function (root, upgrade) {
    var wm = new WeakMap();
    var ao = new WeakMap();
    var filter = [].filter;

    var attributeChanged = function attributeChanged(records, mo) {
      for (var i = 0, length = records.length; i < length; i++) {
        var _records$i = records[i],
            target = _records$i.target,
            attributeName = _records$i.attributeName,
            oldValue = _records$i.oldValue;
        var newValue = target.getAttribute(attributeName);
        ao.get(mo).call(target, attributeName, oldValue, newValue);
      }
    };

    var elements = function elements(target) {
      return 'querySelectorAll' in target;
    };

    var mainLoop = function mainLoop(records) {
      for (var i = 0, length = records.length; i < length; i++) {
        var _records$i2 = records[i],
            addedNodes = _records$i2.addedNodes,
            removedNodes = _records$i2.removedNodes;
        parse(filter.call(addedNodes, elements), 'c', new Set());
        parse(filter.call(removedNodes, elements), 'd', new Set());
      }
    };

    var parse = function parse(nodes, key, parsed) {
      for (var i = 0, length = nodes.length; i < length; i++) {
        var target = nodes[i];

        if (!parsed.has(target)) {
          parsed.add(target);
          if (wm.has(target)) wm.get(target)[key].forEach(call, target);else if (key === 'c') upgrade(target);
          parse(target.querySelectorAll('*'), key, parsed);
        }
      }
    };

    var set = function set(target) {
      var sets = {
        c: new Set(),
        d: new Set()
      };
      wm.set(target, sets);
      return sets;
    };

    var sdo = new MutationObserver(mainLoop);
    sdo.observe(root, {
      childList: true,
      subtree: true
    });
    return function (target, _ref) {
      var connectedCallback = _ref.connectedCallback,
          disconnectedCallback = _ref.disconnectedCallback,
          observedAttributes = _ref.observedAttributes,
          attributeChangedCallback = _ref.attributeChangedCallback;
      mainLoop(sdo.takeRecords());

      var _ref2 = wm.get(target) || set(target),
          c = _ref2.c,
          d = _ref2.d;

      if (observedAttributes) {
        var mo = new MutationObserver(attributeChanged);
        mo.observe(target, {
          attributes: true,
          attributeOldValue: true,
          attributeFilter: observedAttributes.map(function (attributeName) {
            if (target.hasAttribute(attributeName)) attributeChangedCallback.call(target, attributeName, null, target.getAttribute(attributeName));
            return attributeName;
          })
        });
        ao.set(mo, attributeChangedCallback);
      }

      if (disconnectedCallback) d.add(disconnectedCallback);

      if (connectedCallback) {
        c.add(connectedCallback);
        if (!(target.ownerDocument.compareDocumentPosition(target) & target.DOCUMENT_POSITION_DISCONNECTED)) connectedCallback.call(target);
      }

      return target;
    };
  });

  function call(back) {
    back.call(this);
  }

  var Lie = typeof Promise === 'function' ? Promise : function (fn) {
    var queue = [],
        resolved = 0;
    fn(function () {
      resolved = 1;
      queue.splice(0).forEach(then);
    });
    return {
      then: then
    };

    function then(fn) {
      return resolved ? setTimeout(fn) : queue.push(fn), this;
    }
  };
  var utils = (function (root, query, config, defined, setup) {
    // exports
    var get = function get(selector) {
      var i = query.indexOf(selector);
      return i < 0 ? void 0 : config[i].o;
    };

    var upgrade = function upgrade(node) {
      upgradeNode(node, new Set());
    };

    var whenDefined = function whenDefined(selector) {
      if (!(selector in defined)) {
        var _,
            $ = new Lie(function ($) {
          _ = $;
        });

        defined[selector] = {
          _: _,
          $: $
        };
      }

      return defined[selector].$;
    }; // util


    var setupList = function setupList(nodes, parsed) {
      for (var i = 0, length = nodes.length; i < length; i++) {
        if (!parsed.has(nodes[i])) {
          parsed.add(nodes[i]);
          upgradeNode(nodes[i], parsed);
        }
      }
    };

    var upgradeAll = function upgradeAll(node, parsed) {
      if (query.length) setupList(node.querySelectorAll(query), parsed);
    };

    var upgradeNode = function upgradeNode(node, parsed) {
      for (var i = 0, length = query.length; i < length; i++) {
        if ((node.matches || node.webkitMatchesSelector || node.msMatchesSelector).call(node, query[i])) setup(node, config[i]);
      }

      if (parsed) upgradeAll(node, parsed);
    };

    return {
      get: get,
      upgrade: upgrade,
      whenDefined: whenDefined,
      $: setupList,
      _: asCustomElement(root, upgradeNode)
    };
  });

  var create = Object.create,
      keys = Object.keys;
  var config = [];
  var query = [];
  var defined = {};
  var lazy = new Set();
  var wicked = new WeakMap();
  var callbacks = new WeakMap();

  var _utils = utils(document, query, config, defined, function (value, _ref) {
    var m = _ref.m,
        l = _ref.l,
        o = _ref.o;

    if (!m.has(value)) {
      var handler = create(o, {
        element: {
          enumerable: true,
          value: value
        }
      });
      m.set(value, 0);
      if (!wicked.has(value)) wicked.set(value, []);
      wicked.get(value).push(handler);
      handleEvents(value, 'add', l, handler);
      if (handler.init) handler.init();
      asCustomElement$1(value, o);
    }
  }),
      get = _utils.get,
      upgrade = _utils.upgrade,
      whenDefined = _utils.whenDefined,
      setupList = _utils.$,
      asCustomElement$1 = _utils._;

  var delegate = function delegate(key, method, notAC) {
    return function (name) {
      for (var h = wicked.get(this), i = 0, length = h.length; i < length; i++) {
        if (method === h[i][key] && (notAC || -1 < (h[i].observedAttributes || []).indexOf(name))) method.apply(h[i], arguments);
      }
    };
  };

  var handleEvents = function handleEvents(e, p, l, h) {
    for (var m = p + 'EventListener', i = 0, length = l.length; i < length; i++) {
      e[m](l[i].t, h, l[i].o);
    }
  };

  var define = function define(selector, definition) {
    if (get(selector)) throw new Error('duplicated: ' + selector);
    var listeners = [];
    var retype = create(null);

    for (var k = keys(definition), i = 0, length = k.length; i < length; i++) {
      var key = k[i];

      if (/^(?:connected|disconnected|attributeChanged)$/.test(key)) {
        if (!callbacks.has(definition[key])) callbacks.set(definition[key], delegate(key, definition[key], key[0] !== 'a'));
        definition[key + 'Callback'] = callbacks.get(definition[key]);
      } else if (/^on/.test(key) && !/Options$/.test(key)) {
        var options = definition[key + 'Options'] || false;
        var lower = key.toLowerCase();
        var type = lower.slice(2);
        listeners.push({
          t: type,
          o: options
        });
        retype[type] = key;

        if (lower !== key) {
          type = key.slice(2, 3).toLowerCase() + key.slice(3);
          retype[type] = key;
          listeners.push({
            t: type,
            o: options
          });
        }
      }
    }

    if (listeners.length) {
      definition.handleEvent = function (event) {
        this[retype[event.type]](event);
      };
    }

    definition.release = function () {
      var handlers = wicked.get(this.element);
      var i = handlers.indexOf(this);

      if (-1 < i) {
        handleEvents(this.element, 'remove', listeners, handlers[i]);
        handlers.splice(i, 1);
      }
    };

    query.push(selector);
    config.push({
      m: new WeakMap(),
      l: listeners,
      o: definition
    });
    setupList(document.querySelectorAll(selector), new Set());
    whenDefined(selector);
    if (!lazy.has(selector)) defined[selector]._();
  };
  var defineAsync = function defineAsync(selector, callback, _) {
    lazy.add(selector);
    define(selector, {
      init: function init() {
        if (lazy.has(selector)) {
          lazy["delete"](selector);
          callback().then(function (_ref2) {
            var definition = _ref2["default"];
            var i = query.indexOf(selector);
            query.splice(i, 1);
            config.splice(i, 1);

            (_ || define)(selector, definition);
          });
        }
      }
    });
  };

  exports.define = define;
  exports.defineAsync = defineAsync;
  exports.get = get;
  exports.upgrade = upgrade;
  exports.whenDefined = whenDefined;

  return exports;

}({}));
