// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-pages-404-js": () => import("/home/rob/cl-react-graph/docs-src/src/pages/404.js" /* webpackChunkName: "component---src-pages-404-js" */),
  "component---src-pages-histogram-tsx": () => import("/home/rob/cl-react-graph/docs-src/src/pages/histogram.tsx" /* webpackChunkName: "component---src-pages-histogram-tsx" */),
  "component---src-pages-index-tsx": () => import("/home/rob/cl-react-graph/docs-src/src/pages/index.tsx" /* webpackChunkName: "component---src-pages-index-tsx" */),
  "component---src-pages-joyplot-tsx": () => import("/home/rob/cl-react-graph/docs-src/src/pages/joyplot.tsx" /* webpackChunkName: "component---src-pages-joyplot-tsx" */),
  "component---src-pages-line-tsx": () => import("/home/rob/cl-react-graph/docs-src/src/pages/line.tsx" /* webpackChunkName: "component---src-pages-line-tsx" */),
  "component---src-pages-map-tsx": () => import("/home/rob/cl-react-graph/docs-src/src/pages/map.tsx" /* webpackChunkName: "component---src-pages-map-tsx" */),
  "component---src-pages-pie-tsx": () => import("/home/rob/cl-react-graph/docs-src/src/pages/pie.tsx" /* webpackChunkName: "component---src-pages-pie-tsx" */)
}

exports.data = () => import(/* webpackChunkName: "pages-manifest" */ "/home/rob/cl-react-graph/docs-src/.cache/data.json")

