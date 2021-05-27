'use strict';

var path = require('path');
var webpack = require('webpack');

var JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;

module.exports = {
  mode: 'development',
  entry: [
    './src/NotificationSystem.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'react-notification-system.js',
    libraryTarget: 'umd',
    library: 'ReactNotificationSystem'
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
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'node_modules',
      path.join(__dirname, 'src')
    ]
  },
  module: {
    rules: [
      {
        test: JS_REGEX,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'example/src')
        ],
        loader: 'babel-loader',
        options: { presets: ['airbnb'] }
      }
    ]
  }
};
