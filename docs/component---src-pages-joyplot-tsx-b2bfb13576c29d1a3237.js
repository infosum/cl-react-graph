(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{265:function(t,e,a){"use strict";a.r(e);a(53);var n=a(0),r=a.n(n),i=a(290),o=a(326),s=a(308),c=a(305),l=a(351),u=Object.assign({},l.b,{counts:[Object.assign({},l.b.counts[0],{data:[7,6,5,4,3,2,1],label:"Data 2"})],title:"Plot 2"});e.default=function(){return r.a.createElement(s.a,null,r.a.createElement(c.a,{title:"Joy Plot",description:""}),r.a.createElement(i.n,{variant:"h2"},"Joy Plot"),r.a.createElement("div",null,r.a.createElement(i.g,{container:!0,spacing:24},r.a.createElement(i.g,{item:!0,xs:6},r.a.createElement(i.c,null,r.a.createElement(i.d,null,r.a.createElement(o.a,{data:[l.b,u],colorScheme:["rgba(0, 0, 0, 0.5)","#666"],width:400,height:400})))))))}},276:function(t,e,a){"use strict";a.d(e,"c",function(){return r}),a.d(e,"d",function(){return i}),a.d(e,"a",function(){return o}),a.d(e,"b",function(){return s});a(53);var n=a(307),r={fill:"#000",opacity:1,"shape-rendering":"auto",stroke:"#000","stroke-opacity":1,"stroke-width":1,visible:!0},i={color:"#000",dasharray:"0",linecap:"butt",width:1},o=(n.e,{x:{dateFormat:"",height:20,label:"",margin:20,numberFormat:"",scale:"LINEAR",style:Object.assign({},r,{fill:"none",stroke:"#666"}),text:{style:{dy:".35em",transform:"rotate(0)",x:0,y:10}},tickSize:0,tickValues:[],ticks:3,visible:!0,width:50},y:{dateFormat:"",height:20,label:"",margin:20,numberFormat:"",scale:"LINEAR",style:Object.assign({},r,{fill:"none",stroke:"#666"}),text:{style:{fill:"#666"}},tickSize:20,tickValues:[],ticks:3,visible:!0,width:50}}),s={x:{height:1,style:Object.assign({},r,{fill:"none",stroke:"#bbb","stroke-opacity":.7,"stroke-width":1}),ticks:5,visible:!0},y:{style:Object.assign({},r,{fill:"none",stroke:"#bbb","stroke-opacity":.7,"stroke-width":1}),ticks:5,visible:!0}}},283:function(t,e,a){"use strict";e.a=["#4bbcad","#d54539","#5ab94d","#8a5cd3","#a4b243","#ba5ccd","#54995c","#cf47a1","#d29f3e","#5c6fda","#c36528","#5fa6dc","#d74770","#7d7430","#8a529e","#df9273","#5f74b8","#ac5450","#d192d7","#b26088"]},284:function(t,e,a){"use strict";a.d(e,"b",function(){return r});var n=a(272);e.a={fx:{in:function(t){t.style("left",n.a.pageX+"px").style("top",n.a.pageY-55+"px"),t.transition().duration(200).style("opacity",.9)},move:function(t){t.style("left",n.a.pageX+"px").style("top",n.a.pageY-55+"px")},out:function(t){t.transition().duration(100).style("opacity",0)}}};var r=function(t,e){return e&&e.remove(),(e=Object(n.d)(t).append("div").attr("class","tooltip top").style("opacity",0)).append("div").attr("class","tooltip-arrow"),{tipContainer:e,tipContent:e.append("div").attr("class","tooltip-inner")}}},288:function(t,e,a){"use strict";a(83),a(407),a(128);e.a=function(t,e){return Object.keys(e).forEach(function(a){t.attr(a,e[a])}),t}},293:function(t,e,a){"use strict";a.d(e,"b",function(){return u});var n=a(0),r=a.n(n),i=a(1),o=a.n(i),s=a(54),c=a.n(s);a.d(e,"a",function(){return c.a});a(295);var l=r.a.createContext({}),u=function(t){return r.a.createElement(l.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},295:function(t,e,a){var n;t.exports=(n=a(322))&&n.default||n},300:function(t,e,a){"use strict";a(354);var n=a(421),r=a.n(n);e.a=function(t){return t.filter(function(t){try{var e=r()(t),a=e.hsl().array();if(a.length>3)return!1;var n=e.luminosity();return n<.8&&n>.1&&a[2]<200&&a[2]>20}catch(i){return!1}}).filter(function(t,e,a){return a.indexOf(t)===e}).sort(function(){return Math.random()-.5})}},305:function(t,e,a){"use strict";var n=a(324),r=a(1),i=a.n(r),o=a(0),s=a.n(o),c=a(398),l=a.n(c);function u(t){var e=t.description,a=t.lang,r=t.meta,i=t.keywords,o=t.title,c=n.data.site,u=e||c.siteMetadata.description;return s.a.createElement(l.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{content:u,name:"description"},{content:o,property:"og:title"},{content:u,property:"og:description"},{content:"website",property:"og:type"},{content:"summary",name:"twitter:card"},{content:c.siteMetadata.author,name:"twitter:creator"},{content:o,name:"twitter:title"},{content:u,name:"twitter:description"}].concat(i.length>0?{content:i.join(", "),name:"keywords"}:[]).concat(r)})}u.defaultProps={keywords:[],lang:"en",meta:[]},u.propTypes={description:i.a.string,keywords:i.a.arrayOf(i.a.string),lang:i.a.string,meta:i.a.array,title:i.a.string.isRequired},e.a=u},308:function(t,e,a){"use strict";var n=a(321),r=(a(397),a(293)),i=a(1),o=a.n(i),s=a(0),c=a.n(s),l=a(290),u=function(t){var e=t.siteTitle;return c.a.createElement(l.a,{position:"static"},c.a.createElement(l.m,null,c.a.createElement(l.n,{variant:"h6",color:"inherit"},c.a.createElement(r.a,{to:"/"},e)),c.a.createElement(l.b,null,c.a.createElement(r.a,{to:"histogram"},"Histogram")),c.a.createElement(l.b,null,c.a.createElement(r.a,{to:"line"},"Line Chart")),c.a.createElement(l.b,null,c.a.createElement(r.a,{to:"pie"},"Pie Chart")),c.a.createElement(l.b,null,c.a.createElement(r.a,{to:"joyplot"},"Joy Plot"))))};u.propTypes={siteTitle:o.a.string},u.defaultProps={siteTitle:""};var d=u,f=function(t){var e=t.children;return c.a.createElement(r.b,{query:"755544856",render:function(t){return c.a.createElement(c.a.Fragment,null,c.a.createElement(d,{siteTitle:t.site.siteMetadata.title}),c.a.createElement("div",{style:{flexGrow:2,margin:"0 auto",padding:"0px 1.0875rem 1.45rem",paddingTop:0,width:"100%"}},c.a.createElement("main",null,e)),c.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built by"," ",c.a.createElement("a",{href:"https://www.infosum.com"},"InfoSum")))},data:n})};f.propTypes={children:o.a.node.isRequired};e.a=f},321:function(t){t.exports={data:{site:{siteMetadata:{title:"Infosum Charts"}}}}},322:function(t,e,a){"use strict";a.r(e);a(53);var n=a(0),r=a.n(n),i=a(1),o=a.n(i),s=a(85),c=a(4),l=function(t){var e=t.location,a=c.default.getResourcesForPathnameSync(e.pathname);return r.a.createElement(s.a,Object.assign({location:e,pageResources:a},a.json))};l.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},e.default=l},324:function(t){t.exports={data:{site:{siteMetadata:{title:"Infosum Charts",description:"Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",author:"@gatsbyjs"}}}}},326:function(t,e,a){"use strict";a(309),a(53);var n=a(82),r=a.n(n),i=a(10),o=a.n(i),s=a(297),c=a(0),l=a.n(c),u=a(55),d=a.n(u),f=(a(325),a(128),a(83),a(419),a(131),a(420),a(281),a(294)),h=a(289),m=a(285),b=a(272),g=a(287),p=a.n(g),y=a(299),v=a.n(y),x=a(283),w=a(288),k=a(284),O=a(276),j=function(){var t,e,a,n,r,i,o,s,c,l,u=Object(m.a)(),d=Object(m.b)(),g=Object(m.a)(),y=Object(m.a)();var j={axis:O.a,bar:{groupMargin:0,margin:0,width:50},className:"histogram-d3",colorScheme:x.a,data:[{bins:[],counts:[]}],delay:0,domain:{max:null,min:null},duration:400,grid:O.b,height:200,margin:{bottom:0,left:5,right:0,top:5},stroke:{color:"#005870",dasharray:"",linecap:"butt",width:0},tip:k.a,tipContainer:"body",tipContentFn:function(t,e,a,n){return n+": "+t[e]+"<br />"+a},visible:{},width:200};return{create:function(e,a){void 0===a&&(a={}),this.mergeProps(a),this._makeSvg(e),this.makeGrid(),this.makeScales(),i=n.data.map(function(e,a){return t.append("g").attr("class","histogram-container-"+a)}),this.update(e,n)},mergeProps:function(t){n=p()(j,t),t.data&&(n.data=t.data),t.colorScheme&&(n.colorScheme=t.colorScheme)},_makeSvg:function(r){if(t){t.selectAll("svg > *").remove(),t.remove();var i=r.getElementsByTagName("svg");i.length>0&&r.removeChild(i[0])}var o=n,s=o.margin,c=o.width,l=o.height,u=o.className;t=Object(b.d)(r).append("svg").attr("class",u).attr("width",c).attr("height",l).attr("viewBox","0 0 "+c+" "+l).append("g").attr("transform","translate("+s.left+","+s.top+")");var d=Object(k.b)(n.tipContainer,e);a=d.tipContent,e=d.tipContainer},valuesCount:function(t){return t.reduce(function(t,e){return e.data.length>t?e.data.length:t},0)},appendDomainRange:function(t,e){var a=[],r=n.domain,i=e.reduce(function(t,e){var a=e.reduce(function(t,e){return[].concat(t,e.map(function(t){return t.value}))},[]);return[].concat(t,a)},[0]),o=Object(f.a)(i,function(t){return t});a[1]=r&&r.hasOwnProperty("max")&&null!==r.max?r.max:Number(o[1]),a[0]=r&&r.hasOwnProperty("min")&&null!==r.min?r.min:Number(o[0]);var s=[u.bandwidth(),0];t.range(s).domain(a)},yAxisWidth:function(){var t=n.axis;return""===t.y.label?t.y.width:t.y.width+30},xAxisHeight:function(){var t=n.axis;return""===t.x.label?t.x.height:t.x.height+30},makeScales:function(){var e=n,a=e.axis,r=e.margin,i=e.height,c=e.width;o=t.append("g").attr("class","x-axis"),s=t.append("g").attr("class","y-axis"),""!==a.x.label&&t.append("text").attr("class","x-axis-label").attr("transform","translate("+Number(c)/2+" ,"+(i-this.xAxisHeight()-2*r.left+10+a.x.margin)+")").style("text-anchor","middle").text(a.x.label),""!==a.y.label&&t.append("text").attr("class","y-axis-label").attr("transform","translate(0, -"+this.gridHeight()+")rotate(-90)").attr("y",0-r.left).attr("x",0-(i/2-2*r.top)).attr("dy","1em").style("text-anchor","middle").text(a.y.label)},getBins:function(){return n.data.reduce(function(t,e){return Array.from(new Set(t.concat(e.bins)))},[])},_drawScales:function(e){var a,i=this,c=n,l=(c.bar,c.domain,c.margin),f=(c.width,c.height),m=c.axis,b=e.reduce(function(t,e){var a=i.valuesCount(e.counts);return a>t?a:t},0),p=this.gridWidth(),x=e[0].counts.map(function(t){return t.label}),k=this.getBins();g.domain(k).rangeRound([0,p]).paddingInner(this.groupedMargin()),y.domain(x).rangeRound([0,g.bandwidth()]).paddingInner(this.barMargin()),a=Object(h.a)(g);var O=v()(m,"x.tickSize",void 0);void 0!==O?a.tickSize(O):p/b<10&&a.tickValues(g.domain().filter(function(t,e){return!(e%10)})),o.attr("transform","translate("+(this.yAxisWidth()+m.y.style["stroke-width"])+","+(f-this.xAxisHeight()-2*l.left)+")").call(a);var j=e.map(function(t){return String(t.title)}),E=[f-2*l.top-this.xAxisHeight(),0];u.domain(j).rangeRound(E),this.appendDomainRange(d,r);var S=Object(h.b)(u).ticks(m.y.ticks),A=v()(m,"y.tickSize",void 0);void 0!==A&&S.tickSize(A),s.attr("transform","translate("+this.yAxisWidth()+", 0)").transition().call(S),Object(w.a)(t.selectAll(".y-axis .domain, .y-axis .tick line"),m.y.style),Object(w.a)(t.selectAll(".y-axis .tick text"),m.y.text.style),Object(w.a)(t.selectAll(".x-axis .domain, .x-axis .tick line"),m.x.style),Object(w.a)(t.selectAll(".x-axis .tick text"),m.x.text.style)},gridWidth:function(){var t=n,e=t.width,a=t.margin;return Number(e)-2*a.left-this.yAxisWidth()},gridHeight:function(){var t=n;return t.height-2*t.margin.top-this.xAxisHeight()},groupedMargin:function(){var t=v()(n.bar,"groupMargin",.1);return t>=0&&t<=1?t:0},barMargin:function(){var t=v()(n.bar,"margin",0);return t>=0&&t<=1?t:.1},barWidth:function(){return y.bandwidth()},updateChart:function(t){var r=this.getBins(),o=n,s=(o.height,o.width,o.margin,o.bar,o.delay),c=o.duration,l=o.axis,f=o.stroke,h=o.tip,b=o.tipContentFn,p=this.barWidth(),v=Object(m.d)(n.colorScheme),x=Object(m.d)(["#FFF"]),w=this.yAxisWidth();this.groupedMargin(),t.reduce(function(t,e){var a=e.reduce(function(t,e){return e.length>t?e.length:t},0);return a>t?a:t},0);t.forEach(function(t,o){var m=n.data[o].title,k=i[o].selectAll("g").data(t),O=k.enter().append("g").merge(k).attr("transform",function(t){return"translate("+(w+l.y.style["stroke-width"]+(g(t[0].label)||0))+", "+u(t[0].label)+")"}).selectAll("rect").data(function(t){return t});O.enter().append("rect").attr("height",0).attr("y",function(t){return u.bandwidth()}).attr("class","bar").attr("x",function(t){return String(y(t.label))}).attr("width",function(t){return p}).attr("fill",function(t,e){return v(String(e))}).on("mouseover",function(t){var n=r.findIndex(function(e){return e===t.label});a.html(function(){return b(r,n,t.value,m)}),h.fx.in(e)}).on("mousemove",function(){return h.fx.move(e)}).on("mouseout",function(){return h.fx.out(e)}).merge(O).transition().duration(c).delay(s).attr("y",function(t){return d(t.value)}).attr("stroke",function(t,e){return x?x(String(e)):""}).attr("shape-rendering","crispEdges").attr("stroke-width",f.width).attr("stroke-linecap",f.linecap).attr("stroke-dasharray",function(t){var e=u.bandwidth()-d(t.value);return p+" 0 "+e+" "+p}).attr("height",function(t){return u.bandwidth()-d(t.value)}),k.exit().remove()})},makeGrid:function(){c=t.append("g").attr("class","grid gridX"),l=t.append("g").attr("class","grid gridY")},_drawGrid:function(){var t=this,e=n,a=e.data,r=e.height,i=e.width,o=e.axis,s=e.grid,d=e.margin,f=(e.bar,a.reduce(function(e,a){var n=t.valuesCount(a.counts);return n>e?e:n},0)),m=o.y.style["stroke-width"],b=this.yAxisWidth()+m,p=this.gridHeight();s.x.visible&&(c.attr("transform","translate("+b+", "+p+")"),c.call(function(t){return void 0===t&&(t=5),Object(h.a)(g).ticks(t)}(v()(s,"x.ticks",f)).tickSize(-r+this.xAxisHeight()+2*d.top).tickFormat(function(){return""})),Object(w.a)(c.selectAll(".tick line"),s.x.style),Object(w.a)(c.selectAll(".domain"),Object.assign({},o.y.style,{stroke:"transparent"}))),s.y.visible&&(l.attr("transform","translate("+(this.yAxisWidth()+m)+", 0)").transition().call(function(t){return void 0===t&&(t=5),Object(h.b)(u).ticks(t)}(v()(s,"y.ticks",f)).tickSize(-i+2*d.left+this.yAxisWidth()).tickFormat(function(){return""})),Object(w.a)(l.selectAll(".tick line"),s.y.style),l.selectAll(".gridY .tick line").filter(function(t,e){return 0===e}).attr("display","none"),Object(w.a)(l.selectAll(".domain"),Object.assign({},o.x.style,{stroke:"transparent"})))},update:function(t,e){if(n.data){this.mergeProps(e);var a=n,i=a.data,o=a.visible;r=i.map(function(t){var e=[];return t.counts.forEach(function(a){a.data.forEach(function(n,r){e[r]||(e[r]=[]),e[r].push({groupLabel:a.label,joyLabel:t.title,label:t.bins[r],value:!1!==o[t.bins[r]]&&!1!==o[a.label]?n:0})})}),e}),this._drawScales(n.data),this._drawGrid(),this.updateChart(r)}},destroy:function(e){t.selectAll("svg > *").remove()}}},E=function(t){function e(e){var a;return(a=t.call(this,e)||this).ref=null,a.chart=j(),a.state={parentWidth:300},a}o()(e,t);var a=e.prototype;return a.handleResize=function(){var t=this,e=this.getDOMNode();if(e){var a=this.ref&&this.ref.offsetWidth?this.ref.offsetWidth:0;this.setState({parentWidth:a},function(){return t.chart.create(e,t.getChartState())})}},a.componentDidMount=function(){var t=this,e=this.getDOMNode();e&&(this.chart.create(e,this.getChartState()),"100%"===this.props.width&&(window.addEventListener("resize",function(e){return t.handleResize()}),this.handleResize()))},a.componentDidUpdate=function(){var t=this.getDOMNode();t&&this.chart.update(t,this.getChartState())},a.getChartState=function(){var t=this.props.width,e=this.props,a=(e.children,r()(e,["children"]));return"100%"===t&&(t=this.state.parentWidth||300),Object.assign({},a,{width:t})},a.componentWillUnmount=function(){var t=this.getDOMNode();t&&("100%"===this.props.width&&window.removeEventListener("resize",this.handleResize),this.chart.destroy(t))},a.getDOMNode=function(){var t=d.a.findDOMNode(this.ref);if(t instanceof HTMLElement)return t},a.render=function(){var t=this;return l.a.createElement("div",{ref:function(e){return t.ref=e},className:"histogram-chart-container"})},e}(l.a.Component);E.defaultProps={axis:O.a,bar:{groupMargin:.1,margin:0,width:10},grid:O.b,height:200,margin:{bottom:0,left:5,right:0,top:5},stroke:Object.assign({},O.d,{color:function(t,e,a){return Object(s.f)(a(e)).darker(1).toString()},width:1}),width:"100%"};e.a=E},351:function(t,e,a){"use strict";a.d(e,"c",function(){return i}),a.d(e,"a",function(){return o}),a.d(e,"b",function(){return s}),a.d(e,"d",function(){return c});a(53);var n=a(300),r=a(276),i={x:{style:Object.assign({},r.c,{stroke:"#ccc","stroke-opacity":.4}),ticks:5},y:{style:Object.assign({},r.c,{stroke:"#ccc","stroke-opacity":.4}),ticks:5}},o={bins:["Data 1","Data 6","Data 3","Dat 4"],counts:[{data:[1,2,3,4],label:"DataSet 1"},{data:[13,14,15,16],label:"DataSet 2"}]},s={bins:["bin 1","bin 2","bin 3 with a long name","bin 4","bin 5","bin 6","bin 7"],counts:[{borderColors:["red"],data:[1,2,3,4,5,6,7],label:"Data 1"}],title:"Plot 1"},c=Object(n.a)(["rgba(255, 113, 1, 0.5)","#fff6ef","rgba(0, 169, 123, 0.5)","#f6fffd","#D7263D","rgba(215, 38, 61, 0.05)","#0f2629","#ededed","rgba(86, 180, 191, 0.5)","#f5fbfb","#000000","#0f2629","#D7263D","#FBD7D9","#ffebec","#963540","#22545a","#56b4bf","#56b4bf","#56b4bf","#FF7101","#449098","#77c3cb","#d4eef8","#ff7101","#FF7101","#cc5a00","#ff8d33","#fef9e5","#7d5d2e","#00a97b","#008762","#33ba95","#dbf1d6","#227839","#0f5e7b","#d4eef8","#0f5e7b","#F9C80E","#007656","#c5e5e9","#f9c80e","#a9a9a9","#dbdbdb","#cccccc","#e6e6e6","#56b4bf","#449098","#77c3cb","#22545a","#ff7101","#cdcdcd","#ffffff","#d7263d","#00a97b","#888888","#e6e6e6","#f2f2f2","#f4f4f4"])}}]);
//# sourceMappingURL=component---src-pages-joyplot-tsx-b2bfb13576c29d1a3237.js.map