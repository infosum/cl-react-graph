import { Link } from 'gatsby';
import React, { FC } from 'react';

import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';

interface IProps {
  toggleDrawerHandler: () => void;
  isOpen: boolean;
}
export const DrawerComponent: FC<IProps> = ({
  toggleDrawerHandler,
  isOpen,
}) => {
  return (
    <Drawer open={isOpen} onClose={toggleDrawerHandler}>
      <div
        role="presentation"
        style={{ width: '12rem' }}
        onClick={toggleDrawerHandler}
        onKeyDown={toggleDrawerHandler}
      >
        <List>
          <ListItem button><Link to="/histogram"><ListItemText primary="Histogram" /></Link></ListItem>
          <ListItem button><Link to="/line"><ListItemText primary="Line Chart" /></Link></ListItem>
          <ListItem button><Link to="/pie"><ListItemText primary="Pie Chart" /></Link></ListItem>
          <ListItem button><Link to="/joyplot"><ListItemText primary="Joy Plot" /></Link></ListItem>
          <ListItem button><Link to="/tornado"><ListItemText primary="Tornado" /></Link></ListItem>
          <ListItem button><Link to="/brush"><ListItemText primary="Brush" /></Link></ListItem>
          <ListItem button><Link to="/chord"><ListItemText primary="Chord" /></Link></ListItem>
          <ListItem button><Link to="/map"><ListItemText primary="Map" /></Link></ListItem>
          <ListItem button><Link to="/radar"><ListItemText primary="Radar" /></Link></ListItem>
          <ListItem button><Link to="/scatter"><ListItemText primary="Scatter" /></Link></ListItem>
          <ListItem button><Link to="/upset"><ListItemText primary="Upset" /></Link></ListItem>
        </List>
      </div>


    </Drawer>
  );
}
