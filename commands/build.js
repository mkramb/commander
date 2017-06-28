const { pipe } = require('ramda')
const webpack = require('webpack')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

const { addCommand } = require('../utils/vorpal')

const options = (vorpal) => {
  return vorpal
    .option('--prod', 'run in production mode')
    .option('--watch', 'start file watcher')
}

const action = (config, options, callback) => {
  if (options.prod) {
    config.webpack.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false
      })
    )
  }

  if (options.watch) {
    config.webpack.watch = true
  }

  compile(config.webpack, callback, (err, stats) => {
    if (err || stats.hasErrors()) {
      const rawMessages = stats.toJson({}, true);
      const messages = formatWebpackMessages(rawMessages);

      if (!messages.errors.length && !messages.warnings.length) {
        console.log('Compiled successfully!');
      }

      if (messages.errors.length) {
        console.log('Failed to compile.');
        messages.errors.forEach(e => console.log(e));
        return;
      }

      if (messages.warnings.length) {
        console.log('Compiled with warnings.');
        messages.warnings.forEach(w => console.log(w));
      }
    }
  })
}

const compile = (config, callback, onChange) => {
  if (config.watch) {
    webpack(config).watch({
      agregateTimeout: 300,
      poll: 1000
    }, onChange)
  }
  else {
    webpack(config, pipe(
      onChange,
      callback
    ))
  }
}

module.exports = addCommand({
  name: 'build', 
  description: 'build project bundle'
}, options, action)
