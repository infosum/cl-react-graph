import React, {
  useReducer,
  useState,
} from 'react';

import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core';

import {
  EChartDirection,
  EGroupedBarLayout,
} from '../../../src';
import NativeTornado, { IProps } from '../../../src/Tornado';
import { tornadoData } from '../../../test/fixtures';
import JSXToString from '../components/JSXToString';
import Layout from '../components/layout';
import SEO from '../components/seo';

type Actions = { type: 'SET_SHOW_PERCENTAGES', show: boolean }
  | { type: 'SET_DIRECTION', direction: EChartDirection };

const initialState: IProps = {
  data: tornadoData,
  splitBins: ['Male', 'Female'],
  groupLayout: EGroupedBarLayout.OVERLAID,
  width: 600,
  height: 500,
  splitAxisHeight: 50,
  xAxisHeight: 20,
  direction: EChartDirection.HORIZONTAL,
  showBinPercentages: false,
}

function reducer(state: IProps, action: Actions): IProps {
  switch (action.type) {
    case 'SET_SHOW_PERCENTAGES':
      return {
        ...state,
        showBinPercentages: action.show,
      };
    case 'SET_DIRECTION': {
      return {
        ...state,
        direction: action.direction
      }
    }
  }
  return state;
}

const Tornado = () => {
  const [state, dispatch] = useReducer(reducer, initialState as IProps);
  const [index, setIndex] = useState(0);
  const chart = <NativeTornado
    id="demo"
    {...state} />
  return (
    <Layout>
      <SEO title="Line Chart" description="" />
      <Typography variant="h2">Tornado Chart</Typography>
      <div>
        <Grid container spacing={5} className="wrapper">
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                {chart}
                <Button onClick={() => setIndex(index === 0 ? 1 : 0)}>
                  Toggle Data
                </Button>

              </CardContent>
            </Card>
            <br />
            <Card>
              <CardContent>
                <JSXToString component={chart} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
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
            <FormControlLabel
              control={
                <Switch
                  checked={state.direction === EChartDirection.VERTICAL}
                  color="primary"
                  onChange={(_, value) => {
                    dispatch({
                      type: 'SET_DIRECTION',
                      direction: state.direction === EChartDirection.VERTICAL ? EChartDirection.HORIZONTAL : EChartDirection.VERTICAL,
                    })
                  }}
                />
              }
              label={`Direction ${state.direction}`}
            />
          </Grid>

          <Grid item xs={12} md={6}>

          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export default Tornado;
