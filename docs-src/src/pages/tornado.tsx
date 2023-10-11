import React from "react";

import {
  EChartDirection,
  EGroupedBarLayout,
  ITornadoProps,
  TornadoChart,
  useWidth,
} from "../../../src";
import { JSXCode } from "../components/JSXCode";
import { Layout } from "../components/Layout";
import { TwoColumns } from "../components/TwoColumns";
import { theme } from "../context/theme";

const exampleCode = `import {
  EChartDirection,
  EGroupedBarLayout,
  TornadoChart,
  ITornadoProps,
  useWidth,
} from 'cl-react-graph;

const data: ITornadoProps['data'] = {
  bins: ['16-18', '18-25', '25-35', '35-50', '50-65', '65-∞'],
  counts: [
    {
      label: 'Background',
      data: [
        [200, 2600, 5100, 9700, 8400, 6700], // Male bin 1, Male bin 2,
        [2002, 2100, 4700, 8700, 4900, 1400], // Female bin 1, Female bin 2,
      ],
    },
    {
      label: 'Foreground',
      data: [
        [100, 260, 510, 970, 840, 670], // Male bin 1, Male bin 2,
        [1000, 5500, 470, 870, 490, 140], // Female bin 1, Female bin 2,
      ],
    },

  ],
}

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  return(
    <div ref={ref}>
    <TornadoChart
    data={data}
    splitBins={['Male', 'Female']}
    groupLayout={EGroupedBarLayout.OVERLAID}
    width={width}
    height={500}
    splitAxisHeight={50}
    xAxisHeight={20}
    colorScheme={['hsla(140, 60%, 88%, 1)', 'hsla(208, 69%, 66%, 1)']}
    direction={EChartDirection.HORIZONTAL}
    showBinPercentages={false} />
    </div>
  )
};
`;

const data: ITornadoProps["data"] = {
  bins: ["16-18", "18-25", "25-35", "35-50", "50-65", "65-∞"],
  counts: [
    {
      label: "Background",
      data: [
        [200, 2600, 5100, 9700, 8400, 6700], // Male bin 1, Male bin 2,
        [2002, 2100, 4700, 8700, 4900, 1400], // Female bin 1, Female bin 2,
      ],
    },
    {
      label: "Foreground",
      data: [
        [100, 260, 510, 970, 840, 670], // Male bin 1, Male bin 2,
        [1000, 5500, 470, 870, 490, 140], // Female bin 1, Female bin 2,
      ],
    },
  ],
};

const TornadoExample = () => {
  const [ref, width] = useWidth("90%");
  return (
    <Layout>
      <h2>Tornado Chart</h2>

      <TwoColumns>
        <div ref={ref}>
          <TornadoChart
            data={data}
            splitBins={["Male", "Female"]}
            groupLayout={EGroupedBarLayout.OVERLAID}
            width={width}
            height={500}
            splitAxisHeight={50}
            xAxisHeight={20}
            colorScheme={[theme.green900, theme.brightBlue500]}
            direction={EChartDirection.HORIZONTAL}
            showBinPercentages={false}
          />
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  );
};

export default TornadoExample;
