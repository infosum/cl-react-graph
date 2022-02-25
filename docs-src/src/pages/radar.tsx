import React from 'react';

import {
  RadarChart,
  useWidth,
} from '../../../src';
import { IRadarChartData } from '../../../src/RadarChart';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';

const exampleCode = `import {
  RadarChart,
  useWidth,
} from 'cl-react-graph;

const data: IRadarChartData[] = [{
  label: 'Germany',
  axes: [
    { axis: "strength", value: 13 },
    { axis: "intelligence", value: 6 },
    { axis: "charisma", value: 5 },
    { axis: "dexterity", value: 9 },
    { axis: "luck", value: 2 }
  ]
},
{
  label: 'Argentina',
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
}
`;

const data: IRadarChartData[] = [{
  label: 'Germany',
  axes: [
    { axis: "strength", value: 13 },
    { axis: "intelligence", value: 6 },
    { axis: "charisma", value: 5 },
    { axis: "dexterity", value: 9 },
    { axis: "luck", value: 2 }
  ]
},
{
  label: 'Argentina',
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
}

export default RadarExample;
