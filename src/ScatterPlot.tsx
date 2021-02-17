import React, {
  FC,
  Fragment,
} from 'react';

import Base from './components/Base';
import Grid from './components/Grid';
import Points, { IPointProps } from './components/Points';
import XAxis from './components/XAxis';
import YAxis, { TAxisLabelFormat } from './components/YAxis';
import { IGrid } from './Histogram';
import { IAxes } from './legacy/types';
import {
  IChartPoint,
  IChartPointValue,
} from './LineChart';
import { useScatterDomain } from './utils/useDomain';

export interface IScatterPlotDataSet<T> {
  label: string;
  point: {
    radius: number;
    stroke: string;
    fill: string;
    show: boolean;
    showTitle?: boolean;
  };
  data: T[];
}

export interface IProps<T extends IChartPoint<IChartPointValue, IChartPointValue> = IChartPoint> {
  axis: IAxes;
  data: IScatterPlotDataSet<T>[];
  grid?: IGrid;
  height: number;
  id?: string;
  width: number;
  xAxisHeight?: number;
  yAxisWidth?: number;
  title?: string;
  description?: string;
  /**
   * @description if true then adds a 0 to the data domain. Useful if you don't want your lowest value to appear on top of the x axis
   */
  clampToZero?: boolean;
  axisLabelFormat?: TAxisLabelFormat;
  /** @description Custom component to override the default <circle /> used to plot points */
  PointComponent?: FC<IPointProps>;
}

const ScatterPlot: FC<IProps> = ({
  axis,
  clampToZero = true,
  data,
  grid,
  height,
  width,
  xAxisHeight = 60,
  yAxisWidth = 100,
  title,
  description,
  axisLabelFormat,
  PointComponent,
}) => {
  const domain = useScatterDomain({
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
        data.map((item) => <Fragment key={item.label.replace(/[^a-zA-Z0-9-]/, '')}>

          {
            item.point.show &&
            <Points
              axis={axis}
              label={item.label}
              key={`points-${item.label}`}
              width={width - yAxisWidth}
              left={yAxisWidth}
              height={height - xAxisHeight}
              radius={item.point.radius}
              fill={item.point.fill}
              showTitle={item.point.showTitle}
              stroke={item.point.stroke}
              data={item.data}
              PointComponent={PointComponent} />
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

export default ScatterPlot;
