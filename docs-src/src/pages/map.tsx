import { json } from 'd3-request';
import { FeatureCollection } from 'geojson';
import React, {
  useEffect,
  useState,
} from 'react';

import Map from '../../../src/legacy/Map';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { data } from '../data';

const MapExample = () => {
  const [loading, setLoading] = useState(true);

  const [geojson, setGeoJson] = useState<FeatureCollection<any, any>>(null);
  useEffect(() => {
    const url = 'https://opendata.arcgis.com/datasets/8d3a9e6e7bd445e2bdcc26cdf007eac7_3.geojson';
    json(url, (error, collection) => {
      if (error) { throw error; }
      setGeoJson(collection);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <Layout>
      <SEO title="Histogram" description="" />
      <h1>Map</h1>
      <div>
        <Map
          data={data as any}
          geojson={geojson}
          height={400}
          width={400} />
      </div>
    </Layout>
  );
};

export default MapExample;

