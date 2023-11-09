import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { render, screen } from "@testing-library/react";

import { Grid } from "./Grid";

test("render grid", () => {
  render(
    <svg>
      <Grid
        left={0}
        height={200}
        x={{
          height: 1,
          style: {
            strokeDasharray: "2 2",
            fill: "#bbb",
          },
          ticks: 5,
          visible: true,
        }}
        y={{
          style: {
            fill: "#eee",
          },
          ticks: 10,
          visible: true,
        }}
        width={200}
      />
    </svg>
  );

  expect(screen.getByTestId("horizontal-line0")).toBeInTheDocument();
  expect(screen.getByTestId("horizontal-line9")).toBeInTheDocument();
  expect(screen.queryByTestId("horizontal-line10")).not.toBeInTheDocument();
  expect(screen.getByTestId("vertical-line0")).toBeInTheDocument();
  expect(screen.queryByTestId("vertical-line5")).not.toBeInTheDocument();

  expect(screen.getByTestId("vertical-line0")).toHaveAttribute("fill", "#bbb");
  expect(screen.getByTestId("vertical-line0")).toHaveAttribute(
    "stroke-dasharray",
    "2 2"
  );

  expect(screen.getByTestId("horizontal-line0")).toHaveAttribute(
    "fill",
    "#eee"
  );

  expect(screen.queryByTestId("horizontal-line0")).not.toHaveAttribute(
    "stroke-dasharray"
  );
});
