import merge from 'deepmerge';
import React, {
  useReducer,
  useState,
} from 'react';

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
import Histogram, {
  EColorManipulations,
  EGroupedBarLayout,
  IAxes,
  IGrid,
  IHistogramData,
} from '../../../src/Histogram';
import Legend from '../../../src/Legend';
import { DeepPartial } from '../../../src/utils/types';
import {
  AxisActions,
  AxisOptionsFactory,
} from '../components/AxisOptions';
import ColorModifierFields from '../components/ColorModifierFields';
import DataGroup from '../components/DataGroup';
import { GridOptionsFactory } from '../components/GridOptions';
import JSXToString from '../components/JSXToString';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TabContainer } from '../components/TabContainer';
import {
  analyticsAxis,
  annotationsData,
  data,
  grid,
  smallAnnotationsData,
  smallData,
  theme,
  verticalXAxis,
} from '../data';

const tipContentFns = [
  (bins, i, d) =>
    bins[i] + '<br />HI There ' + d.toFixed(2),
  (bins, i, d) =>
    bins[i] + '<br />Another tip ' + d.toFixed(2),
];

// const now = new Date();
// data.bins = data.bins.map((d, i) => new Date(new Date().setDate(now.getDate() + i)).toLocaleString());

export interface IInitialState {
  axis: DeepPartial<IAxes>;
  bar: {
    overlayMargin: number;
    hover: Partial<Record<EColorManipulations, number>>;
  };
  chartType: string;
  data: IHistogramData;
  delay: number;
  duration: number;
  grid: IGrid;
  groupLayout: EGroupedBarLayout;
}

const initialSate: IInitialState = {
  axis: analyticsAxis,
  bar: {
    overlayMargin: 5,
    hover: {
      lighten: 0.1,
    },
  },
  chartType: 'Histogram',
  data,
  delay: 0,
  duration: 400,
  grid,
  groupLayout: EGroupedBarLayout.OVERLAID,
};

export type GridActions = { type: 'setGridTicks', ticks: number, axis: 'x' | 'y' }
  | { type: 'setGridStroke', color: string, axis: 'x' | 'y' }
  | { type: 'setGridStrokeOpacity', opacity: number, axis: 'x' | 'y' };

export type Actions = { type: 'setChartType'; chartType: string }
  | { type: 'setData'; data: IHistogramData }
  | { type: 'setDuration'; duration: number }
  | { type: 'setDelay'; delay: number }
  | { type: 'setGroupedBarLayout'; layout: EGroupedBarLayout; }
  | { type: 'setOverlayMargin'; margin: number; }
  | { type: 'setHoverModifier'; value: number; key: string; index: number; }
  | { type: 'removeHoverModifier'; index: number; }
  | GridActions
  | AxisActions
  ;

export function gridReducer<S extends any, A extends any>(state: S, action: A): any {
  switch (action.type) {
    case 'setChartType':
      return { ...state, chartType: action.chartType };
    case 'setData':
      return { ...state, data: action.data };
    case 'setDuration':
      return { ...state, duration: action.duration };
    case 'setDelay':
      return { ...state, delay: action.delay };
    case 'setGridTicks':
      return merge(state, { axis: { [action.axis]: { ticks: action.ticks } } })
    case 'setGridStroke':
      return merge(state, { grid: { [action.axis]: { style: { stroke: action.color } } } });
    case 'setGridStrokeOpacity':
      return merge(state, { grid: { [action.axis]: { style: { 'stroke-opacity': action.opacity } } } });
    default:
      return state;
  }
}

// Unclear why but you can't import a reduced in and have it update state??? 
export function axisReducer<S extends any, A extends any>(state: S, action: A): any {
  switch (action.type) {
    case 'setScale':
      return merge(state, {
        axis: {
          [action.axis]: {
            scale: action.value,
          },
        }
      })
    default:
      return state;
  }
}

function reducer(state: IInitialState, action: Actions) {
  state = gridReducer(state, action);
  state = axisReducer(state, action);
  switch (action.type) {
    case 'setChartType':
      return { ...state, chartType: action.chartType };
    case 'setData':
      return { ...state, data: action.data };
    case 'setDuration':
      return { ...state, duration: action.duration };
    case 'setDelay':
      return { ...state, delay: action.delay };
    case 'setGridTicks':
      return merge(state, { grid: { [action.axis]: { ticks: action.ticks } } });
    case 'setGridStroke':
      return merge(state, { grid: { [action.axis]: { style: { stroke: action.color } } } });
    case 'setGridStrokeOpacity':
      return merge(state, { grid: { [action.axis]: { style: { 'stroke-opacity': action.opacity } } } });
    case 'setGroupedBarLayout':
      return { ...state, groupLayout: action.layout };
    case 'setOverlayMargin':
      return {
        ...state,
        bar: {
          ...state.bar,
          overlayMargin: action.margin,
        }
      }
    case 'setHoverModifier': {
      const hover = { ...state.bar.hover };
      const keys = Object.keys(hover);
      delete hover[''];
      let i: number;
      // When adding an option its initially keyed to '' - remove those 
      for (i = keys.length; i >= 0; i--) {
        if (keys[i] === '') {
          delete hover[''];
        }
      }
      const k = Object.keys(hover)[action.index];
      delete hover[k];
      hover[action.key] = action.value;
      return {
        ...state,
        bar: {
          ...state.bar,
          hover,
        }
      }
    }
    case 'removeHoverModifier': {
      const hover = { ...state.bar.hover };
      const k = Object.keys(hover)[action.index];
      delete hover[k];
      return {
        ...state,
        bar: {
          ...state.bar,
          hover,
        }
      }
    }
    default:
      return state;
  }
}

