(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{263:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(308),o=a(305);t.default=function(){return r.a.createElement(i.a,null,r.a.createElement(o.a,{title:"404: Not found"}),r.a.createElement("h1",null,"NOT FOUND"),r.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))}},293:function(e,t,a){"use strict";a.d(t,"b",function(){return u});var n=a(0),r=a.n(n),i=a(1),o=a.n(i),s=a(54),l=a.n(s);a.d(t,"a",function(){return l.a});a(295);var c=r.a.createContext({}),u=function(e){return r.a.createElement(c.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},295:function(e,t,a){var n;e.exports=(n=a(322))&&n.default||n},305:function(e,t,a){"use strict";var n=a(324),r=a(1),i=a.n(r),o=a(0),s=a.n(o),l=a(398),c=a.n(l);function u(e){var t=e.description,a=e.lang,r=e.meta,i=e.keywords,o=e.title,l=n.data.site,u=t||l.siteMetadata.description;return s.a.createElement(c.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+l.siteMetadata.title,meta:[{content:u,name:"description"},{content:o,property:"og:title"},{content:u,property:"og:description"},{content:"website",property:"og:type"},{content:"summary",name:"twitter:card"},{content:l.siteMetadata.author,name:"twitter:creator"},{content:o,name:"twitter:title"},{content:u,name:"twitter:description"}].concat(i.length>0?{content:i.join(", "),name:"keywords"}:[]).concat(r)})}u.defaultProps={keywords:[],lang:"en",meta:[]},u.propTypes={description:i.a.string,keywords:i.a.arrayOf(i.a.string),lang:i.a.string,meta:i.a.array,title:i.a.string.isRequired},t.a=u},308:function(e,t,a){"use strict";var n=a(321),r=(a(397),a(293)),i=a(1),o=a.n(i),s=a(0),l=a.n(s),c=a(290),u=function(e){var t=e.siteTitle;return l.a.createElement(c.a,{position:"static"},l.a.createElement(c.m,null,l.a.createElement(c.n,{variant:"h6",color:"inherit"},l.a.createElement(r.a,{to:"/"},t)),l.a.createElement(c.b,null,l.a.createElement(r.a,{to:"histogram"},"Histogram")),l.a.createElement(c.b,null,l.a.createElement(r.a,{to:"line"},"Line Chart")),l.a.createElement(c.b,null,l.a.createElement(r.a,{to:"pie"},"Pie Chart")),l.a.createElement(c.b,null,l.a.createElement(r.a,{to:"joyplot"},"Joy Plot"))))};u.propTypes={siteTitle:o.a.string},u.defaultProps={siteTitle:""};var d=u,m=function(e){var t=e.children;return l.a.createElement(r.b,{query:"755544856",render:function(e){return l.a.createElement(l.a.Fragment,null,l.a.createElement(d,{siteTitle:e.site.siteMetadata.title}),l.a.createElement("div",{style:{flexGrow:2,margin:"0 auto",padding:"0px 1.0875rem 1.45rem",paddingTop:0,width:"100%"}},l.a.createElement("main",null,t)),l.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built by"," ",l.a.createElement("a",{href:"https://www.infosum.com"},"InfoSum")))},data:n})};m.propTypes={children:o.a.node.isRequired};t.a=m},321:function(e){e.exports={data:{site:{siteMetadata:{title:"Infosum Charts"}}}}},322:function(e,t,a){"use strict";a.r(t);a(53);var n=a(0),r=a.n(n),i=a(1),o=a.n(i),s=a(85),l=a(4),c=function(e){var t=e.location,a=l.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(s.a,Object.assign({location:t,pageResources:a},a.json))};c.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=c},324:function(e){e.exports={data:{site:{siteMetadata:{title:"Infosum Charts",description:"Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",author:"@gatsbyjs"}}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-463633d3685a5267ffa4.js.map