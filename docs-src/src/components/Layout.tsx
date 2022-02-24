
import './layout.css';

import React, { FC } from 'react';
import styled from 'styled-components';

import { theme } from '../context/theme';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { SideMenu } from './SideMenu';

const Context = styled.div`
  color: ${theme.grey300};
`;

export const Layout: FC = ({ children }) => {
  return (
    <Context>
     {/* <Head>
        <title>Cl-react-charts documentation</title>
        <meta name="description" content="React svg charting library" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <Navbar />
      <div style={{ display: 'grid', gridTemplateColumns: "20rem 1fr", gridGap: "1rem" }}> 
      <SideMenu />
      <main>{children}</main>
      </div>
      <Footer />
    </Context>
  )
}
