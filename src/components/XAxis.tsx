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

import {
  paddingInner,
  paddingOuter,
} from '../utils/bars';
import {
  defaultPath,
  IAxis,
} from './YAxis';

const XAxis: FC<IAxis> = ({
  values = [],
  tickSize = 2,
  width,
  height,
  path,
  top = 0,
  left = 0,
  scale = 'band',
  domain,
  padding,
}) => {

  const xScale = scale === 'linear'
    ? scaleLinear().domain(domain as number[] || [Math.min(...values as number[]), Math.max(...values as number[])])
    : scaleBand().domain(values as string[])
      .paddingInner(padding ? paddingInner(padding) : 0.1)
      .paddingOuter(padding ? paddingOuter(padding) : 0.2)
      .align(0.5)
  xScale.rangeRound([0, width])

  const transform = `${left}, ${top}`;

  const pathD = `M0,0 L${width},0`;
  const axisPath = { ...defaultPath, ...(path ?? {}) };
  const { fill, opacity, stroke, strokeOpacity, strokeWidth } = axisPath;

  return (
    <g className="x-axis"
      transform={`translate(${transform})`}
      fill="none"
      fontSize="10"
      fontFamily="sans-serif"
      textAnchor="middle">
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
          const x = scale === 'linear'
            ? (xScale as ScaleLinear<any, any>)(Number(v))
            : (xScale as ScaleBand<any>)(String(v));
          const offset = scale === 'linear'
            ? 0
            : (xScale as ScaleBand<any>).bandwidth() / 2;
          const tickOffset = `(${x + offset}, 0)`
          return (
            <g
              key={v}
              className="tick"
              opacity="1"
              textAnchor="middle"
              transform={`translate${tickOffset}`}>
              <line stroke={stroke}
                x1={0}
                y2={`${tickSize}`}
                fill="none"
                opacity="1"
                shapeRendering="auto"
                strokeOpacity="1"
                strokeWidth="1">
              </line>

              <text fill={stroke} dy="1em">{v}</text>
            </g>
          )
        })
      }
    </g>
  )
}

export default XAxis;
