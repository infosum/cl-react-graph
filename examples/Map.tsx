import { json } from 'd3-request';
import { FeatureCollection } from 'geojson';
import * as React from 'react';
import { Component } from 'react';
import { Map } from '../src';

interface IState {
  loading: boolean;
  geojson: any; // FeatureCollection<any, any>;
}

class MapExamples extends Component<{}, IState> {

  constructor(props) {
    super(props);
    this.state = {
      geojson: {},
      loading: true,
    };
  }

  public componentDidMount() {

    // const url = 'http://enjalot.github.io/wwsd/data/world/world-110m.geojson';
    const url = 'https://opendata.arcgis.com/datasets/8d3a9e6e7bd445e2bdcc26cdf007eac7_3.geojson';
    json(url, (error, collection) => {
      if (error) { throw error; }
      this.setState({
        geojson: collection,
        loading: false,
      });
    });

  }

  public render() {
    if (this.state.loading) {
      return <div>loading</div>;
    }
    const data = [];
    return (
      <div>
        <h3>Map</h3>
        <Map
          data={data}
          geojson={this.state.geojson}
          height={400}
          width={400} />
      </div>
    );
  }
}

export default MapExamples;
