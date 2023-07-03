"use strict";(self.webpackChunkdocs2=self.webpackChunkdocs2||[]).push([[776],{5745:function(n,e,t){t.d(e,{V:function(){return a}});const a=t(9).default.div.withConfig({displayName:"TwoColumns",componentId:"sc-1oyhsq-0"})(["display:grid;grid-template-columns:1fr 1fr;@media (max-width:640px){grid-template-columns:1fr;}"])},2747:function(n,e,t){t.r(e);var a=t(7294),o=t(2272),r=t(256),i=t(6362),s=t(5745),u=t(5217);const l={bins:["Female","Male","Other"],counts:[{data:[79200,52400,13300],label:"Baseline"},{data:[6e4,34230,1e4],label:"Filtered"}]};e.default=()=>{const[n,e]=(0,o.z8)("90%"),t=o.M9.GROUPED,d=(0,o.Jm)({groupLayout:t,bins:l.bins,values:l.counts,tickValues:[]});return a.createElement(i.A,null,a.createElement("h2",null,"Bars"),a.createElement(s.V,null,a.createElement("div",{ref:n},a.createElement(o.XY,{width:e,height:220},a.createElement(o.Ll,{bins:l.bins,colorScheme:[u.r.green900,u.r.brightBlue800],direction:o.b8.HORIZONTAL,domain:d,groupLayout:t,height:200,showLabels:[!0,!0],values:l.counts,width:e}))),a.createElement(r.U,{exampleCode:"import {\n  Bars,\n  Base,\n  EChartDirection,\n  EGroupedBarLayout,\n  IBarChartData,\n  useHistogramDomain,\n  useWidth,\n} from 'cl-react-graph;\n\nconst data: IBarChartData = {\n  bins: ['Female', 'Male', 'Other'],\n  counts: [\n    {\n      data: [79200, 52400, 13300],\n      label: 'Baseline',\n    },\n    {\n      data: [60000, 34230, 10000],\n      label: 'Filtered',\n    },\n  ],\n};\n\nconst MyComponent = () => {\n  const [ref, width] = useWidth('90%');\n  const groupLayout = EGroupedBarLayout.GROUPED;\n  const domain = useHistogramDomain({\n    groupLayout: groupLayout,\n    bins: data.bins,\n    values: data.counts,\n    tickValues: [],\n  });\n\n  return (\n    <div ref={ref}>\n      <Base\n        width={width}\n        height={220}>\n        <BarsComponent\n          bins={data.bins}\n          colorScheme={[theme.green900, theme.brightBlue800]}\n          direction={EChartDirection.HORIZONTAL}\n          domain={domain}\n          groupLayout={groupLayout}\n          height={200}\n          showLabels={[true, true]}\n          values={data.counts}\n          width={width}\n          />\n      </Base>\n    </div>\n  )\n};\n"})))}}}]);
//# sourceMappingURL=component---src-pages-bars-tsx-9c80f5f5afa4f24997f6.js.map