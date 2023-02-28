import { skip } from '@nocobase/acl';
import { InstallOptions, Plugin } from '@tugraph/openpiece-server';
import { resolve } from 'path';

export class SystemSettingsPlugin extends Plugin {
  getInitAppLang(options) {
    return options?.cliArgs?.[0]?.opts?.lang || process.env.INIT_APP_LANG || 'en-US';
  }

  async install(options?: InstallOptions) {
    await this.db.getRepository('systemSettings').create({
      values: {
        title: 'Openpiece',
        appLang: this.getInitAppLang(options),
        enabledLanguages: [this.getInitAppLang(options)],
        logo: {
          title: 'geaflow-logo',
          filename: '682e5ad037dd02a0fe4800a3e91c283b.svg',
          extname: '.svg',
          mimetype: 'image/svg',
          url: 'https://mdn.alipayobjects.com/huamei_2dxjn8/afts/img/A*VumQQoSS6QkAAAAAAAAAAAAADrR-AQ/original',
        },
      },
    });
  }

  beforeLoad() {
    const cmd = this.app.findCommand('install');
    if (cmd) {
      cmd.option('-l, --lang [lang]');
    }
  }

  async load() {
    await this.app.db.import({
      directory: resolve(__dirname, 'collections'),
    });
    this.app.acl.use(
      skip({
        resourceName: 'systemSettings',
        actionName: 'get',
      }),
    );
  }
}

export default SystemSettingsPlugin;
