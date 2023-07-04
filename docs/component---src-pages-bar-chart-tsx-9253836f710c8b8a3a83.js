"use strict";(self.webpackChunkdocs2=self.webpackChunkdocs2||[]).push([[254],{5745:function(n,e,t){t.d(e,{V:function(){return i}});const i=t(9).default.div.withConfig({displayName:"TwoColumns",componentId:"sc-1oyhsq-0"})(["display:grid;grid-template-columns:1fr 1fr;@media (max-width:640px){grid-template-columns:1fr;}"])},3548:function(n,e,t){t.r(e),t.d(e,{axis:function(){return c}});var i=t(7294),a=t(2272),r=t(256),l=t(6362),o=t(5745),s=t(5217);const c={x:{scale:"linear",numberFormat:".2s",labelOrientation:a.Af.HORIZONTAL},y:{numberFormat:".2s",labelOrientation:a.Af.HORIZONTAL}},d={bins:["Female","Male","Other"],counts:[{data:[58483,52400,13300],label:"Baseline"},{data:[54932,34230,1e4],label:"Filtered"}]},u={fill:"#000",opacity:1,shapeRendering:"auto",stroke:"#000",strokeOpacity:1,strokeWidth:1,visible:"true"},h={x:{height:1,style:{...u,fill:"none",stroke:"#bbb",strokeOpacity:.7,strokeWidth:1},ticks:5,visible:!0},y:{style:{...u,fill:"none",stroke:"#bbb",strokeOpacity:.7,strokeWidth:5},ticks:5,visible:!0}};e.default=()=>{const[n,e]=(0,a.z8)("90%");return i.createElement(l.A,null,i.createElement("h2",null,"Bar Chart"),i.createElement(o.V,null,i.createElement("div",{ref:n},i.createElement(a.vz,{animation:{duration:800},showLabels:[!1,!0],direction:a.b8.HORIZONTAL,data:d,height:400,tickValues:[0,4e4,89200],grid:h,colorScheme:[s.r.brightBlue800,s.r.green900],groupLayout:a.M9.GROUPED,xAxisLabelOrientation:a.Af.HORIZONTAL,width:e})),i.createElement(r.U,{exampleCode:"import {\n  BarChart,\n  DeepPartial,\n  EChartDirection,\n  EGroupedBarLayout,\n  ELabelOrientation,\n  Axes,\n  BarChartData,\n  GridProps,\n  SVGLineStyle,\n  useWidth,\n} from 'cl-react-graph;\n\n\nexport const axis: DeepPartial<Axes> = {\n  x: {\n    scale: 'linear',\n    numberFormat: '.2s',\n    labelOrientation: ELabelOrientation.HORIZONTAL,\n  },\n  y: {\n    numberFormat: '.2s',\n    labelOrientation: ELabelOrientation.HORIZONTAL,\n  },\n};\n\nconst data: BarChartData = {\n  bins: ['Female', 'Male', 'Other'],\n  counts: [\n    {\n      data: [58483, 52400, 13300],\n      label: 'Baseline',\n    },\n    {\n      data: [54932, 34230, 10000],\n      label: 'Filtered',\n    },\n  ]\n};\n\nexport const lineStyle: SVGLineStyle = {\n  'fill': '#000',\n  'opacity': 1,\n  'shapeRendering': 'auto',\n  'stroke': '#000',\n  'strokeOpacity': 1,\n  'strokeWidth': 1,\n  'visible': 'true',\n};\n\nconst grid: GridProps = {\n  x: {\n    height: 1,\n    style: {\n      ...lineStyle,\n      'fill': 'none',\n      'stroke': '#bbb',\n      'strokeOpacity': 0.7,\n      'strokeWidth': 1,\n    },\n    ticks: 5,\n    visible: true,\n  },\n  y: {\n    style: {\n      ...lineStyle,\n      'fill': 'none',\n      'stroke': '#bbb',\n      'strokeOpacity': 0.7,\n      'strokeWidth': 5,\n    },\n    ticks: 5,\n    visible: true,\n  },\n};\n\nconst MyComponent = () => {\n  const [ref, width] = useWidth('90%');\n\n  return (\n    <div ref={ref}>\n      <BarChart\n        animation={{\n          duration: 800,\n        }}\n        showLabels={[false, true]}\n        direction={EChartDirection.HORIZONTAL}\n        data={data}\n        height={400}\n        tickValues={[0, 40000, 89200]}\n        grid={grid}\n        colorScheme={[theme.brightBlue800, theme.green900]}\n        groupLayout={EGroupedBarLayout.GROUPED}\n        xAxisLabelOrientation={ELabelOrientation.HORIZONTAL}\n        width={width} />\n    </div>\n  )\n};\n"})))}}}]);
//# sourceMappingURL=component---src-pages-bar-chart-tsx-9253836f710c8b8a3a83.js.map