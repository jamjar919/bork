const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

process.traceDeprecation = true;

const config = {
  entry: APP_DIR + '/app.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      Components: path.resolve(APP_DIR, 'components/'),
      Containers: path.resolve(APP_DIR, 'containers/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: APP_DIR,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        include: APP_DIR,
        use: 'eslint-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          }, {
            loader: 'sass-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }]
        })
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',    // where the fonts will go
            publicPath: '../'       // override the default path
          }
        }]
      },
    ]
  },
  devServer: {
    contentBase: APP_DIR + '/public',
    inline: true,
    stats: 'errors-only',
    historyApiFallback: true
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: APP_DIR + '/public/index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.ProvidePlugin({ // inject ES5 modules as global vars
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether'
    })
  ]
};

module.exports = config;
