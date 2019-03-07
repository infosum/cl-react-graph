// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';

import {
  curveCatmullRom,
  curveStepAfter,
} from 'd3-shape';
import merge from 'deepmerge';
import ColorPicker from 'material-ui-color-picker';
import React, {
  FC,
  useReducer,
  useState,
} from 'react';
import ReactDataSheet, { Cell } from 'react-datasheet';
import ReactJson from 'react-json-view';

import {
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/lab/Slider';

import {
  IAxes,
  IChartPoint,
  ILineChartDataSet,
  LineChart,
} from '../../../src';
import { CurveSelector } from '../components/CurveSelector';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TabContainer } from '../components/TabContainer';
import {
  axis,
  grid,
} from './data';

const initialState: ILineChartDataSet = {
  data: [
    { x: 1, y: 1 },
    { x: 2, y: 12 },
    { x: 3, y: 3 },
    { x: 4, y: 4 },
  ],
  label: 'test data',
  line: {
    curveType: curveCatmullRom,
    fill: {
      fill: 'rgba(10, 10, 10, 0.2)',
      show: true,
    },
    show: true,
    stroke: '#00a97b',
    strokeDashArray: '10 5',
    strokeDashOffset: 3,
  },
  point: {
    fill: 'black',
    radius: 10,
    show: true,
    stroke: 'red',
  },
};

const points2: ILineChartDataSet[] = [
  {
    data: [
      { x: 1, y: 10 },
      { x: 2, y: 15 },
      { x: 3, y: 4 },
      { x: 4, y: 7 },
    ],
    label: 'test data',
    line: {
      curveType: curveCatmullRom,
      fill: {
        fill: 'rgba(10, 10, 10, 0.2)',
        show: true,
      },
      show: true,
      stroke: 'orange',
      strokeDashArray: '10 5',
      strokeDashOffset: 3,
    },
    point: {
      fill: 'black',
      radius: 10,
      show: true,
      stroke: 'red',
    },
  }];

const timeData = [
  {
    data: [
      { x: new Date('1-May-12'), y: 1 },
      { x: new Date('30-Apr-15'), y: 12 },
      { x: new Date('27-Apr-17'), y: 3 },
      { x: new Date(), y: 4 },
    ],
    label: 'test data',
    line: {
      curveType: curveStepAfter,
      fill: {
        fill: 'rgba(10, 10, 10, 0.2)',
        show: true,
      },
      show: true,
      stroke: 'orange',
      strokeDashArray: '10 5',
      strokeDashOffset: 3,
    },
  },
  {
    data: [
      { x: new Date('1-May-12'), y: 10 },
      { x: new Date('30-Apr-15'), y: 12 },
      { x: new Date('27-Apr-17'), y: 23 },
      { x: new Date('26-Apr-19'), y: 14 },
    ],
    label: 'test data 2',
  }];

const axisWithTime: IAxes = {
  x: {
    dateFormat: '%d-%b-%y',
    scale: 'TIME',
  },
  y: {
    numberFormat: '.2',
    scale: 'LOG',
  },
};

type Actions =
  { type: 'setData', data: IChartPoint[] }
  | { type: 'setCurve', curve: any }
  | { type: 'setStroke', stroke: string }
  | { type: 'setStrokeDashArray', dash: string }
  | { type: 'strokeDashOffset', offset: number }
  | { type: 'pointFill', fill: string }
  | { type: 'pointRadius', radius: number }
  | { type: 'pointStroke', fill: string }
  | { type: 'pointShow', show: boolean }
  | { type: 'lineFillShow', show: boolean }
  | { type: 'lineFillColor', fill: string }
  ;

