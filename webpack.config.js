var webpack = require('webpack'),
  libraryName = 'cl-react-graph',
  path = require('path'),
  entry = [
    './src/index.ts'
  ],
  plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  rules = [
    {
      test: /\.ts(x?)$/,
      exclude: [/node_modules/, /dist/],
      use: [
        {
          loader: 'babel-loader'
        },
        {
          loader: 'ts-loader'
        }
      ]
    },
    {
      test: /\.js$/,
      exclude: [/node_modules/, /dist/],
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    }
  ];

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: entry,
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: rules
  },
  plugins: plugins,
  watchOptions: {
    poll: true
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    }
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
