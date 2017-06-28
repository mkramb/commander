const paths = require('../utils/paths')

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
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      paths.appSrc,
      paths.appNodeModules
    ]
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          require.resolve('babel-loader'),
          require.resolve('awesome-typescript-loader')
        ],
        include: paths.appSrc
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ],
        include: paths.appSrc
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader')
        ],
        include: paths.appNodeModules,
      }
    ]
  },
  plugins: []
}
