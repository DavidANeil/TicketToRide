const path = require('path');

const CLIENT_SOURCE = __dirname + '/client';
const SHARED_SOURCE = __dirname + '/common';

module.exports = {
  entry: './client/app.module.ts',
  output: {
    path: path.resolve(__dirname, 'target'),
    filename: 'index.js',
    publicPath: '/serve/'
  },
  resolve: {
    extensions: [
      '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.html', '.css', '.less'
    ],
    alias: {
      '@common': path.resolve(__dirname, 'common'),
    }
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'},
      {test: /\.html$/, loader: 'html-loader'},
    ]
  },
}