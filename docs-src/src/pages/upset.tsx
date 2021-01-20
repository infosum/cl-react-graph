// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';

import React, { FC } from 'react';

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import UpsetChart, { TUpsetData } from '../../../src/UpsetChart';
import Layout from '../components/layout';
import SEO from '../components/seo';

const data: TUpsetData = [
  { keys: ['Another label'], value: 10 },
  { keys: ['Another label', 'B'], value: 14 },
  { keys: ['Another label', 'B', 'C'], value: 1 },
  { keys: ['B'], value: 10 },
  { keys: ['Another label', 'C'], value: 14 },
  { keys: ['C'], value: 12 },
];

const UpsetExample: FC = () => {
  return (
    <Layout>
      <SEO title="Line Chart" description="" />
      <Typography variant="h2">Upset</Typography>
      <div>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <UpsetChart
                  title="example upset chart"
                  description="more info for accessibility"
                  width={600}
                  height={400}
                  distribution={{
                    colorScheme: ['rgb(154, 187, 218)'],
                    fill: {
                      active: 'rgb(154, 187, 218)',
                      inactive: '#ddd',
                    },
                  }}
                  setSize={{
                    dimensions: { chartWidth: 100, axisWidth: 120, height: 150 },
                    colorScheme: ['rgb(154, 218, 172)'],
                  }}
                  data={data} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default UpsetExample;
