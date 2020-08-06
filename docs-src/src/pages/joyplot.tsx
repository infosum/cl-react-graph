import React, { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import { IBarChartData } from '../../../src';
import JoyPlot from '../../../src/JoyPlot';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { data2 } from '../data';

const data3 = {
  ...data2,
  bins: ['Value 2', 'bin 1', 'bin 2', 'bin 3 with a long name', 'bin 4', 'bin 5', 'bin 6', 'bin 7'],
  counts: [{
    ...data2.counts[0],
    data: [2, 15, 6, 6, 4, 3, 2, 1],
    label: 'Data 2',
  }],
  title: 'Plot 2',
};

const data4 = {
  ...data2,
  bins: ['Value 2', 'bin 1',],
  counts: [{
    ...data2.counts[0],
    data: [2, 15],
    label: 'Data 2',
  }],
  title: 'Plot 2',
}

const allData: IBarChartData[] = [data2, data3];
const allData2: IBarChartData[] = [data2, data4, data3];

const JoyPlotExample = () => {
  const [dataIndex, setDataIndex] = useState(0);
  const d = dataIndex === 0 ? allData : allData2;
  return (
    <Layout>
      <SEO title="Joy Plot" description="" />
      <Typography variant="h2">Joy Plot</Typography>
      <div>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <JoyPlot
                  data={d}
                  xAxisHeight={20}
                  width={800}
                  height={d.length * 150} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Button onClick={() => setDataIndex(dataIndex === 1 ? 0 : 1)}>
                  toggle data
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default JoyPlotExample;
