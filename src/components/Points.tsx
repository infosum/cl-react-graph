import React, { FC } from "react";

import { Props, useScales } from "../utils/useMakeLine";
import { Point, PointProps } from "./Point";

export type PointComponentProps = PointStyle & PointProps;

export type PointStyle = {
  z?: number;
  fill?: string;
  label?: string;
  stroke?: string;
  showTitle?: boolean;
  show?: boolean;
  /** @description Custom component to override the default <circle /> used to plot points */
  PointComponent?: FC<PointComponentProps>;
};

export type TPoints = Omit<Props, "line" | "curveType"> & PointStyle;

export const Points = (props: TPoints) => {
  const {
    data,
    z = 5,
    fill = "#000",
    stroke = "#000",
    showTitle = true,
    PointComponent,
  } = props;
  const { xScale, yScale } = useScales(props);
  const className = `point-${(props.label ?? "").replace(/[^a-z]/gi, "")}`;
  if (yScale === null) {
    return null;
  }
  return (
    <>
      {data.map((d) => {
        const { x, y, ...rest } = d;
        const yValue = yScale(y);
        const xValue = xScale(x);
        const id = `${className}-${xValue}-${yValue}`;
        return (
          <Point
            key={id}
            id={id}
            PointComponent={PointComponent}
            cx={xValue}
            cy={yValue}
            x={x}
            y={y}
            z={d.z ?? z}
          >
            {showTitle && <title>{`${x}, ${y}`}</title>}
          </Point>
        );
      })}
    </>
  );
};
