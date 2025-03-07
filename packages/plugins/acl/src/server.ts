// @ts-nocheck
import { Context } from '@tugraph/actions';
import { Collection } from '@tugraph/database';
import { Plugin } from '@tugraph/openpiece-server';
import { resolve } from 'path';
import { availableActionResource } from './actions/available-actions';
import { checkAction } from './actions/role-check';
import { roleCollectionsResource } from './actions/role-collections';
import { setDefaultRole } from './actions/user-setDefaultRole';
import { setCurrentRole } from './middlewares/setCurrentRole';
import { RoleModel } from './model/RoleModel';
import { RoleResourceActionModel } from './model/RoleResourceActionModel';
import { RoleResourceModel } from './model/RoleResourceModel';

export interface AssociationFieldAction {
  associationActions: string[];
  targetActions?: string[];
}

interface AssociationFieldActions {
  [availableActionName: string]: AssociationFieldAction;
}

export interface AssociationFieldsActions {
  [associationType: string]: AssociationFieldActions;
}

export class GrantHelper {
  resourceTargetActionMap = new Map<string, string[]>();
  targetActionResourceMap = new Map<string, string[]>();

  constructor() {}
}

export class PluginACL extends Plugin {
  // association field actions config

  associationFieldsActions: AssociationFieldsActions = {};

  grantHelper = new GrantHelper();

  get acl() {
    return this.app.acl;
  }

  registerAssociationFieldAction(associationType: string, value: AssociationFieldActions) {
    this.associationFieldsActions[associationType] = value;
  }

  registerAssociationFieldsActions() {
    // if grant create action to role, it should
    // also grant add action and association target's view action
    this.registerAssociationFieldAction('linkTo', {
      view: {
        associationActions: ['list', 'get'],
      },
      create: {
        associationActions: ['add'],
        targetActions: ['view'],
      },
      update: {
        associationActions: ['add', 'remove', 'toggle'],
        targetActions: ['view'],
      },
    });

    this.registerAssociationFieldAction('attachments', {
      view: {
        associationActions: ['list', 'get'],
      },
      add: {
        associationActions: ['upload', 'add'],
      },
      update: {
        associationActions: ['update', 'add', 'remove', 'toggle'],
      },
    });

    this.registerAssociationFieldAction('subTable', {
      view: {
        associationActions: ['list', 'get'],
      },
      create: {
        associationActions: ['create'],
      },
      update: {
        associationActions: ['update', 'destroy'],
      },
    });
  }

  async writeResourceToACL(resourceModel: RoleResourceModel, transaction) {
    await resourceModel.writeToACL({
      acl: this.acl,
      associationFieldsActions: this.associationFieldsActions,
      transaction: transaction,
      grantHelper: this.grantHelper,
    });
  }

  async writeActionToACL(actionModel: RoleResourceActionModel, transaction) {
    const resource = actionModel.get('resource') as RoleResourceModel;
    const role = this.acl.getRole(resource.get('roleName') as string);
    await actionModel.writeToACL({
      acl: this.acl,
      role,
      resourceName: resource.get('name') as string,
      associationFieldsActions: this.associationFieldsActions,
      grantHelper: this.grantHelper,
    });
  }

  async writeRolesToACL() {
    const roles = (await this.app.db.getRepository('roles').find({
      appends: ['resources', 'resources.actions'],
    })) as RoleModel[];

    for (const role of roles) {
      role.writeToAcl({ acl: this.acl });
      for (const resource of role.get('resources') as RoleResourceModel[]) {
        await this.writeResourceToACL(resource, null);
      }
    }
  }

