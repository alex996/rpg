/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, { mode }) => {
  const inDev = mode === 'development'

  return {
    devtool: inDev ? 'cheap-module-eval-source-map' : 'source-map',
    output: {
      filename: inDev ? '[name].js' : '[name].[contenthash].js'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new ScriptExtHtmlWebpackPlugin({
        // Download .js file during HTML parsing and only execute it after the parser is done
        defaultAttribute: 'defer'
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: inDev ? '[name].css' : '[name].[hash].css',
        chunkFilename: inDev ? '[id].css' : '[id].[hash].css'
      })
    ]
  }
}
