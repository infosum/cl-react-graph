import {
  scaleBand,
  scaleLinear,
} from 'd3';
import {
  ScaleBand,
  ScaleLinear,
} from 'd3-scale';
import React, { FC } from 'react';

import { IAxis } from './YAxis';

type XAxis = IAxis & {
  position?: 'top' | 'middle' | 'bottom';
  left?: number;
}

const XAxis: FC<XAxis> = (props) => {
  const {
    stroke = '#666',
    values = [],
    tickSize = 2,
    width,
    height,
    position = 'bottom',
    scale = 'band',
    top = 0,
    left = 0,
  } = props;

  const xScale = scale === 'linear'
    ? scaleLinear().domain([Math.min(...values as number[]), Math.max(...values as number[])])
    : scaleBand().domain(values as string[])
      .paddingInner(0.1)
      .paddingOuter(0.2)
      .align(0.5)
  xScale.rangeRound([0, width])

  const path = `M0,0 L${width},0`;

  return (
    <g className="x-axis"
      transform={`translate(${left}, ${top})`}
      fill="none"
      fontSize="10"
      fontFamily="sans-serif"
      textAnchor="middle">
      <path className="domain"
        stroke={stroke}
        d={path}
        fill="none"
        opacity="1"
        shapeRendering="auto"
        strokeOpacity="1"
        strokeWidth="1"
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
                x={0}
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
