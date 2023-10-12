import { interpolate } from "d3";
import React from "react";
import * as topo from "topojson-client";

import { Map, useWidth } from "../../../src";
import j from "../assets/uk-region.topo.json";
import { JSXCode } from "../components/JSXCode";
import { Layout } from "../components/Layout";
import { TwoColumns } from "../components/TwoColumns";

const exampleCode = `import {
  Map,
  useWidth,
} from 'cl-react-graph;
import { interpolate } from 'd3';
import React from 'react';
import * as topo from 'topojson-client';

import json from '../assets/uk-region.topo.json';

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  const f = topo.feature(json as any, 'eer');
  return(
    <div ref={ref}>
      <Map
        geoJSON={f as any}
        data={data}
        colorInterpolate={interpolate("red", "blue")}
        bin="EER13NM"
        width={width}
        height={400}
      />
    </div>
  )
};
`;

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

const MapExample = () => {
  const [ref, width] = useWidth("90%");
  const f = topo.feature(j as any, "eer");
  return (
    <Layout>
      <h2>Map</h2>

      <TwoColumns>
        <div ref={ref}>
          <Map
            geoJSON={f as any}
            data={data}
            colorInterpolate={interpolate("red", "blue")}
            bin="EER13NM"
            width={width}
            height={400}
          />
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  );
};

export default MapExample;
