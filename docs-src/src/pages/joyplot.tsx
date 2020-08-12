import React, { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import JoyPlot from '../../../src/JoyPlot';
import Layout from '../components/layout';
import SEO from '../components/seo';

const data1 = [
  {
    "bins": [
      "[0, 2500)",
      "[2500, 5000)",
      "[100000, 9223372036854775807)"
    ],
    "counts": [
      {
        "label": "in market for car: No",
        "data": [
          500,
          400,
          4000
        ]
      }
    ],
    "title": "No"
  },
  {
    "bins": [
      "[0, 2500)",
      "[2500, 5000)",
      "[100000, 9223372036854775807)"
    ],
    "counts": [
      {
        "label": "in market for car: Yes",
        "data": [
          300,
          300,
          2800
        ]
      }
    ],
    "title": "Yes"
  }
]

const data2 = [
  {
    "bins": [
      "No",
      "Yes"
    ],
    "counts": [
      {
        "label": "in market for car: No",
        "data": [
          1000, 500
        ]
      }
    ],
    "title": "No"
  },
  {
    "bins": [
      "No",
      "Yes"
    ],
    "counts": [
      {
        "label": "in market for car: Yes",
        "data": [
          800, 400
        ]
      }
    ],
    "title": "Yes"
  }
]
const JoyPlotExample = () => {
  const [dataIndex, setDataIndex] = useState(0);
  const d = dataIndex === 0 ? data1 : data2;
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
