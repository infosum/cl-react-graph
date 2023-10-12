"use strict";(self.webpackChunkdocs2=self.webpackChunkdocs2||[]).push([[155],{5745:function(n,e,t){t.d(e,{V:function(){return i}});const i=t(9).default.div.withConfig({displayName:"TwoColumns",componentId:"sc-1oyhsq-0"})(["display:grid;grid-template-columns:1fr 1fr;@media (max-width:640px){grid-template-columns:1fr;}"])},4663:function(n,e,t){t.r(e);var i=t(7294),r=t(6694),a=t(256),l=t(6362),o=t(5745);const s={bins:[[0,50],[50,150],[150,300]],counts:[{data:[500,2e3,1500],label:"Baseline"}]},c={fill:"#000",opacity:1,shapeRendering:"auto",stroke:"#000",strokeOpacity:1,strokeWidth:1,visible:"true"},d={x:{height:1,style:{...c,fill:"none",stroke:"#bbb",strokeOpacity:.7,strokeWidth:1},ticks:5,visible:!0},y:{style:{...c,fill:"none",stroke:"#bbb",strokeOpacity:.7,strokeWidth:5},ticks:5,visible:!0}};e.default=()=>{const[n,e]=(0,r.z8)("90%");return i.createElement(l.A,null,i.createElement("h2",null,"Histogram Chart"),i.createElement(o.V,null,i.createElement("div",{ref:n},i.createElement(r.b5,{animation:{duration:300},showLabels:[!0,!0],LabelComponent:n=>{let{item:e}=n;return i.createElement("g",{transform:"translate(0, -10)"},i.createElement("g",null,i.createElement("circle",{dy:10,r:4,fill:"red"}),i.createElement("text",{dx:"10"},e.percentage)))},direction:r.b8.HORIZONTAL,data:s,height:400,grid:d,xAxisLabelOrientation:r.Af.HORIZONTAL,width:e})),i.createElement(a.U,{exampleCode:"import {\n  EChartDirection,\n  ELabelOrientation,\n  Histogram,\n  IGrid,\n  HistogramData,\n  SVGLineStyle,\n  useWidth,\n} from 'cl-react-graph;\n\nconst data: HistogramData = {\n  bins: [[0, 50], [50, 150], [150, 300]],\n  counts: [\n    {\n      data: [500, 2000, 1500],\n      label: 'Baseline',\n    },\n  ]\n}\n\nconst lineStyle: SVGLineStyle = {\n  fill: '#000',\n  opacity: 1,\n  shapeRendering: 'auto',\n  stroke: '#000',\n  strokeOpacity: 1,\n  strokeWidth: 1,\n  visible: 'true',\n};\n\nconst grid: IGrid = {\n  x: {\n    height: 1,\n    style: {\n      ...lineStyle,\n      fill: 'none',\n      stroke: '#bbb',\n      strokeOpacity: 0.7,\n      strokeWidth: 1,\n    },\n    ticks: 5,\n    visible: true,\n  },\n  y: {\n    style: {\n      ...lineStyle,\n      fill: 'none',\n      stroke: '#bbb',\n      strokeOpacity: 0.7,\n      strokeWidth: 5,\n    },\n    ticks: 5,\n    visible: true,\n  },\n};\n\nconst MyComponent = () => {\n  const [ref, width] = useWidth('90%');\n\n  return (\n    <div ref={ref}>\n      <Histogram\n        animation={{\n          duration: 300,\n        }}\n        showLabels={[true, true]}\n        LabelComponent={({ item }) => {\n          return <g transform=\"translate(0, -10)\"><g>\n            <circle dy={10} r={4} fill=\"red\"></circle>\n            <text dx=\"10\">{item.percentage}</text></g>\n          </g>;\n        }}\n        direction={EChartDirection.HORIZONTAL}\n        data={data}\n        height={400}\n        grid={grid}\n        xAxisLabelOrientation={ELabelOrientation.HORIZONTAL}\n        width={width} />\n    </div>\n  )\n};\n"})))}}}]);
//# sourceMappingURL=component---src-pages-histogram-tsx-2cdf32585a3579f14f6a.js.map