export const dataToSpreadSheet = (datum: IHistogramData): any => {
  const spreadSheetData: any = [];

  datum.bins.forEach((b, i) => {
    if (!spreadSheetData[i]) {
      spreadSheetData[i] = [];
    }
    spreadSheetData[i][0] = { value: b };
  });
  datum.counts.forEach((c, i) => {
    c.data.forEach((d, x) => {
      if (!spreadSheetData[x]) {
        spreadSheetData[x] = [];
      }
      spreadSheetData[x][i + 1] = { value: d };
    });
  });
  return spreadSheetData;
};

const GridOptions = GridOptionsFactory<(action: Actions) => void, IInitialState>();
const AxisOptions = AxisOptionsFactory<(action: Actions) => void, IInitialState>();

const HistogramExample = () => {
  const [tab, setTab] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialSate);
  const [visible, setVisible] = useState({});
  const spreadSheetData = dataToSpreadSheet(state.data);
  const dataLegendData = {
    bins: data.counts.map((c) => c.label),
    counts: [{
      data: data.counts.map((c) => c.data.reduce((p, n) => p + n, 0)),
      label: '',
    }],
  };
  const Chart = state.chartType === 'Histogram' ? Histogram : HorizontalHistogram;
  const chart = <Chart data={state.data}
    axis={state.axis}
    bar={state.bar}
    grid={state.grid}
    width={420}
    annotations={annotationsData}
    showBinPercentages={[true, true]}
    onClick={(d) => console.log(d)}
    height={420}
    delay={state.delay}
    duration={state.duration}
    visible={visible}
    colorScheme={theme}
    groupLayout={state.groupLayout}
    tipContentFn={tipContentFns[0]}
  />;
  const smallDataChart = <Chart data={smallData}
    axis={state.axis}
    bar={state.bar}
    grid={state.grid}
    width={420}
    annotations={smallAnnotationsData}
    showBinPercentages={[true, true]}
    onClick={(d) => console.log(d)}
    height={420}
    delay={state.delay}
    duration={state.duration}
    visible={visible}
    colorScheme={theme}
    groupLayout={state.groupLayout}
    tipContentFn={tipContentFns[0]}
  />;
  return (
    <Layout>
      <SEO title="Histogram" description="" />
      <Typography variant="h2">
        Histogram
      </Typography>
      <div>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                {chart}
                {smallDataChart}
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
                  <Tab label="Animation" />
                  <Tab label="Grid" />
                  <Tab label="Axes" />
                </Tabs>
                {
                  tab === 0 && <TabContainer>
                    <Grid container spacing={10}>
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
                    <DataGroup<Actions, IInitialState>
                      dispatch={dispatch}
                      state={state}
                      headings={state.data.counts.map((count, i) => count.label)}
                      spreadSheetData={spreadSheetData}
                      onDeleteData={(i) => {
                        const newData = { ...state.data };
                        newData.counts = newData.counts.filter((_, k) => k !== i);
                        if (newData.counts.length > 0) {
                          dispatch({ type: 'setData', data: newData } as any);
                        }
                      }}
                      onAddData={() => {
                        const newData = { ...state.data };
                        const newDataset = {
                          label: 'dataset ' + (newData.counts.length + 1),
                          data: new Array(state.data.counts[0].data.length).fill(0),
                        };
                        newData.counts.push(newDataset);
                        dispatch({ type: 'setData', data: newData } as any);
                      }}
                    />
                  </TabContainer>
                }
                {
                  tab === 1 && <TabContainer>
                    <Grid container spacing={10}>
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
                          label="overlay margin"
                          value={state.bar.overlayMargin}
                          onChange={(e) => {
                            dispatch(({ type: 'setOverlayMargin', margin: Number(e.target.value) }))
                          }}
                        />
                      </Grid>
                      <ColorModifierFields
                        values={state.bar.hover}
                        dispatch={dispatch} />
                    </Grid>
                  </TabContainer>
                }
                {
                  tab === 2 && <TabContainer>
                    <Grid container spacing={10}>
                      <Grid item xs={6}>
                        <TextField
                          id="animationDuration"
                          value={state.duration}
                          label="Duration"
                          onChange={(e) => dispatch({ type: 'setDuration', duration: Number(e.target.value) })}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          id="animationDelay"
                          value={state.delay}
                          label="Delay"
                          onChange={(e) => dispatch({ type: 'setDelay', delay: Number(e.target.value) })}
                        />
                      </Grid>
                    </Grid>
                  </TabContainer>
                }
                {
                  tab === 3 && <TabContainer>
                    <GridOptions
                      dispatch={dispatch}
                      state={state} />
                  </TabContainer>
                }
                {
                  tab === 4 && <TabContainer>
                    <AxisOptions
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

export default HistogramExample;
