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
      id="demo"
      data={barChartData}
    ></BarChart>
  );
  expect(screen.getAllByRole("cell")).toHaveLength(84);
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
  expect(screen.getAllByRole("cell")).toHaveLength(84);
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
  expect(screen.getAllByRole("cell")).toHaveLength(84);
  expect(screen.getByTestId("chart-bar--0")).toHaveAttribute("width", "2");
  expect(screen.getByTestId("chart-bar--1")).toHaveAttribute("width", "2");
  expect(screen.getByTestId("chart-bar--20")).toHaveAttribute("width", "2");
  expect(screen.getByTestId("chart-bar--20")).toHaveAttribute("x", "49");

  expect(screen.getByTestId("chart-bar--41")).toHaveAttribute("width", "1");
  expect(screen.getByTestId("chart-bar--41")).toHaveAttribute("x", "49");
});

test("shows the x axis tick value when the chart is horizontal", () => {
  render(
    <BarChart
      width={100}
      height={600}
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
