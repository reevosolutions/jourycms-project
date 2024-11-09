import Dexie from "dexie";

export type JouryCMS_AuthEntityType = "user" | "app" | "config";
export type AuthEntityType = JouryCMS_AuthEntityType;

export type AuthEntity<E extends AuthEntityType> = E extends "user"
  ? Levelup.CMS.V1.Users.Entity.ExposedUser & { entity?: "user" }
  : E extends "original_user"
  ? {
    token: string;
    refresh_token: string;
    user: Levelup.CMS.V1.Users.Entity.ExposedUser & { entity?: "user" };
    entity?: "original_user";
  }
  : E extends "app"
  ? Levelup.CMS.V1.System.Entity.App & { entity?: "app" }
  : never;

type WithEntityKey<T> = T & { entity: AuthEntityType };

/* -------------------------------------------------------------------------- */
/*                                   JouryCMS_                                  */
/* -------------------------------------------------------------------------- */
export type JouryCMS_AuthEntityDatum =
  | WithEntityKey<Levelup.CMS.V1.Users.Entity.ExposedUser>
  | WithEntityKey<{
    token: string;
    refresh_token: string;
    user: Levelup.CMS.V1.Users.Entity.ExposedUser & { entity?: "user" };
  }>
  | WithEntityKey<Levelup.CMS.V1.System.Entity.App>
  ;
/* -------------------------------------------------------------------------- */
/*                                  Pharmadz                                  */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                                   MERGED                                   */
/* -------------------------------------------------------------------------- */
export type AuthEntityDatum = JouryCMS_AuthEntityDatum;

export default class JouryCMS_DexieDatabase extends Dexie {
  // auth
  current!: Dexie.Table<AuthEntityDatum, AuthEntityType>;
  roles!: Dexie.Table<Levelup.CMS.V1.Auth.Entity.Role, string>;
  permissions!: Dexie.Table<Levelup.CMS.V1.Auth.Entity.Permission, string>;
  // users
  users!: Dexie.Table<Levelup.CMS.V1.Users.Entity.ExposedUser, string>;
  // system
  apps!: Dexie.Table<Levelup.CMS.V1.System.Entity.App, string>;
  // content
  articleTypes!: Dexie.Table<Levelup.CMS.V1.Content.Entity.ArticleType, string>;
  states!: Dexie.Table<{
    code: string;
    name: string;
  }, string>;
  cities!: Dexie.Table<{
    state_code: string;
    code: string;
    name: string;
  }, string>;

  constructor(name: string, version: number) {
    super(name);
    this.version(version).stores({
      // auth
      current: "&entity",
      roles: "&_id, name, group, company, app",
      permissions: "&_id, name, company, app",
      // system
      apps: "&_id, tracking_id, code, name",
      // content
      articleTypes: "&_id, slug, name",
      states: "&code, name",
      cities: "&code, state_code, name",
      // users
      users: "&_id, tracking_id, code, name, company, app",
    });
  }
}
