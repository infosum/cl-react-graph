"use strict";(self.webpackChunkdocs2=self.webpackChunkdocs2||[]).push([[443],{1358:function(e,n,t){t.d(n,{V:function(){return a}});var a=t(9).default.div.withConfig({displayName:"TwoColumns",componentId:"sc-1oyhsq-0"})(["display:grid;grid-template-columns:1fr 1fr;@media (max-width:640px){grid-template-columns:1fr;}"])},9381:function(e,n,t){t.r(n);var a=t(1634),i=t(7294),r=t(5193),l=t(912),s=t(6759),h=t(1358),o=t(953);n.default=function(){var e=(0,r.z8)("90%"),n=e[0],t=e[1],d={x:{dateFormat:"%d-%b-%y",scale:"time",width:t,height:20},y:{label:"Count",numberFormat:"d",scale:"log",height:200,width:20}},m={curveType:a.Z,fill:{fill:o.r.brightBlue800,show:!1},show:!0,stroke:o.r.brightBlue800,strokeDashArray:"0",strokeDashOffset:0},u=new Date,c=new Array(100).fill("").map((function(e,n){return new Date((new Date).setDate(u.getDate()+n))})).map((function(e,n){return{x:e,y:n*Math.random()*1e3}}));return i.createElement(s.A,null,i.createElement("h2",null,"Line Chart"),i.createElement(h.V,null,i.createElement("div",{ref:n},i.createElement(r.XY,{width:t,height:200,title:"Line example"},i.createElement(r.x1,{axis:d,label:"brushed data",line:m,width:t,left:0,animate:!1,height:200,data:c}))),i.createElement(l.U,{exampleCode:"import {\n  Base,\n  IAxes,\n  ILineProps,\n  useWidth,\n  Line,\n} from 'cl-react-graph;\nimport { curveCatmullRom } from 'd3-shape';\n\nconst axis: IAxes = {\n  x: {\n    dateFormat: '%d-%b-%y',\n    scale: 'time',\n    width: width,\n    height: 20,\n  },\n  y: {\n    label: 'Count',\n    numberFormat: 'd',\n    scale: 'log',\n    height: 200,\n    width: 20,\n  },\n};\n\nconst line: ILineProps = {\n  curveType: curveCatmullRom,\n  fill: {\n    fill: theme.brightBlue800,\n    show: false,\n  },\n  show: true,\n  stroke: theme.brightBlue800,\n  strokeDashArray: '0',\n  strokeDashOffset: 0,\n}\n\nconst now = new Date();\nconst xs = new Array(100).fill('')\n  .map((_, i) => new Date(new Date().setDate(now.getDate() + i)));\nconst data = xs.map((v, i) => ({\n  x: v,\n  y: i * Math.random() * 1000,\n}));\n\nconst MyComponent = () => {\n  const [ref, width] = useWidth('90%');\n\n  return (\n    <div ref={ref}>\n      <Base\n        width={width}\n        height={200}\n        title=\"Line example\">\n        <Line\n          axis={axis}\n          label=\"brushed data\"\n          line={line}\n          width={width}\n          left={0}\n          animate={false}\n          height={200}\n          data={data} />\n      </Base>\n    </div>\n  )\n};\n"})))}}}]);
//# sourceMappingURL=component---src-pages-line-tsx-7f0429b2b9ce0daa19ce.js.map