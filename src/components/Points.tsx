import React, { FC } from 'react';

import {
  IProps,
  useScales,
} from '../utils/useMakeLine';

export type TPoints = Omit<IProps, 'line'> & {
  radius?: number;
  fill?: string;
  stroke?: string;
}

const Points: FC<TPoints> = (props) => {
  const { data, radius = 5, fill = '#000', stroke = '#000' } = props;
  const { xScale, yScale } = useScales(props);

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
          key={`point-${xValue}-${yValue}`}
          className={`point-${xValue}-${yValue}`}
          r={radius}
          cy={yValue}
          cx={xValue}
          fill={fill}
          stroke={stroke}
          {...rest}
        />
      })
    }
  </>
}

export default Points;
