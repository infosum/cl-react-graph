import React, { FC } from 'react';

import {
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';

import { ELabelOrientation } from '../../../src/components/YAxis';
import { Scale } from '../../../src/Histogram';

interface IProps<D, S> {
  dispatch: D;
  state: S;
}

export type AxisActions = { type: 'setScale'; axis: 'x' | 'y'; value: Scale; };

export const AxisOptionsFactory = <D extends any, S extends any>(): FC<IProps<D, S>> => ({ dispatch, state }) => {
  return (
    <>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>X Axis</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>

              <TextField
                label="X Axis label direction"
                select
                defaultValue={state.axis.x.labelOrientation}
                onChange={(e) => {
                  dispatch({ type: 'setLabelOrientation', axis: 'x', value: e.target.value });
                }}
              >
                <MenuItem value={ELabelOrientation.horizontal}>
                  horizontal
                </MenuItem>
                <MenuItem value={ELabelOrientation.vertical}>
                  vertical
                </MenuItem>

              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="X Axis Scale"
                select
                value={state.axis.x.scale}
                onChange={(e) => {
                  dispatch({ type: 'setScale', axis: 'x', value: e.target.value });
                }}
              >
                <MenuItem value="LINEAR">
                  Linear
                </MenuItem>
                <MenuItem value="LOG">
                  Log
                </MenuItem>
              </TextField>
            </Grid>

          </Grid>
        </CardContent>
      </Card>
      <br />
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Y Axis
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <p>Not yet working on histograms</p>
              <TextField
                label="Y Axis Scale"
                select
                value={state.axis.y.scale}
                onChange={(e) => dispatch({ type: 'setScale', axis: 'y', value: e.target.value })}
              >
                <MenuItem value="LINEAR">
                  Linear
                </MenuItem>
                <MenuItem value="LOG">
                  Log
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
