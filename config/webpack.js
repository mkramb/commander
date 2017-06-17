const paths = require('../lib/paths')

module.exports = {
  entry: [
    paths.appIndex
  ],
  output: {
    path: paths.appBuild,
    filename: 'bundle.js',
    pathinfo: true
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    modules: [
      paths.appSrc,
      paths.appNodeModules
    ]
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: [
          require.resolve('babel-loader'),
          require.resolve('awesome-typescript-loader')
        ],
        include: paths.appSrc
      }
    ]
  },
  plugins: []
}
