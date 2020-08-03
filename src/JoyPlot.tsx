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
  IBarChartData,
} from './Histogram';
import { useJoyPlot } from './utils/useJoyPlot';
import { EChartDirection } from './v3/BarChart';

export interface IProps {
  data: IBarChartData[];
  direction?: EChartDirection;
  height: number;
  width: number;
  xAxisHeight?: number;
  yAxisWidth?: number;
}

/**
 * JoyPlot component
 */
const JoyPlot: FC<IProps> = ({
  direction = EChartDirection.vertical,
  height,
  data,
  width,
  xAxisHeight,
  yAxisWidth,
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
  if (!yAxisWidth) {
    yAxisWidth = direction === EChartDirection.vertical ? 40 : 100;
  }
  if (!xAxisHeight) {
    xAxisHeight = direction === EChartDirection.vertical ? 100 : 40;
  }

  const plotHeight = chartHeight - xAxisHeight;

  return (
    <Base
      width={width}
      height={height}>

      {
        values.map((d, i) => {
          return (<Fragment key={`plot-${i}`}>
            <YAxis
              width={Number(yAxisWidth)}
              height={plotHeight}
              top={chartHeight * i}
              domain={domain}
            />
            <XAxis
              width={width - Number(yAxisWidth)}
              height={40}
              top={((chartHeight) * (i + 1)) - 100}
              left={yAxisWidth}
              values={bins} />

            <Bars
              left={yAxisWidth}
              height={plotHeight}
              width={width - Number(yAxisWidth)}
              groupLayout={EGroupedBarLayout.STACKED}
              values={values[i].counts}
              bins={bins}
              top={chartHeight * i}
              domain={domain}
              direction={direction}
            />
          </Fragment>);
        })}
    </Base>
  )
}
export default JoyPlot;
