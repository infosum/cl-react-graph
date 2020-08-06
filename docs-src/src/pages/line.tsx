// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';

import { curveCatmullRom } from 'd3-shape';
import { timeFormat } from 'd3-time-format';
import { Draft } from 'immer';
import ColorPicker from 'material-ui-color-picker';
import React, {
  FC,
  useState,
} from 'react';
import ReactDataSheet, { Cell } from 'react-datasheet';
import { useImmerReducer } from 'use-immer';

import {
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Slider,
  Switch,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import {
  ILineChartDataSet,
  ILineChartProps,
  LineChart,
} from '../../../src';
import { ELabelOrientation } from '../../../src/components/YAxis';
import { Scale } from '../../../src/Histogram';
import { DeepPartial } from '../../../src/utils/types';
import { useLineDomain } from '../../../src/utils/useDomain';
import { useWidth } from '../../../src/utils/useWidth';
import LineChart2 from '../../../src/v3/LineChart';
import { data3 } from '../../../test/fixtures';
import { AxisActions } from '../components/AxisOptions';
import { CurveSelector } from '../components/CurveSelector';
import { GridOptionsFactory } from '../components/GridOptions';
import JSXToString from '../components/JSXToString';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TabContainer } from '../components/TabContainer';
import { grid } from '../data';
import { GridActions } from './histogram';

type TInitialState = ILineChartProps<{ x: number | string | Date, y: number }>;
type TData = ILineChartDataSet<{ x: string | number | Date, y: number }>;

const dateFormat = '%d-%b-%y';
const formatTime = timeFormat(dateFormat);
const now = new Date();
const xs = [1, 2, 4, 5, 6, 8, 10].map((i) => formatTime(new Date(new Date().setDate(now.getDate() + i))))
const dateValues = [
  { x: xs[0], y: 1500000 },
  { x: xs[1], y: 12 },
  { x: xs[2], y: 3 },
  { x: xs[3], y: 4 },
];

const data = {
  data: dateValues,
  label: 'test data',
  line: {
    curveType: curveCatmullRom,
    fill: {
      fill: 'rgba(54, 174, 141, 0.28)',
      show: true,
    },
    show: true,
    stroke: '#00a97b',
    strokeDashArray: '10 5',
    strokeDashOffset: 0,
  },
  point: {
    fill: '#08697F',
    radius: 10,
    show: true,
    stroke: '#483A3A',
  },
};

const data2 = {
  data: [
    { x: 13, y: 1 },
    { x: 23, y: 12 },
    { x: 32, y: 3 },
    { x: 41, y: 4 },
  ],
  label: 'test data 2',
  line: {
    curveType: curveCatmullRom,
    fill: {
      fill: 'rgba(54, 174, 141, 0.28)',
      show: true,
    },
    show: true,
    stroke: '#08697F',
    strokeDashArray: '10 5',
    strokeDashOffset: 0,
  },
  point: {
    fill: '#00a97b',
    radius: 10,
    show: true,
    stroke: '#483A3A',
  },
};

const initialState: TInitialState = {
  axis: {
    x: {
      dateFormat,
      scale: 'TIME',
      ticks: 2,
    },
    y: {
      label: 'TAB_VIEW_CREDITS',
      numberFormat: 'd',
      scale: 'LOG',
      text: {
        style: {
          'font-size': '.7rem',
        },
      },
      ticks: 5,
    },
  },
  data: [data3[0]],
  width: '100%',
  grid,
};

type Actions = { type: 'applyChanges', index: 0, changes: any }
  | { type: 'setCurve', curve: any, index: number }
  | { type: 'setStroke', stroke: string, index: number }
  | { type: 'setStrokeDashArray', dash: string, index: number }
  | { type: 'strokeDashOffset', offset: number, index: number }
  | { type: 'pointFill', fill: string, index: number }
  | { type: 'pointRadius', radius: number, index: number }
  | { type: 'pointStroke', fill: string, index: number }
  | { type: 'pointShow', show: boolean, index: number }
  | { type: 'lineFillShow', show: boolean, index: number }
  | { type: 'lineFillColor', fill: string, index: number }
  | { type: 'addRow', row: TData; }
  | { type: 'toggleRow'; }
  | { type: 'setLabelOrientation', value: ELabelOrientation, axis: 'x' | 'y' }
  | AxisActions
  | GridActions
  ;

