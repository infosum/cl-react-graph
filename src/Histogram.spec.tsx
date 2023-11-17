import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render, screen } from "@testing-library/react";

import { histogramData } from "../test/fixtures";
import { EChartDirection } from "./";
import { Histogram } from "./Histogram";

beforeEach(() => {
  (SVGElement.prototype as any).getBBox = (): any => {
    return { x: 0, y: 0, width: 0, heigh: 0, bottom: 0, left: 0 };
  };
});

test("Histogram: Vertical", () => {
  render(
    <Histogram
      width={100}
      direction={EChartDirection.VERTICAL}
      height={200}
      data={histogramData}
    ></Histogram>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(6);
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute(
    "d",
    "m0 100 v0 a4,4 0 0 1 4,-4 h2 a4 4 0 0 1 4 4 v0 h-25 z"
  );
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute(
    "d",
    "m10 100 v0 a4,4 0 0 1 4,-4 h12 a4 4 0 0 1 4 4 v0 h-100 z"
  );
  expect(screen.getByTestId("chart-bar--2")).toHaveAttribute(
    "d",
    "m30 100 v0 a4,4 0 0 1 4,-4 h22 a4 4 0 0 1 4 4 v0 h-75 z"
  );
});

test("Histogram: Horizontal", () => {
  render(
    <Histogram
      width={500}
      direction={EChartDirection.HORIZONTAL}
      height={500}
      data={histogramData}
    ></Histogram>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(6);
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute(
    "d",
    "m0 383 h0 a4 4 0 0 1 4 4 v69 a4 4 0 0 1 -4 4 h-0  v-69"
  );
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute(
    "d",
    "m0 230 h0 a4 4 0 0 1 4 4 v145 a4 4 0 0 1 -4 4 h-0  v-145"
  );
  expect(screen.getByTestId("chart-bar--2")).toHaveAttribute(
    "d",
    "m0 0 h0 a4 4 0 0 1 4 4 v222 a4 4 0 0 1 -4 4 h-0  v-222"
  );
});
