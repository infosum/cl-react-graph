import React, {
  FC,
  Fragment,
} from 'react';

import Bars from './components/Bars/Bars';
import Base from './components/Base';
import { TTipFunc } from './components/ToolTip';
import XAxis from './components/XAxis';
import YAxis, {
  defaultTickFormat,
  ELabelOrientation,
  TAxisLabelFormat,
} from './components/YAxis';
import {
  EGroupedBarLayout,
  IBarChartData,
  IHistogramBar,
} from './Histogram';
import { useJoyPlot } from './utils/useJoyPlot';
import {
  defaultPadding,
  EChartDirection,
} from './v3/BarChart';

export interface IProps {
  axisLabelFormat?: TAxisLabelFormat;
  colorScheme?: string[];
  data: IBarChartData[];
  direction?: EChartDirection;
  height: number;
  padding?: IHistogramBar;
  tip?: TTipFunc;
  width: number;
  xAxisHeight?: number;
  yAxisWidth?: number;
  titleHeight?: number;
  titleLayout?: ELabelOrientation;
}

/**
 * JoyPlot component
 */
const JoyPlot: FC<IProps> = ({
  axisLabelFormat,
  colorScheme,
  data,
  direction = EChartDirection.VERTICAL,
  height,
  tip,
  width,
  xAxisHeight,
  padding = defaultPadding,
  yAxisWidth,
  titleHeight = 40,
  titleLayout = ELabelOrientation.HORIZONTAL,
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
    yAxisWidth = direction === EChartDirection.VERTICAL ? 40 : 100;
  }
  if (!xAxisHeight) {
    xAxisHeight = direction === EChartDirection.VERTICAL ? 100 : 40;
  }

  const plotHeight = titleLayout === ELabelOrientation.HORIZONTAL
    ? chartHeight - xAxisHeight - titleHeight
    : chartHeight - xAxisHeight;


  return (
    <Base
      width={width}
      height={height}>

      {
        values.map((d, i) => {
          const top = titleLayout === ELabelOrientation.HORIZONTAL
            ? (chartHeight * i) + titleHeight
            : (chartHeight * i);
          const xWidth = width - Number(yAxisWidth);
          return (<g key={`plot-${d.title}`}>
            {
              titleLayout === ELabelOrientation.HORIZONTAL
                ? <g
                  transform={`translate(${yAxisWidth}, ${(chartHeight * i) + (titleHeight / 2)})`}
                  height={titleHeight}
                  width={xWidth}
                ><text
                  fill={defaultTickFormat.stroke}
                  fontSize="12px"
                  fontWeight="bold"
                  width={xWidth}

                >{String(d.title)}
                  </text>
                </g>
                :
                <YAxis
                  width={0}
                  height={plotHeight}
                  scale="band"
                  top={chartHeight * i}
                  labelFormat={axisLabelFormat}
                  path={{
                    opacity: 0,
                  }}
                  labelOrientation={ELabelOrientation.VERTICAL}
                  tickFormat={{
                    fontSize: '12px',
                    stroke: '#333',
                  }}
                  values={[String(d.title)]}
                />
            }
            <YAxis
              width={Number(yAxisWidth)}
              labelFormat={axisLabelFormat}
              height={plotHeight}
              top={top}
              domain={domain}
            />
            <XAxis
              width={xWidth}
              height={Number(xAxisHeight)}
              top={((chartHeight) * (i + 1)) - Number(xAxisHeight)}
              left={yAxisWidth}
              labelFormat={axisLabelFormat}
              padding={padding}
              values={bins} />

            <Bars
              left={yAxisWidth}
              height={plotHeight}
              colorScheme={colorScheme}
              groupLayout={EGroupedBarLayout.STACKED}
              values={values[i].counts}
              bins={bins}
              top={top}
              domain={domain}
              padding={padding}
              direction={direction}
              tip={tip}
              width={xWidth}
            />
          </g>);
        })}
    </Base>
  )
}
export default JoyPlot;
