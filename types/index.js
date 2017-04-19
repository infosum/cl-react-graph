export type D3Selection = {
  _groups: NodeList[],
  _parents: Node
};

export type HistogramData = {
  bins: number[],
  counts: HistogramDataSet[],
  colorScheme?: string[]
};

export type HistogramDataSet = {
  label: string,
  data: number[]
};

export type SVGLineStyle = {
  'stroke': string,
  'fill': string,
  'stroke-width': number,
  'stroke-opacity': number,
  'shape-rendering': string
}

export type SVGTextStyle = {
  'fill': string,
}

export type Axes = {
  x: {
    height: number,
    text: {
      style: SVGTextStyle
    },
    style: SVGLineStyle,
  },
  y: {
    width: number,
    ticks: number,
    text: {
      style: SVGTextStyle
    },
    style: SVGLineStyle,
  }
}

export type ChartAdaptor = {
  create: (el: Node, props: Object) => {},
  update: (el: Node, props: Object) => {},
  destroy: (el: Node) => {}
};

export type ChartPoint = {
  x: number,
  y: number
};

export type LineChartDataSet = {
   label: string,
   points: boolean,
   line: boolena,
   data: ChartPoint[]
};

export type ScatterPlotProps = {
  choices: any[],
  className: string,
  chartSize: number,
  delay: number,
  duration: number,
  legendWidth: number,
  colorScheme: string[],
  padding: number,
  radius: number
};

export type ScatterPlotData = any[];
