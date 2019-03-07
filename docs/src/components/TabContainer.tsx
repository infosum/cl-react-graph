import React, { FC } from 'react';

import { Typography } from '@material-ui/core';

export const TabContainer: FC<{}> = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
};

