import React, { useReducer } from 'react';

import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core';

import {
  EGroupedBarLayout,
  IAxes,
} from '../../../src';
import { EColorManipulations } from '../../../src/Histogram';
import TornadoChart, {
  ITornadoData,
  ITornadoProps,
} from '../../../src/Tornado';
import { DeepPartial } from '../../../src/utils/types';
import JSXToString from '../components/JSXToString';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { grid } from '../data';

const axis: DeepPartial<IAxes> = {
  x: {
    numberFormat: ".2s",
    scale: 'LINEAR',
    ticks: 4,
  },
  y: {
    ticks: 3,
    tickSize: 0,
  },
};


type Actions = { type: 'SET_SHOW_PERCENTAGES', show: boolean }
  | { type: 'HERE' };

const initialState: DeepPartial<ITornadoProps> = {
  data: {
    bins: ["16-18", "18-25", "25-35", "35-50", "50-65", "65-∞"],
    // @Todo test with only one count set
    counts: [
      {
        label: 'Background',
        data: [
          [0, 2600, 5100, 9700, 8400, 6700], // Male bin 1, Male bin 2,
          [0, 2100, 4700, 8700, 4900, 1400], // Female bin 1, Female bin 2,
        ],
      },
      {
        label: 'Foreground',
        data: [
          [0, 2600, 5100, 9700, 8400, 6700], // Male bin 1, Male bin 2,
          [0, 2100, 4700, 8700, 4900, 1400], // Female bin 1, Female bin 2,
        ],
      },

    ],
  },
  axis,
  splitBins: ['Male', 'Female'],
  bar: {
    grouped: {
      paddingInner: 0.1,
      paddingOuter: 0,
    },
    paddingInner: 0.1,
    paddingOuter: 0,
    overlayMargin: 10,
    hover: {
      lighten: 0.1,
    },
    // width: 40,
  },
  center: true,
  delay: 0,
  duration: 400,
  grid,
  groupLayout: EGroupedBarLayout.OVERLAID,
}

function reducer(state: ITornadoProps, action: Actions): ITornadoProps {
  switch (action.type) {
    case 'SET_SHOW_PERCENTAGES':
      return {
        ...state,
        showBinPercentages: action.show,
      };
  }
  return state;
}


const Tornado = () => {
  const [state, dispatch] = useReducer(reducer, initialState as ITornadoProps);
  const chart = <TornadoChart
    {...state}
    width="600" />;
  return (
    <Layout>
      <SEO title="Line Chart" description="" />
      <Typography variant="h2">Tornado Chart</Typography>
      <div>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                {chart}
              </CardContent>
            </Card>
            <br />
            <Card>
              <CardContent>
                <JSXToString component={chart} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={state.showBinPercentages}
                  color="primary"
                  onChange={(_, value) => {
                    dispatch({ type: 'SET_SHOW_PERCENTAGES', show: value });
                  }}
                />
              }
              label="Show points"
            />
          </Grid>

          <Grid item xs={6}>

          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export default Tornado;