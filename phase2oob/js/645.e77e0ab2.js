"use strict";(self["webpackChunkedss_vue_ii"]=self["webpackChunkedss_vue_ii"]||[]).push([[645],{699:function(e,t,a){var o=a(6265),r=a.n(o);const n="http://10.232.176.34:8080",l="http://10.232.176.34";t["Z"]={ChartInfo(){return r().get(`${l}/data/pages/chart_info.php`).then((e=>e.data))},DeviceList(e,t){return r().get(`${l}/data/pages/device_list.php?project_id=${e}&type=${t}`).then((e=>e.data))},DeviceListII(e,t,a,o,n){let i="";return i="A-Box"==t?"10000":"W-Box"==t?"01000":"VA-Box"==t?"00100":"R-Box"==t?"00010":"TH-Box"==t?"00001":"11111",r().get(`${l}/data/pages/device_list_ii.php?project_id=${e}&typeCode=${i}&page=${a}&limit=${o}&sortBy=${n}`).then((e=>e.data))},DeviceListEDSS(e,t){return r().get(`${l}/data/pages/device_list.php?project_id=${e}&type=${t}`).then((e=>e.data))},DeviceListFilter(e,t){return r().get(`${l}/data/pages/device_list.php?project_id=${e}&type=All&typeCode=${types}`).then((e=>e.data))},GetServerScope(e){return r().get(`${n}/api/plugins/telemetry/DEVICE/`+e+"/values/attributes/SERVER_SCOPE",{headers:{"X-Authorization":"Bearer "+localStorage.getItem("token")}}).then((e=>e.data))},GetSharedScope(e){return r().get(`${n}/api/plugins/telemetry/DEVICE/`+e+"/values/attributes/SHARED_SCOPE",{headers:{"X-Authorization":"Bearer "+localStorage.getItem("token")}}).then((e=>e.data))},SetServerScope(e,t){return r().post(`${n}/api/plugins/telemetry/DEVICE/`+e+"/SERVER_SCOPE",t,{headers:{"X-Authorization":"Bearer "+localStorage.getItem("token")}}).then((e=>e.data))},SetSharedScope(e,t){return r().post(`${n}/api/plugins/telemetry/DEVICE/`+e+"/SHARED_SCOPE",t,{headers:{"X-Authorization":"Bearer "+localStorage.getItem("token")}}).then((e=>e.data))},GetStatusOverview(e,t){return r().get(`${l}/data/pages/sensor_overview.php?project_id=${e}&type=${t}`).then((e=>e.data))},FindDevice(e){return r().get(`${l}/data/pages/find_device.php?searchinfo=${e}`).then((e=>e.data))},FixDashboardIssue(e,t){let a=[t];return r().post(`${n}/api/dashboard/${e}/customers`,a,{headers:{"X-Authorization":"Bearer "+localStorage.getItem("token")}}).then((e=>e.data))},FixDashboardUrl(e,t){let a={};return a["dashboard-url"]=`${n}/dashboards/${e}?publicId=${t}`,r().post(`${n}/api/plugins/telemetry/DEVICE/`+e+"/SERVER_SCOPE",a,{headers:{"X-Authorization":"Bearer "+localStorage.getItem("token")}}).then((e=>e.data))},SetDashboard(e){return r().post(`${n}/api/dashboard`,e,{headers:{"X-Authorization":"Bearer "+localStorage.getItem("token")}}).then((e=>e.data))}}},7526:function(e,t,a){var o=a(6265),r=a.n(o);const n="http://10.232.176.34:8080",l="http://10.232.176.34";t["Z"]={DebugAisInfo(){return r().get(`${l}/data/pages/dev_device_list.php?project_id=245306e0-15f3-11ec-aa9a-51d72ec5acff&type=All`).then((e=>e.data))},ReuseInfo(e,t){return r().get(`${l}/data/pages/reuse_list.php?project_id=${t}&type=${e}`).then((e=>e.data))},ReuseInfoX(e,t){let a="";return a="A-Box"==e?"10000":"W-Box"==e?"01000":"VA-Box"==e?"00100":"R-Box"==e?"00010":"TH-Box"==e?"00001":"11111",r().get(`${l}/data/pages/reuse_list_ii.php?project_id=${t}&typeCode=${a}`).then((e=>e.data))},GetListScope(e){return r().get(`${n}/api/plugins/telemetry/DEVICE/`+e+"/values/attributes/SERVER_SCOPE",{headers:{"X-Authorization":"Bearer "+localStorage.getItem("token")}}).then((e=>e.data))},SetServerScope(e,t){return r().post(`${n}/api/plugins/telemetry/DEVICE/`+e+"/SERVER_SCOPE",t,{headers:{"X-Authorization":"Bearer "+localStorage.getItem("token")}}).then((e=>e.data))}}},5718:function(e,t,a){a.d(t,{Yf:function(){return P}});var o=a(4870),r=a(3396),n=a(9242),l=a(7139);Object.defineProperty,Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;const i="undefined"!==typeof window;function s(e,t="px"){return null==e||""===e?void 0:isNaN(+e)?String(e):isFinite(+e)?`${Number(e)}${t}`:void 0}const d=e=>{if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const t=window.getComputedStyle(e);return["auto","scroll"].includes(t.overflowY)&&e.scrollHeight>e.clientHeight},u=(e,t)=>0===e.scrollTop&&t<0||e.scrollTop+e.clientHeight===e.scrollHeight&&t>0,c=(e,t)=>{const a=e.composedPath(),o=e.deltaY;for(let r=0;r<a.length;r++){const e=a[r];if(e===document)return!0;if(e===document.documentElement)return!0;if(e===t)return!0;if(d(e))return u(e,o)}return!0},p=()=>{const e=document.createElement("div");e.style.visibility="hidden",e.style.overflow="scroll";const t=document.createElement("div");e.appendChild(t),document.body.appendChild(e);const a=e.offsetWidth-t.offsetWidth;return document.body.removeChild(e),a},g=(0,o.iH)([]);function h(e){const t=(0,r.FN)();let a;(0,r.YP)(e,(e=>{e?(a=(0,o.B)(),a.run((()=>{g.value.push(t),(0,o.EB)((()=>{const e=g.value.indexOf(t);g.value.splice(e,1)}))}))):null==a||a.stop()}),{immediate:!0});const n=(0,r.Fl)((()=>(0,o.IU)(g.value[g.value.length-1])===t));return{isTop:n}}const v=(0,o.iH)([]),m=1e3;function y(e){const t=(0,r.FN)().uid,a=(0,o.iH)(0);return(0,r.YP)(e,(e=>{e?(v.value.push(t),a.value=m+2*(v.value.indexOf(t)+1)):v.value=v.value.filter((e=>e!==t))}),{immediate:!0}),{zIndex:a}}const f=e=>{const t=(0,o.iH)(!1),a=(0,o.iH)(!1);return e.value&&(t.value=!0,(0,r.Y3)((()=>{a.value=!0}))),(0,r.YP)(e,(e=>{if(!t.value)return t.value=!0,void(0,r.Y3)((()=>{a.value=e}));a.value=e})),{activatedOnce:t,active:a}},b=({overlay:e,content:t,contentActiveClass:a,fullscreen:o,contentFullscreenClass:r})=>{if(!i)return{disableScroll:()=>{},enableScroll:()=>{}};let n,l=!1;const s=a=>{(a.target===e.value||a.target===document.body||c(a,t.value))&&a.preventDefault()},d=p(),u=0===d,g=()=>{l||(u||o?(n="byOverflow",document.documentElement.classList.add("overflow-y-hidden")):(n="byEvents",window.addEventListener("wheel",s,{passive:!1})),l=!0)},h=()=>{if(l){if("byEvents"===n)window.removeEventListener("wheel",s);else if("byOverflow"===n){const e=document.getElementsByClassName(a),t=document.getElementsByClassName(r);(!u&&o&&1===t.length||1===e.length)&&document.documentElement.classList.remove("overflow-y-hidden")}l=!1}};return{disableScroll:g,enableScroll:h}};function w(e,t,a){(0,r.bv)((()=>{window.addEventListener(e,t,a)})),(0,r.Ah)((()=>{window.removeEventListener(e,t)}))}var S=(e,t)=>{const a=e.__vccOpts||e;for(const[o,r]of t)a[o]=r;return a};const k=(0,r.aZ)({name:"GDialogOverlay",props:{active:{type:Boolean,required:!0},zIndex:{type:Number,required:!0},background:{type:[Boolean,String],required:!0},local:{type:Boolean,required:!0}},emits:["click"],setup(e,{emit:t}){const a=(0,r.Fl)((()=>({zIndex:e.zIndex-1}))),n=(0,o.iH)(e.active),l=(0,o.iH)(!1);(0,r.YP)((()=>e.active),(e=>{l.value=!e,e?n.value=!0:(0,r.Y3)((()=>{n.value=!1}))}));const i=(0,r.Fl)((()=>["g-dialog-overlay",{"g-dialog-overlay--active":!l.value,"g-dialog-overlay--local":e.local}])),s=(0,r.Fl)((()=>"string"===typeof e.background?e.background:e.background?"var(--overlay-bg)":"transparent")),d=()=>{t("click")};return{activeProxy:n,styles:a,classes:i,computedBackground:s,onClick:d}}}),C=()=>{(0,n.sj)((e=>({"6eaca59a":e.computedBackground})))},B=k.setup;k.setup=B?(e,t)=>(C(),B(e,t)):C;const E=k;function $(e,t,a,o,i,s){return(0,r.wg)(),(0,r.j4)(n.uT,{name:"fade"},{default:(0,r.w5)((()=>[e.activeProxy?((0,r.wg)(),(0,r.iD)("div",{key:0,class:(0,l.C_)(e.classes),style:(0,l.j5)(e.styles),onClick:t[0]||(t[0]=(...t)=>e.onClick&&e.onClick(...t))},null,6)):(0,r.kq)("",!0)])),_:1})}var I=S(E,[["render",$]]);const x=e=>{const t=(0,r.Fl)((()=>({maxWidth:"none"===e.maxWidth?void 0:s(e.maxWidth),width:"auto"===e.width?void 0:s(e.width),height:"auto"===e.height?void 0:s(e.height)})));return{sizeStyles:t}};const _=(0,r.aZ)({name:"GDialogContent",props:{background:{type:[Boolean,String],required:!0},borderRadius:{type:[Boolean,Number,String],required:!0},class:{type:String,required:!0},depressed:{type:Boolean,required:!0},fullscreen:Boolean,height:{type:[String,Number],required:!0},maxWidth:{type:[String,Number],required:!0},scrollable:{type:Boolean,required:!0},width:{type:[String,Number],required:!0}},setup(e){const{sizeStyles:t}=x(e),a=(0,r.Fl)((()=>["g-dialog-content",e.class,{"g-dialog-content--scrollable":e.scrollable,"g-dialog-content--depressed":e.depressed,"g-dialog-content--fullscreen":e.fullscreen}])),o=(0,r.Fl)((()=>"string"===typeof e.background?e.background:e.background?"var(--content-bg)":"transparent")),n=(0,r.Fl)((()=>"string"===typeof e.borderRadius?s(e.borderRadius):e.borderRadius?"var(--content-border-radius)":"0"));return{styles:t,classes:a,computedBackground:o,computedBorderRadius:n}}}),D=()=>{(0,n.sj)((e=>({"889a571a":e.computedBackground,"023a843a":e.computedBorderRadius})))},A=_.setup;_.setup=A?(e,t)=>(D(),A(e,t)):D;const O=_;function z(e,t,a,o,n,i){return(0,r.wg)(),(0,r.iD)("div",{class:(0,l.C_)(e.classes),style:(0,l.j5)(e.styles)},[(0,r.WI)(e.$slots,"default")],6)}var R=S(O,[["render",z]]);const N=(0,r.aZ)({name:"GDialogFrame",components:{GDialogContent:R},inheritAttrs:!1,props:{isActive:{type:Boolean,required:!0},zIndex:{type:Number,required:!0},background:{type:[Boolean,String],required:!0},borderRadius:{type:[Boolean,Number,String],required:!0},contentClass:{type:String,required:!0},depressed:{type:Boolean,required:!0},fullscreen:{type:Boolean,required:!0},height:{type:[String,Number],required:!0},local:{type:Boolean,required:!0},maxWidth:{type:[String,Number],required:!0},scrollable:{type:Boolean,required:!0},transition:{type:String,required:!0},width:{type:[String,Number],required:!0}},setup(e){const t=(0,o.iH)(),a=()=>{var e,a;null==(a=null==(e=t.value)?void 0:e.animate)||a.call(e,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:"cubic-bezier(0.4, 0, 0.2, 1)"})},n=(0,r.Fl)((()=>["g-dialog-frame",{"g-dialog-frame--active":e.isActive,"g-dialog-frame--local":e.local}])),l=(0,r.Fl)((()=>({zIndex:e.zIndex})));return{frameElement:t,classes:n,styles:l,animateClick:a}}});function q(e,t,a,o,i,s){const d=(0,r.up)("GDialogContent");return(0,r.wg)(),(0,r.j4)(n.uT,{name:e.transition},{default:(0,r.w5)((()=>[(0,r.wy)((0,r._)("div",{ref:"frameElement",class:(0,l.C_)(e.classes),style:(0,l.j5)(e.styles)},[(0,r.Wm)(d,{class:(0,l.C_)(e.contentClass),"max-width":e.maxWidth,width:e.width,height:e.height,scrollable:e.scrollable,depressed:e.depressed,fullscreen:e.fullscreen,background:e.background,"border-radius":e.borderRadius},{default:(0,r.w5)((()=>[(0,r.WI)(e.$slots,"default")])),_:3},8,["class","max-width","width","height","scrollable","depressed","fullscreen","background","border-radius"])],6),[[n.F8,e.isActive]])])),_:3},8,["name"])}var F=S(N,[["render",q]]);const j=(0,r.aZ)({name:"GDialog",components:{GDialogOverlay:I,GDialogFrame:F},inheritAttrs:!1,props:{background:{type:[Boolean,String],default:!0},borderRadius:{type:[Boolean,Number,String],default:!0},contentClass:{type:String,default:""},depressed:Boolean,fullscreen:Boolean,height:{type:[String,Number],default:"auto"},local:Boolean,maxWidth:{type:[String,Number],default:"none"},modelValue:Boolean,noClickAnimation:Boolean,overlayBackground:{type:[Boolean,String],default:!0},persistent:Boolean,scrollable:Boolean,teleportTo:{type:String,default:"body"},disableTeleport:Boolean,transition:{type:String,default:"g-dialog-transition"},width:{type:[String,Number],default:"auto"},closeOnBack:{type:Boolean,default:!1}},emits:{"update:modelValue":e=>!0},setup(e,{emit:t}){const a=(0,o.iH)(null),n=(0,o.iH)(null),l=(0,r.Fl)((()=>{var e;return null==(e=a.value)?void 0:e.$el})),s=(0,r.Fl)((()=>{var e;return null==(e=n.value)?void 0:e.$el})),d=(0,o.iH)(!1),{isTop:u}=h(d);i&&e.modelValue&&(0,r.Y3)((()=>{d.value=!0})),(0,r.YP)((()=>e.modelValue),(e=>{d.value=e}));const c=()=>{d.value=!1,t("update:modelValue",!1)},p=()=>{d.value=!0,t("update:modelValue",!0)},{activatedOnce:g,active:v}=f(d),{zIndex:m}=y(v),S=()=>{var t;e.noClickAnimation||null==(t=n.value)||t.animateClick()};w("keyup",(t=>{"Escape"===t.key&&u.value&&(e.persistent?S():c())}),{passive:!0});const{enableScroll:k,disableScroll:C}=b({overlay:l,content:s,contentActiveClass:"g-dialog-frame--active",fullscreen:e.fullscreen,contentFullscreenClass:"g-dialog-frame--fullscreen"});(0,r.YP)(v,(t=>{e.local||(t?C():k())})),(0,r.Jd)((()=>{k()}));const B=()=>{e.persistent?S():c()};if(i&&e.closeOnBack){const e=(0,r.FN)();let t=`dialog-${e.uid}`;window.location.hash&&(t=`${window.location.hash.slice(1)}-${t}`);const a=()=>{!window.location.hash.includes(t)&&d.value&&c()};(0,r.bv)((()=>{d.value&&(window.location.hash=t),window.addEventListener("popstate",a)})),(0,r.Ah)((()=>{window.removeEventListener("popstate",a)})),(0,r.YP)(d,(a=>{!a&&window.location.hash.includes(t)?window.history.back():a&&(t=window.location.hash?`${window.location.hash.slice(1)}-dialog-${e.uid}`:`dialog-${e.uid}`,window.location.hash=`#${t}`)}))}const E={onClick(){p()}};return{overlayComponent:a,frameComponent:n,activatedOnce:g,zIndex:m,isActive:v,activatorAttrs:E,onClickOutside:B,onClose:c}}});function H(e,t,a,o,n,i){const s=(0,r.up)("GDialogOverlay"),d=(0,r.up)("GDialogFrame");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r.WI)(e.$slots,"activator",(0,l.vs)((0,r.F4)(e.activatorAttrs))),e.activatedOnce?((0,r.wg)(),(0,r.iD)(r.HY,{key:0},[((0,r.wg)(),(0,r.j4)(r.lR,{to:e.teleportTo,disabled:e.local||e.disableTeleport},[e.fullscreen?(0,r.kq)("",!0):((0,r.wg)(),(0,r.j4)(s,{key:0,ref:"overlayComponent",active:e.isActive,"z-index":e.zIndex,background:e.overlayBackground,local:e.local,onClick:e.onClickOutside},null,8,["active","z-index","background","local","onClick"]))],8,["to","disabled"])),((0,r.wg)(),(0,r.j4)(r.lR,{to:e.teleportTo,disabled:e.local||e.disableTeleport},[(0,r.Wm)(d,{ref:"frameComponent","is-active":e.isActive,"z-index":e.zIndex,"max-width":e.maxWidth,width:e.width,height:e.height,scrollable:e.scrollable,transition:e.transition,depressed:e.depressed,fullscreen:e.fullscreen,background:e.background,"border-radius":e.borderRadius,"content-class":e.contentClass,local:e.local,persistent:e.persistent},{default:(0,r.w5)((()=>[(0,r.WI)(e.$slots,"default",{onClose:e.onClose})])),_:3},8,["is-active","z-index","max-width","width","height","scrollable","transition","depressed","fullscreen","background","border-radius","content-class","local","persistent"])],8,["to","disabled"]))],64)):(0,r.kq)("",!0)],64)}var P=S(j,[["render",H]]);(0,o.Um)([]);const V={pluginIsNotInitialized(){console.error("The gitart-vue-dialog plugin is not initialized. Read how to solve: https://gitart-vue-dialog.gitart.org/guide/usage/plugin-usage.html#installation")}},W=Symbol("GDialog"),T={dialogs:[],addDialog:()=>{V.pluginIsNotInitialized()},removeDialog:()=>{V.pluginIsNotInitialized()}};(0,r.aZ)({name:"GDialogRoot",setup(){const{dialogs:e,removeDialog:t}=(0,r.f3)(W,T);function a(e){t(e)}return e===T.dialogs&&V.pluginIsNotInitialized(),{dialogs:e,onClose:a}}})}}]);
//# sourceMappingURL=645.e77e0ab2.js.map