import React from 'react';

import {
  RadarChart,
  RadarChartData,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';

const exampleCode = `import {
  RadarChartData,
  RadarChart,
  useWidth,
} from 'cl-react-graph;

const data: RadarChartData[] = [{
  axes: [
    { axis: "strength", value: 13 },
    { axis: "intelligence", value: 6 },
    { axis: "charisma", value: 5 },
    { axis: "dexterity", value: 9 },
    { axis: "luck", value: 2 }
  ]
},
{
  axes: [
    { axis: "strength", value: 6 },
    { axis: "intelligence", value: 7 },
    { axis: "charisma", value: 10 },
    { axis: "dexterity", value: 13 },
    { axis: "luck", value: 9 }
  ]
}];

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  return(
    <div ref={ref}>
      <RadarChart
        id="radar-demo"
        height={400}
        width={width}
        data={data} />
    </div>
  )
};
`;

const data: RadarChartData[] = [{
  axes: [
    { axis: "strength", value: 13 },
    { axis: "intelligence", value: 6 },
    { axis: "charisma", value: 5 },
    { axis: "dexterity", value: 9 },
    { axis: "luck", value: 2 }
  ]
},
{
  axes: [
    { axis: "strength", value: 6 },
    { axis: "intelligence", value: 7 },
    { axis: "charisma", value: 10 },
    { axis: "dexterity", value: 13 },
    { axis: "luck", value: 9 }
  ]
}];


const RadarExample = () => {
  const [ref, width] = useWidth('90%');
  return (
    <Layout>
      <h2>Radar Chart</h2>
      <TwoColumns>
        <div ref={ref}>
        <RadarChart
          id="radar-demo"
          height={400}
          width={width}
          data={data} />
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  )
};

export default RadarExample;
