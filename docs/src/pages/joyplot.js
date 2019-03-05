import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import JoyPlot, {
} from '../../../src/JoyPlot';
import {
  data2,
} from './data';
import { Link } from "gatsby";


const data3 = {
  ...data2,
  counts: [{
    ...data2.counts[0],
    data: [7, 6, 5, 4, 3, 2, 1],
    label: 'Data 2',
  }],
  title: 'Plot 2',
};

const JoyPlotExample = () => {
  return (
    <Layout>
      <SEO title="Histogram" />
      <h1>Joy Plot</h1>
      <Link to="/">Go back to the homepage</Link>
      <div>
        <JoyPlot
          data={[data2, data3]}
          colorScheme={['rgba(0, 0, 0, 0.5)', '#666']}
          width={400} height={400} />
      </div>
    </Layout>
  );
}

export default JoyPlotExample;
