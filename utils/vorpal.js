const clone = require('clone')

const addCommand = (meta, options, action) => {
  return (vorpal, config) => {
    vorpal
      .command(meta.name)
      .description(meta.description)
      .use(options)
      .action(function({ options }, callback) {
        return action.call(this,
          clone(config),
          options,
          callback
        )
      })
  }
}

module.exports = {
  addCommand
}
