import React, {
  FC,
  useRef,
} from 'react';

import {
  IAxes,
  IDomain,
  IGrid,
  IHistogramBar,
  IHistogramData,
  IMargin,
  IStroke,
  TipContentFn,
} from './Histogram';
import { joyPlotD3 } from './JoyplotD3';
import { DeepPartial } from './utils/types';
import { useChart } from './utils/useChart';

export interface IJoyPlotProps {
  axis: IAxes;
  bar: IHistogramBar;
  className: string;
  data: IHistogramData[];
  delay: number;
  duration: number;
  colorScheme: string[];
  domain: IDomain;
  grid: IGrid;
  height: number;
  margin: IMargin;
  stroke: IStroke;
  tip: any;
  tipContainer: string;
  tipContentFn: TipContentFn<string>;
  visible: { [key: string]: boolean };
  width: number | string;
}

const chart = joyPlotD3();

const JoyPlot: FC<DeepPartial<IJoyPlotProps>> = ({ children, ...rest }) => {
  const [refs] = useChart(useRef(), chart, rest);
  return <div ref={refs} className="joylot-chart-container"></div>;
};

export default JoyPlot;

