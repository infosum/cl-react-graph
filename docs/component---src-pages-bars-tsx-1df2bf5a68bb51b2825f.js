"use strict";(self.webpackChunkdocs2=self.webpackChunkdocs2||[]).push([[776],{5745:function(e,n,t){t.d(n,{V:function(){return o}});const o=t(9).default.div.withConfig({displayName:"TwoColumns",componentId:"sc-1oyhsq-0"})(["display:grid;grid-template-columns:1fr 1fr;@media (max-width:640px){grid-template-columns:1fr;}"])},2747:function(e,n,t){t.r(n);var o=t(7294),r=t(6694),a=t(256),l=t(6362),s=t(5745),i=t(5217);const c={bins:["Female","Male","Other"],counts:[{data:[79200,52400,13300],label:"Baseline"},{data:[6e4,34230,1e4],label:"Filtered"}]},m=[{gradientTransform:"rotate(90)",stops:[{offset:"5%",stopColor:i.r.green700},{offset:"95%",stopColor:i.r.green500}]},{stops:[{offset:"5%",stopColor:i.r.brightBlue700},{offset:"95%",stopColor:i.r.brightBlue300}]}];n.default=()=>{const[e,n]=(0,r.z8)("90%"),t=r.M9.GROUPED,h=(0,r.Jm)({groupLayout:t,bins:c.bins,values:c.counts,tickValues:[]});return o.createElement(l.A,null,o.createElement("h2",null,"Bars"),o.createElement(s.V,null,o.createElement("div",{ref:e},o.createElement(r.XY,{width:n,height:220},o.createElement(r.Ll,{bins:c.bins,colorScheme:[i.r.green900,i.r.brightBlue800],direction:r.b8.HORIZONTAL,domain:h,groupLayout:t,height:200,showLabels:[!0,!0],values:c.counts,width:n})),o.createElement("h3",null,"Using a custom label"),o.createElement("p",null,"The label assigned after each bar can be customized with a new component. In the example below we increase its font size:"),o.createElement(a.U,{exampleCode:"\nimport { TLabelComponent, EChartDirection } from 'cl-react-graph';\n\nconst CustomLabel: TLabelComponent = ({direction, inverse, fill, label, item}) => {\n  const offset = direction === EChartDirection.VERTICAL\n  ? '0, -5'\n  : inverse ? '-5, 0' : '5, 0';\nconst textAnchor = direction === EChartDirection.VERTICAL\n  ? 'middle'\n  : inverse ? 'end' : 'left';\nreturn (\n  <g transform={`translate(${offset})`}\n    role=\"cell\">\n    <text textAnchor={textAnchor}\n      fill={fill}\n      fontSize=\"1rem\">{\n        label ?? `${Math.round(Number(item.percentage))}%`}\n    </text>\n  </g>\n)\n}\n\n  <Bars\n    ...\n    LabelComponent={CustomLabel}\n  />\n"}),o.createElement("h3",null,"Color Schemes"),o.createElement("p",null,"The colorScheme prop is an array of items. Each bin item will be filled with the corresponding color scheme item"),o.createElement("p",null,"Each item can be a string representing a solid fill, or an object to specify a linear fill"),o.createElement(a.U,{exampleCode:'\nconst scheme = [\n  {\n    gradientTransform: \'rotate(90)\',\n    stops: [\n      { offset: "5%", stopColor: theme.green700 },\n      { offset: "95%", stopColor: theme.green500 },\n    ],\n  },\n  {\n    stops: [\n      { offset: "5%", stopColor:  theme.brightBlue700 },\n      { offset: "95%", stopColor:  theme.brightBlue300 },\n    ],\n  },\n]\n  <Bars\n    ...\n    colorScheme={scheme}\n  />\n'}),o.createElement("p",null,o.createElement(r.XY,{width:n,height:120},o.createElement(r.Ll,{bins:c.bins,colorScheme:m,direction:r.b8.HORIZONTAL,domain:h,groupLayout:t,height:100,showLabels:[!0,!0],values:c.counts,width:n})))),o.createElement(a.U,{exampleCode:"import {\n  Bars,\n  Base,\n  EChartDirection,\n  EGroupedBarLayout,\n  BarChartData,\n  useHistogramDomain,\n  useWidth,\n} from 'cl-react-graph;\n\nconst data: BarChartData = {\n  bins: ['Female', 'Male', 'Other'],\n  counts: [\n    {\n      data: [79200, 52400, 13300],\n      label: 'Baseline',\n    },\n    {\n      data: [60000, 34230, 10000],\n      label: 'Filtered',\n    },\n  ],\n};\n\nconst MyComponent = () => {\n  const [ref, width] = useWidth('90%');\n  const groupLayout = EGroupedBarLayout.GROUPED;\n  const domain = useHistogramDomain({\n    groupLayout: groupLayout,\n    bins: data.bins,\n    values: data.counts,\n    tickValues: [],\n  });\n\n  return (\n    <div ref={ref}>\n      <Base\n        width={width}\n        height={220}>\n        <BarsComponent\n          bins={data.bins}\n          colorScheme={[theme.green900, theme.brightBlue800]}\n          direction={EChartDirection.HORIZONTAL}\n          domain={domain}\n          groupLayout={groupLayout}\n          height={200}\n          showLabels={[true, true]}\n          values={data.counts}\n          width={width}\n          />\n      </Base>\n    </div>\n  )\n};\n"})))}}}]);
//# sourceMappingURL=component---src-pages-bars-tsx-1df2bf5a68bb51b2825f.js.map