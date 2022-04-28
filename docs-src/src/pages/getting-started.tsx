import React from 'react';
import styled from 'styled-components';

import {
  PieChart,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';

const Paragraph = styled.p`
  width: 36rem;
`;

const npmICode = `npm i -S cl-react-graph`;
const importCode = `
  import {
    PieChart,
    useWidth,
  } from 'cl-react-graph;
`;
const dataCode = `
  const data = {
    bins: [
      'bin 1',
      'bin 2',
      'bin 3 with a long name',
      'bin 4',
      'bin 5',
      'bin 6',
      'bin 7'
    ],
    counts: [
      {
        data: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  };
`;
const chartCode = `
  const MyComponent = () => {
    const [ref, width] = useWidth('90%');
    return(
      <div ref={ref}>
        <PieChart
          width={400}
          height={400}
          labels={{
            display: true,
          }}
          data={data}
        />
      </div>
    )
  };
`;

const data = {
  bins: [
    'bin 1',
    'bin 2',
    'bin 3 with a long name',
    'bin 4',
    'bin 5',
    'bin 6',
    'bin 7'
  ],
  counts: [
    {
      data: [1, 2, 3, 4, 5, 6, 7],
    },
  ],
};

const Home = () => {
  const [ref, width] = useWidth('90%');
  return (
    <Layout>
    <h1>Quick start guide</h1>
    <h3>Installation</h3>
    <Paragraph>Install cl-react-graph using NPM or Yarn</Paragraph>
    <JSXCode exampleCode={npmICode} />

    <h3>Creating our first Graph</h3>
    <Paragraph>You are going to use a pie chart for our example lets import that and useWidth to handle the resizing</Paragraph>
    <JSXCode exampleCode={importCode} />

    <Paragraph>Now You need some data here is an example for you to get started, for more options take a deeper dive into the chart you want to use</Paragraph>
    <JSXCode exampleCode={dataCode} />

    <Paragraph>Then use the chart like so passing in your data</Paragraph>
    <JSXCode exampleCode={chartCode} />

    <h3>Resulting pie chart</h3>
    <div ref={ref}>
      <PieChart
        width={400}
        height={400}
        labels={{
          display: true,
        }}
        data={data}
      />
    </div>
    </Layout>
  )
}

export default Home
