import {
  CurveFactory,
  CurveFactoryLineOnly,
} from 'd3-shape';
import React, {
  FC,
  useRef,
} from 'react';

import {
  IAxes,
  IChartAdaptor,
  IGrid,
  IMargin,
  ISVGLineStyle,
  TipContentFn,
} from './Histogram';
import { lineChartD3 } from './lineChartD3';
import { DeepPartial } from './utils/types';
import { useChart } from './utils/useChart';

export type IChartPointValue = number | string | Date | object;
export interface IChartPoint<X extends IChartPointValue = Date | number | string, Y extends IChartPointValue = number> {
  x: X;
  y: Y;
}
export interface ILineProps {
  show: boolean;
  fill: {
    show: boolean;
    fill: string;
  };
  curveType: CurveFactory | CurveFactoryLineOnly;
  stroke: string;
  strokeDashOffset: number;
  strokeDashArray: string;
}

export interface ILineChartDataSet<T> {
  label: string;
  point: {
    radius: number;
    stroke: string;
    fill: string;
    show: boolean;
  };
  line: ILineProps;
  data: T[];
}

export interface ISVGPoint extends ISVGLineStyle {
  radius?: 4;
  show: boolean;
}

export interface ILineChartProps<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
  axis: IAxes;
  className: string;
  data: Array<ILineChartDataSet<T>>;
  grid: IGrid;
  height: number | string;
  margin: IMargin;
  tip: any;
  tipContainer?: string;
  tipContentFn: TipContentFn<{ x: string | number, y: string | number }>;
  visible: { [key: string]: boolean };
  width: number | string;
}

const chart = lineChartD3();

const LineChart: FC<DeepPartial<ILineChartProps>> = ({ children, ...rest }) => {
  const [refs] = useChart(useRef(), chart, rest);
  return <div ref={refs} className="chart-container"></div>;
};

export default LineChart;
