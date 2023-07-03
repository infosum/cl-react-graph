"use strict";(self.webpackChunkdocs2=self.webpackChunkdocs2||[]).push([[659],{5745:function(e,n,t){t.d(n,{V:function(){return c}});const c=t(9).default.div.withConfig({displayName:"TwoColumns",componentId:"sc-1oyhsq-0"})(["display:grid;grid-template-columns:1fr 1fr;@media (max-width:640px){grid-template-columns:1fr;}"])},9804:function(e,n,t){t.r(n);var c=t(7294),i=t(2272),r=t(256),a=t(6362),l=t(5745),o=t(5217);n.default=()=>{const[e,n]=(0,i.z8)("90%"),t=[{cx:0,cy:0,z:10},{cx:30,cy:30,z:20},{cx:50,cy:20,z:30},{cx:n,cy:0,z:20},{cx:n/2,cy:100,z:10}];return c.createElement(a.A,null,c.createElement("h2",null,"Point"),c.createElement(l.V,null,c.createElement("div",{ref:e},c.createElement("p",null,"Renders a single or group of points"),c.createElement(i.XY,{width:n,height:200,title:"Path example"},t.map(((e,n)=>c.createElement(i.E9,Object.assign({fill:o.r.purple900,key:n,opacity:.5,stroke:o.r.grey400},e)))))),c.createElement(r.U,{exampleCode:"import {\n  Base,\n  IPointProps,\n  Point,\n  useWidth,\n} from 'cl-react-graph;\n\nconst MyComponent = () => {\n  const [ref, width] = useWidth('90%');\n  const data: IPointProps[] = [\n    { cx: 0, cy: 0, z: 10 },\n    { cx: 30, cy: 30, z: 20 },\n    { cx: 50, cy: 20, z: 30 },\n    { cx: width, cy: 0, z: 20 },\n    { cx: width / 2, cy: 100, z: 10 },\n  ];\n  return (\n    <div ref={ref}>\n      <Base\n        width={width}\n        height={200}\n        title=\"Path example\">\n        {\n          data.map((d, i) => <Point\n            fill={theme.purple900}\n            key={i}\n            opacity={0.5}\n            stroke={theme.grey400}\n            {...d} />\n          )\n        }\n      </Base>\n    </div>\n  )\n};\n"})))}}}]);
//# sourceMappingURL=component---src-pages-point-tsx-0cbdc18c6bb99f2916f0.js.map