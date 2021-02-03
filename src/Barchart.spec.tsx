
import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import {
  render,
  screen,
} from '@testing-library/react';

import { barChartData } from '../test/fixtures';
import BarChart from './BarChart';
import { EGroupedBarLayout } from './Histogram';

beforeEach(() => {
  (SVGElement.prototype as any).getBBox = (): any => {
    return { x: 0, y: 0, width: 0, heigh: 0, bottom: 0, left: 0 };
  }
});

test('BarChart', () => {
  render(<BarChart
    width={1000}
    height={600}
    data={barChartData}
  ></BarChart>
  )
  expect(screen.getAllByRole('cell')).toHaveLength(42);
  expect(screen.getByTestId('chart-bar-0')).toHaveAttribute('width', '20');
  expect(screen.getByTestId('chart-bar-1')).toHaveAttribute('width', '20');
  expect(screen.getByTestId('chart-bar-2')).toHaveAttribute('width', '20');
});

test('BarChart Grouped overlaid layout', () => {
  render(<BarChart
    width={1000}
    height={600}
    groupLayout={EGroupedBarLayout.OVERLAID}
    data={barChartData}
  ></BarChart>
  )
  expect(screen.getAllByRole('cell')).toHaveLength(42);
  expect(screen.getByTestId('chart-bar-0')).toHaveAttribute('width', '39');
  expect(screen.getByTestId('chart-bar-1')).toHaveAttribute('width', '39');
  expect(screen.getByTestId('chart-bar-20')).toHaveAttribute('width', '39');
  expect(screen.getByTestId('chart-bar-20')).toHaveAttribute('x', '916');

  expect(screen.getByTestId('chart-bar-41')).toHaveAttribute('width', '19');
  expect(screen.getByTestId('chart-bar-41')).toHaveAttribute('x', '926');
});

test('BarChart Grouped overlaid layout, compact width', () => {

  render(<BarChart
    width={100}
    height={600}
    groupLayout={EGroupedBarLayout.OVERLAID}
    data={barChartData}
  ></BarChart>
  )
  expect(screen.getAllByRole('cell')).toHaveLength(42);
  expect(screen.getByTestId('chart-bar-0')).toHaveAttribute('width', '3');
  expect(screen.getByTestId('chart-bar-1')).toHaveAttribute('width', '3');
  expect(screen.getByTestId('chart-bar-20')).toHaveAttribute('width', '3');
  expect(screen.getByTestId('chart-bar-20')).toHaveAttribute('x', '57');

  expect(screen.getByTestId('chart-bar-41')).toHaveAttribute('width', '1');
  expect(screen.getByTestId('chart-bar-41')).toHaveAttribute('x', '58');
});
