import "@testing-library/jest-dom";

import React from "react";

import { render, screen } from "@testing-library/react";

import { radarData } from "../test/fixtures";
import { RadarChart } from "./RadarChart";

beforeEach(() => {
  (SVGElement.prototype as any).getBBox = (): any => {
    return { x: 0, y: 0, width: 0, heigh: 0, bottom: 0, left: 0 };
  };
});

test("RadarChart", () => {
  render(<RadarChart width={400} height={400} data={radarData}></RadarChart>);
  expect(screen.getAllByRole("table")).toHaveLength(1);
  expect(screen.getByTestId("axis-strength"));
  expect(screen.getByTestId("axis-intelligence"));
  expect(screen.getByTestId("axis-charisma"));
  expect(screen.getByTestId("axis-dexterity"));
  expect(screen.getByTestId("axis-luck"));

  expect(screen.getByTestId("point-Argentina-strength")).toHaveAttribute(
    "cx",
    "185",
  );
  expect(screen.getByTestId("point-Argentina-strength")).toHaveAttribute(
    "cy",
    "118",
  );
  expect(screen.getByTestId("area-fill-Argentina")).toHaveAttribute(
    "d",
    "M185,118L264.889,159.043L264.351,294.217L76.26,334.668L72.775,148.536",
  );
});
