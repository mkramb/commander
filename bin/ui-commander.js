#!/usr/bin/env node

const vorpal = require('vorpal')()
const {
  resolveAppPath,
  requireIfExists
} = require('../lib/resolve')

const config = Object.assign(
  require('../config'),
  requireIfExists(
    resolveAppPath('app.config')
  )
)

require('../commands/build')(vorpal, config)

vorpal
  .delimiter('ui-commander ❯❯❯')
  .parse(process.argv)
  .show()
