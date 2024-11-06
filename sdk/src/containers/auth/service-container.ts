import AuthClient from './clients/auth.client';
import BaseServiceContainer from '../../base.service-container';
import PermissionsClient from './clients/permissions.client';
import PermissionGroupsClient from './clients/permission-groups.client';
import RolesClient from './clients/roles.client';
import UsersClient from './clients/users.client';

/**
 * @description Typing aliasing
 */
import SDK = Levelup.CMS.V1.SDK;
import ApiKeysClient from './clients/api-keys.client';
type TClientName =
  'auth' |
  'apiKeys' |
  'roles' |
  'permissions' |
  'permissionsGroups' |
  'users';

export default class AuthServiceContainer extends BaseServiceContainer<TClientName> {

  constructor(sdk: SDK.ISdk) {
    super(sdk, '/api/v1/auth');
  }

  get auth() {
    if (!this.clients.auth) this.clients.auth = new AuthClient(this);
    return this.clients.auth as AuthClient;
  }

  get users() {
    if (!this.clients.users) this.clients.users = new UsersClient(this);
    return this.clients.users as UsersClient;
  }

  get apiKeys() {
    if (!this.clients.apiKeys) this.clients.apiKeys = new ApiKeysClient(this);
    return this.clients.apiKeys as ApiKeysClient;
  }

  get permissions() {
    if (!this.clients.permissions) this.clients.permissions = new PermissionsClient(this);
    return this.clients.permissions as PermissionsClient;
  }

  get roles() {
    if (!this.clients.roles) this.clients.roles = new RolesClient(this);
    return this.clients.roles as RolesClient;
  }

  get permissionsGroups() {
    if (!this.clients.permissionsGroups) this.clients.permissionsGroups = new PermissionGroupsClient(this);
    return this.clients.permissionsGroups as PermissionGroupsClient;
  }
}
