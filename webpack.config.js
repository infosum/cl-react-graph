var webpack = require('webpack'),
  libraryName = 'cl-react-graph',
  path = require('path'),
  entry = [
    './src/index.js'
  ],
  plugins = [
    new webpack.NoErrorsPlugin()
  ],
  loaders = [
    {test: /\.js$/, exclude: /(node_modules)/, loader: 'babel-loader'}
  ];

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: loaders
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
  ]
};
