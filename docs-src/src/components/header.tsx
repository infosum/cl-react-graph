import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Header = ({ siteTitle, openDrawerHandler }) => (
  <AppBar position="static">
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => {
          openDrawerHandler();
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" >
        <Link to="/">{siteTitle}</Link>
      </Typography>

    </Toolbar>
  </AppBar >
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
