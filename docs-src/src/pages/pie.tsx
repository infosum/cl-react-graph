import { Draft } from 'immer';
import React, { useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import { useImmerReducer } from 'use-immer';

import {
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  Slider,
  Switch,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';

import Legend from '../../../src/Legend';
import PieChart, { IPieChartProps } from '../../../src/PieChart';
import JSXToString from '../components/JSXToString';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TabContainer } from '../components/TabContainer';
import {
  data2,
  theme,
} from '../data';
import { dataToSpreadSheet } from './histogram';

type IInitialState = Pick<IPieChartProps, 'data' | 'donutWidth' | 'height' | 'labels' | 'visible' | 'width'>;

const initialState: IInitialState = {
  data: data2,
  donutWidth: 0,
  height: 200,
  labels: {
    displayFn: () => '',
    display: false,
  },
  visible: {},
  width: 300,
};

type Actions = { type: 'toggleVisible'; key: string }
  | { type: 'setData', data: IInitialState['data'] }
  | { type: 'setDonutWidth', width: number }
  | { type: 'showLabels', show: boolean };

function reducer(draft: Draft<IInitialState>, action: Actions) {
  switch (action.type) {
    case 'toggleVisible':
      draft.visible[action.key] = draft.visible.hasOwnProperty(action.key)
        ? !draft.visible[action.key]
        : false;
      return;
    case 'setData':
      draft.data = action.data;
      return;
    case 'setDonutWidth':
      draft.donutWidth = action.width;
      return;
    case 'showLabels':
      draft.labels.display = action.show;
      return;
  }
}

const PieExample = () => {
  const [tab, setTab] = useState(0);
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const spreadSheetData = dataToSpreadSheet(state.data);
  const chart = <PieChart
    width={state.width}
    height={state.height}
    donutWidth={state.donutWidth}
    labels={state.labels}
    data={state.data}
    colorScheme={theme}
    visible={state.visible} />;
  return (
    <Layout>
      <SEO title="Histogram" description="" />
      <Typography variant="h2">Pie Chart</Typography>
      <div>
        <Grid container>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                {chart}
                <Legend
                  data={state.data}
                  theme={theme}
                  onSelect={(key) => dispatch({ type: 'toggleVisible', key })}
                  visible={state.visible}
                />
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
            <Card>
              <CardContent>
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                  <Tab label="Data" />
                  <Tab label="Styling" />
                </Tabs>
                {
                  tab === 0 && <TabContainer>
                    <ReactDataSheet data={spreadSheetData}
                      valueRenderer={(cell) => cell.value}
                      sheetRenderer={(props) => (
                        <table className={props.className + ' my-awesome-extra-class'}>
                          <thead>
                            <tr>
                              <th className="action-cell">Bin</th>
                              {
                                state.data.counts.map((count) => (<th key={count.label} className="action-cell">
                                  {count.label}
                                </th>))
                              }
                            </tr>
                          </thead>
                          <tbody>
                            {props.children}
                          </tbody>
                        </table>
                      )}
                      onCellsChanged={(changes) => {
                        changes.forEach(({ cell, row, col, value }) => {
                          if (col === 0) {
                            state.data.bins[row] = value;
                          } else {
                            state.data.counts[col - 1].data[row] = Number(value);
                          }
                        });
                        dispatch({ type: 'setData', data: state.data });
                      }} />
                  </TabContainer>
                }
                {
                  tab === 1 && <TabContainer>
                    <Grid container>
                      <Grid item xs={6}>
                        <FormGroup>
                          <Typography>Donut <small>({state.donutWidth})</small></Typography>
                          <Slider
                            value={state.donutWidth}
                            aria-labelledby="label"
                            step={1}
                            onChange={(_, value) => dispatch({ type: 'setDonutWidth', width: Number(value) })}
                          />
                        </FormGroup>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={state.labels.display}
                                color="primary"
                                onChange={(_, value) => {
                                  dispatch({ type: 'showLabels', show: value });
                                }}
                              />
                            }
                            label="Show labels"
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </TabContainer>
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default PieExample;

