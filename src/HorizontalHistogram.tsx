import React, {
  FC,
  useRef,
} from 'react';

import { IHistogramProps } from './Histogram';
import { horizontalHistogramD3 } from './HorizontalHistogramD3';
import { DeepPartial } from './utils/types';
import { useChart } from './utils/useChart';

const chart = horizontalHistogramD3();

const HorizontalHistogram: FC<DeepPartial<IHistogramProps>> = ({ children, ...rest }) => {
  const [refs] = useChart(useRef(), chart, rest);
  return <div ref={refs} className="histogram-chart-container"></div>;
};

export default HorizontalHistogram;
