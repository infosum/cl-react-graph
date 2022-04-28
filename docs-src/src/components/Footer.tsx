import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  color: #aaa;
`;

export const Footer = () =>   <StyledFooter>
© {new Date().getFullYear()}, Built by
{` `}
<a href="https://www.infosum.com">InfoSum</a>
</StyledFooter>;
