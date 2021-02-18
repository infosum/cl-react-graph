import React, {
  FC,
  HTMLAttributes,
} from 'react';

interface IPathProps {
  fill: string;
  d: string;
  opacity: number;
}

const Path: FC<IPathProps & HTMLAttributes<SVGElement>> = ({
  d,
  fill,
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
      stroke={fill}
      style={{ transition: 'all 0.5s ease', opacity }}
      d={d}
    />
  )
}

export default Path;
