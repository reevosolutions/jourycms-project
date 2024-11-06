declare module Levelup {

  namespace CMS {
    namespace V1 {
      export namespace UI {
        export namespace Forms {
          export namespace CustomFields {
            export namespace TimeField {

              export type Key = "time";

              export type Input = SingleValue<Utils.Common.Time>;

              export type Output = Input;

              export type Options = BaseFieldOption<Input> & {
              }
            }
          }
        }
      }
    }
  }
}