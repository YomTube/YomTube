import{S as t,i as e,s,e as a,d as o,f as n,h as r,j as l,k as i,v as c,l as h,m as f,o as d,n as u,x as p,y as m,z as g,t as v,b as $,C as b,p as w,q as x,r as E,u as j,F as y,G as k,H as F,E as N}from"./index.a5445a6a.js";function S(t){let e,s,p,m,g;return{c(){e=a("a"),s=a("div"),p=a("p"),m=o(t[1]),this.h()},l(a){e=n(a,"A",{href:!0,class:!0});var o=r(e);s=n(o,"DIV",{class:!0});var c=r(s);p=n(c,"P",{});var h=r(p);m=l(h,t[1]),h.forEach(i),c.forEach(i),o.forEach(i),this.h()},h(){c(s,"class","svelte-119vhdk"),c(e,"href",g="/videos/"+t[0]),c(e,"class","svelte-119vhdk")},m(t,a){h(t,e,a),f(e,s),f(s,p),f(p,m)},p(t,[s]){2&s&&d(m,t[1]),1&s&&g!==(g="/videos/"+t[0])&&c(e,"href",g)},i:u,o:u,d(t){t&&i(e)}}}function _(t,e,s){let{id:a}=e,{thumbnail:o}=e,{title:n}=e;return t.$set=t=>{"id"in t&&s(0,a=t.id),"thumbnail"in t&&s(2,o=t.thumbnail),"title"in t&&s(1,n=t.title)},[a,n,o]}class q extends t{constructor(t){super(),e(this,t,_,S,s,{id:0,thumbnail:2,title:1})}}function z(t,e,s){const a=t.slice();return a[1]=e[s],a}function A(t){let e;const s=new q({props:{id:t[1]._id,title:t[1].title}});return{c(){p(s.$$.fragment)},l(t){m(s.$$.fragment,t)},m(t,a){g(s,t,a),e=!0},p(t,e){const a={};1&e&&(a.id=t[1]._id),1&e&&(a.title=t[1].title),s.$set(a)},i(t){e||(v(s.$$.fragment,t),e=!0)},o(t){$(s.$$.fragment,t),e=!1},d(t){b(s,t)}}}function B(t){let e,s,a,o=t[0],n=[];for(let e=0;e<o.length;e+=1)n[e]=A(z(t,o,e));const r=t=>$(n[t],1,1,()=>{n[t]=null});return{c(){e=w();for(let t=0;t<n.length;t+=1)n[t].c();s=x(),this.h()},l(t){E('[data-svelte="svelte-oofwcx"]',document.head).forEach(i),e=j(t);for(let e=0;e<n.length;e+=1)n[e].l(t);s=x(),this.h()},h(){document.title="Sapper project template"},m(t,o){h(t,e,o);for(let e=0;e<n.length;e+=1)n[e].m(t,o);h(t,s,o),a=!0},p(t,[e]){if(1&e){let a;for(o=t[0],a=0;a<o.length;a+=1){const r=z(t,o,a);n[a]?(n[a].p(r,e),v(n[a],1)):(n[a]=A(r),n[a].c(),v(n[a],1),n[a].m(s.parentNode,s))}for(N(),a=o.length;a<n.length;a+=1)r(a);y()}},i(t){if(!a){for(let t=0;t<o.length;t+=1)v(n[t]);a=!0}},o(t){n=n.filter(Boolean);for(let t=0;t<n.length;t+=1)$(n[t]);a=!1},d(t){t&&i(e),k(n,t),t&&i(s)}}}function C(t,e,s){let a=[];return F(async()=>{try{const t=await fetch("https://yomtube.beppp.club/api/videos");if(s(0,a=await t.json()),console.log(a),0==a.length)throw new Error("No videos found")}catch(t){console.error("Found some error"),console.error(t)}}),[a]}export default class extends t{constructor(t){super(),e(this,t,C,B,s,{})}}