function reducer(draft: Draft<TInitialState>, action: Actions) {
  switch (action.type) {
    case 'setGridTicks':
      draft.axis[action.axis].ticks = action.ticks;
      return;
    case 'setGridStroke':
      draft.axis[action.axis].style.stroke = action.color;
      return;
    case 'setGridStrokeOpacity':
      draft.axis[action.axis].style['stroke-opacity'] = action.opacity;
      return;
    case 'setScale':
      draft.axis[action.axis].scale = action.value;
      return;
    case 'setLabelOrientation':
      draft.axis[action.axis].labelOrientation = action.value;
      return;
    case 'addRow':
      draft.data = [...draft.data, action.row];
      return;

    case 'applyChanges':
      const newData: any = draft.data[action.index].data.map((row) => ({ ...row }));
      action.changes.forEach(({ cell, row, col, value }) => {
        const key = col === 0 ? 'x' : 'y';
        newData[row] = { ...newData[row], [key]: Number(value) };
      });
      draft.data[action.index].data = newData;
      return;
    case 'setCurve':
      draft.data[action.index].line.curveType = action.curve;
      return;
    case 'setStroke':
      draft.data[action.index].line.stroke = action.stroke;
      return;
    case 'setStrokeDashArray':
      draft.data[action.index].line.strokeDashArray = action.dash
      return;
    case 'strokeDashOffset':
      draft.data[action.index].line.strokeDashOffset = action.offset;;
      return;
    case 'pointFill':
      draft.data[action.index].point.fill = action.fill;
      return;
    case 'pointRadius':
      draft.data[action.index].point.radius = action.radius;
      return;
    case 'pointStroke':
      draft.data[action.index].point.stroke = action.fill;
      return;
    case 'pointShow':
      draft.data[action.index].point.show = action.show;
      return;
    case 'lineFillShow':
      draft.data[action.index].line.fill.show = action.show;
      return;
    case 'lineFillColor':
      draft.data[action.index].line.fill.fill = action.fill;
      return;
    case 'toggleRow':
      draft.data = draft.data.length === 2 ? [data2] : [data, data2];
      return;
  }
}

const GridOptions = GridOptionsFactory<(action: Actions) => void, ILineChartProps>();

export interface IGridElement extends ReactDataSheet.Cell<IGridElement, number | string> {
  value: number | null | string;
}

