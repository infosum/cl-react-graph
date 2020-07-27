import React, { FC } from 'react';

import {
  IProps,
  useScales,
} from '../utils/useMakeLine';

const Points: FC<IProps> = (props) => {
  const { data } = props;
  const { xScale, yScale } = useScales(props);

  if (yScale === null) {
    return null;
  }

  return <>
    {
      data.data.map((d) => {
        const { x, y, ...rest } = d;
        const yValue = yScale(y);
        const xValue = xScale(x);
        return <circle
          key={`point-${xValue}-${yValue}`}
          className={`point-${xValue}-${yValue}`}
          r={5}
          cy={yValue}
          cx={xValue}
          {...rest}
        />
      })
    }
  </>
}

export default Points;
