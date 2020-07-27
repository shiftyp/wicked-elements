'use strict';
const asCustomElement = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('as-custom-element'));
const utils = (m => m.__esModule ? /* istanbul ignore next */ m.default : /* istanbul ignore next */ m)(require('@webreflection/elements-utils'));

const {create, keys} = Object;

const config = [];
const query = [];
const defined = {};
const lazy = new Set;
const wicked = new WeakMap;

const {
  get, upgrade, whenDefined,
  $: setupList
} = utils(query, config, defined, function (selector, i) {
  const {querySelectorAll} = this;
  if (querySelectorAll) {
    if ((
      this.matches ||
      this.webkitMatchesSelector ||
      this.msMatchesSelector
    ).call(this, selector)) {
      const {m, l, o} = config[i];
      if (!m.has(this))
        init(this, m, l, o);
    }
    setupList(querySelectorAll.call(this, query));
  }
});

const delegate = method => function () {
  method.apply(wicked.get(this), arguments);
};

const init = (value, wm, listeners, definition) => {
  const handler = create(definition, {
    element: {enumerable: true, value}
  });
  for (let i = 0, {length} = listeners; i < length; i++)
    value.addEventListener(listeners[i].t, handler, listeners[i].o);
  if (handler.init)
    handler.init();
  wicked.set(value, handler);
  wm.set(asCustomElement(value, definition), 0);
};

const define = (selector, definition) => {
  if (get(selector))
    throw new Error('duplicated: ' + selector);
  const listeners = [];
  const retype = create(null);
  for (let k = keys(definition), i = 0, {length} = k; i < length; i++) {
    const key = k[i];
    if (/^(?:connected|disconnected|attributeChanged)$/.test(key))
      definition[key + 'Callback'] = delegate(definition[key]);
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
  query.push(selector);
  config.push({m: new WeakMap, l: listeners, o: definition});
  setupList(document.querySelectorAll(selector));
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
