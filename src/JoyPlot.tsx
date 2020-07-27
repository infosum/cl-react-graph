import React, {
  FC,
  Fragment,
} from 'react';

import Bars from './components/Bars/Bars';
import Base from './components/Base';
import XAxis from './components/XAxis';
import YAxis from './components/YAxis';
import {
  EGroupedBarLayout,
  IHistogramData,
} from './Histogram';
import { useJoyPlot } from './utils/useJoyPlot';

export interface IProps {
  data: IHistogramData[];
  height: number;
  width: number;
}

/**
 * JoyPlot component
 */
const JoyPlot: FC<IProps> = ({
  width,
  height,
  data,
}) => {
  const {
    chartHeight,
    bins,
    domain,
    values
  } = useJoyPlot({
    data,
    height,
  })
  console.log('domain', domain);
  return (
    <Base
      width={width}
      height={height}>

      {values.map((d, i) => <Fragment key={`plot-${i}`}>
        <YAxis
          width={100}
          height={300}
          top={chartHeight * i}
          domain={domain}
        />
        <XAxis
          width={400}
          height={40}
          top={((chartHeight) * (i + 1)) - 100}
          left={100}
          values={bins} />

        <Bars
          left={100}
          height={300}
          width={400}
          groupLayout={EGroupedBarLayout.STACKED}
          values={values[i].counts}
          bins={bins}
          top={chartHeight * i}
          domain={domain}
        />
      </Fragment>)}
    </Base>
  )
}
export default JoyPlot;
