
/**
 * @description project levelup
 * @version 2.0.0
 * @namespace Levelup
 * @global
 * @export Levelup
 * @copyright drsalmi@icloud.com 
 * @name Salmi Ahmed
 */


declare module Levelup {

  namespace CMS {
    namespace V1 {
      namespace Security {

        export type JWTPaymentAuthPayload = {
          _id: string;
          tracking_id: string;
          role: string;
          space: Levelup.V2.Auth.Entity.TJWTTokenSpace;
        }

        export type JWTUserAuthPayload = {
          _id: string;
          tracking_id: string;
          role: string;
          space: Levelup.V2.Auth.Entity.TJWTTokenSpace;
        }

      }
    }
  }
}
