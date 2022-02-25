"use strict";(self.webpackChunkdocs2=self.webpackChunkdocs2||[]).push([[135],{6485:function(n,e,t){t.r(e);var a=t(1634),l=t(7294),r=t(1265),i=t(3879),s=t(912),h=t(6759),o=t(1358),c=t(953),d=[{x:0,y:0},{x:10,y:20},{x:20,y:10},{x:30,y:60}],m={curveType:a.Z,fill:{fill:c.r.brightBlue800,show:!0},show:!0,stroke:"#000",strokeDashArray:"0",strokeDashOffset:0};e.default=function(){var n=(0,r.z8)("90%"),e=n[0],t=n[1];return l.createElement(h.A,null,l.createElement("h2",null,"Area Fill"),l.createElement(o.V,null,l.createElement("div",{ref:e},l.createElement(r.XY,{width:t,height:220},l.createElement(r.dZ,{axis:i.ZZ,label:"Area fill",width:t,left:0,height:200,line:m,data:d}))),l.createElement(s.U,{exampleCode:"import {\n  AreaFill, \n  Base,\n  useWidth,\n  IAxes,\n  ILineProps,\n} from 'cl-react-graph;\nimport { curveCatmullRom } from 'd3-shape';\n\nconst axis: IAxes = {\n  x: {\n    dateFormat: '',\n    height: 20,\n    label: '',\n    margin: 20,\n    numberFormat: '',\n    scale: 'linear',\n    tickSize: 0,\n    width: 50,\n  },\n  y: {\n    dateFormat: '',\n    height: 20,\n    label: '',\n    margin: 20,\n    numberFormat: '',\n    scale: 'linear',\n    tickSize: 20,\n    width: 50,\n  },\n};\n\nconst data = [\n  { x: 0, y: 0 },\n  { x: 10, y: 20 },\n  { x: 20, y: 10 },\n  { x: 30, y: 60 },\n]\n\nconst line: ILineProps = {\n  curveType: curveCatmullRom,\n  fill: {\n    fill: 'hsla(208, 69%, 66%, 1)',\n    show: true,\n  },\n  show: true,\n  stroke: '#000',\n  strokeDashArray: '0',\n  strokeDashOffset: 0,\n}\n\nconst MyComponent = () => {\n  const [ref, width] = useWidth('90%');\n  return(\n    <div ref={ref}>\n    <Base\n      width={width}\n      height={220}>\n      <AreaFill\n        axis={axis}\n        label=\"Area fill\"\n        width={width}\n        left={0}\n        height={200}\n        line={line}\n        data={data} />\n    </Base>\n  </div>\n  )\n}\n"})))}}}]);
//# sourceMappingURL=component---src-pages-area-fill-tsx-e182679e0fb091f0c70b.js.map