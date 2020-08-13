import { extent } from 'd3-array';
import {
  ScaleBand,
  scaleBand,
  ScaleLinear,
  scaleLinear,
  scalePoint,
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
import { AnyScale } from '../utils/scales';

export type TAxisValue = string | number;
export type TAxisLabelFormat = (axis: 'x' | 'y', bin: string, i: number) => string;

export enum ELabelOrientation {
  HORIZONTAL = 'HORIZONTAL',
  VERTICAL = 'VERTICAL',
}

export interface IAxis {
  stroke?: string;
  height: number;
  width: number;
  values?: string[] | number[];
  tickSize?: number;
  path?: SVGAttributes<SVGPathElement>;
  scale?: 'linear' | 'band' | 'point';
  top?: number;
  domain?: TAxisValue[];
  left?: number;
  padding?: IHistogramBar;
  labelFormat?: TAxisLabelFormat;
  tickFormat?: {
    stroke: string;
    fontSize?: string;
  }
  labelOrientation?: ELabelOrientation,
}

export const defaultTickFormat = {
  stroke: '#a9a9a9',
  fontSize: '10px',
}

export const defaultPath: SVGAttributes<SVGPathElement> = {
  opacity: 1,
  fill: 'none',
  stroke: '#a9a9a9',
  strokeOpacity: '1',
  strokeWidth: '1',
}

const positionTick = (value: TAxisValue, scale: any, height: number, i: number) => {
  const offset = isOfType<ScaleBand<any>>(scale, 'paddingInner')
    ? Math.floor(scale.bandwidth() / 2)
    : 0;

  const v = isOfType<ScaleBand<any>>(scale, 'paddingInner')
    ? height - (Number(scale(String(i))) + offset)
    : scale(value);
  return `(0, ${v})`
}

const YAxis: FC<IAxis> = ({
  domain,
  labelFormat,
  height,
  left = 0,
  path,
  padding,
  scale = 'linear',
  tickSize = 2,
  tickFormat = defaultTickFormat,
  top = 0,
  values = [],
  width,
  labelOrientation = ELabelOrientation.HORIZONTAL,
}) => {
  if (scale === 'linear' && typeof values[0] === 'string') {
    throw new Error('Linear axis can not accept string values');
  }
  if (scale === 'band' && !padding) {
    console.warn('band scale provided without padding settings');
  }

  let Scale: AnyScale;
  switch (scale) {
    case 'linear':
      Scale = scaleLinear()
        .domain(extent(domain ? [0, ...domain as number[]] : values as number[]) as any)
        .rangeRound([height, 0]);
      break;
    case 'band':
      const steps = new Array(values.length).fill('').map((_, i) => String(i))
      Scale = scaleBand().domain(steps)
        .paddingInner(padding ? paddingInner(padding) : 0.1)
        .paddingOuter(padding ? paddingOuter(padding) : 0.2)
        .align(0.5)
        .rangeRound([height, 0]);

      break;
    case 'point':
      Scale = scalePoint()
        .range([Number(height) / 4, Number(height) * (3 / 4)])
        .domain(values as string[]);
      break;
  }

  const transform = `(${width + left}, ${top})`;

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
          const tickOffset = positionTick(v, Scale, height, i);
          const label = scale === 'band' ? values[i] : v;
          return (
            <g
              aria-hidden={scale !== 'band'}
              role={scale === 'band' ? 'row' : ''}
              key={`x-axis-${v}.${label}.${i}`}
              className="tick"
              opacity="1"
              transform={`translate${tickOffset}`}>
              <line stroke={stroke}
                x2={`-${tickSize}`}
                fill="none"
                opacity={opacity}
                shapeRendering="auto"
                strokeOpacity="1"
                strokeWidth="1">
              </line>

              <text
                role={scale === 'band' ? 'columnheader' : ''}
                fill={tickFormat.stroke}
                textAnchor={labelOrientation === ELabelOrientation.HORIZONTAL ? 'right' : 'center'}
                writingMode={labelOrientation === ELabelOrientation.HORIZONTAL ? 'horizontal-tb' : 'vertical-rl'}
                transform={labelOrientation === ELabelOrientation.HORIZONTAL ? 'rotate(0)' : 'rotate(180)'}
                height={height}
                fontSize={tickFormat.fontSize}
                x={`-${tickSize + 10}`}
                dy={labelOrientation === ELabelOrientation.HORIZONTAL ? '0.32em' : '20'}>
                {labelFormat ? labelFormat('y', label, i) : label}
              </text>

            </g>
          )
        })
      }
    </g>
  )
}


export default YAxis;
