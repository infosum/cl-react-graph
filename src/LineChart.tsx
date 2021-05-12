import {
  CurveFactory,
  CurveFactoryLineOnly,
} from 'd3-shape';
import React, {
  FC,
  Fragment,
} from 'react';

import AreaFill from './components/AreaFill';
import Base from './components/Base';
import Grid from './components/Grid';
import Line from './components/Line';
import Points, { PointComponentProps } from './components/Points';
import XAxis from './components/XAxis';
import YAxis, { TAxisLabelFormat } from './components/YAxis';
import { IGrid } from './Histogram';
import { IAxes } from './legacy/types';
import { useLineDomain } from './utils/useDomain';

export type IChartPointValue = number | string | Date | object;
export interface IChartPoint<X extends IChartPointValue = Date | number | string, Y extends IChartPointValue = number> {
  x: X;
  y: Y;
  z?: number;
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
    showTitle?: boolean;
  };
  line: ILineProps;
  data: T[];
}

export interface IProps<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
  axis: IAxes;
  data: ILineChartDataSet<T>[];
  grid?: IGrid;
  height: number;
  width: number;
  xAxisHeight?: number;
  yAxisWidth?: number;
  /** @description Chart <title /> */
  title?: string;
  description?: string;
  /**
   * @description if true then adds a 0 to the data domain. Useful if you don't want your lowest value to appear on top of the x axis
   */
  clampToZero?: boolean;
  axisLabelFormat?: TAxisLabelFormat;
  /** @description Custom component to override the default <circle /> used to plot points */
  PointComponent?: FC<PointComponentProps>;
}

const LineChart: FC<IProps> = ({
  axis,
  axisLabelFormat,
  clampToZero = true,
  data,
  description,
  grid,
  height,
  PointComponent,
  title,
  width,
  xAxisHeight = 60,
  yAxisWidth = 100,
}) => {
  const domain = useLineDomain({
    values: data,
    clampToZero,
  });
  const values = data.reduce((prev, next) => prev.concat(next.data.map((d) => d.x)), [] as any[])

  return (
    <Base
      width={width}
      height={height}
      title={title}
      description={description}>

      {
        grid && <Grid
          left={yAxisWidth}
          height={height - xAxisHeight}
          svgProps={{ ...grid.x.style }}
          lines={{
            vertical: grid.y.ticks,
            horizontal: grid.x.ticks,
          }}
          width={width - yAxisWidth} />
      }
      {
        data.map((item) => <Fragment key={item.label.replace(/[^a-zA-Z0-9-]/, '')}> <Line
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
              label={item.label}
              key={`points-${item.label}`}
              width={width - yAxisWidth}
              left={yAxisWidth}
              height={height - xAxisHeight}
              z={item.point.radius}
              fill={item.point.fill}
              showTitle={item.point.showTitle}
              stroke={item.point.stroke}
              data={item.data}
              PointComponent={PointComponent}
            />
          }

          {
            item.line.fill.show && <AreaFill
              axis={axis}
              label={item.label}
              key={`area-fill-${item.label}`}
              width={width - yAxisWidth}
              left={yAxisWidth}
              height={height - xAxisHeight}
              line={item.line}
              data={item.data} />
          }
        </Fragment>)
      }

      <YAxis
        width={yAxisWidth}
        height={height - xAxisHeight}
        scale={axis.y.scale ?? 'linear'}
        domain={domain}
      />

      <XAxis
        width={width - yAxisWidth}
        height={xAxisHeight}
        labelFormat={axisLabelFormat}
        scale={axis.x.scale ?? 'band'}
        top={height - xAxisHeight}
        left={yAxisWidth}
        values={
          values.length > 4
            ? [values[0], values[Math.floor(values.length / 4)],
            values[Math.floor(values.length / 2)],
            values[Math.floor(values.length * (3 / 4))],
            ] as number[]
            : values}
      />

    </Base>
  )
}

export default LineChart;
