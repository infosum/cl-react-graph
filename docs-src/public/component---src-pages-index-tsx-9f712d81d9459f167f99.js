(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{264:function(e,t,a){"use strict";a.r(t);var n=a(291),r=a(0),i=a.n(r),o=a(306),l=a(304);t.default=function(){return i.a.createElement(o.a,null,i.a.createElement(l.a,{title:"Home",keywords:["infoSum","charts","react"],description:""}),i.a.createElement("ul",null,i.a.createElement("li",null,i.a.createElement(n.a,{to:"/histogram"},"Histogram")),i.a.createElement("li",null,i.a.createElement(n.a,{to:"/line"},"Line Chart")),i.a.createElement("li",null,i.a.createElement(n.a,{to:"/pie"},"Pie Chart")),i.a.createElement("li",null,i.a.createElement(n.a,{to:"/joyplot"},"Joy Plot")),i.a.createElement("li",null,i.a.createElement(n.a,{to:"/map"},"Map"))))}},291:function(e,t,a){"use strict";a.d(t,"b",function(){return u});var n=a(0),r=a.n(n),i=a(1),o=a.n(i),l=a(54),c=a.n(l);a.d(t,"a",function(){return c.a});a(294);var s=r.a.createContext({}),u=function(e){return r.a.createElement(s.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},294:function(e,t,a){var n;e.exports=(n=a(320))&&n.default||n},304:function(e,t,a){"use strict";var n=a(322),r=a(1),i=a.n(r),o=a(0),l=a.n(o),c=a(396),s=a.n(c);function u(e){var t=e.description,a=e.lang,r=e.meta,i=e.keywords,o=e.title,c=n.data.site,u=t||c.siteMetadata.description;return l.a.createElement(s.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{content:u,name:"description"},{content:o,property:"og:title"},{content:u,property:"og:description"},{content:"website",property:"og:type"},{content:"summary",name:"twitter:card"},{content:c.siteMetadata.author,name:"twitter:creator"},{content:o,name:"twitter:title"},{content:u,name:"twitter:description"}].concat(i.length>0?{content:i.join(", "),name:"keywords"}:[]).concat(r)})}u.defaultProps={keywords:[],lang:"en",meta:[]},u.propTypes={description:i.a.string,keywords:i.a.arrayOf(i.a.string),lang:i.a.string,meta:i.a.array,title:i.a.string.isRequired},t.a=u},306:function(e,t,a){"use strict";var n=a(319),r=(a(395),a(291)),i=a(1),o=a.n(i),l=a(0),c=a.n(l),s=a(288),u=function(e){var t=e.siteTitle;return c.a.createElement(s.a,{position:"static"},c.a.createElement(s.m,null,c.a.createElement(s.n,{variant:"h6",color:"inherit"},c.a.createElement(r.a,{to:"/"},t)),c.a.createElement(s.b,null,c.a.createElement(r.a,{to:"histogram"},"Histogram")),c.a.createElement(s.b,null,c.a.createElement(r.a,{to:"line"},"Line Chart")),c.a.createElement(s.b,null,c.a.createElement(r.a,{to:"pie"},"Pie Chart")),c.a.createElement(s.b,null,c.a.createElement(r.a,{to:"joyplot"},"Joy Plot"))))};u.propTypes={siteTitle:o.a.string},u.defaultProps={siteTitle:""};var m=u,d=function(e){var t=e.children;return c.a.createElement(r.b,{query:"755544856",render:function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement(m,{siteTitle:e.site.siteMetadata.title}),c.a.createElement("div",{style:{flexGrow:2,margin:"0 auto",padding:"0px 1.0875rem 1.45rem",paddingTop:0,width:"100%"}},c.a.createElement("main",null,t)),c.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built by"," ",c.a.createElement("a",{href:"https://www.infosum.com"},"InfoSum")))},data:n})};d.propTypes={children:o.a.node.isRequired};t.a=d},319:function(e){e.exports={data:{site:{siteMetadata:{title:"Infosum Charts"}}}}},320:function(e,t,a){"use strict";a.r(t);a(53);var n=a(0),r=a.n(n),i=a(1),o=a.n(i),l=a(85),c=a(4),s=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(l.a,Object.assign({location:t,pageResources:a},a.json))};s.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=s},322:function(e){e.exports={data:{site:{siteMetadata:{title:"Infosum Charts",description:"Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",author:"@gatsbyjs"}}}}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-9f712d81d9459f167f99.js.map