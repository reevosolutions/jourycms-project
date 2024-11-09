declare module Levelup {

  namespace CMS {
    namespace V1 {
      export namespace Content {
        export namespace CustomFields {
          export namespace CheckboxField {


            export type Key = "checkbox";

            export type Input = Utils.Common.MultiValue<string>;

            export type Output = Utils.Common.MultiValue<Utils.Common.TLabelValue>;

            export type Options = BaseFieldOption<Input, false> & {
              choices: Utils.Common.MultiValue<Utils.Common.TLabelValue>
            }
          }
        }
      }
    }
  }
}