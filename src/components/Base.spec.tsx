import "@testing-library/jest-dom";

import React from "react";

import { render, screen } from "@testing-library/react";

import { Base } from "./Base";

test("displays percentage", () => {
  render(
    <Base width={100} height={200}>
      children
    </Base>,
  );

  expect(screen.getByRole("table")).toHaveTextContent("children");
});
