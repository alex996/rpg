/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

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
      rules: [{ test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new ScriptExtHtmlWebpackPlugin({
        // Download .js file during HTML parsing and only execute it after the parser is done
        defaultAttribute: 'defer'
      })
    ]
  }
}
