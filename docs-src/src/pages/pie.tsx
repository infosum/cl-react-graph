import merge from 'deepmerge';
import React, {
  useReducer,
  useState,
} from 'react';
import ReactDataSheet, { Cell } from 'react-datasheet';

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
import { DeepPartial } from '../../../src/utils/types';
import JSXToString from '../components/JSXToString';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TabContainer } from '../components/TabContainer';
import {
  data2,
  theme,
} from '../data';
import { dataToSpreadSheet } from './histogram';

const initialSate: DeepPartial<IPieChartProps> = {
  data: data2,
  donutWidth: 0,
  height: 200,
  labels: {
    display: false,
  },
  visible: {},
  width: 300,
};

type Actions = { type: 'toggleVisible'; key: string }
  | { type: 'setData', data: IPieChartProps['data'] }
  | { type: 'setDonutWidth', width: number }
  | { type: 'showLabels', show: boolean };

function reducer(state: IPieChartProps, action: Actions) {
  switch (action.type) {
    case 'toggleVisible':
      const visible = {
        ...state.visible,
        [action.key]: state.visible.hasOwnProperty(action.key)
          ? !state.visible[action.key]
          : false,
      };
      return { ...state, visible };
    case 'setData':
      return { ...state, data: action.data };
    case 'setDonutWidth':
      return { ...state, donutWidth: action.width };
    case 'showLabels':
      return merge(state, { labels: { display: action.show } });
    default:
      throw new Error();
  }
}

const PieExample = () => {
  const [tab, setTab] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialSate as IPieChartProps);

  const speadSheetData = dataToSpreadSheet(state.data);
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
                    <ReactDataSheet data={speadSheetData}
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

