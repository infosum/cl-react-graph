import React, {
  FC,
  useRef,
} from 'react';

import { scatterPlotD3 } from './ScatterPlotD3';
import { DeepPartial } from './utils/types';
import { useChart } from './utils/useChart';

export interface IScatterPlotProps {
  choices: string[];
  className: string;
  data: {
    keys: string[],
    values: any[];
  };
  delay: number;
  distModels: string[];
  duration: number;
  height: number;
  legendWidth: number;
  colorScheme: string[];
  padding: number;
  radius: number;
  split: string;
  width: string | number;
}

const chart = scatterPlotD3();

const ScatterPlot: FC<DeepPartial<IScatterPlotProps>> = ({ children, ...rest }) => {
  const [refs] = useChart(useRef(), chart, rest);
  return <div ref={refs} className="scatterplot-chart-container"></div>;
};

export default ScatterPlot;
