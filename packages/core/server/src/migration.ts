import { Migration as DbMigration } from '@tugraph/database';
import Application from './application';
import Plugin from './plugin';

export class Migration extends DbMigration {
  get app() {
    return this.context.app as Application;
  }

  get plugin() {
    return this.context.plugin as Plugin;
  }
}
