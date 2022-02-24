import React from 'react';

import {
  Base,
  Point,
  useWidth,
} from '../../../src';
import { IPointProps } from '../../../src/components/Point';
import { JSXCode } from '../components/JSXCode';
import { Layout } from '../components/Layout';
import { TwoColumns } from '../components/TwoColumns';
import { theme } from '../context/theme';

const exampleCode = `import {
  Base,
  Point,
  useWidth,
} from 'cl-react-graph;

const MyComponent = () => {
  const [ref, width] = useWidth('90%');
  const data: IPointProps[] = [
    { cx: 0, cy: 0, z: 10 },
    { cx: 30, cy: 30, z: 20 },
    { cx: 50, cy: 20, z: 30 },
    { cx: width, cy: 0, z: 20 },
    { cx: width / 2, cy: 100, z: 10 },
  ];
  return (
    <div ref={ref}>
    <Base
      width={width}
      height={200}
      title="Path example"
    >
      {
        data.map((d, i) => <Point
          fill={theme.purple900}
          key={i}
          opacity={0.5}
          stroke={theme.grey400}
          {...d} />
        )
      }
    </Base>
  </div>
)
}
`;

const PointExample = () => {
  const [ref, width] = useWidth('90%');
  const data: IPointProps[] = [
    { cx: 0, cy: 0, z: 10 },
    { cx: 30, cy: 30, z: 20 },
    { cx: 50, cy: 20, z: 30 },
    { cx: width, cy: 0, z: 20 },
    { cx: width / 2, cy: 100, z: 10 },
  ];
  return (
    <Layout>
      <h2>Point</h2>

      <TwoColumns>
        <div ref={ref}>
          <p>Renders a single or group of points</p>
          <Base
            width={width}
            height={200}
            title="Path example"
          >
            {
              data.map((d, i) => <Point
                fill={theme.purple900}
                key={i}
                opacity={0.5}
                stroke={theme.grey400}
                {...d} />
              )
            }
          </Base>
        </div>
        <JSXCode exampleCode={exampleCode} />

      </TwoColumns>
    </Layout>
  )
}

export default PointExample;
