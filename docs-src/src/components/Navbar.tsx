import React from 'react';
import styled from 'styled-components';

import { theme } from '../context/theme';
import { InfoSumIdent } from './InfoSumIdent';

const H1 = styled.h1`
  margin: 0;
  font-size: 1.3rem; 
  font-weight: 300;
  margin: 0 1rem;
  `
export const Navbar = () => (
  <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
  <div style={{width: '35rem', display: 'flex', alignItems: 'center'}}>
    <InfoSumIdent />
  <H1>Cl React Charts</H1>
  </div>
  </div>
)
