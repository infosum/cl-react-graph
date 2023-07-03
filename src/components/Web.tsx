import { lineRadial } from 'd3-shape';
import React from 'react';

type Props = {
  axis?: {
    stroke?: string;
    strokeWidth?: number;
  }
  labels: string[];
  /** @description The number of radial lines to render */
  ticks?: number;
  center: [number, number];
  radial?: {
    stroke?: string;
    strokeWidth?: number;
  }

}

const degToRadians = (degree: number) => (Math.PI * 2 * degree / 360);

export const polar2cart = (degree: number, radius: number): [number, number] => {
  const a = degToRadians(degree);
  return [Math.sin(a) * radius, -Math.cos(a) * radius];
}

/**
 * @description radial lines are the lighter lines joining the axes together.
 */
const buildRadial = (labels: string[], radius: number) => {
  const angle = 360 / labels.length;
  const braids: [number, number][] = labels.map((_, i) => [degToRadians(angle) * i, radius]);
  // Join up the braid to the start.
  braids.push(braids[0]);
  return lineRadial()(braids) ?? '';
}

export const Web = ({
  axis,
  ticks = 7,
  labels,
  center,
  radial,
}: Props) => {
  const radius = Math.min(...center);
  const angle = 360 / labels.length;

  return (
    <>
      {
        Array(ticks).fill('').map((_, i) => <path
          key={`radial-${i}`}
          transform={`translate(${center[0]} ${center[1]})`}
          d={buildRadial(labels, (radius / (ticks + 1)) * (i + 1))}
          stroke={radial?.stroke ?? '#eee'}
          fill="none"
          strokeWidth={radial?.strokeWidth ?? '1'}
        />)
      }
      {
        labels.map((label, i) => {
          const c = polar2cart(angle * i, radius + 15);
          const id = `axis-${label.replace(/[^a-z]/gi, '')}`;
          return <g key={id}>
            <path
              data-testid={id}
              id={id}
              transform={`rotate(${angle * i} ${center[0]} ${center[1]})`}
              d={`M${center[0]},${center[1]} L${radius},0`}
              stroke={axis?.stroke ?? '#AAA'}
              fill="none"
              strokeWidth={axis?.strokeWidth ?? '1'}
            > </path>
            <text x={center[0] + c[0]}
              y={center[1] + c[1]}>
              {label}
            </text>
          </g>
        })
      }
    </>
  )
}
