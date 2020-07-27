import ColorPicker from 'material-ui-color-picker';
import React, { FC } from 'react';

import {
  Card,
  CardContent,
  FormGroup,
  Grid,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core';

interface IProps<D, S> {
  dispatch: D;
  state: S;
}

export const GridOptionsFactory = <D extends any, S extends any>(): FC<IProps<D, S>> => ({ dispatch, state }) => {
  return (
    <>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>

            <TextField
              id="xTicks"
              value={state.grid.x.ticks}
              label="X Ticks"
              onChange={(e) => dispatch({ type: 'setGridTicks', axis: 'x', ticks: Number(e.target.value) })}
            />
          </Grid>
          <TextField
            id="yTicks"
            value={state.grid.y.ticks}
            label="Y Ticks"
            onChange={(e) => dispatch({ type: 'setGridTicks', axis: 'y', ticks: Number(e.target.value) })}
          />
          <Grid item xs={6}>
            <ColorPicker
              value={state.grid.x.style.stroke}
              label="Stroke color"
              onB
              onChange={(color) => dispatch({ type: 'setGridStroke', axis: 'x', color })} />
          </Grid>
          <Grid item xs={6}>
            <FormGroup>
              <Typography>Opacity <small>({state.grid.x.style['stroke-opacity']})</small></Typography>
              <Slider
                value={state.grid.x.style['stroke-opacity']}
                aria-labelledby="label"
                step={0.1}
                min={0}
                max={1}
                onChange={(_, value) => dispatch({ type: 'setGridStrokeOpacity', axis: 'x', opacity: Number(value) })}
              />

            </FormGroup>
          </Grid>
        </Grid>
      </CardContent>

    </>
  );
};
