
import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import {
  render,
  screen,
} from '@testing-library/react';

import { TipContent } from './ToolTip';

test('displays bin label', () => {
  render(<svg><TipContent
    item={{
      label: 'test',
      binIndex: 1,
      datasetIndex: 1,
      value: 40,
      percentage: '50',
    }}
    bin="bin1"
  />

  </svg>
  )
  expect(screen.getByRole('tooltip')).toBeInTheDocument();
  expect(screen.getByTestId('bin').textContent).toEqual('bin1');

})