  async beforeLoad() {
    this.app.db.registerModels({
      RoleResourceActionModel,
      RoleResourceModel,
      RoleModel,
    });

    this.registerAssociationFieldsActions();

    this.app.resourcer.define(availableActionResource);
    this.app.resourcer.define(roleCollectionsResource);

    this.app.resourcer.registerActionHandler('roles:check', checkAction);

    this.app.resourcer.registerActionHandler(`users:setDefaultRole`, setDefaultRole);

    this.db.on('users.afterCreateWithAssociations', async (model, options) => {
      const { transaction } = options;
      const repository = this.app.db.getRepository('roles');
      const defaultRole = await repository.findOne({
        filter: {
          default: true,
        },
        transaction,
      });
      if (defaultRole && (await model.countRoles({ transaction })) == 0) {
        await model.addRoles(defaultRole, { transaction });
      }
    });

    this.app.db.on('roles.afterSaveWithAssociations', async (model, options) => {
      const { transaction } = options;

      model.writeToAcl({
        acl: this.acl,
      });

      for (const resource of (await model.getResources({ transaction })) as RoleResourceModel[]) {
        await this.writeResourceToACL(resource, transaction);
      }

      // model is default
      if (model.get('default')) {
        await this.app.db.getRepository('roles').update({
          values: {
            default: false,
          },
          filter: {
            'name.$ne': model.get('name'),
          },
          hooks: false,
          transaction,
        });
      }
    });

    this.app.db.on('roles.afterDestroy', (model) => {
      const roleName = model.get('name');
      this.acl.removeRole(roleName);
    });

    this.app.db.on('rolesResources.afterSaveWithAssociations', async (model: RoleResourceModel, options) => {
      await this.writeResourceToACL(model, options.transaction);
    });

    this.app.db.on('rolesResourcesActions.afterUpdateWithAssociations', async (model, options) => {
      const { transaction } = options;
      const resource = await model.getResource({
        transaction,
      });

      await this.writeResourceToACL(resource, transaction);
    });

    this.app.db.on('rolesResources.afterDestroy', async (model, options) => {
      const role = this.acl.getRole(model.get('roleName'));
      if (role) {
        role.revokeResource(model.get('name'));
      }
    });

    this.app.db.on('collections.afterDestroy', async (model, options) => {
      const { transaction } = options;
      await this.app.db.getRepository('rolesResources').destroy({
        filter: {
          name: model.get('name'),
        },
        transaction,
      });
    });

    this.app.db.on('fields.afterCreate', async (model, options) => {
      const { transaction } = options;

      const collectionName = model.get('collectionName');
      const fieldName = model.get('name');

      const resourceActions = (await this.app.db.getRepository('rolesResourcesActions').find({
        filter: {
          'resource.name': collectionName,
        },
        transaction,
        appends: ['resource'],
      })) as RoleResourceActionModel[];

      for (const resourceAction of resourceActions) {
        const fields = resourceAction.get('fields') as string[];
        const newFields = [...fields, fieldName];

        await this.app.db.getRepository('rolesResourcesActions').update({
          filterByTk: resourceAction.get('id') as number,
          values: {
            fields: newFields,
          },
          transaction,
        });
      }
    });

    this.app.db.on('fields.afterDestroy', async (model, options) => {
      const collectionName = model.get('collectionName');
      const fieldName = model.get('name');

      const resourceActions = await this.app.db.getRepository('rolesResourcesActions').find({
        filter: {
          'resource.name': collectionName,
          'fields.$anyOf': [fieldName],
        },
        transaction: options.transaction,
      });

      for (const resourceAction of resourceActions) {
        const fields = resourceAction.get('fields') as string[];
        const newFields = fields.filter((field) => field != fieldName);

        await this.app.db.getRepository('rolesResourcesActions').update({
          filterByTk: resourceAction.get('id') as number,
          values: {
            fields: newFields,
          },
          transaction: options.transaction,
        });
      }
    });

    // sync database role data to acl
    this.app.on('afterLoad', async (app, options) => {
      if (options?.method === 'install') {
        return;
      }
      const exists = await this.app.db.collectionExistsInDb('roles');
      if (exists) {
        await this.writeRolesToACL();
      }
    });

    this.app.on('afterInstall', async (app, options) => {
      const exists = await this.app.db.collectionExistsInDb('roles');
      if (exists) {
        await this.writeRolesToACL();
      }
    });

    this.app.on('afterInstallPlugin', async (plugin) => {
      if (plugin.getName() !== 'users') {
        return;
      }
      const User = this.db.getCollection('users');
      await User.repository.update({
        values: {
          roles: ['root', 'admin', 'member'],
        },
        forceUpdate: true,
      });

      const RolesUsers = this.db.getCollection('rolesUsers');
      await RolesUsers.repository.update({
        filter: {
          userId: 1,
          roleName: 'root',
        },
        values: {
          default: true,
        },
      });
    });

    this.app.on('beforeInstallPlugin', async (plugin) => {
      if (plugin.getName() !== 'users') {
        return;
      }
      const roles = this.app.db.getRepository('roles');
      await roles.createMany({
        records: [
          {
            name: 'root',
            title: '{{t("Root")}}',
            hidden: true,
          },
          {
            name: 'admin',
            title: '{{t("Admin")}}',
            allowConfigure: true,
            allowNewMenu: true,
            strategy: { actions: ['create', 'view', 'update', 'destroy'] },
          },
          {
            name: 'member',
            title: '{{t("Member")}}',
            allowNewMenu: true,
            strategy: { actions: ['view', 'update:own', 'destroy:own', 'create'] },
            default: true,
          },
        ],
      });
      const rolesResourcesScopes = this.app.db.getRepository('rolesResourcesScopes');
      await rolesResourcesScopes.createMany({
        records: [
          {
            key: 'all',
            name: '{{t("All records")}}',
            scope: {},
          },
          {
            key: 'own',
            name: '{{t("Own records")}}',
            scope: {
              createdById: '{{ ctx.state.currentUser.id }}',
            },
          },
        ],
      });
    });

    this.app.resourcer.use(setCurrentRole, { tag: 'setCurrentRole', before: 'acl', after: 'parseToken' });

    this.app.acl.allow('users', 'setDefaultRole', 'loggedIn');

    this.app.acl.allow('roles', 'check', 'loggedIn');
    this.app.acl.allow('roles', ['create', 'update', 'destroy'], 'allowConfigure');

    this.app.acl.allow('roles.menuUiSchemas', ['set', 'toggle', 'list'], 'allowConfigure');

    this.app.acl.allow('*', '*', (ctx) => {
      return ctx.state.currentRole === 'root';
    });

    this.app.resourcer.use(async (ctx, next) => {
      const { actionName, resourceName, params } = ctx.action;
      const { showAnonymous } = params || {};
      if (actionName === 'list' && resourceName === 'roles') {
        if (!showAnonymous) {
          ctx.action.mergeParams({
            filter: {
              'name.$ne': 'anonymous',
            },
          });
        }
      }
      if (actionName === 'update' && resourceName === 'roles.resources') {
        ctx.action.mergeParams({
          updateAssociationValues: ['actions'],
        });
      }
      await next();
    });

    this.app.acl.use(async (ctx: Context, next) => {
      const { actionName, resourceName } = ctx.action;
      if (actionName === 'get' || actionName === 'list') {
        if (!Array.isArray(ctx?.permission?.can?.params?.fields)) {
          return next();
        }
        let collection: Collection;
        if (resourceName.includes('.')) {
          const [collectionName, associationName] = resourceName.split('.');
          const field = ctx.db.getCollection(collectionName)?.getField?.(associationName);
          if (field.target) {
            collection = ctx.db.getCollection(field.target);
          }
        } else {
          collection = ctx.db.getCollection(resourceName);
        }
        if (collection && collection.hasField('createdById')) {
          ctx.permission.can.params.fields.push('createdById');
        }
      }
      return next();
    });

    const parseJsonTemplate = this.app.acl.parseJsonTemplate;
    this.app.acl.use(async (ctx: Context, next) => {
      const { actionName, resourceName, resourceOf } = ctx.action;
      if (resourceName.includes('.') && resourceOf) {
        if (!ctx?.permission?.can?.params) {
          return next();
        }
        // 关联数据去掉 filter
        delete ctx.permission.can.params.filter;
        // 关联数据能不能处理取决于 source 是否有权限
        const [collectionName] = resourceName.split('.');
        const action = ctx.can({ resource: collectionName, action: actionName });
        const availableAction = this.app.acl.getAvailableAction(actionName);
        if (availableAction?.options?.onNewRecord) {
          if (action) {
            ctx.permission.skip = true;
          } else {
            ctx.permission.can = false;
          }
        } else {
          const filter = parseJsonTemplate(action?.params?.filter || {}, ctx);
          const sourceInstance = await ctx.db.getRepository(collectionName).findOne({
            filterByTk: resourceOf,
            filter,
          });
          if (!sourceInstance) {
            ctx.permission.can = false;
          }
        }
      }
      await next();
    });
  }

  async install() {
    const repo = this.db.getRepository<any>('collections');
    if (repo) {
      await repo.db2cm('roles');
    }
  }

  async load() {
    await this.app.db.import({
      directory: resolve(__dirname, 'collections'),
    });
  }
}

export default PluginACL;
