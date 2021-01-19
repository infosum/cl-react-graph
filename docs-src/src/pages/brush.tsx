// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';

import { scaleTime } from 'd3-scale';
import React, {
  FC,
  useState,
} from 'react';

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import {
  Base,
  IAxes,
} from '../../../src';
import Brush from '../../../src/components/Brush';
import Line from '../../../src/components/Line';
import { data3 } from '../../../test/fixtures';
import Layout from '../components/layout';
import SEO from '../components/seo';

const dateFormat = '%d-%b-%y';

const axis: IAxes = {
  x: {
    dateFormat,
    scale: 'time',
    width: 800,
    height: 20,
  },
  y: {
    label: 'TAB_VIEW_CREDITS',
    numberFormat: 'd',
    scale: 'log',
    height: 200,
    width: 20,
  },
};

const filterData = (scale: any, pos: { start: number, end: number }) => (data: any) => {
  const x = scale(data.x);
  return x >= pos.start && x <= pos.end;
}

const { line, data } = data3[0];
const width = 800;

const LineExample: FC = () => {

  const initialPosition = { start: 100, end: 200 };
  const scale = scaleTime()
    .domain([data[0].x, data[data.length - 1].x])
    .range([0, width]);

  const [brushedData, setBrushedData] = useState(data.filter(filterData(scale, initialPosition)));


  const makeBrushedData = (pos: { start: number, end: number }) => {
    setBrushedData(data.filter(filterData(scale, pos)));
  }
  return (
    <Layout>
      <SEO title="Line Chart" description="" />
      <Typography variant="h2">Brush</Typography>
      <div>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
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
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </div>
    </Layout>
  );
};

export default LineExample;
