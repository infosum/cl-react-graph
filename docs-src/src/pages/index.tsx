import { Link } from 'gatsby';
import React, { useState } from 'react';

import { DrawerComponent } from '../components/Drawer';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => {

  return (
    <Layout>
      <SEO title="Home" keywords={[`infoSum`, `charts`, `react`]} description="" />


    </Layout>
  );
};

export default IndexPage;
