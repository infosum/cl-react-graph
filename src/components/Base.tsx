import React, {
  FC,
  HTMLAttributes,
} from 'react';

interface IProps {
  width: number;
  height: number;
  padding?: number;
  description?: string;
}
const Base: FC<IProps & HTMLAttributes<SVGElement>> = ({
  children,
  width,
  height,
  padding = 15,
  id,
  className,
  style,
  title,
  description,
}) => {
  // Could be measuring a % width in which case wait else animations start off from 
  // the wrong position
  if (width === 0) {
    return null;
  }
  return <svg
    id={id}
    className={className}
    width={width}
    height={height}
    style={{ overflow: 'visible', ...style }}
    viewBox={`0 0 ${width} ${height}`}>
    <title style={{ pointerEvents: 'none' }}>{title}</title>
    {
      description && <desc>{description}</desc>
    }
    <g transform={`translate(${padding},${padding})`}
      role="table"
      width={width - (padding * 2)}
      height={height - (padding * 2)}>
      {
        children
      }
    </g>
  </svg>
};

export default Base

