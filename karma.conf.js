/* eslint-disable */

var webpack = require('webpack');
var path = require('path');

var coverage;
var reporters;
if (process.env.CONTINUOUS_INTEGRATION) {
  coverage = {
    type: 'lcov',
    dir: 'coverage/'
  };
  reporters = ['coverage', 'coveralls', 'istanbul'];
}
else {
  coverage = {
    type: 'html',
    dir: 'coverage/'
  };
  reporters = ['progress', 'coverage', 'istanbul'];
}

module.exports = function (config) {
  config.set({
    browsers: ['Firefox'],
    browserNoActivityTimeout: 30000,
    frameworks: ['mocha', 'chai', 'sinon-chai', 'webpack'],
    plugins: [
      'karma-firefox-launcher',
      'karma-webpack',
      'karma-mocha',
      'karma-chai-plugins',
      'karma-sourcemap-loader',
      'karma-coverage',
      'karma-coveralls',
      'karma-istanbuljs-reporter'
    ],
    files: [
        //'tests.webpack.js'
        // Use webpacks watch in pref to karma watched
        { pattern: 'test/**/*.test.js', watch: false }
    ],
    preprocessors: {
      'test/**/*.test.js': ['webpack', 'sourcemap']
    },
    //preprocessors: {'tests.webpack.js': ['webpack', 'sourcemap']},
    reporters: reporters,
    coverageReporter: coverage,
    istanbulReporter: {
      reporters: [
        { type: 'html', subdir: 'coverage/' },
        { type: 'lcov', subdir: 'coverage/' }
      ]
    },
    webpack: {
      mode: 'none',
      devtool: 'inline-source-map',
      module: {
        rules: [
          // TODO: fix sourcemaps
          // see: https://github.com/deepsweet/isparta-loader/issues/1
          {
            test: /\.js$|.jsx$/,
            loader: 'babel-loader',
            options: {
              presets: ['airbnb'],
              sourceType: 'unambiguous'
            },
            exclude: /node_modules/
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            BROWSER: JSON.stringify(true),
            NODE_ENV: JSON.stringify('test')
          }
        })
      ],
      resolve: {
        extensions: ['', '.js', '.jsx'],
        modules: [
          'node_modules',
          path.join(__dirname, 'src')
        ]
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
