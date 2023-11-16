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
        [2001], // Male bin 1, Male bin 2,
        [2002], // Female bin 1, Female bin 2,
      ],
    },
    // {
    //   label: "Foreground",
    //   data: [
    //     [100, 260, 510, 970, 840, 670], // Male bin 1, Male bin 2,
    //     [1000, 5500, 470, 870, 490, 140], // Female bin 1, Female bin 2,
    //   ],
    // },
  ],
};

test("Tornado", () => {
  render(
    <TornadoChart
      width={1000}
      height={600}
      groupLayout={EGroupedBarLayout.OVERLAID}
      showBinPercentages={false}
      data={data}
      id="demo"
    ></TornadoChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(84);
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute(
    "data-percentage",
    "5.89"
  );
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute(
    "d",
    "m11 500 v0 a0 0 0 0 1 0 -0 h19 a0 0 0 0 1 0 0 v0 h-19"
  );
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute(
    "data-percentage",
    "5.27"
  );
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute(
    "d",
    "m56 500 v0 a0 0 0 0 1 0 -0 h19 a0 0 0 0 1 0 0 v0 h-19"
  );
  expect(screen.getByTestId("chart-bar--2")).toHaveAttribute(
    "data-percentage",
    "1.34"
  );
  expect(screen.getByTestId("chart-bar--2")).toHaveAttribute(
    "d",
    "m101 500 v0 a0 0 0 0 1 0 -0 h19 a0 0 0 0 1 0 0 v0 h-19"
  );
});
