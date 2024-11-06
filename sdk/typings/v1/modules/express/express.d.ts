
namespace Express {

  export interface Request {
    auth?: (
      | Levelup.CMS.V1.Security.JWTPaymentAuthPayload
      | Levelup.CMS.V1.Security.JWTUserAuthPayload
    ) & {
      iss?: string | undefined;
      sub?: string | undefined;
      aud?: string | string[] | undefined;
      exp?: number | undefined;
      nbf?: number | undefined;
      iat?: number | undefined;
      jti?: string | undefined;
    };

    current_token?: string | null;
    jwt_expired?: boolean;

    attached_entities: {
      token?: string;
      app?: Levelup.CMS.V1.System.Entity.App | null;
      user?: Levelup.CMS.V1.Users.Entity.User | null;
      api_key?: Levelup.CMS.V1.Auth.Entity.ExposedApiKey | null;
      service?: {
        name: string;
        is_external: boolean;
      };
    };

    has_access_if?: {
      filters?: {
        user?: Levelup.CMS.V1.Utils.Common.ID;
      };
      condition?: () => boolean;
    } | null;
  }
}

