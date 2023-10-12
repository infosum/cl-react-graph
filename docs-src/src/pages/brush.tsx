import { scaleTime } from "d3-scale";
import { curveCatmullRom } from "d3-shape";
import React from "react";

import { Axes, Base, LineProps, useBrush, useWidth } from "../../../src";
import { Brush } from "../../../src/components/Brush";
import { Line } from "../../../src/components/Line";
import { AnyChartPoint } from "../../../src/LineChart";
import { JSXCode } from "../components/JSXCode";
import { Layout } from "../components/Layout";
import { TwoColumns } from "../components/TwoColumns";
import { theme } from "../context/theme";

const exampleCode = `
import {
  Base,
  Axes,
  LineProps,
  useBrush,
  Brush,
  useWidth,
} from 'cl-react-graph';
import { scaleTime } from 'd3-scale';
import { curveCatmullRom } from 'd3-shape';

const axis: Axes = {
  x: {
    dateFormat: '%d-%b-%y',
    scale: 'time',
    width: 800,
    height: 20,
  },
  y: {
    label: 'Count',
    numberFormat: 'd',
    scale: 'log',
    height: 200,
    width: 20,
  },
};

const now = new Date();
const xs = new Array(100).fill('')
  .map((_, i) => new Date(new Date().setDate(now.getDate() + i)))
const data: AnyChartPoint[] = xs.map((v, i) => ({
  x: v,
  y: i * Math.random() * 1000,
}));

const line: LineProps = {
  curveType: curveCatmullRom,
  fill: {
    fill: theme.brightBlue800,
    show: true,
  },
  show: true,
  stroke: theme.brightBlue800,
  strokeDashArray: '0',
  strokeDashOffset: 0,
}

const BrushExample = () => {
  const [ref, width] = useWidth('90%');
  const initialPosition = { start: 100, end: 200 };

  const { brushedData, makeBrushedData } = useBrush({
    initialPosition,
    data,
    scaleFunction: scaleTime,
    width,
  })
  return (
    <div ref={ref}>
      <Base
        width={width}
        height={400}>

        <Line
          axis={axis}
          label="brushed data"
          line={line}
          width={width}
          left={0}
          animate={false}
          height={200}
          data={brushedData} />

        <Brush width={width}
          top={250}
          initialPosition={initialPosition}
          brushWidth={100}
          chart={() => <Line
            axis={axis}
            label="brushed data"
            line={line}
            width={width}
            left={0}
            height={50}
            data={data} />}
          onChange={(pos) => makeBrushedData(pos)}
          height={50} />
      </Base>
    </div>
  )
};
`;

const axis: Axes = {
  x: {
    dateFormat: "%d-%b-%y",
    scale: "time",
    width: 800,
    height: 20,
  },
  y: {
    label: "Count",
    numberFormat: "d",
    scale: "log",
    height: 200,
    width: 20,
  },
};

const now = new Date();
const xs = new Array(100)
  .fill("")
  .map((_, i) => new Date(new Date().setDate(now.getDate() + i)));
const data: AnyChartPoint[] = xs.map((v, i) => ({
  x: v,
  y: i * Math.random() * 1000,
}));

const line: LineProps = {
  curveType: curveCatmullRom,
  fill: {
    fill: theme.brightBlue800,
    show: true,
  },
  show: true,
  stroke: theme.brightBlue800,
  strokeDashArray: "0",
  strokeDashOffset: 0,
};

const BrushExample = () => {
  const [ref, width] = useWidth("90%");
  const initialPosition = { start: 100, end: 200 };

  const { brushedData, makeBrushedData } = useBrush({
    initialPosition,
    data,
    scaleFunction: scaleTime,
    width,
  });
  return (
    <Layout>
      <h2>Brush</h2>
      <TwoColumns>
        <div ref={ref}>
          <Base width={width} height={400}>
            <Line
              axis={axis}
              label="brushed data"
              line={line}
              width={width}
              left={0}
              animate={false}
              height={200}
              data={brushedData}
            />

            <Brush
              width={width}
              top={250}
              initialPosition={initialPosition}
              brushWidth={100}
              chart={() => (
                <Line
                  axis={axis}
                  label="brushed data"
                  line={line}
                  width={width}
                  left={0}
                  height={50}
                  data={data}
                />
              )}
              onChange={(pos) => makeBrushedData(pos)}
              height={50}
            />
          </Base>
        </div>
        <JSXCode exampleCode={exampleCode} />
      </TwoColumns>
    </Layout>
  );
};

export default BrushExample;
