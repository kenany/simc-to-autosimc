const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
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
      __dirname: 'mock',
      __filename: 'mock',
      global: true
    },
    output: {
      chunkFilename: '[name].[chunkhash:5].js',
      filename: isProd ? '[name].[chunkhash:5].js' : '[name].js',
      globalObject: 'self',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/'
    },
    plugins: [
      isProd && new CleanWebpackPlugin(),
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
        template: 'src/index.html'
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    stats: 'minimal'
  }
};
