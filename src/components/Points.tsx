import React, { FC } from 'react';

import {
  IProps,
  useScales,
} from '../utils/useMakeLine';

export interface IPointProps {
  cx: number;
  x: number | string | Date;
  cy: number;
  y: number | string | Date;
  z: number;
  className?: string;
}

export type TPoints = Omit<IProps, 'line'> & {
  radius?: number;
  fill?: string;
  label?: string;
  stroke?: string;
  showTitle?: boolean;
  /** @description Custom component to override the default <circle /> used to plot points */
  PointComponent?: FC<IPointProps>;
}

const Points: FC<TPoints> = (props) => {
  const {
    data,
    radius = 5,
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
        return PointComponent ?
          <PointComponent
            key={`point-${className}-${xValue}-${yValue}`}
            className={`${className}-${xValue}-${yValue}`}
            data-testid={`${className}-${xValue}-${yValue}`}
            cx={xValue}
            cy={yValue}
            x={x}
            y={y}
            z={d.z ?? radius}>
            {
              showTitle && <title>{`${x}, ${y}`}</title>
            }
          </PointComponent>
          : <circle
            key={`point-${className}-${xValue}-${yValue}`}
            className={`${className}-${xValue}-${yValue}`}
            data-testid={`${className}-${xValue}-${yValue}`}
            r={d.z ?? radius}
            cy={yValue}
            cx={xValue}
            fill={fill}
            stroke={stroke}
            {...rest}
          >
            {
              showTitle && <title>{`${x}, ${y}`}</title>
            }
          </circle>
      })
    }
  </>
}

export default Points;
