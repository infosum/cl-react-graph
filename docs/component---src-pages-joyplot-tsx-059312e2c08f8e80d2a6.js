(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"30+C":function(e,t,a){"use strict";var n=a("k1TG"),i=a("aXB2"),r=a("q1tI"),o=a("iuhU"),c=a("kKAo"),s=a("H2TA"),l=r.forwardRef((function(e,t){var a=e.classes,s=e.className,l=e.raised,d=void 0!==l&&l,u=Object(i.a)(e,["classes","className","raised"]);return r.createElement(c.a,Object(n.a)({className:Object(o.a)(a.root,s),elevation:d?8:1,ref:t},u))}));t.a=Object(s.a)({root:{overflow:"hidden"}},{name:"MuiCard"})(l)},EGO9:function(e,t,a){"use strict";var n=a("q1tI"),i=a.n(n),r=a("UBVB"),o=a("uZNN"),c=a("ress"),s=a("faMQ"),l=a("o6j4"),d=a("t6b9"),u=(a("E9XD"),a("t8Zj")),f=a("2b7M");t.a=function(e){var t=e.axisLabelFormat,a=e.colorScheme,m=e.data,g=e.direction,x=void 0===g?r.a.VERTICAL:g,b=e.height,h=e.tip,p=e.width,v=e.xAxisHeight,w=e.padding,j=void 0===w?r.c:w,O=e.yAxisWidth,E=e.titleHeight,S=void 0===E?40:E,y=e.titleLayout,N=void 0===y?l.a.HORIZONTAL:y,C=function(e){var t=e.data,a=e.height,i=e.clampToZero,r=void 0===i||i,o=a/t.length,c=Object(n.useState)([]),s=c[0],l=c[1],d=Object(n.useState)([0,0]),m=d[0],g=d[1],x=Object(n.useState)([]),b=x[0],h=x[1];return Object(n.useEffect)((function(){var e=t.reduce((function(e,t){return Array.from(new Set([].concat(Object(u.a)(e),Object(u.a)(t.bins))))}),[]);l(e);var a=t.map((function(t){var a=t.counts.map((function(a){var n=new Array(e.length).fill(0);return a.data.forEach((function(a,i){var r=e.findIndex((function(e){return e===t[i]}));n[r]=a})),a}));return Object.assign({},t,{bins:e,counts:a})}));h(a);var n=a.reduce((function(e,t){var a=t.counts.reduce((function(e,t){return[].concat(Object(u.a)(e),Object(u.a)(t.data))}),[]);return[].concat(Object(u.a)(a),Object(u.a)(e))}),[]);r&&n.push(0);var i=Object(f.a)(n);i[0]==i[1]&&i[1]++,g(i)}),[t]),{chartHeight:o,bins:s,domain:m,values:b}}({data:m,height:b}),I=C.chartHeight,T=C.bins,k=C.domain,A=C.values;O||(O=x===r.a.VERTICAL?40:100),v||(v=x===r.a.VERTICAL?100:40);var W=N===l.a.HORIZONTAL?I-v-S:I-v;return i.a.createElement(c.a,{width:p,height:b},A.map((function(e,n){var r=N===l.a.HORIZONTAL?I*n+S:I*n,c=p-Number(O);return i.a.createElement("g",{key:"plot-"+e.title},N===l.a.HORIZONTAL?i.a.createElement("g",{transform:"translate("+O+", "+(I*n+S/2)+")",height:S,width:c},i.a.createElement("text",{fill:l.d.stroke,fontSize:"12px",fontWeight:"bold",width:c},String(e.title))):i.a.createElement(l.b,{width:0,height:W,scale:"band",top:I*n,labelFormat:t,path:{opacity:0},labelOrientation:l.a.VERTICAL,tickFormat:{fontSize:"12px",stroke:"#333"},values:[String(e.title)]}),i.a.createElement(l.b,{width:Number(O),labelFormat:t,height:W,top:r,domain:k}),i.a.createElement(s.a,{width:c,height:Number(v),top:I*(n+1)-Number(v),left:O,labelFormat:t,padding:j,values:T}),i.a.createElement(o.a,{left:O,height:W,colorScheme:a,groupLayout:d.b.STACKED,values:A[n].counts,bins:T,top:r,domain:k,padding:j,direction:x,tip:h,width:c}))})))}},fMuW:function(e,t,a){"use strict";a.r(t);var n=a("q1tI"),i=a.n(n),r=a("ofer"),o=a("tRbT"),c=a("30+C"),s=a("oa/T"),l=a("Z3vd"),d=a("EGO9"),u=a("9Dj+"),f=a("H8eV"),m=[{bins:["[0, 2500)","[2500, 5000)","[100000, 9223372036854775807)"],counts:[{label:"in market for car: No",data:[500,400,4e3]}],title:"No"},{bins:["[0, 2500)","[2500, 5000)","[100000, 9223372036854775807)"],counts:[{label:"in market for car: Yes",data:[300,300,2800]}],title:"Yes"}],g=[{bins:["No","Yes"],counts:[{label:"in market for car: No",data:[1e3,500]}],title:"No"},{bins:["No","Yes"],counts:[{label:"in market for car: Yes",data:[800,400]}],title:"Yes"}];t.default=function(){var e=Object(n.useState)(0),t=e[0],a=e[1],x=0===t?m:g;return i.a.createElement(u.a,null,i.a.createElement(f.a,{title:"Joy Plot",description:""}),i.a.createElement(r.a,{variant:"h2"},"Joy Plot"),i.a.createElement("div",null,i.a.createElement(o.a,{container:!0,spacing:10},i.a.createElement(o.a,{item:!0,xs:6},i.a.createElement(c.a,null,i.a.createElement(s.a,null,i.a.createElement(d.a,{data:x,xAxisHeight:20,width:800,height:150*x.length})))),i.a.createElement(o.a,{item:!0,xs:6},i.a.createElement(c.a,null,i.a.createElement(s.a,null,i.a.createElement(l.a,{onClick:function(){return a(1===t?0:1)}},"toggle data")))))))}},"oa/T":function(e,t,a){"use strict";var n=a("k1TG"),i=a("aXB2"),r=a("q1tI"),o=a("iuhU"),c=a("H2TA"),s=r.forwardRef((function(e,t){var a=e.classes,c=e.className,s=e.component,l=void 0===s?"div":s,d=Object(i.a)(e,["classes","className","component"]);return r.createElement(l,Object(n.a)({className:Object(o.a)(a.root,c),ref:t},d))}));t.a=Object(c.a)({root:{padding:16,"&:last-child":{paddingBottom:24}}},{name:"MuiCardContent"})(s)},tRbT:function(e,t,a){"use strict";a("E9XD");var n=a("aXB2"),i=a("k1TG"),r=a("q1tI"),o=a("iuhU"),c=a("H2TA"),s=[0,1,2,3,4,5,6,7,8,9,10],l=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,a=parseFloat(e);return"".concat(a/t).concat(String(e).replace(String(a),"")||"px")}var u=r.forwardRef((function(e,t){var a=e.alignContent,c=void 0===a?"stretch":a,s=e.alignItems,l=void 0===s?"stretch":s,d=e.classes,u=e.className,f=e.component,m=void 0===f?"div":f,g=e.container,x=void 0!==g&&g,b=e.direction,h=void 0===b?"row":b,p=e.item,v=void 0!==p&&p,w=e.justify,j=void 0===w?"flex-start":w,O=e.lg,E=void 0!==O&&O,S=e.md,y=void 0!==S&&S,N=e.sm,C=void 0!==N&&N,I=e.spacing,T=void 0===I?0:I,k=e.wrap,A=void 0===k?"wrap":k,W=e.xl,H=void 0!==W&&W,R=e.xs,L=void 0!==R&&R,M=e.zeroMinWidth,B=void 0!==M&&M,G=Object(n.a)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),z=Object(o.a)(d.root,u,x&&[d.container,0!==T&&d["spacing-xs-".concat(String(T))]],v&&d.item,B&&d.zeroMinWidth,"row"!==h&&d["direction-xs-".concat(String(h))],"wrap"!==A&&d["wrap-xs-".concat(String(A))],"stretch"!==l&&d["align-items-xs-".concat(String(l))],"stretch"!==c&&d["align-content-xs-".concat(String(c))],"flex-start"!==j&&d["justify-xs-".concat(String(j))],!1!==L&&d["grid-xs-".concat(String(L))],!1!==C&&d["grid-sm-".concat(String(C))],!1!==y&&d["grid-md-".concat(String(y))],!1!==E&&d["grid-lg-".concat(String(E))],!1!==H&&d["grid-xl-".concat(String(H))]);return r.createElement(m,Object(i.a)({className:z,ref:t},G))})),f=Object(c.a)((function(e){return Object(i.a)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-xs-center":{justifyContent:"center"},"justify-xs-flex-end":{justifyContent:"flex-end"},"justify-xs-space-between":{justifyContent:"space-between"},"justify-xs-space-around":{justifyContent:"space-around"},"justify-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var a={};return s.forEach((function(n){var i=e.spacing(n);0!==i&&(a["spacing-".concat(t,"-").concat(n)]={margin:"-".concat(d(i,2)),width:"calc(100% + ".concat(d(i),")"),"& > $item":{padding:d(i,2)}})})),a}(e,"xs"),e.breakpoints.keys.reduce((function(t,a){return function(e,t,a){var n={};l.forEach((function(e){var t="grid-".concat(a,"-").concat(e);if(!0!==e)if("auto"!==e){var i="".concat(Math.round(e/12*1e8)/1e6,"%");n[t]={flexBasis:i,flexGrow:0,maxWidth:i}}else n[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else n[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===a?Object(i.a)(e,n):e[t.breakpoints.up(a)]=n}(t,e,a),t}),{}))}),{name:"MuiGrid"})(u);t.a=f}}]);
//# sourceMappingURL=component---src-pages-joyplot-tsx-059312e2c08f8e80d2a6.js.map