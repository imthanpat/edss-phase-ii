"use strict";(self["webpackChunkedss_vue_ii"]=self["webpackChunkedss_vue_ii"]||[]).push([[872],{1745:function(e,t,a){a.d(t,{Z:function(){return r}});var l=a(8086),s=a(7503);function r(e){(0,s.Z)(1,arguments);var t=(0,l.Z)(e),a=t.getMonth();return t.setFullYear(t.getFullYear(),a+1,0),t.setHours(23,59,59,999),t}},2292:function(e,t,a){a.d(t,{Z:function(){return r}});var l=a(8086),s=a(7503);function r(e){(0,s.Z)(1,arguments);var t=(0,l.Z)(e);return t.setDate(1),t.setHours(0,0,0,0),t}},5170:function(e,t,a){var l=a(6265),s=a.n(l);const r="http://10.232.176.34";t["Z"]={PhpDeviceAlarmLogList(){return s().get(`${r}/data/pages/device_alarm_logs.php`).then((e=>e.data))},PhpDeviceAlarmLogListV2(e,t,a,l,o,i,n){return s().get(`${r}/data/pages/dev_device_alarm_logs.php?startDate=`+o+"&endDate="+i+"&page="+e+"&limit="+t+"&sortBy="+a+"&sortType="+l+"&typeCode="+n).then((e=>e.data))},PhpStackedBarChartInfo(e,t,a){return s().get(`${r}/data/pages/calculate_device_alarm_logs.php?startDate=`+e+"&endDate="+t+"&typeCode="+a).then((e=>e.data))},PhpFmAlarmLogList(e,t,a,l,o,i,n){return s().get(`${r}/data/pages/dev_fm_alarm_logs.php?startDate=`+o+"&endDate="+i+"&page="+e+"&limit="+t+"&sortBy="+a+"&sortType="+l+"&typeCode="+n).then((e=>e.data))},PhpStackedBarChartFmInfo(e,t,a){return s().get(`${r}/data/pages/calculate_fm_alarm_logs.php?startDate=`+e+"&endDate="+t+"&typeCode="+a).then((e=>e.data))}}},872:function(e,t,a){a.r(t),a.d(t,{default:function(){return z}});var l=a(3396),s=a(7139),r=a(6853),o=a(3238),i=a(1222),n=a(1037),d=a(9234),m=a(3369),u=a(6824),c=a(8521),p=a(240),h=a(6269),g=a(7471),v=a(5030);const f=(0,l._)("h6",{class:"text-h6",style:{color:"white"}}," False Managemeter Alarm Logs ",-1),b=(0,l.Uk)(" "),_=["onClick"],x=(0,l.Uk)(" "),w=(0,l.Uk)(" "),y=(0,l.Uk)(" submit "),C=(0,l.Uk)(" Clear "),D={class:"d-flex justify-center"},F=(0,l._)("canvas",{class:"ma-12",id:"myChart"},null,-1),B={style:{display:"flex"}},k={class:"text-left mt-2 mb-2"},W=(0,l._)("span",{class:"text-subtitle-2"},"Total Information(s) : ",-1),S=(0,l.Uk)(" CSV Export ");function E(e,t,a,E,A,V){const I=(0,l.up)("Datepicker"),Z=(0,l.up)("EasyDataTable");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l.Wm)(o._,{class:"mb-2"},{default:(0,l.w5)((()=>[(0,l.Wm)(g.iv,{color:"grey darken-4",style:{"background-color":"rgb(72, 73, 71) !important"}},{default:(0,l.w5)((()=>[(0,l.Wm)(v.q,null,{default:(0,l.w5)((()=>[f])),_:1}),(0,l.Wm)(d.C)])),_:1}),(0,l.Wm)(m.K,null,{default:(0,l.w5)((()=>[(0,l.Wm)(u.o,{"no-gutters":""},{default:(0,l.w5)((()=>[(0,l.Wm)(c.D,{cols:"2",class:"pa-2"},{default:(0,l.w5)((()=>[(0,l.Wm)(p.r,{modelValue:A.selected,"onUpdate:modelValue":t[0]||(t[0]=e=>A.selected=e),items:A.selSearch,"item-title":"txt","item-value":"val",label:"Select","persistent-hint":"","return-object":"","single-line":""},null,8,["modelValue","items"])])),_:1}),(0,l.Wm)(c.D,{cols:"6",class:"pa-2"},{default:(0,l.w5)((()=>[(0,l.Wm)(h.h,{modelValue:e.name,"onUpdate:modelValue":t[1]||(t[1]=t=>e.name=t),counter:255,rules:e.nameRules,label:"Search text",required:""},null,8,["modelValue","rules"])])),_:1})])),_:1}),(0,l.Wm)(u.o,{"no-gutters":""},{default:(0,l.w5)((()=>[(0,l.Wm)(c.D,{cols:"2"},{default:(0,l.w5)((()=>[b])),_:1}),(0,l.Wm)(c.D,{cols:"6",class:"pa-2"},{default:(0,l.w5)((()=>[(0,l.Wm)(I,{modelValue:A.date,"onUpdate:modelValue":t[2]||(t[2]=e=>A.date=e),range:"",presetRanges:A.presetRanges,placeholder:"Select Date"},{yearly:(0,l.w5)((({label:e,range:t,presetDateRange:a})=>[(0,l._)("span",{onClick:e=>a(t)},(0,s.zw)(e),9,_)])),_:1},8,["modelValue","presetRanges"])])),_:1})])),_:1}),(0,l.Wm)(u.o,{"no-gutters":""},{default:(0,l.w5)((()=>[(0,l.Wm)(c.D,{cols:"2"},{default:(0,l.w5)((()=>[x])),_:1}),(0,l.Wm)(c.D,{cols:"6",class:"pa-2"},{default:(0,l.w5)((()=>[(0,l.Wm)(u.o,{"no-gutters":""},{default:(0,l.w5)((()=>[(0,l.Wm)(c.D,null,{default:(0,l.w5)((()=>[(0,l.Wm)(i.x,{modelValue:A.typefilter.abox,"onUpdate:modelValue":t[3]||(t[3]=e=>A.typefilter.abox=e),label:"A-Box","hide-details":""},null,8,["modelValue"])])),_:1}),(0,l.Wm)(c.D,null,{default:(0,l.w5)((()=>[(0,l.Wm)(i.x,{modelValue:A.typefilter.wbox,"onUpdate:modelValue":t[4]||(t[4]=e=>A.typefilter.wbox=e),label:"W-Box","hide-details":""},null,8,["modelValue"])])),_:1}),(0,l.Wm)(c.D,null,{default:(0,l.w5)((()=>[(0,l.Wm)(i.x,{modelValue:A.typefilter.vabox,"onUpdate:modelValue":t[5]||(t[5]=e=>A.typefilter.vabox=e),label:"VA-Box","hide-details":""},null,8,["modelValue"])])),_:1}),(0,l.Wm)(c.D,null,{default:(0,l.w5)((()=>[(0,l.Wm)(i.x,{modelValue:A.typefilter.rbox,"onUpdate:modelValue":t[6]||(t[6]=e=>A.typefilter.rbox=e),label:"R-Box","hide-details":""},null,8,["modelValue"])])),_:1}),(0,l.Wm)(c.D,null,{default:(0,l.w5)((()=>[(0,l.Wm)(i.x,{modelValue:A.typefilter.thbox,"onUpdate:modelValue":t[7]||(t[7]=e=>A.typefilter.thbox=e),label:"TH-Box","hide-details":""},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1}),(0,l.Wm)(u.o,{"no-gutters":""},{default:(0,l.w5)((()=>[(0,l.Wm)(c.D,{cols:"2"},{default:(0,l.w5)((()=>[w])),_:1}),(0,l.Wm)(c.D,{cols:"6",class:"pa-2"},{default:(0,l.w5)((()=>[(0,l.Wm)(r.T,{onClick:V.submitSearch,color:"success",disabled:!1},{default:(0,l.w5)((()=>[y])),_:1},8,["onClick"]),(0,l.Wm)(r.T,{class:"ml-4",onClick:V.resetEvent},{default:(0,l.w5)((()=>[C])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})])),_:1}),(0,l._)("div",D,[(0,l.kq)("",!0)]),(0,l.Wm)(u.o,{"no-gutters":""},{default:(0,l.w5)((()=>[(0,l.Wm)(c.D,{cols:"12",class:"pl-16 pr-16"},{default:(0,l.w5)((()=>[F])),_:1}),(0,l.Wm)(c.D,{cols:"12",class:"pa-2"},{default:(0,l.w5)((()=>[(0,l._)("div",B,[(0,l._)("p",k,[W,(0,l.Wm)(n.v,{size:"small"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(A.serverItemsLength),1)])),_:1})]),(0,l.Wm)(d.C),(0,l.Wm)(r.T,{"prepend-icon":"mdi-file-excel-outline",size:"small",variant:"outlined",color:"success",onClick:V.exportExcel},{default:(0,l.w5)((()=>[S])),_:1},8,["onClick"])]),(0,l.Wm)(Z,{style:{"white-space":"nowrap"},"rows-items":[10,25,50,100],"server-options":A.serverOptions,"onUpdate:server-options":t[8]||(t[8]=e=>A.serverOptions=e),"server-items-length":A.serverItemsLength,loading:A.serveSideloading,headers:A.headers,items:A.items,"buttons-pagination":""},{"item-device_name":(0,l.w5)((e=>[(0,l._)("strong",null,(0,s.zw)(e.device_name),1)])),"item-alarm_status":(0,l.w5)((e=>["Create Alarm"==e.alarm_status.trim()?((0,l.wg)(),(0,l.j4)(n.v,{key:0,size:"small",color:"error"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(e.alarm_status),1)])),_:2},1024)):(0,l.kq)("",!0),"Clear Alarm"==e.alarm_status.trim()?((0,l.wg)(),(0,l.j4)(n.v,{key:1,size:"small",color:"success"},{default:(0,l.w5)((()=>[(0,l.Uk)((0,s.zw)(e.alarm_status),1)])),_:2},1024)):(0,l.kq)("",!0)])),_:1},8,["server-options","server-items-length","loading","headers","items"])])),_:1})])),_:1})],64)}var A=a(5229),V=a(5170),I=a(45),Z=a(2292),L=a(1745),T=a(4253),U=a(4531),j=a.n(U);let O=null;var P={components:{EasyDataTable:A.Z,Datepicker:I.Z},data(){return{isDisable:!0,loading:!1,date:[new Date((new Date).setHours(0,0,0,0)),new Date],presetRanges:[{label:"Today",range:[new Date((new Date).setHours(0,0,0,0)),new Date]},{label:"This month",range:[(0,Z.Z)(new Date),(0,L.Z)(new Date)]},{label:"Last month",range:[(0,Z.Z)((0,T.Z)(new Date,1)),(0,L.Z)((0,T.Z)(new Date,1))]},{label:"Last 3 month",range:[(0,Z.Z)((0,T.Z)(new Date,3)),(0,L.Z)(new Date)]}],headers:[{text:"Event Id",value:"id",sortable:!0},{text:"Device Type",value:"device_type",sortable:!0},{text:"None Mobile",value:"none_mobile",sortable:!0},{text:"Device Name",value:"device_name",sortable:!0},{text:"Customer Site Code",value:"addr"},{text:"Project",value:"project"},{text:"Alarm Message",value:"alarm_msg"},{text:"Alarm Status",value:"alarm_status"},{text:"Timestamp",value:"timestamp"}],items:[],selSearch:[{txt:"All",val:"all"},{txt:"DeviceType",val:"device_type"},{txt:"NoneMobile",val:"none_mobile"},{txt:"DeviceName",val:"device_name"},{txt:"Customer Site Code",val:"addr"}],selected:{txt:"All",val:"all"},typefilter:{abox:!0,wbox:!0,vabox:!0,rbox:!0,thbox:!0},serveSideloading:!0,serverOptions:{page:1,rowsPerPage:10,sortBy:"id",sortType:"desc"},serverItemsLength:0}},methods:{resetEvent(){this.typefilter={abox:!0,wbox:!0,vabox:!0,rbox:!0,thbox:!0},this.date=[new Date((new Date).setHours(0,0,0,0)),new Date],this.submitSearch()},createChart(){let e={labels:["A-Box","W-Box","VA-Box","R-Box","TH-Box"],datasets:[{label:"A-box",data:[0,0,0],backgroundColor:"#FF6633"},{label:"R-Box",data:[0,0,0],backgroundColor:"#FF33FF"}]},t={type:"bar",data:e,options:{plugins:{title:{display:!1,text:"Chart.js Bar Chart - Stacked"},legend:{position:"bottom",align:"center"}},responsive:!0,scales:{x:{stacked:!0},y:{stacked:!0}}}},a=document.getElementById("myChart"),l=new(j())(a);void 0!=l&&l.destroy(),O=new(j())(document.getElementById("myChart"),t),document.getElementById("myChart").style.display="none"},updateChart(e,t){O.config.data.datasets=t,O.config.data.labels=e,O.update(),document.getElementById("myChart").style.display=""},toStrCsv(e){let t="";return e.forEach((e=>{let a="";a+=e.addr+",",a+=e.alarm_msg+",",a+=e.alarm_status+",",a+=e.device_name.replace(/,/g,"")+",",a+=e.device_type+",",a+=e.id+",",a+=e.imei+",",a+=e.none_mobile+",",a+=e.project+",",a+=e.timestamp,t+=a+"\r\n"})),t},exportCSVFile(e,t,a){e&&t.unshift(e);let l=this.toStrCsv(t);var s=a+".csv"||0,r=new Blob([l],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(r,s);else{var o=document.createElement("a");if(void 0!==o.download){var i=URL.createObjectURL(r);o.setAttribute("href",i),o.setAttribute("download",s),o.style.visibility="hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o)}}},exportExcel(){let e=this.date[0].toISOString(),t=this.date[1].toISOString(),a=this.typefilter.abox?"1":"0",l=this.typefilter.wbox?"1":"0",s=this.typefilter.vabox?"1":"0",r=this.typefilter.rbox?"1":"0",o=this.typefilter.thbox?"1":"0",i=""+a+l+s+r+o;V.Z.PhpDeviceAlarmLogListV2(1,this.serverItemsLength,this.serverOptions.sortBy,this.serverOptions.sortType,e,t,i).then((e=>{let t={addr:"Customer Site Code",alarm_msg:"Alarm Message",alarm_status:"Alarm Status",device_name:"Device Name",device_type:"Device Type",id:"Event Id",imei:"IMEI",none_mobile:"None-Mobile",project:"Project",timestamp:"Timestamp"};this.exportCSVFile(t,e.data,"FM-log-export.csv")})).catch((e=>{console.log(e);let t=e.response.data;401==t.status&&11==t.errorCode&&(this.$swal.fire({icon:"error",title:"Error",text:t.message}),this.$router.push("/login"))}))},submitSearch(){this.loadInfo()},loadInfo(){let e=this.date[0].toISOString(),t=this.date[1].toISOString(),a=this.typefilter.abox?"1":"0",l=this.typefilter.wbox?"1":"0",s=this.typefilter.vabox?"1":"0",r=this.typefilter.rbox?"1":"0",o=this.typefilter.thbox?"1":"0",i=""+a+l+s+r+o;V.Z.PhpStackedBarChartFmInfo(e,t,i).then((e=>{console.log("Here!"),console.log(e),this.drawBarChart(e.data)})).catch((e=>{console.log(e)})),this.serveSideloading=!0,V.Z.PhpFmAlarmLogList(this.serverOptions.page,this.serverOptions.rowsPerPage,this.serverOptions.sortBy,this.serverOptions.sortType,e,t,i).then((e=>{this.serverItemsLength=e.cnt_all_rows,this.items=e.data,this.serveSideloading=!1})).catch((e=>{console.log(e);let t=e.response.data;401==t.status&&11==t.errorCode&&(this.$swal.fire({icon:"error",title:"Error",text:t.message}),this.$router.push("/login"))}))},drawBarChart(e){var t=["#FF6633","#FFB399","#FF33FF","#FFFF99","#00B3E6","#E6B333","#3366E6","#999966","#99FF99","#B34D4D","#80B300","#809900","#E6B3B3","#6680B3","#66991A","#FF99E6","#CCFF1A","#FF1A66","#E6331A","#33FFCC","#66994D","#B366CC","#4D8000","#B33300","#CC80CC","#66664D","#991AFF","#E666FF","#4DB3FF","#1AB399","#E666B3","#33991A","#CC9999","#B3B31A","#00E680","#4D8066","#809980","#E6FF80","#1AFF33","#999933","#FF3380","#CCCC00","#66E64D","#4D80CC","#9900B3","#E64D66","#4DB380","#FF4D4D","#99E6E6","#6666FF"];Array.prototype.getRandom=function(e){var t=Math.floor(Math.random()*this.length);return e&&t in this?this.splice(t,1)[0]:this[t]};let a=Array();console.log(e);let l=[];e.forEach((e=>{e.project&&-1===l.findIndex((t=>t===e.project))&&l.push(e.project)})),e.forEach(((s,r)=>{var o={};o.label=s.alarm_msg,o.data=[],l.forEach(((t,a)=>{o.data[a]=void 0===e.filter((e=>e.alarm_msg==s.alarm_msg&&e.project==t))[0]?0:parseInt(e.filter((e=>e.alarm_msg==s.alarm_msg&&e.project==t))[0].alarm_status)})),-1===a.findIndex((e=>e.label===o.label))&&("AC Line Down"==o.label?o.backgroundColor="#36a2eb":"Dead"==o.label?o.backgroundColor="rgb(255, 99, 132)":"Relay Off"==o.label?o.backgroundColor="rgb(255, 159, 64)":o.backgroundColor=t.getRandom(),a.push(o))})),this.updateChart(l,a)}},watch:{serverOptions(e){this.loadInfo()}},mounted(){this.createChart(),this.loadInfo()}},R=a(89);const M=(0,R.Z)(P,[["render",E]]);var z=M}}]);
//# sourceMappingURL=872.e0a28628.js.map