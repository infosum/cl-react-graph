
import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import {
  render,
  screen,
} from '@testing-library/react';

import { EChartDirection } from '../BarChart';
import { Label } from './Label';

test('displays percentage', () => {
  render(<svg><Label
    direction={EChartDirection.VERTICAL}
    item={{
      label: 'test',
      binIndex: 1,
      datasetIndex: 1,
      value: 40,
      percentage: '50',
    }}
  />
  </svg>)

  expect(screen.getByRole('cell')).toHaveTextContent('50%')

})

test('displays label', () => {
  render(<svg><Label
    direction={EChartDirection.VERTICAL}
    label="test label"
    item={{
      label: 'test',
      binIndex: 1,

      datasetIndex: 1,
      value: 40,
      percentage: '50',
    }}
  />
  </svg>)
  expect(screen.getByRole('cell')).toHaveTextContent('test label')

})
