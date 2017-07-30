const webpack = require('webpack')
const spawn = require('cross-spawn');

const { resolveAppPath } = require('../utils/resolve')
const { addCommand } = require('../utils/vorpal')

const options = (vorpal) => {
  return vorpal
    .option('--outDir <directory>', 'Redirect output structure to the directory')
    .option('--watch', 'start file watcher')
}

const action = function(config, options, callback) {
  const arguments = [    
    '--pretty'
  ]

  if (options.outDir) {
    arguments = arguments.concat([
      '--outDir', resolveAppPath(options.outDir)
    ])

  }

  if (options.watch) {
    arguments.push('--watch')
  }

  const result = spawn.sync(
    require.resolve('../node_modules/.bin/tsc'),
    arguments, { stdio: 'inherit' }
  )

  this.log('Compiled successfully!')
  callback()
}

module.exports = addCommand({
  name: 'compile', 
  description: 'compile project files'
}, options, action)
