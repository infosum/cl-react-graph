import React, { FC } from 'react';

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import RadarChart, { IProps } from '../../../src/RadarChart';
import { radarData } from '../../../test/fixtures';
import JSXToString from '../components/JSXToString';
import Layout from '../components/layout';
import SEO from '../components/seo';

const initialState: IProps = {
  height: 400,
  width: 400,
  data: radarData,
}

const Radar = () => {
  const chart = <RadarChart
    id="radar-demo"
    {...initialState} />
  return (
    <Layout>
      <SEO title="Line Chart" description="" />
      <Typography variant="h2">Radar Chart</Typography>
      <div>
        <Grid container spacing={5} className="wrapper">
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
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
          <Grid item xs={12} md={6}>

          </Grid>

        </Grid>
      </div>
    </Layout>
  )
}

export default Radar;
