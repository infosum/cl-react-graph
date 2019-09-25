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
import {
  axis,
  grid,
} from '../data';

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
    counts: [{
      label: 'Foreground',
      data: [
        [2, 1], // Male bin 1, Male bin 2,
        [5, 3], // Female bin 1, Female bin 2,
      ]
    },
    {
      label: 'Background',
      data: [
        [5, 10], // Male bin 1, Male bin 2,
        [5, 3], // Female bin 1, Female bin 2,
      ]
    },
    ],
  },
  axis,
  bar: {
    overlayMargin: 5,
    hover: {
      lighten: 0.1,
    },
  },
  delay: 0,
  duration: 400,
  grid,
  groupLayout: EGroupedBarLayout.GROUPED,
}

function reducer(state: ITornadoProps, action: Actions) {
  return state;
}


const Tornado = () => {
  const [state, dispatch] = useReducer(reducer, initialState as ITornadoProps);
  const chart = <TornadoChart

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