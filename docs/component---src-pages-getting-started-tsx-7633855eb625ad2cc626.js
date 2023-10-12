"use strict";(self.webpackChunkdocs2=self.webpackChunkdocs2||[]).push([[48],{4858:function(e,n,t){t.r(n);var a=t(7294),i=t(9),r=t(6694),l=t(256),o=t(6362);const c=i.default.p.withConfig({displayName:"getting-started__Paragraph",componentId:"sc-ge8402-0"})(["width:36rem;"]),h={bins:["bin 1","bin 2","bin 3 with a long name","bin 4","bin 5","bin 6","bin 7"],counts:[{data:[1,2,3,4,5,6,7],label:"Set 1"}]};n.default=()=>{const[e,n]=(0,r.z8)("90%");return a.createElement(o.A,null,a.createElement("h1",null,"Quick start guide"),a.createElement("h3",null,"Installation"),a.createElement(c,null,"Install cl-react-graph using NPM or Yarn."),a.createElement(l.U,{exampleCode:"npm i -S cl-react-graph"}),a.createElement("h3",null,"Creating our first graph"),a.createElement(c,null,"You are going to use a pie chart for our example lets import that and useWidth to handle the resizing."),a.createElement(l.U,{exampleCode:"\n  import {\n    PieChart,\n    useWidth,\n  } from 'cl-react-graph;\n"}),a.createElement(c,null,"Now You need some data here is an example for you to get started, for more options take a deeper dive into the chart you want to use."),a.createElement(l.U,{exampleCode:"\n  const data = {\n    bins: [\n      'bin 1',\n      'bin 2',\n      'bin 3 with a long name',\n      'bin 4',\n      'bin 5',\n      'bin 6',\n      'bin 7'\n    ],\n    counts: [\n      {\n        data: [1, 2, 3, 4, 5, 6, 7],\n      },\n    ],\n  };\n"}),a.createElement(c,null,"Then use the chart like so passing in your data:"),a.createElement(l.U,{exampleCode:"\n  const MyComponent = () => {\n    const [ref, width] = useWidth('90%');\n    return(\n      <div ref={ref} style={{width: '400px'}}>\n        <PieChart\n          width={width}\n          height={400}\n          data={data}\n        />\n      </div>\n    )\n  };\n"}),a.createElement("h3",null,"Resulting pie chart"),a.createElement("div",{ref:e,style:{width:"400px"}},a.createElement(r.uc,{width:n,height:400,data:h})))}}}]);
//# sourceMappingURL=component---src-pages-getting-started-tsx-7633855eb625ad2cc626.js.map