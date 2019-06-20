module.exports = {
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }]
  }
}