function reducer(state: ILineChartDataSet, action: Actions) {
  switch (action.type) {
    case 'setData':
      return {
        ...state,
        data: action.data,
      };
    case 'setCurve':
      return merge(state, { line: { curveType: action.curve } });
    case 'setStroke':
      return merge(state, { line: { stroke: action.stroke } });
    case 'setStrokeDashArray':
      return merge(state, { line: { strokeDashArray: action.dash } });
    case 'strokeDashOffset':
      return merge(state, { line: { strokeDashOffset: action.offset } });
    case 'pointFill':
      return merge(state, { point: { fill: action.fill } });
    case 'pointRadius':
      return merge(state, { point: { radius: action.radius } });
    case 'pointStroke':
      return merge(state, { point: { stroke: action.fill } });
    case 'pointShow':
      return merge(state, { point: { show: action.show } });
    case 'lineFillShow':
      return merge(state, { line: { fill: { show: action.show } } });
    case 'lineFillColor':
      return merge(state, { line: { fill: { color: action.fill } } });
    default:
      throw new Error();
  }
}
export interface IGridElement extends ReactDataSheet.Cell<IGridElement, number> {
  value: number | null | string;
}
const LineExample: FC<{}> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [tab, setTab] = useState(0);

  const data: Cell[][] = state.data.map((point) => {
    return [{ value: Number(point.x) }, { value: Number(point.y) }];
  });

  return (
    <Layout>
      <SEO title="Line Chart" description="" />
      <Typography variant="h2">Line Chart</Typography>
      <div>

        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <LineChart
                  axis={axis}
                  grid={grid}
                  data={[state]}
                  width="100%" />
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
                    <ReactDataSheet data={data}
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
                        const newData = data.map((row) => [...row]);
                        changes.forEach(({ cell, row, col, value }) => {
                          newData[row][col] = { ...newData[row][col], value };
                        });

                        const pts = newData.map((row) => ({ x: Number(row[0].value), y: Number(row[1].value) }));
                        dispatch({ type: 'setData', data: pts });
                      }} />
                  </TabContainer>
                }
                {
                  tab === 1 && <TabContainer>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Line</Typography>
                        <Grid container spacing={24}>
                          <Grid item xs={6}>
                            <CurveSelector
                              value={'curveCatmullRom'}
                              onChange={(curve) => dispatch({ type: 'setCurve', curve })} />
                          </Grid>
                          <Grid item xs={6}>
                            <ColorPicker
                              value={state.line.stroke}
                              label="Stroke color"
                              onChange={(color) => dispatch({ type: 'setStroke', stroke: color })} />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              id="strokeDashArray"
                              value={state.line.strokeDashArray}
                              label="Stroke dash array"
                              onChange={(e) => dispatch({ type: 'setStrokeDashArray', dash: e.target.value })}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              id="strokeDashOffset"
                              value={state.line.strokeDashOffset}
                              label="Stroke dash offset"
                              onChange={(e) => dispatch({ type: 'strokeDashOffset', offset: Number(e.target.value) })}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    <br />
                    <Card elevation={3}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Point</Typography>
                        <Grid container spacing={24}>
                          <Grid item xs={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={state.point.show}
                                  color="primary"
                                  onChange={(_, value) => {
                                    dispatch({ type: 'pointShow', show: value });
                                  }}
                                />
                              }
                              label="Show points"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <FormGroup>
                              <Typography>Radius <small>({state.point.radius})</small></Typography>
                              <Slider
                                value={state.point.radius}
                                aria-labelledby="label"
                                step={1}
                                onChange={(_, value) => dispatch({ type: 'pointRadius', radius: Number(value) })}
                              />
                            </FormGroup>
                          </Grid>
                          <Grid item xs={6}>
                            <FormGroup>
                              <ColorPicker
                                id="pointFill"
                                value={state.point.fill}
                                label="Fill"
                                onChange={(color) => dispatch({ type: 'pointFill', fill: color })}
                              />
                            </FormGroup>
                          </Grid>
                          <Grid item xs={6}>
                            <FormGroup>
                              <ColorPicker
                                id="pointStroke"
                                value={state.point.stroke}
                                label="Stroke color"
                                onChange={(color) => dispatch({ type: 'pointStroke', fill: color })}
                              />
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    <br />
                    <Card>
                      <CardContent>

                        <Typography variant="h6" gutterBottom>Fill</Typography>
                        <Grid container spacing={24}>
                          <Grid item xs={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={state.line.fill.show}
                                  color="primary"
                                  onChange={(_, value) => {
                                    dispatch({ type: 'lineFillShow', show: value });
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
                                value={state.line.fill.fill}
                                label="Fill Color"
                                onChange={(color) => dispatch({ type: 'lineFillColor', fill: color })}
                              />
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </TabContainer>
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </div>

    </Layout >
  );
};

export default LineExample;
