import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import PieChart, {
} from '../../../src/PieChart';
import Legend from '../../../src/Legend';
import {
  data2,
  data3,
  theme,
} from './data';
import { Link } from "gatsby";


const toggleData = [data2, data3];
const heights = [200, 100];
const labels = {
  display: true,
};
const PieExample = () => {
  const [visible, setVisible] = useState({});
  const [dataIndex, setDataIndex] = useState(0);
  return (
    <Layout>
      <SEO title="Histogram" />
      <h1>Pie Chart</h1>
      <Link to="/">Go back to the homepage</Link>
      <div>
        <PieChart
          width={'100%'}
          height={heights[dataIndex]}
          donutWidth={0}
          labels={{
            display: false,
            displayFn: () => null,
          }}
          data={toggleData[dataIndex]} />

        <button onClick={() => setDataIndex(dataIndex === 0 ? 1 : 0)}>
          toggle data
          </button>

        <h4>Donut</h4>
        <PieChart width={400}
          colorScheme={theme}
          backgroundColor="#eee"
          height={heights[dataIndex]}
          donutWidth={10}
          data={toggleData[dataIndex]}

          visible={visible}
          labels={labels} />
        <Legend
          theme={theme}
          data={toggleData[dataIndex]}
          onSelect={(key) => setVisible({ ...visible, [key]: visible.hasOwnProperty(key) ? !visible[key] : false })}
          visible={visible}
        />
      </div>
    </Layout>
  );
}

export default PieExample;
