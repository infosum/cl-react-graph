import { extent } from 'd3-array';
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
import { isOfType } from '../utils/isOfType';
import {
  defaultPath,
  IAxis,
  TAxisValue,
} from './YAxis';

const positionTick = (value: TAxisValue, scale: any) => {
  const offset = isOfType<ScaleBand<any>>(scale, 'paddingInner')
    ? scale.bandwidth() / 2
    : 0;
  return `(${scale(value) + offset}, 0)`
}

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
  if (scale === 'linear' && typeof values[0] === 'string') {
    throw new Error('Linear axis can not accept string values');
  }
  if (scale === 'band' && !padding) {
    console.warn('band scale provided without padding settings');
  }
  const Scale = scale === 'linear'
    ? scaleLinear().domain(extent([0, ...domain as number[]]) || extent(values))
    : scaleBand().domain(values as string[])

  if (isOfType<ScaleBand<any>>(Scale, 'paddingInner')) {
    Scale.paddingInner(padding ? paddingInner(padding) : 0.1)
      .paddingOuter(padding ? paddingOuter(padding) : 0.2)
      .align(0.5)
  }
  Scale.rangeRound([0, width])

  const transform = `${left}, ${top}`;

  const pathD = `M0,0 L${width},0`;
  const axisPath = { ...defaultPath, ...(path ?? {}) };
  const { fill, opacity, stroke, strokeOpacity, strokeWidth } = axisPath;

  const ticks: any[] = (values.length === 0 && scale === 'linear')
    ? Scale.domain()
    : values;

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
        ticks.map((v, i) => {
          const tickOffset = positionTick(v, Scale);

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

              <text
                fill={stroke}
                dy="1em">
                {v}
              </text>
            </g>
          )
        })
      }
    </g>
  )
}

export default XAxis;
