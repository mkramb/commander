const webpack = require('webpack')

const { addCommand } = require('../utils/vorpal')

const options = (vorpal) => {
  return vorpal
    .option('--outDir <directory>', 'Specify the target directory')
}

const action = function(config, options, callback) {
  this.prompt({
    type: 'checkbox',
    name: 'features',
    message: 'Which features to include?',
    choices: [
      'react',
      'redux'
    ]
  }, (result) => {
    this.log(`Okay, ${result.features} it is!`);
    callback();
  });
}

module.exports = addCommand({
  name: 'initialize', 
  description: 'generates initial project files'
}, options, action)
