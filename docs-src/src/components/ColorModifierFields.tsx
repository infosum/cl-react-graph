import React, { FC, Dispatch } from 'react';
import { EColorManipulations } from '../../../src/Histogram';
import { TextField, MenuItem, Grid, Button } from '@material-ui/core';
import { $enum } from "ts-enum-util";
import { Actions } from '../pages/histogram';

interface IProps {
  dispatch: Dispatch<Actions>;
  values: Partial<Record<EColorManipulations, number>>;
}

const ColorModifierFields: FC<IProps> = ({
  dispatch, 
  values,
}) => {
  const options = $enum(EColorManipulations).map((v) => <MenuItem 
  key={v}
  value={v}>
{String(v)}
</MenuItem>);

    return (
    <Grid container>
       <Grid item xs={12}>
    <Button 
      size="small"
      color="primary"
      onClick={() => {
      dispatch({ type: 'setHoverModifier', key: '', index:  Object.keys(values).length, value: 0 })
    }}>
      Add
    </Button>
    </Grid>
    {
      Object.keys(values).map((l, i) => 
      <Grid container key={l}>
        <Grid item xs={4}>
          <TextField
              key={l}
              select
              value={l}
              label="Property"
              onChange={(e) => {
                dispatch({ type: 'setHoverModifier', key: e.target.value, index: i, value: parseFloat(values[l]) });
              }}
          >
            {options}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
              defaultValue={values[l]}
              label="Value"
              onChange={(e) => {
                dispatch({ type: 'setHoverModifier', key: l, index: i, value: parseFloat(e.target.value) });
              }}
            />
        </Grid>
        <Grid item xs={4}>
          <Button 
          size="small"
          color="secondary"
          onClick={() => {
            dispatch({ type: 'removeHoverModifier', index: i});
          }}>Delete</Button>
        </Grid>
      </Grid>
    )}
    </Grid>
    );
};

export default ColorModifierFields;
