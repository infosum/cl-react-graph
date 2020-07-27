import {
  ScaleBand,
  scaleBand,
  ScaleLinear,
  scaleLinear,
} from 'd3-scale';
import React, {
  FC,
  SVGAttributes,
} from 'react';

import { IHistogramBar } from '../Histogram';

export type TAxisValue = string | number;

export interface IAxis {
  stroke?: string;
  height: number;
  width: number;
  values?: TAxisValue[];
  tickSize?: number;
  path?: SVGAttributes<SVGPathElement>;
  scale?: 'linear' | 'band';
  top?: number;
  domain?: TAxisValue[];
  left?: number;
  padding?: IHistogramBar;
}

export const defaultPath: SVGAttributes<SVGPathElement> = {
  opacity: 1,
  fill: 'none',
  stroke: '#666',
  strokeOpacity: '1',
  strokeWidth: '1',
}

const positionTick = (value: TAxisValue, scale: any, axisOffset: number) => {
  return `(${axisOffset}, ${scale(value)})`;
}

const YAxis: FC<IAxis> = ({
  values = [],
  tickSize = 2,
  width,
  height,
  path,
  scale = 'linear',
  top = 0,
  domain,
}) => {
  const yScale = scale === 'linear'
    ? scaleLinear().domain(domain as number[] || [Math.min(...values as number[]), Math.max(...values as number[])])
    : scaleBand().domain(values as string[])

  yScale.rangeRound([height, 0])

  const transform = `(${width}, ${top})`;
  const axisOffset = 0;

  const pathD = `M${axisOffset},${height} L${axisOffset},0`;

  const axisPath = { ...defaultPath, ...(path ?? {}) };
  const { fill, opacity, stroke, strokeOpacity, strokeWidth } = axisPath;
  return (
    <g className="y-axis"
      transform={`translate${transform}`}
      fill="none"
      fontSize="10"
      fontFamily="sans-serif"
      textAnchor="end">
      <path className="domain"
        stroke={stroke}
        d={pathD}
        fill={fill}
        opacity={opacity}
        shapeRendering="auto"
        strokeOpacity={strokeOpacity}
        strokeWidth={strokeWidth}
      ></path>

      {
        values.map((v, i) => {
          const tickOffset = positionTick(values[i], yScale, axisOffset);
          return (
            <g key={v} className="tick" opacity="1" transform={`translate${tickOffset}`}>
              <line stroke={stroke}
                x2={`-${tickSize}`}
                fill="none"
                opacity="1"
                shapeRendering="auto"
                strokeOpacity="1"
                strokeWidth="1">
              </line>

              <text fill={stroke} x={`-${tickSize}`} dy="0.32em">{v}</text>
            </g>
          )
        })
      }
    </g>
  )
}


export default YAxis;