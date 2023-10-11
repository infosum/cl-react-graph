import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import {
  render,
  screen,
} from '@testing-library/react';

import { barChartData } from '../test/fixtures';
import { BarChart } from './BarChart';
import { EGroupedBarLayout } from './Histogram';

beforeEach(() => {
  (SVGElement.prototype as any).getBBox = (): any => {
    return { x: 0, y: 0, width: 0, heigh: 0, bottom: 0, left: 0 };
  };
});

test("BarChart", () => {
  render(
    <BarChart
      width={1000}
      height={600}
      id="demo"
      data={barChartData}
    ></BarChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(42);
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute("width", "19");
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute("width", "19");
  expect(screen.getByTestId("chart-bar--2")).toHaveAttribute("width", "19");
});

test("BarChart Grouped overlaid layout", () => {
  render(
    <BarChart
      width={1000}
      height={600}
      id="demo"
      groupLayout={EGroupedBarLayout.OVERLAID}
      data={barChartData}
    ></BarChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(42);
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute("width", "37");
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute("width", "37");
  expect(screen.getByTestId("chart-bar--20")).toHaveAttribute("width", "37");
  expect(screen.getByTestId("chart-bar--20")).toHaveAttribute("x", "912");

  expect(screen.getByTestId("chart-bar--41")).toHaveAttribute("width", "18");
  expect(screen.getByTestId("chart-bar--41")).toHaveAttribute("x", "921");
});

test("BarChart Grouped overlaid layout, compact width", () => {
  render(
    <BarChart
      width={100}
      height={600}
      id="demo"
      groupLayout={EGroupedBarLayout.OVERLAID}
      data={barChartData}
    ></BarChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(42);
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute("width", "2");
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute("width", "2");
  expect(screen.getByTestId("chart-bar--20")).toHaveAttribute("width", "2");
  expect(screen.getByTestId("chart-bar--20")).toHaveAttribute("x", "49");

  expect(screen.getByTestId("chart-bar--41")).toHaveAttribute("width", "1");
  expect(screen.getByTestId("chart-bar--41")).toHaveAttribute("x", "49");
});

test("BarChart with gradient fills", () => {
  const scheme = [
    {
      gradientTransform: "rotate(90)",
      stops: [
        { offset: "5%", stopColor: "red" },
        { offset: "95%", stopColor: "blue" },
      ],
    },
    {
      stops: [
        { offset: "5%", stopColor: "green" },
        { offset: "55%", stopColor: "orange" },
        { offset: "95%", stopColor: "yellow" },
      ],
    },
  ];
  render(
    <BarChart
      width={100}
      height={600}
      id="demo"
      colorScheme={scheme}
      data={barChartData}
    ></BarChart>
  );
  expect(screen.getByTestId("gradient-red-blue")).toBeInTheDocument();
  expect(
    screen.getByTestId("gradient-green-orange-yellow")
  ).toBeInTheDocument();
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute(
    "fill",
    "url(#gradient-red-blue)"
  );
  expect(screen.getByTestId("chart-bar--41")).toHaveAttribute(
    "fill",
    "url(#gradient-green-orange-yellow)"
  );
});
