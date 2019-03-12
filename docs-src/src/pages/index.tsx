import { Link } from 'gatsby';
import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`infoSum`, `charts`, `react`]} description="" />
    <ul>
      <li><Link to="/histogram">Histogram</Link></li>
      <li><Link to="/line">Line Chart</Link></li>
      <li><Link to="/pie">Pie Chart</Link></li>
      <li><Link to="/joyplot">Joy Plot</Link></li>
      <li><Link to="/map">Map</Link></li>
    </ul>
  </Layout>
);

export default IndexPage;