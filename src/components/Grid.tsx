import React, { SVGAttributes } from 'react';

type Props = {
  left?: number;
  top?: number;
  width: number;
  height: number;
  stroke?: string;
  lines?: {
    horizontal: number;
    vertical: number;
  };
  svgProps?: SVGAttributes<SVGLineElement>;
}

const baseSvgProps: SVGAttributes<SVGLineElement> = {
  fill: 'none',
  opacity: '1',
  shapeRendering: 'auto',
  strokeOpacity: '1',
  strokeWidth: '1',
}

export const Grid = ({
  left = 0,
  top = 0,
  width,
  height,
  stroke = '#666',
  lines = {
    horizontal: 2,
    vertical: 0,
  },
  svgProps = {},
}: Props) => {
  const verticals = new Array(lines.vertical).fill('');
  const horizontals = new Array(lines.horizontal).fill('');
  const lineProps = { ...baseSvgProps, ...svgProps };
  return (
    <g className="grid" transform={`translate(${left}, ${top})`}>
      {
        verticals.map((_, i) => <line
          key={'vertical-line' + i}
          stroke={stroke}
          x1={width * ((i + 1) / lines.vertical)}
          x2={width * ((i + 1) / lines.vertical)}
          y2={height}
          {...lineProps}
        >
        </line>
        )
      }
      {
        horizontals.map((_, i) => <line
          key={'horizontal-line' + i}
          stroke={stroke}
          y1={height * ((i) / lines.horizontal)}
          y2={height * ((i) / lines.horizontal)}
          x2={width}
          {...lineProps}
        >
        </line>
        )
      }
    </g>
  );
};
