import parse from 'json-templates';
import { resolve } from 'path';

import { Collection, Op } from '@tugraph/database';
import { HandlerType } from '@nocobase/resourcer';
import { Plugin } from '@tugraph/openpiece-server';
import { Registry } from '@nocobase/utils';

import { namespace } from './';
import * as actions from './actions/users';
import initAuthenticators from './authenticators';
import { JwtOptions, JwtService } from './jwt-service';
import { enUS, zhCN } from './locale';
import { parseToken } from './middlewares';

export interface UserPluginConfig {
  name?: string;
  jwt: JwtOptions;
}

export default class UsersPlugin extends Plugin<UserPluginConfig> {
  public jwtService: JwtService;

  public authenticators: Registry<HandlerType> = new Registry();

  constructor(app, options) {
    super(app, options);
    this.jwtService = new JwtService(options?.jwt || {});
  }

  async beforeLoad() {
    this.app.i18n.addResources('zh-CN', namespace, zhCN);
    this.app.i18n.addResources('en-US', namespace, enUS);
    const cmd = this.app.findCommand('install');
    if (cmd) {
      cmd.requiredOption('-e, --root-email <rootEmail>', '', process.env.INIT_ROOT_EMAIL);
      cmd.requiredOption('-p, --root-password <rootPassword>', '', process.env.INIT_ROOT_PASSWORD);
      cmd.option('-n, --root-nickname <rootNickname>');
    }
    this.db.registerOperators({
      $isCurrentUser(_, ctx) {
        return {
          [Op.eq]: ctx?.app?.ctx?.state?.currentUser?.id || -1,
        };
      },
      $isVar(val, ctx) {
        const obj = parse({ val: `{{${val}}}` })(JSON.parse(JSON.stringify(ctx?.app?.ctx?.state)));
        return {
          [Op.eq]: obj.val,
        };
      },
    });

    this.db.on('afterDefineCollection', (collection: Collection) => {
      let { createdBy, updatedBy } = collection.options;
      if (createdBy === true) {
        collection.setField('createdById', {
          type: 'context',
          dataType: 'bigInt',
          dataIndex: 'state.currentUser.id',
          createOnly: true,
          visible: true,
          index: true,
        });
        collection.setField('createdBy', {
          type: 'belongsTo',
          target: 'users',
          foreignKey: 'createdById',
          targetKey: 'id',
        });
      }
      if (updatedBy === true) {
        collection.setField('updatedById', {
          type: 'context',
          dataType: 'bigInt',
          dataIndex: 'state.currentUser.id',
          visible: true,
          index: true,
        });
        collection.setField('updatedBy', {
          type: 'belongsTo',
          target: 'users',
          foreignKey: 'updatedById',
          targetKey: 'id',
        });
      }
    });

    for (const [key, action] of Object.entries(actions)) {
      this.app.resourcer.registerActionHandler(`users:${key}`, action);
    }

    this.app.resourcer.use(parseToken, { tag: 'parseToken' });

    const publicActions = ['check', 'signin', 'signup', 'lostpassword', 'resetpassword', 'getUserByResetToken'];
    const loggedInActions = ['signout', 'updateProfile', 'changePassword'];

    publicActions.forEach((action) => this.app.acl.allow('users', action));
    loggedInActions.forEach((action) => this.app.acl.allow('users', action, 'loggedIn'));
  }

  async load() {
    await this.db.import({
      directory: resolve(__dirname, 'collections'),
    });

    this.db.addMigrations({
      namespace: 'users',
      directory: resolve(__dirname, 'migrations'),
      context: {
        plugin: this,
      },
    });

    initAuthenticators(this);
  }

  getInstallingData(options: any = {}) {
    const { INIT_ROOT_NICKNAME, INIT_ROOT_PASSWORD, INIT_ROOT_EMAIL } = process.env;
    const {
      rootEmail = INIT_ROOT_EMAIL,
      rootPassword = INIT_ROOT_PASSWORD,
      rootNickname = INIT_ROOT_NICKNAME || 'Super Admin',
    } = options.users || options?.cliArgs?.[0] || {};
    return {
      rootEmail,
      rootPassword,
      rootNickname,
    };
  }

  async install(options) {
    const { rootNickname, rootPassword, rootEmail } = this.getInstallingData(options);
    const User = this.db.getCollection('users');
    const user = await User.repository.create({
      values: {
        email: rootEmail,
        password: rootPassword,
        nickname: rootNickname,
      },
    });

    const repo = this.db.getRepository<any>('collections');
    if (repo) {
      await repo.db2cm('users');
    }
  }
}
