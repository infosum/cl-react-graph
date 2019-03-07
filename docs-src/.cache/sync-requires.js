const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-404-js": hot(preferDefault(require("/home/rob/cl-react-graph/docs-src/src/pages/404.js"))),
  "component---src-pages-histogram-tsx": hot(preferDefault(require("/home/rob/cl-react-graph/docs-src/src/pages/histogram.tsx"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("/home/rob/cl-react-graph/docs-src/src/pages/index.tsx"))),
  "component---src-pages-joyplot-tsx": hot(preferDefault(require("/home/rob/cl-react-graph/docs-src/src/pages/joyplot.tsx"))),
  "component---src-pages-line-tsx": hot(preferDefault(require("/home/rob/cl-react-graph/docs-src/src/pages/line.tsx"))),
  "component---src-pages-map-tsx": hot(preferDefault(require("/home/rob/cl-react-graph/docs-src/src/pages/map.tsx"))),
  "component---src-pages-pie-tsx": hot(preferDefault(require("/home/rob/cl-react-graph/docs-src/src/pages/pie.tsx")))
}

