import React from "react";

import { JoyPlot, useWidth } from "../../../src";
import { JSXCode } from "../components/JSXCode";
import { Layout } from "../components/Layout";
import { TwoColumns } from "../components/TwoColumns";
import { theme } from "../context/theme";

const exampleCode = `import {
  JoyPlot,
  useWidth,
} from 'cl-react-graph;


const data = [
  {
    'bins': [
      '0, 2500',
      '2500, 5000',
      '5000, 10000'
    ],
    'counts': [
      {
        'label': 'in market for car: No',
        'data': [
          500,
          400,
          4000
        ]
      }
    ],
  },
  {
    'bins': [
      '0, 2500',
      '2500, 5000',
      '5000, 10000'
    ],
    'counts': [
      {
        'label': 'in market for car: Yes',
        'data': [
          300,
          300,
          2800
        ]
      }
    ],
  }
]

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  return(
    <div ref={ref}>
      <JoyPlot
        data={data}
        xAxisHeight={20}
        colorScheme="hsla(140, 60%, 88%, 1)"
        width={width}
        height={data.length * 150} />
    </div>
  )
};
`;

const data = [
  {
    bins: ["0, 2500", "2500, 5000", "5000, 10000"],
    counts: [
      {
        label: "in market for car: No",
        data: [500, 400, 4000],
      },
    ],
    title: "No",
  },
  {
    bins: ["0, 2500", "2500, 5000", "5000, 10000"],
    counts: [
      {
        label: "in market for car: Yes",
        data: [300, 300, 2800],
      },
    ],
    title: "Yes",
  },
];

const JoyPlotExample = () => {
  const [ref, width] = useWidth("90%");
  return (
    <Layout>
      <h2>JoyPlot</h2>

      <TwoColumns>
        <div ref={ref}>
          <h3>In market for a car</h3>
          <JoyPlot
            data={data}
            title="In market for a car"
            xAxisHeight={20}
            bars={{
              radius: 4,
            }}
            colorScheme={[theme.green900]}
            width={width}
            height={data.length * 150}
          />
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  );
};

export default JoyPlotExample;
