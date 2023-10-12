import { line } from "d3-shape";
import React from "react";

import { Base, Path, useWidth } from "../../../src";
import { JSXCode } from "../components/JSXCode";
import { Layout } from "../components/Layout";
import { TwoColumns } from "../components/TwoColumns";
import { theme } from "../context/theme";

const exampleCode = `import {
  Base,
  Path,
  useWidth,
} from 'cl-react-graph;
import { line } from 'd3-shape';


const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  const data: [number, number][] = [
    [0, 0],
    [30, 30],
    [50, 20],
    [width, 0],
    [width / 2, 100]
  ];
  return (
    <div ref={ref}>
      <Base
        width={width}
        height={200}
        title="Path example"
      >
        <Path
          fill={theme.purple900}
          stroke={theme.grey400}
          opacity={1}
          d={line()(data) ?? ''} />
      </Base>
    </div>
  )
};
`;

const PathExample = () => {
  const [ref, width] = useWidth("90%");
  const data: [number, number][] = [
    [0, 0],
    [30, 30],
    [50, 20],
    [width, 0],
    [width / 2, 100],
  ];
  return (
    <Layout>
      <h2>Path</h2>

      <p>Renders an SVG path</p>
      <TwoColumns>
        <div ref={ref}>
          <Base width={width} height={200} title="Path example">
            <Path
              fill={theme.purple900}
              stroke={theme.grey400}
              opacity={1}
              d={line()(data) ?? ""}
            />
          </Base>
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  );
};

export default PathExample;
