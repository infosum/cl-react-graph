import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { schemeSet3 } from 'd3-scale-chromatic';
import { line } from 'd3-shape';
import React, {
  Fragment,
  useState,
} from 'react';

import { Base } from './components/Base';
import { Path } from './components/Path';
import {
  defaultPointStyle,
  Point,
} from './components/Point';
import { PointStyle } from './components/Points';
import {
  polar2cart,
  Web,
} from './components/Web';

export type RadarChartData = {
  label?: string;
  axes: {
    axis: string,
    value: number,
  }[];
}

export type Props = {
  /** @description Chart colour scheme */
  colorScheme?: readonly string[];
  /** @description Chart height */
  height: number;
  /** @description Chart id */
  id?: string;
  /** @description Padding in pixels around the radar chat SVG elements */
  padding?: number;
  /** @description Chart width */
  width: number;
  /** @description Chart data, array of plots each one will be rendered as as filled path inside the radar */
  data: RadarChartData[];
  /** @description Custom component to override the default <circle /> used to plot points */
  points?: PointStyle[];
  /** @description Chart <title /> */
  title?: string;
}

const buildArea = (
  datum: RadarChartData,
  labels: string[],
  center: [number, number],
  extent: [number, number] | [undefined, undefined],
) => {
  const angle = 360 / labels.length;
  const radius = Math.min(...center);

  const Scale = scaleLinear()
    .domain(extent as [number, number])
    .rangeRound([0, radius]);

  const points: [number, number][] = datum.axes.map((axis) => {
    const labelIndex = labels.findIndex((label) => label === axis.axis);
    return polar2cart(angle * labelIndex, Scale(axis.value) ?? 0);
  })
    .map((p) => [center[0] + p[0], center[1] + p[1]]);
  return points;
}

export const RadarChart = ({
  colorScheme = schemeSet3,
  data,
  height,
  id,
  padding = 15,
  points = [],
  title,
  width,
}: Props) => {

  const allValues = data.reduce((prev, next) => prev.concat(next.axes.map((a) => a.value)), [] as number[]);
  const labels = data.reduce((prev, next) => {
    next.axes.forEach((a) => {
      if (!prev.includes(a.axis)) {
        prev.push(a.axis);
      }
    })
    return prev;
  }, [] as string[]);
  const center: [number, number] = [(width - (padding * 2)) / 2, (height - (padding * 2)) / 2];

  const ext = extent<number>(allValues);
  const pointsData = data.map((datum) => buildArea(datum, labels, center, ext));
  const [isOver, setIsOver] = useState<string | null>(null);
  return (
    <Base
      height={height}
      id={id}
      title={title}
      width={width}
    >
      <Web
        labels={labels}
        center={center}
      />
      {
        data.map((datum, i) => {
          const labelId = (datum.label ?? '').replace(/[^a-z]/gi, '');
          return (
            <Fragment key={`area-${labelId}`}>
              <Path
                id={`area-fill-${labelId}`}
                fill={colorScheme[i]}
                opacity={isOver === null ? 0.5
                  : labelId === isOver ? 1 : 0.1}
                onMouseEnter={() => setIsOver(labelId)}
                onMouseLeave={() => setIsOver(null)}
                d={line()(pointsData[i]) ?? ''}
              />
              {
                pointsData[i].map((ptns, j) => {
                  const pointStyle = points[i] ?? defaultPointStyle;
                  const id = `point-${labelId}-${datum.axes[j].axis.replace(/[^a-z]/gi, '')}`;
                  return <Point
                    id={id}
                    key={id}
                    cx={ptns[0]}
                    cy={ptns[1]}
                    x={ptns[0]}
                    y={ptns[1]}
                    PointComponent={pointStyle?.PointComponent}
                    z={pointStyle.z ?? 3}>
                    {
                      pointStyle?.showTitle && <title>{labelId}: {datum.axes[j].value}</title>
                    }
                  </Point>
                })
              }
            </Fragment>
          )
        })
      }
    </Base>
  );
}
