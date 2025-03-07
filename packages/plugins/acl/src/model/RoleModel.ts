import { Model } from '@tugraph/database';
import { ACL } from '@nocobase/acl';

export class RoleModel extends Model {
  writeToAcl(options: { acl: ACL }) {
    const { acl } = options;
    const roleName = this.get('name') as string;
    let role = acl.getRole(roleName);

    if (!role) {
      role = acl.define({
        role: roleName,
      });
    }

    role.setStrategy({
      ...((this.get('strategy') as object) || {}),
      allowConfigure: this.get('allowConfigure') as boolean,
    });
  }
}
