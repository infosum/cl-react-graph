import React from "react";

import { Base, Grid, useWidth } from "../../../src";
import { JSXCode } from "../components/JSXCode";
import { Layout } from "../components/Layout";
import { TwoColumns } from "../components/TwoColumns";
import { theme } from "../context/theme";

const exampleCode = `import {
  Base, 
  Grid,
  useWidth,
} from 'cl-react-graph;

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  return(
    <Base
    width={width}
    height={200}
    title="Grid example">
      <Grid
        left={0}
        height={200}
        x={{
          height: 1,
          style: {
            stroke: "#eee",
            strokeDasharray: "2 2",
            fill: theme.grey400,
          },
          ticks: 5,
          visible: true,
        }}
        y={{
          style: {
            stroke: "#eee",
            fill: theme.grey400,
          },
          ticks: 10,
          visible: true,
        }}
        width={width}
      />
    </Base>
  )
};
`;

const GridExample = () => {
  const [ref, width] = useWidth("90%");
  return (
    <Layout>
      <h2>Grid</h2>

      <p>A grid must be placed inside a Base component.</p>
      <TwoColumns>
        <div ref={ref}>
          <Base width={width} height={200} title="Grid example">
            <Grid
              left={0}
              height={200}
              x={{
                height: 1,
                style: {
                  stroke: "#eee",
                  strokeDasharray: "2 2",
                  fill: theme.grey400,
                },
                ticks: 5,
                visible: true,
              }}
              y={{
                style: {
                  stroke: "#eee",
                  fill: theme.grey400,
                },
                ticks: 10,
                visible: true,
              }}
              width={width}
            />
          </Base>
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  );
};

export default GridExample;
