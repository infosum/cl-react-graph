import React, { FC } from 'react';

interface IProps {
  width: number;
  height: number;
  padding?: number;
}
const Base: FC<IProps> = ({
  children,
  width,
  height,
  padding = 15,
}) => {
  // Could be measuring a % width in which case wait else animations start off from 
  // the wrong position
  if (width === 0) {
    return null;
  }
  return <svg
    width={width}
    height={height}
    style={{ overflow: 'visible' }}
    viewBox={`0 0 ${width} ${height}`}>
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

