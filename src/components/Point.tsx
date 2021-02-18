import React, { FC } from 'react';

import { IPointStyle } from './Points';

export const defaultPointStyle: IPointStyle = {
  show: true,
  showTitle: true,
  z: 3,
  fill: '#eee',
  stroke: '#555',
};


export interface IPointProps {
  id?: string;
  /** @description Pixel x value */
  cx: number;
  /** @description Pixel y value */
  cy: number;
  /** @description Actual X value */
  x: number | string | Date;
  /** @description Actual Y value */
  y: number | string | Date;
  z: number;
  className?: string;
}

const Point: FC<IPointStyle & IPointProps> = ({
  children,
  cx,
  cy,
  fill = defaultPointStyle.fill,
  id,
  PointComponent,
  z = defaultPointStyle.z,
  stroke = defaultPointStyle.stroke,
  x,
  y,
}) => {
  return PointComponent ?
    <PointComponent
      data-testid={id}
      cx={Math.round(cx)}
      cy={Math.round(cy)}
      x={x}
      y={y}
      z={z ?? 3} >
      {children}
    </PointComponent>
    : <circle
      data-testid={id}
      r={z ?? 3}
      cx={Math.round(cx)}
      cy={Math.round(cy)}
      fill={fill}
      stroke={stroke}
    >
      {children}
    </circle>
}

export default Point;
