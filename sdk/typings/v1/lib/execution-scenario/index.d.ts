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
      namespace Lib {
        namespace ExecutionScenario {
          export interface Scenario<T> {
            method: string;
            args: Record<string, any>;
            authData: Levelup.V2.Security.AuthData;
            execution: T
          }
        }
      }
    }
  }
}

