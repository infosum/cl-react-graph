import React, {
  useReducer,
  useState,
} from 'react';
import ReactDataSheet, { Cell } from 'react-datasheet';
import ReactJson from 'react-json-view';

import {
  Card,
  CardContent,
  Grid,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';

import { HorizontalHistogram } from '../../../src';
import Histogram, { IHistogramData } from '../../../src/Histogram';
import Legend from '../../../src/Legend';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TabContainer } from '../components/TabContainer';
import {
  axis,
  data,
  grid,
  theme,
} from './data';

const tipContentFns = [
  (bins, i, d) =>
    bins[i] + '<br />HI THere ' + d.toFixed(2),
  (bins, i, d) =>
    bins[i] + '<br />Bookay ' + d.toFixed(2),
];

const dataLegendData = {
  bins: data.counts.map((c) => c.label),
  counts: [{
    data: data.counts.map((c) => c.data.reduce((p, n) => p + n, 0)),
    label: '',
  }],
};

interface IInitialState {
  chartType: 'HorizontalHistogram' | 'Histogram';
  data: IHistogramData;
}
const initialSate: IInitialState = {
  chartType: 'Histogram',
  data,
};

type Actions = { type: 'setChartType'; chartType: string }
  | { type: 'setData', data: IHistogramData };

function reducer(state: IInitialState, action: Actions) {
  switch (action.type) {
    case 'setChartType':
      return { ...state, chartType: action.chartType };
    case 'setData':
      return { ...state, data: action.data };
    default:
      throw new Error();
  }
}
export const dataToSpreadSheet = (datum: IHistogramData): Cell[][] => {
  const speadSheetData: Cell[][] = [];

  datum.bins.forEach((b, i) => {
    if (!speadSheetData[i]) {
      speadSheetData[i] = [];
    }
    speadSheetData[i][0] = { value: b };
  });
  datum.counts.forEach((c, i) => {
    c.data.forEach((d, x) => {
      if (!speadSheetData[x]) {
        speadSheetData[x] = [];
      }
      speadSheetData[x][i + 1] = { value: d };
    });
  });
  return speadSheetData;
};

const HistogramExample = () => {
  const [tab, setTab] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialSate);
  const [visible, setVisible] = useState({});

  const speadSheetData = dataToSpreadSheet(state.data);

  const Chart = state.chartType === 'Histogram' ? Histogram : HorizontalHistogram;
  return (
    <Layout>
      <SEO title="Histogram" description="" />
      <Typography variant="h2">Histogram</Typography>
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Chart data={state.data}
                  axis={axis}
                  grid={grid}
                  width={'100%'}
                  height={300}
                  visible={visible}
                  colorScheme={theme}
                  tipContentFn={tipContentFns[0]} />
                <Legend
                  theme={theme}
                  data={dataLegendData}
                  onSelect={(key) => {
                    setVisible({ ...visible, [key]: visible.hasOwnProperty(key) ? !visible[key] : false });
                  }}
                  visible={visible}
                />
              </CardContent>
            </Card>
            <br />
            <Card>
              <CardContent>
                <ReactJson src={state} />
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
                    <Grid container spacing={24}>
                      <Grid item xs={6}>
                        <TextField
                          select
                          label="Chart direction"
                          value={state.chartType}
                          onChange={(e) => {
                            dispatch({ type: 'setChartType', chartType: e.target.value });
                          }}
                        >
                          <MenuItem value="Histogram">
                            Histogram
                            </MenuItem>
                          <MenuItem value="HorizontalHistogram">
                            HorizontalHistogram
                            </MenuItem>

                        </TextField>
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

export default HistogramExample;
