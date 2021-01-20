import {
  CurveFactory,
  CurveFactoryLineOnly,
} from 'd3-shape';
import React, { FC } from 'react';

import AreaFill from './components/AreaFill';
import Base from './components/Base';
import Grid from './components/Grid';
import Line from './components/Line';
import Points from './components/Points';
import XAxis from './components/XAxis';
import YAxis from './components/YAxis';
import { IGrid } from './Histogram';
import { IAxes } from './legacy/types';
import { useLineDomain } from './utils/useDomain';

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

export interface IProps<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
  axis: IAxes;
  data: ILineChartDataSet<T>[];
  grid: IGrid;
  height: number;
  width: number;
  xAxisHeight?: number;
  yAxisWidth?: number;
  title?: string;
  description?: string;
}

const LineChart: FC<IProps> = ({
  axis,
  data,
  grid,
  height,
  width,
  xAxisHeight = 60,
  yAxisWidth = 100,
  title,
  description,
}) => {
  const domain = useLineDomain({
    values: data,
  });
  return (
    <Base
      width={width}
      height={height}
      title={title}
      description={description}>

      <Grid
        left={yAxisWidth}
        height={height - xAxisHeight}
        svgProps={{ ...grid.x.style }}
        lines={{
          vertical: grid.y.ticks,
          horizontal: grid.x.ticks,
        }}
        width={width - yAxisWidth} />
      {
        data.map((item) => <> <Line
          axis={axis}
          key={item.label}
          label={item.label}
          line={item.line}
          width={width - yAxisWidth}
          left={yAxisWidth}
          height={height - xAxisHeight}
          data={item.data} />
          {

            item.point.show &&
            <Points
              axis={axis}
              key={item.label}
              width={width - yAxisWidth}
              left={yAxisWidth}
              height={height - xAxisHeight}
              radius={item.point.radius}
              fill={item.point.fill}
              stroke={item.point.stroke}
              data={item.data} />
          }

          {
            item.line.fill.show && <AreaFill
              axis={axis}
              key={item.label}
              width={width - yAxisWidth}
              left={yAxisWidth}
              height={height - xAxisHeight}
              line={item.line}
              data={item.data} />
          }
        </>)}

      <YAxis
        width={yAxisWidth}
        height={height - xAxisHeight}
        // values={[0, 1000, 2000]}
        scale="linear"
        domain={domain}
      />

      <XAxis
        width={width - yAxisWidth}
        height={xAxisHeight}
        top={height - xAxisHeight}
        left={yAxisWidth} />

    </Base>
  )
}

export default LineChart;
