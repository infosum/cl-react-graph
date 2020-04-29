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
  return <svg
    width={width}
    height={height}
    style={{ border: '1px solid red' }}
    viewBox={`0 0 ${width} ${height}`}>
    <g transform={`translate(${padding},${padding})`}
      style={{ overflow: 'visible', border: '1px solid red' }}
      width={width - (padding * 2)}
      height={height - (padding * 2)}>
      {
        children
      }
    </g>
  </svg>
};

export default Base

