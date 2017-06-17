const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appSrc: resolveApp('src'),
  appIndex: resolveApp('src/index.tsx'),
  appNodeModules: resolveApp('node_modules'),
  appBuild: resolveApp('build')
}
