/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, { mode }) => {
  const inDev = mode === 'development'

  return {
    // For dev, use a fast source map at the cost of bundle size
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
        },
        {
          test: /\.(png|jpe?g)$/,
          use: [
            {
              loader: 'file-loader'
            }
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
        filename: inDev ? '[name].css' : '[name].[hash].css',
        chunkFilename: inDev ? '[id].css' : '[id].[hash].css'
      })
    ]
  }
}
