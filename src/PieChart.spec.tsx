import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render, screen } from "@testing-library/react";

import { barChartData } from "../test/fixtures";
import { PieChart } from "./PieChart";

beforeEach(() => {
  (SVGElement.prototype as any).getBBox = (): any => {
    return { x: 0, y: 0, width: 0, heigh: 0, bottom: 0, left: 0 };
  };
});

test("PieChart", () => {
  render(<PieChart width={400} height={400} data={barChartData}></PieChart>);

  expect(screen.getByTestId("ring-0-0")).toHaveAttribute(
    "d",
    "M0,-190A190,190,0,0,1,68.677,-177.154L0,0Z",
  );
  expect(screen.getByTestId("ring-0-1")).toHaveAttribute(
    "d",
    "M68.677,-177.154A190,190,0,0,1,122.575,-145.173L0,0Z",
  );
  expect(screen.getByTestId("ring-1-0")).toHaveAttribute(
    "d",
    "M0,-190A190,190,0,0,1,87.125,-168.847L0,0Z",
  );
});
