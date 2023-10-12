import React from "react";

import { PointStyle } from "./Points";

export const defaultPointStyle: PointStyle = {
  show: true,
  showTitle: true,
  z: 3,
  fill: "#eee",
  stroke: "#555",
};

export type PointProps<V = number | string | Date> = {
  id?: string;
  /** @description Pixel x value */
  cx: number;
  /** @description Pixel y value */
  cy: number;
  /** @description Actual X value */
  x?: V;
  /** @description Actual Y value */
  y?: V;
  z?: number;
  className?: string;
  opacity?: number;
  children?: React.ReactNode;
};

export const Point = ({
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
  opacity,
}: PointStyle & PointProps) => {
  return PointComponent ? (
    <PointComponent
      data-testid={id}
      cx={Math.round(cx)}
      cy={Math.round(cy)}
      x={x ?? cx}
      y={y ?? cy}
      z={z ?? 3}
    >
      {children}
    </PointComponent>
  ) : (
    <circle
      data-testid={id}
      r={z ?? 3}
      style={{ transition: "all 0.5s ease", opacity }}
      cx={Math.round(cx)}
      cy={Math.round(cy)}
      fill={fill}
      stroke={stroke}
    >
      {children}
    </circle>
  );
};
