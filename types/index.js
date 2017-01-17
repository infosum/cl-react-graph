export type HistogramData = {
  bins: number[],
  counts: number[]
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
