import React from 'react';
import styled from 'styled-components';

import { MenuItems } from './MenuItems';

const Bg = styled.div`
  background-color: #fff;
  border-right: 1px solid hsla(210, 31%, 90%, 1);
  padding: 1.75rem 0;
  @media (max-width: 640px){ 
    display: none;
  }
`;


export const SideMenu = () => {
  return (<Bg>
    <MenuItems />
  </Bg>
  );
};
