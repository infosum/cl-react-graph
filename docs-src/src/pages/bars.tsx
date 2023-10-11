import React from "react";

import {
  BarChartData,
  Bars,
  Base,
  EChartDirection,
  EGroupedBarLayout,
  useHistogramDomain,
  useWidth,
} from "../../../src";
import { JSXCode } from "../components/JSXCode";
import { Layout } from "../components/Layout";
import { TwoColumns } from "../components/TwoColumns";
import { theme } from "../context/theme";

const exampleCode = `import {
  Bars,
  Base,
  EChartDirection,
  EGroupedBarLayout,
  BarChartData,
  useHistogramDomain,
  useWidth,
} from 'cl-react-graph;

const data: BarChartData = {
  bins: ['Female', 'Male', 'Other'],
  counts: [
    {
      data: [79200, 52400, 13300],
      label: 'Baseline',
    },
    {
      data: [60000, 34230, 10000],
      label: 'Filtered',
    },
  ],
};

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  const groupLayout = EGroupedBarLayout.GROUPED;
  const domain = useHistogramDomain({
    groupLayout: groupLayout,
    bins: data.bins,
    values: data.counts,
    tickValues: [],
  });

  return (
    <div ref={ref}>
      <Base
        width={width}
        height={220}>
        <BarsComponent
          bins={data.bins}
          colorScheme={[theme.green900, theme.brightBlue800]}
          direction={EChartDirection.HORIZONTAL}
          domain={domain}
          groupLayout={groupLayout}
          height={200}
          showLabels={[true, true]}
          values={data.counts}
          width={width}
          />
      </Base>
    </div>
  )
};
`;

const customLabelCode = `
import { TLabelComponent, EChartDirection } from 'cl-react-graph';

const CustomLabel: TLabelComponent = ({direction, inverse, fill, label, item}) => {
  const offset = direction === EChartDirection.VERTICAL
  ? '0, -5'
  : inverse ? '-5, 0' : '5, 0';
const textAnchor = direction === EChartDirection.VERTICAL
  ? 'middle'
  : inverse ? 'end' : 'left';
return (
  <g transform={\`translate(\${offset})\`}
    role="cell">
    <text textAnchor={textAnchor}
      fill={fill}
      fontSize="1rem">{
        label ?? \`\${Math.round(Number(item.percentage))}%\`}
    </text>
  </g>
)
}

  <Bars
    ...
    LabelComponent={CustomLabel}
  />
`;

const colorSchemeExample = `
const scheme = [
  {
    gradientTransform: 'rotate(90)',
    stops: [
      { offset: "5%", stopColor: theme.green700 },
      { offset: "95%", stopColor: theme.green500 },
    ],
  },
  {
    stops: [
      { offset: "5%", stopColor:  theme.brightBlue700 },
      { offset: "95%", stopColor:  theme.brightBlue300 },
    ],
  },
]
  <Bars
    ...
    colorScheme={scheme}
  />
`;
const data: BarChartData = {
  bins: ["Female", "Male", "Other"],
  counts: [
    {
      data: [79200, 52400, 13300],
      label: "Baseline",
    },
    {
      data: [60000, 34230, 10000],
      label: "Filtered",
    },
  ],
};

const scheme = [
  {
    gradientTransform: "rotate(90)",
    stops: [
      { offset: "5%", stopColor: theme.green700 },
      { offset: "95%", stopColor: theme.green500 },
    ],
  },
  {
    stops: [
      { offset: "5%", stopColor: theme.brightBlue700 },
      { offset: "95%", stopColor: theme.brightBlue300 },
    ],
  },
];

const BarsExample = () => {
  const [ref, width] = useWidth("90%");
  const groupLayout = EGroupedBarLayout.GROUPED;
  const domain = useHistogramDomain({
    groupLayout: groupLayout,
    bins: data.bins,
    values: data.counts,
    tickValues: [],
  });

  return (
    <Layout>
      <h2>Bars</h2>
      <TwoColumns>
        <div ref={ref}>
          <Base width={width} height={220}>
            <Bars
              bins={data.bins}
              colorScheme={[theme.green900, theme.brightBlue800]}
              direction={EChartDirection.HORIZONTAL}
              domain={domain}
              groupLayout={groupLayout}
              height={200}
              showLabels={[true, true]}
              values={data.counts}
              width={width}
            />
          </Base>

          <h3>Using a custom label</h3>
          <p>
            The label assigned after each bar can be customized with a new
            component. In the example below we increase its font size:
          </p>
          <JSXCode exampleCode={customLabelCode} />

          <h3>Color Schemes</h3>
          <p>
            The colorScheme prop is an array of items. Each bin item will be
            filled with the corresponding color scheme item
          </p>
          <p>
            Each item can be a string representing a solid fill, or an object to
            specify a linear fill
          </p>
          <JSXCode exampleCode={colorSchemeExample} />
          <p>
            <Base width={width} height={120}>
              <Bars
                bins={data.bins}
                colorScheme={scheme}
                direction={EChartDirection.HORIZONTAL}
                domain={domain}
                groupLayout={groupLayout}
                height={100}
                showLabels={[true, true]}
                values={data.counts}
                width={width}
              />
            </Base>
          </p>
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  );
};

export default BarsExample;
