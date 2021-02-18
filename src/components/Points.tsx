import React, { FC } from 'react';

import {
  IProps,
  useScales,
} from '../utils/useMakeLine';
import Point, { IPointProps } from './Point';

export type PointComponentProps = IPointStyle & IPointProps;

export interface IPointStyle {
  z?: number;
  fill?: string;
  label?: string;
  stroke?: string;
  showTitle?: boolean;
  show?: boolean;
  /** @description Custom component to override the default <circle /> used to plot points */
  PointComponent?: FC<PointComponentProps>;
}

export type TPoints = Omit<IProps, 'line' | 'curveType'> & IPointStyle;

const Points: FC<TPoints> = (props) => {
  const {
    data,
    z = 5,
    fill = '#000',
    stroke = '#000',
    showTitle = true,
    PointComponent,
  } = props;
  const { xScale, yScale } = useScales(props);
  const className = `point-${(props.label ?? '').replace(/[^a-z]/gi, '')}`;
  if (yScale === null) {
    return null;
  }
  return <>
    {
      data.map((d) => {
        const { x, y, ...rest } = d;
        const yValue = yScale(y);
        const xValue = xScale(x);
        const id = `${className}-${xValue}-${yValue}`;
        return <Point
          key={id}
          id={id}
          PointComponent={PointComponent}
          cx={xValue}
          cy={yValue}
          x={x}
          y={y}
          z={d.z ?? z}
        >
          {
            showTitle && <title>{`${x}, ${y}`}</title>
          }
        </Point>
      })
    }
  </>
}

export default Points;
