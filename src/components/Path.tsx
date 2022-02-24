import React, {
  FC,
  HTMLAttributes,
} from 'react';

interface IPathProps {
  fill: string;
  stroke?: string
  d: string;
  opacity: number;
}

const Path: FC<IPathProps & HTMLAttributes<SVGElement>> = ({
  d,
  fill,
  stroke,
  id,
  opacity,
  onMouseEnter,
  onMouseLeave,
}) => {
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

export default Path;
