declare module Levelup {

  namespace CMS {
    namespace V1 {
        export namespace Content {
          export namespace CustomFields {
            export namespace RadioboxField {


              export type Key = "radiobox";

              export type Input =  Utils.Common.SingleValue<string>;

              export type Output = Utils.Common.SingleValue<Utils.Common.TLabelValue>;

              export type Options = BaseFieldOption<Input, false> & {
                choices: Utils.Common.MultiValue<Utils.Common.TLabelValue>

              }
            }
          }
        }
      }
    }
  }