import{n as e,s as t,S as n,i as r,c as s,g as o,a,t as c,b as l,e as i,d as u,f as p,h as f,j as h,k as d,l as m,m as g,o as $,p as v,q as y,r as b,u as S,v as w,w as E,x as R,y as x,z as _,A as P,B as C,C as L,D as q,E as U,F as A}from"./index.a5445a6a.js";const j=[];function N(n,r=e){let s;const o=[];function a(e){if(t(n,e)&&(n=e,s)){const e=!j.length;for(let e=0;e<o.length;e+=1){const t=o[e];t[1](),j.push(t,n)}if(e){for(let e=0;e<j.length;e+=2)j[e][0](j[e+1]);j.length=0}}}return{set:a,update:function(e){a(e(n))},subscribe:function(t,c=e){const l=[t,c];return o.push(l),1===o.length&&(s=r(a)||e),t(n),()=>{const e=o.indexOf(l);-1!==e&&o.splice(e,1),0===o.length&&(s(),s=null)}}}}const O={},k=()=>({});function D(e){let t;const n=e[1].default,r=s(n,e,e[0],null);return{c(){r&&r.c()},l(e){r&&r.l(e)},m(e,n){r&&r.m(e,n),t=!0},p(e,[t]){r&&r.p&&1&t&&r.p(o(n,e,e[0],null),a(n,e[0],t,null))},i(e){t||(c(r,e),t=!0)},o(e){l(r,e),t=!1},d(e){r&&r.d(e)}}}function I(e,t,n){let{$$slots:r={},$$scope:s}=t;return e.$set=e=>{"$$scope"in e&&n(0,s=e.$$scope)},[s,r]}class B extends n{constructor(e){super(),r(this,e,I,D,t,{})}}function J(e){let t,n,r=e[1].stack+"";return{c(){t=i("pre"),n=u(r)},l(e){t=p(e,"PRE",{});var s=f(t);n=h(s,r),s.forEach(d)},m(e,r){m(e,t,r),g(t,n)},p(e,t){2&t&&r!==(r=e[1].stack+"")&&$(n,r)},d(e){e&&d(t)}}}function H(t){let n,r,s,o,a,c,l,E,R,x=t[1].message+"";document.title=n=t[0];let _=t[2]&&t[1].stack&&J(t);return{c(){r=v(),s=i("h1"),o=u(t[0]),a=v(),c=i("p"),l=u(x),E=v(),_&&_.c(),R=y(),this.h()},l(e){b('[data-svelte="svelte-1o9r2ue"]',document.head).forEach(d),r=S(e),s=p(e,"H1",{class:!0});var n=f(s);o=h(n,t[0]),n.forEach(d),a=S(e),c=p(e,"P",{class:!0});var i=f(c);l=h(i,x),i.forEach(d),E=S(e),_&&_.l(e),R=y(),this.h()},h(){w(s,"class","svelte-8od9u6"),w(c,"class","svelte-8od9u6")},m(e,t){m(e,r,t),m(e,s,t),g(s,o),m(e,a,t),m(e,c,t),g(c,l),m(e,E,t),_&&_.m(e,t),m(e,R,t)},p(e,[t]){1&t&&n!==(n=e[0])&&(document.title=n),1&t&&$(o,e[0]),2&t&&x!==(x=e[1].message+"")&&$(l,x),e[2]&&e[1].stack?_?_.p(e,t):(_=J(e),_.c(),_.m(R.parentNode,R)):_&&(_.d(1),_=null)},i:e,o:e,d(e){e&&d(r),e&&d(s),e&&d(a),e&&d(c),e&&d(E),_&&_.d(e),e&&d(R)}}}function K(e,t,n){let{status:r}=t,{error:s}=t;return e.$set=e=>{"status"in e&&n(0,r=e.status),"error"in e&&n(1,s=e.error)},[r,s,!1]}class T extends n{constructor(e){super(),r(this,e,K,H,t,{status:0,error:1})}}function V(e){let t,n;const r=[e[4].props];var s=e[4].component;function o(e){let t={};for(let e=0;e<r.length;e+=1)t=E(t,r[e]);return{props:t}}if(s)var a=new s(o());return{c(){a&&R(a.$$.fragment),t=y()},l(e){a&&x(a.$$.fragment,e),t=y()},m(e,r){a&&_(a,e,r),m(e,t,r),n=!0},p(e,n){const i=16&n?P(r,[C(e[4].props)]):{};if(s!==(s=e[4].component)){if(a){U();const e=a;l(e.$$.fragment,1,0,()=>{L(e,1)}),A()}s?(a=new s(o()),R(a.$$.fragment),c(a.$$.fragment,1),_(a,t.parentNode,t)):a=null}else s&&a.$set(i)},i(e){n||(a&&c(a.$$.fragment,e),n=!0)},o(e){a&&l(a.$$.fragment,e),n=!1},d(e){e&&d(t),a&&L(a,e)}}}function z(e){let t;const n=new T({props:{error:e[0],status:e[1]}});return{c(){R(n.$$.fragment)},l(e){x(n.$$.fragment,e)},m(e,r){_(n,e,r),t=!0},p(e,t){const r={};1&t&&(r.error=e[0]),2&t&&(r.status=e[1]),n.$set(r)},i(e){t||(c(n.$$.fragment,e),t=!0)},o(e){l(n.$$.fragment,e),t=!1},d(e){L(n,e)}}}function F(e){let t,n,r,s;const o=[z,V],a=[];function i(e,t){return e[0]?0:1}return t=i(e),n=a[t]=o[t](e),{c(){n.c(),r=y()},l(e){n.l(e),r=y()},m(e,n){a[t].m(e,n),m(e,r,n),s=!0},p(e,s){let u=t;t=i(e),t===u?a[t].p(e,s):(U(),l(a[u],1,1,()=>{a[u]=null}),A(),n=a[t],n||(n=a[t]=o[t](e),n.c()),c(n,1),n.m(r.parentNode,r))},i(e){s||(c(n),s=!0)},o(e){l(n),s=!1},d(e){a[t].d(e),e&&d(r)}}}function G(e){let t;const n=[{segment:e[2][0]},e[3].props];let r={$$slots:{default:[F]},$$scope:{ctx:e}};for(let e=0;e<n.length;e+=1)r=E(r,n[e]);const s=new B({props:r});return{c(){R(s.$$.fragment)},l(e){x(s.$$.fragment,e)},m(e,n){_(s,e,n),t=!0},p(e,[t]){const r=12&t?P(n,[4&t&&{segment:e[2][0]},8&t&&C(e[3].props)]):{};83&t&&(r.$$scope={dirty:t,ctx:e}),s.$set(r)},i(e){t||(c(s.$$.fragment,e),t=!0)},o(e){l(s.$$.fragment,e),t=!1},d(e){L(s,e)}}}function W(e,t,n){let{stores:r}=t,{error:s}=t,{status:o}=t,{segments:a}=t,{level0:c}=t,{level1:l=null}=t;return q(O,r),e.$set=e=>{"stores"in e&&n(5,r=e.stores),"error"in e&&n(0,s=e.error),"status"in e&&n(1,o=e.status),"segments"in e&&n(2,a=e.segments),"level0"in e&&n(3,c=e.level0),"level1"in e&&n(4,l=e.level1)},[s,o,a,c,l,r]}class X extends n{constructor(e){super(),r(this,e,W,G,t,{stores:5,error:0,status:1,segments:2,level0:3,level1:4})}}const Y=[],M=[{js:()=>import("./index.d556c3d4.js"),css:["index.d556c3d4.css"]},{js:()=>import("./[video].cf16a7f1.js"),css:["[video].cf16a7f1.css"]}],Q=(Z=decodeURIComponent,[{pattern:/^\/$/,parts:[{i:0}]},{pattern:/^\/videos\/([^\/]+?)\/?$/,parts:[null,{i:1,params:e=>({video:Z(e[1])})}]}]);var Z;const ee="undefined"!=typeof __SAPPER__&&__SAPPER__;let te,ne,re,se=!1,oe=[],ae="{}";const ce={page:N({}),preloading:N(null),session:N(ee&&ee.session)};let le,ie;ce.session.subscribe(async e=>{if(le=e,!se)return;ie=!0;const t=$e(new URL(location.href)),n=ne={},{redirect:r,props:s,branch:o}=await Se(t);n===ne&&await be(r,o,s,t.page)});let ue,pe=null;let fe,he=1;const de="undefined"!=typeof history?history:{pushState:(e,t,n)=>{},replaceState:(e,t,n)=>{},scrollRestoration:""},me={};function ge(e){const t=Object.create(null);return e.length>0&&e.slice(1).split("&").forEach(e=>{let[,n,r=""]=/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(e.replace(/\+/g," ")));"string"==typeof t[n]&&(t[n]=[t[n]]),"object"==typeof t[n]?t[n].push(r):t[n]=r}),t}function $e(e){if(e.origin!==location.origin)return null;if(!e.pathname.startsWith(ee.baseUrl))return null;let t=e.pathname.slice(ee.baseUrl.length);if(""===t&&(t="/"),!Y.some(e=>e.test(t)))for(let n=0;n<Q.length;n+=1){const r=Q[n],s=r.pattern.exec(t);if(s){const n=ge(e.search),o=r.parts[r.parts.length-1],a=o.params?o.params(s):{},c={host:location.host,path:t,query:n,params:a};return{href:e.href,route:r,match:s,page:c}}}}function ve(){return{x:pageXOffset,y:pageYOffset}}async function ye(e,t,n,r){if(t)fe=t;else{const e=ve();me[fe]=e,t=fe=++he,me[fe]=n?e:{x:0,y:0}}fe=t,te&&ce.preloading.set(!0);const s=pe&&pe.href===e.href?pe.promise:Se(e);pe=null;const o=ne={},{redirect:a,props:c,branch:l}=await s;if(o===ne&&(await be(a,l,c,e.page),document.activeElement&&document.activeElement.blur(),!n)){let e=me[t];if(r){const t=document.getElementById(r.slice(1));t&&(e={x:0,y:t.getBoundingClientRect().top})}me[fe]=e,e&&scrollTo(e.x,e.y)}}async function be(e,t,n,r){if(e)return function(e,t={replaceState:!1}){const n=$e(new URL(e,document.baseURI));return n?(de[t.replaceState?"replaceState":"pushState"]({id:fe},"",e),ye(n,null).then(()=>{})):(location.href=e,new Promise(e=>{}))}(e.location,{replaceState:!0});if(ce.page.set(r),ce.preloading.set(!1),te)te.$set(n);else{n.stores={page:{subscribe:ce.page.subscribe},preloading:{subscribe:ce.preloading.subscribe},session:ce.session},n.level0={props:await re};const e=document.querySelector("#sapper-head-start"),t=document.querySelector("#sapper-head-end");if(e&&t){for(;e.nextSibling!==t;)Ee(e.nextSibling);Ee(e),Ee(t)}te=new X({target:ue,props:n,hydrate:!0})}oe=t,ae=JSON.stringify(r.query),se=!0,ie=!1}async function Se(e){const{route:t,page:n}=e,r=n.path.split("/").filter(Boolean);let s=null;const o={error:null,status:200,segments:[r[0]]},a={fetch:(e,t)=>fetch(e,t),redirect:(e,t)=>{if(s&&(s.statusCode!==e||s.location!==t))throw new Error("Conflicting redirects");s={statusCode:e,location:t}},error:(e,t)=>{o.error="string"==typeof t?new Error(t):t,o.status=e}};let c;re||(re=ee.preloaded[0]||k.call(a,{host:n.host,path:n.path,query:n.query,params:{}},le));let l=1;try{const s=JSON.stringify(n.query),i=t.pattern.exec(n.path);let u=!1;c=await Promise.all(t.parts.map(async(t,c)=>{const p=r[c];if(function(e,t,n,r){if(r!==ae)return!0;const s=oe[e];return!!s&&(t!==s.segment||(!(!s.match||JSON.stringify(s.match.slice(1,e+2))===JSON.stringify(n.slice(1,e+2)))||void 0))}(c,p,i,s)&&(u=!0),o.segments[l]=r[c+1],!t)return{segment:p};const f=l++;if(!ie&&!u&&oe[c]&&oe[c].part===t.i)return oe[c];u=!1;const{default:h,preload:d}=await function(e){const t="string"==typeof e.css?[]:e.css.map(we);return t.unshift(e.js()),Promise.all(t).then(e=>e[0])}(M[t.i]);let m;return m=se||!ee.preloaded[c+1]?d?await d.call(a,{host:n.host,path:n.path,query:n.query,params:t.params?t.params(e.match):{}},le):{}:ee.preloaded[c+1],o[`level${f}`]={component:h,props:m,segment:p,match:i,part:t.i}}))}catch(e){o.error=e,o.status=500,c=[]}return{redirect:s,props:o,branch:c}}function we(e){const t=`client/${e}`;if(!document.querySelector(`link[href="${t}"]`))return new Promise((e,n)=>{const r=document.createElement("link");r.rel="stylesheet",r.href=t,r.onload=()=>e(),r.onerror=n,document.head.appendChild(r)})}function Ee(e){e.parentNode.removeChild(e)}function Re(e){const t=$e(new URL(e,document.baseURI));if(t)return pe&&e===pe.href||function(e,t){pe={href:e,promise:t}}(e,Se(t)),pe.promise}let xe;function _e(e){clearTimeout(xe),xe=setTimeout(()=>{Pe(e)},20)}function Pe(e){const t=Le(e.target);t&&"prefetch"===t.rel&&Re(t.href)}function Ce(e){if(1!==function(e){return null===e.which?e.button:e.which}(e))return;if(e.metaKey||e.ctrlKey||e.shiftKey)return;if(e.defaultPrevented)return;const t=Le(e.target);if(!t)return;if(!t.href)return;const n="object"==typeof t.href&&"SVGAnimatedString"===t.href.constructor.name,r=String(n?t.href.baseVal:t.href);if(r===location.href)return void(location.hash||e.preventDefault());if(t.hasAttribute("download")||"external"===t.getAttribute("rel"))return;if(n?t.target.baseVal:t.target)return;const s=new URL(r);if(s.pathname===location.pathname&&s.search===location.search)return;const o=$e(s);if(o){ye(o,null,t.hasAttribute("sapper-noscroll"),s.hash),e.preventDefault(),de.pushState({id:fe},"",s.href)}}function Le(e){for(;e&&"A"!==e.nodeName.toUpperCase();)e=e.parentNode;return e}function qe(e){if(me[fe]=ve(),e.state){const t=$e(new URL(location.href));t?ye(t,e.state.id):location.href=location.href}else he=he+1,function(e){fe=e}(he),de.replaceState({id:fe},"",location.href)}var Ue;Ue={target:document.querySelector("#sapper")},"scrollRestoration"in de&&(de.scrollRestoration="manual"),function(e){ue=e}(Ue.target),addEventListener("click",Ce),addEventListener("popstate",qe),addEventListener("touchstart",Pe),addEventListener("mousemove",_e),Promise.resolve().then(()=>{const{hash:e,href:t}=location;de.replaceState({id:he},"",t);const n=new URL(location.href);if(ee.error)return function(e){const{host:t,pathname:n,search:r}=location,{session:s,preloaded:o,status:a,error:c}=ee;re||(re=o&&o[0]),be(null,[],{error:c,status:a,session:s,level0:{props:re},level1:{props:{status:a,error:c},component:T},segments:o},{host:t,path:n,query:ge(r),params:{}})}();const r=$e(n);return r?ye(r,he,!0,e):void 0});
