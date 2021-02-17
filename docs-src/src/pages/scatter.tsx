import React, { FC } from 'react';

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import { IPointProps } from '../../../src/components/Points';
import ScatterPlot, { IProps } from '../../../src/ScatterPlot';
import { scatterData } from '../../../test/fixtures';
import JSXToString from '../components/JSXToString';
import Layout from '../components/layout';
import SEO from '../components/seo';

const initialState: IProps = {
  axis: {
    x: {
      height: 20,
      width: 400,
      scale: 'linear',
    },
    y: {
      width: 20,
      height: 400,
      scale: 'linear',
    },
  },
  height: 400,
  width: 400,
  data: [scatterData],
}

const Fruit: FC<IPointProps> = ({
  x,
  y,
  z,
  cx,
  cy,
  children,
}) => <text x={cx} y={cy} fontSize={z * 4}>
    {x > 2 ? "🍎" : "🍐"}
    {children}
  </text>

const Scatter = () => {
  const chart = <ScatterPlot
    id="scatter-demo"
    PointComponent={(props: IPointProps) => <Fruit {...props} />}
    {...initialState} />
  return (
    <Layout>
      <SEO title="Line Chart" description="" />
      <Typography variant="h2">Scatter Chart</Typography>
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

export default Scatter;
