import React, { HTMLAttributes } from 'react';

type Props = {
  fill: string;
  stroke?: string
  d: string;
  opacity: number;
}

export const Path = ({
  d,
  fill,
  stroke,
  id,
  opacity,
  onMouseEnter,
  onMouseLeave,
}: Props & HTMLAttributes<SVGElement>) => {
  return (
    <path
      id={id}
      data-testid={id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      fill={fill}
      stroke={stroke ?? fill}
      style={{ transition: 'all 0.5s ease', opacity }}
      d={d}
    />
  )
}
