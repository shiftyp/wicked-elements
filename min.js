self.wickedElements=function(e){"use strict";var t=new Set,n=new MutationObserver((function(e){t.forEach(r,e)}));function r(e){e(this,n)}n.observe(document,{subtree:!0,childList:!0}),t.observer=n;var a=new WeakMap,o=t.observer,i=function(e){for(var t=function(t,n){var r=e[t],o=r.target,i=r.attributeName,c=r.oldValue,u=o.getAttribute(i);a.get(o).a[i].forEach((function(e){e.call(o,i,c,u)}))},n=0,r=e.length;n<r;n++)t(n)},c=function e(t,n,r){for(var o=0,i=t.length;o<i;o++){var c=t[o];r?"querySelectorAll"in c&&(a.has(c)&&a.get(c)[n].forEach(f,c),e(c.querySelectorAll("*"),n,!r)):a.has(c)&&a.get(c)[n].forEach(f,c)}},u=function(e){for(var t=0,n=e.length;t<n;t++){var r=e[t],a=r.addedNodes,o=r.removedNodes;c(a,"c",!0),i(l.takeRecords()),c(o,"d",!0)}},l=new MutationObserver(i);t.add(u);var s=function(e,t){var n=t.connectedCallback,r=t.disconnectedCallback,i=t.observedAttributes,c=t.attributeChangedCallback;u(o.takeRecords());var s=a.get(e)||function(e){var t={a:{},c:new Set,d:new Set};return a.set(e,t),t}(e),f=s.a,d=s.c,h=s.d;return i&&(l.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:i}),i.forEach((function(t){(f[t]||(f[t]=new Set)).add(c),e.hasAttribute(t)&&c.call(e,t,null,e.getAttribute(t))}))),r&&h.add(r),n&&(d.add(n),e.ownerDocument.compareDocumentPosition(e)&e.DOCUMENT_POSITION_DISCONNECTED||n.call(e)),e};function f(e){e.call(this)}var d="function"==typeof Promise?Promise:function(e){var t=[],n=0;return e((function(){n=1,t.splice(0).forEach(r)})),{then:r};function r(e){return n?setTimeout(e):t.push(e),this}},h=Object.create,v=Object.keys,b=[],g=[],p={},w=new Set,m=new WeakMap,S=function(e,n,r,a){var o=function(e,t){for(var n=0,r=e.length;n<r;n++)t&&!("querySelectorAll"in e[n])||i(e[n],t)},i=function(t,n){for(var r=0,o=e.length;r<o;r++)a(t,r,n)};return t.add((function(e){for(var t=0,n=e.length;t<n;t++)o(e[t].addedNodes,!0)})),{get:function(t){var r=e.indexOf(t);return r<0?void 0:n[r].o},upgrade:function(e){i(e,!0)},whenDefined:function(e){if(!(e in r)){var t,n=new d((function(e){t=e}));r[e]={_:t,$:n}}return r[e].$},$:o}}(g,b,p,(function(e,t,n){if(n){if((e.matches||e.webkitMatchesSelector||e.msMatchesSelector).call(e,g[t])){var r=b[t],a=r.m,o=r.l,i=r.o;a.has(e)||A(e,a,o,i)}C(e.querySelectorAll(g),!n)}else{var c=b[t],u=c.m,l=c.l,s=c.o;u.has(e)||A(e,u,l,s)}})),E=S.get,O=S.upgrade,k=S.whenDefined,C=S.$,y=function(e){return function(){e.apply(m.get(this),arguments)}},A=function(e,t,n,r){var a=h(r,{element:{enumerable:!0,value:e}});t.set(e,0),m.set(e,a);for(var o=0,i=n.length;o<i;o++)e.addEventListener(n[o].t,a,n[o].o);a.init&&a.init(),s(e,r)},D=function(e,t){if(E(e))throw new Error("duplicated: "+e);for(var n=[],r=h(null),a=v(t),o=0,i=a.length;o<i;o++){var c=a[o];if(/^(?:connected|disconnected|attributeChanged)$/.test(c))t[c+"Callback"]=y(t[c]);else if(/^on/.test(c)&&!/Options$/.test(c)){var u=t[c+"Options"]||!1,l=c.toLowerCase(),s=l.slice(2);n.push({t:s,o:u}),r[s]=c,l!==c&&(s=c.slice(2,3).toLowerCase()+c.slice(3),r[s]=c,n.push({t:s,o:u}))}}n.length&&(t.handleEvent=function(e){this[r[e.type]](e)}),g.push(e),b.push({m:new WeakMap,l:n,o:t}),C(document.querySelectorAll(e),!0),k(e),w.has(e)||p[e]._()};return e.define=D,e.defineAsync=function(e,t,n){w.add(e),D(e,{init:function(){w.has(e)&&(w.delete(e),t().then((function(t){var r=t.default,a=g.indexOf(e);g.splice(a,1),b.splice(a,1),(n||D)(e,r)})))}})},e.get=E,e.upgrade=O,e.whenDefined=k,e}({});