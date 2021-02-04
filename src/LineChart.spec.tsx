
import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import {
  render,
  screen,
} from '@testing-library/react';

import { lineChartData } from '../test/fixtures';
import { IAxes } from './legacy/types';
import LineChart from './LineChart';

beforeEach(() => {
  (SVGElement.prototype as any).getBBox = (): any => {
    return { x: 0, y: 0, width: 0, heigh: 0, bottom: 0, left: 0 };
  }
});

const axis: IAxes = {
  x: {
    height: 20,
    width: 400,
    scale: 'time',
  },
  y: {
    width: 20,
    height: 400,
    scale: 'log',
  },
};

test('LineChart', () => {

  render(<LineChart
    width={400}
    height={400}
    data={lineChartData}
    axis={axis}
  ></LineChart>
  )
  expect(screen.getAllByRole('table')).toHaveLength(1);
  expect(screen.getByTestId('line-cddcfdbcadbbdfcusage'));
  expect(screen.getByTestId('point-cddcfdbcadbbdfcusage-100-340')).toHaveAttribute('cx', '100');
  expect(screen.getByTestId('point-cddcfdbcadbbdfcusage-100-340')).toHaveAttribute('cy', '340');
});
