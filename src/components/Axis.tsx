import {
  scaleBand,
  scaleLinear,
} from 'd3-scale';
import React, { FC } from 'react';

type TAxis = 'x' | 'y';
type TAxisValue = string | number;

interface IAxis {
  stroke?: string;
  height: number;
  width: number;
  textWidth?: number;
  axis: TAxis,
  values: TAxisValue[];
  tickSize?: number;
}

const positionTick = (a: IAxis, position: number, scale: any) => {
  const length = a.axis === 'y' ? a.height : a.width;
  const p = length / a.values.length * position;
  if (a.axis === 'y') {
    return `(0, ${scale(a.values[position])})`
  }
  return `(${p}, ${length})`;
}

const Axis: FC<IAxis> = (props) => {
  const {
    axis,
    stroke,
    values,
    textWidth,
    tickSize,
    width,
    height,
  } = props;
  let scale;
  if (axis === 'y') {
    scale = scaleBand();
    scale.domain(values as string[])
      .rangeRound([height, 0]);
    values.forEach((v) => console.log(v, scale(v as string)));
  } else {
    scale = scaleLinear();
  }
  const transform = axis === 'y'
    ? `(${textWidth}, 0)`
    : `(${textWidth}, ${length})`;

  const path = axis === 'y'
    ? `M0,${height} L0,0`
    : `M0,${height} L${width},${height}`;

  return (
    <g className={`${axis}-axis`}
      transform={`translate${transform}`}
      fill="none"
      font-size="10"
      font-family="sans-serif"
      text-anchor="end">
      <path className="domain"
        stroke={stroke}
        d={path}
        fill="none" opacity="1" shape-rendering="auto" stroke-opacity="1" stroke-width="1"
      ></path>

      {
        values.map((v, i) => {
          const tickOffset = positionTick(props, i, scale);
          return (
            <g key={v} className="tick" opacity="1" transform={`translate${tickOffset}`}>
              <line stroke={stroke}
                x2={`-${tickSize}`}
                fill="none" opacity="1"
                shape-rendering="auto"
                stroke-opacity="1"
                stroke-width="1">
              </line>

              <text fill={stroke} x={`-${tickSize}`} dy="0.32em">{v}</text>
            </g>
          )
        })
      }
    </g>
  )
}

Axis.defaultProps = {
  stroke: '#666',
  axis: 'x',
  textWidth: 40,
  tickSize: 2,
}
export default Axis;
