declare module Levelup {

  namespace CMS {
    namespace V1 {
      export namespace UI {
        export namespace Forms {
          export namespace CustomFields {
            export namespace CheckboxField {


              export type Key = "checkbox";

              export type Input =  MultiValue<string>;

              export type Output = MultiValue<Utils.Common.TLabelValue>;

              export type Options = BaseFieldOption<Input, false> & {
                choices: MultiValue<Utils.Common.TLabelValue>
              }
            }
          }
        }
      }
    }
  }
}