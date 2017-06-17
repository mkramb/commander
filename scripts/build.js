const webpack = require('webpack');
const spawn = require('cross-spawn');

const config = require('../config/webpack');
const args = require('minimist')(process.argv.slice(2));

const execute = (callback) => {
  const options = config(args);

  if (args.watch) {
    webpack(options).watch({
      agregateTimeout: 300,
      poll: 1000
    }, callback);
  }
  else {
    webpack(options, callback);
  }
};

execute((err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(
      stats.toJson({}, true)
    );

    return reject(err);
  }
});
