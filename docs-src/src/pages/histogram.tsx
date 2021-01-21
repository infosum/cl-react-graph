import { Draft } from 'immer';
import React, {
  createRef,
  useState,
} from 'react';
import { Tooltip } from 'react-svg-tooltip';
import { useImmerReducer } from 'use-immer';

import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';

import {
  BarChart,
  EChartDirection,
  IAxes,
} from '../../../src';
import { ELabelOrientation } from '../../../src/components/YAxis';
import Histogram, {
  EGroupedBarLayout,
  IBarChartData,
  IGrid,
  IHistogramBar,
} from '../../../src/Histogram';
import Legend from '../../../src/Legend';
import { DeepPartial } from '../../../src/utils/types';
import { useWidth } from '../../../src/utils/useWidth';
import {
  AxisActions,
  AxisOptionsFactory,
} from '../components/AxisOptions';
import DataGroup from '../components/DataGroup';
import { GridOptionsFactory } from '../components/GridOptions';
import { Styling } from '../components/histogram/Styling';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { TabContainer } from '../components/TabContainer';
import {
  analyticsAxis,
  data,
  grid,
  smallData,
  smallDataContinuous,
  theme,
} from '../data';

export interface IInitialState {
  axis: DeepPartial<IAxes>;
  bar: IHistogramBar;
  chartType: string;
  data: IBarChartData;
  delay: number;
  duration: number;
  grid: IGrid;
  groupLayout: EGroupedBarLayout;
  width: number | string;
}

const initialState: IInitialState = {
  axis: analyticsAxis,
  bar: {
    grouped: {
      paddingInner: 0.1,
      paddingOuter: 0,
    },
    paddingInner: 0.1,
    paddingOuter: 0,
    overlayMargin: 5,
    hover: {
      lighten: 0.1,
    },
  },
  chartType: 'Histogram',
  data,
  delay: 0,
  duration: 800,
  grid,
  groupLayout: EGroupedBarLayout.GROUPED,
  width: '600',
};

export type GridActions = { type: 'setGridTicks', ticks: number, axis: 'x' | 'y' }
  | { type: 'setGridStroke', color: string, axis: 'x' | 'y' }
  | { type: 'setGridStrokeOpacity', opacity: number, axis: 'x' | 'y' };

export type Actions = { type: 'setChartType'; chartType: string }
  | { type: 'setData'; data: IBarChartData }
  | { type: 'setDuration'; duration: number }
  | { type: 'setDelay'; delay: number }
  | { type: 'setGroupedBarLayout'; layout: EGroupedBarLayout; }
  | { type: 'setGroupedPaddingInner'; padding: number; }
  | { type: 'setGroupedPaddingOuter'; padding: number; }
  | { type: 'setOverlayMargin'; margin: number; }
  | { type: 'setWidth', width: string; }
  | { type: 'setHoverModifier'; value: number; key: string; index: number; }
  | { type: 'removeHoverModifier'; index: number; }
  | { type: 'setPaddingInner'; padding: number; }
  | { type: 'setPaddingOuter'; padding: number; }
  | { type: 'setLabelOrientation', value: ELabelOrientation, axis: 'x' | 'y' }
  | GridActions
  | AxisActions
  ;

function reducer(draft: Draft<IInitialState>, action: Actions) {
  switch (action.type) {

    case 'setChartType':
      draft.chartType = action.chartType;
      return;
    case 'setData':
      draft.data = action.data;
      return;
    case 'setDuration':
      draft.duration = action.duration;
      return;
    case 'setDelay':
      draft.delay = action.delay;
      return;
    case 'setWidth':
      draft.width = action.width;
      return;
    case 'setGroupedBarLayout':
      draft.groupLayout = action.layout;
      return;
    case 'setOverlayMargin':
      draft.bar.overlayMargin = action.margin;
      return;
    case 'setGroupedPaddingInner':
      draft.bar.grouped.paddingInner = action.padding;
      return;
    case 'setGroupedPaddingOuter':
      draft.bar.grouped.paddingOuter = action.padding;
      return;
    case 'setPaddingInner':
      draft.bar.paddingInner = action.padding;
      return;
    case 'setPaddingOuter':
      draft.bar.paddingOuter = action.padding;
      return;
    case 'setHoverModifier': {
      const hover = { ...draft.bar.hover };
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
      draft.bar.hover = hover;
      return;
    }
    case 'removeHoverModifier': {
      const hover = { ...draft.bar.hover };
      const k = Object.keys(hover)[action.index];
      delete hover[k];
      draft.bar.hover = hover;
      return
    }
  }
}

export const dataToSpreadSheet = (datum: IBarChartData): any => {
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
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [ref, w] = useWidth('90%');
  const [visible, setVisible] = useState({});
  const spreadSheetData = dataToSpreadSheet(state.data);
  const dataLegendData = {
    bins: data.counts.map((c) => c.label),
    counts: [{
      data: data.counts.map((c) => c.data.reduce((p, n) => p + n, 0)),
      label: '',
    }],
  };

  const [dataIndex, setDataIndex] = useState(0);
  const d = dataIndex === 0 ? smallData : data;

  return (
    <Layout>
      <SEO title="Histogram" description="" />
      <Typography variant="h2">
        Histogram
      </Typography>
      <div>
        <Grid container spacing={5} className="wrapper">
          <Grid item xs={12} md={6} >
            <Card>
              <CardContent >
                <h2>Bar Chart</h2>
                <div ref={ref}>
                  <BarChart
                    animation={{
                      duration: state.duration,
                    }}
                    showLabels={[false, true]}
                    direction={state.chartType === 'HorizontalHistogram' ? EChartDirection.HORIZONTAL : EChartDirection.VERTICAL}
                    data={d}
                    height={400}
                    grid={state.grid}
                    colorScheme={['#aaa', '#aa0000']}
                    groupLayout={state.groupLayout}
                    xAxisLabelOrientation={state.axis.x.labelOrientation}
                    width={w}
                    visible={visible}
                  />
                </div>
                <h3>Histogram</h3>

                <Histogram
                  animation={{
                    duration: state.duration,
                  }}
                  showLabels={[true, true]}
                  LabelComponent={({ item }) => {
                    const ref = createRef<any>();
                    return <g transform="translate(0, -10)"><g
                      ref={ref}>
                      <circle dy={10} r={4} fill="red"></circle>
                      <text dx="10">{item.percentage}</text></g>

                      <Tooltip
                        key={`label-tip-${item.datasetIndex}.${item.label}.${item.value}`}
                        triggerRef={ref}>
                        <g transform="translate(20, -10)">
                          <text className="label-tip-text">custom test tip test</text>
                        </g>
                      </Tooltip>
                    </g>;
                  }}
                  direction={state.chartType === 'HorizontalHistogram' ? EChartDirection.HORIZONTAL : EChartDirection.VERTICAL}
                  data={smallDataContinuous}
                  height={400}
                  grid={state.grid}
                  xAxisLabelOrientation={state.axis.x.labelOrientation}
                  width={w}
                  visible={visible}
                />

                <Button onClick={() => setDataIndex(dataIndex === 1 ? 0 : 1)}>
                  toggle data
                </Button>

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

          </Grid>
          <Grid item xs={12} md={6}>
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
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={6}>
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
                  tab === 1 && <Styling
                    dispatch={dispatch}
                    state={state} />
                }
                {
                  tab === 2 && <TabContainer>
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          id="animationDuration"
                          value={state.duration}
                          label="Duration"
                          onChange={(e) => dispatch({ type: 'setDuration', duration: Number(e.target.value) })}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
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
