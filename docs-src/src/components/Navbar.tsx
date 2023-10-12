import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

import { InfoSumIdent } from "./InfoSumIdent";

const H1 = styled.h1`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 300;
  margin: 0 1rem;
`;

const TitleLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none !important;
  h1 {
    color: hsla(213, 4%, 54%, 1);
  }
`;

export const Navbar = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      width: "100%",
      justifyContent: "space-between",
    }}
  >
    <div style={{ width: "35rem", display: "flex", alignItems: "center" }}>
      <TitleLink to="/">
        <InfoSumIdent />
        <H1>Cl React Graphs</H1>
      </TitleLink>
    </div>
  </div>
);
