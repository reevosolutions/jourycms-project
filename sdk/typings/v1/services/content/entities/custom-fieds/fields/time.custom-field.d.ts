declare module Levelup {

  namespace CMS {
    namespace V1 {
      export namespace Content {
        export namespace CustomFields {
          export namespace TimeField {

            export type Key = "time";

            export type Input = Utils.Common.SingleValue<Utils.Common.Time>;

            export type Output = Input;

            export type Options = BaseFieldOption<Input> & {
            }
          }
        }
      }
    }
  }
}