"use strict";(self.webpackChunkprod=self.webpackChunkprod||[]).push([[535],{69349:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.RequestProcessor=e.Code=e.fromStatus=e.readRequest=e.readResponse=e.serialize=e.Request=void 0;const o=n(98097);function s(t,e){return e instanceof Map?{dataType:"Map",value:Array.from(e.entries())}:e}function r(t,e){return"object"==typeof e&&null!==e&&"Map"===e.dataType?new Map(e.value):e}e.Request=class{constructor(t,...e){this.method=t,this.params=e}},e.serialize=function(t){return JSON.stringify(t,s)},e.readResponse=function(t){return JSON.parse(t,r)},e.readRequest=function(t){const n=JSON.parse(t);if("string"!=typeof n.method)throw new o.PlatformError(new o.Status(o.Severity.ERROR,e.Code.BadRequest,{}));return n},e.fromStatus=function(t,e){return{id:e,error:t}},e.Code=o.component("rpc",{Unauthorized:"",Forbidden:"",BadRequest:"",UnknownMethod:""});class i{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}e.RequestProcessor=class{constructor(){this.reqIndex=0,this.requests=new Map}process(t){if(void 0!==t.id){const e=this.requests.get(t.id);if(void 0!==e)return void 0!==t.error?(console.error(t.error),void e.reject(new o.PlatformError(t.error))):void e.resolve(t.result)}this.notify(t)}reject(t){for(const e of this.requests.entries())e[1].reject(new o.PlatformError(t));this.requests.clear()}async request(t,...e){const n=++this.reqIndex,o=new i;return this.requests.set(n,o),this.send({id:n,method:t,params:e}),await o.promise}}},79153:(t,e,n)=>{n.r(e),n.d(e,{default:()=>z});var o=n(9291),s=n(9479),r=n(14452),i=n(98097),c=n(69349),a=n(3130),l=n(9862),u=n(26148),d=Object.defineProperty,p=(t,e)=>d(t,"name",{value:e,configurable:!0}),m=(t,e,n)=>new Promise(((o,s)=>{var r=t=>{try{c(n.next(t))}catch(t){s(t)}},i=t=>{try{c(n.throw(t))}catch(t){s(t)}},c=t=>t.done?o(t.value):Promise.resolve(t.value).then(r,i);c((n=n.apply(t,e)).next())})),f=(0,i.mergeIds)(o.ZP,{status:{RequiredField:"",ConnectingToServer:""},string:{Email:"",Password:"",Password2:"",Workspace:"",LogIn:"",HaveAccount:"",SignUp:"",FirstName:"",LastName:"",PasswordMismatch:""}}),h="src/components/Form.svelte";function g(t,e,n){const o=t.slice();return o[14]=e[n],o[15]=e,o[16]=n,o}function w(t,e){let n,o,s,r,i;function c(t){e[11](t,e[14])}p(c,"stylishedit_value_binding");let l={width:"100%",label:e[14].i18n,password:e[14].password};void 0!==e[1][e[14].name]&&(l.value=e[1][e[14].name]),o=new u.wv({props:l,$$inline:!0}),a.VnY.push((()=>(0,a.akz)(o,"value",c))),o.$on("keyup",e[9]),o.$on("focus",e[9]),o.$on("blur",e[9]);const d={key:t,first:null,c:p((function(){n=(0,a.bGB)("div"),(0,a.YCL)(o.$$.fragment),(0,a.LGW)(n,"class",r=(0,a.H1I)(e[14].short?"form-col":"form-row")+" svelte-1l1370d"),(0,a.vjr)(n,h,67,6,2568),this.first=n}),"create"),m:p((function(t,e){(0,a.DsI)(t,n,e),(0,a.yef)(o,n,null),i=!0}),"mount"),p:p((function(t,c){e=t;const l={};8&c&&(l.label=e[14].i18n),8&c&&(l.password=e[14].password),!s&&10&c&&(s=!0,l.value=e[1][e[14].name],(0,a.hjT)((()=>s=!1))),o.$set(l),(!i||8&c&&r!==(r=(0,a.H1I)(e[14].short?"form-col":"form-row")+" svelte-1l1370d"))&&(0,a.LGW)(n,"class",r)}),"update"),i:p((function(t){i||((0,a.Ui)(o.$$.fragment,t),i=!0)}),"intro"),o:p((function(t){(0,a.etI)(o.$$.fragment,t),i=!1}),"outro"),d:p((function(t){t&&(0,a.GlD)(n),(0,a.vpE)(o)}),"destroy")};return(0,a.YyZ)("SvelteRegisterBlock",{block:d,id:w.name,type:"each",source:"(67:4) {#each fields as field (field.name)}",ctx:e}),d}function v(t){let e,n,o,s,r,c,l,d,m,f,b,$,y,j,_,L,S,P,O,G,k,F,E,A,C,x=[],B=new Map;r=new u.__({props:{label:t[2]},$$inline:!0}),d=new u.If({props:{status:t[0]},$$inline:!0});let W=t[3];(0,a.vzG)(W);const R=p((t=>t[14].name),"get_key");(0,a.HeV)(t,W,g,R);for(let e=0;e<W.length;e+=1){let n=g(t,W,e),o=R(n);B.set(o,x[e]=w(o,n))}y=new u.zx({props:{label:t[4].i18n,primary:!0,width:"100%",loading:t[8],disabled:t[0].severity!==i.Severity.OK&&t[0].severity!==i.Severity.ERROR},$$inline:!0}),y.$on("click",t[12]),O=new u.__({props:{label:t[5]},$$inline:!0}),F=new u.__({props:{label:t[6]},$$inline:!0});const I={c:p((function(){e=(0,a.bGB)("form"),n=(0,a.bGB)("div"),o=(0,a.DhX)(),s=(0,a.bGB)("div"),(0,a.YCL)(r.$$.fragment),c=(0,a.DhX)(),l=(0,a.bGB)("div"),(0,a.YCL)(d.$$.fragment),m=(0,a.DhX)(),f=(0,a.bGB)("div");for(let t=0;t<x.length;t+=1)x[t].c();b=(0,a.DhX)(),$=(0,a.bGB)("div"),(0,a.YCL)(y.$$.fragment),j=(0,a.DhX)(),_=(0,a.bGB)("div"),L=(0,a.DhX)(),S=(0,a.bGB)("div"),P=(0,a.bGB)("span"),(0,a.YCL)(O.$$.fragment),G=(0,a.DhX)(),k=(0,a.bGB)("a"),(0,a.YCL)(F.$$.fragment),(0,a.LGW)(n,"class","grow-separator svelte-1l1370d"),(0,a.vjr)(n,h,60,2,2353),(0,a.LGW)(s,"class","title svelte-1l1370d"),(0,a.vjr)(s,h,61,2,2386),(0,a.LGW)(l,"class","status svelte-1l1370d"),(0,a.vjr)(l,h,62,2,2439),(0,a.LGW)($,"class","form-row send svelte-1l1370d"),(0,a.vjr)($,h,80,4,2901),(0,a.LGW)(f,"class","form svelte-1l1370d"),(0,a.vjr)(f,h,65,2,2502),(0,a.LGW)(_,"class","grow-separator svelte-1l1370d"),(0,a.vjr)(_,h,99,2,3598),(0,a.LGW)(P,"class","svelte-1l1370d"),(0,a.vjr)(P,h,101,4,3656),(0,a.LGW)(k,"href","."),(0,a.LGW)(k,"class","svelte-1l1370d"),(0,a.vjr)(k,h,102,4,3705),(0,a.LGW)(S,"class","footer svelte-1l1370d"),(0,a.vjr)(S,h,100,2,3631),(0,a.LGW)(e,"class","form-container svelte-1l1370d"),(0,a.vjr)(e,h,59,0,2321)}),"create"),l:p((function(t){throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option")}),"claim"),m:p((function(i,u){(0,a.DsI)(i,e,u),(0,a.gOb)(e,n),(0,a.gOb)(e,o),(0,a.gOb)(e,s),(0,a.yef)(r,s,null),(0,a.gOb)(e,c),(0,a.gOb)(e,l),(0,a.yef)(d,l,null),(0,a.gOb)(e,m),(0,a.gOb)(e,f);for(let t=0;t<x.length;t+=1)x[t].m(f,null);(0,a.gOb)(f,b),(0,a.gOb)(f,$),(0,a.yef)(y,$,null),(0,a.gOb)(e,j),(0,a.gOb)(e,_),(0,a.gOb)(e,L),(0,a.gOb)(e,S),(0,a.gOb)(S,P),(0,a.yef)(O,P,null),(0,a.gOb)(S,G),(0,a.gOb)(S,k),(0,a.yef)(F,k,null),E=!0,A||(C=(0,a.iVk)(k,"click",(0,a.AT7)((function(){(0,a.sBU)(t[7])&&t[7].apply(this,arguments)})),!1,!0,!1),A=!0)}),"mount"),p:p((function(e,[n]){t=e;const o={};4&n&&(o.label=t[2]),r.$set(o);const s={};1&n&&(s.status=t[0]),d.$set(s),522&n&&(W=t[3],(0,a.vzG)(W),(0,a.dvw)(),(0,a.HeV)(t,W,g,R),x=(0,a.GQg)(x,n,R,1,t,W,B,f,a.cly,w,b,g),(0,a.gbL)());const c={};16&n&&(c.label=t[4].i18n),256&n&&(c.loading=t[8]),1&n&&(c.disabled=t[0].severity!==i.Severity.OK&&t[0].severity!==i.Severity.ERROR),y.$set(c);const l={};32&n&&(l.label=t[5]),O.$set(l);const u={};64&n&&(u.label=t[6]),F.$set(u)}),"update"),i:p((function(t){if(!E){(0,a.Ui)(r.$$.fragment,t),(0,a.Ui)(d.$$.fragment,t);for(let t=0;t<W.length;t+=1)(0,a.Ui)(x[t]);(0,a.Ui)(y.$$.fragment,t),(0,a.Ui)(O.$$.fragment,t),(0,a.Ui)(F.$$.fragment,t),E=!0}}),"intro"),o:p((function(t){(0,a.etI)(r.$$.fragment,t),(0,a.etI)(d.$$.fragment,t);for(let t=0;t<x.length;t+=1)(0,a.etI)(x[t]);(0,a.etI)(y.$$.fragment,t),(0,a.etI)(O.$$.fragment,t),(0,a.etI)(F.$$.fragment,t),E=!1}),"outro"),d:p((function(t){t&&(0,a.GlD)(e),(0,a.vpE)(r),(0,a.vpE)(d);for(let t=0;t<x.length;t+=1)x[t].d();(0,a.vpE)(y),(0,a.vpE)(O),(0,a.vpE)(F),A=!1,C()}),"destroy")};return(0,a.YyZ)("SvelteRegisterBlock",{block:I,id:v.name,type:"component",source:"",ctx:t}),I}function b(t,e,n){let{$$slots:o={},$$scope:r}=e;(0,a.KXV)("Form",o,[]);var c=this&&this.__awaiter||function(t,e,n,o){function s(t){return t instanceof n?t:new n((function(e){e(t)}))}return p(s,"adopt"),new(n||(n=Promise))((function(n,r){function i(t){try{a(o.next(t))}catch(t){r(t)}}function c(t){try{a(o.throw(t))}catch(t){r(t)}}function a(t){t.done?n(t.value):s(t.value).then(i,c)}p(i,"fulfilled"),p(c,"rejected"),p(a,"step"),a((o=o.apply(t,e||[])).next())}))};let{caption:l}=e,{status:d}=e,{fields:m}=e,{action:h}=e,{bottomCaption:g}=e,{bottomActionLabel:w}=e,{bottomActionFunc:v}=e,{object:b}=e;function $(){return c(this,void 0,void 0,(function*(){for(const t of m){const e=b[t.name];if(!(t.optional||e&&""!==e))return void n(0,d=new i.Status(i.Severity.INFO,f.status.RequiredField,{field:yield(0,s.translate)(t.i18n,{})}))}n(0,d=i.OK)}))}p($,"validate"),$();let y=!1;function j(t){n(8,y=!0),t.func().finally((()=>{n(8,y=!1)}))}p(j,"performAction");const _=["caption","status","fields","action","bottomCaption","bottomActionLabel","bottomActionFunc","object"];function L(e,o){t.$$.not_equal(b[o.name],e)&&(b[o.name]=e,n(1,b))}Object.keys(e).forEach((t=>{~_.indexOf(t)||"$$"===t.slice(0,2)||"slot"===t||console.warn(`<Form> was created with unknown prop '${t}'`)})),p(L,"stylishedit_value_binding");const S=p((()=>{j(h)}),"click_handler");return t.$$set=t=>{"caption"in t&&n(2,l=t.caption),"status"in t&&n(0,d=t.status),"fields"in t&&n(3,m=t.fields),"action"in t&&n(4,h=t.action),"bottomCaption"in t&&n(5,g=t.bottomCaption),"bottomActionLabel"in t&&n(6,w=t.bottomActionLabel),"bottomActionFunc"in t&&n(7,v=t.bottomActionFunc),"object"in t&&n(1,b=t.object)},t.$capture_state=()=>({__awaiter:c,translate:s.translate,OK:i.OK,Severity:i.Severity,Status:i.Status,Button:u.zx,StylishEdit:u.wv,Label:u.__,StatusControl:u.If,login:f,caption:l,status:d,fields:m,action:h,bottomCaption:g,bottomActionLabel:w,bottomActionFunc:v,object:b,validate:$,inAction:y,performAction:j}),t.$inject_state=t=>{"__awaiter"in t&&(c=t.__awaiter),"caption"in t&&n(2,l=t.caption),"status"in t&&n(0,d=t.status),"fields"in t&&n(3,m=t.fields),"action"in t&&n(4,h=t.action),"bottomCaption"in t&&n(5,g=t.bottomCaption),"bottomActionLabel"in t&&n(6,w=t.bottomActionLabel),"bottomActionFunc"in t&&n(7,v=t.bottomActionFunc),"object"in t&&n(1,b=t.object),"inAction"in t&&n(8,y=t.inAction)},e&&"$$inject"in e&&t.$inject_state(e.$$inject),[d,b,l,m,h,g,w,v,y,$,j,L,S]}p(g,"get_each_context"),p(w,"create_each_block"),p(v,"create_fragment"),p(b,"instance");var $=class extends a.Mjb{constructor(t){super(t),(0,a.S1n)(this,t,b,v,a.N8,{caption:2,status:0,fields:3,action:4,bottomCaption:5,bottomActionLabel:6,bottomActionFunc:7,object:1}),(0,a.YyZ)("SvelteRegisterComponent",{component:this,tagName:"Form",options:t,id:v.name});const{ctx:e}=this.$$,n=t.props||{};void 0!==e[2]||"caption"in n||console.warn("<Form> was created without expected prop 'caption'"),void 0!==e[0]||"status"in n||console.warn("<Form> was created without expected prop 'status'"),void 0!==e[3]||"fields"in n||console.warn("<Form> was created without expected prop 'fields'"),void 0!==e[4]||"action"in n||console.warn("<Form> was created without expected prop 'action'"),void 0!==e[5]||"bottomCaption"in n||console.warn("<Form> was created without expected prop 'bottomCaption'"),void 0!==e[6]||"bottomActionLabel"in n||console.warn("<Form> was created without expected prop 'bottomActionLabel'"),void 0!==e[7]||"bottomActionFunc"in n||console.warn("<Form> was created without expected prop 'bottomActionFunc'"),void 0!==e[1]||"object"in n||console.warn("<Form> was created without expected prop 'object'")}get caption(){throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set caption(t){throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get status(){throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set status(t){throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get fields(){throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set fields(t){throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get action(){throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set action(t){throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get bottomCaption(){throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set bottomCaption(t){throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get bottomActionLabel(){throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set bottomActionLabel(t){throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get bottomActionFunc(){throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set bottomActionFunc(t){throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}get object(){throw new Error("<Form>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}set object(t){throw new Error("<Form>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}};p($,"Form");var y=$,{console:j}=a.lig;function _(t){let e,n;e=new y({props:{caption:f.string.LogIn,status:t[0],fields:t[2],object:t[3],action:t[4],bottomCaption:f.string.HaveAccount,bottomActionLabel:f.string.SignUp,bottomActionFunc:t[6]},$$inline:!0});const o={c:p((function(){(0,a.YCL)(e.$$.fragment)}),"create"),l:p((function(t){throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option")}),"claim"),m:p((function(t,o){(0,a.yef)(e,t,o),n=!0}),"mount"),p:p((function(t,[n]){const o={};1&n&&(o.status=t[0]),e.$set(o)}),"update"),i:p((function(t){n||((0,a.Ui)(e.$$.fragment,t),n=!0)}),"intro"),o:p((function(t){(0,a.etI)(e.$$.fragment,t),n=!1}),"outro"),d:p((function(t){(0,a.vpE)(e,t)}),"destroy")};return(0,a.YyZ)("SvelteRegisterBlock",{block:o,id:_.name,type:"component",source:"",ctx:t}),o}function L(t,e,n){let{$$slots:r={},$$scope:c}=e;(0,a.KXV)("LoginForm",r,[]);var u,d=this&&this.__awaiter||function(t,e,n,o){function s(t){return t instanceof n?t:new n((function(e){e(t)}))}return p(s,"adopt"),new(n||(n=Promise))((function(n,r){function i(t){try{a(o.next(t))}catch(t){r(t)}}function c(t){try{a(o.throw(t))}catch(t){r(t)}}function a(t){t.done?n(t.value):s(t.value).then(i,c)}p(i,"fulfilled"),p(c,"rejected"),p(a,"step"),a((o=o.apply(t,e||[])).next())}))};const m=(0,s.getPlugin)(o.ZP.id),h=(0,l.createEventDispatcher)(),g="anticrm-last-workspace",w=[{name:"username",i18n:f.string.Email},{name:"password",i18n:f.string.Password,password:!0},{name:"workspace",i18n:f.string.Workspace}],v={workspace:null!==(u=localStorage.getItem(g))&&void 0!==u?u:"",username:"",password:""};let b=i.OK;const $={i18n:f.string.LogIn,func:()=>d(void 0,void 0,void 0,(function*(){n(0,b=new i.Status(i.Severity.INFO,f.status.ConnectingToServer,{}));const t=(yield m).doLogin(v.username,v.password,v.workspace);return new Promise((e=>{t.then((t=>{n(0,b=t),console.log("login status",b.code,i.OK.code),b.code===i.OK.code&&(localStorage.setItem(g,v.workspace),h("open")),e()}))}))}))},_=[];Object.keys(e).forEach((t=>{~_.indexOf(t)||"$$"===t.slice(0,2)||"slot"===t||j.warn(`<LoginForm> was created with unknown prop '${t}'`)}));const L=p((()=>{h("switch","signup")}),"func");return t.$capture_state=()=>({__awaiter:d,_a:u,createEventDispatcher:l.createEventDispatcher,OK:i.OK,Status:i.Status,Severity:i.Severity,Form:y,loginImpl:f,getPlugin:s.getPlugin,login:o.ZP,loginPlugin:m,dispatch:h,LAST_WORKSPACE_KEY:g,fields:w,object:v,status:b,action:$}),t.$inject_state=t=>{"__awaiter"in t&&(d=t.__awaiter),"_a"in t&&(u=t._a),"status"in t&&n(0,b=t.status)},e&&"$$inject"in e&&t.$inject_state(e.$$inject),[b,h,w,v,$,g,L]}p(_,"create_fragment"),p(L,"instance");var S=class extends a.Mjb{constructor(t){super(t),(0,a.S1n)(this,t,L,_,a.N8,{LAST_WORKSPACE_KEY:5}),(0,a.YyZ)("SvelteRegisterComponent",{component:this,tagName:"LoginForm",options:t,id:_.name})}get LAST_WORKSPACE_KEY(){return this.$$.ctx[5]}set LAST_WORKSPACE_KEY(t){throw new Error("<LoginForm>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'")}};p(S,"LoginForm");var P=S;function O(t){let e,n;e=new y({props:{caption:f.string.SignUp,status:t[0],fields:t[2],object:t[3],action:t[4],bottomCaption:f.string.HaveAccount,bottomActionLabel:f.string.LogIn,bottomActionFunc:t[5]},$$inline:!0});const o={c:p((function(){(0,a.YCL)(e.$$.fragment)}),"create"),l:p((function(t){throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option")}),"claim"),m:p((function(t,o){(0,a.yef)(e,t,o),n=!0}),"mount"),p:p((function(t,[n]){const o={};1&n&&(o.status=t[0]),e.$set(o)}),"update"),i:p((function(t){n||((0,a.Ui)(e.$$.fragment,t),n=!0)}),"intro"),o:p((function(t){(0,a.etI)(e.$$.fragment,t),n=!1}),"outro"),d:p((function(t){(0,a.vpE)(e,t)}),"destroy")};return(0,a.YyZ)("SvelteRegisterBlock",{block:o,id:O.name,type:"component",source:"",ctx:t}),o}function G(t,e,n){let{$$slots:r={},$$scope:c}=e;(0,a.KXV)("SignupForm",r,[]);var u=this&&this.__awaiter||function(t,e,n,o){function s(t){return t instanceof n?t:new n((function(e){e(t)}))}return p(s,"adopt"),new(n||(n=Promise))((function(n,r){function i(t){try{a(o.next(t))}catch(t){r(t)}}function c(t){try{a(o.throw(t))}catch(t){r(t)}}function a(t){t.done?n(t.value):s(t.value).then(i,c)}p(i,"fulfilled"),p(c,"rejected"),p(a,"step"),a((o=o.apply(t,e||[])).next())}))};const d=(0,l.createEventDispatcher)(),m=(0,s.getPlugin)(o.ZP.id),h=[{name:"first",i18n:f.string.FirstName,short:!0},{name:"last",i18n:f.string.LastName,short:!0},{name:"username",i18n:f.string.Email},{name:"workspace",i18n:f.string.Workspace},{name:"password",i18n:f.string.Password,password:!0},{name:"password2",i18n:f.string.Password2,password:!0}],g={first:"",last:"",workspace:"",username:"",password:"",password2:""};let w=i.OK;const v={i18n:f.string.SignUp,func:()=>u(void 0,void 0,void 0,(function*(){if(g.password!==g.password2)return n(0,w=new i.Status(i.Severity.INFO,i.default.status.OK,(0,s.translate)(f.string.PasswordMismatch,{}))),Promise.resolve();n(0,w=new i.Status(i.Severity.INFO,i.default.status.OK,"Соединяюсь с сервером..."));const t=(yield m).doSignup(g.username,g.password,g.workspace,{firstName:g.first,lastName:g.last});return new Promise((e=>{t.then((t=>{n(0,w=t),w.code===i.OK.code&&d("open"),e()}))}))}))},b=[];Object.keys(e).forEach((t=>{~b.indexOf(t)||"$$"===t.slice(0,2)||"slot"===t||console.warn(`<SignupForm> was created with unknown prop '${t}'`)}));const $=p((()=>{d("switch","login")}),"func");return t.$capture_state=()=>({__awaiter:u,statusCode:i.default,OK:i.OK,Severity:i.Severity,Status:i.Status,createEventDispatcher:l.createEventDispatcher,Form:y,translate:s.translate,dispatch:d,getPlugin:s.getPlugin,login:o.ZP,loginPlugin:m,loginImpl:f,fields:h,object:g,status:w,action:v}),t.$inject_state=t=>{"__awaiter"in t&&(u=t.__awaiter),"status"in t&&n(0,w=t.status)},e&&"$$inject"in e&&t.$inject_state(e.$$inject),[w,d,h,g,v,$]}p(O,"create_fragment"),p(G,"instance");var k=class extends a.Mjb{constructor(t){super(t),(0,a.S1n)(this,t,G,O,a.N8,{}),(0,a.YyZ)("SvelteRegisterComponent",{component:this,tagName:"SignupForm",options:t,id:O.name})}};p(k,"SignupForm");var F=k,E="src/components/LoginApp.svelte";function A(t){let e,n;e=new F({$$inline:!0}),e.$on("switch",t[3]),e.$on("open",t[4]);const o={c:p((function(){(0,a.YCL)(e.$$.fragment)}),"create"),m:p((function(t,o){(0,a.yef)(e,t,o),n=!0}),"mount"),p:a.ZTd,i:p((function(t){n||((0,a.Ui)(e.$$.fragment,t),n=!0)}),"intro"),o:p((function(t){(0,a.etI)(e.$$.fragment,t),n=!1}),"outro"),d:p((function(t){(0,a.vpE)(e,t)}),"destroy")};return(0,a.YyZ)("SvelteRegisterBlock",{block:o,id:A.name,type:"if",source:"(28:32) ",ctx:t}),o}function C(t){let e,n;e=new P({$$inline:!0}),e.$on("switch",t[1]),e.$on("open",t[2]);const o={c:p((function(){(0,a.YCL)(e.$$.fragment)}),"create"),m:p((function(t,o){(0,a.yef)(e,t,o),n=!0}),"mount"),p:a.ZTd,i:p((function(t){n||((0,a.Ui)(e.$$.fragment,t),n=!0)}),"intro"),o:p((function(t){(0,a.etI)(e.$$.fragment,t),n=!1}),"outro"),d:p((function(t){(0,a.vpE)(e,t)}),"destroy")};return(0,a.YyZ)("SvelteRegisterBlock",{block:o,id:C.name,type:"if",source:"(26:4) {#if page === 'login'}",ctx:t}),o}function x(t){let e,n,o,s,r,i,c,l,u,d,m,f,h,g,w,v,b,$,y;const j=[C,A],_=[];function L(t,e){return"login"===t[0]?0:"signup"===t[0]?1:-1}p(L,"select_block_type"),~(l=L(t))&&(u=_[l]=j[l](t));const S={c:p((function(){e=(0,a.bGB)("div"),n=(0,a.bGB)("div"),o=(0,a.bGB)("div"),s=(0,a.DhX)(),r=(0,a.bGB)("div"),i=(0,a.bGB)("div"),c=(0,a.DhX)(),u&&u.c(),d=(0,a.DhX)(),m=(0,a.bGB)("div"),f=(0,a.bGB)("div"),h=(0,a.bGB)("div"),g=(0,a.DhX)(),w=(0,a.bGB)("div"),v=(0,a.bGB)("p"),v.textContent="A unique place to manage all of your work",b=(0,a.DhX)(),$=(0,a.bGB)("p"),$.textContent="Welcome to the Platform",(0,a.LGW)(o,"class","back-panel-dark svelte-jzl6pv"),(0,a.vjr)(o,E,21,4,806),(0,a.LGW)(i,"class","bg-noise opacity-3 svelte-jzl6pv"),(0,a.vjr)(i,E,23,6,879),(0,a.LGW)(r,"class","back-panel-light svelte-jzl6pv"),(0,a.vjr)(r,E,22,4,842),(0,a.LGW)(n,"class","panel svelte-jzl6pv"),(0,a.vjr)(n,E,20,2,782),(0,a.LGW)(h,"class","logo svelte-jzl6pv"),(0,a.vjr)(h,E,33,6,1205),(0,a.LGW)(f,"class","content svelte-jzl6pv"),(0,a.vjr)(f,E,32,4,1177),(0,a.LGW)(v,"class","svelte-jzl6pv"),(0,a.vjr)(v,E,36,6,1268),(0,a.LGW)($,"class","svelte-jzl6pv"),(0,a.vjr)($,E,37,6,1323),(0,a.LGW)(w,"class","slogan svelte-jzl6pv"),(0,a.vjr)(w,E,35,4,1241),(0,a.LGW)(m,"class","intro svelte-jzl6pv"),(0,a.vjr)(m,E,31,2,1153),(0,a.LGW)(e,"class","container svelte-jzl6pv"),(0,a.vjr)(e,E,19,0,756)}),"create"),l:p((function(t){throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option")}),"claim"),m:p((function(t,u){(0,a.DsI)(t,e,u),(0,a.gOb)(e,n),(0,a.gOb)(n,o),(0,a.gOb)(n,s),(0,a.gOb)(n,r),(0,a.gOb)(r,i),(0,a.gOb)(n,c),~l&&_[l].m(n,null),(0,a.gOb)(e,d),(0,a.gOb)(e,m),(0,a.gOb)(m,f),(0,a.gOb)(f,h),(0,a.gOb)(m,g),(0,a.gOb)(m,w),(0,a.gOb)(w,v),(0,a.gOb)(w,b),(0,a.gOb)(w,$),y=!0}),"mount"),p:p((function(t,[e]){let o=l;l=L(t),l===o?~l&&_[l].p(t,e):(u&&((0,a.dvw)(),(0,a.etI)(_[o],1,1,(()=>{_[o]=null})),(0,a.gbL)()),~l?(u=_[l],u?u.p(t,e):(u=_[l]=j[l](t),u.c()),(0,a.Ui)(u,1),u.m(n,null)):u=null)}),"update"),i:p((function(t){y||((0,a.Ui)(u),y=!0)}),"intro"),o:p((function(t){(0,a.etI)(u),y=!1}),"outro"),d:p((function(t){t&&(0,a.GlD)(e),~l&&_[l].d()}),"destroy")};return(0,a.YyZ)("SvelteRegisterBlock",{block:S,id:x.name,type:"component",source:"",ctx:t}),S}function B(t,e,n){let{$$slots:o={},$$scope:s}=e;(0,a.KXV)("LoginApp",o,[]);let r="login";const i=[];Object.keys(e).forEach((t=>{~i.indexOf(t)||"$$"===t.slice(0,2)||"slot"===t||console.warn(`<LoginApp> was created with unknown prop '${t}'`)}));const c=p((t=>n(0,r=t.detail)),"switch_handler");function l(e){a.cKT.call(this,t,e)}p(l,"open_handler");const u=p((t=>n(0,r=t.detail)),"switch_handler_1");function d(e){a.cKT.call(this,t,e)}return p(d,"open_handler_1"),t.$capture_state=()=>({LoginForm:P,SignupForm:F,page:r}),t.$inject_state=t=>{"page"in t&&n(0,r=t.page)},e&&"$$inject"in e&&t.$inject_state(e.$$inject),[r,c,l,u,d]}p(A,"create_if_block_1"),p(C,"create_if_block"),p(x,"create_fragment"),p(B,"instance");var W=class extends a.Mjb{constructor(t){super(t),(0,a.S1n)(this,t,B,x,a.N8,{}),(0,a.YyZ)("SvelteRegisterComponent",{component:this,tagName:"LoginApp",options:t,id:x.name})}};p(W,"LoginApp");var R=W,I="src/components/SettingForm.svelte";function D(t){let e;const n={c:p((function(){e=(0,a.fLW)("Изменить пароль")}),"create"),m:p((function(t,n){(0,a.DsI)(t,e,n)}),"mount"),d:p((function(t){t&&(0,a.GlD)(e)}),"destroy")};return(0,a.YyZ)("SvelteRegisterBlock",{block:n,id:D.name,type:"slot",source:"(93:4) <CheckBox bind:checked={changePassword}>",ctx:t}),n}function K(t){let e,n,o,s,r,i,c;const l={c:p((function(){e=(0,a.bGB)("div"),n=(0,a.bGB)("input"),o=(0,a.DhX)(),s=(0,a.bGB)("div"),r=(0,a.bGB)("input"),(0,a.LGW)(n,"class","editbox svelte-wj0aha"),(0,a.LGW)(n,"name","newPassword"),(0,a.LGW)(n,"placeholder","Новый пароль"),(0,a.LGW)(n,"type","password"),(0,a.vjr)(n,I,96,6,4287),(0,a.LGW)(e,"class","field svelte-wj0aha"),(0,a.vjr)(e,I,95,4,4261),(0,a.LGW)(r,"class","editbox svelte-wj0aha"),(0,a.LGW)(r,"name","newPasswordConfirm"),(0,a.LGW)(r,"placeholder","Подтверждение пароля"),(0,a.LGW)(r,"type","password"),(0,a.vjr)(r,I,105,6,4494),(0,a.LGW)(s,"class","field svelte-wj0aha"),(0,a.vjr)(s,I,104,4,4468)}),"create"),m:p((function(l,u){(0,a.DsI)(l,e,u),(0,a.gOb)(e,n),(0,a.BmG)(n,t[0].newPassword),(0,a.DsI)(l,o,u),(0,a.DsI)(l,s,u),(0,a.gOb)(s,r),(0,a.BmG)(r,t[0].newPasswordConfirm),i||(c=[(0,a.iVk)(n,"input",t[6]),(0,a.iVk)(r,"input",t[7])],i=!0)}),"mount"),p:p((function(t,e){1&e&&n.value!==t[0].newPassword&&(0,a.BmG)(n,t[0].newPassword),1&e&&r.value!==t[0].newPasswordConfirm&&(0,a.BmG)(r,t[0].newPasswordConfirm)}),"update"),d:p((function(t){t&&(0,a.GlD)(e),t&&(0,a.GlD)(o),t&&(0,a.GlD)(s),i=!1,(0,a.j7q)(c)}),"destroy")};return(0,a.YyZ)("SvelteRegisterBlock",{block:l,id:K.name,type:"if",source:"(95:2) {#if changePassword}",ctx:t}),l}function Z(t){let e,n,o,s,r,i,c,l,d,m,f,h,g,w,v,b,$;function y(e){t[5](e)}p(y,"checkbox_checked_binding");let j={$$slots:{default:[D]},$$scope:{ctx:t}};void 0!==t[1]&&(j.checked=t[1]),d=new u.Jg({props:j,$$inline:!0}),a.VnY.push((()=>(0,a.akz)(d,"checked",y)));let _=t[1]&&K(t);const L={c:p((function(){e=(0,a.bGB)("form"),n=(0,a.bGB)("div"),o=(0,a.fLW)(t[2]),s=(0,a.DhX)(),r=(0,a.bGB)("div"),i=(0,a.bGB)("input"),c=(0,a.DhX)(),l=(0,a.bGB)("div"),(0,a.YCL)(d.$$.fragment),f=(0,a.DhX)(),_&&_.c(),h=(0,a.DhX)(),g=(0,a.bGB)("div"),w=(0,a.bGB)("button"),w.textContent="Сохранить",(0,a.LGW)(n,"class","status svelte-wj0aha"),(0,a.vjr)(n,I,87,2,3943),(0,a.LGW)(i,"class","editbox svelte-wj0aha"),(0,a.LGW)(i,"name","oldPassword"),(0,a.LGW)(i,"placeholder","Пароль"),(0,a.LGW)(i,"type","password"),(0,a.vjr)(i,I,89,4,4009),(0,a.LGW)(r,"class","field svelte-wj0aha"),(0,a.vjr)(r,I,88,2,3985),(0,a.LGW)(l,"class","field svelte-wj0aha"),(0,a.vjr)(l,I,91,2,4134),(0,a.LGW)(w,"class","button"),(0,a.vjr)(w,I,146,4,5622),(0,a.LGW)(g,"class","buttons"),(0,a.vjr)(g,I,144,2,5497),(0,a.LGW)(e,"class","form svelte-wj0aha"),(0,a.vjr)(e,I,86,0,3921)}),"create"),l:p((function(t){throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option")}),"claim"),m:p((function(u,p){(0,a.DsI)(u,e,p),(0,a.gOb)(e,n),(0,a.gOb)(n,o),(0,a.gOb)(e,s),(0,a.gOb)(e,r),(0,a.gOb)(r,i),(0,a.BmG)(i,t[0].oldPassword),(0,a.gOb)(e,c),(0,a.gOb)(e,l),(0,a.yef)(d,l,null),(0,a.gOb)(e,f),_&&_.m(e,null),(0,a.gOb)(e,h),(0,a.gOb)(e,g),(0,a.gOb)(g,w),v=!0,b||($=[(0,a.iVk)(i,"input",t[4]),(0,a.iVk)(w,"click",(0,a.AT7)(t[3]),!1,!0,!1)],b=!0)}),"mount"),p:p((function(t,[n]){(!v||4&n)&&(0,a.Lob)(o,t[2]),1&n&&i.value!==t[0].oldPassword&&(0,a.BmG)(i,t[0].oldPassword);const s={};2048&n&&(s.$$scope={dirty:n,ctx:t}),!m&&2&n&&(m=!0,s.checked=t[1],(0,a.hjT)((()=>m=!1))),d.$set(s),t[1]?_?_.p(t,n):(_=K(t),_.c(),_.m(e,h)):_&&(_.d(1),_=null)}),"update"),i:p((function(t){v||((0,a.Ui)(d.$$.fragment,t),v=!0)}),"intro"),o:p((function(t){(0,a.etI)(d.$$.fragment,t),v=!1}),"outro"),d:p((function(t){t&&(0,a.GlD)(e),(0,a.vpE)(d),_&&_.d(),b=!1,(0,a.j7q)($)}),"destroy")};return(0,a.YyZ)("SvelteRegisterBlock",{block:L,id:Z.name,type:"component",source:"",ctx:t}),L}function Y(t,e,n){let{$$slots:r={},$$scope:c}=e;(0,a.KXV)("SettingForm",r,[]);var l=this&&this.__awaiter||function(t,e,n,o){function s(t){return t instanceof n?t:new n((function(e){e(t)}))}return p(s,"adopt"),new(n||(n=Promise))((function(n,r){function i(t){try{a(o.next(t))}catch(t){r(t)}}function c(t){try{a(o.throw(t))}catch(t){r(t)}}function a(t){t.done?n(t.value):s(t.value).then(i,c)}p(i,"fulfilled"),p(c,"rejected"),p(a,"step"),a((o=o.apply(t,e||[])).next())}))};const d={oldPassword:"",newPassword:"",newPasswordConfirm:"",clientSecret:"",secondFactorCode:""};let m=!1,f=i.OK;const h=(0,s.getPlugin)(o.ZP.id);let g;function w(){return l(this,void 0,void 0,(function*(){f=yield(yield h).saveSetting(d.oldPassword,m?d.newPassword:"")}))}p(w,"saveSetting");const v=[];function b(){d.oldPassword=this.value,n(0,d)}function $(t){m=t,n(1,m)}function y(){d.newPassword=this.value,n(0,d)}function j(){d.newPasswordConfirm=this.value,n(0,d)}return Object.keys(e).forEach((t=>{~v.indexOf(t)||"$$"===t.slice(0,2)||"slot"===t||console.warn(`<SettingForm> was created with unknown prop '${t}'`)})),p(b,"input_input_handler"),p($,"checkbox_checked_binding"),p(y,"input0_input_handler"),p(j,"input1_input_handler"),t.$capture_state=()=>({__awaiter:l,login:o.ZP,getPlugin:s.getPlugin,OK:i.OK,CheckBox:u.Jg,object:d,changePassword:m,status:f,loginService:h,description:g,saveSetting:w}),t.$inject_state=t=>{"__awaiter"in t&&(l=t.__awaiter),"changePassword"in t&&n(1,m=t.changePassword),"status"in t&&(f=t.status),"description"in t&&n(2,g=t.description)},e&&"$$inject"in e&&t.$inject_state(e.$$inject),n(2,g=""),[d,m,g,w,b,$,y,j]}p(D,"create_default_slot"),p(K,"create_if_block"),p(Z,"create_fragment"),p(Y,"instance");var U=class extends a.Mjb{constructor(t){super(t),(0,a.S1n)(this,t,Y,Z,a.N8,{}),(0,a.YyZ)("SvelteRegisterComponent",{component:this,tagName:"SettingForm",options:t,id:Z.name})}};p(U,"SettingForm");var N=U,z=p((()=>m(void 0,null,(function*(){(0,s.setResource)(o.ZP.component.LoginForm,R);const t=(0,s.getMetadata)(o.ZP.metadata.AccountsUrl);if(void 0===t)throw new i.PlatformError(new i.Status(i.Severity.ERROR,o.ZP.status.NoAccountUri,{}));function e(t){localStorage.setItem(o.Z,JSON.stringify(t)),(0,s.setMetadata)(r.default.metadata.ClientUrl,t.clientUrl)}function n(){localStorage.removeItem(o.Z),(0,s.setMetadata)(r.default.metadata.ClientUrl,void 0),(0,s.setMetadata)(r.default.metadata.AccountId,void 0)}function a(){return m(this,null,(function*(){const t=localStorage.getItem(o.Z);if(null==t)return yield Promise.resolve(void 0);const e=JSON.parse(t);return yield Promise.resolve(e)}))}function l(n,s){return m(this,null,(function*(){const r=yield a();if(null==r)return new i.Status(i.Severity.ERROR,o.ZP.status.UnAuthorized,{});const l={method:"updateAccount",params:[r.email,n,s]};try{const n=yield fetch(t,{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:(0,c.serialize)(l)}),o=yield n.json();return void 0!==o.error?o.error:(void 0!==o.result&&e(o.result),i.OK)}catch(t){return new i.Status(i.Severity.ERROR,o.ZP.status.ServerNotAvailable,{})}}))}function u(t,n,r){return m(this,null,(function*(){var a,l;const u=null!=(a=(0,s.getMetadata)(o.ZP.metadata.AccountsUrl))?a:"localhost:18080",d={method:"login",params:[t,n,r]};try{const t=yield fetch(u,{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:(0,c.serialize)(d)}),n=yield t.json(),o=null!=(l=n.error)?l:i.OK;return void 0!==n.result&&e(n.result),o}catch(t){return(0,i.unknownError)(t)}}))}function d(t,n,r,a){return m(this,null,(function*(){var l,u;const d=null!=(l=(0,s.getMetadata)(o.ZP.metadata.AccountsUrl))?l:"localhost:18080",p={method:"signup",params:[t,n,r,a]};try{const t=yield fetch(d,{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:(0,c.serialize)(p)}),n=yield t.json(),o=null!=(u=n.error)?u:i.OK;return void 0!==n.result&&e(n.result),o}catch(t){return(0,i.unknownError)(t)}}))}function f(){return m(this,null,(function*(){return n(),yield Promise.resolve()}))}return(0,s.setResource)(o.ZP.component.SettingForm,N),p(e,"setLoginInfo"),p(n,"clearLoginInfo"),p(a,"getLoginInfo"),p(l,"saveSetting"),p(u,"doLogin"),p(d,"doSignup"),p(f,"doLogout"),{doLogin:u,doSignup:d,doLogout:f,getLoginInfo:a,saveSetting:l}}))),"default")}}]);