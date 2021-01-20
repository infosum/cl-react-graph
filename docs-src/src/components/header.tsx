import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';

const Header = ({ siteTitle }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit" >
        <Link to="/">{siteTitle}</Link>
      </Typography>

      <Button><Link to="/histogram">Histogram</Link></Button>
      <Button><Link to="/line">Line Chart</Link></Button>
      <Button><Link to="/pie">Pie Chart</Link></Button>
      <Button><Link to="/tornado">Tornado Chart</Link></Button>
      <Button><Link to="/joyplot">Joy Plot</Link></Button>
      <Button><Link to="/brush">Brush</Link></Button>
      <Button><Link to="/chord">Chord</Link></Button>
      <Button><Link to="/upset">Upset</Link></Button>

      {/* <Button><Link to="/map">Map</Link></Button> */}
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
