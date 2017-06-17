const { pipe } = require('ramda')
const webpack = require('webpack')
const clone = require('clone')

const options = (vorpal) => {
  return vorpal
    .option('--prod', 'run in production mode')
    .option('--watch', 'start file watcher')
}

const action = (config, options, callback) => {
  const webpackConfig = clone(config.webpack)

  if (options.prod) {
    webpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false
      })
    );
  }

  execute(webpackConfig, options.watch, callback, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(
        stats.toJson({}, true)
      );
    }
  })
}

const execute = (config, shouldWatch, callback, onChange) => {
  if (shouldWatch) {
    webpack(config).watch({
      agregateTimeout: 300,
      poll: 1000
    }, onChange);
  }
  else {
    webpack(config, pipe(
      onChange,
      callback
    ));
  }
}

module.exports = (vorpal, config) => {
  vorpal
    .command('build')
    .description('build project bundle')
    .use(options)
    .action(({ options }, callback) => {
      return action(config, options, callback)
    })
}
