const { resolveAppPath } = require('./resolve')

module.exports = {
  appSrc: resolveAppPath('src'),
  appIndex: resolveAppPath('src/index.tsx'),
  appNodeModules: resolveAppPath('node_modules'),
  appBuild: resolveAppPath('build')
}
