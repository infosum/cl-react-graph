import React from 'react';

import {
  Base,
  useWidth,
} from '../../../src';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';

const exampleCode = `import {
  Base, 
  Grid,
} from 'cl-react-graph;

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  return(
  
  )
}
`;

const LabelExample = () => {
  const [ref, width] = useWidth('90%');
  return (
    <Layout>
      <h2>Label</h2>

      <p>@todo</p>
      <TwoColumns>
        <div ref={ref}>
        <Base
          width={width}
          height={200}
          title="Label example"
        >
        </Base>
        </div>
        <JSXCode exampleCode={exampleCode} />

      </TwoColumns>
    </Layout>
  )
}

export default LabelExample;
