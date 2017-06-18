const clone = require('clone')

const addCommand = (meta, options, action) => {
  return (vorpal, config) => {
    vorpal
      .command(meta.name)
      .description(meta.description)
      .use(options)
      .action(({ options }, callback) => {
        return action(clone(config), options, callback)
      })
  }
}

module.exports = {
  addCommand
}
