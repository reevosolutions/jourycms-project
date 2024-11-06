declare module Levelup {

  namespace CMS {
    namespace V1 {
      export namespace UI {
        export namespace Forms {
          export namespace CustomFields {
            export namespace RadioboxField {


              export type Key = "radiobox";

              export type Input =  SingleValue<string>;

              export type Output = SingleValue<Utils.Common.TLabelValue>;

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