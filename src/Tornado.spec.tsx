import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render, screen, within } from "@testing-library/react";

import { barChartData } from "../test/fixtures";
import { BarChart, EChartDirection } from "./BarChart";
import { EGroupedBarLayout } from "./Histogram";
import { Props, TornadoChart } from "./TornadoChart";

beforeEach(() => {
  (SVGElement.prototype as any).getBBox = () => {
    return { x: 0, y: 0, width: 0, heigh: 0, bottom: 0, left: 0 };
  };
});

const data: Props["data"] = {
  bins: ["16-18", "18-25", "25-35", "35-50", "50-65", "65-∞"],
  counts: [
    {
      label: "Background",
      data: [
        [1000, 2000], // Male bin 1, Male bin 2,
        [1500, 1500], // Female bin 1, Female bin 2,
      ],
    },
    {
      label: "Foreground",
      data: [
        [500, 400], // Male bin 1, Male bin 2,
        [1000, 200], // Female bin 1, Female bin 2,
      ],
    },
  ],
};

test("Tornado: Horizontal overlay", () => {
  render(
    <TornadoChart
      width={1000}
      height={600}
      groupLayout={EGroupedBarLayout.OVERLAID}
      direction={EChartDirection.HORIZONTAL}
      showBinPercentages={false}
      data={data}
      id="demo"
    ></TornadoChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(8);
  expect(screen.getByTestId("chart-bar-left-demo-0")).toHaveAttribute(
    "data-percentage",
    "66.67"
  );
  expect(screen.getByTestId("chart-bar-left-demo-0")).toHaveAttribute(
    "d",
    "m435 4 h0 v68 h-0 a0 0 0 0 1 -0 -0 v-68 a0,0 0 0 1 0,-0 z"
  );
  expect(screen.getByTestId("chart-bar-left-demo-1")).toHaveAttribute(
    "data-percentage",
    "33.33"
  );
  expect(screen.getByTestId("chart-bar-left-demo-1")).toHaveAttribute(
    "d",
    "m435 87 h0 v68 h-0 a0 0 0 0 1 -0 -0 v-68 a0,0 0 0 1 0,-0 z"
  );
  expect(screen.getByTestId("chart-bar-right-demo-0")).toHaveAttribute(
    "data-percentage",
    "50.00"
  );
  expect(screen.getByTestId("chart-bar-right-demo-0")).toHaveAttribute(
    "d",
    "m0 4 h0 a0 0 0 0 1 0 0 v68 a0 0 0 0 1 -0 0 h-0  v-68"
  );
  expect(screen.getByTestId("chart-bar-right-demo-1")).toHaveAttribute(
    "data-percentage",
    "50.00"
  );
  expect(screen.getByTestId("chart-bar-right-demo-1")).toHaveAttribute(
    "d",
    "m0 87 h0 a0 0 0 0 1 0 0 v68 a0 0 0 0 1 -0 0 h-0  v-68"
  );
});

test("Tornado: Horizontal stacked", () => {
  render(
    <TornadoChart
      width={1000}
      height={600}
      groupLayout={EGroupedBarLayout.STACKED}
      direction={EChartDirection.HORIZONTAL}
      showBinPercentages={false}
      data={data}
      id="demo"
    ></TornadoChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(8);
  expect(screen.getByTestId("chart-bar-left-demo-0")).toHaveAttribute(
    "data-percentage",
    "66.67"
  );
  expect(screen.getByTestId("chart-bar-left-demo-0")).toHaveAttribute(
    "d",
    "m435 4 h0 v68 h-0 a0 0 0 0 1 -0 -0 v-68 a0,0 0 0 1 0,-0 z"
  );
  expect(screen.getByTestId("chart-bar-left-demo-1")).toHaveAttribute(
    "data-percentage",
    "33.33"
  );
  expect(screen.getByTestId("chart-bar-left-demo-1")).toHaveAttribute(
    "d",
    "m435 87 h0 v68 h-0 a0 0 0 0 1 -0 -0 v-68 a0,0 0 0 1 0,-0 z"
  );
  expect(screen.getByTestId("chart-bar-right-demo-0")).toHaveAttribute(
    "data-percentage",
    "50.00"
  );
  expect(screen.getByTestId("chart-bar-right-demo-0")).toHaveAttribute(
    "d",
    "m0 4 h0 a0 0 0 0 1 0 0 v68 a0 0 0 0 1 -0 0 h-0  v-68"
  );
  expect(screen.getByTestId("chart-bar-right-demo-1")).toHaveAttribute(
    "data-percentage",
    "50.00"
  );
  expect(screen.getByTestId("chart-bar-right-demo-1")).toHaveAttribute(
    "d",
    "m0 87 h0 a0 0 0 0 1 0 0 v68 a0 0 0 0 1 -0 0 h-0  v-68"
  );
});

test("Tornado: Horizontal grouped", () => {
  render(
    <TornadoChart
      width={1000}
      height={600}
      groupLayout={EGroupedBarLayout.GROUPED}
      direction={EChartDirection.HORIZONTAL}
      showBinPercentages={false}
      data={data}
      id="demo"
    ></TornadoChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(8);
  expect(screen.getByTestId("chart-bar-left-demo-0")).toHaveAttribute(
    "data-percentage",
    "66.67"
  );
  expect(screen.getByTestId("chart-bar-left-demo-0")).toHaveAttribute(
    "d",
    "m435 0 h0 v35 h-0 a0 0 0 0 1 -0 -0 v-35 a0,0 0 0 1 0,-0 z"
  );
  expect(screen.getByTestId("chart-bar-left-demo-1")).toHaveAttribute(
    "data-percentage",
    "33.33"
  );
  expect(screen.getByTestId("chart-bar-left-demo-1")).toHaveAttribute(
    "d",
    "m435 83 h0 v35 h-0 a0 0 0 0 1 -0 -0 v-35 a0,0 0 0 1 0,-0 z"
  );
  expect(screen.getByTestId("chart-bar-right-demo-0")).toHaveAttribute(
    "data-percentage",
    "50.00"
  );
  expect(screen.getByTestId("chart-bar-right-demo-0")).toHaveAttribute(
    "d",
    "m0 0 h0 a0 0 0 0 1 0 0 v35 a0 0 0 0 1 -0 0 h-0  v-35"
  );
  expect(screen.getByTestId("chart-bar-right-demo-1")).toHaveAttribute(
    "data-percentage",
    "50.00"
  );
  expect(screen.getByTestId("chart-bar-right-demo-1")).toHaveAttribute(
    "d",
    "m0 83 h0 a0 0 0 0 1 0 0 v35 a0 0 0 0 1 -0 0 h-0  v-35"
  );
});


test("Tornado: Vertical overlay", () => {
  render(
    <TornadoChart
      width={1000}
      height={600}
      groupLayout={EGroupedBarLayout.OVERLAID}
      direction={EChartDirection.VERTICAL}
      showBinPercentages={false}
      data={data}
      id="demo"
    ></TornadoChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(8);
  expect(screen.getByTestId("chart-bar-left-demo-0")).toHaveAttribute(
    "data-percentage",
    "33.33"
  );
  expect(screen.getByTestId("chart-bar-left-demo-0")).toHaveAttribute(
    "d",
    "m9 235 v0 a0,0 0 0 1 0,-0 h127 a0 0 0 0 1 0 0 v0 h-127 z"
  );
  expect(screen.getByTestId("chart-bar-left-demo-1")).toHaveAttribute(
    "data-percentage",
    "66.67"
  );
  expect(screen.getByTestId("chart-bar-left-demo-1")).toHaveAttribute(
    "d",
    "m166 235 v0 a0,0 0 0 1 0,-0 h127 a0 0 0 0 1 0 0 v0 h-127 z"
  );
  expect(screen.getByTestId("chart-bar-right-demo-0")).toHaveAttribute(
    "data-percentage",
    "50.00"
  );
  expect(screen.getByTestId("chart-bar-right-demo-0")).toHaveAttribute(
    "d",
    "m9 0 v0 a0 0 0 0 0 0 0 h127 a0 0 0 0 0 0 -0 v0 h-127 z"
  );
  expect(screen.getByTestId("chart-bar-right-demo-1")).toHaveAttribute(
    "data-percentage",
    "50.00"
  );
  expect(screen.getByTestId("chart-bar-right-demo-1")).toHaveAttribute(
    "d",
    "m166 0 v0 a0 0 0 0 0 0 0 h127 a0 0 0 0 0 0 -0 v0 h-127 z"
  );
});

test("Tornado: Vertical stacked", () => {
  render(
    <TornadoChart
      width={1000}
      height={600}
      groupLayout={EGroupedBarLayout.STACKED}
      direction={EChartDirection.VERTICAL}
      showBinPercentages={false}
      data={data}
      id="demo"
    ></TornadoChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(8);
  expect(screen.getByTestId("chart-bar-left-demo-0")).toHaveAttribute(
    "data-percentage",
    "33.33"
  );
  expect(screen.getByTestId("chart-bar-left-demo-0")).toHaveAttribute(
    "d",
    "m9 235 v0 a0,0 0 0 1 0,-0 h127 a0 0 0 0 1 0 0 v0 h-127 z"
  );
  expect(screen.getByTestId("chart-bar-left-demo-1")).toHaveAttribute(
    "data-percentage",
    "66.67"
  );
  expect(screen.getByTestId("chart-bar-left-demo-1")).toHaveAttribute(
    "d",
    "m166 235 v0 a0,0 0 0 1 0,-0 h127 a0 0 0 0 1 0 0 v0 h-127 z"
  );
  expect(screen.getByTestId("chart-bar-right-demo-0")).toHaveAttribute(
    "data-percentage",
    "50.00"
  );
  expect(screen.getByTestId("chart-bar-right-demo-0")).toHaveAttribute(
    "d",
    "m9 0 v0 a0 0 0 0 0 0 0 h127 a0 0 0 0 0 0 -0 v0 h-127 z"
  );
  expect(screen.getByTestId("chart-bar-right-demo-1")).toHaveAttribute(
    "data-percentage",
    "50.00"
  );
  expect(screen.getByTestId("chart-bar-right-demo-1")).toHaveAttribute(
    "d",
    "m166 0 v0 a0 0 0 0 0 0 0 h127 a0 0 0 0 0 0 -0 v0 h-127 z"
  );
});

test("Tornado: Vertical grouped", () => {
  render(
    <TornadoChart
      width={1000}
      height={600}
      groupLayout={EGroupedBarLayout.GROUPED}
      direction={EChartDirection.VERTICAL}
      showBinPercentages={false}
      data={data}
      id="demo"
    ></TornadoChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(8);
  expect(screen.getByTestId("chart-bar-left-demo-0")).toHaveAttribute(
    "data-percentage",
    "33.33"
  );
  expect(screen.getByTestId("chart-bar-left-demo-0")).toHaveAttribute(
    "d",
    "m2 235 v0 a0,0 0 0 1 0,-0 h67 a0 0 0 0 1 0 0 v0 h-67 z"
  );
  expect(screen.getByTestId("chart-bar-left-demo-1")).toHaveAttribute(
    "data-percentage",
    "66.67"
  );
  expect(screen.getByTestId("chart-bar-left-demo-1")).toHaveAttribute(
    "d",
    "m159 235 v0 a0,0 0 0 1 0,-0 h67 a0 0 0 0 1 0 0 v0 h-67 z"
  );
  expect(screen.getByTestId("chart-bar-right-demo-0")).toHaveAttribute(
    "data-percentage",
    "50.00"
  );
  expect(screen.getByTestId("chart-bar-right-demo-0")).toHaveAttribute(
    "d",
    "m2 0 v0 a0 0 0 0 0 0 0 h67 a0 0 0 0 0 0 -0 v0 h-67 z"
  );
  expect(screen.getByTestId("chart-bar-right-demo-1")).toHaveAttribute(
    "data-percentage",
    "50.00"
  );
  expect(screen.getByTestId("chart-bar-right-demo-1")).toHaveAttribute(
    "d",
    "m159 0 v0 a0 0 0 0 0 0 0 h67 a0 0 0 0 0 0 -0 v0 h-67 z"
  );
});
