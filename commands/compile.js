const webpack = require('webpack')
const spawn = require('cross-spawn');

const { appCompile } = require('../utils/paths')
const { resolveAppPath } = require('../utils/resolve')
const { addCommand } = require('../utils/vorpal')

const options = (vorpal) => {
  return vorpal
    .option('--outDir <directory>', 'Redirect output structure to the directory')
    .option('--watch', 'start file watcher')
}

const action = (config, options, callback) => {
  const outDir = options.outDir ?
    resolveAppPath(options.outDir) : appCompile

  const arguments = [
    '--outDir', outDir,
    '--pretty'
  ]

  if (options.watch) {
    arguments.push('--watch')
  }

  const result = spawn.sync(
    require.resolve('../node_modules/.bin/tsc'),
    arguments, { stdio: 'inherit' }
  );


  console.log('Compiled successfully!');

  callback();
}

module.exports = addCommand({
  name: 'compile', 
  description: 'compile project files'
}, options, action)
