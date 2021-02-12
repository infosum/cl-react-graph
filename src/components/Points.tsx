import React, { FC } from 'react';

import {
  IProps,
  useScales,
} from '../utils/useMakeLine';

export type TPoints = Omit<IProps, 'line'> & {
  radius?: number;
  fill?: string;
  label?: string;
  stroke?: string;
  showTitle?: boolean;
}

const Points: FC<TPoints> = (props) => {
  const {
    data,
    radius = 5,
    fill = '#000',
    stroke = '#000',
    showTitle = true,
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
        return <circle
          key={`point-${className}-${xValue}-${yValue}`}
          className={`${className}-${xValue}-${yValue}`}
          data-testid={`${className}-${xValue}-${yValue}`}
          r={radius}
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
