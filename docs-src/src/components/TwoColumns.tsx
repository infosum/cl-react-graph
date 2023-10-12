import React from "react";
import styled from "styled-components";

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;
