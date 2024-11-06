
namespace Express {

  export interface Request {
    auth?: (
      | Levelup.V2.Security.JWTPaymentAuthPayload
      | Levelup.V2.Security.JWTUserAuthPayload
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
      app?: Levelup.V2.System.Entity.App | null;
      user?: Levelup.V2.Users.Entity.User | null;
      api_key?: Levelup.V2.Auth.Entity.ExposedApiKey | null;
      service?: {
        name: string;
        is_external: boolean;
      };
    };

    has_access_if?: {
      filters?: {
        user?: Levelup.V2.Utils.Common.ID;
      };
      condition?: () => boolean;
    } | null;
  }
}

