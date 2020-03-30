import React, {
  FC,
  useRef,
} from 'react';

import {
  EColorManipulations,
  IHistogramDataSet,
  IMargin,
  TipContentFn,
} from './Histogram';
import { pieChartD3 } from './PieChartD3';
import { DeepPartial } from './utils/types';
import { useChart } from './utils/useChart';

interface ILabels {
  display: boolean;
  displayFn: (d: any, ix: number) => string | number;
}

export interface IPieDataItem {
  count: number;
  groupLabel: string;
  label: string;
}

export interface IPieChartProps {
  data: {
    bins: string[],
    counts: IHistogramDataSet[];
  };
  backgroundColor: string;
  className: string;
  colorScheme: string[];
  donutWidth: number;
  height: number;
  hover?: Partial<Record<EColorManipulations, number>>,
  labels: ILabels;
  margin: IMargin;
  tip: any;
  tipContainer: string;
  tipContentFn: TipContentFn<string>;
  visible: { [key: string]: boolean };
  width: number | string;
}

const chart = pieChartD3();

const PieChart: FC<DeepPartial<IPieChartProps>> = ({ children, ...rest }) => {
  const [refs] = useChart(useRef(), chart, rest);
  return <div ref={refs} className="piechart-chart-container"></div>;
};

export default PieChart;
