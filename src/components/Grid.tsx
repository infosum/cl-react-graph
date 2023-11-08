import React, { SVGAttributes } from "react";

import { GridProps } from "../";

type Props = {
  left?: number;
  top?: number;
  width: number;
  height: number;
  /** @deprecated use x/y instead */
  stroke?: string;
  /** @deprecated use x/y instead */
  lines?: {
    horizontal: number;
    vertical: number;
  };
  /** @deprecated use x/y instead */
  svgProps?: SVGAttributes<SVGLineElement>;
} & Partial<GridProps>;

const baseSvgProps: SVGAttributes<SVGLineElement> = {
  fill: "none",
  opacity: "1",
  shapeRendering: "auto",
  strokeOpacity: "1",
  strokeWidth: "1",
};

export const Grid = (props: Props) => {
  const { left = 0, top = 0, width, height } = props;
  const verticalLines = getLineCount(props, "x");
  const horizontalLines = getLineCount(props, "y");
  const verticals = new Array(verticalLines).fill("");
  const horizontals = new Array(horizontalLines).fill("");
  return (
    <g className="grid" transform={`translate(${left}, ${top})`}>
      {verticals.map((_, i) => (
        <line
          data-testid={"vertical-line" + i}
          key={"vertical-line" + i}
          x1={width * ((i + 1) / verticalLines)}
          x2={width * ((i + 1) / verticalLines)}
          y2={height}
          {...getLineProps(props, "x")}
        ></line>
      ))}
      {horizontals.map((_, i) => (
        <line
          data-testid={"horizontal-line" + i}
          key={"horizontal-line" + i}
          y1={height * (i / horizontalLines)}
          y2={height * (i / horizontalLines)}
          x2={width}
          {...getLineProps(props, "y")}
        ></line>
      ))}
    </g>
  );
};

const getLineCount = (props: Props, axis: "x" | "y") => {
  if (axis == "x" && props.x) {
    return props.x.visible ? props.x.ticks : 0;
  }
  if (axis == "y" && props.y) {
    return props.y.visible ? props.y.ticks : 0;
  }
  return props.lines?.vertical ?? 0;
};

const getLineProps = (props: Props, axis: "x" | "y") => {
  if (axis === "x" && props.x) {
    return { ...baseSvgProps, ...props.x.style };
  }
  if (axis === "y" && props.y) {
    return { ...baseSvgProps, ...props.y.style };
  }
  return {
    ...baseSvgProps,
    ...props.svgProps,
    stroke: props.stroke ?? props.svgProps?.stroke ?? "#666",
  };
};
