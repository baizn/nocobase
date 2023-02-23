const chalk = require('chalk');
const { Command } = require('commander');
const { resolve } = require('path');
const { getVersion, run, promptForTs, runAppCommand, hasCorePackages, updateJsonFile, hasTsNode } = require('../util');

/**
 *
 * @param {Command} cli
 */
module.exports = (cli) => {
  const { APP_PACKAGE_ROOT } = process.env;
  cli
    .command('upgrade')
    .allowUnknownOption()
    .option('--raw')
    .option('-S|--skip-code-update')
    .action(async (options) => {
      if (hasTsNode()) promptForTs();
      if (hasCorePackages()) {
        // await run('yarn', ['install']);
        await runAppCommand('upgrade');
        return;
      }
      if (options.skipCodeUpdate) {
        await runAppCommand('upgrade');
        return;
      }
      await runAppCommand('upgrade');
      // If ts-node is not installed, do not do the following
      if (!hasTsNode()) {
        return;
      }
      const version = await getVersion();
      await run('yarn', ['add', '@tugraph/openpiece-cli', '@nocobase/devtools', '-W']);
      const clientPackage = resolve(process.cwd(), `packages/${APP_PACKAGE_ROOT}/client/package.json`);
      const serverPackage = resolve(process.cwd(), `packages/${APP_PACKAGE_ROOT}/server/package.json`);
      await updateJsonFile(clientPackage, (data) => {
        data.devDependencies['@tugraph/openpiece-client'] = version;
        return data;
      });
      await updateJsonFile(serverPackage, (data) => {
        data.dependencies['@tugraph/preset-openpiece'] = version;
        return data;
      });
      await run('yarn', ['install']);
      await run('openpiece', ['build']);
      await runAppCommand('upgrade');
    });
};
