import React, { FC } from 'react';

import {
  Grid,
  MenuItem,
  TextField,
} from '@material-ui/core';

import { EGroupedBarLayout } from '../../../../src';
import ColorModifierFields from '../ColorModifierFields';
import { TabContainer } from '../TabContainer';

interface IProps {
  dispatch: (action: any) => void;
  state: any;
}
export const Styling: FC<IProps> = ({
  dispatch,
  state,
}) => {
  return (
    <TabContainer>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <TextField
            select
            label="Group Layout"
            value={state.groupLayout}
            onChange={(e) => {
              dispatch({ type: 'setGroupedBarLayout', layout: Number(e.target.value) })
            }}>
            <MenuItem value={EGroupedBarLayout.GROUPED}>Grouped</MenuItem>
            <MenuItem value={EGroupedBarLayout.OVERLAID}>Overlaid</MenuItem>
            <MenuItem value={EGroupedBarLayout.STACKED}>Stacked</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Chart width"
            value={state.width}
            onChange={(e) => {
              dispatch(({ type: 'setWidth', width: e.target.value }))
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <label>
            Grouped padding inner (0 - 1)
        </label>
          <input
            type="number"
            min={0}
            max={1}
            step={0.1}
            value={state.bar.grouped.paddingInner.toString()}
            onChange={(e: any) => {
              dispatch(({ type: 'setGroupedPaddingInner', padding: parseFloat(e.target.value) }))
            }}
          />
          <div><small>
            When rendered as grouped, this is the relative spacing between each bar in the group
        </small>
          </div>
        </Grid>
        <Grid item xs={6}>
          <label>
            Grouped padding outer (0 - 1)
        </label>
          <input
            type="number"
            min={0}
            step={0.1}
            max={1}
            value={state.bar.grouped.paddingOuter.toString()}
            onChange={(e: any) => {
              dispatch(({ type: 'setGroupedPaddingOuter', padding: parseFloat(e.target.value) }))
            }}
          />
          <div>
            <small>
              When rendered as grouped, this is the relative spacing at the start  and end of the group's bars
        </small>
          </div>
        </Grid>

        <Grid item xs={6}>
          <label>
            Padding inner (0 - 1)
        </label>
          <input
            type="number"
            min={0}
            max={1}
            step={0.1}
            value={state.bar.paddingInner.toString()}
            onChange={(e: any) => {
              dispatch(({ type: 'setPaddingInner', padding: parseFloat(e.target.value) }))
            }}
          />
          <div>
            <small>
              This is the relative padding for the inside of grouped datasets or single datasets
        </small>
          </div>
        </Grid>
        <Grid item xs={6}>
          <label>
            Padding outer (0 - 1)
        </label>
          <input
            type="number"
            min={0}
            step={0.1}
            max={1}
            value={state.bar.paddingOuter.toString()}
            onChange={(e: any) => {
              dispatch(({ type: 'setPaddingOuter', padding: parseFloat(e.target.value) }))
            }}
          />
          <small>
            This is the relative padding for the outside of grouped datasets or single datasets
        </small>
        </Grid>

        {
          state.groupLayout === EGroupedBarLayout.OVERLAID &&
          <Grid item xs={6}>
            <TextField
              helperText="When rendered as overlaid, this is the space between the overlaid bars"
              label="Overlay margin (px)"
              value={state.bar.overlayMargin}
              onChange={(e) => {
                dispatch(({ type: 'setOverlayMargin', margin: Number(e.target.value) }))
              }}
            />
          </Grid>
        }
        <ColorModifierFields
          values={state.bar.hover}
          dispatch={dispatch} />
      </Grid>
    </TabContainer>
  )
};
