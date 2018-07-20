import path from 'path';
import webpack from 'webpack';
const libraryName = 'cl-react-graph';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const entry = [
  './src/index.ts',
];
const plugins = [
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
  }),
  new webpack.NoEmitOnErrorsPlugin(),
];
const rules = [
  {
    exclude: [/node_modules/, /dist/],
    test: /\.ts(x?)$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'ts-loader',
      },
    ],
  },
  {
    exclude: [/node_modules/, /dist/],
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader',
      },
    ],
  },
];

export default {
  devtool: 'cheap-module-source-map',
  entry,
  externals: [
    {
      react: {
        amd: 'react',
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React',
      },
    },
    {
      'react-dom': {
        amd: 'react-dom',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        root: 'ReactDOM',
      },
    },
  ],
  mode: 'production',
  module: {
    rules,
  },
  output: {
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    umdNamedDefine: true,
  },
  plugins,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  watchOptions: {
    poll: true,
  },
};
