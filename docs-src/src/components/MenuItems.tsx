import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
margin-bottom: 1rem;
ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0;
  margin: 0;
}

h2 {
  margin: 0 1rem 0.75rem 1rem;
  font-size: 1.1rem;
}
`;

const MenuItem = styled(Link)`
  padding: 0.5rem 2rem;
  text-decoration: none;
  display: block;
  color: hsla(206, 4%, 36%, 1);
  &:hover {
    background: ${(props) => props.theme.brightBlue900}
  }
`;

export const MenuItems = () => {
  return (
    <>
      <Section>
        <h2>Getting Started</h2>
        <MenuItem to="/getting-started">Getting started</MenuItem>
      </Section>
      <Section>
        <h2>Common Components</h2>
        <ul>
          <li>
            <MenuItem to="/axis">Axis</MenuItem>
          </li>
          <li>
            <MenuItem to="/area-fill">Area fill</MenuItem>
          </li>
          <li>
            <MenuItem to="/bars">Bars</MenuItem>
          </li>
          <li>
            <MenuItem to="/brush">Brush</MenuItem>
          </li>
          <li>
            <MenuItem to="/grid">Grid</MenuItem>
          </li>
          <li>
            <MenuItem to="/label">Label</MenuItem>
          </li>
          <li>
            <MenuItem to="/line">Line</MenuItem>
          </li>
          <li>
            <MenuItem to="/path">Path</MenuItem>
          </li>
          <li>
            <MenuItem to="/point">Point</MenuItem>
          </li>
        </ul>
      </Section>
      <Section>
        <h2>Charts</h2>
        <ul>
          <li>
            <MenuItem to="/bar-chart">Bar chart</MenuItem>
          </li>
          <li>
            <MenuItem to="/chord">Chord</MenuItem>
          </li>
          <li>
            <MenuItem to="/histogram">Histogram</MenuItem>
          </li>
          <li>
            <MenuItem to="/joyplot">Joyplot</MenuItem>
          </li>
          <li>
            <MenuItem to="/line">Line chart</MenuItem>
          </li>
          <li>
            <MenuItem to="/pie">Pie chart</MenuItem>
          </li>
          <li>
            <MenuItem to="/radar">Radar chart</MenuItem>
          </li>
          <li>
            <MenuItem to="/scatter">Scatter chart</MenuItem>
          </li>
          <li>
            <MenuItem to="/tornado">Tornado chart</MenuItem>
          </li>
          <li>
            <MenuItem to="/upset">Upset chart</MenuItem>
          </li>
        </ul>
      </Section>
    </>
  )
};
