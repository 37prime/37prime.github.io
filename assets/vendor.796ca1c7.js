function E(){}const L=t=>t;function T(t){return t()}function B(){return Object.create(null)}function $(t){t.forEach(T)}function G(t){return typeof t=="function"}function wt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let k;function bt(t,e){return k||(k=document.createElement("a")),k.href=e,t===k.href}function Y(t){return Object.keys(t).length===0}const H=typeof window!="undefined";let Z=H?()=>window.performance.now():()=>Date.now(),q=H?t=>requestAnimationFrame(t):E;const v=new Set;function I(t){v.forEach(e=>{e.c(t)||(v.delete(e),e.f())}),v.size!==0&&q(I)}function tt(t){let e;return v.size===0&&q(I),{promise:new Promise(n=>{v.add(e={c:t,f:n})}),abort(){v.delete(e)}}}function et(t,e){t.appendChild(e)}function J(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function nt(t){const e=ot("style");return rt(J(t),e),e}function rt(t,e){et(t.head||t,e)}function xt(t,e,n){t.insertBefore(e,n||null)}function st(t){t.parentNode.removeChild(t)}function ot(t){return document.createElement(t)}function K(t){return document.createTextNode(t)}function Et(){return K(" ")}function kt(){return K("")}function Ct(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function St(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function jt(t){return t===""?null:+t}function it(t){return Array.from(t.childNodes)}function At(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Rt(t,e){t.value=e==null?"":e}function Nt(t,e,n,s){t.style.setProperty(e,n,s?"important":"")}function ut(t,e,n=!1){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,!1,e),s}const z=new Set;let C=0;function ct(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Q(t,e,n,s,u,c,r,a=0){const f=16.666/s;let o=`{
`;for(let p=0;p<=1;p+=f){const y=e+(n-e)*c(p);o+=p*100+`%{${r(y,1-y)}}
`}const m=o+`100% {${r(n,1-n)}}
}`,l=`__svelte_${ct(m)}_${a}`,i=J(t);z.add(i);const _=i.__svelte_stylesheet||(i.__svelte_stylesheet=nt(t).sheet),d=i.__svelte_rules||(i.__svelte_rules={});d[l]||(d[l]=!0,_.insertRule(`@keyframes ${l} ${m}`,_.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${l} ${s}ms linear ${u}ms 1 both`,C+=1,l}function lt(t,e){const n=(t.style.animation||"").split(", "),s=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),u=n.length-s.length;u&&(t.style.animation=s.join(", "),C-=u,C||at())}function at(){q(()=>{C||(z.forEach(t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}}),z.clear())})}let S;function j(t){S=t}function ft(){if(!S)throw new Error("Function called outside component initialization");return S}function Ot(t){ft().$$.on_mount.push(t)}const w=[],U=[],A=[],V=[],_t=Promise.resolve();let P=!1;function dt(){P||(P=!0,_t.then(W))}function R(t){A.push(t)}let D=!1;const M=new Set;function W(){if(!D){D=!0;do{for(let t=0;t<w.length;t+=1){const e=w[t];j(e),ht(e.$$)}for(j(null),w.length=0;U.length;)U.pop()();for(let t=0;t<A.length;t+=1){const e=A[t];M.has(e)||(M.add(e),e())}A.length=0}while(w.length);for(;V.length;)V.pop()();P=!1,D=!1,M.clear()}}function ht(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(R)}}let b;function mt(){return b||(b=Promise.resolve(),b.then(()=>{b=null})),b}function F(t,e,n){t.dispatchEvent(ut(`${e?"intro":"outro"}${n}`))}const N=new Set;let h;function qt(){h={r:0,c:[],p:h}}function zt(){h.r||$(h.c),h=h.p}function pt(t,e){t&&t.i&&(N.delete(t),t.i(e))}function Pt(t,e,n,s){if(t&&t.o){if(N.has(t))return;N.add(t),h.c.push(()=>{N.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}}const gt={duration:0};function Dt(t,e,n,s){let u=e(t,n),c=s?0:1,r=null,a=null,f=null;function o(){f&&lt(t,f)}function m(i,_){const d=i.b-c;return _*=Math.abs(d),{a:c,b:i.b,d,duration:_,start:i.start,end:i.start+_,group:i.group}}function l(i){const{delay:_=0,duration:d=300,easing:g=L,tick:p=E,css:y}=u||gt,O={start:Z()+_,b:i};i||(O.group=h,h.r+=1),r||a?a=O:(y&&(o(),f=Q(t,c,i,d,_,g,y)),i&&p(0,1),r=m(O,d),R(()=>F(t,i,"start")),tt(x=>{if(a&&x>a.start&&(r=m(a,d),a=null,F(t,r.b,"start"),y&&(o(),f=Q(t,c,r.b,r.duration,0,g,u.css))),r){if(x>=r.end)p(c=r.b,1-c),F(t,r.b,"end"),a||(r.b?o():--r.group.r||$(r.group.c)),r=null;else if(x>=r.start){const X=x-r.start;c=r.a+r.d*g(X/r.duration),p(c,1-c)}}return!!(r||a)}))}return{run(i){G(u)?mt().then(()=>{u=u(),l(i)}):l(i)},end(){o(),r=a=null}}}function yt(t,e,n,s){const{fragment:u,on_mount:c,on_destroy:r,after_update:a}=t.$$;u&&u.m(e,n),s||R(()=>{const f=c.map(T).filter(G);r?r.push(...f):$(f),t.$$.on_mount=[]}),a.forEach(R)}function $t(t,e){const n=t.$$;n.fragment!==null&&($(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function vt(t,e){t.$$.dirty[0]===-1&&(w.push(t),dt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Mt(t,e,n,s,u,c,r,a=[-1]){const f=S;j(t);const o=t.$$={fragment:null,ctx:null,props:c,update:E,not_equal:u,bound:B(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(f?f.$$.context:[])),callbacks:B(),dirty:a,skip_bound:!1,root:e.target||f.$$.root};r&&r(o.root);let m=!1;if(o.ctx=n?n(t,e.props||{},(l,i,..._)=>{const d=_.length?_[0]:i;return o.ctx&&u(o.ctx[l],o.ctx[l]=d)&&(!o.skip_bound&&o.bound[l]&&o.bound[l](d),m&&vt(t,l)),i}):[],o.update(),m=!0,$(o.before_update),o.fragment=s?s(o.ctx):!1,e.target){if(e.hydrate){const l=it(e.target);o.fragment&&o.fragment.l(l),l.forEach(st)}else o.fragment&&o.fragment.c();e.intro&&pt(t.$$.fragment),yt(t,e.target,e.anchor,e.customElement),W()}j(f)}class Ft{$destroy(){$t(this,1),this.$destroy=E}$on(e,n){const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const u=s.indexOf(n);u!==-1&&s.splice(u,1)}}$set(e){this.$$set&&!Y(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function Lt(t,{delay:e=0,duration:n=400,easing:s=L}={}){const u=+getComputedStyle(t).opacity;return{delay:e,duration:n,easing:s,css:c=>`opacity: ${c*u}`}}export{Ft as S,St as a,xt as b,R as c,Dt as d,ot as e,st as f,Et as g,kt as h,Mt as i,bt as j,et as k,Ct as l,At as m,pt as n,Pt as o,zt as p,Ot as q,Lt as r,wt as s,K as t,qt as u,jt as v,E as w,Nt as x,Rt as y,$ as z};
