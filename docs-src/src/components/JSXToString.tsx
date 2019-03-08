import React, {
  FC,
  ReactNode,
} from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

import { Typography } from '@material-ui/core';

const style = {
  backgroundColor: '#303030',
  color: '#eee',
  padding: '1rem',
};

const JSXToString: FC<{ component: ReactNode }> = ({ component }) => {
  return (
    <>
      <Typography variant="h6">JSX</Typography>
      <pre style={style}>
        {reactElementToJSXString(component)}
      </pre>
    </>
  );
};

export default JSXToString;
