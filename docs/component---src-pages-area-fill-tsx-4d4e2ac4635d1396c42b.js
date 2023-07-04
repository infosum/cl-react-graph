"use strict";(self.webpackChunkdocs2=self.webpackChunkdocs2||[]).push([[135],{1531:function(t,i,n){n.d(i,{Z:function(){return a}});Math.abs,Math.atan2,Math.cos,Math.max,Math.min,Math.sin,Math.sqrt,Math.PI;function _(t,i,n){t._context.bezierCurveTo(t._x1+t._k*(t._x2-t._x0),t._y1+t._k*(t._y2-t._y0),t._x2+t._k*(t._x1-i),t._y2+t._k*(t._y1-n),t._x2,t._y2)}function e(t,i){this._context=t,this._k=(1-i)/6}e.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:_(this,this._x1,this._y1)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,i){switch(t=+t,i=+i,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,i):this._context.moveTo(t,i);break;case 1:this._point=2,this._x1=t,this._y1=i;break;case 2:this._point=3;default:_(this,t,i)}this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=i}};(function t(i){function n(t){return new e(t,i)}return n.tension=function(i){return t(+i)},n})(0);function s(t,i){this._context=t,this._alpha=i}s.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2)}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,i){if(t=+t,i=+i,this._point){var n=this._x2-t,_=this._y2-i;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+_*_,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,i):this._context.moveTo(t,i);break;case 1:this._point=2;break;case 2:this._point=3;default:!function(t,i,n){var _=t._x1,e=t._y1,s=t._x2,a=t._y2;if(t._l01_a>1e-12){var h=2*t._l01_2a+3*t._l01_a*t._l12_a+t._l12_2a,l=3*t._l01_a*(t._l01_a+t._l12_a);_=(_*h-t._x0*t._l12_2a+t._x2*t._l01_2a)/l,e=(e*h-t._y0*t._l12_2a+t._y2*t._l01_2a)/l}if(t._l23_a>1e-12){var o=2*t._l23_2a+3*t._l23_a*t._l12_a+t._l12_2a,r=3*t._l23_a*(t._l23_a+t._l12_a);s=(s*o+t._x1*t._l23_2a-i*t._l12_2a)/r,a=(a*o+t._y1*t._l23_2a-n*t._l12_2a)/r}t._context.bezierCurveTo(_,e,s,a,t._x2,t._y2)}(this,t,i)}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=t,this._y0=this._y1,this._y1=this._y2,this._y2=i}};var a=function t(i){function n(t){return i?new s(t,i):new e(t,0)}return n.alpha=function(i){return t(+i)},n}(.5)},5745:function(t,i,n){n.d(i,{V:function(){return _}});const _=n(9).default.div.withConfig({displayName:"TwoColumns",componentId:"sc-1oyhsq-0"})(["display:grid;grid-template-columns:1fr 1fr;@media (max-width:640px){grid-template-columns:1fr;}"])},5959:function(t,i,n){n.r(i);var _=n(1531),e=n(7294),s=n(2272),a=n(256),h=n(6362),l=n(5745),o=n(5217);const r=[{x:0,y:0},{x:10,y:20},{x:20,y:10},{x:30,y:60}],c={curveType:_.Z,fill:{fill:o.r.brightBlue800,show:!0},show:!0,stroke:"#000",strokeDashArray:"0",strokeDashOffset:0};i.default=()=>{const[t,i]=(0,s.z8)("90%");return e.createElement(h.A,null,e.createElement("h2",null,"Area Fill"),e.createElement(l.V,null,e.createElement("div",{ref:t},e.createElement(s.XY,{width:i,height:220},e.createElement(s.dZ,{axis:s.PL,label:"Area fill",width:i,left:0,height:200,line:c,data:r}))),e.createElement(a.U,{exampleCode:"import {\n  AreaFill,\n  Base,\n  defaultAxis as axis,\n  LineProps,\n  useWidth,\n  Axis,\n} from 'cl-react-graph;\nimport { curveCatmullRom } from 'd3-shape';\n\nconst axis: Axes = {\n  x: {\n    dateFormat: '',\n    height: 20,\n    label: '',\n    margin: 20,\n    numberFormat: '',\n    scale: 'linear',\n    tickSize: 0,\n    width: 50,\n  },\n  y: {\n    dateFormat: '',\n    height: 20,\n    label: '',\n    margin: 20,\n    numberFormat: '',\n    scale: 'linear',\n    tickSize: 20,\n    width: 50,\n  },\n};\n\nconst data = [\n  { x: 0, y: 0 },\n  { x: 10, y: 20 },\n  { x: 20, y: 10 },\n  { x: 30, y: 60 },\n]\n\nconst line: LineProps = {\n  curveType: curveCatmullRom,\n  fill: {\n    fill: 'hsla(208, 69%, 66%, 1)',\n    show: true,\n  },\n  show: true,\n  stroke: '#000',\n  strokeDashArray: '0',\n  strokeDashOffset: 0,\n}\n\nconst MyComponent = () => {\n  const [ref, width] = useWidth('90%');\n  return(\n    <div ref={ref}>\n      <Base\n        width={width}\n        height={220}>\n        <AreaFill\n          axis={axis}\n          label=\"Area fill\"\n          width={width}\n          left={0}\n          height={200}\n          line={line}\n          data={data} />\n      </Base>\n    </div>\n  )\n};\n"})))}}}]);
//# sourceMappingURL=component---src-pages-area-fill-tsx-4d4e2ac4635d1396c42b.js.map