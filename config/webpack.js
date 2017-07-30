const { resolveAppPath } = require('../utils/resolve')

module.exports = {
  entry: [
    resolveAppPath('src/index.tsx')
  ],
  output: {
    path: resolveAppPath('build'),
    filename: 'bundle.js',
    pathinfo: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      resolveAppPath('src'),
      resolveAppPath('node_modules')
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
        include: resolveAppPath('src')
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
        include: resolveAppPath('src')
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-loader')
        ],
        include: resolveAppPath('node_modules')
      }
    ]
  },
  plugins: []
}
