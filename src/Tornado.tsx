import React, {
  FC,
  useRef,
} from 'react';

import { IGroupDataItem } from './BaseHistogramD3';
import {
  EGroupedBarLayout,
  IAxes,
  IDomain,
  IGrid,
  IHistogramBar,
  IMargin,
  IStroke,
  TipContentFn,
} from './Histogram';
import { tornadoD3 } from './TornadoD3';
import { DeepPartial } from './utils/types';
import { useChart } from './utils/useChart';

export interface ITornadoDataSet {
  borderColors?: string[];
  colors?: string[];
  label: string;
  data: [number[], number[]];
}

export interface ITornadoData {
  bins: string[];
  counts: ITornadoDataSet[];
  colorScheme?: string[];
  title?: string;
}

export interface ITornadoProps {
  axis: IAxes;
  bar: IHistogramBar;
  center: boolean;
  className: string;
  data: ITornadoData;
  delay: number;
  duration: number;
  colorScheme: string[];
  domain: IDomain;
  grid: IGrid;
  height: number;
  margin: IMargin;
  groupLayout: EGroupedBarLayout;
  onClick?: (bar: IGroupDataItem) => void;
  showBinPercentages: boolean;
  splitBins: [string, string];
  stroke: IStroke;
  tip: any;
  tipContainer: string;
  tipContentFn: TipContentFn<string>;
  visible: { [key: string]: boolean };
  width: number | string;
}

const chart = tornadoD3();

const Tornado: FC<DeepPartial<ITornadoProps>> = ({ children, ...rest }) => {
  const [refs] = useChart(useRef(), chart, rest);
  return <div ref={refs} className="tornado-chart-container"></div>;
};

export default Tornado;
