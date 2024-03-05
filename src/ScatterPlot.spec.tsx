import "@testing-library/jest-dom";

import React from "react";

import { render, screen } from "@testing-library/react";

import { lineChartData } from "../test/fixtures";
import { ScatterPlot } from "./ScatterPlot";
import { Axes } from "./utils/types";

beforeEach(() => {
  (SVGElement.prototype as any).getBBox = (): any => {
    return { x: 0, y: 0, width: 0, heigh: 0, bottom: 0, left: 0 };
  };
});

const axis: Axes = {
  x: {
    height: 20,
    width: 400,
    scale: "time",
  },
  y: {
    width: 20,
    height: 400,
    scale: "log",
  },
};

test("ScatterPlot", () => {
  render(
    <ScatterPlot
      width={400}
      height={400}
      data={lineChartData}
      axis={axis}
    ></ScatterPlot>,
  );
  expect(screen.getAllByRole("table")).toHaveLength(1);
  expect(
    screen.getByTestId("point-cddcfdbcadbbdfcusage-100-340"),
  ).toHaveAttribute("cx", "100");
  expect(
    screen.getByTestId("point-cddcfdbcadbbdfcusage-100-340"),
  ).toHaveAttribute("cy", "340");
});
