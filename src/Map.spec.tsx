import "@testing-library/jest-dom";

import { ExtendedFeatureCollection } from "d3";
import React from "react";

import { render, screen } from "@testing-library/react";

import { Map } from "./Map";

const geoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [102.0, 0.5] },
      properties: { NUTS112CD: "UKC", NUTS112NM: "North East" },
    },
  ],
};

const data = {
  "North East": 3432,
  "North West": 2322,
  "Yorkshire and The Humber": 22,
  "East Midlands": 986,
  "West Midlands": 3454,
  Eastern: 3432,
  London: 999,
  "South East": 2321,
  "South West": 2234,
};

test("Map", () => {
  render(
    <Map
      width={400}
      geoJSON={geoJSON as ExtendedFeatureCollection}
      data={data}
      bin="NUTS112NM"
      height={400}
    />,
  );
  expect(screen.getAllByRole("table")).toHaveLength(1);
  expect(screen.getByTestId("North East")).toHaveAttribute(
    "d",
    "MNaN,NaNm0,4.5a4.5,4.5 0 1,1 0,-9a4.5,4.5 0 1,1 0,9z",
  );
});
