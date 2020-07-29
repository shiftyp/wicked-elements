'use strict';
const utils = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@webreflection/elements-utils'));

const {create, keys} = Object;

const config = [];
const query = [];
const defined = {};
const lazy = new Set;
const wicked = new WeakMap;
const callbacks = new WeakMap;

const {
  get, upgrade, whenDefined,
  $: setupList, _: asCustomElement
} = utils(
  document, query, config, defined,
  (value, {m, l, o}) => {
    if (!m.has(value)) {
      const handler = create(o, {
        element: {enumerable: true, value}
      });
      m.set(value, 0);
      if (!wicked.has(value))
        wicked.set(value, []);
      wicked.get(value).push(handler);
      handleEvents(value, 'add', l, handler);
      if (handler.init)
        handler.init();
      asCustomElement(value, o);
    }
  }
);

const delegate = (key, method, notAC) => function (name) {
  for (let h = wicked.get(this), i = 0, {length} = h; i < length; i++) {
    if (
      method === h[i][key] && (
        notAC || -1 < (h[i].observedAttributes || []).indexOf(name)
      )
    )
      method.apply(h[i], arguments);
  }
};

const handleEvents = (e, p, l, h) => {
  for (let m = p + 'EventListener', i = 0, {length} = l; i < length; i++)
    e[m](l[i].t, h, l[i].o);
};

const define = (selector, definition) => {
  if (get(selector))
    throw new Error('duplicated: ' + selector);
  const listeners = [];
  const retype = create(null);
  for (let k = keys(definition), i = 0, {length} = k; i < length; i++) {
    const key = k[i];
    if (/^(?:connected|disconnected|attributeChanged)$/.test(key)) {
      if (!callbacks.has(definition[key]))
        callbacks.set(definition[key], delegate(
          key, definition[key], key[0] !== 'a'
        ));
      definition[key + 'Callback'] = callbacks.get(definition[key]);
    }
    else if (/^on/.test(key) && !/Options$/.test(key)) {
      const options = definition[key + 'Options'] || false;
      const lower = key.toLowerCase();
      let type = lower.slice(2);
      listeners.push({t: type, o: options});
      retype[type] = key;
      if (lower !== key) {
        type = key.slice(2, 3).toLowerCase() + key.slice(3);
        retype[type] = key;
        listeners.push({t: type, o: options});
      }
    }
  }
  if (listeners.length) {
    definition.handleEvent = function (event) {
      this[retype[event.type]](event);
    };
  }
  definition.release = function () {
    const handlers = wicked.get(this.element);
    const i = handlers.indexOf(this);
    if (-1 < i) {
      handleEvents(this.element, 'remove', listeners, handlers[i]);
      handlers.splice(i, 1);
    }
  };
  query.push(selector);
  config.push({m: new WeakMap, l: listeners, o: definition});
  setupList(document.querySelectorAll(selector), new Set);
  whenDefined(selector);
  if (!lazy.has(selector))
    defined[selector]._();
};
exports.define = define;

const defineAsync = (selector, callback, _) => {
  lazy.add(selector);
  define(selector, {
    init() {
      if (lazy.has(selector)) {
        lazy.delete(selector);
        callback().then(({default: definition}) => {
          const i = query.indexOf(selector);
          query.splice(i, 1);
          config.splice(i, 1);
          (_ || define)(selector, definition);
        });
      }
    }
  });
};
exports.defineAsync = defineAsync;

exports.get = get;
exports.upgrade = upgrade;
exports.whenDefined = whenDefined;
