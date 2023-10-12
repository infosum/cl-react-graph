import { extent } from "d3-array";
import {
  ScaleBand,
  scaleBand,
  scaleLinear,
  scalePoint,
  scaleSymlog,
  scaleTime,
} from "d3-scale";
import React, { SVGAttributes } from "react";

import { HistogramBar } from "../Histogram";
import { buildTicks } from "../utils/axis";
import { paddingInner, paddingOuter } from "../utils/bars";
import { isOfType } from "../utils/isOfType";
import { AnyScale } from "../utils/scales";
import { SVGLineStyle, SVGTextStyle } from "../utils/types";
import { defaultPadding } from "./Bars/Bars";

export type TAxisValue = string | number;
export type TAxisLabelFormat = (
  axis: "x" | "y",
  bin: string,
  i: number
) => string;

export enum ELabelOrientation {
  HORIZONTAL = "HORIZONTAL",
  VERTICAL = "VERTICAL",
}

type TTickFormat = (
  label: string,
  i: number
) => {
  stroke: string;
  fontSize?: string;
};

export type Axis = {
  stroke?: string;
  height: number;
  width: number;
  values?: string[] | number[];
  tickSize?: number;
  path?: SVGAttributes<SVGPathElement>;
  scale?: "linear" | "band" | "point" | "log" | "time";
  top?: number;
  domain?: TAxisValue[];
  left?: number;
  padding?: HistogramBar;
  labelFormat?: TAxisLabelFormat;
  /** @description make the axis ticks display in the opposite direction */
  inverse?: boolean;

  tickFormat?:
    | {
        stroke: string;
        fontSize?: string;
      }
    | TTickFormat;
  labelOrientation?: ELabelOrientation;

  /** @deprecated used for backwards compat with legacy v2 components */
  numberFormat?: string;
  dateFormat?: string;
  label?: string;
  margin?: number;
  text?: {
    style: SVGTextStyle;
  };
  style?: SVGLineStyle;
};

export const defaultTickFormat = {
  stroke: "#a9a9a9",
  fontSize: "10px",
};

export const defaultPath: SVGAttributes<SVGPathElement> = {
  opacity: 1,
  fill: "none",
  stroke: "#a9a9a9",
  strokeOpacity: "1",
  strokeWidth: "1",
};

type BuildScale = {
  domain?: TAxisValue[];
  /** @description width for x axis, height for y axis */
  length: number;
  padding: HistogramBar;
  scale: "linear" | "band" | "point" | "log" | "time";
  values: string[] | number[];
  range: [number, number];
};
export const buildScale = ({
  domain,
  length,
  padding,
  scale,
  values,
  range,
}: BuildScale) => {
  let Scale: AnyScale;
  switch (scale) {
    case "linear":
      Scale = scaleLinear()
        .domain(
          extent(
            domain ? [...(domain as number[])] : (values as number[])
          ) as any
        )
        .rangeRound(range);
      break;
    case "band":
      const steps = new Array(values.length).fill("").map((_, i) => String(i));
      Scale = scaleBand()
        .domain(steps)
        .paddingInner(padding ? paddingInner(padding) : 0.1)
        .paddingOuter(padding ? paddingOuter(padding) : 0.2)
        .align(0.5)
        .rangeRound(range);
      break;
    default:
    case "point":
      Scale = scalePoint()
        .range([Number(length) / 4, Number(length) * (3 / 4)])
        .domain(values as string[]);

      break;
    case "log":
      const d = extent(
        domain ? [0, ...(domain as number[])] : (values as number[])
      ) as any;
      Scale = scaleSymlog()
        .clamp(true) // clamp values below 1 to be equal to 0
        .domain(d)
        .rangeRound(range);
      break;
    case "time":
      const ex = extent(
        domain ? [0, ...(domain as number[])] : (values as any[])
      ) as any;
      Scale = scaleTime().domain(ex).rangeRound(range);
      break;
  }
  return Scale;
};

const positionTick = (
  value: TAxisValue,
  scale: any,
  height: number,
  i: number,
  inverse: boolean = false
) => {
  const offset = isOfType<ScaleBand<any>>(scale, "paddingInner")
    ? Math.floor(scale.bandwidth() / 2)
    : 0;

  let v = isOfType<ScaleBand<any>>(scale, "paddingInner")
    ? height - (Number(scale(String(i))) + offset)
    : scale(value);

  if (inverse) {
    v = height - v;
  }
  return `(0, ${v})`;
};

export const YAxis = ({
  domain,
  labelFormat,
  height,
  left = 0,
  path,
  padding = defaultPadding,
  scale = "linear",
  tickSize = 2,
  tickFormat = defaultTickFormat,
  top = 0,
  values = [],
  width,
  labelOrientation = ELabelOrientation.HORIZONTAL,
  inverse,
}: Axis) => {
  if (scale === "linear" && typeof values[0] === "string") {
    throw new Error("Linear axis can not accept string values");
  }
  if (scale === "band" && !padding) {
    console.warn("band scale provided without padding settings");
  }

  const Scale = buildScale({
    domain,
    length: height,
    padding,
    scale,
    values,
    range: [height, 0],
  });

  const transform = `(${width + left}, ${top})`;

  const pathD = `M0,${height} L0,0`;

  const axisPath = { ...defaultPath, ...(path ?? {}) };
  const { fill, opacity, stroke, strokeOpacity, strokeWidth } = axisPath;
  const d = Scale.domain() as [number, number];

  const ticks = buildTicks(scale, values, d);

  return (
    <g
      className="y-axis"
      data-testid="y-axis"
      transform={`translate${transform}`}
      fill="none"
      fontSize="10"
      fontFamily="sans-serif"
      textAnchor="end"
    >
      <path
        className="domain"
        stroke={stroke}
        d={pathD}
        fill={fill}
        opacity={opacity}
        shapeRendering="auto"
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
      ></path>

      {ticks.map((v, i) => {
        const tickOffset = positionTick(v, Scale, height, i, inverse);
        const label = scale === "band" ? String(values[i]) : String(v);
        const thisFormat =
          typeof tickFormat === "function" ? tickFormat(label, i) : tickFormat;
        return (
          <g
            aria-hidden={scale !== "band"}
            role={scale === "band" ? "row" : ""}
            key={`x-axis-${v}.${label}.${i}`}
            className="tick"
            opacity="1"
            transform={`translate${tickOffset}`}
          >
            <line
              stroke={stroke}
              x2={`-${tickSize}`}
              fill="none"
              opacity={opacity}
              shapeRendering="auto"
              strokeOpacity="1"
              strokeWidth="1"
            ></line>

            <text
              role={scale === "band" ? "columnheader" : ""}
              fill={thisFormat.stroke}
              fontSize={thisFormat.fontSize}
              textAnchor={
                labelOrientation === ELabelOrientation.HORIZONTAL
                  ? "right"
                  : "center"
              }
              writingMode={
                labelOrientation === ELabelOrientation.HORIZONTAL
                  ? "horizontal-tb"
                  : "vertical-rl"
              }
              transform={
                labelOrientation === ELabelOrientation.HORIZONTAL
                  ? "rotate(0)"
                  : "rotate(180)"
              }
              height={height}
              x={`-${tickSize + 10}`}
              dy={
                labelOrientation === ELabelOrientation.HORIZONTAL
                  ? "0.32em"
                  : "20"
              }
            >
              {labelFormat ? labelFormat("y", label, i) : label}
            </text>
          </g>
        );
      })}
    </g>
  );
};
