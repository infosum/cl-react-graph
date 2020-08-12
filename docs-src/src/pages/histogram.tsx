import { Draft } from 'immer';
import fileDownload from 'js-file-download';
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
  HorizontalHistogram,
} from '../../../src';
import { ELabelOrientation } from '../../../src/components/YAxis';
import Histogram, {
  EGroupedBarLayout,
  IAxes,
  IBarChartData,
  IGrid,
  IHistogramBar,
} from '../../../src/Histogram';
import Legend from '../../../src/Legend';
import { outputSvg } from '../../../src/utils/outputSvg';
import { DeepPartial } from '../../../src/utils/types';
import { useWidth } from '../../../src/utils/useWidth';
import Histogram2 from '../../../src/v3/Histogram';
import {
  AxisActions,
  AxisOptionsFactory,
} from '../components/AxisOptions';
import DataGroup from '../components/DataGroup';
import { GridOptionsFactory } from '../components/GridOptions';
import { Styling } from '../components/histogram/Styling';
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
  smallDataContinuous,
  theme,
} from '../data';

const tipContentFns = [
  (bins, i, d) =>
    bins[i] + '<br />HI There ' + d.toFixed(2),
  (bins, i, d) =>
    bins[i] + '<br />Another tip ' + d.toFixed(2),
];

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
const watermarkSvg = require('../../../src/assets/Powered-By-InfoSum_DARK.svg') as string;

const HistogramExample = () => {
  const [tab, setTab] = useState(0);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [ref, w] = useWidth(state.width);
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
    width={state.width}
    annotations={annotationsData}
    annotationTextSize={'0.5rem'}
    showBinPercentages={[true, true]}
    onClick={(d) => console.log(d)}
    height={420}
    delay={state.delay}
    duration={state.duration}
    visible={visible}
    colorScheme={['#a9a9a9', '#2a5379']}
    groupLayout={state.groupLayout}
    id="bigHistogram"
    tipContentFn={(bin, i, d) => {
      return 'ABC12345' + '<br />' + d.toFixed(2);
    }}
    axisLabelTipContentFn={(bin, i, d) => {
      const binPos = bin.findIndex((b) => b === d);
      return bin[binPos];
    }}
  />;
  const [dataIndex, setDataIndex] = useState(0);
  const d = dataIndex === 0 ? smallData : data;

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
              <CardContent ref={ref}>
                <h1>V3</h1>
                <h2>Bar Chart</h2>
                <BarChart
                  animation={{
                    duration: state.duration,
                  }}
                  showLabels={[false, true]}
                  direction={state.chartType === 'HorizontalHistogram' ? EChartDirection.HORIZONTAL : EChartDirection.VERTICAL}
                  data={d}
                  height={400}
                  grid={state.grid}
                  groupLayout={state.groupLayout}
                  xAxisLabelOrientation={state.axis.x.labelOrientation}
                  width={w}
                  visible={visible}
                />

                <h3>Histogram</h3>

                <Histogram2
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
                        key={`label-tip-${item.groupLabel}.${item.label}`}
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

                <h1>d3</h1>

                {chart}
                <Button size="small" color="primary" variant="contained" style={{ marginBottom: '1rem' }} onClick={(e) => {
                  e.preventDefault();
                  outputSvg('smallHistogram', 420, 420, (blobData) => {
                    fileDownload(blobData, 'small_chart.png');
                  },
                    {
                      svg: watermarkSvg,
                      width: 120,
                      height: 37,
                    },
                    'blob',
                  )
                }}>Download</Button>
                <Chart data={dataIndex === 0 ? smallData : data}
                  axis={state.axis}
                  bar={state.bar}
                  grid={state.grid}
                  width="100%"
                  annotations={smallAnnotationsData}
                  showBinPercentages={[true, true]}
                  onClick={(d) => console.log(d)}
                  height={420}
                  delay={state.delay}
                  duration={state.duration}
                  visible={visible}
                  colorScheme={dataIndex === 0 ? ['#a9a9a9', '#2a5379'] : ['#afeeff', 'afbb44']}
                  groupLayout={state.groupLayout}
                  tipContentFn={tipContentFns[0]}
                  id="smallHistogram"
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
                  tab === 1 && <Styling
                    dispatch={dispatch}
                    state={state} />
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
