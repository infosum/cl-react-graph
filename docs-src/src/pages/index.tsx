import { Link } from 'gatsby';
import React from 'react';

import { Layout } from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <h1>Cl React Graphs</h1>
      <p>Cl React Graphs provides a composable set of React components to build graphs and visualizations.</p>
      <p>Along side this we have standard chart components which compose these components to provide higher abstractions</p>
      <p>To get started check out the <Link to="/getting-started">quick start guide</Link></p>
      </Layout>
  )
};

export default Home;
