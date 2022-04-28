import React from 'react';

import {
  Chord,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';

const exampleCode = `import {
  Chord,
  useWidth,
} from 'cl-react-graph;

const MyComponent = () => {
  const [ref, width] = useWidth('90%');

  return (
    <div ref={ref}>
      <Chord
        width={width}
        height={400}
        data={
          {
            'France': [0, 10, 20, 12],
            'Britain': [20, 0, 30, 2],
            'Ireland': [30, 40, 0, 23],
            'Spain': [10, 23, 43, 0]
          }
        } />
    </div>
  )
};
`;

const ChordExample = () => {
  const [ref, width] = useWidth('90%');
  return (
    <Layout>
      <h2>Chord Chart</h2>
      <TwoColumns>
        <div ref={ref}>
          <Chord
            width={Number(width)  <= 0 ? 300 : width}
            height={400}
            data={
              {
                'France': [0, 10, 20, 12],
                'Britain': [20, 0, 30, 2],
                'Ireland': [30, 40, 0, 23],
                'Spain': [10, 23, 43, 0]
              }
            } />
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  )
};

export default ChordExample;
