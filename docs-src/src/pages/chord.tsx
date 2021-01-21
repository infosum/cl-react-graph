import React from 'react';

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';

import Chord from '../../../src/Chord';
import Layout from '../components/layout';
import SEO from '../components/seo';

const ChordDemo = () => {

  return (
    <Layout>
      <SEO title="Chord" description="" />
      <Typography variant="h2">Chord</Typography>
      <div>
        <Grid container spacing={5} className="wrapper">
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Chord
                  width={400}
                  height={400}
                  data={
                    {
                      'France': [0, 10, 20, 12],
                      'Britain': [20, 0, 30, 2],
                      'Ireland': [30, 40, 0, 23],
                      'Spain': [10, 23, 43, 0]
                    }
                  } />

              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={6}>

          </Grid>

          <Grid item xs={6}>

          </Grid>
        </Grid>
      </div>
    </Layout >
  )
}

export default ChordDemo;
