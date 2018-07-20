/**
 * General
 */

type TipContentFn<T> = (bins: T[], i: number, d: number, groupTitle?: string) => string;

interface IChartState {
  parentWidth?: number;
}
interface ISVGLineStyle {
  'stroke'?: string;
  'fill'?: string;
  'stroke-width'?: number;
  'stroke-opacity'?: number;
  'shape-rendering'?: string;
}

interface ISVGTextStyle {
  fill?: string;
  dy?: string | number;
  'text-anchor'?: string;
  transform?: string;
  x?: string | number;
  y?: string | number;
}

interface ISVGPoint extends ISVGLineStyle {
  radius?: 4,
}

type Scale = 'LINEAR' | 'TIME';

interface IAxis {
  dateFormat?: string;
  ticks?: number;
  height?: number;
  label?: string;
  margin?: number;
  scale?: Scale,
  style?: ISVGLineStyle;
  text?: {
    style: ISVGTextStyle
  },
  width?: number;
  tickSize?: number;
}

interface IMargin {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

interface IGrid {
  x?: {
    height?: number;
    ticks?: number;
    visible?: boolean;
    style?: ISVGLineStyle;
  };
  y?: {
    style?: ISVGLineStyle;
    ticks?: number;
    visible?: boolean;
  };
}


interface IChartAdaptor {
  create: (el: Element | Text, props: { [key: string]: any }) => void,
  update: (el: Element | Text, props: { [key: string]: any }) => void,
  destroy: (el: Element | Text) => void
}

/**
 * Scatter plot
 */

type ScatterPlotData = any[]

interface IScatterPlotProps {
  choices?: any[];
  className?: string;
  chartSize?: number;
  data: ScatterPlotData,
  delay?: number;
  distModels?: string[];
  duration?: number;
  height: number;
  legendWidth?: number;
  colorScheme?: string[];
  padding?: number;
  radius?: number;
  split?: string;
  width: string | number;
}

/**
 * Line Chart
 */
interface IChartPoint {
  x: number | string | Date;
  y: number | string | Date;
}

interface ILineChartDataSet {
  label: string;
  point?: {
    radius: number;
    stroke: string;
    fill: string;
    show: boolean;
  };
  line?: {
    show: boolean;
    fill?: {
      show: boolean;
      fill: string;
    };
    curveType?: d3.CurveFactory;
    stroke?: string;
    strokeDashOffset?: number;
    strokeDashArray?: string;
  };
  data: IChartPoint[];
}

interface ILineChartProps {
  axis?: IAxes;
  data: ILineChartDataSet[];
  grid?: IGrid;
  height?: number;
  margin?: IMargin;
  width: number | string;
  tipContentFn?: (bins: ILineChartDataSet, i: number, d: number) => string;
}

/**
 * Histogram
 */
interface IHistogramBar {
  groupMargin?: number;
  margin?: number;
  width?: number;
}

interface IStroke {
  color: ((d, i: number, colors: (i: number) => string) => string) | string;
  dasharray?: string;
  linecap?: string;
  width: number;
}

interface IAxes {
  y?: IAxis;
  x?: IAxis;
}
interface IHistogramDataSet {
  borderColors?: string[];
  colors?: string[];
  label: string;
  data: number[];
}

interface IHistogramData {
  bins: string[];
  counts: IHistogramDataSet[];
  colorScheme?: string[];
  title?: string;
}

interface IDomain {
  max: number;
  min: number;
}
