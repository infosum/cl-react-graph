export type D3Selection = {
  _groups: NodeList[],
  _parents: Node
};

export type HistogramData = {
  bins: number[],
  counts: HistogramDataSet[]
};

export type HistogramDataSet = {
  label: string,
  data: number[]
};

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
