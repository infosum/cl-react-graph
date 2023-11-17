import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render, screen, within } from "@testing-library/react";

import { barChartData } from "../test/fixtures";
import { BarChart, EChartDirection } from "./BarChart";
import { EGroupedBarLayout } from "./Histogram";

beforeEach(() => {
  (SVGElement.prototype as any).getBBox = () => {
    return { x: 0, y: 0, width: 0, heigh: 0, bottom: 0, left: 0 };
  };
});

test("BarChart", () => {
  render(
    <BarChart
      width={1000}
      height={600}
      bars={{ radius: 4 }}
      id="demo"
      data={barChartData}
    ></BarChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(84);
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute(
    "data-percentage",
    "5.89"
  );
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute(
    "d",
    "m11 500 v0 a4,4 0 0 1 4,-4 h11 a4 4 0 0 1 4 4 v0 h-19 z"
  );
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute(
    "data-percentage",
    "5.27"
  );
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute(
    "d",
    "m56 500 v0 a4,4 0 0 1 4,-4 h11 a4 4 0 0 1 4 4 v0 h-19 z"
  );
  expect(screen.getByTestId("chart-bar--2")).toHaveAttribute(
    "data-percentage",
    "1.34"
  );
  expect(screen.getByTestId("chart-bar--2")).toHaveAttribute(
    "d",
    "m101 500 v0 a4,4 0 0 1 4,-4 h11 a4 4 0 0 1 4 4 v0 h-19 z"
  );
});

t: HTMLInputElement;
test("BarChart Grouped overlaid layout", () => {
  render(
    <BarChart
      width={1000}
      height={600}
      bars={{ radius: 4 }}
      id="demo"
      groupLayout={EGroupedBarLayout.OVERLAID}
      data={barChartData}
    ></BarChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(84);
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute(
    "d",
    "m12 500 v0 a4,4 0 0 1 4,-4 h29 a4 4 0 0 1 4 4 v0 h-37 z"
  );
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute(
    "d",
    "m57 500 v0 a4,4 0 0 1 4,-4 h29 a4 4 0 0 1 4 4 v0 h-37 z"
  );
  expect(screen.getByTestId("chart-bar--20")).toHaveAttribute(
    "d",
    "m912 500 v0 a4,4 0 0 1 4,-4 h29 a4 4 0 0 1 4 4 v0 h-37 z"
  );

  expect(screen.getByTestId("chart-bar--41")).toHaveAttribute(
    "d",
    "m921 500 v0 a4,4 0 0 1 4,-4 h10 a4 4 0 0 1 4 4 v0 h-18 z"
  );
});

test("BarChart Grouped overlaid layout, compact width", () => {
  render(
    <BarChart
      width={100}
      height={600}
      bars={{ radius: 4 }}
      id="demo"
      groupLayout={EGroupedBarLayout.OVERLAID}
      data={barChartData}
    ></BarChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(84);
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute(
    "data-percentage",
    "5.89"
  );
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute(
    "d",
    "m9 500 v0 a4,4 0 0 1 4,-4 h-6 a4 4 0 0 1 4 4 v0 h-2 z"
  );
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute(
    "d",
    "m11 500 v0 a4,4 0 0 1 4,-4 h-6 a4 4 0 0 1 4 4 v0 h-2 z"
  );
  expect(screen.getByTestId("chart-bar--20")).toHaveAttribute(
    "d",
    "m49 500 v0 a4,4 0 0 1 4,-4 h-6 a4 4 0 0 1 4 4 v0 h-2 z"
  );
  expect(screen.getByTestId("chart-bar--41")).toHaveAttribute(
    "d",
    "m49 500 v0 a4,4 0 0 1 4,-4 h-7 a4 4 0 0 1 4 4 v0 h-1 z"
  );
});

test("shows the x axis tick value when the chart is horizontal", () => {
  render(
    <BarChart
      width={100}
      height={600}
      bars={{ radius: 4 }}
      direction={EChartDirection.HORIZONTAL}
      id="demo"
      groupLayout={EGroupedBarLayout.OVERLAID}
      data={barChartData}
      tickValues={[33, 66, 99]}
    ></BarChart>
  );
  const xaxis = screen.getByTestId("x-axis");
  const yaxis = screen.getByTestId("y-axis");
  expect(within(xaxis).getByText("33")).toBeInTheDocument();
  expect(within(xaxis).getByText("66")).toBeInTheDocument();
  expect(within(xaxis).getByText("99")).toBeInTheDocument();

  expect(within(yaxis).queryByText("33")).not.toBeInTheDocument();
  expect(within(yaxis).queryByText("66")).not.toBeInTheDocument();
  expect(within(yaxis).queryByText("99")).not.toBeInTheDocument();
});

test("shows the y axis tick value when the chart is vertical", () => {
  render(
    <BarChart
      width={100}
      height={600}
      bars={{ radius: 4 }}
      direction={EChartDirection.VERTICAL}
      id="demo"
      groupLayout={EGroupedBarLayout.OVERLAID}
      data={barChartData}
      tickValues={[33, 66, 99]}
    ></BarChart>
  );
  const xaxis = screen.getByTestId("x-axis");
  const yaxis = screen.getByTestId("y-axis");
  expect(within(yaxis).getByText("33")).toBeInTheDocument();
  expect(within(yaxis).getByText("66")).toBeInTheDocument();
  expect(within(yaxis).getByText("99")).toBeInTheDocument();

  expect(within(xaxis).queryByText("33")).not.toBeInTheDocument();
  expect(within(xaxis).queryByText("66")).not.toBeInTheDocument();
  expect(within(xaxis).queryByText("99")).not.toBeInTheDocument();
});

test("iterates over color scheme if more values present than colors", () => {
  render(
    <BarChart
      width={100}
      height={600}
      bars={{ radius: 4 }}
      direction={EChartDirection.VERTICAL}
      id="demo"
      groupLayout={EGroupedBarLayout.OVERLAID}
      colorScheme={["red", "green"]}
      data={{
        bins: ["Female", "Male", "Other"],
        counts: [
          {
            data: [58483, 52400, 13300],
            label: "Baseline",
          },
          {
            data: [54932, 34230, 10000],
            label: "Filtered",
          },
          {
            data: [54932, 34230, 10000],
            label: "Surprise!",
          },
        ],
      }}
      tickValues={[33, 66, 99]}
    ></BarChart>
  );
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute("fill", "red");
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute("fill", "red");
  expect(screen.getByTestId("chart-bar--2")).toHaveAttribute("fill", "red");
  expect(screen.getByTestId("chart-bar--3")).toHaveAttribute("fill", "green");
  expect(screen.getByTestId("chart-bar--4")).toHaveAttribute("fill", "green");
  expect(screen.getByTestId("chart-bar--5")).toHaveAttribute("fill", "green");
  expect(screen.getByTestId("chart-bar--6")).toHaveAttribute("fill", "red");
  expect(screen.getByTestId("chart-bar--7")).toHaveAttribute("fill", "red");
  expect(screen.getByTestId("chart-bar--8")).toHaveAttribute("fill", "red");
});
