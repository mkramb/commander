#!/usr/bin/env node

const vorpal = require('vorpal')()
const merge = require('webpack-merge')
const onDeath = require('death')
const {
  resolveAppPath,
  requireIfExists
} = require('../lib/resolve')

const config = merge.smart(
  require('../config'),
  requireIfExists(resolveAppPath('app.config'))
)

require('../commands/build')(vorpal, config)

vorpal
  .delimiter('ui-commander ❯❯❯')
  .parse(process.argv)
  .show()

onDeath(() => {
  process.stdin.setRawMode(false)
  process.exit()
})