const LineExample: FC = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [ref, w] = useWidth(state.width);
  const [tab, setTab] = useState(0);
  const gridData: Cell[][] = state.data[0].data.map((point) => {
    const x = typeof (point.x) === 'object' ? point.x.toDateString() : point.x;
    return [{ value: x }, { value: Number(point.y) }];
  });
  const domain = useLineDomain({
    values: state.data,
  });
  const chart = <LineChart
    axis={state.axis}
    grid={state.grid}
    data={state.data}
    width="100%" />;
  return (
    <Layout>
      <SEO title="Line Chart" description="" />
      <Typography variant="h2">Line Chart</Typography>
      <div>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <h1>React native version</h1>
                <LineChart2
                  width={800}
                  height={300}
                  grid={state.grid}
                  axis={state.axis}
                  data={state.data}
                />

                <LineChart
                  axis={state.axis}
                  grid={state.grid}
                  data={state.data}
                  className="line-1"
                  width="100%" />
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
            <Card>
              <CardContent>
                <Tabs value={tab} onChange={(e, v) => setTab(v)}>
                  <Tab label="Data" />
                  <Tab label="Styling" />
                  <Tab label="Grid" />
                </Tabs>
                {
                  tab === 0 && <TabContainer>
                    <ReactDataSheet
                      data={gridData}
                      valueRenderer={(cell) => cell.value}
                      sheetRenderer={(props) => (
                        <table className={props.className + ' my-awesome-extra-class'}>
                          <thead>
                            <tr>
                              {['x', 'y'].map((col) => (<th key={col} className="action-cell">{col}</th>))}
                            </tr>
                          </thead>
                          <tbody>
                            {props.children}
                          </tbody>
                        </table>
                      )}
                      onCellsChanged={(changes) => {
                        dispatch({ type: 'applyChanges', index: 0, changes });
                      }} />
                    <Button onClick={() => dispatch({ type: 'toggleRow' })}>Toggle Row</Button>
                    <Grid item xs={6}>
                      <TextField
                        label="Y Axis Scale"
                        select
                        value={state.axis.y.scale}
                        onChange={(e) => dispatch({ type: 'setScale', axis: 'y', value: e.target.value as Scale })}
                      >
                        <MenuItem value="LINEAR">
                          Linear
                          </MenuItem>
                        <MenuItem value="LOG">
                          Log
                          </MenuItem>
                        <MenuItem value="TIME">
                          Time
                          </MenuItem>
                      </TextField>
                    </Grid>
                  </TabContainer>
                }
                {
                  tab === 1 && <TabContainer>

                    <Typography variant="h6" gutterBottom>Line</Typography>
                    <Grid container spacing={10}>
                      <Grid item xs={6}>
                        <CurveSelector
                          value={'curveCatmullRom'}
                          onChange={(curve) => dispatch({ type: 'setCurve', curve, index: 0 })} />
                      </Grid>
                      <Grid item xs={6}>
                        <ColorPicker
                          value={state.data[0].line.stroke}
                          label="Stroke color"
                          onChange={(color) => dispatch({ type: 'setStroke', stroke: color, index: 0 })} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="strokeDashArray"
                          value={state.data[0].line.strokeDashArray}
                          label="Stroke dash array"
                          onChange={(e) => dispatch({ type: 'setStrokeDashArray', index: 0, dash: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="strokeDashOffset"
                          value={state.data[0].line.strokeDashOffset}
                          label="Stroke dash offset"
                          onChange={(e) => dispatch({
                            index: 0,
                            offset: Number(e.target.value),
                            type: 'strokeDashOffset',
                          })}
                        />
                      </Grid>
                    </Grid>

                    <br />

                    <Typography variant="h6" gutterBottom>Point</Typography>
                    <Grid container spacing={10}>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={state.data[0].point.show}
                              color="primary"
                              onChange={(_, value) => {
                                dispatch({ type: 'pointShow', show: value, index: 0 });
                              }}
                            />
                          }
                          label="Show points"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <Typography>Radius <small>({state.data[0].point.radius})</small></Typography>
                          <Slider
                            value={state.data[0].point.radius}
                            aria-labelledby="label"
                            step={1}
                            onChange={(_, value) => dispatch({
                              index: 0,
                              radius: Number(value),
                              type: 'pointRadius',
                            })}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ColorPicker
                            id="pointFill"
                            value={state.data[0].point.fill}
                            label="Fill"
                            onChange={(color) => dispatch({ type: 'pointFill', fill: color, index: 0 })}
                          />
                        </FormGroup>
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ColorPicker
                            id="pointStroke"
                            value={state.data[0].point.stroke}
                            label="Stroke color"
                            onChange={(color) => dispatch({ type: 'pointStroke', fill: color, index: 0 })}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>

                    <br />


                    <Typography variant="h6" gutterBottom>Fill</Typography>
                    <Grid container spacing={10}>
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={state.data[0].line.fill.show}
                              color="primary"
                              onChange={(_, value) => {
                                dispatch({ type: 'lineFillShow', show: value, index: 0 });
                              }}
                            />
                          }
                          label="Fill under line"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormGroup>
                          <ColorPicker
                            id="lineFillColor"
                            value={state.data[0].line.fill.fill}
                            label="Fill Color"
                            onChange={(color) => dispatch({ type: 'lineFillColor', fill: color, index: 0 })}
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>

                  </TabContainer>
                }
                {
                  tab === 2 && <TabContainer>
                    <GridOptions
                      dispatch={dispatch}
                      state={state} />
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

export default LineExample;
