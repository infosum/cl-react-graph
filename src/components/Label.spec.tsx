import "@testing-library/jest-dom/extend-expect";

import React from "react";

import { useSpringValue } from "@react-spring/web";
import { render, screen } from "@testing-library/react";

import { EChartDirection } from "../BarChart";
import { Label, Props } from "./Label";

const TestLabel = (props: Partial<Props>) => {
  const x = useSpringValue(0);
  const y = useSpringValue(0);
  const height = useSpringValue(40);
  const width = useSpringValue(100);
  return (
    <svg>
      <Label
        x={x}
        containerHeight={100}
        y={y}
        height={height}
        width={width}
        direction={EChartDirection.VERTICAL}
        item={{
          label: "test",
          binIndex: 1,
          datasetIndex: 1,
          value: 40,
          percentage: "50",
        }}
        {...props}
      />
    </svg>
  );
};
test("displays percentage", () => {
  render(<TestLabel />);

  expect(screen.getByRole("cell")).toHaveTextContent("50%");
});

test("displays label", () => {
  render(<TestLabel label="test label" />);
  expect(screen.getByRole("cell")).toHaveTextContent("test label");
});
