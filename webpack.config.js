const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = (_, env) => {
  const isProd = env.mode === 'production';
  const nodeModules = path.resolve(__dirname, 'node_modules');

  return {
    devServer: {
      clientLogLevel: 'none',
      compress: true,
      contentBase: path.resolve(__dirname, 'src'),
      historyApiFallback: true,
      overlay: false,
      stats: 'minimal'
    },
    devtool: !isProd && 'inline-source-map',
    entry: {
      'main': path.resolve(__dirname, 'src', 'index')
    },
    mode: isProd ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: nodeModules,
          use: [
            'babel-loader',
            'ts-loader'
          ]
        },
      ]
    },
    node: {
      console: false,
      global: true,
      process: false,
      __filename: 'mock',
      __dirname: 'mock',
      Buffer: false,
      setImmediate: false
    },
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          sourceMap: isProd,
          extractComments: 'build/licenses.txt',
          terserOptions: {
            compress: {
              inline: 1
            },
            mangle: {
              safari10: true
            },
            output: {
              safari10: true
            }
          }
        })
      ]
    },
    output: {
      chunkFilename: '[name].[chunkhash:5].js',
      filename: isProd ? '[name].[chunkhash:5].js' : '[name].js',
      globalObject: 'self',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/'
    },
    plugins: [
      isProd && new CleanWebpackPlugin([
        'assets',
        '**/*.{css,js,json,html,map}'
      ], {
        root: path.resolve(__dirname, 'build'),
        verbose: false,
        beforeEmit: true
      }),
      new webpack.DefinePlugin({
        process: '{}'
      }),
      new HtmlWebpackPlugin({
        compile: true,
        filename: path.resolve(__dirname, 'build', 'index.html'),
        inject: 'body',
        minify: isProd && {
          collapseWhitespace: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeRedundantAttributes: true,
          removeComments: true
        },
        template: isProd ? '!!prerender-loader?string!src/index.html' : 'src/index.html'
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    stats: 'minimal'
  }
};
