import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import {
  render,
  screen,
} from '@testing-library/react';

import { histogramData } from '../test/fixtures';
import { Histogram } from './Histogram';

beforeEach(() => {
  (SVGElement.prototype as any).getBBox = (): any => {
    return { x: 0, y: 0, width: 0, heigh: 0, bottom: 0, left: 0 };
  };
});

test("Histogram", () => {
  render(<Histogram width={100} height={200} data={histogramData}></Histogram>);
  expect(screen.getAllByRole("cell")).toHaveLength(3);
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute("width", "10");
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute("width", "20");
  expect(screen.getByTestId("chart-bar--2")).toHaveAttribute("width", "30");
});

test("Historgram with gradient fills", () => {
  const scheme = [
    {
      gradientTransform: "rotate(90)",
      stops: [
        { offset: "5%", stopColor: "red" },
        { offset: "95%", stopColor: "blue" },
      ],
    },
  ];
  render(
    <Histogram
      width={100}
      height={200}
      colorScheme={scheme}
      data={histogramData}
    ></Histogram>
  );
  expect(screen.getByTestId("gradient-red-blue")).toBeInTheDocument();
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute(
    "fill",
    "url(#gradient-red-blue)"
  );
});
