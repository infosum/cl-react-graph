import { Link } from 'gatsby';
import React from 'react';

import { Layout } from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <h1>CL React Graph</h1>
      <p>CL React Graph exposes a composable set of React building block components to build charts, graphs and visualizations.</p>
      <p>In addition CL React Graph provides higher level Chart components, created by composing these building blocks.</p>
      <p>To get started check out the <Link to="/getting-started">quick start guide</Link></p>
      </Layout>
  )
};

export default Home;
