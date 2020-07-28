self.wickedElements=function(e){"use strict";const t=new Set,n=new MutationObserver(e=>{t.forEach(o,e)});function o(e){e(this,n)}n.observe(document,{subtree:!0,childList:!0}),t.observer=n;const r=new WeakMap,{observer:l}=t,s=e=>{for(let t=0,{length:n}=e;t<n;t++){const{target:n,attributeName:o,oldValue:l}=e[t],s=n.getAttribute(o);r.get(n).a[o].forEach(e=>{e.call(n,o,l,s)})}},c=(e,t,n)=>{for(let o=0,{length:l}=e;o<l;o++){const l=e[o];n?"querySelectorAll"in l&&(r.has(l)&&r.get(l)[t].forEach(u,l),c(l.querySelectorAll("*"),t,!n)):r.has(l)&&r.get(l)[t].forEach(u,l)}},a=e=>{for(let t=0,{length:n}=e;t<n;t++){const{addedNodes:n,removedNodes:o}=e[t];c(n,"c",!0),s(i.takeRecords()),c(o,"d",!0)}},i=new MutationObserver(s);t.add(a);var d=(e,{connectedCallback:t,disconnectedCallback:n,observedAttributes:o,attributeChangedCallback:s})=>{a(l.takeRecords());const{a:c,c:d,d:u}=r.get(e)||(e=>{const t={a:{},c:new Set,d:new Set};return r.set(e,t),t})(e);return o&&(i.observe(e,{attributes:!0,attributeOldValue:!0,attributeFilter:o}),o.forEach(t=>{(c[t]||(c[t]=new Set)).add(s),e.hasAttribute(t)&&s.call(e,t,null,e.getAttribute(t))})),n&&u.add(n),t&&(d.add(t),e.ownerDocument.compareDocumentPosition(e)&e.DOCUMENT_POSITION_DISCONNECTED||t.call(e)),e};function u(e){e.call(this)}const h="function"==typeof Promise?Promise:function(e){let t=[],n=0;return e(()=>{n=1,t.splice(0).forEach(o)}),{then:o};function o(e){return n?setTimeout(e):t.push(e),this}};const{create:f,keys:b}=Object,g=[],p=[],w={},m=new Set,v=new WeakMap,{get:S,upgrade:E,whenDefined:k,$:O}=((e,n,o,r)=>{const l=(e,t)=>{for(let n=0,{length:o}=e;n<o;n++)t&&!("querySelectorAll"in e[n])||s(e[n],t)},s=(t,n)=>{for(let o=0,{length:l}=e;o<l;o++)r(t,o,n)};return t.add(e=>{for(let t=0,{length:n}=e;t<n;t++)l(e[t].addedNodes,!0)}),{get:t=>{const o=e.indexOf(t);return o<0?void 0:n[o].o},upgrade:e=>{s(e,!0)},whenDefined:e=>{if(!(e in o)){let t,n=new h(e=>{t=e});o[e]={_:t,$:n}}return o[e].$},$:l}})(p,g,w,(function(e,t,n){if(n){if((e.matches||e.webkitMatchesSelector||e.msMatchesSelector).call(e,p[t])){const{m:n,l:o,o:r}=g[t];n.has(e)||y(e,n,o,r)}O(e.querySelectorAll(p),!n)}else{const{m:n,l:o,o:r}=g[t];n.has(e)||y(e,n,o,r)}})),C=e=>function(){e.apply(v.get(this),arguments)},y=(e,t,n,o)=>{const r=f(o,{element:{enumerable:!0,value:e}});t.set(e,0),v.set(e,r);for(let t=0,{length:o}=n;t<o;t++)e.addEventListener(n[t].t,r,n[t].o);r.init&&r.init(),d(e,o)},A=(e,t)=>{if(S(e))throw new Error("duplicated: "+e);const n=[],o=f(null);for(let e=b(t),r=0,{length:l}=e;r<l;r++){const l=e[r];if(/^(?:connected|disconnected|attributeChanged)$/.test(l))t[l+"Callback"]=C(t[l]);else if(/^on/.test(l)&&!/Options$/.test(l)){const e=t[l+"Options"]||!1,r=l.toLowerCase();let s=r.slice(2);n.push({t:s,o:e}),o[s]=l,r!==l&&(s=l.slice(2,3).toLowerCase()+l.slice(3),o[s]=l,n.push({t:s,o:e}))}}n.length&&(t.handleEvent=function(e){this[o[e.type]](e)}),p.push(e),g.push({m:new WeakMap,l:n,o:t}),O(document.querySelectorAll(e),!0),k(e),m.has(e)||w[e]._()};return e.define=A,e.defineAsync=(e,t,n)=>{m.add(e),A(e,{init(){m.has(e)&&(m.delete(e),t().then(({default:t})=>{const o=p.indexOf(e);p.splice(o,1),g.splice(o,1),(n||A)(e,t)}))}})},e.get=S,e.upgrade=E,e.whenDefined=k,e}({});
