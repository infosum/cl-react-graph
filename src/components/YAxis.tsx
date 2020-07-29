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

import { IHistogramBar } from '../Histogram';
import {
  paddingInner,
  paddingOuter,
} from '../utils/bars';
import { isOfType } from '../utils/isOfType';

export type TAxisValue = string | number;

export interface IAxis {
  stroke?: string;
  height: number;
  width: number;
  values?: string[] | number[];
  tickSize?: number;
  path?: SVGAttributes<SVGPathElement>;
  scale?: 'linear' | 'band';
  top?: number;
  domain?: TAxisValue[];
  left?: number;
  padding?: IHistogramBar;
  binLabelFormat?: (axis: 'x' | 'y', bin: string, i: number) => string;
  tickFormat?: {
    stroke: string;
  }
}

export const defaultTickFormat = {
  stroke: '#a9a9a9',
}

export const defaultPath: SVGAttributes<SVGPathElement> = {
  opacity: 1,
  fill: 'none',
  stroke: '#666',
  strokeOpacity: '1',
  strokeWidth: '1',
}

const positionTick = (value: TAxisValue, scale: any, height: number) => {
  const offset = isOfType<ScaleBand<any>>(scale, 'paddingInner')
    ? Math.floor(scale.bandwidth() / 2)
    : 0;
  const v = isOfType<ScaleBand<any>>(scale, 'paddingInner')
    ? height - (Number(scale(value)) + offset)
    : scale(value);
  return `(0, ${v})`
}

const YAxis: FC<IAxis> = ({
  binLabelFormat,
  values = [],
  tickSize = 2,
  width,
  height,
  path,
  scale = 'linear',
  top = 0,
  domain,
  padding,
  tickFormat = defaultTickFormat,
}) => {
  if (scale === 'linear' && typeof values[0] === 'string') {
    throw new Error('Linear axis can not accept string values');
  }
  if (scale === 'band' && !padding) {
    console.warn('band scale provided without padding settings');
  }
  const Scale = scale === 'linear'
    ? scaleLinear().domain(domain ? extent([0, ...domain as number[]]) : extent(values as number[]) as any)
    : scaleBand().domain(values as string[])

  if (isOfType<ScaleBand<any>>(Scale, 'paddingInner')) {
    Scale.paddingInner(padding ? paddingInner(padding) : 0.1)
      .paddingOuter(padding ? paddingOuter(padding) : 0.2)
      .align(0.5)
  }
  Scale.rangeRound([height, 0])

  const transform = `(${width}, ${top})`;

  const pathD = `M0,${height} L0,0`;

  const axisPath = { ...defaultPath, ...(path ?? {}) };
  const { fill, opacity, stroke, strokeOpacity, strokeWidth } = axisPath;
  const ticks: any[] = (values.length === 0 && scale === 'linear')
    ? Scale.domain()
    : values;
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
        ticks.map((v, i) => {
          const tickOffset = positionTick(v, Scale, height);
          return (
            <g
              key={v}
              className="tick"
              opacity="1"
              transform={`translate${tickOffset}`}>
              <line stroke={stroke}
                x2={`-${tickSize}`}
                fill="none"
                opacity="1"
                shapeRendering="auto"
                strokeOpacity="1"
                strokeWidth="1">
              </line>

              <text
                fill={tickFormat.stroke}
                x={`-${tickSize + 10}`}
                dy="0.32em">
                {binLabelFormat ? binLabelFormat('y', v, i) : v}
              </text>
            </g>
          )
        })
      }
    </g>
  )
}


export default YAxis;
