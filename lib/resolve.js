const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath)

const requireIfExists = (path, defaultValue={}) => {
  try {
    return require(path)
  } catch (err) {
    return defaultValue
  }
}

module.exports = {
  resolveAppPath,
  requireIfExists
}
