import { descending } from 'd3-array';
import {
  chord,
  ribbon,
} from 'd3-chord';
import { schemeSet3 } from 'd3-scale-chromatic';
import { arc } from 'd3-shape';
import React, { useState } from 'react';

import { Base } from './components/Base';
import {
  ColorScheme,
  getFill,
} from './utils/colorScheme';

export type Props = {
  width: number;
  height: number;
  padding?: number;
  data: Record<string, number[]>;
  colorScheme?: ColorScheme;
  /** @description Chart <title /> */
  title?: string;
  inactive?: {
    stroke: string;
    fill: string;
  }
}

export const Chord = ({
  width,
  height,
  padding = 10,
  data,
  colorScheme = schemeSet3,
  inactive = {
    stroke: '#ddd',
    fill: '#eee',
  },
  title,
}: Props) => {

  const outerRadius = Math.min(width - padding, height - padding) * 0.5
  const innerRadius = outerRadius - 10;

  const labels = Object.keys(data);
  const matrix = Object.values(data);

  const thisArc = arc<any, any>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

  const chords = chord()
    .sortSubgroups(descending)
    .sortChords(descending)
    .padAngle(10 / innerRadius)(matrix);

  const rPath = ribbon().radius((width - padding) / 2 - 10);

  const [active, setActive] = useState<number>();
  return (
    <Base
      height={height}
      title={title}
      width={width}
    >
      <g className="ribbons"
        transform={`translate(${(width) / 2},${height / 2})`}>
        {
          chords
            .map((m, i) => <g><path
              stroke={inactive.stroke}

              style={{
                opacity: [m.source.index, m.target.index].includes(active as number) ? 1 : 0.5,
                mixBlendMode: "multiply",
              }}
              fill={active === m.source.index ? getFill(colorScheme[m.source.index]) :
                active === m.target.index ? getFill(colorScheme[m.target.index])
                  : inactive.fill}
              d={`${rPath({
                source: {
                  ...m.source,
                  radius: 100,
                }, target: {
                  ...m.target,
                  radius: 100,
                }
              })}`}
              onMouseEnter={() => setActive(m.source.index)}
              onMouseLeave={() => setActive(undefined)}
            >
              <title>[{m.source.value}] {labels[m.source.index]} → [{m.target.value}] {labels[m.target.index]}</title>
            </path>



            </g>)
        }
      </g>
      <g className="arcs"
        transform={`translate(${(width) / 2},${height / 2})`}>
        {
          chords.groups.map((arc, i: number) => {
            const fill = getFill(colorScheme[i]);
            return (
            <>
              <path
                stroke={fill}
                fill={fill}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(undefined)}
                d={thisArc(arc) ?? ''}
              ></path>
              <g transform={`rotate(${(arc.endAngle - ((arc.endAngle - arc.startAngle) / 2)) * 180 / Math.PI - 90}) translate(${outerRadius},0)`}>
                <text x={0}
                  y={-10}
                  dy="0.55rem"
                  transform="rotate(90)"
                  textAnchor="middle"
                >{labels[arc.index]}</text>
              </g>
            </>
            );
          }
          )
        }
      </g>
    </Base>
  )
}
