(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{SNLP:function(e,t,a){"use strict";a.r(t),a.d(t,"dataToSpreadSheet",(function(){return ee}));a("E9XD");var n=a("q1tI"),r=a.n(n),l=a("QkK5"),i=a("raqg"),o=a("ofer"),u=a("tRbT"),c=a("30+C"),s=a("oa/T"),d=a("Z3vd"),m=a("dfam"),p=a("JrkS"),h=a("r9w1"),v=a("jjAL"),f=a("bzer"),g=a("t6b9"),y=a("tBK6"),E=a("72gv"),b=a("o6j4"),x=a("Zxox"),O=a.n(x),w=function(e){var t=e.dispatch,a=e.headings,n=e.state,l=e.onDeleteData,i=e.onAddData,o=e.spreadSheetData;return r.a.createElement("div",null,r.a.createElement(d.a,{variant:"contained",color:"secondary",onClick:i},"Add"),r.a.createElement(O.a,{data:o,valueRenderer:function(e){return e.value},sheetRenderer:function(e){return r.a.createElement("table",{className:e.className},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",{className:"action-cell"},"Bin"),a.map((function(e,t){return r.a.createElement("th",{key:e,className:"action-cell"},e,r.a.createElement(d.a,{size:"small",color:"secondary",onClick:function(){return l(t)}},"Delete"))})))),r.a.createElement("tbody",null,e.children))},onCellsChanged:function(e){e.forEach((function(e){e.cell;var t=e.row,a=e.col,r=e.value;0===a?n.data.bins[t]=r:n.data.counts[a-1].data[t]=Number(r)})),t({type:"setData",data:n.data})}}))},k=a("saXE"),L=a.n(k),S=a("KJax"),C=a("6Obz");function j(e){return e!==String(parseFloat(e))}var D=Object.getOwnPropertyNames?function(e){return Object.getOwnPropertyNames(e).filter((function(t){return e.propertyIsEnumerable(t)&&j(t)}))}:Object.keys?function(e){return Object.keys(e).filter(j)}:function(e){var t=[];for(var a in e)e.hasOwnProperty(a)&&e.propertyIsEnumerable(a)&&j(a)&&t.push(a);return t},T=function(){function e(e){this.enumObj=e,this.keysList=Object.freeze(D(e));for(var t=this.keysList.length,a=new Array(t),n=new Map,r=0;r<t;++r){var l=this.keysList[r],i=e[l];a[r]=i,n.set(i,l),this[r]=Object.freeze([l,i])}this.valuesList=Object.freeze(a),this.keysByValueMap=n,this.size=this.length=t,Object.freeze(this)}return e.prototype.toString=function(){return"[object EnumWrapper]"},e.prototype.keys=function(){var e,t=this,a=0;return(e={next:function(){var e={done:a>=t.length,value:t.keysList[a]};return++a,e}})[Symbol.iterator]=function(){return this},e},e.prototype.values=function(){var e,t=this,a=0;return(e={next:function(){var e={done:a>=t.length,value:t.valuesList[a]};return++a,e}})[Symbol.iterator]=function(){return this},e},e.prototype.entries=function(){var e,t=this,a=0;return(e={next:function(){var e={done:a>=t.length,value:t[a]};return++a,e}})[Symbol.iterator]=function(){return this},e},e.prototype[Symbol.iterator]=function(){return this.entries()},e.prototype.forEach=function(e,t){for(var a=this.length,n=0;n<a;++n){var r=this[n];e.call(t,r[1],r[0],this,n)}},e.prototype.map=function(e,t){for(var a=this.length,n=new Array(a),r=0;r<a;++r){var l=this[r];n[r]=e.call(t,l[1],l[0],this,r)}return n},e.prototype.getKeys=function(){return this.keysList.slice()},e.prototype.getValues=function(){return this.valuesList.slice()},e.prototype.getEntries=function(){return Array.prototype.slice.call(this)},e.prototype.indexOfKey=function(e){return this.keysList.indexOf(e)},e.prototype.indexOfValue=function(e){return this.valuesList.indexOf(e)},e.prototype.isKey=function(e){return null!=e&&j(e)&&this.enumObj.hasOwnProperty(e)},e.prototype.asKeyOrThrow=function(e){if(this.isKey(e))return e;throw new Error("Unexpected key: "+e+". Expected one of: "+this.getValues())},e.prototype.asKeyOrDefault=function(e,t){return this.isKey(e)?e:t},e.prototype.isValue=function(e){return null!=e&&this.keysByValueMap.has(e)},e.prototype.asValueOrThrow=function(e){if(this.isValue(e))return e;throw new Error("Unexpected value: "+e+". Expected one of: "+this.getValues())},e.prototype.asValueOrDefault=function(e,t){return this.isValue(e)?e:t},e.prototype.getKeyOrThrow=function(e){var t=null!=e?this.keysByValueMap.get(e):void 0;if(null!=t)return t;throw new Error("Unexpected value: "+e+". Expected one of: "+this.getValues())},e.prototype.getKeyOrDefault=function(e,t){var a=null!=e?this.keysByValueMap.get(e):void 0;return null!=a?a:t},e.prototype.getValueOrThrow=function(e){return this.enumObj[this.asKeyOrThrow(e)]},e.prototype.getValueOrDefault=function(e,t){return this.isKey(e)?this.enumObj[e]:t},e}();T.prototype[Symbol.toStringTag]="EnumWrapper";var A=Symbol("ts-enum-util:unhandledEntry"),P=Symbol("ts-enum-util:handleNull"),V=Symbol("ts-enum-util:handleUndefined"),N=Symbol("ts-enum-util:handleUnexpected");function H(e){return new Error("Unhandled value: "+e)}var I=function(){function e(e){this.value=e}return e.prototype.with=function(e){if(e.hasOwnProperty(this.value))return U(e[this.value],this.value);if(e[N])return U(e[N],this.value);throw new Error("Unexpected value: "+this.value)},e}(),G=function(){function e(){}return e.prototype.with=function(e){if(e[P])return U(e[P],null);if(e[N])return U(e[N],null);throw new Error("Unexpected value: null")},e}(),R=function(){function e(){}return e.prototype.with=function(e){if(e[V])return U(e[V],void 0);if(e[N])return U(e[N],void 0);throw new Error("Unexpected value: undefined")},e}();function U(e,t){if(e===A)throw H(t);return e(t)}var z=function(){function e(e){this.value=e}return e.prototype.with=function(e){if(e.hasOwnProperty(this.value))return B(e[this.value],this.value);if(e.hasOwnProperty(N))return B(e[N],this.value);throw new Error("Unexpected value: "+this.value)},e}(),K=function(){function e(){}return e.prototype.with=function(e){if(e.hasOwnProperty(P))return B(e[P],null);if(e.hasOwnProperty(N))return B(e[N],null);throw new Error("Unexpected value: null")},e}(),M=function(){function e(){}return e.prototype.with=function(e){if(e.hasOwnProperty(V))return B(e[V],void 0);if(e.hasOwnProperty(N))return B(e[N],void 0);throw new Error("Unexpected value: undefined")},e}();function B(e,t){if(e===A)throw H(t);return e}var F=new WeakMap;function W(e){var t=F.get(e);return t||(t=new T(e),F.set(e,t)),t}W.handleNull=P,W.handleUndefined=V,W.handleUnexpected=N,W.unhandledEntry=A,W.visitValue=function(e){return null===e?new G:void 0===e?new R:new I(e)},W.mapValue=function(e){return null===e?new K:void 0===e?new M:new z(e)};var X=function(e){var t=e.dispatch,a=e.values,n=W(g.a).map((function(e){return r.a.createElement(v.a,{key:e,value:e},String(e))}));return r.a.createElement(u.a,{container:!0},r.a.createElement(u.a,{item:!0,xs:12},r.a.createElement(d.a,{size:"small",color:"primary",onClick:function(){t({type:"setHoverModifier",key:"",index:Object.keys(a).length,value:0})}},"Add")),Object.keys(a).map((function(e,l){return r.a.createElement(u.a,{container:!0,key:e},r.a.createElement(u.a,{item:!0,xs:4},r.a.createElement(h.a,{key:e,select:!0,value:e,label:"Property",onChange:function(n){t({type:"setHoverModifier",key:n.target.value,index:l,value:parseFloat(a[e])})}},n)),r.a.createElement(u.a,{item:!0,xs:4},r.a.createElement(h.a,{defaultValue:a[e],label:"Value",onChange:function(a){t({type:"setHoverModifier",key:e,index:l,value:parseFloat(a.target.value)})}})),r.a.createElement(u.a,{item:!0,xs:4},r.a.createElement(d.a,{size:"small",color:"secondary",onClick:function(){t({type:"removeHoverModifier",index:l})}},"Delete")))})))},Z=a("kW/L"),J=function(e){var t=e.dispatch,a=e.state;return r.a.createElement(Z.a,null,r.a.createElement(u.a,{container:!0,spacing:5},r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement(h.a,{select:!0,label:"Group Layout",value:a.groupLayout,onChange:function(e){t({type:"setGroupedBarLayout",layout:Number(e.target.value)})}},r.a.createElement(v.a,{value:f.e.GROUPED},"Grouped"),r.a.createElement(v.a,{value:f.e.OVERLAID},"Overlaid"),r.a.createElement(v.a,{value:f.e.STACKED},"Stacked"))),r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement(h.a,{label:"Chart width",value:a.width,onChange:function(e){t({type:"setWidth",width:e.target.value})}})),r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement("label",null,"Grouped padding inner (0 - 1)"),r.a.createElement("input",{type:"number",min:0,max:1,step:.1,value:a.bar.grouped.paddingInner.toString(),onChange:function(e){t({type:"setGroupedPaddingInner",padding:parseFloat(e.target.value)})}}),r.a.createElement("div",null,r.a.createElement("small",null,"When rendered as grouped, this is the relative spacing between each bar in the group"))),r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement("label",null,"Grouped padding outer (0 - 1)"),r.a.createElement("input",{type:"number",min:0,step:.1,max:1,value:a.bar.grouped.paddingOuter.toString(),onChange:function(e){t({type:"setGroupedPaddingOuter",padding:parseFloat(e.target.value)})}}),r.a.createElement("div",null,r.a.createElement("small",null,"When rendered as grouped, this is the relative spacing at the start  and end of the group's bars"))),r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement("label",null,"Padding inner (0 - 1)"),r.a.createElement("input",{type:"number",min:0,max:1,step:.1,value:a.bar.paddingInner.toString(),onChange:function(e){t({type:"setPaddingInner",padding:parseFloat(e.target.value)})}}),r.a.createElement("div",null,r.a.createElement("small",null,"This is the relative padding for the inside of grouped datasets or single datasets"))),r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement("label",null,"Padding outer (0 - 1)"),r.a.createElement("input",{type:"number",min:0,step:.1,max:1,value:a.bar.paddingOuter.toString(),onChange:function(e){t({type:"setPaddingOuter",padding:parseFloat(e.target.value)})}}),r.a.createElement("small",null,"This is the relative padding for the outside of grouped datasets or single datasets")),r.a.createElement(X,{values:a.bar.hover,dispatch:t})))},Y=a("9Dj+"),q=a("H8eV"),Q=a("5++N"),$={axis:Q.a,bar:{grouped:{paddingInner:.1,paddingOuter:0},paddingInner:.1,paddingOuter:0,overlayMargin:.5,hover:{lighten:.1}},chartType:"Histogram",data:Q.b,delay:0,duration:800,grid:Q.d,groupLayout:g.b.GROUPED,width:"600"};function _(e,t){switch(t.type){case"setChartType":return void(e.chartType=t.chartType);case"setData":return void(e.data=t.data);case"setDuration":return void(e.duration=t.duration);case"setDelay":return void(e.delay=t.delay);case"setWidth":return void(e.width=t.width);case"setGroupedBarLayout":return void(e.groupLayout=t.layout);case"setGroupedPaddingInner":return void(e.bar.grouped.paddingInner=t.padding);case"setGroupedPaddingOuter":return void(e.bar.grouped.paddingOuter=t.padding);case"setPaddingInner":return void(e.bar.paddingInner=t.padding);case"setPaddingOuter":return void(e.bar.paddingOuter=t.padding);case"setHoverModifier":var a,n=Object.assign({},e.bar.hover),r=Object.keys(n);for(delete n[""],a=r.length;a>=0;a--)""===r[a]&&delete n[""];return delete n[Object.keys(n)[t.index]],n[t.key]=t.value,void(e.bar.hover=n);case"removeHoverModifier":var l=Object.assign({},e.bar.hover);return delete l[Object.keys(l)[t.index]],void(e.bar.hover=l)}}var ee=function(e){var t=[];return e.bins.forEach((function(e,a){t[a]||(t[a]=[]),t[a][0]={value:e}})),e.counts.forEach((function(e,a){e.data.forEach((function(e,n){t[n]||(t[n]=[]),t[n][a+1]={value:e}}))})),t},te=function(e){var t=e.dispatch,a=e.state;return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,null,r.a.createElement(u.a,{container:!0,spacing:3},r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement(h.a,{id:"xTicks",value:a.grid.x.ticks,label:"X Ticks",onChange:function(e){return t({type:"setGridTicks",axis:"x",ticks:Number(e.target.value)})}})),r.a.createElement(h.a,{id:"yTicks",value:a.grid.y.ticks,label:"Y Ticks",onChange:function(e){return t({type:"setGridTicks",axis:"y",ticks:Number(e.target.value)})}}),r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement(L.a,{value:a.grid.x.style.stroke,label:"Stroke color",onB:!0,onChange:function(e){return t({type:"setGridStroke",axis:"x",color:e})}})),r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement(S.a,null,r.a.createElement(o.a,null,"Opacity ",r.a.createElement("small",null,"(",a.grid.x.style["stroke-opacity"],")")),r.a.createElement(C.a,{value:a.grid.x.style["stroke-opacity"],"aria-labelledby":"label",step:.1,min:0,max:1,onChange:function(e,a){return t({type:"setGridStrokeOpacity",axis:"x",opacity:Number(a)})}}))))))},ae=function(e){var t=e.dispatch,a=e.state;return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,{elevation:3},r.a.createElement(s.a,null,r.a.createElement(o.a,{variant:"h6",gutterBottom:!0},"X Axis"),r.a.createElement(u.a,{container:!0,spacing:2},r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement(h.a,{label:"X Axis label direction",select:!0,defaultValue:a.axis.x.labelOrientation,onChange:function(e){t({type:"setLabelOrientation",axis:"x",value:e.target.value})}},r.a.createElement(v.a,{value:b.a.HORIZONTAL},"horizontal"),r.a.createElement(v.a,{value:b.a.VERTICAL},"vertical"))),r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement(h.a,{label:"X Axis Scale",select:!0,value:a.axis.x.scale,onChange:function(e){t({type:"setScale",axis:"x",value:e.target.value})}},r.a.createElement(v.a,{value:"LINEAR"},"Linear"),r.a.createElement(v.a,{value:"LOG"},"Log")))))),r.a.createElement("br",null),r.a.createElement(c.a,null,r.a.createElement(s.a,null,r.a.createElement(o.a,{variant:"h6",gutterBottom:!0},"Y Axis"),r.a.createElement(u.a,{container:!0,spacing:2},r.a.createElement(u.a,{item:!0,xs:6},r.a.createElement("p",null,"Not yet working on histograms"),r.a.createElement(h.a,{label:"Y Axis Scale",select:!0,value:a.axis.y.scale,onChange:function(e){return t({type:"setScale",axis:"y",value:e.target.value})}},r.a.createElement(v.a,{value:"LINEAR"},"Linear"),r.a.createElement(v.a,{value:"LOG"},"Log")))))))};t.default=function(){var e=Object(n.useState)(0),t=e[0],a=e[1],b=Object(i.a)(_,$),x=b[0],O=b[1],k=Object(E.a)("90%"),L=k[0],S=k[1],C=Object(n.useState)({}),j=C[0],D=C[1],T=ee(x.data),A={bins:Q.b.counts.map((function(e){return e.label})),counts:[{data:Q.b.counts.map((function(e){return e.data.reduce((function(e,t){return e+t}),0)})),label:""}]},P=Object(n.useState)(0),V=P[0],N=P[1],H=0===V?Q.e:Q.b;return r.a.createElement(Y.a,null,r.a.createElement(q.a,{title:"Histogram",description:""}),r.a.createElement(o.a,{variant:"h2"},"Histogram"),r.a.createElement("div",null,r.a.createElement(u.a,{container:!0,spacing:5,className:"wrapper"},r.a.createElement(u.a,{item:!0,xs:12,md:6},r.a.createElement(c.a,null,r.a.createElement(s.a,null,r.a.createElement("h2",null,"Bar Chart"),r.a.createElement("div",{ref:L},r.a.createElement(f.a,{animation:{duration:x.duration},showLabels:[!1,!0],direction:"HorizontalHistogram"===x.chartType?f.d.HORIZONTAL:f.d.VERTICAL,data:H,height:400,grid:x.grid,colorScheme:["#aaa","#aa0000"],groupLayout:x.groupLayout,xAxisLabelOrientation:x.axis.x.labelOrientation,width:S,visible:j})),r.a.createElement("h3",null,"Histogram"),r.a.createElement(g.c,{animation:{duration:x.duration},showLabels:[!0,!0],LabelComponent:function(e){var t=e.item,a=Object(n.createRef)();return r.a.createElement("g",{transform:"translate(0, -10)"},r.a.createElement("g",{ref:a},r.a.createElement("circle",{dy:10,r:4,fill:"red"}),r.a.createElement("text",{dx:"10"},t.percentage)),r.a.createElement(l.a,{key:"label-tip-"+t.datasetIndex+"."+t.label+"."+t.value,triggerRef:a},r.a.createElement("g",{transform:"translate(20, -10)"},r.a.createElement("text",{className:"label-tip-text"},"custom test tip test"))))},direction:"HorizontalHistogram"===x.chartType?f.d.HORIZONTAL:f.d.VERTICAL,data:Q.f,height:400,grid:x.grid,xAxisLabelOrientation:x.axis.x.labelOrientation,width:S,visible:j}),r.a.createElement(d.a,{onClick:function(){return N(1===V?0:1)}},"toggle data"),r.a.createElement(y.a,{theme:Q.g,data:A,onSelect:function(e){var t;D(Object.assign({},j,((t={})[e]=!!j.hasOwnProperty(e)&&!j[e],t)))},visible:j})))),r.a.createElement(u.a,{item:!0,xs:12,md:6},r.a.createElement(c.a,null,r.a.createElement(s.a,null,r.a.createElement(m.a,{value:t,onChange:function(e,t){return a(t)}},r.a.createElement(p.a,{label:"Data"}),r.a.createElement(p.a,{label:"Styling"}),r.a.createElement(p.a,{label:"Animation"}),r.a.createElement(p.a,{label:"Grid"}),r.a.createElement(p.a,{label:"Axes"})),0===t&&r.a.createElement(Z.a,null,r.a.createElement(u.a,{container:!0,spacing:5},r.a.createElement(u.a,{item:!0,xs:12,md:6},r.a.createElement(h.a,{select:!0,label:"Chart direction",value:x.chartType,onChange:function(e){O({type:"setChartType",chartType:e.target.value})}},r.a.createElement(v.a,{value:"Histogram"},"Histogram"),r.a.createElement(v.a,{value:"HorizontalHistogram"},"HorizontalHistogram")))),r.a.createElement(w,{dispatch:O,state:x,headings:x.data.counts.map((function(e,t){return e.label})),spreadSheetData:T,onDeleteData:function(e){var t=Object.assign({},x.data);t.counts=t.counts.filter((function(t,a){return a!==e})),t.counts.length>0&&O({type:"setData",data:t})},onAddData:function(){var e=Object.assign({},x.data),t={label:"dataset "+(e.counts.length+1),data:new Array(x.data.counts[0].data.length).fill(0)};e.counts.push(t),O({type:"setData",data:e})}})),1===t&&r.a.createElement(J,{dispatch:O,state:x}),2===t&&r.a.createElement(Z.a,null,r.a.createElement(u.a,{container:!0,spacing:5},r.a.createElement(u.a,{item:!0,xs:12,md:6},r.a.createElement(h.a,{id:"animationDuration",value:x.duration,label:"Duration",onChange:function(e){return O({type:"setDuration",duration:Number(e.target.value)})}})),r.a.createElement(u.a,{item:!0,xs:12,md:6},r.a.createElement(h.a,{id:"animationDelay",value:x.delay,label:"Delay",onChange:function(e){return O({type:"setDelay",delay:Number(e.target.value)})}})))),3===t&&r.a.createElement(Z.a,null,r.a.createElement(te,{dispatch:O,state:x})),4===t&&r.a.createElement(Z.a,null,r.a.createElement(ae,{dispatch:O,state:x}))))))))}}}]);
//# sourceMappingURL=component---src-pages-histogram-tsx-71cd379682142d695e5c.js.map