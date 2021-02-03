
import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import {
  render,
  screen,
} from '@testing-library/react';

import UpsetChart, { TUpsetData } from './UpsetChart';

const data: TUpsetData = [
  { keys: ['Another label'], value: 10 },
  { keys: ['Another label', 'B'], value: 14 },
  { keys: ['Another label', 'B', 'C'], value: 1 },
  { keys: ['B'], value: 10 },
  { keys: ['Another label', 'C'], value: 14 },
  { keys: ['C'], value: 12 },
];


beforeEach(() => {
  (SVGElement.prototype as any).getBBox = (): any => {
    return { x: 0, y: 0, width: 0, heigh: 0, bottom: 0, left: 0 };
  }
});

test('displays percentage', () => {
  render(<UpsetChart
    width={600}
    title="test chart"
    description="test description"
    height={400}
    distribution={{
      colorScheme: ['rgb(154, 187, 218)'],
      fill: {
        active: 'rgb(154, 187, 218)',
        inactive: '#ddd',
      },
    }}
    setSize={{
      dimensions: { chartWidth: 100, axisWidth: 120, height: 150 },
      colorScheme: ['rgb(154, 218, 172)'],
    }}
    data={data} />
  )
  screen.getByTitle('test chart')
  const rows = screen.getAllByRole('row');
  expect(rows.length).toEqual(2);

  const cells = screen.getAllByRole('cell');
  expect(cells.length).toEqual(18);
})
