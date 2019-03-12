import React from 'react';

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import JoyPlot from '../../../src/JoyPlot';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { data2 } from '../data';

const data3 = {
  ...data2,
  counts: [{
    ...data2.counts[0],
    data: [7, 6, 5, 4, 3, 2, 1],
    label: 'Data 2',
  }],
  title: 'Plot 2',
};

const JoyPlotExample = () => {
  return (
    <Layout>
      <SEO title="Joy Plot" description="" />
      <Typography variant="h2">Joy Plot</Typography>
      <div>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <JoyPlot
                  data={[data2, data3]}
                  colorScheme={['rgba(0, 0, 0, 0.5)', '#666']}
                  width={400} 
                  height={400} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default JoyPlotExample;
