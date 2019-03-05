import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Histogram, {
} from '../../../src/Histogram';
import Legend from '../../../src/Legend';
import {
  axis,
  data,
  data2,
  data3,
  grid,
  theme,
} from './data';
import { Link } from "gatsby";
import { HorizontalHistogram } from "../../../src";

const tipContentFns = [
  (bins, i, d) =>
    bins[i] + '<br />HI THere ' + d.toFixed(2),
  (bins, i, d) =>
    bins[i] + '<br />Bookay ' + d.toFixed(2),
];

const dataLegendData = {
  bins: data.counts.map((c) => c.label),
  counts: [{
    data: data.counts.map((c) => c.data.reduce((p, n) => p + n, 0)),
    label: '',
  }],
};

const toggleData = [data2, data3];
const theme2 = [theme[0]];

const HistogramExample = () => {
  const [visible, setVisible] = useState({});
  const [tipContentFnIndex, setTipContentFnIndex] = useState(0);
  const [dataIndex, setDataIndex] = useState(0);
  return (
    <Layout>
      <SEO title="Histogram" />
      <h1>Histogram</h1>
      <Link to="/">Go back to the homepage</Link>
      <div>
        <h3>Histograms</h3>
        {/* <Histogram data={data2} width={400} height={400} margin={{
          left: 30,
          top: 30,
        }}
          domain={{ min: 0, max: 10 }} /> */}
        <Histogram data={data}
          axis={axis}
          grid={grid}
          width={'100%'}
          height={720}
          visible={visible}
          colorScheme={theme}
          tipContentFn={tipContentFns[tipContentFnIndex]} />
        <Legend
          theme={theme}
          data={dataLegendData}
          onSelect={(key) => {
            setVisible({ ...visible, [key]: visible.hasOwnProperty(key) ? !visible[key] : false });
          }}
          visible={visible}
        />

        <Histogram data={toggleData[dataIndex]}
          bar={{ margin: 0.1 }}
          colorScheme={theme}
          visible={visible}
          width={700}
          height={350}
          axis={axis}
          tipContentFn={tipContentFns[tipContentFnIndex]}
        />
        <Legend
          theme={theme2}
          data={toggleData[dataIndex]}
          onSelect={(key) => {
            setVisible({ ...visible, [key]: visible.hasOwnProperty(key) ? !visible[key] : false });
          }}
          visible={visible}
        />

        <button onClick={() => setDataIndex(dataIndex === 0 ? 1 : 0)}>
          toggle data
          </button>
        <button onClick={() => setTipContentFnIndex(tipContentFnIndex === 0 ? 1 : 0)}>
          toggleAxisLabel &amp; tips</button>
      </div>

      <HorizontalHistogram
        data={data2}
        width={500}
        height={400}
        margin={{
          left: 30,
          top: 30,
        }} />
    </Layout>
  );
}

export default HistogramExample;
