import React, { useReducer } from 'react';

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import {
  EGroupedBarLayout,
  IAxes,
} from '../../../src';
import { EColorManipulations } from '../../../src/Histogram';
import TornadoChart, { ITornadoProps } from '../../../src/Tornado';
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


type Actions = { type: 'TEST' }
  | { type: 'HERE' };

type TInitialState = ITornadoProps | {
  axis: DeepPartial<IAxes>;
  bar: {
    overlayMargin: number;
    hover: Partial<Record<EColorManipulations, number>>;
  };
}
const initialState: TInitialState = {
  data: {
    bins: ['0 - 10', '11 - 20'],
    // @Todo test with only one count set
    counts: [
      {
        label: 'Background',
        data: [
          [5000, 100000], // Male bin 1, Male bin 2,
          [10000, 20000], // Female bin 1, Female bin 2,
        ]
      },
      {
        label: 'Foreground',
        data: [
          [2000, 1000], // Male bin 1, Male bin 2,
          [5000, 3000], // Female bin 1, Female bin 2,
        ]
      },

    ],
  },
  axis,
  splitBins: ['Male', 'Female'],
  bar: {
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

function reducer(state: ITornadoProps, action: Actions) {
  return state;
}


const Tornado = () => {
  const [state, dispatch] = useReducer(reducer, initialState as ITornadoProps);
  const chart = <TornadoChart
    {...initialState}
    data={state.data}
    width="100%" />;
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

          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export default Tornado;