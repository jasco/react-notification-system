'use strict';

var path = require('path');
var webpack = require('webpack');

var JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;

module.exports = {
  mode: 'development',
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './example/src/scripts/App'
  ],
  output: {
    path: path.join(__dirname, 'example/build'),
    filename: 'app.js',
    publicPath: 'build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.sass'],
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
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'autoprefixer-loader',
            options: {
              browsers: 'last 2 version'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: 'sass',
              includePaths: [
                path.resolve(__dirname, 'example/src')
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
        loader: 'file-loader',
        exclude: /node_modules/
      }
    ]
  }
};
